"""Generate HanaPath's explicit learner-facing Korean audio manifest.

The authoritative manifest is built by scripts/audit-audio-coverage.mjs from
runtime data sources, including generated syllables, words/examples, sentence
voice fields and tokens, CSV vocabulary, and alphabet/drill data. Do not add a
regex that scrapes arbitrary Korean-looking JavaScript literals here: that was
the source of stale English/code fragments in audio_map.js.

Backends
========
Edge TTS remains the default for compatibility. ``--backend mimic3`` uses the
pinned, CC0 KSS Korean voice and synthesis helpers from
scripts/intro/generate_intro_narration.py. Mimic3 synthesis is completely local:
text and the KSS model never leave the machine, and the generator refuses to
download a missing model while in this backend.
"""

import argparse
import hashlib
import importlib.util
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import threading
import wave
from concurrent.futures import ThreadPoolExecutor, as_completed


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

ROOT = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(ROOT, "audio")
AUDIO_MAP_FILE = os.path.join(ROOT, "audio_map.js")
MANIFEST_SCRIPT = os.path.join(ROOT, "scripts", "audit-audio-coverage.mjs")
INTRO_VOICE_SCRIPT = os.path.join(ROOT, "scripts", "intro", "generate_intro_narration.py")

VOICE = "ko-KR-SunHiNeural"
OPUS_BITRATE = "24k"
DOCUMENTED_SILENT_KEYS = frozenset({"No sound"})

# Kept here as a defensive assertion as well as in the manifest exporter. The
# map key remains decomposed, while Edge TTS receives the pronounceable value.
SPEECH_OVERRIDES = {
    "ᄒᄒ": "흐흐",
    "ᅲᅲ": "유유",
    "ᄏᄏ": "크크",
}

EDGE_TTS_COMMAND = None
FFMPEG = None

MIMIC3_MODULE = None
MIMIC3_VOICE = None
MIMIC3_MODULE_LOCK = threading.Lock()
MIMIC3_VOICE_INIT_LOCK = threading.Lock()
# Voice.synthesize() owns a cached espeak phonemizer and an ONNX session. A
# single locked voice keeps both safe while worker threads encode prior clips
# with ffmpeg in parallel, without loading one 63 MB model per worker.
MIMIC3_SYNTH_LOCK = threading.Lock()
MIMIC3_MODEL_LOCK = threading.Lock()
MIMIC3_VERIFIED_MODELS = {}

MIMIC3_DEPENDENCY_GUIDANCE = """
Offline Mimic3 dependency setup
-------------------------------

Required Python packages:
  numpy onnxruntime phonemes2ids gruut-ipa espeak-phonemizer-windows imageio-ffmpeg

Linux may use espeak-phonemizer with the system `espeak-ng` package instead.
The eSpeak installation must include Korean language data (`lang/ko`). Set
PYTHONPATH when packages were installed into a separate target directory.

The pinned KSS model must already exist at:
  scripts/intro/.voices/ko_KO/kss_low/
with generator.onnx, config.json, phonemes.txt, LICENSE, and SOURCE. The offline
backend verifies the pinned SHA-256 and never downloads a missing model.

Examples:
  python generate_assets.py --backend mimic3 --smoke-key 안녕하세요
  python generate_assets.py --backend mimic3
""".strip()


def resolve_edge_tts_command():
    """Prefer an executable, then edge_tts installed in this Python runtime."""
    configured = str(os.environ.get("EDGE_TTS") or "").strip().strip('"')
    if configured:
        return [os.path.expanduser(os.path.expandvars(configured))]

    executable = shutil.which("edge-tts")
    if executable:
        return [executable]

    if importlib.util.find_spec("edge_tts") is not None:
        return [sys.executable, "-m", "edge_tts"]
    return None


