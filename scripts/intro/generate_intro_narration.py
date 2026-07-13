#!/usr/bin/env python3
"""Generate the HanaPath intro-film voiceover, lyric timeline, and chip clips.

THE VOICE (the "who is speaking" trace)
=======================================
Korean lines are spoken by the **KSS voice** — a professional South Korean
female voice actress recorded for the Korean Single Speaker (KSS) speech
corpus by Kyubyong Park, released **CC0 / public domain**. The neural voice
itself is the Mimic 3 VITS model `ko_KO/kss_low` trained and published by
Mycroft AI on GitHub:

    https://github.com/MycroftAI/mimic3-voices  (voices/ko_KO/kss_low, CC0)

English narration is the Mimic 3 VITS model `en_US/ljspeech_low`, trained on
the LJ Speech dataset (LibriVox recordings, public domain):

    https://github.com/MycroftAI/mimic3-voices  (voices/en_US/ljspeech_low)

We deliberately do NOT use cloned voices of real K-pop idols floating around
GitHub — those imitate real people without consent. The KSS voice is the
legitimately licensed "very natural young Korean female voice".

See docs/INTRO_VOICE.md for the full credits and licensing notes.

HOW IT WORKS
============
1. Downloads the two VITS ONNX voices (pinned commit + SHA-256 verified) into
   `scripts/intro/.voices/` (git-ignored; ~63 MB each).
2. Re-implements Mimic 3's text→phoneme→id pipeline (espeak-ng for Korean,
   gruut for English, phonemes2ids for id mapping) and runs the ONNX models
   with onnxruntime. No Mimic 3 code is vendored; only its published models.
3. Synthesizes each narration line separately, trims edge silence, matches
   loudness, and lays the lines onto a master timeline with breathing gaps.
4. Derives **per-word timestamps** for the lyric-style captions: line starts
   are sample-exact; words inside a line are distributed by phoneme weight
   (pauses are attributed to the preceding word). This is what app_intro.js
   uses to light words up in sync with the voice.
5. Mixes a very quiet synthesized ambient pad + soft sub "blooms" under the
   voice, then encodes the master to Opus (`audio/intro/intro_narration.ogg`).
6. Synthesizes small KSS clips for every tappable Korean element in the film
   (`audio/intro/chip_*.ogg`) so the intro stays interactive and fully
   self-voiced even before the main audio map loads.
7. Writes `app_intro_timeline.js` — a plain browser global consumed by
   app_intro.js (no build step, per repo rules).

DEPENDENCIES
============
    apt install espeak-ng ffmpeg
    pip install onnxruntime phonemes2ids espeak-phonemizer gruut gruut-lang-en \
                soundfile numpy
    # gruut needs a legacy build chain on Python 3.11+:
    #   pip install "setuptools==59.8.0" wheel && \
    #   pip install --no-build-isolation gruut gruut-lang-en

Run from the repo root:  python3 scripts/intro/generate_intro_narration.py
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import urllib.request
from pathlib import Path

import numpy as np

REPO_ROOT = Path(__file__).resolve().parents[2]
VOICES_DIR = Path(__file__).resolve().parent / ".voices"
OUT_AUDIO_DIR = REPO_ROOT / "audio" / "intro"
TIMELINE_JS = REPO_ROOT / "app_intro_timeline.js"

SAMPLE_RATE = 22050
MASTER_NAME = "intro_narration.ogg"

# Pinned source of the voices (MycroftAI/mimic3-voices @ master on 2026-07-13).
VOICES_COMMIT = "b239a9084e21fbaa7ac78ea6e31f5de1c31c8f42"
RAW_BASE = f"https://raw.githubusercontent.com/MycroftAI/mimic3-voices/{VOICES_COMMIT}/voices"
LFS_BASE = f"https://media.githubusercontent.com/media/MycroftAI/mimic3-voices/{VOICES_COMMIT}/voices"

VOICE_SPECS = {
    "ko": {
        "path": "ko_KO/kss_low",
        "onnx_sha256": "9198b939b5b713c7b59e7ba28163ed2546dc49691fea82c6614dc0b8d5612c51",
        # Slightly slower than neutral: clearer for learners hearing Korean
        # for the first time, and closer to the measured pace of the app's
        # existing curated audio.
        "length_scale": 1.12,
    },
    "en": {
        "path": "en_US/ljspeech_low",
        "onnx_sha256": "d178e03b43b41da49f337626a7024826e79fe7deb7db102a5deedb027f9caa37",
        "length_scale": 1.06,
    },
}

# ---------------------------------------------------------------------------
# The narration script. The English caption words are IDENTICAL to the film's
# on-screen captions (do not reword them without updating app_intro.js).
# `gap_before` is silence inserted before a line, in seconds.
# The mantra scene is split into three one-word lines so each word lands as
# its own beat.
# ---------------------------------------------------------------------------
SCENES = [
    {
        "id": "wall",
        "lines": [
            {"lang": "ko", "text": "안녕하세요!", "gap_before": 0.45, "bloom": True},
            {"lang": "en", "text": "Korean can feel like a wall of unfamiliar sounds and symbols.", "gap_before": 0.55},
        ],
    },
    {
        "id": "hangul",
        "lines": [
            {"lang": "en", "text": "But every language has a way in. Start with Hangul — the beautifully structured alphabet behind every Korean word.", "gap_before": 0.95},
            {"lang": "ko", "text": "한글!", "gap_before": 0.4, "bloom": True},
        ],
    },
    {
        "id": "words",
        "lines": [
            {"lang": "en", "text": "Build vocabulary you can recognise, hear, and remember.", "gap_before": 0.95},
        ],
    },
    {
        "id": "sentences",
        "lines": [
            {"lang": "en", "text": "Then bring those words together, until real Korean sentences begin to make sense.", "gap_before": 0.95},
            {"lang": "ko", "text": "저는 한국어를 배워요.", "gap_before": 0.45},
        ],
    },
    {
        "id": "system",
        "lines": [
            {"lang": "en", "text": "HanaPath guides you forward with focused lessons, intelligent review, and a clear view of your progress.", "gap_before": 0.95},
        ],
    },
    {
        "id": "mantra",
        "lines": [
            {"lang": "en", "text": "Learn.", "gap_before": 0.9, "length_scale": 1.3, "bloom": True},
            {"lang": "en", "text": "Practice.", "gap_before": 0.55, "length_scale": 1.3, "bloom": True},
            {"lang": "en", "text": "Progress.", "gap_before": 0.55, "length_scale": 1.3, "bloom": True},
        ],
    },
    {
        "id": "possible",
        "lines": [
            {"lang": "en", "text": "One step at a time, Korean stops looking foreign — and starts feeling possible.", "gap_before": 0.95},
        ],
    },
    {
        "id": "welcome",
        "lines": [
            {"lang": "en", "text": "Welcome to HanaPath. Your path starts here.", "gap_before": 1.0, "bloom": True},
            {"lang": "ko", "text": "시작해 볼까요?", "gap_before": 0.45},
        ],
    },
]

# Trailing breathing room after the last line, in seconds.
OUTRO_TAIL = 2.4

# Korean strings spoken when the learner taps elements inside the film.
# Keep in sync with the data-intro-say attributes in app_intro.js.
CHIP_TEXTS = [
    "안녕하세요", "괜찮아요", "한국어", "사랑", "배우다", "오늘", "문장", "기억",
    "한국", "말하다", "시작",
    "한글",
    "사람", "물", "먹다", "가다", "가요", "갔어요",
    "저는", "한국어를", "배워요",
    "저는 한국어를 배워요.",
    "한", "국", "어", "를", "배", "워", "요",
    "시작해 볼까요?",
    "하나",
]


# ---------------------------------------------------------------------------
# Voice download + loading
# ---------------------------------------------------------------------------

def fetch(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    print(f"  downloading {url}")
    with urllib.request.urlopen(url, timeout=180) as response, open(dest, "wb") as fh:
        shutil.copyfileobj(response, fh)


def ensure_voice(spec: dict) -> Path:
    vdir = VOICES_DIR / spec["path"]
    onnx = vdir / "generator.onnx"
    if not onnx.exists():
        for name in ("config.json", "phonemes.txt", "phoneme_map.txt", "LICENSE", "SOURCE"):
            try:
                fetch(f"{RAW_BASE}/{spec['path']}/{name}", vdir / name)
            except Exception:
                # phoneme_map.txt does not exist for every voice.
                if name in ("config.json", "phonemes.txt"):
                    raise
        fetch(f"{LFS_BASE}/{spec['path']}/generator.onnx", onnx)
    digest = hashlib.sha256(onnx.read_bytes()).hexdigest()
    if digest != spec["onnx_sha256"]:
        onnx.unlink()
        raise RuntimeError(f"SHA-256 mismatch for {onnx}: {digest}")
    return vdir


class Voice:
    def __init__(self, lang: str, spec: dict):
        import onnxruntime
        import phonemes2ids

        self.lang = lang
        self.spec = spec
        vdir = ensure_voice(spec)
        self.config = json.loads((vdir / "config.json").read_text(encoding="utf-8"))
        with open(vdir / "phonemes.txt", encoding="utf-8") as fh:
            self.phoneme_to_id = phonemes2ids.load_phoneme_ids(fh)
        self.phoneme_map = None
        pmap = vdir / "phoneme_map.txt"
        if pmap.exists():
            with open(pmap, encoding="utf-8") as fh:
                self.phoneme_map = phonemes2ids.utils.load_phoneme_map(fh)
        options = onnxruntime.SessionOptions()
        options.use_deterministic_compute = True
        self.session = onnxruntime.InferenceSession(
            str(vdir / "generator.onnx"), sess_options=options,
            providers=["CPUExecutionProvider"],
        )

    # -- text → per-word phonemes -------------------------------------------------
    def word_phonemes(self, text: str) -> list[list[str]]:
        auto_append = (self.config.get("inference") or {}).get("auto_append_text") or ""
        if auto_append and not text.rstrip().endswith((".", "!", "?")):
            text = text + auto_append
        if self.config["phonemizer"] == "espeak":
            return self._espeak_word_phonemes(text)
        return self._gruut_word_phonemes(text)

    def _espeak_word_phonemes(self, text: str) -> list[list[str]]:
        import espeak_phonemizer
        from gruut_ipa import IPA

        if not hasattr(self, "_espeak"):
            self._espeak = espeak_phonemizer.Phonemizer()
        word_sep = self.config["phonemes"]["word_separator"]
        voice = self.config["text_language"].split("_")[0]
        phoneme_str = self._espeak.phonemize(
            text, voice=voice, keep_clause_breakers=True,
            phoneme_separator="", word_separator=word_sep,
            punctuation_separator="",
        )
        return [list(IPA.graphemes(w)) for w in phoneme_str.split(word_sep) if w]

    def _gruut_word_phonemes(self, text: str) -> list[list[str]]:
        import gruut

        words: list[list[str]] = []
        for sentence in gruut.sentences(text, lang=self.config["text_language"]):
            for word in sentence:
                if word.phonemes:
                    words.append(list(word.phonemes))
        return words

    # -- phonemes → ids -----------------------------------------------------------
    def to_ids(self, word_phonemes: list[list[str]]) -> list[int]:
        import phonemes2ids

        p = self.config["phonemes"]
        missing: list[str] = []
        ids = phonemes2ids.phonemes2ids(
            word_phonemes=word_phonemes,
            phoneme_to_id=self.phoneme_to_id,
            pad=p["pad"], bos=p["bos"], eos=p["eos"],
            auto_bos_eos=p.get("auto_bos_eos", False),
            blank=p["blank"], blank_word=p["blank_word"],
            blank_between=p["blank_between"],
            blank_at_start=p["blank_at_start"], blank_at_end=p["blank_at_end"],
            simple_punctuation=p["simple_punctuation"],
            punctuation_map=p.get("punctuation_map"),
            separate=p.get("separate"),
            separate_graphemes=p.get("separate_graphemes", False),
            separate_tones=p.get("separate_tones", False),
            tone_before=p.get("tone_before", False),
            phoneme_map=self.phoneme_map,
            missing_func=lambda ph: missing.append(ph) or [],
        )
        if missing:
            raise RuntimeError(f"{self.lang}: phonemes missing from inventory: {missing!r}")
        return ids

    # -- ids → waveform -----------------------------------------------------------
    def synthesize(self, text: str, length_scale: float | None = None):
        word_phonemes = self.word_phonemes(text)
        ids = self.to_ids(word_phonemes)
        scales = np.array(
            [0.55, length_scale or self.spec["length_scale"], 0.72],
            dtype=np.float32,
        )  # [noise, length, noise_w] — slightly calmer than Mimic 3 defaults
        audio = self.session.run(None, {
            "input": np.array([ids], dtype=np.int64),
            "input_lengths": np.array([len(ids)], dtype=np.int64),
            "scales": scales,
        })[0].squeeze()
        return np.asarray(audio, dtype=np.float32), word_phonemes


# ---------------------------------------------------------------------------
# Audio helpers
# ---------------------------------------------------------------------------

def trim_silence(audio: np.ndarray, threshold_ratio: float = 0.02,
                 head_keep: float = 0.03, tail_keep: float = 0.06) -> np.ndarray:
    peak = float(np.abs(audio).max()) or 1.0
    above = np.flatnonzero(np.abs(audio) > peak * threshold_ratio)
    if above.size == 0:
        return audio
    start = max(0, int(above[0] - head_keep * SAMPLE_RATE))
    end = min(len(audio), int(above[-1] + tail_keep * SAMPLE_RATE))
    return audio[start:end]


def match_loudness(audio: np.ndarray, target_rms: float = 0.062,
                   peak_ceiling: float = 0.88) -> np.ndarray:
    rms = float(np.sqrt(np.mean(np.square(audio)))) or 1e-9
    gain = target_rms / rms
    peak = float(np.abs(audio).max()) or 1e-9
    gain = min(gain, peak_ceiling / peak)
    return audio * gain


def word_weights(display_words: list[str],
                 word_phonemes: list[list[str]]) -> list[float]:
    """Distribute a line's phoneme mass over its display words.

    Korean (espeak path): phoneme words map 1:1 onto whitespace tokens with
    punctuation attached. English (gruut path): punctuation becomes its own
    phoneme "word" (| minor break, ‖ major break); its pause is credited to a
    following silent display token (like the em-dash) when there is one,
    otherwise to the preceding word so highlights hold through commas and
    full stops.
    """
    breaks = {"|": 3.0, "‖": 6.0, ",": 3.0, ".": 6.0, ";": 4.0, "!": 6.0, "?": 6.0}

    def is_silent(token: str) -> bool:
        return not re.search(r"[0-9A-Za-z가-힣ㄱ-ㆎ]", token)

    weights = [0.0] * len(display_words)
    pos = -1  # index of the display word last given weight
    for phonemes in word_phonemes:
        joined = "".join(phonemes)
        if joined and all(ch in breaks for ch in joined):
            weight = sum(breaks[ch] for ch in joined)
            if pos + 1 < len(display_words) and is_silent(display_words[pos + 1]):
                pos += 1
                weights[pos] += weight
            elif pos >= 0:
                weights[pos] += weight
            continue
        target = pos + 1
        while target < len(display_words) and is_silent(display_words[target]):
            weights[target] = max(weights[target], 1.0)
            target += 1
        pos = min(target, len(display_words) - 1)
        weights[pos] += float(len(phonemes))
    for i, weight in enumerate(weights):
        if weight <= 0:
            weights[i] = 2.0  # degenerate fallback, keeps timings monotonic
    return weights


def make_music_bed(total_samples: int, blooms_ms: list[int]) -> np.ndarray:
    """A very quiet ambient pad + soft sub blooms. Texture, not a song."""
    t = np.arange(total_samples, dtype=np.float32) / SAMPLE_RATE
    pad = np.zeros(total_samples, dtype=np.float32)
    # A warm A-add9 spread; detuned pairs give slow chorus movement.
    for freq, level, lfo_hz, lfo_phase in (
        (110.00, 0.32, 0.037, 0.0),   # A2
        (110.35, 0.30, 0.031, 1.7),
        (164.81, 0.22, 0.023, 0.8),   # E3
        (165.20, 0.20, 0.029, 2.6),
        (220.00, 0.16, 0.019, 1.2),   # A3
        (246.94, 0.11, 0.026, 0.4),   # B3 (the add9 shimmer)
        (329.63, 0.07, 0.021, 2.1),   # E4
    ):
        lfo = 0.62 + 0.38 * np.sin(2 * np.pi * lfo_hz * t + lfo_phase)
        pad += level * lfo * np.sin(2 * np.pi * freq * t)
    # One-pole low-pass to soften everything.
    alpha = 0.16
    filtered = np.empty_like(pad)
    acc = 0.0
    for i in range(len(pad)):
        acc += alpha * (pad[i] - acc)
        filtered[i] = acc
    pad = filtered
    pad *= 0.030 / (np.abs(pad).max() or 1.0)
    # Global fade in / out.
    fade_in = min(int(2.6 * SAMPLE_RATE), total_samples)
    fade_out = min(int(3.2 * SAMPLE_RATE), total_samples)
    pad[:fade_in] *= np.linspace(0.0, 1.0, fade_in, dtype=np.float32)
    pad[-fade_out:] *= np.linspace(1.0, 0.0, fade_out, dtype=np.float32)
    # Soft sub blooms on key beats (55 Hz sine with exponential decay).
    for ms in blooms_ms:
        start = int(ms / 1000 * SAMPLE_RATE)
        dur = int(1.15 * SAMPLE_RATE)
        end = min(total_samples, start + dur)
        if start >= total_samples:
            continue
        n = end - start
        tt = np.arange(n, dtype=np.float32) / SAMPLE_RATE
        bloom = 0.055 * np.exp(-3.4 * tt) * np.sin(2 * np.pi * 55.0 * tt)
        pad[start:end] += bloom.astype(np.float32)
    return pad


def encode_opus(wav_path: Path, ogg_path: Path, bitrate: str) -> None:
    ffmpeg = os.environ.get("FFMPEG") or shutil.which("ffmpeg")
    if not ffmpeg:
        raise RuntimeError("ffmpeg not found (install it or set FFMPEG)")
    result = subprocess.run(
        [ffmpeg, "-nostdin", "-v", "error", "-y", "-i", str(wav_path),
         "-c:a", "libopus", "-b:a", bitrate, "-ac", "1", str(ogg_path)],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        raise RuntimeError(f"opus encode failed: {result.stderr.strip()}")


# ---------------------------------------------------------------------------
# Main build
# ---------------------------------------------------------------------------

def main() -> None:
    import soundfile as sf

    OUT_AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    voices = {lang: Voice(lang, spec) for lang, spec in VOICE_SPECS.items()}

    print("Synthesizing narration lines…")
    cursor = 0  # samples
    segments: list[tuple[int, np.ndarray]] = []
    timeline_scenes = []
    blooms_ms: list[int] = []

    for scene in SCENES:
        scene_lines = []
        for line in scene["lines"]:
            voice = voices[line["lang"]]
            audio, word_phonemes = voice.synthesize(
                line["text"], line.get("length_scale"))
            audio = match_loudness(trim_silence(audio))
            cursor += int(line.get("gap_before", 0.6) * SAMPLE_RATE)
            display_words = line["text"].split()
            weights = word_weights(display_words, word_phonemes)
            total_weight = sum(weights)
            duration_ms = int(len(audio) / SAMPLE_RATE * 1000)
            start_ms = int(cursor / SAMPLE_RATE * 1000)
            words = []
            acc = 0.0
            for word, weight in zip(display_words, weights):
                t = int(start_ms + acc / total_weight * duration_ms)
                d = int(weight / total_weight * duration_ms)
                words.append({"w": word, "t": t, "d": d})
                acc += weight
            if line.get("bloom"):
                blooms_ms.append(start_ms)
            segments.append((cursor, audio))
            scene_lines.append({
                "lang": line["lang"],
                "text": line["text"],
                "start": start_ms,
                "duration": duration_ms,
                "words": words,
            })
            cursor += len(audio)
            print(f"  [{scene['id']}] {line['lang']} {duration_ms/1000:.2f}s  {line['text'][:58]}")
        timeline_scenes.append({"id": scene["id"], "lines": scene_lines})

    total_samples = cursor + int(OUTRO_TAIL * SAMPLE_RATE)

    # Scene boundaries: each scene starts a beat before its first line.
    SCENE_LEAD_MS = 620
    for i, scene in enumerate(timeline_scenes):
        first = scene["lines"][0]["start"]
        scene["start"] = max(0, first - SCENE_LEAD_MS) if i else 0
    total_ms = int(total_samples / SAMPLE_RATE * 1000)
    for i, scene in enumerate(timeline_scenes):
        next_start = timeline_scenes[i + 1]["start"] if i + 1 < len(timeline_scenes) else total_ms
        scene["duration"] = next_start - scene["start"]

    print("Mixing master track…")
    master = make_music_bed(total_samples, blooms_ms)
    for start, audio in segments:
        master[start:start + len(audio)] += audio
    peak = float(np.abs(master).max())
    if peak > 0.97:
        master *= 0.97 / peak

    wav_tmp = OUT_AUDIO_DIR / "intro_narration.tmp.wav"
    sf.write(wav_tmp, master, SAMPLE_RATE)
    master_path = OUT_AUDIO_DIR / MASTER_NAME
    encode_opus(wav_tmp, master_path, "32k")
    wav_tmp.unlink()
    print(f"  {master_path}  ({total_ms/1000:.1f}s)")

    def hashed(path: Path) -> str:
        # Content-hashed query string so the service worker's runtime audio
        # cache can never serve a stale track after regeneration.
        digest = hashlib.md5(path.read_bytes()).hexdigest()[:8]
        return f"./{path.relative_to(REPO_ROOT).as_posix()}?v={digest}"

    print("Synthesizing interactive chip clips (KSS voice)…")
    chips = {}
    for text in CHIP_TEXTS:
        audio, _ = voices["ko"].synthesize(text)
        audio = match_loudness(trim_silence(audio), target_rms=0.07)
        digest = hashlib.md5(text.encode("utf-8")).hexdigest()[:10]
        name = f"chip_{digest}.ogg"
        sf.write(wav_tmp, audio, SAMPLE_RATE)
        encode_opus(wav_tmp, OUT_AUDIO_DIR / name, "24k")
        chips[text] = {
            "src": hashed(OUT_AUDIO_DIR / name),
            "ms": int(len(audio) / SAMPLE_RATE * 1000),
        }
    wav_tmp.unlink(missing_ok=True)
    print(f"  {len(chips)} chips")

    config = {
        "version": 2,
        "generated": "scripts/intro/generate_intro_narration.py",
        "audioSrc": hashed(master_path),
        "duration": total_ms,
        "voice": {
            "korean": "Mimic 3 VITS ko_KO/kss_low — KSS corpus (Kyubyong Park), CC0",
            "english": "Mimic 3 VITS en_US/ljspeech_low — LJ Speech, public domain",
            "source": f"https://github.com/MycroftAI/mimic3-voices @ {VOICES_COMMIT[:12]}",
        },
        "scenes": timeline_scenes,
        "chips": chips,
    }
    header = (
        "// Generated by scripts/intro/generate_intro_narration.py — do not edit by hand.\n"
        "// Voiceover: Mimic 3 VITS voices from https://github.com/MycroftAI/mimic3-voices\n"
        "//   Korean:  ko_KO/kss_low  (KSS corpus — professional Korean voice actress, CC0)\n"
        "//   English: en_US/ljspeech_low  (LJ Speech — public domain)\n"
        "// Full credits: docs/INTRO_VOICE.md\n"
    )
    TIMELINE_JS.write_text(
        header + "window.HANAPATH_APP_INTRO_CONFIG = "
        + json.dumps(config, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote {TIMELINE_JS}")
    print("Done.")


if __name__ == "__main__":
    main()
