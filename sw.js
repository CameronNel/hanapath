// [2026-07-16] Cache bumped to v382: Android back contract, Settings progress backup, M2 hardening, and ML Kit digital ink.
const CACHE_NAME = "hanapath-shell-v401";
const AUDIO_RUNTIME_CACHE_LIMIT = 256;
// Resolve against the worker scope so this also matches GitHub Pages' /hanapath/audio/ paths.
const AUDIO_RUNTIME_PATH_PREFIX = new URL("./audio/", self.registration.scope).pathname;
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=20260716e",
  "./app_intro.css?v=20260713b",
  "./lib/hangul.js",
  "./lib/hangul_q_recognizer.js?v=20260715b",
  "./audio_map.js?v=20260717q",
  "./words_curated_core.js?v=20260705e",
  "./words_inflect.js?v=20260703c",
  "./words_lesson_plan.js?v=20260709f",
  "./raw_word_meanings.js?v=20260703b",
  "./sentences_core.js?v=20260717q",
  "./sentences_lesson_plan.js?v=20260717q",
  "./hangul_strokes.js?v=20260715b",
  "./app_intro_timeline.js?v=20260713b",
  "./app_intro.js?v=20260713b",
  "./app.js?v=20260716h",
  "./alphabet_skill_srs.js?v=20260630b",
  "./manifest.webmanifest",
  "./korean_5000_claude_ready.csv",
  "./korean_supplementary_15k.csv",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./fonts/fonts.css?v=20260716a",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.0.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.1.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.10.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.100.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.101.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.102.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.103.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.104.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.105.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.106.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.107.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.108.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.109.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.11.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.110.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.111.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.112.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.113.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.114.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.115.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.116.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.117.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.118.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.119.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.12.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.13.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.14.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.15.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.16.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.17.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.18.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.19.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.2.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.20.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.21.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.22.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.23.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.24.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.25.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.26.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.27.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.28.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.29.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.3.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.30.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.31.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.32.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.33.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.34.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.35.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.36.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.37.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.38.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.39.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.4.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.40.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.41.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.42.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.43.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.44.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.45.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.46.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.47.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.48.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.49.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.5.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.50.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.51.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.52.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.53.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.54.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.55.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.56.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.57.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.58.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.59.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.6.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.60.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.61.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.62.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.63.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.64.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.65.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.66.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.67.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.68.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.69.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.7.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.70.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.71.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.72.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.73.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.74.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.75.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.76.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.77.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.78.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.79.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.8.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.80.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.81.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.82.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.83.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.84.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.85.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.86.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.87.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.88.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.89.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.9.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.90.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.91.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.92.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.93.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.94.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.95.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.96.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.97.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.98.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.99.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5CgmG0X7t.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5CgmG1X7t0JM.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5CgmG337t0JM.woff2",
  "./fonts/files/PbykFmXiEBPT4ITbgNA5CgmG3n7t0JM.woff2",
  "./fonts/files/QGYvz_MVcBeNP4NJtEtq.woff2",
  "./fonts/files/QGYvz_MVcBeNP4NJuktqQ4E.woff2",
  "./audio/sound_effects/correct/correct_1.wav",
  "./audio/sound_effects/correct/correct_2.wav",
  "./audio/sound_effects/correct/correct_3.wav",
  "./audio/sound_effects/correct/correct_4.wav",
  "./audio/sound_effects/correct/correct_5.wav",
  "./audio/sound_effects/correct/correct_6.wav",
  "./audio/sound_effects/correct/correct_7.wav",
  "./audio/sound_effects/correct/correct_8.wav",
  "./audio/sound_effects/correct/correct_9.wav",
  "./audio/sound_effects/correct/correct_10.wav",
  "./audio/sound_effects/correct/correct_11.wav",
  "./audio/sound_effects/correct/correct_12.wav",
  "./audio/sound_effects/correct/correct_13.wav",
  "./audio/sound_effects/correct/correct_14.wav",
  "./audio/sound_effects/correct/correct_15.wav",
  "./audio/sound_effects/correct/correct_16.wav",
  "./audio/sound_effects/correct/correct_17.wav",
  "./audio/sound_effects/correct/correct_18.wav",
  "./audio/sound_effects/correct/correct_19.wav",
  "./audio/sound_effects/correct/correct_20.wav",
  "./audio/sound_effects/incorrect/incorrect_1.wav",
  "./audio/sound_effects/incorrect/incorrect_2.wav",
  "./audio/sound_effects/incorrect/incorrect_3.wav",
  "./audio/sound_effects/incorrect/incorrect_4.wav",
  "./audio/sound_effects/incorrect/incorrect_5.wav",
  "./audio/sound_effects/incorrect/incorrect_6.wav",
  "./audio/sound_effects/incorrect/incorrect_7.wav",
  "./audio/sound_effects/incorrect/incorrect_8.wav",
  "./audio/sound_effects/incorrect/incorrect_9.wav",
  "./audio/sound_effects/incorrect/incorrect_10.wav",
  "./audio/sound_effects/incorrect/incorrect_11.wav",
  "./audio/sound_effects/incorrect/incorrect_12.wav",
  "./audio/sound_effects/incorrect/incorrect_13.wav",
  "./audio/sound_effects/incorrect/incorrect_14.wav",
  "./audio/sound_effects/incorrect/incorrect_15.wav",
  "./audio/sound_effects/incorrect/incorrect_16.wav",
  "./audio/sound_effects/incorrect/incorrect_17.wav",
  "./audio/sound_effects/incorrect/incorrect_18.wav",
  "./audio/sound_effects/incorrect/incorrect_19.wav",
  "./audio/sound_effects/incorrect/incorrect_20.wav",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        }),
      ),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match("./index.html");
        return cached || Response.error();
      }),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(async (cache) => {
          await cache.put(event.request, responseClone);
          if (requestUrl.pathname.startsWith(AUDIO_RUNTIME_PATH_PREFIX)) {
            const audioRequests = (await cache.keys()).filter((request) => new URL(request.url).pathname.startsWith(AUDIO_RUNTIME_PATH_PREFIX));
            const excess = audioRequests.length - AUDIO_RUNTIME_CACHE_LIMIT;
            for (const request of audioRequests.slice(0, Math.max(0, excess))) {
              await cache.delete(request);
            }
          }
        });
        return response;
      });
    }),
  );
});