def resolve_ffmpeg():
    """Find ffmpeg on PATH or use imageio-ffmpeg bundled with this Python."""
    configured = str(os.environ.get("FFMPEG") or "").strip().strip('"')
    if configured:
        return os.path.expanduser(os.path.expandvars(configured))

    executable = shutil.which("ffmpeg")
    if executable:
        return executable

    try:
        import imageio_ffmpeg

        executable = imageio_ffmpeg.get_ffmpeg_exe()
        if executable and os.path.isfile(executable):
            return executable
    except (AttributeError, ImportError, OSError, RuntimeError):
        pass
    return None


def _offline_mimic3_voice_dir(module, voice_spec):
    """Return a verified local voice directory without invoking any downloader."""
    model_key = str(voice_spec.get("path") or "")
    if not model_key:
        raise RuntimeError("pinned Mimic3 voice spec has no path")

    with MIMIC3_MODEL_LOCK:
        cached = MIMIC3_VERIFIED_MODELS.get(model_key)
        if cached is not None:
            return cached

        voice_dir = module.VOICES_DIR / model_key
        required = ["generator.onnx", "config.json", "phonemes.txt", "LICENSE", "SOURCE"]
        missing = [name for name in required if not (voice_dir / name).is_file()]
        if missing:
            raise RuntimeError(
                f"offline KSS model is incomplete at {voice_dir}: missing {', '.join(missing)}"
            )

        onnx_path = voice_dir / "generator.onnx"
        digest = hashlib.sha256(onnx_path.read_bytes()).hexdigest()
        expected = str(voice_spec.get("onnx_sha256") or "")
        if not expected or digest != expected:
            raise RuntimeError(
                f"pinned KSS model SHA-256 mismatch for {onnx_path}: "
                f"expected {expected or '(missing)'}, got {digest}"
            )

        MIMIC3_VERIFIED_MODELS[model_key] = voice_dir
        return voice_dir


def load_mimic3_voice_module():
    """Load the pinned intro Voice implementation and force it into offline mode."""
    global MIMIC3_MODULE
    if MIMIC3_MODULE is not None:
        return MIMIC3_MODULE

    with MIMIC3_MODULE_LOCK:
        if MIMIC3_MODULE is not None:
            return MIMIC3_MODULE
        if not os.path.isfile(INTRO_VOICE_SCRIPT):
            raise RuntimeError(f"Mimic3 Voice helper is missing: {INTRO_VOICE_SCRIPT}")

        module_name = "hanapath_intro_voice_offline"
        module_spec = importlib.util.spec_from_file_location(module_name, INTRO_VOICE_SCRIPT)
        if module_spec is None or module_spec.loader is None:
            raise RuntimeError(f"could not load Mimic3 Voice helper: {INTRO_VOICE_SCRIPT}")

        module = importlib.util.module_from_spec(module_spec)
        sys.modules[module_name] = module
        try:
            module_spec.loader.exec_module(module)
        except Exception:
            sys.modules.pop(module_name, None)
            raise

        # Voice.__init__ normally calls ensure_voice(), which may download a
        # missing model. Replace both network entry points before constructing
        # any Voice so --backend mimic3 is guaranteed local-only.
        def offline_fetch(*_args, **_kwargs):
            raise RuntimeError("network download is disabled for --backend mimic3")

        module.fetch = offline_fetch
        module.ensure_voice = lambda voice_spec: _offline_mimic3_voice_dir(module, voice_spec)
        MIMIC3_MODULE = module
        return module


def get_mimic3_voice():
    """Construct the shared pinned KSS voice once, failing before a large run."""
    global MIMIC3_VOICE
    if MIMIC3_VOICE is not None:
        return MIMIC3_VOICE

    with MIMIC3_VOICE_INIT_LOCK:
        if MIMIC3_VOICE is not None:
            return MIMIC3_VOICE
        try:
            module = load_mimic3_voice_module()
            voice_spec = module.VOICE_SPECS["ko"]
            # Verify model/provenance before ONNX session construction.
            _offline_mimic3_voice_dir(module, voice_spec)
            MIMIC3_VOICE = module.Voice("ko", voice_spec)
        except Exception as error:
            raise RuntimeError(f"{error}\n\n{MIMIC3_DEPENDENCY_GUIDANCE}") from error
        return MIMIC3_VOICE


