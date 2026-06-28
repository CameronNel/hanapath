# Offline Audio Generation System

This project uses a custom, offline audio generation pipeline to ensure high-quality, royalty-free Korean speech without relying entirely on robotic browser TTS (`window.speechSynthesis`).

**CRITICAL RULES FOR ALL AGENTS:**

1. **How the Audio System Works**:
   - The app stores generated `.mp3` files in the `audio/` directory.
   - The mapping between Korean text strings (including single Jamo letters, words, and full sentences) and their respective `.mp3` files is stored in `audio_map.js` as a global dictionary: `window.AUDIO_MAP`.
   - The `speak(text)` function in `app.js` first looks up `window.AUDIO_MAP[text]`. If an exact match is found, it plays the `.mp3`. If it misses, it falls back to `window.speechSynthesis`.

2. **When Adding New Vocabulary / Text**:
   - If you add new Korean words, sentences, or characters to `korean_5000_claude_ready.csv` or anywhere inside `app.js`, **you MUST regenerate the audio assets**.
   
3. **How to Regenerate Assets**:
   - Run the Python script: `python generate_assets.py`
   - The script is smart: it uses `edge-tts` to generate neural TTS *only* for the brand new phrases. It skips existing phrases instantly.
   - Once finished, the script automatically rewrites `audio_map.js` to include the new mappings.
   - Do NOT try to manually edit `audio_map.js`.

4. **Never Break the Map**:
   - Do NOT change the `speak()` function to rely purely on `md5` hashing on the fly or robotic TTS.
   - If you need to debug missing audio, verify that the string passed to `speak(text)` exactly matches a key in `window.AUDIO_MAP`. Whitespace is stripped via `.trim()`.
