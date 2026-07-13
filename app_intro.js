(() => {
  "use strict";
  const INTRO_VERSION = 1;
  const STORAGE_KEY = "hanapath-app-intro-v1";
  const ROOT_ID = "hanapath-app-intro";
  const REPLAY_ATTRIBUTE = "data-app-intro-replay";
  const DEFAULT_ACCENT = "#9b8cff";
  const externalConfig = window.HANAPATH_APP_INTRO_CONFIG || {};
  const MASTER_AUDIO_SRC = String(externalConfig.audioSrc || "").trim();
  const DEFAULT_SCENES = [
    {
      id: "wall",
      duration: 6200,
      caption: "Korean can feel like a wall of unfamiliar sounds and symbols.",
      utterances: [
        { lang: "en-US", text: "Korean can feel like a wall of unfamiliar sounds and symbols." },
      ],
    },
    {
      id: "hangul",
      duration: 8600,
      caption: "But every language has a way in. Start with Hangul — the beautifully structured alphabet behind every Korean word.",
      utterances: [
        { lang: "en-US", text: "But every language has a way in. Start with Hangul, the beautifully structured alphabet behind every Korean word." },
        { lang: "ko-KR", text: "한글", pauseBefore: 180 },
      ],
    },
    {
      id: "words",
      duration: 6600,
      caption: "Build vocabulary you can recognise, hear, and remember.",
      utterances: [
        { lang: "en-US", text: "Build vocabulary you can recognise, hear, and remember." },
      ],
    },
    {
      id: "sentences",
      duration: 8100,
      caption: "Then bring those words together, until real Korean sentences begin to make sense.",
      utterances: [
        { lang: "en-US", text: "Then bring those words together, until real Korean sentences begin to make sense." },
        { lang: "ko-KR", text: "저는 한국어를 배워요.", pauseBefore: 220 },
      ],
    },
    {
      id: "system",
      duration: 7200,
      caption: "HanaPath guides you forward with focused lessons, intelligent review, and a clear view of your progress.",
      utterances: [
        { lang: "en-US", text: "HanaPath guides you forward with focused lessons, intelligent review, and a clear view of your progress." },
      ],
    },
    {
      id: "mantra",
      duration: 4400,
      caption: "Learn. Practice. Progress.",
      utterances: [
        { lang: "en-US", text: "Learn. Practice. Progress.", rate: 0.82 },
      ],
    },
    {
      id: "possible",
      duration: 6800,
      caption: "One step at a time, Korean stops looking foreign — and starts feeling possible.",
      utterances: [
        { lang: "en-US", text: "One step at a time, Korean stops looking foreign, and starts feeling possible." },
      ],
    },
    {
      id: "welcome",
      duration: 6100,
      caption: "Welcome to HanaPath. Your path starts here.",
      utterances: [
        { lang: "en-US", text: "Welcome to HanaPath. Your path starts here." },
        { lang: "ko-KR", text: "시작해 볼까요?", pauseBefore: 180 },
      ],
      final: true,
    },
  ];
  const scenes = Array.isArray(externalConfig.scenes) && externalConfig.scenes.length
    ? externalConfig.scenes
    : DEFAULT_SCENES;
  const totalDuration = scenes.reduce((sum, scene) => sum + Number(scene.duration || 0), 0);
  const speechSupported = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  const runtime = {
    root: null,
    currentScene: 0,
    sceneStartedAt: 0,
    sceneElapsedBeforePause: 0,
    sceneTimeout: 0,
    frame: 0,
    playing: false,
    paused: false,
    soundOn: true,
    captionsOn: true,
    generation: 0,
    mode: MASTER_AUDIO_SRC ? "audio" : "speech",
    audio: null,
    firstRun: false,
    completed: false,
  };
  function safeParse(value) {
    try {
      return JSON.parse(value);
    } catch (_error) {
      return null;
    }
  }
  function readState() {
    try {
      return safeParse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (_error) {
      return {};
    }
  }
  function writeState(patch) {
    const next = {
      ...readState(),
      ...patch,
      version: INTRO_VERSION,
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (_error) {
      // The intro remains usable when storage is blocked.
    }
    return next;
  }
  function shouldShowOnLoad() {
    const state = readState();
    return !state.seen;
  }
  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
  function icon(name) {
    const icons = {
      play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
      pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zm6 0h4v14h-4z"/></svg>',
      sound: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a3.5 3.5 0 0 0-2-3.15v6.3A3.5 3.5 0 0 0 16.5 12zm-2-7.16v2.08a6 6 0 0 1 0 10.16v2.08a8 8 0 0 0 0-14.32z"/></svg>',
      muted: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4zm12.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z"/></svg>',
      captions: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 5H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zM10 14.5A3.5 3.5 0 1 1 10 9l-1.5 1.2A1.6 1.6 0 1 0 8.5 13zm7 0A3.5 3.5 0 1 1 17 9l-1.5 1.2a1.6 1.6 0 1 0 0 2.8z"/></svg>',
      fullscreen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v2H6v4H4zm10 0h6v6h-2V6h-4zM4 14h2v4h4v2H4zm14 0h2v6h-6v-2h4z"/></svg>',
      close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6.7 5.3 5.3 5.3 5.3-5.3 1.4 1.4-5.3 5.3 5.3 5.3-1.4 1.4-5.3-5.3-5.3 5.3-1.4-1.4 5.3-5.3-5.3-5.3z"/></svg>',
      replay: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5a7 7 0 1 1-6.2 3.75L8 11H2V5l2.35 2.35A9 9 0 1 0 12 3z"/></svg>',
    };
    return icons[name] || "";
  }
  function sceneMarkup() {
    return `
      <section class="app-intro-scene app-intro-scene--wall" data-intro-scene="wall" aria-label="Korean words forming an unfamiliar wall">
        <div class="app-intro-word-wall" aria-hidden="true">
          <span>안녕하세요</span><span>괜찮아요</span><span>한국어</span><span>사랑</span>
          <span>배우다</span><span>오늘</span><span>문장</span><span>기억</span>
          <span>안녕하세요</span><span>한국</span><span>말하다</span><span>시작</span>
        </div>
        <p class="app-intro-eyebrow">A new language</p>
        <h2>At first, it can feel like a wall.</h2>
      </section>
      <section class="app-intro-scene app-intro-scene--hangul" data-intro-scene="hangul" aria-label="Hangul letters assembling into a word">
        <div class="app-intro-path-line" aria-hidden="true"></div>
        <div class="app-intro-jamo" aria-hidden="true">
          <span>ㅎ</span><span>ㅏ</span><span>ㄴ</span>
        </div>
        <div class="app-intro-hangul-lockup">
          <strong>한글</strong>
          <span>HANGUL</span>
          <em>See the system.</em>
        </div>
      </section>
      <section class="app-intro-scene app-intro-scene--words" data-intro-scene="words" aria-label="Korean vocabulary becoming familiar">
        <div class="app-intro-word-orbit" aria-hidden="true">
          <span>사람</span><span>물</span><span>오늘</span><span>먹다</span><span>가다</span>
        </div>
        <div class="app-intro-morph-card">
          <span class="app-intro-label">WORDS</span>
          <div class="app-intro-morph-forms" aria-label="The Korean verb gada changing form">
            <span>가다</span><span>가요</span><span>갔어요</span>
          </div>
          <p>Make them yours.</p>
        </div>
      </section>
      <section class="app-intro-scene app-intro-scene--sentences" data-intro-scene="sentences" aria-label="Korean words joining into a sentence">
        <div class="app-intro-sentence-build" lang="ko">
          <span>저는</span><span>한국어를</span><span>배워요</span>
        </div>
        <p class="app-intro-sentence-translation">I am learning Korean.</p>
        <div class="app-intro-section-lockup">
          <span class="app-intro-label">SENTENCES</span>
          <p>Turn knowledge into meaning.</p>
        </div>
      </section>
      <section class="app-intro-scene app-intro-scene--system" data-intro-scene="system" aria-label="HanaPath lessons, review and progress">
        <div class="app-intro-system-grid">
          <article>
            <span class="app-intro-system-icon">01</span>
            <strong>Focused lessons</strong>
            <div class="app-intro-mini-path"><i></i><i></i><i></i><i></i></div>
          </article>
          <article>
            <span class="app-intro-system-icon">02</span>
            <strong>Intelligent review</strong>
            <div class="app-intro-review-ring"><b>12</b><small>due</small></div>
          </article>
          <article>
            <span class="app-intro-system-icon">03</span>
            <strong>Visible progress</strong>
            <div class="app-intro-bars"><i></i><i></i><i></i><i></i></div>
          </article>
        </div>
        <p class="app-intro-system-line">Learn <span>→</span> Remember <span>→</span> Grow</p>
      </section>
      <section class="app-intro-scene app-intro-scene--mantra" data-intro-scene="mantra" aria-label="Learn, Practice, Progress">
        <div class="app-intro-mantra">
          <span>LEARN</span>
          <span>PRACTICE</span>
          <span>PROGRESS</span>
        </div>
        <div class="app-intro-nav-preview" aria-hidden="true">
          <i></i><i></i><i></i>
        </div>
      </section>
      <section class="app-intro-scene app-intro-scene--possible" data-intro-scene="possible" aria-label="Korean changing from a barrier into a clear path">
        <div class="app-intro-ordered-korean" aria-hidden="true">
          <span>한</span><span>국</span><span>어</span><span>를</span><span>배</span><span>워</span><span>요</span>
        </div>
        <div class="app-intro-perspective-path" aria-hidden="true"></div>
        <p>Korean stops looking foreign.</p>
        <h2>It starts feeling possible.</h2>
      </section>
      <section class="app-intro-scene app-intro-scene--welcome" data-intro-scene="welcome" aria-label="Welcome to HanaPath">
        <div class="app-intro-brand-mark" aria-hidden="true">
          <span class="app-intro-brand-stem"></span>
          <span class="app-intro-brand-bloom">하</span>
        </div>
        <h1>HanaPath</h1>
        <p>One clear path into Korean.</p>
        <button class="app-intro-cta" type="button" data-intro-finish>
          <span>Begin with Hangul</span>
          <b aria-hidden="true">→</b>
        </button>
      </section>
    `;
  }
  function buildRoot() {
    if (document.getElementById(ROOT_ID)) {
      return document.getElementById(ROOT_ID);
    }
    const root = document.createElement("div");
    root.id = ROOT_ID;
    root.className = "app-intro";
    root.hidden = true;
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-labelledby", "app-intro-title");
    root.innerHTML = `
      <div class="app-intro-shell">
        <div class="app-intro-ambient" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
        <header class="app-intro-topbar">
          <div class="app-intro-mini-brand" id="app-intro-title">HanaPath</div>
          <button class="app-intro-skip" type="button" data-intro-skip>Skip intro</button>
        </header>
        <main class="app-intro-stage">
          ${sceneMarkup()}
          <div class="app-intro-start-card" data-intro-start-card>
            <p class="app-intro-start-kicker">ONE CLEAR PATH INTO KOREAN</p>
            <h1>Welcome to<br><span>HanaPath.</span></h1>
            <p class="app-intro-start-copy">A short introduction to the journey ahead.</p>
            <button class="app-intro-start-button" type="button" data-intro-start>
              ${icon("play")}
              <span>Play introduction</span>
            </button>
            <small>${speechSupported ? "Uses your browser voice for this preview" : "Captions included"}</small>
          </div>
        </main>
        <div class="app-intro-caption" aria-live="polite" aria-atomic="true" data-intro-caption></div>
        <footer class="app-intro-controls">
          <button type="button" class="app-intro-control" data-intro-toggle-play aria-label="Pause introduction">
            ${icon("pause")}
          </button>
          <button type="button" class="app-intro-control" data-intro-toggle-sound aria-label="Mute narration" aria-pressed="false">
            ${icon("sound")}
          </button>
          <button type="button" class="app-intro-control" data-intro-toggle-captions aria-label="Hide captions" aria-pressed="true">
            ${icon("captions")}
          </button>
          <div class="app-intro-progress" role="progressbar" aria-label="Introduction progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
            <span data-intro-progress></span>
          </div>
          <button type="button" class="app-intro-control app-intro-fullscreen" data-intro-fullscreen aria-label="Enter fullscreen">
            ${icon("fullscreen")}
          </button>
          <button type="button" class="app-intro-control" data-intro-close aria-label="Close introduction">
            ${icon("close")}
          </button>
        </footer>
      </div>
    `;
    document.body.appendChild(root);
    runtime.root = root;
    applyAccent(root);
    bindEvents(root);
    return root;
  }
  function resolveAccent() {
    const style = getComputedStyle(document.documentElement);
    const candidates = [
      "--accent-color",
      "--accent",
      "--primary",
      "--theme-accent",
      "--color-accent",
    ];
    for (const name of candidates) {
      const value = style.getPropertyValue(name).trim();
      if (value) return value;
    }
    return DEFAULT_ACCENT;
  }
  function applyAccent(root) {
    root.style.setProperty("--intro-accent", resolveAccent());
  }
  function bindEvents(root) {
    root.querySelector("[data-intro-start]")?.addEventListener("click", startPlayback);
    root.querySelector("[data-intro-skip]")?.addEventListener("click", skipIntro);
    root.querySelector("[data-intro-close]")?.addEventListener("click", closeIntro);
    root.querySelector("[data-intro-toggle-play]")?.addEventListener("click", togglePlayback);
    root.querySelector("[data-intro-toggle-sound]")?.addEventListener("click", toggleSound);
    root.querySelector("[data-intro-toggle-captions]")?.addEventListener("click", toggleCaptions);
    root.querySelector("[data-intro-fullscreen]")?.addEventListener("click", toggleFullscreen);
    root.querySelector("[data-intro-finish]")?.addEventListener("click", finishIntro);
    root.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeIntro();
      } else if (event.key === " " && !event.target.closest("button")) {
        event.preventDefault();
        togglePlayback();
      }
    });
  }
  function openIntro(options = {}) {
    const root = buildRoot();
    runtime.firstRun = Boolean(options.firstRun);
    runtime.completed = false;
    resetPlayback();
    root.hidden = false;
    root.classList.add("is-open", "is-awaiting-start");
    root.classList.remove("is-playing", "is-paused", "captions-off");
    document.documentElement.classList.add("app-intro-active");
    document.body.classList.add("app-intro-active");
    writeState({ seen: true, completed: false, openedAt: new Date().toISOString() });
    root.querySelector("[data-intro-start]")?.focus({ preventScroll: true });
  }
  function closeIntro() {
    stopPlayback();
    if (!runtime.root) return;
    runtime.root.classList.remove("is-open", "is-playing", "is-paused");
    runtime.root.hidden = true;
    document.documentElement.classList.remove("app-intro-active");
    document.body.classList.remove("app-intro-active");
  }
  function skipIntro() {
    writeState({ completed: false, skipped: true, skippedAtScene: scenes[runtime.currentScene]?.id || "start" });
    closeIntro();
  }
  function finishIntro() {
    runtime.completed = true;
    writeState({ completed: true, skipped: false, completedAt: new Date().toISOString() });
    closeIntro();
    attemptOpenHangul();
  }
  function resetPlayback() {
    stopPlayback();
    runtime.currentScene = 0;
    runtime.sceneElapsedBeforePause = 0;
    runtime.paused = false;
    runtime.playing = false;
    runtime.generation += 1;
    if (runtime.root) {
      runtime.root.querySelectorAll("[data-intro-scene]").forEach((node) => {
        node.classList.remove("is-active", "is-before", "is-after");
      });
      runtime.root.querySelector("[data-intro-start-card]")?.removeAttribute("hidden");
      setCaption("");
      setProgress(0);
      updateControlState();
    }
  }
  function startPlayback() {
    if (!runtime.root) return;
    runtime.root.classList.remove("is-awaiting-start");
    runtime.root.classList.add("is-playing");
    runtime.root.querySelector("[data-intro-start-card]")?.setAttribute("hidden", "");
    runtime.playing = true;
    runtime.paused = false;
    runtime.currentScene = 0;
    updateControlState();
    if (runtime.mode === "audio") {
      startMasterAudio();
      return;
    }
    playScene(0);
  }
  function stopPlayback() {
    runtime.generation += 1;
    runtime.playing = false;
    runtime.paused = false;
    clearTimeout(runtime.sceneTimeout);
    cancelAnimationFrame(runtime.frame);
    if (speechSupported) {
      window.speechSynthesis.cancel();
    }
    if (runtime.audio) {
      runtime.audio.pause();
      runtime.audio.currentTime = 0;
      runtime.audio = null;
    }
  }
  function togglePlayback() {
    if (!runtime.root || runtime.root.classList.contains("is-awaiting-start")) {
      startPlayback();
      return;
    }
    if (!runtime.playing) {
      startPlayback();
      return;
    }
    if (runtime.paused) resumePlayback();
    else pausePlayback();
  }
  function pausePlayback() {
    if (!runtime.playing || runtime.paused) return;
    runtime.paused = true;
    runtime.root?.classList.add("is-paused");
    runtime.sceneElapsedBeforePause += performance.now() - runtime.sceneStartedAt;
    clearTimeout(runtime.sceneTimeout);
    cancelAnimationFrame(runtime.frame);
    if (runtime.mode === "audio" && runtime.audio) runtime.audio.pause();
    else if (speechSupported) window.speechSynthesis.pause();
    updateControlState();
  }
  function resumePlayback() {
    if (!runtime.paused) return;
    runtime.paused = false;
    runtime.root?.classList.remove("is-paused");
    runtime.sceneStartedAt = performance.now();
    if (runtime.mode === "audio" && runtime.audio) {
      runtime.audio.play().catch(() => {});
      tickMasterAudio();
    } else {
      if (speechSupported) window.speechSynthesis.resume();
      scheduleSceneAdvance(runtime.currentScene);
      tickProgress();
    }
    updateControlState();
  }
  function toggleSound() {
    runtime.soundOn = !runtime.soundOn;
    if (!runtime.soundOn) {
      if (speechSupported) window.speechSynthesis.cancel();
      if (runtime.audio) runtime.audio.muted = true;
    } else if (runtime.audio) {
      runtime.audio.muted = false;
    } else if (runtime.playing && !runtime.paused) {
      speakScene(scenes[runtime.currentScene], runtime.generation);
    }
    updateControlState();
  }
  function toggleCaptions() {
    runtime.captionsOn = !runtime.captionsOn;
    runtime.root?.classList.toggle("captions-off", !runtime.captionsOn);
    updateControlState();
  }
  function toggleFullscreen() {
    const shell = runtime.root?.querySelector(".app-intro-shell");
    if (!shell) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      shell.requestFullscreen?.().catch(() => {});
    }
  }
  function updateControlState() {
    if (!runtime.root) return;
    const playButton = runtime.root.querySelector("[data-intro-toggle-play]");
    const soundButton = runtime.root.querySelector("[data-intro-toggle-sound]");
    const captionsButton = runtime.root.querySelector("[data-intro-toggle-captions]");
    if (playButton) {
      playButton.innerHTML = runtime.paused || !runtime.playing ? icon("play") : icon("pause");
      playButton.setAttribute("aria-label", runtime.paused || !runtime.playing ? "Play introduction" : "Pause introduction");
    }
    if (soundButton) {
      soundButton.innerHTML = runtime.soundOn ? icon("sound") : icon("muted");
      soundButton.setAttribute("aria-label", runtime.soundOn ? "Mute narration" : "Enable narration");
      soundButton.setAttribute("aria-pressed", String(!runtime.soundOn));
    }
    if (captionsButton) {
      captionsButton.setAttribute("aria-label", runtime.captionsOn ? "Hide captions" : "Show captions");
      captionsButton.setAttribute("aria-pressed", String(runtime.captionsOn));
    }
  }
  function setScene(index) {
    runtime.currentScene = index;
    runtime.sceneElapsedBeforePause = 0;
    runtime.sceneStartedAt = performance.now();
    const scene = scenes[index];
    runtime.root?.setAttribute("data-current-scene", scene.id);
    runtime.root?.querySelectorAll("[data-intro-scene]").forEach((node) => {
      const nodeSceneIndex = scenes.findIndex((candidate) => candidate.id === node.getAttribute("data-intro-scene"));
      node.classList.toggle("is-active", nodeSceneIndex === index);
      node.classList.toggle("is-before", nodeSceneIndex > -1 && nodeSceneIndex < index);
      node.classList.toggle("is-after", nodeSceneIndex > index);
      node.setAttribute("aria-hidden", String(nodeSceneIndex !== index));
    });
    setCaption(scene.caption || "");
  }
  function playScene(index) {
    if (!runtime.playing || runtime.paused) return;
    if (index >= scenes.length) {
      showFinalScene();
      return;
    }
    runtime.generation += 1;
    const generation = runtime.generation;
    setScene(index);
    scheduleSceneAdvance(index, generation);
    tickProgress();
    speakScene(scenes[index], generation);
  }
  function scheduleSceneAdvance(index, generation = runtime.generation) {
    clearTimeout(runtime.sceneTimeout);
    const scene = scenes[index];
    const elapsed = runtime.sceneElapsedBeforePause;
    const remaining = Math.max(350, Number(scene.duration || 0) - elapsed);
    runtime.sceneTimeout = window.setTimeout(() => {
      if (generation !== runtime.generation || runtime.paused || !runtime.playing) return;
      if (scene.final) {
        showFinalScene();
      } else {
        playScene(index + 1);
      }
    }, remaining);
  }
  async function speakScene(scene, generation) {
    if (!speechSupported || !runtime.soundOn || runtime.mode !== "speech") return;
    window.speechSynthesis.cancel();
    const queue = Array.isArray(scene.utterances) ? scene.utterances : [];
    for (const item of queue) {
      if (generation !== runtime.generation || !runtime.playing || runtime.paused || !runtime.soundOn) return;
      if (item.pauseBefore) await delay(item.pauseBefore);
      await speak(item, generation);
    }
  }
  function speak(item, generation) {
    return new Promise((resolve) => {
      if (generation !== runtime.generation || !runtime.soundOn) {
        resolve();
        return;
      }
      const utterance = new SpeechSynthesisUtterance(item.text);
      utterance.lang = item.lang || "en-US";
      utterance.rate = Number(item.rate || (utterance.lang.startsWith("ko") ? 0.82 : 0.94));
      utterance.pitch = Number(item.pitch || 1);
      utterance.volume = 1;
      const voice = chooseVoice(utterance.lang);
      if (voice) utterance.voice = voice;
      utterance.onend = resolve;
      utterance.onerror = resolve;
      window.speechSynthesis.speak(utterance);
    });
  }
  function chooseVoice(lang) {
    const voices = window.speechSynthesis.getVoices();
    const exact = voices.find((voice) => voice.lang.toLowerCase() === lang.toLowerCase());
    if (exact) return exact;
    const prefix = lang.split("-")[0].toLowerCase();
    return voices.find((voice) => voice.lang.toLowerCase().startsWith(prefix)) || null;
  }
  function delay(milliseconds) {
    return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
  }
  function showFinalScene() {
    runtime.currentScene = scenes.length - 1;
    runtime.playing = false;
    runtime.paused = false;
    clearTimeout(runtime.sceneTimeout);
    cancelAnimationFrame(runtime.frame);
    setScene(runtime.currentScene);
    setProgress(100);
    runtime.root?.classList.add("is-complete");
    updateControlState();
    runtime.root?.querySelector("[data-intro-finish]")?.focus({ preventScroll: true });
  }
  function tickProgress() {
    cancelAnimationFrame(runtime.frame);
    const loop = () => {
      if (!runtime.playing || runtime.paused || runtime.mode === "audio") return;
      const prior = scenes.slice(0, runtime.currentScene).reduce((sum, scene) => sum + Number(scene.duration || 0), 0);
      const elapsed = runtime.sceneElapsedBeforePause + (performance.now() - runtime.sceneStartedAt);
      const sceneDuration = Number(scenes[runtime.currentScene]?.duration || 1);
      const planned = Math.min(elapsed, sceneDuration);
      setProgress(((prior + planned) / totalDuration) * 100);
      runtime.frame = requestAnimationFrame(loop);
    };
    runtime.frame = requestAnimationFrame(loop);
  }
  function setProgress(value) {
    const safeValue = Math.max(0, Math.min(100, Number(value || 0)));
    const bar = runtime.root?.querySelector("[data-intro-progress]");
    const progress = runtime.root?.querySelector(".app-intro-progress");
    if (bar) bar.style.transform = `scaleX(${safeValue / 100})`;
    if (progress) progress.setAttribute("aria-valuenow", String(Math.round(safeValue)));
  }
  function setCaption(value) {
    const caption = runtime.root?.querySelector("[data-intro-caption]");
    if (caption) caption.textContent = value;
  }
  function startMasterAudio() {
    const audio = new Audio(MASTER_AUDIO_SRC);
    runtime.audio = audio;
    audio.preload = "auto";
    audio.muted = !runtime.soundOn;
    audio.addEventListener("ended", showFinalScene, { once: true });
    audio.addEventListener("error", () => {
      runtime.mode = "speech";
      runtime.audio = null;
      playScene(0);
    }, { once: true });
    setScene(0);
    audio.play().then(tickMasterAudio).catch(() => {
      runtime.mode = "speech";
      runtime.audio = null;
      playScene(0);
    });
  }
  function tickMasterAudio() {
    cancelAnimationFrame(runtime.frame);
    const loop = () => {
      if (!runtime.audio || runtime.paused) return;
      const duration = runtime.audio.duration || totalDuration / 1000;
      const currentMs = runtime.audio.currentTime * 1000;
      let cursor = 0;
      let targetScene = 0;
      for (let index = 0; index < scenes.length; index += 1) {
        const sceneDuration = Number(scenes[index].duration || 0);
        if (currentMs >= cursor) targetScene = index;
        cursor += sceneDuration;
      }
      if (targetScene !== runtime.currentScene) setScene(targetScene);
      setProgress((runtime.audio.currentTime / Math.max(duration, 0.1)) * 100);
      runtime.frame = requestAnimationFrame(loop);
    };
    runtime.frame = requestAnimationFrame(loop);
  }
  function attemptOpenHangul() {
    const app = document.getElementById("app");
    if (!app || app.hidden) return;
    const candidates = [
      '[data-section="alphabet"]',
      '[data-course="alphabet"]',
      '[data-course="hangul"]',
      '[data-action="open-alphabet"]',
      '[data-action="open-hangul"]',
    ];
    for (const selector of candidates) {
      const target = document.querySelector(selector);
      if (target instanceof HTMLElement) {
        target.click();
        return;
      }
    }
  }
  function ensureReplayButton() {
    const menu = document.getElementById("screen-menu");
    if (!menu || menu.querySelector(`[${REPLAY_ATTRIBUTE}]`)) return;
    if (!menu.hasChildNodes()) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "app-intro-replay-card";
    button.setAttribute(REPLAY_ATTRIBUTE, "");
    button.innerHTML = `
      <span class="app-intro-replay-icon">${icon("replay")}</span>
      <span>
        <strong>Replay HanaPath introduction</strong>
        <small>One clear path into Korean</small>
      </span>
      <b aria-hidden="true">→</b>
    `;
    button.addEventListener("click", () => openIntro({ firstRun: false }));
    menu.appendChild(button);
  }
  function observeReplayTarget() {
    ensureReplayButton();
    const observer = new MutationObserver(() => ensureReplayButton());
    observer.observe(document.body, { childList: true, subtree: true });
  }
  function init() {
    buildRoot();
    observeReplayTarget();
    window.HanaPathIntro = Object.freeze({
      open: () => openIntro({ firstRun: false }),
      close: closeIntro,
      reset: () => {
        try { localStorage.removeItem(STORAGE_KEY); } catch (_error) {}
      },
      state: readState,
    });
    if (shouldShowOnLoad()) {
      openIntro({ firstRun: true });
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