def _validate_mimic3_audio(module, audio, key):
    """Reject empty, silent, non-finite, or non-mono synthesis output."""
    array = module.np.asarray(audio, dtype=module.np.float32)
    if array.ndim != 1:
        array = array.squeeze()
    if array.ndim != 1 or array.size == 0:
        raise RuntimeError(f"Mimic3 returned empty/non-mono audio for {key!r}")
    if not bool(module.np.isfinite(array).all()):
        raise RuntimeError(f"Mimic3 returned non-finite samples for {key!r}")
    peak = float(module.np.abs(array).max())
    if peak <= 1e-6:
        raise RuntimeError(f"Mimic3 returned silent audio for {key!r}")
    return array


def has_pcm_wav(file_path):
    """Validate the temporary synthesis file before giving it to ffmpeg."""
    try:
        if not os.path.isfile(file_path) or os.path.getsize(file_path) <= 44:
            return False
        with wave.open(file_path, "rb") as wav_file:
            return (
                wav_file.getnchannels() == 1
                and wav_file.getsampwidth() == 2
                and wav_file.getframerate() > 0
                and wav_file.getnframes() > 0
                and wav_file.getcomptype() == "NONE"
            )
    except (OSError, EOFError, wave.Error):
        return False


def synthesize_mimic3_wav(key, speech_text, wav_path):
    """Synthesize one local KSS clip into a validated 16-bit PCM WAV."""
    module = load_mimic3_voice_module()
    voice = get_mimic3_voice()
    with MIMIC3_SYNTH_LOCK:
        audio, _word_phonemes = voice.synthesize(speech_text)

    audio = _validate_mimic3_audio(module, audio, key)
    audio = module.trim_silence(audio)
    audio = module.match_loudness(audio, target_rms=0.07)
    audio = _validate_mimic3_audio(module, audio, key)

    clipped = module.np.clip(audio, -1.0, 1.0)
    pcm = module.np.rint(clipped * 32767.0).astype("<i2", copy=False)
    with wave.open(wav_path, "wb") as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(int(module.SAMPLE_RATE))
        wav_file.writeframes(pcm.tobytes())

    if not has_pcm_wav(wav_path):
        remove_if_present(wav_path)
        raise RuntimeError(f"Mimic3 produced malformed PCM WAV for {key!r}")
    return pcm.size, int(module.SAMPLE_RATE)


