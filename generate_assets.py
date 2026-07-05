import os
import re
import csv
import hashlib
import shutil
import subprocess
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

# Configuration
OUTPUT_DIR = "audio"
VOICE = "ko-KR-SunHiNeural"  # High quality, natural Korean neural voice
# Final assets are Opus 24 kbps mono (.ogg) — ~58% smaller than the 48 kbps
# mp3 edge-tts emits, transparent for TTS speech. edge-tts can only write
# mp3, so generation goes mp3 (temp) -> ffmpeg -> .ogg.
OPUS_BITRATE = "24k"
FFMPEG = os.environ.get("FFMPEG") or shutil.which("ffmpeg")

def extract_korean_text():
    phrases = set()
    
    # 1. Extract from CSV
    try:
        with open("korean_5000_claude_ready.csv", "r", encoding="utf-8") as f:
            reader = csv.reader(f)
            next(reader, None) # skip header
            for row in reader:
                if len(row) > 1:
                    phrases.add(row[1].strip())
    except Exception as e:
        print("Could not read CSV:", e)

    # 2. Extract from JS files (Match any string literal containing Korean Jamo or Syllables)
    for filename in ["app.js", "words_curated_core.js", "words_lesson_plan.js"]:
        try:
            with open(filename, "r", encoding="utf-8") as f:
                content = f.read()
                # Match strings in double or single quotes containing at least one Korean char (no newlines)
                matches_double = re.findall(r'"([^"\n\\]*(?:\\.[^"\n\\]*)*[가-힣ㄱ-ㅎㅏ-ㅣ]+[^"\n\\]*(?:\\.[^"\n\\]*)*)"', content)
                matches_single = re.findall(r"'([^'\n\\]*(?:\\.[^'\n\\]*)*[가-힣ㄱ-ㅎㅏ-ㅣ]+[^'\n\\]*(?:\\.[^'\n\\]*)*)'", content)
                
                for m in matches_double + matches_single:
                    clean_m = m.replace('\\"', '"').replace("\\'", "'").strip()
                    if clean_m:
                        phrases.add(clean_m)
                        # Split comma, slash, vertical bar, or interpunct separated sequences (like splitVoiceSequence in app.js)
                        parts = re.split(r'[,\u3001/·|]+', clean_m)
                        if len(parts) > 1:
                            for part in parts:
                                part_clean = part.strip()
                                if part_clean:
                                    phrases.add(part_clean)
                        
                # Also capture the previous crude regex for sentences not enclosed in standard quotes if any
                matches_sentences = re.findall(r'([가-힣][가-힣\s\.\?!,]+[가-힣\.\?!])', content)
                for m in matches_sentences:
                    if m.strip():
                        phrases.add(m.strip())
                        
        except Exception as e:
            print(f"Could not read {filename}:", e)
        
    return list(phrases)

def generate_audio(phrases):
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    total = len(phrases)
    print(f"Found {total} unique Korean phrases (including Jamo).")

    audio_map = load_existing_audio_map()
    
    for i, text in enumerate(phrases):
        if not text: continue

        md5_hash = hashlib.md5(text.encode('utf-8')).hexdigest()
        out_ogg = os.path.join(OUTPUT_DIR, f"{md5_hash}.ogg")
        tmp_mp3 = os.path.join(OUTPUT_DIR, f"{md5_hash}.tmp.mp3")
        legacy_mp3 = os.path.join(OUTPUT_DIR, f"{md5_hash}.mp3")

        # Skip anything whose mapped asset already exists. Legacy .mp3 entries
        # (edge-tts produced empty audio for them, e.g. isolated jamo
        # clusters) are kept as-is rather than retried forever.
        existing = audio_map.get(text, "")
        if existing and os.path.exists(existing[2:] if existing.startswith("./") else existing):
            continue
        if os.path.exists(out_ogg):
            audio_map[text] = f"./audio/{md5_hash}.ogg"
            continue

        print(f"[{i+1}/{total}] Generating: {text}")

        try:
            tts = subprocess.run(
                ['edge-tts', '--voice', VOICE, '--text', text, '--write-media', tmp_mp3],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL
            )
        except FileNotFoundError:
            print("ERROR: edge-tts command not found.")
            break

        if tts.returncode != 0:
            # Transient failure (network etc.) — no map entry, retried next run.
            print(f"  ERROR: edge-tts failed for: {text}")
            if os.path.exists(tmp_mp3):
                os.remove(tmp_mp3)
            continue

        if not os.path.exists(tmp_mp3) or os.path.getsize(tmp_mp3) == 0:
            # edge-tts succeeded but produced no speech (unpronounceable
            # token, e.g. an isolated jamo cluster). Keep the documented
            # empty-.mp3 convention so audits and the map stay consistent.
            print(f"  WARNING: edge-tts produced no audio for: {text}")
            if os.path.exists(tmp_mp3):
                os.remove(tmp_mp3)
            open(legacy_mp3, "a").close()
            audio_map[text] = f"./audio/{md5_hash}.mp3"
            continue

        if not FFMPEG:
            print("ERROR: ffmpeg not found (install it or set the FFMPEG env var).")
            os.remove(tmp_mp3)
            break

        result = subprocess.run(
            [FFMPEG, '-nostdin', '-v', 'error', '-y', '-i', tmp_mp3,
             '-c:a', 'libopus', '-b:a', OPUS_BITRATE, '-ac', '1', out_ogg],
            capture_output=True, text=True
        )
        os.remove(tmp_mp3)
        if result.returncode != 0 or not os.path.exists(out_ogg) or os.path.getsize(out_ogg) == 0:
            print(f"  ERROR: opus encode failed for: {text}\n  {result.stderr.strip()}")
            if os.path.exists(out_ogg):
                os.remove(out_ogg)
            continue

        audio_map[text] = f"./audio/{md5_hash}.ogg"

    # Write the audio_map.js file
    print("Writing audio_map.js...")
    with open("audio_map.js", "w", encoding="utf-8") as f:
        f.write("window.AUDIO_MAP = ")
        json.dump(audio_map, f, ensure_ascii=False, indent=2)
        f.write(";")

def load_existing_audio_map():
    try:
        with open("audio_map.js", "r", encoding="utf-8") as f:
            content = f.read().strip()
        match = re.match(r"^window\.AUDIO_MAP\s*=\s*(\{.*\});?\s*$", content, re.S)
        if not match:
            return {}
        data = json.loads(match.group(1))
        return data if isinstance(data, dict) else {}
    except (OSError, json.JSONDecodeError):
        return {}

if __name__ == "__main__":
    print("Starting generation process using Microsoft Edge TTS...")
    phrases = extract_korean_text()
    generate_audio(phrases)
    print("Done! Check the 'audio' folder.")
