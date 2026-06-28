import os
import re
import csv
import hashlib
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Configuration
OUTPUT_DIR = "audio"
VOICE = "ko-KR-SunHiNeural"  # High quality, natural Korean neural voice

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

    # 2. Extract from app.js (Match any string literal containing Korean Jamo or Syllables)
    try:
        with open("app.js", "r", encoding="utf-8") as f:
            content = f.read()
            # Match strings in double or single quotes containing at least one Korean char (no newlines)
            matches_double = re.findall(r'"([^"\n\\]*(?:\\.[^"\n\\]*)*[가-힣ㄱ-ㅎㅏ-ㅣ]+[^"\n\\]*(?:\\.[^"\n\\]*)*)"', content)
            matches_single = re.findall(r"'([^'\n\\]*(?:\\.[^'\n\\]*)*[가-힣ㄱ-ㅎㅏ-ㅣ]+[^'\n\\]*(?:\\.[^'\n\\]*)*)'", content)
            
            for m in matches_double + matches_single:
                clean_m = m.replace('\\"', '"').replace("\\'", "'").strip()
                if clean_m:
                    phrases.add(clean_m)
                    
            # Also capture the previous crude regex for sentences not enclosed in standard quotes if any
            matches_sentences = re.findall(r'([가-힣][가-힣\s\.\?!,]+[가-힣\.\?!])', content)
            for m in matches_sentences:
                if m.strip():
                    phrases.add(m.strip())
                    
    except Exception as e:
        print("Could not read app.js:", e)
        
    return list(phrases)

def generate_audio(phrases):
    import json
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    total = len(phrases)
    print(f"Found {total} unique Korean phrases (including Jamo).")
    
    audio_map = {}
    
    for i, text in enumerate(phrases):
        if not text: continue
        
        md5_hash = hashlib.md5(text.encode('utf-8')).hexdigest()
        filename = f"{md5_hash}.mp3"
        out_mp3 = os.path.join(OUTPUT_DIR, filename)
        
        # Add to map
        audio_map[text] = f"./audio/{filename}"
        
        if os.path.exists(out_mp3):
            continue
            
        print(f"[{i+1}/{total}] Generating: {text}")
        
        try:
            subprocess.run(
                ['edge-tts', '--voice', VOICE, '--text', text, '--write-media', out_mp3],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL
            )
        except FileNotFoundError:
            print("ERROR: edge-tts command not found.")
            break

    # Write the audio_map.js file
    print("Writing audio_map.js...")
    with open("audio_map.js", "w", encoding="utf-8") as f:
        f.write("window.AUDIO_MAP = ")
        json.dump(audio_map, f, ensure_ascii=False, indent=2)
        f.write(";")

if __name__ == "__main__":
    print("Starting generation process using Microsoft Edge TTS...")
    phrases = extract_korean_text()
    generate_audio(phrases)
    print("Done! Check the 'audio' folder.")