def build_learner_audio_manifest():
    """Ask the canonical Node manifest builder for deterministic key/speech rows."""
    node = str(os.environ.get("NODE") or "").strip().strip('"') or shutil.which("node")
    if not node:
        raise RuntimeError("node is required to build the learner-facing audio manifest")

    result = subprocess.run(
        [node, MANIFEST_SCRIPT, "--manifest-json"],
        cwd=ROOT,
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    if result.returncode != 0:
        detail = result.stderr.strip() or result.stdout.strip() or f"exit {result.returncode}"
        raise RuntimeError(f"audio manifest builder failed: {detail}")

    try:
        payload = json.loads(result.stdout)
    except json.JSONDecodeError as error:
        raise RuntimeError(f"audio manifest builder returned invalid JSON: {error}") from error

    if payload.get("version") != 1 or not isinstance(payload.get("entries"), list):
        raise RuntimeError("audio manifest builder returned an unsupported payload")

    entries = []
    seen = set()
    for row in payload["entries"]:
        key = str(row.get("key") or "").strip()
        speech_text = str(row.get("speechText") or "").strip()
        if not key or not speech_text:
            raise RuntimeError(f"audio manifest contains an empty key/speech row: {row!r}")
        if key in seen:
            raise RuntimeError(f"audio manifest contains duplicate key: {key!r}")
        expected_override = SPEECH_OVERRIDES.get(key)
        if expected_override and speech_text != expected_override:
            raise RuntimeError(
                f"audio manifest override drift for {key!r}: expected {expected_override!r}, got {speech_text!r}"
            )
        seen.add(key)
        entries.append({
            "key": key,
            "speechText": speech_text,
            "categories": list(row.get("categories") or []),
        })
    return entries


def has_audio_signature(file_path):
    """Accept only the Ogg/MP3 containers the browser audio map supports."""
    try:
        if not os.path.isfile(file_path) or os.path.getsize(file_path) <= 0:
            return False
        with open(file_path, "rb") as handle:
            header = handle.read(12)
    except OSError:
        return False

    extension = os.path.splitext(file_path)[1].lower()
    if extension == ".ogg":
        return header.startswith(b"OggS")
    if extension == ".mp3":
        return header.startswith(b"ID3") or (
            len(header) >= 2 and header[0] == 0xFF and header[1] & 0xE0 == 0xE0
        )
    return False


def remove_if_present(file_path):
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
    except OSError:
        pass


def map_path_to_file(mapped_path):
    if not isinstance(mapped_path, str) or not mapped_path.startswith("./audio/"):
        return None
    candidate = os.path.abspath(os.path.join(ROOT, mapped_path[2:]))
    try:
        if os.path.commonpath([OUTPUT_DIR, candidate]) != os.path.commonpath([OUTPUT_DIR]):
            return None
    except ValueError:
        return None
    return candidate


def encode_opus(source_path, out_ogg):
    """Encode a validated MP3/PCM WAV source with the configured ffmpeg."""
    return subprocess.run(
        [
            FFMPEG,
            "-nostdin",
            "-v",
            "error",
            "-y",
            "-i",
            source_path,
            "-c:a",
            "libopus",
            "-b:a",
            OPUS_BITRATE,
            "-ac",
            "1",
            out_ogg,
        ],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )


def generate_one(key, speech_text, md5_hash, backend="edge", output_dir=None):
    """Generate one non-empty local asset and return its AUDIO_MAP value."""
    output_dir = output_dir or OUTPUT_DIR
    os.makedirs(output_dir, exist_ok=True)
    out_ogg = os.path.join(output_dir, f"{md5_hash}.ogg")

    if key in DOCUMENTED_SILENT_KEYS:
        result = subprocess.run(
            [
                FFMPEG,
                "-nostdin",
                "-v",
                "error",
                "-y",
                "-f",
                "lavfi",
                "-i",
                "anullsrc=r=48000:cl=mono",
                "-t",
                "0.5",
                "-c:a",
                "libopus",
                "-b:a",
                OPUS_BITRATE,
                out_ogg,
            ],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        if result.returncode != 0 or not has_audio_signature(out_ogg):
            print(f"  ERROR: silence generation failed for {key!r}: {result.stderr.strip()}")
            remove_if_present(out_ogg)
            return None
        return f"./audio/{md5_hash}.ogg"

    if backend == "edge":
        tmp_source = os.path.join(output_dir, f"{md5_hash}.tmp.mp3")
        remove_if_present(tmp_source)
        tts = subprocess.run(
            EDGE_TTS_COMMAND
            + ["--voice", VOICE, f"--text={speech_text}", "--write-media", tmp_source],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        if tts.returncode != 0:
            print(f"  ERROR: edge-tts failed for {key!r}: {tts.stderr.strip()}")
            remove_if_present(tmp_source)
            return None

        if not has_audio_signature(tmp_source):
            # Never recreate the old zero-byte .mp3 convention. Empty or
            # malformed TTS output remains queued for a retry.
            print(f"  ERROR: edge-tts produced no playable audio for {key!r} (spoken as {speech_text!r})")
            remove_if_present(tmp_source)
            return None
    elif backend == "mimic3":
        tmp_source = os.path.join(output_dir, f"{md5_hash}.tmp.wav")
        remove_if_present(tmp_source)
        try:
            synthesize_mimic3_wav(key, speech_text, tmp_source)
        except Exception as error:
            print(f"  ERROR: offline Mimic3 failed for {key!r}: {error}")
            remove_if_present(tmp_source)
            return None
    else:
        raise RuntimeError(f"unsupported audio backend: {backend}")

    result = encode_opus(tmp_source, out_ogg)
    remove_if_present(tmp_source)
    if result.returncode != 0 or not has_audio_signature(out_ogg):
        print(f"  ERROR: {backend} Opus encode failed for {key!r}: {result.stderr.strip()}")
        remove_if_present(out_ogg)
        return None
    return f"./audio/{md5_hash}.ogg"


def load_existing_audio_map():
    try:
        with open(AUDIO_MAP_FILE, "r", encoding="utf-8") as handle:
            content = handle.read().strip()
        match = re.match(r"^window\.AUDIO_MAP\s*=\s*(\{.*\});?\s*$", content, re.S)
        if not match:
            return {}
        data = json.loads(match.group(1))
        return data if isinstance(data, dict) else {}
    except (OSError, json.JSONDecodeError):
        return {}


def write_audio_map(audio_map):
    with open(AUDIO_MAP_FILE, "w", encoding="utf-8", newline="\n") as handle:
        handle.write("window.AUDIO_MAP = ")
        json.dump(audio_map, handle, ensure_ascii=False, indent=2)
        handle.write(";")


def configure_backend(backend):
    """Resolve dependencies and fail before submitting a large generation run."""
    global EDGE_TTS_COMMAND, FFMPEG

    FFMPEG = resolve_ffmpeg()
    if not FFMPEG:
        guidance = MIMIC3_DEPENDENCY_GUIDANCE if backend == "mimic3" else (
            "Install ffmpeg/imageio-ffmpeg or set FFMPEG."
        )
        raise RuntimeError(
            "ffmpeg was not found on PATH and imageio_ffmpeg is unavailable.\n\n"
            + guidance
        )

    if backend == "edge":
        EDGE_TTS_COMMAND = resolve_edge_tts_command()
        if not EDGE_TTS_COMMAND:
            raise RuntimeError(
                "edge-tts was not found as a command or in the current Python runtime; "
                "install edge-tts or set EDGE_TTS"
            )
        print(f"backend: Edge TTS ({' '.join(EDGE_TTS_COMMAND)})")
    elif backend == "mimic3":
        # Constructor validation covers Python packages, the local Korean
        # eSpeak data, model files, and pinned model digest before any jobs run.
        get_mimic3_voice()
        print("backend: offline Mimic3 VITS ko_KO/kss_low (KSS corpus, CC0)")
        print("privacy: synthesis is local; no learner text or corpus data leaves this machine")
    else:
        raise RuntimeError(f"unsupported audio backend: {backend}")
    print(f"ffmpeg: {FFMPEG}")


def generate_audio(manifest, backend="edge"):

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Learner-facing manifest: {len(manifest)} unique audio keys.")
    audio_map = load_existing_audio_map()
    todo = []

    for entry in manifest:
        key = entry["key"]
        md5_hash = hashlib.md5(key.encode("utf-8")).hexdigest()
        existing_path = map_path_to_file(audio_map.get(key, ""))
        if existing_path and has_audio_signature(existing_path):
            continue

        out_ogg = os.path.join(OUTPUT_DIR, f"{md5_hash}.ogg")
        if has_audio_signature(out_ogg):
            audio_map[key] = f"./audio/{md5_hash}.ogg"
            continue

        todo.append((key, entry["speechText"], md5_hash))

    print(f"Playable existing assets: {len(manifest) - len(todo)}")
    print(f"Assets requiring generation: {len(todo)}")
    if not todo:
        write_audio_map(audio_map)
        return 0

    configure_backend(backend)
    workers = max(1, int(os.environ.get("TTS_WORKERS", "4")))
    print(f"Generating with {workers} parallel workers (set TTS_WORKERS to change).")

    failures = 0
    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = {
            pool.submit(generate_one, key, speech_text, md5_hash, backend): key
            for key, speech_text, md5_hash in todo
        }
        done = 0
        for future in as_completed(futures):
            key = futures[future]
            try:
                mapped = future.result()
            except Exception as error:
                print(f"  ERROR: unexpected failure for {key!r}: {error}")
                mapped = None
            done += 1
            if mapped:
                audio_map[key] = mapped
            else:
                failures += 1
            if done % 200 == 0 or done == len(todo):
                print(f"[{done}/{len(todo)}] generated ({failures} failed)")

    # Persist successful work so a large interrupted batch can resume safely;
    # failed/zero-byte entries retain no new map allocation.
    print("Writing audio_map.js...")
    write_audio_map(audio_map)
    if failures:
        print(f"ERROR: {failures} assets failed; rerun to retry them.")
    return failures


def summarize_manifest(manifest):
    category_counts = {}
    for entry in manifest:
        for category in entry["categories"]:
            category_counts[category] = category_counts.get(category, 0) + 1
    print(f"Learner-facing manifest: {len(manifest)} unique audio keys")
    for category, count in sorted(category_counts.items()):
        print(f"  {category}: {count}")
    for key, spoken in SPEECH_OVERRIDES.items():
        print(f"  override {key!r} -> {spoken!r}")


def smoke_audio_backend(backend, key):
    """Generate and verify one disposable clip without touching audio_map/audio/."""
    key = str(key or "").strip()
    if not key:
        raise RuntimeError("--smoke-key requires non-empty text")
    speech_text = SPEECH_OVERRIDES.get(key, key)
    configure_backend(backend)

    with tempfile.TemporaryDirectory(prefix="hanapath-audio-smoke-") as temp_dir:
        md5_hash = hashlib.md5(key.encode("utf-8")).hexdigest()
        mapped = generate_one(key, speech_text, md5_hash, backend, output_dir=temp_dir)
        out_ogg = os.path.join(temp_dir, f"{md5_hash}.ogg")
        if not mapped or not has_audio_signature(out_ogg):
            raise RuntimeError(f"{backend} smoke synthesis failed for {key!r}")
        size = os.path.getsize(out_ogg)

    print(f"Smoke passed: {backend} generated a valid {size}-byte Opus clip for {key!r}.")
    print("The smoke clip was deleted; audio/ and audio_map.js were not changed.")
    return 0


def main():
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=MIMIC3_DEPENDENCY_GUIDANCE,
    )
    parser.add_argument(
        "--backend",
        choices=("edge", "mimic3"),
        default="edge",
        help="speech backend; edge remains the compatibility default, mimic3 is pinned KSS/offline",
    )
    parser.add_argument(
        "--manifest-only",
        action="store_true",
        help="build and summarize the manifest without generating or editing audio files",
    )
    parser.add_argument(
        "--smoke-key",
        metavar="KOREAN_TEXT",
        help="generate one disposable clip to validate the selected backend; does not edit audio/ or audio_map.js",
    )
    args = parser.parse_args()

    if args.manifest_only and args.smoke_key:
        parser.error("--manifest-only and --smoke-key cannot be used together")
    if args.smoke_key:
        return smoke_audio_backend(args.backend, args.smoke_key)

    print("Building explicit learner-facing audio manifest...")
    manifest = build_learner_audio_manifest()
    if args.manifest_only:
        summarize_manifest(manifest)
        return 0

    print(f"Starting generation with {args.backend} backend...")
    failures = generate_audio(manifest, args.backend)
    if failures:
        return 1
    print("Done. Run node scripts/audit-audio-coverage.mjs --strict to verify coverage.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except RuntimeError as error:
        print(f"ERROR: {error}", file=sys.stderr)
        raise SystemExit(2)
