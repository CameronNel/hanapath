import os
import re
import csv
import hashlib
import shutil
import subprocess
import sys
import json
from concurrent.futures import ThreadPoolExecutor, as_completed

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
    
    # 1. Extract from the word-list CSVs (korean spelling is column 2 in both)
    for csv_file in ["korean_5000_claude_ready.csv", "korean_supplementary_15k.csv"]:
        try:
            with open(csv_file, "r", encoding="utf-8") as f:
                reader = csv.reader(f)
                next(reader, None) # skip header
                for row in reader:
                    if len(row) > 1:
                        phrases.add(row[1].strip())
        except Exception as e:
            print(f"Could not read {csv_file}:", e)

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
        
    # Drop extraction noise: strings with runs of latin letters are JS-literal
    # fragments or English usage notes the app never speaks (the Korean voice
    # shouldn't read English anyway). Single stray letters are tolerated.
    korean_phrases = [p for p in phrases if not re.search(r"[A-Za-z]{2,}", p)]
    korean_phrases.append("No sound")
    return list(set(korean_phrases))

def generate_one(text, md5_hash):
    """Generate one phrase: edge-tts -> temp mp3 -> Opus .ogg.

    Returns the map value ("./audio/<hash>.ogg" or the empty legacy
    "./audio/<hash>.mp3") on success, or None for a transient failure that
    should be retried on the next run.
    """
    out_ogg = os.path.join(OUTPUT_DIR, f"{md5_hash}.ogg")
    
    if text == "No sound":
        result = subprocess.run(
            [FFMPEG, '-nostdin', '-v', 'error', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=mono',
             '-t', '0.5', '-c:a', 'libopus', '-b:a', OPUS_BITRATE, out_ogg],
            capture_output=True, text=True
        )
        if result.returncode != 0 or not os.path.exists(out_ogg) or os.path.getsize(out_ogg) == 0:
            print(f"  ERROR: silence generation failed for: {text}\n  {result.stderr.strip()}")
            if os.path.exists(out_ogg):
                os.remove(out_ogg)
            return None
        return f"./audio/{md5_hash}.ogg"

    tmp_mp3 = os.path.join(OUTPUT_DIR, f"{md5_hash}.tmp.mp3")
    legacy_mp3 = os.path.join(OUTPUT_DIR, f"{md5_hash}.mp3")

    tts = subprocess.run(
        # --text=... (not '--text', text): a phrase starting with '-' would
        # otherwise be parsed as an option by edge-tts's argparse.
        ['edge-tts', '--voice', VOICE, f'--text={text}', '--write-media', tmp_mp3],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )

    if tts.returncode != 0:
        # Transient failure (network, throttling) — no map entry, retried
        # on the next run.
        print(f"  ERROR: edge-tts failed for: {text}")
        if os.path.exists(tmp_mp3):
            os.remove(tmp_mp3)
        return None

    if not os.path.exists(tmp_mp3) or os.path.getsize(tmp_mp3) == 0:
        # edge-tts succeeded but produced no speech (unpronounceable token,
        # e.g. an isolated jamo cluster). Keep the documented empty-.mp3
        # convention so audits and the map stay consistent.
        print(f"  WARNING: edge-tts produced no audio for: {text}")
        if os.path.exists(tmp_mp3):
            os.remove(tmp_mp3)
        open(legacy_mp3, "a").close()
        return f"./audio/{md5_hash}.mp3"

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
        return None

    return f"./audio/{md5_hash}.ogg"

def generate_audio(phrases):
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    print(f"Found {len(phrases)} unique Korean phrases (including Jamo).")

    audio_map = load_existing_audio_map()

    # Work out what actually needs generating. Legacy .mp3 entries (edge-tts
    # produced empty audio for them, e.g. isolated jamo clusters) are kept
    # as-is rather than retried forever.
    todo = []
    for text in phrases:
        if not text:
            continue
        md5_hash = hashlib.md5(text.encode('utf-8')).hexdigest()
        existing = audio_map.get(text, "")
        if existing and os.path.exists(existing[2:] if existing.startswith("./") else existing):
            continue
        out_ogg = os.path.join(OUTPUT_DIR, f"{md5_hash}.ogg")
        if os.path.exists(out_ogg):
            audio_map[text] = f"./audio/{md5_hash}.ogg"
            continue
        todo.append((text, md5_hash))

    total = len(todo)
    print(f"{total} new phrases to generate.")

    if total and not shutil.which("edge-tts"):
        print("ERROR: edge-tts command not found.")
        todo = []
    if total and todo and not FFMPEG:
        print("ERROR: ffmpeg not found (install it or set the FFMPEG env var).")
        todo = []

    failures = 0
    if todo:
        workers = max(1, int(os.environ.get("TTS_WORKERS", "4")))
        print(f"Generating with {workers} parallel workers (set TTS_WORKERS to change).")
        with ThreadPoolExecutor(max_workers=workers) as pool:
            futures = {pool.submit(generate_one, text, md5): text for text, md5 in todo}
            done = 0
            for future in as_completed(futures):
                text = futures[future]
                try:
                    mapped = future.result()
                except Exception as e:
                    print(f"  ERROR: unexpected failure for: {text} ({e})")
                    mapped = None
                done += 1
                if mapped:
                    audio_map[text] = mapped
                else:
                    failures += 1
                if done % 200 == 0 or done == total:
                    print(f"[{done}/{total}] generated ({failures} failed)")

    if failures:
        print(f"WARNING: {failures} phrases failed — rerun the script to retry them.")

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
