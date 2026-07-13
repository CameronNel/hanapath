# The Intro Film Voice — credits & provenance

The first-run HanaPath intro film is narrated by **offline neural voices whose
models and training data are free to use**, sourced from GitHub and pinned by
commit + SHA-256 in `scripts/intro/generate_intro_narration.py`.

## The featured Korean voice

| | |
|---|---|
| **Voice** | Mimic 3 VITS `ko_KO/kss_low` |
| **Who is actually speaking** | A professional South Korean female voice actress, recorded for the **KSS (Korean Single Speaker) speech corpus** by Kyubyong Park (12,853 studio-quality read sentences) |
| **Model author** | Mycroft AI (Mimic 3 voice release) |
| **Source** | <https://github.com/MycroftAI/mimic3-voices> — `voices/ko_KO/kss_low` |
| **License** | **CC0 / public domain** (per the voice's bundled `LICENSE`; dataset: <https://www.kaggle.com/bryanpark/korean-single-speaker-speech-dataset>) |

She speaks every Korean line in the film (안녕하세요 · 한글 · 저는 한국어를
배워요 · 시작해 볼까요?) **and** all of the tappable Korean chips inside the
scenes (`audio/intro/chip_*.ogg`).

> **Why not an actual K-pop idol voice?** GitHub hosts plenty of RVC /
> GPT-SoVITS voice clones of real idols. Those models imitate real,
> identifiable people without their consent and carry no usable license, so
> they are deliberately **not** used here. The KSS voice is the legitimate
> version of that ask: a natural, young, professionally recorded Korean
> female voice that is genuinely free.

## The English narrator

| | |
|---|---|
| **Voice** | Mimic 3 VITS `en_US/ljspeech_low` |
| **Training data** | LJ Speech dataset (LibriVox recordings, public domain) |
| **Source** | <https://github.com/MycroftAI/mimic3-voices> — `voices/en_US/ljspeech_low` |
| **License** | Public domain (LibriVox) |

## How the audio is produced

`scripts/intro/generate_intro_narration.py` (run from the repo root):

1. downloads the two ONNX voices from the pinned mimic3-voices commit and
   verifies their SHA-256 (cached in `scripts/intro/.voices/`, git-ignored);
2. re-implements Mimic 3's text→phoneme→id pipeline (espeak-ng for Korean,
   gruut for English, `phonemes2ids` for id mapping — no Mimic 3 code is
   vendored) and runs the models with `onnxruntime`;
3. lays the lines onto a master timeline and derives **per-word timestamps**
   (line starts are sample-exact; words within a line are spread by phoneme
   weight) — this drives the lyric-style word highlighting in `app_intro.js`;
4. mixes a very quiet synthesized ambient pad + soft sub blooms under the
   voice and encodes everything to Opus in `audio/intro/`;
5. writes `app_intro_timeline.js` (`window.HANAPATH_APP_INTRO_CONFIG`), the
   plain browser global the film consumes — no build step, per repo rules.

Regenerate with:

```bash
apt install espeak-ng ffmpeg
pip install onnxruntime phonemes2ids espeak-phonemizer soundfile numpy
pip install "setuptools==59.8.0" wheel && pip install --no-build-isolation gruut gruut-lang-en
python3 scripts/intro/generate_intro_narration.py
```

Then bump `CACHE_NAME` in `sw.js` and the `?v=` of `app_intro_timeline.js` in
`index.html` + `sw.js` (the audio URLs are content-hashed automatically).

Note: this pipeline is intentionally separate from the app-wide
`generate_assets.py` / `audio_map.js` pipeline (edge-tts), which keeps owning
all lesson audio. See `.agents/AGENTS.md`.
