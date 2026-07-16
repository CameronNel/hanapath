// Single platform boundary for every web-vs-native difference (see
// docs/MOBILE_NATIVE_ARCHITECTURE.md §4.3). Never test window.Capacitor
// anywhere else in this file — route new platform differences through here.
function getHanaPathRuntime() {
  try {
    if (window.Capacitor && typeof window.Capacitor.isNativePlatform === "function" && window.Capacitor.isNativePlatform()) {
      return "native";
    }
  } catch (error) {
    // Fall through: an unexpected bridge shape must never break the browser app.
  }
  return "web";
}

function isHanaPathNative() {
  return getHanaPathRuntime() === "native";
}

function getHanaPathNativePlugin(name) {
  if (!isHanaPathNative()) return null;
  try {
    return window.Capacitor?.Plugins?.[name] || null;
  } catch (error) {
    return null;
  }
}

const INITIALS = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const MEDIALS = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];

const FINALS = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const SIMPLE_INITIALS = ["ㄱ", "ㄴ", "ㄷ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅎ"];
const SIMPLE_MEDIALS = ["ㅏ", "ㅓ", "ㅗ", "ㅜ", "ㅡ", "ㅣ"];
const SIMPLE_FINALS = ["", "ㄱ", "ㄴ", "ㅁ", "ㅇ"];
// The seven basic batchim closing sounds taught in Phase One, as single jamo
// (plus the open syllable). Complex/double finals (ㄳ, ㄺ, ㄻ, ㅄ, …) stay
// recognition-only until Phase 2, so K0 free-practice never composes or quizzes
// them.
const BATCHIM_FINALS = ["", "ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅇ"];
const LAB_PRESETS = [
  "가",
  "나",
  "너",
  "고",
  "구",
  "그",
  "마",
  "바",
  "사",
  "아",
  "야",
  "여",
  "요",
  "유",
  "자",
  "차",
  "카",
  "타",
  "파",
  "하",
  "한",
  "글",
  "문",
  "밥",
  "산",
  "밤",
  "공",
  "집",
];

const TENSE_PAIRS = {
  ㄱ: "ㄲ",
  ㄷ: "ㄸ",
  ㅂ: "ㅃ",
  ㅅ: "ㅆ",
  ㅈ: "ㅉ",
};

const TENSE_REVERSE = Object.fromEntries(
  Object.entries(TENSE_PAIRS).map(([plain, tense]) => [tense, plain]),
);

const VOWEL_FAMILIES = {
  vertical: new Set(["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅐ", "ㅒ", "ㅔ", "ㅖ", "ㅣ"]),
  horizontal: new Set(["ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ"]),
  compound: new Set(["ㅘ", "ㅙ", "ㅚ", "ㅝ", "ㅞ", "ㅟ", "ㅢ"]),
};

const SOUND_FAMILIES = ["plain", "aspirated", "tense", "support"];
const ONSET_TYPES = ["silent onset", "plain onset", "aspirated onset", "tense onset"];

const BATCHIM_GROUPS = [
  { group: "k", letters: ["ㄱ", "ㄲ", "ㄳ", "ㅋ", "ㄺ"] },
  { group: "n", letters: ["ㄴ", "ㄵ", "ㄶ"] },
  { group: "t", letters: ["ㄷ", "ㅅ", "ㅆ", "ㅈ", "ㅊ", "ㅌ", "ㅎ"] },
  { group: "l", letters: ["ㄹ", "ㄼ", "ㄽ", "ㄾ", "ㅀ"] },
  { group: "m", letters: ["ㅁ", "ㄻ"] },
  { group: "p", letters: ["ㅂ", "ㅍ", "ㅄ", "ㄿ"] },
  { group: "ng", letters: ["ㅇ"] },
];
const BATCHIM_GROUP_SOUND_SPEAK = {
  k: "\uC545",
  n: "\uC548",
  t: "\uC54B",
  l: "\uC54C",
  m: "\uC554",
  p: "\uC555",
  ng: "\uC559",
};
const BATCHIM_GROUP_WORD_SAMPLE = {
  k: "국",
  n: "눈",
  t: "곧",
  l: "달",
  m: "밤",
  p: "밥",
  ng: "공",
};

// [2026-06-29] Romanization standardized to Revised Romanization (single
// initials) so the atlas matches LETTER_SOUND; fixes the "g / k" vs "g" drift.
const consonantAtlas = [
  { char: "ㄱ", tag: "plain", name: "g", note: "Like the g in “go” at the start of a word; hardens toward a k sound at the end of a syllable.", example: "가" },
  { char: "ㄲ", tag: "tense", name: "kk", note: "The tense twin of ㄱ: a sharp, tight k like the k in “ski”, said with no puff of air.", example: "까" },
  { char: "ㄴ", tag: "plain", name: "n", note: "Like the n in “now” — a clean nasal made with the tongue behind the teeth.", example: "나" },
  { char: "ㄷ", tag: "plain", name: "d", note: "Like the d in “dog” at the start; closes toward a t sound at the end of a syllable.", example: "다" },
  { char: "ㄸ", tag: "tense", name: "tt", note: "The tense twin of ㄷ: a sharp, tight t like the t in “stop”, with no puff of air.", example: "따" },
  { char: "ㄹ", tag: "plain", name: "r", note: "Flaps between r and l: a light tapped r between vowels (like the tt in “butter”), but an l at the end of a syllable.", example: "라" },
  { char: "ㅁ", tag: "plain", name: "m", note: "Like the m in “mom” — a steady, closed-mouth nasal.", example: "마" },
  { char: "ㅂ", tag: "plain", name: "b", note: "Like the b in “boy” at the start; closes toward a p sound at the end of a syllable.", example: "바" },
  { char: "ㅃ", tag: "tense", name: "pp", note: "The tense twin of ㅂ: a tight p like the p in “spy”, with no puff of air.", example: "빠" },
  { char: "ㅅ", tag: "plain", name: "s", note: "Like the s in “see”; softens toward “sh” before i or y, and closes to a t sound when it ends a syllable.", example: "사" },
  { char: "ㅆ", tag: "tense", name: "ss", note: "The tense twin of ㅅ: a stronger, hissier s, said with tight muscles.", example: "싸" },
  { char: "ㅇ", tag: "support", name: "silent (ng)", note: "A silent placeholder at the start of a block (it just holds the vowel); the “ng” in “sing” when it ends a syllable.", example: "아" },
  { char: "ㅈ", tag: "plain", name: "j", note: "Like the j in “jump” — a soft affricate with a neat tongue release.", example: "자" },
  { char: "ㅉ", tag: "tense", name: "jj", note: "The tense twin of ㅈ: a tight, hard j said with no puff of air.", example: "짜" },
  { char: "ㅊ", tag: "aspirated", name: "ch", note: "Like the ch in “church” — the breathy, strong-air version of ㅈ.", example: "차" },
  { char: "ㅋ", tag: "aspirated", name: "k", note: "Like the k in “kite” — the breathy, strong-air version of ㄱ.", example: "카" },
  { char: "ㅌ", tag: "aspirated", name: "t", note: "Like the t in “top” — the breathy, strong-air version of ㄷ.", example: "타" },
  { char: "ㅍ", tag: "aspirated", name: "p", note: "Like the p in “pop” — the breathy, strong-air version of ㅂ.", example: "파" },
  { char: "ㅎ", tag: "aspirated", name: "h", note: "Like the h in “hat” — a soft, airy sound that often fades between vowels.", example: "하" },
];

const CONSONANT_NAMES = {
  "ㄱ": "기역",
  "ㄲ": "쌍기역",
  "ㄴ": "니은",
  "ㄷ": "디귿",
  "ㄸ": "쌍디귿",
  "ㄹ": "리을",
  "ㅁ": "미음",
  "ㅂ": "비읍",
  "ㅃ": "쌍비읍",
  "ㅅ": "시옷",
  "ㅆ": "쌍시옷",
  "ㅇ": "이응",
  "ㅈ": "지읒",
  "ㅉ": "쌍지읒",
  "ㅊ": "치읓",
  "ㅋ": "키읔",
  "ㅌ": "티읕",
  "ㅍ": "피읖",
  "ㅎ": "히읗",
};

const vowelAtlas = [
  { char: "ㅏ", family: "vertical", name: "a", note: "Like the a in “father” — open, bright, with the mouth wide.", example: "가" },
  { char: "ㅐ", family: "vertical", name: "ae", note: "Like the e in “bed”. In modern speech it sounds almost identical to ㅔ.", example: "개" },
  { char: "ㅑ", family: "vertical", name: "ya", note: "Like “ya” in “yacht” — a quick y-glide onto ㅏ.", example: "갸" },
  { char: "ㅒ", family: "vertical", name: "yae", note: "Like “ye” in “yes” — a y-glide onto ㅐ (now nearly the same as ㅖ).", example: "걔" },
  { char: "ㅓ", family: "vertical", name: "eo", note: "Like the u in “cup” — open and unrounded, not the “o” the spelling suggests.", example: "거" },
  { char: "ㅔ", family: "vertical", name: "e", note: "Like the e in “bed” — now nearly identical to ㅐ.", example: "게" },
  { char: "ㅕ", family: "vertical", name: "yeo", note: "Like “yu” in “young” — a y-glide onto ㅓ.", example: "겨" },
  { char: "ㅖ", family: "vertical", name: "ye", note: "Like “ye” in “yes” — a y-glide onto ㅔ.", example: "계" },
  { char: "ㅗ", family: "horizontal", name: "o", note: "Like the o in “go” — rounded, with the lips pushed forward.", example: "고" },
  { char: "ㅛ", family: "horizontal", name: "yo", note: "Like “yo” in “yo-yo” — a y-glide onto ㅗ.", example: "교" },
  { char: "ㅜ", family: "horizontal", name: "u", note: "Like the oo in “moon” — rounded, with the lips pushed forward.", example: "구" },
  { char: "ㅠ", family: "horizontal", name: "yu", note: "Like the word “you” — a y-glide onto ㅜ.", example: "규" },
  { char: "ㅡ", family: "horizontal", name: "eu", note: "No exact English match: say “oo” as in “moon” but spread your lips flat and tense, almost a grunt.", example: "그" },
  { char: "ㅣ", family: "vertical", name: "i", note: "Like the ee in “see” — a tall, simple vowel.", example: "기" },
  { char: "ㅘ", family: "compound", name: "wa", note: "Like “wa” in “water” — ㅗ + ㅏ glided together in one block.", example: "과" },
  { char: "ㅙ", family: "compound", name: "wae", note: "Like “we” in “wet” — ㅗ + ㅐ in one block (now nearly the same as ㅞ and ㅚ).", example: "괘" },
  { char: "ㅚ", family: "compound", name: "oe", note: "Historically a single rounded vowel, but today most speakers say it like “we” in “wet” (≈ ㅞ).", example: "괴" },
  { char: "ㅝ", family: "compound", name: "wo", note: "Like “wo” in “wonder” — ㅜ + ㅓ glided together in one block.", example: "궈" },
  { char: "ㅞ", family: "compound", name: "we", note: "Like “we” in “wet” — ㅜ + ㅔ in one block.", example: "궤" },
  { char: "ㅟ", family: "compound", name: "wi", note: "Like “wi” in “week” — ㅜ + ㅣ glided together in one block.", example: "귀" },
  // [2026-06-29] Example changed 긔 → 의 (긔 is effectively a non-word; 의 matches the demo audio).
  { char: "ㅢ", family: "compound", name: "ui", note: "ㅡ + ㅣ glided quickly; often softens to “i” mid-word, and to “e” in the possessive particle 의.", example: "의" },
];

const phaseOneLessons = [
  {
    id: "anchor-vowels",
    title: "Six anchor vowels",
    shortTitle: "Anchor vowels",
    duration: "5 min",
    goal: "Build your first Hangul vowel set.",
    summary: [
      "ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ are your six anchor vowels.",
      "Short stroke right = ㅏ, left = ㅓ; pointing up = ㅗ, down = ㅜ.",
      "Initial ㅇ is a silent placeholder, so 아 is just the vowel 'a'.",
    ],
    introCards: [
      {
        kicker: "Before you start",
        title: "Hangul uses syllable blocks",
        body: "Korean letters do not sit in one long row like English. They are grouped into square syllable blocks. Each block needs a starting consonant seat and a vowel seat. Start by owning ㅏ, ㅓ, ㅗ, ㅜ, ㅡ, and ㅣ before adding anything fancy.",
        bullets: [
          "A block is one written syllable",
          "Some syllables start with a vowel sound",
          "The seats help the letters line up",
        ],
        snag: "Some syllables begin with a vowel sound.",
        cool: "First learn the seats. Then the letters make more sense.",
      },
      {
        kicker: "Starting seat",
        title: "What if the syllable starts with a vowel?",
        body: "Korean still fills the starting consonant seat. It uses ㅇ as an empty placeholder before the vowel. In this position, ㅇ is not pronounced.",
        bullets: [
          "Initial ㅇ holds the starting seat",
          "You hear the vowel, not the ㅇ",
          "Later, final ㅇ at the bottom sounds like ng",
        ],
        snag: "Do not read initial ㅇ as ng. Only final ㅇ makes the ng sound.",
        cool: "ㅇ + ㅏ = 아, pronounced 'a'. The ㅇ is only holding the starting seat.",
      },
    ],
    concepts: [
      {
        title: "What if the syllable starts with a vowel?",
        visual: "아 · 어 · 오 · 우",
        body: "Korean still fills the starting consonant seat. It uses ㅇ as an empty placeholder before the vowel. In this position, ㅇ is not pronounced.",
        cue: "ㅇ + ㅏ = 아, pronounced 'a'. The ㅇ is only holding the starting seat.",
        voiceText: "아, 어, 오, 우",
      },
      {
        kicker: "Left and right",
        title: "ㅏ opens right; ㅓ opens left",
        visual: "ㅏ  ↔  ㅓ",
        body: "Use the short stroke as your compass. Right gives ㅏ, the open 'a' in 아. Left gives ㅓ, the Korean vowel in 어.",
        cue: "Shape first: right = ㅏ, left = ㅓ.",
        voiceText: "아, 어",
      },
      {
        kicker: "Up and down",
        title: "ㅗ and ㅜ also sit after a consonant",
        visual: "오 · 고 · 우 · 구",
        body: "You already saw ㅇ + ㅗ = 오 and ㅇ + ㅜ = 우. The same vowels also appear after a real consonant, so ㄱ + ㅗ becomes 고 and ㄱ + ㅜ becomes 구. ㄱ is the consonant shape here; it is often romanized as g or k in English depending on position. Same vowel, different starter seat.",
        cue: "Silent ㅇ gives you 오/우; ㄱ (g/k) gives you 고/구.",
        voiceText: "오, 고, 우, 구",
      },
      {
        kicker: "The clean lines",
        title: "ㅡ is flat; ㅣ stands tall",
        visual: "ㅡ  +  ㅣ",
        body: "ㅡ is a compressed vowel made with unrounded lips. ㅣ is the clear 'ee' sound. Their simple shapes become pieces of several compound vowels later.",
        cue: "그 uses ㅡ. 기 uses ㅣ.",
        voiceText: "그, 기",
      },
    ],
    questions: [
      {
        prompt: "Which vowel has its short stroke pointing right?",
        detail: "Use direction, not romanization.",
        visual: "right →",
        options: ["ㅏ", "ㅓ", "ㅗ", "ㅜ"],
        answer: "ㅏ",
        explanation: "ㅏ points right and makes the vowel in 아.",
        voiceText: "아",
      },
      {
        prompt: "Which block contains ㅗ?",
        detail: "Remember: the short stroke points up.",
        visual: "ㅗ",
        options: ["오", "우", "어", "이"],
        answer: "오",
        explanation: "Initial ㅇ is an empty placeholder, so ㅇ + ㅗ builds 오.",
        voiceText: "오",
      },
      {
        prompt: "Which pair uses horizontal vowel shapes?",
        detail: "Horizontal vowels sit below the first consonant.",
        visual: "flat shapes",
        options: ["ㅗ · ㅜ", "ㅏ · ㅓ", "ㅏ · ㅣ", "ㅓ · ㅣ"],
        answer: "ㅗ · ㅜ",
        explanation: "ㅗ and ㅜ lie horizontally, so a consonant stacks above them.",
        voiceText: "오, 우",
      },
      {
        prompt: "What sound does initial ㅇ add in 아?",
        detail: "Initial position changes its job.",
        visual: "ㅇ + ㅏ = 아",
        options: ["No sound", "n", "ng", "h"],
        answer: "No sound",
        explanation: "Initial ㅇ is an empty placeholder and is not pronounced in this position.",
        voiceText: "아",
      },
      {
        prompt: "Which vowel makes the clear 'ee' sound in 이?",
        detail: "Look for the single tall stroke.",
        visual: "이",
        options: ["ㅣ", "ㅡ", "ㅓ", "ㅜ"],
        answer: "ㅣ",
        explanation: "ㅣ stands straight up and makes the 'ee' sound, as in 이.",
        voiceText: "이",
      },
      {
        prompt: "Which block is built from ㅇ + ㅜ?",
        detail: "ㅜ is horizontal, so it sits below the silent ㅇ.",
        visual: "ㅇ + ㅜ",
        options: ["우", "오", "어", "으"],
        answer: "우",
        explanation: "Silent ㅇ plus ㅜ builds 우, pronounced 'u'.",
        voiceText: "우",
      },
    ],
  },
  {
    id: "base-consonants",
    title: "Fourteen base consonants",
    shortTitle: "Base consonants",
    duration: "7 min",
    goal: "Recognize the 14 base consonants by shape and their most useful starting sound.",
    summary: [
      "The 14 base consonants: ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ.",
      "An added stroke means more breath: ㄱ→ㅋ, ㄷ→ㅌ, ㅂ→ㅍ, ㅈ→ㅊ.",
      "English sounds are just handles — the shapes are the real memory hook.",
    ],
    introCards: [
      {
        kicker: "Before you start",
        title: "The base consonant map",
        body: "These 14 consonants are the building blocks you will reuse in every Korean word. Learn each one by its shape first; the precise sound gets refined later. Many shapes even hint at how the mouth forms the sound, which makes them easier to remember.",
        bullets: [
          "Meet the easiest anchors first: ㄱ, ㄴ, ㅁ, ㅅ, ㅇ",
          "Use 가-style sound anchors before exact pronunciation",
          "Treat tense and aspirated letters as families",
        ],
        snag: "English names are only temporary handles.",
        cool: "The shapes are the real memory hook.",
      },
      {
        kicker: "Shape families",
        title: "See the families",
        body: "Plain, aspirated, and tense shapes are related by visible changes.",
        bullets: [
          "ㄱ pairs with ㅋ",
          "ㄷ pairs with ㅌ",
          "ㅂ pairs with ㅍ",
        ],
        snag: "Do not memorize each letter as isolated noise.",
        cool: "Once the family is visible, the row is easier to remember.",
      },
    ],
    concepts: [
      {
        kicker: "Shape memory",
        title: "Start with five unmistakable shapes",
        visual: "ㄱ ㄴ ㅁ ㅅ ㅇ",
        body: "Meet ㄱ g/k, ㄴ n, ㅁ m, ㅅ s, and ㅇ silent/ng. Korean letter design reflects how speech is formed, which makes these shapes easier to remember as a family.",
        cue: "가 · 나 · 마 · 사 · 아",
        voiceText: "가, 나, 마, 사, 아",
      },
      {
        kicker: "Build the middle",
        title: "Add ㄷ, ㄹ, ㅂ, and ㅈ",
        visual: "ㄷ ㄹ ㅂ ㅈ",
        body: "ㄷ begins near d/t, ㄹ is a light r/l flap, ㅂ begins near b/p, and ㅈ begins near j. Treat the English letters as temporary signposts, not exact copies.",
        cue: "다 · 라 · 바 · 자",
        voiceText: "다, 라, 바, 자",
      },
      {
        kicker: "Breath added",
        title: "See the extra strokes in ㅋ, ㅌ, ㅍ, ㅊ",
        visual: "ㄱ→ㅋ  ㄷ→ㅌ  ㅂ→ㅍ  ㅈ→ㅊ",
        visualLayout: "paired",
        body: "An added stroke often signals a stronger puff of air. Pairing each aspirated shape with its base shape makes both easier to recall.",
        cue: "카 · 타 · 파 · 차",
        voiceText: "카, 타, 파, 차",
      },
      {
        kicker: "The breath line",
        title: "ㅎ brings the h sound",
        visual: "ㅎ + ㅏ = 하",
        body: "ㅎ completes the 14 base consonants. Keep your attention on the Hangul shape and use 하 as the sound anchor.",
        cue: "하 is one square and one beat.",
        voiceText: "하",
      },
    ],
    questions: [
      {
        prompt: "Which consonant starts 나?",
        detail: "Split the block into its first shape and vowel.",
        visual: "나",
        options: ["ㄴ", "ㄱ", "ㅁ", "ㄷ"],
        answer: "ㄴ",
        explanation: "나 breaks into ㄴ + ㅏ.",
        voiceText: "나",
      },
      {
        prompt: "Which consonant is the m sound in 마?",
        detail: "Look for the square mouth shape.",
        visual: "마",
        options: ["ㅁ", "ㅂ", "ㅇ", "ㄹ"],
        answer: "ㅁ",
        explanation: "ㅁ begins 마 with the m sound.",
        voiceText: "마",
      },
      {
        prompt: "Which pair is a base shape and its breathier partner?",
        detail: "The aspirated partner has an added stroke.",
        visual: "base → more air",
        options: ["ㄱ · ㅋ", "ㄴ · ㄹ", "ㅁ · ㅇ", "ㅅ · ㅎ"],
        answer: "ㄱ · ㅋ",
        explanation: "ㅋ is the aspirated partner of ㄱ.",
        voiceText: "가, 카",
      },
      {
        prompt: "Which block begins with ㅎ?",
        detail: "Find ㅎ in the first seat.",
        visual: "ㅎ",
        options: ["하", "자", "차", "아"],
        answer: "하",
        explanation: "ㅎ + ㅏ builds 하.",
        voiceText: "하",
      },
      {
        prompt: "Which consonant starts 사?",
        detail: "Look for the tent-like shape.",
        visual: "사",
        options: ["ㅅ", "ㅈ", "ㅊ", "ㅁ"],
        answer: "ㅅ",
        explanation: "사 begins with ㅅ, the s sound.",
        voiceText: "사",
      },
      {
        prompt: "Which block begins with ㄷ?",
        detail: "ㄷ looks like a mouth opening to the right.",
        visual: "ㄷ",
        options: ["다", "나", "라", "가"],
        answer: "다",
        explanation: "ㄷ + ㅏ builds 다, which starts near the d sound.",
        voiceText: "다",
      },
    ],
  },
  {
    id: "block-geometry",
    title: "Syllable block geometry",
    shortTitle: "Block geometry",
    duration: "6 min",
    goal: "Build and split Hangul blocks without reading separate letters in a row.",
    summary: [
      "Vertical vowels (ㅏ ㅓ ㅣ) sit to the right of the consonant.",
      "Horizontal vowels (ㅗ ㅜ ㅡ) sit below the consonant.",
      "A final consonant (batchim) closes the floor — still one block, one beat.",
    ],
    introCards: [
      {
        kicker: "Before you start",
        title: "How Hangul blocks are built",
        body: "The same letters sit in different seats depending on the vowel shape and whether a final consonant appears.",
        bullets: [
          "Vertical vowels sit on the right",
          "Horizontal vowels sit below",
          "Batchim sits on the bottom",
        ],
        snag: "A block is one syllable even when it has three parts.",
        cool: "The seat map explains most of Hangul layout.",
      },
      {
        kicker: "One block, one beat",
        title: "Read the square, not the parts",
        body: "Read the finished square as a single unit instead of spelling it out letter by letter.",
        bullets: [
          "Left/right for vertical vowels",
          "Top/bottom for horizontal vowels",
          "Close the floor when batchim appears",
        ],
        snag: "Do not scan Korean as a row of loose jamo.",
        cool: "The layout is doing half the work for you.",
      },
    ],
    concepts: [
      {
        kicker: "Vertical vowels",
        title: "Tall vowels take the right-hand seat",
        visual: "ㄴ + ㅏ = 나",
        diagram: [
          { onset: "ㄴ", vowel: "ㅏ", char: "나" },
          { onset: "ㄱ", vowel: "ㅓ", char: "거" },
          { onset: "ㅁ", vowel: "ㅣ", char: "미" },
        ],
        body: "With a vertical vowel such as ㅏ, ㅓ, or ㅣ, the initial consonant sits left and the vowel sits right. Read the finished square as one beat.",
        cue: "left + right → one block",
        voiceText: "나, 거, 미",
      },
      {
        kicker: "Horizontal vowels",
        title: "Flat vowels take the lower seat",
        visual: "ㄱ + ㅗ = 고",
        diagram: [
          { onset: "ㄱ", vowel: "ㅗ", char: "고" },
          { onset: "ㄴ", vowel: "ㅜ", char: "누" },
          { onset: "ㄱ", vowel: "ㅡ", char: "그" },
        ],
        body: "With ㅗ, ㅜ, or ㅡ, the initial consonant moves above the vowel. The ingredients are the same; only the block geometry changes.",
        cue: "top + bottom → one block",
        voiceText: "고, 누, 그",
      },
      {
        kicker: "Empty onset",
        title: "A vowel still needs a complete frame",
        visual: "ㅇ + ㅣ = 이",
        diagram: [
          { onset: "ㅇ", vowel: "ㅣ", char: "이" },
          { onset: "ㅇ", vowel: "ㅏ", char: "아" },
          { onset: "ㅇ", vowel: "ㅜ", char: "우" },
        ],
        body: "Hangul blocks cannot visually begin with a bare vowel, so silent ㅇ fills the first seat. It adds no sound in 이, 아, or 우.",
        cue: "ㅇ is visible but silent at the start.",
        voiceText: "이, 아, 우",
      },
      {
        kicker: "The third seat",
        title: "A final consonant sits on the floor",
        visual: "ㅎ + ㅏ + ㄴ = 한",
        diagram: [
          { onset: "ㅎ", vowel: "ㅏ", batchim: "ㄴ", char: "한" },
          { onset: "ㄱ", vowel: "ㅏ", batchim: "ㄱ", char: "각" },
          { onset: "ㅁ", vowel: "ㅏ", batchim: "ㅁ", char: "맘" },
        ],
        body: "Some blocks close with a consonant called batchim. Build the initial and vowel first, then place the final consonant underneath the whole pair.",
        cue: "한 is still one square and one syllable.",
        voiceText: "한, 각, 맘",
      },
    ],
    questions: [
      {
        prompt: "What block does ㄴ + ㅏ make?",
        detail: "ㅏ is vertical, so it sits to the right.",
        visual: "ㄴ + ㅏ",
        options: ["나", "너", "노", "누"],
        answer: "나",
        explanation: "ㄴ sits left of vertical ㅏ to form 나.",
        voiceText: "나",
      },
      {
        prompt: "What block does ㄱ + ㅗ make?",
        detail: "ㅗ is horizontal, so it sits below.",
        visual: "ㄱ + ㅗ",
        options: ["고", "구", "거", "가"],
        answer: "고",
        explanation: "ㄱ stacks over ㅗ to form 고.",
        voiceText: "고",
      },
      {
        prompt: "Which vowel is inside 무?",
        detail: "Split the block into ㅁ plus its lower vowel.",
        visual: "무",
        options: ["ㅜ", "ㅗ", "ㅡ", "ㅣ"],
        answer: "ㅜ",
        explanation: "무 breaks into ㅁ + ㅜ.",
        voiceText: "무",
      },
      {
        prompt: "Which onset begins 아?",
        detail: "The syllable begins with a vowel sound.",
        visual: "아",
        options: ["ㅇ", "ㅎ", "ㅁ", "No letter"],
        answer: "ㅇ",
        explanation: "Silent ㅇ fills the onset seat before ㅏ.",
        voiceText: "아",
      },
      {
        prompt: "Where does the vowel sit in 노?",
        detail: "ㅗ is a horizontal vowel.",
        visual: "노",
        options: ["Below the consonant", "To the right", "On the floor", "Above the block"],
        answer: "Below the consonant",
        explanation: "ㅗ is horizontal, so ㄴ stacks on top and ㅗ sits below in 노.",
        voiceText: "노",
      },
      {
        prompt: "What block does ㅁ + ㅏ make?",
        detail: "ㅏ is vertical, so it takes the right seat.",
        visual: "ㅁ + ㅏ",
        options: ["마", "머", "모", "무"],
        answer: "마",
        explanation: "ㅁ sits left of vertical ㅏ to form 마.",
        voiceText: "마",
      },
      {
        type: "build",
        prompt: "Build the block that sounds like “na”",
        detail: "Tap the first consonant, then the vowel.",
        target: "나",
        onset: "ㄴ",
        vowel: "ㅏ",
        tray: ["ㄴ", "ㅏ", "ㅁ", "ㅓ", "ㅗ"],
        explanation: "ㄴ takes the left seat and vertical ㅏ takes the right — together they spell 나.",
        voiceText: "나",
      },
      {
        type: "build",
        prompt: "Build the block that sounds like “go”",
        detail: "Horizontal vowels sit below — tap the consonant, then the vowel.",
        target: "고",
        onset: "ㄱ",
        vowel: "ㅗ",
        tray: ["ㄱ", "ㅗ", "ㄴ", "ㅜ", "ㅏ"],
        explanation: "ㅗ is horizontal, so ㄱ stacks on top and ㅗ sits below to form 고.",
        voiceText: "고",
      },
      {
        type: "build",
        prompt: "Build the block that sounds like “han”",
        detail: "Tap the consonant, the vowel, then the final consonant.",
        target: "한",
        onset: "ㅎ",
        vowel: "ㅏ",
        batchim: "ㄴ",
        tray: ["ㅎ", "ㅏ", "ㄴ", "ㅗ", "ㄱ"],
        explanation: "ㅎ + ㅏ build the top and ㄴ closes the floor as batchim — that is 한.",
        voiceText: "한",
      },
    ],
  },
  {
    id: "complete-vowels",
    title: "Complete the vowel set",
    shortTitle: "All vowels",
    duration: "8 min",
    goal: "Expand six anchors into all 21 modern vowels by spotting reusable pieces.",
    summary: [
      "A second short stroke adds a y-glide: ㅏ→ㅑ, ㅓ→ㅕ, ㅗ→ㅛ, ㅜ→ㅠ.",
      "ㅐ and ㅔ look different but sound nearly the same for most speakers.",
      "Compounds combine shapes (ㅗ+ㅏ=ㅘ, ㅜ+ㅓ=ㅝ); ㅢ completes all 21 vowels.",
    ],
    introCards: [
      {
        kicker: "Before you start",
        title: "From six vowels to all 21",
        body: "Your six anchor vowels expand into the full set of 21 by reusing pieces you already know. Add a short stroke for y-vowels, learn the close-sounding e-zone pair, and combine shapes for compounds — finishing with ㅢ. Almost nothing here is truly new.",
        bullets: [
          "Double the short stroke for y-vowels",
          "Keep ㅐ and ㅔ separate",
          "Combine ㅗ/ㅜ with ㅏ/ㅓ/ㅣ",
        ],
        snag: "Modern pronunciation can blur some pairs, but spelling still matters.",
        cool: "Most of the set is reusable parts plus one extra motion.",
      },
      {
        kicker: "Same pieces, new sounds",
        title: "Watch the patterns reuse themselves",
        body: "The vowel set grows by reusing the shapes you already know.",
        bullets: [
          "ㅏ → ㅑ, ㅓ → ㅕ, ㅗ → ㅛ, ㅜ → ㅠ",
          "ㅘ, ㅙ, ㅚ and ㅝ, ㅞ, ㅟ are compounds",
          "ㅢ completes the modern set",
        ],
        snag: "Do not treat the new vowels as random symbols.",
        cool: "The pattern is still shape first, sound second.",
      },
    ],
    concepts: [
      {
        kicker: "Add a y",
        title: "A second short stroke creates y-vowels",
        visual: "ㅏ→ㅑ  ㅓ→ㅕ  ㅗ→ㅛ  ㅜ→ㅠ",
        body: "Double the short stroke and the sound gains a y-glide: ya, yeo, yo, and yu. Learn the transformation instead of four unrelated symbols.",
        cue: "아→야 · 어→여 · 오→요 · 우→유",
        voiceText: "아, 야, 어, 여, 오, 요, 우, 유",
      },
      {
        kicker: "The e zone",
        title: "Meet ㅐ, ㅔ, ㅒ, and ㅖ",
        visual: "ㅐ ㅔ ㅒ ㅖ",
        body: "ㅐ and ㅔ are spelled differently but sound very similar for many modern speakers. Their doubled-stroke partners ㅒ and ㅖ add the y-glide.",
        cue: "Keep the spelling distinction even when the sounds feel close.",
        voiceText: "애, 에, 얘, 예",
      },
      {
        kicker: "Compound vowels",
        title: "Combine familiar shapes",
        visual: "ㅘ ㅙ ㅚ · ㅝ ㅞ ㅟ",
        body: "ㅗ combines with ㅏ, ㅐ, or ㅣ to make ㅘ, ㅙ, ㅚ. ㅜ combines with ㅓ, ㅔ, or ㅣ to make ㅝ, ㅞ, ㅟ.",
        cue: "ㅗ + ㅏ = ㅘ · ㅜ + ㅓ = ㅝ",
        voiceText: "와, 왜, 외, 워, 웨, 위",
      },
      {
        kicker: "The final compound",
        title: "ㅡ + ㅣ becomes ㅢ",
        visual: "ㅡ + ㅣ = ㅢ",
        body: "ㅢ completes the 21-vowel set. Its pronunciation can shift by context later; for now, recognize its construction and read the careful sound in 의.",
        cue: "You now know every modern vowel shape.",
        voiceText: "의",
      },
    ],
    questions: [
      {
        prompt: "Which vowel is the y-version of ㅏ?",
        detail: "Look for the doubled short stroke.",
        visual: "ㅏ + y-glide",
        options: ["ㅑ", "ㅕ", "ㅛ", "ㅠ"],
        answer: "ㅑ",
        explanation: "Adding a second short stroke turns ㅏ into ㅑ.",
        voiceText: "아, 야",
      },
      {
        prompt: "Which compound is built from ㅗ + ㅏ?",
        detail: "Combine the two familiar shapes.",
        visual: "ㅗ + ㅏ",
        options: ["ㅘ", "ㅝ", "ㅚ", "ㅟ"],
        answer: "ㅘ",
        explanation: "ㅗ + ㅏ combines into ㅘ, as in 와.",
        voiceText: "와",
      },
      {
        prompt: "Which vowel is inside 위?",
        detail: "This compound starts with ㅜ and ends with ㅣ.",
        visual: "위",
        options: ["ㅟ", "ㅚ", "ㅢ", "ㅞ"],
        answer: "ㅟ",
        explanation: "ㅇ + ㅟ builds 위.",
        voiceText: "위",
      },
      {
        prompt: "Which pair is often very close in modern pronunciation?",
        detail: "The spelling distinction still matters.",
        visual: "similar sound, different spelling",
        options: ["ㅐ · ㅔ", "ㅏ · ㅓ", "ㅗ · ㅜ", "ㅡ · ㅣ"],
        answer: "ㅐ · ㅔ",
        explanation: "Many speakers pronounce ㅐ and ㅔ similarly, though they remain different letters.",
        voiceText: "애, 에",
      },
      {
        prompt: "Which vowel is the y-version of ㅜ?",
        detail: "Look for the doubled short stroke.",
        visual: "ㅜ + y-glide",
        options: ["ㅠ", "ㅛ", "ㅑ", "ㅕ"],
        answer: "ㅠ",
        explanation: "A second short stroke turns ㅜ into ㅠ (yu).",
        voiceText: "우, 유",
      },
      {
        prompt: "Which compound is built from ㅜ + ㅓ?",
        detail: "Combine the two familiar shapes.",
        visual: "ㅜ + ㅓ",
        options: ["ㅝ", "ㅘ", "ㅚ", "ㅟ"],
        answer: "ㅝ",
        explanation: "ㅜ + ㅓ combine into ㅝ (wo), as in 워.",
        voiceText: "워",
      },
    ],
  },
  {
    id: "strong-consonants",
    title: "Plain, aspirated, and tense",
    shortTitle: "Strong consonants",
    duration: "7 min",
    goal: "Recognize all 19 initial consonant shapes and their five contrast families.",
    summary: [
      "Three strengths: plain, aspirated (extra air), and tense (doubled shape).",
      "ㄱㅋㄲ · ㄷㅌㄸ · ㅂㅍㅃ · ㅈㅊㅉ all follow the same pattern.",
      "ㅅ only has a tense twin ㅆ — not every family has all three members.",
    ],
    introCards: [
      {
        kicker: "Before you start",
        title: "Three consonant strengths",
        body: "Korean splits many consonants into three related strengths: plain, aspirated, and tense. The difference is meaningful — it can turn one word into a completely different one — but the shapes let you see the contrast clearly before you can fully hear it.",
        bullets: [
          "Plain is the base shape",
          "Aspirated adds a puff of air",
          "Tense doubles the shape",
        ],
        snag: "Do not force these into exact English boxes.",
        cool: "The contrast is visual before it is phonetic.",
      },
      {
        kicker: "Family pattern",
        title: "Look for the repeated logic",
        body: "The rows repeat the same idea across ㄱ, ㄷ, ㅂ, and ㅈ.",
        bullets: [
          "One base, one breathy partner, one tense partner",
          "Double shapes usually mark tense",
          "Recognition comes before finesse",
        ],
        snag: "Some rows are incomplete, like ㅅ and ㅆ without an aspirated partner.",
        cool: "Spotting the family is enough for Phase 1.",
      },
    ],
    concepts: [
      {
        kicker: "The five rows",
        title: "Learn consonants as contrast families",
        visual: "ㄱ ㅋ ㄲ · ㄷ ㅌ ㄸ · ㅂ ㅍ ㅃ",
        body: "Plain consonants are the base. Aspirated partners add a puff of air. Tense partners double the shape and begin with a tight, compact release.",
        cue: "Base · breath · tension",
        voiceText: "가, 카, 까, 다, 타, 따, 바, 파, 빠",
      },
      {
        kicker: "The j row",
        title: "ㅈ, ㅊ, and ㅉ follow the same pattern",
        visual: "ㅈ → ㅊ → ㅉ",
        body: "ㅈ is plain, ㅊ is aspirated, and ㅉ is tense. Seeing the three shapes together is more useful than memorizing them separately.",
        cue: "자 · 차 · 짜",
        voiceText: "자, 차, 짜",
      },
      {
        kicker: "The s pair",
        title: "ㅅ has a tense twin but no matching aspirated letter",
        visual: "ㅅ ↔ ㅆ",
        body: "ㅅ is the plain s shape and ㅆ is its tense double. Korean consonant families are highly regular, but not every row has all three members.",
        cue: "사 · 싸",
        voiceText: "사, 싸",
      },
      {
        kicker: "Recognition now, finesse later",
        title: "Your Phase 1 job is to see the difference",
        visual: "가 ≠ 카 ≠ 까",
        body: "Do not force these sounds into exact English boxes. Recognize the spelling contrast now; Phase 2 will train the breath, tension, and listening distinction.",
        cue: "Different Hangul means a meaningful sound contrast.",
        voiceText: "가, 카, 까",
      },
    ],
    questions: [
      {
        prompt: "Which letter is the aspirated partner of ㄱ?",
        detail: "Look for the added stroke, not a doubled shape.",
        visual: "ㄱ → more air",
        options: ["ㅋ", "ㄲ", "ㄷ", "ㅊ"],
        answer: "ㅋ",
        explanation: "ㅋ is the aspirated partner; ㄲ is tense.",
        voiceText: "가, 카",
      },
      {
        prompt: "Which letter is the tense partner of ㅂ?",
        detail: "Tense consonants double the base shape.",
        visual: "ㅂ → tension",
        options: ["ㅃ", "ㅍ", "ㅆ", "ㄸ"],
        answer: "ㅃ",
        explanation: "Doubling ㅂ creates tense ㅃ.",
        voiceText: "바, 빠",
      },
      {
        prompt: "Which row is ordered plain, aspirated, tense?",
        detail: "Read the shape relationship.",
        visual: "plain → breath → tension",
        options: ["ㅈ · ㅊ · ㅉ", "ㅈ · ㅉ · ㅊ", "ㅊ · ㅈ · ㅉ", "ㅉ · ㅊ · ㅈ"],
        answer: "ㅈ · ㅊ · ㅉ",
        explanation: "ㅈ is plain, ㅊ is aspirated, and ㅉ is tense.",
        voiceText: "자, 차, 짜",
      },
      {
        prompt: "Which block begins with a tense consonant?",
        detail: "Look for a doubled initial shape.",
        visual: "tense onset",
        options: ["까", "카", "가", "하"],
        answer: "까",
        explanation: "까 begins with doubled, tense ㄲ.",
        voiceText: "까",
      },
      {
        prompt: "Which letter is the tense partner of ㄷ?",
        detail: "Tense consonants double the base shape.",
        visual: "ㄷ → tension",
        options: ["ㄸ", "ㅌ", "ㄴ", "ㄲ"],
        answer: "ㄸ",
        explanation: "Doubling ㄷ creates tense ㄸ; ㅌ is the aspirated one.",
        voiceText: "다, 따",
      },
      {
        prompt: "Which letter is the aspirated partner of ㅈ?",
        detail: "Aspirated adds a stroke, not a doubled shape.",
        visual: "ㅈ → more air",
        options: ["ㅊ", "ㅉ", "ㅅ", "ㅋ"],
        answer: "ㅊ",
        explanation: "ㅊ adds a stroke to ㅈ for more air; ㅉ is the tense partner.",
        voiceText: "자, 차",
      },
    ],
  },
  {
    id: "batchim-basics",
    title: "Batchim: the bottom seat",
    shortTitle: "Batchim",
    duration: "8 min",
    goal: "Spot a final consonant and close a syllable with one of seven basic end sounds.",
    summary: [
      "A final consonant (batchim) sits on the floor of the block.",
      "Many spellings collapse into seven end sounds: k, n, t, l, m, p, ng.",
      "Final ㅇ says 'ng', even though initial ㅇ is silent.",
    ],
    introCards: [
      {
        kicker: "Before you start",
        title: "The bottom seat",
        body: "Final consonants close the syllable and sit underneath the vowel pair.",
        bullets: [
          "Many spellings collapse into seven final sounds",
          "ㅇ changes jobs at the end",
          "Complex finals come later",
        ],
        snag: "A final letter does not always sound the same as when it starts a block.",
        cool: "Batchim makes one written final become a smaller set of spoken endings.",
      },
      {
        kicker: "Sound groups",
        title: "Read the floor, then the frame",
        body: "Start with the main block and only then listen for the closing consonant.",
        bullets: [
          "Open syllables stay airy",
          "Closed syllables end on the floor",
          "ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ are the anchor finals",
        ],
        snag: "The bottom seat is easy to miss if you read too fast.",
        cool: "Once the floor is visible, finals stop feeling mysterious.",
      },
    ],
    concepts: [
      {
        kicker: "Block anatomy",
        title: "Batchim sits under the vowel pair",
        visual: "가 → 각 · 간 · 감",
        body: "A syllable without batchim stays open. Add ㄱ, ㄴ, or ㅁ to the floor and the same 가 frame closes as 각, 간, or 감.",
        cue: "Read the main pair, then close the final sound.",
        voiceText: "가, 각, 간, 감",
      },
      {
        kicker: "Seven destinations",
        title: "Many spellings collapse to seven final sounds",
        visual: "k · n · t · l · m · p · ng",
        body: "At the end of an isolated block, Korean funnels final consonants toward seven sound groups. This is why batchim is easier to hear than its 27 written possibilities suggest.",
        cue: "ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ are the seven anchor endings.",
        voiceText: "악, 안, 앋, 알, 암, 압, 앙",
      },
      {
        kicker: "The ㅇ switch",
        title: "ㅇ changes jobs at the bottom",
        visual: "아 ↔ 앙",
        body: "Initial ㅇ is silent, but final ㅇ is the 'ng' sound. Position is part of the letter's meaning inside a block.",
        cue: "아 starts silently. 앙 ends with ng.",
        voiceText: "아, 앙",
      },
      {
        kicker: "Complex finals",
        title: "Some batchim spell two consonants",
        visual: "ㄳ ㄵ ㄶ ㄺ ㄻ ㄼ ㄽ ㄾ ㄿ ㅀ ㅄ",
        body: "These double finals are real parts of the alphabet, but their sound depends on what follows. Recognize that they occupy one bottom seat; Phase 2 will teach their behavior.",
        cue: "For now: identify the coda. Later: master the sound flow.",
        voiceFromVisual: true,
        voiceText: "값, 닭",
      },
    ],
    questions: [
      {
        prompt: "Which consonant is the batchim in 간?",
        detail: "Look at the shape on the floor.",
        visual: "간",
        options: ["ㄴ", "ㄱ", "ㅏ", "ㅇ"],
        answer: "ㄴ",
        explanation: "간 breaks into ㄱ + ㅏ + ㄴ.",
        voiceText: "간",
      },
      {
        prompt: "What sound does final ㅇ make?",
        detail: "Its job is different from initial ㅇ.",
        visual: "공",
        options: ["ng", "silent", "n", "m"],
        answer: "ng",
        explanation: "At the bottom, ㅇ closes the syllable with ng.",
        voiceText: "공",
      },
      {
        prompt: "Which block has no batchim?",
        detail: "Choose the open syllable with no bottom consonant.",
        visual: "open vs closed",
        options: ["가", "각", "간", "감"],
        answer: "가",
        explanation: "가 contains only onset ㄱ and vowel ㅏ.",
        voiceText: "가",
      },
      {
        prompt: "What block does ㅎ + ㅏ + ㄴ make?",
        detail: "Place ㄴ under the initial-vowel pair.",
        visual: "ㅎ + ㅏ + ㄴ",
        options: ["한", "하", "항", "함"],
        answer: "한",
        explanation: "ㅎ + ㅏ forms 하, then final ㄴ closes it as 한.",
        voiceText: "한",
      },
      {
        prompt: "Which end sound do ㄱ, ㄲ, and ㅋ all share as a batchim?",
        detail: "Many spellings collapse into seven end sounds.",
        visual: "ㄱ ㄲ ㅋ → ?",
        options: ["k", "t", "ng", "p"],
        answer: "k",
        explanation: "At the bottom, ㄱ, ㄲ, and ㅋ all collapse to the k stop.",
        voiceText: "악",
      },
      {
        prompt: "Which consonant is the batchim in 밤?",
        detail: "Read the shape on the floor.",
        visual: "밤",
        options: ["ㅁ", "ㅂ", "ㄴ", "ㅇ"],
        answer: "ㅁ",
        explanation: "밤 breaks into ㅂ + ㅏ + final ㅁ (m).",
        voiceText: "밤",
      },
    ],
  },
  {
    id: "reading-graduation",
    title: "Reading graduation",
    shortTitle: "Read real words",
    duration: "8 min",
    goal: "Prove that you can decode short Korean words directly from their blocks.",
    summary: [
      "Read one square at a time, then move to the next block.",
      "Decode the shapes first; let meaning and audio confirm after your attempt.",
      "You can now read real words like 나무, 바다, and 한글.",
    ],
    introCards: [
      {
        kicker: "Before you start",
        title: "Read real words block by block",
        body: "Now you decode whole words from their blocks instead of leaning on romanization.",
        bullets: [
          "Read one square, then move forward",
          "Mix open and closed syllables",
          "Use audio after your own attempt",
        ],
        snag: "Do not fall back into letter-by-letter scanning.",
        cool: "This is where Hangul starts feeling like real text.",
      },
      {
        kicker: "Graduation set",
        title: "Prove the alphabet is landing",
        body: "These words are the checkpoint that shows the alphabet is sticking.",
        bullets: [
          "Decode the shape first",
          "Let meaning come second",
          "Use sound to confirm, not replace",
        ],
        snag: "If you get lost, reset to the block, not the romanization.",
        cool: "The final stage is about fluency, not speed reading.",
      },
    ],
    concepts: [
      {
        kicker: "Block by block",
        title: "Read one square, then move forward",
        wordBreakdown: [
          { char: "나", onset: "ㄴ", vowel: "ㅏ" },
          { char: "무", onset: "ㅁ", vowel: "ㅜ" },
        ],
        body: "Do not scan Korean as a row of loose jamo. Decode the first block, say its beat, then move to the next. 나 plus 무 becomes 나무.",
        cue: "나무 has two blocks and two spoken beats.",
        voiceText: "나무",
      },
      {
        kicker: "Trust the script",
        title: "Let romanization leave the stage",
        wordBreakdown: [
          { char: "바", onset: "ㅂ", vowel: "ㅏ" },
          { char: "다", onset: "ㄷ", vowel: "ㅏ" },
        ],
        body: "Sound labels helped introduce the alphabet, but fluent decoding comes from seeing ㅂ + ㅏ as 바 immediately. Keep your eyes on Hangul.",
        cue: "바다 means sea. The meaning is a bonus; decoding is the skill.",
        voiceText: "바다",
      },
      {
        kicker: "Open and closed",
        title: "Mix blocks with and without batchim",
        wordBreakdown: [
          { char: "한", onset: "ㅎ", vowel: "ㅏ", batchim: "ㄴ" },
          { char: "글", onset: "ㄱ", vowel: "ㅡ", batchim: "ㄹ" },
        ],
        body: "한 closes with ㄴ. 글 closes with ㄹ. Read each square as one syllable, then connect them without losing the final consonants.",
        cue: "한글 is the Korean alphabet you just learned.",
        voiceText: "한글",
      },
      {
        kicker: "Graduation set",
        title: "These words are now readable",
        visual: "아기 · 우유 · 모자 · 나무 · 바다 · 한글",
        body: "You do not need to know every meaning to decode these shapes. Read slowly, use the audio only after your own attempt, and let accuracy become speed.",
        cue: "First decode. Then hear. Then repeat.",
        voiceText: "아기, 우유, 모자, 나무, 바다, 한글",
      },
    ],
    questions: [
      {
        prompt: "How many syllable blocks are in 나무?",
        detail: "Count squares, not individual jamo.",
        visual: "나무",
        options: ["2", "1", "3", "4"],
        answer: "2",
        explanation: "나무 splits into 나 · 무: two blocks and two beats.",
        voiceText: "나무",
      },
      {
        prompt: "Which jamo sequence builds 바다?",
        detail: "Decode each block separately.",
        visual: "바다",
        options: ["ㅂ+ㅏ / ㄷ+ㅏ", "ㅂ+ㅓ / ㄷ+ㅓ", "ㅍ+ㅏ / ㅌ+ㅏ", "ㅁ+ㅏ / ㄴ+ㅏ"],
        answer: "ㅂ+ㅏ / ㄷ+ㅏ",
        explanation: "바 is ㅂ + ㅏ, and 다 is ㄷ + ㅏ.",
        voiceText: "바다",
      },
      {
        prompt: "Which word has final ㄴ in its first block?",
        detail: "Look for a consonant on the floor of block one.",
        visual: "batchim scan",
        options: ["한글", "나무", "우유", "모자"],
        answer: "한글",
        explanation: "한 breaks into ㅎ + ㅏ + final ㄴ.",
        voiceText: "한글",
      },
      {
        prompt: "Which word is built from ㅇ+ㅜ / ㅇ+ㅠ?",
        detail: "Both blocks begin with silent ㅇ.",
        visual: "ㅇ+ㅜ / ㅇ+ㅠ",
        options: ["우유", "오이", "아이", "여우"],
        answer: "우유",
        explanation: "ㅇ + ㅜ is 우, and ㅇ + ㅠ is 유.",
        voiceText: "우유",
      },
      {
        prompt: "How does 한글 split into jamo?",
        detail: "Keep each batchim in its own block.",
        visual: "한글",
        options: ["ㅎ+ㅏ+ㄴ / ㄱ+ㅡ+ㄹ", "ㅎ+ㅏ / ㄴ+ㄱ+ㅡ+ㄹ", "ㅎ+ㅓ+ㄴ / ㄱ+ㅜ+ㄹ", "ㅇ+ㅏ+ㄴ / ㅋ+ㅡ+ㄹ"],
        answer: "ㅎ+ㅏ+ㄴ / ㄱ+ㅡ+ㄹ",
        explanation: "한 is ㅎ + ㅏ + ㄴ, and 글 is ㄱ + ㅡ + ㄹ.",
        voiceText: "한글",
      },
      {
        prompt: "Which jamo build 모자?",
        detail: "Decode each block on its own.",
        visual: "모자",
        options: ["ㅁ+ㅗ / ㅈ+ㅏ", "ㅁ+ㅓ / ㅈ+ㅏ", "ㅂ+ㅗ / ㅊ+ㅏ", "ㅁ+ㅜ / ㅈ+ㅓ"],
        answer: "ㅁ+ㅗ / ㅈ+ㅏ",
        explanation: "모 is ㅁ + ㅗ and 자 is ㅈ + ㅏ; 모자 means hat.",
        voiceText: "모자",
      },
      {
        prompt: "Which word is read 'a-gi' (baby)?",
        detail: "Both blocks are open — no batchim.",
        visual: "ㅇ+ㅏ / ㄱ+ㅣ",
        options: ["아기", "오이", "우유", "바다"],
        answer: "아기",
        explanation: "ㅇ + ㅏ is 아 and ㄱ + ㅣ is 기, so 아기 means baby.",
        voiceText: "아기",
      },
      {
        type: "build",
        prompt: "Build the word that means “tree” (na-mu)",
        detail: "Build the first block, then the second — left to right.",
        target: "나무",
        blocks: [
          { onset: "ㄴ", vowel: "ㅏ" },
          { onset: "ㅁ", vowel: "ㅜ" },
        ],
        tray: ["ㄴ", "ㅏ", "ㅁ", "ㅜ", "ㅓ", "ㅗ"],
        explanation: "나 (ㄴ + ㅏ) and 무 (ㅁ + ㅜ) read left to right as 나무 — two blocks, two beats.",
        voiceText: "나무",
      },
      {
        type: "build",
        prompt: "Build the word “han-geul” (the Korean alphabet)",
        detail: "Each block closes with a batchim — onset, vowel, then the floor.",
        target: "한글",
        blocks: [
          { onset: "ㅎ", vowel: "ㅏ", batchim: "ㄴ" },
          { onset: "ㄱ", vowel: "ㅡ", batchim: "ㄹ" },
        ],
        tray: ["ㅎ", "ㅏ", "ㄴ", "ㄱ", "ㅡ", "ㄹ", "ㅗ"],
        explanation: "한 (ㅎ + ㅏ + ㄴ) and 글 (ㄱ + ㅡ + ㄹ) build 한글 — the script you just learned.",
        voiceText: "한글",
      },
    ],
  },
  {
    id: "alphabet-mastery",
    title: "Alphabet mastery test",
    shortTitle: "Mastery test",
    duration: "10 min",
    goal: "Prove you can read every Hangul vowel, consonant, block, and final sound on sight.",
    summary: [
      "You can read all 21 vowels and 19 consonants by shape.",
      "You can build and split syllable blocks, including batchim.",
      "You can decode real Korean words straight from Hangul — no romanization needed.",
    ],
    introCards: [
      {
        kicker: "The final check",
        title: "One cumulative test for the whole alphabet",
        body: "This last stage pulls together everything from the previous seven stages: vowel shapes, consonant families, block geometry, batchim, and real-word reading. Skim the recap charts, then take the cumulative checkpoint.",
        bullets: [
          "Recap the full vowel and consonant charts",
          "Answer questions drawn from every earlier stage",
          "Tap any letter to hear it while you review",
        ],
        snag: "This checkpoint is longer and the pass bar is higher.",
        cool: "Clear it and you have genuinely learned to read Hangul.",
      },
    ],
    concepts: [
      {
        kicker: "Vowel recap",
        title: "Every basic and y-vowel",
        visual: "ㅏ ㅑ · ㅓ ㅕ · ㅗ ㅛ · ㅜ ㅠ · ㅡ · ㅣ",
        body: "These ten carry most of your reading: the six anchors plus their y-glide partners. Tap each one to hear its sound and confirm the shape-to-sound link is automatic.",
        cue: "아 야 · 어 여 · 오 요 · 우 유 · 으 · 이",
        voiceText: "아, 야, 어, 여, 오, 요, 우, 유, 으, 이",
      },
      {
        kicker: "Vowel recap",
        title: "The e-zone and the compounds",
        visual: "ㅐ ㅔ ㅒ ㅖ · ㅘ ㅙ ㅚ · ㅝ ㅞ ㅟ · ㅢ",
        body: "The remaining eleven vowels: the close-sounding e-zone and the compounds built by joining shapes you already know, ending with ㅢ. Together they complete all 21 modern vowels.",
        cue: "애 에 얘 예 · 와 왜 외 · 워 웨 위 · 의",
        voiceText: "애, 에, 얘, 예, 와, 왜, 외, 워, 웨, 위, 의",
      },
      {
        kicker: "Consonant recap",
        title: "All 19 consonants by family",
        visual: "ㄱ ㅋ ㄲ · ㄷ ㅌ ㄸ · ㅂ ㅍ ㅃ · ㅈ ㅊ ㅉ · ㅅ ㅆ · ㄴ ㄹ ㅁ ㅇ ㅎ",
        body: "Plain, aspirated, and tense across four families, plus the ㅅ/ㅆ pair and the singles ㄴ, ㄹ, ㅁ, ㅇ, ㅎ. Tap through and make sure each shape triggers the right sound.",
        cue: "가 카 까 · 다 타 따 · 바 파 빠 · 자 차 짜",
        voiceText: "가, 카, 까, 다, 타, 따, 바, 파, 빠, 자, 차, 짜, 사, 싸, 나, 라, 마, 아, 하",
      },
    ],
    questions: [
      {
        prompt: "Which vowel has its short stroke pointing left?",
        detail: "Use direction, not romanization.",
        visual: "left ←",
        options: ["ㅓ", "ㅏ", "ㅗ", "ㅜ"],
        answer: "ㅓ",
        explanation: "ㅓ opens to the left and makes the vowel in 어.",
        voiceText: "어",
      },
      {
        prompt: "Which consonant starts 바?",
        detail: "Split the block into its first shape and vowel.",
        visual: "바",
        options: ["ㅂ", "ㅁ", "ㅃ", "ㅍ"],
        answer: "ㅂ",
        explanation: "바 begins with ㅂ, near the b sound.",
        voiceText: "바",
      },
      {
        prompt: "What block does ㄱ + ㅜ make?",
        detail: "ㅜ is horizontal, so it sits below.",
        visual: "ㄱ + ㅜ",
        options: ["구", "고", "거", "가"],
        answer: "구",
        explanation: "ㄱ stacks over ㅜ to form 구.",
        voiceText: "구",
      },
      {
        prompt: "Which vowel is the y-version of ㅗ?",
        detail: "Look for the doubled short stroke.",
        visual: "ㅗ + y-glide",
        options: ["ㅛ", "ㅠ", "ㅑ", "ㅕ"],
        answer: "ㅛ",
        explanation: "A second short stroke turns ㅗ into ㅛ (yo).",
        voiceText: "오, 요",
      },
      {
        prompt: "Which compound is built from ㅜ + ㅣ?",
        detail: "Combine the two shapes.",
        visual: "ㅜ + ㅣ",
        options: ["ㅟ", "ㅚ", "ㅢ", "ㅝ"],
        answer: "ㅟ",
        explanation: "ㅜ + ㅣ combine into ㅟ (wi), as in 위.",
        voiceText: "위",
      },
      {
        prompt: "Which letter is the tense partner of ㄱ?",
        detail: "Tense consonants double the base shape.",
        visual: "ㄱ → tension",
        options: ["ㄲ", "ㅋ", "ㄷ", "ㄴ"],
        answer: "ㄲ",
        explanation: "Doubling ㄱ creates tense ㄲ; ㅋ is the aspirated one.",
        voiceText: "가, 까",
      },
      {
        prompt: "Which letter is the aspirated partner of ㅂ?",
        detail: "Aspirated adds a stroke, not a doubled shape.",
        visual: "ㅂ → more air",
        options: ["ㅍ", "ㅃ", "ㅁ", "ㅌ"],
        answer: "ㅍ",
        explanation: "ㅍ adds air to ㅂ; ㅃ is the tense partner.",
        voiceText: "바, 파",
      },
      {
        prompt: "What sound does the batchim make in 강?",
        detail: "Final ㅇ has a different job from initial ㅇ.",
        visual: "강",
        options: ["ng", "n", "k", "silent"],
        answer: "ng",
        explanation: "Final ㅇ closes 강 with the ng sound.",
        voiceText: "강",
      },
      {
        prompt: "Which consonant is the batchim in 산?",
        detail: "Read the shape on the floor.",
        visual: "산",
        options: ["ㄴ", "ㅅ", "ㅇ", "ㅁ"],
        answer: "ㄴ",
        explanation: "산 breaks into ㅅ + ㅏ + final ㄴ (n).",
        voiceText: "산",
      },
      {
        prompt: "How does 우유 split into jamo?",
        detail: "Both blocks begin with silent ㅇ.",
        visual: "우유",
        options: ["ㅇ+ㅜ / ㅇ+ㅠ", "ㅇ+ㅗ / ㅇ+ㅛ", "ㅇ+ㅜ / ㅇ+ㅗ", "ㅇ+ㅠ / ㅇ+ㅜ"],
        answer: "ㅇ+ㅜ / ㅇ+ㅠ",
        explanation: "우 is ㅇ + ㅜ and 유 is ㅇ + ㅠ; 우유 means milk.",
        voiceText: "우유",
      },
    ],
  },
];


const K1_UNITS = [
  "Greetings and names",
  "Nationality and language",
  "This/that/that over there",
  "Food and ordering",
  "Numbers, prices, counters",
  "Time and schedules",
  "Places and directions",
  "Daily routine",
  "Likes and dislikes",
  "Basic texting",
  "Transport",
  "Review mission",
];

const K2_UNITS = [
  "Family",
  "Work/study",
  "Hobbies",
  "Weather",
  "Shopping",
  "Health",
  "Weekends",
  "Home",
  "Invitations",
  "Travel",
  "Korean texting",
  "Review project",
];

const startOrder = [
  "Learn the consonants",
  "Learn the vowels",
  "Build syllable blocks",
  "Add batchim and silent ㅇ",
  "Tackle sound changes",
  "Practice survival phrases",
  "Learn the grammar core",
  "Master verb endings",
  "Train listening and speaking",
  "Keep drilling forever",
];

const soundDeck = [
  "sound-family",
  "sound-family",
  "onset",
  "onset",
  "vowel-shape",
  "batchim",
  "listen",
  "tense",
];

const survivalDeck = [
  "meaning",
  "meaning",
  "situation",
  "situation",
  "cloze",
  "cloze",
  "phrase",
  "phrase",
];

const survivalPhrases = [
  { phrase: "안녕하세요", situation: "Use this to greet someone politely." },
  { phrase: "감사합니다", situation: "Use this after someone helps you or gives you something." },
  { phrase: "죄송합니다", situation: "Use this when you need to apologize." },
  { phrase: "실례합니다", situation: "Use this to get someone's attention politely." },
  { phrase: "물 주세요", situation: "Use this when ordering water." },
  { phrase: "커피 주세요", situation: "Use this when ordering coffee." },
  { phrase: "이거 주세요", situation: "Use this when pointing to something you want." },
  { phrase: "얼마예요?", situation: "Use this when asking the price." },
  { phrase: "화장실 어디예요?", situation: "Use this when asking for the restroom." },
  { phrase: "도와주세요", situation: "Use this when you need help." },
  { phrase: "영어 할 수 있어요?", situation: "Use this when you need English help." },
  { phrase: "한국어 조금 해요", situation: "Use this when explaining your level." },
  { phrase: "괜찮아요", situation: "Use this to reassure someone or say you're okay." },
  { phrase: "네", situation: "Use this to answer yes." },
  { phrase: "아니요", situation: "Use this to answer no." }
].map(x => {
  const row = window.HANAPATH_SENTENCES.find(r => r.korean === x.phrase || r.korean.replace(/[.?]$/, "") === x.phrase.replace(/[.?]$/, ""));
  return {
    phrase: x.phrase,
    meaning: row ? row.english : "",
    situation: x.situation,
    voiceText: x.phrase
  };
});

const survivalCloze = [
  {
    prompt: "물 ___",
    answer: "주세요",
    options: ["주세요", "감사합니다", "괜찮아요", "있어요"],
    explanation: "This politely asks for water.",
    voiceText: "물 주세요",
  },
  {
    prompt: "___ 어디예요?",
    answer: "화장실",
    options: ["화장실", "커피", "메뉴", "물"],
    explanation: "This asks where the bathroom is.",
    voiceText: "화장실 어디예요?",
  },
  {
    prompt: "영어 할 수 ___?",
    answer: "있어요",
    options: ["있어요", "해요", "주세요", "예요"],
    explanation: "This asks whether someone can speak English.",
    voiceText: "영어 할 수 있어요?",
  },
  {
    prompt: "한국어 조금 ___",
    answer: "해요",
    options: ["해요", "있어요", "예요", "주세요"],
    explanation: "This says you speak a little Korean.",
    voiceText: "한국어 조금 해요",
  },
  {
    prompt: "얼마 ___?",
    answer: "예요",
    options: ["예요", "해요", "있어요", "주세요"],
    explanation: "This asks how much it is.",
    voiceText: "얼마예요?",
  },
  {
    prompt: "이거 ___",
    answer: "주세요",
    options: ["주세요", "있어요", "예요", "해요"],
    explanation: "This means this one, please.",
    voiceText: "이거 주세요",
  },
];

const grammarDeck = [
  "cloze",
  "cloze",
  "role",
  "meaning",
  "order",
  "listen",
  "cloze",
  "role",
  "meaning",
  "listen",
];

const grammarClozeBank = [
  {
    prompt: "저 __ 학생이에요.",
    answer: "는",
    options: ["는", "은", "가", "를"],
    explanation: "저 ends in a vowel, so 는 marks the topic.",
    voiceText: "저는 학생이에요.",
  },
  {
    prompt: "친구 __ 와요.",
    answer: "가",
    options: ["가", "이", "를", "은"],
    explanation: "친구 ends in a vowel, so 가 marks the subject.",
    voiceText: "친구가 와요.",
  },
  {
    prompt: "책 __ 읽어요.",
    answer: "을",
    options: ["을", "를", "이", "는"],
    explanation: "책 has batchim, so 을 marks the object.",
    voiceText: "책을 읽어요.",
  },
  {
    prompt: "사과 __ 먹어요.",
    answer: "를",
    options: ["를", "을", "은", "가"],
    explanation: "사과 ends in a vowel, so 를 marks the object.",
    voiceText: "사과를 먹어요.",
  },
  {
    prompt: "시간 __ 있어요.",
    answer: "이",
    options: ["이", "가", "을", "는"],
    explanation: "시간 has batchim, so 이 marks the subject.",
    voiceText: "시간이 있어요.",
  },
  {
    prompt: "오늘 __ 날씨가 좋아요.",
    answer: "은",
    options: ["은", "는", "가", "를"],
    explanation: "오늘 has batchim, so 은 marks the topic.",
    voiceText: "오늘은 날씨가 좋아요.",
  },
  {
    prompt: "저는 학생__.",
    answer: "이에요",
    options: ["이에요", "예요", "아니에요", "해요"],
    explanation: "학생 has batchim, so 이에요 follows.",
    voiceText: "저는 학생이에요.",
  },
  {
    prompt: "저는 의사__.",
    answer: "예요",
    options: ["예요", "이에요", "아니에요", "해요"],
    explanation: "의사 ends in a vowel, so 예요 follows.",
    voiceText: "저는 의사예요.",
  },
  {
    prompt: "저는 학생이 __.",
    answer: "아니에요",
    options: ["아니에요", "예요", "이에요", "해요"],
    explanation: "This negates the copula.",
    voiceText: "저는 학생이 아니에요.",
  },
  {
    prompt: "저는 커피를 __ 마셔요.",
    answer: "안",
    options: ["안", "못", "잘", "또"],
    explanation: "안 comes before the verb to make a simple negative.",
    voiceText: "저는 커피를 안 마셔요.",
  },
];

const grammarRoleBank = [
  {
    sentence: "저는 학생이에요.",
    marker: "는",
    answer: "topic marker",
    options: ["topic marker", "subject marker", "object marker", "copula ending"],
    explanation: "는 marks the topic because 저 ends in a vowel.",
    voiceText: "저는 학생이에요.",
  },
  {
    sentence: "친구가 와요.",
    marker: "가",
    answer: "subject marker",
    options: ["subject marker", "topic marker", "object marker", "copula ending"],
    explanation: "가 marks the subject because 친구 ends in a vowel.",
    voiceText: "친구가 와요.",
  },
  {
    sentence: "책을 읽어요.",
    marker: "을",
    answer: "object marker",
    options: ["object marker", "subject marker", "topic marker", "copula ending"],
    explanation: "을 marks the object because 책 has batchim.",
    voiceText: "책을 읽어요.",
  },
  {
    sentence: "저는 학생이에요.",
    marker: "이에요",
    answer: "copula ending",
    options: ["copula ending", "question ending", "past ending", "negative ending"],
    explanation: "이에요 links a noun to 'to be.'",
    voiceText: "저는 학생이에요.",
  },
  {
    sentence: "저는 학생이 아니에요.",
    marker: "아니에요",
    answer: "negative copula",
    options: ["negative copula", "object marker", "topic marker", "subject marker"],
    explanation: "아니에요 negates the noun phrase.",
    voiceText: "저는 학생이 아니에요.",
  },
];

const grammarSentenceBank = [
  { korean: "저는 학생이에요.", explanation: "Topic + noun + copula." },
  { korean: "친구가 와요.", explanation: "Subject + verb." },
  { korean: "저는 커피를 마셔요.", explanation: "Topic + object + verb." },
  { korean: "책을 읽어요.", explanation: "Object + verb." },
  { korean: "오늘은 날씨가 좋아요.", explanation: "Topic + subject + descriptive verb." },
  { korean: "사과를 먹어요.", explanation: "Object + verb." },
  { korean: "저는 한국어를 공부해요.", explanation: "Topic + object + verb." },
  { korean: "버스를 타요.", explanation: "Object + verb." },
  { korean: "저는 학생이 아니에요.", explanation: "Negative copula." },
  { korean: "우리 집은 가까워요.", explanation: "Topic + descriptive verb." },
  { korean: "물이 있어요.", explanation: "Subject + 있다." },
  { korean: "이것은 책이에요.", explanation: "Topic + noun + copula." },
  { korean: "저는 시간이 있어요.", explanation: "Topic + subject + 있다." },
  { korean: "한국어가 재미있어요.", explanation: "Subject + descriptive verb." }
].map(x => {
  const row = window.HANAPATH_SENTENCES.find(r => r.korean === x.korean || r.korean.replace(/[.?]$/, "") === x.korean.replace(/[.?]$/, ""));
  return {
    korean: x.korean,
    meaning: row ? row.english : "",
    explanation: x.explanation,
    voiceText: x.korean
  };
});

const verbDeck = [
  "conjugate",
  "conjugate",
  "tense",
  "honorific",
  "pattern",
  "meaning",
  "order",
  "listen",
];

const verbBank = [
  {
    base: "가다",
    meaning: "to go",
    present: "가요",
    past: "갔어요",
    future: "갈 거예요",
    pattern: "regular",
  },
  {
    base: "오다",
    meaning: "to come",
    present: "와요",
    past: "왔어요",
    future: "올 거예요",
    pattern: "regular",
  },
  {
    base: "하다",
    meaning: "to do",
    present: "해요",
    past: "했어요",
    future: "할 거예요",
    pattern: "하다 irregular",
  },
  {
    base: "먹다",
    meaning: "to eat",
    present: "먹어요",
    past: "먹었어요",
    future: "먹을 거예요",
    pattern: "regular",
  },
  {
    base: "마시다",
    meaning: "to drink",
    present: "마셔요",
    past: "마셨어요",
    future: "마실 거예요",
    pattern: "regular",
  },
  {
    base: "읽다",
    meaning: "to read",
    present: "읽어요",
    past: "읽었어요",
    future: "읽을 거예요",
    pattern: "regular",
  },
  {
    base: "듣다",
    meaning: "to listen",
    present: "들어요",
    past: "들었어요",
    future: "들을 거예요",
    pattern: "ㄷ irregular",
  },
  {
    base: "걷다",
    meaning: "to walk",
    present: "걸어요",
    past: "걸었어요",
    future: "걸을 거예요",
    pattern: "ㄷ irregular",
  },
  {
    base: "돕다",
    meaning: "to help",
    present: "도와요",
    past: "도왔어요",
    future: "도울 거예요",
    pattern: "ㅂ irregular",
  },
  {
    base: "모르다",
    meaning: "to not know",
    present: "몰라요",
    past: "몰랐어요",
    future: "모를 거예요",
    pattern: "르 irregular",
  },
  {
    base: "짓다",
    meaning: "to build / make",
    present: "지어요",
    past: "지었어요",
    future: "지을 거예요",
    pattern: "ㅅ irregular",
  },
  {
    base: "살다",
    meaning: "to live",
    present: "살아요",
    past: "살았어요",
    future: "살 거예요",
    pattern: "regular",
  },
  {
    base: "쓰다",
    meaning: "to write / use",
    present: "써요",
    past: "썼어요",
    future: "쓸 거예요",
    pattern: "regular",
  },
  {
    base: "보다",
    meaning: "to see / watch",
    present: "봐요",
    past: "봤어요",
    future: "볼 거예요",
    pattern: "regular",
  },
  {
    base: "배우다",
    meaning: "to learn",
    present: "배워요",
    past: "배웠어요",
    future: "배울 거예요",
    pattern: "regular",
  },
];

const verbSentenceBank = [
  { korean: "저는 학교에 가요.", tense: "present" },
  { korean: "어제 책을 읽었어요.", tense: "past" },
  { korean: "내일 친구를 만날 거예요.", tense: "future" },
  { korean: "지금 커피를 마셔요.", tense: "present" },
  { korean: "저는 한국어를 배워요.", tense: "present" },
  { korean: "친구가 와요.", tense: "present" },
  { korean: "저는 집에 갈 거예요.", tense: "future" },
  { korean: "저는 어제 운동했어요.", tense: "past" },
  { korean: "할머니가 오세요.", tense: "honorific" },
  { korean: "선생님이 계세요.", tense: "honorific" },
  { korean: "저는 친구를 도와요.", tense: "present" },
  { korean: "우리는 영화를 봐요.", tense: "present" },
  { korean: "저는 매일 일해요.", tense: "present" },
  { korean: "오늘은 쉬어요.", tense: "present" }
].map(x => {
  const row = window.HANAPATH_SENTENCES.find(r => r.korean === x.korean || r.korean.replace(/[.?]$/, "") === x.korean.replace(/[.?]$/, ""));
  return {
    korean: x.korean,
    meaning: row ? row.english : "",
    tense: x.tense,
    voiceText: x.korean
  };
});

const verbHonorificBank = [
  { plain: "선생님이 와요.", honorific: "선생님이 오세요.", cue: "Respectful speech for coming." },
  { plain: "할머니가 자요.", honorific: "할머니가 주무세요.", cue: "Respectful speech for sleeping." },
  { plain: "사장님이 있어요.", honorific: "사장님이 계세요.", cue: "Honorific 있다 -> 계시다." },
  { plain: "교수님이 말해요.", honorific: "교수님이 말씀하세요.", cue: "Respectful speech for speaking." },
  { plain: "어머니가 먹어요.", honorific: "어머니가 드세요.", cue: "Respectful speech for eating." }
].map(x => {
  const row = window.HANAPATH_SENTENCES.find(r => r.korean === x.honorific || r.korean.replace(/[.?]$/, "") === x.honorific.replace(/[.?]$/, ""));
  return {
    plain: x.plain,
    honorific: x.honorific,
    meaning: row ? row.english : "",
    cue: x.cue
  };
});

const conversationDeck = [
  "meaning",
  "meaning",
  "reply",
  "repair",
  "dialogue",
  "listen",
  "shadow",
  "reply",
  "listen",
  "repair",
];

const vocabDeck = [
  "roman-to-hangul",
  "roman-to-hangul",
  "hangul-to-roman",
  "listen",
  "roman-to-hangul",
  "hangul-to-roman",
  "listen",
];

const sentenceDeck = [
  "build",
  "build",
  "build",
  "type",
  "build",
  "type",
  "build",
  "build",
  "type",
];

const listenDeck = [
  "sentence-choice",
  "sentence-choice",
  "dictation",
  "vocab-listen",
  "phrase-listen",
  "conversation-listen",
  "sentence-choice",
  "dictation",
  "sentence-choice",
];

function getVocabDeckForLevel(level = getTrackLevel("vocabulary")) {
  const band = getLevelBand(level);
  if (band <= 1) return ["roman-to-hangul", "roman-to-hangul", "listen", "roman-to-hangul"];
  if (band === 2) return ["roman-to-hangul", "hangul-to-roman", "listen", "roman-to-hangul"];
  if (band === 3) return ["roman-to-hangul", "hangul-to-roman", "listen", "hangul-to-roman"];
  if (band === 4) return ["hangul-to-roman", "roman-to-hangul", "listen", "hangul-to-roman"];
  return [...vocabDeck, "listen", "hangul-to-roman", "roman-to-hangul"];
}

function getSentenceDeckForLevel(level = getTrackLevel("sentences")) {
  const band = getLevelBand(level);
  if (band <= 1) return ["build", "build", "build", "type"];
  if (band === 2) return ["build", "build", "type", "build"];
  if (band === 3) return ["build", "type", "type", "transform"];
  if (band === 4) return ["type", "transform", "type", "build"];
  return ["type", "transform", "type", "build", "type"];
}

function getListenDeckForLevel(level = getTrackLevel("listening")) {
  const band = getLevelBand(level);
  if (band <= 1) return ["sentence-choice", "vocab-listen", "sentence-choice", "vocab-listen"];
  if (band === 2) return ["sentence-choice", "phrase-listen", "sentence-choice", "vocab-listen"];
  if (band === 3) return ["phrase-listen", "sentence-choice", "dictation", "sentence-choice"];
  if (band === 4) return ["dictation", "sentence-choice", "conversation-listen", "phrase-listen"];
  return [...listenDeck];
}

const conversationLineBank = [
  { korean: "안녕하세요.", cue: "Use this to open a conversation politely." },
  { korean: "처음 뵙겠습니다.", cue: "Use this when you meet someone for the first time." },
  { korean: "감사합니다.", cue: "Use this after someone helps you or gives you something." },
  { korean: "괜찮아요.", cue: "Use this to reassure someone or say you are fine." },
  { korean: "네.", cue: "Use this to answer yes." },
  { korean: "아니요.", cue: "Use this to answer no." },
  { korean: "물 주세요.", cue: "Use this when ordering water." },
  { korean: "이거 주세요.", cue: "Use this when pointing to the item you want." },
  { korean: "화장실이 어디예요?", cue: "Use this when asking for the restroom." },
  { korean: "잠시만요.", cue: "Use this to buy a little time." },
  { korean: "잘 모르겠어요.", cue: "Use this when you missed the meaning." },
  { korean: "도와주세요.", cue: "Use this when you need help." },
  { korean: "다시 말씀해 주세요.", cue: "Use this when you did not catch the sentence." },
  { korean: "천천히 말씀해 주세요.", cue: "Use this when the speech is too fast." },
  { korean: "무슨 뜻이에요?", cue: "Use this when a word is unfamiliar." },
  { korean: "한국어 조금 해요.", cue: "Use this when explaining your level." },
  { korean: "네, 다시 말씀드릴게요.", cue: "Use this when someone asks you to repeat yourself." },
  { korean: "네, 천천히 말할게요.", cue: "Use this when someone asks you to slow down." },
  { korean: "저쪽이에요.", cue: "Use this when giving a simple direction." },
  { korean: "네, 여기요.", cue: "Use this when handing something over." },
  { korean: "알겠습니다.", cue: "Use this to confirm you understood." }
].map(x => {
  const row = window.HANAPATH_SENTENCES.find(r => r.korean === x.korean || r.korean.replace(/[.?]$/, "") === x.korean.replace(/[.?]$/, ""));
  return {
    korean: x.korean,
    meaning: row ? row.english : "",
    cue: x.cue,
    voiceText: x.korean
  };
});

const conversationRepairBank = [
  {
    phrase: "다시 말씀해 주세요.",
    meaning: "Please say it again.",
    cue: "Use this when you missed the sentence.",
    voiceText: "다시 말씀해 주세요.",
  },
  {
    phrase: "천천히 말씀해 주세요.",
    meaning: "Please speak slowly.",
    cue: "Use this when the speech is too fast.",
    voiceText: "천천히 말씀해 주세요.",
  },
  {
    phrase: "무슨 뜻이에요?",
    meaning: "What does it mean?",
    cue: "Use this when a word is unfamiliar.",
    voiceText: "무슨 뜻이에요?",
  },
  {
    phrase: "잘 모르겠어요.",
    meaning: "I don't understand.",
    cue: "Use this when you need to admit confusion.",
    voiceText: "잘 모르겠어요.",
  },
  {
    phrase: "잠시만요.",
    meaning: "One moment, please.",
    cue: "Use this to buy a little time.",
    voiceText: "잠시만요.",
  },
  {
    phrase: "알겠습니다.",
    meaning: "Understood.",
    cue: "Use this to confirm you heard the repair phrase.",
    voiceText: "알겠습니다.",
  },
];

const conversationScenarioBank = [
  {
    cue: "You want to greet someone politely.",
    answer: "안녕하세요.",
    explanation: "A polite greeting is the safest opening.",
    voiceText: "안녕하세요.",
  },
  {
    cue: "You want to thank someone.",
    answer: "감사합니다.",
    explanation: "Thanking people is a useful speaking habit.",
    voiceText: "감사합니다.",
  },
  {
    cue: "You need the bathroom.",
    answer: "화장실이 어디예요?",
    explanation: "This asks for the restroom in a polite way.",
    voiceText: "화장실이 어디예요?",
  },
  {
    cue: "You want water.",
    answer: "물 주세요.",
    explanation: "A simple order phrase gets the message across.",
    voiceText: "물 주세요.",
  },
  {
    cue: "You want this item.",
    answer: "이거 주세요.",
    explanation: "This is the natural phrase when pointing at something.",
    voiceText: "이거 주세요.",
  },
  {
    cue: "You need help.",
    answer: "도와주세요.",
    explanation: "This is the clearest way to ask for help.",
    voiceText: "도와주세요.",
  },
  {
    cue: "The speaker is too fast.",
    answer: "천천히 말씀해 주세요.",
    explanation: "This asks for slower speech politely.",
    voiceText: "천천히 말씀해 주세요.",
  },
  {
    cue: "You missed what was said.",
    answer: "다시 말씀해 주세요.",
    explanation: "This asks the speaker to repeat the line.",
    voiceText: "다시 말씀해 주세요.",
  },
  {
    cue: "You do not understand the meaning.",
    answer: "무슨 뜻이에요?",
    explanation: "This is the direct question to ask for meaning.",
    voiceText: "무슨 뜻이에요?",
  },
  {
    cue: "You want a moment.",
    answer: "잠시만요.",
    explanation: "This buys you a little speaking time.",
    voiceText: "잠시만요.",
  },
  {
    cue: "You only speak a little Korean.",
    answer: "한국어 조금 해요.",
    explanation: "This explains your level clearly and politely.",
    voiceText: "한국어 조금 해요.",
  },
  {
    cue: "You want to say yes.",
    answer: "네.",
    explanation: "A simple yes keeps the exchange moving.",
    voiceText: "네.",
  },
  {
    cue: "You want to say no.",
    answer: "아니요.",
    explanation: "A simple no is enough in many short exchanges.",
    voiceText: "아니요.",
  },
  {
    cue: "You understood the speaker.",
    answer: "알겠습니다.",
    explanation: "This polite acknowledgement shows you followed along.",
    voiceText: "알겠습니다.",
  },
  {
    cue: "You want to say you will repeat it.",
    answer: "네, 다시 말씀드릴게요.",
    explanation: "This is a natural confirmation after a repair request.",
    voiceText: "네, 다시 말씀드릴게요.",
  },
  {
    cue: "You want to say you will slow down.",
    answer: "네, 천천히 말할게요.",
    explanation: "This acknowledges the request to slow down.",
    voiceText: "네, 천천히 말할게요.",
  },
  {
    cue: "You want to reassure someone.",
    answer: "괜찮아요.",
    explanation: "This keeps the interaction relaxed and kind.",
    voiceText: "괜찮아요.",
  },
];

const sentenceStudyBankCache = {
  items: null,
  tokens: null,
  tokenSourceKey: "",
};

function normalizeStudyText(value) {
  return String(value || "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\s.,!?;:"'`~(){}\[\]<>\\/·-]+/g, "");
}

function tokenizeSentence(value) {
  return String(value || "")
    .trim()
    .split(/\s+/)
    .map((token) => token.replace(/[.,!?;:"'`~(){}\[\]<>\\/·-]+$/g, "").trim())
    .filter(Boolean);
}

function pushSentenceStudyItem(items, seen, candidate) {
  const sentence = String(
    candidate.korean ||
      candidate.sentence ||
      candidate.phrase ||
      candidate.answer ||
      candidate.reply ||
      candidate.honorific ||
      candidate.plain ||
      ""
  ).trim();

  if (!sentence) {
    return;
  }

  const key = normalizeStudyText(sentence);
  if (!key || seen.has(key)) {
    return;
  }

  seen.add(key);
  items.push({
    korean: sentence,
    meaning: String(candidate.meaning || candidate.explanation || candidate.cue || candidate.prompt || "").trim(),
    voiceText: String(candidate.voiceText || sentence).trim(),
    source: String(candidate.source || candidate.label || "").trim(),
    tokenCount: tokenizeSentence(sentence).length,
  });
}

function getSentenceStudyBank() {
  if (sentenceStudyBankCache.items) {
    return sentenceStudyBankCache.items;
  }

  const items = [];
  const seen = new Set();

  const bankRows = getSentenceBankRows();
  const legacyRows = bankRows.filter(row => row.source === "legacy-app");
  legacyRows.forEach((row) => {
    pushSentenceStudyItem(items, seen, {
      korean: row.korean,
      meaning: row.english,
      voiceText: row.voiceText || row.korean,
      source: "Legacy Bank",
    });
  });

  grammarClozeBank.forEach((item) => {
    pushSentenceStudyItem(items, seen, {
      korean: item.voiceText || item.answer || "",
      meaning: item.explanation || item.prompt,
      voiceText: item.voiceText || item.answer || "",
      source: "Grammar cloze",
    });
  });

  grammarRoleBank.forEach((item) => {
    pushSentenceStudyItem(items, seen, {
      korean: item.sentence,
      meaning: item.answer,
      voiceText: item.voiceText || item.sentence || "",
      source: "Grammar role",
    });
  });

  survivalCloze.forEach((item) => {
    pushSentenceStudyItem(items, seen, {
      korean: item.voiceText || item.prompt || "",
      meaning: item.explanation || item.prompt,
      voiceText: item.voiceText || item.prompt || "",
      source: "Survival cloze",
    });
  });

  conversationRepairBank.forEach((item) => {
    pushSentenceStudyItem(items, seen, {
      korean: item.phrase,
      meaning: item.meaning,
      voiceText: item.voiceText,
      source: "Repair",
    });
  });

  conversationScenarioBank.forEach((item) => {
    pushSentenceStudyItem(items, seen, {
      korean: item.answer,
      meaning: item.cue,
      voiceText: item.voiceText,
      source: "Scenario",
    });
  });

  sentenceStudyBankCache.items = items;
  return items;
}

function getSentenceTokenBank() {
  const sourceKey = `${vocabBankReady ? "ready" : "pending"}:${vocabBank.length}:${vocabBankError}`;
  if (sentenceStudyBankCache.tokens && sentenceStudyBankCache.tokenSourceKey === sourceKey) {
    return sentenceStudyBankCache.tokens;
  }

  const tokens = new Set();

  getSentenceStudyBank().forEach((item) => {
    tokenizeSentence(item.korean).forEach((token) => tokens.add(token));
  });

  vocabBank.forEach((entry) => {
    if (entry.korean) {
      tokens.add(entry.korean);
    }
  });

  sentenceStudyBankCache.tokens = [...tokens].filter(Boolean);
  sentenceStudyBankCache.tokenSourceKey = sourceKey;
  return sentenceStudyBankCache.tokens;
}

function makeSentenceTokenPool(answerTokens, extraTokens = 8) {
  const answerSet = new Set(answerTokens.map((token) => normalizeStudyText(token)));
  const distractors = getSentenceTokenBank()
    .filter((token) => !answerSet.has(normalizeStudyText(token)))
    .filter((token, index, list) => list.indexOf(token) === index);

  const pool = answerTokens.map((text, index) => ({
    id: `answer-${index}-${Math.random().toString(36).slice(2, 8)}`,
    text,
    source: "answer",
  }));

  shuffle(distractors)
    .slice(0, extraTokens)
    .forEach((text, index) => {
      pool.push({
        id: `distractor-${index}-${Math.random().toString(36).slice(2, 8)}`,
        text,
        source: "distractor",
      });
    });

  return shuffle(pool);
}

function getBuildableSentenceBank(level = getTrackLevel("sentences")) {
  const bank = getSentenceStudyBank()
    .filter((item) => item.tokenCount >= 2)
    .sort((a, b) => a.tokenCount - b.tokenCount);
  return getRepeatBandSlice(bank, level);
}

function getDictationSentenceBank(level = getTrackLevel("sentences")) {
  const bank = getSentenceStudyBank()
    .filter((item) => item.tokenCount >= 2)
    .sort((a, b) => a.tokenCount - b.tokenCount);
  return getRepeatBandSlice(bank, level);
}

function createSentenceChoiceOptions(item, bank, answerField = "korean") {
  const answers = bank
    .map((entry) => String(entry[answerField] || entry.korean || entry.meaning || "").trim())
    .filter(Boolean);
  const answer = String(item[answerField] || item.korean || item.meaning || "").trim();
  return makeTextChoices(answer, answers, 4);
}

function makeSentenceBuildQuestion(level = getTrackLevel("sentences")) {
  const bank = getBuildableSentenceBank(level);
  if (!bank.length) {
    return {
      kind: "Sentence build",
      mode: "Sentence studio",
      prompt: "The sentence bank is not ready yet.",
      detail: "Try again in a moment.",
      visual: `<div class="big-glyph">?</div>`,
      interaction: "build",
      options: [],
      answer: "",
      answerTokens: [],
      tokenPool: [],
      explanation: "Sentence practice will appear once the content bank is available.",
      voiceText: "",
      helper: "",
    };
  }

  const item = randomItem(bank);
  const answerTokens = tokenizeSentence(item.korean);
  const tokenPool = makeSentenceTokenPool(answerTokens, Math.max(6, answerTokens.length + 2));

  return {
    kind: "Sentence build",
    mode: "Order the words",
    prompt: "Drag the words into the right order.",
    detail: `${item.source || "Sentence"} • ${item.tokenCount} words`,
    visual: `<div class="sentence-clue">${escapeHtml(item.meaning || item.korean)}</div><div class="fs-xs text-muted-2">Tap or drag words into the slots</div>`,
    interaction: "build",
    options: [],
    answer: item.korean,
    answerTokens,
    tokenPool,
    explanation: item.meaning ? `${item.korean} means ${item.meaning}.` : `${item.korean}.`,
    voiceText: item.voiceText || item.korean,
    helper: "Tap a word to place it. Tap a filled slot to clear it.",
  };
}

function makeSentenceTypingQuestion(level = getTrackLevel("sentences")) {
  const bank = getDictationSentenceBank(level);
  if (!bank.length) {
    return {
      kind: "Dictation",
      mode: "Listen and type",
      prompt: "The dictation bank is not ready yet.",
      detail: "Try again in a moment.",
      visual: `<div class="big-glyph">♪</div>`,
      interaction: "type",
      options: [],
      answer: "",
      answerTokens: [],
      tokenPool: [],
      explanation: "Sentence typing will appear once the content bank is available.",
      voiceText: "",
      helper: "",
      placeholder: "Type the sentence here",
    };
  }

  const item = randomItem(bank);

  return {
    kind: "Dictation",
    mode: "Listen and type",
    prompt: "Listen, then type the Korean sentence.",
    detail: `${item.source || "Sentence"} • ${item.tokenCount} words`,
    visual: `<div class="sentence-clue">${escapeHtml(item.meaning || "Dictation")}</div><div class="fs-xs text-muted-2">Use Replay sound for another pass</div>`,
    interaction: "type",
    options: [],
    answer: item.korean,
    answerTokens: tokenizeSentence(item.korean),
    tokenPool: [],
    explanation: item.meaning ? `${item.korean} means ${item.meaning}.` : `${item.korean}.`,
    voiceText: item.voiceText || item.korean,
    autoSpeak: true,
    helper: "Type the sentence in Korean, then press Check.",
    placeholder: "Type the Korean sentence here",
  };
}

function makeSentenceListenQuestion(level = getTrackLevel("listening")) {
  const bank = getBuildableSentenceBank(level);
  if (!bank.length) {
    return {
      kind: "Listen",
      mode: "Sentence match",
      prompt: "The listening bank is not ready yet.",
      detail: "Try again in a moment.",
      visual: `<div class="big-glyph">♪</div>`,
      interaction: "choice",
      options: ["Reload", "Try again", "Open Library", "Study words"],
      answer: "Reload",
      explanation: "Sentence listening will appear once the content bank is available.",
      voiceText: "",
      helper: "",
      autoSpeak: false,
    };
  }

  const item = randomItem(bank);
  const options = createSentenceChoiceOptions(item, bank, "korean");

  return {
    kind: "Listen",
    mode: "Sentence match",
    prompt: "Listen, then choose the sentence you heard.",
    detail: `${item.source || "Sentence"} • ${item.tokenCount} words`,
    visual: `<div class="big-glyph">♪</div><div class="fs-xs text-muted-2">${escapeHtml(item.meaning || "Sentence listening")}</div>`,
    interaction: "choice",
    options,
    answer: item.korean,
    explanation: item.meaning ? `${item.korean} means ${item.meaning}.` : `${item.korean}.`,
    voiceText: item.voiceText || item.korean,
    autoSpeak: true,
    helper: "Hear the sentence and choose the exact Korean wording.",
  };
}

function makeMeaningListenQuestion(items, modeLabel, prompt, detail, level = getTrackLevel("listening")) {
  const bank = getRepeatBandSlice(items.filter((item) => String(item.meaning || "").trim()), level);
  if (!bank.length) {
    return {
      kind: "Listen",
      mode: modeLabel,
      prompt,
      detail,
      visual: `<div class="big-glyph">♪</div>`,
      interaction: "choice",
      options: ["Reload", "Try again", "Open Library", "Study words"],
      answer: "Reload",
      explanation: "The listening bank is not ready yet.",
      voiceText: "",
      helper: "",
      autoSpeak: false,
    };
  }

  const item = randomItem(bank);
  const options = createSentenceChoiceOptions(item, bank, "meaning");

  return {
    kind: "Listen",
    mode: modeLabel,
    prompt,
    detail,
    visual: `<div class="big-glyph">♪</div><div class="fs-xs text-muted-2">Audio only · transcript appears after answering</div>`,
    interaction: "choice",
    options,
    answer: item.meaning,
    explanation: `${item.korean || item.phrase || item.answer} means ${item.meaning}.`,
    voiceText: item.voiceText || item.korean || item.phrase || item.answer || "",
    autoSpeak: true,
    helper: "Listen closely and pick the meaning that matches the audio.",
  };
}

function makeListenStudioQuestion(type, level = getTrackLevel("listening")) {
  if (type === "dictation") {
    return makeSentenceTypingQuestion(level);
  }

  if (type === "vocab-listen") {
    return generateVocabQuestion("listen");
  }

  if (type === "phrase-listen") {
    return makeMeaningListenQuestion(
      survivalPhrases,
      "Phrase listening",
      "Listen, then choose the meaning.",
      "Survival phrases",
      level,
    );
  }

  if (type === "conversation-listen") {
    return makeMeaningListenQuestion(
      conversationLineBank,
      "Conversation listening",
      "Listen, then choose the meaning.",
      "Conversation lines",
      level,
    );
  }

  return makeSentenceListenQuestion(level);
}

const conversationDialogueBank = [
  { starter: "처음 뵙겠습니다.", reply: "안녕하세요.", cue: "A polite first introduction can be answered with a warm greeting.", explanation: "This greeting keeps the first exchange natural without simply copying the prompt." },
  { starter: "감사합니다.", reply: "괜찮아요.", cue: "A natural response to thanks.", explanation: "괜찮아요 is a friendly reply to thanks." },
  { starter: "다시 말씀해 주세요.", reply: "네, 다시 말씀드릴게요.", cue: "If someone asks for a repeat, confirm that you will repeat it.", explanation: "This keeps the conversation moving." },
  { starter: "천천히 말씀해 주세요.", reply: "네, 천천히 말할게요.", cue: "If someone asks you to slow down, acknowledge it politely.", explanation: "This is a calm and polite confirmation." },
  { starter: "화장실이 어디예요?", reply: "저쪽이에요.", cue: "A direction question gets a short directional reply.", explanation: "Simple directions are often enough in real conversation." },
  { starter: "도와주세요.", reply: "네, 여기요.", cue: "When someone asks for help, an immediate acknowledgement helps.", explanation: "This reply sounds direct and helpful." }
].map(x => {
  const row = window.HANAPATH_SENTENCES.find(r => r.korean === x.starter || r.korean.replace(/[.?]$/, "") === x.starter.replace(/[.?]$/, ""));
  const rowReply = window.HANAPATH_SENTENCES.find(r => r.korean === x.reply || r.korean.replace(/[.?]$/, "") === x.reply.replace(/[.?]$/, ""));
  return {
    starter: x.starter,
    reply: x.reply,
    cue: x.cue,
    explanation: x.explanation,
    voiceText: x.reply,
    starterMeaning: row ? row.english : "",
    replyMeaning: rowReply ? rowReply.english : ""
  };
});

const STORAGE_KEY = "hanapath-v1";

// Populated by rehydrate functions after each screen renders
let els = {};

let currentQuestion = null;
let currentAnswered = false;
let currentQuestionStartedAt = 0;
let quizStateByScope = {};
const GENERIC_PRACTICE_LENGTH = 10;
let practiceQuizSessions = {};
let phaseOneResetArmed = false;
let phaseOneResetTimer = 0;
let phaseOneView = { lessonIndex: 0, mode: "intro", introIndex: 0, slideIndex: 0, questionIndex: 0, results: [], hadMistake: false, answered: false, passed: false };
let currentQuizScope = "alphabet";
let correctToastState = { hideTimer: 0, removeTimer: 0, listenersBound: false };
let retryToastState = { hideTimer: 0, removeTimer: 0, listenersBound: false };
let tapHintTimer = 0;
// Which slice of a screen to show: "learn" (study material only),
// "practice" (quiz only), or "all" (the full legacy screen).
let currentFocus = "all";
const SPEAK_RATE = 0.76;
const KOREAN_VOICE_HINTS = ["neural", "natural", "premium", "enhanced", "google", "microsoft", "samsung", "naver", "kakao"];
const PHASE_ONE_VOICE_MIN_STEP_MS = 650;
const PHASE_ONE_VOICE_CHAR_MS = 170;
const PHASE_ONE_VOICE_GAP_MS = 120;

const MAIN_TABS = ["alphabet", "vocabulary", "sentences", "listening"];
const TAB_SCREEN_IDS = {
  alphabet: "today",
  vocabulary: "review",
  sentences: "speak",
  listening: "library",
};
const TAB_ALIASES = {
  today: "alphabet",
  path: "alphabet",
  review: "vocabulary",
  speak: "sentences",
  library: "listening",
  progress: "listening",
};

const NAV_TABS = ["today", "path", "practice", "library", "listening", "progress"];
const NAV_VISIBLE_TABS = ["today", "path", "practice", "library"];
const NAV_TAB_ALIASES = {
  alphabet: "today",
  today: "today",
  path: "path",
  vocabulary: "library",
  review: "library",
  library: "library",
  sentences: "practice",
  speak: "practice",
  practice: "practice",
  listening: "listening",
  listen: "listening",
  progress: "progress",
};
const NAV_TAB_SCREEN_IDS = {
  today: "today",
  path: "path",
  practice: "speak",
  library: "review",
  listening: "library",
  progress: "progress",
};
const NAV_TAB_MAIN_TABS = {
  today: "alphabet",
  path: "alphabet",
  practice: "sentences",
  library: "vocabulary",
  listening: "listening",
  progress: "alphabet",
};
const NAV_TAB_QUIZ_SCOPES = {
  today: "alphabet",
  path: "alphabet",
  practice: "sentences",
  library: "vocabulary",
  listening: "listening",
  progress: "alphabet",
};
const NAV_TAB_STUDIOS = {
  today: "alphabet",
  path: "alphabet",
  practice: "sentences",
  library: "vocab",
  listening: "listen",
  progress: "alphabet",
};

function normalizeNavTab(value) {
  const raw = String(value || "").toLowerCase();
  const alias = NAV_TAB_ALIASES[raw] || raw;
  return NAV_TABS.includes(alias) ? alias : "today";
}

function getNavTabForMainTab(mainTab) {
  const safe = normalizeMainTab(mainTab);
  if (safe === "alphabet") return "today";
  if (safe === "vocabulary") return "library";
  if (safe === "sentences") return "practice";
  if (safe === "listening") return "listening";
  return "today";
}

function getMainTabForNavTab(navTab) {
  return NAV_TAB_MAIN_TABS[normalizeNavTab(navTab)] || "alphabet";
}

function getQuizScopeForNavTab(navTab) {
  return NAV_TAB_QUIZ_SCOPES[normalizeNavTab(navTab)] || "alphabet";
}

function getStudioForNavTab(navTab) {
  return NAV_TAB_STUDIOS[normalizeNavTab(navTab)] || "alphabet";
}

function clampLevel(value, min = 1, max = 10) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.min(max, Math.max(min, Math.round(number)));
}

function normalizeMainTab(value) {
  const raw = String(value || "").toLowerCase();
  const alias = TAB_ALIASES[raw] || raw;
  return MAIN_TABS.includes(alias) ? alias : "alphabet";
}

function getLegacyTabStartLevel(tab) {
  const legacyLevel = Number(String(state.level || "K0").replace(/\D+/g, "")) || 0;
  const base = Math.min(10, Math.max(1, legacyLevel * 2 + 1));
  if (tab === "alphabet") {
    const done = getAlphabetProgress().completedCount;
    if (!done) return 1;
    return clampLevel(Math.ceil((done / Math.max(1, phaseOneLessons.length)) * 10));
  }
  if (tab === "vocabulary") {
    const known = Array.isArray(state.vocabKnownRanks) ? state.vocabKnownRanks.length : 0;
    return clampLevel(Math.ceil(Math.max(base, 1 + known / 40)));
  }
  if (tab === "sentences") {
    const corrected = Number(state.correct) || 0;
    return clampLevel(Math.ceil(Math.max(base, 1 + corrected / 20)));
  }
  if (tab === "listening") {
    const minutes = Number(state.totalMinutes) || 0;
    return clampLevel(Math.ceil(Math.max(base, 1 + minutes / 90)));
  }
  return 1;
}

function normalizeTabLevels(source) {
  const fallback = {
    alphabet: getLegacyTabStartLevel("alphabet"),
    vocabulary: getLegacyTabStartLevel("vocabulary"),
    sentences: getLegacyTabStartLevel("sentences"),
    listening: getLegacyTabStartLevel("listening"),
  };
  const next = { ...fallback };
  if (source && typeof source === "object") {
    for (const tab of MAIN_TABS) {
      next[tab] = clampLevel(source[tab] ?? fallback[tab]);
    }
  }
  return next;
}

function getTrackLevel(tab) {
  const safeTab = normalizeMainTab(tab);
  return clampLevel(state.tabLevels?.[safeTab] ?? getLegacyTabStartLevel(safeTab));
}

function setTrackLevel(tab, level) {
  stopSpeech();
  const safeTab = normalizeMainTab(tab);
  state.tabLevels = normalizeTabLevels(state.tabLevels);
  state.tabLevels[safeTab] = clampLevel(level);
  saveState();
}

function getCurrentQuizScope() {
  return currentQuizScope || getQuizScopeForNavTab(activeTab) || state.mainTab || "alphabet";
}

function getQuizIds(scope = getCurrentQuizScope()) {
  const safeScope = normalizeMainTab(scope);
  return {
    type: `${safeScope}QuizType`,
    mode: `${safeScope}QuizMode`,
    visual: `${safeScope}QuizVisual`,
    prompt: `${safeScope}QuizPrompt`,
    detail: `${safeScope}QuizDetail`,
    options: `${safeScope}QuizOptions`,
    feedback: `${safeScope}QuizFeedback`,
    speak: `${safeScope}SpeakBtn`,
    next: `${safeScope}NextBtn`,
    round: `${safeScope}Round`,
    streak: `${safeScope}Streak`,
    best: `${safeScope}Best`,
    accuracy: `${safeScope}Accuracy`,
  };
}

function getPracticeQuizSession(scope = getCurrentQuizScope()) {
  return practiceQuizSessions[normalizeMainTab(scope)] || null;
}

function startGenericPracticeSession(scope, total = GENERIC_PRACTICE_LENGTH) {
  const safeScope = normalizeMainTab(scope);
  practiceQuizSessions[safeScope] = {
    scope: safeScope,
    total: Math.max(1, Number(total) || GENERIC_PRACTICE_LENGTH),
    index: 0,
    asked: 0,
    correct: 0,
    streak: 0,
    bestStreak: 0,
    complete: false,
  };
  delete quizStateByScope[safeScope];
  if (currentQuizScope === safeScope) {
    currentQuestion = null;
    currentAnswered = false;
  }
  resetLessonMotion(`generic-${safeScope}`);
  return practiceQuizSessions[safeScope];
}

function renderGenericPracticeSurface(scope) {
  const safeScope = normalizeMainTab(scope);
  if (safeScope === "alphabet") renderAlphabetPractice();
  else if (safeScope === "vocabulary") renderVocabulary();
  else if (safeScope === "listening") renderLibrary();
}

function getLevelBand(level, bands = 10) {
  return Math.min(bands, Math.max(1, Math.ceil(clampLevel(level) / (10 / bands))));
}

function getCurrentBandSlice(items, level, bands = 10) {
  const ordered = [...items];
  const band = getLevelBand(level, bands);
  const chunk = Math.max(1, Math.ceil(ordered.length / bands));
  const start = Math.max(0, (band - 1) * chunk);
  return ordered.slice(start, Math.min(ordered.length, start + chunk));
}

function getRepeatBandSlice(items, level, bands = 10) {
  const ordered = [...items];
  const band = getLevelBand(level, bands);
  const chunk = Math.max(1, Math.ceil(ordered.length / bands));
  return ordered.slice(0, Math.min(ordered.length, band * chunk));
}

function getMainTabLabel(tab) {
  const safe = normalizeMainTab(tab);
  return safe.charAt(0).toUpperCase() + safe.slice(1);
}

const ALPHABET_STAGE_DEFS = [
  {
    id: "vowels",
    label: "Vowels",
    eyebrow: "Foundational vowels",
    title: "Horizontal and vertical basics",
    summary: "Start with the six anchor vowels before anything fancy.",
    interaction: "Visual mapping",
    preview: "ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ",
    lessonIndexes: [0],
  },
  {
    id: "consonants",
    label: "Consonants",
    eyebrow: "Foundational consonants",
    title: "Primary shapes and mnemonic hooks",
    summary: "Learn the base consonants as shape families, not as a wall of symbols.",
    interaction: "Mnemonic hooks",
    preview: "ㄱ ㄴ ㅁ ㅅ ㅇ ㅎ",
    lessonIndexes: [1],
  },
  {
    id: "blocks",
    label: "Blocks",
    eyebrow: "Syllable box logic",
    title: 'Build one Hangul block at a time',
    summary: "Stack consonants and vowels into one square instead of reading a loose row of letters.",
    interaction: "Grid alignment",
    preview: "ㄴ + ㅏ = 나",
    lessonIndexes: [2],
  },
  {
    id: "advanced",
    label: "Advanced",
    eyebrow: "Advanced sets",
    title: "Tense consonants, compound vowels, batchim",
    summary: "Expand the set without losing the base shapes.",
    interaction: "Speed drills",
    preview: "ㅑ ㅕ ㅛ ㅠ · ㄲ ㅃ ㅆ",
    lessonIndexes: [3, 4, 5],
  },
  {
    id: "reading",
    label: "Reading",
    eyebrow: "Application",
    title: "Read real Korean words",
    summary: "Hear a line, read the block, and move toward real text.",
    interaction: "Audio matching",
    preview: "한글",
    lessonIndexes: [6],
  },
];

const ALPHABET_VIEWS = ALPHABET_STAGE_DEFS;

function normalizeAlphabetView(value) {
  const raw = String(value || "").toLowerCase();
  return ALPHABET_STAGE_DEFS.some((view) => view.id === raw) ? raw : getDefaultAlphabetView();
}

function getDefaultAlphabetView() {
  const nextIndex = getFirstIncompletePhaseOneIndex();
  if (nextIndex <= 0) return "vowels";
  if (nextIndex === 1) return "consonants";
  if (nextIndex === 2) return "blocks";
  if (nextIndex <= 5) return "advanced";
  return "reading";
}

function getAlphabetStageDefinition(value = state.alphabetView) {
  const normalized = normalizeAlphabetView(value);
  return ALPHABET_STAGE_DEFS.find((stage) => stage.id === normalized) || ALPHABET_STAGE_DEFS[0];
}

const ALPHABET_QUIZ_POOLS = {
  vowels: {
    initials: SIMPLE_INITIALS,
    medials: SIMPLE_MEDIALS,
    finals: [""],
    deck: ["vowel-shape", "compose", "decompose", "listen", "listen"],
  },
  consonants: {
    initials: SIMPLE_INITIALS,
    medials: SIMPLE_MEDIALS,
    finals: [""],
    deck: ["sound-family", "onset", "compose", "decompose", "listen"],
  },
  blocks: {
    initials: SIMPLE_INITIALS,
    medials: SIMPLE_MEDIALS,
    finals: SIMPLE_FINALS,
    deck: ["compose", "decompose", "batchim", "listen", "compose"],
  },
  advanced: {
    initials: INITIALS,
    medials: MEDIALS,
    finals: BATCHIM_FINALS,
    deck: ["vowel-shape", "sound-family", "tense", "batchim", "compose", "decompose", "listen"],
  },
  reading: {
    initials: INITIALS,
    medials: MEDIALS,
    finals: BATCHIM_FINALS,
    deck: ["listen", "listen", "compose", "decompose", "batchim"],
  },
};

function getAlphabetQuizPools() {
  const stage = getAlphabetStageDefinition();
  const pool = ALPHABET_QUIZ_POOLS[stage.id] || ALPHABET_QUIZ_POOLS.vowels;
  // The board view is a free choice, so a learner can jump to a later view
  // before they've reached it. Finals and batchim drills only make sense once
  // block geometry (the stage that introduces the syllable floor) is unlocked,
  // so before then fall back to open syllables regardless of the chosen view.
  const blocksIndex = ALPHABET_LESSON_IDS.indexOf("block-geometry");
  if (blocksIndex >= 0 && !getAlphabetProgress().isLessonUnlocked(blocksIndex)) {
    return { ...pool, finals: [""], deck: pool.deck.filter((type) => type !== "batchim") };
  }
  return pool;
}

// ─── ALPHABET PROGRESS (canonical source of truth) ──────────────────────────
// Phase One progress is the *longest ordered prefix* of completed lessons, not a
// raw count. A corrupted array like ["anchor-vowels", "strong-consonants"]
// counts as one completed stage (base-consonants is missing), so later stages
// stay locked. Everything that gates or counts alphabet progress should flow
// through getAlphabetProgress() / normalizeCompletedAlphabetIds().
const ALPHABET_LESSON_IDS = phaseOneLessons.map((lesson) => lesson.id);

// ██████████████████████████████████████████████████████████████████████████
// ███ TEMPORARY TEST OVERRIDE — REMEMBER TO FLIP THIS BACK TO `false` ███████
// ██████████████████████████████████████████████████████████████████████████
// Testing escape hatch (owner request 2026-07-03; set back to false at the
// roadmap's E4 final gate on 2026-07-04): when true, every alphabet stage
// AND every Words lesson is immediately reachable, bypassing normal unlock
// order and the "finish the alphabet first" gate. NOT for real learners —
// normal progression (locked stages, gated Words lessons until Phase One is
// complete) is the real product behavior. Progress bars/counts stay honest
// (this only bypasses the access gate, not completion tracking) — see
// isLessonUnlocked() below and isWordLessonUnlocked() further down for the
// two places this is consumed. Flip to true only for local testing.
const TEST_UNLOCK_ALL_STAGES = false;
// Testing control: show a path button that crowns every lesson in a v2
// section. Set false before any learner-facing release; the handler is also
// guarded so a stale button cannot mutate completion when disabled.
const TEST_ENABLE_WORD_SECTION_COMPLETION = false;
// Sentence-path equivalent of the Words section test helper. This remains off
// in the shipped app; it only supports deterministic local path smoke tests.
const TEST_ENABLE_SENTENCE_SECTION_COMPLETION = false;

// Canonicalize a stored completion list: drop unknown ids, drop duplicates, and
// collapse to the longest ordered prefix of the real lesson order.
function normalizeCompletedAlphabetIds(ids) {
  const have = new Set(
    (Array.isArray(ids) ? ids : []).filter((id) => ALPHABET_LESSON_IDS.includes(id)),
  );
  const prefix = [];
  for (const id of ALPHABET_LESSON_IDS) {
    if (!have.has(id)) break;
    prefix.push(id);
  }
  return prefix;
}

function getAlphabetProgress() {
  const completedIds = normalizeCompletedAlphabetIds(state.phaseOneCompleted);
  const completedCount = completedIds.length;
  const total = ALPHABET_LESSON_IDS.length;
  const complete = completedCount >= total;
  const currentIndex = complete ? total : completedCount;
  return {
    orderedLessonIds: ALPHABET_LESSON_IDS,
    completedIds,
    completedCount,
    currentIndex,
    currentStage: complete ? total : completedCount + 1,
    total,
    complete,
    nextLesson: phaseOneLessons[currentIndex] || null,
    // A lesson is unlocked once every lesson before it is complete.
    isLessonUnlocked: (index) =>
      Number.isInteger(index) && index >= 0 && index < total && (TEST_UNLOCK_ALL_STAGES || index <= completedCount),
  };
}

// One-time defensive cleanup of stored progress (debug seed, gaps, duplicates,
// unknown ids). Runs at load before anything reads phaseOneCompleted.
function migrateAlphabetProgress() {
  const before = JSON.stringify(Array.isArray(state.phaseOneCompleted) ? state.phaseOneCompleted : null);
  let cleaned = normalizeCompletedAlphabetIds(state.phaseOneCompleted);
  // A profile that has not finished onboarding cannot have legitimate alphabet
  // progress, so any completion here is leftover debug/seed data — clear it.
  if (!state.onboarded) cleaned = [];
  state.phaseOneCompleted = cleaned;
  if (JSON.stringify(cleaned) !== before) saveState();
}

const state = loadState();
if (state.soundEffectPresetVersion !== 3) {
  if (state.activeCorrectSound === 2 || state.activeCorrectSound === 6 || !Number.isInteger(state.activeCorrectSound)) {
    state.activeCorrectSound = 14;
  }
  if (state.activeIncorrectSound === 1 || !Number.isInteger(state.activeIncorrectSound)) {
    state.activeIncorrectSound = 2;
  }
  state.soundEffectPresetVersion = 3;
  saveState();
}
state.navTab = normalizeNavTab(state.navTab || getNavTabForMainTab(state.mainTab) || "today");
state.mainTab = normalizeMainTab(state.mainTab || getMainTabForNavTab(state.navTab) || "alphabet");
state.tabLevels = normalizeTabLevels(state.tabLevels);
state.alphabetView = normalizeAlphabetView(state.alphabetView || getDefaultAlphabetView());
state.phaseOneActive = Number.isInteger(state.phaseOneActive)
  ? Math.min(Math.max(state.phaseOneActive, 0), phaseOneLessons.length - 1)
  : 0;
state.route = normalizeRoute(state.route);
phaseOneView.lessonIndex = state.phaseOneActive;
state.vocabQuery = typeof state.vocabQuery === "string" ? state.vocabQuery : "";
state.vocabBand = typeof state.vocabBand === "string" ? state.vocabBand : "all";
state.vocabView = normalizeVocabView(state.vocabView || "learn");
state.vocabPage = Number.isInteger(state.vocabPage) ? Math.max(0, state.vocabPage) : 0;
state.vocabActiveRank = Number.isInteger(state.vocabActiveRank) ? Math.max(1, state.vocabActiveRank) : 1;
state.vocabKnownRanks = Array.isArray(state.vocabKnownRanks)
  ? [...new Set(state.vocabKnownRanks.map((value) => Number(value)).filter((value) => Number.isInteger(value) && value > 0))]
  : [];
state.vocabHardRanks = Array.isArray(state.vocabHardRanks)
  ? [...new Set(state.vocabHardRanks.map((value) => Number(value)).filter((value) => Number.isInteger(value) && value > 0))]
  : [];
migrateAlphabetProgress();
// migrateVocabState() runs inside init() → initWordBanks(); it depends on
// consts declared further down this file, so it can't run at load time here.

// (quick-nav removed in HanaPath)

function loadState() {
  const defaults = {
    onboarded: false,
    goal: "media",
    weeklyHours: 10,
    speakingAnxiety: "medium",
    knowsHangul: false,
    level: "K0",
    navTab: "today",
    route: { hub: "learn", item: null, stage: null },
    learnInProgress: false,
    quickRefActive: false,
    // Alphabet Drill Lab: jamo → miss count, feeds the Weak Spots drill mode.
    alphabetWeakSpots: {},
    // One-time flag: show the Drill Lab first-open explainer only once.
    drillLabSeen: false,
    mainTab: "alphabet",
    alphabetView: "vowels",
    // [2026-06-29] Persisted prefs for the Entire Korean Alphabet board (view mode + label density).
    alphabetBoardMode: "keyboard",
    alphabetBoardLabels: "none",
    activeCorrectSound: 14,
    activeIncorrectSound: 2,
    soundEffectPresetVersion: 3,
    tabLevels: { alphabet: 1, vocabulary: 1, sentences: 1, listening: 1 },
    skills: { vocab: 8, grammar: 5, reading: 6, listening: 3, speaking: 2, pronunciation: 4, writing: 2 },
    round: 1, asked: 0, correct: 0, streak: 0, bestStreak: 0,
    studio: "alphabet",
    phaseOneCompleted: [],
    phaseOneActive: 0,
    todayDate: "",
    todayDone: [],
    totalMinutes: 0,
    studyDays: 0,
    lastDate: "",
    libTab: "phrases",
    pendingPathLesson: null,
    vocabQuery: "",
    vocabBand: "all",
    vocabView: "learn",
    vocabPage: 0,
    vocabActiveRank: 1,
    vocabKnownRanks: [],
    vocabHardRanks: [],
    // Words section (see docs/WORDS_SECTION_MASTER_SPEC.md): SRS records per
    // curated word id, lesson progression, and Word Bank browse state.
    vocabSrs: {},
    vocabReviewEvents: [],
    vocabLessonCompleted: [],
    vocabLessonActive: null,
    vocabLessonSession: null,
    vocabDailyNewTarget: 5,
    wordPathCategory: "",
    wordPathLevel: "all",
    wordBankQuery: "",
    wordBankFilter: "all",
    wordBankSort: "curriculum",
    wordBankPage: 0,
    wordBankPageSize: 50,
    wordQuickRefActive: false,
    wordQuickRefReturn: null,
    letterSrs: {},
    // Recent completed Hangul-writing sessions for learner-facing comparisons.
    hangulWritingHistory: [],
    // Sentences section (docs/SENTENCES_TEACHING_SPEC.md): chosen difficulty
    // band, per-sentence practice records, and a session counter. Additive —
    // older saved states get the defaults via getSentencesProgress().
    sentencesProgress: { band: 1, results: {}, sessionsDone: 0 },
    sentenceLessonSession: null,
    speakDone: false,
    resetArmed: false,
    // Settings → Theme colors: accent palette id, see THEME_DEFS.
    theme: "ocean",
    // Free-drawing preferences. Grading uses stroke centre-lines, so visible
    // ink width never changes recognition accuracy.
    writingLineWidth: 14,
    // ML Kit is an explicit native-only opt-in while M3 device evidence is
    // still open. $Q remains authoritative for learner grading everywhere.
    useMLKit: false,
    reduceMotion: false,
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return { ...defaults, ...parsed, skills: { ...defaults.skills, ...(parsed.skills || {}) } };
  } catch {
    return defaults;
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors; the app still works without persistence.
  }
}

function getBackupPayload() {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    state: JSON.parse(JSON.stringify(state)),
  };
}

function getBackupFilename() {
  return `hanapath-backup-${new Date().toISOString().slice(0, 10)}.json`;
}

function downloadBackupFile() {
  const payload = getBackupPayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = getBackupFilename();
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function parseBackupState(text) {
  const parsed = JSON.parse(String(text || ""));
  if (parsed && typeof parsed === "object" && parsed.state && typeof parsed.state === "object") {
    return parsed.state;
  }
  if (parsed && typeof parsed === "object") {
    return parsed;
  }
  throw new Error("Backup file does not contain state data.");
}

const LEVEL_ORDER = ["K0", "K1", "K2", "K3", "K4", "K5"];

if (!LEVEL_ORDER.includes(state.level)) {
  state.level = "K0";
}

function getLevelIndex(level) {
  const index = LEVEL_ORDER.indexOf(level);
  return index >= 0 ? index : 0;
}

function getUnlockedLevelFromProgress() {
  let unlockedIndex = 0;

  if (getAlphabetProgress().complete) {
    unlockedIndex = 1;
  }

  if (unlockedIndex >= 1 && state.correct >= 20) {
    unlockedIndex = Math.max(unlockedIndex, 2);
  }

  if (unlockedIndex >= 2 && state.correct >= 50 && state.vocabKnownRanks.length >= 20) {
    unlockedIndex = Math.max(unlockedIndex, 3);
  }

  if (unlockedIndex >= 3 && state.correct >= 100 && state.studyDays >= 3) {
    unlockedIndex = Math.max(unlockedIndex, 4);
  }

  if (unlockedIndex >= 4 && state.correct >= 180 && state.vocabKnownRanks.length >= 100) {
    unlockedIndex = Math.max(unlockedIndex, 5);
  }

  return LEVEL_ORDER[unlockedIndex];
}

function syncLevelProgress() {
  const unlockedLevel = getUnlockedLevelFromProgress();
  if (getLevelIndex(unlockedLevel) > getLevelIndex(state.level)) {
    state.level = unlockedLevel;
    return true;
  }
  return false;
}

function getUnlockedStudioIds(level = state.level) {
  const index = getLevelIndex(level);
  const unlocked = new Set(["alphabet"]);

  if (index >= 1) {
    unlocked.add("vocab");
    unlocked.add("vocabulary");
  }
  if (index >= 2) {
    unlocked.add("sentences");
  }
  if (index >= 3) {
    unlocked.add("listen");
    unlocked.add("listening");
  }
  if (index >= 4) {
    unlocked.add("sound");
    unlocked.add("survival");
  }
  if (index >= 5) {
    unlocked.add("grammar");
    unlocked.add("verb");
    unlocked.add("conversation");
  }

  return unlocked;
}

function isStudioUnlocked(id, level = state.level) {
  if (TEST_UNLOCK_ALL_STAGES) return true;
  return getUnlockedStudioIds(level).has(id);
}

function getDefaultStudioForLevel(level = state.level) {
  const index = getLevelIndex(level);
  if (index <= 0) return "alphabet";
  if (index === 1) return "vocab";
  if (index === 2) return "sentences";
  if (index === 3) return "listen";
  if (index === 4) return "survival";
  return "grammar";
}

function normalizeStudioSelection() {
  const safeStudio = getStudio();
  if (!getUnlockedStudioIds(state.level).has(safeStudio)) {
    state.studio = getDefaultStudioForLevel();
    return true;
  }
  return false;
}

function refreshProgressionState() {
  const leveledUp = syncLevelProgress();
  const studioChanged = normalizeStudioSelection();
  if (leveledUp || studioChanged) {
    saveState();
  }
  return leveledUp || studioChanged;
}

function getLevelUnlockText(level) {
  if (level === "K0") return "Starts here";
  if (level === "K1") return "Finish all K0 stages";
  if (level === "K2") return "20 correct answers and 20 known words";
  if (level === "K3") return "50 correct answers and 20 known words";
  if (level === "K4") return "100 correct answers and 3 study days";
  if (level === "K5") return "180 correct answers and 100 known words";
  return "Keep going";
}

function isFreshProfile() {
  return (
    state.asked === 0 &&
    state.correct === 0 &&
    state.studyDays === 0 &&
    state.totalMinutes === 0 &&
    getAlphabetProgress().completedCount === 0 &&
    state.vocabKnownRanks.length === 0 &&
    state.vocabHardRanks.length === 0
  );
}

const VOCAB_CSV_URL = "./korean_5000_claude_ready.csv";
// Supplementary long-tail frequency list (source ranks 5,194+). Reference and
// search only — never part of lessons, quizzes, or curation. Words in this
// tier get generated Opus audio like everything else (generate_assets.py
// reads this CSV); speak() falls back to speechSynthesis for any gaps.
const SUPPLEMENTARY_CSV_URL = "./korean_supplementary_15k.csv";
const VOCAB_PAGE_SIZE = 40;
const VOCAB_BANDS = ["1-500", "501-1000", "1001-1500", "1501-2000", "2001-2500", "2501-3000", "3001-3500", "3501-4000", "4001-4500", "4501-5000"];
const VOCAB_VIEWS = [
  { id: "learn", label: "Today" },
  { id: "browse", label: "Browse" },
  { id: "test", label: "Quiz" },
  { id: "review", label: "Review" },
  { id: "metrics", label: "Insights" },
];

if (!["all", ...VOCAB_BANDS].includes(state.vocabBand)) {
  state.vocabBand = "all";
}

let vocabBank = [];
let vocabBankReady = false;
let vocabBankLoading = null;
let vocabBankError = "";
let vocabByRank = new Map();
let vocabKoreanChoices = [];
let vocabEnglishChoices = [];
let vocabPronunciationChoices = [];
let vocabRomanizationChoices = [];

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (quoted) {
      if (char === "\"") {
        if (text[index + 1] === "\"") {
          cell += "\"";
          index += 1;
        } else {
          quoted = false;
        }
      } else {
        cell += char;
      }
      continue;
    }

    if (char === "\"") {
      quoted = true;
      continue;
    }

    if (char === ",") {
      row.push(cell);
      cell = "";
      continue;
    }

    if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    if (char !== "\r") {
      cell += char;
    }
  }

  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

function normalizeVocabEntry(row) {
  const rank = Number(row.rank);
  const korean = String(row.korean_spelling || "").trim();
  const englishSpelling = String(row.english_spelling_romanization || row.english_spelling || row.romanization || "").trim();
  const pronunciation = String(row.pronunciation || row.pronunciation_romanization || englishSpelling).trim();
  const frequencyBand = String(row.frequency_band || "").trim() || "1-1000";
  const syllables = Number(row.syllables);
  const tokenNote = String(row.token_note || "").trim();
  const sourceUrl = String(row.source_url || "").trim();

  if (!Number.isInteger(rank) || rank <= 0 || !korean) {
    return null;
  }

  const finalEnglish = englishSpelling || korean;
  const finalPron = pronunciation || finalEnglish || korean;
  const finalSyllables = Number.isInteger(syllables) && syllables > 0 ? syllables : 1;

  return {
    rank,
    korean,
    englishSpelling: finalEnglish,
    pronunciation: finalPron,
    romanization: finalEnglish,
    frequencyBand,
    syllables: finalSyllables,
    tokenNote,
    sourceUrl,
    // Cached lowercase fields for instant O(1) filter matching
    _rankStr: String(rank),
    _koreanLower: korean.toLowerCase(),
    _englishLower: finalEnglish.toLowerCase(),
    _pronLower: finalPron.toLowerCase(),
    _bandLower: frequencyBand.toLowerCase(),
    _syllablesStr: String(finalSyllables),
    _noteLower: tokenNote.toLowerCase(),
  };
}

function dedupeStrings(values) {
  return [...new Set(values.filter(Boolean))];
}

async function loadVocabBank() {
  if (vocabBankLoading) {
    return vocabBankLoading;
  }

  vocabBankLoading = (async () => {
    try {
      const response = await fetch(VOCAB_CSV_URL, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Failed to load vocab CSV (${response.status})`);
      }

      const parsed = parseCSV(await response.text());
      const [header, ...rows] = parsed;
      if (!header || header.length < 4) {
        throw new Error("Vocab CSV header is missing");
      }

      const normalizedRows = rows
        .map((row) => {
          const record = {};
          header.forEach((key, index) => {
            record[key] = row[index] || "";
          });
          return normalizeVocabEntry(record);
        })
        .filter(Boolean)
        .sort((a, b) => a.rank - b.rank);

      vocabBank = normalizedRows;
      vocabByRank = new Map(normalizedRows.map((entry) => [entry.rank, entry]));
      vocabKoreanChoices = dedupeStrings(normalizedRows.map((entry) => entry.korean));
      vocabEnglishChoices = dedupeStrings(normalizedRows.map((entry) => entry.englishSpelling));
      vocabPronunciationChoices = dedupeStrings(normalizedRows.map((entry) => entry.pronunciation));
      vocabRomanizationChoices = vocabEnglishChoices;
      vocabBankError = "";
      vocabBankReady = true;
      updateVocabSkill();
      return vocabBank;
    } catch (error) {
      vocabBank = [];
      vocabByRank = new Map();
      vocabKoreanChoices = [];
      vocabEnglishChoices = [];
      vocabPronunciationChoices = [];
      vocabRomanizationChoices = [];
      vocabBankError = error instanceof Error ? error.message : "Unable to load vocabulary bank.";
      vocabBankReady = true;
      return vocabBank;
    }
  })();

  return vocabBankLoading;
}

let supplementaryBank = [];
let supplementaryBankLoading = null;

async function loadSupplementaryBank() {
  if (supplementaryBankLoading) return supplementaryBankLoading;

  supplementaryBankLoading = (async () => {
    try {
      const response = await fetch(SUPPLEMENTARY_CSV_URL, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Failed to load supplementary CSV (${response.status})`);
      }

      const parsed = parseCSV(await response.text());
      const [header, ...rows] = parsed;
      if (!header || header.length < 4) {
        throw new Error("Supplementary CSV header is missing");
      }

      supplementaryBank = rows
        .map((row) => {
          const record = {};
          header.forEach((key, index) => {
            record[key] = row[index] || "";
          });
          return normalizeVocabEntry(record);
        })
        .filter(Boolean)
        .sort((a, b) => a.rank - b.rank);
      return supplementaryBank;
    } catch (error) {
      // Non-fatal: the app works without the supplementary tier.
      supplementaryBank = [];
      return supplementaryBank;
    }
  })();

  return supplementaryBankLoading;
}

function getVocabKnownSet() {
  return new Set(state.vocabKnownRanks || []);
}

function getVocabHardSet() {
  return new Set(state.vocabHardRanks || []);
}

function updateVocabSkill() {
  if (!state.skills) {
    return;
  }

  const knownCount = state.vocabKnownRanks.length;
  const bonus = Math.min(100, Math.max(0, 8 + Math.floor(knownCount / 8)));
  state.skills.vocab = bonus;
}

function setVocabStatus(rank, status) {
  const safeRank = Number(rank);
  if (!Number.isInteger(safeRank) || safeRank <= 0) {
    return;
  }

  const known = new Set(state.vocabKnownRanks || []);
  const hard = new Set(state.vocabHardRanks || []);

  if (status === "known") {
    known.add(safeRank);
    hard.delete(safeRank);
  } else if (status === "hard") {
    hard.add(safeRank);
    known.delete(safeRank);
  } else {
    known.delete(safeRank);
    hard.delete(safeRank);
  }

  state.vocabKnownRanks = [...known].sort((a, b) => a - b);
  state.vocabHardRanks = [...hard].sort((a, b) => a - b);
  updateVocabSkill();
  saveState();
}

function getVocabStudyBands() {
  const level = getTrackLevel("vocabulary");
  return VOCAB_BANDS.slice(0, getLevelBand(level, VOCAB_BANDS.length));
}

function getVocabStudyPool() {
  const bands = new Set(getVocabStudyBands());
  const pool = vocabBank.filter((entry) => bands.has(entry.frequencyBand));
  return pool.length ? pool : vocabBank;
}

function getVocabStudyEntry(rank) {
  return vocabByRank.get(Number(rank)) || null;
}

function normalizeVocabView(value) {
  const raw = String(value || "").toLowerCase();
  return ["learn", "browse", "test", "review", "metrics"].includes(raw) ? raw : "learn";
}

function renderVocabStudyRows(items, limit = 6) {
  return items.slice(0, limit).map((entry) => {
    const english = entry.englishSpelling || entry.romanization || "";
    const pronunciation = entry.pronunciation || english;
    return `
      <div class="study-row">
        <div>
          <div class="study-row-ko" lang="ko">${escapeHtml(entry.korean)}</div>
          <div class="study-row-sub">English spelling: ${escapeHtml(english)}</div>
          <div class="fs-xs text-muted-2 mt-4">Pronunciation: ${escapeHtml(pronunciation)} · ${escapeHtml(entry.frequencyBand)}</div>
        </div>
        ${hearIconButton(entry.korean, "data-vocab-hear")}
      </div>
    `;
  }).join("");
}

function bindVocabBrowser(root, vocabView, rerender) {
  if (!root || !vocabView) return;

  const search = root.querySelector("#vocabSearch");
  if (search) {
    search.addEventListener("input", () => {
      state.vocabQuery = search.value;
      state.vocabPage = 0;
      saveState();
      rerender();
    });
  }

  root.querySelectorAll("[data-vocab-band]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.vocabBand = btn.dataset.vocabBand || "all";
      state.vocabPage = 0;
      saveState();
      rerender();
    });
  });

  const prevPage = root.querySelector("#vocabPrevPage");
  const nextPage = root.querySelector("#vocabNextPage");
  const randomBtn = root.querySelector("#vocabRandomBtn");
  const knownBtn = root.querySelector("#vocabKnownBtn");
  const hardBtn = root.querySelector("#vocabHardBtn");

  if (prevPage) {
    prevPage.addEventListener("click", () => {
      state.vocabPage = Math.max(0, (state.vocabPage || 0) - 1);
      saveState();
      rerender();
    });
  }

  if (nextPage) {
    nextPage.addEventListener("click", () => {
      state.vocabPage = Math.min(vocabView.pageCount - 1, (state.vocabPage || 0) + 1);
      saveState();
      rerender();
    });
  }

  if (randomBtn && vocabView.filtered.length) {
    randomBtn.addEventListener("click", () => {
      const item = randomItem(vocabView.filtered);
      state.vocabActiveRank = item.rank;
      const index = vocabView.filtered.findIndex((entry) => entry.rank === item.rank);
      state.vocabPage = index >= 0 ? Math.floor(index / VOCAB_PAGE_SIZE) : 0;
      saveState();
      rerender();
    });
  }

  if (knownBtn && vocabView.active) {
    knownBtn.addEventListener("click", () => {
      toggleVocabKnown(vocabView.active.rank);
      rerender();
    });
  }

  if (hardBtn && vocabView.active) {
    hardBtn.addEventListener("click", () => {
      toggleVocabHard(vocabView.active.rank);
      rerender();
    });
  }

  root.querySelectorAll("[data-vocab-rank]").forEach((row) => {
    const rank = Number(row.dataset.vocabRank);
    const entry = getVocabStudyEntry(rank);
    if (!entry) {
      return;
    }

    const selectRow = () => {
      state.vocabActiveRank = entry.rank;
      const filtered = findVocabMatches(state.vocabQuery, state.vocabBand);
      const index = filtered.findIndex((item) => item.rank === entry.rank);
      if (index >= 0) {
        state.vocabPage = Math.floor(index / VOCAB_PAGE_SIZE);
      }
      saveState();
      rerender();
    };

    row.addEventListener("click", selectRow);
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectRow();
      }
    });
  });

  root.querySelectorAll("[data-vocab-hear]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      speak(btn.dataset.vocabHear || "");
    });
  });
}

function findVocabMatches(query, band) {
  const trimmed = String(query || "").trim().toLowerCase();
  const activeBand = band || "all";
  if (!trimmed) {
    return activeBand === "all"
      ? vocabBank
      : vocabBank.filter((entry) => entry.frequencyBand === activeBand);
  }
  return vocabBank.filter((entry) => {
    if (activeBand !== "all" && entry.frequencyBand !== activeBand) {
      return false;
    }
    return (
      (entry._rankStr && entry._rankStr.includes(trimmed)) ||
      (entry._koreanLower && entry._koreanLower.includes(trimmed)) ||
      (entry._englishLower && entry._englishLower.includes(trimmed)) ||
      (entry._pronLower && entry._pronLower.includes(trimmed)) ||
      (entry._bandLower && entry._bandLower.includes(trimmed)) ||
      (entry._syllablesStr && entry._syllablesStr.includes(trimmed)) ||
      (entry._noteLower && entry._noteLower.includes(trimmed))
    );
  });
}

function toggleVocabKnown(rank) {
  const safeRank = Number(rank);
  if (!Number.isInteger(safeRank) || safeRank <= 0) {
    return;
  }

  if (getVocabKnownSet().has(safeRank)) {
    setVocabStatus(safeRank, "clear");
  } else {
    setVocabStatus(safeRank, "known");
  }
}

function toggleVocabHard(rank) {
  const safeRank = Number(rank);
  if (!Number.isInteger(safeRank) || safeRank <= 0) {
    return;
  }

  if (getVocabHardSet().has(safeRank)) {
    setVocabStatus(safeRank, "clear");
  } else {
    setVocabStatus(safeRank, "hard");
  }
}

function buildVocabLibraryView() {
  if (!vocabBankReady) {
    return {
      html: `
        <div class="card vocab-loading">
          <div class="eyebrow mb-12">5,000-word bank</div>
          <div class="screen-sub" style="margin-bottom:0;">Loading the vocabulary file...</div>
        </div>
      `,
      filtered: [],
      page: 0,
      pageCount: 1,
      pageItems: [],
      active: null,
      knownCount: getVocabKnownSet().size,
      hardCount: getVocabHardSet().size,
      total: 0,
    };
  }

  const knownSet = getVocabKnownSet();
  const hardSet = getVocabHardSet();
  const filtered = findVocabMatches(state.vocabQuery, state.vocabBand);
  const total = vocabBank.length;
  const knownCount = knownSet.size;
  const hardCount = hardSet.size;
  const pageCount = Math.max(1, Math.ceil(filtered.length / VOCAB_PAGE_SIZE));
  const page = Math.min(Math.max(state.vocabPage || 0, 0), pageCount - 1);
  const start = page * VOCAB_PAGE_SIZE;
  const pageItems = filtered.slice(start, start + VOCAB_PAGE_SIZE);
  const active = filtered.find((entry) => entry.rank === state.vocabActiveRank) || filtered[0] || null;
  const activeRank = active ? active.rank : state.vocabActiveRank;
  const progressPct = total ? Math.round((knownCount / total) * 100) : 0;
  const activeKnown = active ? knownSet.has(active.rank) : false;
  const activeHard = active ? hardSet.has(active.rank) : false;

  const bandButtons = ["all", ...VOCAB_BANDS]
    .map((band) => {
      const label = band === "all" ? "All bands" : band;
      return `<button class="filter-chip ${state.vocabBand === band ? "active" : ""}" type="button" data-vocab-band="${band}">${label}</button>`;
    })
    .join("");

  const heroActions = active
    ? `
      <div class="vocab-actions">
        <button class="button secondary compact" id="vocabHearBtn" type="button" data-vocab-hear="${escapeHtml(active.korean)}">Hear</button>
        <button class="button success compact" id="vocabKnownBtn" type="button" data-vocab-toggle-known="${active.rank}">${activeKnown ? "Known ✓" : "Mark known"}</button>
        <button class="button secondary compact" id="vocabHardBtn" type="button" data-vocab-toggle-hard="${active.rank}">${activeHard ? "Hard ✓" : "Mark hard"}</button>
        <button class="button primary compact" id="vocabRandomBtn" type="button">Random word</button>
      </div>
    `
    : "";

  const heroMeta = active
    ? `
      <div class="vocab-meta-grid">
        <div class="vocab-meta-box"><span>Korean spelling</span><strong lang="ko">${escapeHtml(active.korean)}</strong></div>
        <div class="vocab-meta-box"><span>English spelling</span><strong>${escapeHtml(active.englishSpelling || active.romanization)}</strong></div>
        <div class="vocab-meta-box"><span>Pronunciation</span><strong>${escapeHtml(active.pronunciation || active.englishSpelling || active.romanization)}</strong></div>
        <div class="vocab-meta-box"><span>Band</span><strong>${escapeHtml(active.frequencyBand)}</strong></div>
        <div class="vocab-meta-box"><span>Syllables</span><strong>${active.syllables}</strong></div>
        <div class="vocab-meta-box"><span>Status</span><strong>${activeKnown ? "Known" : activeHard ? "Hard" : "Fresh"}</strong></div>
      </div>
      ${active.tokenNote ? `<div class="vocab-note">${escapeHtml(active.tokenNote)}</div>` : ""}
    `
    : `<div class="screen-sub" style="margin-bottom:0;">No vocabulary entry matched the current filters.</div>`;

  return {
    html: `
      <div class="card vocab-hero">
        <div class="vocab-hero-top">
          <div>
            <div class="eyebrow">5,000-word bank</div>
            <div class="vocab-hero-count">${knownCount} known • ${hardCount} hard • ${total} total</div>
          </div>
          <span class="pill accent">${progressPct}% known</span>
        </div>
        ${active
          ? `
            <div class="vocab-current">
              <div class="vocab-rank">#${active.rank}</div>
              <div class="vocab-word" lang="ko">${escapeHtml(active.korean)}</div>
              <div class="vocab-rom">${escapeHtml(active.englishSpelling || active.romanization)}</div>
              <div class="vocab-detail">${escapeHtml(active.pronunciation || active.englishSpelling || active.romanization)}</div>
              <div class="vocab-detail">${escapeHtml(active.frequencyBand)} • ${active.syllables} syllable${active.syllables === 1 ? "" : "s"}</div>
            </div>
            ${heroMeta}
            ${heroActions}
          `
          : ""}
      </div>

      <div class="card vocab-panel">
        <input class="vocab-search" id="vocabSearch" type="search" placeholder="Search Korean, English spelling, pronunciation, rank, or note" value="${escapeHtml(state.vocabQuery)}" />
        <div class="vocab-filters">${bandButtons}</div>
        <div class="vocab-summary">${filtered.length} of ${total} words shown</div>
        <div class="vocab-pagebar">
          <button class="button secondary compact" id="vocabPrevPage" type="button" ${page <= 0 ? "disabled" : ""}>Prev</button>
          <span class="vocab-pageinfo">Page ${page + 1} of ${pageCount}</span>
          <button class="button secondary compact" id="vocabNextPage" type="button" ${page >= pageCount - 1 ? "disabled" : ""}>Next</button>
        </div>
        <div class="vocab-list">
          ${pageItems
            .map((entry) => {
              const rowKnown = knownSet.has(entry.rank);
              const rowHard = hardSet.has(entry.rank);
              const rowActive = activeRank === entry.rank;
              return `
                <div class="vocab-row ${rowActive ? "active" : ""} ${rowKnown ? "known" : ""} ${rowHard ? "hard" : ""}" role="button" tabindex="0" data-vocab-rank="${entry.rank}">
                  <div class="vocab-row-rank">#${entry.rank}</div>
                  <div class="vocab-row-main">
                    <div class="vocab-row-ko" lang="ko">${escapeHtml(entry.korean)}</div>
                    <div class="vocab-row-rom">${escapeHtml(entry.englishSpelling || entry.romanization)}</div>
                    <div class="vocab-row-meta">Pronunciation: ${escapeHtml(entry.pronunciation || entry.englishSpelling || entry.romanization)}</div>
                    <div class="vocab-row-meta">${escapeHtml(entry.frequencyBand)} • ${entry.syllables} syllable${entry.syllables === 1 ? "" : "s"}</div>
                    <div class="vocab-row-tags">
                      ${rowKnown ? `<span class="vocab-status known">Known</span>` : ""}
                      ${rowHard ? `<span class="vocab-status hard">Hard</span>` : ""}
                    </div>
                  </div>
                  ${hearIconButton(entry.korean, "data-vocab-hear")}
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `,
    filtered,
    page,
    pageCount,
    pageItems,
    active,
    activeRank,
    knownCount,
    hardCount,
    total,
  };
}

function getVocabReviewEvents() {
  return Array.isArray(state.vocabReviewEvents) ? state.vocabReviewEvents : [];
}

function formatVocabLatencyMs(ms) {
  const safe = Math.max(0, Math.round(Number(ms) || 0));
  if (safe < 1000) return `${safe}ms`;
  if (safe < 60000) return `${(safe / 1000).toFixed(safe < 10000 ? 1 : 0)}s`;
  return `${(safe / 60000).toFixed(safe < 600000 ? 1 : 0)}m`;
}

function formatVocabRelativeTime(at) {
  const delta = Date.now() - Number(at || 0);
  if (!Number.isFinite(delta) || delta < 60000) return "just now";
  if (delta < 3600000) return `${Math.max(1, Math.round(delta / 60000))}m ago`;
  if (delta < VOCAB_ANALYTICS_DAY_MS) return `${Math.max(1, Math.round(delta / 3600000))}h ago`;
  if (delta < 7 * VOCAB_ANALYTICS_DAY_MS) return `${Math.max(1, Math.round(delta / VOCAB_ANALYTICS_DAY_MS))}d ago`;
  return new Date(at).toLocaleDateString([], { month: "short", day: "numeric" });
}

function formatVocabDueTime(due, now = Date.now()) {
  const safeDue = Number(due || 0);
  if (!safeDue || !Number.isFinite(safeDue)) return "Not scheduled";
  const delta = safeDue - now;
  if (delta <= 0) return "Due now";
  if (delta < 60000) return "in <1m";
  if (delta < 3600000) return `in ${Math.max(1, Math.round(delta / 60000))}m`;
  if (delta < VOCAB_ANALYTICS_DAY_MS) return `in ${Math.max(1, Math.round(delta / 3600000))}h`;
  if (delta < 30 * VOCAB_ANALYTICS_DAY_MS) return `in ${Math.max(1, Math.round(delta / VOCAB_ANALYTICS_DAY_MS))}d`;
  return new Date(safeDue).toLocaleDateString([], { month: "short", day: "numeric" });
}

function formatVocabPercent(value) {
  return Number.isFinite(value) ? `${Math.round(value)}%` : "—";
}

function formatVocabRatio(value) {
  return Number.isFinite(value) ? `${Math.round(value * 100)}%` : "—";
}

function computeVocabRetention(events, days) {
  const cutoff = Date.now() - (days * VOCAB_ANALYTICS_DAY_MS);
  let anchorIndex = -1;
  for (let index = events.length - 1; index >= 0; index -= 1) {
    if (events[index].at <= cutoff) {
      anchorIndex = index;
      break;
    }
  }
  if (anchorIndex < 0) return { pct: null, samples: 0 };
  const followUp = events.slice(anchorIndex + 1).find((event) => event.at > cutoff);
  if (!followUp) return { pct: null, samples: 0 };
  return { pct: followUp.result === "correct" ? 1 : 0, samples: 1 };
}

function computeVocabMastery(summary) {
  const accuracy = summary.total ? summary.correct / summary.total : 0;
  const recentAccuracy = Number.isFinite(summary.recentAccuracy) ? summary.recentAccuracy : accuracy;
  const latencyScore = summary.total ? Math.max(0, Math.min(1, 1 - (summary.avgLatencyMs / 12000))) : 0;
  const confidenceScore = Number.isFinite(summary.avgConfidence) ? summary.avgConfidence : accuracy;
  const sampleScore = Math.min(1, summary.total / 6);
  return Math.round((accuracy * 0.45 + recentAccuracy * 0.2 + latencyScore * 0.2 + confidenceScore * 0.1 + sampleScore * 0.05) * 100);
}

function buildVocabWordAnalytics(wordId, events) {
  const word = curatedWordsById.get(wordId);
  if (!word || !Array.isArray(events) || !events.length) return null;
  const sorted = [...events].sort((a, b) => a.at - b.at);
  const total = sorted.length;
  const correct = sorted.filter((event) => event.result === "correct").length;
  const incorrect = sorted.filter((event) => event.result === "incorrect").length;
  const skipped = sorted.filter((event) => event.result === "skipped").length;
  const avgLatencyMs = Math.round(sorted.reduce((sum, event) => sum + (Number(event.latencyMs) || 0), 0) / total);
  const avgConfidence = sorted.reduce((sum, event) => sum + (Number(event.confidence) || 0), 0) / total;
  const recent = sorted.slice(-5);
  const recentAccuracy = recent.length ? recent.filter((event) => event.result === "correct").length / recent.length : null;
  const retention1w = computeVocabRetention(sorted, 7);
  const retention1m = computeVocabRetention(sorted, 30);
  const mastery = computeVocabMastery({ total, correct, recentAccuracy, avgLatencyMs, avgConfidence });
  const last = sorted[sorted.length - 1];
  return {
    wordId,
    word,
    events: sorted,
    total,
    correct,
    incorrect,
    skipped,
    avgLatencyMs,
    avgConfidence,
    recentAccuracy,
    retention1w,
    retention1m,
    mastery,
    lastAt: last?.at || 0,
    lastResult: last?.result || "correct",
  };
}

function getVocabAnalyticsSnapshot() {
  const events = getVocabReviewEvents();
  const byWord = new Map();
  events.forEach((event) => {
    if (!event || !event.wordId || !curatedWordsById.has(event.wordId)) return;
    if (!byWord.has(event.wordId)) byWord.set(event.wordId, []);
    byWord.get(event.wordId).push(event);
  });

  const wordSummaries = [...byWord.entries()]
    .map(([wordId, wordEvents]) => buildVocabWordAnalytics(wordId, wordEvents))
    .filter(Boolean)
    .sort((a, b) => a.mastery - b.mastery || b.total - a.total || b.lastAt - a.lastAt);

  const totalEvents = events.length;
  const correctEvents = events.filter((event) => event.result === "correct").length;
  const avgLatencyMs = totalEvents
    ? Math.round(events.reduce((sum, event) => sum + (Number(event.latencyMs) || 0), 0) / totalEvents)
    : 0;
  const avgConfidence = totalEvents
    ? events.reduce((sum, event) => sum + (Number(event.confidence) || 0), 0) / totalEvents
    : 0;
  const masteryAvg = wordSummaries.length
    ? Math.round(wordSummaries.reduce((sum, summary) => sum + summary.mastery, 0) / wordSummaries.length)
    : 0;
  const retention1w = wordSummaries.length
    ? wordSummaries.reduce((acc, summary) => {
      if (summary.retention1w.samples) {
        acc.samples += 1;
        acc.retained += summary.retention1w.pct || 0;
      }
      return acc;
    }, { retained: 0, samples: 0 })
    : { retained: 0, samples: 0 };
  const retention1m = wordSummaries.length
    ? wordSummaries.reduce((acc, summary) => {
      if (summary.retention1m.samples) {
        acc.samples += 1;
        acc.retained += summary.retention1m.pct || 0;
      }
      return acc;
    }, { retained: 0, samples: 0 })
    : { retained: 0, samples: 0 };

  return {
    events,
    wordSummaries,
    totalEvents,
    reviewedWords: wordSummaries.length,
    correctPct: totalEvents ? Math.round((correctEvents / totalEvents) * 100) : 0,
    avgLatencyMs,
    avgLatencyLabel: formatVocabLatencyMs(avgLatencyMs),
    avgConfidencePct: totalEvents ? Math.round(avgConfidence * 100) : 0,
    masteryAvg,
    retention1w: {
      pct: retention1w.samples ? retention1w.retained / retention1w.samples : null,
      samples: retention1w.samples,
    },
    retention1m: {
      pct: retention1m.samples ? retention1m.retained / retention1m.samples : null,
      samples: retention1m.samples,
    },
    masteredWords: wordSummaries.filter((summary) => summary.mastery >= 80).length,
    weakWords: wordSummaries.slice(0, 6),
    recentEvents: events.slice(-8).reverse(),
  };
}

function getVocabReviewQueueSnapshot(limit = 6) {
  const now = Date.now();
  const srs = state.vocabSrs || {};
  const dueItems = getDueVocabReviews(limit);
  const allDue = getDueVocabReviews(Infinity);
  const scheduled = [];
  let studiedCount = 0;
  let learningCount = 0;
  let knownCount = 0;
  let hardCount = 0;

  Object.keys(srs).forEach((wordId) => {
    const record = srs[wordId];
    const word = curatedWordsById.get(wordId);
    if (!word || !record || record.seen <= 0) return;
    studiedCount += 1;
    if (record.isKnown) knownCount += 1;
    if (record.isHard) hardCount += 1;
    if (!record.isKnown) learningCount += 1;
    if (record.due > now) scheduled.push({ word, record });
  });

  scheduled.sort((a, b) => a.record.due - b.record.due);
  return {
    dueItems,
    dueTotal: allDue.length,
    hardDue: allDue.filter(({ record }) => record.isHard).length,
    nextItems: scheduled.slice(0, limit),
    studiedCount,
    learningCount,
    knownCount,
    hardCount,
  };
}

function buildVocabMetricsView() {
  const stats = getVocabAnalyticsSnapshot();
  const queue = getVocabReviewQueueSnapshot(6);
  const retention1wLabel = stats.retention1w.samples ? formatVocabRatio(stats.retention1w.pct) : "collecting";
  const retention1mLabel = stats.retention1m.samples ? formatVocabRatio(stats.retention1m.pct) : "collecting";
  const queueItems = queue.dueItems.length ? queue.dueItems : queue.nextItems;
  const queueRows = queueItems.length
    ? queueItems.map(({ word, record }) => {
      const dueLabel = formatVocabDueTime(record.due);
      const meta = [
        word.meaningShort || word.meaning || "",
        record.isHard ? "hard" : record.isKnown ? "known" : "learning",
        dueLabel,
      ].filter(Boolean).join(" / ");
      return `
        <div class="study-row word-metrics-row" role="button" tabindex="0" data-metrics-word-open="${escapeHtml(word.id)}">
          <div>
            <div class="study-row-ko" lang="ko">${escapeHtml(word.display || word.korean)}</div>
            <div class="study-row-sub">${escapeHtml(meta)}</div>
          </div>
          ${hearIconButton(word.voiceText || word.korean, "data-speak")}
        </div>
      `;
    }).join("")
    : `
      <div class="study-row">
        <div>
          <div class="study-row-ko">No scheduled word reviews yet</div>
          <div class="study-row-sub">Add words from lessons or the Word Bank to build a review queue.</div>
        </div>
      </div>
    `;
  const weakRows = stats.weakWords.length
    ? stats.weakWords.map((summary) => {
      const word = summary.word;
      const masteryClass = summary.mastery >= 80 ? "green" : summary.mastery >= 60 ? "accent" : "muted";
      return `
        <div class="study-row word-metrics-row" role="button" tabindex="0" data-metrics-word-open="${escapeHtml(word.id)}">
          <div>
            <div class="study-row-ko" lang="ko">${escapeHtml(word.display || word.korean)}</div>
            <div class="study-row-sub">${escapeHtml(word.meaningShort || word.meaning || "")} · ${summary.total} events · ${summary.correct}/${summary.total} correct · ${formatVocabLatencyMs(summary.avgLatencyMs)} avg</div>
            <div class="study-row-sub">7d ${summary.retention1w.samples ? formatVocabRatio(summary.retention1w.pct) : "collecting"} · 30d ${summary.retention1m.samples ? formatVocabRatio(summary.retention1m.pct) : "collecting"} · last ${formatVocabRelativeTime(summary.lastAt)}</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
            <span class="pill ${masteryClass}">${summary.mastery}% mastery</span>
            ${hearIconButton(word.voiceText || word.korean, "data-speak")}
          </div>
        </div>
      `;
    }).join("")
    : `
      <div class="study-row">
        <div>
          <div class="study-row-ko">No review history yet</div>
          <div class="study-row-sub">Answer a few vocabulary questions to start building item-level analytics.</div>
        </div>
      </div>
    `;

  const recentRows = stats.recentEvents.length
    ? stats.recentEvents.map((event) => {
      const word = curatedWordsById.get(event.wordId);
      const label = event.result === "correct" ? "Correct" : event.result === "skipped" ? "Skipped" : "Missed";
      const masteryClass = event.result === "correct" ? "green" : event.result === "skipped" ? "muted" : "accent";
      const rowAttrs = word
        ? `class="study-row word-metrics-row" role="button" tabindex="0" data-metrics-word-open="${escapeHtml(word.id)}"`
        : `class="study-row"`;
      return `
        <div ${rowAttrs}>
          <div>
            <div class="study-row-ko" lang="ko">${escapeHtml(word?.display || word?.korean || event.wordId)}</div>
            <div class="study-row-sub">${escapeHtml(label)} · ${escapeHtml(event.direction)} · ${formatVocabLatencyMs(event.latencyMs)} · conf ${formatVocabRatio(event.confidence)} · ${escapeHtml(event.errorType || "none")}</div>
            <div class="study-row-sub">${escapeHtml(event.source)} · ${formatVocabRelativeTime(event.at)}</div>
          </div>
          <span class="pill ${masteryClass}">${formatVocabRatio(event.confidence)}</span>
        </div>
      `;
    }).join("")
    : `
      <div class="study-row">
        <div>
          <div class="study-row-ko">No events yet</div>
          <div class="study-row-sub">The review trail will appear here after the first answer.</div>
        </div>
      </div>
    `;

  return `
    <div class="card">
      <div class="eyebrow">Assessment & analytics</div>
      <h2 class="screen-title" style="margin-bottom:8px;">Word insights</h2>
      <div class="screen-sub" style="margin-bottom:12px;">Review events persist per item, and the dashboard tracks mastery, latency, and retention windows.</div>
      <div class="flex-between" style="gap:12px; flex-wrap:wrap;">
        <span class="pill accent">${stats.totalEvents} events</span>
        <span class="pill muted">${stats.reviewedWords} words tracked</span>
      </div>
      <div class="word-card-actions" style="margin-top:12px;">
        <button class="button primary compact" type="button" data-vocab-view="review">Open review</button>
        <button class="button secondary compact" type="button" data-vocab-view="learn">Back to words</button>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-box"><span class="sv">${stats.correctPct}%</span><span class="sl">Accuracy</span></div>
      <div class="stat-box"><span class="sv">${stats.avgLatencyLabel}</span><span class="sl">Avg latency</span></div>
      <div class="stat-box"><span class="sv">${stats.masteryAvg}%</span><span class="sl">Mastery</span></div>
      <div class="stat-box"><span class="sv">${stats.masteredWords}</span><span class="sl">Mastered words</span></div>
    </div>

    <div class="stats-grid">
      <div class="stat-box"><span class="sv">${retention1wLabel}</span><span class="sl">1-week retention</span></div>
      <div class="stat-box"><span class="sv">${retention1mLabel}</span><span class="sl">1-month retention</span></div>
      <div class="stat-box"><span class="sv">${stats.avgConfidencePct}%</span><span class="sl">Confidence</span></div>
      <div class="stat-box"><span class="sv">${stats.reviewedWords}</span><span class="sl">Tracked words</span></div>
    </div>

    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">Review queue</div>
          <div class="screen-sub" style="margin-bottom:0;">Due words first, then the next scheduled items.</div>
        </div>
        <button class="button ${queue.dueTotal ? "primary" : "secondary"} compact" type="button" data-words-start-review ${queue.dueTotal ? "" : "disabled"}>Review (${queue.dueTotal})</button>
      </div>
      <div class="stats-grid word-review-mini-stats">
        <div class="stat-box"><span class="sv">${queue.dueTotal}</span><span class="sl">Due now</span></div>
        <div class="stat-box"><span class="sv">${queue.hardDue}</span><span class="sl">Hard due</span></div>
        <div class="stat-box"><span class="sv">${queue.learningCount}</span><span class="sl">Learning</span></div>
        <div class="stat-box"><span class="sv">${queue.knownCount}</span><span class="sl">Known</span></div>
      </div>
      <div class="study-list">${queueRows}</div>
    </div>

    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">Weak spots</div>
          <div class="screen-sub" style="margin-bottom:0;">Lowest mastery items bubble to the top.</div>
        </div>
        <span class="pill muted">${stats.weakWords.length} shown</span>
      </div>
      <div class="study-list">${weakRows}</div>
      <div class="screen-sub fs-xs" style="margin-top:8px;">1-week sample: ${stats.retention1w.samples} · 1-month sample: ${stats.retention1m.samples}</div>
    </div>

    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">Recent events</div>
          <div class="screen-sub" style="margin-bottom:0;">Latest attempt trail across lessons, reviews, and quizzes.</div>
        </div>
        <span class="pill accent">${stats.recentEvents.length}</span>
      </div>
      <div class="study-list">${recentRows}</div>
    </div>

    ${(() => {
      const sAnalytics = getSentenceAnalyticsSnapshot();
      const sModeBreakdown = Object.keys(sAnalytics.byMode).length
        ? Object.entries(sAnalytics.byMode)
          .map(([mode, count]) => `${mode}: ${count}`)
          .join(" / ")
        : "No sentence events yet";

      const sRecentRows = sAnalytics.recentEvents.length
        ? sAnalytics.recentEvents.map((event) => {
          const sentence = getSentenceBankRows().find(r => r.id === event.sentenceId);
          const label = event.result === "correct" ? "Correct" : event.result === "revealed" ? "Revealed" : "Incorrect";
          const badgeClass = event.result === "correct" ? "green" : event.result === "revealed" ? "muted" : "accent";
          return `
            <div class="study-row">
              <div>
                <div class="study-row-ko" lang="ko">${escapeHtml(sentence?.korean || event.sentenceId)}</div>
                <div class="study-row-sub">${escapeHtml(label)} · ${escapeHtml(event.mode)} · ${formatVocabLatencyMs(event.latencyMs)} · helpers: ${event.helperCount}</div>
                <div class="study-row-sub">${escapeHtml(sentence?.english || "")} · ${formatVocabRelativeTime(event.at)}</div>
              </div>
              <span class="pill ${badgeClass}">${event.result}</span>
            </div>
          `;
        }).join("")
        : `
          <div class="study-row">
            <div>
              <div class="study-row-ko">No events yet</div>
              <div class="study-row-sub">The sentence review trail will appear here after your first run.</div>
            </div>
          </div>
        `;

      return `
        <div class="card">
          <div class="flex-between mb-12">
            <div>
              <div class="eyebrow">Sentence insights</div>
              <div class="screen-sub" style="margin-bottom:0;">Latest attempt trail across sentence drills.</div>
            </div>
            <span class="pill accent">${sAnalytics.total} events</span>
          </div>
          <div class="stats-grid" style="margin-bottom:8px;">
            <div class="stat-box"><span class="sv">${sAnalytics.correctPct}%</span><span class="sl">Accuracy</span></div>
            <div class="stat-box"><span class="sv">${sAnalytics.avgLatencyLabel}</span><span class="sl">Avg latency</span></div>
            <div class="stat-box"><span class="sv">${sAnalytics.helperUses}</span><span class="sl">Helper uses</span></div>
          </div>
          <div class="screen-sub fs-xs" style="margin-bottom:12px;">${escapeHtml(sModeBreakdown)}</div>
          <div class="study-list">${sRecentRows}</div>
        </div>
      `;
    })()}
  `;
}

// ─── WORDS SECTION ────────────────────────────────────────────────────────────
// Curated learning bank + raw 5,000 reference bank, vocabulary SRS, the
// "Entire Korean Word Bank" reference screen, and the guided word lesson
// runner. See docs/WORDS_SECTION_MASTER_SPEC.md. The curated content itself
// lives in words_curated_core.js / words_lesson_plan.js (static globals).

const VOCAB_SRS_INTERVALS = [
  5 * 60 * 1000,            // box 0: 5 minutes
  20 * 60 * 1000,           // box 1: 20 minutes
  24 * 60 * 60 * 1000,      // box 2: 1 day
  3 * 24 * 60 * 60 * 1000,  // box 3: 3 days
  7 * 24 * 60 * 60 * 1000,  // box 4: 7 days
  14 * 24 * 60 * 60 * 1000, // box 5: 14 days
  30 * 24 * 60 * 60 * 1000, // box 6: 30 days
  60 * 24 * 60 * 60 * 1000, // box 7: 60 days
];
const VOCAB_REVIEW_EVENT_LIMIT = 5000;
const VOCAB_ANALYTICS_DAY_MS = 24 * 60 * 60 * 1000;

const WORD_BANK_FILTERS = [
  { id: "all", label: "All" },
  { id: "curated", label: "Curated" },
  { id: "core", label: "Core" },
  { id: "function", label: "Function words" },
  { id: "needsCuration", label: "Needs curation" },
  { id: "noun", label: "Nouns" },
  { id: "verb", label: "Verbs" },
  { id: "adjective", label: "Adjectives" },
  { id: "phrase", label: "Phrases" },
  { id: "raw", label: "Raw frequency" },
  { id: "supplementary", label: "Supplementary" },
  { id: "known", label: "Known" },
  { id: "hard", label: "Hard" },
  { id: "due", label: "Due" },
];

const WORD_BANK_SORTS = [
  { id: "curriculum", label: "Curriculum" },
  { id: "frequency", label: "Frequency" },
  { id: "hangul", label: "A–Z Korean" },
  { id: "status", label: "Known status" },
  { id: "curation", label: "Curation priority" },
];

const WORD_BANK_PAGE_SIZE = 50;
// Reversible Words-lesson speaking step. Keep the renderer in place so the
// step can be restored by flipping this one flag later.
const WORD_LESSON_REPEAT_STEP_ENABLED = false;

const WORD_PATH_LEVEL_FILTERS = [
  { id: "all", label: "All learning levels" },
  { id: "ready", label: "Ready / learning" },
  { id: "active", label: "In progress" },
  { id: "completed", label: "Completed" },
  { id: "locked", label: "Locked" },
  { id: "hard", label: "Has hard words" },
  { id: "due", label: "Due for review" },
  { id: "known", label: "Has known words" },
];

let curatedWordsById = new Map();
let curatedWordsByKorean = new Map();
let wordReferenceRows = [];
let wordReferenceById = new Map();
let wordReferenceReady = false;
let wordReferenceFilteredCache = null;
let wordReferenceCacheKey = "";
let wordBankStatusVersion = 0;
let wordBankDetailId = null;
let wordBankReturnTarget = null;
let wordBankSearchTimer = null;
// Volatile view state for the active guided word lesson / review session,
// mirroring the alphabet's phaseOneView pattern. Survives in-page navigation
// (including the Word Bank quick reference) but not a full reload.
let wordLessonView = null;

function serializeWordLessonView(view) {
  if (!view || !view.lessonId || view.isReview) return null;
  return {
    version: 1,
    lessonId: view.lessonId,
    mode: view.mode,
    stepIndex: view.stepIndex,
    questionIndex: view.questionIndex,
    words: (view.words || []).map((word) => word.id),
    steps: view.steps || [],
    questions: view.questions || [],
    results: view.results || [],
    typedAttempts: view.typedAttempts || {},
    typedValue: view.typedValue || "",
    typedFeedback: view.typedFeedback || "",
    typedDone: Boolean(view.typedDone),
    answered: Boolean(view.answered),
    selectedChoice: view.selectedChoice || "",
    checkCorrect: view.checkCorrect ?? null,
    checkFeedback: view.checkFeedback || "",
    reviewingCheckpoint: Boolean(view.reviewingCheckpoint),
    checkpointTypedValue: view.checkpointTypedValue || "",
    typeTiles: view.typeTiles || null,
    typeTilesWordId: view.typeTilesWordId || null,
    typeHelperVisible: Boolean(view.typeHelperVisible),
    questionHelperUsed: Boolean(view.questionHelperUsed),
    stepStartedAt: Number(view.stepStartedAt) || 0,
    questionStartedAt: Number(view.questionStartedAt) || 0,
    resultSaved: Boolean(view.resultSaved),
  };
}

function rehydrateWordLessonView(snapshot, lesson) {
  if (!snapshot || snapshot.version !== 1 || !lesson || snapshot.lessonId !== lesson.id) return null;
  const validModes = new Set(["intro", "study", "check", "result"]);
  if (!validModes.has(snapshot.mode) || !Array.isArray(snapshot.words) || !Array.isArray(snapshot.steps) || !Array.isArray(snapshot.questions)) return null;
  const words = snapshot.words.map((id) => curatedWordsById.get(id));
  if (words.some((word) => !word) || snapshot.steps.some((step) => !step || !curatedWordsById.has(step.wordId))) return null;
  if (snapshot.questions.some((question) => !question || !curatedWordsById.has(question.wordId))) return null;
  if (!Number.isInteger(snapshot.stepIndex) || snapshot.stepIndex < 0 || snapshot.stepIndex > snapshot.steps.length) return null;
  if (!Number.isInteger(snapshot.questionIndex) || snapshot.questionIndex < 0 || snapshot.questionIndex > snapshot.questions.length) return null;
  return {
    lessonId: lesson.id,
    isReview: false,
    mode: snapshot.mode,
    stepIndex: snapshot.stepIndex,
    questionIndex: snapshot.questionIndex,
    stepStartedAt: Number(snapshot.stepStartedAt) || 0,
    questionStartedAt: Number(snapshot.questionStartedAt) || 0,
    steps: snapshot.steps,
    questions: snapshot.questions,
    words,
    typedValue: String(snapshot.typedValue || ""),
    typedFeedback: String(snapshot.typedFeedback || ""),
    typedDone: Boolean(snapshot.typedDone),
    typedAttempts: snapshot.typedAttempts && typeof snapshot.typedAttempts === "object" ? snapshot.typedAttempts : {},
    answered: Boolean(snapshot.answered),
    selectedChoice: String(snapshot.selectedChoice || ""),
    checkCorrect: snapshot.checkCorrect ?? null,
    checkFeedback: String(snapshot.checkFeedback || ""),
    results: Array.isArray(snapshot.results) ? snapshot.results : [],
    resultSaved: Boolean(snapshot.resultSaved),
    reviewingCheckpoint: Boolean(snapshot.reviewingCheckpoint),
    checkpointTypedValue: String(snapshot.checkpointTypedValue || ""),
    typeTiles: Array.isArray(snapshot.typeTiles) ? snapshot.typeTiles : null,
    typeTilesWordId: snapshot.typeTilesWordId || null,
    typeHelperVisible: Boolean(snapshot.typeHelperVisible),
    questionHelperUsed: Boolean(snapshot.questionHelperUsed),
  };
}

function persistWordLessonSession(view = wordLessonView) {
  if (!view || view.isReview || view.mode === "result" || view.resultSaved) {
    state.vocabLessonSession = null;
  } else {
    state.vocabLessonSession = serializeWordLessonView(view);
  }
  saveState();
}

function startWordLessonStudyTimer(view) {
  if (view) view.stepStartedAt = Date.now();
}

function startWordLessonQuestionTimer(view) {
  if (view) view.questionStartedAt = Date.now();
}

function getWordLessonStudyLatencyMs(view) {
  return Math.max(0, Date.now() - (Number(view?.stepStartedAt) || Date.now()));
}

function getWordLessonQuestionLatencyMs(view) {
  return Math.max(0, Date.now() - (Number(view?.questionStartedAt) || Date.now()));
}

function getCuratedWords() {
  return Array.isArray(window.HANAPATH_CURATED_WORDS) ? window.HANAPATH_CURATED_WORDS : [];
}

function getWordLessons() {
  return Array.isArray(window.HANAPATH_WORD_LESSONS) ? window.HANAPATH_WORD_LESSONS : [];
}

function isWordCurriculumV2() {
  return Array.isArray(window.HANAPATH_WORD_SECTIONS) && Array.isArray(window.HANAPATH_WORD_UNITS);
}

function getWordSections() { return isWordCurriculumV2() ? window.HANAPATH_WORD_SECTIONS : []; }
function getWordUnits() { return isWordCurriculumV2() ? window.HANAPATH_WORD_UNITS : []; }
function getWordSectionById(sectionId) { return getWordSections().find((section) => section.id === sectionId) || null; }
function getWordUnitById(unitId) { return getWordUnits().find((unit) => unit.id === unitId) || null; }
function getWordLessonStudyWordIds(lesson) { return Array.isArray(lesson?.newWordIds) ? lesson.newWordIds : []; }
function getWordLessonReviewWordIds(lesson) {
  return lesson?.type === "checkpoint" ? (Array.isArray(lesson.reviewWordIds) ? lesson.reviewWordIds : []) : getWordLessonStudyWordIds(lesson);
}
function getWordUnitContentLessons(unit) {
  return unit ? unit.lessonIds.map((id) => getWordLessonById(id)).filter((lesson) => lesson && lesson.type !== "checkpoint") : [];
}
function isWordUnitCrowned(unit) { return Boolean(unit && isWordLessonCompleted(unit.checkpointId)); }
function isWordSectionUnlocked(section) {
  if (!section) return false;
  if (TEST_UNLOCK_ALL_STAGES) return true;
  if (section.id === "s1") return getAlphabetProgress().complete;
  const previous = getWordSectionById(section.prerequisiteSectionId);
  return Boolean(previous && getWordUnits().filter((unit) => unit.sectionId === previous.id).every(isWordUnitCrowned));
}

function completeWordSectionForTesting(sectionId) {
  if (!TEST_ENABLE_WORD_SECTION_COMPLETION) return;
  const section = getWordSectionById(sectionId);
  if (!section || !isWordCurriculumV2()) return;
  const lessonIds = getWordUnits()
    .filter((unit) => unit.sectionId === section.id)
    .flatMap((unit) => [...unit.lessonIds, unit.checkpointId])
    .filter(Boolean);
  state.vocabLessonCompleted = [...new Set([...(state.vocabLessonCompleted || []), ...lessonIds])];
  if (state.vocabLessonActive && lessonIds.includes(state.vocabLessonActive)) {
    state.vocabLessonActive = null;
    state.vocabLessonSession = null;
  }
  saveState();
}

function completeAlphabetSectionForTesting() {
  if (!TEST_ENABLE_WORD_SECTION_COMPLETION) return;
  state.phaseOneCompleted = phaseOneLessons.map((lesson) => lesson.id);
  saveState();
}
function isWordUnitUnlocked(unit) {
  if (!unit || !isWordSectionUnlocked(getWordSectionById(unit.sectionId))) return false;
  return !unit.prerequisiteUnitId || isWordUnitCrowned(getWordUnitById(unit.prerequisiteUnitId));
}
function getLegacyCompletedWordIds(legacyLessonIds) {
  const snapshot = window.HANAPATH_WORD_V1_SNAPSHOT;
  const map = snapshot && snapshot.lessons && typeof snapshot.lessons === "object" ? snapshot.lessons : {};
  const ids = new Set();
  for (const lessonId of legacyLessonIds) for (const wordId of (Array.isArray(map[lessonId]) ? map[lessonId] : [])) ids.add(wordId);
  return ids;
}

function migrateVocabState() {
  if (!state.vocabSrs || typeof state.vocabSrs !== "object" || Array.isArray(state.vocabSrs)) state.vocabSrs = {};
  state.vocabReviewEvents = normalizeVocabReviewEvents(state.vocabReviewEvents);
  if (!Array.isArray(state.vocabLessonCompleted)) state.vocabLessonCompleted = [];
  state.vocabLessonCompleted = [...new Set(state.vocabLessonCompleted.filter((id) => typeof id === "string"))];
  if (typeof state.vocabLessonActive !== "string") state.vocabLessonActive = null;
  if (!state.vocabLessonSession || typeof state.vocabLessonSession !== "object" || Array.isArray(state.vocabLessonSession)) state.vocabLessonSession = null;
  if (!Array.isArray(state.vocabUnitMigrationCredit)) state.vocabUnitMigrationCredit = [];
  if (isWordCurriculumV2() && Number(state.vocabPlanVersion || 1) < 2) {
    const legacyLessonIds = [...state.vocabLessonCompleted];
    const creditedWordIds = getLegacyCompletedWordIds(legacyLessonIds);
    state.vocabLessonCompleted = [];
    for (const lesson of getWordLessons()) {
      if (lesson.type !== "content") continue;
      const wordIds = getWordLessonStudyWordIds(lesson);
      if (wordIds.length && wordIds.every((id) => creditedWordIds.has(id))) state.vocabLessonCompleted.push(lesson.id);
    }
    state.vocabLessonCompletedLegacy = legacyLessonIds;
    state.vocabUnitMigrationCredit = getWordUnits()
      .filter((unit) => getWordUnitContentLessons(unit).every((lesson) => isWordLessonCompleted(lesson.id)))
      .map((unit) => unit.id);
    state.vocabLessonActive = null;
    state.vocabLessonSession = null;
    state.wordPathCategory = null;
    state.wordPathLevel = null;
    state.vocabPlanVersion = 2;
    saveState();
  }
  if (!Number.isInteger(state.vocabDailyNewTarget) || state.vocabDailyNewTarget <= 0) state.vocabDailyNewTarget = 5;
  state.wordPathCategory = typeof state.wordPathCategory === "string" ? state.wordPathCategory : "";
  state.wordPathLevel = typeof state.wordPathLevel === "string" ? state.wordPathLevel : "all";
  const wordPathCategories = new Set(getWordLessons().map((lesson) => getWordLessonCategoryId(lesson)).filter(Boolean));
  if (state.wordPathCategory && state.wordPathCategory !== "all" && !wordPathCategories.has(state.wordPathCategory)) state.wordPathCategory = "";
  if (!WORD_PATH_LEVEL_FILTERS.some((filter) => filter.id === state.wordPathLevel)) state.wordPathLevel = "all";
  state.wordBankQuery = typeof state.wordBankQuery === "string" ? state.wordBankQuery : "";
  if (!WORD_BANK_FILTERS.some((f) => f.id === state.wordBankFilter)) state.wordBankFilter = "all";
  if (!WORD_BANK_SORTS.some((s) => s.id === state.wordBankSort)) state.wordBankSort = "curriculum";
  state.wordBankPage = Number.isInteger(state.wordBankPage) ? Math.max(0, state.wordBankPage) : 0;
  state.wordBankPageSize = Number.isInteger(state.wordBankPageSize) && state.wordBankPageSize > 0
    ? Math.min(state.wordBankPageSize, 100)
    : WORD_BANK_PAGE_SIZE;
  // Quick-ref return state cannot survive a reload (the lesson view is
  // volatile), so never resume into a dangling reference.
  state.wordQuickRefActive = false;
  state.wordQuickRefReturn = null;
}

function normalizeWordSearch(value) {
  return String(value || "").normalize("NFKC").toLowerCase().trim();
}

// Build the unified reference rows: curated entries (merged with a raw CSV
// match when the Korean form lines up) followed by the remaining raw-only
// frequency entries. Raw-only rows are honest — no invented meanings.
function buildWordReferenceRows() {
  const curated = getCuratedWords();
  curatedWordsById = new Map(curated.map((word) => [word.id, word]));
  curatedWordsByKorean = new Map();
  curated.forEach((word) => {
    [word.korean, word.display, ...(word.forms || [])]
      .filter(Boolean)
      .forEach((form) => {
        if (!curatedWordsByKorean.has(form)) curatedWordsByKorean.set(form, word);
      });
  });

  const rawByKorean = new Map();
  vocabBank.forEach((entry) => {
    if (!rawByKorean.has(entry.korean)) rawByKorean.set(entry.korean, entry);
  });

  const rows = [];
  curated.forEach((word, index) => {
    const raw = rawByKorean.get(word.korean) || null;
    const rank = raw ? raw.rank : word.rawFrequencyRank;
    const row = {
      id: word.id,
      source: raw ? "merged" : "curated",
      korean: word.korean,
      display: word.display || word.korean,
      meaning: word.meaning,
      pos: word.pos,
      pronunciation: word.pronunciation,
      exampleKo: word.exampleKo,
      exampleEn: word.exampleEn,
      usageNote: word.usageNote,
      lessonGroup: word.lessonGroup,
      lessonTitle: word.lessonTitle,
      rank: Number.isInteger(rank) ? rank : null,
      frequencyBand: raw ? raw.frequencyBand : word.frequencyBand,
      tokenNote: raw ? raw.tokenNote : "",
      curriculumIndex: index,
      word,
      raw,
    };
    row._search = [
      row.korean, row.display, word.lemma, row.meaning, word.meaningShort, row.pos,
      row.pronunciation, row.exampleKo, row.exampleEn, row.usageNote, row.lessonGroup,
      row.lessonTitle, row.frequencyBand, row.rank, row.tokenNote,
      (word.tags || []).join(" "), (word.forms || []).join(" "),
      word.register, word.speechLevel, word.originType, word.hanja, word.morphTag,
      word.honorificRole, (word.contrastWith || []).join(" "),
      ...Object.values(word.annotationSource || {}),
    ].filter((value) => value !== null && value !== undefined && value !== "").join(" ")
      .normalize("NFKC").toLowerCase();
    rows.push(row);
  });

  // Real (hand-written) English meanings for raw frequency entries, distinct
  // from the CSV's own "english_spelling" column which is a romanization, not
  // a translation. Coverage is partial (see raw_word_meanings.js) — anything
  // not in the map stays honestly meaning-less rather than guessing.
  const rawMeanings = window.HANAPATH_RAW_MEANINGS || {};

  const claimedRanks = new Set(rows.filter((row) => row.raw).map((row) => row.raw.rank));
  vocabBank.forEach((entry) => {
    if (claimedRanks.has(entry.rank)) return;
    const meaning = rawMeanings[entry.korean] || "";
    const row = {
      id: `raw-${entry.rank}`,
      source: "raw",
      korean: entry.korean,
      display: entry.korean,
      meaning,
      pos: "",
      pronunciation: entry.pronunciation || entry.englishSpelling,
      exampleKo: "",
      exampleEn: "",
      usageNote: "",
      lessonGroup: "",
      lessonTitle: "",
      rank: entry.rank,
      frequencyBand: entry.frequencyBand,
      tokenNote: entry.tokenNote,
      curriculumIndex: Number.MAX_SAFE_INTEGER,
      word: null,
      raw: entry,
    };
    row._search = [entry._koreanLower, entry._englishLower, entry._pronLower, entry._bandLower, entry._noteLower, entry._rankStr, meaning.toLowerCase()]
      .filter(Boolean).join(" ");
    rows.push(row);
  });

  // Supplementary long-tail entries (ranks 5,194+): searchable reference rows
  // only, distinct from the learning course. Skip anything already covered by
  // a curated form or the 5,000 list so the bank never shows duplicates.
  const knownKorean = new Set(rows.map((row) => row.korean));
  supplementaryBank.forEach((entry) => {
    if (knownKorean.has(entry.korean) || curatedWordsByKorean.has(entry.korean)) return;
    const row = {
      id: `supp-${entry.rank}`,
      source: "supplementary",
      korean: entry.korean,
      display: entry.korean,
      meaning: "",
      pos: "",
      pronunciation: entry.pronunciation || entry.englishSpelling,
      exampleKo: "",
      exampleEn: "",
      usageNote: "",
      lessonGroup: "",
      lessonTitle: "",
      rank: entry.rank,
      frequencyBand: entry.frequencyBand,
      tokenNote: entry.tokenNote,
      curriculumIndex: Number.MAX_SAFE_INTEGER,
      word: null,
      raw: entry,
    };
    row._search = [entry._koreanLower, entry._englishLower, entry._pronLower, entry._bandLower, entry._noteLower, entry._rankStr]
      .filter(Boolean).join(" ");
    rows.push(row);
  });

  wordReferenceRows = rows;
  wordReferenceById = new Map(rows.map((row) => [row.id, row]));
  wordReferenceFilteredCache = null;
  wordReferenceCacheKey = "";
  wordReferenceReady = true;
}

function isSentenceCurriculumV2() {
  return Array.isArray(window.HANAPATH_SENTENCE_SECTIONS) && Array.isArray(window.HANAPATH_SENTENCE_UNITS);
}

function getSentenceSections() {
  return isSentenceCurriculumV2() ? window.HANAPATH_SENTENCE_SECTIONS : [];
}

function getSentenceUnits() {
  return isSentenceCurriculumV2() ? window.HANAPATH_SENTENCE_UNITS : [];
}

function getSentenceSectionById(sectionId) {
  return getSentenceSections().find((s) => s.id === sectionId) || null;
}

function getSentenceUnitById(unitId) {
  return getSentenceUnits().find((u) => u.id === unitId) || null;
}

function getSentenceUnitContentLessons(unit) {
  return unit ? unit.lessonIds.map((id) => getSentenceLessonById(id)).filter((lesson) => lesson && lesson.type !== "checkpoint") : [];
}

const sentenceUnitFocusWordsMap = new Map();
let sentenceBankByIdCache = null;
let sentenceBankByIdSource = null;
function getSentenceBankById() {
  const rows = getSentenceBankRows();
  if (sentenceBankByIdSource !== rows) {
    sentenceBankByIdSource = rows;
    sentenceBankByIdCache = new Map(rows.map((row) => [row.id, row]));
  }
  return sentenceBankByIdCache;
}
function initSentenceUnitFocusWordsMap() {
  if (sentenceUnitFocusWordsMap.size > 0) return;
  const units = getSentenceUnits();
  const lessons = getSentenceLessons();
  const rows = getSentenceBankRows();
  const rowsById = getSentenceBankById();
  for (const unit of units) {
    const focusWords = new Set();
    const uLessons = lessons.filter(l => l.unitId === unit.id && l.type === "content");
    for (const lesson of uLessons) {
      for (const sid of lesson.sentenceIds || []) {
        const row = rowsById.get(sid);
        if (row && Array.isArray(row.focusWordIds)) {
          for (const wId of row.focusWordIds) {
            focusWords.add(wId);
          }
        }
      }
    }
    sentenceUnitFocusWordsMap.set(unit.id, focusWords);
  }
}

function isSentenceUnitUnlocked(unit, metWords) {
  if (!unit) return false;
  if (TEST_UNLOCK_ALL_STAGES) return true;
  initSentenceUnitFocusWordsMap();
  const focusWords = sentenceUnitFocusWordsMap.get(unit.id);
  if (!focusWords) return true;
  const activeMetWords = metWords || getMetWords();
  for (const wId of focusWords) {
    if (!activeMetWords.has(wId)) return false;
  }
  return true;
}

function isSentenceLessonUnlockedV2(lesson, metWords, completedSet) {
  if (!lesson) return false;
  if (TEST_UNLOCK_ALL_STAGES) return true;
  const unit = getSentenceUnitById(lesson.unitId);
  if (!unit) return false;
  const activeMetWords = metWords || getMetWords();
  if (!isSentenceUnitUnlocked(unit, activeMetWords)) return false;
  const activeCompleted = completedSet || new Set(getSentencesProgress().completedLessons || []);
  const unitLessons = getSentenceUnitContentLessons(unit);
  if (lesson.type === "checkpoint") {
    return unitLessons.every(l => activeCompleted.has(l.id));
  } else {
    const idx = unitLessons.findIndex(l => l.id === lesson.id);
    if (idx <= 0) return true;
    return activeCompleted.has(unitLessons[idx - 1].id);
  }
}

function isSentenceUnitCrowned(unit, completedSet) {
  if (!unit) return false;
  const activeCompleted = completedSet || new Set(getSentencesProgress().completedLessons || []);
  return activeCompleted.has(unit.checkpointId);
}

function getNextSentenceLesson(metWords, completedSet, progress) {
  const activeMet = metWords || getMetWords();
  const activeProgress = progress || getSentencesProgress();
  const activeCompleted = completedSet || new Set(activeProgress.completedLessons || []);
  const available = getSentenceLessons().filter((lesson) => {
    return !activeCompleted.has(lesson.id) && isSentenceLessonUnlockedV2(lesson, activeMet, activeCompleted);
  });
  if (!available.length) return null;

  // Keep the continuation hero in the learner's active unit instead of
  // jumping back to the first incomplete lesson elsewhere in plan order.
  const recentLessonId = activeProgress.reviewEvents
    .slice()
    .reverse()
    .find((event) => event.lessonId)?.lessonId;
  const recentUnitId = getSentenceLessonById(recentLessonId)?.unitId;
  const recentUnit = getSentenceUnitById(recentUnitId);
  const recentUnitInProgress = recentUnit
    && !isSentenceUnitCrowned(recentUnit, activeCompleted)
    && getSentenceUnitContentLessons(recentUnit).some((lesson) => activeCompleted.has(lesson.id));
  return (recentUnitInProgress && available.find((lesson) => lesson.unitId === recentUnitId)) || available[0];
}

function completeSentenceSectionForTesting(sectionId) {
  if (!TEST_ENABLE_SENTENCE_SECTION_COMPLETION || !isSentenceCurriculumV2()) return;
  const section = getSentenceSectionById(sectionId);
  if (!section) return;
  const lessonIds = getSentenceUnits()
    .filter((unit) => unit.sectionId === section.id)
    .flatMap((unit) => [...unit.lessonIds, unit.checkpointId])
    .filter(Boolean);
  const progress = getSentencesProgress();
  progress.completedLessons = [...new Set([...(progress.completedLessons || []), ...lessonIds])];
  state.sentenceLessonSession = null;
  sentenceStudioSession = null;
  saveState();
}

function getLegacyCompletedSentenceIds(legacyLessonIds) {
  const snapshot = window.HANAPATH_SENTENCE_V1_SNAPSHOT;
  const ids = new Set();
  if (Array.isArray(snapshot)) {
    for (const lesson of snapshot) {
      if (legacyLessonIds.includes(lesson.id) && Array.isArray(lesson.sentenceIds)) {
        for (const sid of lesson.sentenceIds) {
          ids.add(sid);
        }
      }
    }
  }
  return ids;
}

function migrateSentencesState() {
  if (!state.sentencesProgress || typeof state.sentencesProgress !== "object") {
    state.sentencesProgress = {};
  }
  if (!state.sentenceLessonSession || typeof state.sentenceLessonSession !== "object" || Array.isArray(state.sentenceLessonSession)) {
    state.sentenceLessonSession = null;
  }
  const progress = getSentencesProgress();
  if (isSentenceCurriculumV2() && Number(progress.planVersion || 1) < 2) {
    const legacyLessonIds = [...(progress.completedLessons || [])];
    progress.completedLessons = [];
    for (const lesson of getSentenceLessons()) {
      if (lesson.type !== "content") continue;
      const sIds = lesson.sentenceIds || [];
      if (sIds.length && sIds.every((id) => Number(progress.results[id]?.seen || 0) > 0)) {
        progress.completedLessons.push(lesson.id);
      }
    }
    progress.completedLessonsLegacy = legacyLessonIds;
    progress.planVersion = 2;
    state.sentenceLessonActive = null;
    state.sentenceLessonSession = null;
    saveState();
  }
}

function initWordBanks() {
  migrateVocabState();
  migrateSentencesState();
  buildWordReferenceRows();
}

// ── Vocabulary SRS ───────────────────────────────────────────────────────────

function getVocabSrsRecord(wordId, create = false) {
  if (!state.vocabSrs || typeof state.vocabSrs !== "object") state.vocabSrs = {};
  let record = state.vocabSrs[wordId];
  if (!record && create) {
    record = {
      box: 0, due: 0, seen: 0, correct: 0, missed: 0, lastSeen: 0, lastResult: null,
      isKnown: false, isHard: false, leech: false, directions: {},
    };
    state.vocabSrs[wordId] = record;
  }
  return record || null;
}

function getSrsDirectionRecord(record, direction) {
  if (!record.directions || typeof record.directions !== "object") record.directions = {};
  if (!record.directions[direction]) {
    record.directions[direction] = { seen: 0, correct: 0, missed: 0, box: 0, due: 0 };
  }
  return record.directions[direction];
}

function normalizeVocabReviewResult(result, isCorrect) {
  const raw = String(result || "").toLowerCase();
  if (raw === "correct" || raw === "incorrect" || raw === "skipped") return raw;
  return isCorrect ? "correct" : "incorrect";
}

function inferVocabErrorType(direction, result) {
  if (result === "correct") return null;
  if (result === "skipped") return "skipped";
  const map = {
    koToMeaning: "meaning-recall",
    meaningToKo: "hangul-recall",
    audioToMeaning: "audio-discrimination",
    audioToKo: "audio-recall",
    typeKo: "typing-recall",
    context: "context-recall",
    functionUsage: "particle-recall",
    formRecognition: "inflection-recognition",
    formProduction: "inflection-production",
  };
  return map[direction] || "recall-miss";
}

function estimateVocabConfidence(direction, result, latencyMs) {
  if (result === "skipped") return 0;
  const safeLatency = Math.max(0, Number(latencyMs) || 0);
  const speed = 1 - Math.min(1, safeLatency / 15000);
  const base = result === "correct" ? 0.62 : 0.24;
  const swing = result === "correct" ? 0.33 : -0.08;
  const directionBonus = direction === "typeKo" || direction === "formProduction" ? 0.03 : 0;
  const confidence = base + (speed * swing) + directionBonus;
  return Math.max(0.05, Math.min(0.99, Math.round(confidence * 100) / 100));
}

function normalizeVocabReviewEvent(event) {
  if (!event || typeof event !== "object") return null;
  const wordId = typeof event.wordId === "string" ? event.wordId : "";
  if (!wordId) return null;
  const direction = typeof event.direction === "string" && event.direction ? event.direction : "koToMeaning";
  const result = normalizeVocabReviewResult(event.result, event.result === "correct");
  const at = Number.isFinite(Number(event.at)) ? Number(event.at) : Date.now();
  const latencyMs = Number.isFinite(Number(event.latencyMs)) ? Math.max(0, Math.round(Number(event.latencyMs))) : 0;
  const confidence = Number.isFinite(Number(event.confidence))
    ? Math.max(0, Math.min(1, Math.round(Number(event.confidence) * 100) / 100))
    : estimateVocabConfidence(direction, result, latencyMs);
  return {
    wordId,
    direction,
    result,
    latencyMs,
    errorType: typeof event.errorType === "string" && event.errorType
      ? event.errorType
      : inferVocabErrorType(direction, result),
    confidence,
    source: typeof event.source === "string" && event.source ? event.source : "quiz",
    lessonId: typeof event.lessonId === "string" && event.lessonId ? event.lessonId : null,
    at,
  };
}

function normalizeVocabReviewEvents(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((event) => normalizeVocabReviewEvent(event))
    .filter(Boolean)
    .sort((a, b) => a.at - b.at)
    .slice(-VOCAB_REVIEW_EVENT_LIMIT);
}

function pushVocabReviewEvent(event) {
  if (!Array.isArray(state.vocabReviewEvents)) state.vocabReviewEvents = [];
  const normalized = normalizeVocabReviewEvent(event);
  if (!normalized) return null;
  state.vocabReviewEvents.push(normalized);
  if (state.vocabReviewEvents.length > VOCAB_REVIEW_EVENT_LIMIT) {
    state.vocabReviewEvents.splice(0, state.vocabReviewEvents.length - VOCAB_REVIEW_EVENT_LIMIT);
  }
  return normalized;
}

function recordVocabAttempt(wordId, direction, isCorrect, meta = {}) {
  if (!wordId || !curatedWordsById.has(wordId)) return;
  const now = Date.now();
  const record = getVocabSrsRecord(wordId, true);
  const dir = getSrsDirectionRecord(record, direction || "koToMeaning");
  const result = normalizeVocabReviewResult(meta.result, isCorrect);
  const latencyMs = Number.isFinite(Number(meta.latencyMs)) ? Math.max(0, Math.round(Number(meta.latencyMs))) : 0;

  record.seen += 1;
  record.lastSeen = now;
  record.lastResult = result;
  dir.seen += 1;

  if (isCorrect) {
    record.correct += 1;
    record.box = Math.min(record.box + 1, VOCAB_SRS_INTERVALS.length - 1);
    dir.correct += 1;
    dir.box = Math.min(dir.box + 1, VOCAB_SRS_INTERVALS.length - 1);
  } else {
    record.missed += 1;
    record.box = 0;
    record.isHard = true;
    record.isKnown = false;
    dir.missed += 1;
    dir.box = 0;
  }
  record.due = now + VOCAB_SRS_INTERVALS[record.box];
  dir.due = now + VOCAB_SRS_INTERVALS[dir.box];
  record.leech = record.missed >= 5 && record.missed / Math.max(1, record.seen) > 0.45;
  pushVocabReviewEvent({
    wordId,
    direction: direction || "koToMeaning",
    result,
    latencyMs,
    errorType: typeof meta.errorType === "string" && meta.errorType ? meta.errorType : inferVocabErrorType(direction || "koToMeaning", result),
    confidence: Number.isFinite(Number(meta.confidence))
      ? Math.max(0, Math.min(1, Math.round(Number(meta.confidence) * 100) / 100))
      : estimateVocabConfidence(direction || "koToMeaning", result, latencyMs),
    source: typeof meta.source === "string" && meta.source ? meta.source : "quiz",
    lessonId: typeof meta.lessonId === "string" && meta.lessonId ? meta.lessonId : null,
    at: Number.isFinite(Number(meta.at)) ? Number(meta.at) : now,
  });

  wordBankStatusVersion += 1;
}

// Manual known/hard/clear for a curated word. Keeps the legacy rank sets in
// sync when the word maps onto a raw frequency rank (level unlocks use them).
function setCuratedWordStatus(wordId, status) {
  const word = curatedWordsById.get(wordId);
  if (!word) return;
  const now = Date.now();
  const record = getVocabSrsRecord(wordId, true);

  if (status === "known") {
    record.isKnown = true;
    record.isHard = false;
    record.box = Math.max(record.box, 4);
    record.due = now + VOCAB_SRS_INTERVALS[record.box];
  } else if (status === "hard") {
    record.isHard = true;
    record.isKnown = false;
    record.box = 0;
    record.due = now + VOCAB_SRS_INTERVALS[0];
  } else {
    record.isKnown = false;
    record.isHard = false;
  }
  if (record.seen === 0) record.seen = 1;

  const row = wordReferenceById.get(wordId);
  const rank = row && Number.isInteger(row.rank) ? row.rank : null;
  if (rank) {
    setVocabStatus(rank, status === "known" ? "known" : status === "hard" ? "hard" : "clear");
  }
  wordBankStatusVersion += 1;
  saveState();
}

function getDueVocabReviews(limit = 20) {
  const now = Date.now();
  const due = [];
  const srs = state.vocabSrs || {};
  Object.keys(srs).forEach((wordId) => {
    const record = srs[wordId];
    const word = curatedWordsById.get(wordId);
    if (!word || !record || record.seen <= 0) return;
    if (record.due > now) return;
    due.push({ word, record });
  });
  due.sort((a, b) => {
    const hardDiff = Number(b.record.isHard) - Number(a.record.isHard);
    if (hardDiff) return hardDiff;
    return a.record.due - b.record.due;
  });
  return Number.isFinite(limit) ? due.slice(0, limit) : due;
}

function getVocabDueCount() {
  return getDueVocabReviews(Infinity).length;
}

function getKnownCuratedWordCount() {
  const srs = state.vocabSrs || {};
  return Object.keys(srs).filter((id) => srs[id] && srs[id].isKnown && curatedWordsById.has(id)).length;
}

function isWordRowDue(row, now = Date.now()) {
  if (!row || !row.word) return false;
  const record = (state.vocabSrs || {})[row.id];
  return Boolean(record && record.seen > 0 && record.due <= now);
}

function getWordRowStatus(row, knownSet, hardSet, now = Date.now()) {
  if (row.word) {
    const record = (state.vocabSrs || {})[row.id];
    if (record) {
      if (record.isKnown) return "known";
      if (record.isHard) return "hard";
      if (record.seen > 0 && record.due <= now) return "due";
      if (record.seen > 0) return "learning";
    }
  }
  if (Number.isInteger(row.rank)) {
    if (knownSet.has(row.rank)) return "known";
    if (hardSet.has(row.rank)) return "hard";
  }
  return "fresh";
}

// ── Typed-answer helpers ─────────────────────────────────────────────────────

function normalizeKoreanAnswer(value, { ignoreSpaces = false } = {}) {
  let text = String(value || "").normalize("NFC").trim().replace(/[.!?…,~]/g, "");
  text = ignoreSpaces ? text.replace(/\s+/g, "") : text.replace(/\s+/g, " ");
  return text;
}

function getWordAcceptedAnswers(word) {
  const answers = [];
  if (Array.isArray(word.forms) && word.forms.length) answers.push(...word.forms);
  answers.push(word.korean);
  if (word.display && word.display !== word.korean) answers.push(word.display);
  return answers;
}

function isWordTypedCorrect(value, word) {
  const typed = normalizeKoreanAnswer(value, { ignoreSpaces: true });
  if (!typed) return false;
  return getWordAcceptedAnswers(word).some(
    (answer) => normalizeKoreanAnswer(answer, { ignoreSpaces: true }) === typed,
  );
}

// The syllable form the learner types/builds — for multi-form particles
// (은/는) any single form counts, so target the first one.
function getWordTypeTarget(word) {
  if (Array.isArray(word.forms) && word.forms.length) return word.forms[0];
  return word.korean;
}

const WORD_TILE_DISTRACTORS = ["가", "나", "다", "리", "미", "바", "서", "아", "자", "하", "요", "은", "무", "고"];

function getWordSyllableTiles(word) {
  const target = getWordTypeTarget(word);
  const syllables = Array.from(target).filter((ch) => /[ㄱ-ㆎ가-힣]/u.test(ch));
  const distractors = shuffle(WORD_TILE_DISTRACTORS.filter((ch) => !syllables.includes(ch))).slice(0, 2);
  return shuffle([...syllables, ...distractors]);
}

// ── Word question generators (lessons, reviews, and the vocabulary quiz) ────

function pickWordMeaningChoices(word) {
  const pool = getCuratedWords()
    .filter((other) => other.id !== word.id && other.meaningShort !== word.meaningShort)
    .map((other) => other.meaningShort);
  return makeTextChoices(word.meaningShort, pool, 4);
}

function pickWordKoreanChoices(word) {
  const answer = word.display || word.korean;
  const pool = getCuratedWords()
    .filter((other) => other.id !== word.id && (other.display || other.korean) !== answer)
    .map((other) => other.display || other.korean);
  return makeTextChoices(answer, pool, 4);
}

function wordQuestionDetail(word) {
  const parts = [word.lessonTitle || word.lessonGroup, word.pos, word.pronunciation].filter(Boolean);
  return parts.join(" · ");
}

function wordQuestionExplanation(word) {
  const usage = word.usageNote ? ` ${word.usageNote}` : "";
  return `${word.display || word.korean} means “${word.meaningShort}”.${usage}`;
}

// Blank the word (or one of its forms) out of its example sentence. Returns
// null when the surface form doesn't appear (e.g. conjugated verbs).
function makeWordSentenceBlank(word) {
  if (!word.exampleKo) return null;
  const forms = getWordAcceptedAnswers(word).sort((a, b) => b.length - a.length);
  for (const form of forms) {
    if (form && word.exampleKo.includes(form)) {
      return { blanked: word.exampleKo.split(form).join("____"), answer: form };
    }
  }
  return makeConjugatedSentenceBlank(word);
}

// Verbs/adjectives usually appear conjugated in their example sentence
// (가다 → 학교에 가요), which the citation-form scan above can never match —
// before this path existed, 280 rows could not produce a context question and
// 18 lessons had a dead sentence-blank checkpoint. Ask the inflection engine
// for the word's generated forms plus the bare -아/어 infinitive and common
// stem+connective shapes, and blank the one the sentence actually contains;
// the conjugated surface form is the answer, so the learner completes the
// sentence they are reading. `conj` tells the context distractor pool to
// conjugate its candidates into the same shape.
const VOCAB_BLANK_FORM_NAMES = ["past", "honorific", "formal", "polite", "attributive"];
const VOCAB_BLANK_STEM_ENDINGS = ["고", "지", "서", "면"];
function makeConjugatedSentenceBlank(word) {
  const inflect = window.HANAPATH_INFLECT;
  if (!inflect || (word.pos !== "verb" && word.pos !== "adjective")) return null;
  const example = word.exampleKo;
  const candidates = [];
  for (const formName of VOCAB_BLANK_FORM_NAMES) {
    const form = inflect.conjugate(word.korean, word.pos, word.irregularFamily, formName);
    if (form && form !== word.korean) candidates.push({ form, conj: { formName } });
  }
  const polite = candidates.find((c) => c.conj.formName === "polite");
  if (polite && polite.form.endsWith("요")) {
    candidates.push({ form: polite.form.slice(0, -1), conj: { formName: "polite", trim: true } });
  }
  const stem = inflect.getStem(word.korean);
  if (stem && stem !== word.korean) {
    VOCAB_BLANK_STEM_ENDINGS.forEach((ending) => candidates.push({ form: stem + ending, conj: { ending } }));
  }
  candidates.sort((a, b) => b.form.length - a.form.length);
  for (const { form, conj } of candidates) {
    // Short conjugated fragments match inside unrelated words (서 in 에서),
    // so require 2+ syllables and a token-start position.
    if (form.length < 2) continue;
    const at = example.indexOf(form);
    if (at < 0) continue;
    if (at > 0 && !/[\s"“”‘’(【[]/.test(example[at - 1])) continue;
    return { blanked: example.split(form).join("____"), answer: form, conj };
  }
  return null;
}

// Build a distractor in the same conjugated shape as a blank's answer.
// A target-word candidate that never matches its example is a harmless no-op,
// but a distractor is *shown* to the learner, so it must be grammatical:
// -서 is really -아/어서 (attach to the infinitive, not the stem), and -(으)면
// needs 으 after a closed syllable. -고/-지 attach to any stem as-is.
function makeConjugatedDistractor(inflect, other, conj) {
  if (!conj.ending) {
    let form = inflect.conjugate(other.korean, other.pos, other.irregularFamily, conj.formName);
    if (form && conj.trim && form.endsWith("요")) form = form.slice(0, -1);
    return form && form !== other.korean ? form : null;
  }
  const stem = inflect.getStem(other.korean);
  if (!stem || stem === other.korean) return null;
  if (conj.ending === "서") {
    const politeForm = inflect.conjugate(other.korean, other.pos, other.irregularFamily, "polite");
    return politeForm && politeForm.endsWith("요") ? politeForm.slice(0, -1) + "서" : null;
  }
  if (conj.ending === "면") {
    const last = inflect.decompose(stem[stem.length - 1]);
    return stem + (last && last.jong ? "으면" : "면");
  }
  return stem + conj.ending;
}

// Generate one word question. Directions: koToMeaning, audioToMeaning,
// meaningToKo, audioToKo, typeKo, context, functionUsage.
// Returns null when the word can't support the direction (caller falls back).
function generateWordQuestionFor(word, direction) {
  const display = word.display || word.korean;
  const base = {
    kind: "Words",
    wordId: word.id,
    direction,
    srsWordId: word.id,
    srsDirection: direction,
    detail: wordQuestionDetail(word),
    explanation: wordQuestionExplanation(word),
    voiceText: word.voiceText || word.korean,
  };

  if (direction === "koToMeaning") {
    return {
      ...base,
      mode: "Korean → meaning",
      prompt: "What does this word mean?",
      visual: `<div class="big-glyph" lang="ko">${escapeHtml(display)}</div>`,
      options: pickWordMeaningChoices(word),
      answer: word.meaningShort,
    };
  }

  if (direction === "audioToMeaning") {
    return {
      ...base,
      mode: "Listen → meaning",
      prompt: "Listen, then choose the meaning.",
      visual: `<div class="big-glyph">♪</div><div class="fs-xs text-muted-2">Tap Replay to hear it again</div>`,
      options: pickWordMeaningChoices(word),
      answer: word.meaningShort,
      autoSpeak: true,
    };
  }

  if (direction === "meaningToKo") {
    return {
      ...base,
      mode: "Meaning → Korean",
      prompt: `Which Korean word means “${word.meaningShort}”?`,
      visual: `<div class="big-glyph">${escapeHtml(word.meaningShort)}</div>`,
      options: pickWordKoreanChoices(word),
      answer: display,
    };
  }

  if (direction === "audioToKo") {
    return {
      ...base,
      mode: "Listen → Korean",
      prompt: "Listen, then choose what you heard.",
      visual: `<div class="big-glyph">♪</div><div class="fs-xs text-muted-2">${escapeHtml(word.meaningShort)}</div>`,
      options: pickWordKoreanChoices(word),
      answer: display,
      autoSpeak: true,
    };
  }

  if (direction === "typeKo") {
    return {
      ...base,
      mode: "Type the Korean",
      prompt: `Type the Korean for “${word.meaningShort}”.`,
      visual: `<div class="big-glyph">${escapeHtml(word.meaningShort)}</div>`,
      interaction: "type",
      placeholder: "Type the Korean word",
      helper: "No Korean keyboard? Use the on-screen keys below.",
      options: [],
      answer: getWordTypeTarget(word),
      acceptedAnswers: getWordAcceptedAnswers(word),
    };
  }

  if (direction === "context") {
    const blank = makeWordSentenceBlank(word);
    if (!blank) return null;
    const answer = blank.answer;
    // When the blank is a conjugated form, distractors must share its shape —
    // citation-form distractors would make the one conjugated option a
    // giveaway. Fall back to the plain pool only if too few candidates
    // conjugate (makeTextChoices loops forever on a starved pool).
    let pool = null;
    if (blank.conj) {
      const inflect = window.HANAPATH_INFLECT;
      pool = getCuratedWords()
        .filter((other) => other.id !== word.id && other.pos === word.pos && other.korean !== word.korean)
        .map((other) => makeConjugatedDistractor(inflect, other, blank.conj))
        .filter((text) => text && text.length >= 2 && text !== answer);
      if (new Set(pool).size < 3) pool = null;
    }
    if (!pool) {
      pool = getCuratedWords()
        .filter((other) => other.id !== word.id)
        .map((other) => getWordTypeTarget(other))
        .filter((text) => text !== answer);
    }
    return {
      ...base,
      mode: "Complete the sentence",
      prompt: "Complete the sentence.",
      visual: `<div class="word-sentence-blank" lang="ko">${escapeHtml(blank.blanked)}</div><div class="fs-xs text-muted-2">${escapeHtml(word.exampleEn || "")}</div>`,
      options: makeTextChoices(answer, pool, 4),
      answer,
      voiceText: word.exampleVoiceText || word.exampleKo,
    };
  }

  if (direction === "functionUsage") {
    if (!word.isFunctionWord) return null;
    const blank = makeWordSentenceBlank(word);
    if (!blank) return null;
    const particlePool = ["은", "는", "이", "가", "을", "를", "에", "에서", "도", "의", "와", "과", "하고", "고"]
      .filter((p) => p !== blank.answer);
    return {
      ...base,
      mode: "Function word usage",
      prompt: `Choose the right ${word.meaningShort}.`,
      visual: `<div class="word-sentence-blank" lang="ko">${escapeHtml(blank.blanked)}</div><div class="fs-xs text-muted-2">${escapeHtml(word.exampleEn || "")}</div>`,
      options: makeTextChoices(blank.answer, particlePool, 4),
      answer: blank.answer,
      voiceText: word.exampleVoiceText || word.exampleKo,
    };
  }

  if (direction === "formRecognition") {
    if (word.pos !== "verb" && word.pos !== "adjective") return null;
    let targetForm = "polite";
    let targetLabel = "polite informal";
    if (word.lessonGroup === "honorifics" || word.lessonGroup === "irregular-families") {
      targetForm = "honorific";
      targetLabel = "subject honorific";
    } else if (word.lessonGroup === "noun-modification") {
      targetForm = "attributive";
      targetLabel = "noun modifier (attributive)";
    }

    const correctForm = window.HANAPATH_INFLECT ? window.HANAPATH_INFLECT.inflect(word, targetForm) : null;
    if (!correctForm || correctForm === word.korean) return null;
    const recognizerMatches = window.HANAPATH_INFLECT && typeof window.HANAPATH_INFLECT.recognize === "function"
      ? window.HANAPATH_INFLECT.recognize(correctForm, [word], [targetForm])
      : [];
    if (!recognizerMatches.length) return null;

    const otherVerbs = getCuratedWords()
      .filter((other) => other.id !== word.id && (other.pos === "verb" || other.pos === "adjective"))
      .map((other) => other.display || other.korean);

    return {
      ...base,
      mode: "Form recognition",
      prompt: `Which base verb/adjective does the conjugated form “${correctForm}” (${targetLabel}) come from?`,
      visual: `<div class="big-glyph" lang="ko">${escapeHtml(correctForm)}</div>`,
      options: makeTextChoices(display, otherVerbs, 4),
      answer: display,
    };
  }

  if (direction === "formProduction") {
    if (word.pos !== "verb" && word.pos !== "adjective") return null;
    let targetForm = "polite";
    let targetLabel = "polite informal (-아/어/해요)";
    if (word.lessonGroup === "honorifics" || word.lessonGroup === "irregular-families") {
      targetForm = "honorific";
      targetLabel = "subject honorific (-(으)세요)";
    } else if (word.lessonGroup === "noun-modification") {
      targetForm = "attributive";
      targetLabel = "attributive modifier (-(으)ㄴ / -는)";
    } else if (word.lessonGroup === "past-tense" || word.lessonGroup === "past-tense-negation") {
      targetForm = "past";
      targetLabel = "polite past tense (-았/었어요)";
    }

    const correctForm = window.HANAPATH_INFLECT ? window.HANAPATH_INFLECT.inflect(word, targetForm) : null;
    if (!correctForm || correctForm === word.korean) return null;

    return {
      ...base,
      mode: "Form production",
      prompt: `Type the ${targetLabel} form of the word “${display}” (${word.meaningShort}).`,
      visual: `<div class="big-glyph" lang="ko">${escapeHtml(display)}</div><div class="fs-xs text-muted-2">Meaning: ${escapeHtml(word.meaningShort)}</div>`,
      interaction: "type",
      placeholder: "Type the conjugated form",
      helper: "Use the keyboard or on-screen keys.",
      options: [],
      answer: correctForm,
      acceptedAnswers: [correctForm],
    };
  }

  return null;
}

// ── Word lessons: unlocks and progression ───────────────────────────────────

function getWordLessonById(lessonId) {
  return getWordLessons().find((lesson) => lesson.id === lessonId) || null;
}

function isWordLessonCompleted(lessonId) {
  return (state.vocabLessonCompleted || []).includes(lessonId);
}

function isWordLessonUnlocked(lesson) {
  if (!lesson) return false;
  if (isWordCurriculumV2()) {
    const unit = getWordUnitById(lesson.unitId);
    if (!isWordUnitUnlocked(unit)) return false;
    const contentLessons = getWordUnitContentLessons(unit);
    if (lesson.type === "checkpoint") return contentLessons.every((contentLesson) => isWordLessonCompleted(contentLesson.id));
    const index = contentLessons.findIndex((contentLesson) => contentLesson.id === lesson.id);
    return index <= 0 || isWordLessonCompleted(contentLessons[index - 1].id);
  }
  if (TEST_UNLOCK_ALL_STAGES) return true; // see TEST_UNLOCK_ALL_STAGES above — must come before the alphabet-complete gate, not after
  if (lesson.unlock?.requiresAlphabetComplete && !getAlphabetProgress().complete) return false;
  const prev = lesson.unlock?.previousLessonId;
  return !prev || isWordLessonCompleted(prev);
}

function getNextWordLesson() {
  return getWordLessons().find((lesson) => !isWordLessonCompleted(lesson.id) && isWordLessonUnlocked(lesson)) || null;
}

function getWordLessonWords(lesson) {
  return getWordLessonReviewWordIds(lesson).map((id) => curatedWordsById.get(id)).filter(Boolean);
}

// Specialized checkpoints (forms, function words, sentence blanks) are not
// viable for every row. Keep those richer questions, but never let a word
// disappear from its lesson check just because one specialized generator
// returned null. Every lesson word receives at least one meaning check.
function ensureEveryWordTested(questions, words) {
  const testedIds = new Set(questions.map((question) => question.wordId).filter(Boolean));
  words.forEach((word) => {
    if (testedIds.has(word.id)) return;
    const fallback = generateWordQuestionFor(word, "koToMeaning")
      || generateWordQuestionFor(word, "meaningToKo");
    if (fallback) {
      questions.push(fallback);
      testedIds.add(word.id);
    }
  });
  return questions;
}

// Checkpoint question list for a lesson: recognition first, then recall,
// typed recall, and context. Generated once per session and kept on the
// volatile view so quick-reference return restores the exact same question.
function buildWordLessonQuestions(lesson, words) {
  const checkpoints = Array.isArray(lesson.checkpoints) ? lesson.checkpoints : [];
  const questions = [];
  const push = (word, direction) => {
    const question = generateWordQuestionFor(word, direction);
    if (question) questions.push(question);
  };

  const hasCustomCheckpoint = checkpoints.some((checkpoint) => ["form-recognition", "form-production", "function-usage"].includes(checkpoint));
  if (!hasCustomCheckpoint && (checkpoints.includes("ko-to-meaning") || checkpoints.includes("meaning-to-ko"))) {
    words.forEach((word, index) => push(word, index % 2 === 0 ? "koToMeaning" : "meaningToKo"));
    if (checkpoints.includes("audio-to-meaning")) {
      words.forEach((word) => push(word, "audioToMeaning"));
    }
    if (checkpoints.includes("type-ko")) {
      for (let index = 0; index < words.length; index += 2) push(words[index], "typeKo");
    }
    if (checkpoints.includes("sentence-blank")) {
      const viable = words.filter((word) => generateWordQuestionFor(word, "context"));
      const count = Math.min(3, viable.length);
      const selected = [];
      for (let index = 0; index < count; index += 1) {
        const word = viable[Math.floor(index * viable.length / count)];
        if (word && !selected.includes(word)) selected.push(word);
      }
      selected.forEach((word) => push(word, "context"));
    }
    return ensureEveryWordTested(questions, words);
  }

  if (checkpoints.includes("ko-to-meaning")) words.forEach((word) => push(word, "koToMeaning"));
  if (checkpoints.includes("audio-to-meaning")) words.forEach((word) => push(word, "audioToMeaning"));
  if (checkpoints.includes("meaning-to-ko")) words.forEach((word) => push(word, "meaningToKo"));
  if (checkpoints.includes("type-ko")) {
    for (let index = 0; index < words.length; index += 2) push(words[index], "typeKo");
  }
  if (checkpoints.includes("form-recognition")) {
    words.forEach((word) => push(word, "formRecognition"));
  }
  if (checkpoints.includes("form-production")) {
    words.forEach((word) => push(word, "formProduction"));
  }
  if (checkpoints.includes("sentence-blank")) {
    words.forEach((word) => push(word, "context"));
  }
  if (checkpoints.includes("function-usage")) {
    words.forEach((word) => push(word, "functionUsage"));
  }
  return ensureEveryWordTested(questions, words);
}

function initWordLessonView(lesson) {
  resetLessonMotion("word");
  const words = getWordLessonWords(lesson);
  const steps = [];
  if (lesson.type !== "checkpoint") words.forEach((word, index) => {
    steps.push({ type: "card", wordId: word.id, wordIndex: index });
    steps.push({ type: "type", wordId: word.id, wordIndex: index });
    if (typeof WORD_LESSON_REPEAT_STEP_ENABLED === "undefined" || WORD_LESSON_REPEAT_STEP_ENABLED) steps.push({ type: "repeat", wordId: word.id, wordIndex: index });
  });
  wordLessonView = {
    lessonId: lesson.id,
    isReview: false,
    mode: lesson.type === "checkpoint" ? "check" : "intro", // intro | study | check | result
    stepIndex: 0,
    questionIndex: 0,
    stepStartedAt: 0,
    questionStartedAt: 0,
    steps,
    questions: buildWordLessonQuestions(lesson, words),
    words,
    typedValue: "",
    typedFeedback: "",
    typedDone: false,
    typedAttempts: {},
    typeHelperVisible: false,
    questionHelperUsed: false,
    answered: false,
    selectedChoice: "",
    results: [],
    resultSaved: false,
    reviewingCheckpoint: false,
  };
}

function openWordLesson(lessonId, { resume = false } = {}) {
  const lesson = getWordLessonById(lessonId);
  if (!lesson) return;
  if (!isWordLessonUnlocked(lesson)) {
    showRetryToast("Finish the previous word lesson to unlock this one.");
    return;
  }
  queueScreenMotion("forward", 1, { replace: false });
  stopSpeech();
  if (!resume || !wordLessonView || wordLessonView.lessonId !== lesson.id) {
    wordLessonView = resume ? rehydrateWordLessonView(state.vocabLessonSession, lesson) : null;
    if (!wordLessonView) initWordLessonView(lesson);
  }
  state.vocabLessonActive = lesson.id;
  persistWordLessonSession(wordLessonView);
  renderWordLesson();
}

// Review session pseudo-lesson: reuses the checkpoint renderer/result screen.
function openWordReview() {
  const due = getDueVocabReviews(20);
  if (!due.length) {
    showRetryToast("No reviews due right now. Learn new words instead.");
    return;
  }
  stopSpeech();
  const questions = [];
  due.forEach(({ word, record }) => {
    const directions = record.isHard
      ? ["koToMeaning", "meaningToKo", "typeKo"]
      : ["koToMeaning", "meaningToKo", "audioToMeaning", "context"];
    const question = generateWordQuestionFor(word, randomItem(directions))
      || generateWordQuestionFor(word, "koToMeaning");
    if (question) questions.push(question);
  });
  wordLessonView = {
    lessonId: null,
    isReview: true,
    mode: "check",
    stepIndex: 0,
    questionIndex: 0,
    stepStartedAt: 0,
    questionStartedAt: Date.now(),
    steps: [],
    questions,
    words: due.map((item) => item.word),
    typedValue: "",
    typedFeedback: "",
    typedDone: false,
    typedAttempts: {},
    typeHelperVisible: false,
    questionHelperUsed: false,
    answered: false,
    selectedChoice: "",
    results: [],
    resultSaved: false,
    reviewingCheckpoint: false,
  };
  resetLessonMotion("word");
  queueScreenMotion("forward", 1, { replace: false });
  renderWordLesson();
}

function openWordsHome() {
  openLearnStageContent("vocabulary", getTrackLevel("vocabulary"));
}

function wordReferenceButtonHtml() {
  return '<div class="word-reference-row">' +
    '<button class="button secondary compact" type="button" data-word-open-reference>📚 Word Bank</button>' +
    '</div>';
}

function closeWordExampleOverlay() {
  const overlay = document.querySelector("[data-word-example-overlay]");
  if (overlay) overlay.remove();
  document.removeEventListener("keydown", handleWordExampleEscape);
}

function handleWordExampleEscape(event) {
  if (event.key === "Escape") closeWordExampleOverlay();
}

function openWordExampleOverlay(word) {
  if (!word) return;
  closeWordExampleOverlay();
  const overlay = document.createElement("div");
  overlay.className = "word-example-overlay";
  overlay.dataset.wordExampleOverlay = "true";
  overlay.innerHTML = `
    <div class="word-example-dialog" role="dialog" aria-modal="true" aria-labelledby="wordExampleTitle">
      <button class="word-example-close" type="button" data-word-example-close aria-label="Close example">×</button>
      <div class="eyebrow">Example sentence</div>
      <button id="wordExampleTitle" class="word-example-dialog-word" type="button" lang="ko" data-word-example-hangul aria-label="Hear ${escapeHtml(word.display || word.korean)}">${escapeHtml(word.display || word.korean)}</button>
      <button class="word-example-dialog-ko" type="button" lang="ko" data-word-example-sentence aria-label="Play example sentence">${escapeHtml(word.exampleKo || "")}</button>
      <div class="word-example-dialog-en">${escapeHtml(word.exampleEn || "")}</div>
      <button class="button primary compact word-example-dialog-hear" type="button" data-word-example-play>▶ Play again</button>
    </div>
  `;
  document.body.appendChild(overlay);
  const play = () => void speak(word.exampleVoiceText || word.exampleKo || "");
  const playHangul = () => void speak(word.voiceText || word.korean || "");
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target.closest("[data-word-example-close]")) {
      closeWordExampleOverlay();
      return;
    }
    const playAgain = event.target.closest("[data-word-example-play]");
    if (playAgain) { flashElement(playAgain); play(); return; }
    const hangul = event.target.closest("[data-word-example-hangul]");
    if (hangul) { flashElement(hangul); playHangul(); return; }
    const sentence = event.target.closest("[data-word-example-sentence]");
    if (sentence) { flashElement(sentence); play(); }
  });
  document.addEventListener("keydown", handleWordExampleEscape);
  play();
}

function openWordBankQuickRef() {
  state.wordQuickRefActive = true;
  state.wordQuickRefReturn = wordLessonView
    ? { lessonId: wordLessonView.lessonId, isReview: wordLessonView.isReview }
    : null;
  saveState();
  openEntireWordBank();
}

function getWordBankReturnLabel() {
  if (wordBankReturnTarget?.type === "metrics") return "Insights";
  if (state.wordQuickRefActive) return wordLessonView && wordLessonView.isReview ? "review" : "lesson";
  return "";
}

function wordBankReturnButtonHtml() {
  const label = getWordBankReturnLabel();
  return label
    ? `<div style="margin-bottom:4px;"><button class="button primary compact" type="button" data-word-bank-return>Return to ${escapeHtml(label)}</button></div>`
    : "";
}

function returnFromWordBank() {
  const target = wordBankReturnTarget;
  wordBankReturnTarget = null;
  if (target?.type === "metrics") {
    state.vocabView = "metrics";
    saveState();
    openWordsHome();
    return;
  }
  state.wordQuickRefActive = false;
  state.wordQuickRefReturn = null;
  saveState();
  if (wordLessonView) {
    renderWordLesson();
    return;
  }
  openWordsHome();
}

function openWordBankDetailFromMetrics(wordId) {
  const row = wordReferenceById.get(wordId);
  if (!row || !row.word) return;
  state.vocabView = "metrics";
  saveState();
  openEntireWordBank({
    detailId: row.id,
    returnTarget: { type: "metrics" },
  });
}

// ── Guided word lesson renderer ──────────────────────────────────────────────

function bindVocabMetricsRows(root) {
  if (!root) return;
  root.querySelectorAll("[data-metrics-word-open]").forEach((row) => {
    const openWord = () => openWordBankDetailFromMetrics(row.dataset.metricsWordOpen);
    row.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("[data-speak]")) return;
      openWord();
    });
    row.addEventListener("keydown", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("[data-speak]")) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openWord();
    });
  });
}

function renderWordLesson() {
  const view = wordLessonView;
  if (!view) { openWordsHome(); return; }
  const lesson = view.isReview ? null : getWordLessonById(view.lessonId);
  if (!view.isReview && !lesson) { openWordsHome(); return; }

  currentQuizScope = "vocabulary";
  state.studio = "vocab";
  activeHub = "learn";
  setNavActive("learn");
  if (view.mode === "study" && !(Number(view.stepStartedAt) > 0)) startWordLessonStudyTimer(view);
  if (view.mode === "check" && !(Number(view.questionStartedAt) > 0)) startWordLessonQuestionTimer(view);
  const el = showScreen("detail");
  if (!el) return;

  const title = view.isReview ? "Word review" : lesson.title;
  showDetailBarWithBack("learn", title, () => { stopSpeech(); openWordsHome(); }, "Words");

  let inner = "";
  if (view.mode === "intro") inner = wordLessonIntroHtml(lesson, view);
  else if (view.mode === "study") inner = wordLessonStudyHtml(lesson, view);
  else if (view.mode === "check") inner = wordLessonCheckHtml(lesson, view);
  else inner = wordLessonResultHtml(lesson, view);

  el.innerHTML = `<div id="wordLessonRoot" data-lesson-motion-root>${inner}</div>`;
  const root = el.querySelector("#wordLessonRoot");
  bindWordLessonRoot(root);
  const frameIndex = view.mode === "intro"
    ? 0
    : view.mode === "study"
      ? 100 + view.stepIndex
      : view.mode === "check"
        ? 1000 + view.questionIndex
        : 2000;
  animateLessonFrame(root, "word", {
    key: `${view.mode}:${view.mode === "study" ? view.stepIndex : view.mode === "check" ? view.questionIndex : 0}`,
    order: frameIndex,
    phase: view.mode === "check" && view.answered ? "feedback" : view.mode,
    complete: view.mode === "result",
  });
}

function getWordLessonIntroGoal(lesson) {
  const goal = String(lesson?.goal || "");
  if (WORD_LESSON_REPEAT_STEP_ENABLED) return goal;
  return goal.replace("see, hear, type, repeat, and review", "see, hear, type, and review");
}

function wordLessonIntroHtml(lesson, view) {
  const repeatTutorialRow = WORD_LESSON_REPEAT_STEP_ENABLED
    ? '<div class="study-row"><div><div class="study-row-ko">🗣 Repeat aloud</div><div class="study-row-sub">Hear the word, say it out loud, then tap “I said it”. Nobody grades you.</div></div></div>'
    : "";
  const goal = getWordLessonIntroGoal(lesson);
  const tutorialHtml = lesson.tutorial
    ? `
      <div class="card">
        <div class="eyebrow mb-12">How word cards work</div>
        <div class="study-list">
          <div class="study-row"><div><div class="study-row-ko">▶ Hear word · Hear example</div><div class="study-row-sub">Every word and sentence has audio. Tap to listen as often as you like.</div></div></div>
          <div class="study-row"><div><div class="study-row-ko">⌨ Type it</div><div class="study-row-sub">You'll type each word once. No Korean keyboard? Tap the syllable blocks instead.</div></div></div>
          ${repeatTutorialRow}
          <div class="study-row"><div><div class="study-row-ko">✓ Known · ✗ Hard</div><div class="study-row-sub">Mark words you already know or find hard. Hard words come back sooner in review.</div></div></div>
          <div class="study-row"><div><div class="study-row-ko">🔁 Review</div><div class="study-row-sub">Finished words are scheduled for spaced review so they stick.</div></div></div>
          <div class="study-row"><div><div class="study-row-ko">📚 Word Bank</div><div class="study-row-sub">Look up any word mid-lesson — you'll return to the exact spot you left.</div></div></div>
        </div>
      </div>`
    : "";
  return `
    <div class="card">
      <div class="eyebrow">Stage ${escapeHtml(lesson.stage)} · Word lesson</div>
      <h2 class="screen-title" style="margin-bottom:8px;">${escapeHtml(lesson.title)}</h2>
      <div class="screen-sub" style="margin-bottom:12px;">${escapeHtml(lesson.subtitle || "")}</div>
      <div class="text-muted-2 fs-sm" style="margin-bottom:12px;">${escapeHtml(goal)}</div>
      <div class="flex-between" style="gap:12px; flex-wrap:wrap;">
        <span class="pill accent">${view.words.length} new word${view.words.length === 1 ? "" : "s"}</span>
        <button class="button primary compact" type="button" data-word-lesson-start>Start</button>
      </div>
      ${wordReferenceButtonHtml()}
    </div>
    ${tutorialHtml}
  `;
}

function getWordLessonStep(view) {
  return view.steps[view.stepIndex] || null;
}

function wordTypedSuccessOverlayHtml(word) {
  return `
    <div class="word-typed-success-overlay" role="presentation">
      <div class="word-typed-success-dialog" role="dialog" aria-modal="true" aria-labelledby="wordTypedSuccessTitle">
        <div id="wordTypedSuccessTitle" class="word-typed-success-title">Correct!</div>
        <div class="word-typed-success-answer-row">
          <div class="word-typed-success-answer" lang="ko">${escapeHtml(getWordTypeTarget(word))}</div>
          <button class="word-typed-success-play" type="button" lang="ko" data-speak="${escapeHtml(word.voiceText || word.korean)}" aria-label="Play ${escapeHtml(getWordTypeTarget(word))}" title="Play Hangul">▶</button>
        </div>
        <div class="word-typed-success-prompt">How did that feel?</div>
        <div class="word-rating-actions word-typed-success-actions">
          <button class="word-rating-button word-rating-hard" type="button" data-word-lesson-rate="hard">Hard</button>
          <button class="word-rating-button word-rating-known" type="button" data-word-lesson-rate="known">Known</button>
        </div>
      </div>
    </div>
  `;
}

function wordLessonStudyHtml(lesson, view) {
  const step = getWordLessonStep(view);
  if (!step) return "";
  const word = curatedWordsById.get(step.wordId);
  if (!word) return "";
  const display = word.display || word.korean;
  const progress = `Word ${step.wordIndex + 1} of ${view.words.length}`;

  if (step.type === "card") {
    const formsHtml = Array.isArray(word.forms) && word.forms.length
      ? `<div class="word-card-forms">Forms: ${word.forms.map((f) => `<span lang="ko">${escapeHtml(f)}</span>`).join(" · ")}</div>`
      : "";
    return `
      <div class="card word-card">
        <div class="word-card-progress-row">
          <div class="word-card-progress-tile">
            <div class="eyebrow">${escapeHtml(progress)}</div>
            <div class="word-card-progress-track" aria-hidden="true"><span style="width:${Math.round(((step.wordIndex + 1) / Math.max(1, view.words.length)) * 100)}%;"></span></div>
          </div>
          <button class="button secondary compact word-card-bank-button" type="button" data-word-open-reference>📚 Word Bank</button>
        </div>
        <div class="word-card-heading">
          <div class="word-card-ko-tile">
            <button class="word-card-ko" type="button" lang="ko" data-speak="${escapeHtml(word.voiceText || word.korean)}" aria-label="Hear ${escapeHtml(display)}"><span class="word-card-ko-main">${escapeHtml(display)}</span><span class="word-card-ko-rom">${escapeHtml(word.pronunciation)}</span></button>
            <button class="word-card-ko-play" type="button" lang="ko" data-speak="${escapeHtml(word.voiceText || word.korean)}" aria-label="Play ${escapeHtml(display)}" title="Play Hangul">▶</button>
          </div>
        </div>
        <div class="word-card-definition"><span>${escapeHtml(word.pos)}</span><span aria-hidden="true">|</span><span>${escapeHtml(word.meaning)}</span></div>
        ${formsHtml}
        ${wordHonorificCardHtml(word)}
        ${word.usageNote ? `<div class="word-study-note">${escapeHtml(word.usageNote)}</div>` : ""}
        <div class="word-card-actions word-card-audio-actions">
          <button class="button secondary compact" type="button" data-word-example-open>▶ Hear it in a sentence</button>
        </div>
        <div class="word-card-actions word-card-nav-actions">
          <button class="button secondary compact" type="button" data-word-lesson-back ${view.stepIndex === 0 ? "disabled" : ""}>Back</button>
          <button class="button primary compact" type="button" data-word-lesson-next>Next: type it →</button>
        </div>
      </div>
    `;
  }

  if (step.type === "type") {
    const tiles = view.typeHelperVisible || view.typedDone
      ? (view.typeTiles && view.typeTilesWordId === word.id ? view.typeTiles : getWordSyllableTiles(word))
      : [];
    if (tiles.length) {
      view.typeTiles = tiles;
      view.typeTilesWordId = word.id;
    }
    const target = getWordTypeTarget(word);
    return `
      <div class="card word-card">
        <div class="word-card-progress-row">
          <div class="word-card-progress-tile">
            <div class="eyebrow">${escapeHtml(progress)}</div>
            <div class="word-card-type-label">Type it</div>
            <div class="word-card-progress-track" aria-hidden="true"><span style="width:${Math.round(((step.wordIndex + 1) / Math.max(1, view.words.length)) * 100)}%;"></span></div>
          </div>
          ${view.typedDone ? '<button class="button secondary compact word-card-bank-button" type="button" data-word-open-reference>📚 Word Bank</button>' : ""}
        </div>
        <div class="word-type-prompt-row">
          <div class="word-type-prompt">Type the Korean for <strong>“${escapeHtml(word.meaningShort)}”</strong><div class="word-type-definition">Recall it without the spelling shown.</div></div>
        </div>
        <div class="word-type-box word-type-study-box">
          <div class="word-input-wrap">
            <input class="sentence-input" id="wordTypeInput" type="text" autocomplete="off" autocapitalize="off" spellcheck="false"
              placeholder="Type it here" value="${escapeHtml(view.typedValue || "")}" ${view.typedDone ? "disabled" : ""} lang="ko" />
            <button class="word-input-erase" type="button" data-word-tile-erase aria-label="Delete last block" ${view.typedDone ? "disabled" : ""}>⌫</button>
          </div>
          ${view.typeHelperVisible || view.typedDone ? `
            <div class="fs-xs text-muted-2" style="margin:8px 0 4px;">Syllable help is open; this attempt is recorded as aided.</div>
            <div class="word-tile-row">
              ${tiles.map((tile) => `<button class="word-tile" type="button" data-word-tile="${escapeHtml(tile)}" lang="ko" ${view.typedDone ? "disabled" : ""}>${escapeHtml(tile)}</button>`).join("")}
            </div>` : '<button class="button secondary compact word-helper-button" type="button" data-word-show-tiles>Need help? Show syllable bank</button>'}
          <div class="word-type-feedback" role="status" aria-live="polite">${view.typedFeedback || ""}</div>
        </div>
        ${view.typedDone ? "" : `<div class="word-card-actions word-card-nav-actions">
          <button class="button secondary compact" type="button" data-word-lesson-back ${view.stepIndex === 0 ? "disabled" : ""}>Back</button>
          <button class="button primary compact" type="button" data-word-type-check>Check</button>
        </div>`}
      </div>
      ${view.typedDone ? wordTypedSuccessOverlayHtml(word) : ""}
    `;
  }

  // repeat / shadow step — self-check only, no fake pronunciation grading.
  return `
    <div class="card word-card word-shadow-card">
      <div class="eyebrow">${escapeHtml(progress)} · Repeat aloud</div>
      <button class="word-card-ko" type="button" lang="ko" data-speak="${escapeHtml(word.voiceText || word.korean)}" aria-label="Hear ${escapeHtml(display)}">${escapeHtml(display)}</button>
      <div class="word-card-meta">${escapeHtml(word.pronunciation)} · ${escapeHtml(word.meaningShort)}</div>
      ${pronunciationLayer ? `<div class="word-card-meta">${escapeHtml(pronunciationLayer)}</div>` : ""}
      ${wordHonorificCardHtml(word)}
      <div class="screen-sub" style="margin:12px 0;">Tap Hear, say it out loud once, then continue. Nobody is grading your accent.</div>
      <div class="word-card-actions">
        <button class="button secondary compact" type="button" data-speak="${escapeHtml(word.voiceText || word.korean)}">▶ Hear</button>
        <button class="button secondary compact" type="button" data-speak="${escapeHtml(word.voiceText || word.korean)}">↻ Try again</button>
        ${view.reviewingCheckpoint ? '<button class="button secondary compact" type="button" data-word-return-checkpoint>Return to questions</button>' : ""}
        <button class="button primary compact" type="button" data-word-lesson-next>I said it →</button>
      </div>
      ${wordReferenceButtonHtml()}
    </div>
  `;
}

function getWordLessonQuestion(view) {
  return view.questions[view.questionIndex] || null;
}

function renderWordQuestionVisual(question) {
  const visual = String(question?.visual || "");
  const match = visual.match(/^<div class="big-glyph"(?: lang="ko")?>([^<]+)<\/div>$/);
  if (!match) return visual;

  const text = match[1].trim();
  if (!text || !/^[\u3131-\u318E\uAC00-\uD7A3\s]+$/u.test(text)) return visual;

  const safeText = escapeHtml(text);
  return `<button class="big-glyph word-checkpoint-audio" type="button" lang="ko" data-speak="${safeText}" aria-label="Hear ${safeText}" title="Tap to hear">${safeText}</button>`;
}

function wordLessonCheckHtml(lesson, view) {
  const question = getWordLessonQuestion(view);
  if (!question) return "";
  const progress = `Question ${view.questionIndex + 1} of ${view.questions.length}`;
  const eyebrow = view.isReview ? "Review" : `Checkpoint · ${escapeHtml(lesson.title)}`;
  const visualHtml = renderWordQuestionVisual(question);
  const feedbackClasses = ["word-type-feedback", "quiz-feedback"];
  if (view.answered && view.checkCorrect === true) feedbackClasses.push("correct");
  if (view.answered && view.checkCorrect === false) feedbackClasses.push("wrong");

  let interactionHtml = "";
  if (question.interaction === "type") {
    const word = curatedWordsById.get(question.wordId);
    const tiles = view.typeHelperVisible || view.answered
      ? (view.typeTiles && view.typeTilesWordId === `q-${view.questionIndex}` ? view.typeTiles : getWordSyllableTiles(word))
      : [];
    if (tiles.length) {
      view.typeTiles = tiles;
      view.typeTilesWordId = `q-${view.questionIndex}`;
    }
    interactionHtml = `
      <div class="word-type-box">
        <input class="sentence-input" id="wordTypeInput" type="text" autocomplete="off" autocapitalize="off" spellcheck="false"
          placeholder="Type the Korean word" value="${escapeHtml(view.typedValue || "")}" ${view.answered ? "disabled" : ""} lang="ko" />
        ${view.typeHelperVisible || view.answered ? `
          <div class="fs-xs text-muted-2" style="margin:8px 0 4px;">Syllable help is open; this answer counts as aided.</div>
          <div class="word-tile-row">
            ${tiles.map((tile) => `<button class="word-tile" type="button" data-word-tile="${escapeHtml(tile)}" lang="ko" ${view.answered ? "disabled" : ""}>${escapeHtml(tile)}</button>`).join("")}
            <button class="word-tile word-tile-erase" type="button" data-word-tile-erase aria-label="Delete last block" ${view.answered ? "disabled" : ""}>⌫</button>
          </div>` : '<button class="button secondary compact word-helper-button" type="button" data-word-show-tiles>Need help? Show syllable bank</button>'}
      </div>
      ${view.answered ? "" : `<div class="word-card-actions"><button class="button primary compact" type="button" data-word-check-typed>Check</button></div>`}
    `;
  } else {
    interactionHtml = `
      <div class="quiz-options word-checkpoint-options">
        ${(question.options || []).map((option) => {
          const classes = ["option"];
          if (view.answered) {
            if (option === question.answer) classes.push("correct");
            else if (option === view.selectedChoice) classes.push("wrong");
          }
          return `<button class="${classes.join(" ")}" type="button" data-word-choice="${escapeHtml(option)}" ${view.answered ? "disabled" : ""} ${textLanguageAttr(option)}>${escapeHtml(option)}</button>`;
        }).join("")}
      </div>
    `;
  }

  return `
    <div class="card word-card">
      <div class="eyebrow">${eyebrow}</div>
      <div class="fs-xs text-muted-2" style="margin-bottom:8px;">${escapeHtml(progress)}</div>
      <div class="quiz-visual">${visualHtml}</div>
      <div class="quiz-prompt">${escapeHtml(question.prompt)}</div>
      <div class="quiz-detail">${escapeHtml(question.detail || "")}</div>
      ${question.voiceText && (view.answered || String(question.direction || "").startsWith("audio")) ? `<div class="word-card-actions"><button class="button secondary compact" type="button" data-speak="${escapeHtml(question.voiceText)}">▶ Hear</button></div>` : ""}
      ${!view.isReview && view.answered ? '<div class="word-card-actions"><button class="button secondary compact" type="button" data-word-review-study>Review words</button></div>' : ""}
      ${interactionHtml}
      <div class="${feedbackClasses.join(" ")}" role="status" aria-live="polite">${view.answered ? view.checkFeedback || "" : ""}</div>
      ${view.answered ? `<div class="word-card-actions"><button class="button primary compact" type="button" data-word-lesson-next>${view.questionIndex + 1 >= view.questions.length ? "See results →" : "Next question →"}</button></div>` : ""}
      ${view.answered ? wordReferenceButtonHtml() : ""}
    </div>
  `;
}

function getWordLessonResultStats(view) {
  const total = view.results.length;
  const firstTryCorrect = view.results.filter((r) => r.correct).length;
  const pct = total ? Math.round((firstTryCorrect / total) * 100) : 100;
  const typedTotal = Object.keys(view.typedAttempts).length;
  const typedCorrect = Object.values(view.typedAttempts).filter(Boolean).length;
  return { total, firstTryCorrect, pct, typedTotal, typedCorrect };
}

function completionIconSvg(icon = "check") {
  if (icon === "crown") {
    return `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M11 20l13 10 8-18 8 18 13-10-5 28H16z"/><path d="M17 52h30"/></svg>`;
  }
  if (icon === "spark") {
    return `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 8c2 13 9 20 22 22-13 2-20 9-22 22-2-13-9-20-22-22 13-2 20-9 22-22z"/><path d="M50 7v10M45 12h10"/></svg>`;
  }
  if (icon === "retry") {
    return `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M18 23a19 19 0 1 1-2 20"/><path d="M9 14v16h16"/></svg>`;
  }
  return `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 33l11 11 25-27"/></svg>`;
}

function completionConfettiHtml(enabled = true) {
  if (!enabled) return "";
  return `<div class="completion-confetti" aria-hidden="true">${Array.from({ length: 16 }, (_, index) => `<i style="--piece:${index}"></i>`).join("")}</div>`;
}

function premiumCompletionHtml({
  id = "",
  tone = "success",
  icon = "check",
  eyebrow = "Complete",
  title = "Beautiful work",
  copy = "",
  score = null,
  stats = [],
  detailsHtml = "",
  actionsHtml = "",
  className = "",
  celebrate = tone === "success" || tone === "crown",
} = {}) {
  const safeTone = ["success", "crown", "neutral", "retry"].includes(tone) ? tone : "neutral";
  const statsHtml = stats.length
    ? `<div class="completion-stats">${stats.map((stat) => `
        <div class="completion-stat">
          <span class="completion-stat-value">${escapeHtml(String(stat.value ?? "—"))}</span>
          <span class="completion-stat-label">${escapeHtml(String(stat.label || ""))}</span>
        </div>`).join("")}</div>`
    : "";
  const scoreHtml = score
    ? `<div class="completion-score">
        <strong>${escapeHtml(String(score.value ?? ""))}</strong>
        <span>${escapeHtml(String(score.label || ""))}</span>
      </div>`
    : "";
  return `
    <section${id ? ` id="${escapeHtml(id)}"` : ""} class="completion-stage completion-stage--${safeTone} ${className}" data-lesson-motion-root>
      <div class="completion-aurora" aria-hidden="true"><i></i><i></i><i></i></div>
      ${completionConfettiHtml(celebrate)}
      <div class="completion-hero" role="status" aria-live="polite">
        <div class="completion-emblem" aria-hidden="true">
          <span class="completion-emblem-ring"></span>
          <span class="completion-emblem-ring completion-emblem-ring--outer"></span>
          <span class="completion-emblem-icon">${completionIconSvg(icon)}</span>
        </div>
        <div class="completion-kicker"><span></span>${escapeHtml(String(eyebrow))}<span></span></div>
        <h2 class="completion-title">${escapeHtml(String(title))}</h2>
        ${copy ? `<p class="completion-copy">${escapeHtml(String(copy))}</p>` : ""}
      </div>
      ${scoreHtml}
      ${statsHtml}
      ${detailsHtml ? `<div class="completion-details">${detailsHtml}</div>` : ""}
      ${actionsHtml ? `<div class="completion-actions">${actionsHtml}</div>` : ""}
    </section>`;
}

function wordLessonResultHtml(lesson, view) {
  const stats = getWordLessonResultStats(view);
  if (view.isReview) {
    return premiumCompletionHtml({
      tone: "neutral",
      icon: "spark",
      eyebrow: "Review complete",
      title: "Nice work",
      copy: "Missed words return in five minutes. Correct words moved further out.",
      score: { value: `${stats.pct}%`, label: "First-try accuracy" },
      stats: [
        { value: stats.total, label: "Reviewed" },
        { value: stats.firstTryCorrect, label: "Correct" },
        { value: stats.total - stats.firstTryCorrect, label: "To revisit" },
        { value: getVocabDueCount(), label: "Still due" },
      ],
      actionsHtml: `
        <button class="button primary compact" type="button" data-word-lesson-done>Back to Words</button>
        <button class="button secondary compact" type="button" data-word-open-reference>📚 Open Word Bank</button>`,
      className: "word-card",
    });
  }

  const passed = wordLessonPassed(lesson, view);
  const nextLesson = getNextWordLesson();
  const isCheckpoint = lesson.type === "checkpoint";
  const resultEyebrow = isCheckpoint && passed ? "Checkpoint complete" : `${lesson.title} ${passed ? "complete" : "— almost"}`;
  const resultTitle = isCheckpoint && passed ? "Unit crowned" : passed ? "Lesson complete" : isCheckpoint ? "Checkpoint not passed yet" : "Good try — review and retry";
  const resultCopy = passed
    ? isCheckpoint
      ? "You cleared this unit checkpoint. The next unit is ready when you are."
      : "All of these words are now in your spaced review queue. They'll come back at the right time."
    : `You need ${lesson.pass?.minFirstTryPct ?? 75}% on first tries to pass. The words are saved — review them and retry.`;
  return premiumCompletionHtml({
    tone: passed ? (isCheckpoint ? "crown" : "success") : "retry",
    icon: passed ? (isCheckpoint ? "crown" : "check") : "retry",
    eyebrow: resultEyebrow,
    title: resultTitle,
    copy: resultCopy,
    score: { value: `${stats.pct}%`, label: "First-try accuracy" },
    stats: [
      { value: view.words.length, label: lesson.type === "checkpoint" ? "Review words" : "New words" },
      { value: `${stats.typedCorrect}/${Math.max(stats.typedTotal, view.words.length)}`, label: "Typed" },
      { value: getVocabDueCount(), label: "Due for review" },
    ],
    actionsHtml: `
      ${passed && nextLesson ? `<button class="button primary compact" type="button" data-word-lesson-open="${escapeHtml(nextLesson.id)}">Next lesson: ${escapeHtml(nextLesson.title)} →</button>` : ""}
      ${!passed ? `<button class="button primary compact" type="button" data-word-lesson-open="${escapeHtml(lesson.id)}">Retry lesson</button>` : ""}
      <button class="button secondary compact" type="button" data-word-lesson-done>Back to Words</button>
      <button class="button secondary compact" type="button" data-word-open-reference>📚 Open Word Bank</button>`,
    className: `word-card ${isCheckpoint && passed ? "word-checkpoint-crowned" : ""}`,
    celebrate: passed,
  });
}

function wordLessonPassed(lesson, view) {
  const stats = getWordLessonResultStats(view);
  const minPct = lesson.pass?.minFirstTryPct ?? 75;
  if (stats.pct < minPct) return false;
  if (lesson.pass?.requireTypedAttempt) {
    return view.words.every((word) => word.id in view.typedAttempts);
  }
  return true;
}

function finishWordLesson(lesson, view) {
  if (view.resultSaved) return;
  view.resultSaved = true;
  state.vocabLessonSession = null;
  if (view.isReview) { saveState(); return; }
  // Make sure every new word has an SRS record so it shows up in review.
  view.words.forEach((word) => {
    const record = getVocabSrsRecord(word.id, true);
    if (record.seen === 0) {
      record.seen = 1;
      record.due = Date.now() + VOCAB_SRS_INTERVALS[0];
    }
  });
  if (wordLessonPassed(lesson, view)) {
    if (!state.vocabLessonCompleted.includes(lesson.id)) state.vocabLessonCompleted.push(lesson.id);
    state.vocabLessonActive = null;
  }
  wordBankStatusVersion += 1;
  saveState();
}

function advanceWordLessonStudy(view) {
  const step = getWordLessonStep(view);
  if (step && step.type === "type" && !view.typedDone && !view.reviewingCheckpoint) {
    // "Next" on an unchecked type card counts as an attempt (skipped).
    if (!(step.wordId in view.typedAttempts)) {
      view.typedAttempts[step.wordId] = false;
      recordVocabAttempt(step.wordId, "typeKo", false, {
        result: "skipped",
        latencyMs: getWordLessonStudyLatencyMs(view),
        source: "lesson",
        lessonId: view.lessonId || null,
      });
      saveState();
    }
  }
  if (!view.reviewingCheckpoint) {
    view.typedValue = "";
    view.typedFeedback = "";
    view.typedDone = false;
  }
  view.typeTiles = null;
  view.typeTilesWordId = null;
  view.typeHelperVisible = false;
  view.questionHelperUsed = false;
  if (view.stepIndex + 1 < view.steps.length) {
    view.stepIndex += 1;
    startWordLessonStudyTimer(view);
  } else if (view.reviewingCheckpoint) {
    returnToWordLessonCheckpoint(view);
    return;
  } else if (view.questions.length) {
    view.mode = "check";
    view.questionIndex = 0;
    view.answered = false;
    view.selectedChoice = "";
    view.checkCorrect = null;
    startWordLessonQuestionTimer(view);
  } else {
    view.mode = "result";
    finishWordLesson(getWordLessonById(view.lessonId), view);
  }
  persistWordLessonSession(view);
  renderWordLesson();
}

function advanceWordLessonCheck(view) {
  view.typedValue = "";
  view.typedFeedback = "";
  view.answered = false;
  view.selectedChoice = "";
  view.checkCorrect = null;
  view.checkFeedback = "";
  view.typeTiles = null;
  view.typeTilesWordId = null;
  view.typeHelperVisible = false;
  view.questionHelperUsed = false;
  if (view.questionIndex + 1 < view.questions.length) {
    view.questionIndex += 1;
    startWordLessonQuestionTimer(view);
  } else {
    view.mode = "result";
    finishWordLesson(view.isReview ? null : getWordLessonById(view.lessonId), view);
  }
  persistWordLessonSession(view);
  renderWordLesson();
}

function returnToWordLessonCheckpoint(view) {
  view.mode = "check";
  view.reviewingCheckpoint = false;
  if (Object.prototype.hasOwnProperty.call(view, "checkpointTypedValue")) {
    view.typedValue = view.checkpointTypedValue || "";
    delete view.checkpointTypedValue;
  }
  view.typedFeedback = "";
  view.typedDone = false;
  view.typeTiles = null;
  view.typeTilesWordId = null;
  persistWordLessonSession(view);
  renderWordLesson();
}

function answerWordLessonChoice(view, choice) {
  const question = getWordLessonQuestion(view);
  if (!question || view.answered) return;
  const feedbackSpeech = HANGUL_TEXT_PATTERN.test(String(choice || ""))
    ? speakableForClickableText(choice)
    : question.voiceText;
  const isCorrect = choice === question.answer;
  view.answered = true;
  view.selectedChoice = choice;
  view.checkCorrect = isCorrect;
  view.results.push({ wordId: question.wordId, direction: question.direction, correct: isCorrect });
  view.checkFeedback = isCorrect
    ? `<strong>Correct.</strong> ${escapeHtml(question.explanation)}`
    : `<strong>Not quite.</strong> The answer is <strong lang="ko">${escapeHtml(question.answer)}</strong>. ${escapeHtml(question.explanation)}`;
  recordVocabAttempt(question.wordId, question.direction, isCorrect, {
    latencyMs: getWordLessonQuestionLatencyMs(view),
    source: view.isReview ? "review" : "lesson",
    lessonId: view.lessonId || null,
    result: isCorrect ? "correct" : "incorrect",
  });
  persistWordLessonSession(view);
  if (isCorrect) showCorrectToast();
  renderWordLesson();
  if (feedbackSpeech) scheduleAutoSpeak(feedbackSpeech, 120);
}

function answerWordLessonTyped(view) {
  const question = getWordLessonQuestion(view);
  if (!question || view.answered) return;
  const word = curatedWordsById.get(question.wordId);
  const typed = String(view.typedValue || "").trim();
  if (!typed) {
    view.checkFeedback = "";
    showRetryToast("Type the word first — or tap the blocks.");
    return;
  }
  const isCorrect = isWordTypedCorrect(typed, word);
  const firstTryCorrect = Boolean(isCorrect && !view.questionHelperUsed);
  view.answered = true;
  view.checkCorrect = isCorrect;
  view.results.push({ wordId: question.wordId, direction: question.direction, correct: firstTryCorrect, aided: Boolean(view.questionHelperUsed) });
  view.typedAttempts[question.wordId] = isCorrect;
  view.checkFeedback = isCorrect
    ? `<strong>Correct.</strong> ${escapeHtml(question.explanation)}`
    : `<strong>Not quite.</strong> You typed <strong lang="ko">${escapeHtml(typed)}</strong>. The answer is <strong lang="ko">${escapeHtml(question.answer)}</strong>. ${escapeHtml(question.explanation)}`;
  recordVocabAttempt(question.wordId, "typeKo", isCorrect, {
    latencyMs: getWordLessonQuestionLatencyMs(view),
    source: view.isReview ? "review" : "lesson",
    lessonId: view.lessonId || null,
    result: isCorrect ? (view.questionHelperUsed ? "aided" : "correct") : "incorrect",
  });
  persistWordLessonSession(view);
  if (isCorrect) showCorrectToast();
  renderWordLesson();
}

function checkWordLessonStudyTyped(view) {
  const step = getWordLessonStep(view);
  if (!step || step.type !== "type" || view.typedDone) return;
  const word = curatedWordsById.get(step.wordId);
  const typed = String(view.typedValue || "").trim();
  if (!typed) {
    showRetryToast("Type the word first — or tap the blocks.");
    return;
  }
  const isCorrect = isWordTypedCorrect(typed, word);
  view.typedAttempts[step.wordId] = isCorrect || Boolean(view.typedAttempts[step.wordId]);
  recordVocabAttempt(word.id, "typeKo", isCorrect, {
    latencyMs: getWordLessonStudyLatencyMs(view),
    source: "lesson",
    lessonId: view.lessonId || null,
    result: isCorrect ? "correct" : "incorrect",
  });
  persistWordLessonSession(view);
  if (isCorrect) {
    view.typedDone = true;
    view.typedFeedback = `<strong>Correct.</strong> <span lang="ko">${escapeHtml(getWordTypeTarget(word))}</span> — ${escapeHtml(word.meaningShort)}.`;
    showCorrectToast();
  } else {
    view.typeHelperVisible = true;
    view.typedFeedback = `<strong>Not yet.</strong> You typed <strong lang="ko">${escapeHtml(typed)}</strong>. Target: <strong lang="ko">${escapeHtml(getWordTypeTarget(word))}</strong>. Try again or tap the blocks.`;
  }
  persistWordLessonSession(view);
  renderWordLesson();
}

function bindWordLessonRoot(root) {
  if (!root) return;
  const view = wordLessonView;
  if (!view) return;

  root.addEventListener("click", (event) => {
    const openRef = event.target.closest("[data-word-open-reference]");
    if (openRef) { openWordBankQuickRef(); return; }

    const exampleBtn = event.target.closest("[data-word-example-open]");
    if (exampleBtn) {
      const step = view.mode === "study" ? getWordLessonStep(view) : null;
      const word = step ? curatedWordsById.get(step.wordId) : null;
      if (word) openWordExampleOverlay(word);
      return;
    }

    const speakBtn = event.target.closest("[data-speak]");
    if (speakBtn && root.contains(speakBtn)) {
      flashElement(speakBtn);
      void speak(speakBtn.dataset.speak || "");
      return;
    }

    if (event.target.closest("[data-word-lesson-start]")) {
      view.mode = view.steps.length ? "study" : "check";
      view.stepIndex = 0;
      if (view.mode === "study") startWordLessonStudyTimer(view);
      else startWordLessonQuestionTimer(view);
      persistWordLessonSession(view);
      renderWordLesson();
      return;
    }
    if (event.target.closest("[data-word-lesson-next]")) {
      stopSpeech();
      if (view.mode === "study") advanceWordLessonStudy(view);
      else if (view.mode === "check") advanceWordLessonCheck(view);
      return;
    }
    const rateBtn = event.target.closest("[data-word-lesson-rate]");
    if (rateBtn && view.mode === "study" && view.typedDone) {
      const step = getWordLessonStep(view);
      const word = step ? curatedWordsById.get(step.wordId) : null;
      if (!word || rateBtn.disabled) return;
      root.querySelectorAll("[data-word-lesson-rate]").forEach((button) => { button.disabled = true; });
      rateBtn.classList.add("is-selected");
      setCuratedWordStatus(word.id, rateBtn.dataset.wordLessonRate);
      window.setTimeout(() => {
        if (wordLessonView === view) advanceWordLessonStudy(view);
      }, 520);
      return;
    }
    if (event.target.closest("[data-word-review-study]")) {
      if (view.mode === "check" && !view.isReview) {
        view.reviewingCheckpoint = true;
        view.checkpointTypedValue = view.typedValue || "";
        view.mode = "study";
        view.stepIndex = 0;
        view.typedFeedback = "";
        view.typedDone = false;
        view.typeTiles = null;
        view.typeTilesWordId = null;
        startWordLessonStudyTimer(view);
        persistWordLessonSession(view);
        renderWordLesson();
      }
      return;
    }
    if (event.target.closest("[data-word-return-checkpoint]")) {
      if (view.reviewingCheckpoint) returnToWordLessonCheckpoint(view);
      return;
    }
    if (event.target.closest("[data-word-lesson-back]")) {
      if (view.mode === "study" && view.stepIndex > 0) {
        view.stepIndex -= 1;
        view.typedValue = "";
        view.typedFeedback = "";
        view.typedDone = false;
        view.typeTiles = null;
        view.typeTilesWordId = null;
        startWordLessonStudyTimer(view);
        persistWordLessonSession(view);
        renderWordLesson();
      }
      return;
    }
    const hardBtn = event.target.closest("[data-word-lesson-hard]");
    if (hardBtn) {
      const record = getVocabSrsRecord(hardBtn.dataset.wordLessonHard);
      setCuratedWordStatus(hardBtn.dataset.wordLessonHard, record?.isHard ? "clear" : "hard");
      renderWordLesson();
      return;
    }
    const knownBtn = event.target.closest("[data-word-lesson-known]");
    if (knownBtn) {
      const record = getVocabSrsRecord(knownBtn.dataset.wordLessonKnown);
      setCuratedWordStatus(knownBtn.dataset.wordLessonKnown, record?.isKnown ? "clear" : "known");
      renderWordLesson();
      return;
    }
    if (event.target.closest("[data-word-show-tiles]")) {
      view.typeHelperVisible = true;
      if (view.mode === "check") view.questionHelperUsed = true;
      persistWordLessonSession(view);
      renderWordLesson();
      return;
    }
    const tileBtn = event.target.closest("[data-word-tile]");
    if (tileBtn && !tileBtn.disabled) {
      const tileText = tileBtn.dataset.wordTile || "";
      speakClickableText(tileText);
      view.typedValue = String(view.typedValue || "") + tileText;
      const input = root.querySelector("#wordTypeInput");
      if (input) input.value = view.typedValue;
      persistWordLessonSession(view);
      return;
    }
    if (event.target.closest("[data-word-tile-erase]")) {
      view.typedValue = Array.from(String(view.typedValue || "")).slice(0, -1).join("");
      const input = root.querySelector("#wordTypeInput");
      if (input) input.value = view.typedValue;
      persistWordLessonSession(view);
      return;
    }
    if (event.target.closest("[data-word-type-check]")) { checkWordLessonStudyTyped(view); return; }
    if (event.target.closest("[data-word-check-typed]")) { answerWordLessonTyped(view); return; }
    const choiceBtn = event.target.closest("[data-word-choice]");
    if (choiceBtn && !choiceBtn.disabled) {
      answerWordLessonChoice(view, choiceBtn.dataset.wordChoice || "");
      return;
    }
    const openLessonBtn = event.target.closest("[data-word-lesson-open]");
    if (openLessonBtn) { openWordLesson(openLessonBtn.dataset.wordLessonOpen); return; }
    if (event.target.closest("[data-word-lesson-done]")) {
      queueScreenMotion("back", -1);
      stopSpeech();
      openWordsHome();
    }
  });

  const input = root.querySelector("#wordTypeInput");
  if (input) {
    input.addEventListener("input", () => { view.typedValue = input.value; persistWordLessonSession(view); });
    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      if (view.mode === "study") checkWordLessonStudyTyped(view);
      else answerWordLessonTyped(view);
    });
  }
}

// ── Entire Korean Word Bank ──────────────────────────────────────────────────

function getWordBankCacheKey() {
  return [
    normalizeWordSearch(state.wordBankQuery),
    state.wordBankFilter,
    state.wordBankSort,
    vocabBank.length,
    supplementaryBank.length,
    getCuratedWords().length,
    (state.vocabKnownRanks || []).length,
    (state.vocabHardRanks || []).length,
    wordBankStatusVersion,
  ].join("|");
}

function applyWordBankFilter(rows, filter, knownSet, hardSet, now) {
  if (filter === "all") return rows;
  if (filter === "curated") return rows.filter((row) => row.word);
  if (filter === "core") return rows.filter((row) => row.word && (row.word.priority || "core") === "core");
  if (filter === "function") return rows.filter((row) => row.word && row.word.isFunctionWord);
  if (filter === "needsCuration") return rows.filter((row) => row.word && wordNeedsAnnotationCuration(row.word));
  if (filter === "noun") return rows.filter((row) => row.pos === "noun");
  if (filter === "verb") return rows.filter((row) => row.pos === "verb");
  if (filter === "adjective") return rows.filter((row) => row.pos === "adjective");
  if (filter === "phrase") return rows.filter((row) => row.word && row.word.isPhrase);
  if (filter === "raw") return rows.filter((row) => row.source === "raw");
  if (filter === "supplementary") return rows.filter((row) => row.source === "supplementary");
  if (filter === "known") return rows.filter((row) => getWordRowStatus(row, knownSet, hardSet, now) === "known");
  if (filter === "hard") return rows.filter((row) => getWordRowStatus(row, knownSet, hardSet, now) === "hard");
  if (filter === "due") return rows.filter((row) => isWordRowDue(row, now));
  return rows;
}

function getWordBankFilterCounts(knownSet, hardSet, now) {
  const counts = {};
  for (const filter of WORD_BANK_FILTERS) {
    counts[filter.id] = applyWordBankFilter(wordReferenceRows, filter.id, knownSet, hardSet, now).length;
  }
  return counts;
}

function sortWordBankRows(rows, sort, knownSet, hardSet, now) {
  const sorted = [...rows];
  if (sort === "frequency") {
    sorted.sort((a, b) => (a.rank ?? Number.MAX_SAFE_INTEGER) - (b.rank ?? Number.MAX_SAFE_INTEGER) || a.curriculumIndex - b.curriculumIndex);
  } else if (sort === "hangul") {
    sorted.sort((a, b) => a.korean.localeCompare(b.korean, "ko"));
  } else if (sort === "status") {
    const order = { hard: 0, due: 1, learning: 2, fresh: 3, known: 4 };
    sorted.sort((a, b) => {
      const sa = order[getWordRowStatus(a, knownSet, hardSet, now)] ?? 3;
      const sb = order[getWordRowStatus(b, knownSet, hardSet, now)] ?? 3;
      return sa - sb || a.curriculumIndex - b.curriculumIndex || (a.rank ?? 0) - (b.rank ?? 0);
    });
  } else if (sort === "curation") {
    sorted.sort((a, b) => {
      const debtA = getWordCurationDebtScore(a.word);
      const debtB = getWordCurationDebtScore(b.word);
      return debtB - debtA || a.curriculumIndex - b.curriculumIndex || (a.rank ?? Number.MAX_SAFE_INTEGER) - (b.rank ?? Number.MAX_SAFE_INTEGER);
    });
  } else {
    sorted.sort((a, b) => a.curriculumIndex - b.curriculumIndex || (a.rank ?? Number.MAX_SAFE_INTEGER) - (b.rank ?? Number.MAX_SAFE_INTEGER));
  }
  return sorted;
}

function getFilteredWordBankRows() {
  const key = getWordBankCacheKey();
  if (wordReferenceFilteredCache && wordReferenceCacheKey === key) return wordReferenceFilteredCache;

  const knownSet = getVocabKnownSet();
  const hardSet = getVocabHardSet();
  const now = Date.now();
  let rows = wordReferenceRows;
  const query = normalizeWordSearch(state.wordBankQuery);
  if (query) rows = rows.filter((row) => row._search.includes(query));
  rows = applyWordBankFilter(rows, state.wordBankFilter, knownSet, hardSet, now);
  rows = sortWordBankRows(rows, state.wordBankSort, knownSet, hardSet, now);

  wordReferenceCacheKey = key;
  wordReferenceFilteredCache = rows;
  return rows;
}

function wordBankStatusPill(status) {
  if (status === "known") return `<span class="vocab-status known">Known</span>`;
  if (status === "hard") return `<span class="vocab-status hard">Hard</span>`;
  if (status === "due") return `<span class="vocab-status due">Due</span>`;
  if (status === "learning") return `<span class="vocab-status learning">Learning</span>`;
  return "";
}

function wordBankRowHtml(row, knownSet, hardSet, now) {
  const status = getWordRowStatus(row, knownSet, hardSet, now);
  const sub = row.word
    ? escapeHtml(row.meaning)
    : row.meaning
      ? `${escapeHtml(row.meaning)} <span class="word-bank-refonly">· no example yet</span>`
      : `${escapeHtml(row.pronunciation || "")} <span class="word-bank-refonly">· ${row.source === "supplementary" ? "supplementary" : "reference only"}</span>`;
  const metaParts = [];
  if (row.pos) metaParts.push(escapeHtml(row.pos));
  if (row.word && row.pronunciation) metaParts.push(escapeHtml(row.pronunciation));
  if (Number.isInteger(row.rank)) metaParts.push(`#${row.rank}`);
  if (row.frequencyBand) metaParts.push(escapeHtml(row.frequencyBand));
  if (row.lessonTitle) metaParts.push(escapeHtml(row.lessonTitle));
  const example = row.word && row.exampleKo
    ? `<div class="vocab-row-meta word-bank-example" lang="ko">${escapeHtml(row.exampleKo)}</div>`
    : "";
  return `
    <div class="vocab-row word-bank-row" role="button" tabindex="0" data-word-open="${escapeHtml(row.id)}">
      <div class="vocab-row-main">
        <div class="vocab-row-ko" lang="ko">
          ${escapeHtml(row.display)}
          ${row.word && row.word.senseNo ? `<span class="vocab-sense-badge" style="background:var(--accent-bg); color:var(--accent-text); font-size:0.7rem; padding:1px 4px; border-radius:3px; margin-left:6px; display:inline-block; vertical-align:middle;">Sense ${row.word.senseNo}</span>` : ""}
          ${wordBankStatusPill(status)}
        </div>
        <div class="vocab-row-rom">${sub}</div>
        <div class="vocab-row-meta">${metaParts.join(" · ")}</div>
        ${example}
      </div>
      ${hearIconButton(row.word ? (row.word.voiceText || row.korean) : row.korean, "data-word-hear")}
    </div>
  `;
}

function wordBankListHtml() {
  if (!wordReferenceReady || !vocabBankReady) {
    return `<div class="screen-sub" style="margin-bottom:0;">Loading the word bank…</div>`;
  }
  const rows = getFilteredWordBankRows();
  const pageSize = state.wordBankPageSize || WORD_BANK_PAGE_SIZE;
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const page = Math.min(Math.max(state.wordBankPage || 0, 0), pageCount - 1);
  state.wordBankPage = page;
  const start = page * pageSize;
  const pageRows = rows.slice(start, start + pageSize);
  const knownSet = getVocabKnownSet();
  const hardSet = getVocabHardSet();
  const now = Date.now();

  const listHtml = pageRows.length
    ? pageRows.map((row) => wordBankRowHtml(row, knownSet, hardSet, now)).join("")
    : `<div class="screen-sub" style="margin:12px 0;">No words matched. Try a different search or filter.</div>`;

  return `
    <div class="vocab-summary">Showing ${rows.length ? start + 1 : 0}–${Math.min(start + pageSize, rows.length)} of ${rows.length}</div>
    <div class="vocab-pagebar">
      <button class="button secondary compact" type="button" data-word-page="prev" ${page <= 0 ? "disabled" : ""}>Prev</button>
      <span class="vocab-pageinfo">Page ${page + 1} of ${pageCount}</span>
      <button class="button secondary compact" type="button" data-word-page="next" ${page >= pageCount - 1 ? "disabled" : ""}>Next</button>
    </div>
    <div class="vocab-list word-bank-list">${listHtml}</div>
  `;
}

// The alphabet section's per-syllable romanizer (romanizeHangulChunk) uses
// each batchim's neutralized-in-isolation sound, which is wrong once that
// batchim links into a following vowel (e.g. 집에 -> "jipe" instead of
// "jibe", 없어요 -> "eopeoyo" instead of "eopseoyo"). It's fine for the
// alphabet lessons' single-syllable hints but not for sentence liaison, so it
// is only used here as a last-resort, visibly-marked approximation when a
// curated examplePronunciation isn't available.
function approximateSentenceRomanization(text) {
  const source = String(text || "").normalize("NFC");
  const pattern = /[가-힣ㄱ-ㅎㅏ-ㅣ]+/g;
  let lastIndex = 0;
  let output = "";
  for (const match of source.matchAll(pattern)) {
    if (match.index > lastIndex) output += source.slice(lastIndex, match.index);
    output += romanizeHangulChunk(match[0], source, match.index);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < source.length) output += source.slice(lastIndex);
  return output.replace(/[.!?…]+$/, "").replace(/\s+/g, " ").trim();
}

// Sentence romanization for a word's example: prefer a hand-verified
// examplePronunciation; only fall back to the approximate per-syllable
// romanizer when nothing curated exists, and mark it as approximate so it's
// never shown with the same confidence as a checked value.
function getWordExampleRomanization(word) {
  const curated = String(word.examplePronunciation || "").trim();
  if (curated) return { text: curated, approximate: false };
  const guess = approximateSentenceRomanization(word.exampleVoiceText || word.exampleKo || "");
  return { text: guess, approximate: true };
}

function getWordPronunciationLayerText(word) {
  if (!word) return "";
  const spelling = word.display || word.korean || "";
  const soundsLike = word.soundsLike || word.pronunciation || "";
  if (!spelling && !soundsLike) return "";
  if (!soundsLike || soundsLike === spelling) return `Spelling: ${spelling}`;
  return `Spelling: ${spelling} · Sounds-like: ${soundsLike}`;
}

function getWordAnnotationSource(word, key) {
  return word && word.annotationSource && word.annotationSource[key] ? word.annotationSource[key] : "";
}

function wordNeedsAnnotationCuration(word) {
  if (!word || !word.annotationSource) return true;
  return ["register", "speechLevel", "originType", "morphTag"].some((key) => getWordAnnotationSource(word, key) === "inferred");
}

function getWordCurationDebtScore(word) {
  if (!word || !word.annotationSource) return 99;
  return ["register", "speechLevel", "originType", "morphTag", "hanja"]
    .reduce((score, key) => score + (getWordAnnotationSource(word, key) === "inferred" ? 1 : 0), 0);
}

function wordAnnotationValueHtml(word, key, value) {
  const source = getWordAnnotationSource(word, key);
  const label = source === "inferred" ? "inferred" : source === "explicit" ? "verified" : "";
  return `${escapeHtml(value || "—")}${label ? `<span class="fs-xs text-muted-2"> (${label})</span>` : ""}`;
}

const WORD_HONORIFIC_ROLE_LABELS = {
  subject: "Subject honorific",
  listener: "Listener politeness",
  humble: "Humble speaker",
};

function wordHonorificRoleLabel(role) {
  return WORD_HONORIFIC_ROLE_LABELS[role] || "";
}

function wordContrastLabel(token, sourceWord = null) {
  const value = String(token || "").trim();
  if (!value) return "";
  const direct = curatedWordsById.get(value);
  const matches = direct ? [direct] : getCuratedWords().filter((word) =>
    word.id === value
    || word.korean === value
    || word.display === value
    || (Array.isArray(word.forms) && word.forms.includes(value)));
  const sourceKeys = sourceWord
    ? [sourceWord.id, sourceWord.korean, sourceWord.display].filter(Boolean)
    : [];
  const target = matches.find((word) =>
    Array.isArray(word.contrastWith)
    && word.contrastWith.some((contrast) => sourceKeys.includes(contrast)))
    || matches[0];
  if (!target) return value;
  const label = target.display || target.korean;
  const gloss = target.meaningShort || target.meaning;
  return `${label} (${gloss})`;
}

function wordHonorificContrastText(word) {
  if (!word || !Array.isArray(word.contrastWith) || !word.contrastWith.length) return "";
  return word.contrastWith.map((contrast) => wordContrastLabel(contrast, word)).filter(Boolean).join(" / ");
}

function wordHonorificMetaBoxesHtml(word) {
  const roleLabel = wordHonorificRoleLabel(word && word.honorificRole);
  if (!roleLabel) return "";
  const contrastText = wordHonorificContrastText(word);
  return `
    <div class="vocab-meta-box"><span>Honorific axis</span><strong>${escapeHtml(roleLabel)}</strong></div>
    ${contrastText ? `<div class="vocab-meta-box"><span>Contrast</span><strong>${escapeHtml(contrastText)}</strong></div>` : ""}
  `;
}

function wordHonorificCardHtml(word) {
  const roleLabel = wordHonorificRoleLabel(word && word.honorificRole);
  if (!roleLabel) return "";
  const contrastText = wordHonorificContrastText(word);
  return `
    <div class="word-honorific-strip">
      <span>${escapeHtml(roleLabel)}</span>
      ${contrastText ? `<strong>${escapeHtml(contrastText)}</strong>` : ""}
    </div>
  `;
}

function wordSrsStatusLabel(status) {
  if (status === "known") return "Known";
  if (status === "hard") return "Hard";
  if (status === "due") return "Due now";
  if (status === "learning") return "Learning";
  return "Fresh";
}

function wordSrsPanelHtml(row, status) {
  if (!row || !row.word) return "";
  const record = getVocabSrsRecord(row.id, false);
  const answerTotal = record ? (Number(record.correct) || 0) + (Number(record.missed) || 0) : 0;
  const seen = record ? Number(record.seen) || 0 : 0;
  const accuracy = answerTotal ? `${Math.round(((Number(record.correct) || 0) / answerTotal) * 100)}%` : "Not enough data";
  const dueLabel = record && seen > 0 ? formatVocabDueTime(record.due) : "Not scheduled";
  const boxLabel = record && seen > 0 ? `Box ${Math.max(1, (Number(record.box) || 0) + 1)}` : "New";
  const lastSeen = record && record.lastSeen ? formatVocabRelativeTime(record.lastSeen) : "No answers yet";
  const statusClass = status === "known" ? "green" : status === "hard" || status === "due" ? "accent" : "muted";
  return `
    <div class="word-srs-panel">
      <div class="word-srs-head">
        <span>Review timing</span>
        <strong class="pill ${statusClass}">${escapeHtml(wordSrsStatusLabel(status))}</strong>
      </div>
      <div class="word-srs-grid">
        <div><span>Next review</span><strong>${escapeHtml(dueLabel)}</strong></div>
        <div><span>Attempts</span><strong>${seen}</strong></div>
        <div><span>Accuracy</span><strong>${escapeHtml(accuracy)}</strong></div>
        <div><span>Schedule</span><strong>${escapeHtml(boxLabel)}</strong></div>
      </div>
      <div class="word-srs-foot">Last answer: ${escapeHtml(lastSeen)}</div>
    </div>
  `;
}

function getWordRecentReviewEvents(wordId, limit = 4) {
  if (!wordId) return [];
  return getVocabReviewEvents()
    .filter((event) => event && event.wordId === wordId)
    .sort((a, b) => Number(b.at || 0) - Number(a.at || 0))
    .slice(0, limit);
}

function vocabAttemptResultLabel(result) {
  if (result === "correct") return "Correct";
  if (result === "skipped") return "Skipped";
  return "Missed";
}

function vocabAttemptResultClass(result) {
  if (result === "correct") return "green";
  if (result === "skipped") return "muted";
  return "accent";
}

function vocabAttemptDirectionLabel(direction) {
  const labels = {
    koToMeaning: "Korean to meaning",
    meaningToKo: "Meaning to Korean",
    audioToMeaning: "Audio to meaning",
    audioToKo: "Audio to Korean",
    typeKo: "Typed Korean",
    context: "Context",
    functionUsage: "Function word",
    formRecognition: "Form recognition",
    formProduction: "Form production",
  };
  return labels[direction] || direction || "Review";
}

function vocabAttemptSourceLabel(event) {
  const source = String(event?.source || "quiz").toLowerCase();
  const sourceLabel = source === "lesson" ? "Lesson" : source === "review" ? "Review" : "Quiz";
  if (event?.lessonId) {
    const lesson = getWordLessonById(event.lessonId);
    return lesson?.title ? `${sourceLabel}: ${lesson.title}` : `${sourceLabel}: ${event.lessonId}`;
  }
  return sourceLabel;
}

function wordAttemptTrailHtml(row) {
  if (!row || !row.word) return "";
  const events = getWordRecentReviewEvents(row.id, 4);
  const rows = events.length
    ? events.map((event) => {
      const resultLabel = vocabAttemptResultLabel(event.result);
      const resultClass = vocabAttemptResultClass(event.result);
      const meta = [
        vocabAttemptDirectionLabel(event.direction),
        vocabAttemptSourceLabel(event),
        formatVocabLatencyMs(event.latencyMs),
        `conf ${formatVocabRatio(event.confidence)}`,
      ].filter(Boolean).join(" / ");
      return `
        <div class="word-attempt-row">
          <div class="word-attempt-top">
            <strong class="pill ${resultClass}">${escapeHtml(resultLabel)}</strong>
            <span>${formatVocabRelativeTime(event.at)}</span>
          </div>
          <div class="word-attempt-meta">${escapeHtml(meta)}</div>
          ${event.errorType ? `<div class="word-attempt-meta">Error type: ${escapeHtml(event.errorType)}</div>` : ""}
        </div>
      `;
    }).join("")
    : `
      <div class="word-attempt-empty">
        No graded attempts yet. Answer this word in a lesson, review, or quiz to build a trail.
      </div>
    `;
  return `
    <div class="word-attempt-trail">
      <div class="word-attempt-head">
        <span>Recent attempts</span>
        <strong class="pill muted">${events.length}</strong>
      </div>
      <div class="word-attempt-list">${rows}</div>
    </div>
  `;
}

function wordDetailNoteHtml(label, body, extraClass = "") {
  if (!body) return "";
  return `
    <div class="word-form-note ${extraClass}">
      <div class="word-form-note-label">${escapeHtml(label)}</div>
      <div>${escapeHtml(body)}</div>
    </div>
  `;
}

function wordBankDetailHtml(row) {
  const knownSet = getVocabKnownSet();
  const hardSet = getVocabHardSet();
  const status = getWordRowStatus(row, knownSet, hardSet, Date.now());
  const statusLabel = status === "fresh" ? "Not studied yet" : status.charAt(0).toUpperCase() + status.slice(1);

  if (!row.word) {
    const hasMeaning = Boolean(row.meaning);
    return `
      <div class="card word-bank-detail">
        <button class="button secondary compact" type="button" data-word-detail-back>‹ Back to list</button>
        <div class="word-card-ko-static" lang="ko">${escapeHtml(row.korean)}</div>
        ${hasMeaning ? `<div class="word-card-meaning">${escapeHtml(row.meaning)}</div>` : ""}
        <div class="vocab-meta-grid" style="margin-top:12px;">
          <div class="vocab-meta-box"><span>Romanization</span><strong>${escapeHtml(row.pronunciation || "—")}</strong></div>
          <div class="vocab-meta-box"><span>Frequency rank</span><strong>#${row.rank ?? "—"}</strong></div>
          <div class="vocab-meta-box"><span>Band</span><strong>${escapeHtml(row.frequencyBand || "—")}</strong></div>
          <div class="vocab-meta-box"><span>Status</span><strong>${escapeHtml(statusLabel)}</strong></div>
        </div>
        ${row.tokenNote ? `<div class="vocab-note">${escapeHtml(row.tokenNote)}</div>` : ""}
        <div class="word-refonly-note">${row.source === "supplementary"
          ? "Supplementary — this entry comes from the long-tail frequency list (beyond the core 5,000). It is searchable for reference but is not part of the learning course, and has no curated meaning yet. HanaPath won't guess at meanings."
          : hasMeaning
            ? "This entry comes from the raw 5,000 frequency list. The meaning above is real, but there is no curated example sentence, audio-checked pronunciation, or usage note yet."
            : "Reference only — this entry comes from the raw 5,000 frequency list and has no curated meaning yet. HanaPath won't guess at meanings."}</div>
        <div class="word-card-actions">
          <button class="button secondary compact" type="button" data-word-detail-hear="${escapeHtml(row.korean)}">▶ Hear</button>
          <button class="button ${status === "hard" ? "primary" : "secondary"} compact" type="button" data-word-detail-hard="${escapeHtml(row.id)}">${status === "hard" ? "Marked for later ✓" : "Mark for later"}</button>
        </div>
      </div>
    `;
  }

  const word = row.word;
  const otherSenses = getCuratedWords().filter((w) => w.lemma && w.lemma === word.lemma && w.id !== word.id);
  const otherSensesHtml = otherSenses.length > 0
    ? `<div style="margin-top:12px; padding-top:12px; border-top:1px dashed var(--border-color);">
         <span class="fs-xs text-muted-2" style="display:block; margin-bottom:6px;">Other senses of this word:</span>
         <div class="senses-buttons" style="display:flex; gap:6px; flex-wrap:wrap;">
           ${otherSenses.map((oth) => `
             <button class="button secondary compact" type="button" data-word-open="${escapeHtml(oth.id)}">
               Sense ${oth.senseNo}: ${escapeHtml(oth.meaningShort || oth.meaning)}
             </button>
           `).join("")}
         </div>
       </div>`
    : "";

  const soundsLikeText = (() => {
    if (word.soundsLike) return word.soundsLike;
    if (word.korean.endsWith("다")) {
      const stem = word.korean.slice(0, -1);
      const last = stem.slice(-1);
      const dec = window.HANAPATH_INFLECT ? window.HANAPATH_INFLECT.decompose(last) : null;
      if (dec && dec.jong !== "") {
        return stem + "따";
      }
    }
    return word.korean;
  })();
  const pronunciationLayer = word.soundNote || getWordPronunciationLayerText(word);

  return `
    <div class="card word-bank-detail">
      <button class="button secondary compact" type="button" data-word-detail-back>‹ Back to list</button>
      <div class="word-card-ko-static" lang="ko">
        ${escapeHtml(row.display)}
        ${word.senseNo ? `<span class="vocab-sense-badge" style="background:var(--accent-bg); color:var(--accent-text); font-size:0.8rem; padding:2px 6px; border-radius:4px; margin-left:8px; display:inline-block; vertical-align:middle;">Sense ${word.senseNo}</span>` : ""}
      </div>
      <div class="word-card-meaning">${escapeHtml(word.meaning)}</div>
      <div style="font-size:0.85rem; margin:8px 0; color:var(--text-muted);">
        <span>Spelling: <strong lang="ko">${escapeHtml(word.display || word.korean)}</strong></span>
        <span style="margin-left:12px;">Pronunciation: <strong lang="ko" style="color:var(--accent-text);">[${escapeHtml(soundsLikeText)}]</strong></span>
      </div>
      <div class="word-card-meta">${escapeHtml(word.pos)} · ${escapeHtml(word.pronunciation)}${Number.isInteger(row.rank) ? ` · #${row.rank}` : ""}</div>
      ${Array.isArray(word.forms) && word.forms.length ? `<div class="word-card-forms">Forms: ${word.forms.map((f) => `<span lang="ko">${escapeHtml(f)}</span>`).join(" · ")}</div>` : ""}
      <div class="word-example">
        <div class="word-example-ko-static" lang="ko">${escapeHtml(word.exampleKo)}</div>
        ${(() => {
          const rom = getWordExampleRomanization(word);
          if (!rom.text) return "";
          return `<div class="word-example-rom${rom.approximate ? " is-approx" : ""}"${rom.approximate ? ' title="Approximate — not hand-checked"' : ""}>${rom.approximate ? "≈ " : ""}${escapeHtml(rom.text)}</div>`;
        })()}
        <div class="word-example-en">${escapeHtml(word.exampleEn)}</div>
      </div>
      ${word.usageNote ? `<div class="word-usage-note">${escapeHtml(word.usageNote)}</div>` : ""}
      ${wordDetailNoteHtml("Why it changed", word.formNote, "word-form-note-change")}
      ${wordDetailNoteHtml("Spelling vs sounds-like", pronunciationLayer, "word-form-note-sound")}
      <div class="vocab-meta-grid" style="margin-top:12px;">
        <div class="vocab-meta-box"><span>Lesson group</span><strong>${escapeHtml(word.lessonTitle || word.lessonGroup)}</strong></div>
        <div class="vocab-meta-box"><span>Register</span><strong>${wordAnnotationValueHtml(word, "register", word.register)}</strong></div>
        <div class="vocab-meta-box"><span>Speech level</span><strong>${wordAnnotationValueHtml(word, "speechLevel", word.speechLevel)}</strong></div>
        ${wordHonorificMetaBoxesHtml(word)}
        <div class="vocab-meta-box"><span>Origin</span><strong>${wordAnnotationValueHtml(word, "originType", word.originType)}</strong></div>
        <div class="vocab-meta-box"><span>Hanja</span><strong>${wordAnnotationValueHtml(word, "hanja", word.hanja)}</strong></div>
        <div class="vocab-meta-box"><span>Morph tag</span><strong>${wordAnnotationValueHtml(word, "morphTag", word.morphTag)}</strong></div>
        <div class="vocab-meta-box"><span>Status</span><strong>${escapeHtml(statusLabel)}</strong></div>
      </div>
      ${wordSrsPanelHtml(row, status)}
      ${wordAttemptTrailHtml(row)}
      <div class="word-card-actions">
        <button class="button secondary compact" type="button" data-word-detail-hear="${escapeHtml(word.voiceText || word.korean)}">▶ Hear word</button>
        <button class="button secondary compact" type="button" data-word-detail-hear="${escapeHtml(word.exampleVoiceText || word.exampleKo)}">▶ Hear example</button>
      </div>

      <div class="speaking-practice-area" data-speaking-target="${escapeHtml(word.voiceText || word.korean)}" data-speaking-label="${escapeHtml(word.display || word.korean)}" style="margin:12px 0; padding:12px; border:1px dashed var(--accent-text); border-radius:6px; background:rgba(128,128,128,0.05); text-align:center;">
        <button class="button secondary compact" type="button" onclick="handleSpeakingPractice(this)">
          🎤 Practice Speaking (Beta)
        </button>
        <div class="speaking-feedback" style="margin-top:8px; display:none; font-size:0.85rem;">
          <div class="speaking-wave" style="display:flex; justify-content:center; gap:4px; margin:8px 0;">
            <div style="width:4px; height:15px; background:var(--accent-text); border-radius:2px;"></div>
            <div style="width:4px; height:25px; background:var(--accent-text); border-radius:2px;"></div>
            <div style="width:4px; height:10px; background:var(--accent-text); border-radius:2px;"></div>
          </div>
          <div class="speaking-status">Listening...</div>
          <div class="speaking-results" style="display:none; font-size:0.85rem; text-align:left; border-top:1px solid var(--border-color); padding-top:8px; margin-top:8px;"></div>
        </div>
      </div>

      <div class="word-card-actions">
        <button class="button ${status === "known" ? "success" : "secondary"} compact" type="button" data-word-detail-known="${escapeHtml(row.id)}">${status === "known" ? "Known ✓" : "Mark known"}</button>
        <button class="button ${status === "hard" ? "primary" : "secondary"} compact" type="button" data-word-detail-hard="${escapeHtml(row.id)}">${status === "hard" ? "Hard ✓" : "Mark hard"}</button>
        <button class="button secondary compact" type="button" data-word-detail-review="${escapeHtml(row.id)}">Add to review</button>
      </div>
      ${otherSensesHtml}
    </div>
  `;
}

function renderWordBankContent() {
  const root = document.getElementById("wordBankRoot");
  if (!root) return;

  const isQuickRef = Boolean(state.wordQuickRefActive);
  const returnBtnHtml = isQuickRef
    ? `<div style="margin-bottom:4px;"><button class="button primary compact" type="button" data-word-bank-return>🔙 Return to ${wordLessonView && wordLessonView.isReview ? "review" : "lesson"}</button></div>`
    : "";

  const metricsReturnBtnHtml = wordBankReturnTarget ? wordBankReturnButtonHtml() : "";
  const activeReturnBtnHtml = metricsReturnBtnHtml || returnBtnHtml;

  if (wordBankDetailId) {
    const row = wordReferenceById.get(wordBankDetailId);
    if (row) {
      root.innerHTML = `${activeReturnBtnHtml}${wordBankDetailHtml(row)}`;
      return;
    }
    wordBankDetailId = null;
  }

  const curatedCount = getCuratedWords().length;
  const rawCount = vocabBank.length;
  const knownCount = getVocabKnownSet().size + getKnownCuratedWordCount();
  const dueCount = getVocabDueCount();

  const knownSet = getVocabKnownSet();
  const hardSet = getVocabHardSet();
  const now = Date.now();
  const filterCounts = getWordBankFilterCounts(knownSet, hardSet, now);
  const filterChips = WORD_BANK_FILTERS
    .map((f) => {
      const count = filterCounts[f.id] ?? 0;
      return `<button class="filter-chip word-bank-filter-chip ${state.wordBankFilter === f.id ? "active" : ""}" type="button" data-word-filter="${f.id}"><span>${f.label}</span><span class="word-bank-filter-count">${count.toLocaleString()}</span></button>`;
    })
    .join("");
  const sortChips = WORD_BANK_SORTS
    .map((s) => `<button class="filter-chip ${state.wordBankSort === s.id ? "active" : ""}" type="button" data-word-sort="${s.id}">${s.label}</button>`)
    .join("");

  root.innerHTML = `
    <div class="card">
      <div class="eyebrow">Reference · Word bank</div>
      <h2 class="screen-title" style="margin-bottom:8px;">Entire Korean Word Bank</h2>
      <div class="screen-sub" style="margin-bottom:12px;">Search every curated beginner word and the 5,000-word frequency list. Curated entries have meanings and examples; raw entries are reference only.</div>
      ${activeReturnBtnHtml}
      <div class="vocab-summary">${rawCount.toLocaleString()} raw · ${curatedCount} curated · ${knownCount} known · ${dueCount} due</div>
    </div>
    <div class="card vocab-panel word-bank-panel">
      <input class="vocab-search" id="wordBankSearch" type="search"
        placeholder="Search Korean, English, pronunciation, POS, lesson, rank…"
        value="${escapeHtml(state.wordBankQuery)}" aria-label="Search the word bank" />
      <div class="vocab-filters word-bank-filter-row">${filterChips}</div>
      <div class="vocab-filters word-bank-sort-row"><span class="fs-xs text-muted-2" style="align-self:center;">Sort:</span>${sortChips}</div>
      <div id="wordBankListArea">${wordBankListHtml()}</div>
    </div>
  `;
}

function renderWordBankListArea() {
  const area = document.getElementById("wordBankListArea");
  if (area) area.innerHTML = wordBankListHtml();
}

function handleWordBankClick(event) {
  if (event.target.closest("[data-word-bank-return]")) { returnFromWordBank(); return; }

  const hearBtn = event.target.closest("[data-word-hear]");
  if (hearBtn) {
    event.stopPropagation();
    void speak(hearBtn.dataset.wordHear || "");
    return;
  }
  const detailHear = event.target.closest("[data-word-detail-hear]");
  if (detailHear) { void speak(detailHear.dataset.wordDetailHear || ""); return; }

  const filterBtn = event.target.closest("[data-word-filter]");
  if (filterBtn) {
    state.wordBankFilter = filterBtn.dataset.wordFilter;
    state.wordBankPage = 0;
    saveState();
    renderWordBankContent();
    return;
  }
  const sortBtn = event.target.closest("[data-word-sort]");
  if (sortBtn) {
    state.wordBankSort = sortBtn.dataset.wordSort;
    state.wordBankPage = 0;
    saveState();
    renderWordBankContent();
    return;
  }
  const pageBtn = event.target.closest("[data-word-page]");
  if (pageBtn && !pageBtn.disabled) {
    state.wordBankPage = Math.max(0, (state.wordBankPage || 0) + (pageBtn.dataset.wordPage === "next" ? 1 : -1));
    saveState();
    renderWordBankListArea();
    return;
  }
  if (event.target.closest("[data-word-detail-back]")) {
    wordBankDetailId = null;
    renderWordBankContent();
    return;
  }
  const knownBtn = event.target.closest("[data-word-detail-known]");
  if (knownBtn) {
    const row = wordReferenceById.get(knownBtn.dataset.wordDetailKnown);
    if (row) {
      const status = getWordRowStatus(row, getVocabKnownSet(), getVocabHardSet(), Date.now());
      if (row.word) setCuratedWordStatus(row.id, status === "known" ? "clear" : "known");
      else if (Number.isInteger(row.rank)) { setVocabStatus(row.rank, status === "known" ? "clear" : "known"); wordBankStatusVersion += 1; }
      renderWordBankContent();
    }
    return;
  }
  const hardBtn = event.target.closest("[data-word-detail-hard]");
  if (hardBtn) {
    const row = wordReferenceById.get(hardBtn.dataset.wordDetailHard);
    if (row) {
      const status = getWordRowStatus(row, getVocabKnownSet(), getVocabHardSet(), Date.now());
      if (row.word) setCuratedWordStatus(row.id, status === "hard" ? "clear" : "hard");
      else if (Number.isInteger(row.rank)) { setVocabStatus(row.rank, status === "hard" ? "clear" : "hard"); wordBankStatusVersion += 1; }
      renderWordBankContent();
    }
    return;
  }
  const reviewBtn = event.target.closest("[data-word-detail-review]");
  if (reviewBtn) {
    const row = wordReferenceById.get(reviewBtn.dataset.wordDetailReview);
    if (row && row.word) {
      const record = getVocabSrsRecord(row.id, true);
      if (record.seen === 0) record.seen = 1;
      record.due = Math.min(record.due || Infinity, Date.now());
      record.isKnown = false;
      wordBankStatusVersion += 1;
      saveState();
      showCorrectToast("Added to review");
      renderWordBankContent();
    }
    return;
  }
  const openBtn = event.target.closest("[data-word-open]");
  if (openBtn) {
    wordBankDetailId = openBtn.dataset.wordOpen;
    renderWordBankContent();
  }
}

function openEntireWordBank(options = {}) {
  stopSpeech();
  currentQuizScope = "vocabulary";
  state.studio = "vocab";
  activeHub = "learn";
  setNavActive("learn");
  wordBankReturnTarget = options.returnTarget || null;
  wordBankDetailId = typeof options.detailId === "string" ? options.detailId : null;
  const el = showScreen("detail");
  if (!el) return;

  showDetailBarWithBack("learn", "Entire Korean Word Bank", () => {
    if (wordBankReturnTarget || state.wordQuickRefActive) { returnFromWordBank(); return; }
    openWordsHome();
  }, getWordBankReturnLabel() || "Words");

  el.innerHTML = `<div id="wordBankRoot"></div>`;
  const root = el.querySelector("#wordBankRoot");
  root.addEventListener("click", handleWordBankClick);
  root.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const row = event.target.closest("[data-word-open]");
    if (row) {
      event.preventDefault();
      wordBankDetailId = row.dataset.wordOpen;
      renderWordBankContent();
    }
  });
  root.addEventListener("input", (event) => {
    if (event.target && event.target.id === "wordBankSearch") {
      const value = event.target.value;
      window.clearTimeout(wordBankSearchTimer);
      wordBankSearchTimer = window.setTimeout(() => {
        state.wordBankQuery = value;
        state.wordBankPage = 0;
        saveState();
        // Only the list re-renders, so the search box keeps focus and cursor.
        renderWordBankListArea();
      }, 150);
    }
  });

  renderWordBankContent();
}

// Entry card used by the Words home and the vocabulary stage menu.
function wordBankEntryCardHtml() {
  return `
    <button class="card alpha-board-entry" type="button" id="openEntireWordBank">
      <div class="alpha-board-entry-main">
        <div class="eyebrow">Word bank</div>
        <div class="study-row-ko">Big list of Korean words</div>
        <div class="screen-sub" style="margin-bottom:0;">Thousands of Korean words in one searchable place - Korean, English, pronunciation, lesson group, and more.</div>
      </div>
      <span class="alpha-board-entry-glyphs" lang="ko" aria-hidden="true">단어</span>
    </button>`;
}

function bindWordBankEntryCard(el) {
  const btn = el.querySelector("#openEntireWordBank");
  if (btn) btn.addEventListener("click", () => openEntireWordBank());
}

function formatWordLessonCategoryLabel(category) {
  return String(category || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getWordLessonCategoryId(lesson) {
  const fallbackWordsById = curatedWordsById.size
    ? null
    : new Map(getCuratedWords().map((word) => [word.id, word]));
  const words = getWordLessonReviewWordIds(lesson)
    .map((id) => curatedWordsById.get(id) || fallbackWordsById?.get(id))
    .filter(Boolean);
  const group = words.find((word) => word.lessonGroup)?.lessonGroup;
  return String(group || lesson?.stage || "uncategorized").trim();
}

function getWordLessonCategoryOptions(lessons) {
  const seen = new Set();
  const options = [];
  lessons.forEach((lesson) => {
    const id = getWordLessonCategoryId(lesson);
    if (!id || seen.has(id)) return;
    seen.add(id);
    options.push({
      id,
      label: formatWordLessonCategoryLabel(id) || id,
    });
  });
  return options.sort((a, b) => a.label.localeCompare(b.label));
}

function getBasicWordLessons(lessons = getWordLessons()) {
  if (isWordCurriculumV2()) return lessons.filter((lesson) => lesson.type === "content" && getWordUnitById(lesson.unitId)?.sectionId === "s1");
  const basicIds = new Set([
    "w0-post-hangul-bridge-01",
    "w0-post-hangul-bridge-02",
    "w20-theme-01",
    "w20-theme-02",
    "w20-theme-03",
    "w20-theme-04",
    "w21-theme-05",
    "w21-theme-06",
  ]);
  return lessons.filter((lesson) => basicIds.has(lesson.id));
}

function wordLessonRowHtml(lesson, meta = getWordLessonPathMeta(lesson)) {
  const completed = meta.completed;
  const current = meta.current;
  const unlocked = meta.unlocked;
  const dotClass = completed ? "done" : current ? "next" : "lock";
  const pill = completed ? `<span class="pill green">Done</span>` : current ? `<span class="pill accent">Ready</span>` : `<span class="pill muted">Locked</span>`;
  const wordIds = getWordLessonReviewWordIds(lesson);
  const progressBits = [
    `${wordIds.length} ${lesson.type === "checkpoint" ? "review words" : "new words"}`,
    meta.hardCount ? `${meta.hardCount} hard` : "",
    meta.dueCount ? `${meta.dueCount} due` : "",
    meta.knownCount ? `${meta.knownCount} known` : "",
  ].filter(Boolean).join(" · ");
  return `
    <button class="study-row stage-row ${completed ? "complete" : current ? "current" : "locked"}" type="button" data-words-open-lesson="${escapeHtml(lesson.id)}" ${unlocked ? "" : `data-words-locked="1"`}>
      <span class="unit-dot ${dotClass}">${completed ? "✓" : escapeHtml(lesson.stage)}</span>
      <div>
        <div class="study-row-ko">${escapeHtml(lesson.title)}</div>
        <div class="study-row-sub">${escapeHtml(lesson.subtitle || "")} · ${escapeHtml(progressBits)}</div>
      </div>
      ${pill}
    </button>
  `;
}

function wordBasicsSectionHtml(lessons = getWordLessons()) {
  const basics = getBasicWordLessons(lessons);
  if (!basics.length) return "";
  const completed = basics.filter((lesson) => isWordLessonCompleted(lesson.id)).length;
  return `
    <button class="card word-section-card" type="button" data-word-section="basics">
      <div>
        <div class="eyebrow">Post-Hangul / Basics</div>
        <div class="study-row-ko">Basics of the basics</div>
        <div class="screen-sub" style="margin-bottom:0;">The first bridge from Hangul into usable words.</div>
      </div>
      <span class="pill muted">${completed}/${basics.length}</span>
    </button>
  `;
}

function vocabularyStagesSectionHtml() {
  const progress = getLearnProgress("vocabulary");
  return `
    <button class="card word-section-card" type="button" data-word-section="stages">
      <div>
        <div class="eyebrow">Stages</div>
        <div class="study-row-ko">Vocabulary bands</div>
        <div class="screen-sub" style="margin-bottom:0;">${progress.complete ? "All stages are unlocked." : `Current stage: ${escapeHtml(getLearnStageInfo("vocabulary", progress.currentStage).detail)}`}</div>
      </div>
      <span class="pill accent" style="white-space:nowrap;">${progress.completedCount}/${progress.total}</span>
    </button>
  `;
}

function vocabularyStageRowsHtml() {
  const progress = getLearnProgress("vocabulary");
  return Array.from({ length: progress.total }, (_, index) => {
    const stageNumber = index + 1;
    const stageInfo = getLearnStageInfo("vocabulary", stageNumber);
    const status = getLearnStageStatus("vocabulary", stageNumber);
    const locked = status === "locked";
    const complete = status === "complete";
    const current = status === "current";
    const pillLabel = complete ? "Completed" : current ? "Current" : "Locked";
    const pillClass = complete ? "green" : "muted";
    const dotClass = complete ? "done" : current ? "next" : "lock";
    const dotText = complete ? String.fromCharCode(10003) : String(stageNumber).padStart(2, "0");
    const lockHint = locked ? ` data-locked-stage="${stageNumber}"` : "";
    return `
      <button class="study-row stage-row ${status}" type="button" data-learn-stage="${stageNumber}"${lockHint}>
        <span class="unit-dot ${dotClass}">${escapeHtml(dotText)}</span>
        <div>
          <div class="study-row-ko">${escapeHtml(stageInfo.title)}</div>
          <div class="study-row-sub">${escapeHtml(stageInfo.sub)}</div>
        </div>
        <span class="pill ${pillClass}">${pillLabel}</span>
      </button>
    `;
  }).join("");
}

function alphabetStagesSectionHtml() {
  const progress = getLearnProgress("alphabet");
  return `
    <button class="card word-section-card" type="button" data-alphabet-section="stages">
      <div>
        <div class="eyebrow">Stages</div>
        <div class="study-row-ko">Alphabet stages</div>
        <div class="screen-sub" style="margin-bottom:0;">${progress.complete ? "All stages are unlocked." : `Current stage: ${escapeHtml(getLearnStageInfo("alphabet", progress.currentStage).detail)}`}</div>
      </div>
      <span class="pill accent" style="white-space:nowrap;">${progress.completedCount}/${progress.total}</span>
    </button>
    ${TEST_ENABLE_WORD_SECTION_COMPLETION && !progress.complete ? '<button class="button secondary compact" type="button" data-complete-alphabet-section style="justify-self:start;align-self:start;">Complete section (test)</button>' : ""}
  `;
}

function alphabetStageRowsHtml() {
  const progress = getLearnProgress("alphabet");
  const items = Array.from({ length: progress.total }, (_, index) => {
    const stageNumber = index + 1;
    const stageInfo = getLearnStageInfo("alphabet", stageNumber);
    const status = getLearnStageStatus("alphabet", stageNumber);
    const locked = status === "locked";
    const complete = status === "complete";
    const current = status === "current";
    const pillLabel = complete ? "Completed" : current ? "Current" : "Locked";
    const pillClass = complete ? "green" : "muted";
    const dotClass = complete ? "done" : current ? "next" : "lock";
    const dotText = complete ? String.fromCharCode(10003) : String(stageNumber).padStart(2, "0");
    const lockHint = locked ? ` data-locked-stage="${stageNumber}"` : "";
    return { status, html: `
      <button class="study-row stage-row ${status}" type="button" data-learn-stage="${stageNumber}"${lockHint}>
        <span class="unit-dot ${dotClass}">${escapeHtml(dotText)}</span>
        <div>
          <div class="study-row-ko">${escapeHtml(stageInfo.title)}</div>
          <div class="study-row-sub">${escapeHtml(stageInfo.sub)}</div>
        </div>
        <span class="pill ${pillClass}">${pillLabel}</span>
      </button>
    ` };
  });
  const current = items.filter((item) => item.status === "current");
  const complete = items.filter((item) => item.status === "complete");
  const locked = items.filter((item) => item.status === "locked");
  const group = (label, rows, className) => rows.length
    ? `<details class="stage-collapse ${className}"><summary>${escapeHtml(label)} <span class="pill muted">${rows.length}</span></summary><div class="study-list">${rows.map((item) => item.html).join("")}</div></details>`
    : "";
  return `${current.length ? `<div class="study-list stage-current-list">${current.map((item) => item.html).join("")}</div>` : ""}
    ${group("Completed stages", complete, "is-complete")}
    ${group("Locked stages", locked, "is-locked")}`;
}

function getWordLessonPathMeta(lesson, now = Date.now()) {
  const completed = isWordLessonCompleted(lesson.id);
  const unlocked = isWordLessonUnlocked(lesson);
  const active = state.vocabLessonActive === lesson.id;
  const words = getWordLessonReviewWordIds(lesson).map((id) => curatedWordsById.get(id)).filter(Boolean);
  let hardCount = 0;
  let knownCount = 0;
  let dueCount = 0;

  words.forEach((word) => {
    const record = getVocabSrsRecord(word.id);
    if (!record) return;
    if (record.isHard) hardCount += 1;
    if (record.isKnown) knownCount += 1;
    if (!record.isKnown && Number(record.due) > 0 && Number(record.due) <= now) dueCount += 1;
  });

  return {
    completed,
    unlocked,
    active,
    current: !completed && unlocked,
    hardCount,
    knownCount,
    dueCount,
  };
}

function wordLessonMatchesLevel(meta, level) {
  if (level === "ready") return meta.current;
  if (level === "active") return meta.active;
  if (level === "completed") return meta.completed;
  if (level === "locked") return !meta.unlocked;
  if (level === "hard") return meta.hardCount > 0;
  if (level === "due") return meta.dueCount > 0;
  if (level === "known") return meta.knownCount > 0;
  return true;
}

function wordPathV2Html() {
  const next = getNextWordLesson();
  const activeUnitId = next?.unitId || "";
  const sections = getWordSections();
  return `<div class="vocab-path">${sections.map((section) => {
    const sectionUnits = getWordUnits().filter((unit) => unit.sectionId === section.id).sort((a, b) => a.order - b.order);
    const unlocked = isWordSectionUnlocked(section);
    const crowned = sectionUnits.filter(isWordUnitCrowned).length;
    const sectionOpen = unlocked && (section.id === "s1" || sectionUnits.some((unit) => unit.id === activeUnitId));
    return `<section class="vocab-path-section ${unlocked ? "is-open" : "is-locked"}">
      <div class="vocab-path-section-header">
        <div><div class="eyebrow">Section ${escapeHtml(section.id.toUpperCase())}</div><h3 class="vocab-path-section-title">${escapeHtml(section.name)}</h3></div>
        <div class="flex gap-8" style="align-items:center; flex-wrap:wrap; justify-content:flex-end;">
          <span class="pill ${unlocked ? "accent" : "muted"}">${unlocked ? `${crowned}/${sectionUnits.length} crowned` : "🔒 Locked"}</span>
          ${TEST_ENABLE_WORD_SECTION_COMPLETION ? `<button class="button secondary compact" type="button" data-word-complete-section="${escapeHtml(section.id)}">Complete section (test)</button>` : ""}
        </div>
      </div>
      ${unlocked ? (sectionOpen ? sectionUnits.map((unit) => wordPathV2UnitHtml(unit, activeUnitId)).join("") : `<details class="vocab-path-explore"><summary>Explore topics · ${sectionUnits.length} units</summary><div class="vocab-path-unit-list">${sectionUnits.map((unit) => wordPathV2UnitHtml(unit, activeUnitId)).join("")}</div></details>`) : `<div class="vocab-path-lock-note">Finish ${escapeHtml(section.prerequisiteSectionId ? getWordSectionById(section.prerequisiteSectionId)?.name || "the previous section" : "Hangul")} to unlock this section.</div>`}
    </section>`;
  }).join("")}</div>`;
}

function wordPathV2UnitHtml(unit, activeUnitId) {
  const contentLessons = getWordUnitContentLessons(unit);
  const checkpoint = getWordLessonById(unit.checkpointId);
  const crowned = isWordUnitCrowned(unit);
  const unlocked = isWordUnitUnlocked(unit);
  const active = unit.id === activeUnitId;
  const completed = contentLessons.filter((lesson) => isWordLessonCompleted(lesson.id)).length;
  const unitWordIds = [...contentLessons, checkpoint].flatMap((lesson) => getWordLessonReviewWordIds(lesson));
  const dueCount = [...new Set(unitWordIds)].filter((wordId) => {
    const record = getVocabSrsRecord(wordId);
    return record && !record.isKnown && Number(record.due) > 0 && Number(record.due) <= Date.now();
  }).length;
  const dueChip = dueCount ? `<span class="vocab-path-unit-due">${dueCount} due</span>` : "";
  const lessonRows = [...contentLessons, checkpoint].map((lesson) => {
    const meta = getWordLessonPathMeta(lesson);
    return wordLessonRowHtml(lesson, meta);
  }).join("");
  return `<article class="vocab-path-unit ${active ? "is-highlighted" : ""} ${crowned ? "is-crowned" : ""} ${!unlocked ? "is-locked" : ""}">
    <button class="vocab-path-unit-header" type="button" data-word-unit-toggle="${escapeHtml(unit.id)}" aria-expanded="${crowned ? "false" : "true"}">
      <span class="vocab-path-unit-emoji" aria-hidden="true">${escapeHtml(unit.emoji || "✏️")}</span>
      <span class="vocab-path-unit-copy"><strong>${escapeHtml(unit.name)}</strong><small>${escapeHtml(formatWordLessonCategoryLabel(unit.track))} · ${completed}/${contentLessons.length} lessons ${dueChip}</small></span>
      <span class="pill ${crowned ? "green" : unlocked ? "accent" : "muted"}">${crowned ? "🏆 Crowned" : unlocked ? `${completed}/${contentLessons.length}` : "🔒"}</span>
    </button>
    <div class="vocab-path-unit-lessons" data-word-unit-lessons="${escapeHtml(unit.id)}" ${crowned ? "hidden" : ""}>${lessonRows}</div>
  </article>`;
}

function bindWordPathUnitToggles(el) {
  el.querySelectorAll("[data-word-unit-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const lessons = el.querySelector(`[data-word-unit-lessons="${CSS.escape(button.dataset.wordUnitToggle)}"]`);
      if (!lessons) return;
      const hidden = lessons.hasAttribute("hidden");
      if (hidden) lessons.removeAttribute("hidden"); else lessons.setAttribute("hidden", "");
      button.setAttribute("aria-expanded", hidden ? "true" : "false");
    });
  });
}

function wordPathLessonPanelHtml() {
  if (isWordCurriculumV2()) return wordPathV2Html();
  const lessons = getWordLessons();
  if (!lessons.length) return "";

  const next = getNextWordLesson();
  const completedCount = (state.vocabLessonCompleted || []).length;
  const categoryOptions = getWordLessonCategoryOptions(lessons);
  const categoryIds = new Set(categoryOptions.map((option) => option.id));
  const nextCategory = next ? getWordLessonCategoryId(next) : "";
  const defaultCategory = nextCategory && categoryIds.has(nextCategory) ? nextCategory : "all";
  const categoryFilter = state.wordPathCategory && (state.wordPathCategory === "all" || categoryIds.has(state.wordPathCategory))
    ? state.wordPathCategory
    : defaultCategory;
  const levelFilter = WORD_PATH_LEVEL_FILTERS.some((filter) => filter.id === state.wordPathLevel)
    ? state.wordPathLevel
    : "all";
  const categoryOptionHtml = [
    { id: "all", label: `All categories (${lessons.length})` },
    ...categoryOptions.map((option) => ({
      ...option,
      label: `${option.label} (${lessons.filter((lesson) => getWordLessonCategoryId(lesson) === option.id).length})`,
    })),
  ].map((option) => `<option value="${escapeHtml(option.id)}" ${categoryFilter === option.id ? "selected" : ""}>${escapeHtml(option.label)}</option>`).join("");
  const levelOptionHtml = WORD_PATH_LEVEL_FILTERS
    .map((filter) => `<option value="${escapeHtml(filter.id)}" ${levelFilter === filter.id ? "selected" : ""}>${escapeHtml(filter.label)}</option>`)
    .join("");
  const visibleLessons = lessons
    .map((lesson) => ({ lesson, meta: getWordLessonPathMeta(lesson) }))
    .filter(({ lesson, meta }) => (categoryFilter === "all" || getWordLessonCategoryId(lesson) === categoryFilter) && wordLessonMatchesLevel(meta, levelFilter));
  const lessonRows = visibleLessons.map(({ lesson, meta }) => wordLessonRowHtml(lesson, meta)).join("");
  const listSummary = visibleLessons.length === lessons.length
    ? `${lessons.length} lessons shown`
    : `${visibleLessons.length} of ${lessons.length} lessons shown`;

  return `
    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">Lessons</div>
          <div class="study-row-ko">Guided word lessons</div>
          <div class="screen-sub" style="margin-bottom:0;">Browse by category and learning level when you want the full path.</div>
        </div>
        <span class="pill accent" style="white-space:nowrap;">${completedCount}/${lessons.length}</span>
      </div>
      <div class="word-path-controls">
        <label class="word-path-field">
          <span>Category</span>
          <select class="alphabet-stage-select word-path-select" data-word-path-category>
            ${categoryOptionHtml}
          </select>
        </label>
        <label class="word-path-field">
          <span>Learning level</span>
          <select class="alphabet-stage-select word-path-select" data-word-path-level>
            ${levelOptionHtml}
          </select>
        </label>
      </div>
      <div class="word-path-summary">${escapeHtml(listSummary)}</div>
      <div class="study-list">${lessonRows || '<div class="study-row"><div><div class="study-row-ko">No lessons match those filters</div><div class="study-row-sub">Choose a different category or learning level.</div></div></div>'}</div>
    </div>
  `;
}

function wordLessonsSectionHtml(lessons = getWordLessons()) {
  if (!lessons.length) return "";
  const completedCount = (state.vocabLessonCompleted || []).length;
  return `
    <button class="card word-section-card" type="button" data-word-section="lessons">
      <div>
        <div class="eyebrow">Lessons</div>
        <div class="study-row-ko">Guided word lessons</div>
        <div class="screen-sub" style="margin-bottom:0;">Browse by category and learning level when you want the full path.</div>
      </div>
      <span class="pill accent" style="white-space:nowrap;">${completedCount}/${lessons.length}</span>
    </button>
  `;
}

function bindWordPathControls(el, rerender) {
  const categorySelect = el.querySelector("[data-word-path-category]");
  if (categorySelect) {
    categorySelect.addEventListener("change", () => {
      state.wordPathCategory = categorySelect.value || "all";
      saveState();
      rerender();
    });
  }
  const levelSelect = el.querySelector("[data-word-path-level]");
  if (levelSelect) {
    levelSelect.addEventListener("change", () => {
      state.wordPathLevel = levelSelect.value || "all";
      saveState();
      rerender();
    });
  }
}

function bindWordLessonRows(el) {
  el.querySelectorAll("[data-words-open-lesson]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.wordsLocked) {
        showRetryToast(getAlphabetProgress().complete
          ? "Finish the previous word lesson to unlock this one."
          : "Finish the Hangul stages to unlock word lessons.");
        return;
      }
      openWordLesson(btn.dataset.wordsOpenLesson, { resume: state.vocabLessonActive === btn.dataset.wordsOpenLesson });
    });
  });
}

function bindVocabularyStageRows(el) {
  el.querySelectorAll("[data-learn-stage]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.lockedStage) {
        const progress = getLearnProgress("vocabulary");
        const currentStageInfo = getLearnStageInfo("vocabulary", progress.currentStage);
        showRetryToast(`Finish "${currentStageInfo.title}" to unlock this stage.`);
        return;
      }
      openLearnStage("vocabulary", Number(btn.dataset.learnStage));
    });
  });
}

function openVocabularySubsection(section, backTarget = "menu") {
  stopSpeech();
  currentQuizScope = "vocabulary";
  state.studio = "vocab";
  activeHub = "learn";
  setNavActive("learn");
  const el = showScreen("detail");
  if (!el) return;

  const back = () => {
    if (backTarget === "words-home") openWordsHome();
    else openLearnStageMenu("vocabulary");
  };

  if (section === "basics") {
    const basics = getBasicWordLessons();
    showDetailBarWithBack("learn", "Post-Hangul / Basics", back, "Vocabulary");
    el.innerHTML = `
      <div class="card">
        <div class="eyebrow">Post-Hangul / Basics</div>
        <h2 class="screen-title" style="margin-bottom:8px;">Basics of the basics</h2>
        <div class="screen-sub" style="margin-bottom:0;">The first bridge from Hangul into usable words.</div>
      </div>
      <div class="card">
        <div class="study-list">${basics.map((lesson) => wordLessonRowHtml(lesson)).join("")}</div>
      </div>
    `;
    bindWordLessonRows(el);
    return;
  }

  if (section === "lessons") {
    showDetailBarWithBack("learn", "Guided word lessons", back, "Vocabulary");
    el.innerHTML = wordPathLessonPanelHtml();
    bindWordLessonRows(el);
    if (!isWordCurriculumV2()) bindWordPathControls(el, () => openVocabularySubsection("lessons", backTarget));
    bindWordPathUnitToggles(el);
    return;
  }

  if (section === "stages") {
    showDetailBarWithBack("learn", "Vocabulary bands", back, "Vocabulary");
    el.innerHTML = `
      <div class="card">
        <div class="eyebrow">Stages</div>
        <h2 class="screen-title" style="margin-bottom:8px;">Vocabulary bands</h2>
        <div class="screen-sub" style="margin-bottom:0;">Open the broad 500-word bands when you want the old stage view.</div>
      </div>
      <div class="card">
        <div class="study-list">${vocabularyStageRowsHtml()}</div>
      </div>
    `;
    bindVocabularyStageRows(el);
  }
}

function bindVocabularySectionCards(el, backTarget = "menu") {
  el.querySelectorAll("[data-word-section]").forEach((btn) => {
    btn.addEventListener("click", () => openVocabularySubsection(btn.dataset.wordSection, backTarget));
  });
}

function bindAlphabetStageRows(el) {
  el.querySelectorAll("[data-learn-stage]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.lockedStage) {
        const progress = getLearnProgress("alphabet");
        const currentStageInfo = getLearnStageInfo("alphabet", progress.currentStage);
        showRetryToast(`Finish "${currentStageInfo.title}" to unlock this stage.`);
        return;
      }
      openLearnStage("alphabet", Number(btn.dataset.learnStage));
    });
  });
}

function openAlphabetSubsection(section) {
  if (section !== "stages") return;
  stopSpeech();
  currentQuizScope = "alphabet";
  state.studio = "alphabet";
  activeHub = "learn";
  setNavActive("learn");
  const el = showScreen("detail");
  if (!el) return;

  showDetailBarWithBack("learn", "Alphabet stages", () => openLearnStageMenu("alphabet"), "Alphabet");
  el.innerHTML = `
    <div class="card">
      <div class="eyebrow">Stages</div>
      <h2 class="screen-title" style="margin-bottom:8px;">Alphabet stages</h2>
      <div class="screen-sub" style="margin-bottom:0;">Open the step-by-step Hangul path when you want the full stage list.</div>
    </div>
    <div class="card">
      <div class="study-list">${alphabetStageRowsHtml()}</div>
    </div>
  `;
  bindAlphabetStageRows(el);
}

function bindAlphabetSectionCards(el) {
  el.querySelectorAll("[data-alphabet-section]").forEach((btn) => {
    btn.addEventListener("click", () => openAlphabetSubsection(btn.dataset.alphabetSection));
  });
}

// Words home content (the "learn" view of the vocabulary section): continue
// card, review card, and the Word Path lesson list.
function wordsHomeContentHtml() {
  const lessons = getWordLessons();
  if (!lessons.length || !getCuratedWords().length) {
    return `
      <div class="card">
        <div class="eyebrow mb-12">Word lessons</div>
        <div class="screen-sub" style="margin-bottom:0;">Curated word lessons did not load. The raw word bank is still available.</div>
      </div>
    `;
  }

  const alphabetDone = getAlphabetProgress().complete || TEST_UNLOCK_ALL_STAGES; // see TEST_UNLOCK_ALL_STAGES above
  const next = getNextWordLesson();
  const dueCount = getVocabDueCount();

  const continueCard = alphabetDone
    ? (next
      ? `
        <div class="card continue-hero">
          <div class="eyebrow">Continue words</div>
          <h3 class="screen-title" style="margin-bottom:8px;">${escapeHtml(next.title)}</h3>
          <div class="screen-sub" style="margin-bottom:12px;">${escapeHtml(next.goal || next.subtitle || "")}</div>
          <div class="flex-between" style="gap:12px; align-items:center; flex-wrap:wrap;">
            <span class="pill accent">${getWordLessonReviewWordIds(next).length} ${next.type === "checkpoint" ? "review words" : "new words"} - Stage ${escapeHtml(next.stage)}</span>
            <button class="button primary compact" type="button" data-words-open-lesson="${escapeHtml(next.id)}">${state.vocabLessonActive === next.id ? "Continue lesson" : "Start lesson"}</button>
          </div>
        </div>`
      : `
        <div class="card continue-hero">
          <div class="eyebrow">Word Path</div>
          <h3 class="screen-title" style="margin-bottom:8px;">All word lessons complete</h3>
          <div class="screen-sub" style="margin-bottom:0;">Keep the words fresh with reviews, or explore the word bank.</div>
        </div>`)
    : `
      <div class="card">
        <div class="eyebrow">Word Path</div>
        <h3 class="screen-title" style="margin-bottom:8px;">Finish Hangul first</h3>
        <div class="screen-sub" style="margin-bottom:0;">Word lessons unlock when the alphabet is complete. The word bank is always open for browsing.</div>
      </div>`;

  const reviewCard = `
    <div class="card">
      <div class="flex-between">
        <div>
          <div class="eyebrow">Review due</div>
          <div class="screen-sub" style="margin-bottom:0;">${dueCount ? `${dueCount} word${dueCount === 1 ? "" : "s"} waiting to come back.` : "No reviews due. Learn new words or browse the word bank."}</div>
        </div>
        <div class="word-card-actions" style="margin:0; gap:8px; flex-wrap:wrap;">
          <button class="button ${dueCount ? "primary" : "secondary"} compact" type="button" data-words-start-review ${dueCount ? "" : "disabled"}>Review${dueCount ? ` (${dueCount})` : ""}</button>
          <button class="button secondary compact" type="button" data-vocab-view="metrics">Insights</button>
        </div>
      </div>
    </div>`;

  return `
    ${continueCard}
    ${isWordCurriculumV2() ? wordPathLessonPanelHtml() : ""}
    ${reviewCard}
    ${isWordCurriculumV2() ? "" : wordBasicsSectionHtml(lessons)}
    ${isWordCurriculumV2() ? "" : wordLessonsSectionHtml(lessons)}
    ${vocabularyStagesSectionHtml()}
  `;
}
function bindWordsHomeContent(el) {
  bindVocabularySectionCards(el, "words-home");
  bindWordLessonRows(el);
  bindWordPathUnitToggles(el);
  el.querySelectorAll("[data-word-complete-section]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      completeWordSectionForTesting(button.dataset.wordCompleteSection);
      renderVocabulary();
    });
  });
  const reviewBtn = el.querySelector("[data-words-start-review]");
  if (reviewBtn) reviewBtn.addEventListener("click", () => openWordReview());
}

function getStudio() {
  const studio = String(state.studio || "").toLowerCase();
  if (studio === "vocabulary" || studio === "vocab") return "vocab";
  if (studio === "sentences") return "sentences";
  if (studio === "listening" || studio === "listen") return "listen";
  if (studio === "sound" || studio === "survival" || studio === "grammar" || studio === "verb" || studio === "conversation") {
    return studio;
  }
  return "alphabet";
}

function getStudioLabel() {
  if (getStudio() === "vocab") return "Vocabulary";
  if (getStudio() === "sentences") return "Sentences";
  if (getStudio() === "listen") return "Listening";
  if (getStudio() === "sound") return "Alphabet sound";
  if (getStudio() === "survival") return "Survival";
  if (getStudio() === "grammar") return "Grammar";
  if (getStudio() === "verb") return "Verb";
  if (getStudio() === "conversation") return "Conversation";
  return "Alphabet";
}

function getStudioHint() {
  if (getStudio() === "vocab") return "Vocabulary mode is active: English spelling, Hangul, and pronunciation are tested together.";
  if (getStudio() === "sentences") return "Sentence mode is active: build Korean, type it, and hear it back.";
  if (getStudio() === "listen") return "Listening mode is active: hear a line, choose it, or type it out.";
  if (getStudio() === "sound") return "Hangul sound mode is active: consonants, vowels, batchim, and sound flow.";
  if (getStudio() === "survival") return "Survival mode is active: quick phrases for real life.";
  if (getStudio() === "grammar") return "Grammar mode is active: particles and sentence order.";
  if (getStudio() === "verb") return "Verb mode is active: endings, tense, and honorifics.";
  if (getStudio() === "conversation") return "Conversation mode is active: quick replies and shadowing.";
  return "Alphabet mode is active: start with vowels, then consonants, blocks, advanced sets, and reading.";
}

function syncStudioButton() {
  if (els.enterPhaseTwoButton) {
    els.enterPhaseTwoButton.textContent = getStudio() === "sound" ? "Back to alphabet mode" : "Enter sound mode";
  }

  if (els.enterPhaseThreeButton) {
    els.enterPhaseThreeButton.textContent =
      getStudio() === "survival" ? "Back to alphabet mode" : "Enter survival mode";
  }

  if (els.enterPhaseFourButton) {
    els.enterPhaseFourButton.textContent =
      getStudio() === "grammar" ? "Back to alphabet mode" : "Enter sentence mode";
  }

  if (els.enterPhaseFiveButton) {
    els.enterPhaseFiveButton.textContent = getStudio() === "verb" ? "Back to alphabet mode" : "Enter verb mode";
  }

  if (els.enterPhaseSixButton) {
    els.enterPhaseSixButton.textContent =
      getStudio() === "conversation" ? "Back to alphabet mode" : "Enter conversation mode";
  }
}

function toggleStudio(target) {
  setStudio(getStudio() === target ? "alphabet" : target);
  window.location.hash = "#practice";
}

function setStudio(studio) {
  stopSpeech();
  refreshProgressionState();
  const normalized = normalizeMainTab(studio);
  const requestedStudio = normalized === "alphabet" && !MAIN_TABS.includes(String(studio).toLowerCase())
    ? String(studio).toLowerCase()
    : normalized;
  state.studio = isStudioUnlocked(requestedStudio) ? requestedStudio : (state.mainTab || getDefaultStudioForLevel());
  updateStats();
  syncStudioButton();
  saveState();
  renderScopedQuestion(getCurrentQuizScope());
}

function renderLevelRail(tab, level = getTrackLevel(tab)) {
  return `
    <div class="card flat">
      <div class="flex-between mb-8">
        <div class="eyebrow" style="margin:0;">Level ${level} of 10</div>
        <span class="pill accent">${escapeHtml(getMainTabLabel(tab))}</span>
      </div>
      <div class="level-rail" aria-label="${escapeHtml(getMainTabLabel(tab))} levels">
        ${Array.from({ length: 10 }, (_, index) => {
          const n = index + 1;
          const stateClass = n === level ? "active" : n < level ? "done" : "future";
          return `<button class="level-chip ${stateClass}" type="button" data-level-tab="${escapeHtml(tab)}" data-level="${n}">${n}</button>`;
        }).join("")}
      </div>
    </div>
  `;
}

function bindLevelRail(el, tab, rerender) {
  el.querySelectorAll(`[data-level-tab="${tab}"]`).forEach((btn) => {
    btn.addEventListener("click", () => {
      const level = Number(btn.dataset.level);
      if (!Number.isInteger(level)) return;
      setTrackLevel(tab, level);
      if (state.route?.hub === "learn" && state.route?.item === tab) {
        state.route = { ...state.route, stage: level };
        saveState();
      }
      rerender();
    });
  });
}

function renderQuizCard(scope) {
  const ids = getQuizIds(scope);
  const session = getPracticeQuizSession(scope) || startGenericPracticeSession(scope);
  if (session.complete) {
    const accuracy = session.asked ? Math.round((session.correct / session.asked) * 100) : 0;
    return premiumCompletionHtml({
      tone: accuracy >= 80 ? "success" : "retry",
      eyebrow: `${getMainTabLabel(scope)} practice complete`,
      title: accuracy >= 80 ? "Strong finish" : "A useful practice pass",
      copy: accuracy >= 80 ? "That set is complete. Start another whenever you are ready." : "Your misses are useful signals. Try another set to reinforce them.",
      score: { value: `${accuracy}%`, label: "Accuracy" },
      stats: [
        { value: `${session.correct}/${session.asked}`, label: "Correct" },
        { value: session.bestStreak, label: "Best streak" },
      ],
      actionsHtml: `<button class="button primary compact" type="button" data-generic-practice-again="${escapeHtml(session.scope)}">Practise another set</button>`,
      className: "generic-practice-summary",
      celebrate: accuracy >= 80,
    });
  }
  return `
    <div class="card">
      <div class="review-stats">
        <div class="rev-stat"><span class="sv" id="${ids.round}">${session.index + 1}/${session.total}</span><span class="sl">Question</span></div>
        <div class="rev-stat"><span class="sv" id="${ids.streak}">${session.streak}</span><span class="sl">Streak</span></div>
        <div class="rev-stat"><span class="sv" id="${ids.best}">${session.bestStreak}</span><span class="sl">Best</span></div>
        <div class="rev-stat"><span class="sv" id="${ids.accuracy}">${session.asked === 0 ? "0%" : Math.min(100, Math.round(session.correct / session.asked * 100)) + "%"}</span><span class="sl">Accuracy</span></div>
      </div>

      <div class="quiz-card">
        <div class="quiz-meta">
          <span class="pill accent" id="${ids.type}">—</span>
          <span class="pill muted" id="${ids.mode}">—</span>
        </div>
        <div class="quiz-visual" id="${ids.visual}"></div>
        <div class="quiz-prompt" id="${ids.prompt}">Loading…</div>
        <div class="quiz-detail" id="${ids.detail}"></div>
        <div class="quiz-options" id="${ids.options}"></div>
        <div class="quiz-feedback" id="${ids.feedback}"></div>
      </div>

      <div class="review-actions">
        <button class="button secondary" id="${ids.speak}" type="button" aria-label="Replay the current sound" title="Replay the current sound">▶ Replay sound</button>
        <button class="button primary" id="${ids.next}" type="button">Next →</button>
      </div>
    </div>
  `;
}

function renderWordPills(items, limit = 4) {
  return items.slice(0, limit).map((item) => `
    <div class="study-pill">
      <div class="study-pill-ko" lang="ko">${escapeHtml(item.korean)}</div>
      <div class="study-pill-sub">${escapeHtml(item.romanization || item.meaning || "")}</div>
    </div>
  `).join("");
}

function renderSentenceRows(items, limit = 4) {
  return items.slice(0, limit).map((item) => `
    <div class="study-row">
      <div>
        <div class="study-row-ko" lang="ko">${escapeHtml(item.korean)}</div>
        <div class="study-row-sub">${escapeHtml(item.meaning || item.source || "")}</div>
      </div>
      ${hearIconButton(item.voiceText || item.korean, "data-speak")}
    </div>
  `).join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const HANGUL_TEXT_PATTERN = /[\u1100-\u11ff\u3130-\u318f\ua960-\ua97f\uac00-\ud7af\ud7b0-\ud7ff]/;

// Answer tiles appear throughout Alphabet, Words, Sentences, Listening, and
// review flows. Mark their actual content language so Latin labels use the
// app's English font/spacing while Hangul keeps its Korean typography.
function textLanguageAttr(value) {
  return HANGUL_TEXT_PATTERN.test(String(value || "")) ? 'lang="ko"' : 'lang="en"';
}

// Icon-only "▶" hear button. `dataAttr` is the data-* the relevant click
// handler listens on (data-speak / data-vocab-hear / data-alpha-speak). The
// aria-label gives screen readers a real name instead of just "▶".
function hearIconButton(speakText, dataAttr = "data-speak") {
  const safe = escapeHtml(speakText);
  return `<button class="lib-hear-btn" type="button" ${dataAttr}="${safe}" aria-label="Hear ${safe}">▶</button>`;
}

// Wire a tap-to-hear token for both pointer and keyboard (Enter/Space), so the
// large focusable letter tokens are operable without a mouse.
function bindTapToHearToken(token) {
  if (!token) return;
  const fire = () => { flashElement(token); void speak(token.dataset.speak || token.textContent || ""); };
  token.addEventListener("click", fire);
  token.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    fire();
  });
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffle(list) {
  const copy = [...list];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

const CORRECT_SOUND_DEFS = [
  { name: "Bubblegum Chord Cascade", desc: "Duolingo-style rising arpeggio bubble pops (C5 -> E5 -> G5 -> C6). Warm and cute!", url: "audio/sound_effects/correct/correct_1.wav" },
  { name: "Pentatonic Bubble Rise", desc: "Five rapid rising pops in the major pentatonic scale (C5 -> D5 -> E5 -> G5 -> A5).", url: "audio/sound_effects/correct/correct_2.wav" },
  { name: "Bubblegum Double Pop", desc: "A bouncy, high double pop (F5 -> Bb5).", url: "audio/sound_effects/correct/correct_3.wav" },
  { name: "Bubblegum Major 7th", desc: "Four soft pop notes played as a warm simultaneous chord.", url: "audio/sound_effects/correct/correct_4.wav" },
  { name: "Kalimba Bubble Arpeggio", desc: "A cute thumb-piano arpeggio with bubble-pop sweeps (E5 -> G#5 -> B5 -> E6).", url: "audio/sound_effects/correct/correct_5.wav" },
  { name: "Single Bubblegum Pop 1", desc: "A clean, single bubblegum pop note (F5).", url: "audio/sound_effects/correct/correct_6.wav" },
  { name: "Single Bubblegum Pop 2", desc: "A slightly higher single bubblegum pop (Bb5).", url: "audio/sound_effects/correct/correct_7.wav" },
  { name: "Triple Bubblegum Cascade", desc: "Three rapid pop notes ascending in pitch (C5 -> G5 -> C6).", url: "audio/sound_effects/correct/correct_8.wav" },
  { name: "Water Droplet Pop", desc: "A smooth, wet rising water droplet pop sweep.", url: "audio/sound_effects/correct/correct_9.wav" },
  { name: "Soft Bouncy Pop", desc: "A single bouncy pop note (D5).", url: "audio/sound_effects/correct/correct_10.wav" },
  { name: "Bouncy Toy Pop", desc: "A cute spring-like pitch vibrato pop.", url: "audio/sound_effects/correct/correct_11.wav" },
  { name: "Morning Bird Pop", desc: "Two rapid, tiny high-frequency pops.", url: "audio/sound_effects/correct/correct_12.wav" },
  { name: "Harmonized Bubble Pop", desc: "Two soft pop notes played in a warm third harmony.", url: "audio/sound_effects/correct/correct_13.wav" },
  { name: "Rhodes Chord Swell", desc: "A warm electric piano major triad swell.", url: "audio/sound_effects/correct/correct_14.wav" },
  { name: "Double Pop High", desc: "Two rapid pops jumping up to E6.", url: "audio/sound_effects/correct/correct_15.wav" },
  { name: "Whistle Bubble Pop", desc: "A gentle human whistle slide resolved into a pop.", url: "audio/sound_effects/correct/correct_16.wav" },
  { name: "Ambient Bubble Swell", desc: "A slow, warm ambient chime bar swell.", url: "audio/sound_effects/correct/correct_17.wav" },
  { name: "Pentatonic Pop Cascade", desc: "Three rapid pop notes (C5 -> E5 -> A5).", url: "audio/sound_effects/correct/correct_18.wav" },
  { name: "Gentle Rain Plop", desc: "A soft, watery rain pop.", url: "audio/sound_effects/correct/correct_19.wav" },
  { name: "Soft Sleepy Chime", desc: "A peaceful, warm two-tone chime chord.", url: "audio/sound_effects/correct/correct_20.wav" }
];

const INCORRECT_SOUND_DEFS = [
  { name: "Heartbeat Double Thump", desc: "Two ultra-low, warm thumps. Very non-intrusive!", url: "audio/sound_effects/incorrect/incorrect_1.wav" },
  { name: "Marimba Minor Fall", desc: "A gentle two-note minor fall on a marimba (220Hz -> 174Hz).", url: "audio/sound_effects/incorrect/incorrect_2.wav" },
  { name: "Soft Muted Tap", desc: "A single flat, organic wooden tap (130Hz).", url: "audio/sound_effects/incorrect/incorrect_3.wav" },
  { name: "Faint Warm Hum", desc: "A quiet, warm electric piano detuned warning hum.", url: "audio/sound_effects/incorrect/incorrect_4.wav" },
  { name: "Soft Decline Slide", desc: "A gentle, low-frequency pitch drop.", url: "audio/sound_effects/incorrect/incorrect_5.wav" },
  { name: "Hollow Bubble Drop", desc: "A hollow bubble pop dropping in pitch.", url: "audio/sound_effects/incorrect/incorrect_6.wav" },
  { name: "Quiet Dead Thump", desc: "An extremely quiet, low-frequency thud.", url: "audio/sound_effects/incorrect/incorrect_7.wav" },
  { name: "Muted Bass Pluck", desc: "A soft pluck of a low bass guitar note.", url: "audio/sound_effects/incorrect/incorrect_8.wav" },
  { name: "Sad Kalimba Fall", desc: "Two descending minor notes on a kalimba.", url: "audio/sound_effects/incorrect/incorrect_9.wav" },
  { name: "Muted Rhodes Drop", desc: "A muffled electric piano minor chord dropping.", url: "audio/sound_effects/incorrect/incorrect_10.wav" },
  { name: "Faint Double Buzz", desc: "Two very soft, low-frequency triangle wave beeps.", url: "audio/sound_effects/incorrect/incorrect_11.wav" },
  { name: "Soft Bass Swoosh", desc: "A soft, low-frequency slide down.", url: "audio/sound_effects/incorrect/incorrect_12.wav" },
  { name: "Hollow Plop Drop", desc: "A hollow, double wood block drop.", url: "audio/sound_effects/incorrect/incorrect_13.wav" },
  { name: "Muted Low Bell", desc: "A muffled, low-frequency bell sound.", url: "audio/sound_effects/incorrect/incorrect_14.wav" },
  { name: "Low Digital Slide Drop", desc: "A clean, low sine wave note sliding down.", url: "audio/sound_effects/incorrect/incorrect_15.wav" },
  { name: "Muted Heavy Thud", desc: "A soft, low-passed physical thud.", url: "audio/sound_effects/incorrect/incorrect_16.wav" },
  { name: "Soft Disappointment Slide", desc: "Two muted, sad descending notes.", url: "audio/sound_effects/incorrect/incorrect_17.wav" },
  { name: "Faint Alarm Beeps", desc: "Two very quiet, high-pitched warning pulses.", url: "audio/sound_effects/incorrect/incorrect_18.wav" },
  { name: "Faint Bass Slide", desc: "A quiet, smooth bass pitch glide down.", url: "audio/sound_effects/incorrect/incorrect_19.wav" },
  { name: "Muted Wood Click", desc: "A very quiet, organic wooden click.", url: "audio/sound_effects/incorrect/incorrect_20.wav" }
];

const audioFileCache = {};
let lastFeedbackSoundTime = 0;

function playFileSound(url) {
  try {
    if (!audioFileCache[url]) {
      audioFileCache[url] = new Audio(url);
    }
    const audio = audioFileCache[url];
    audio.currentTime = 0;
    audio.play().catch((e) => console.warn("Failed to play audio file:", e));
  } catch (e) {
    console.warn("Audio file playback error:", e);
  }
}

function playCorrectSoundOption(option) {
  lastFeedbackSoundTime = Date.now();
  const idx = option - 1;
  if (CORRECT_SOUND_DEFS[idx]) {
    playFileSound(CORRECT_SOUND_DEFS[idx].url);
  }
}

function playIncorrectSoundOption(option) {
  lastFeedbackSoundTime = Date.now();
  const idx = option - 1;
  if (INCORRECT_SOUND_DEFS[idx]) {
    playFileSound(INCORRECT_SOUND_DEFS[idx].url);
  }
}

function playCorrectSound() {
  playCorrectSoundOption(state.activeCorrectSound || 14);
}

function playIncorrectSound() {
  playIncorrectSoundOption(state.activeIncorrectSound || 2);
}

function getCorrectToastElement() {
  return document.getElementById("correctToast");
}

function bindCorrectToastDismissals() {
  if (correctToastState.listenersBound) return;
  correctToastState.listenersBound = true;
  const dismiss = () => hideCorrectToast(true);
  window.addEventListener("pointerdown", dismiss, true);
  window.addEventListener("keydown", dismiss, true);
}

function hideCorrectToast(immediate = false) {
  const toast = getCorrectToastElement();
  if (!toast || toast.hidden) return;

  if (correctToastState.hideTimer) {
    window.clearTimeout(correctToastState.hideTimer);
    correctToastState.hideTimer = 0;
  }
  if (correctToastState.removeTimer) {
    window.clearTimeout(correctToastState.removeTimer);
    correctToastState.removeTimer = 0;
  }

  toast.classList.remove("is-visible");

  if (immediate) {
    toast.hidden = true;
    return;
  }

  correctToastState.removeTimer = window.setTimeout(() => {
    toast.hidden = true;
    correctToastState.removeTimer = 0;
  }, 420);
}

function showCorrectToast(message = "Correct!") {
  playCorrectSound();
  const toast = getCorrectToastElement();
  if (!toast) return;

  bindCorrectToastDismissals();

  if (correctToastState.hideTimer) {
    window.clearTimeout(correctToastState.hideTimer);
    correctToastState.hideTimer = 0;
  }
  if (correctToastState.removeTimer) {
    window.clearTimeout(correctToastState.removeTimer);
    correctToastState.removeTimer = 0;
  }

  toast.textContent = message;
  toast.hidden = false;
  toast.classList.remove("is-visible");
  void toast.offsetWidth;
  toast.classList.add("is-visible");

  correctToastState.hideTimer = window.setTimeout(() => {
    hideCorrectToast();
  }, 1500);
}

function getRetryToastElement() {
  return document.getElementById("retryToast");
}

function bindRetryToastDismissals() {
  if (retryToastState.listenersBound) return;
  retryToastState.listenersBound = true;
  const dismiss = () => hideRetryToast(true);
  window.addEventListener("pointerdown", dismiss, true);
  window.addEventListener("keydown", dismiss, true);
}

function hideRetryToast(immediate = false) {
  const toast = getRetryToastElement();
  if (!toast || toast.hidden) return;

  if (retryToastState.hideTimer) {
    window.clearTimeout(retryToastState.hideTimer);
    retryToastState.hideTimer = 0;
  }
  if (retryToastState.removeTimer) {
    window.clearTimeout(retryToastState.removeTimer);
    retryToastState.removeTimer = 0;
  }

  toast.classList.remove("is-visible");

  if (immediate) {
    toast.hidden = true;
    return;
  }

  retryToastState.removeTimer = window.setTimeout(() => {
    toast.hidden = true;
    retryToastState.removeTimer = 0;
  }, 420);
}

// A wrong-answer nudge: "Try again!" plus a brief rule to learn from.
// The clean-run score is already lost for this question, so restating the
// rule helps the learner without affecting the pass threshold.
function showRetryToast(rule = "") {
  playIncorrectSound();
  const toast = getRetryToastElement();
  if (!toast) return;

  bindRetryToastDismissals();

  if (retryToastState.hideTimer) {
    window.clearTimeout(retryToastState.hideTimer);
    retryToastState.hideTimer = 0;
  }
  if (retryToastState.removeTimer) {
    window.clearTimeout(retryToastState.removeTimer);
    retryToastState.removeTimer = 0;
  }

  const ruleHtml = rule ? " " + escapeHtml(rule) : "";
  toast.innerHTML = `<span class="toast-rule"><strong>Try again!</strong>${ruleHtml}</span>`;
  toast.hidden = false;
  toast.classList.remove("is-visible");
  void toast.offsetWidth;
  toast.classList.add("is-visible");

  // Linger longer than the correct toast — there's a rule to read.
  retryToastState.hideTimer = window.setTimeout(() => {
    hideRetryToast();
  }, 3200);
}

// Shows a one-time "Tap any Hangul to hear it" hint the first time a user
// enters each studio. Tracked per studio in localStorage so it only fires once.
function showTapHint(studio) {
  const KEY = "hanapath-tap-hints";
  let seen;
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = JSON.parse(raw || "[]");
    seen = new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    seen = new Set();
  }
  if (seen.has(studio)) return;
  seen.add(studio);
  try { localStorage.setItem(KEY, JSON.stringify([...seen])); } catch { /* ignore */ }

  const toast = document.getElementById("tapHintToast");
  if (!toast) return;
  if (tapHintTimer) { window.clearTimeout(tapHintTimer); tapHintTimer = 0; }
  toast.hidden = false;
  toast.classList.remove("is-visible");
  void toast.offsetWidth;
  toast.classList.add("is-visible");
  tapHintTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
    tapHintTimer = window.setTimeout(() => { toast.hidden = true; tapHintTimer = 0; }, 420);
  }, 4000);
}

function composeHangul(initial, medial, final = "") {
  const initialIndex = INITIALS.indexOf(initial);
  const medialIndex = MEDIALS.indexOf(medial);
  const finalIndex = FINALS.indexOf(final);

  if (initialIndex < 0 || medialIndex < 0 || finalIndex < 0) {
    return "";
  }

  const code = 0xac00 + (initialIndex * 21 + medialIndex) * 28 + finalIndex;
  return String.fromCharCode(code);
}

function decomposeHangul(syllable) {
  const code = syllable.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) {
    return null;
  }

  const initial = INITIALS[Math.floor(code / 588)];
  const medial = MEDIALS[Math.floor((code % 588) / 28)];
  const final = FINALS[code % 28];
  return { initial, medial, final };
}

function normalizeFinal(value) {
  return value === "" ? "없음" : value;
}

function getVowelFamily(vowel) {
  for (const [family, set] of Object.entries(VOWEL_FAMILIES)) {
    if (set.has(vowel)) {
      return family;
    }
  }

  return "unknown";
}

function getConsonantFamily(consonant) {
  if (consonant === "ㅇ") {
    return "support";
  }

  if (Object.values(TENSE_PAIRS).includes(consonant)) {
    return "tense";
  }

  if (["ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"].includes(consonant)) {
    return "aspirated";
  }

  return "plain";
}

function getOnsetType(consonant) {
  if (consonant === "ㅇ") {
    return "silent onset";
  }

  if (Object.values(TENSE_PAIRS).includes(consonant)) {
    return "tense onset";
  }

  if (["ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"].includes(consonant)) {
    return "aspirated onset";
  }

  return "plain onset";
}

function sampleSyllableForVowel(vowel, finals = SIMPLE_FINALS) {
  return composeHangul(randomItem(SIMPLE_INITIALS), vowel, randomItem(finals));
}

function makeSyllableChoices(answer, count = 4, pools = getPools()) {
  const choices = new Set([answer]);

  while (choices.size < count) {
    const candidate = composeHangul(
      randomItem(pools.initials),
      randomItem(pools.medials),
      randomItem(pools.finals),
    );

    if (candidate && candidate !== answer) {
      choices.add(candidate);
    }
  }

  return shuffle([...choices]);
}

function makeTextChoices(answer, pool, count = 4) {
  const choices = new Set([answer]);

  while (choices.size < count) {
    const candidate = randomItem(pool);
    if (candidate !== answer) {
      choices.add(candidate);
    }
  }

  return shuffle([...choices]);
}

function getPools() {
  if (getStudio() === "alphabet") {
    return getAlphabetQuizPools();
  }

  const mastery = getTrackLevel("alphabet");

  if (mastery <= 2) {
    return {
      initials: SIMPLE_INITIALS,
      medials: SIMPLE_MEDIALS,
      finals: SIMPLE_FINALS,
      deck: ["compose", "compose", "compose", "decompose", "decompose", "family"],
      label: "Starter",
    };
  }

  if (mastery <= 4) {
    return {
      initials: SIMPLE_INITIALS,
      medials: SIMPLE_MEDIALS,
      finals: ["", "ㄱ", "ㄴ", "ㅁ", "ㅇ", "ㄷ"],
      deck: ["compose", "compose", "decompose", "decompose", "family", "family", "tense"],
      label: "Builder",
    };
  }

  if (mastery <= 6) {
    return {
      initials: INITIALS,
      medials: MEDIALS,
      finals: ["", "ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅇ", "ㅅ", "ㅆ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
      deck: ["compose", "compose", "decompose", "family", "family", "tense", "batchim"],
      label: "Reader",
    };
  }

  return {
    initials: INITIALS,
    medials: MEDIALS,
    finals: FINALS,
    deck: ["compose", "decompose", "family", "tense", "batchim", "listen"],
    label: "Endless",
  };
}

function getMasteryLabel(correct) {
  if (correct < 4) return "Starter";
  if (correct < 8) return "Builder";
  if (correct < 12) return "Reader";
  if (correct < 20) return "Sound-shift tracker";
  return "Endless drill runner";
}

function updateStats() {
  const session = getPracticeQuizSession(getCurrentQuizScope());
  const asked = session ? session.asked : state.asked;
  const correct = session ? session.correct : state.correct;
  const streak = session ? session.streak : state.streak;
  const bestStreak = session ? session.bestStreak : state.bestStreak;
  const accuracy = asked === 0 ? 0 : Math.min(100, Math.round((correct / asked) * 100));
  const ids = getQuizIds(getCurrentQuizScope());
  const rnd = document.getElementById(ids.round);
  const str = document.getElementById(ids.streak);
  const bst = document.getElementById(ids.best);
  const acc = document.getElementById(ids.accuracy);
  const qmd = document.getElementById(ids.mode);
  if (rnd) rnd.textContent = session ? `${session.index + 1}/${session.total}` : String(state.round);
  if (str) str.textContent = String(streak);
  if (bst) bst.textContent = String(bestStreak);
  if (acc) acc.textContent = `${accuracy}%`;
  if (qmd) qmd.textContent = session ? `${getStudioLabel()} · Session` : `${getStudioLabel()} · ${getMasteryLabel(state.correct)}`;
}

function renderStartOrder() { /* no-op */ }


function validatePhaseOneLessons() {
  const ids = new Set();

  phaseOneLessons.forEach((lesson) => {
    if (
      ids.has(lesson.id) ||
      !Array.isArray(lesson.introCards) ||
      lesson.introCards.length < 1 ||
      lesson.concepts.length < 1 ||
      lesson.questions.length < 4
    ) {
      throw new Error("Invalid Phase 1 lesson: " + lesson.id);
    }

    ids.add(lesson.id);
    lesson.questions.forEach((question) => {
      if (question.type === "build") {
        const tray = new Set(question.tray);
        const blocks = Array.isArray(question.blocks)
          ? question.blocks
          : [{ onset: question.onset, vowel: question.vowel, batchim: question.batchim }];
        const needed = blocks.flatMap((block) =>
          [block.onset, block.vowel].concat(block.batchim ? [block.batchim] : []),
        );
        if (!question.target || !Array.isArray(question.tray) || needed.some((jamo) => !jamo || !tray.has(jamo))) {
          throw new Error("Invalid build question in lesson: " + lesson.id);
        }
        return;
      }
      const uniqueOptions = new Set(question.options);
      if (uniqueOptions.size !== question.options.length || !uniqueOptions.has(question.answer)) {
        throw new Error("Invalid checkpoint question in lesson: " + lesson.id);
      }
    });
  });
}

function getFirstIncompletePhaseOneIndex() {
  return getAlphabetProgress().currentIndex;
}

function isPhaseOneLessonUnlocked(index) {
  return getAlphabetProgress().isLessonUnlocked(index);
}

function resetPhaseOneView(index, mode = "intro", options = {}) {
  resetLessonMotion("alphabet");
  phaseOneView = {
    lessonIndex: index,
    mode,
    introIndex: Number.isInteger(options.introIndex) ? options.introIndex : 0,
    slideIndex: Number.isInteger(options.slideIndex) ? options.slideIndex : 0,
    questionIndex: Number.isInteger(options.questionIndex) ? options.questionIndex : 0,
    results: [],
    hadMistake: false,
    answered: false,
    passed: false,
    reviewingCheckpoint: false,
  };
}

function openPhaseOneLesson(index, shouldScroll = false) {
  if (!isPhaseOneLessonUnlocked(index)) {
    return;
  }

  stopSpeech();
  state.phaseOneActive = index;
  resetPhaseOneView(index);
  saveState();
  renderPhaseOneCourse();

  if (shouldScroll && els.phaseOnePlayer) {
    els.phaseOnePlayer.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function openPreviousPhaseOneLesson(index, shouldScroll = false) {
  if (index <= 0) {
    openLearnStageMenu("alphabet");
    return;
  }

  const previousIndex = index - 1;
  const previousLesson = phaseOneLessons[previousIndex];
  if (!previousLesson) {
    goHub("learn");
    return;
  }

  activeHub = "learn";
  setNavActive("learn");
  state.phaseOneActive = previousIndex;
  state.learnInProgress = true;
  state.route = { hub: "learn", item: "alphabet", stage: previousIndex + 1 };
  resetPhaseOneView(previousIndex, "learn");
  phaseOneView.slideIndex = Math.max(previousLesson.concepts.length - 1, 0);
  saveState();
  showDetailBarWithBack("learn", `Stage ${String(previousIndex + 1).padStart(2, "0")}: ${previousLesson.shortTitle}`, () => openLearnStageMenu("alphabet"), "Alphabet");
  renderPhaseOneCourse();

  if (shouldScroll && els.phaseOnePlayer) {
    els.phaseOnePlayer.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderPhaseOneOverview() {
  const progress = getAlphabetProgress();
  const completedCount = progress.completedCount;
  const percent = Math.round((completedCount / progress.total) * 100);
  const nextIndex = progress.currentIndex;
  const nextLesson = progress.nextLesson;

  els.phaseOneProgressText.textContent = completedCount + " of " + progress.total + " stages";
  els.phaseOneProgressPercent.textContent = percent + "%";
  els.phaseOneProgressBar.setAttribute("aria-valuenow", String(percent));
  els.phaseOneProgressBar.querySelector("span").style.width = percent + "%";
  els.phaseOneNextUp.textContent = nextLesson
    ? "Next up: " + nextLesson.title + ". " + nextLesson.goal
    : "Phase 01 cleared. Keep decoding until the blocks feel immediate.";
  els.continuePhaseOneButton.textContent =
    completedCount === 0 ? "Start Phase 01" : nextLesson ? "Continue with stage " + String(nextIndex + 1).padStart(2, "0") : "Review Phase 01";
  els.phaseOneFinale.hidden = !progress.complete;
}

function renderPhaseOneTrack() {
  const progress = getAlphabetProgress();
  const completedIds = new Set(progress.completedIds);
  els.phaseOneTrack.innerHTML = phaseOneLessons
    .map((lesson, index) => {
      const complete = completedIds.has(lesson.id);
      const locked = !isPhaseOneLessonUnlocked(index);
      const active = index === phaseOneView.lessonIndex;
      const classes = ["track-lesson"];

      if (complete) classes.push("complete");
      if (active) classes.push("active");
      if (locked) classes.push("locked");

      const status = complete ? "✓" : locked ? "Lock" : String(index + 1).padStart(2, "0");
      const stateLabel = complete ? "Complete" : locked ? "Locked" : active ? "In progress" : "Ready";

      return (
        '<button class="' +
        classes.join(" ") +
        '" type="button" data-lesson-index="' +
        index +
        '"' +
        (locked ? " disabled" : "") +
        ' aria-label="Stage ' +
        (index + 1) +
        ": " +
        escapeHtml(lesson.title) +
        ", " +
        stateLabel +
        '">' +
        '<span class="track-number">' +
        status +
        "</span>" +
        '<span class="track-copy"><strong>' +
        escapeHtml(lesson.shortTitle) +
        "</strong><small>" +
        stateLabel +
        "</small></span>" +
        "</button>"
      );
    })
    .join("");
}

function getPhaseOneVoiceSource() {
  const lesson = phaseOneLessons[phaseOneView.lessonIndex];
  if (!lesson) {
    return null;
  }

  if (phaseOneView.mode === "learn") {
    return lesson.concepts[phaseOneView.slideIndex] || null;
  }

  if (phaseOneView.mode === "check") {
    return lesson.questions[phaseOneView.questionIndex] || null;
  }

  if (phaseOneView.mode === "intro") {
    return getPhaseOneIntroCards(lesson)[phaseOneView.introIndex] || null;
  }

  return null;
}

function getPhaseOneVoiceSegments() {
  const source = getPhaseOneVoiceSource();
  if (!source) {
    return [];
  }
  if (source.voiceFromVisual && source.visual) {
    const matches = String(source.visual).match(/[가-힣ㄱ-ㅎㅏ-ㅣ]+/g);
    return matches ? matches.map(speakableForChunk) : [];
  }
  if (source.voiceText) {
    return splitVoiceSequence(source.voiceText);
  }
  // Intro cards carry no voiceText; play any Korean examples in their copy.
  const korean = [source.cool, source.body, source.snag].filter(Boolean).join(" ").match(/[가-힣ㄱ-ㅎㅏ-ㅣ]+/g);
  return korean ? [...new Set(korean)] : [];
}

function getPhaseOneVoiceText() {
  return getPhaseOneVoiceSegments().join(" / ");
}

function getPhaseOneButtonLabel(source, mode = phaseOneView.mode) {
  if (mode === "intro") return "Preview intro";
  if (mode === "learn") return "Hear lesson";
  // On a checkpoint the button plays the question prompt until you answer, so it
  // is "Hear" first and only becomes "Review answer" once an answer is locked in.
  return phaseOneView.answered ? "Review answer" : "Hear";
}

function getPhaseOneProgressLabel(lesson) {
  if (phaseOneView.mode === "intro") {
    return "Before you start";
  }
  if (phaseOneView.mode === "check") {
    return "Question " + (phaseOneView.questionIndex + 1) + " / " + lesson.questions.length;
  }
  if (phaseOneView.mode === "result") {
    return "Lesson complete";
  }
  return "Learn " + (phaseOneView.mode === "intro" ? 1 : phaseOneView.slideIndex + 1) + " / " + lesson.concepts.length;
}

function getPhaseOneProgressPercent(lesson) {
  if (phaseOneView.mode === "check") {
    return Math.round(((phaseOneView.questionIndex + 1) / Math.max(1, lesson.questions.length)) * 100);
  }
  if (phaseOneView.mode === "result") {
    return 100;
  }
  if (phaseOneView.mode === "intro") {
    const introCards = getPhaseOneIntroCards(lesson);
    return Math.round(((phaseOneView.introIndex + 1) / Math.max(1, introCards.length)) * 100);
  }
  return Math.round(((phaseOneView.mode === "intro" ? 1 : phaseOneView.slideIndex + 1) / Math.max(1, lesson.concepts.length)) * 100);
}
// Refresh the checkpoint Hear button label after an answer is recorded.
function refreshPhaseOneHearLabel() {
  if (els.phaseOneHearButton && phaseOneView.mode === "check") {
    els.phaseOneHearButton.textContent = `▶ ${getPhaseOneButtonLabel(getPhaseOneVoiceSource())}`;
  }
}

function getPhaseOneIntroCards(lesson) {
  if (!lesson || !Array.isArray(lesson.introCards) || lesson.introCards.length === 0) {
    return [];
  }

  return lesson.introCards;
}

function getPhaseOneVoiceFlashTargets() {
  const source = getPhaseOneVoiceSource();
  if (!source) {
    return [];
  }

  const drillSegments = source.voiceFromVisual && source.visual
    ? (String(source.visual).match(/[가-힣ㄱ-ㅎㅏ-ㅣ]+/g) || [])
    : splitVoiceSequence(source.voiceText);
  return drillSegments.map((_, index) =>
    Number.isInteger(source.voiceFlashTargets?.[index]) ? source.voiceFlashTargets[index] : index,
  );
}

function splitVoiceSequence(text) {
  return String(text || "")
    .split(/[,\u3001\/·|]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

const HANGUL_INITIAL_ROMAN = [
  "g",
  "kk",
  "n",
  "d",
  "tt",
  "r",
  "m",
  "b",
  "pp",
  "s",
  "ss",
  "",
  "j",
  "jj",
  "ch",
  "k",
  "t",
  "p",
  "h",
];

const HANGUL_MEDIAL_ROMAN = [
  "a",
  "ae",
  "ya",
  "yae",
  "eo",
  "e",
  "yeo",
  "ye",
  "o",
  "wa",
  "wae",
  "oe",
  "yo",
  "u",
  "wo",
  "we",
  "wi",
  "yu",
  "eu",
  "ui",
  "i",
];

// Pronounced final-consonant sound for each of the 28 batchim slots, in
// Unicode order (index 0 = no final). Complex clusters use their spoken value.
const HANGUL_FINAL_ROMAN = [
  "",   // (none)
  "k",  // ㄱ
  "k",  // ㄲ
  "k",  // ㄳ
  "n",  // ㄴ
  "n",  // ㄵ
  "n",  // ㄶ
  "t",  // ㄷ
  "l",  // ㄹ
  "k",  // ㄺ
  "m",  // ㄻ
  "l",  // ㄼ
  "l",  // ㄽ
  "l",  // ㄾ
  "p",  // ㄿ
  "l",  // ㅀ
  "m",  // ㅁ
  "p",  // ㅂ
  "p",  // ㅄ
  "t",  // ㅅ
  "t",  // ㅆ
  "ng", // ㅇ
  "t",  // ㅈ
  "t",  // ㅊ
  "k",  // ㅋ
  "t",  // ㅌ
  "p",  // ㅍ
  "t",  // ㅎ
];

const HANGUL_JAMO_ROMAN = {
  ㄱ: "g",
  ㄲ: "kk",
  ㄴ: "n",
  ㄷ: "d",
  ㄸ: "tt",
  ㄹ: "r",
  ㅁ: "m",
  ㅂ: "b",
  ㅃ: "pp",
  ㅅ: "s",
  ㅆ: "ss",
  ㅇ: "ng",
  ㅈ: "j",
  ㅉ: "jj",
  ㅊ: "ch",
  ㅋ: "k",
  ㅌ: "t",
  ㅍ: "p",
  ㅎ: "h",
  ㅏ: "a",
  ㅐ: "ae",
  ㅑ: "ya",
  ㅒ: "yae",
  ㅓ: "eo",
  ㅔ: "e",
  ㅕ: "yeo",
  ㅖ: "ye",
  ㅗ: "o",
  ㅘ: "wa",
  ㅙ: "wae",
  ㅚ: "oe",
  ㅛ: "yo",
  ㅜ: "u",
  ㅝ: "wo",
  ㅞ: "we",
  ㅟ: "wi",
  ㅠ: "yu",
  ㅡ: "eu",
  ㅢ: "ui",
  ㅣ: "i",
};

// A speakable demo syllable for each bare jamo. Lone consonants/vowels do not
// synthesize well on their own, so consonants are voiced with ㅏ (가, 나 …) and
// vowels with a silent ㅇ onset (아, 어 …). Used for tap-to-hear.
const HANGUL_JAMO_SPEAK = {
  ㄱ: "가", ㄲ: "까", ㄴ: "나", ㄷ: "다", ㄸ: "따", ㄹ: "라", ㅁ: "마",
  ㅂ: "바", ㅃ: "빠", ㅅ: "사", ㅆ: "싸", ㅇ: "아", ㅈ: "자", ㅉ: "짜",
  ㅊ: "차", ㅋ: "카", ㅌ: "타", ㅍ: "파", ㅎ: "하",
  ㅏ: "아", ㅐ: "애", ㅑ: "야", ㅒ: "얘", ㅓ: "어", ㅔ: "에", ㅕ: "여",
  ㅖ: "예", ㅗ: "오", ㅘ: "와", ㅙ: "왜", ㅚ: "외", ㅛ: "요", ㅜ: "우",
  ㅝ: "워", ㅞ: "웨", ㅟ: "위", ㅠ: "유", ㅡ: "으", ㅢ: "의", ㅣ: "이",
};

const HANGUL_COMPLEX_FINAL_INDEX = {
  "\u3133": 3,
  "\u3135": 5,
  "\u3136": 6,
  "\u313A": 9,
  "\u313B": 10,
  "\u313C": 11,
  "\u313D": 12,
  "\u313E": 13,
  "\u313F": 14,
  "\u3140": 15,
  "\u3144": 18,
};

function complexFinalDemo(ch) {
  const index = HANGUL_COMPLEX_FINAL_INDEX[ch];
  return Number.isInteger(index) ? String.fromCharCode(0xC544 + index) : "";
}

// Turn a matched Hangul chunk into something the TTS voice can actually say.
// Full syllables/words speak as-is; bare jamo map to their demo syllable.
function speakableForChunk(chunk) {
  const text = String(chunk || "");
  if (/^[가-힣]+$/.test(text)) return text;
  if (/^[ㄱ-ㅎㅏ-ㅣ]+$/.test(text)) {
    return Array.from(text)
      .map((ch) => HANGUL_JAMO_SPEAK[ch] || complexFinalDemo(ch) || ch)
      .join(" ");
  }
  return text;
}

const CLICKABLE_SOUND_LABEL_SPEAK = {
  a: "\uC544",
  ae: "\uC560",
  ya: "\uC57C",
  yae: "\uC598",
  eo: "\uC5B4",
  e: "\uC5D0",
  yeo: "\uC5EC",
  ye: "\uC608",
  o: "\uC624",
  wa: "\uC640",
  wae: "\uC65C",
  oe: "\uC678",
  yo: "\uC694",
  u: "\uC6B0",
  wo: "\uC6CC",
  we: "\uC6E8",
  wi: "\uC704",
  yu: "\uC720",
  eu: "\uC73C",
  ui: "\uC758",
  i: "\uC774",
  g: "\uAC00",
  kk: "\uAE4C",
  n: "\uB098",
  d: "\uB2E4",
  tt: "\uB530",
  r: "\uB77C",
  m: "\uB9C8",
  b: "\uBC14",
  pp: "\uBE60",
  s: "\uC0AC",
  ss: "\uC2F8",
  j: "\uC790",
  jj: "\uC9DC",
  ch: "\uCC28",
  k: "\uCE74",
  t: "\uD0C0",
  p: "\uD30C",
  h: "\uD558",
  ng: "\uC559",
  "silent (ng)": "\uC544",
};

function speakableForClickableText(text, options = {}) {
  const raw = String(text || "").trim();
  if (!raw) return "";

  if (options.preferSoundLabels) {
    const label = raw.toLowerCase();
    if (CLICKABLE_SOUND_LABEL_SPEAK[label]) {
      return CLICKABLE_SOUND_LABEL_SPEAK[label];
    }
  }

  if (/^[\uAC00-\uD7A3]+$/u.test(raw) || /^[\u3131-\u318E]+$/u.test(raw)) {
    return speakableForChunk(raw);
  }

  const hangulChunks = raw.match(/[\u3131-\u318E\uAC00-\uD7A3]+/gu) || [];
  if (
    hangulChunks.length > 1 &&
    /^[\u3131-\u318E\uAC00-\uD7A3\s+.,/\u00B7|:;()\-\u2013\u2014\u2192\u2190]+$/u.test(raw)
  ) {
    if (typeof lookupAudioUrl === "function" && lookupAudioUrl(raw)) return raw;
    return hangulChunks.map((chunk) => speakableForChunk(chunk)).join(" ");
  }

  return raw;
}

function speakClickableText(text, options = {}) {
  const speechText = speakableForClickableText(text, options);
  if (speechText) void speak(speechText);
}

// ── HANGUL LETTER SRS ──────────────────────────────────────────────
// A lightweight Leitner system so individual letters resurface over days
// until they are truly memorised. Only stages that introduce new jamo enroll
// letters; block geometry, batchim, reading and the mastery test reuse them.
const STAGE_LETTERS = {
  "anchor-vowels": ["ㅏ", "ㅓ", "ㅗ", "ㅜ", "ㅡ", "ㅣ"],
  "base-consonants": ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
  "complete-vowels": ["ㅑ", "ㅕ", "ㅛ", "ㅠ", "ㅐ", "ㅔ", "ㅒ", "ㅖ", "ㅘ", "ㅙ", "ㅚ", "ㅝ", "ㅞ", "ㅟ", "ㅢ"],
  "strong-consonants": ["ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ"],
};

// The teaching "sound" for each letter (initial sound for consonants).
const LETTER_SOUND = {
  ㄱ: "g", ㄲ: "kk", ㄴ: "n", ㄷ: "d", ㄸ: "tt", ㄹ: "r", ㅁ: "m", ㅂ: "b",
  ㅃ: "pp", ㅅ: "s", ㅆ: "ss", ㅇ: "silent (ng)", ㅈ: "j", ㅉ: "jj", ㅊ: "ch",
  ㅋ: "k", ㅌ: "t", ㅍ: "p", ㅎ: "h",
  ㅏ: "a", ㅐ: "ae", ㅑ: "ya", ㅒ: "yae", ㅓ: "eo", ㅔ: "e", ㅕ: "yeo", ㅖ: "ye",
  ㅗ: "o", ㅘ: "wa", ㅙ: "wae", ㅚ: "oe", ㅛ: "yo", ㅜ: "u", ㅝ: "wo", ㅞ: "we",
  ㅟ: "wi", ㅠ: "yu", ㅡ: "eu", ㅢ: "ui", ㅣ: "i",
};

// Leitner box index → milliseconds until the letter is due again.
const LETTER_SRS_INTERVALS = [
  2 * 60 * 1000,                 // box 0: ~2 min (same session)
  20 * 60 * 60 * 1000,           // box 1: ~the next day
  3 * 24 * 60 * 60 * 1000,       // box 2: 3 days
  7 * 24 * 60 * 60 * 1000,       // box 3: 1 week
  16 * 24 * 60 * 60 * 1000,      // box 4: ~2.5 weeks
  35 * 24 * 60 * 60 * 1000,      // box 5: ~5 weeks
];

function getLetterSrs() {
  if (!state.letterSrs || typeof state.letterSrs !== "object") state.letterSrs = {};
  return state.letterSrs;
}

// Enroll a stage's new letters the first time it is cleared (idempotent).
function enrollStageLetters(lessonId) {
  const letters = STAGE_LETTERS[lessonId];
  if (!Array.isArray(letters) || !letters.length) return;
  const srs = getLetterSrs();
  const now = Date.now();
  let added = false;
  letters.forEach((letter) => {
    if (!srs[letter]) {
      srs[letter] = { box: 0, due: now };
      added = true;
    }
  });
  if (added) saveState();
}

// Enroll letters for any already-completed stages (covers existing users).
function backfillLetterSrs() {
  getAlphabetProgress().completedIds.forEach((id) => enrollStageLetters(id));
}

function getEnrolledLetters() {
  return Object.keys(getLetterSrs());
}

function getDueLetters(now = Date.now()) {
  const srs = getLetterSrs();
  return Object.keys(srs)
    .filter((letter) => (srs[letter] && srs[letter].due ? srs[letter].due : 0) <= now)
    .sort((a, b) => srs[a].due - srs[b].due);
}

function getDueLetterCount(now = Date.now()) {
  return getDueLetters(now).length;
}

// Grade one letter review and reschedule it via the Leitner boxes.
function recordLetterReview(letter, correct) {
  const srs = getLetterSrs();
  const entry = srs[letter] || { box: 0, due: Date.now() };
  entry.box = correct ? Math.min(entry.box + 1, LETTER_SRS_INTERVALS.length - 1) : 0;
  entry.due = Date.now() + LETTER_SRS_INTERVALS[entry.box];
  srs[letter] = entry;
  saveState();
}

function romanizeHangulSyllable(char) {
  const code = String(char || "").charCodeAt(0);
  if (!Number.isFinite(code) || code < 0xac00 || code > 0xd7a3) {
    return "";
  }

  const offset = code - 0xac00;
  const initialIndex = Math.floor(offset / 588);
  const medialIndex = Math.floor((offset % 588) / 28);
  const finalIndex = offset % 28;

  return (
    (HANGUL_INITIAL_ROMAN[initialIndex] || "") +
    (HANGUL_MEDIAL_ROMAN[medialIndex] || "") +
    (HANGUL_FINAL_ROMAN[finalIndex] || "")
  );
}

function shouldHideInitialIeungHint(chunk, source, matchIndex) {
  if (chunk !== "ㅇ") {
    return false;
  }

  const tail = String(source || "").slice(matchIndex + chunk.length);
  const nextHangulIndex = tail.search(/[가-힣ㄱ-ㅎㅏ-ㅣ]/);
  const beforeNextHangul = nextHangulIndex === -1 ? tail : tail.slice(0, nextHangulIndex);
  return /[+=]/.test(beforeNextHangul);
}

function romanizeHangulChunk(chunk, source, matchIndex) {
  if (!chunk) {
    return "";
  }

  if (/^[가-힣]+$/.test(chunk)) {
    return Array.from(chunk)
      .map((char) => romanizeHangulSyllable(char))
      .join("");
  }

  if (/^[ㄱ-ㅎㅏ-ㅣ]+$/.test(chunk)) {
    if (shouldHideInitialIeungHint(chunk, source, matchIndex)) {
      return "";
    }

    return Array.from(chunk)
      .map((char) => HANGUL_JAMO_ROMAN[char] || "")
      .join("");
  }

  return "";
}

function renderFlashableHangulText(text, className = "concept-token", { indexOffset = 0 } = {}) {
  const source = String(text || "");
  const pattern = /[가-힣ㄱ-ㅎㅏ-ㅣ]+/g;
  let lastIndex = 0;
  let index = 0;
  const parts = [];

  for (let match = pattern.exec(source); match; match = pattern.exec(source)) {
    if (match.index > lastIndex) {
      parts.push(escapeHtml(source.slice(lastIndex, match.index)));
    }
    const hint = romanizeHangulChunk(match[0], source, match.index);
    const hintHtml = hint
      ? `<span class="visual-hint">${escapeHtml(hint)}</span>`
      : '<span class="visual-hint visual-hint-empty" aria-hidden="true">&#8203;</span>';
    const speakText = speakableForChunk(match[0]);
    parts.push(
      '<span class="visual-stack">' +
        hintHtml +
        `<span class="${className} tappable" role="button" tabindex="0" aria-label="Hear ${escapeHtml(speakText)}" title="Tap to hear" data-flash-index="${index + indexOffset}" data-speak="${escapeHtml(speakText)}">${escapeHtml(match[0])}</span>` +
      "</span>",
    );
    index += 1;
    lastIndex = match.index + match[0].length;
  }

  if (index === 0) {
    return { html: escapeHtml(source), count: 0 };
  }

  if (lastIndex < source.length) {
    parts.push(escapeHtml(source.slice(lastIndex)));
  }

  return { html: parts.join(""), count: index };
}

function renderFlashableHangulPairs(text, className = "concept-token") {
  const source = String(text || "");
  const pattern = /([가-힣ㄱ-ㅎㅏ-ㅣ]+)\s*→\s*([가-힣ㄱ-ㅎㅏ-ㅣ]+)/g;
  let lastIndex = 0;
  let indexOffset = 0;
  const parts = [];

  for (let match = pattern.exec(source); match; match = pattern.exec(source)) {
    if (match.index > lastIndex && source.slice(lastIndex, match.index).trim()) {
      parts.push(escapeHtml(source.slice(lastIndex, match.index)));
    }
    const pair = renderFlashableHangulText(`${match[1]}→${match[2]}`, className, { indexOffset });
    parts.push(`<span class="visual-pair">${pair.html}</span>`);
    indexOffset += pair.count;
    lastIndex = match.index + match[0].length;
  }

  if (!parts.length) return renderFlashableHangulText(source, className);
  if (lastIndex < source.length && source.slice(lastIndex).trim()) {
    parts.push(escapeHtml(source.slice(lastIndex)));
  }
  return { html: parts.join(""), count: indexOffset };
}

function getPhaseOneFlashTargets() {
  if (!els.phaseOneStage) return [];
  const targets = [...els.phaseOneStage.querySelectorAll(".concept-token, .checkpoint-token")];
  if (targets.length) return targets;
  const fallback = els.phaseOneStage.querySelector(".concept-visual, .checkpoint-visual");
  return fallback ? [fallback] : [];
}

let phaseOneVoicePlaybackId = 0;
let speechVoicesCache = [];
let speechAutoSpeakTimer = 0;

function refreshSpeechVoices() {
  if (!("speechSynthesis" in window) || typeof window.speechSynthesis.getVoices !== "function") return;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length) speechVoicesCache = voices;
}

function getSpeechVoices() {
  if (speechVoicesCache.length) return speechVoicesCache;
  refreshSpeechVoices();
  return speechVoicesCache;
}

function scoreKoreanVoice(voice) {
  const lang = String(voice?.lang || "").toLowerCase();
  const name = String(voice?.name || "").toLowerCase();

  let score = 0;
  if (lang === "ko-kr") score += 30;
  else if (lang.startsWith("ko")) score += 24;
  else if (name.includes("korean") || name.includes("한국")) score += 14;
  else return Number.NEGATIVE_INFINITY;

  if (KOREAN_VOICE_HINTS.some((hint) => name.includes(hint))) score += 30;
  if (voice?.localService === false) score += 4;
  if (voice?.default) score += 2;
  if (name.includes("demo") || name.includes("sample") || name.includes("test") || name.includes("basic") || name.includes("fallback")) score -= 12;
  return score;
}

function getPreferredKoreanVoice() {
  const voices = getSpeechVoices();
  if (!voices.length) return null;
  const koreanVoices = voices.filter((voice) => scoreKoreanVoice(voice) > Number.NEGATIVE_INFINITY);
  if (!koreanVoices.length) return null;
  return koreanVoices.reduce((best, voice) => (scoreKoreanVoice(voice) > scoreKoreanVoice(best) ? voice : best), koreanVoices[0]);
}

if ("speechSynthesis" in window && typeof window.speechSynthesis.getVoices === "function") {
  refreshSpeechVoices();
  if ("onvoiceschanged" in window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = refreshSpeechVoices;
  }
}

let currentCustomAudio = null;

function cancelSpeechOutput() {
  if (speechAutoSpeakTimer) {
    window.clearTimeout(speechAutoSpeakTimer);
    speechAutoSpeakTimer = 0;
  }
  if (currentCustomAudio) {
    currentCustomAudio.pause();
    currentCustomAudio.currentTime = 0;
  }
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function stopSpeech() {
  phaseOneVoicePlaybackId += 1;
  cancelSpeechOutput();
}

function scheduleAutoSpeak(text, delay = 160) {
  if (!text) return;
  if (speechAutoSpeakTimer) {
    window.clearTimeout(speechAutoSpeakTimer);
  }
  speechAutoSpeakTimer = window.setTimeout(() => {
    speechAutoSpeakTimer = 0;
    void speak(text);
  }, delay);
}

// Normalize a string before looking it up in AUDIO_MAP. Trimming + Unicode NFC
// means lookups survive equivalent-but-differently-encoded Hangul (e.g. a
// precomposed 가 vs a decomposed ᄀ+ᅡ) instead of silently falling back to TTS.
function normalizeAudioKey(text) {
  return String(text || "").trim().normalize("NFC");
}

// Lazily-built index of AUDIO_MAP keyed by NFC-normalized text, so a lookup can
// still hit a key that was stored in a different normalization form.
let audioMapNfcIndex = null;
function lookupAudioUrl(text) {
  const map = window.AUDIO_MAP;
  if (typeof map === "undefined") return undefined;
  const key = normalizeAudioKey(text);
  if (map[key]) return map[key]; // fast path: stored key already matches
  if (!audioMapNfcIndex) {
    audioMapNfcIndex = Object.create(null);
    for (const storedKey of Object.keys(map)) {
      const normalized = normalizeAudioKey(storedKey);
      if (!(normalized in audioMapNfcIndex)) audioMapNfcIndex[normalized] = map[storedKey];
    }
  }
  return audioMapNfcIndex[key];
}

function speak(text, options = {}) {
  return new Promise((resolve) => {
    if (!text) {
      resolve();
      return;
    }

    const elapsed = Date.now() - lastFeedbackSoundTime;
    if (elapsed < 600) {
      window.setTimeout(() => {
        proceedSpeak(text, options, resolve);
      }, 600 - elapsed);
    } else {
      proceedSpeak(text, options, resolve);
    }
  });
}

function proceedSpeak(text, options, resolve) {
  const { preserveSequence = false } = options;
  if (preserveSequence) {
    cancelSpeechOutput();
  } else {
    stopSpeech();
  }

  if (typeof window.AUDIO_MAP !== 'undefined') {
    const cleanText = normalizeAudioKey(text);
    const audioUrl = lookupAudioUrl(text);

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      let settled = false;

      const finish = () => {
        if (settled) return;
        settled = true;
        if (currentCustomAudio === audio) currentCustomAudio = null;
        resolve();
      };

      // Resolve the shared speech promise when playback stops naturally or is
      // interrupted, so local highlight cleanup can run immediately.
      audio.onended = finish;
      audio.onpause = finish;

      audio.onerror = () => {
        console.warn(`Failed to play ${audioUrl}`);
        if (currentCustomAudio === audio) currentCustomAudio = null;
        if (settled) return;
        settled = true;
        fallbackSpeak(text, resolve);
      };

      currentCustomAudio = audio;
      audio.play().catch(e => {
        if (currentCustomAudio === audio) currentCustomAudio = null;
        if (settled) return;
        settled = true;
        fallbackSpeak(text, resolve);
      });
      return;
    } else {
      console.warn(`No pre-generated audio found for: "${cleanText}"`);
    }
  }

  fallbackSpeak(text, resolve);
}

function fallbackSpeak(text, resolve) {
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance !== "function") {
      resolve();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    const koreanVoice = getPreferredKoreanVoice();
    utterance.lang = koreanVoice?.lang || "ko-KR";
    utterance.rate = SPEAK_RATE;
    utterance.pitch = 1;
    if (koreanVoice) utterance.voice = koreanVoice;

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    utterance.onend = finish;
    utterance.onerror = finish;
    window.speechSynthesis.speak(utterance);
    window.setTimeout(finish, Math.max(1200, String(text).length * 80));
}

async function playPhaseOneVoiceSequence() {
  const voiceText = getPhaseOneVoiceText();
  const voiceParts = getPhaseOneVoiceSegments();
  const voiceFlashTargets = getPhaseOneVoiceFlashTargets();
  const targets = getPhaseOneFlashTargets();
  if (!voiceParts.length) {
    const fallback = targets[0];
    if (fallback) flashElement(fallback);
    await speak(voiceText, { preserveSequence: true });
    return;
  }

  const tokenId = ++phaseOneVoicePlaybackId;
  const resolvedTargets = targets.length ? targets : [];

  for (let index = 0; index < voiceParts.length; index += 1) {
    if (tokenId !== phaseOneVoicePlaybackId) return;
    const targetIndex = voiceFlashTargets[index];
    if (Number.isInteger(targetIndex)) {
      const target = resolvedTargets[targetIndex] || null;
      if (target) flashElement(target);
    }
    const minStepMs = Math.max(PHASE_ONE_VOICE_MIN_STEP_MS, String(voiceParts[index]).length * PHASE_ONE_VOICE_CHAR_MS);
    await Promise.all([
      speak(voiceParts[index], { preserveSequence: true }),
      new Promise((resolve) => window.setTimeout(resolve, minStepMs)),
    ]);
    if (tokenId !== phaseOneVoicePlaybackId) return;
    await new Promise((resolve) => window.setTimeout(resolve, PHASE_ONE_VOICE_GAP_MS));
  }
}

function flashElement(target) {
  if (!target || !target.classList) return;
  target.classList.remove("flash-pulse");
  // Force a reflow so the flash can restart on repeated taps.
  void target.offsetWidth;
  target.classList.add("flash-pulse");
  window.setTimeout(() => {
    target.classList.remove("flash-pulse");
  }, 720);
}

function restorePhaseOneActions() {
  const actions = document.getElementById("hpActions");
  const stage = els.phaseOneStage || document.getElementById("hpStage");
  if (!actions || !stage || !stage.contains(actions)) return;
  stage.insertAdjacentElement("afterend", actions);
}

function placePhaseOneActions() {
  const actions = document.getElementById("hpActions");
  const slot = document.querySelector("[data-phase-one-actions-slot]");
  if (!actions || !slot) return;
  slot.appendChild(actions);
}

// Vertical vowels sit to the right of the onset; all others go below.
const VERTICAL_VOWELS = new Set(["ㅏ","ㅓ","ㅣ","ㅑ","ㅕ","ㅐ","ㅔ","ㅒ","ㅖ"]);

// Renders the jamo of one syllable in their geometric positions (onset, vowel,
// optional batchim). Shows learners why Korean looks the way it does rather than
// just showing the assembled character.
function renderBlockDiagram(onset, vowel, batchim = "") {
  const isVertical = VERTICAL_VOWELS.has(vowel);
  const layoutClass = isVertical ? "bd-vertical" : "bd-horizontal";
  const batchimHtml = batchim ? `<span class="bd-batchim">${escapeHtml(batchim)}</span>` : "";
  return (
    `<div class="block-diagram ${layoutClass}" lang="ko">` +
    `<span class="bd-onset">${escapeHtml(onset)}</span>` +
    `<span class="bd-vowel">${escapeHtml(vowel)}</span>` +
    batchimHtml +
    `</div>`
  );
}

// Renders a row of block-diagram + arrow + assembled-syllable equations.
// diagrams: array of { onset, vowel, batchim?, char? }
// Provide `char` with the pre-composed Unicode syllable (e.g. "나") for correct display.
function renderBlockDiagrams(diagrams) {
  const equations = diagrams.map((d, index) => {
    const assembled = d.char || (d.batchim
      ? (d.onset + d.vowel + d.batchim)
      : (d.onset + d.vowel));
    return (
      `<div class="bd-equation concept-token tappable" role="button" tabindex="0" aria-label="Hear ${escapeHtml(assembled)}" title="Tap to hear" data-flash-index="${index}" data-speak="${escapeHtml(assembled)}">` +
      renderBlockDiagram(d.onset, d.vowel, d.batchim || "") +
      `<span class="bd-arrow">→</span>` +
      `<span class="bd-assembled" lang="ko">${escapeHtml(assembled)}</span>` +
      `</div>`
    );
  });
  return `<div class="bd-showcase">${equations.join("")}</div>`;
}

// Renders a word broken into its syllable blocks with jamo diagrams underneath.
// blocks: array of { char, onset, vowel, batchim? }
function renderWordBreakdown(blocks) {
  const cols = blocks.map((b, i) => {
    const sep = i < blocks.length - 1
      ? `<span class="bd-word-sep" aria-hidden="true">·</span>`
      : "";
    return (
      `<div class="bd-block-col concept-token tappable" role="button" tabindex="0" aria-label="Hear ${escapeHtml(b.char)}" title="Tap to hear" data-flash-index="${i}" data-speak="${escapeHtml(b.char)}">` +
      `<span class="bd-word-char" lang="ko">${escapeHtml(b.char)}</span>` +
      renderBlockDiagram(b.onset, b.vowel, b.batchim || "") +
      `</div>` +
      sep
    );
  });
  return `<div class="bd-word-row">${cols.join("")}</div>`;
}

function animatePhaseOneFrame() {
  const phase = phaseOneView.mode === "check" && phaseOneView.answered ? "feedback" : phaseOneView.mode;
  const order = phaseOneView.mode === "intro"
    ? phaseOneView.introIndex
    : phaseOneView.mode === "learn"
      ? 100 + phaseOneView.slideIndex
      : phaseOneView.mode === "check"
        ? 1000 + phaseOneView.questionIndex
        : 2000;
  const frameIndex = phaseOneView.mode === "intro"
    ? phaseOneView.introIndex
    : phaseOneView.mode === "learn"
      ? phaseOneView.slideIndex
      : phaseOneView.mode === "check"
        ? phaseOneView.questionIndex
        : 0;
  animateLessonFrame(els.phaseOneStage, "alphabet", {
    key: `${phaseOneView.mode}:${frameIndex}`,
    order,
    phase,
    complete: phaseOneView.mode === "result" && phaseOneView.passed,
  });
}

function renderPhaseOneConcept(lesson) {
  restorePhaseOneActions();
  const concept = lesson.concepts[phaseOneView.slideIndex];
  const conceptVisualRenderer = concept.visualLayout === "paired"
    ? renderFlashableHangulPairs
    : renderFlashableHangulText;
  const conceptVisualHtml = concept.diagram
    ? renderBlockDiagrams(concept.diagram)
    : concept.wordBreakdown
      ? renderWordBreakdown(concept.wordBreakdown)
      : conceptVisualRenderer(concept.visual).html;
  els.phaseOneStage.innerHTML =
    '<p class="alphabet-hangul-hint" id="alphabetHangulHint">Click any Hangul to hear it</p>' +
    '<div class="phase-one-action-slot" data-phase-one-actions-slot></div>' +
    '<div class="concept-card">' +
    `<div class="concept-visual${concept.visualLayout === "paired" ? " concept-visual-paired" : ""}" lang="ko" data-phase-one-visual>` +
    conceptVisualHtml +
    "</div>" +
    '<div class="concept-copy">' +
    "<h4>" +
    escapeHtml(concept.title) +
    "</h4>" +
    "<p>" +
    escapeHtml(concept.body) +
    "</p>" +
    '<div class="concept-cue">' +
    renderFlashableHangulText(concept.cue, "concept-token").html +
    "</div>" +
    "</div>" +
    "</div>";

  els.phaseOneBackButton.disabled = false;
  // On the first learn card, "back" steps into the stage's intro cards if it has
  // any (so it's still a card step, not a stage jump); only a stage with no intro
  // cards shows "Prev stage" here.
  els.phaseOneBackButton.textContent =
    phaseOneView.slideIndex > 0 || getPhaseOneIntroCards(lesson).length > 0
      ? "Prev card"
      : "Return to lessons";
  els.phaseOneActionButton.disabled = false;
  els.phaseOneActionButton.textContent =
    phaseOneView.slideIndex === lesson.concepts.length - 1
      ? phaseOneView.reviewingCheckpoint ? "Return to questions" : "Start questions"
      : "Next card";
  placePhaseOneActions();
  animatePhaseOneFrame();
}

function renderPhaseOneIntro(lesson) {
  restorePhaseOneActions();
  const introCards = getPhaseOneIntroCards(lesson);
  const introCard = introCards[phaseOneView.introIndex] || introCards[0] || null;
  const bullets = Array.isArray(introCard?.bullets) ? introCard.bullets.filter(Boolean) : [];
  els.phaseOneStage.innerHTML =
    '<p class="alphabet-hangul-hint intro-hangul-hint">Tap any Hangul to hear it</p>' +
    '<div class="phase-one-action-slot" data-phase-one-actions-slot></div>' +
    '<div class="lesson-intro-card concept-card">' +
    (introCard?.kicker ? '<p class="concept-kicker">' + escapeHtml(introCard.kicker) + "</p>" : "") +
    "<h4>" +
    escapeHtml(introCard?.title || lesson.shortTitle) +
    "</h4>" +
    '<p class="intro-body">' +
    escapeHtml(introCard?.body || lesson.goal) +
    "</p>" +
    '<div class="intro-grid">' +
    '<div><strong>You\'ll learn</strong>' +
    (bullets.length
      ? "<ul>" + bullets.map((bullet) => "<li>" + escapeHtml(bullet) + "</li>").join("") + "</ul>"
      : "<p>" + escapeHtml(lesson.goal) + "</p>") +
    "</div>" +
    '<div><strong>Watch out for</strong>' +
    "<p>" +
    escapeHtml(introCard?.snag || lesson.goal) +
    "</p>" +
    "</div>" +
    "</div>" +
    '<div class="concept-cue">' +
    renderFlashableHangulText(introCard?.cool || lesson.goal, "concept-token").html +
    "</div>" +
    "</div>";

  els.phaseOneBackButton.disabled = false;
  els.phaseOneBackButton.textContent =
    phaseOneView.introIndex > 0
      ? "Prev card"
      : "Return to lessons";
  els.phaseOneActionButton.disabled = false;
  els.phaseOneActionButton.textContent =
    phaseOneView.introIndex === introCards.length - 1 ? "Start lesson" : "Next card";
  placePhaseOneActions();
  animatePhaseOneFrame();
}

let checkpointPlaybackId = 0;

function getQuestionComponents(question) {
  const components = [];

  if (question.visual && String(question.visual).includes("+")) {
    String(question.visual)
      .split("+")
      .forEach(part => {
        const trimmed = part.trim();
        if (trimmed && /^[가-힣ㄱ-ㅎㅏ-ㅣ]+$/.test(trimmed)) {
          components.push(trimmed);
        }
      });
  }
  else if (question.type === "build") {
    if (Array.isArray(question.blocks)) {
      question.blocks.forEach(block => {
        if (block.onset) components.push(block.onset);
        if (block.vowel) components.push(block.vowel);
        if (block.batchim) components.push(block.batchim);
      });
    } else {
      if (question.onset) components.push(question.onset);
      if (question.vowel) components.push(question.vowel);
      if (question.batchim) components.push(question.batchim);
    }
  }
  else if (question.visual && /^[가-힣]+$/.test(String(question.visual).trim())) {
    const text = String(question.visual).trim();
    if (window.Hangul) {
      components.push(...window.Hangul.disassemble(text));
    }
  }

  return components.filter(Boolean);
}

function renderCheckpointVisualHtml(question) {
  const visualText = String(question.visual || "").trim();
  const components = getQuestionComponents(question);

  let html = '<div class="checkpoint-visual-container">';

  if (visualText.includes("+")) {
    html += '<div class="components-breakdown">';
    const parts = visualText.split("+");
    parts.forEach((part, index) => {
      const trimmed = part.trim();
      html += `<span class="visual-comp" data-comp-index="${index}">${escapeHtml(trimmed)}</span>`;
      if (index < parts.length - 1) {
        html += '<span class="visual-op">+</span>';
      }
    });
    html += '</div>';
  } else {
    html += `<div class="visual-target" data-visual-target>${escapeHtml(visualText)}</div>`;
    if (components.length > 0) {
      html += '<div class="components-breakdown">';
      components.forEach((comp, index) => {
        html += `<span class="visual-comp" data-comp-index="${index}">${escapeHtml(comp)}</span>`;
        if (index < components.length - 1) {
          html += '<span class="visual-op">+</span>';
        }
      });
      html += '</div>';
    }
  }

  html += '</div>';
  return html;
}

// Standalone "open the alphabet quick reference" button for lesson screens that
// have no checkpoint audio-helper row (intro cards, learn cards, result/review).
// Uses the same data hook as the checkpoint button so the delegated stage click
// handler opens the reference from any Phase One state.
function phaseOneReferenceButtonHtml() {
  return '<div class="phase-one-reference-row" style="margin: 16px 0 0; display: flex; justify-content: center;">' +
    '<button class="button secondary compact" type="button" data-checkpoint-open-reference style="font-size: 0.85rem; padding: 6px 12px; display: inline-flex; align-items: center; gap: 6px;">📖 View Alphabet Reference</button>' +
    '</div>';
}

function alphabetPracticeProgressHtml(label, current = 0, total = 0, allowReference = true) {
  const safeTotal = Math.max(0, Number(total) || 0);
  const safeCurrent = safeTotal ? Math.min(safeTotal, Math.max(0, Number(current) || 0)) : 0;
  const pct = safeTotal ? Math.round((safeCurrent / safeTotal) * 100) : 0;
  const progressLabel = safeTotal ? `${label} · ${safeCurrent} of ${safeTotal}` : label;
  return `<div class="word-card-progress-row alphabet-practice-progress">
    <div class="word-card-progress-tile"><div class="eyebrow">${escapeHtml(progressLabel)}</div><div class="word-card-progress-track" aria-hidden="true"><span style="width:${pct}%;"></span></div></div>
    ${allowReference ? '<button class="button secondary compact word-card-bank-button alphabet-reference-button" type="button" data-checkpoint-open-reference>📚 Reference</button>' : ""}
  </div>`;
}

function bindAlphabetReferenceButtons(container) {
  container?.querySelectorAll("[data-checkpoint-open-reference]").forEach((button) => {
    button.addEventListener("click", () => {
      state.quickRefActive = true;
      openEntireAlphabet();
    });
  });
}

function renderCheckpointAudioHelpers(lesson, question) {
  const isBlockGeometry = lesson.id === "block-geometry";
  const isBuildQuestion = question.type === "build";
  const components = (isBlockGeometry || isBuildQuestion) ? getQuestionComponents(question) : [];
  const targetText = isBlockGeometry || isBuildQuestion ? (question.voiceText || question.target || question.answer || "") : "";
  const hasTarget = targetText && /^[가-힣ㄱ-ㅎㅏ-ㅣ\s]+$/.test(targetText);
  const hasComponents = components.length > 0;

  if (!hasTarget && !hasComponents) return "";

  let html = '<div class="checkpoint-audio-helpers">';

  if (hasTarget) {
    html += '<button class="checkpoint-audio-tile" type="button" data-checkpoint-speak-target="' + escapeHtml(targetText) + '"><span class="checkpoint-audio-icon" aria-hidden="true">▶</span><span class="checkpoint-audio-copy"><strong>Hear target</strong><small>Full syllable</small></span></button>';
  }

  if (hasComponents) {
    html += '<button class="checkpoint-audio-tile" type="button" data-checkpoint-speak-components="' + escapeHtml(components.join(",")) + '"><span class="checkpoint-audio-icon checkpoint-audio-icon-parts" aria-hidden="true">••</span><span class="checkpoint-audio-copy"><strong>Hear building blocks</strong><small>Sound by sound</small></span></button>';
  }

  html += '</div>';
  return html;
}

function bindCheckpointAudioHelpers(container, lesson) {
  // The quick-reference button (data-checkpoint-open-reference) is handled by the
  // delegated stage click listener in mountLessonPlayer, so it works from every
  // Phase One screen and needs no per-render binding here.
  const question = phaseOneView.mode === "check"
    ? phaseOneLessons[phaseOneView.lessonIndex]?.questions?.[phaseOneView.questionIndex]
    : null;
  if (lesson.id !== "block-geometry" && question?.type !== "build") return;

  const targetBtn = container.querySelector("[data-checkpoint-speak-target]");
  const componentsBtn = container.querySelector("[data-checkpoint-speak-components]");

  if (targetBtn) {
    targetBtn.addEventListener("click", async () => {
      checkpointPlaybackId += 1;
      const tokenId = checkpointPlaybackId;
      const text = targetBtn.getAttribute("data-checkpoint-speak-target") || "";

      container.querySelectorAll(".visual-comp, [data-visual-target]").forEach(el => el.classList.remove("active-highlight"));

      const targetEl = container.querySelector("[data-visual-target]");
      if (targetEl) targetEl.classList.add("active-highlight");

      await speak(text);

      if (tokenId === checkpointPlaybackId && targetEl) {
        targetEl.classList.remove("active-highlight");
      }
    });
  }

  if (componentsBtn) {
    componentsBtn.addEventListener("click", async () => {
      const tokenId = ++checkpointPlaybackId;
      const parts = (componentsBtn.getAttribute("data-checkpoint-speak-components") || "").split(",").filter(Boolean);

      container.querySelectorAll(".visual-comp, [data-visual-target]").forEach(el => el.classList.remove("active-highlight"));

      for (let i = 0; i < parts.length; i++) {
        if (tokenId !== checkpointPlaybackId) return;
        const speakText = speakableForChunk(parts[i]);

        const compEl = container.querySelector(`.visual-comp[data-comp-index="${i}"]`);
        if (compEl) compEl.classList.add("active-highlight");

        await Promise.all([
          speak(speakText, { preserveSequence: true }),
          new Promise((resolve) => window.setTimeout(resolve, 800))
        ]);

        if (compEl) compEl.classList.remove("active-highlight");

        if (tokenId !== checkpointPlaybackId) return;
        await new Promise((resolve) => window.setTimeout(resolve, 200));
      }
    });
  }

  // Bind speak option buttons next to choices
  container.querySelectorAll(".speak-option-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      checkpointPlaybackId += 1;
      const text = btn.getAttribute("data-speak-option") || "";
      speakClickableText(text, { preferSoundLabels: true });
    });
  });
}

function renderPhaseOneQuestion(lesson) {
  const question = lesson.questions[phaseOneView.questionIndex];
  if (question.type === "build") {
    renderPhaseOneBuildQuestion(lesson, question);
    return;
  }
  restorePhaseOneActions();
  if (lesson.id === "block-geometry") {
    const visualHtml = renderCheckpointVisualHtml(question);
    const audioHelpersHtml = renderCheckpointAudioHelpers(lesson, question);

    els.phaseOneStage.innerHTML =
      '<p class="alphabet-hangul-hint" id="alphabetHangulHint">Click any Hangul to hear it</p>' +
      '<div class="phase-one-action-slot" data-phase-one-actions-slot></div>' +
      '<div class="checkpoint-card">' +

      '<div class="checkpoint-split-layout">' +
        '<div class="checkpoint-left-pane">' +
          visualHtml +
          audioHelpersHtml +
        '</div>' +
        '<div class="checkpoint-right-pane">' +
          "<h4>" + escapeHtml(question.prompt) + "</h4>" +
          "<p style=\"margin-bottom: 16px;\">" + escapeHtml(question.detail) + "</p>" +
          '<div class="lesson-options">' +
            shuffle([...question.options])
              .map(
                (option) => {
                  return '<div class="lesson-option-row">' +
                    '<button class="lesson-option" type="button" ' + textLanguageAttr(option) + ' data-option="' + escapeHtml(option) + '"><span class="lesson-option-label">' + escapeHtml(option) + '</span></button>' +
                    (option !== "No letter" && option !== "To the right" && option !== "Below the consonant" && option !== "On the floor" && option !== "Above the block"
                      ? '<button class="button secondary compact speak-option-btn" type="button" data-speak-option="' + escapeHtml(option) + '" aria-label="Hear option ' + escapeHtml(option) + '">🔊</button>'
                      : '') +
                  '</div>';
                }
              )
              .join("") +
          "</div>" +
        '</div>' +
      '</div>' +

      '<div class="lesson-feedback" id="phaseOneFeedback" aria-live="polite"></div>' +
      "</div>";

    bindCheckpointAudioHelpers(els.phaseOneStage, lesson);
  } else {
    const isDirectionalPrompt = question.visual === "right →";
    const questionVisual = isDirectionalPrompt ? { html: "" } : renderFlashableHangulText(question.visual, "checkpoint-token");
    const questionPrompt = isDirectionalPrompt ? question.prompt + " →" : question.prompt;

    els.phaseOneStage.innerHTML =
      '<p class="alphabet-hangul-hint" id="alphabetHangulHint">Click any Hangul to hear it</p>' +
      '<div class="phase-one-action-slot" data-phase-one-actions-slot></div>' +
      '<div class="checkpoint-card">' +
      (questionVisual.html
        ? '<div class="checkpoint-visual" lang="ko" data-phase-one-visual>' + questionVisual.html + "</div>"
        : "") +
      "<h4>" +
      escapeHtml(questionPrompt) +
      "</h4>" +
      "<p>" +
      escapeHtml(question.detail) +
      "</p>" +
      renderCheckpointAudioHelpers(lesson, question) +
      '<div class="lesson-options">' +
      shuffle([...question.options])
        .map(
          (option) =>
            '<button class="lesson-option" type="button" ' + textLanguageAttr(option) + ' data-option="' +
            escapeHtml(option) +
            '">' +
            escapeHtml(option) +
            "</button>",
        )
        .join("") +
      "</div>" +
      '<div class="lesson-feedback" id="phaseOneFeedback" aria-live="polite"></div>' +
      "</div>";

    bindCheckpointAudioHelpers(els.phaseOneStage, lesson);
  }

  els.phaseOneBackButton.disabled = false;
  els.phaseOneBackButton.textContent = "Review cards";
  els.phaseOneActionButton.disabled = true;
  els.phaseOneActionButton.textContent =
    phaseOneView.questionIndex === lesson.questions.length - 1 ? "See result" : "Next question";
  placePhaseOneActions();
  if (phaseOneView.answered) restoreAnsweredChoiceVisual(question);
  animatePhaseOneFrame();
}

function renderPhaseOneResult(lesson) {
  restorePhaseOneActions();
  const cleanCount = phaseOneView.results.filter(Boolean).length;
  const total = lesson.questions.length;
  const percent = Math.round((cleanCount / total) * 100);
  const requiredPercent = lesson.id === "alphabet-mastery" ? 85 : lesson.id === "reading-graduation" ? 80 : 75;
  const passed = percent >= requiredPercent;
  phaseOneView.passed = passed;

  if (passed && !getAlphabetProgress().completedIds.includes(lesson.id)) {
    state.phaseOneCompleted.push(lesson.id);
    enrollStageLetters(lesson.id);
    saveState();
    refreshProgressionState();
  }

  els.phaseOneStage.innerHTML = premiumCompletionHtml({
    tone: passed ? "success" : "retry",
    icon: passed ? "check" : "retry",
    eyebrow: passed ? "Stage cleared" : "One more clean run",
    title: passed ? `${lesson.shortTitle} is locked in` : "Review, then try the checkpoint again",
    copy: passed
      ? `You answered ${percent}% correctly on the first try. The next stage is now open.`
      : `You scored ${percent}% clean. Reach ${requiredPercent}% to unlock the next stage.`,
    score: { value: `${percent}%`, label: "First-try accuracy" },
    stats: [
      { value: `${cleanCount}/${total}`, label: "Clean answers" },
      { value: `${requiredPercent}%`, label: "Pass target" },
    ],
    celebrate: passed,
    className: "alphabet-checkpoint-result",
  });

  els.phaseOneBackButton.disabled = false;
  els.phaseOneBackButton.textContent = "Review lesson";
  els.phaseOneActionButton.disabled = false;
  els.phaseOneActionButton.textContent = passed
    ? phaseOneView.lessonIndex === phaseOneLessons.length - 1
      ? "Open mastery drill"
      : "Start next stage"
    : "Retry checkpoint";

  renderPhaseOneOverview();
  renderPhaseOneTrack();
  animatePhaseOneFrame();
}

function renderPhaseOnePlayer() {
  const lesson = phaseOneLessons[phaseOneView.lessonIndex];
  if (!lesson) {
    return;
  }

  const playerHead = els.phaseOnePlayer && els.phaseOnePlayer.querySelector(".player-head");
  if (playerHead) playerHead.style.display = "";
  if (els.phaseOneActionButton) els.phaseOneActionButton.style.display = "";
  if (els.phaseOneHearButton) els.phaseOneHearButton.style.display = "";
  if (els.phaseOneBackButton) els.phaseOneBackButton.onclick = null;

  els.phaseOneStageNumber.textContent = getPhaseOneProgressLabel(lesson);
  const progressBar = document.getElementById("hpProgressBar");
  if (progressBar) {
    progressBar.style.width = getPhaseOneProgressPercent(lesson) + "%";
  }
  els.phaseOneStageDuration.textContent = lesson.duration;
  els.phaseOneStageTitle.textContent = lesson.title;
  els.phaseOneStageGoal.textContent = lesson.goal;

  if (phaseOneView.mode === "intro") {
    renderPhaseOneIntro(lesson);
  } else if (phaseOneView.mode === "learn") {
    renderPhaseOneConcept(lesson);
  } else if (phaseOneView.mode === "check") {
    renderPhaseOneQuestion(lesson);
  } else {
    renderPhaseOneResult(lesson);
  }

  const showReference = phaseOneView.mode !== "check" || phaseOneView.answered;
  if (els.phaseOneReferenceButton) {
    els.phaseOneReferenceButton.style.display = showReference ? "" : "none";
  }
  if (els.phaseOneHearButton) {
    const hasVoice = !!getPhaseOneVoiceText();
    if (showReference || !hasVoice) {
      els.phaseOneHearButton.style.display = "none";
      els.phaseOneHearButton.disabled = true;
    } else {
      els.phaseOneHearButton.style.display = "";
      els.phaseOneHearButton.disabled = !hasVoice;
      els.phaseOneHearButton.textContent = `▶ ${getPhaseOneButtonLabel(getPhaseOneVoiceSource())}`;
    }
  }
}

function renderPhaseOneCourse() {
  const progress = getAlphabetProgress();
  const firstIncomplete = progress.currentIndex;
  if (
    !progress.completedIds.includes(phaseOneLessons[phaseOneView.lessonIndex]?.id) &&
    phaseOneView.lessonIndex > firstIncomplete
  ) {
    const safeIndex = Math.min(firstIncomplete, phaseOneLessons.length - 1);
    state.phaseOneActive = safeIndex;
    resetPhaseOneView(safeIndex);
  }

  renderPhaseOneOverview();
  renderPhaseOneTrack();
  renderPhaseOnePlayer();
}

function restoreAnsweredChoiceVisual(question) {
  const feedback = document.getElementById("phaseOneFeedback");
  els.phaseOneStage.querySelectorAll(".lesson-option").forEach((b) => {
    b.disabled = true;
    if ((b.dataset.option || "") === question.answer) b.classList.add("correct");
  });
  if (feedback) {
    feedback.classList.add("correct");
    feedback.innerHTML = "<strong>Correct.</strong> " + escapeHtml(question.explanation || "");
  }
  els.phaseOneActionButton.disabled = false;
  refreshPhaseOneHearLabel();
}

function restoreAnsweredBuildVisual(question) {
  const seq = phaseOneView.buildSeq || [];
  seq.forEach((jamo, i) => {
    const slotEl = els.phaseOneStage.querySelector('[data-build-slot="' + i + '"]');
    if (slotEl) {
      slotEl.textContent = jamo;
      slotEl.classList.add("filled");
      slotEl.removeAttribute("aria-hidden");
    }
  });
  phaseOneView.buildFilled = [...seq];
  const assembledEl = els.phaseOneStage.querySelector("[data-build-assembled]");
  if (assembledEl) {
    assembledEl.textContent = question.target;
    assembledEl.classList.add("done");
  }
  els.phaseOneStage.querySelectorAll(".bd-tile").forEach((t) => { t.disabled = true; });
  const feedback = document.getElementById("phaseOneFeedback");
  if (feedback) feedback.innerHTML = "<strong>Correct.</strong> " + escapeHtml(question.explanation || "");
  els.phaseOneActionButton.disabled = false;
  refreshPhaseOneHearLabel();
}

function answerPhaseOneQuestion(choice, button) {
  if (phaseOneView.mode !== "check" || phaseOneView.answered) {
    return;
  }

  const lesson = phaseOneLessons[phaseOneView.lessonIndex];
  const question = lesson.questions[phaseOneView.questionIndex];
  const feedback = document.getElementById("phaseOneFeedback");
  const buttons = [...els.phaseOneStage.querySelectorAll(".lesson-option")];

  if (choice !== question.answer) {
    phaseOneView.hadMistake = true;
    button.classList.add("wrong");
    button.disabled = true;
    const rule = question.explanation || question.detail || "Use the shape clue and try another answer.";
    feedback.className = "lesson-feedback wrong";
    feedback.innerHTML = "<strong>Not yet.</strong> " + escapeHtml(rule);
    showRetryToast(rule);
    speakClickableText(choice, { preferSoundLabels: true });
    return;
  }

  phaseOneView.answered = true;
  phaseOneView.results.push(!phaseOneView.hadMistake);
  buttons.forEach((optionButton) => {
    optionButton.disabled = true;
    if ((optionButton.dataset.option || "") === question.answer) {
      optionButton.classList.add("correct");
    }
  });
  feedback.className = "lesson-feedback correct";
  feedback.innerHTML = "<strong>Correct.</strong> " + escapeHtml(question.explanation);
  showCorrectToast();
  speakClickableText(choice, { preferSoundLabels: true });
  els.phaseOneActionButton.disabled = false;
  if (els.phaseOneReferenceButton) els.phaseOneReferenceButton.style.display = "";
  refreshPhaseOneHearLabel();
}

// Interactive "build" checkpoint: the learner assembles a target syllable —
// or a whole word of several syllables — by tapping jamo tiles in order
// (onset → vowel → optional batchim, block by block), each landing in its real
// geometric seat. Scoring mirrors the multiple-choice path: a clean
// (no-mistake) build counts toward the pass threshold.
function renderPhaseOneBuildQuestion(lesson, question) {
  restorePhaseOneActions();

  // Normalize single-syllable and multi-syllable builds to a list of blocks.
  const blocks = Array.isArray(question.blocks)
    ? question.blocks
    : [{ onset: question.onset, vowel: question.vowel, batchim: question.batchim }];

  const seq = [];
  const roles = [];
  const slotSpan = (cls, slotIndex) =>
    `<span class="${cls} bd-slot" data-build-slot="${slotIndex}" aria-hidden="true">·</span>`;
  const diagram = blocks
    .map((block) => {
      const layoutClass = VERTICAL_VOWELS.has(block.vowel) ? "bd-vertical" : "bd-horizontal";
      let html = `<div class="block-diagram ${layoutClass} bd-build" lang="ko">`;
      html += slotSpan("bd-onset", seq.length);
      seq.push(block.onset);
      roles.push("onset");
      html += slotSpan("bd-vowel", seq.length);
      seq.push(block.vowel);
      roles.push("vowel");
      if (block.batchim) {
        html += slotSpan("bd-batchim", seq.length);
        seq.push(block.batchim);
        roles.push("batchim");
      }
      return html + "</div>";
    })
    .join('<span class="bd-word-sep" aria-hidden="true">·</span>');

  const previousFilled =
    phaseOneView.buildQuestionIndex === phaseOneView.questionIndex && Array.isArray(phaseOneView.buildFilled)
      ? phaseOneView.buildFilled.slice(0, seq.length)
      : [];
  phaseOneView.buildSeq = seq;
  phaseOneView.buildRoles = roles;
  phaseOneView.buildQuestionIndex = phaseOneView.questionIndex;
  phaseOneView.buildFilled = previousFilled;

  const tiles = shuffle([...question.tray])
    .map(
      (jamo) =>
        `<button class="bd-tile" type="button" data-jamo="${escapeHtml(jamo)}" lang="ko" aria-label="Korean letter ${escapeHtml(jamo)}">${escapeHtml(jamo)}</button>`,
    )
    .join("");

  els.phaseOneStage.innerHTML =
    '<p class="alphabet-hangul-hint" id="alphabetHangulHint">Click any Hangul to hear it</p>' +
    '<div class="phase-one-action-slot" data-phase-one-actions-slot></div>' +
    '<div class="checkpoint-card">' +
    "<h4>" +
    escapeHtml(question.prompt) +
    "</h4>" +
    "<p>" +
    escapeHtml(question.detail) +
    "</p>" +
    renderCheckpointAudioHelpers(lesson, question) +
    '<div class="bd-builder">' +
    diagram +
    '<span class="bd-arrow">→</span>' +
    '<span class="bd-assembled bd-build-result" data-build-assembled lang="ko">?</span>' +
    "</div>" +
    '<div class="bd-tray" role="group" aria-label="Letter tiles">' +
    tiles +
    "</div>" +
    '<div class="lesson-feedback" id="phaseOneFeedback" aria-live="polite"></div>' +
    "</div>";

  bindCheckpointAudioHelpers(els.phaseOneStage, lesson);
  previousFilled.forEach((jamo, slotIndex) => {
    const slotEl = els.phaseOneStage.querySelector('[data-build-slot="' + slotIndex + '"]');
    if (slotEl) {
      slotEl.textContent = jamo;
      slotEl.classList.add("filled");
      slotEl.removeAttribute("aria-hidden");
    }
  });

  els.phaseOneBackButton.disabled = false;
  els.phaseOneBackButton.textContent = "Review cards";
  els.phaseOneActionButton.disabled = true;
  els.phaseOneActionButton.textContent =
    phaseOneView.questionIndex === lesson.questions.length - 1 ? "See result" : "Next question";
  placePhaseOneActions();
  if (phaseOneView.answered) restoreAnsweredBuildVisual(question);
  animatePhaseOneFrame();
}

function answerPhaseOneBuild(jamo, tile) {
  if (phaseOneView.mode !== "check" || phaseOneView.answered) {
    return;
  }

  const lesson = phaseOneLessons[phaseOneView.lessonIndex];
  const question = lesson.questions[phaseOneView.questionIndex];
  const seq = phaseOneView.buildSeq || [];
  const roles = phaseOneView.buildRoles || [];
  const filled = phaseOneView.buildFilled || [];
  const feedback = document.getElementById("phaseOneFeedback");
  const slotIndex = filled.length;
  const roleLabel = (role) =>
    role === "vowel" ? "vowel" : role === "batchim" ? "final consonant" : "consonant";
  const slotName = roleLabel(roles[slotIndex]);
  speakClickableText(jamo, { preferSoundLabels: true });

  if (jamo !== seq[slotIndex]) {
    phaseOneView.hadMistake = true;
    tile.classList.add("wrong");
    setTimeout(() => tile.classList.remove("wrong"), 600);
    const rule = "That is not the " + slotName + " you need next.";
    feedback.innerHTML = "<strong>Not yet.</strong> " + escapeHtml(rule);
    showRetryToast(rule);
    return;
  }

  filled.push(jamo);
  phaseOneView.buildFilled = filled;
  const slotEl = els.phaseOneStage.querySelector('[data-build-slot="' + slotIndex + '"]');
  if (slotEl) {
    slotEl.textContent = jamo;
    slotEl.classList.add("filled");
    slotEl.removeAttribute("aria-hidden");
    flashElement(slotEl);
  }

  if (filled.length >= seq.length) {
    phaseOneView.answered = true;
    phaseOneView.results.push(!phaseOneView.hadMistake);
    const assembledEl = els.phaseOneStage.querySelector("[data-build-assembled]");
    if (assembledEl) {
      assembledEl.outerHTML =
        '<button class="bd-assembled bd-build-result done" type="button" data-build-assembled data-speak="' +
        escapeHtml(question.target) +
        '" lang="ko" aria-label="Hear completed block ' +
        escapeHtml(question.target) +
        '">' +
        escapeHtml(question.target) +
        "</button>";
    }
    els.phaseOneStage.querySelectorAll(".bd-tile").forEach((t) => {
      t.disabled = true;
    });
    feedback.innerHTML = "<strong>Correct.</strong> " + escapeHtml(question.explanation);
    showCorrectToast();
    els.phaseOneActionButton.disabled = false;
    if (els.phaseOneReferenceButton) els.phaseOneReferenceButton.style.display = "";
    refreshPhaseOneHearLabel();
  } else {
    feedback.innerHTML = "<strong>Nice.</strong> " + escapeHtml("Now the " + roleLabel(roles[filled.length]) + ".");
  }
}

function advancePhaseOne() {
  const lesson = phaseOneLessons[phaseOneView.lessonIndex];

  if (phaseOneView.mode === "intro") {
    const introCards = getPhaseOneIntroCards(lesson);
    if (phaseOneView.introIndex < introCards.length - 1) {
      phaseOneView.introIndex += 1;
    } else {
      phaseOneView.mode = "learn";
      phaseOneView.slideIndex = 0;
    }
    renderPhaseOnePlayer();
    return;
  }

  if (phaseOneView.mode === "learn") {
    if (phaseOneView.slideIndex < lesson.concepts.length - 1) {
      phaseOneView.slideIndex += 1;
    } else {
      if (phaseOneView.reviewingCheckpoint) {
        phaseOneView.mode = "check";
        phaseOneView.reviewingCheckpoint = false;
      } else {
        phaseOneView.mode = "check";
        phaseOneView.questionIndex = 0;
        phaseOneView.results = [];
        phaseOneView.hadMistake = false;
        phaseOneView.answered = false;
      }
    }
    renderPhaseOnePlayer();
    return;
  }

  if (phaseOneView.mode === "check") {
    if (!phaseOneView.answered) {
      return;
    }

    if (phaseOneView.questionIndex < lesson.questions.length - 1) {
      phaseOneView.questionIndex += 1;
      phaseOneView.hadMistake = false;
      phaseOneView.answered = false;
      renderPhaseOnePlayer();
    } else {
      phaseOneView.mode = "result";
      renderPhaseOnePlayer();
    }
    return;
  }

  if (!phaseOneView.passed) {
    phaseOneView.mode = "check";
    phaseOneView.questionIndex = 0;
    phaseOneView.results = [];
    phaseOneView.hadMistake = false;
    phaseOneView.answered = false;
    renderPhaseOnePlayer();
    return;
  }

  if (phaseOneView.lessonIndex < phaseOneLessons.length - 1) {
    openPhaseOneLesson(phaseOneView.lessonIndex + 1, true);
    return;
  }

  refreshProgressionState();
  setStudio(getDefaultStudioForLevel());
  window.location.hash = "#drill";
}

function goBackPhaseOne() {
  const lesson = phaseOneLessons[phaseOneView.lessonIndex];
  if (phaseOneView.mode === "intro") {
    if (phaseOneView.introIndex > 0) {
      phaseOneView.introIndex -= 1;
      renderPhaseOnePlayer();
      return;
    }

    phaseOneView.reviewingCheckpoint = false;
    openLearnStageMenu("alphabet");
    return;
  }

  if (phaseOneView.mode === "learn") {
    if (phaseOneView.slideIndex > 0) {
      phaseOneView.slideIndex -= 1;
      renderPhaseOnePlayer();
      saveState();
      return;
    }

    const introCards = getPhaseOneIntroCards(lesson);
    if (introCards.length) {
      phaseOneView.mode = "intro";
      phaseOneView.introIndex = introCards.length - 1;
      renderPhaseOnePlayer();
      return;
    }

    phaseOneView.reviewingCheckpoint = false;
    openLearnStageMenu("alphabet");
    return;
  }

  phaseOneView.mode = "learn";
  phaseOneView.slideIndex = phaseOneLessons[phaseOneView.lessonIndex].concepts.length - 1;
  phaseOneView.reviewingCheckpoint = true;
  renderPhaseOnePlayer();
}

function renderAtlas() {
  els.jamoCount.textContent = String(INITIALS.length + MEDIALS.length);

  els.consonants.innerHTML = consonantAtlas
    .map(
      (item) => `
        <button class="glyph-card" type="button" data-speak="${escapeHtml(item.example)}" aria-label="Hear ${escapeHtml(item.example)}">
          <div class="glyph-top">
            <span class="glyph">${escapeHtml(item.char)}</span>
            <span class="glyph-meta">${escapeHtml(item.tag)}</span>
          </div>
          <div>
            <strong>${escapeHtml(CONSONANT_NAMES[item.char])} · ${escapeHtml(item.name)}</strong>
            <p>${escapeHtml(item.note)}</p>
            <p><strong>Example:</strong> ${escapeHtml(item.example)}</p>
          </div>
        </button>
      `,
    )
    .join("");

  els.vowels.innerHTML = vowelAtlas
    .map(
      (item) => `
        <button class="glyph-card" type="button" data-speak="${escapeHtml(item.example)}" aria-label="Hear ${escapeHtml(item.example)}">
          <div class="glyph-top">
            <span class="glyph">${escapeHtml(item.char)}</span>
            <span class="glyph-meta">${escapeHtml(item.family)}</span>
          </div>
          <div>
            <strong>${escapeHtml(item.name)}</strong>
            <p>${escapeHtml(item.note)}</p>
            <p><strong>Example:</strong> ${escapeHtml(item.example)}</p>
          </div>
        </button>
      `,
    )
    .join("");

  document.querySelectorAll(".glyph-card[data-speak]").forEach((card) => {
    card.addEventListener("click", () => speak(card.dataset.speak || ""));
  });
}

// ─── ENTIRE KOREAN ALPHABET REFERENCE ─────────────────────────────────────────
// [2026-06-29] New feature: full-alphabet reference tab (keyboard + list views,
// tap-to-hear, per-group Play all). Reuses existing atlases/audio map.
// A single "see the whole system" view: every consonant and vowel laid out
// either as a real Dubeolsik (2-set) keyboard or as grouped lists. Tap any
// letter to hear its demo syllable and open a detail card.

// Standard Korean 2-set (Dubeolsik) keyboard, mirroring the in-app typing
// keyboard. Only the top row gains tense letters under Shift.
const DUBEOLSIK_ROWS = [
  ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ"],
  ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"],
  ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ"],
];
const DUBEOLSIK_SHIFT = {
  "ㅂ": "ㅃ", "ㅈ": "ㅉ", "ㄷ": "ㄸ", "ㄱ": "ㄲ", "ㅅ": "ㅆ", "ㅐ": "ㅒ", "ㅔ": "ㅖ",
};
// Compound vowels are not single keys on a 2-set keyboard; they are typed as
// two-key combos. Shown as a strip beneath the board.
const COMPOUND_VOWELS = [
  { char: "ㅘ", combo: ["ㅗ", "ㅏ"] },
  { char: "ㅙ", combo: ["ㅗ", "ㅐ"] },
  { char: "ㅚ", combo: ["ㅗ", "ㅣ"] },
  { char: "ㅝ", combo: ["ㅜ", "ㅓ"] },
  { char: "ㅞ", combo: ["ㅜ", "ㅔ"] },
  { char: "ㅟ", combo: ["ㅜ", "ㅣ"] },
  { char: "ㅢ", combo: ["ㅡ", "ㅣ"] },
];

// Pedagogical groupings for the list view (with per-group "Play all").
const ALPHABET_LIST_GROUPS = [
  { title: "Basic consonants", sub: "14 core consonants", chars: ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"] },
  { title: "Tense consonants", sub: "Doubled, tighter sounds", chars: ["ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ"] },
  { title: "Basic vowels", sub: "Simple and y-vowels", chars: ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ"] },
  { title: "Ae & ye vowels", sub: "Single keys, double-vowel shape", chars: ["ㅐ", "ㅒ", "ㅔ", "ㅖ"] },
  { title: "Compound vowels", sub: "Typed as two keys", chars: ["ㅘ", "ㅙ", "ㅚ", "ㅝ", "ㅞ", "ㅟ", "ㅢ"] },
];

// Merge the existing atlases into one lookup so the board shares the same
// notes, examples and tags as the lesson screens (single source of truth).
const JAMO_INFO = (() => {
  const map = {};
  consonantAtlas.forEach((it) => {
    map[it.char] = { kind: "consonant", tag: it.tag, note: it.note, example: it.example, name: CONSONANT_NAMES[it.char] || it.char };
  });
  vowelAtlas.forEach((it) => {
    map[it.char] = { kind: "vowel", family: it.family, note: it.note, example: it.example, name: HANGUL_JAMO_SPEAK[it.char] || it.char };
  });
  return map;
})();

let alphabetBoardShift = false;
let alphabetBoardSelected = "ㄱ";

// Compact romanization for a keycap. LETTER_SOUND stays the single source of
// truth; only ㅇ's long label is shortened to fit.
function jamoRoman(ch) {
  const r = LETTER_SOUND[ch] || "";
  return r === "silent (ng)" ? "–/ng" : r;
}

// The syllable that actually plays when a letter is tapped (가 / 아 / 의…).
function jamoDemo(ch) {
  return HANGUL_JAMO_SPEAK[ch] || ch;
}

// Phonetic hint vs. romanization: the plain stops/affricate ㄱㄷㅂㅈ are
// voiceless at the start of a word (가 ≈ "ka") and only voice to g/d/b/j between
// vowels, so the Revised-Romanization keycap (g/d/b/j) doesn't match what you
// hear in isolation. Phonetic mode shows that dual nature; every other letter
// already matches its romanization closely enough to reuse it.
const JAMO_PHONETIC = {
  "ㄱ": "k→g", "ㄷ": "t→d", "ㅂ": "p→b", "ㅈ": "ch→j",
};
function jamoPhonetic(ch) {
  return JAMO_PHONETIC[ch] || jamoRoman(ch);
}

// The "why does my g sound like ka" explainer, shown in the detail card for the
// letters whose isolated sound differs from their romanization.
const JAMO_VOICING_NOTE = {
  "ㄱ": "Voiceless at the start of a word (가 ≈ “ka”); only becomes a true “g” between vowels.",
  "ㄷ": "Voiceless at the start of a word (다 ≈ “ta”); only becomes a true “d” between vowels.",
  "ㅂ": "Voiceless at the start of a word (바 ≈ “pa”); only becomes a true “b” between vowels.",
  "ㅈ": "Voiceless at the start of a word (자 ≈ “cha”); only becomes a true “j” between vowels.",
};

function jamoSubLabel(ch) {
  const mode = state.alphabetBoardLabels || "none";
  if (mode === "none") return "";
  if (mode === "name") return (JAMO_INFO[ch] && JAMO_INFO[ch].name) || ch;
  if (mode === "phonetic") return jamoPhonetic(ch);
  return jamoRoman(ch);
}

// Sequential player id so a new "Play all" interrupts a running one.
let alphabetPlayAllToken = 0;
async function playAlphabetGroup(chars) {
  const token = ++alphabetPlayAllToken;
  for (const ch of chars) {
    if (token !== alphabetPlayAllToken) return;
    selectAlphabetLetter(ch, { play: false });
    await speak(jamoDemo(ch), { preserveSequence: true });
    if (token !== alphabetPlayAllToken) return;
    await new Promise((resolve) => window.setTimeout(resolve, 180));
  }
}

function alphabetDetailHtml(ch) {
  const info = JAMO_INFO[ch] || {};
  const kindLabel = info.kind === "vowel"
    ? `Vowel · ${escapeHtml(info.family || "")}`
    : `Consonant · ${escapeHtml(info.tag || "")}`;
  return `
    <div class="alpha-detail-head">
      <button class="alpha-detail-glyph" type="button" data-alpha-letter="${escapeHtml(ch)}" lang="ko" aria-label="Hear ${escapeHtml(jamoDemo(ch))}">${escapeHtml(ch)}</button>
      <div class="alpha-detail-meta">
        <div class="eyebrow">${kindLabel}</div>
        <div class="alpha-detail-name" lang="ko">${escapeHtml(info.name || ch)}</div>
        <div class="alpha-detail-roman">Sounds like “${escapeHtml(jamoRoman(ch))}” · tap ▶ to hear it in <span lang="ko">${escapeHtml(jamoDemo(ch))}</span></div>
      </div>
      <button class="alpha-detail-play" type="button" data-alpha-letter="${escapeHtml(ch)}" aria-label="Play sound">▶</button>
    </div>
    <p class="alpha-detail-note">${escapeHtml(info.note || "")} <span class="alpha-detail-example"><strong>Example:</strong> <span lang="ko">${escapeHtml(info.example || jamoDemo(ch))}</span></span></p>
    ${JAMO_VOICING_NOTE[ch] ? `<p class="alpha-detail-voicing">💡 ${escapeHtml(JAMO_VOICING_NOTE[ch])}</p>` : ""}
  `;
}

// Update the detail card and (optionally) play the letter, without a full
// re-render so the board stays put.
function selectAlphabetLetter(ch, { play = true } = {}) {
  alphabetBoardSelected = ch;
  const detail = document.getElementById("alphaBoardDetail");
  if (detail) detail.innerHTML = alphabetDetailHtml(ch);
  document.querySelectorAll("#screen-detail [data-alpha-letter]").forEach((node) => {
    node.classList.toggle("selected", node.dataset.alphaLetter === ch);
  });
  if (play) {
    alphabetPlayAllToken += 1; // cancel any running "Play all"
    const target = document.querySelector(`#screen-detail .alpha-key[data-alpha-letter="${ch}"]`)
      || document.querySelector(`#screen-detail .alpha-list-letter[data-alpha-letter="${ch}"]`);
    if (target) flashElement(target);
    void speak(jamoDemo(ch));
  }
}

function alphabetKeyHtml(ch, { wide = false } = {}) {
  const sub = jamoSubLabel(ch);
  return `
    <button class="alpha-key${wide ? " wide" : ""}${ch === alphabetBoardSelected ? " selected" : ""}" type="button" data-alpha-letter="${escapeHtml(ch)}" lang="ko" aria-label="${escapeHtml(jamoDemo(ch))}">
      <span class="alpha-key-glyph">${escapeHtml(ch)}</span>
      ${sub ? `<span class="alpha-key-sub" ${textLanguageAttr(sub)}>${escapeHtml(sub)}</span>` : ""}
    </button>`;
}

function renderAlphabetKeyboardBoard() {
  const rows = DUBEOLSIK_ROWS.map((row, rowIndex) => {
    const keys = row.map((baseCh) => {
      const ch = alphabetBoardShift && DUBEOLSIK_SHIFT[baseCh] ? DUBEOLSIK_SHIFT[baseCh] : baseCh;
      return alphabetKeyHtml(ch);
    }).join("");
    // Put the Shift toggle at the start of the bottom row, like a real keyboard.
    if (rowIndex === 2) {
      return `<div class="alpha-row">
        <button class="alpha-key control${alphabetBoardShift ? " active" : ""}" type="button" data-alpha-shift aria-pressed="${alphabetBoardShift}">⇧ Shift</button>
        ${keys}
      </div>`;
    }
    return `<div class="alpha-row">${keys}</div>`;
  }).join("");

  const compoundStrip = COMPOUND_VOWELS.map(({ char, combo }) => {
    const mode = state.alphabetBoardLabels || "none";
    const sub = mode === "none" ? "" : mode === "roman" ? combo.join("+") : jamoSubLabel(char);
    return `
    <button class="alpha-key compound${char === alphabetBoardSelected ? " selected" : ""}" type="button" data-alpha-letter="${escapeHtml(char)}" lang="ko" aria-label="${escapeHtml(jamoDemo(char))}">
      <span class="alpha-key-glyph">${escapeHtml(char)}</span>
      ${sub ? `<span class="alpha-key-sub" ${textLanguageAttr(sub)}>${escapeHtml(sub)}</span>` : ""}
    </button>`;
  }).join("");

  return `
    <div class="card alpha-keyboard">
      <div class="alpha-board-help">Korean 2-set keyboard · tap a key to hear it · Shift shows tense letters</div>
      ${rows}
      <div class="alpha-compound-head">
        <div>
          <div class="eyebrow">Compound vowels</div>
          <div class="screen-sub" style="margin-bottom:0;">Typed as two keys (shown below each).</div>
        </div>
        <button class="button secondary compact" type="button" data-alpha-playgroup="compound">▶ Play all</button>
      </div>
      <div class="alpha-row wrap">${compoundStrip}</div>
    </div>
  `;
}

function renderAlphabetListBoard() {
  return `<div class="alpha-list-board">${ALPHABET_LIST_GROUPS.map((group, index) => `
    <div class="card alpha-list-group">
      <div class="alpha-group-head">
        <div>
          <div class="eyebrow">${escapeHtml(group.title)}</div>
          <div class="screen-sub" style="margin-bottom:0;">${escapeHtml(group.sub)} · ${group.chars.length} letters</div>
        </div>
        <button class="button secondary compact" type="button" data-alpha-playgroup="${index}">▶ Play all</button>
      </div>
      <div class="alpha-list-grid">
        ${group.chars.map((ch) => {
          const sub = jamoSubLabel(ch);
          return `
          <button class="alpha-list-letter${ch === alphabetBoardSelected ? " selected" : ""}" type="button" data-alpha-letter="${escapeHtml(ch)}" lang="ko" aria-label="${escapeHtml(jamoDemo(ch))}">
            <span class="alpha-list-glyph">${escapeHtml(ch)}</span>
            ${sub ? `<span class="alpha-list-sub" ${textLanguageAttr(sub)}>${escapeHtml(sub)}</span>` : ""}
          </button>`;
        }).join("")}
      </div>
    </div>
  `).join("")}</div>`;
}

function renderAlphabetBoardMarkup() {
  return state.alphabetBoardMode === "list"
    ? renderAlphabetListBoard()
    : renderAlphabetKeyboardBoard();
}

// Bind the interactive bits inside the board mount (letter taps, per-group
// "Play all", and the keyboard Shift toggle). Called every time the mount is
// re-rendered in place.
function bindAlphabetBoard(mount) {
  mount.querySelectorAll(".alpha-key[data-alpha-letter], .alpha-list-letter[data-alpha-letter]").forEach((btn) => {
    btn.addEventListener("click", () => selectAlphabetLetter(btn.dataset.alphaLetter));
  });
  mount.querySelectorAll("[data-alpha-playgroup]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.alphaPlaygroup;
      const chars = key === "compound"
        ? COMPOUND_VOWELS.map((v) => v.char)
        : (ALPHABET_LIST_GROUPS[Number(key)] || {}).chars || [];
      if (chars.length) void playAlphabetGroup(chars);
    });
  });
  const shiftBtn = mount.querySelector("[data-alpha-shift]");
  if (shiftBtn) shiftBtn.addEventListener("click", () => {
    alphabetBoardShift = !alphabetBoardShift;
    refreshAlphabetBoard({ animate: "board" });
  });
}

// Re-render just the board (keyboard ⇄ list, or Shift) in place — no full-screen
// re-render, so the rest of the page stays put instead of replaying the whole
// screen-enter animation. `animate` adds a small flourish scoped to what changed.
function refreshAlphabetBoard({ animate } = {}) {
  const mount = document.getElementById("alphaBoardMount");
  if (!mount) return;
  mount.innerHTML = renderAlphabetBoardMarkup();
  bindAlphabetBoard(mount);
  if (animate) {
    const cls = animate === "labels" ? "alpha-anim-labels" : "alpha-anim-board";
    mount.classList.remove("alpha-anim-board", "alpha-anim-labels");
    void mount.offsetWidth; // restart the CSS animation
    mount.classList.add(cls);
  }
}

// Switching label mode only changes the little sub-labels. Animate just those:
// fade the old ones out when hiding, fade the new ones in otherwise.
function refreshAlphabetLabels() {
  const mount = document.getElementById("alphaBoardMount");
  if (!mount) { refreshAlphabetBoard({}); return; }
  const hiding = (state.alphabetBoardLabels || "none") === "none";
  const subs = mount.querySelectorAll(".alpha-key:not(.compound) .alpha-key-sub, .alpha-list-sub");
  if (hiding && subs.length) {
    subs.forEach((s) => s.classList.add("alpha-sub-out"));
    window.setTimeout(() => refreshAlphabetBoard({}), 190);
  } else {
    refreshAlphabetBoard({ animate: "labels" });
  }
}

// Reflect the current mode/labels on the dropdown controls without a
// re-render (they persist across in-place board updates).
function syncAlphabetSeg() {
  const mode = state.alphabetBoardMode === "list" ? "list" : "keyboard";
  const labels = state.alphabetBoardLabels || "none";
  const modeSelect = document.getElementById("alphaModeSelect");
  if (modeSelect) modeSelect.value = mode;
  const labelsSelect = document.getElementById("alphaLabelsSelect");
  if (labelsSelect) labelsSelect.value = labels;
}

function renderEntireAlphabet() {
  currentQuizScope = "alphabet";
  state.studio = "alphabet";
  activeHub = "learn";
  setNavActive("learn");
  const el = showScreen("detail");
  if (!el) return;

  const activeLessonIdx = state.phaseOneActive;
  const isQuickRef = !!state.quickRefActive;

  showDetailBarWithBack("learn", "Entire Korean alphabet", () => {
    state.quickRefActive = false;
    saveState();
    openLearnStageMenu("alphabet");
  }, "Alphabet");

  const mode = state.alphabetBoardMode === "list" ? "list" : "keyboard";
  const labels = state.alphabetBoardLabels || "none";
  if (!alphabetBoardSelected) alphabetBoardSelected = "ㄱ";

  const resumeBtnHtml = isQuickRef
    ? `<button class="button primary compact alpha-reference-resume" type="button" id="resumeActiveLessonBtn">🔙 Return to Stage ${String(activeLessonIdx + 1).padStart(2, "0")}</button>`
    : "";

  el.innerHTML = `
    <div class="card alpha-reference-header">
      <div class="alpha-reference-copy">
        <div class="eyebrow">Reference · Full alphabet</div>
        <h2 class="screen-title">The entire Korean alphabet</h2>
        <div class="screen-sub">19 consonants · 21 vowels · tap any letter to hear it</div>
      </div>
      <div class="alpha-reference-actions">
        ${resumeBtnHtml}
        <div class="alpha-controls">
          <select id="alphaModeSelect" class="alpha-select" aria-label="Display mode">
            <option value="keyboard" ${mode === "keyboard" ? "selected" : ""}>⌨ Keyboard</option>
            <option value="list" ${mode === "list" ? "selected" : ""}>☰ List</option>
          </select>
          <select id="alphaLabelsSelect" class="alpha-select" aria-label="Letter labels">
            <option value="none" ${labels === "none" ? "selected" : ""}>∅ Hide labels</option>
            <option value="roman" ${labels === "roman" ? "selected" : ""}>Aa Sound</option>
            <option value="phonetic" ${labels === "phonetic" ? "selected" : ""}>k→g Phonetic</option>
            <option value="name" ${labels === "name" ? "selected" : ""}>가 Name</option>
          </select>
        </div>
      </div>
    </div>
    <div class="card alpha-detail" id="alphaBoardDetail" role="status" aria-live="polite" aria-label="Selected letter">${alphabetDetailHtml(alphabetBoardSelected)}</div>
    <div id="alphaBoardMount">${renderAlphabetBoardMarkup()}</div>
  `;

  // Bind the resume button in the card if it exists
  const resumeBtn = el.querySelector("#resumeActiveLessonBtn");
  if (resumeBtn) {
    resumeBtn.addEventListener("click", () => {
      state.quickRefActive = false;
      saveState();
      openLearnLesson(activeLessonIdx, { resume: true, allowResult: true });
    });
  }

  const modeSelect = el.querySelector("#alphaModeSelect");
  if (modeSelect) {
    modeSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      if (state.alphabetBoardMode === val) return;
      state.alphabetBoardMode = val;
      saveState();
      refreshAlphabetBoard({ animate: "board" });
    });
  }

  const labelsSelect = el.querySelector("#alphaLabelsSelect");
  if (labelsSelect) {
    labelsSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      if ((state.alphabetBoardLabels || "none") === val) return;
      state.alphabetBoardLabels = val;
      saveState();
      refreshAlphabetLabels();
    });
  }

  bindAlphabetBoard(el.querySelector("#alphaBoardMount"));
  const detailCard = el.querySelector("#alphaBoardDetail");
  if (detailCard) {
    detailCard.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-alpha-letter]");
      if (btn) selectAlphabetLetter(btn.dataset.alphaLetter);
    });
  }
}

// ─── ALPHABET DRILL LAB ───────────────────────────────────────────────────────
// Permanent, infinite Hangul drill hub unlocked after the mastery test. Reuses
// the existing question generators (all produce valid Hangul); adds session
// lengths, an End-session control, a result screen, and a weak-spot store.
const DRILL_MODES = [
  { id: "mixed", label: "Mixed Drill", sub: "Build, split, letters, and batchim" },
  { id: "build", label: "Build Blocks", sub: "Tap jamo in block order" },
  { id: "split", label: "Split Blocks", sub: "Find each jamo inside a syllable" },
  { id: "letters", label: "Letters", sub: "Every learned letter, symbol ↔ sound" },
  { id: "batchim", label: "Batchim", sub: "Match finals to closing sounds" },
  { id: "weak", label: "Weak Spots", sub: "Review your saved trouble spots" },
];
// 80 is the finite mastery pass: 40 modern jamo in both retrieval directions.
const DRILL_LENGTHS = [5, 10, 20, 80, "∞"];
const ALPHABET_LETTER_QUESTION_DIRECTIONS = ["letter-to-sound", "sound-to-letter"];
let drillSession = null;

function drillPools() { return ALPHABET_QUIZ_POOLS.reading; }
function parseWeakSpotId(value) {
  const raw = String(value || "").trim();
  const contextual = /^(letter|batchim):([ㄱ-ㅎㅏ-ㅣ])$/.exec(raw);
  if (contextual) {
    const [, kind, jamo] = contextual;
    if (kind === "letter" && !LETTER_SOUND[jamo]) return null;
    if (kind === "batchim" && !BATCHIM_FINALS.includes(jamo)) return null;
    return { id: `${kind}:${jamo}`, kind, jamo };
  }
  if (!/^[ㄱ-ㅎㅏ-ㅣ]$/.test(raw)) return null;
  const kind = LETTER_SOUND[raw] ? "letter" : "batchim";
  if (kind === "batchim" && !BATCHIM_FINALS.includes(raw)) return null;
  return { id: `${kind}:${raw}`, kind, jamo: raw };
}
function weakSpotId(jamo, kind = "letter") {
  const value = String(jamo || "");
  if (!/^[ㄱ-ㅎㅏ-ㅣ]$/.test(value)) return "";
  if (kind === "batchim") return BATCHIM_FINALS.includes(value) ? `batchim:${value}` : "";
  return LETTER_SOUND[value] ? `letter:${value}` : "";
}
function recordWeakSpot(jamo, kind = "letter") {
  const id = weakSpotId(jamo, kind);
  if (!id) return;
  const w = state.alphabetWeakSpots || (state.alphabetWeakSpots = {});
  w[id] = (Number(w[id]) || 0) + 1;
  saveState();
}
function getWeakSpotList() {
  const w = state.alphabetWeakSpots || {};
  const merged = new Map();
  Object.entries(w).forEach(([rawId, rawCount]) => {
    const spot = parseWeakSpotId(rawId);
    const count = Number(rawCount) || 0;
    if (!spot || count <= 0) return;
    const existing = merged.get(spot.id);
    merged.set(spot.id, { ...spot, count: count + (existing?.count || 0) });
  });
  return [...merged.values()].sort((a, b) => b.count - a.count || a.id.localeCompare(b.id));
}
function pickWeakSpotForDrill(spots) {
  const recent = Array.isArray(drillSession?.recentWeakKeys) ? drillSession.recentWeakKeys : [];
  const candidates = spots.slice(0, 8);
  const fresh = candidates.filter((spot) => !recent.includes(spot.id));
  const chosen = randomItem(fresh.length ? fresh : candidates);
  if (drillSession && chosen) {
    drillSession.recentWeakKeys = [chosen.id, ...recent.filter((id) => id !== chosen.id)].slice(0, Math.min(3, candidates.length));
  }
  return chosen;
}
function makeLetterDrillQuestion(forceLetter, forceDirection = "") {
  const enrolled = getEnrolledLetters();
  const letters = enrolled.length ? enrolled : [...consonantAtlas.map((c) => c.char), ...vowelAtlas.map((v) => v.char)];
  const letter = forceLetter && letters.includes(forceLetter) && LETTER_SOUND[forceLetter]
    ? forceLetter
    : randomItem(letters);
  const direction = ALPHABET_LETTER_QUESTION_DIRECTIONS.includes(forceDirection)
    ? forceDirection
    : randomItem(ALPHABET_LETTER_QUESTION_DIRECTIONS);
  const sound = LETTER_SOUND[letter] || "";
  const otherLetters = shuffle(letters.filter((item) => item !== letter && LETTER_SOUND[item] !== sound));
  const asksForLetter = direction === "sound-to-letter";
  const distract = asksForLetter
    ? otherLetters.slice(0, 3)
    : [...new Set(otherLetters.map((item) => LETTER_SOUND[item]).filter(Boolean))].slice(0, 3);
  return {
    kind: "Letter",
    prompt: asksForLetter
      ? "Which Hangul letter matches this reading label?"
      : "Which reading label matches this Hangul letter?",
    detail: asksForLetter
      ? "Recall the symbol from its sound clue. Tap the clue to hear it."
      : "Recall the sound from the symbol. Tap the letter to hear it.",
    visual: asksForLetter
      ? `<span class="drill-reading-label" lang="en">${escapeHtml(sound)}</span>`
      : `<span class="big-glyph" lang="ko">${escapeHtml(letter)}</span>`,
    options: shuffle([asksForLetter ? letter : sound, ...distract]),
    answer: asksForLetter ? letter : sound,
    explanation: `${letter} uses the reading label “${sound}”.`,
    voiceText: HANGUL_JAMO_SPEAK[letter] || letter, weakKey: letter, weakKind: "letter",
    drillWholeLabel: asksForLetter ? "Sound clue" : "Letter",
    coverageJamo: letter,
    coverageDirection: direction,
  };
}

// Letters mode is a coverage deck, not a random draw. It interleaves one
// shuffled pass in each direction, so both question shapes appear even in a
// short session and every enrolled jamo is covered both ways before a repeat.
function nextLetterCoverageTarget() {
  if (!drillSession) return null;
  if (!Array.isArray(drillSession.letterCoverageQueue) || !drillSession.letterCoverageQueue.length) {
    const enrolled = getEnrolledLetters();
    const letters = enrolled.length ? enrolled : [...consonantAtlas.map((c) => c.char), ...vowelAtlas.map((v) => v.char)];
    const passes = ALPHABET_LETTER_QUESTION_DIRECTIONS.map((direction) =>
      shuffle([...letters]).map((letter) => ({ letter, direction })),
    );
    drillSession.letterCoverageQueue = letters.flatMap((_, index) => passes.map((pass) => pass[index]));
  }
  return drillSession.letterCoverageQueue.shift() || null;
}
function hasLocalDrillAudio(text) {
  if (!text || typeof window === "undefined" || typeof window.AUDIO_MAP === "undefined") return true;
  return Boolean(lookupAudioUrl(text));
}
const drillAudioSyllableCache = new Map();
function getAudioBackedDrillSyllables(pools, withFinal) {
  const finals = withFinal ? pools.finals.filter(Boolean) : [""];
  const key = [pools.initials.join(""), pools.medials.join(""), finals.join(""), withFinal ? "closed" : "open"].join("|");
  if (drillAudioSyllableCache.has(key)) return drillAudioSyllableCache.get(key);
  const syllables = [];
  pools.initials.forEach((initial) => {
    pools.medials.forEach((medial) => {
      finals.forEach((final) => {
        const syllable = composeHangul(initial, medial, final);
        if (syllable && hasLocalDrillAudio(syllable)) syllables.push(syllable);
      });
    });
  });
  drillAudioSyllableCache.set(key, syllables);
  return syllables;
}
function getBatchimGroupForLetter(letter) {
  return BATCHIM_GROUPS.find((group) => group.letters.includes(letter)) || null;
}
function getBatchimAudioText(letter) {
  const group = getBatchimGroupForLetter(letter);
  return group ? BATCHIM_GROUP_SOUND_SPEAK[group.group] || "" : "";
}
// Tile-assembly build question: the learner taps jamo in seat order to build a
// real syllable (like the lesson checkpoints, but generated and infinite).
function makeBuildTileDrillQuestion(pools) {
  const withFinal = Math.random() < 0.45 && pools.finals.some(Boolean);
  const audioBacked = getAudioBackedDrillSyllables(pools, withFinal);
  let target = randomItem(audioBacked);
  if (!target) {
    target = composeHangul(
      randomItem(pools.initials),
      randomItem(pools.medials),
      withFinal ? randomItem(pools.finals.filter(Boolean)) : "",
    );
  }
  const parts = decomposeHangul(target);
  const initial = parts.initial;
  const medial = parts.medial;
  const final = parts.final;
  const seq = final ? [initial, medial, final] : [initial, medial];
  const distract = [...new Set([...pools.initials, ...pools.medials, ...pools.finals.filter((f) => f)])].filter((j) => !seq.includes(j));
  const tray = shuffle([...new Set([...seq, ...shuffle(distract).slice(0, 3)])]);
  const reading = romanizeHangulSyllable(target) || target;
  return {
    kind: "Build", interaction: "build",
    prompt: `Build the block romanized as “${reading}”`,
    detail: `Tap the letters in order — consonant, then vowel${final ? ", then the final consonant" : ""}.`,
    target, seq, tray, voiceText: target,
    drillWholeLabel: "Syllable",
    drillPartLabel: "Letters",
    explanation: `${seq.join(" + ")} = ${target}.`,
  };
}

function makeSplitDrillQuestion(pools) {
  const targets = pools.finals.some(Boolean) ? ["initial", "medial", "final"] : ["initial", "medial"];
  const target = randomItem(targets);
  const openSyllables = getAudioBackedDrillSyllables(pools, false);
  const closedSyllables = pools.finals.some(Boolean) ? getAudioBackedDrillSyllables(pools, true) : [];
  const candidates = target === "final" ? closedSyllables : [...openSyllables, ...closedSyllables];
  const question = generateDecomposeQuestion(pools, { target, syllable: randomItem(candidates) || "" });
  question.weakKey = /^[ㄱ-ㅎㅏ-ㅣ]$/.test(question.answer) ? question.answer : null;
  question.weakKind = question.drillWeakKind || "letter";
  question.visual = `<span class="big-glyph" lang="ko">${escapeHtml(question.voiceText)}</span>`;
  question.detail = "";
  return question;
}

function makeWeakSpotDrillQuestion(spot, pools) {
  if (spot?.kind === "batchim") return generateBatchimQuestion(pools, spot.jamo);
  return makeLetterDrillQuestion(spot?.jamo);
}

function makeDrillQuestion(mode) {
  const pools = drillPools();
  let m = mode;
  if (mode === "mixed") m = randomItem(["build", "split", "letters", "batchim"]);
  if (mode === "weak") {
    const spots = getWeakSpotList();
    if (spots.length) return makeWeakSpotDrillQuestion(pickWeakSpotForDrill(spots), pools);
    m = randomItem(["build", "split", "letters", "batchim"]);
  }
  let q;
  if (m === "build") { q = makeBuildTileDrillQuestion(pools); }
  else if (m === "split") { q = makeSplitDrillQuestion(pools); }
  else if (m === "batchim") { q = { ...generateBatchimQuestion(pools) }; }
  else {
    const target = m === "letters" ? nextLetterCoverageTarget() : null;
    q = makeLetterDrillQuestion(target?.letter, target?.direction);
  }
  return q;
}

function getDrillWholeAudioText(question) {
  if (!question) return "";
  return question.voiceText || question.target || question.answer || "";
}

function getDrillPartAudioText(question) {
  if (!question || question.interaction === "build") return "";
  if (question.drillPartVoiceText) return speakableForChunk(question.drillPartVoiceText);
  if (question.kind === "Batchim sound" && BATCHIM_GROUP_SOUND_SPEAK[question.answer]) {
    return BATCHIM_GROUP_SOUND_SPEAK[question.answer];
  }
  return question.answer ? speakableForClickableText(question.answer, { preferSoundLabels: true }) : "";
}

function renderDrillAudioButtons(question) {
  const wholeText = getDrillWholeAudioText(question);
  const wholeLabel = question?.drillWholeLabel || "Hear";
  const partLabel = question?.drillPartLabel || "";
  const hasPartAudio = question?.interaction === "build"
    ? Array.isArray(question.seq) && question.seq.length > 0
    : Boolean(getDrillPartAudioText(question));
  return [
    wholeText
      ? `<button class="button secondary compact" type="button" id="drillHearWholeBtn">▶ ${escapeHtml(wholeLabel)}</button>`
      : "",
    partLabel && hasPartAudio
      ? `<button class="button secondary compact" type="button" id="drillHearPartBtn">▶ ${escapeHtml(partLabel)}</button>`
      : "",
  ].join("");
}

function renderAlphabetDrillLab() {
  currentQuizScope = "alphabet";
  state.studio = "alphabet";
  activeHub = "practice";
  setNavActive("practice");
  drillSession = null;
  const el = showScreen("detail");
  if (!el) return;
  showDetailBarWithBack("practice", "Alphabet Drill Lab", () => renderAlphabetPracticeHub(), "Alphabet practice");
  const weakCount = getWeakSpotList().length;
  const modeBtns = DRILL_MODES.map((mo, i) =>
    `<button class="drill-mode-card${i === 0 ? " selected" : ""}" type="button" data-drill-mode="${mo.id}" aria-pressed="${i === 0}" ${mo.id === "weak" && !weakCount ? "disabled" : ""}>
       <div class="section-card-title" lang="en">${escapeHtml(mo.label)}</div>
       <div class="screen-sub" style="margin-bottom:0;">${escapeHtml(mo.id === "weak" && !weakCount ? "Available after your first miss" : mo.sub)}</div>
     </button>`).join("");
  const lenBtns = DRILL_LENGTHS.map((n, i) =>
    `<button class="alpha-seg${i === 0 ? " active" : ""}" type="button" data-drill-len="${n}" aria-pressed="${i === 0}">${n === "∞" ? "Infinite" : n === 80 ? "Full 80" : n}</button>`).join("");
  const firstOpenHint = !state.drillLabSeen
    ? `<div class="first-try-note">Pick a <strong>mode</strong> (Mixed blends them all), choose how many questions, then Start. Questions generate forever — tap <strong>End session</strong> any time in Infinite. Letters you miss are saved and resurface in <strong>Weak Spots</strong>.</div>`
    : "";
  if (!state.drillLabSeen) { state.drillLabSeen = true; saveState(); }
  el.innerHTML = `
    <div class="card drill-lab-hero">
      ${alphabetPracticeProgressHtml("Drill Lab")}
      <div class="eyebrow">Practice · Hangul forever</div>
      <h2 class="screen-title" style="margin-bottom:8px;">Alphabet Drill Lab</h2>
      <div class="screen-sub" style="margin-bottom:0;">Infinite Hangul drills. Pick a mode and a session length.${weakCount ? ` You have <strong>${weakCount}</strong> weak spot${weakCount === 1 ? "" : "s"} logged.` : ""}</div>
    </div>
    ${firstOpenHint}
    <div class="card drill-lab-picker">
      <div class="eyebrow" style="margin-bottom:8px;">Mode</div>
      <div class="drill-mode-grid">${modeBtns}</div>
      <div class="eyebrow" style="margin:16px 0 8px;">Session length</div>
      <div class="alpha-seg-group" role="group" aria-label="Session length">${lenBtns}</div>
      <button class="button primary full" type="button" id="drillStartBtn" style="margin-top:16px;">Start drill</button>
    </div>`;
  bindAlphabetReferenceButtons(el);
  let mode = "mixed", len = 5;
  el.querySelectorAll("[data-drill-mode]").forEach((b) => b.addEventListener("click", () => {
    mode = b.dataset.drillMode;
    el.querySelectorAll("[data-drill-mode]").forEach((x) => { const on = x === b; x.classList.toggle("selected", on); x.setAttribute("aria-pressed", String(on)); });
  }));
  el.querySelectorAll("[data-drill-len]").forEach((b) => b.addEventListener("click", () => {
    len = b.dataset.drillLen === "∞" ? "∞" : Number(b.dataset.drillLen);
    el.querySelectorAll("[data-drill-len]").forEach((x) => { const on = x === b; x.classList.toggle("active", on); x.setAttribute("aria-pressed", String(on)); });
  }));
  document.getElementById("drillStartBtn").addEventListener("click", () => startDrillSession(mode, len));
}

function startDrillSession(mode, len) {
  resetLessonMotion("drill");
  queueScreenMotion("forward", 1, { replace: false });
  drillSession = {
    mode, len, total: len === "∞" ? Infinity : len,
    asked: 0, correct: 0, streak: 0, bestStreak: 0, answered: false, missed: {}, current: null, recentWeakKeys: [], letterCoverageQueue: [],
  };
  renderDrillQuestion();
}

function renderDrillQuestion() {
  const s = drillSession;
  if (!s) return;
  if (s.asked >= s.total) return renderDrillResult();
  const el = showScreen("detail");
  if (!el) return;
  const modeLabel = (DRILL_MODES.find((m) => m.id === s.mode) || {}).label || "Drill";
  showDetailBarWithBack("practice", modeLabel, () => renderAlphabetDrillLab(), "Drill Lab");
  const q = s.current = makeDrillQuestion(s.mode);
  s.answered = false;
  s.buildFilled = [];
  s.currentAttempted = false;
  s.currentHadMiss = false;
  s.currentMissIds = [];
  const isBuild = q.interaction === "build";
  const visualHtml = q.visual ? `<div class="quiz-visual">${q.visual}</div>` : "";
  const interactiveHtml = isBuild
    ? `<div class="bd-builder" id="drillBuilder" lang="ko">
         <div class="drill-build-slots">${q.seq.map((_, i) => `<span class="bd-slot" data-drill-slot="${i}" aria-hidden="true">·</span>`).join("")}</div>
         <span class="bd-arrow">→</span>
         <span class="bd-assembled" data-drill-assembled lang="ko">?</span>
       </div>
       <div class="bd-tray" id="drillTray" role="group" aria-label="Letter tiles">
         ${q.tray.map((j) => `<button class="bd-tile" type="button" data-drill-jamo="${escapeHtml(j)}" lang="ko" aria-label="Korean letter ${escapeHtml(j)}">${escapeHtml(j)}</button>`).join("")}
       </div>`
    : `<div class="quiz-options" id="drillOptions">
         ${q.options.map((o) => `<button class="option" type="button" data-drill-option="${escapeHtml(o)}" ${textLanguageAttr(o)}>${escapeHtml(o)}</button>`).join("")}
       </div>`;
  el.innerHTML = `
    <div class="card word-card alphabet-practice-card" data-lesson-motion-root>
      ${alphabetPracticeProgressHtml(s.total === Infinity ? `${modeLabel} · Question ${s.asked + 1}` : modeLabel, s.asked + 1, s.total === Infinity ? 0 : s.total)}
      <div class="alphabet-practice-status" id="drillStatus">${s.correct} clean · streak ${s.streak}</div>
      ${visualHtml}
      <div class="drill-audio-row">
        ${renderDrillAudioButtons(q)}
      </div>
      <h3 class="screen-title" style="font-size:1.05rem;margin-bottom:4px;">${escapeHtml(q.prompt)}</h3>
      ${q.detail ? `<div class="screen-sub">${escapeHtml(q.detail)}</div>` : ""}
      ${interactiveHtml}
      <div class="lesson-feedback" id="drillFeedback" aria-live="polite"></div>
      <div class="word-card-actions word-card-nav-actions">
        <button class="button secondary compact" type="button" id="drillEndBtn">End session</button>
        <button class="button primary compact" type="button" id="drillNextBtn" disabled>Next</button>
      </div>
    </div>`;
  const hearWhole = document.getElementById("drillHearWholeBtn");
  if (hearWhole) hearWhole.addEventListener("click", () => void speak(getDrillWholeAudioText(q)));
  bindAlphabetReferenceButtons(el);
  const hearPart = document.getElementById("drillHearPartBtn");
  if (hearPart) {
    hearPart.addEventListener("click", async () => {
      if (!isBuild) {
        void speak(getDrillPartAudioText(q));
        return;
      }
      for (const [index, part] of (q.seq || []).entries()) {
        const partAudio = index === 2 ? getBatchimAudioText(part) : speakableForChunk(part);
        await speak(partAudio || speakableForChunk(part), { preserveSequence: true });
        await new Promise((resolve) => window.setTimeout(resolve, 180));
      }
    });
  }
  if (isBuild) {
    document.querySelectorAll("#drillTray .bd-tile").forEach((b) =>
      b.addEventListener("click", () => answerDrillBuild(b.dataset.drillJamo, b)));
  } else {
    document.querySelectorAll("#drillOptions .option").forEach((b) =>
      b.addEventListener("click", () => answerDrill(b.dataset.drillOption, b)));
  }
  document.getElementById("drillEndBtn").addEventListener("click", () => renderDrillResult());
  document.getElementById("drillNextBtn").addEventListener("click", () => { s.asked += 1; renderDrillQuestion(); });
  animateLessonFrame(el.querySelector("[data-lesson-motion-root]"), "drill", {
    key: `question:${s.asked}`,
    order: s.asked,
    phase: "question",
  });
}

function updateDrillStatus(session) {
  const status = document.getElementById("drillStatus");
  if (status && session) status.textContent = `${session.correct} clean · streak ${session.streak}`;
}

function setDrillFeedback(feedback, tone, lead, body) {
  if (!feedback) return;
  feedback.className = `lesson-feedback${tone ? ` ${tone}` : ""}`;
  feedback.innerHTML = `<strong>${escapeHtml(lead)}</strong>${body ? ` ${escapeHtml(body)}` : ""}`;
}

function recordDrillMiss(session, jamo, kind = "letter") {
  if (!session) return;
  session.currentHadMiss = true;
  session.streak = 0;
  updateDrillStatus(session);
  const id = weakSpotId(jamo, kind);
  if (!id) return;
  const recorded = session.currentMissIds || (session.currentMissIds = []);
  if (recorded.includes(id)) return;
  recorded.push(id);
  recordWeakSpot(jamo, kind);
  session.missed[id] = (session.missed[id] || 0) + 1;
}

// Tile-assembly answer handler for the Build Blocks drill mode.
function answerDrillBuild(jamo, tile) {
  const s = drillSession;
  if (!s || s.answered) return;
  const q = s.current;
  const feedback = document.getElementById("drillFeedback");
  s.currentAttempted = true;
  const filled = s.buildFilled || (s.buildFilled = []);
  const idx = filled.length;
  const seatName = idx === 0 ? "first consonant" : idx === 1 ? "vowel" : "final consonant";
  const tileAudio = idx === 2 ? getBatchimAudioText(jamo) : "";
  if (tileAudio) void speak(tileAudio);
  else speakClickableText(jamo, { preferSoundLabels: true });
  if (jamo !== q.seq[idx]) {
    tile.classList.add("wrong");
    setTimeout(() => tile.classList.remove("wrong"), 500);
    recordDrillMiss(s, q.seq[idx], idx === 2 ? "batchim" : "letter");
    setDrillFeedback(feedback, "wrong", "Not yet.", `Tap the ${seatName} next.`);
    return;
  }
  filled.push(jamo);
  const slot = document.querySelector('#drillBuilder [data-drill-slot="' + idx + '"]');
  if (slot) { slot.textContent = jamo; slot.classList.add("filled"); slot.removeAttribute("aria-hidden"); flashElement(slot); }
  if (filled.length >= q.seq.length) {
    s.answered = true;
    const clean = !s.currentHadMiss;
    if (clean) {
      s.correct += 1;
      s.streak += 1;
    } else {
      s.streak = 0;
    }
    s.bestStreak = Math.max(s.bestStreak, s.streak);
    updateDrillStatus(s);
    const assembled = document.querySelector("[data-drill-assembled]");
    if (assembled) {
      assembled.outerHTML =
        '<button class="bd-assembled done" type="button" data-drill-assembled data-speak="' +
        escapeHtml(q.target) +
        '" lang="ko" aria-label="Hear completed block ' +
        escapeHtml(q.target) +
        '">' +
        escapeHtml(q.target) +
        "</button>";
      const playAnswer = document.querySelector("[data-drill-assembled][data-speak]");
      if (playAnswer) {
        playAnswer.addEventListener("click", () => {
          flashElement(playAnswer);
          void speak(playAnswer.dataset.speak || q.target);
        });
      }
    }
    document.querySelectorAll("#drillTray .bd-tile").forEach((t) => { t.disabled = true; });
    setDrillFeedback(feedback, "correct", clean ? "Correct." : "Got it.", q.explanation || "");
    const next = document.getElementById("drillNextBtn");
    if (next) { next.disabled = false; next.textContent = s.total !== Infinity && s.asked + 1 >= s.total ? "See result" : "Next"; }
  } else {
    setDrillFeedback(feedback, "", "Nice.", `Now the ${filled.length === 1 ? "vowel" : "final consonant"}.`);
  }
}

function speakDrillChoice(choice, question) {
  const label = String(choice || "").trim().toLowerCase();
  if (question?.kind === "Batchim sound" && BATCHIM_GROUP_SOUND_SPEAK[label]) {
    void speak(BATCHIM_GROUP_SOUND_SPEAK[label]);
    return;
  }
  if (question?.drillChoiceKind === "batchim") {
    const finalAudio = getBatchimAudioText(choice);
    if (finalAudio) {
      void speak(finalAudio);
      return;
    }
  }
  speakClickableText(choice, { preferSoundLabels: true });
}

function answerDrill(choice, button) {
  const s = drillSession;
  if (!s || s.answered) return;
  const q = s.current;
  const feedback = document.getElementById("drillFeedback");
  s.currentAttempted = true;
  speakDrillChoice(choice, q);
  if (choice !== q.answer) {
    button.classList.add("wrong");
    button.disabled = true;
    recordDrillMiss(s, q.weakKey, q.weakKind || "letter");
    setDrillFeedback(feedback, "wrong", "Not yet.", "Try another answer.");
    return;
  }
  s.answered = true;
  const clean = !s.currentHadMiss;
  if (clean) {
    s.correct += 1;
    s.streak += 1;
  } else {
    s.streak = 0;
  }
  s.bestStreak = Math.max(s.bestStreak, s.streak);
  updateDrillStatus(s);
  document.querySelectorAll("#drillOptions .option").forEach((b) => {
    b.disabled = true;
    if ((b.dataset.drillOption || "") === q.answer) b.classList.add("correct");
  });
  setDrillFeedback(feedback, "correct", clean ? "Correct." : "Got it.", q.explanation || "");
  const next = document.getElementById("drillNextBtn");
  if (next) { next.disabled = false; next.textContent = s.total !== Infinity && s.asked + 1 >= s.total ? "See result" : "Next"; }
}

function renderDrillResult() {
  const s = drillSession;
  if (!s) return renderAlphabetDrillLab();
  const el = showScreen("detail");
  if (!el) return;
  showDetailBarWithBack("practice", "Drill complete", () => renderAlphabetDrillLab(), "Drill Lab");
  // `asked` counts questions already advanced past. An early End-session also
  // counts the current question once the learner has answered or attempted it.
  const currentWasAttempted = s.currentAttempted && s.asked < s.total;
  const total = s.asked + (currentWasAttempted ? 1 : 0);
  const accuracy = total ? Math.round((s.correct / total) * 100) : 0;
  const missedList = Object.entries(s.missed)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => parseWeakSpotId(id))
    .filter(Boolean);
  const missedHtml = missedList
    .map((spot) => `<span class="drill-missed-chip"><span lang="ko">${escapeHtml(spot.jamo)}</span>${spot.kind === "batchim" ? " final" : ""}</span>`)
    .join("");
  const detailsHtml = missedList.length
    ? `<div class="completion-note"><strong>Focus for next time</strong><span class="drill-missed-list">${missedHtml}</span></div>`
    : `<div class="completion-note"><strong>${!total ? "Session paused" : s.correct === total ? "Clean run" : "Keep building"}</strong><span>${
        !total
          ? "No weak spots were recorded."
          : s.correct === total
            ? "No misses this time."
            : "The session ended before the current question was complete."
      }</span></div>`;
  el.innerHTML = premiumCompletionHtml({
    tone: !total ? "neutral" : accuracy >= 80 ? "success" : "retry",
    icon: !total ? "spark" : accuracy >= 80 ? "check" : "retry",
    eyebrow: "Drill complete",
    title: total ? `${accuracy}% first-try accuracy` : "No questions answered",
    copy: total ? `${s.correct} of ${total} answered cleanly. Your best streak was ${s.bestStreak}.` : "No answers were scored in this run.",
    score: { value: total ? `${accuracy}%` : "—", label: "First-try accuracy" },
    stats: [
      { value: `${s.correct}/${total}`, label: "Clean" },
      { value: s.bestStreak, label: "Best streak" },
    ],
    detailsHtml,
    actionsHtml: `
      <button class="button secondary compact" type="button" id="drillAgainBtn">Back to Drill Lab</button>
      <button class="button primary compact" type="button" id="drillRepeatBtn">Run it again</button>`,
    className: "alphabet-practice-card",
    celebrate: total > 0 && accuracy >= 80,
  });
  document.getElementById("drillAgainBtn").addEventListener("click", () => {
    queueScreenMotion("back", -1);
    renderAlphabetDrillLab();
  });
  document.getElementById("drillRepeatBtn").addEventListener("click", () => startDrillSession(s.mode, s.len));
  animateLessonFrame(el.querySelector(".completion-stage"), "drill", {
    key: "complete",
    order: 2000,
    phase: "complete",
    complete: true,
  });
}

function openAlphabetDrillLab() {
  refreshProgressionState();
  queueScreenMotion("forward", 1, { replace: false });
  state.route = { hub: "practice", item: "alphabet", stage: null };
  saveState();
  renderAlphabetDrillLab();
}

function openEntireAlphabet() {
  refreshProgressionState();
  if (!state.quickRefActive) {
    state.route = { hub: "learn", item: "alphabet", stage: null };
  }
  saveState();
  renderEntireAlphabet();
}

function populateSyllableLab() {
  els.labInitial.innerHTML = INITIALS.map((item) => `<option value="${item}">${item}</option>`).join("");
  els.labVowel.innerHTML = MEDIALS.map((item) => `<option value="${item}">${item}</option>`).join("");
  els.labFinal.innerHTML = FINALS.map((item) => {
    const label = item === "" ? "없음" : item;
    return `<option value="${item}">${label}</option>`;
  }).join("");

  els.labInitial.value = "ㄱ";
  els.labVowel.value = "ㅏ";
  els.labFinal.value = "";

  const update = () => {
    const initial = els.labInitial.value;
    const medial = els.labVowel.value;
    const final = els.labFinal.value;
    const syllable = composeHangul(initial, medial, final);
    els.labSyllable.textContent = syllable;
    els.labEquation.textContent = `${initial} + ${medial} + ${normalizeFinal(final)} = ${syllable}`;
    els.labOnsetValue.textContent = initial;
    els.labVowelValue.textContent = medial;
    els.labCodaValue.textContent = final || "—";
  };

  els.labInitial.addEventListener("change", update);
  els.labVowel.addEventListener("change", update);
  els.labFinal.addEventListener("change", update);
  els.labHearButton.addEventListener("click", () => speak(els.labSyllable.textContent || ""));
  els.labShuffleButton.addEventListener("click", () => {
    const parts = decomposeHangul(randomItem(LAB_PRESETS));
    els.labInitial.value = parts.initial;
    els.labVowel.value = parts.medial;
    els.labFinal.value = parts.final;
    update();
  });
  update();
}

function getQuestionVisual(question) {
  if (question.visual) {
    return question.visual;
  }

  // Never fall back to rendering the answer. A missing visual should stay a
  // neutral prompt rather than silently turning the question into copying.
  return '<div class="big-glyph" aria-hidden="true">?</div>';
}

function generateComposeQuestion(pools) {
  const initial = randomItem(pools.initials);
  const medial = randomItem(pools.medials);
  const final = randomItem(pools.finals);
  const answer = composeHangul(initial, medial, final);
  const options = makeSyllableChoices(answer, 4, pools);

  return {
    kind: "Build it",
    mode: "Syllable composition",
    prompt: "What syllable do these jamo make?",
    detail: `${initial} + ${medial} + ${normalizeFinal(final)}`,
    visual: `<div class="syllable-stack"><span>${escapeHtml(initial)}</span><span>+</span><span>${escapeHtml(medial)}</span><span>+</span><span>${escapeHtml(normalizeFinal(final))}</span></div>`,
    options,
    answer,
    explanation: `${initial} + ${medial}${final ? ` + ${final}` : ""} = ${answer}. This is the core Hangul block pattern.`,
    voiceText: answer,
  };
}

function generateDecomposeQuestion(pools, forced = {}) {
  const targetChoices = ["initial", "medial"];
  if (Array.isArray(pools?.finals) && pools.finals.some((item) => item)) {
    targetChoices.push("final");
  }

  const target = targetChoices.includes(forced.target) ? forced.target : randomItem(targetChoices);
  let initial;
  let medial;
  let final;
  let syllable;

  const forcedParts = forced.syllable ? decomposeHangul(forced.syllable) : null;
  if (forcedParts && (target !== "final" || forcedParts.final)) {
    ({ initial, medial, final } = forcedParts);
    syllable = forced.syllable;
  }

  if (!syllable) {
    do {
      initial = randomItem(pools.initials);
      medial = randomItem(pools.medials);
      final = target === "final" ? randomItem(pools.finals.filter((item) => item !== "")) : randomItem(pools.finals);
      syllable = composeHangul(initial, medial, final);
    } while (!syllable || (target === "final" && final === ""));
  }

  const answerMap = {
    initial,
    medial,
    final: normalizeFinal(final),
  };

  const answer = answerMap[target];
  const choicePool =
    target === "initial"
      ? pools.initials
      : target === "medial"
        ? pools.medials
        : ["없음", ...pools.finals.filter((item) => item !== "")].map(normalizeFinal);

  const options = makeTextChoices(answer, choicePool, 4);

  return {
    kind: "Split it",
    mode: "Syllable breakdown",
    prompt:
      target === "initial"
        ? "Which consonant starts this syllable?"
        : target === "medial"
          ? "Which vowel sits in the middle?"
          : "Which final consonant closes this syllable?",
    detail: syllable,
    visual: `<div class="big-glyph">${escapeHtml(syllable)}</div>`,
    options,
    answer,
    explanation: `The block ${syllable} breaks into ${initial} + ${medial} + ${normalizeFinal(final)}.`,
    voiceText: syllable,
    drillWholeLabel: "Syllable",
    drillPartLabel: target === "medial" ? "Vowel" : target === "final" ? "Final" : "Consonant",
    drillPartVoiceText: target === "final" ? getBatchimAudioText(answer) : answer,
    drillChoiceKind: target === "final" ? "batchim" : "letter",
    drillWeakKind: target === "final" ? "batchim" : "letter",
  };
}

function generateFamilyQuestion(pools) {
  const vowel = randomItem(pools.medials);
  const family = getVowelFamily(vowel);
  const options = makeTextChoices(family, ["vertical", "horizontal", "compound"], 3);
  const syllable = sampleSyllableForVowel(vowel, pools.finals);

  return {
    kind: "Feel the shape",
    mode: "Vowel family",
    prompt: `Which family does ${vowel} belong to?`,
    detail: "Use the shape to remember how the vowel sits inside the block.",
    visual: `<div class="big-glyph">${escapeHtml(vowel)}</div>`,
    options,
    answer: family,
    explanation: `${vowel} is part of the ${family} family. You can use that shape cue while building blocks.`,
    voiceText: syllable,
  };
}

function generateConsonantFamilyQuestion() {
  const item = randomItem(consonantAtlas);
  const answer = item.tag;
  const options = makeTextChoices(answer, SOUND_FAMILIES, 4);

  return {
    kind: "Sound family",
    mode: "Consonant identity",
    prompt: `Which family does ${item.char} belong to?`,
    detail: item.note,
    visual: `<div class="big-glyph">${escapeHtml(item.char)}</div>`,
    options,
    answer,
    explanation: `${item.char} belongs to the ${answer} family. That distinction matters in real speech.`,
    voiceText: item.example,
  };
}

function generateOnsetQuestion() {
  const onset = randomItem(INITIALS);
  const syllable = composeHangul(onset, randomItem(MEDIALS), randomItem(FINALS));
  const answer = getOnsetType(onset);
  const options = makeTextChoices(answer, ONSET_TYPES, 4);

  return {
    kind: "Onset type",
    mode: "Sound flow",
    prompt: `What kind of onset starts ${syllable}?`,
    detail: "Use the first position in the block to spot whether the onset is silent, plain, aspirated, or tense.",
    visual: `<div class="syllable-stack"><span>${escapeHtml(syllable)}</span></div>`,
    options,
    answer,
    explanation: `${syllable} starts with a ${answer}. The onset is what your ear hears first.`,
    voiceText: syllable,
  };
}

function generateVowelFamilyQuestion(pools) {
  const vowel = randomItem(pools.medials);
  const family = getVowelFamily(vowel);
  const options = makeTextChoices(family, ["vertical", "horizontal", "compound"], 3);
  const syllable = sampleSyllableForVowel(vowel, pools.finals);

  return {
    kind: "Vowel shape",
    mode: "Vowel geometry",
    prompt: `Which family does ${vowel} belong to?`,
    detail: "Vowel shapes help predict how the block is built.",
    visual: `<div class="big-glyph">${escapeHtml(vowel)}</div>`,
    options,
    answer: family,
    explanation: `${vowel} is part of the ${family} family. Shape is a fast memory hook.`,
    voiceText: syllable,
  };
}

function generateSurvivalMeaningQuestion() {
  const item = randomItem(survivalPhrases);
  const options = makeTextChoices(item.meaning, survivalPhrases.map((entry) => entry.meaning), 4);

  return {
    kind: "Phrase meaning",
    mode: "Everyday Korean",
    prompt: `What does ${item.phrase} mean?`,
    detail: item.situation,
    visual: `<div class="big-glyph">${escapeHtml(item.phrase)}</div>`,
    options,
    answer: item.meaning,
    explanation: `${item.phrase} means ${item.meaning}.`,
    voiceText: item.voiceText,
  };
}

function generateSurvivalSituationQuestion() {
  const item = randomItem(survivalPhrases);
  const options = makeTextChoices(item.phrase, survivalPhrases.map((entry) => entry.phrase), 4);

  return {
    kind: "Best phrase",
    mode: "Situation fit",
    prompt: item.situation,
    detail: "Choose the Korean phrase that fits best.",
    visual: `<div class="big-glyph">${escapeHtml(item.meaning)}</div>`,
    options,
    answer: item.phrase,
    explanation: `${item.phrase} fits that situation naturally.`,
    voiceText: item.voiceText,
  };
}

function generateSurvivalClozeQuestion() {
  const item = randomItem(survivalCloze);
  const options = shuffle([...item.options]);

  return {
    kind: "Fill the blank",
    mode: "Phrase build",
    prompt: `Complete the phrase: ${item.prompt}`,
    detail: "Use the word that makes the phrase natural and polite.",
    visual: `<div class="syllable-stack"><span>${escapeHtml(item.prompt)}</span></div>`,
    options,
    answer: item.answer,
    explanation: item.explanation,
    voiceText: item.voiceText,
  };
}

function generateSurvivalAudioQuestion() {
  const item = randomItem(survivalPhrases);
  const options = makeTextChoices(item.meaning, survivalPhrases.map((entry) => entry.meaning), 4);

  return {
    kind: "Listen",
    mode: "Phrase audio",
    prompt: "Listen to the phrase, then choose the meaning.",
    detail: "Use the audio button if you want to hear it again.",
    visual: `<div class="big-glyph">◉</div>`,
    options,
    answer: item.meaning,
    explanation: `${item.phrase} means ${item.meaning}.`,
    voiceText: item.voiceText,
    autoSpeak: true,
  };
}

function generateGrammarClozeQuestion() {
  const item = randomItem(grammarClozeBank);

  return {
    kind: "Fill the blank",
    mode: "Sentence building",
    prompt: `Complete the sentence: ${item.prompt}`,
    detail: "Use the ending or particle that makes the sentence natural.",
    visual: `<div class="syllable-stack"><span>${escapeHtml(item.prompt)}</span></div>`,
    options: shuffle([...item.options]),
    answer: item.answer,
    explanation: item.explanation,
    voiceText: item.voiceText,
  };
}

function generateGrammarRoleQuestion() {
  const item = randomItem(grammarRoleBank);

  return {
    kind: "Grammar role",
    mode: "Sentence building",
    prompt: `In "${item.sentence}", what does ${item.marker} do?`,
    detail: "Focus on the grammar job the marker performs.",
    visual: `<div class="big-glyph">${escapeHtml(item.marker)}</div>`,
    options: shuffle([...item.options]),
    answer: item.answer,
    explanation: item.explanation,
    voiceText: item.voiceText,
  };
}

function generateGrammarMeaningQuestion() {
  const item = randomItem(grammarSentenceBank);
  const options = makeTextChoices(item.meaning, grammarSentenceBank.map((entry) => entry.meaning), 4);

  return {
    kind: "Sentence meaning",
    mode: "Sentence building",
    prompt: `What does this sentence mean? ${item.korean}`,
    detail: item.explanation,
    visual: `<div class="big-glyph">${escapeHtml(item.korean)}</div>`,
    options,
    answer: item.meaning,
    explanation: `${item.korean} means ${item.meaning}.`,
    voiceText: item.voiceText,
  };
}

function generateGrammarOrderQuestion() {
  const item = randomItem(grammarSentenceBank);
  const options = makeTextChoices(item.korean, grammarSentenceBank.map((entry) => entry.korean), 4);

  return {
    kind: "Sentence order",
    mode: "Sentence building",
    prompt: `Which Korean sentence matches: "${item.meaning}"?`,
    detail: "Korean often keeps the verb at the end of the sentence.",
    visual: `<div class="syllable-stack"><span>${escapeHtml(item.meaning)}</span></div>`,
    options,
    answer: item.korean,
    explanation: `${item.korean} matches the meaning "${item.meaning}".`,
    voiceText: item.voiceText,
  };
}

function generateGrammarListenQuestion() {
  const item = randomItem(grammarSentenceBank);
  const options = makeTextChoices(item.meaning, grammarSentenceBank.map((entry) => entry.meaning), 4);

  return {
    kind: "Listen",
    mode: "Sentence audio",
    prompt: "Listen to the sentence, then choose the meaning.",
    detail: "Use the audio button if you want to hear it again.",
    visual: `<div class="big-glyph">◉</div>`,
    options,
    answer: item.meaning,
    explanation: `${item.korean} means ${item.meaning}.`,
    voiceText: item.voiceText,
    autoSpeak: true,
  };
}

function generateVerbConjugationQuestion() {
  const item = randomItem(verbBank);
  const tense = randomItem(["present", "past", "future"]);
  const tenseLabel =
    tense === "present" ? "present polite" : tense === "past" ? "past polite" : "future polite";
  const answer = item[tense];
  const options = makeTextChoices(answer, verbBank.map((entry) => entry[tense]), 4);

  return {
    kind: "Conjugate it",
    mode: "Verb system",
    prompt: `What is the ${tenseLabel} form of ${item.base}?`,
    detail: item.meaning,
    visual: `<div class="big-glyph">${escapeHtml(item.base)}</div>`,
    options,
    answer,
    explanation: `${item.base} becomes ${answer} in the ${tenseLabel} form.`,
    voiceText: answer,
  };
}

function generateVerbTenseQuestion() {
  const item = randomItem(verbSentenceBank);
  const options = makeTextChoices(item.tense, ["present", "past", "future", "honorific"], 4);

  return {
    kind: "Tense check",
    mode: "Verb system",
    prompt: `What kind of form is used in "${item.korean}"?`,
    detail: "Look at the ending and decide whether it is present, past, future, or honorific.",
    visual: `<div class="big-glyph">${escapeHtml(item.korean)}</div>`,
    options,
    answer: item.tense,
    explanation: `${item.korean} uses a ${item.tense} form.`,
    voiceText: item.voiceText,
  };
}

function generateVerbPatternQuestion() {
  const item = randomItem(verbBank);
  const patterns = [...new Set(verbBank.map((entry) => entry.pattern))];
  const options = makeTextChoices(item.pattern, patterns, 4);

  return {
    kind: "Pattern check",
    mode: "Verb system",
    prompt: `Which pattern does ${item.base} follow?`,
    detail: "Irregular verbs change the stem before the ending is attached.",
    visual: `<div class="big-glyph">${escapeHtml(item.base)}</div>`,
    options,
    answer: item.pattern,
    explanation: `${item.base} follows the ${item.pattern} pattern.`,
    voiceText: item.base,
  };
}

function generateVerbMeaningQuestion() {
  const item = randomItem(verbSentenceBank);
  const options = makeTextChoices(item.meaning, verbSentenceBank.map((entry) => entry.meaning), 4);

  return {
    kind: "Sentence meaning",
    mode: "Verb system",
    prompt: `What does this sentence mean? ${item.korean}`,
    detail: item.explanation,
    visual: `<div class="big-glyph">${escapeHtml(item.korean)}</div>`,
    options,
    answer: item.meaning,
    explanation: `${item.korean} means ${item.meaning}.`,
    voiceText: item.voiceText,
  };
}

function generateVerbOrderQuestion() {
  const item = randomItem(verbSentenceBank);
  const options = makeTextChoices(item.korean, verbSentenceBank.map((entry) => entry.korean), 4);

  return {
    kind: "Sentence order",
    mode: "Verb system",
    prompt: `Which Korean sentence matches: "${item.meaning}"?`,
    detail: "Keep the verb close to the end and match the ending to the situation.",
    visual: `<div class="syllable-stack"><span>${escapeHtml(item.meaning)}</span></div>`,
    options,
    answer: item.korean,
    explanation: `${item.korean} matches "${item.meaning}".`,
    voiceText: item.voiceText,
  };
}

function generateVerbListenQuestion() {
  const item = randomItem(verbSentenceBank);
  const options = makeTextChoices(item.meaning, verbSentenceBank.map((entry) => entry.meaning), 4);

  return {
    kind: "Listen",
    mode: "Verb system",
    prompt: "Listen to the sentence, then choose the meaning.",
    detail: "Use the audio button if you want to hear it again.",
    visual: `<div class="big-glyph">◉</div>`,
    options,
    answer: item.meaning,
    explanation: `${item.korean} means ${item.meaning}.`,
    voiceText: item.voiceText,
    autoSpeak: true,
  };
}

function generateVerbHonorificQuestion() {
  const item = randomItem(verbHonorificBank);
  const options = makeTextChoices(item.honorific, verbHonorificBank.map((entry) => entry.honorific), 4);

  return {
    kind: "Honorific form",
    mode: "Verb system",
    prompt: `Which sentence is the respectful version of "${item.plain}"?`,
    detail: item.cue,
    visual: `<div class="syllable-stack"><span>${escapeHtml(item.plain)}</span><span>→</span><span>?</span></div>`,
    options,
    answer: item.honorific,
    explanation: `${item.plain} becomes ${item.honorific} in respectful speech.`,
    voiceText: item.honorific,
  };
}

function generateConversationMeaningQuestion() {
  const item = randomItem(conversationLineBank);
  const options = makeTextChoices(item.meaning, conversationLineBank.map((entry) => entry.meaning), 4);

  return {
    kind: "Phrase meaning",
    mode: "Conversation studio",
    prompt: `What does ${item.korean} mean?`,
    detail: item.cue,
    visual: `<div class="big-glyph">${escapeHtml(item.korean)}</div>`,
    options,
    answer: item.meaning,
    explanation: `${item.korean} means ${item.meaning}.`,
    voiceText: item.voiceText,
  };
}

function generateConversationRepairQuestion() {
  const item = randomItem(conversationRepairBank);
  const options = makeTextChoices(item.phrase, conversationRepairBank.map((entry) => entry.phrase), 4);

  return {
    kind: "Repair phrase",
    mode: "Conversation studio",
    prompt: item.cue,
    detail: "Choose the phrase that keeps the conversation going.",
    visual: `<div class="big-glyph">↻</div>`,
    options,
    answer: item.phrase,
    explanation: `${item.phrase} is the best repair phrase here.`,
    voiceText: item.voiceText,
  };
}

function generateConversationReplyQuestion() {
  const item = randomItem(conversationScenarioBank);
  const options = makeTextChoices(item.answer, conversationScenarioBank.map((entry) => entry.answer), 4);

  return {
    kind: "Speak it",
    mode: "Conversation studio",
    prompt: item.cue,
    detail: "Pick the phrase you would say out loud.",
    visual: `<div class="big-glyph">💬</div>`,
    options,
    answer: item.answer,
    explanation: item.explanation,
    voiceText: item.voiceText,
  };
}

function generateConversationDialogueQuestion() {
  const item = randomItem(conversationDialogueBank);
  const options = makeTextChoices(item.reply, conversationDialogueBank.map((entry) => entry.reply), 4);

  return {
    kind: "Dialogue turn",
    mode: "Conversation studio",
    prompt: `A: ${item.starter}\nB: ?`,
    detail: item.cue,
    visual: `<div class="syllable-stack"><span>${escapeHtml(item.starter)}</span><span>→</span><span>?</span></div>`,
    options,
    answer: item.reply,
    explanation: item.explanation,
    voiceText: item.voiceText,
  };
}

function generateConversationListenQuestion() {
  const item = randomItem(conversationLineBank);
  const options = makeTextChoices(item.meaning, conversationLineBank.map((entry) => entry.meaning), 4);

  return {
    kind: "Listen",
    mode: "Conversation studio",
    prompt: "Listen to the line, then choose the meaning.",
    detail: "Use the audio button if you want to hear it again.",
    visual: `<div class="big-glyph">◉</div>`,
    options,
    answer: item.meaning,
    explanation: `${item.korean} means ${item.meaning}.`,
    voiceText: item.voiceText,
    autoSpeak: true,
  };
}

function generateConversationShadowQuestion() {
  const item = randomItem(conversationLineBank);
  const options = makeTextChoices(item.korean, conversationLineBank.map((entry) => entry.korean), 4);

  return {
    kind: "Shadow it",
    mode: "Conversation studio",
    prompt: "Listen to the line, then choose the phrase to repeat.",
    detail: "Shadow the exact Korean line out loud after you hear it.",
    visual: `<div class="big-glyph">◌</div>`,
    options,
    answer: item.korean,
    explanation: `The line to shadow is ${item.korean}. Repeat it once or twice out loud.`,
    voiceText: item.voiceText,
    autoSpeak: true,
  };
}

function generateTenseQuestion(pools) {
  const askFromPlain = Math.random() < 0.5;
  const letters = askFromPlain ? Object.keys(TENSE_PAIRS) : Object.keys(TENSE_REVERSE);
  const source = randomItem(letters);
  const answer = askFromPlain ? TENSE_PAIRS[source] : TENSE_REVERSE[source];
  const pool = askFromPlain ? Object.values(TENSE_PAIRS) : Object.keys(TENSE_PAIRS);
  const options = makeTextChoices(answer, pool, 4);
  const sampleFinal = Array.isArray(pools?.finals) ? randomItem(pools.finals.filter((item) => item)) || "" : "";
  const sample = composeHangul(answer, "ㅏ", sampleFinal);

  return {
    kind: "Tense pair",
    mode: "Consonant tension",
    prompt: askFromPlain
      ? `What is the tense partner of ${source}?`
      : `Which plain consonant turns into ${source}?`,
    detail: "Tense consonants are written as doubled shapes and need more mouth tension.",
    visual: `<div class="big-glyph">${escapeHtml(source)}</div>`,
    options,
    answer,
    explanation: askFromPlain
      ? `${source} tightens into ${answer}. Tense consonants are a key Hangul pattern.`
      : `${source} relaxes back to ${answer}. The pair is useful to memorize together.`,
    voiceText: sample,
  };
}

function generateBatchimQuestion(pools, forcedLetter = "") {
  const allowedFinals = new Set((pools?.finals || BATCHIM_FINALS).filter(Boolean));
  const availableGroups = BATCHIM_GROUPS
    .map((group) => ({ ...group, letters: group.letters.filter((letter) => allowedFinals.has(letter)) }))
    .filter((group) => group.letters.length > 0);
  const forcedGroup = forcedLetter
    ? availableGroups.find((group) => group.letters.includes(forcedLetter))
    : null;
  const group = forcedGroup || randomItem(availableGroups);
  const letter = forcedGroup ? forcedLetter : randomItem(group.letters);
  const answer = group.group;
  const options = makeTextChoices(answer, availableGroups.map((item) => item.group), Math.min(4, availableGroups.length));
  const sample = BATCHIM_GROUP_WORD_SAMPLE[answer] || composeHangul("ㅇ", "ㅏ", letter);

  return {
    kind: "Batchim sound",
    mode: "Final consonant groups",
    prompt: `Which closing sound group does ${letter} usually fall into?`,
    detail: "Hear the word sample, then match the final letter to its usual closing sound.",
    visual: `<span class="big-glyph" lang="ko">${escapeHtml(sample)}</span>`,
    options,
    answer,
    explanation: `In ${sample}, ${letter} closes as ${answer}. Batchim practice makes real Korean reading much easier.`,
    voiceText: sample,
    weakKey: letter,
    weakKind: "batchim",
    drillWholeLabel: "Sample",
    drillPartLabel: "Closing sound",
    drillPartVoiceText: BATCHIM_GROUP_SOUND_SPEAK[answer] || "",
  };
}

function generateListenQuestion(pools) {
  const initial = randomItem(pools.initials);
  const medial = randomItem(pools.medials);
  const final = randomItem(pools.finals);
  const answer = composeHangul(initial, medial, final);
  const options = makeSyllableChoices(answer, 4, pools);

  return {
    kind: "Listen",
    mode: "Audio match",
    prompt: "Listen, then choose the syllable.",
    detail: "Use Replay sound to hear a fresh Hangul block.",
    visual: `<div class="big-glyph">◉</div>`,
    options,
    answer,
    explanation: `You just heard ${answer}. Listening practice keeps the alphabet tied to sound, not just sight.`,
    voiceText: answer,
    autoSpeak: true,
  };
}

// Meaning-first word quiz. Prefers due SRS words, then words from completed /
// active lessons, then the whole curated bank. The legacy romanization deck
// survives only as an occasional optional "reading check".
const CURATED_QUIZ_DECK = [
  "koToMeaning", "koToMeaning", "koToMeaning",
  "meaningToKo", "meaningToKo",
  "audioToMeaning", "audioToMeaning",
  "audioToKo",
  "typeKo",
  "context",
  "reading-check",
];

function getCuratedQuizPool() {
  const curated = getCuratedWords();
  if (!curated.length) return [];
  const due = getDueVocabReviews(20).map((item) => item.word);
  const studiedIds = new Set();
  (state.vocabLessonCompleted || []).forEach((lessonId) => {
    const lesson = getWordLessonById(lessonId);
    if (lesson) lesson.newWordIds.forEach((id) => studiedIds.add(id));
  });
  if (state.vocabLessonActive) {
    const lesson = getWordLessonById(state.vocabLessonActive);
    if (lesson) lesson.newWordIds.forEach((id) => studiedIds.add(id));
  }
  const studied = curated.filter((word) => studiedIds.has(word.id));
  // Weight due words heavily, then studied words, then everything curated.
  if (due.length) return [...due, ...due, ...(studied.length ? studied : curated)];
  return studied.length ? studied : curated;
}

function generateCuratedVocabQuestion() {
  const pool = getCuratedQuizPool();
  if (!pool.length) return null;
  const type = randomItem(CURATED_QUIZ_DECK);
  if (type === "reading-check") return null; // fall through to the legacy quiz
  const word = randomItem(pool);
  let question = generateWordQuestionFor(word, type);
  if (!question) question = generateWordQuestionFor(word, "koToMeaning");
  if (question && question.interaction === "type") {
    // The generic quiz card's typed answer is graded against `answer`; accept
    // any listed form by normalizing to the canonical target on grade.
    question.helper = question.helper || "Type the Korean word.";
  }
  return question;
}

function generateVocabQuestion(forcedType) {
  // Default path: meaning-first questions from the curated bank. The legacy
  // romanization-only quiz remains as (a) an explicit forcedType, and (b) the
  // occasional "reading-check" draw or curated-data-missing fallback.
  if (!forcedType && wordReferenceReady) {
    const curatedQuestion = generateCuratedVocabQuestion();
    if (curatedQuestion) return curatedQuestion;
  }

  const pool = getVocabStudyPool();
  if (!pool.length) {
    return {
      kind: "Words",
      mode: "Vocabulary bank",
      prompt: "The 5,000-word bank is still loading.",
      detail: vocabBankError || "Try the Library tab again in a moment.",
      visual: `<div class="big-glyph">5,000</div>`,
      options: ["Reload", "Open Library", "Try again", "Study phrases"],
      answer: "Reload",
      explanation: vocabBankError || "The vocabulary CSV is not ready yet.",
      voiceText: "",
    };
  }

  const knownSet = getVocabKnownSet();
  const hardSet = getVocabHardSet();
  const hardPool = pool.filter((entry) => hardSet.has(entry.rank));
  const freshPool = pool.filter((entry) => !knownSet.has(entry.rank) && !hardSet.has(entry.rank));
  const sourcePool = hardPool.length ? [...hardPool, ...hardPool, ...freshPool] : freshPool.length ? freshPool : pool;
  const item = randomItem(sourcePool);
  const type = forcedType || randomItem(vocabDeck);
  const noteSuffix = item.tokenNote ? ` ${item.tokenNote}` : "";
  const englishSpelling = item.englishSpelling || item.romanization;
  const pronunciation = item.pronunciation || englishSpelling;
  const statusLabel = knownSet.has(item.rank) ? "Known" : hardSet.has(item.rank) ? "Hard" : "Fresh";
  const detail = `${item.frequencyBand} • ${item.syllables} syllable${item.syllables === 1 ? "" : "s"} • ${statusLabel}`;

  if (type === "hangul-to-roman") {
    const options = makeTextChoices(englishSpelling, vocabEnglishChoices, 4);

    return {
      kind: "Words",
      mode: "Korean → English spelling",
      prompt: "Which English spelling matches this Korean word?",
      detail,
      visual: `<div class="big-glyph" lang="ko">${escapeHtml(item.korean)}</div><div class="fs-xs text-muted-2">Korean spelling</div>`,
      options,
      answer: englishSpelling,
      explanation: `${item.korean} is commonly written ${englishSpelling}. Pronunciation: ${pronunciation}.${noteSuffix}`,
      voiceText: item.korean,
    };
  }

  if (type === "listen") {
    const options = makeTextChoices(item.korean, vocabKoreanChoices, 4);

    return {
      kind: "Words",
      mode: "Listen and match",
      prompt: "Listen, then choose the Hangul spelling.",
      detail,
      visual: `<div class="big-glyph">♪</div><div class="fs-xs text-muted-2">${escapeHtml(englishSpelling)}</div>`,
      options,
      answer: item.korean,
      explanation: `You heard ${item.korean}. The pronunciation is ${pronunciation}.${noteSuffix}`,
      voiceText: item.korean,
      autoSpeak: true,
    };
  }

  const options = makeTextChoices(item.korean, vocabKoreanChoices, 4);

  return {
    kind: "Words",
    mode: "English spelling → Hangul",
    prompt: "Which Hangul spelling matches this English spelling?",
    detail,
    visual: `<div class="big-glyph">${escapeHtml(englishSpelling)}</div><div class="fs-xs text-muted-2">Pronunciation: ${escapeHtml(pronunciation)}</div>`,
    options,
    answer: item.korean,
    explanation: `${englishSpelling} is written ${item.korean}. Pronunciation: ${pronunciation}.${noteSuffix}`,
    voiceText: item.korean,
  };
}

function generateQuestion() {
  const pools = getPools();
  const studio = getStudio();
  const vocabularyLevel = getTrackLevel("vocabulary");
  const sentenceLevel = getTrackLevel("sentences");
  const listeningLevel = getTrackLevel("listening");
  const deck =
    studio === "sound"
      ? soundDeck
      : studio === "sentences"
        ? getSentenceDeckForLevel(sentenceLevel)
        : studio === "listen"
          ? getListenDeckForLevel(listeningLevel)
          : studio === "survival"
            ? survivalDeck
          : studio === "grammar"
            ? grammarDeck
          : studio === "verb"
            ? verbDeck
          : studio === "conversation"
            ? conversationDeck
          : studio === "vocab"
                    ? getVocabDeckForLevel(vocabularyLevel)
                    : pools.deck;
  const type = randomItem(deck);

  if (studio === "sound") {
    if (type === "sound-family") {
      return generateConsonantFamilyQuestion();
    }

    if (type === "onset") {
      return generateOnsetQuestion();
    }

    if (type === "vowel-shape") {
      return generateVowelFamilyQuestion(pools);
    }

    if (type === "batchim") {
      return generateBatchimQuestion(pools);
    }

    if (type === "tense") {
      return generateTenseQuestion(pools);
    }

    return generateListenQuestion(pools);
  }

  if (studio === "survival") {
    if (type === "meaning") {
      return generateSurvivalMeaningQuestion();
    }

    if (type === "situation") {
      return generateSurvivalSituationQuestion();
    }

    if (type === "cloze") {
      return generateSurvivalClozeQuestion();
    }

    return generateSurvivalAudioQuestion();
  }

  if (studio === "grammar") {
    if (type === "cloze") {
      return generateGrammarClozeQuestion();
    }

    if (type === "role") {
      return generateGrammarRoleQuestion();
    }

    if (type === "meaning") {
      return generateGrammarMeaningQuestion();
    }

    if (type === "order") {
      return generateGrammarOrderQuestion();
    }

    return generateGrammarListenQuestion();
  }

  if (studio === "verb") {
    if (type === "conjugate") {
      return generateVerbConjugationQuestion();
    }

    if (type === "tense") {
      return generateVerbTenseQuestion();
    }

    if (type === "pattern") {
      return generateVerbPatternQuestion();
    }

    if (type === "meaning") {
      return generateVerbMeaningQuestion();
    }

    if (type === "order") {
      return generateVerbOrderQuestion();
    }

    if (type === "listen") {
      return generateVerbListenQuestion();
    }

    return generateVerbHonorificQuestion();
  }

  if (studio === "conversation") {
    if (type === "meaning") {
      return generateConversationMeaningQuestion();
    }

    if (type === "repair") {
      return generateConversationRepairQuestion();
    }

    if (type === "reply") {
      return generateConversationReplyQuestion();
    }

    if (type === "dialogue") {
      return generateConversationDialogueQuestion();
    }

    if (type === "listen") {
      return generateConversationListenQuestion();
    }

    if (type === "shadow") {
      return generateConversationShadowQuestion();
    }

    return generateConversationListenQuestion();
  }

  if (studio === "vocab") {
    return generateVocabQuestion(type);
  }

  if (studio === "sentences") {
    if (type === "type") {
      return makeSentenceTypingQuestion(sentenceLevel);
    }

    return makeSentenceBuildQuestion(sentenceLevel);
  }

  if (studio === "listen") {
    return makeListenStudioQuestion(type, listeningLevel);
  }

  if (studio === "alphabet") {
    if (type === "vowel-shape") {
      return generateVowelFamilyQuestion(pools);
    }

    if (type === "sound-family") {
      return generateConsonantFamilyQuestion();
    }

    if (type === "onset") {
      return generateOnsetQuestion();
    }

    if (type === "compose") {
      return generateComposeQuestion(pools);
    }

    if (type === "decompose") {
      return generateDecomposeQuestion(pools);
    }

    if (type === "tense") {
      return generateTenseQuestion(pools);
    }

    if (type === "batchim") {
      return generateBatchimQuestion(pools);
    }

    return generateListenQuestion(pools);
  }

  return generateListenQuestion(pools);
}

function createQuestionResponse(question) {
  if (question.interaction === "build") {
    return {
      slots: Array.from({ length: Array.isArray(question.answerTokens) ? question.answerTokens.length : 0 }, () => null),
      value: "",
      choice: "",
      noticeHtml: "",
      feedbackHtml: "",
      userAnswer: "",
    };
  }

  if (question.interaction === "type") {
    return {
      slots: [],
      value: "",
      choice: "",
      noticeHtml: "",
      feedbackHtml: "",
      userAnswer: "",
    };
  }

  return {
    slots: [],
    value: "",
    choice: "",
    noticeHtml: "",
    feedbackHtml: "",
    userAnswer: "",
  };
}

function syncReviewActionButton(question) {
  const nextBtn = document.getElementById(getQuizIds(getCurrentQuizScope()).next);
  if (!nextBtn) return;
  const needsCheck = !currentAnswered && (question.interaction === "build" || question.interaction === "type");
  const needsChoice = !currentAnswered && question.interaction !== "build" && question.interaction !== "type";
  nextBtn.textContent = needsCheck ? "Check →" : needsChoice ? "Choose an answer" : "Next →";
  nextBtn.disabled = needsChoice;
}

function getTokenById(question, tokenId) {
  return (question.tokenPool || []).find((token) => token.id === tokenId) || null;
}

function renderChoiceQuestion(question, quizOptions) {
  const response = question.response || createQuestionResponse(question);
  // The picked answer is recorded on `userAnswer` for every quiz type; `choice`
  // is only populated for interaction === "choice", so fall back to it here so
  // the option the learner tapped always gets the wrong-answer styling.
  const chosen = response.choice || response.userAnswer;
  quizOptions.innerHTML = (Array.isArray(question.options) ? question.options : [])
    .map((option) => {
      const classes = ["option"];
      if (currentAnswered) {
        if (option === question.answer) {
          classes.push("correct");
        }
        if (chosen === option && option !== question.answer) {
          classes.push("wrong");
        }
      }
      return `<button class="${classes.join(" ")}" type="button" data-option="${escapeHtml(option)}" ${currentAnswered ? "disabled" : ""} ${textLanguageAttr(option)}>${escapeHtml(option)}</button>`;
    })
    .join("");

  if (currentAnswered) return;

  quizOptions.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", () => {
      const option = button.dataset.option || "";
      const feedbackSpeech = HANGUL_TEXT_PATTERN.test(option)
        ? speakableForClickableText(option, { preferSoundLabels: getCurrentQuizScope() === "alphabet" })
        : currentQuestion?.voiceText;
      chooseAnswer(option);
      if (feedbackSpeech) scheduleAutoSpeak(feedbackSpeech, 100);
    });
  });
}

function placeBuildToken(question, tokenId, slotIndex = null) {
  if (!question?.response || currentAnswered) return;

  const response = question.response;
  const token = getTokenById(question, tokenId);
  if (token) speakClickableText(token.text);
  const slots = response.slots || [];
  const currentIndex = slots.indexOf(tokenId);
  if (currentIndex >= 0) {
    slots[currentIndex] = null;
  }

  if (Number.isInteger(slotIndex) && slotIndex >= 0 && slotIndex < slots.length) {
    slots[slotIndex] = tokenId;
  } else {
    const emptyIndex = slots.findIndex((value) => !value);
    if (emptyIndex >= 0) {
      slots[emptyIndex] = tokenId;
    }
  }

  response.noticeHtml = "";
  renderQuestion(question, { preserveState: true, scope: getCurrentQuizScope() });
}

function clearBuildSlot(question, slotIndex) {
  if (!question?.response || currentAnswered) return;

  const response = question.response;
  if (!Array.isArray(response.slots) || !Number.isInteger(slotIndex) || slotIndex < 0 || slotIndex >= response.slots.length) {
    return;
  }

  const token = getTokenById(question, response.slots[slotIndex]);
  if (token) speakClickableText(token.text);
  response.slots[slotIndex] = null;
  response.noticeHtml = "";
  renderQuestion(question, { preserveState: true, scope: getCurrentQuizScope() });
}

function renderBuildQuestion(question, quizOptions) {
  const response = question.response || createQuestionResponse(question);
  const answerTokens = Array.isArray(question.answerTokens) && question.answerTokens.length ? question.answerTokens : tokenizeSentence(question.answer);
  const slots = Array.isArray(response.slots) ? response.slots : [];
  const tokenMap = new Map((question.tokenPool || []).map((token) => [token.id, token]));
  const occupied = new Set(slots.filter(Boolean));
  const poolTokens = (question.tokenPool || []).filter((token) => !occupied.has(token.id));

  const slotHtml = answerTokens
    .map((expected, index) => {
      const tokenId = slots[index];
      const token = tokenId ? tokenMap.get(tokenId) : null;
      const filled = Boolean(token);
      const correct = currentAnswered && token ? normalizeStudyText(token.text) === normalizeStudyText(expected) : false;
      const slotClasses = ["sentence-slot"];
      if (filled) slotClasses.push("filled");
      if (currentAnswered) slotClasses.push(correct ? "correct" : "wrong");
      return `
        <button class="${slotClasses.join(" ")}" type="button" data-slot-index="${index}" ${currentAnswered ? "disabled" : ""} aria-label="Slot ${index + 1}">
          <span class="sentence-slot-index">${index + 1}</span>
          <span class="sentence-slot-text">${filled ? escapeHtml(token.text) : '<span class="sentence-slot-placeholder">Tap a word</span>'}</span>
        </button>`;
    })
    .join("");

  const poolHtml = poolTokens
    .map((token) => `<button class="sentence-token" type="button" draggable="${currentAnswered ? "false" : "true"}" data-token-id="${token.id}" ${currentAnswered ? "disabled" : ""} lang="ko">${escapeHtml(token.text)}</button>`)
    .join("");

  quizOptions.innerHTML = `
    <div class="sentence-builder">
      <div class="sentence-build-slots">${slotHtml}</div>
      <div class="sentence-build-pool">${poolHtml}</div>
      <div class="sentence-build-actions">
        <button class="button secondary compact" type="button" id="sentenceBuildClearBtn" ${currentAnswered ? "disabled" : ""}>Clear all</button>
      </div>
    </div>
  `;

  if (currentAnswered) return;

  const clearBtn = document.getElementById("sentenceBuildClearBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      response.slots = response.slots.map(() => null);
      response.noticeHtml = "";
      renderQuestion(question, { preserveState: true });
    });
  }

  quizOptions.querySelectorAll("[data-token-id]").forEach((button) => {
    button.addEventListener("click", () => placeBuildToken(question, button.dataset.tokenId || ""));
    button.addEventListener("dragstart", (event) => {
      event.dataTransfer?.setData("text/plain", button.dataset.tokenId || "");
      if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
    });
  });

  quizOptions.querySelectorAll("[data-slot-index]").forEach((button) => {
    button.addEventListener("click", () => clearBuildSlot(question, Number(button.dataset.slotIndex)));
    button.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    button.addEventListener("drop", (event) => {
      event.preventDefault();
      const tokenId = event.dataTransfer?.getData("text/plain") || "";
      if (tokenId) {
        placeBuildToken(question, tokenId, Number(button.dataset.slotIndex));
      }
    });
  });
}

function renderTypeQuestion(question, quizOptions) {
  const response = question.response || createQuestionResponse(question);
  const value = String(response.value || "");
  const ids = getQuizIds(getCurrentQuizScope());

  quizOptions.innerHTML = `
    <div class="sentence-type">
      <label class="sentence-type-label" for="${ids.options}Input">Your answer</label>
      <input
        class="sentence-input"
        id="${ids.options}Input"
        type="text"
        inputmode="none"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
        placeholder="${escapeHtml(question.placeholder || "Type the sentence here")}"
        value="${escapeHtml(value)}"
        ${currentAnswered ? "disabled" : ""}
      />
      <div class="sentence-type-actions">
        <button class="button secondary compact" type="button" id="${ids.options}Clear" ${currentAnswered ? "disabled" : ""}>Clear</button>
      </div>
      <div class="virtual-keyboard" id="${ids.options}Keyboard" ${currentAnswered ? "hidden" : ""}>
         <div class="vk-row">
            <button type="button" class="vk-key" data-key="ㅂ" data-shift="ㅃ">ㅂ</button>
            <button type="button" class="vk-key" data-key="ㅈ" data-shift="ㅉ">ㅈ</button>
            <button type="button" class="vk-key" data-key="ㄷ" data-shift="ㄸ">ㄷ</button>
            <button type="button" class="vk-key" data-key="ㄱ" data-shift="ㄲ">ㄱ</button>
            <button type="button" class="vk-key" data-key="ㅅ" data-shift="ㅆ">ㅅ</button>
            <button type="button" class="vk-key" data-key="ㅛ" data-shift="ㅛ">ㅛ</button>
            <button type="button" class="vk-key" data-key="ㅕ" data-shift="ㅕ">ㅕ</button>
            <button type="button" class="vk-key" data-key="ㅑ" data-shift="ㅑ">ㅑ</button>
            <button type="button" class="vk-key" data-key="ㅐ" data-shift="ㅒ">ㅐ</button>
            <button type="button" class="vk-key" data-key="ㅔ" data-shift="ㅖ">ㅔ</button>
         </div>
         <div class="vk-row">
            <button type="button" class="vk-key" data-key="ㅁ">ㅁ</button>
            <button type="button" class="vk-key" data-key="ㄴ">ㄴ</button>
            <button type="button" class="vk-key" data-key="ㅇ">ㅇ</button>
            <button type="button" class="vk-key" data-key="ㄹ">ㄹ</button>
            <button type="button" class="vk-key" data-key="ㅎ">ㅎ</button>
            <button type="button" class="vk-key" data-key="ㅗ">ㅗ</button>
            <button type="button" class="vk-key" data-key="ㅓ">ㅓ</button>
            <button type="button" class="vk-key" data-key="ㅏ">ㅏ</button>
            <button type="button" class="vk-key" data-key="ㅣ">ㅣ</button>
         </div>
         <div class="vk-row">
            <button type="button" class="vk-key vk-shift" id="${ids.options}VkShift">⇧</button>
            <button type="button" class="vk-key" data-key="ㅋ">ㅋ</button>
            <button type="button" class="vk-key" data-key="ㅌ">ㅌ</button>
            <button type="button" class="vk-key" data-key="ㅊ">ㅊ</button>
            <button type="button" class="vk-key" data-key="ㅍ">ㅍ</button>
            <button type="button" class="vk-key" data-key="ㅠ">ㅠ</button>
            <button type="button" class="vk-key" data-key="ㅜ">ㅜ</button>
            <button type="button" class="vk-key" data-key="ㅡ">ㅡ</button>
            <button type="button" class="vk-key vk-backspace" id="${ids.options}VkBksp">⌫</button>
         </div>
         <div class="vk-row">
            <button type="button" class="vk-key vk-space" id="${ids.options}VkSpace">Space</button>
         </div>
      </div>
    </div>
  `;

  if (currentAnswered) return;

  const input = document.getElementById(`${ids.options}Input`);
  const clearBtn = document.getElementById(`${ids.options}Clear`);
  const vkKeyboard = document.getElementById(`${ids.options}Keyboard`);
  const vkShift = document.getElementById(`${ids.options}VkShift`);

  if (input) {
    input.focus({ preventScroll: true });
    input.setSelectionRange(input.value.length, input.value.length);
    input.addEventListener("input", () => {
      response.value = input.value;
      response.noticeHtml = "";
      const quizFeedback = document.getElementById(ids.feedback);
      if (quizFeedback) {
        quizFeedback.innerHTML = question.helper ? `<span>${escapeHtml(question.helper)}</span>` : "";
      }
      saveState();
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        nextQuestion();
      }
    });
  }

  if (vkKeyboard && input) {
    let isShift = false;
    const updateInputFromJamo = (jamos) => {
      input.value = window.Hangul ? window.Hangul.assemble(jamos) : jamos.join("");
      input.dispatchEvent(new Event("input"));
      input.focus({ preventScroll: true });
      input.setSelectionRange(input.value.length, input.value.length);
    };

    vkKeyboard.addEventListener("click", (e) => {
      const btn = e.target.closest(".vk-key");
      if (!btn) return;

      const currentJamos = window.Hangul ? window.Hangul.disassemble(input.value) : input.value.split("");

      if (btn.id === `${ids.options}VkShift`) {
        isShift = !isShift;
        btn.classList.toggle("active", isShift);
        vkKeyboard.querySelectorAll(".vk-key[data-shift]").forEach(k => {
          k.textContent = isShift ? k.dataset.shift : k.dataset.key;
        });
        return;
      }

      if (btn.id === `${ids.options}VkBksp`) {
        currentJamos.pop();
        updateInputFromJamo(currentJamos);
        return;
      }

      if (btn.id === `${ids.options}VkSpace`) {
        currentJamos.push(" ");
        updateInputFromJamo(currentJamos);
        return;
      }

      if (btn.dataset.key) {
        const char = isShift && btn.dataset.shift ? btn.dataset.shift : btn.dataset.key;
        currentJamos.push(char);
        updateInputFromJamo(currentJamos);
        speakClickableText(char, { preferSoundLabels: true });
        if (isShift) {
           isShift = false;
           vkShift.classList.remove("active");
           vkKeyboard.querySelectorAll(".vk-key[data-shift]").forEach(k => {
             k.textContent = k.dataset.key;
           });
        }
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      response.value = "";
      response.noticeHtml = "";
      if (input) {
        input.value = "";
        input.focus({ preventScroll: true });
      }
      const quizFeedback = document.getElementById(ids.feedback);
      if (quizFeedback) {
        quizFeedback.innerHTML = question.helper ? `<span>${escapeHtml(question.helper)}</span>` : "";
      }
      saveState();
    });
  }
}

function renderQuestion(question, options = {}) {
  const { preserveState = false } = options;
  currentQuizScope = normalizeMainTab(options.scope || currentQuizScope || state.mainTab || activeTab || "alphabet");
  currentQuestion = question;
  question.scope = currentQuizScope;
  if (!preserveState) {
    currentAnswered = false;
    currentQuestionStartedAt = Date.now();
    question.response = createQuestionResponse(question);
  } else if (!question.response) {
    question.response = createQuestionResponse(question);
  }

  const ids = getQuizIds(currentQuizScope);
  const quizType = document.getElementById(ids.type);
  const quizVisual = document.getElementById(ids.visual);
  const quizPrompt = document.getElementById(ids.prompt);
  const quizDetail = document.getElementById(ids.detail);
  const quizFeedback = document.getElementById(ids.feedback);
  const quizOptions = document.getElementById(ids.options);
  const speakBtn = document.getElementById(ids.speak);
  const nextBtn = document.getElementById(ids.next);

  if (!quizOptions) return;

  quizOptions.className = "quiz-options";
  if (question.interaction === "build") {
    quizOptions.classList.add("build-mode");
  } else if (question.interaction === "type") {
    quizOptions.classList.add("type-mode");
  }

  if (quizType) quizType.textContent = question.kind || "—";
  if (quizVisual) quizVisual.innerHTML = getQuestionVisual(question);
  if (quizPrompt) quizPrompt.textContent = question.prompt || "";
  if (quizDetail) quizDetail.textContent = question.detail || "";

  const response = question.response || createQuestionResponse(question);
  if (quizFeedback) {
    const feedbackHtml = currentAnswered
      ? response.feedbackHtml || ""
      : response.noticeHtml || (question.helper ? `<span>${escapeHtml(question.helper)}</span>` : "");
    quizFeedback.innerHTML = feedbackHtml;
  }

  if (question.interaction === "build") {
    renderBuildQuestion(question, quizOptions);
  } else if (question.interaction === "type") {
    renderTypeQuestion(question, quizOptions);
  } else {
    renderChoiceQuestion(question, quizOptions);
  }

  if (speakBtn) {
    const answerIsHangul = HANGUL_TEXT_PATTERN.test(String(question.answer || ""));
    const audioIsPrompt = Boolean(question.autoSpeak || /listen|audio/i.test(`${question.kind || ""} ${question.mode || ""}`));
    const canReplay = Boolean(question.voiceText && (currentAnswered || audioIsPrompt || !answerIsHangul));
    speakBtn.hidden = !canReplay;
    speakBtn.disabled = !canReplay;
    if (speakBtn.dataset.boundQuizControl !== "true") {
      speakBtn.dataset.boundQuizControl = "true";
      speakBtn.addEventListener("click", () => {
        if (currentQuizScope === "alphabet") {
          flashElement(quizVisual);
        }
        void speak(currentQuestion?.voiceText || currentQuestion?.answer || "");
      });
    }
  }
  if (nextBtn && nextBtn.dataset.boundQuizControl !== "true") {
    nextBtn.dataset.boundQuizControl = "true";
    nextBtn.addEventListener("click", nextQuestion);
  }
  syncReviewActionButton(question);
  if (question.autoSpeak && !preserveState && question.voiceText) scheduleAutoSpeak(question.voiceText);

  updateStats();
  saveState();
  quizStateByScope[currentQuizScope] = {
    question: currentQuestion,
    answered: currentAnswered,
    startedAt: currentQuestionStartedAt,
  };
}

function renderScopedQuestion(scope) {
  const normalized = normalizeMainTab(scope || currentQuizScope || state.mainTab || activeTab || "alphabet");
  const cached = quizStateByScope[normalized];
  if (cached?.question) {
    currentQuestion = cached.question;
    currentAnswered = Boolean(cached.answered);
    currentQuestionStartedAt = Number(cached.startedAt) || Date.now();
    renderQuestion(cached.question, { preserveState: true, scope: normalized });
    return;
  }
  renderQuestion(generateQuestion(), { scope: normalized });
}

function finalizeQuestionAttempt(userAnswer, isCorrect, feedbackHtml) {
  if (!currentQuestion || currentAnswered) return;

  const response = currentQuestion.response || createQuestionResponse(currentQuestion);
  response.userAnswer = userAnswer;
  response.feedbackHtml = feedbackHtml;
  response.noticeHtml = "";
  if (currentQuestion.interaction === "choice") {
    response.choice = userAnswer;
  } else if (currentQuestion.interaction === "type") {
    response.value = userAnswer;
  }

  state.asked += 1;
  const practiceSession = getPracticeQuizSession(getCurrentQuizScope());
  if (practiceSession && !practiceSession.complete) {
    practiceSession.asked += 1;
    if (isCorrect) {
      practiceSession.correct += 1;
      practiceSession.streak += 1;
      practiceSession.bestStreak = Math.max(practiceSession.bestStreak, practiceSession.streak);
    } else {
      practiceSession.streak = 0;
    }
  }
  if (isCorrect) {
    state.correct += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
  } else {
    state.streak = 0;
  }

  // Word questions carry their curated word id so attempts feed the vocab SRS.
  if (currentQuestion.srsWordId) {
    recordVocabAttempt(currentQuestion.srsWordId, currentQuestion.srsDirection || "koToMeaning", isCorrect, {
      latencyMs: Math.max(0, Date.now() - (Number(currentQuestionStartedAt) || Date.now())),
      source: "quiz",
    });
  }

  currentAnswered = true;
  updateStats();
  refreshProgressionState();
  saveState();
  if (isCorrect) {
    showCorrectToast();
  }
  renderQuestion(currentQuestion, { preserveState: true, scope: getCurrentQuizScope() });
}

function chooseAnswer(choice) {
  if (currentAnswered || !currentQuestion) return;

  const isCorrect = choice === currentQuestion.answer;
  const feedbackHtml = isCorrect
    ? `<strong>Correct.</strong> ${escapeHtml(currentQuestion.explanation)}`
    : `<strong>Not quite.</strong> The answer was <strong>${escapeHtml(currentQuestion.answer)}</strong>. ${escapeHtml(currentQuestion.explanation)}`;

  finalizeQuestionAttempt(choice, isCorrect, feedbackHtml);
}

function submitCurrentQuestion() {
  if (!currentQuestion || currentAnswered) return;

  if (currentQuestion.interaction === "build") {
    const response = currentQuestion.response || createQuestionResponse(currentQuestion);
    const slots = Array.isArray(response.slots) ? response.slots : [];
    if (!slots.length || slots.some((slot) => !slot)) {
      response.noticeHtml = "<strong>Fill every slot first.</strong> Use all of the words before checking.";
      renderQuestion(currentQuestion, { preserveState: true, scope: getCurrentQuizScope() });
      return;
    }

    const tokenMap = new Map((currentQuestion.tokenPool || []).map((token) => [token.id, token]));
    const userAnswer = slots.map((id) => tokenMap.get(id)?.text || "").join(" ").trim();
    const isCorrect = normalizeStudyText(userAnswer) === normalizeStudyText(currentQuestion.answer);
    const feedbackHtml = isCorrect
      ? `<strong>Correct.</strong> ${escapeHtml(currentQuestion.explanation)}`
      : `<strong>Not quite.</strong> You built <strong>${escapeHtml(userAnswer || "nothing")}</strong>. Correct answer: <strong>${escapeHtml(currentQuestion.answer)}</strong>. ${escapeHtml(currentQuestion.explanation)}`;

    finalizeQuestionAttempt(userAnswer, isCorrect, feedbackHtml);
    return;
  }

  if (currentQuestion.interaction === "type") {
    const response = currentQuestion.response || createQuestionResponse(currentQuestion);
    const userAnswer = String(response.value || "").trim();
    if (!userAnswer) {
      response.noticeHtml = "<strong>Type the sentence first.</strong> Then press Check.";
      renderQuestion(currentQuestion, { preserveState: true, scope: getCurrentQuizScope() });
      return;
    }

    // Word questions may accept several surface forms (e.g. 은/는 particles).
    const accepted = Array.isArray(currentQuestion.acceptedAnswers) ? currentQuestion.acceptedAnswers : [];
    const isCorrect = normalizeStudyText(userAnswer) === normalizeStudyText(currentQuestion.answer)
      || accepted.some((answer) => normalizeKoreanAnswer(answer, { ignoreSpaces: true }) === normalizeKoreanAnswer(userAnswer, { ignoreSpaces: true }));
    const feedbackHtml = isCorrect
      ? `<strong>Correct.</strong> ${escapeHtml(currentQuestion.explanation)}`
      : `<strong>Not quite.</strong> You typed <strong>${escapeHtml(userAnswer)}</strong>. Correct answer: <strong>${escapeHtml(currentQuestion.answer)}</strong>. ${escapeHtml(currentQuestion.explanation)}`;

    finalizeQuestionAttempt(userAnswer, isCorrect, feedbackHtml);
  }
}

function nextQuestion() {
  if (!currentQuestion) return;

  if (!currentAnswered && (currentQuestion.interaction === "build" || currentQuestion.interaction === "type")) {
    submitCurrentQuestion();
    return;
  }

  if (!currentAnswered) {
    showRetryToast("Choose an answer before moving on.");
    return;
  }

  const practiceSession = getPracticeQuizSession(getCurrentQuizScope());
  if (practiceSession) {
    if (practiceSession.index + 1 >= practiceSession.total) {
      practiceSession.complete = true;
      delete quizStateByScope[practiceSession.scope];
      queueScreenMotion("completion", 1, { replace: false });
      renderGenericPracticeSurface(practiceSession.scope);
      return;
    }
    practiceSession.index += 1;
  }
  state.round += 1;
  renderQuestion(generateQuestion(), { scope: getCurrentQuizScope() });
}

function bindKeyboardShortcuts() {
  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement || (target instanceof HTMLElement && target.isContentEditable);
    if (typing) return;
    const ids = getQuizIds(getCurrentQuizScope());
    const quizOptions = document.getElementById(ids.options);
    const expectedScope = getCurrentQuizScope();
    // The quiz options live inside whichever screen is currently visible.
    const currentScreen = quizOptions ? quizOptions.closest(".screen") : null;
    if (!quizOptions || !currentScreen || currentScreen.hidden) return;
    if (currentQuestion && currentQuestion.scope && currentQuestion.scope !== expectedScope) return;

    if (event.key >= "1" && event.key <= "4") {
      const index = Number(event.key) - 1;
      const opts = [...quizOptions.querySelectorAll(".option")];
      const button = opts[index];
      if (button && !button.disabled) button.click();
      return;
    }
    if (event.key === "Enter") {
      const nextBtn = document.getElementById(ids.next);
      if (nextBtn) nextBtn.click();
      return;
    }
    if (event.key.toLowerCase() === "h") {
      speak(currentQuestion?.voiceText || currentQuestion?.answer || "");
    }
  });
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

let activeTab = normalizeNavTab(state.navTab || getNavTabForMainTab(state.mainTab) || "today");

// ─── HUB + SUBMENU MODEL ─────────────────────────────────────────────────────
// The app is organised as four bottom-tab "hubs". Home opens straight to the
// dashboard; Learn / Practice / Progress each open a submenu of tiles, and a
// tile opens a focused content screen with a "back to <hub>" bar at the top.

const HUBS = ["learn", "practice", "progress"];

const HUB_DEFS = {
  learn: {
    label: "Learn",
    eyebrow: "Study material",
    title: "What do you want to learn?",
    sub: "Pick a skill to study. No quizzes here — just the material.",
    items: [
      { id: "alphabet",   icon: "가", title: "Alphabet (Hangul)", sub: "Learn to read, one stage at a time.", custom: "alphabetLesson" },
      { id: "vocabulary", icon: "📚", title: "Vocabulary",         sub: "Today's words and the full word list.", target: "library" },
      { id: "sentences",  icon: "💬", title: "Sentences",          sub: "Read and build real sentences.", target: "practice" },
      { id: "listening",  icon: "🎧", title: "Listening",          sub: "Hear sentences and follow along.", target: "listening" },
    ],
  },
  practice: {
    label: "Practice",
    eyebrow: "Exercises",
    title: "Pick something to practise",
    sub: "Quick quizzes that bring the material back in different forms.",
    items: [
      { id: "alphabet",   icon: "🎯", title: "Alphabet practice", sub: "Review letters, take a quiz, or open Drill Lab.", custom: "alphabetPracticeHub" },
      { id: "vocabulary", icon: "🎯", title: "Vocabulary quiz", sub: "Test the words you've learned.", target: "library", view: "test" },
      { id: "sentences",  icon: "🎯", title: "Sentence Studio", sub: "Review due lines or choose a sentence drill.", target: "practice" },
      { id: "listening",  icon: "🎯", title: "Listening quiz",  sub: "Choose or type what you heard.", target: "listening" },
      { id: "vocabulary-writing", icon: "✍", title: "Vocabulary writing", sub: "Draw syllables from the words you are learning.", custom: "hangulWriting", writingSource: "vocabulary" },
      { id: "sentence-writing", icon: "✍", title: "Sentence writing", sub: "Draw syllables from your current sentence band.", custom: "hangulWriting", writingSource: "sentences" },
    ],
  },
  progress: {
    label: "Progress",
    eyebrow: "Your journey",
    title: "Track your progress",
    sub: "See the roadmap and your stats.",
    items: [
      { id: "path",  icon: "🗺", title: "Path (K0 → K5)", sub: "The full roadmap and lessons.", target: "path" },
      { id: "stats", icon: "📊", title: "Stats & streak", sub: "Accuracy, streak, and milestones.", target: "progress" },
    ],
  },
};

// Settings → Theme colors. `swatch` paints the picker dot; the real palette
// lives in styles.css as a matching `:root[data-theme="<id>"]` block
// ("ocean" is the default palette, so it has no override block).
const THEME_DEFS = [
  { id: "ocean",  name: "Ocean Blue",  swatch: "#5b9dff" },
  { id: "sakura", name: "Sakura Pink", swatch: "#f472b6" },
  { id: "mint",   name: "Mint Green",  swatch: "#34d399" },
  { id: "sunset", name: "Sunset",      swatch: "#fb923c" },
  { id: "violet", name: "Violet",      swatch: "#a78bfa" },
  { id: "rose",   name: "Rose",        swatch: "#fb7185" },
  { id: "gold",   name: "Gold",        swatch: "#fbbf24" },
  { id: "cyan",   name: "Cyan",        swatch: "#22d3ee" },
];

const SETTINGS_ICON_SVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>`;

function setSettingsShortcutVisible(visible) {
  const button = document.getElementById("app-settings-button");
  if (!button) return;
  button.hidden = !visible;
  button.setAttribute("aria-hidden", visible ? "false" : "true");
}

function applyTheme() {
  const themeId = THEME_DEFS.some((t) => t.id === state.theme) ? state.theme : "ocean";
  if (themeId === "ocean") {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = themeId;
  }
  document.documentElement.classList.toggle("app-reduced-motion", Boolean(state.reduceMotion));
}

// Legacy nav names (used by in-screen buttons) → {hub, item}.
const LEGACY_ROUTE = {
  today:     { hub: "learn" },
  path:      { hub: "progress", item: "path" },
  progress:  { hub: "progress", item: "stats" },
  library:   { hub: "learn",    item: "vocabulary" },
  practice:  { hub: "practice", item: "sentences" },
  listening: { hub: "learn",    item: "listening" },
};

let activeHub = "learn";

const MOTION_SELECTORS = [
  ".card",
  ".quiz-card",
  ".speak-task",
  ".speak-item",
  ".hub-tile",
  ".lib-item",
  ".study-row",
  ".stage-row",
  ".level-chip",
  ".study-pill",
  ".rev-stat",
  ".lesson-player-wrap",
  ".player-head",
  ".player-actions",
  ".lesson-step-row",
  ".phase-one-action-slot",
  ".concept-card",
  ".checkpoint-card",
  ".result-card",
  ".completion-stage",
  ".review-card",
].join(", ");

const SCREEN_MOTION_KINDS = new Set(["launch", "hub", "tab", "forward", "back", "completion"]);
const SCREEN_MOTION_CLASSES = [
  "screen-motion-enter",
  "screen-motion-launch",
  "screen-motion-hub",
  "screen-motion-tab",
  "screen-motion-forward",
  "screen-motion-back",
  "screen-motion-completion",
  "motion-reverse",
];
const ITEM_MOTION_CLASSES = [
  "motion-rise",
  "motion-cascade",
  "motion-focus",
  "motion-return",
  "motion-lesson-forward",
  "motion-lesson-back",
  "motion-lesson-section",
  "motion-answer",
  "motion-complete",
];

let pendingScreenMotion = null;
let screenExitTimer = 0;
let screenExitNode = null;
const lessonMotionFrames = new Map();

function motionIsReduced() {
  return Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
}

function queueScreenMotion(kind = "forward", direction = 1, { replace = true } = {}) {
  if (!replace && pendingScreenMotion) return;
  const visibleScreen = getVisibleScreen();
  const visibleRect = visibleScreen?.getBoundingClientRect();
  pendingScreenMotion = {
    kind: SCREEN_MOTION_KINDS.has(kind) ? kind : "forward",
    direction: direction < 0 ? -1 : 1,
    fromRect: visibleRect
      ? { top: visibleRect.top, left: visibleRect.left, width: visibleRect.width, height: visibleRect.height }
      : null,
  };
}

function takeScreenMotion(fallbackKind = "forward") {
  const motion = pendingScreenMotion || { kind: fallbackKind, direction: 1 };
  pendingScreenMotion = null;
  return motion;
}

function getVisibleScreen() {
  return document.querySelector(".screen:not([hidden]):not(.screen-motion-exit)");
}

function finishScreenExit() {
  if (screenExitTimer) {
    window.clearTimeout(screenExitTimer);
    screenExitTimer = 0;
  }
  if (!screenExitNode) return;
  screenExitNode.hidden = true;
  screenExitNode.innerHTML = "";
  screenExitNode.classList.remove("screen-motion-exit", "screen-motion-exit-launch", "screen-motion-exit-forward", "screen-motion-exit-back", "screen-motion-exit-tab", "screen-motion-exit-hub", "screen-motion-exit-completion", "motion-reverse");
  screenExitNode.removeAttribute("aria-hidden");
  screenExitNode.inert = false;
  screenExitNode.style.removeProperty("--screen-top");
  screenExitNode.style.removeProperty("--screen-left");
  screenExitNode.style.removeProperty("--screen-width");
  screenExitNode.style.removeProperty("--screen-height");
  screenExitNode = null;
}

function beginScreenExit(screen, motion) {
  finishScreenExit();
  if (!screen || motionIsReduced()) {
    if (screen) {
      screen.hidden = true;
      screen.innerHTML = "";
    }
    return;
  }

  const rect = motion.fromRect || screen.getBoundingClientRect();
  // The outgoing screen remains visible for a fraction of a second while the
  // destination arrives. Strip descendant ids so the incoming renderer can
  // safely reuse its legacy getElementById hooks during that overlap.
  screen.querySelectorAll("[id]").forEach((node) => node.removeAttribute("id"));
  screen.setAttribute("aria-hidden", "true");
  screen.inert = true;
  screen.style.setProperty("--screen-top", `${rect.top}px`);
  screen.style.setProperty("--screen-left", `${rect.left}px`);
  screen.style.setProperty("--screen-width", `${rect.width}px`);
  screen.style.setProperty("--screen-height", `${rect.height}px`);
  screen.classList.add("screen-motion-exit", `screen-motion-exit-${motion.kind}`);
  if (motion.direction < 0) screen.classList.add("motion-reverse");
  screenExitNode = screen;
  screenExitTimer = window.setTimeout(finishScreenExit, 420);
}

function playScreenEntrance(screen, motion) {
  if (!screen || motionIsReduced()) return;
  SCREEN_MOTION_CLASSES.forEach((className) => screen.classList.remove(className));
  void screen.offsetWidth;
  screen.dataset.motionKind = motion.kind;
  screen.classList.add("screen-motion-enter", `screen-motion-${motion.kind}`);
  if (motion.direction < 0) screen.classList.add("motion-reverse");
  window.setTimeout(() => {
    SCREEN_MOTION_CLASSES.forEach((className) => screen.classList.remove(className));
  }, 720);
}

function resetLessonMotion(channel) {
  lessonMotionFrames.delete(channel);
}

function animateLessonFrame(scope, channel, frame) {
  if (!scope || !frame) return;
  const previous = lessonMotionFrames.get(channel) || null;
  lessonMotionFrames.set(channel, frame);
  if (motionIsReduced()) return;

  if (previous && previous.key === frame.key) {
    const feedback = scope.querySelector(
      ".lesson-feedback.correct, .lesson-feedback.wrong, .quiz-feedback.correct, .quiz-feedback.wrong, .word-type-feedback.correct, .word-type-feedback.wrong, .ss-result, .sent-live-feedback:not(:empty)",
    );
    if (feedback) playMotion(feedback, "motion-feedback-pop", 520);
    return;
  }

  const direction = previous && Number(frame.order) < Number(previous.order) ? -1 : 1;
  let variant = direction < 0 ? "lesson-back" : "lesson-forward";
  if (!previous || previous.phase !== frame.phase) variant = "lesson-section";
  if (frame.phase === "feedback") variant = "answer";
  if (frame.complete) variant = "complete";

  scope.classList.remove("lesson-frame-enter", "lesson-frame-forward", "lesson-frame-back", "lesson-frame-section", "lesson-frame-answer", "lesson-frame-complete");
  void scope.offsetWidth;
  scope.classList.add("lesson-frame-enter", `lesson-frame-${variant.replace("lesson-", "")}`);
  scope.style.setProperty("--lesson-direction", String(direction));
  window.setTimeout(() => {
    scope.classList.remove("lesson-frame-enter", "lesson-frame-forward", "lesson-frame-back", "lesson-frame-section", "lesson-frame-answer", "lesson-frame-complete");
    scope.style.removeProperty("--lesson-direction");
  }, frame.complete ? 980 : 620);
  animateMotionScope(scope, MOTION_SELECTORS, variant === "complete" ? 52 : 26, variant);
}

function playMotion(node, className, cleanupMs) {
  if (!node) return;
  node.classList.remove(className);
  void node.offsetWidth;
  node.classList.add(className);
  window.setTimeout(() => {
    node.classList.remove(className);
  }, cleanupMs);
}

function animateMotionScope(scope, selectors = MOTION_SELECTORS, stepMs = 42, variant = "rise") {
  if (!scope) return;
  if (motionIsReduced()) return;
  const items = [...scope.querySelectorAll(selectors)];
  if (!items.length) return;

  items.forEach((item, index) => {
    item.classList.remove("motion-enter");
    ITEM_MOTION_CLASSES.forEach((className) => item.classList.remove(className));
    item.style.setProperty("--motion-delay", `${Math.min(index, 12) * stepMs}ms`);
  });

  void scope.offsetWidth;

  items.forEach((item, index) => {
    item.classList.add("motion-enter", `motion-${variant}`);
    window.setTimeout(() => {
      item.classList.remove("motion-enter");
      ITEM_MOTION_CLASSES.forEach((className) => item.classList.remove(className));
      item.style.removeProperty("--motion-delay");
    }, (variant === "complete" ? 980 : 780) + index * stepMs);
  });
}

function setNavActive(hub) {
  const nav = document.querySelector(".bottom-nav");
  const navIndex = Math.max(0, HUBS.indexOf(hub));
  if (nav) nav.style.setProperty("--nav-index", String(navIndex));
  document.querySelectorAll(".nav-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.nav === hub);
  });
}

function showScreen(screenId) {
  stopSpeech();

  // If a PWA update is pending, perform the reload only when returning to a safe screen (menu or progress)
  if (window.pendingUpdateReload && (screenId === "menu" || screenId === "progress")) {
    console.log("HanaPath: Performing deferred service worker update reload on safe screen:", screenId);
    window.location.reload();
    return null;
  }

  const targetId = "screen-" + screenId;
  const currentScreen = getVisibleScreen();
  const isSameScreen = currentScreen?.id === targetId;
  const hasRequestedMotion = Boolean(pendingScreenMotion);
  const motion = takeScreenMotion(isSameScreen ? "hub" : "forward");
  const shouldAnimate = !isSameScreen || hasRequestedMotion;
  if (currentScreen && !isSameScreen) beginScreenExit(currentScreen, motion);
  // Hide every screen and empty the inactive ones. Inactive screens keep their
  // quiz cards in the DOM otherwise, and the alphabet quiz on Home shares its
  // element IDs with the alphabet practice screen — getElementById would then
  // write into the hidden copy. Each screen is fully re-rendered when shown.
  document.querySelectorAll(".screen").forEach((s) => {
    if (s === screenExitNode) return;
    s.hidden = true;
    if (s.id !== targetId) s.innerHTML = "";
  });
  const screen = document.getElementById(targetId);
  if (screen) {
    screen.hidden = false;
    screen.removeAttribute("aria-hidden");
    screen.inert = false;
    screen.scrollTop = 0;
    if (shouldAnimate) {
      playScreenEntrance(screen, motion);
      const itemVariant = motion.kind === "hub" || motion.kind === "tab"
        ? "cascade"
        : motion.kind === "back"
          ? "return"
          : motion.kind === "completion"
            ? "complete"
            : "focus";
      window.requestAnimationFrame(() => {
        if (screen.querySelector("[data-lesson-motion-root]")) return;
        animateMotionScope(screen, MOTION_SELECTORS, motion.kind === "hub" ? 48 : 34, itemVariant);
      });
    }
  }
  return screen;
}

// Render a leaf content screen via the existing renderers. `focus` decides
// whether the screen shows study material, the quiz, or everything.
function renderLeafContent(navName, focus = "all") {
  const normalized = normalizeNavTab(navName);
  activeTab = normalized;
  state.navTab = normalized;
  state.mainTab = getMainTabForNavTab(normalized);
  currentQuizScope = getQuizScopeForNavTab(normalized);
  state.studio = getStudioForNavTab(normalized);
  currentFocus = focus;
  const screenId = NAV_TAB_SCREEN_IDS[normalized] || NAV_TAB_SCREEN_IDS.today;
  showScreen(screenId);
  if (normalized === "today")     renderTodayView();
  if (normalized === "path")      renderPath();
  if (normalized === "practice")  renderPracticeView();
  if (normalized === "library")   renderVocabulary();
  if (normalized === "listening") renderLibrary();
  if (normalized === "progress")  renderProgress();
}

// A persistent "‹ <hub>" bar above the screens. It lives outside the screen
// containers so it survives in-screen re-renders (level rails, lesson steps…).
function showDetailBar(hub, itemTitle) {
  const bar = document.getElementById("detail-bar");
  if (!bar) return;
  setSettingsShortcutVisible(false);
  const label = HUB_DEFS[hub] ? HUB_DEFS[hub].label : "Menu";
  const motionKey = `${hub}:${itemTitle || ""}:${label}`;
  const shouldAnimate = bar.hidden || bar.dataset.motionKey !== motionKey;
  bar.innerHTML = `
    <button class="back-btn" type="button">‹ ${escapeHtml(label)}</button>
    ${itemTitle ? `<span class="detail-bar-title">${escapeHtml(itemTitle)}</span>` : ""}
  `;
  bar.querySelector(".back-btn").addEventListener("click", () => {
    queueScreenMotion("back", -1);
    goHub(hub);
  });
  bar.hidden = false;
  bar.dataset.motionKey = motionKey;
  if (shouldAnimate) playMotion(bar, "bar-enter", 260);
}

function hideDetailBar() {
  const bar = document.getElementById("detail-bar");
  if (bar) { bar.hidden = true; bar.innerHTML = ""; delete bar.dataset.motionKey; }
  setSettingsShortcutVisible(true);
}

function showDetailBarWithBack(hub, itemTitle, onBack = null, backLabel = null) {
  const bar = document.getElementById("detail-bar");
  if (!bar) return;
  setSettingsShortcutVisible(false);
  const label = backLabel || (HUB_DEFS[hub] ? HUB_DEFS[hub].label : "Menu");
  const motionKey = `${hub}:${itemTitle || ""}:${label}`;
  const shouldAnimate = bar.hidden || bar.dataset.motionKey !== motionKey;
  bar.innerHTML = `
    <!-- [2026-06-29] Fixed mojibake back-arrow (â€¹ → ‹) in this back-bar variant. -->
    <button class="back-btn" type="button">‹ ${escapeHtml(label)}</button>
    ${itemTitle ? `<span class="detail-bar-title">${escapeHtml(itemTitle)}</span>` : ""}
  `;
  bar.querySelector(".back-btn").addEventListener("click", () => {
    queueScreenMotion("back", -1);
    if (typeof onBack === "function") {
      onBack();
      return;
    }
    goHub(hub);
  });
  bar.hidden = false;
  bar.dataset.motionKey = motionKey;
  if (shouldAnimate) playMotion(bar, "bar-enter", 260);
}

function normalizeRoute(route) {
  if (!route || typeof route !== "object") {
    return { hub: "learn", item: null, stage: null };
  }

  const allowedHubs = ["learn", "practice", "progress"];
  const hub = allowedHubs.includes(route.hub) ? route.hub : "learn";
  const item = typeof route.item === "string" ? route.item : null;
  const stage = Number.isInteger(route.stage) ? route.stage : null;
  return { hub, item, stage };
}

function getLearnItemDefinition(itemId) {
  return HUB_DEFS.learn?.items.find((item) => item.id === itemId) || null;
}

function getLearnStageCount(itemId) {
  if (itemId === "alphabet") return phaseOneLessons.length;
  if (itemId === "vocabulary" || itemId === "sentences" || itemId === "listening") return 10;
  return 0;
}

function getLearnProgress(itemId) {
  const total = getLearnStageCount(itemId);
  if (itemId === "alphabet") {
    const completedCount = getAlphabetProgress().completedCount;
    const currentStage = completedCount >= total ? total : completedCount + 1;
    return {
      total,
      completedCount,
      currentStage,
      complete: completedCount >= total,
    };
  }

  const currentStage = getTrackLevel(itemId);
  return {
    total,
    completedCount: Math.max(0, currentStage - 1),
    currentStage,
    complete: currentStage >= total,
  };
}

function getLearnStageStatus(itemId, stageNumber) {
  const progress = getLearnProgress(itemId);
  const safeStage = clampLevel(stageNumber, 1, Math.max(1, progress.total));

  if (itemId === "alphabet" && progress.complete) {
    return "complete";
  }

  if (safeStage < progress.currentStage) {
    return "complete";
  }

  if (safeStage === progress.currentStage) {
    return progress.complete && itemId === "alphabet" ? "complete" : "current";
  }

  if (TEST_UNLOCK_ALL_STAGES) {
    return "current";
  }

  return "locked";
}

function getLearnStageInfo(itemId, stageNumber) {
  const safeStage = clampLevel(stageNumber, 1, Math.max(1, getLearnStageCount(itemId)));
  const stageText = `Stage ${String(safeStage).padStart(2, "0")}`;

  if (itemId === "alphabet") {
    const lesson = phaseOneLessons[safeStage - 1];
    return {
      stageNumber: safeStage,
      title: lesson ? `${stageText} · ${lesson.shortTitle}` : stageText,
      sub: lesson ? lesson.goal : "Alphabet lesson",
      detail: lesson ? `${stageText}: ${lesson.shortTitle}` : stageText,
    };
  }

  if (itemId === "vocabulary") {
    const bandIndex = getLevelBand(safeStage, VOCAB_BANDS.length);
    const bandLabel = VOCAB_BANDS[bandIndex - 1] || "Vocabulary";
    return {
      stageNumber: safeStage,
      title: `${stageText} · ${bandLabel}`,
      sub: `Vocabulary band ${bandIndex} of ${VOCAB_BANDS.length}`,
      detail: `${stageText}: ${bandLabel}`,
    };
  }

  if (itemId === "sentences") {
    const sentenceBands = [
      "Basic sentence frames",
      "Simple sentence order",
      "Type and build",
      "Longer sentences",
      "Mixed review",
    ];
    const bandIndex = getLevelBand(safeStage, sentenceBands.length);
    const bandLabel = sentenceBands[bandIndex - 1] || "Sentence practice";
    return {
      stageNumber: safeStage,
      title: `${stageText} · ${bandLabel}`,
      sub: `Sentence band ${bandIndex} of ${sentenceBands.length}`,
      detail: `${stageText}: ${bandLabel}`,
    };
  }

  if (itemId === "listening") {
    const listeningBands = [
      "Short sounds",
      "Short phrases",
      "Sentence meaning",
      "Dictation",
      "Mixed listening",
    ];
    const bandIndex = getLevelBand(safeStage, listeningBands.length);
    const bandLabel = listeningBands[bandIndex - 1] || "Listening practice";
    return {
      stageNumber: safeStage,
      title: `${stageText} · ${bandLabel}`,
      sub: `Listening band ${bandIndex} of ${listeningBands.length}`,
      detail: `${stageText}: ${bandLabel}`,
    };
  }

  return {
    stageNumber: safeStage,
    title: stageText,
    sub: "",
    detail: stageText,
  };
}

function getActiveLearnLevel(itemId) {
  const route = normalizeRoute(state.route);
  if (route.hub === "learn" && route.item === itemId && Number.isInteger(route.stage)) {
    return clampLevel(route.stage, 1, Math.max(1, getLearnStageCount(itemId)));
  }
  return getTrackLevel(itemId);
}

function renderHubMenu(hub) {
  const def = HUB_DEFS[hub];
  const el = showScreen("menu");
  if (!def || !el) return;
  setSettingsShortcutVisible(true);
  el.innerHTML = `
    <div class="hub-header">
      <div class="eyebrow">${escapeHtml(def.eyebrow)}</div>
      <h2 class="screen-title" style="margin-bottom:6px;">${escapeHtml(def.title)}</h2>
      <div class="screen-sub" style="margin-bottom:0;">${escapeHtml(def.sub)}</div>
    </div>
    <div class="hub-tiles">
      ${def.items.map((item) => `
        <button class="hub-tile" type="button" data-hub-item="${escapeHtml(item.id)}">
          <span class="hub-tile-icon">${item.icon}</span>
          <span class="hub-tile-text">
            <strong>${escapeHtml(item.title)}</strong>
            <small>${escapeHtml(item.sub)}</small>
          </span>
          <span class="hub-tile-go" aria-hidden="true">›</span>
        </button>
      `).join("")}
    </div>
  `;
  el.querySelectorAll("[data-hub-item]").forEach((btn) => {
    btn.addEventListener("click", () => {
      queueScreenMotion("forward", 1);
      openHubItem(hub, btn.dataset.hubItem);
    });
  });
  el.querySelector("[data-open-settings]")?.addEventListener("click", () => {
    queueScreenMotion("forward", 1);
    renderSettingsScreen(hub);
  });
}

// Settings screen (opened from the top-right shortcut on any hub menu).
function renderSettingsScreen(hub = activeHub) {
  const el = showScreen("detail");
  if (!el) return;
  showDetailBar(hub, "Settings");

  const activeTheme = THEME_DEFS.some((t) => t.id === state.theme) ? state.theme : "ocean";
  const writingLineWidth = Math.max(6, Math.min(28, Number(state.writingLineWidth) || 14));
  el.innerHTML = `
    <div class="hub-header">
      <div class="eyebrow">Preferences</div>
      <h2 class="screen-title" style="margin-bottom:6px;">Settings</h2>
      <div class="screen-sub" style="margin-bottom:0;">Make HanaPath feel like yours.</div>
    </div>
    <div class="settings-section">
      <h3 class="settings-section-title">Theme colors</h3>
      <p class="settings-section-sub">Pick an accent color for buttons, glows, and highlights. Applies instantly.</p>
      <div class="theme-grid">
        ${THEME_DEFS.map((theme) => `
          <button class="theme-swatch ${theme.id === activeTheme ? "active" : ""}" type="button"
            data-theme-pick="${escapeHtml(theme.id)}"
            style="--swatch:${theme.swatch}; --swatch-glow:${theme.swatch}55;"
            aria-pressed="${theme.id === activeTheme}">
            <span class="theme-swatch-dot">${theme.id === activeTheme ? "✓" : ""}</span>
            <span class="theme-swatch-name">${escapeHtml(theme.name)}</span>
          </button>
        `).join("")}
      </div>
    </div>
    <div class="settings-section">
      <h3 class="settings-section-title">Handwriting ink</h3>
      <p class="settings-section-sub">Adjust line thickness for finger, mouse, or stylus drawing. Recognition follows the shape centre-line, so this does not change scoring.</p>
      <div class="ink-setting-row">
        <label for="writingLineWidth">Line thickness</label>
        <output id="writingLineWidthValue" for="writingLineWidth">${writingLineWidth}px</output>
      </div>
      <input class="settings-range" id="writingLineWidth" type="range" min="6" max="28" step="1" value="${writingLineWidth}" />
      <div class="ink-setting-preview" aria-hidden="true"><span style="height:${writingLineWidth}px"></span></div>
    </div>
    <div class="settings-section settings-toggle-row">
      <div>
        <h3 class="settings-section-title">Reduced motion</h3>
        <p class="settings-section-sub">Use instant navigation and minimal lesson animation.</p>
      </div>
      <button class="settings-toggle ${state.reduceMotion ? "active" : ""}" type="button" id="reduceMotionToggle" role="switch" aria-label="Use reduced motion" aria-checked="${state.reduceMotion ? "true" : "false"}"><span></span></button>
    </div>
    <div class="settings-section">
      <h3 class="settings-section-title">Progress backup</h3>
      <p class="settings-section-sub">Progress lives on this device. Export a backup file to keep it safe or to move it — for example between the browser and the installed app, which store progress separately.</p>
      <div class="settings-backup-actions">
        <button class="button primary compact" type="button" id="exportProgressBtn">Export progress</button>
        <button class="button secondary compact" type="button" id="importProgressBtn">Import progress</button>
        <input type="file" id="importProgressFile" accept="application/json,.json" hidden />
      </div>
      <p class="settings-section-sub" id="backupStatusLine" role="status" aria-live="polite" style="margin-top:10px; margin-bottom:0;"></p>
    </div>
  `;

  el.querySelectorAll("[data-theme-pick]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.theme = btn.dataset.themePick;
      saveState();
      applyTheme();
      el.querySelectorAll("[data-theme-pick]").forEach((b) => {
        const active = b === btn;
        b.classList.toggle("active", active);
        b.setAttribute("aria-pressed", String(active));
        b.querySelector(".theme-swatch-dot").textContent = active ? "✓" : "";
      });
    });
  });
  const widthInput = el.querySelector("#writingLineWidth");
  const widthOutput = el.querySelector("#writingLineWidthValue");
  const widthPreview = el.querySelector(".ink-setting-preview span");
  if (widthInput) widthInput.addEventListener("input", () => {
    const value = Math.max(6, Math.min(28, Number(widthInput.value) || 14));
    state.writingLineWidth = value;
    if (widthOutput) widthOutput.textContent = `${value}px`;
    if (widthPreview) widthPreview.style.height = `${value}px`;
    saveState();
  });
  const reduceMotionToggle = el.querySelector("#reduceMotionToggle");
  if (reduceMotionToggle) reduceMotionToggle.addEventListener("click", () => {
    state.reduceMotion = !state.reduceMotion;
    document.documentElement.classList.toggle("app-reduced-motion", state.reduceMotion);
    reduceMotionToggle.classList.toggle("active", state.reduceMotion);
    reduceMotionToggle.setAttribute("aria-checked", state.reduceMotion ? "true" : "false");
    saveState();
  });

  const backupStatus = el.querySelector("#backupStatusLine");
  const setBackupStatus = (message) => {
    if (backupStatus) backupStatus.textContent = message;
  };
  const exportButton = el.querySelector("#exportProgressBtn");
  if (exportButton) exportButton.addEventListener("click", () => {
    saveState();
    downloadBackupFile();
    setBackupStatus("Backup file downloaded. Keep it somewhere safe.");
  });
  const importButton = el.querySelector("#importProgressBtn");
  const importInput = el.querySelector("#importProgressFile");
  if (importButton && importInput) {
    importButton.addEventListener("click", () => importInput.click());
    importInput.addEventListener("change", async () => {
      const file = importInput.files && importInput.files[0];
      importInput.value = "";
      if (!file) return;
      let imported;
      try {
        imported = parseBackupState(await file.text());
        if (!imported || typeof imported !== "object" || Array.isArray(imported)) {
          throw new Error("Backup file does not contain state data.");
        }
      } catch (error) {
        setBackupStatus(`That file is not a valid HanaPath backup — nothing was changed. (${error && error.message ? error.message : "unreadable file"})`);
        return;
      }
      const proceed = window.confirm("Replace the progress on this device with the backup file? Your current progress is kept as a one-step rollback copy.");
      if (!proceed) {
        setBackupStatus("Import cancelled — nothing was changed.");
        return;
      }
      try {
        const current = localStorage.getItem(STORAGE_KEY);
        if (current) localStorage.setItem(`${STORAGE_KEY}-import-rollback`, current);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(imported));
      } catch (error) {
        setBackupStatus("Could not write the imported progress to storage — nothing was changed.");
        return;
      }
      // Reload so the imported save flows through loadState()'s defaults merge
      // exactly like any other persisted state.
      window.location.reload();
    });
  }
}

function renderLearnStageMenu(itemId) {
  const item = getLearnItemDefinition(itemId);
  if (!item) return;

  const progress = getLearnProgress(itemId);
  const el = showScreen("menu");
  if (!el) return;

  const stageRowItems = Array.from({ length: progress.total }, (_, index) => {
    const stageNumber = index + 1;
    const stageInfo = getLearnStageInfo(itemId, stageNumber);
    const status = getLearnStageStatus(itemId, stageNumber);
    const locked = status === "locked";
    const complete = status === "complete";
    const current = status === "current";
    const pillLabel = complete ? "Completed" : current ? "Current" : "Locked";
    const pillClass = complete ? "green" : "muted";
    const dotClass = complete ? "done" : current ? "next" : "lock";
    const dotText = complete ? "✓" : String(stageNumber).padStart(2, "0");

    const lockHint = locked ? ` data-locked-stage="${stageNumber}"` : "";
    return { status, html: `
      <button class="study-row stage-row ${status}" type="button" data-learn-stage="${stageNumber}"${lockHint}>
        <span class="unit-dot ${dotClass}">${escapeHtml(dotText)}</span>
        <div>
          <div class="study-row-ko">${escapeHtml(stageInfo.title)}</div>
          <div class="study-row-sub">${escapeHtml(stageInfo.sub)}</div>
        </div>
        <span class="pill ${pillClass}">${pillLabel}</span>
      </button>
    ` };
  });
  const stageRows = stageRowItems.map((item) => item.html).join("");
  const sentenceStageRows = itemId === "sentences"
    ? (() => {
      const currentRows = stageRowItems.filter((item) => item.status === "current");
      const completedRows = stageRowItems.filter((item) => item.status === "complete");
      const lockedRows = stageRowItems.filter((item) => item.status === "locked");
      const collapsedGroup = (label, rows, className) => rows.length
        ? `<details class="stage-collapse ${className}"><summary>${escapeHtml(label)} <span class="pill muted">${rows.length}</span></summary><div class="study-list">${rows.map((item) => item.html).join("")}</div></details>`
        : "";
      return `
        ${currentRows.length ? `<div class="study-list stage-current-list">${currentRows.map((item) => item.html).join("")}</div>` : ""}
        ${collapsedGroup("Completed stages", completedRows, "is-complete")}
        ${collapsedGroup("Locked stages", lockedRows, "is-locked")}
      `;
    })()
    : stageRows;

  // [2026-06-29] Entry card for the Entire Korean Alphabet board, pinned atop the alphabet stage list.
  const fullAlphabetHtml = itemId === "alphabet"
    ? `
    <button class="card alpha-board-entry" type="button" id="openEntireAlphabet">
      <div class="alpha-board-entry-main">
        <div class="eyebrow">Reference</div>
        <div class="study-row-ko">Entire Korean alphabet</div>
        <div class="screen-sub" style="margin-bottom:0;">Every consonant and vowel as a keyboard or list — tap to hear each sound.</div>
      </div>
      <span class="alpha-board-entry-glyphs" lang="ko" aria-hidden="true">가나다</span>
    </button>`
    : "";

  // Words section: keep the stage menu grouped into a few high-level buckets.
  const wordDueCount = itemId === "vocabulary" ? getVocabDueCount() : 0;
  const wordBankHtml = itemId === "vocabulary" ? wordBankEntryCardHtml() : "";
  const wordBasicsHtml = itemId === "vocabulary" ? wordBasicsSectionHtml() : "";
  const wordReviewHtml = itemId === "vocabulary" && wordDueCount
    ? `
    <div class="card letter-review-banner">
      <div class="flex-between" style="gap:16px;">
        <div style="display:flex;flex-direction:column;gap:4px;">
          <div class="eyebrow">Make it stick</div>
          <div class="screen-sub" style="margin-bottom:0;">${wordDueCount} word${wordDueCount === 1 ? "" : "s"} ready for spaced review.</div>
        </div>
        <button class="button primary compact" type="button" id="stageWordReviewBtn" style="white-space:nowrap;flex-shrink:0;">Review (${wordDueCount})</button>
      </div>
    </div>`
    : "";
  const sentenceDueCount = getTotalDueSentencesCount();
  const sentenceReviewHtml = itemId === "vocabulary" && sentenceDueCount > 0
    ? `
    <div class="card letter-review-banner">
      <div class="flex-between" style="gap:16px;">
        <div style="display:flex;flex-direction:column;gap:4px;">
          <div class="eyebrow">Make it stick · Sentences</div>
          <div class="screen-sub" style="margin-bottom:0;">${sentenceDueCount} sentence${sentenceDueCount === 1 ? "" : "s"} ready for spaced review.</div>
        </div>
        <button class="button primary compact" type="button" id="stageSentenceReviewBtn" style="white-space:nowrap;flex-shrink:0;">Review (${sentenceDueCount})</button>
      </div>
    </div>`
    : "";
  const wordPathHtml = itemId === "vocabulary" ? wordLessonsSectionHtml() : "";

  const stagesHtml = itemId === "vocabulary"
    ? vocabularyStagesSectionHtml()
    : itemId === "alphabet"
      ? alphabetStagesSectionHtml()
      : `
    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">Stages</div>
          <div class="screen-sub" style="margin-bottom:0;">${progress.complete ? "All stages are unlocked." : `Current stage: ${escapeHtml(getLearnStageInfo(itemId, progress.currentStage).detail)}`}</div>
        </div>
        <span class="pill accent" style="white-space:nowrap;">${progress.completedCount}/${progress.total}</span>
      </div>
      <div class="study-list">
        ${sentenceStageRows}
      </div>
    </div>`;

  const alphabetGridHtml = itemId === "alphabet"
    ? `
    <div class="alphabet-menu-grid">
      ${fullAlphabetHtml}
      ${stagesHtml}
    </div>`
    : "";

  el.innerHTML = `
    <div class="card">
      <div class="eyebrow">Learn · ${escapeHtml(item.title)}</div>
      <h2 class="screen-title" style="margin-bottom:0;">Choose a stage</h2>
    </div>
    ${itemId === "alphabet" ? alphabetGridHtml : `
      ${wordBankHtml}
      ${wordBasicsHtml}
      ${wordReviewHtml}
      ${sentenceReviewHtml}
      ${wordPathHtml}
      ${stagesHtml}
    `}
  `;

  el.querySelectorAll("[data-learn-stage]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.lockedStage) {
        const currentStageInfo = getLearnStageInfo(itemId, progress.currentStage);
        showRetryToast(`Finish "${currentStageInfo.title}" to unlock this stage.`);
        return;
      }
      queueScreenMotion("forward", 1);
      openLearnStage(itemId, Number(btn.dataset.learnStage));
    });
  });
  const completeAlphabetBtn = el.querySelector("[data-complete-alphabet-section]");
  if (completeAlphabetBtn) completeAlphabetBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    completeAlphabetSectionForTesting();
    renderLearnStageMenu("alphabet");
  });
  // [2026-06-29] Wire the full-alphabet entry card.
  const entireAlphabetBtn = document.getElementById("openEntireAlphabet");
  if (entireAlphabetBtn) entireAlphabetBtn.addEventListener("click", () => openEntireAlphabet());
  if (itemId === "alphabet") {
    bindAlphabetSectionCards(el);
  }
  bindWordBankEntryCard(el);
  if (itemId === "vocabulary") {
    bindVocabularySectionCards(el, "menu");
  }
  const stageWordReviewBtn = document.getElementById("stageWordReviewBtn");
  if (stageWordReviewBtn) stageWordReviewBtn.addEventListener("click", () => openWordReview());
  const stageSentenceReviewBtn = document.getElementById("stageSentenceReviewBtn");
  if (stageSentenceReviewBtn) stageSentenceReviewBtn.addEventListener("click", () => showTab("practice"));
}

function openLearnStageMenu(itemId) {
  const item = getLearnItemDefinition(itemId);
  if (!item) return;

  refreshProgressionState();
  queueScreenMotion("forward", 1, { replace: false });
  activeHub = "learn";
  setNavActive("learn");
  state.route = { hub: "learn", item: itemId, stage: null };
  saveState();
  showDetailBarWithBack("learn", item.title, () => goHub("learn"), "Learn");
  renderLearnStageMenu(itemId);
}

function openLearnStageContent(itemId, stageNumber) {
  const item = getLearnItemDefinition(itemId);
  if (!item) return;

  const stageInfo = getLearnStageInfo(itemId, stageNumber);
  queueScreenMotion("forward", 1, { replace: false });
  activeHub = "learn";
  setNavActive("learn");
  state.learnInProgress = false;
  state.route = { hub: "learn", item: itemId, stage: stageInfo.stageNumber };
  saveState();
  showDetailBarWithBack("learn", stageInfo.detail, () => openLearnStageMenu(itemId), item.title);
  renderLeafContent(item.target, "learn");
}

function openLearnStage(itemId, stageNumber, { resume = false } = {}) {
  const item = getLearnItemDefinition(itemId);
  if (!item) return;

  const safeStage = clampLevel(stageNumber, 1, getLearnStageCount(itemId));
  const status = getLearnStageStatus(itemId, safeStage);
  if (status === "locked") return;

  if (itemId === "alphabet") {
    const progress = getLearnProgress(itemId);
    openLearnLesson(safeStage - 1, {
      resume: false,
      trackProgress: safeStage === progress.currentStage,
    });
    return;
  }

  openLearnStageContent(itemId, safeStage);
}

function openHubItem(hub, itemId) {
  const def = HUB_DEFS[hub];
  if (!def) return;
  const item = def.items.find((i) => i.id === itemId);
  if (!item) return;
  refreshProgressionState();
  activeHub = hub;
  setNavActive(hub);

  if (hub === "learn") {
    openLearnStageMenu(itemId);
    return;
  }

  state.route = { hub, item: itemId, stage: null };
  if (item.view) { state.vocabView = item.view; }
  saveState();

  const focus = hub === "practice" ? "practice" : hub === "learn" ? "learn" : "all";
  showDetailBar(hub, item.title);

  if (item.custom === "alphabetLesson") {
    const idx = getFirstIncompletePhaseOneIndex();
    if (idx < phaseOneLessons.length) {
      openLearnLesson(idx);
    } else {
      renderAlphabetLearn(); // Hangul finished — show the letter reference.
    }
    return;
  }
  if (item.custom === "alphabetPracticeHub") {
    renderAlphabetPracticeHub();
    return;
  }
  if (item.custom === "alphabetPractice") {
    renderAlphabetPractice();
    return;
  }
  if (item.custom === "pronunciationDrill") {
    renderPronunciationDrill();
    return;
  }
  if (item.custom === "hangulWriting") {
    enterHangulWriting(item.writingSource || "alphabet");
    return;
  }

  if (hub === "practice" && (itemId === "vocabulary" || itemId === "listening")) {
    startGenericPracticeSession(itemId);
  }
  renderLeafContent(item.target, focus);
}

// Tapping the Learn tab: resume an in-progress lesson, else show the menu.
function tapLearnTab() {
  refreshProgressionState();
  const idx = getFirstIncompletePhaseOneIndex();
  if (state.learnInProgress && idx < phaseOneLessons.length) {
    activeHub = "learn";
    setNavActive("learn");
    openLearnLesson(idx, { resume: true });
    return;
  }
  goHub("learn");
}

// Open the next new thing to learn: an alphabet lesson while Hangul is
// unfinished, otherwise the new-vocabulary screen.
function startNextLearn(opts = {}) {
  refreshProgressionState();
  const idx = getFirstIncompletePhaseOneIndex();
  if (idx < phaseOneLessons.length) {
    openLearnLesson(idx, opts);
    return;
  }
  // Hangul done → the next guided word lesson becomes the new material.
  state.learnInProgress = false;
  const nextWordLesson = getNextWordLesson();
  if (nextWordLesson) {
    openWordLesson(nextWordLesson.id, { resume: state.vocabLessonActive === nextWordLesson.id });
    return;
  }
  openLearnStageContent("vocabulary", getTrackLevel("vocabulary"));
}

function getRequestedLearnLaunch() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("learn") !== "alphabet") {
    return null;
  }

  const requestedStage = Number(params.get("stage"));
  const stageNumber = Number.isInteger(requestedStage) ? requestedStage : 1;
  const stageIndex = clampLevel(stageNumber, 1, phaseOneLessons.length) - 1;
  const lesson = phaseOneLessons[stageIndex];
  if (!lesson) {
    return null;
  }

  const requestedCard = Number(params.get("card"));
  const hasCard = Number.isInteger(requestedCard);
  const cardIndex = hasCard ? clampLevel(requestedCard, 1, lesson.concepts.length) - 1 : 0;
  const requestedMode = params.get("mode");
  const mode = requestedMode === "intro" || requestedMode === "learn" || requestedMode === "check"
    ? requestedMode
    : (hasCard ? "learn" : "intro");

  return {
    lessonIndex: stageIndex,
    mode,
    slideIndex: cardIndex,
  };
}

// Mount the Hangul lesson player inside `area` and wire its controls.
// onResult(passed) fires once when the lesson reaches its result screen.
function mountLessonPlayer(area, index, { onResult } = {}) {
  if (!area) return;
  const lesson = phaseOneLessons[index];
  const alphabetProgress = getAlphabetProgress();
  const completedStages = alphabetProgress.completedCount;
  const completionPercent = Math.round((completedStages / Math.max(1, alphabetProgress.total)) * 100);
  area.innerHTML = `
    <div class="lesson-player-wrap alphabet-lesson-player" id="lessonPlayerWrap">
      <div class="player-head">
        <div class="alphabet-lesson-topline">
          <div class="alphabet-progress-chip">
            <div class="eyebrow" id="hpStageNumber">Learn 1 / ${lesson?.concepts?.length || 1}</div>
            <div class="alphabet-progress-track" aria-label="Alphabet progress">
              <span id="hpProgressBar" style="width:${completionPercent}%"></span>
            </div>
          </div>
          <button class="button secondary compact word-card-bank-button alphabet-reference-button" id="hpReferenceBtn" type="button">📚 Hangul Reference</button>
        </div>
        <div class="alphabet-lesson-heading">
          <div class="alphabet-lesson-heading-line">
            <div class="eyebrow">Alphabet lesson</div>
            <div class="player-title${lesson?.id === "base-consonants" ? " player-title-compact" : ""}" id="hpStageTitle"></div>
          </div>
        </div>
      </div>
      <div id="hpStage"></div>
      <div class="player-actions word-card-nav-actions" id="hpActions">
        <button class="button secondary compact" id="hpBackBtn" type="button">Back</button>
        <button class="button primary compact" id="hpActionBtn" type="button">Next card</button>
      </div>
    </div>
  `;

  els.phaseOneStageNumber   = document.getElementById("hpStageNumber");
  els.phaseOneStageDuration = { textContent: "" };
  els.phaseOneStageTitle    = document.getElementById("hpStageTitle");
  els.phaseOneStageGoal     = { textContent: "" };
  els.phaseOneHearButton    = document.getElementById("hpHearBtn");
  els.phaseOneReferenceButton = document.getElementById("hpReferenceBtn");
  els.phaseOneStage         = document.getElementById("hpStage");
  els.phaseOneBackButton    = document.getElementById("hpBackBtn");
  els.phaseOneActionButton  = document.getElementById("hpActionBtn");
  els.phaseOneProgressText    = { textContent: "" };
  els.phaseOneProgressPercent = { textContent: "" };
  els.phaseOneProgressBar     = { setAttribute: () => {}, querySelector: () => ({ style: {} }) };
  els.phaseOneNextUp          = { textContent: "" };
  els.continuePhaseOneButton  = { textContent: "" };
  els.phaseOneFinale          = { hidden: true };
  els.phaseOneDrillButton     = null;
  els.resetPhaseOneButton     = { textContent: "" };
  els.phaseOneTrack           = { innerHTML: "" };
  els.phaseOnePlayer          = document.getElementById("lessonPlayerWrap");

  renderPhaseOnePlayer();

  els.phaseOneReferenceButton.addEventListener("click", () => {
    state.quickRefActive = true;
    openEntireAlphabet();
  });
  if (els.phaseOneHearButton) {
    els.phaseOneHearButton.addEventListener("click", () => {
      void playPhaseOneVoiceSequence();
    });
  }
  els.phaseOneBackButton.addEventListener("click", goBackPhaseOne);
  els.phaseOneActionButton.addEventListener("click", () => {
    const wasResult = phaseOneView.mode === "result";
    advancePhaseOne();
    if (!wasResult && phaseOneView.mode === "result" && typeof onResult === "function") {
      onResult(phaseOneView.passed);
    }
  });
  const stageEl = document.getElementById("hpStage");
  let introSwipeStart = null;
  if (stageEl) {
    stageEl.addEventListener("pointerdown", (event) => {
      if (phaseOneView.mode !== "intro") return;
      if (event.button !== 0 && event.pointerType === "mouse") return;
      if (event.target instanceof Element && event.target.closest("button, a, input, textarea, select")) return;
      introSwipeStart = {
        x: event.clientX,
        y: event.clientY,
        time: Date.now(),
      };
    });
    stageEl.addEventListener("pointerup", (event) => {
      if (phaseOneView.mode !== "intro" || !introSwipeStart) return;
      const dx = event.clientX - introSwipeStart.x;
      const dy = event.clientY - introSwipeStart.y;
      const dt = Date.now() - introSwipeStart.time;
      introSwipeStart = null;
      if (dt > 650) return;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
      if (dx < 0) {
        advancePhaseOne();
      } else {
        goBackPhaseOne();
      }
    });
    stageEl.addEventListener("pointercancel", () => {
      introSwipeStart = null;
    });
    stageEl.addEventListener("lostpointercapture", () => {
      introSwipeStart = null;
    });
  }
  stageEl.addEventListener("click", (e) => {
    const openRef = e.target.closest("[data-checkpoint-open-reference]");
    if (openRef) {
      state.quickRefActive = true;
      openEntireAlphabet();
      return;
    }
    const token = e.target.closest("[data-speak]");
    if (token && stageEl.contains(token)) {
      flashElement(token);
      void speak(token.dataset.speak || token.textContent || "");
      return;
    }
    const tile = e.target.closest(".bd-tile");
    if (tile instanceof HTMLButtonElement && !tile.disabled) {
      answerPhaseOneBuild(tile.dataset.jamo || "", tile);
      return;
    }
    const btn = e.target.closest(".lesson-option");
    if (btn instanceof HTMLButtonElement && !btn.disabled) {
      answerPhaseOneQuestion(btn.dataset.option || "", btn);
    }
  });
  // Keyboard activation for tap-to-hear tokens.
  stageEl.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const token = e.target.closest("[data-speak]");
    if (!token || !stageEl.contains(token)) return;
    e.preventDefault();
    flashElement(token);
    void speak(token.dataset.speak || token.textContent || "");
  });
}

// Open a Hangul lesson inside the Learn hub (detail screen).
function openLearnLesson(
  index,
  {
    resume = false,
    allowResult = false,
    trackProgress = true,
    startMode = "intro",
    startIntroIndex = 0,
    startSlideIndex = 0,
    startQuestionIndex = 0,
  } = {},
) {
  queueScreenMotion("forward", 1, { replace: false });
  let idx = index;
  if (!phaseOneLessons[idx]) { startNextLearn(); return; }
  if (!getAlphabetProgress().isLessonUnlocked(idx)) {
    idx = Math.min(getFirstIncompletePhaseOneIndex(), phaseOneLessons.length - 1);
  }
  const lesson = phaseOneLessons[idx];

  activeHub = "learn";
  setNavActive("learn");
  // Normally re-opening a lesson with `resume` restarts a finished (result) view
  // from the top; but the alphabet quick-reference return passes `allowResult`
  // so it lands the learner back exactly on the result/review screen they left.
  const canResume = resume && phaseOneView.lessonIndex === idx && (allowResult || phaseOneView.mode !== "result");
  if (!canResume) {
    resetPhaseOneView(idx, startMode, {
      introIndex: startIntroIndex,
      slideIndex: startSlideIndex,
      questionIndex: startQuestionIndex,
    });
  }
  if (trackProgress) {
    state.phaseOneActive = idx;
    state.learnInProgress = true;
  } else {
    state.learnInProgress = false;
  }
  state.route = { hub: "learn", item: "alphabet", stage: idx + 1 };
  saveState();

  showDetailBarWithBack("learn", `Stage ${String(idx + 1).padStart(2, "0")}: ${lesson.shortTitle}`, () => openLearnStageMenu("alphabet"), "Alphabet");
  const el = showScreen("detail");
  if (!el) return;
  // The player head already shows the stage, title and goal, and the back bar
  // shows the stage too — so no separate header card here (avoids the cramped,
  // triple-titled look).
  el.innerHTML = `<div id="learnLessonArea" data-lesson-motion-root></div>`;
  mountLessonPlayer(document.getElementById("learnLessonArea"), idx, {
    onResult: (passed) => {
      if (passed) {
        state.learnInProgress = false;
        saveState();
        renderCompleteInPlayer(idx);
      }
    },
  });
}

// Per-lesson "streamers" line for the lesson-complete screen.
const PHASE_ONE_COMPLETE_CHEERS = {
  "anchor-vowels": "You know the six anchor vowels!",
  "base-consonants": "You know the base consonants!",
  "block-geometry": "You can build syllable blocks!",
  "complete-vowels": "You know all 21 vowels!",
  "strong-consonants": "You know the strong consonants!",
  "batchim-basics": "You can read batchim!",
  "reading-graduation": "You can read real Korean words!",
  "alphabet-mastery": "You can read Hangul!",
};

// Inline complete: keep the player in place, replace hpStage with the complete
// layout — cheer banner, restart/next tiles, summary, return tile. Only the
// final alphabet lesson additionally gets the Drill Lab / reference / review
// extras; every other lesson (first run or replay) stays uncluttered.
function renderCompleteInPlayer(index) {
  refreshProgressionState();
  // Some check modes park the hpActions bar in a slot inside the stage; pull
  // it back out before the innerHTML swap below would destroy it.
  restorePhaseOneActions();
  const lesson = phaseOneLessons[index];
  const isFinalLesson = index === phaseOneLessons.length - 1;
  const next = phaseOneLessons[index + 1];

  showDetailBarWithBack("learn", `Stage ${String(index + 1).padStart(2, "0")}: ${lesson.shortTitle}`, () => openLearnStageMenu("alphabet"), "Alphabet");

  const summaryPoints = Array.isArray(lesson.summary) ? lesson.summary.filter(Boolean) : [];
  const summaryHtml = summaryPoints.length
    ? '<div class="lesson-summary-card">' +
      '<div class="eyebrow">What you learned</div>' +
      '<h3 class="lesson-summary-title">' + escapeHtml(lesson.title) + "</h3>" +
      '<ul class="lesson-summary-list">' +
      summaryPoints
        .map((point) => '<li lang="ko">' + escapeHtml(point) + "</li>")
        .join("") +
      "</ul></div>"
    : "";

  if (!els.phaseOneStage) return;

  const cheer = PHASE_ONE_COMPLETE_CHEERS[lesson.id] || lesson.shortTitle + " — locked in!";
  const tilesHtml =
    '<div class="lesson-complete-tiles">' +
    '<button class="lesson-complete-tile" type="button" id="learnRestartBtn">Restart lesson</button>' +
    (isFinalLesson
      ? '<button class="lesson-complete-tile primary" type="button" id="learnVocabBtn">Start vocabulary</button>'
      : '<button class="lesson-complete-tile primary" type="button" id="learnNextBtn">Next lesson</button>') +
    "</div>";

  const finalExtrasHtml = isFinalLesson
    ? '<div class="card"><div class="flex-between">' +
      "<div><div class=\"eyebrow\">Practice · Forever</div>" +
      '<div class="screen-sub" style="margin-bottom:0;">Keep the alphabet sharp with infinite drills.</div></div>' +
      '<button class="button secondary compact" type="button" id="learnDrillLabBtn">Open Drill Lab</button>' +
      "</div></div>" +
      phaseOneReferenceButtonHtml() +
      (getDueLetterCount()
        ? '<div class="card"><div class="flex-between">' +
          "<div><div class=\"eyebrow\">Make it stick</div>" +
          '<div class="screen-sub" style="margin-bottom:0;">Spaced review of the letters you\'ve learned.</div></div>' +
          '<button class="button secondary compact" type="button" id="learnLetterReviewBtn">Review letters (' + getDueLetterCount() + ")</button>" +
          "</div></div>"
        : ""
      )
    : "";

  const returnTileHtml =
    '<button class="lesson-complete-tile lesson-complete-return" type="button" id="learnAllLessonsBtn">Return to all lessons</button>';

  const cleanCount = phaseOneView.results.filter(Boolean).length;
  const totalQuestions = lesson.questions.length;
  const accuracy = totalQuestions ? Math.round((cleanCount / totalQuestions) * 100) : 100;
  els.phaseOneStage.innerHTML = premiumCompletionHtml({
    tone: isFinalLesson ? "crown" : "success",
    icon: isFinalLesson ? "crown" : "check",
    eyebrow: isFinalLesson ? "Hangul complete" : `Stage ${String(index + 1).padStart(2, "0")} complete`,
    title: cheer,
    copy: isFinalLesson
      ? "Every Hangul stage is complete. Your vocabulary path is ready."
      : "That stage is locked in, and the next one is now open.",
    score: { value: `${accuracy}%`, label: "First-try accuracy" },
    stats: [
      { value: `${cleanCount}/${totalQuestions}`, label: "Clean answers" },
      { value: `${index + 1}/${phaseOneLessons.length}`, label: "Hangul stages" },
    ],
    detailsHtml: summaryHtml + finalExtrasHtml,
    actionsHtml: tilesHtml + returnTileHtml,
    className: "alphabet-completion-stage",
  });
  animateLessonFrame(els.phaseOneStage, "alphabet", {
    key: `complete:${index}`,
    order: 2100,
    phase: "complete",
    complete: true,
  });

  const playerHead = els.phaseOnePlayer && els.phaseOnePlayer.querySelector(".player-head");
  if (playerHead) playerHead.style.display = "none";
  // The tiles cover navigation in every case; drop the whole bottom action
  // bar so nothing dangles under the return tile.
  const actionsRow = document.getElementById("hpActions");
  if (actionsRow) actionsRow.style.display = "none";

  const restartBtn = document.getElementById("learnRestartBtn");
  if (restartBtn) {
    // Full restart from the first card/question. Completion stays recorded —
    // replays never remove ids from state.phaseOneCompleted — and
    // trackProgress:false keeps the Learn tab pointed at the real next lesson.
    restartBtn.addEventListener("click", () => openLearnLesson(index, { resume: false, trackProgress: false }));
  }
  const nextBtn = document.getElementById("learnNextBtn");
  if (nextBtn && next) nextBtn.addEventListener("click", () => openLearnLesson(index + 1));
  const allLessonsBtn = document.getElementById("learnAllLessonsBtn");
  if (allLessonsBtn) allLessonsBtn.addEventListener("click", () => {
    queueScreenMotion("back", -1);
    openLearnStageMenu("alphabet");
  });
  const vocabBtn = document.getElementById("learnVocabBtn");
  if (vocabBtn) vocabBtn.addEventListener("click", () => startNextLearn());
  const letterReviewBtn = document.getElementById("learnLetterReviewBtn");
  if (letterReviewBtn) letterReviewBtn.addEventListener("click", () => startLetterReview());
  const drillLabBtn = document.getElementById("learnDrillLabBtn");
  if (drillLabBtn) drillLabBtn.addEventListener("click", () => openAlphabetDrillLab());
}

// "Lesson complete" screen: celebrate, then offer the next new lesson.
function renderLearnComplete(index) {
  refreshProgressionState();
  const lesson = phaseOneLessons[index];
  const nextIndex = getFirstIncompletePhaseOneIndex();
  const next = phaseOneLessons[nextIndex];

  showDetailBarWithBack("learn", "Lesson complete", () => openLearnStageMenu("alphabet"), "Alphabet");
  const el = showScreen("detail");
  if (!el) return;
  el.innerHTML = `
    <div class="${next ? "card" : "card alphabet-complete-panel"}">
      ${next ? `
        <div class="eyebrow">Keep going</div>
        <h3 class="screen-title" style="margin-bottom:8px;">Next: ${escapeHtml(next.shortTitle)}</h3>
        <div class="screen-sub" style="margin-bottom:12px;">${escapeHtml(next.goal)}</div>
        <button class="button primary compact" type="button" id="learnNextBtn">Start next lesson</button>
      ` : `
        <div class="eyebrow">Hangul complete</div>
        <h3 class="screen-title">You can read Hangul! 🎉</h3>
        <div class="screen-sub">New vocabulary is now your next new material.</div>
        <div class="alphabet-complete-actions">
          <button class="button primary compact" type="button" id="learnNextBtn">Start vocabulary</button>
        </div>
      `}
    </div>
    <div class="card complete-card">
      <div class="complete-badge">✓</div>
      <h2 class="screen-title" style="margin-bottom:6px;">Lesson complete!</h2>
      <div class="screen-sub" style="margin-bottom:0;">${escapeHtml(lesson.shortTitle)} is locked in.</div>
    </div>
  `;
  const nextBtn = document.getElementById("learnNextBtn");
  if (nextBtn) nextBtn.addEventListener("click", () => startNextLearn());
}

function goHub(hub) {
  refreshProgressionState();
  if (!HUBS.includes(hub)) hub = "learn";
  const previousHub = activeHub;
  const currentScreen = getVisibleScreen();
  if (!pendingScreenMotion) {
    if (!currentScreen) {
      queueScreenMotion("launch", 1);
    } else if (previousHub !== hub) {
      const previousIndex = Math.max(0, HUBS.indexOf(previousHub));
      const nextIndex = Math.max(0, HUBS.indexOf(hub));
      queueScreenMotion("tab", nextIndex >= previousIndex ? 1 : -1);
    } else {
      queueScreenMotion("hub", -1);
    }
  }
  activeHub = hub;
  setNavActive(hub);
  hideDetailBar();
  state.route = { hub, item: null, stage: null };
  saveState();
  renderHubMenu(hub);
}

// Backwards-compatible entry point for in-screen buttons that still call
// showTab("library"), showTab("practice"), etc.
function showTab(name) {
  const normalized = normalizeNavTab(name);
  const route = LEGACY_ROUTE[normalized] || LEGACY_ROUTE.today;
  if (route.item) {
    openHubItem(route.hub, route.item);
  } else {
    goHub(route.hub);
  }
}

// Detail screens for the alphabet (no dedicated legacy screen exists).
function renderAlphabetLearn() {
  currentQuizScope = "alphabet";
  state.studio = "alphabet";
  currentFocus = "learn";
  activeTab = "today";
  const el = showScreen("detail");
  if (!el) return;
  const glyphCard = (char, title, note, example) => `
    <button class="glyph-card" type="button" data-speak="${escapeHtml(example)}" aria-label="Hear ${escapeHtml(example)}">
      <div class="glyph-top"><span class="glyph" lang="ko">${escapeHtml(char)}</span></div>
      <div>
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(note)}</p>
        <p><strong>Example:</strong> <span lang="ko">${escapeHtml(example)}</span></p>
      </div>
    </button>`;
  el.innerHTML = `
    <div class="card">
      <div class="eyebrow">Learn · Alphabet</div>
      <h2 class="screen-title" style="margin-bottom:8px;">Hangul letters &amp; sounds</h2>
      <div class="screen-sub" style="margin-bottom:0;">Tap any letter to hear it. When you're ready, try the Alphabet quiz under Practice.</div>
    </div>
    <div class="card">
      <div class="eyebrow mb-12">Consonants</div>
      <div class="glyph-grid">
        ${consonantAtlas.map((it) => glyphCard(it.char, `${CONSONANT_NAMES[it.char] || it.char} · ${it.name}`, it.note, it.example)).join("")}
      </div>
    </div>
    <div class="card">
      <div class="eyebrow mb-12">Vowels</div>
      <div class="glyph-grid">
        ${vowelAtlas.map((it) => glyphCard(it.char, it.name, it.note, it.example)).join("")}
      </div>
    </div>
  `;
  el.querySelectorAll(".glyph-card[data-speak]").forEach((card) => {
    card.addEventListener("click", () => {
      flashElement(card.querySelector(".glyph") || card);
      speak(card.dataset.speak || "");
    });
  });
}

function renderAlphabetPracticeHub() {
  refreshProgressionState();
  currentQuizScope = "alphabet";
  state.studio = "alphabet";
  activeHub = "practice";
  setNavActive("practice");
  state.route = { hub: "practice", item: "alphabet", stage: null };
  saveState();
  const el = showScreen("detail");
  if (!el) return;
  showDetailBarWithBack("practice", "Alphabet practice", () => goHub("practice"), "Practice");
  const due = getDueLetterCount();
  const mastered = getAlphabetProgress().complete || TEST_UNLOCK_ALL_STAGES;
  el.innerHTML = `
    <div class="card">
      <div class="eyebrow">Practice · Alphabet</div>
      <h2 class="screen-title" style="margin-bottom:8px;">Choose a practice</h2>
      <div class="screen-sub" style="margin-bottom:0;">Review what is due, test recognition, or practise reading and writing freely.</div>
    </div>
    ${due ? `<button class="card word-section-card" type="button" data-alphabet-practice="review"><div><div class="eyebrow">Make it stick</div><div class="section-card-title" lang="en">Letter review</div><div class="screen-sub" style="margin-bottom:0;">${due} letter${due === 1 ? "" : "s"} ready for spaced review.</div></div><span class="pill accent">${due} due</span></button>` : ""}
    <button class="card word-section-card" type="button" data-alphabet-practice="quiz"><div><div class="eyebrow">Quick check</div><div class="section-card-title" lang="en">Alphabet quiz</div><div class="screen-sub" style="margin-bottom:0;">Match each Hangul letter to its sound.</div></div><span class="alpha-board-entry-glyphs" lang="ko" aria-hidden="true">가</span></button>
    ${mastered ? `<button class="card word-section-card" type="button" data-alphabet-practice="drill"><div><div class="eyebrow">Practice · Forever</div><div class="section-card-title" lang="en">Alphabet Drill Lab</div><div class="screen-sub" style="margin-bottom:0;">Mixed, build, split, letters, batchim, and weak spots.</div></div><span class="alpha-board-entry-glyphs" aria-hidden="true">∞</span></button>` : ""}
    <button class="card word-section-card" type="button" data-alphabet-practice="pronunciation"><div><div class="eyebrow">Listen closely</div><div class="section-card-title" lang="en">Pronunciation drill</div><div class="screen-sub" style="margin-bottom:0;">Train tense, aspirated, and plain consonant contrasts.</div></div><span class="alpha-board-entry-glyphs" aria-hidden="true">🎧</span></button>
    <button class="card word-section-card" type="button" data-alphabet-practice="writing"><div><div class="eyebrow">Write it</div><div class="section-card-title" lang="en">Hangul writing</div><div class="screen-sub" style="margin-bottom:0;">Draw letters and syllable blocks by hand.</div></div><span class="alpha-board-entry-glyphs" aria-hidden="true">✍</span></button>
  `;
  el.querySelectorAll("[data-alphabet-practice]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.alphabetPractice;
      if (action === "review") startLetterReview();
      else if (action === "quiz") { startGenericPracticeSession("alphabet"); renderAlphabetPractice(); }
      else if (action === "drill") openAlphabetDrillLab();
      else if (action === "pronunciation") renderPronunciationDrill();
      else if (action === "writing") enterHangulWriting();
    });
  });
}

function renderAlphabetPractice() {
  refreshProgressionState();
  currentQuizScope = "alphabet";
  state.studio = "alphabet";
  currentFocus = "practice";
  activeTab = "today";
  const practiceSession = getPracticeQuizSession("alphabet") || startGenericPracticeSession("alphabet");
  const el = showScreen("detail");
  if (!el) return;
  showDetailBarWithBack("practice", "Alphabet quiz", () => renderAlphabetPracticeHub(), "Alphabet practice");
  el.innerHTML = `
    <div class="card word-card alphabet-practice-card">
      ${alphabetPracticeProgressHtml("Alphabet quiz", 0, 0, practiceSession.complete)}
      <div class="eyebrow">Practice · Alphabet</div>
      <h2 class="screen-title" style="margin-bottom:8px;">Alphabet quiz</h2>
      <div class="screen-sub" style="margin-bottom:0;">Match each letter to its sound. Press a number key (1–4) or tap an answer.</div>
    </div>
    ${renderQuizCard("alphabet")}
  `;
  bindAlphabetReferenceButtons(el);
  el.querySelectorAll("[data-speak]").forEach((btn) => {
    btn.addEventListener("click", () => speak(btn.dataset.speak || ""));
  });
  if (!practiceSession.complete) renderScopedQuestion("alphabet");
  showTapHint("alphabet");
}

// ─── PRONUNCIATION DRILL (MINIMAL PAIRS) ────────────────────────────────────────

const MINIMAL_PAIRS = [
  {
    title: "Three-way Stops: 달 vs 딸 vs 탈",
    description: "Distinguish between lax ㄷ (dal), tensed ㄸ (ttal), and aspirated ㅌ (tal).",
    items: [
      { text: "달", desc: "moon / month (lax)", rom: "dal", tip: "달 (lax) has a soft breath release. Similar to the 't' in 'stop'." },
      { text: "딸", desc: "daughter (tensed)", rom: "ttal", tip: "딸 (tensed) has a sharp, tense release with no air puff. Build up pressure in the mouth before releasing." },
      { text: "탈", desc: "mask / trouble (aspirated)", rom: "tal", tip: "탈 (aspirated) is released with a strong, audible puff of air." }
    ]
  },
  {
    title: "Three-way Stops: 불 vs 뿔 vs 풀",
    description: "Distinguish between lax ㅂ (bul), tensed ㅃ (ppul), and aspirated ㅍ (pul).",
    items: [
      { text: "불", desc: "fire (lax)", rom: "bul", tip: "불 (lax) is soft. Similar to the 'p' in 'spot'." },
      { text: "뿔", desc: "horn (tensed)", rom: "ppul", tip: "뿔 (tensed) is sharp and tense, released without any puff of air." },
      { text: "풀", desc: "grass / glue (aspirated)", rom: "pul", tip: "풀 (aspirated) is released with a strong, puffing breath." }
    ]
  },
  {
    title: "Three-way Stops: 자다 vs 짜다 vs 차다",
    description: "Distinguish between lax ㅈ (jada), tensed ㅉ (jjada), and aspirated ㅊ (chada).",
    items: [
      { text: "자다", desc: "to sleep (lax)", rom: "jada", tip: "자다 (lax) starts with a soft, relaxed 'j' sound." },
      { text: "짜다", desc: "to be salty (tensed)", rom: "jjada", tip: "짜다 (tensed) starts with a tensed 'jj' sound. No puff of air." },
      { text: "차다", desc: "to kick / be cold (aspirated)", rom: "chada", tip: "차다 (aspirated) starts with a strong, aspirated 'ch' sound." }
    ]
  },
  {
    title: "Vowels: 거 vs 고",
    description: "Distinguish between open ㅓ (eo) and rounded close-mid ㅗ (o).",
    items: [
      { text: "거", desc: "thing (eo)", rom: "geo", tip: "거 (eo) is open. Drop your jaw, keep your tongue relaxed and lips flat." },
      { text: "고", desc: "and/then ending (o)", rom: "go", tip: "고 (o) is close-mid and rounded. Pucker your lips tightly into an 'o' shape." }
    ]
  },
  {
    title: "Vowels: 그 vs 구",
    description: "Distinguish between flat ㅡ (eu) and rounded ㅜ (u).",
    items: [
      { text: "그", desc: "that (eu)", rom: "geu", tip: "그 (eu) is completely flat. Spread your lips horizontally like a smile." },
      { text: "구", desc: "nine (u)", rom: "gu", tip: "구 (u) is rounded and closed. Push your lips forward like blowing a whistle." }
    ]
  }
];

let pronDrillState = {
  activePairSet: null,
  currentIndex: 0,
  correctCount: 0,
  questionCount: 5,
  currentQuestion: null,
  answered: false,
  selectedOption: null
};

window.renderPronunciationDrill = function() {
  const el = showScreen("detail");
  if (!el) return;
  showDetailBarWithBack("practice", pronDrillState.activePairSet ? "Pronunciation drill" : "Pronunciation", () => {
    pronDrillState.activePairSet = null;
    renderAlphabetPracticeHub();
  }, "Alphabet practice");

  if (!pronDrillState.activePairSet) {
    // Render set selector menu
    const setsHtml = MINIMAL_PAIRS.map((set, idx) => `
      <div class="card" style="margin-bottom:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div>
            <h3 style="margin:0 0 4px 0;">${escapeHtml(set.title)}</h3>
            <div class="fs-xs text-muted-2">${escapeHtml(set.description)}</div>
          </div>
          <button class="button primary compact" type="button" onclick="startPronDrill(${idx})">Start Drill</button>
        </div>
      </div>
    `).join("");

    el.innerHTML = `
      <div class="card">
        ${alphabetPracticeProgressHtml("Pronunciation")}
        <div class="eyebrow" style="margin-top:16px;">Practice · Pronunciation</div>
        <h2 class="screen-title" style="margin-bottom:8px;">Pronunciation Drills</h2>
        <div class="screen-sub">Train your ears to distinguish tensed vs lax consonants and open vs rounded vowels. Click a set below to begin.</div>
      </div>
      ${setsHtml}
    `;
    bindAlphabetReferenceButtons(el);
    return;
  }

  // Render active drill question
  const q = pronDrillState.currentQuestion;

  let feedbackAreaHtml = "";
  if (pronDrillState.answered) {
    const isCorrect = pronDrillState.selectedOption.text === q.answer.text;
    feedbackAreaHtml = `
      <div class="card" style="margin-top:16px; border:2px solid ${isCorrect ? "#2ecc71" : "#e74c3c"};">
        <h3 style="color:${isCorrect ? "#2ecc71" : "#e74c3c"}; margin:0 0 6px 0;">
          ${isCorrect ? "✓ Correct!" : "✗ Incorrect"}
        </h3>
        <div class="fs-sm" style="margin-bottom:12px;">
          You heard: <strong>${escapeHtml(q.answer.text)}</strong> (${escapeHtml(q.answer.desc)}).
        </div>
        <div class="vocab-note" style="margin-bottom:12px; background:rgba(0,0,0,0.03); padding:8px; border-radius:4px; font-size:0.85rem;">
          <strong>Tip:</strong> ${escapeHtml(q.answer.tip)}
        </div>
        <button class="button primary" type="button" onclick="nextPronDrillQuestion()">
          ${pronDrillState.currentIndex >= pronDrillState.questionCount - 1 ? "Show Results" : "Next Question ›"}
        </button>
      </div>
    `;
  }

  const optionsHtml = q.options.map((opt) => {
    let btnClass = "secondary";
    if (pronDrillState.answered) {
      if (opt.text === q.answer.text) btnClass = "success";
      else if (pronDrillState.selectedOption.text === opt.text) btnClass = "danger";
    }
    return `
      <button class="button ${btnClass} pronunciation-option" type="button"
        ${pronDrillState.answered ? "disabled" : ""} onclick="submitPronDrillAnswer('${escapeHtml(opt.text)}')">
        <span class="pronunciation-option-ko" lang="ko">${escapeHtml(opt.text)}</span>
        <span class="pronunciation-option-desc" lang="en">${escapeHtml(opt.desc)}</span>
      </button>
    `;
  }).join("");

  el.innerHTML = `
    <div class="card" data-lesson-motion-root>
      ${alphabetPracticeProgressHtml("Pronunciation", pronDrillState.currentIndex + 1, pronDrillState.questionCount)}

      <div style="text-align:center; padding:24px 0;">
        <button class="button primary" type="button" style="padding:16px 24px; font-size:1.1rem; border-radius:50px;" onclick="speakPronDrillTarget()">
          🔊 Replay Audio
        </button>
        <div class="fs-xs text-muted-2" style="margin-top:8px;">Tap Replay to listen to the word</div>
      </div>

      <div class="senses-buttons" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap:12px; margin-top:16px;">
        ${optionsHtml}
      </div>

      ${feedbackAreaHtml}

      <div class="alphabet-practice-toolbar">
        <button class="button secondary" type="button" onclick="quitPronDrill()">End session</button>
      </div>
    </div>
  `;
  bindAlphabetReferenceButtons(el);
  animateLessonFrame(el.querySelector("[data-lesson-motion-root]"), "pronunciation", {
    key: `question:${pronDrillState.currentIndex}`,
    order: pronDrillState.currentIndex,
    phase: pronDrillState.answered ? "feedback" : "question",
  });
}

window.startPronDrill = function(idx) {
  resetLessonMotion("pronunciation");
  queueScreenMotion("forward", 1, { replace: false });
  const set = MINIMAL_PAIRS[idx];
  pronDrillState = {
    activePairSet: set,
    currentIndex: 0,
    correctCount: 0,
    questionCount: 5,
    currentQuestion: null,
    answered: false,
    selectedOption: null
  };
  generatePronDrillQuestion();
  renderPronunciationDrill();
}

function generatePronDrillQuestion() {
  const set = pronDrillState.activePairSet;
  const target = randomItem(set.items);
  const options = [...set.items];
  pronDrillState.currentQuestion = {
    text: target.text,
    options,
    answer: target
  };
  pronDrillState.answered = false;
  pronDrillState.selectedOption = null;
  setTimeout(() => { speakPronDrillTarget(); }, 200);
}

window.speakPronDrillTarget = function() {
  if (pronDrillState.currentQuestion) {
    void speak(pronDrillState.currentQuestion.text);
  }
}

window.submitPronDrillAnswer = function(text) {
  if (pronDrillState.answered) return;
  const set = pronDrillState.activePairSet;
  const opt = set.items.find((item) => item.text === text);
  pronDrillState.selectedOption = opt;
  pronDrillState.answered = true;
  if (opt.text === pronDrillState.currentQuestion.answer.text) {
    pronDrillState.correctCount += 1;
  }
  renderPronunciationDrill();
  // Rendering calls showScreen(), which intentionally cancels old speech.
  // Play the selected Korean only after the feedback frame is mounted.
  scheduleAutoSpeak(text, 120);
}

window.nextPronDrillQuestion = function() {
  pronDrillState.currentIndex += 1;
  if (pronDrillState.currentIndex >= pronDrillState.questionCount) {
    const el = showScreen("detail");
    if (el) {
      const score = Math.round((pronDrillState.correctCount / pronDrillState.questionCount) * 100);
      el.innerHTML = premiumCompletionHtml({
        tone: score >= 80 ? "success" : "retry",
        icon: score >= 80 ? "check" : "retry",
        eyebrow: "Pronunciation drill complete",
        title: score >= 80 ? "Your ear is getting sharper" : "One more listening pass",
        copy: `You identified ${pronDrillState.correctCount} of ${pronDrillState.questionCount} sound contrasts correctly.`,
        score: { value: `${score}%`, label: "Pronunciation accuracy" },
        stats: [
          { value: `${pronDrillState.correctCount}/${pronDrillState.questionCount}`, label: "Correct" },
          { value: pronDrillState.questionCount - pronDrillState.correctCount, label: "To revisit" },
        ],
        actionsHtml: '<button class="button primary" type="button" onclick="quitPronDrill()">Finish drill</button>',
        celebrate: score >= 80,
      });
      bindAlphabetReferenceButtons(el);
      animateLessonFrame(el.querySelector(".completion-stage"), "pronunciation", {
        key: "complete",
        order: 2000,
        phase: "complete",
        complete: true,
      });
    }
  } else {
    generatePronDrillQuestion();
    renderPronunciationDrill();
  }
}

window.quitPronDrill = function() {
  pronDrillState.activePairSet = null;
  renderPronunciationDrill();
}

// ─── HANGUL WRITING (see docs/HANGUL_WRITING_PLAN.md) ────────────────────────
// Draw-to-learn practice for the Alphabet section: authored stroke guides,
// offline $Q glyph recognition, standard stroke-order coaching, and unit gating.
// Writing READS getAlphabetProgress() for unlocks and never writes progress.
// Scope cap (owner decision): nothing longer than one syllable block here.
const HANGUL_WRITING_UNITS = [
  { id: "vowels-basic", eyebrow: "Unit 1", label: "Basic vowels", sub: "The six anchor vowels.", glyphs: ["ㅏ", "ㅓ", "ㅗ", "ㅜ", "ㅡ", "ㅣ"], unlockLessonIndex: 0 },
  { id: "consonants-basic", eyebrow: "Unit 2", label: "Basic consonants", sub: "The ten base consonant shapes.", glyphs: ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅎ"], unlockLessonIndex: 1 },
  { id: "blocks-cv", eyebrow: "Unit 3", label: "Simple blocks", sub: "Consonant + vowel in one square.", glyphs: ["가", "나", "도", "무", "비", "소"], unlockLessonIndex: 2 },
  { id: "jamo-advanced", eyebrow: "Unit 4", label: "Advanced letters", sub: "Y-vowels and aspirated consonants.", glyphs: ["ㅑ", "ㅕ", "ㅛ", "ㅠ", "ㅋ", "ㅌ", "ㅍ", "ㅊ"], unlockLessonIndex: 5 },
  { id: "blocks-cvc", eyebrow: "Unit 5", label: "Blocks with batchim", sub: "Full syllables with a bottom consonant.", glyphs: ["한", "글", "밥", "산", "강"], unlockLessonIndex: 5 },
];

let hangulWritingSource = "alphabet";
let activeHangulWritingUnits = HANGUL_WRITING_UNITS;

function getWritingSourceMeta(source = hangulWritingSource) {
  if (source === "vocabulary") return { title: "Vocabulary writing", eyebrow: "Practice · Words", back: "Practice", unitPrefix: "Word set" };
  if (source === "sentences") return { title: "Sentence writing", eyebrow: "Practice · Sentences", back: "Practice", unitPrefix: "Sentence set" };
  return { title: "Hangul writing", eyebrow: "Practice · Hangul writing", back: "Alphabet practice", unitPrefix: "Unit" };
}

function buildContentWritingUnits(source) {
  let strings = [];
  if (source === "vocabulary") {
    const learned = getCuratedWords().filter((word) => Number(state.vocabSrs?.[word.id]?.seen) > 0);
    const words = learned.length ? learned : getCuratedWords().filter((word) => (word.priority || "core") === "core").slice(0, 80);
    strings = words.map((word) => word.display || word.korean);
  } else if (source === "sentences") {
    const progress = getSentencesProgress();
    const bandRows = getSentenceRowsForBand(progress.band);
    const practised = bandRows.filter((row) => Number(progress.results?.[row.id]?.seen) > 0);
    strings = (practised.length ? practised : bandRows.slice(0, 50)).map((row) => row.korean);
  }
  const glyphs = [...new Set(strings.flatMap((text) => Array.from(String(text || ""))))]
    .filter((glyph) => /^[가-힣]$/u.test(glyph) && getHangulStrokeGuide(glyph))
    .slice(0, 32);
  const meta = getWritingSourceMeta(source);
  const units = [];
  for (let index = 0; index < glyphs.length; index += 8) {
    const set = glyphs.slice(index, index + 8);
    units.push({
      id: `${source}-writing-${index / 8 + 1}`,
      eyebrow: `${meta.unitPrefix} ${index / 8 + 1}`,
      label: source === "vocabulary" ? `Word syllables ${index / 8 + 1}` : `Sentence syllables ${index / 8 + 1}`,
      sub: source === "vocabulary" ? "Shapes pulled from your vocabulary path." : "Shapes pulled from your current sentence band.",
      glyphs: set,
      unlockLessonIndex: -1,
      source,
    });
  }
  return units;
}

let hangulWritingState = {
  unitId: null,
  glyphIndex: 0,
  exercise: "shape", // "shape" (copy the glyph) | "sound" (write what you hear) | "roman" (write from romanization)
  inputMode: "freehand",
  repeatTarget: 1,
  repeatIndex: 0,
  strokes: [], // meaningful learner ink; taps/interrupted pointers are discarded
  animating: false, // Help! demo playing
  celebrating: false, // result sheet open; drawing input is blocked
  startedAt: null,
  activeSince: null,
  elapsedMs: 0,
  attempts: 0,
  successes: 0,
  retries: 0,
  glyphStats: {},
  completedSummary: null,
};
let hangulRecognitionTimer = null;
let hangulWritingRecognizerCache = null;

function getHangulWritingUnit(unitId = hangulWritingState.unitId) {
  return activeHangulWritingUnits.find((unit) => unit.id === unitId) || null;
}

function resetHangulWritingSession() {
  hangulWritingState = {
    unitId: null,
    glyphIndex: 0,
    exercise: "shape",
    inputMode: "freehand",
    repeatTarget: 1,
    repeatIndex: 0,
    strokes: [],
    animating: false,
    celebrating: false,
    startedAt: null,
    activeSince: null,
    elapsedMs: 0,
    attempts: 0,
    successes: 0,
    retries: 0,
    glyphStats: {},
    completedSummary: null,
  };
}

function hasActiveHangulWritingSession() {
  const unit = getHangulWritingUnit();
  return Boolean(
    unit &&
    isHangulWritingUnitUnlocked(unit) &&
    Number.isInteger(hangulWritingState.glyphIndex) &&
    hangulWritingState.glyphIndex >= 0 &&
    hangulWritingState.glyphIndex < unit.glyphs.length
  );
}

function pauseHangulWritingSessionTimer() {
  if (!hangulWritingState.activeSince) return;
  hangulWritingState.elapsedMs += Math.max(0, Date.now() - hangulWritingState.activeSince);
  hangulWritingState.activeSince = null;
}

function resumeHangulWritingSessionTimer() {
  if (hasActiveHangulWritingSession() && !hangulWritingState.activeSince) {
    hangulWritingState.activeSince = Date.now();
  }
}

function leaveHangulWritingSession() {
  clearHangulRecognitionTimer();
  stopHangulWatch();
  pauseHangulWritingSessionTimer();
  if (hangulWritingState.celebrating) hangulWritingState.strokes = [];
  hangulWritingState.celebrating = false;
  hangulWritingState.animating = false;
  if (hangulWritingSource === "alphabet") renderAlphabetPracticeHub();
  else goHub("practice");
}

function renderHangulWritingReentryPrompt() {
  const unit = getHangulWritingUnit();
  if (!unit) {
    resetHangulWritingSession();
    renderHangulWriting();
    return;
  }
  const glyph = unit.glyphs[hangulWritingState.glyphIndex] || "";
  pauseHangulWritingSessionTimer();
  const exerciseLabel = hangulWritingState.exercise === "sound"
    ? "Write from sound"
    : hangulWritingState.exercise === "roman"
      ? "Write from romanization"
      : "Copy the shape";
  const el = showScreen("detail");
  if (!el) return;
  const sourceMeta = getWritingSourceMeta();
  showDetailBarWithBack("practice", sourceMeta.title, () => leaveHangulWritingSession(), sourceMeta.back);
  el.innerHTML = `
    <div class="card word-card alphabet-practice-card writing-reentry-card">
      <div class="eyebrow">Writing session paused</div>
      <div class="writing-reentry-glyph" lang="ko">${escapeHtml(glyph)}</div>
      <h2 class="screen-title">Continue where you left off?</h2>
      <div class="screen-sub">${escapeHtml(unit.label)} · ${escapeHtml(exerciseLabel)} · Free drawing · ${hangulWritingState.repeatTarget}× · ${hangulWritingState.glyphIndex + 1} of ${unit.glyphs.length}</div>
      <div class="writing-reentry-actions">
        <button class="button secondary" type="button" id="writingStartNew">Start new session</button>
        <button class="button primary" type="button" id="writingContinue">Continue session</button>
      </div>
    </div>`;
  el.querySelector("#writingStartNew").addEventListener("click", () => {
    clearHangulRecognitionTimer();
    stopHangulWatch();
    resetHangulWritingSession();
    renderHangulWriting();
  });
  el.querySelector("#writingContinue").addEventListener("click", () => {
    resumeHangulWritingSessionTimer();
    renderHangulWriting();
  });
}

function enterHangulWriting(source = "alphabet") {
  refreshProgressionState();
  const nextSource = ["alphabet", "vocabulary", "sentences"].includes(source) ? source : "alphabet";
  if (nextSource !== hangulWritingSource) resetHangulWritingSession();
  hangulWritingSource = nextSource;
  activeHangulWritingUnits = nextSource === "alphabet" ? HANGUL_WRITING_UNITS : buildContentWritingUnits(nextSource);
  hangulWritingRecognizerCache = null;
  if (hasActiveHangulWritingSession()) {
    renderHangulWritingReentryPrompt();
    return;
  }
  resetHangulWritingSession();
  renderHangulWriting();
}

// Romanization prompt for a writing glyph: syllable blocks via the shared
// revised-romanization decomposition, jamo via the reference atlases.
function getHangulWritingRoman(glyph) {
  const syllable = romanizeHangulSyllable(glyph);
  if (syllable) return syllable;
  const row =
    consonantAtlas.find((r) => r.char === glyph) ||
    vowelAtlas.find((r) => r.char === glyph);
  return row ? row.name : "";
}

function isHangulWritingUnitUnlocked(unit) {
  if (unit?.source && unit.source !== "alphabet") return true;
  if (TEST_UNLOCK_ALL_STAGES) return true;
  return getAlphabetProgress().completedCount > unit.unlockLessonIndex;
}

function getHangulStrokeGuide(glyph) {
  // Jamo come straight from the authored bank in hangul_strokes.js; composed
  // syllable blocks are assembled on demand from their jamo strokes + block
  // layout boxes (W1b). Returns null when any needed jamo is unauthored.
  const bank = (typeof window !== "undefined" && window.HANGUL_STROKES) || null;
  if (!bank) return null;
  const entry = bank[glyph];
  if (entry && Array.isArray(entry.strokes) && entry.strokes.length) return entry;
  return composeHangulSyllableGuide(glyph, bank);
}

// ── W1b: syllable-block guides composed from jamo (layout transforms only) ──
// Each jamo's strokes are normalized to the jamo's own bounding box, then
// mapped into a layout box chosen by vowel orientation + batchim presence.
// Stroke order: initial → medial → final (standard block order).
const HANGUL_SYLLABLE_LAYOUTS = {
  // [x, y, w, h] boxes in the 0–1 block square.
  verticalOpen: { initial: [0.16, 0.2, 0.34, 0.55], medial: [0.6, 0.12, 0.28, 0.78] },
  verticalClosed: { initial: [0.16, 0.1, 0.3, 0.36], medial: [0.56, 0.06, 0.28, 0.42], final: [0.26, 0.58, 0.48, 0.32] },
  horizontalOpen: { initial: [0.26, 0.08, 0.48, 0.38], medial: [0.12, 0.52, 0.76, 0.36] },
  horizontalClosed: { initial: [0.28, 0.04, 0.44, 0.28], medial: [0.14, 0.36, 0.72, 0.26], final: [0.26, 0.66, 0.48, 0.3] },
  compoundOpen: { initial: [0.08, 0.1, 0.34, 0.54], medial: [0.36, 0.08, 0.58, 0.82] },
  compoundClosed: { initial: [0.08, 0.05, 0.3, 0.38], medial: [0.34, 0.03, 0.6, 0.5], final: [0.24, 0.62, 0.52, 0.3] },
};
const HANGUL_COMPOUND_FINAL_PARTS = {
  "ㄳ": ["ㄱ", "ㅅ"], "ㄵ": ["ㄴ", "ㅈ"], "ㄶ": ["ㄴ", "ㅎ"],
  "ㄺ": ["ㄹ", "ㄱ"], "ㄻ": ["ㄹ", "ㅁ"], "ㄼ": ["ㄹ", "ㅂ"],
  "ㄽ": ["ㄹ", "ㅅ"], "ㄾ": ["ㄹ", "ㅌ"], "ㄿ": ["ㄹ", "ㅍ"],
  "ㅀ": ["ㄹ", "ㅎ"], "ㅄ": ["ㅂ", "ㅅ"],
};
const hangulSyllableGuideCache = {};

function getHangulSyllableLayout(parts) {
  if (!parts) return null;
  const family = VOWEL_FAMILIES.compound.has(parts.medial)
    ? "compound"
    : VOWEL_FAMILIES.vertical.has(parts.medial)
      ? "vertical"
      : "horizontal";
  return HANGUL_SYLLABLE_LAYOUTS[`${family}${parts.final ? "Closed" : "Open"}`] || null;
}

function normalizeHangulJamoStrokes(strokes) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  strokes.forEach((stroke) => stroke.forEach((p) => {
    if (p[0] < minX) minX = p[0];
    if (p[0] > maxX) maxX = p[0];
    if (p[1] < minY) minY = p[1];
    if (p[1] > maxY) maxY = p[1];
  }));
  const w = maxX - minX;
  const h = maxY - minY;
  // Degenerate axes (ㅡ has no height, ㅣ no width) map to the box's center.
  return strokes.map((stroke) => stroke.map((p) => [
    w > 0.03 ? (p[0] - minX) / w : 0.5,
    h > 0.03 ? (p[1] - minY) / h : 0.5,
  ]));
}

function getComposableJamoStrokes(jamo, bank) {
  if (bank[jamo]?.strokes?.length) return bank[jamo].strokes;
  const parts = HANGUL_COMPOUND_FINAL_PARTS[jamo];
  if (!parts || !parts.every((part) => bank[part]?.strokes?.length)) return null;
  const strokes = [];
  parts.forEach((part, index) => {
    const box = index === 0 ? [0, 0.08, 0.46, 0.84] : [0.54, 0.08, 0.46, 0.84];
    normalizeHangulJamoStrokes(bank[part].strokes).forEach((stroke) => {
      strokes.push(stroke.map((point) => [box[0] + point[0] * box[2], box[1] + point[1] * box[3]]));
    });
  });
  return strokes;
}

function composeHangulSyllableGuide(glyph, bank) {
  if (hangulSyllableGuideCache[glyph] !== undefined) return hangulSyllableGuideCache[glyph];
  let result = null;
  const parts = decomposeHangul(glyph);
  if (parts) {
    const hasFinal = Boolean(parts.final);
    const layout = getHangulSyllableLayout(parts);
    const pieces = [
      { strokes: getComposableJamoStrokes(parts.initial, bank), box: layout.initial },
      { strokes: getComposableJamoStrokes(parts.medial, bank), box: layout.medial },
    ];
    if (hasFinal) pieces.push({ strokes: getComposableJamoStrokes(parts.final, bank), box: layout.final });
    if (pieces.every((piece) => piece.strokes?.length)) {
      const strokes = [];
      pieces.forEach(({ strokes: pieceStrokes, box }) => {
        normalizeHangulJamoStrokes(pieceStrokes).forEach((stroke) => {
          strokes.push(stroke.map((p) => [box[0] + p[0] * box[2], box[1] + p[1] * box[3]]));
        });
      });
      result = { type: "syllable", name: glyph, strokes };
    }
  }
  hangulSyllableGuideCache[glyph] = result;
  return result;
}

// Free-drawing recognition is deliberately stroke-order agnostic. $Q judges
// the completed shape, so a readable glyph may use one fewer or one extra
// pen lift than the authored demonstration.
const HANGUL_FREEHAND_TARGET_CONFIDENCE = 0.82;
const HANGUL_FREEHAND_MIN_MARGIN = 0.01;
const HANGUL_FREEHAND_FALLBACK_TARGET_CONFIDENCE = 0.76;
const HANGUL_FREEHAND_COMPONENT_MIN_CONFIDENCE = 0.7;
const HANGUL_FREEHAND_COMPONENT_AVG_CONFIDENCE = 0.8;
const HANGUL_FREEHAND_COMPONENT_MAX_RANK = 4;
let hangulComponentRecognizerCache = null;

function getHangulWritingRecognitionGlyphs() {
  const bankGlyphs = Object.keys((typeof window !== "undefined" && window.HANGUL_STROKES) || {});
  return [...new Set([...bankGlyphs, ...activeHangulWritingUnits.flatMap((unit) => unit.glyphs)])]
    .filter((glyph) => Boolean(getHangulStrokeGuide(glyph)));
}

function getHangulWritingRecognizer() {
  if (hangulWritingRecognizerCache) return hangulWritingRecognizerCache;
  const API = typeof window !== "undefined" ? window.HANAPATH_HANGUL_RECOGNIZER : null;
  if (!API?.Recognizer) return null;
  const recognizer = new API.Recognizer();
  getHangulWritingRecognitionGlyphs().forEach((glyph) => {
    const guide = getHangulStrokeGuide(glyph);
    if (guide) recognizer.add(glyph, guide.strokes, { augment: true });
  });
  hangulWritingRecognizerCache = recognizer;
  return recognizer;
}

function getNormalizedHangulWritingStrokes(canvas) {
  return hangulWritingState.strokes
    .map((stroke) => cleanHangulInkStroke(normalizeHangulInkStroke(stroke, canvas)))
    .filter(Boolean);
}

function recognizeHangulWriting(canvas, limit = 3) {
  const recognizer = getHangulWritingRecognizer();
  if (!recognizer) return [];
  return recognizer.recognize(getNormalizedHangulWritingStrokes(canvas), limit);
}

function validateWritingStrokes(strokes) {
  if (!Array.isArray(strokes) || strokes.length === 0) {
    return "Invalid or empty strokes payload";
  }
  if (strokes.length > 500) {
    return "Payload size exceeds maximum allowed strokes (500)";
  }
  let totalPoints = 0;
  for (let i = 0; i < strokes.length; i++) {
    const stroke = strokes[i];
    if (!Array.isArray(stroke)) {
      return "Malformed JSON payload: stroke is not an array";
    }
    if (stroke.length === 0) {
      return "Stroke must contain at least one point";
    }
    if (stroke.length > 1000) {
      return "Stroke point count exceeds maximum (1000)";
    }
    totalPoints += stroke.length;
    if (totalPoints > 20000) {
      return "Payload point count exceeds maximum (20000)";
    }
    for (let j = 0; j < stroke.length; j++) {
      const p = stroke[j];
      if (p === null || typeof p !== "object" || !("x" in p) || !("y" in p) || !("t" in p)) {
        return "Missing coordinates or timestamp field";
      }
      const x = Number(p.x);
      const y = Number(p.y);
      const t = Number(p.t);
      if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(t)) {
        return "Non-finite coordinates or timestamps detected";
      }
      if (x < -1000 || x > 5000 || y < -1000 || y > 5000) {
        return "Coordinates out of reasonable bounds";
      }
    }
  }
  return null;
}

const HangulNativeRecognizer = {
  getPlugin() {
    return getHanaPathNativePlugin("HangulRecognition");
  },

  async checkModelStatus() {
    const plugin = this.getPlugin();
    if (!plugin) {
      return { downloaded: false, downloading: false, error: "bridge_missing" };
    }
    try {
      return await plugin.checkModelStatus();
    } catch (e) {
      return { downloaded: false, downloading: false, error: e.message || String(e) };
    }
  },

  async downloadModel() {
    const plugin = this.getPlugin();
    if (!plugin) {
      return { status: "error", error: "bridge_missing" };
    }
    try {
      return await plugin.downloadModel();
    } catch (e) {
      return { status: "error", error: e.message || String(e) };
    }
  },

  async recognize(strokes, width = 480, height = 480) {
    const plugin = this.getPlugin();
    if (!plugin) {
      return this.normalizeResult("mlkit", null, 0, "bridge_missing");
    }
    const validationError = validateWritingStrokes(strokes);
    if (validationError) {
      return this.normalizeResult("mlkit", null, 0, validationError);
    }
    const startTime = performance.now();
    try {
      const res = await plugin.recognize({ strokes, width, height });
      const latencyMs = Math.round(performance.now() - startTime);
      return this.normalizeResult("mlkit", res, latencyMs, null);
    } catch (e) {
      const latencyMs = Math.round(performance.now() - startTime);
      return this.normalizeResult("mlkit", null, latencyMs, e.message || String(e));
    }
  },

  normalizeResult(provider, rawResult, latencyMs, error) {
    const ready = Boolean(rawResult && rawResult.ready);
    return {
      provider: provider,
      ready: ready,
      candidates: rawResult && Array.isArray(rawResult.candidates) ? rawResult.candidates.map(c => ({
        name: String(c.name || ""),
        // ML Kit text models do not expose confidence scores. Keep absence as
        // null rather than presenting a fabricated 0% confidence value.
        score: c.score !== null && c.score !== undefined && Number.isFinite(Number(c.score))
          ? Number(c.score)
          : null,
      })) : [],
      latencyMs: latencyMs,
      error: error,
      fallbackReason: error ? String(error) : (!ready ? "model_not_ready" : null)
    };
  }
};

async function recognizeHangulInkWithProvider({
  provider,
  strokes,
  writingArea = { width: 480, height: 480 },
  limit = 3,
}) {
  const width = Number(writingArea?.width);
  const height = Number(writingArea?.height);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return {
      provider,
      ready: false,
      candidates: [],
      latencyMs: 0,
      error: "invalid_writing_area",
      fallbackReason: "invalid_writing_area",
    };
  }
  if (provider === "mlkit") {
    return HangulNativeRecognizer.recognize(strokes, width, height);
  }

  const startedAt = performance.now();
  const recognizer = getHangulWritingRecognizer();
  if (!recognizer) {
    return {
      provider: "$q",
      ready: false,
      candidates: [],
      latencyMs: Math.round(performance.now() - startedAt),
      error: "recognizer_missing",
      fallbackReason: "recognizer_missing",
    };
  }
  const normalized = (Array.isArray(strokes) ? strokes : [])
    .map((stroke) => cleanHangulInkStroke(normalizeHangulInkStroke(stroke, { width, height })))
    .filter(Boolean);
  const matches = recognizer.recognize(normalized, limit);
  return {
    provider: "$q",
    ready: true,
    candidates: matches.map((match) => ({ name: match.name, score: match.confidence })),
    latencyMs: Math.round(performance.now() - startedAt),
    error: null,
    fallbackReason: null,
  };
}

let mlkitSessionId = 0;

function runParallelMLKitRecognition(canvas) {
  if (!isHanaPathNative() || state.useMLKit !== true) return;
  const currentSessionId = ++mlkitSessionId;

  const rawStrokes = hangulWritingState.strokes.map(stroke =>
    stroke.map(p => ({ x: p.x, y: p.y, t: p.t }))
  );

  recognizeHangulInkWithProvider({
    provider: "mlkit",
    strokes: rawStrokes,
    writingArea: { width: canvas.width, height: canvas.height },
  }).then((res) => {
    if (currentSessionId !== mlkitSessionId) return;

    const feedbackPanel = document.getElementById("writingRecognition");
    if (!feedbackPanel) return;

    let diagnosticHtml = "";
    if (res.ready && res.candidates.length) {
      const topCand = res.candidates[0];
      const scoreLabel = Number.isFinite(topCand.score) ? ` · score ${topCand.score.toFixed(3)}` : "";
      diagnosticHtml = `<div class="mlkit-diagnostic-info" style="font-size: 0.75rem; opacity: 0.8; margin-top: 4px; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 4px;">
        ML Kit diagnostic: ${escapeHtml(topCand.name)}${scoreLabel} · ${res.latencyMs}ms · $Q still grades this attempt
      </div>`;
    } else if (res.error) {
      diagnosticHtml = `<div class="mlkit-diagnostic-info" style="font-size: 0.75rem; opacity: 0.8; margin-top: 4px; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 4px; color: #ff8888;">
        ML Kit diagnostic unavailable: ${escapeHtml(res.error)} · $Q still grades this attempt
      </div>`;
    }

    const diagContainer = feedbackPanel.querySelector(".mlkit-diagnostic-info");
    if (diagContainer) {
      diagContainer.outerHTML = diagnosticHtml;
    } else if (diagnosticHtml) {
      feedbackPanel.insertAdjacentHTML("beforeend", diagnosticHtml);
    }
  });
}

function updateNativeRecognitionUI() {
  const statusEl = document.getElementById("nativeRecognitionStatus");
  const actionsEl = document.getElementById("nativeRecognitionActions");
  if (!statusEl || !actionsEl) return;

  HangulNativeRecognizer.checkModelStatus().then((status) => {
    if (status.error) {
      statusEl.textContent = `Status: Unresolved (${status.error})`;
      actionsEl.innerHTML = `
        <button class="button secondary compact" type="button" id="nativeRetryCheck">Retry check</button>
      `;
      document.getElementById("nativeRetryCheck")?.addEventListener("click", () => {
        statusEl.textContent = "Checking status...";
        updateNativeRecognitionUI();
      });
      return;
    }

    if (status.downloading) {
      statusEl.textContent = "Status: Downloading on-device model... (approx. 20 MiB)";
      actionsEl.innerHTML = `
        <button class="button secondary compact" type="button" disabled>Downloading...</button>
      `;
      window.setTimeout(updateNativeRecognitionUI, 3000);
      return;
    }

    if (status.downloaded) {
      const active = state.useMLKit === true;
      statusEl.innerHTML = active
        ? `Status: Model installed. <span style="color:var(--text-success); font-weight:bold;">● Diagnostics enabled</span> — $Q still grades learner attempts.`
        : "Status: Model installed. ML Kit diagnostics are disabled; $Q is active.";
      actionsEl.innerHTML = `
        <button class="button secondary compact" type="button" id="nativeToggleMLKit">${active ? "Disable diagnostics" : "Enable diagnostics"}</button>
        ${active ? '<button class="button secondary compact" type="button" id="nativeRunHarness">Run device comparison</button>' : ""}
      `;
      document.getElementById("nativeToggleMLKit")?.addEventListener("click", () => {
        state.useMLKit = !active;
        saveState();
        updateNativeRecognitionUI();
      });
      document.getElementById("nativeRunHarness")?.addEventListener("click", () => {
        runHangulRecognitionComparison();
      });
    } else {
      statusEl.textContent = "Status: Optional on-device model not downloaded (approx. 20 MiB size).";
      actionsEl.innerHTML = `
        <button class="button primary compact" type="button" id="nativeDownloadModel">Download model</button>
        <button class="button secondary compact" type="button" id="nativeDeclineModel">Not now — keep using $Q</button>
      `;
      document.getElementById("nativeDownloadModel")?.addEventListener("click", () => {
        statusEl.textContent = "Requesting download...";
        actionsEl.innerHTML = `<button class="button secondary compact" type="button" disabled>Downloading...</button>`;
        HangulNativeRecognizer.downloadModel().then((res) => {
          if (res.status === "success") {
            state.useMLKit = true;
            saveState();
          } else {
            alert("Model download failed: " + (res.error || "unknown error"));
          }
          updateNativeRecognitionUI();
        });
      });
      document.getElementById("nativeDeclineModel")?.addEventListener("click", () => {
        state.useMLKit = false;
        saveState();
        statusEl.textContent = "Using standard $Q recognizer. You can download the model anytime.";
        actionsEl.innerHTML = `
          <button class="button primary compact" type="button" id="nativeDownloadModel">Download model</button>
        `;
        document.getElementById("nativeDownloadModel")?.addEventListener("click", () => {
          statusEl.textContent = "Requesting download...";
          HangulNativeRecognizer.downloadModel().then((res) => {
            if (res.status === "success") {
              state.useMLKit = true;
              saveState();
            } else {
              alert("Model download failed: " + (res.error || "unknown error"));
            }
            updateNativeRecognitionUI();
          });
        });
      });
    }
  });
}

function runHangulRecognitionComparison() {
  const overlay = document.createElement("div");
  overlay.className = "writing-result-overlay open correct";
  overlay.style.zIndex = "10000";
  overlay.innerHTML = `
    <div class="writing-result-sheet" role="dialog" aria-modal="true" style="max-width: 600px; width: 90%;">
      <div class="writing-result-title">Recognition Comparison Harness</div>
      <p class="writing-result-copy" id="harnessProgress">Preparing fixtures...</p>
      <div id="harnessContent" style="display:none; width: 100%;">
        <textarea id="harnessReportText" style="width: 100%; height: 250px; font-family: monospace; font-size: 0.75rem; background: var(--bg-card); color: var(--text-color); border: 1px solid var(--border-color); padding: 8px; border-radius: 6px; box-sizing: border-box;" readonly></textarea>
      </div>
      <div style="display:flex; gap:12px; margin-top:12px;">
        <button class="button primary compact" id="harnessCopyReport" type="button" hidden>Copy report</button>
        <button class="button secondary compact" id="harnessClose" type="button">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const progressEl = overlay.querySelector("#harnessProgress");
  const contentEl = overlay.querySelector("#harnessContent");
  const reportTextEl = overlay.querySelector("#harnessReportText");
  const copyButton = overlay.querySelector("#harnessCopyReport");
  const closeButton = overlay.querySelector("#harnessClose");
  let cancelled = false;

  closeButton.addEventListener("click", () => {
    cancelled = true;
    overlay.remove();
  });

  copyButton.addEventListener("click", () => {
    reportTextEl.select();
    navigator.clipboard.writeText(reportTextEl.value)
      .then(() => alert("Report copied to clipboard."))
      .catch(() => alert("Clipboard access was unavailable. Select and copy the report text manually."));
  });

  const bank = window.HANGUL_STROKES || {};
  const jamos = Object.keys(bank);
  const fixtures = [];

  const ROUGH_NATURAL_HAN = [
    [[0.24, 0.04], [0.24, 0.2]],
    [[0.08, 0.17], [0.18, 0.18], [0.31, 0.19], [0.43, 0.17]],
    [[0.16, 0.3], [0.11, 0.36], [0.1, 0.48], [0.15, 0.55], [0.28, 0.56], [0.37, 0.5], [0.4, 0.4], [0.36, 0.32], [0.25, 0.3], [0.16, 0.3], [0.13, 0.46], [0.14, 0.65], [0.16, 0.82], [0.19, 0.91], [0.39, 0.91]],
    [[0.69, 0.22], [0.69, 0.84]],
    [[0.69, 0.49], [0.9, 0.49]],
  ];
  fixtures.push({ id: "rough_han", target: "한", strokes: ROUGH_NATURAL_HAN, isNegative: false });

  function interpolatePoints(stroke, pointsPerSegment = 9) {
    const out = [];
    for (let i = 1; i < stroke.length; i += 1) {
      const a = stroke[i - 1];
      const b = stroke[i];
      for (let step = i === 1 ? 0 : 1; step <= pointsPerSegment; step += 1) {
        const t = step / pointsPerSegment;
        out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
      }
    }
    return out.length ? out : stroke.map((p) => [...p]);
  }

  function strokeLen(stroke) {
    let total = 0;
    for (let i = 1; i < stroke.length; i += 1) {
      total += Math.hypot(stroke[i][0] - stroke[i - 1][0], stroke[i][1] - stroke[i - 1][1]);
    }
    return total;
  }

  function splitOneStroke(strokes) {
    const dense = strokes.map((s) => interpolatePoints(s));
    let strokeIndex = 0;
    for (let i = 1; i < dense.length; i += 1) {
      if (strokeLen(dense[i]) > strokeLen(dense[strokeIndex])) strokeIndex = i;
    }
    const stroke = dense[strokeIndex];
    const halfLength = strokeLen(stroke) / 2;
    let travelled = 0;
    let splitIndex = 1;
    for (let i = 1; i < stroke.length - 1; i += 1) {
      travelled += Math.hypot(stroke[i][0] - stroke[i - 1][0], stroke[i][1] - stroke[i - 1][1]);
      splitIndex = i;
      if (travelled >= halfLength) break;
    }
    splitIndex = Math.max(1, Math.min(stroke.length - 2, splitIndex));
    return [
      ...dense.slice(0, strokeIndex),
      stroke.slice(0, splitIndex + 1),
      stroke.slice(splitIndex),
      ...dense.slice(strokeIndex + 1),
    ];
  }

  function mergeTwoAdjacentStrokes(strokes) {
    if (strokes.length < 2) return null;
    const dense = strokes.map((s) => interpolatePoints(s));
    let best = null;
    for (let i = 0; i < dense.length - 1; i += 1) {
      for (const reverseFirst of [false, true]) {
        for (const reverseSecond of [false, true]) {
          const first = reverseFirst ? dense[i].slice().reverse() : dense[i].slice();
          const second = reverseSecond ? dense[i + 1].slice().reverse() : dense[i + 1].slice();
          const gap = Math.hypot(first[first.length - 1][0] - second[0][0], first[first.length - 1][1] - second[0][1]);
          if (!best || gap < best.gap) best = { index: i, first, second, gap };
        }
      }
    }
    return [
      ...dense.slice(0, best.index),
      [...best.first, ...best.second],
      ...dense.slice(best.index + 2),
    ];
  }

  for (const glyph of jamos) {
    const strokes = bank[glyph].strokes;
    fixtures.push({ id: `jamo_authored_${glyph}`, target: glyph, strokes, isNegative: false });

    const split = splitOneStroke(strokes);
    fixtures.push({ id: `jamo_split_${glyph}`, target: glyph, strokes: split, isNegative: false });

    const merged = mergeTwoAdjacentStrokes(strokes);
    if (merged) {
      fixtures.push({ id: `jamo_merge_${glyph}`, target: glyph, strokes: merged, isNegative: false });
    }

    for (const other of jamos) {
      if (other !== glyph) {
        fixtures.push({ id: `neg_${glyph}_vs_${other}`, target: other, strokes, isNegative: true });
      }
    }
  }

  const results = [];
  let index = 0;

  async function processNext() {
    if (cancelled) return;
    if (index >= fixtures.length) {
      const mlkitReady = results.filter((row) => row.mlkit.ready);
      const mlkitFallbackCount = results.length - mlkitReady.length;
      const mlkitLatencies = mlkitReady.map((row) => row.mlkit.latencyMs).sort((a, b) => a - b);
      const average = (values) => values.length
        ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)
        : null;
      const percentile95 = mlkitLatencies.length
        ? mlkitLatencies[Math.min(mlkitLatencies.length - 1, Math.ceil(mlkitLatencies.length * 0.95) - 1)]
        : null;
      const report = {
        schemaVersion: 1,
        generatedAt: new Date().toISOString(),
        runtime: isHanaPathNative() ? "android-native" : "web",
        model: "mlkit-digital-ink-ko",
        device: {
          userAgent: navigator.userAgent,
          viewport: { width: window.innerWidth, height: window.innerHeight },
          devicePixelRatio: window.devicePixelRatio || 1,
          assetVersion: (() => {
            const src = document.querySelector('script[src*="app.js"]')?.src;
            return src ? new URL(src, window.location.href).searchParams.get("v") : null;
          })(),
        },
        authority: "$Q remains authoritative until the M3 real-device gate is signed off",
        summary: {
          fixtureCount: results.length,
          positiveCount: results.filter((row) => !row.isNegative).length,
          negativeCount: results.filter((row) => row.isNegative).length,
          qFalseAcceptCount: results.filter((row) => row.q.falseAccept).length,
          mlkitFalseAcceptCount: results.filter((row) => row.mlkit.falseAccept).length,
          mlkitReadyCount: mlkitReady.length,
          mlkitFallbackCount,
          mlkitFallbackRate: results.length ? mlkitFallbackCount / results.length : 1,
          mlkitAverageLatencyMs: average(mlkitLatencies),
          mlkitP95LatencyMs: percentile95,
        },
        results,
      };
      progressEl.textContent = `Completed ${fixtures.length} fixtures.`;
      reportTextEl.value = JSON.stringify(report, null, 2);
      contentEl.style.display = "block";
      copyButton.hidden = false;
      closeButton.textContent = "Close";
      return;
    }

    const fix = fixtures[index];
    progressEl.textContent = `Running comparison: ${index + 1} of ${fixtures.length} (${Math.round((index + 1) / fixtures.length * 100)}%)`;

    let timeAcc = 0;
    const mlKitStrokes = fix.strokes.map(stroke =>
      stroke.map(p => {
        const x = (Array.isArray(p) ? p[0] : p.x) * 480;
        const y = (Array.isArray(p) ? p[1] : p.y) * 480;
        timeAcc += 16;
        return { x, y, t: timeAcc };
      })
    );

    const qStrokesInput = fix.strokes.map(stroke =>
      stroke.map(p => {
        const px = Array.isArray(p) ? p[0] : p.x;
        const py = Array.isArray(p) ? p[1] : p.y;
        return { x: px * 480, y: py * 480 };
      })
    );
    const qRaw = await recognizeHangulInkWithProvider({
      provider: "$q",
      strokes: qStrokesInput,
      writingArea: { width: 480, height: 480 },
      limit: jamos.length,
    });
    const qMatches = qRaw.candidates;

    const qRankIndex = qMatches.findIndex(m => m.name === fix.target);
    const qTop = qMatches[0] || null;
    const qSecond = qMatches[1] || null;
    const qMargin = qTop ? (qSecond ? qTop.score - qSecond.score : 1) : 0;
    const qAccepted = Boolean(
      qTop?.name === fix.target
      && qTop.score >= HANGUL_FREEHAND_TARGET_CONFIDENCE
      && (qMargin >= HANGUL_FREEHAND_MIN_MARGIN || qTop.score >= 0.96)
    );

    const qResult = {
      provider: "$q",
      ready: qRaw.ready,
      latencyMs: qRaw.latencyMs,
      candidates: qMatches.slice(0, 3),
      rank: qRankIndex >= 0 ? qRankIndex + 1 : -1,
      falseAccept: fix.isNegative && qAccepted,
      fallbackReason: qRaw.fallbackReason,
    };

    let mlKitResult = null;
    if (isHanaPathNative() && state.useMLKit === true) {
      const mlKitRaw = await recognizeHangulInkWithProvider({
        provider: "mlkit",
        strokes: mlKitStrokes,
        writingArea: { width: 480, height: 480 },
      });
      const mlKitRankIndex = mlKitRaw.candidates.findIndex(m => m.name === fix.target);
      const mlKitTop = mlKitRaw.candidates[0] || null;
      const mlKitAccepted = mlKitRaw.ready && mlKitTop?.name === fix.target;

      mlKitResult = {
        provider: "mlkit",
        ready: mlKitRaw.ready,
        latencyMs: mlKitRaw.latencyMs,
        candidates: mlKitRaw.candidates.slice(0, 3),
        rank: mlKitRankIndex >= 0 ? mlKitRankIndex + 1 : -1,
        falseAccept: fix.isNegative && mlKitAccepted,
        fallbackReason: mlKitRaw.fallbackReason
      };
    } else {
      mlKitResult = {
        provider: "mlkit",
        ready: false,
        latencyMs: 0,
        candidates: [],
        rank: -1,
        falseAccept: false,
        fallbackReason: isHanaPathNative() ? "mlkit_disabled" : "desktop_pending"
      };
    }

    results.push({
      fixtureId: fix.id,
      target: fix.target,
      isNegative: fix.isNegative,
      strokesCount: fix.strokes.length,
      q: qResult,
      mlkit: mlKitResult
    });

    index++;
    window.setTimeout(processNext, 0);
  }

  processNext();
}

function getHangulComponentStrokes(jamo) {
  const bank = (typeof window !== "undefined" && window.HANGUL_STROKES) || null;
  if (!bank) return null;
  return bank[jamo]?.strokes?.length ? bank[jamo].strokes : getComposableJamoStrokes(jamo, bank);
}

function getHangulComponentRecognizer() {
  if (hangulComponentRecognizerCache) return hangulComponentRecognizerCache;
  const API = typeof window !== "undefined" ? window.HANAPATH_HANGUL_RECOGNIZER : null;
  const bank = (typeof window !== "undefined" && window.HANGUL_STROKES) || null;
  if (!API?.Recognizer || !bank) return null;
  const recognizer = new API.Recognizer();
  const componentGlyphs = [...new Set([...Object.keys(bank), ...Object.keys(HANGUL_COMPOUND_FINAL_PARTS)])];
  componentGlyphs.forEach((jamo) => {
    const strokes = getHangulComponentStrokes(jamo);
    if (strokes?.length) recognizer.add(jamo, strokes, { augment: true });
  });
  hangulComponentRecognizerCache = { recognizer, count: componentGlyphs.length };
  return hangulComponentRecognizerCache;
}

function extractHangulInkComponentStrokes(strokes, pieces, pieceIndex, verticalFamily) {
  const padding = 0.12;
  const [, box] = pieces[pieceIndex];
  const [x, y, width, height] = box;
  const finalIndex = pieces.length === 3 ? 2 : -1;
  const medialBox = pieces[1][1];
  const denseStrokes = strokes.map((stroke) => {
    const count = Math.max(24, Math.min(96, Math.ceil(hangulPairPathLength(stroke) * 120)));
    return resampleHangulStroke(stroke, count);
  });
  const fragments = [];
  denseStrokes.forEach((dense) => {
    if (pieceIndex === finalIndex) {
      const [mx, my, mw, mh] = medialBox;
      const medialPoints = dense.filter(([px, py]) => (
        px >= mx - padding && px <= mx + mw + padding
        && py >= my - padding && py <= my + mh + padding
      ));
      const medialOverlap = medialPoints.length / dense.length;
      const meanX = dense.reduce((sum, [px]) => sum + px, 0) / dense.length;
      const meanY = dense.reduce((sum, [, py]) => sum + py, 0) / dense.length;
      const belongsToMedial = verticalFamily
        ? medialOverlap >= 0.5 && meanX >= mx - 0.05
        : medialOverlap >= 0.5 && meanY <= box[1] - 0.04;
      if (belongsToMedial) return;
    }
    let fragment = [];
    dense.forEach((point) => {
      const inside = point[0] >= x - padding && point[0] <= x + width + padding
        && point[1] >= y - padding && point[1] <= y + height + padding;
      if (inside) {
        fragment.push(point);
      } else if (fragment.length > 1) {
        const clean = cleanHangulInkStroke(fragment);
        if (clean) fragments.push(clean);
        fragment = [];
      } else {
        fragment = [];
      }
    });
    if (fragment.length > 1) {
      const clean = cleanHangulInkStroke(fragment);
      if (clean) fragments.push(clean);
    }
  });
  return fragments;
}

function getHangulTargetComponentMatches(strokes, glyph) {
  const parts = decomposeHangul(glyph);
  const layout = getHangulSyllableLayout(parts);
  const componentApi = getHangulComponentRecognizer();
  if (!parts || !layout || !componentApi) return [];
  const pieces = [[parts.initial, layout.initial], [parts.medial, layout.medial]];
  if (parts.final) pieces.push([parts.final, layout.final]);
  const verticalFamily = VOWEL_FAMILIES.vertical.has(parts.medial) || VOWEL_FAMILIES.compound.has(parts.medial);
  return pieces.map(([jamo], pieceIndex) => {
    const componentInk = extractHangulInkComponentStrokes(strokes, pieces, pieceIndex, verticalFamily);
    const matches = componentApi.recognizer.recognize(componentInk, componentApi.count);
    const rankIndex = matches.findIndex((match) => match.name === jamo);
    return {
      jamo,
      rank: rankIndex + 1,
      confidence: rankIndex >= 0 ? matches[rankIndex].confidence : 0,
    };
  });
}

function isHangulTargetAwareRecognitionMatch(matches, glyph, strokes) {
  const target = matches.find((match) => match.name === glyph) || null;
  if (!target || target.confidence < HANGUL_FREEHAND_FALLBACK_TARGET_CONFIDENCE) return false;
  const components = getHangulTargetComponentMatches(strokes, glyph);
  if (components.length < 2) return false;
  const confidences = components.map((component) => component.confidence);
  const average = confidences.reduce((sum, confidence) => sum + confidence, 0) / confidences.length;
  return Math.min(...confidences) >= HANGUL_FREEHAND_COMPONENT_MIN_CONFIDENCE
    && average >= HANGUL_FREEHAND_COMPONENT_AVG_CONFIDENCE
    && components.every((component) => component.rank > 0 && component.rank <= HANGUL_FREEHAND_COMPONENT_MAX_RANK);
}

function isHangulFreehandRecognitionMatch(matches, glyph, strokes = []) {
  const top = matches[0] || null;
  const second = matches[1] || null;
  if (top?.name === glyph && top.confidence >= HANGUL_FREEHAND_TARGET_CONFIDENCE) {
    const margin = second ? top.confidence - second.confidence : 1;
    if (margin >= HANGUL_FREEHAND_MIN_MARGIN || top.confidence >= 0.96) return true;
  }
  return isHangulTargetAwareRecognitionMatch(matches, glyph, strokes);
}

function clearHangulRecognitionTimer() {
  if (hangulRecognitionTimer !== null) {
    window.clearTimeout(hangulRecognitionTimer);
    hangulRecognitionTimer = null;
  }
}

function setHangulRecognitionFeedback(message, tone = "") {
  const panel = document.getElementById("writingRecognition");
  if (!panel) return;
  panel.className = `writing-recognition${tone ? ` ${tone}` : ""}`;
  panel.innerHTML = `<span class="writing-recognition-message">${escapeHtml(message)}</span>`;
}

function hangulWritingResultSvg(strokes, glyph) {
  const lines = strokes.map((stroke, index) => {
    const points = stroke.map((point) => {
      const x = Math.max(0, Math.min(100, Number(point[0]) * 100));
      const y = Math.max(0, Math.min(100, Number(point[1]) * 100));
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(" ");
    return `<polyline class="writing-result-stroke" pathLength="1" style="--stroke-index:${index}" points="${points}"></polyline>`;
  }).join("");
  return `<svg class="writing-result-visual" viewBox="0 0 100 100" role="img" aria-label="Your drawing becoming ${escapeHtml(glyph)}">${lines}<text class="writing-result-glyph" x="50" y="58" text-anchor="middle" lang="ko">${escapeHtml(glyph)}</text></svg>`;
}

function showHangulWritingResult({ glyph, strokes, correct, detail, unit }) {
  const overlay = document.getElementById("writingResultOverlay");
  const canvas = document.getElementById("writingCanvas");
  if (!overlay || !canvas) return;

  clearHangulRecognitionTimer();
  stopHangulWatch();
  hangulWritingState.celebrating = true;
  updateHangulWritingControls();
  recordHangulWritingResult(glyph, correct ? "great" : "retry");
  if (correct) {
    showCorrectToast("Well done!");
    window.setTimeout(() => { void speak(glyph); }, 360);
  }

  const repeatsRemain = correct && hangulWritingState.repeatIndex + 1 < hangulWritingState.repeatTarget;
  const isFinalGlyph = hangulWritingState.glyphIndex + 1 >= unit.glyphs.length;
  const nextLabel = !correct
    ? "Try again"
    : repeatsRemain
      ? `Again ${hangulWritingState.repeatIndex + 2}/${hangulWritingState.repeatTarget}`
      : isFinalGlyph
        ? "Finish"
        : "Next";

  overlay.className = `writing-result-overlay open ${correct ? "correct" : "retry"}`;
  overlay.innerHTML = `
    <div class="writing-result-sheet" role="dialog" aria-modal="true" aria-labelledby="writingResultTitle">
      <div class="writing-result-actions">
        <button class="writing-result-action retry" type="button" id="writingResultRetry">Retry</button>
        <button class="writing-result-action next" type="button" id="writingResultNext">${escapeHtml(nextLabel)} <span aria-hidden="true">›</span></button>
      </div>
      <div class="writing-result-title" id="writingResultTitle">${correct ? "Shape recognized" : "One quick correction"}</div>
      <p class="writing-result-copy">${escapeHtml(detail)}</p>
      ${hangulWritingResultSvg(strokes, glyph)}
    </div>`;

  overlay.querySelector("#writingResultRetry").addEventListener("click", () => {
    hangulWritingState.celebrating = false;
    hangulWritingState.strokes = [];
    overlay.className = "writing-result-overlay";
    overlay.innerHTML = "";
    drawHangulWritingCanvas(canvas);
    updateHangulWritingControls();
    updateHangulStrokeStatus("Draw naturally · pause to auto-check, or tap Check drawing.");
    canvas.focus({ preventScroll: true });
  });
  overlay.querySelector("#writingResultNext").addEventListener("click", () => {
    hangulWritingState.celebrating = false;
    hangulWritingState.strokes = [];
    if (!correct) {
      renderHangulWriting();
      return;
    }
    if (hangulWritingState.repeatIndex + 1 < hangulWritingState.repeatTarget) {
      hangulWritingState.repeatIndex += 1;
      renderHangulWriting();
      return;
    }
    hangulWritingState.repeatIndex = 0;
    if (isFinalGlyph) {
      completeHangulWritingSession(unit);
      return;
    }
    hangulWritingState.glyphIndex += 1;
    renderHangulWriting();
  });
}

// Scale a normalized guide stroke ([x,y] in a 0–1 box) to canvas pixel points.
function scaleHangulStroke(stroke, canvas) {
  return stroke.map((p) => ({ x: p[0] * canvas.width, y: p[1] * canvas.height }));
}

// Draw the authored guide strokes with numbered start badges. `completed`
// strokes render as "done", the `activeIndex` stroke is emphasized as the next
// one to trace, and `emphasize` recolors everything for the self-check compare.
function drawHangulGuideStrokes(ctx, canvas, guide, opts) {
  const options = opts || {};
  const showNumbers = options.showNumbers !== false;
  const completed = options.completed || 0;
  const activeIndex = typeof options.activeIndex === "number" ? options.activeIndex : -1;
  const emphasize = Boolean(options.emphasize);
  const W = canvas.width;
  const baseWidth = Math.max(6, W * 0.03);
  const badgeR = Math.max(9, W * 0.032);

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  guide.strokes.forEach((stroke, i) => {
    const pts = scaleHangulStroke(stroke, canvas);
    if (!pts.length) return;
    let color = "rgba(127, 127, 127, 0.26)";
    let width = baseWidth;
    if (emphasize) {
      color = "rgba(122, 92, 255, 0.5)";
    } else if (i < completed) {
      color = "rgba(56, 176, 120, 0.6)";
    } else if (i === activeIndex) {
      color = "rgba(122, 92, 255, 0.8)";
      width = baseWidth * 1.12;
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let j = 1; j < pts.length; j += 1) ctx.lineTo(pts[j].x, pts[j].y);
    ctx.stroke();

    if (showNumbers) {
      const bx = pts[0].x;
      const by = pts[0].y;
      ctx.beginPath();
      ctx.fillStyle = i === activeIndex ? "rgba(122, 92, 255, 0.95)" : "rgba(90, 90, 110, 0.55)";
      ctx.arc(bx, by, badgeR, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.round(badgeR * 1.15)}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(i + 1), bx, by);
    }
  });
  ctx.restore();
}

function hangulPolylineLength(pts) {
  let total = 0;
  for (let i = 1; i < pts.length; i += 1) {
    total += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  }
  return total;
}

// Draw the first `frac` (0–1) of a polyline by arc length; returns the head
// point so the animator can draw a moving nib.
function drawHangulPartialStroke(ctx, pts, frac) {
  if (pts.length < 2) return pts[0] || null;
  const target = hangulPolylineLength(pts) * Math.max(0, Math.min(1, frac));
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  let acc = 0;
  let head = pts[0];
  for (let i = 1; i < pts.length; i += 1) {
    const seg = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    if (acc + seg <= target || seg === 0) {
      ctx.lineTo(pts[i].x, pts[i].y);
      head = pts[i];
      acc += seg;
    } else {
      const r = (target - acc) / seg;
      head = {
        x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * r,
        y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * r,
      };
      ctx.lineTo(head.x, head.y);
      break;
    }
  }
  ctx.stroke();
  return head;
}

let hangulWatchRaf = null;

function stopHangulWatch() {
  if (hangulWatchRaf !== null) {
    cancelAnimationFrame(hangulWatchRaf);
    hangulWatchRaf = null;
  }
  hangulWritingState.animating = false;
  updateHangulWritingControls();
}

// Animate the guide one stroke at a time on the canvas (requestAnimationFrame,
// no libraries). Ink drawing is blocked while animating; the view settles back
// to the normal render when the demo finishes.
function watchHangulGuide(canvas, guide) {
  stopHangulWatch();
  hangulWritingState.animating = true;
  updateHangulWritingControls();
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const strokes = guide.strokes.map((stroke) => scaleHangulStroke(stroke, canvas));
  const perStrokeMs = 650;
  const gapMs = 180;
  const start = performance.now();

  const frame = (now) => {
    const t = now - start;
    ctx.clearRect(0, 0, W, canvas.height);
    drawHangulGuideStrokes(ctx, canvas, guide, { showNumbers: true, completed: 0, activeIndex: -1 });

    ctx.save();
    ctx.strokeStyle = "#7a5cff";
    ctx.lineWidth = Math.max(6, W * 0.032);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    let done = true;
    let head = null;
    for (let i = 0; i < strokes.length; i += 1) {
      const strokeStart = i * (perStrokeMs + gapMs);
      if (t < strokeStart) {
        done = false;
        break;
      }
      const frac = Math.min(1, (t - strokeStart) / perStrokeMs);
      head = drawHangulPartialStroke(ctx, strokes[i], frac);
      if (frac < 1) {
        done = false;
        break;
      }
    }
    if (head) {
      ctx.fillStyle = "#7a5cff";
      ctx.beginPath();
      ctx.arc(head.x, head.y, Math.max(5, W * 0.02), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    if (done) {
      hangulWatchRaf = null;
      hangulWritingState.animating = false;
      updateHangulWritingControls();
      drawHangulWritingCanvas(canvas);
      return;
    }
    hangulWatchRaf = requestAnimationFrame(frame);
  };
  hangulWatchRaf = requestAnimationFrame(frame);
}

// ── W2 grading engine (docs/HANGUL_WRITING_PLAN.md §7 — normative spec) ──────
// Pure functions only: no DOM access below until the UI wiring in §7.6/7.7.
// All grading happens in the guide's normalized 0–1 space on [x, y] pairs.
const HANGUL_GRADE = {
  RESAMPLE_POINTS: 32, // both ink and guide strokes resample to this count
  MIN_POINTS: 3, // ink strokes with fewer raw points are accidental taps
  MIN_LENGTH: 0.02, // ink strokes shorter than this (normalized) are taps
  DEDUPE_EPS: 0.002, // drop consecutive raw points closer than this
  START_RADIUS: 0.35, // start/end distance that maps to score 0
  PLACEMENT_RADIUS: 0.25,
  SHAPE_RADIUS: 0.3,
  PASS_SCORE: 0.72, // per-stroke pass
  CLOSE_SCORE: 0.6, // whole-glyph "close" floor
  REJECT_START: 0.35, // hard-reject thresholds (§7.4 reason codes)
  REJECT_DIRECTION: 0.4,
  REJECT_LENGTH: 0.45,
};

// {x, y} canvas ink points → clamped [x, y] pairs in the 0–1 guide space
// (§7.6b: pointer capture can yield points outside the canvas; clamp for
// grading only — the stored ink is never mutated).
function normalizeHangulInkStroke(stroke, canvas) {
  return stroke.map((p) => [
    Math.max(0, Math.min(1, p.x / canvas.width)),
    Math.max(0, Math.min(1, p.y / canvas.height)),
  ]);
}

function hangulPairDist(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

function hangulPairPathLength(pts) {
  let total = 0;
  for (let i = 1; i < pts.length; i += 1) total += hangulPairDist(pts[i], pts[i - 1]);
  return total;
}

// §7.2: tap rejection + dedupe. Returns the cleaned stroke, or null when the
// stroke is an accidental tap (too few raw points / too short overall).
function cleanHangulInkStroke(points) {
  if (!Array.isArray(points) || points.length < HANGUL_GRADE.MIN_POINTS) return null;
  if (hangulPairPathLength(points) < HANGUL_GRADE.MIN_LENGTH) return null;
  const kept = [points[0]];
  for (let i = 1; i < points.length; i += 1) {
    if (hangulPairDist(points[i], kept[kept.length - 1]) >= HANGUL_GRADE.DEDUPE_EPS) {
      kept.push(points[i]);
    }
  }
  return kept.length >= 2 ? kept : null;
}

// §7.2.3: resample a polyline to exactly `count` points equally spaced by arc
// length (linear interpolation; zero-length polylines repeat the first point).
function resampleHangulStroke(points, count) {
  if (!points.length) return [];
  const total = hangulPairPathLength(points);
  if (points.length < 2 || total === 0) {
    return Array.from({ length: count }, () => [points[0][0], points[0][1]]);
  }
  const out = [];
  const step = total / (count - 1);
  let segIndex = 0;
  let distBefore = 0;
  for (let s = 0; s < count; s += 1) {
    const target = Math.min(s * step, total);
    while (
      segIndex < points.length - 2 &&
      distBefore + hangulPairDist(points[segIndex + 1], points[segIndex]) < target
    ) {
      distBefore += hangulPairDist(points[segIndex + 1], points[segIndex]);
      segIndex += 1;
    }
    const a = points[segIndex];
    const b = points[segIndex + 1];
    const segLen = hangulPairDist(a, b) || 1;
    const r = Math.max(0, Math.min(1, (target - distBefore) / segLen));
    out.push([a[0] + (b[0] - a[0]) * r, a[1] + (b[1] - a[1]) * r]);
  }
  return out;
}

function hangulMeanPointDistance(a, b) {
  const n = Math.min(a.length, b.length);
  if (!n) return Infinity;
  let sum = 0;
  for (let i = 0; i < n; i += 1) sum += hangulPairDist(a[i], b[i]);
  return sum / n;
}

// §7.3 shape score prep: normalize a stroke to its own bounding box using ONE
// uniform scale of max(w, h, 0.05), centered on the box center. Per-axis
// scaling explodes on straight strokes (ㅡ/ㅣ have ~zero height/width).
function hangulShapeNormalize(pts) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  pts.forEach((p) => {
    if (p[0] < minX) minX = p[0];
    if (p[0] > maxX) maxX = p[0];
    if (p[1] < minY) minY = p[1];
    if (p[1] > maxY) maxY = p[1];
  });
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const scale = Math.max(maxX - minX, maxY - minY, 0.05);
  return pts.map((p) => [(p[0] - cx) / scale + 0.5, (p[1] - cy) / scale + 0.5]);
}

// §7.3 direction score: mean segment-angle agreement mapped to 0–1.
function hangulDirectionScore(a, b) {
  let total = 0;
  let samples = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 1; i < n; i += 1) {
    const ax = a[i][0] - a[i - 1][0];
    const ay = a[i][1] - a[i - 1][1];
    const bx = b[i][0] - b[i - 1][0];
    const by = b[i][1] - b[i - 1][1];
    const la = Math.hypot(ax, ay);
    const lb = Math.hypot(bx, by);
    if (la === 0 || lb === 0) continue;
    total += ((ax * bx + ay * by) / (la * lb) + 1) / 2;
    samples += 1;
  }
  return samples ? total / samples : 0;
}

// Score one CLEANED ink stroke against one guide stroke (both [x, y] pair
// arrays in 0–1 space). Applies §7.3 formulas + weights and the §7.4
// hard-reject ladder. Returns { score, pass, reason }.
function scoreHangulStrokeAgainst(inkPts, guidePts) {
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const N = HANGUL_GRADE.RESAMPLE_POINTS;
  const U = resampleHangulStroke(inkPts, N);
  const G = resampleHangulStroke(guidePts, N);
  const start = clamp(1 - hangulPairDist(U[0], G[0]) / HANGUL_GRADE.START_RADIUS);
  const end = clamp(1 - hangulPairDist(U[N - 1], G[N - 1]) / HANGUL_GRADE.START_RADIUS);
  const placement = clamp(1 - hangulMeanPointDistance(U, G) / HANGUL_GRADE.PLACEMENT_RADIUS);
  const shape = clamp(
    1 - hangulMeanPointDistance(hangulShapeNormalize(U), hangulShapeNormalize(G)) / HANGUL_GRADE.SHAPE_RADIUS
  );
  const direction = hangulDirectionScore(U, G);
  const lenU = hangulPairPathLength(inkPts);
  const lenG = hangulPairPathLength(guidePts);
  const length = lenU && lenG ? Math.min(lenU, lenG) / Math.max(lenU, lenG) : 0;
  const score =
    start * 0.15 + end * 0.1 + placement * 0.2 + shape * 0.25 + direction * 0.2 + length * 0.1;
  let reason = null;
  // No wrong-start hard reject (owner decision 2026-07-11): with an invisible
  // guide the start point only contributes to the blended score.
  if (direction < HANGUL_GRADE.REJECT_DIRECTION) reason = "wrong-direction";
  else if (length < HANGUL_GRADE.REJECT_LENGTH) reason = "length";
  else if (score < HANGUL_GRADE.PASS_SCORE) reason = "shape";
  return { score, pass: reason === null, reason };
}

// Closed strokes can begin anywhere around the loop and run in either
// direction. Generate every cyclic start-point variant in both directions so
// a learner's circle is judged by its shape, not where their finger landed.
function getHangulClosedStrokeVariants(guidePts) {
  if (!Array.isArray(guidePts) || guidePts.length < 3) return [guidePts];
  const core = hangulPairDist(guidePts[0], guidePts[guidePts.length - 1]) < 0.05
    ? guidePts.slice(0, -1)
    : [...guidePts];
  const variants = [];
  [core, [...core].reverse()].forEach((ordered) => {
    for (let offset = 0; offset < ordered.length; offset += 1) {
      const rotated = [...ordered.slice(offset), ...ordered.slice(0, offset)];
      variants.push([...rotated, rotated[0]]);
    }
  });
  return variants;
}

function bestHangulStrokeScore(inkPts, guideVariants, scorer) {
  return guideVariants.reduce((best, guide) => {
    const candidate = scorer(inkPts, guide);
    if (!best) return candidate;
    if (candidate.pass !== best.pass) return candidate.pass ? candidate : best;
    return candidate.score > best.score ? candidate : best;
  }, null);
}

// §7.3 closed-stroke rule: circles (ㅇ, the bottom of ㅎ) are invariant to
// both drawing direction and starting position.
function scoreHangulStroke(inkPts, guidePts) {
  const forward = scoreHangulStrokeAgainst(inkPts, guidePts);
  const isClosed = hangulPairDist(guidePts[0], guidePts[guidePts.length - 1]) < 0.05;
  if (!isClosed) return forward;
  return bestHangulStrokeScore(inkPts, getHangulClosedStrokeVariants(guidePts), scoreHangulStrokeAgainst);
}

// Position/scale-FREE scoring for the first stroke of an attempt. With no
// visible guide the learner may write anywhere on the canvas at any size, so
// stroke 1 is judged on shape + direction only; where it lands then anchors
// the rest of the glyph via fitHangulAlignment().
function scoreHangulStrokeFreeAgainst(inkPts, guidePts) {
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const N = HANGUL_GRADE.RESAMPLE_POINTS;
  const U = resampleHangulStroke(inkPts, N);
  const G = resampleHangulStroke(guidePts, N);
  const shape = clamp(
    1 - hangulMeanPointDistance(hangulShapeNormalize(U), hangulShapeNormalize(G)) / HANGUL_GRADE.SHAPE_RADIUS
  );
  const direction = hangulDirectionScore(hangulShapeNormalize(U), hangulShapeNormalize(G));
  const score = shape * 0.55 + direction * 0.45;
  let reason = null;
  if (direction < HANGUL_GRADE.REJECT_DIRECTION) reason = "wrong-direction";
  else if (score < HANGUL_GRADE.PASS_SCORE) reason = "shape";
  return { score, pass: reason === null, reason };
}

function scoreHangulStrokeFree(inkPts, guidePts) {
  const forward = scoreHangulStrokeFreeAgainst(inkPts, guidePts);
  const isClosed = hangulPairDist(guidePts[0], guidePts[guidePts.length - 1]) < 0.05;
  if (!isClosed) return forward;
  return bestHangulStrokeScore(inkPts, getHangulClosedStrokeVariants(guidePts), scoreHangulStrokeFreeAgainst);
}

// Fit a translation + uniform scale mapping the guide onto the learner's
// earlier ink (strokes 0..count-1), so later strokes are graded relative to
// where the learner is actually writing, not to absolute canvas coordinates.
function transformHangulPoints(pts, t) {
  return pts.map((p) => [p[0] * t.s + t.dx, p[1] * t.s + t.dy]);
}

function fitHangulAlignment(inkStrokes, guideStrokes, count) {
  if (!count) return { s: 1, dx: 0, dy: 0 };
  const N = HANGUL_GRADE.RESAMPLE_POINTS;
  let lenU = 0;
  let lenG = 0;
  let cu = [0, 0];
  let cg = [0, 0];
  let samples = 0;
  for (let i = 0; i < count; i += 1) {
    lenU += hangulPairPathLength(inkStrokes[i]);
    lenG += hangulPairPathLength(guideStrokes[i]);
    const U = resampleHangulStroke(inkStrokes[i], N);
    const G = resampleHangulStroke(guideStrokes[i], N);
    for (let j = 0; j < N; j += 1) {
      cu[0] += U[j][0];
      cu[1] += U[j][1];
      cg[0] += G[j][0];
      cg[1] += G[j][1];
      samples += 1;
    }
  }
  cu = [cu[0] / samples, cu[1] / samples];
  cg = [cg[0] / samples, cg[1] / samples];
  const s = lenG > 0.01 ? Math.max(0.5, Math.min(2, lenU / lenG)) : 1;
  return { s, dx: cu[0] - s * cg[0], dy: cu[1] - s * cg[1] };
}

// §7.5 whole-glyph verdict. `strokes` are ALREADY-NORMALIZED [x, y] pair
// strokes (see normalizeHangulInkStroke). Ink stroke i is graded against
// guide stroke i — order IS the lesson; no reordering search. Returns null
// when the glyph has no guide (the self-check flow is then the verdict).
function gradeHangulDrawing(glyph, strokes) {
  const guide = getHangulStrokeGuide(glyph);
  if (!guide) return null;
  const cleaned = (strokes || [])
    .map((stroke) => cleanHangulInkStroke(stroke))
    .filter((stroke) => stroke !== null);
  const expected = guide.strokes.length;
  const drawn = cleaned.length;
  const perStroke = [];
  const pairs = Math.min(expected, drawn);
  for (let i = 0; i < pairs; i += 1) {
    const result = i === 0
      ? scoreHangulStrokeFree(cleaned[i], guide.strokes[i])
      : scoreHangulStroke(
          cleaned[i],
          transformHangulPoints(guide.strokes[i], fitHangulAlignment(cleaned, guide.strokes, i)),
        );
    perStroke.push({ index: i, score: result.score, pass: result.pass, reason: result.reason });
  }
  let verdict = "again";
  if (drawn === expected && perStroke.length) {
    const allPass = perStroke.every((s) => s.pass);
    const mean = perStroke.reduce((sum, s) => sum + s.score, 0) / perStroke.length;
    const hardMiss = perStroke.some((s) => s.reason === "wrong-direction");
    if (allPass) verdict = "great";
    else if (mean >= HANGUL_GRADE.CLOSE_SCORE && !hardMiss) verdict = "close";
  }
  return { verdict, perStroke, strokeCount: { expected, drawn } };
}

function recordHangulWritingResult(glyph, verdict) {
  const correct = verdict === "great";
  hangulWritingState.attempts += 1;
  if (correct) hangulWritingState.successes += 1;
  else hangulWritingState.retries += 1;
  const previous = hangulWritingState.glyphStats[glyph] || { attempts: 0, successes: 0, retries: 0 };
  hangulWritingState.glyphStats[glyph] = {
    attempts: previous.attempts + 1,
    successes: previous.successes + (correct ? 1 : 0),
    retries: previous.retries + (correct ? 0 : 1),
  };
}

function formatHangulWritingDuration(ms) {
  const totalSeconds = Math.max(1, Math.round((Number(ms) || 0) / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes ? `${minutes}m ${String(seconds).padStart(2, "0")}s` : `${seconds}s`;
}

function completeHangulWritingSession(unit) {
  const completedAt = Date.now();
  pauseHangulWritingSessionTimer();
  const durationMs = Math.max(0, hangulWritingState.elapsedMs);
  const history = Array.isArray(state.hangulWritingHistory) ? state.hangulWritingHistory : [];
  const prior = [...history].reverse().find((entry) =>
    entry?.unitId === unit.id &&
    entry?.exercise === hangulWritingState.exercise &&
    entry?.repeatTarget === hangulWritingState.repeatTarget &&
    (entry?.inputMode || "freehand") === "freehand"
  ) || null;
  const attempts = Math.max(1, hangulWritingState.attempts);
  const summary = {
    id: `writing-${completedAt}`,
    unitId: unit.id,
    unitLabel: unit.label,
    exercise: hangulWritingState.exercise,
    inputMode: "freehand",
    repeatTarget: hangulWritingState.repeatTarget,
    glyphs: [...unit.glyphs],
    attempts: hangulWritingState.attempts,
    successes: hangulWritingState.successes,
    retries: hangulWritingState.retries,
    accuracy: Math.round((hangulWritingState.successes / attempts) * 100),
    durationMs,
    completedAt,
    glyphStats: { ...hangulWritingState.glyphStats },
    prior,
  };
  const stored = { ...summary };
  delete stored.prior;
  state.hangulWritingHistory = [...history, stored].slice(-30);
  saveState();
  hangulWritingState.unitId = null;
  hangulWritingState.strokes = [];
  hangulWritingState.repeatIndex = 0;
  hangulWritingState.completedSummary = summary;
  renderHangulWriting();
}

function drawHangulWritingCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Learner ink only. No guide, no faint glyph — the writing area stays
  // blank; the stroke guide appears solely inside the Help! demo animation.
  ctx.save();
  ctx.strokeStyle = "#7a5cff";
  ctx.lineWidth = Math.max(6, Math.min(28, Number(state.writingLineWidth) || 14));
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  hangulWritingState.strokes.forEach((stroke) => {
    if (stroke.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(stroke[0].x, stroke[0].y);
    for (let i = 1; i < stroke.length; i += 1) {
      ctx.lineTo(stroke[i].x, stroke[i].y);
    }
    ctx.stroke();
  });
  ctx.restore();
}

function updateHangulWritingControls() {
  const hasInk = hangulWritingState.strokes.length > 0;
  const clear = document.getElementById("writingClear");
  const undo = document.getElementById("writingUndo");
  const help = document.getElementById("writingHelp");
  const check = document.getElementById("writingCheck");
  if (clear) clear.disabled = !hasInk || hangulWritingState.celebrating;
  if (undo) undo.disabled = !hasInk || hangulWritingState.celebrating;
  if (check) check.disabled = !hasInk || hangulWritingState.celebrating;
  [clear, undo, help, check].forEach((button) => {
    if (button) button.hidden = hangulWritingState.animating;
  });
}

function updateHangulStrokeStatus(message, tone = "") {
  const status = document.getElementById("writingStrokeStatus");
  if (!status) return;
  status.className = `quiz-detail writing-instruction writing-stroke-status${tone ? ` ${tone}` : ""}`;
  status.textContent = message;
}

function checkHangulFreehandDrawing(canvas, glyph, unit, { silentFailure = false } = {}) {
  if (hangulWritingState.celebrating) return;
  clearHangulRecognitionTimer();
  const strokes = getNormalizedHangulWritingStrokes(canvas);
  if (!strokes.length) {
    updateHangulStrokeStatus("Draw the whole shape first.", "wrong");
    return;
  }
  const matches = recognizeHangulWriting(canvas, getHangulWritingRecognitionGlyphs().length);
  const top = matches[0] || null;
  const correct = isHangulFreehandRecognitionMatch(matches, glyph, strokes);
  const detail = correct
    ? `Freehand recognized as ${glyph} — your natural shape is clear.`
    : top
      ? `This currently looks closest to ${top.name}. Refine the overall shape and check again.`
      : `HanaPath could not read that shape yet. Make it a little clearer and try again.`;
  if (!correct && silentFailure) {
    setHangulRecognitionFeedback(top ? `Maybe ${top.name} — keep drawing` : "Try a clearer shape", top ? "close" : "wrong");
    updateHangulStrokeStatus("Keep drawing until the whole shape reads clearly.");
    runParallelMLKitRecognition(canvas);
    return;
  }
  showHangulWritingResult({ glyph, strokes, correct, detail, unit });
  runParallelMLKitRecognition(canvas);
}

function scheduleHangulFreehandAutoCheck(canvas, glyph, unit) {
  clearHangulRecognitionTimer();
  updateHangulStrokeStatus("Pause when finished · checking automatically…", "good");
  hangulRecognitionTimer = window.setTimeout(() => {
    hangulRecognitionTimer = null;
    const activeUnit = getHangulWritingUnit();
    if (
      hangulWritingState.celebrating ||
      !activeUnit ||
      activeUnit.id !== unit.id ||
      activeUnit.glyphs[hangulWritingState.glyphIndex] !== glyph
    ) return;
    checkHangulFreehandDrawing(canvas, glyph, unit, { silentFailure: true });
  }, 1100);
}

function bindHangulWritingCanvas(canvas) {
  let activeStroke = null;

  const pointFromEvent = (event) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
      t: Date.now(),
    };
  };

  canvas.addEventListener("pointerdown", (event) => {
    if (hangulWritingState.celebrating) return;
    if (event.isPrimary === false) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (activeStroke) return;
    clearHangulRecognitionTimer();
    stopHangulWatch(); // starting to write cancels the Help! demo
    event.preventDefault();
    canvas.setPointerCapture(event.pointerId);
    activeStroke = [pointFromEvent(event)];
    hangulWritingState.strokes.push(activeStroke);
    setHangulRecognitionFeedback("Writing…", "working");
    drawHangulWritingCanvas(canvas);
    updateHangulWritingControls();
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!activeStroke) return;
    event.preventDefault();
    const events = typeof event.getCoalescedEvents === "function" ? event.getCoalescedEvents() : [event];
    (events.length ? events : [event]).forEach((sample) => activeStroke.push(pointFromEvent(sample)));
    drawHangulWritingCanvas(canvas);
  });
  const finishStroke = () => {
    if (!activeStroke) return;
    const finished = activeStroke;
    activeStroke = null;
    // Keep meaningful ink so $Q can identify what the learner actually wrote;
    // taps and interrupted pointers still disappear silently.
    const unit = getHangulWritingUnit();
    const glyph = unit ? unit.glyphs[hangulWritingState.glyphIndex] : "";
    const cleaned = cleanHangulInkStroke(normalizeHangulInkStroke(finished, canvas));
    if (!cleaned) hangulWritingState.strokes.pop();
    drawHangulWritingCanvas(canvas);
    updateHangulWritingControls();
    if (!cleaned || !unit || !glyph) {
      updateHangulStrokeStatus("Draw naturally · pause to auto-check, or tap Check drawing.");
      return;
    }
    scheduleHangulFreehandAutoCheck(canvas, glyph, unit);
  };
  canvas.addEventListener("pointerup", finishStroke);
  const cancelStroke = () => {
    // An interrupted pointer (palm rejection, browser gesture) is not an
    // attempt: discard the stroke silently instead of grading it.
    if (!activeStroke) return;
    activeStroke = null;
    hangulWritingState.strokes.pop();
    drawHangulWritingCanvas(canvas);
    updateHangulWritingControls();
    updateHangulStrokeStatus("Draw naturally · pause to auto-check, or tap Check drawing.");
  };
  canvas.addEventListener("pointercancel", cancelStroke);
  canvas.addEventListener("lostpointercapture", cancelStroke);
}

function startHangulWritingSession(unit, exercise, repeatTarget, inputMode = "guided") {
  resetLessonMotion("writing");
  queueScreenMotion("forward", 1, { replace: false });
  hangulWritingState = {
    unitId: unit.id,
    glyphIndex: 0,
    exercise,
    inputMode: "freehand",
    repeatTarget: Math.max(1, Math.min(3, Number(repeatTarget) || 1)),
    repeatIndex: 0,
    strokes: [],
    animating: false,
    celebrating: false,
    startedAt: Date.now(),
    activeSince: Date.now(),
    elapsedMs: 0,
    attempts: 0,
    successes: 0,
    retries: 0,
    glyphStats: {},
    completedSummary: null,
  };
  renderHangulWriting();
}

function renderHangulWritingMultiplierPicker(el, unit, exercise) {
  const exerciseLabel = exercise === "sound"
    ? "Write from sound"
    : exercise === "roman"
      ? "Write from romanization"
      : "Copy the shape";
  el.innerHTML = `
    <div class="card word-card alphabet-practice-card writing-multiplier-card" data-lesson-motion-root>
      <div class="eyebrow">Before you start</div>
      <h2 class="screen-title">How many repetitions?</h2>
      <div class="screen-sub">${escapeHtml(unit.label)} · ${escapeHtml(exerciseLabel)} · free drawing. HanaPath checks the finished shape, not an exact stroke count.</div>
      <div class="writing-multiplier-options">
        <button class="writing-multiplier-option" type="button" data-writing-multiplier="1"><strong>1×</strong><span>One clean pass</span></button>
        <button class="writing-multiplier-option primary" type="button" data-writing-multiplier="2"><strong>2×</strong><span>Repeat to lock it in</span></button>
        <button class="writing-multiplier-option" type="button" data-writing-multiplier="3"><strong>3×</strong><span>Deep practice</span></button>
      </div>
      <button class="button secondary compact writing-multiplier-back" type="button" id="writingMultiplierBack">Back to units</button>
    </div>`;
  el.querySelectorAll("[data-writing-multiplier]").forEach((button) => {
    button.addEventListener("click", () => startHangulWritingSession(unit, exercise, Number(button.dataset.writingMultiplier)));
  });
  el.querySelector("#writingMultiplierBack").addEventListener("click", () => {
    resetHangulWritingSession();
    renderHangulWriting();
  });
  animateLessonFrame(el.querySelector("[data-lesson-motion-root]"), "writing", {
    key: `setup:${unit.id}:${exercise}`,
    order: 10,
    phase: "setup",
  });
}

function getHangulWritingImprovement(summary) {
  const prior = summary.prior;
  if (!prior) return "First run recorded — finish this setup again to see your improvement.";
  const notes = [];
  const timeDelta = Number(prior.durationMs) - Number(summary.durationMs);
  if (Math.abs(timeDelta) >= 1000) {
    notes.push(timeDelta > 0
      ? `${formatHangulWritingDuration(timeDelta)} faster`
      : `${formatHangulWritingDuration(Math.abs(timeDelta))} more practice time`);
  }
  const retryDelta = Number(prior.retries || 0) - Number(summary.retries || 0);
  if (retryDelta) notes.push(retryDelta > 0 ? `${retryDelta} fewer retries` : `${Math.abs(retryDelta)} more retries`);
  const accuracyDelta = Number(summary.accuracy || 0) - Number(prior.accuracy || 0);
  if (accuracyDelta) notes.push(`${Math.abs(accuracyDelta)} points ${accuracyDelta > 0 ? "more" : "less"} accurate`);
  return notes.length ? `Compared with your last matching run: ${notes.join(" · ")}.` : "You matched your previous run — consistency is becoming a habit.";
}

function renderHangulWritingCompletion(el, summary) {
  const unit = activeHangulWritingUnits.find((item) => item.id === summary.unitId) || null;
  const glyphRows = summary.glyphs.map((glyph) => {
    const stats = summary.glyphStats[glyph] || { attempts: 0, successes: 0, retries: 0 };
    return `<div class="writing-summary-detail-row"><span lang="ko">${escapeHtml(glyph)}</span><span>${stats.successes} clean · ${stats.attempts} attempt${stats.attempts === 1 ? "" : "s"} · ${stats.retries} retr${stats.retries === 1 ? "y" : "ies"}</span></div>`;
  }).join("");
  el.innerHTML = premiumCompletionHtml({
    tone: "success",
    icon: "spark",
    eyebrow: "Writing session complete",
    title: "Brilliant work — those shapes are yours",
    copy: getHangulWritingImprovement(summary),
    score: { value: `${summary.accuracy}%`, label: "Clean rate" },
    stats: [
      { value: formatHangulWritingDuration(summary.durationMs), label: "Time" },
      { value: summary.attempts, label: "Attempts" },
      { value: summary.retries, label: "Retries" },
      { value: summary.glyphs.length, label: "Shapes" },
    ],
    detailsHtml: `
      <div class="writing-summary-drawn"><span>${summary.inputMode === "freehand" ? "Freehand" : "Guided"} · ${summary.repeatTarget}× each</span><div>${summary.glyphs.map((glyph) => `<span lang="ko">${escapeHtml(glyph)}</span>`).join("")}</div></div>
      <details class="writing-summary-details">
        <summary>More session detail</summary>
        <div class="writing-summary-detail-list">${glyphRows}</div>
      </details>`,
    actionsHtml: `
      <button class="button secondary" type="button" id="writingSummaryChoose">Choose another unit</button>
      <button class="button primary" type="button" id="writingSummaryAgain" ${unit ? "" : "disabled"}>Repeat this session</button>`,
    className: "word-card alphabet-practice-card writing-summary-card",
  });
  el.querySelector("#writingSummaryChoose").addEventListener("click", () => {
    resetHangulWritingSession();
    renderHangulWriting();
  });
  el.querySelector("#writingSummaryAgain").addEventListener("click", () => {
    if (!unit) return;
    startHangulWritingSession(unit, summary.exercise, summary.repeatTarget);
  });
  animateLessonFrame(el.querySelector(".completion-stage"), "writing", {
    key: "complete",
    order: 2000,
    phase: "complete",
    complete: true,
  });
}

function renderHangulWritingUnitPicker(el) {
  // The authored paths seed shape-recognition templates and the optional Help
  // animation. They never constrain the learner's stroke count or order.
  const readyUnits = activeHangulWritingUnits.filter((unit) =>
    unit.glyphs.every((glyph) => getHangulStrokeGuide(glyph))
  );
  const unitsHtml = readyUnits.map((unit) => {
    const unlocked = isHangulWritingUnitUnlocked(unit);
    const preview = unit.glyphs.slice(0, 6).join(" ");
    return `
      <div class="card writing-unit ${unlocked ? "" : "writing-unit-locked"}">
        <div class="writing-unit-row">
          <div>
            <div class="eyebrow">${escapeHtml(unit.eyebrow)}</div>
            <h3 class="writing-unit-title">${escapeHtml(unit.label)}</h3>
            <div class="fs-xs text-muted-2">${escapeHtml(unit.sub)}</div>
            <div class="writing-unit-preview" lang="ko">${escapeHtml(preview)}</div>
          </div>
          ${
            unlocked
              ? `<div class="writing-unit-modes">
                  <button class="button primary compact" type="button" data-writing-unit="${unit.id}" data-writing-exercise="shape">Shape</button>
                  <button class="button secondary compact" type="button" data-writing-unit="${unit.id}" data-writing-exercise="sound">Sound</button>
                  <button class="button secondary compact" type="button" data-writing-unit="${unit.id}" data-writing-exercise="roman">Romanization</button>
                </div>`
              : `<span class="writing-unit-lock" title="Finish the matching alphabet stage to unlock">🔒 Locked</span>`
          }
        </div>
      </div>
    `;
  }).join("");

  const sourceMeta = getWritingSourceMeta();
  let nativeSettingsHtml = "";
  if (isHanaPathNative()) {
    nativeSettingsHtml = `
      <div class="card native-recognition-card" style="margin-top:16px;">
        <div class="eyebrow">Native Extension</div>
        <h3 class="writing-unit-title">On-Device Handwriting Recognition</h3>
        <p class="fs-xs text-muted-2" style="margin-bottom:12px;">
          Download the optional Google ML Kit handwriting model (approx. 20 MiB) to run advanced recognition directly on your device.
        </p>
        <div id="nativeRecognitionStatus" class="fs-xs" style="margin-bottom:12px; font-weight:500; color:var(--text-muted-2);">
          Checking status...
        </div>
        <div id="nativeRecognitionActions" class="writing-unit-modes" style="margin-top:8px;"></div>
      </div>
    `;
  }

  el.innerHTML = `
    <div class="card word-card alphabet-practice-card">
      ${alphabetPracticeProgressHtml("Writing practice")}
      <div class="eyebrow sentence-lesson-kind">${escapeHtml(sourceMeta.eyebrow)}</div>
      <h2 class="screen-title" style="margin-bottom:8px;">${escapeHtml(sourceMeta.title)}</h2>
      <div class="screen-sub" style="margin-bottom:0;">Draw with your finger or stylus. Shape recognition is stroke-count tolerant, and Help remains available as an optional reference.</div>
    </div>
    ${nativeSettingsHtml}
    ${unitsHtml || '<div class="card"><div class="screen-sub" style="margin-bottom:0;">Complete a little more learning first so HanaPath can build a writing set from this section.</div></div>'}
  `;

  if (isHanaPathNative()) {
    updateNativeRecognitionUI();
  }

  bindAlphabetReferenceButtons(el);
  el.querySelectorAll("[data-writing-unit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const exercise = btn.dataset.writingExercise || "shape";
      const unit = getHangulWritingUnit(btn.dataset.writingUnit);
      if (unit) renderHangulWritingMultiplierPicker(el, unit, exercise);
    });
  });
  animateLessonFrame(el, "writing", {
    key: "unit-picker",
    order: 0,
    phase: "picker",
  });
}

function renderHangulWritingPractice(el, unit) {
  const glyph = unit.glyphs[hangulWritingState.glyphIndex];
  const guide = getHangulStrokeGuide(glyph);
  const progressCurrent = hangulWritingState.glyphIndex + 1;
  const progressTotal = unit.glyphs.length;
  const completedRepetitions = hangulWritingState.glyphIndex * hangulWritingState.repeatTarget + hangulWritingState.repeatIndex;
  const totalRepetitions = progressTotal * hangulWritingState.repeatTarget;
  const progressPercent = Math.round(((completedRepetitions + 1) / totalRepetitions) * 100);
  const repeatProgress = hangulWritingState.repeatTarget > 1
    ? ` · pass ${hangulWritingState.repeatIndex + 1}/${hangulWritingState.repeatTarget}`
    : "";
  const initialStrokeStatus = "Draw naturally · pause to auto-check, or tap Check drawing.";

  // The prompt is ONLY the required cue for the exercise — the glyph (shape),
  // a speaker (sound), or the romanization — using the same tap-to-hear token
  // formatting as the alphabet/words lessons. Tapping it plays the audio.
  const exercise = hangulWritingState.exercise || "shape";
  const roman = getHangulWritingRoman(glyph);
  let tokenText = glyph;
  let tokenLang = ` lang="ko"`;
  if (exercise === "sound") {
    tokenText = "🔊";
    tokenLang = "";
  } else if (exercise === "roman" && roman) {
    tokenText = roman;
    tokenLang = "";
  }

  el.innerHTML = `
    <div class="card word-card alphabet-practice-card writing-practice-card" data-lesson-motion-root>
      <div class="writing-practice-header">
        <div class="writing-progress-tile">
          <div class="writing-progress-line"><span class="eyebrow">${escapeHtml(exercise === "shape" ? "Copy the shape" : exercise === "sound" ? "Write from sound" : "Write from romanization")} · Free drawing</span><span class="writing-progress-count">${progressCurrent} of ${progressTotal}${repeatProgress}</span></div>
          <div class="word-card-progress-track" aria-hidden="true"><span style="width:${progressPercent}%;"></span></div>
        </div>
      </div>
      <div class="quiz-card writing-quiz-card">
        <div class="quiz-visual writing-prompt-visual"${exercise === "shape" ? ` lang="ko"` : ""}><span class="checkpoint-token tappable"${tokenLang} role="button" tabindex="0" aria-label="Hear ${escapeHtml(glyph)}" data-speak="${escapeHtml(glyph)}" title="Tap to hear">${escapeHtml(tokenText)}</span><span class="writing-hear-cue">Tap to hear</span></div>
        <div class="quiz-detail writing-instruction writing-stroke-status" id="writingStrokeStatus" aria-live="polite">${escapeHtml(initialStrokeStatus)}</div>
        <div class="writing-canvas-wrap">
          <canvas id="writingCanvas" class="writing-canvas" width="480" height="480" aria-label="Writing area"></canvas>
          <button class="writing-canvas-action writing-canvas-clear" type="button" id="writingClear" disabled>Erase all</button>
          <button class="writing-canvas-action writing-canvas-undo" type="button" id="writingUndo" disabled>Undo stroke</button>
          <button class="writing-canvas-action writing-canvas-help" type="button" id="writingHelp">Help</button>
          <button class="writing-canvas-action writing-canvas-check" type="button" id="writingCheck" disabled>Check drawing</button>
          <div class="writing-recognition" id="writingRecognition" role="status" aria-live="polite"><span class="writing-recognition-message">Write with your finger or stylus.</span></div>
        </div>
        <div class="writing-result-overlay" id="writingResultOverlay" aria-live="polite"></div>
      </div>
    </div>
  `;

  bindAlphabetReferenceButtons(el);
  const canvas = el.querySelector("#writingCanvas");
  drawHangulWritingCanvas(canvas);
  bindHangulWritingCanvas(canvas);
  updateHangulWritingControls();
  bindTapToHearToken(el.querySelector("[data-speak]"));
  if (exercise === "sound") scheduleAutoSpeak(glyph, 260);

  el.querySelector("#writingClear").addEventListener("click", () => {
    if (hangulWritingState.celebrating) return;
    clearHangulRecognitionTimer();
    stopHangulWatch();
    hangulWritingState.strokes = [];
    drawHangulWritingCanvas(canvas);
    updateHangulWritingControls();
    setHangulRecognitionFeedback("Write with your finger or stylus.");
    updateHangulStrokeStatus(initialStrokeStatus);
  });
  el.querySelector("#writingUndo").addEventListener("click", () => {
    if (hangulWritingState.celebrating || !hangulWritingState.strokes.length) return;
    clearHangulRecognitionTimer();
    stopHangulWatch();
    hangulWritingState.strokes.pop();
    drawHangulWritingCanvas(canvas);
    updateHangulWritingControls();
    setHangulRecognitionFeedback(hangulWritingState.strokes.length ? "Last stroke removed." : "Write with your finger or stylus.");
    updateHangulStrokeStatus(initialStrokeStatus);
  });
  const check = el.querySelector("#writingCheck");
  if (check) check.addEventListener("click", () => checkHangulFreehandDrawing(canvas, glyph, unit));
  el.querySelector("#writingHelp").addEventListener("click", () => {
    // Help!: temporarily overlay the stroke demo, then redraw the learner's
    // existing ink. Watching is not counted as an attempt.
    if (guide && !hangulWritingState.celebrating) {
      clearHangulRecognitionTimer();
      setHangulRecognitionFeedback("Writing help is playing.");
      updateHangulStrokeStatus("Watch the standard strokes, then try it yourself.");
      watchHangulGuide(canvas, guide);
    }
  });
  animateLessonFrame(el.querySelector("[data-lesson-motion-root]"), "writing", {
    key: `practice:${hangulWritingState.glyphIndex}:${hangulWritingState.repeatIndex}`,
    order: 100 + completedRepetitions,
    phase: "practice",
  });
}

function renderHangulWriting() {
  clearHangulRecognitionTimer();
  stopHangulWatch(); // cancel any in-flight stroke animation before rebuilding the DOM
  refreshProgressionState();
  activeHub = "practice";
  setNavActive("practice");
  const el = showScreen("detail");
  if (!el) return;
  const sourceMeta = getWritingSourceMeta();
  showDetailBarWithBack("practice", sourceMeta.title, () => leaveHangulWritingSession(), sourceMeta.back);

  if (hangulWritingState.completedSummary) {
    renderHangulWritingCompletion(el, hangulWritingState.completedSummary);
    return;
  }

  const unit = getHangulWritingUnit();
  if (!unit || !isHangulWritingUnitUnlocked(unit)) {
    hangulWritingState.unitId = null;
    renderHangulWritingUnitPicker(el);
    return;
  }
  renderHangulWritingPractice(el, unit);
}

// ─── ALPHABET LETTER REVIEW (SRS) ─────────────────────────────────────────────
let letterReview = { queue: [], index: 0, correct: 0, answered: false };

function startLetterReview() {
  refreshProgressionState();
  resetLessonMotion("letter-review");
  queueScreenMotion("forward", 1, { replace: false });
  letterReview = { queue: getDueLetters(), index: 0, correct: 0, answered: false };
  activeHub = "practice";
  setNavActive("practice");
  renderLetterReview();
}

function renderLetterReview() {
  const el = showScreen("detail");
  if (!el) return;
  showDetailBarWithBack("practice", "Alphabet review", () => renderAlphabetPracticeHub(), "Alphabet practice");

  const total = letterReview.queue.length;
  if (!total || letterReview.index >= total) {
    const accuracy = total ? Math.round((letterReview.correct / total) * 100) : 0;
    el.innerHTML = premiumCompletionHtml({
      tone: total ? "success" : "neutral",
      icon: total ? "check" : "spark",
      eyebrow: "Alphabet review",
      title: total ? "Review complete" : "All caught up",
      copy: total
        ? `You recalled ${letterReview.correct} of ${total} letters. Each one returns automatically when it's due.`
        : "No letters are due right now. Finish more alphabet stages or check back later.",
      score: total ? { value: `${accuracy}%`, label: "Recall accuracy" } : null,
      stats: total ? [
        { value: `${letterReview.correct}/${total}`, label: "Correct" },
        { value: total - letterReview.correct, label: "To revisit" },
      ] : [],
      actionsHtml: '<button class="button primary compact" id="letterReviewDone" type="button">Back to Alphabet practice</button>',
      className: "word-card alphabet-practice-card",
      celebrate: total > 0,
    });
    const done = document.getElementById("letterReviewDone");
    if (done) done.addEventListener("click", () => {
      queueScreenMotion("back", -1);
      renderAlphabetPracticeHub();
    });
    animateLessonFrame(el.querySelector(".completion-stage"), "letter-review", {
      key: "complete",
      order: 2000,
      phase: "complete",
      complete: true,
    });
    return;
  }

  const letter = letterReview.queue[letterReview.index];
  const sound = LETTER_SOUND[letter] || "";
  const distractors = shuffle(
    getEnrolledLetters()
      .filter((l) => l !== letter)
      .map((l) => LETTER_SOUND[l])
      .filter((s) => s && s !== sound),
  )
    .filter((s, i, a) => a.indexOf(s) === i)
    .slice(0, 3);
  // Fall back to a fixed sound pool if too few letters are enrolled for distractors.
  while (distractors.length < 3) {
    const pool = ["a", "eo", "o", "u", "g", "n", "m", "s", "b", "d"].filter((s) => s !== sound && !distractors.includes(s));
    if (!pool.length) break;
    distractors.push(pool[0]);
  }
  const opts = shuffle([sound, ...distractors]);
  letterReview.answered = false;

  el.innerHTML = `
    <div class="card word-card alphabet-practice-card" data-lesson-motion-root>
      ${alphabetPracticeProgressHtml("Spaced review", letterReview.index + 1, total)}
      <div class="quiz-card">
        <div class="quiz-visual" lang="ko"><span class="checkpoint-token tappable" role="button" tabindex="0" aria-label="Hear ${escapeHtml(speakableForChunk(letter))}" data-speak="${escapeHtml(speakableForChunk(letter))}" title="Tap to hear">${escapeHtml(letter)}</span></div>
        <div class="quiz-prompt">Which sound does this letter make?</div>
        <div class="quiz-detail">Tap the letter above to hear it again.</div>
        <div class="quiz-options" id="letterReviewOptions">
          ${opts.map((o) => `<button class="option" type="button" data-sound="${escapeHtml(o)}" ${textLanguageAttr(o)}>${escapeHtml(o)}</button>`).join("")}
        </div>
        <div class="quiz-feedback" id="letterReviewFeedback" role="status" aria-live="polite"></div>
      </div>
    </div>`;

  bindAlphabetReferenceButtons(el);
  scheduleAutoSpeak(speakableForChunk(letter), 220);
  bindTapToHearToken(el.querySelector("[data-speak]"));
  el.querySelectorAll("#letterReviewOptions .option").forEach((btn) => {
    btn.addEventListener("click", () => answerLetterReview(btn, letter, sound));
  });
  animateLessonFrame(el.querySelector("[data-lesson-motion-root]"), "letter-review", {
    key: `question:${letterReview.index}`,
    order: letterReview.index,
    phase: "question",
  });
}

function answerLetterReview(button, letter, correctSound) {
  if (letterReview.answered) return;
  letterReview.answered = true;
  const correct = (button.dataset.sound || "") === correctSound;
  [...document.querySelectorAll("#letterReviewOptions .option")].forEach((b) => {
    b.disabled = true;
    if (b.dataset.sound === correctSound) b.classList.add("correct");
    if (b === button && !correct) b.classList.add("wrong");
  });
  recordLetterReview(letter, correct);
  if (correct) {
    letterReview.correct += 1;
    showCorrectToast();
  } else {
    showRetryToast(`${letter} sounds like "${correctSound}".`);
  }
  speakClickableText(button.dataset.sound || "", { preferSoundLabels: true });
  const fb = document.getElementById("letterReviewFeedback");
  if (fb) {
    fb.innerHTML = correct
      ? `<strong>Correct.</strong> ${escapeHtml(letter)} sounds like "${escapeHtml(correctSound)}".`
      : `<strong>Not quite.</strong> ${escapeHtml(letter)} sounds like "${escapeHtml(correctSound)}".`;
  }
  window.setTimeout(() => {
    letterReview.index += 1;
    renderLetterReview();
  }, correct ? 850 : 1650);
}

// ─── ONBOARDING ──────────────────────────────────────────────────────────────

let obStep = 0;
const obAnswers = { knowsHangul: false, goal: "media", weeklyHours: 10, speakingAnxiety: "medium" };

function renderOnboarding() {
  const shell = document.getElementById("onboarding");
  if (!shell) return;
  shell.hidden = false;

  const steps = [
    {
      q: "Do you already know Hangul (the Korean alphabet)?",
      opts: [
        { val: false, icon: "🔤", label: "No — start from zero", sub: "I'll learn the alphabet first." },
        { val: true,  icon: "✓",  label: "Yes — I can read it",  sub: "Skip straight to survival phrases." },
      ],
      key: "knowsHangul",
    },
    {
      q: "Why are you learning Korean?",
      opts: [
        { val: "media",   icon: "🎵", label: "K-dramas & K-pop",    sub: "Culture, music, subtitles." },
        { val: "travel",  icon: "✈️", label: "Travel to Korea",      sub: "Survival speaking & signs." },
        { val: "partner", icon: "💬", label: "Korean partner/friends",sub: "Conversation & texting." },
        { val: "topik",   icon: "📝", label: "TOPIK / study",        sub: "Formal exam preparation." },
      ],
      key: "goal",
    },
    {
      q: "How many hours per week can you study?",
      opts: [
        { val: 5,  icon: "⏱", label: "~5 hrs / week",  sub: "Tourist level in ~18 months." },
        { val: 10, icon: "⏱", label: "~10 hrs / week", sub: "A2–B1 possible in 12 months." },
        { val: 15, icon: "⏱", label: "~15 hrs / week", sub: "B1+ in ~10 months with tutors." },
        { val: 25, icon: "⏱", label: "~25 hrs / week", sub: "B2 fluency target realistic." },
      ],
      key: "weeklyHours",
    },
    {
      q: "How do you feel about speaking Korean aloud?",
      opts: [
        { val: "low",    icon: "😊", label: "Comfortable",    sub: "I like speaking from day one." },
        { val: "medium", icon: "😅", label: "A bit nervous",  sub: "I'll try with some prompting." },
        { val: "high",   icon: "😬", label: "Very anxious",   sub: "I prefer to listen first." },
      ],
      key: "speakingAnxiety",
    },
  ];

  if (obStep < steps.length) {
    const step = steps[obStep];
    shell.innerHTML = `
      <div class="ob-card">
        <div class="ob-logo">하나Path</div>
        <div class="ob-tagline">One path to Korean fluency.</div>
        <div class="ob-step-bar">
          ${steps.map((_, i) => `<div class="ob-step-dot ${i < obStep ? "done" : i === obStep ? "active" : ""}"></div>`).join("")}
        </div>
        <div class="ob-question">${escapeHtml(step.q)}</div>
        <div class="ob-options">
          ${step.opts.map((o) => `
            <button class="ob-opt" type="button" data-val="${escapeHtml(String(o.val))}">
              <span class="ob-opt-icon">${o.icon}</span>
              <span class="ob-opt-text">
                <strong>${escapeHtml(o.label)}</strong>
                <small>${escapeHtml(o.sub)}</small>
              </span>
            </button>
          `).join("")}
        </div>
      </div>`;
    shell.querySelectorAll(".ob-opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        const raw = btn.dataset.val;
        let val = raw === "true" ? true : raw === "false" ? false : isNaN(Number(raw)) ? raw : Number(raw);
        obAnswers[step.key] = val;
        obStep++;
        renderOnboarding();
      });
    });
    return;
  }

  // Final step: forecast
  const hrs = obAnswers.weeklyHours;
  const forecast = hrs >= 25 ? "B2-ish fluency in ~24 months" : hrs >= 15 ? "B1+ in ~18 months" : hrs >= 10 ? "A2–B1 in ~14 months" : "Tourist level in ~20 months";
  const startLevel = obAnswers.knowsHangul ? "K1" : "K0";
  const preferredStudio = obAnswers.goal === "travel"
    ? "survival"
    : obAnswers.goal === "media"
      ? "listen"
      : obAnswers.goal === "partner"
        ? "conversation"
        : "grammar";
  const startNote = obAnswers.knowsHangul
    ? "We’ll skip the alphabet ramp and keep the path focused on survival phrases, listening, and vocab."
    : "We’ll build from the alphabet upward.";

  shell.innerHTML = `
    <div class="ob-card">
      <div class="ob-logo">하나Path</div>
      <div class="ob-tagline">Your personal Korean plan is ready.</div>
      <div class="ob-step-bar">${steps.map(() => `<div class="ob-step-dot done"></div>`).join("")}</div>
      <div style="margin-bottom:20px;">
        <div style="font-size:.8rem;color:var(--muted-2);margin-bottom:4px;">YOUR FORECAST</div>
        <div style="font-size:1.1rem;font-weight:700;margin-bottom:4px;">${escapeHtml(forecast)}</div>
        <div style="font-size:.82rem;color:var(--muted);">Starting at level ${startLevel} · ${hrs} hrs/week</div>
        <div style="font-size:.78rem;color:var(--muted-2);margin-top:6px;">${escapeHtml(startNote)}</div>
      </div>
      <div class="ob-note">
        This is realistic — not a marketing promise. Fluency takes hundreds of hours.
        HanaPath will track every minute and adjust your plan as you go.
      </div>
      <button class="button primary full" id="obStartBtn" type="button" style="margin-top:8px;">Start HanaPath →</button>
    </div>`;

  document.getElementById("obStartBtn").addEventListener("click", () => {
    Object.assign(state, {
      onboarded: true,
      goal: obAnswers.goal,
      weeklyHours: obAnswers.weeklyHours,
      speakingAnxiety: obAnswers.speakingAnxiety,
      knowsHangul: obAnswers.knowsHangul,
      level: startLevel,
      studio: preferredStudio,
      phaseOneCompleted: obAnswers.knowsHangul ? phaseOneLessons.map((lesson) => lesson.id) : [],
    });
    saveState();
    shell.hidden = true;
    const app = document.getElementById("app");
    if (app) app.hidden = false;
    showTab("today");
    bindKeyboardShortcuts();
  });
}

function getTodayReviewCount() {
  const vocabKnown = Array.isArray(state.vocabKnownRanks) ? state.vocabKnownRanks.length : 0;
  const vocabHard = Array.isArray(state.vocabHardRanks) ? state.vocabHardRanks.length : 0;
  const backlog = Math.max(0, 20 - (state.asked % 20));
  return Math.max(3, Math.min(18, backlog + Math.ceil(vocabHard / 8) + Math.ceil(vocabKnown / 80)));
}

function getNextAction() {
  const progress = getAlphabetProgress();
  const nextIndex = progress.currentIndex;
  const nextLesson = progress.nextLesson;
  const hasHangulLesson = Boolean(
    nextLesson &&
    (state.level === "K0" || !state.knowsHangul || !progress.complete),
  );

  if (hasHangulLesson) {
    return {
      title: `Continue: ${nextLesson.shortTitle}`,
      subtitle: nextLesson.goal,
      meta: `${nextLesson.duration} · Stage ${Math.min(nextIndex + 1, phaseOneLessons.length)} of ${phaseOneLessons.length}`,
      cta: "Start lesson",
      tab: "path",
      lessonIndex: nextIndex,
    };
  }

  if (state.goal === "travel") {
    return {
      title: "Survival phrases",
      subtitle: state.speakingAnxiety === "high"
        ? "Shadow the phrase, then try it aloud."
        : "Requests, directions, and ordering in one path.",
      meta: "8 min · guided",
      cta: "Open path",
      tab: "path",
    };
  }

  if (state.speakingAnxiety === "high") {
    return {
      title: "Shadowing drill",
      subtitle: "Listen first, copy the rhythm, then speak.",
      meta: "2 min · low pressure",
      cta: "Start practice",
      tab: "practice",
    };
  }

  if (state.goal === "media") {
    return {
      title: "Listening + vocab",
      subtitle: "Tiny reviews from your current level.",
      meta: "10 min · low friction",
      cta: "Start practice",
      tab: "practice",
    };
  }

  return {
    title: "Review due",
    subtitle: `${getTodayReviewCount()} cards are waiting.`,
    meta: "5 min · keep momentum",
    cta: "Review now",
    tab: "library",
    view: "review",
  };
}

function startPathLesson(index) {
  if (!Number.isInteger(index) || index < 0) return;
  state.pendingPathLesson = index;
  saveState();
  showTab("path");
}

// The "Continue" tab: a lean screen that points straight at the next new
// lesson, with review and streak/progress underneath.
function renderTodayView() {
  const el = document.getElementById("screen-today");
  if (!el) return;
  refreshProgressionState();

  const progress = getAlphabetProgress();
  const nextIndex = progress.currentIndex;
  const nextLesson = progress.nextLesson;
  const hangulDone = progress.complete;
  const hangulPct = Math.round((progress.completedCount / Math.max(1, progress.total)) * 100);

  const nextWordLesson = hangulDone ? getNextWordLesson() : null;
  const continueTitle = nextLesson
    ? `Next: ${nextLesson.shortTitle}`
    : nextWordLesson
      ? `Today's new words: ${nextWordLesson.title}`
      : "Today's new words";
  const continueSub = nextLesson
    ? nextLesson.goal
    : nextWordLesson
      ? nextWordLesson.goal || nextWordLesson.subtitle || "Continue your word lessons."
      : "Hangul is done — keep your words fresh with reviews.";
  const continueMeta = nextLesson
    ? `${nextLesson.duration} · Stage ${Math.min(nextIndex + 1, phaseOneLessons.length)} of ${phaseOneLessons.length}`
    : nextWordLesson
      ? `${nextWordLesson.newWordIds.length} new words · Stage ${nextWordLesson.stage}`
      : "Word Path complete";

  const dueCount = hangulDone ? getVocabDueCount() : getTodayReviewCount();
  const streakLabel = state.studyDays > 0 ? `${state.studyDays}-day streak` : "Start your streak today";
  const progressLabel = hangulDone
    ? `Unlocked through ${escapeHtml(state.level)}`
    : `${hangulPct}% through Hangul`;

  const sentenceDueCount = getTotalDueSentencesCount();
  const sentenceReviewCardHtml = hangulDone && sentenceDueCount > 0
    ? `
    <div class="card">
      <div class="flex-between">
        <div>
          <div class="eyebrow">Sentence reviews due</div>
          <div class="screen-sub" style="margin-bottom:0;">${sentenceDueCount} sentence${sentenceDueCount === 1 ? "" : "s"} ready for spaced review.</div>
        </div>
        <button class="button secondary compact" type="button" id="continueSentenceReviewBtn">Review</button>
      </div>
    </div>`
    : "";

  el.innerHTML = `
    <div class="eyebrow">Continue</div>
    <h2 class="screen-title" style="margin-bottom:16px;">Pick up where you left off</h2>

    <div class="card continue-hero">
      <div class="eyebrow">Continue learning</div>
      <h3 class="screen-title" style="margin-bottom:8px;">${escapeHtml(continueTitle)}</h3>
      <div class="screen-sub" style="margin-bottom:12px;">${escapeHtml(continueSub)}</div>
      <div class="flex-between" style="gap:12px; align-items:center; flex-wrap:wrap;">
        <span class="pill accent">${escapeHtml(continueMeta)}</span>
        <button class="button primary compact" type="button" id="continueBtn">${nextLesson ? "Start lesson" : nextWordLesson ? "Start word lesson" : "Open Words"}</button>
      </div>
    </div>

    <div class="card">
      <div class="flex-between">
        <div>
          <div class="eyebrow">Review due</div>
          <div class="screen-sub" style="margin-bottom:0;">${dueCount} ${hangulDone ? "word" : "card"}${dueCount === 1 ? "" : "s"} waiting to come back.</div>
        </div>
        <button class="button secondary compact" type="button" id="continueReviewBtn">Review</button>
      </div>
    </div>
    ${sentenceReviewCardHtml}

    ${hangulDone ? `
    <div class="card">
      <div class="flex-between">
        <div>
          <div class="eyebrow">Reference</div>
          <div class="screen-sub" style="margin-bottom:0;">Entire Korean Word Bank — look up any word.</div>
        </div>
        <button class="button secondary compact" type="button" id="continueWordBankBtn">Open</button>
      </div>
    </div>` : ""}

    <div class="card">
      <div class="flex-between mb-12">
        <div class="eyebrow">Streak &amp; progress</div>
        <button class="plan-go" type="button" id="continueProgressBtn">Details</button>
      </div>
      <div class="stats-grid" style="margin-bottom:0;">
        <div class="stat-box"><span class="sv">${state.studyDays}</span><span class="sl">Day streak</span></div>
        <div class="stat-box"><span class="sv">${hangulPct}%</span><span class="sl">Hangul</span></div>
        <div class="stat-box"><span class="sv">${Array.isArray(state.vocabKnownRanks) ? state.vocabKnownRanks.length : 0}</span><span class="sl">Words known</span></div>
      </div>
      <div class="fs-xs text-muted-2 mt-12">${escapeHtml(streakLabel)} · ${progressLabel}</div>
    </div>
  `;

  const continueBtn = document.getElementById("continueBtn");
  if (continueBtn) continueBtn.addEventListener("click", () => startNextLearn({ resume: true }));
  const reviewBtn = document.getElementById("continueReviewBtn");
  if (reviewBtn) {
    reviewBtn.addEventListener("click", () => {
      if (hangulDone && getVocabDueCount()) { openWordReview(); return; }
      showTab("practice");
    });
  }
  const sentenceReviewBtn = document.getElementById("continueSentenceReviewBtn");
  if (sentenceReviewBtn) {
    sentenceReviewBtn.addEventListener("click", () => {
      showTab("practice");
    });
  }
  const wordBankBtn = document.getElementById("continueWordBankBtn");
  if (wordBankBtn) wordBankBtn.addEventListener("click", () => openEntireWordBank());
  const progressBtn = document.getElementById("continueProgressBtn");
  if (progressBtn) progressBtn.addEventListener("click", () => openHubItem("progress", "stats"));
}

function renderPath() {
  const el = document.getElementById("screen-path");
  if (!el) return;
  refreshProgressionState();

  const levels = [
    { id: "K0", name: "Hangul & Sound",       time: "2–4 weeks",   units: phaseOneLessons.map((l) => l.title), isK0: true },
    { id: "K1", name: "Survival Korean",       time: "Months 1–3",  units: K1_UNITS },
    { id: "K2", name: "Everyday Korean",       time: "Months 4–6",  units: K2_UNITS },
    { id: "K3", name: "Connected Korean",      time: "Months 7–12", units: [] },
    { id: "K4", name: "Independent Korean",    time: "Months 13–18",units: [] },
    { id: "K5", name: "Fluency Bridge",        time: "Months 19–24",units: [] },
  ];

  const progress = getAlphabetProgress();
  const completedK0 = progress.completedCount;
  const completedK0Ids = new Set(progress.completedIds);
  const k0Pct = Math.round((completedK0 / progress.total) * 100);
  const unlockedIndex = getLevelIndex(state.level);
  const nextIndex = progress.currentIndex;
  const nextLesson = progress.nextLesson;
  const pathHeroTitle = nextLesson ? `Continue: ${nextLesson.shortTitle}` : "Hangul complete";
  const pathHeroSubtitle = nextLesson
    ? nextLesson.goal
    : "Move on to survival phrases, vocabulary, and sentence practice.";
  const pathHeroMeta = nextLesson
    ? `${nextLesson.duration} · Stage ${Math.min(nextIndex + 1, phaseOneLessons.length)} of ${phaseOneLessons.length}`
    : "K0 cleared";

  function statusFor(id) {
    const levelIndex = getLevelIndex(id);
    if (levelIndex < unlockedIndex) return "complete";
    if (levelIndex === unlockedIndex) return "active";
    return "locked";
  }

  el.innerHTML = `
    <div class="eyebrow">Path</div>
    <h2 class="screen-title" style="margin-bottom:16px;">K0 → K5</h2>
    <div class="text-muted-2 fs-xs mb-12">Use the roadmap to move one step at a time.</div>
    <div class="card">
      <div class="eyebrow">Resume</div>
      <h3 class="screen-title" style="margin-bottom:8px;">${escapeHtml(pathHeroTitle)}</h3>
      <div class="screen-sub" style="margin-bottom:12px;">${escapeHtml(pathHeroSubtitle)}</div>
      <div class="flex-between" style="gap:12px; align-items:center; flex-wrap:wrap;">
        <span class="pill accent">${escapeHtml(pathHeroMeta)}</span>
        <button class="button primary compact" type="button" id="pathHeroBtn">${nextLesson ? "Open lesson" : "Open practice"}</button>
      </div>
    </div>
    <div class="level-map">
      ${levels.map((lv) => {
        const status = statusFor(lv.id);
        const badgeClass = status === "complete" ? "complete" : status === "active" ? "active" : "locked";
        const locked = status === "locked";
        const isActive = status === "active" || status === "complete";

        if (lv.units.length === 0) {
          return `<div class="level-card">
            <div class="level-head">
              <div class="level-badge ${badgeClass}">${lv.id}</div>
              <div class="level-info"><div class="level-name">${escapeHtml(lv.name)}</div><div class="level-sub">${escapeHtml(lv.time)}</div></div>
              <span class="level-status ${badgeClass === "complete" ? "text-good" : badgeClass === "active" ? "text-accent" : "text-muted-2"}">${escapeHtml(badgeClass === "locked" ? `Unlock: ${getLevelUnlockText(lv.id)}` : badgeClass === "active" ? "Unlocked" : "Done")}</span>
            </div></div>`;
        }

        const unitsHtml = lv.units.map((u, i) => {
          const done = lv.isK0 ? completedK0Ids.has(phaseOneLessons[i]?.id) : false;
          const isCurr = lv.isK0 ? (i === completedK0 && !progress.complete) : false;
          const isLocked = locked || (lv.isK0 ? i > completedK0 : false);
          const dotClass = done ? "done" : isCurr ? "curr" : isLocked ? "lock" : "next";
          const dotLabel = done ? "✓" : isCurr ? "▶" : isLocked ? "🔒" : String(i + 1);
          const rowClass = ["unit-row", done ? "complete" : "", isCurr ? "active" : "", isLocked ? "locked" : ""].join(" ");
          return `<div class="${rowClass}" data-k0-index="${lv.isK0 ? i : -1}" role="${lv.isK0 ? "button" : "listitem"}" tabindex="${lv.isK0 && !isLocked ? 0 : -1}">
            <div class="unit-dot ${dotClass}">${dotLabel}</div>
            <span class="unit-name">${escapeHtml(u)}</span>
            ${lv.isK0 ? `<span class="unit-dur">${phaseOneLessons[i]?.duration || ""}</span>` : ""}
          </div>`;
        }).join("");

        const progressBar = lv.isK0 ? `<div style="height:4px;background:rgba(255,255,255,.08);border-radius:99px;margin:0 0 10px;overflow:hidden"><div style="height:100%;width:${k0Pct}%;background:var(--accent-2);border-radius:99px;"></div></div>` : "";
        const statusText = status === "complete" ? "✓ Done" : status === "active" ? (lv.isK0 ? `${k0Pct}%` : "Unlocked") : `Unlock: ${getLevelUnlockText(lv.id)}`;

        return `<div class="level-card" data-level="${lv.id}">
          <div class="level-head">
            <div class="level-badge ${badgeClass}">${lv.id}</div>
            <div class="level-info">
              <div class="level-name">${escapeHtml(lv.name)}</div>
              <div class="level-sub">${escapeHtml(lv.time)}</div>
            </div>
            <span class="level-status ${badgeClass === "complete" ? "text-good" : badgeClass === "active" ? "text-accent" : "text-muted-2"}">
              ${escapeHtml(statusText)}
            </span>
          </div>
          ${isActive ? `<div class="level-units">${progressBar}${unitsHtml}</div>` : ""}
        </div>`;
      }).join("")}
    </div>
    <div id="pathLessonArea"></div>
  `;

  // K0 unit click → open lesson
  el.querySelectorAll(".unit-row[data-k0-index]").forEach((row) => {
    const idx = Number(row.dataset.k0Index);
    if (idx < 0 || row.classList.contains("locked")) return;
    row.addEventListener("click", () => openPathLesson(idx));
    row.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") openPathLesson(idx); });
  });

  const pathHeroBtn = document.getElementById("pathHeroBtn");
  if (pathHeroBtn) {
    pathHeroBtn.addEventListener("click", () => {
      if (nextLesson) {
        openPathLesson(nextIndex);
        return;
      }
      showTab("practice");
    });
  }

  if (Number.isInteger(state.pendingPathLesson)) {
    const pendingIndex = state.pendingPathLesson;
    state.pendingPathLesson = null;
    saveState();
    window.requestAnimationFrame(() => {
      if (phaseOneLessons[pendingIndex]) {
        openPathLesson(pendingIndex);
      }
    });
  }
}

function openPathLesson(index) {
  if (!phaseOneLessons[index]) return;
  if (!getAlphabetProgress().isLessonUnlocked(index)) return; // locked

  stopSpeech();
  state.phaseOneActive = index;
  resetPhaseOneView(index);
  saveState();

  const area = document.getElementById("pathLessonArea");
  if (!area) return;

  mountLessonPlayer(area, index, {
    onResult: (passed) => { if (passed) renderPath(); },
  });
  area.scrollIntoView({ behavior: "smooth", block: "start" });
}

// --- PRACTICE / LIBRARY SCREENS ---------------------------------------------

// --- PRACTICE: SENTENCE STUDIO ----------------------------------------------
// The Sentences practice surface, rebuilt from scratch on the curated
// sentence bank (window.HANAPATH_SENTENCES — see docs/SENTENCES_TEACHING_SPEC.md
// §3 and docs/SENTENCES_FINAL_ROADMAP.md). Unlike the old surface (a generic
// quiz deck shared with every other tab), this is its own subsystem:
//
//   hub (renderPracticeView) → session runner → summary
//
// Three modes, all production-first (retrieval, not recognition):
//   translate — English prompt → learner types the Korean (flagship, B1)
//   build     — tap the Korean tokens into order
//   listen    — hear the sentence, type what you heard (dictation)
//
// Per-sentence results persist in state.sentencesProgress so later roadmap
// boxes have data to build on. Extension points for open roadmap boxes are
// marked "EXTENSION (roadmap <box>)": B3 answer alignment, C2 i+1 gating,
// C3 sentence SRS, J1 analytics.

const SENTENCE_SESSION_LENGTH = 5;
const SENTENCE_BAND_COUNT = 5;
const SENTENCE_MODES = [
  { id: "translate", label: "Translate & Type", sub: "See the English, type the Korean.", tag: "Flagship" },
  { id: "build", label: "Word Builder", sub: "Tap the Korean words into the right order.", tag: "No keyboard needed" },
  { id: "listen", label: "Dictation", sub: "Hear the sentence, then type what you heard.", tag: "Listening" },
  { id: "shadow", label: "Shadow", sub: "Listen, repeat aloud, and optionally score your speech.", tag: "Speaking" },
  { id: "transform", label: "Transform", sub: "Change tense or form using words you already know.", tag: "Grammar" },
  { id: "mixed", label: "Mixed session", sub: "Translate, build, listen, and shadow in one run.", tag: "Variety" },
];
const SENTENCE_TRANSFORM_TASKS = [
  { id: "present-to-past", label: "Make it past tense", sourceForm: "polite", targetForm: "past", targetTag: "past-polite" },
  { id: "past-to-present", label: "Make it present polite", sourceForm: "past", targetForm: "polite", targetTag: "present-polite" },
  { id: "polite-to-formal", label: "Make it formal", sourceForm: "polite", targetForm: "formal", targetTag: "formal-nida" },
  { id: "polite-to-honorific", label: "Make it honorific", sourceForm: "polite", targetForm: "honorific", targetTag: "honorific-si" },
];
const SENTENCE_REVIEW_EVENT_LIMIT = 5000;
const PATTERN_TAG_INFO = {
  "topic-neun": "Check whether the sentence sets a topic with eun/neun.",
  "subject-i-ga": "Look for the subject marker i/ga after the noun doing or being something.",
  "object-eul-reul": "Check whether the verb needs an object marked with eul/reul.",
  "location-e": "Look for e marking a destination, time, or where something is.",
  "location-eseo": "Look for eseo marking where an action happens.",
  "direction-euro": "Check whether euro marks direction, path, or means.",
  "possessive-ui": "Look for ui connecting an owner to what is owned.",
  "with-hago-wa": "Check whether hago/wa links people or things together.",
  "only-man": "Look for man limiting the meaning to only that item.",
  "also-do": "Look for do adding also/too to the marked word.",
  "from-buteo": "Check whether buteo marks the starting point.",
  "until-kkaji": "Check whether kkaji marks the endpoint.",
  "present-polite": "Look for a polite present-style ending like ayo/eoyo.",
  "past-polite": "Check whether the action is in the past with a polite ending.",
  "future-geoyeyo": "Look for a future meaning like will/going to.",
  "formal-nida": "Check whether the sentence uses the formal nida style.",
  "copula-ieyo": "Look for ieyo/yeyo connecting a noun to is/am/are.",
  "copula-negative-anieyo": "Check whether the sentence says is not/am not with anieyo.",
  "question-polite": "Look for polite question phrasing or punctuation.",
  "imperative-seyo": "Check whether the sentence asks someone to do something with seyo.",
  "propositive-eyo": "Look for a polite let's suggestion.",
  "neg-an": "Check whether an appears before the verb for not.",
  "neg-mot": "Look for mot showing cannot or was unable to.",
  "neg-ji-anta": "Check whether ji anta is used for not doing something.",
  "and-go": "Look for go linking actions or clauses like and.",
  "but-jiman": "Check whether jiman links a contrast like but.",
  "because-aseo": "Look for aseo/eoseo giving a reason or sequence.",
  "if-myeon": "Check whether myeon creates an if/when condition.",
  "when-ttae": "Look for ttae marking when something happens.",
  "want-go-sipda": "Check whether go sipda expresses want to.",
  "can-su-itda": "Look for su itda expressing can or be able to.",
  "must-ya-dwaeda": "Check whether ya dwaeda expresses must or have to.",
  "honorific-si": "Look for si showing respect toward the subject.",
  "counter-phrase": "Check for a number plus counter phrase.",
  "time-expression": "Look for a time word or time phrase anchoring the sentence.",
  "comparison-boda": "Check whether boda compares one thing with another.",
  "existence-itda": "Look for itda/eopda meaning exists, has, or does not have."
};

// Live session (module-level, like the word-lesson view). Null = show the hub.
let sentenceStudioSession = null;
let sentenceLessonView = null;

function getSentenceBankRows() {
  const bank = window.HANAPATH_SENTENCES;
  return Array.isArray(bank) ? bank : [];
}

function getSentenceLessons() {
  const lessons = window.HANAPATH_SENTENCE_LESSONS;
  return Array.isArray(lessons) ? lessons : [];
}

function getSentenceLessonById(lessonId) {
  return getSentenceLessons().find((lesson) => lesson.id === lessonId) || null;
}

function getSentenceLessonRows(lesson) {
  const byId = getSentenceBankById();
  const ids = lesson?.type === "checkpoint" ? (lesson.reviewSentenceIds || []) : (lesson?.sentenceIds || []);
  return ids.map((id) => byId.get(id)).filter(Boolean);
}

// Normalized accessor for the Sentences state slice (additive; older saved
// states simply get the defaults).
function getSentencesProgress() {
  if (!state.sentencesProgress || typeof state.sentencesProgress !== "object") {
    state.sentencesProgress = {};
  }
  const p = state.sentencesProgress;
  p.band = Math.min(SENTENCE_BAND_COUNT, Math.max(1, Number(p.band) || 1));
  if (!p.results || typeof p.results !== "object") p.results = {};
  p.sessionsDone = Number(p.sessionsDone) || 0;
  if (p.newPerDay === undefined) p.newPerDay = 5;
  if (!Array.isArray(p.completedLessons)) p.completedLessons = [];
  p.completedLessons = [...new Set(p.completedLessons.filter((id) => typeof id === "string"))];
  if (!Array.isArray(p.reviewEvents)) p.reviewEvents = [];
  p.reviewEvents = normalizeSentenceReviewEvents(p.reviewEvents);
  return p;
}

function serializeSentenceLessonSession(session) {
  if (!session || !session.lessonId || session.phase === "summary") return null;
  return {
    version: 2,
    modeId: session.modeId,
    lessonId: session.lessonId,
    lessonTitle: session.lessonTitle || "",
    lessonType: session.lessonType || "content",
    studyIndex: session.studyIndex || 0,
    drillPlan: session.drillPlan || [],
    studyRows: (session.studyRows || session.rows).map((row) => row.id),
    rows: session.rows.map((row) => row.id),
    index: session.index,
    phase: session.phase,
    typed: session.typed || "",
    attempts: session.attempts || 0,
    helperLevel: session.helperLevel || 0,
    helperUsed: session.helperUsed || [],
    helperTilePool: session.helperTilePool || [],
    revealedTokenCount: session.revealedTokenCount || 0,
    lockedPrefix: session.lockedPrefix || "",
    builtTiles: session.builtTiles || [],
    tilePool: session.tilePool || [],
    transforms: session.transforms || {},
    autoPlayed: Boolean(session.autoPlayed),
    questionStartedAt: Number(session.questionStartedAt) || 0,
    results: session.results || [],
  };
}

function rehydrateSentenceLessonSession(snapshot) {
  if (!snapshot || snapshot.version !== 2) return null;
  if (typeof snapshot.lessonId !== "string") return null;
  if (!Array.isArray(snapshot.rows)) return null;

  const bankRows = getSentenceBankRows();
  const byId = getSentenceBankById();
  const rows = snapshot.rows.map((id) => byId.get(id)).filter(Boolean);
  if (rows.length !== snapshot.rows.length) return null;
  const studyRows = Array.isArray(snapshot.studyRows)
    ? snapshot.studyRows.map((id) => byId.get(id)).filter(Boolean)
    : [...new Map(rows.map((row) => [row.id, row])).values()];
  if (!studyRows.length) return null;

  if (!Number.isInteger(snapshot.index) || snapshot.index < 0 || snapshot.index >= rows.length) return null;

  const validPhases = new Set(["study", "question", "feedback", "summary"]);
  if (!validPhases.has(snapshot.phase)) return null;

  return {
    modeId: snapshot.modeId,
    lessonId: snapshot.lessonId,
    lessonTitle: snapshot.lessonTitle || "",
    lessonType: snapshot.lessonType === "checkpoint" ? "checkpoint" : "content",
    studyIndex: Number.isInteger(snapshot.studyIndex) && snapshot.studyIndex >= 0 ? snapshot.studyIndex : 0,
    drillPlan: Array.isArray(snapshot.drillPlan) ? snapshot.drillPlan : [],
    studyRows,
    rows: rows,
    index: snapshot.index,
    phase: snapshot.phase,
    typed: snapshot.typed || "",
    attempts: snapshot.attempts || 0,
    helperLevel: snapshot.helperLevel || 0,
    helperUsed: Array.isArray(snapshot.helperUsed) ? snapshot.helperUsed : [],
    helperTilePool: Array.isArray(snapshot.helperTilePool) ? snapshot.helperTilePool : [],
    revealedTokenCount: snapshot.revealedTokenCount || 0,
    lockedPrefix: snapshot.lockedPrefix || "",
    builtTiles: Array.isArray(snapshot.builtTiles) ? snapshot.builtTiles : [],
    tilePool: Array.isArray(snapshot.tilePool) ? snapshot.tilePool : [],
    transforms: snapshot.transforms && typeof snapshot.transforms === "object" ? snapshot.transforms : {},
    speech: null,
    autoPlayed: Boolean(snapshot.autoPlayed),
    questionStartedAt: Number(snapshot.questionStartedAt) || 0,
    results: Array.isArray(snapshot.results) ? snapshot.results : [],
  };
}

function persistSentenceLessonSession(session = sentenceStudioSession) {
  if (!session || !session.lessonId || session.phase === "summary") {
    state.sentenceLessonSession = null;
  } else {
    state.sentenceLessonSession = serializeSentenceLessonSession(session);
  }
  saveState();
}

function normalizeSentenceReviewResult(result, isCorrect) {
  const raw = String(result || "").toLowerCase();
  if (raw === "correct" || raw === "incorrect" || raw === "revealed" || raw === "self-marked") return raw;
  return isCorrect ? "correct" : "incorrect";
}

function inferSentenceErrorType(mode, result, helpersUsed = []) {
  if (result === "correct") return null;
  if (result === "revealed" || helpersUsed.includes("reveal")) return "revealed";
  const map = {
    translate: "sentence-recall",
    build: "word-order",
    listen: "dictation",
    shadow: "speech-match",
    transform: "inflection-transform",
    lesson: "pattern-lesson",
  };
  return map[mode] || "sentence-miss";
}

function estimateSentenceConfidence(result, latencyMs, helpersUsed = []) {
  if (result === "revealed") return 0.1;
  const safeLatency = Math.max(0, Number(latencyMs) || 0);
  const speed = 1 - Math.min(1, safeLatency / 20000);
  const helperPenalty = Math.min(0.35, helpersUsed.length * 0.08);
  const base = result === "correct" ? 0.68 : 0.25;
  const swing = result === "correct" ? 0.25 : -0.05;
  return Math.max(0.05, Math.min(0.99, Math.round((base + speed * swing - helperPenalty) * 100) / 100));
}

function normalizeSentenceReviewEvent(event) {
  if (!event || typeof event !== "object") return null;
  const sentenceId = typeof event.sentenceId === "string" ? event.sentenceId : "";
  if (!sentenceId) return null;
  const mode = typeof event.mode === "string" && event.mode ? event.mode : "translate";
  const helpersUsed = Array.isArray(event.helpersUsed)
    ? event.helpersUsed.filter((value) => typeof value === "string")
    : [];
  const result = normalizeSentenceReviewResult(event.result, event.result === "correct");
  const at = Number.isFinite(Number(event.at)) ? Number(event.at) : Date.now();
  const latencyMs = Number.isFinite(Number(event.latencyMs)) ? Math.max(0, Math.round(Number(event.latencyMs))) : 0;
  const confidence = Number.isFinite(Number(event.confidence))
    ? Math.max(0, Math.min(1, Math.round(Number(event.confidence) * 100) / 100))
    : estimateSentenceConfidence(result, latencyMs, helpersUsed);
  return {
    sentenceId,
    mode,
    result,
    latencyMs,
    helpersUsed,
    helperCount: helpersUsed.length,
    errorType: typeof event.errorType === "string" && event.errorType
      ? event.errorType
      : inferSentenceErrorType(mode, result, helpersUsed),
    confidence,
    lessonId: typeof event.lessonId === "string" && event.lessonId ? event.lessonId : null,
    transformId: typeof event.transformId === "string" && event.transformId ? event.transformId : null,
    speechScore: event.speechScore && typeof event.speechScore === "object" ? event.speechScore : null,
    at,
  };
}

function normalizeSentenceReviewEvents(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((event) => normalizeSentenceReviewEvent(event))
    .filter(Boolean)
    .sort((a, b) => a.at - b.at)
    .slice(-SENTENCE_REVIEW_EVENT_LIMIT);
}

function pushSentenceReviewEvent(event) {
  const progress = getSentencesProgress();
  const normalized = normalizeSentenceReviewEvent(event);
  if (!normalized) return null;
  progress.reviewEvents.push(normalized);
  if (progress.reviewEvents.length > SENTENCE_REVIEW_EVENT_LIMIT) {
    progress.reviewEvents.splice(0, progress.reviewEvents.length - SENTENCE_REVIEW_EVENT_LIMIT);
  }
  return normalized;
}

// 'Met words' = union of word ids in completed word lessons and state.vocabSrs keys.
function getMetWords() {
  const metWords = new Set();
  const completedLessonIds = state.vocabLessonCompleted || [];
  const lessons = Array.isArray(window.HANAPATH_WORD_LESSONS) ? window.HANAPATH_WORD_LESSONS : [];
  for (const lesson of lessons) {
    if (completedLessonIds.includes(lesson.id)) {
      for (const wId of getWordLessonReviewWordIds(lesson)) {
          metWords.add(wId);
      }
    }
  }
  if (state.vocabSrs && typeof state.vocabSrs === "object") {
    for (const wId in state.vocabSrs) {
      metWords.add(wId);
    }
  }
  return metWords;
}

let sentenceEarlyWordIdsCache = null;
function getSentenceEarlyWordIds() {
  if (sentenceEarlyWordIdsCache) return sentenceEarlyWordIdsCache;
  const snapshot = window.HANAPATH_WORD_V1_SNAPSHOT;
  const lessons = snapshot && snapshot.lessons && typeof snapshot.lessons === "object" ? snapshot.lessons : {};
  sentenceEarlyWordIdsCache = new Set(Object.entries(lessons).filter(([id]) => /^(w0|w1|w2)-/.test(id)).flatMap(([, ids]) => Array.isArray(ids) ? ids : []));
  return sentenceEarlyWordIdsCache;
}

function isSentenceAvailable(row, metWords) {
  if (!Array.isArray(row.focusWordIds) || row.focusWordIds.length === 0) return true;
  return row.focusWordIds.every(wId => {
    if (metWords.has(wId)) return true;
    if (row.band === 1) {
      const inW0ToW2 = getSentenceEarlyWordIds().has(wId);
      if (inW0ToW2) return true;
    }
    return false;
  });
}

// Candidate rows for a session at the chosen band: rows AT the band first,
// padded with easier rows when the band is thin.
// EXTENSION (roadmap C2): filter by focusWordIds ⊆ words the learner has met.
function getSentenceRowsForBand(band) {
  const rows = getSentenceBankRows();
  const metWords = getMetWords();
  const available = rows.filter((row) => isSentenceAvailable(row, metWords));
  const atBand = available.filter((row) => row.band === band);
  if (atBand.length >= SENTENCE_SESSION_LENGTH) return atBand;
  return atBand.concat(available.filter((row) => row.band < band));
}

function getUnmetFocusWordsCountForBand(band) {
  const rows = getSentenceBankRows();
  const metWords = getMetWords();
  const bandRows = rows.filter(row => row.band === band);

  const unmetWords = new Set();
  for (const row of bandRows) {
    if (Array.isArray(row.focusWordIds)) {
      for (const wId of row.focusWordIds) {
        if (!metWords.has(wId)) {
          if (band === 1) {
            if (getSentenceEarlyWordIds().has(wId)) continue;
          }
          unmetWords.add(wId);
        }
      }
    }
  }
  return unmetWords.size;
}

function getNewSentencesCountToday() {
  const results = getSentencesProgress().results;
  const now = Date.now();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  let count = 0;
  for (const id in results) {
    const record = results[id];
    if (record.firstSeen && record.firstSeen >= oneDayAgo) {
      count++;
    }
  }
  return count;
}

function getTotalDueSentencesCount() {
  const rows = getSentenceBankRows();
  const metWords = getMetWords();
  const available = rows.filter(row => isSentenceAvailable(row, metWords));
  const results = getSentencesProgress().results;
  const now = Date.now();
  let count = 0;
  for (const row of available) {
    const record = results[row.id];
    if (record && record.seen && (record.due || 0) <= now) {
      count++;
    }
  }
  return count;
}

function getDueSentenceCountForBand(band) {
  const candidates = getSentenceRowsForBand(band);
  const results = getSentencesProgress().results;
  const now = Date.now();
  let count = 0;
  for (const row of candidates) {
    const record = results[row.id];
    if (record && record.seen && (record.due || 0) <= now) {
      count++;
    }
  }
  return count;
}

function getSentenceAnalyticsSnapshot(activeProgress = null, activeRows = null) {
  const progress = activeProgress || getSentencesProgress();
  const events = progress.reviewEvents || [];
  const rowsById = new Map((activeRows || getSentenceBankRows()).map((row) => [row.id, row]));
  const validEvents = events.filter((event) => rowsById.has(event.sentenceId));
  const total = validEvents.length;
  const correct = validEvents.filter((event) => event.result === "correct").length;
  const avgLatencyMs = total
    ? Math.round(validEvents.reduce((sum, event) => sum + (Number(event.latencyMs) || 0), 0) / total)
    : 0;
  const helperUses = validEvents.reduce((sum, event) => sum + (Number(event.helperCount) || 0), 0);
  const byMode = validEvents.reduce((acc, event) => {
    acc[event.mode] = (acc[event.mode] || 0) + 1;
    return acc;
  }, {});
  return {
    events: validEvents,
    total,
    correct,
    correctPct: total ? Math.round((correct / total) * 100) : 0,
    avgLatencyMs,
    avgLatencyLabel: formatVocabLatencyMs(avgLatencyMs),
    helperUses,
    byMode,
    recentEvents: validEvents.slice(-6).reverse(),
  };
}

// Least-practiced-first selection with random tie-breaking.
// EXTENSION (roadmap C3): replace with the sentence SRS due queue.
function pickSentenceSessionRows(band, count = SENTENCE_SESSION_LENGTH) {
  const progress = getSentencesProgress();
  const results = progress.results;
  const now = Date.now();

  const candidates = getSentenceRowsForBand(band);

  const due = [];
  const unseen = [];
  const seenNotDue = [];

  for (const row of candidates) {
    const record = results[row.id];
    if (!record || !record.seen) {
      unseen.push({ row, rnd: Math.random() });
    } else {
      const isDue = (record.due || 0) <= now;
      if (isDue) {
        due.push({ row, due: record.due || 0, rnd: Math.random() });
      } else {
        seenNotDue.push({ row, due: record.due || 0, rnd: Math.random() });
      }
    }
  }

  due.sort((a, b) => a.due - b.due || a.rnd - b.rnd);
  unseen.sort((a, b) => a.rnd - b.rnd);
  seenNotDue.sort((a, b) => a.due - b.due || a.rnd - b.rnd);

  const selected = [];

  for (const item of due) {
    if (selected.length >= count) break;
    selected.push(item.row);
  }

  const newQuota = Math.max(0, (progress.newPerDay !== undefined ? progress.newPerDay : 5) - getNewSentencesCountToday());
  let newDrawn = 0;
  for (const item of unseen) {
    if (selected.length >= count) break;
    if (newDrawn >= newQuota) break;
    selected.push(item.row);
    newDrawn++;
  }

  for (const item of seenNotDue) {
    if (selected.length >= count) break;
    selected.push(item.row);
  }

  for (const item of unseen) {
    if (selected.length >= count) break;
    if (!selected.includes(item.row)) {
      selected.push(item.row);
    }
  }

  return selected;
}

// A typed/built attempt is correct when it normalizes to the target sentence
// or any curated alternative. Spacing and punctuation never count against
// the learner. EXTENSION (roadmap B3): positional alignment + near-miss diff.
function checkSentenceAnswer(row, typed) {
  const guess = normalizeKoreanAnswer(typed, { ignoreSpaces: true });
  if (!guess) return false;
  const targets = [row.korean].concat(Array.isArray(row.acceptAlso) ? row.acceptAlso : []);
  return targets.some((t) => normalizeKoreanAnswer(t, { ignoreSpaces: true }) === guess);
}

// Cheap per-token feedback for a wrong attempt: mark which target tokens the
// learner's attempt already contains. EXTENSION (roadmap B3): real alignment.
function sentenceTokenDiffHtml(row, typed) {
  const targetTokens = row.tokens || [];
  const typedTokens = String(typed || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(t => t.replace(/[.,!?;:"'`~(){}\[\]<>\/·-]+$/g, "").trim())
    .filter(Boolean);

  const m = targetTokens.length;
  const n = typedTokens.length;

  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    const tClean = normalizeKoreanAnswer(targetTokens[i - 1], { ignoreSpaces: true });
    for (let j = 1; j <= n; j++) {
      const gClean = normalizeKoreanAnswer(typedTokens[j - 1], { ignoreSpaces: true });
      if (tClean === gClean) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const matchedTargetIndices = new Set();
  let i = m, j = n;
  while (i > 0 && j > 0) {
    const tClean = normalizeKoreanAnswer(targetTokens[i - 1], { ignoreSpaces: true });
    const gClean = normalizeKoreanAnswer(typedTokens[j - 1], { ignoreSpaces: true });
    if (tClean === gClean) {
      matchedTargetIndices.add(i - 1);
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return targetTokens
    .map((tok, idx) => {
      const ok = matchedTargetIndices.has(idx);
      return `<span class="ss-tok ${ok ? "ss-tok-ok" : "ss-tok-miss"}" lang="ko">${escapeHtml(tok)}</span>`;
    })
    .join(" ");
}

// Build-mode tile pool: the answer tokens plus two same-band distractors,
// all shown without trailing punctuation so the final tile isn't given away.
function makeSentenceTilePool(row, bandRows) {
  const stripEnd = (tok) => String(tok).replace(/[.!?…,~]+$/, "");
  const tiles = (row.tokens || []).map(stripEnd).filter(Boolean);
  const used = new Set(tiles.map((t) => normalizeKoreanAnswer(t, { ignoreSpaces: true })));
  const distractors = [];
  for (const other of shuffle(bandRows.filter((r) => r.id !== row.id))) {
    for (const tok of other.tokens || []) {
      const clean = stripEnd(tok);
      const key = normalizeKoreanAnswer(clean, { ignoreSpaces: true });
      if (!clean || !key || used.has(key)) continue;
      used.add(key);
      distractors.push(clean);
      break;
    }
    if (distractors.length >= 2) break;
  }
  return shuffle(tiles.concat(distractors));
}

function sentenceRowHasInflectedSurface(row, surface) {
  const text = String(row?.korean || "");
  const form = String(surface || "").trim();
  return Boolean(form && text.includes(form));
}

function buildSentenceTransformForRow(row) {
  const inflect = window.HANAPATH_INFLECT;
  if (!row || !inflect || typeof inflect.inflect !== "function") return null;
  const focusIds = Array.isArray(row.focusWordIds) ? row.focusWordIds : [];
  for (const wordId of focusIds) {
    const word = curatedWordsById.get(wordId);
    if (!word || (word.pos !== "verb" && word.pos !== "adjective")) continue;
    for (const task of SENTENCE_TRANSFORM_TASKS) {
      const sourceSurface = inflect.inflect(word, task.sourceForm);
      const targetSurface = inflect.inflect(word, task.targetForm);
      if (!sourceSurface || !targetSurface || sourceSurface === targetSurface) continue;
      if (!sentenceRowHasInflectedSurface(row, sourceSurface)) continue;
      const expected = String(row.korean).replace(sourceSurface, targetSurface);
      if (expected === row.korean) continue;
      return {
        id: `${row.id}:${word.id}:${task.id}`,
        task,
        word,
        sourceSurface,
        targetSurface,
        prompt: task.label,
        expected,
        tokens: tokenizeSentence(expected),
      };
    }
  }
  return null;
}

function getSentenceTransformRowsForBand(band) {
  return getSentenceRowsForBand(band)
    .map((row) => ({ row, transform: buildSentenceTransformForRow(row) }))
    .filter((item) => item.transform);
}

function pickSentenceTransformRows(band, count = SENTENCE_SESSION_LENGTH) {
  const exact = getSentenceTransformRowsForBand(band);
  const easier = band > 1
    ? Array.from({ length: band - 1 }, (_, index) => getSentenceTransformRowsForBand(index + 1)).flat()
    : [];
  const seen = new Set();
  return shuffle(exact.concat(easier))
    .filter((item) => {
      if (seen.has(item.row.id)) return false;
      seen.add(item.row.id);
      return true;
    })
    .slice(0, count)
    .map((item) => item.row);
}

function getSentenceTransformForSessionRow(session, row) {
  if (!session.transforms) session.transforms = {};
  if (!session.transforms[row.id]) {
    session.transforms[row.id] = buildSentenceTransformForRow(row);
  }
  return session.transforms[row.id] || null;
}

function startSentenceStudioSession(modeId) {
  stopSpeech();
  resetLessonMotion("sentence");
  queueScreenMotion("forward", 1, { replace: false });
  const progress = getSentencesProgress();
  const rows = modeId === "transform"
    ? pickSentenceTransformRows(progress.band)
    : pickSentenceSessionRows(progress.band);
  if (!rows.length) return;
  sentenceLessonView = null;
  sentenceStudioSession = {
    modeId,
    rows,
    index: 0,
    phase: "question", // question | feedback | summary
    typed: "",
    attempts: 0,
    helperLevel: 0,
    helperUsed: [],
    helperTilePool: [],
    revealedTokenCount: 0,
    lockedPrefix: "",
    builtTiles: [],
    tilePool: [],
    transforms: {},
    speech: null,
    autoPlayed: false,
    questionStartedAt: 0,
    results: [], // { id, mode, correct, revealed, helpersUsed }
  };
  prepareSentenceQuestion();
  persistSentenceLessonSession();
  renderPracticeView();
}

function isSentenceLessonUnlocked(lesson, metWords, completedSet) {
  if (!lesson) return false;
  if (TEST_UNLOCK_ALL_STAGES) return true;
  if (isSentenceCurriculumV2()) {
    return isSentenceLessonUnlockedV2(lesson, metWords, completedSet);
  }
  const lessons = getSentenceLessons();
  const index = lessons.findIndex((l) => l.id === lesson.id);
  if (index <= 0) return true;
  const prevLesson = lessons[index - 1];
  const progress = getSentencesProgress();
  return (progress.completedLessons || []).includes(prevLesson.id);
}

function openSentenceLesson(lessonId) {
  const lesson = getSentenceLessonById(lessonId);
  if (!lesson || !isSentenceLessonUnlocked(lesson)) return;
  queueScreenMotion("forward", 1, { replace: false });
  stopSpeech();
  sentenceStudioSession = null;
  sentenceLessonView = { lessonId };
  renderPracticeView();
}

function normalizeSentenceLessonMode(row, mode) {
  const requested = String(mode || "translate");
  if (requested === "transform" && !buildSentenceTransformForRow(row)) return "translate";
  // A one- or two-token build exposes nearly the complete answer at a glance.
  // Keep word-order drills for sentences that contain a meaningful sequence.
  if (requested === "build" && tokenizeSentence(row.korean).length < 3) return "listen";
  return ["translate", "build", "listen", "shadow", "transform"].includes(requested) ? requested : "translate";
}

// Every content sentence receives two objective retrievals in different modes.
// The study pass remains unique; only the question deck is doubled and spaced.
function buildSentenceLessonQuestionPlan(lesson, studyRows) {
  const configured = new Map((Array.isArray(lesson.drillPlan) ? lesson.drillPlan : [])
    .map((entry) => [entry.sentenceId, entry.mode]));
  const primary = studyRows.map((row) => ({
    sentenceId: row.id,
    mode: normalizeSentenceLessonMode(row, configured.get(row.id)),
  }));
  const secondMode = (row, first) => {
    if (first === "translate") return tokenizeSentence(row.korean).length >= 3 ? "build" : "listen";
    if (first === "build" || first === "transform") return "listen";
    if (first === "listen") return "shadow";
    return "translate";
  };
  const secondary = studyRows.map((row, index) => ({
    sentenceId: row.id,
    mode: secondMode(row, primary[index].mode),
  }));
  return {
    studyRows: [...studyRows],
    rows: [...studyRows, ...studyRows],
    drillPlan: [...primary, ...secondary],
  };
}

function startSentenceLessonSession(lessonId) {
  const lesson = getSentenceLessonById(lessonId);
  if (!lesson || !isSentenceLessonUnlocked(lesson)) return;
  let rows = getSentenceLessonRows(lesson);
  if (lesson.type === "checkpoint") {
    const progress = getSentencesProgress();
    const maxPrompts = Math.max(1, Number(lesson.promptBounds?.max) || rows.length);
    rows = rows
      .slice()
      .sort((a, b) => {
        const aRecord = progress.results[a.id] || {};
        const bRecord = progress.results[b.id] || {};
        return (Number(aRecord.box) || 0) - (Number(bRecord.box) || 0)
          || (Number(aRecord.due) || 0) - (Number(bRecord.due) || 0)
          || a.id.localeCompare(b.id);
      })
      .slice(0, maxPrompts);
  }
  if (!rows.length) return;
  resetLessonMotion("sentence");
  queueScreenMotion("forward", 1, { replace: false });
  const drillPlan = lesson.type === "content"
    ? (Array.isArray(lesson.drillPlan) ? lesson.drillPlan : [])
    : rows.map((row, index) => ({
      sentenceId: row.id,
      mode: index === rows.length - 1 ? "listen" : index === rows.length - 2 ? "build" : "translate",
    }));
  stopSpeech();
  sentenceLessonView = null;
  sentenceStudioSession = {
    modeId: "lesson",
    lessonId,
    lessonTitle: lesson.title,
    lessonType: lesson.type === "checkpoint" ? "checkpoint" : "content",
    studyIndex: 0,
    drillPlan,
    studyRows,
    rows: questionRows,
    index: 0,
    phase: lesson.type === "content" && isSentenceCurriculumV2() ? "study" : "question",
    typed: "",
    attempts: 0,
    helperLevel: 0,
    helperUsed: [],
    helperTilePool: [],
    revealedTokenCount: 0,
    lockedPrefix: "",
    builtTiles: [],
    tilePool: [],
    transforms: {},
    speech: null,
    autoPlayed: false,
    questionStartedAt: 0,
    results: [],
  };
  if (sentenceStudioSession.phase === "question") prepareSentenceQuestion();
  persistSentenceLessonSession();
  renderPracticeView();
}

function sentenceQuestionMode(session = sentenceStudioSession) {
  if (session.modeId === "lesson") {
    const row = session.rows[session.index];
    const configured = session.drillPlan?.[session.index]?.mode;
    return normalizeSentenceLessonMode(row, configured || (session.index % 2 === 0 ? "translate" : "build"));
  }
  if (session.modeId !== "mixed") return session.modeId;
  const progress = getSentencesProgress();
  let mode = ["translate", "build", "listen", "shadow"][session.index % 4];
  if (progress.band >= 3) {
    const rawMode = ["translate", "build", "listen", "shadow", "transform"][session.index % 5];
    if (rawMode === "transform") {
      const row = session.rows[session.index];
      if (buildSentenceTransformForRow(row)) {
        mode = "transform";
      } else {
        mode = "translate";
      }
    } else {
      mode = rawMode;
    }
  }
  return mode;
}

function prepareSentenceQuestion() {
  clearSentenceSessionTimeouts();
  const session = sentenceStudioSession;
  session.phase = "question";
  session.typed = "";
  session.attempts = 0;
  session.helperLevel = 0;
  session.helperUsed = [];
  session.helperTilePool = [];
  session.revealedTokenCount = 0;
  session.lockedPrefix = "";
  session.autoPlayed = false;
  session.builtTiles = [];
  session.tilePool = [];
  session.speech = null;
  session.questionStartedAt = Date.now();
  if (sentenceQuestionMode() === "build") {
    const row = session.rows[session.index];
    session.tilePool = makeSentenceTilePool(row, getSentenceRowsForBand(getSentencesProgress().band));
  } else if (sentenceQuestionMode() === "transform") {
    const row = session.rows[session.index];
    const transform = getSentenceTransformForSessionRow(session, row);
    session.helperTilePool = transform
      ? makeSentenceTokenPool(transform.tokens || tokenizeSentence(transform.expected), 4).map((tile) => tile.text)
      : [];
  }
}

function markSentenceHelperUsed(name) {
  const session = sentenceStudioSession;
  if (!session) return;
  if (!session.helperUsed.includes(name)) session.helperUsed.push(name);
}

// Persist one outcome per question into the durable per-sentence record.
// EXTENSION (roadmap C3): also (re)schedule the row's SRS card here.
// EXTENSION (roadmap J1): also emit a review-event for the analytics view.
function recordSentenceResult(row, correct, revealed, meta = {}) {
  const progress = getSentencesProgress();
  const results = progress.results;
  const record = results[row.id] || (results[row.id] = { seen: 0, correct: 0, streak: 0, last: 0, box: 0, due: 0, lapses: 0 });

  record.seen += 1;
  record.last = Date.now();
  if (!record.firstSeen) {
    record.firstSeen = record.last;
  }

  if (correct) {
    record.correct += 1;
    record.streak += 1;

    const hasHelpers = sentenceStudioSession.helperUsed.length > 0;
    if (!hasHelpers) {
      record.box = Math.min((record.box || 0) + 1, VOCAB_SRS_INTERVALS.length - 1);
    } else {
      record.box = record.box || 0;
    }
  } else {
    record.streak = 0;
    record.box = 0;
    record.lapses = (record.lapses || 0) + 1;
  }
  record.due = record.last + VOCAB_SRS_INTERVALS[record.box];
  const mode = sentenceQuestionMode();
  const helpersUsed = sentenceStudioSession.helperUsed.slice();
  const result = revealed ? "revealed" : correct ? "correct" : "incorrect";
  const latencyMs = Number.isFinite(Number(meta.latencyMs))
    ? Math.max(0, Math.round(Number(meta.latencyMs)))
    : Math.max(0, Date.now() - (Number(sentenceStudioSession.questionStartedAt) || Date.now()));
  pushSentenceReviewEvent({
    sentenceId: row.id,
    mode,
    result,
    latencyMs,
    helpersUsed,
    lessonId: sentenceStudioSession.lessonId || null,
    transformId: meta.transformId || null,
    speechScore: meta.speechScore || null,
    at: record.last,
  });

  sentenceStudioSession.results.push({
    id: row.id,
    mode,
    correct,
    revealed,
    firstTry: Boolean(correct && !revealed && sentenceStudioSession.attempts === 0),
    helpersUsed,
    latencyMs,
    transformId: meta.transformId || null,
    speechScore: meta.speechScore || null,
  });
  saveState();
}

function finishSentenceQuestion(correct, revealed = false, meta = {}) {
  clearSentenceSessionTimeouts();
  const session = sentenceStudioSession;
  const row = session.rows[session.index];
  if (revealed) markSentenceHelperUsed("reveal");
  recordSentenceResult(row, correct, revealed, meta);
  session.phase = "feedback";
  if (correct) {
    playCorrectSound();
    speak(row.voiceText || row.korean);
  } else {
    playIncorrectSound();
  }
  renderPracticeView();
}

function advanceSentenceSession() {
  clearSentenceSessionTimeouts();
  const session = sentenceStudioSession;
  stopSpeech();
  if (session.index + 1 >= session.rows.length) {
    session.phase = "summary";
    const progress = getSentencesProgress();
    progress.sessionsDone += 1;
    if (session.lessonId) {
      const lesson = getSentenceLessonById(session.lessonId);
      const requiredPct = Number(lesson?.pass?.minFirstTryPct || 75);
      const firstTryPct = session.rows.length
        ? (session.results.filter((result) => result.firstTry).length / session.rows.length) * 100
        : 0;
      if (firstTryPct >= requiredPct && !progress.completedLessons.includes(session.lessonId)) {
        progress.completedLessons.push(session.lessonId);
      }
    }
    saveState();
  } else {
    session.index += 1;
    prepareSentenceQuestion();
  }
  persistSentenceLessonSession();
  renderPracticeView();
}

function exitSentenceStudioSession() {
  clearSentenceSessionTimeouts();
  stopSpeech();
  queueScreenMotion("back", -1);
  sentenceStudioSession = null;
  sentenceLessonView = null;
  persistSentenceLessonSession(null);
  renderPracticeView();
}

// --- Sentence Studio: HTML pieces -------------------------------------------

function sentenceStudioLockedHtml() {
  return `
    <div class="card">
      <div class="eyebrow">Practice · Sentences</div>
      <h2 class="screen-title" style="margin-bottom:8px;">Sentence Studio</h2>
      <div class="screen-sub" style="margin-bottom:12px;">Sentences unlock after you finish the alphabet and meet your first words. Every drill here reuses words you already know.</div>
      <button class="button primary compact" type="button" data-ss-goto="today">Continue the alphabet</button>
    </div>
  `;
}

let sentenceWordOwnerUnitMap = null;

function getSentenceWordOwnerUnitMap() {
  if (sentenceWordOwnerUnitMap) return sentenceWordOwnerUnitMap;
  sentenceWordOwnerUnitMap = new Map();
  getWordUnits().forEach((wordUnit) => {
    getWordUnitContentLessons(wordUnit).forEach((lesson) => {
      getWordLessonReviewWordIds(lesson).forEach((wordId) => {
        if (!sentenceWordOwnerUnitMap.has(wordId)) sentenceWordOwnerUnitMap.set(wordId, wordUnit);
      });
    });
  });
  return sentenceWordOwnerUnitMap;
}

function getSentenceBlockingWordUnitId(unit, metWords) {
  initSentenceUnitFocusWordsMap();
  const focusWords = sentenceUnitFocusWordsMap.get(unit?.id) || new Set();
  const wordOwnerMap = getSentenceWordOwnerUnitMap();
  for (const wordId of focusWords) {
    if (metWords.has(wordId)) continue;
    const owner = wordOwnerMap.get(wordId);
    if (owner) return owner;
  }
  return null;
}

// Learner-facing name for a generated sentence lesson. Plan titles are codes
// like "S1 · Reading the signs · 3"; inside a unit card that repeats the unit
// name on every row, so show "Lesson 3" there and "Reading the signs · Lesson 3"
// anywhere the unit isn't already on screen. Falls back to the stored title.
function getSentenceLessonDisplayTitle(lesson, withUnit = true) {
  if (!lesson) return "Sentence lesson";
  if (lesson.type === "checkpoint") return lesson.title || "Unit check";
  const unit = getSentenceUnitById(lesson.unitId);
  if (!unit) return lesson.title || lesson.id;
  const index = getSentenceUnitContentLessons(unit).findIndex((l) => l.id === lesson.id);
  if (index < 0) return lesson.title || lesson.id;
  return withUnit ? `${unit.name} · Lesson ${index + 1}` : `Lesson ${index + 1}`;
}

function sentencePathLessonRowHtml(lesson, unlocked, completed, active) {
  const isCheckpoint = lesson.type === "checkpoint";
  const label = isCheckpoint ? "Unit check" : (completed ? "Complete" : active ? "Next up" : "Lesson");
  const rowClass = `study-row ss-mode ${isCheckpoint ? "sentence-path-checkpoint" : ""} ${active ? "is-highlighted" : ""}`;
  return `<button class="${rowClass}" type="button" data-ss-lesson="${escapeHtml(lesson.id)}" ${unlocked ? "" : "disabled"}>
    <div>
      <div class="study-row-ko" style="${unlocked ? "" : "opacity:.55;"}">${escapeHtml(getSentenceLessonDisplayTitle(lesson, false))}</div>
      <div class="study-row-sub" style="${unlocked ? "" : "opacity:.55;"}">${escapeHtml(lesson.subtitle || lesson.goal || "Sentence practice")}</div>
    </div>
    <span class="pill ${completed ? "accent" : unlocked ? "muted" : "muted"}">${completed ? "Done" : unlocked ? label : "Locked"}</span>
  </button>`;
}

function sentencePathUnitHtml(unit, metWords, completedSet, activeLessonId, progress) {
  const contentLessons = getSentenceUnitContentLessons(unit);
  const checkpoint = getSentenceLessonById(unit.checkpointId);
  const lessons = [...contentLessons, checkpoint].filter(Boolean);
  const completed = contentLessons.filter((lesson) => completedSet.has(lesson.id)).length;
  const crowned = isSentenceUnitCrowned(unit, completedSet);
  const unlocked = isSentenceUnitUnlocked(unit, metWords);
  const due = Array.from(new Set(contentLessons.flatMap((lesson) => lesson.sentenceIds || [])))
    .filter((sentenceId) => {
      const record = progress?.results?.[sentenceId];
      return record?.seen > 0 && Number(record.due || 0) <= Date.now();
    }).length;
  const blockingWordUnit = !unlocked ? getSentenceBlockingWordUnitId(unit, metWords) : null;
  const lessonRows = lessons.map((lesson) => sentencePathLessonRowHtml(
    lesson,
    unlocked && isSentenceLessonUnlockedV2(lesson, metWords, completedSet),
    completedSet.has(lesson.id),
    lesson.id === activeLessonId,
  )).join("");
  const lockNote = blockingWordUnit
    ? `<div class="vocab-path-lock-note">Learn <strong>${escapeHtml(blockingWordUnit.name)}</strong> in Words first.
        <button class="button secondary compact" type="button" data-ss-word-unit="${escapeHtml(blockingWordUnit.id)}" aria-label="Open Words for ${escapeHtml(blockingWordUnit.name)}">Open Words</button></div>`
    : `<div class="vocab-path-lock-note">Meet the focus words from the Words path to unlock this unit.</div>`;
  return `<article class="vocab-path-unit ${crowned ? "is-crowned" : ""} ${!unlocked ? "is-locked" : ""}">
    <button class="vocab-path-unit-header" type="button" data-sentence-unit-toggle="${escapeHtml(unit.id)}" aria-expanded="${unlocked && !crowned ? "true" : "false"}">
      <span class="vocab-path-unit-emoji" aria-hidden="true">${escapeHtml(unit.emoji || "•")}</span>
      <span class="vocab-path-unit-copy"><strong>${escapeHtml(unit.name)}</strong><small>${completed}/${lessons.length - 1} lessons complete</small></span>
      ${due ? `<span class="pill accent sentence-path-due">${due} line${due === 1 ? "" : "s"} due</span>` : ""}
      <span class="pill ${crowned ? "green" : unlocked ? "accent" : "muted"}">${crowned ? "Crowned" : unlocked ? `${completed}/${lessons.length - 1}` : "Locked"}</span>
    </button>
    <div class="vocab-path-unit-lessons" data-sentence-unit-lessons="${escapeHtml(unit.id)}" ${unlocked && !crowned ? "" : "hidden"}>
      ${unlocked ? lessonRows : lockNote}
    </div>
  </article>`;
}

function sentencePathHtml(metWords, completedSet, activeLessonId, progress) {
  const sections = getSentenceSections().slice().sort((a, b) => a.order - b.order);
  const sectionItems = sections.map((section) => {
    const units = getSentenceUnits().filter((unit) => unit.sectionId === section.id).sort((a, b) => a.order - b.order);
    const unlockedUnits = units.filter((unit) => isSentenceUnitUnlocked(unit, metWords));
    const crowned = units.filter((unit) => isSentenceUnitCrowned(unit, completedSet)).length;
    const complete = units.length > 0 && crowned === units.length;
    const locked = unlockedUnits.length === 0;
    const sectionOpen = unlockedUnits.some((unit) => unit.id === getSentenceLessonById(activeLessonId)?.unitId) || (!complete && !locked);
    const html = `<section class="vocab-path-section ${locked ? "is-locked" : complete ? "is-complete" : "is-open"}">
      <div class="vocab-path-section-header">
        <div><div class="eyebrow">Section ${section.order}</div><h3 class="vocab-path-section-title">${escapeHtml(section.name)}</h3></div>
        <span class="pill ${complete ? "green" : unlockedUnits.length ? "accent" : "muted"}">${complete ? "Completed" : unlockedUnits.length ? `${crowned}/${units.length} complete` : "Locked"}</span>
      </div>
      ${unlockedUnits.length && sectionOpen
        ? `<div class="vocab-path-unit-list">${units.map((unit) => sentencePathUnitHtml(unit, metWords, completedSet, activeLessonId, progress)).join("")}</div>`
        : unlockedUnits.length
          ? `<details class="vocab-path-explore"><summary>Explore topics · ${units.length} units</summary><div class="vocab-path-unit-list">${units.map((unit) => sentencePathUnitHtml(unit, metWords, completedSet, activeLessonId, progress)).join("")}</div></details>`
          : `<div class="vocab-path-lock-note">Finish the Words path to open sentence practice.</div>`}
    </section>`;
    return { html, complete, locked };
  });

  const activeSections = sectionItems.filter((item) => !item.complete && !item.locked);
  const completeSections = sectionItems.filter((item) => item.complete);
  const lockedSections = sectionItems.filter((item) => item.locked);
  const collapsedSections = (label, items, className) => items.length
    ? `<details class="sentence-path-group ${className}"><summary><span>${escapeHtml(label)}</span><span class="pill muted">${items.length}</span></summary><div class="sentence-path-group-body">${items.map((item) => item.html).join("")}</div></details>`
    : "";

  return `<div class="vocab-path sentence-path sent-path">
    ${activeSections.map((item) => item.html).join("")}
    ${collapsedSections("Completed sections", completeSections, "is-complete")}
    ${collapsedSections("Locked sections", lockedSections, "is-locked")}
  </div>`;
}

function sentenceStudioHubV2Html() {
  const rows = getSentenceBankRows();
  if (!rows.length) {
    return `<div class="card"><div class="eyebrow">Practice · Sentences</div><h2 class="screen-title" style="margin-bottom:8px;">Sentence Studio</h2><div class="screen-sub" style="margin-bottom:0;">The sentence bank failed to load. Reload the app to try again.</div></div>`;
  }
  const progress = getSentencesProgress();
  const metWords = getMetWords();
  const availableRows = rows.filter((row) => isSentenceAvailable(row, metWords));
  const completedSet = new Set(progress.completedLessons || []);
  const nextLesson = getNextSentenceLesson(metWords, completedSet, progress);
  const units = getSentenceUnits();
  const unlockedUnits = units.filter((unit) => isSentenceUnitUnlocked(unit, metWords));
  const now = Date.now();
  const dueCount = availableRows.filter((row) => {
    const record = progress.results[row.id];
    return record?.seen > 0 && Number(record.due || 0) <= now;
  }).length;
  let firstBlockingUnit = null;
  for (const unit of units) {
    if (isSentenceUnitUnlocked(unit, metWords)) continue;
    firstBlockingUnit = getSentenceBlockingWordUnitId(unit, metWords);
    if (firstBlockingUnit) break;
  }
  const pathComplete = units.length > 0 && units.every((unit) => isSentenceUnitCrowned(unit, completedSet));
  const continueHtml = dueCount >= SENTENCE_SESSION_LENGTH
    ? `<div class="card continue-hero sentence-continue-hero"><div class="eyebrow">Reviews are due</div><h2 class="screen-title" style="margin-bottom:8px;">Bring ${dueCount} lines back.</h2><div class="screen-sub" style="margin-bottom:12px;">A short mixed session will start with the lines that need you most.</div><button class="button primary compact" type="button" data-ss-start="mixed">Review now</button></div>`
    : nextLesson
      ? `<div class="card continue-hero sentence-continue-hero"><div class="eyebrow">Continue Sentence Studio</div><h2 class="screen-title" style="margin-bottom:8px;">${escapeHtml(getSentenceLessonDisplayTitle(nextLesson))}</h2><div class="screen-sub" style="margin-bottom:12px;">${escapeHtml(nextLesson.goal || nextLesson.subtitle || "Keep the line moving.")}</div><button class="button primary compact" type="button" data-ss-lesson="${escapeHtml(nextLesson.id)}">Start lesson</button></div>`
      : pathComplete
        ? `<div class="card continue-hero"><div class="eyebrow">Sentence Studio</div><h2 class="screen-title" style="margin-bottom:8px;">Path complete</h2><div class="screen-sub" style="margin-bottom:0;">Review due lines or keep practising freely.</div></div>`
        : `<div class="card continue-hero sentence-locked-hero"><div class="eyebrow">${unlockedUnits.length ? "Next up in Words" : "Start with Words"}</div><h2 class="screen-title" style="margin-bottom:8px;">${unlockedUnits.length ? "Meet the next words to open more lines." : "Learn the words, then say the lines."}</h2><div class="screen-sub" style="margin-bottom:12px;">Your sentence path opens as you meet the focus words in Words.</div><button class="button primary compact" type="button" ${firstBlockingUnit ? `data-ss-word-unit="${escapeHtml(firstBlockingUnit.id)}"` : `data-ss-goto="vocabulary"`}>${firstBlockingUnit ? `Open ${escapeHtml(firstBlockingUnit.name)}` : "Open Words"}</button></div>`;
  const bandChips = Array.from({ length: SENTENCE_BAND_COUNT }, (_, index) => index + 1)
    .map((band) => {
      const count = rows.filter((row) => row.band === band).length;
      const availableAtBand = availableRows.filter((row) => row.band === band).length;
      const availableCount = availableAtBand >= SENTENCE_SESSION_LENGTH
        ? availableAtBand
        : availableRows.filter((row) => row.band <= band).length;
      const locked = availableCount < SENTENCE_SESSION_LENGTH;
      return `<button class="filter-chip ${progress.band === band ? "active" : ""}" type="button" data-ss-band="${band}" ${locked ? "disabled" : ""}>Band ${band}${locked ? " · Locked" : ` · ${count}`}</button>`;
    }).join("");
  const selectedBandRows = availableRows.filter((row) => row.band === progress.band);
  const sessionRows = selectedBandRows.length >= SENTENCE_SESSION_LENGTH
    ? selectedBandRows
    : selectedBandRows.concat(availableRows.filter((row) => row.band < progress.band));
  const transformAvailable = sessionRows.filter((row) => buildSentenceTransformForRow(row)).length >= SENTENCE_SESSION_LENGTH;
  const modeCards = SENTENCE_MODES.map((mode) => {
    const available = mode.id !== "transform" || transformAvailable;
    return `<button class="study-row ss-mode" type="button" data-ss-start="${escapeHtml(mode.id)}" ${available ? "" : "disabled"}><div><div class="study-row-ko">${escapeHtml(mode.label)}</div><div class="study-row-sub">${escapeHtml(available ? mode.sub : "More transform-ready sentences are needed for this path.")}</div></div><span class="pill muted">${escapeHtml(mode.tag)}</span></button>`;
  }).join("");
  const guidedPathHtml = `${continueHtml}
    <div class="card"><div class="eyebrow">Sentence path</div><div class="screen-sub" style="margin-bottom:12px;">${rows.length} lines across ${units.length} guided units. Finish a lesson to unlock the next line.</div>${sentencePathHtml(metWords, completedSet, nextLesson?.id || "", progress)}</div>`;
  const practiceIntroHtml = dueCount
    ? `<div class="card continue-hero sentence-continue-hero"><div class="eyebrow">Sentence review</div><h2 class="screen-title" style="margin-bottom:8px;">${dueCount} line${dueCount === 1 ? "" : "s"} ready</h2><div class="screen-sub" style="margin-bottom:12px;">Start with the sentences that are due, then keep practising freely.</div><button class="button primary compact" type="button" data-ss-start="mixed">Review now</button></div>`
    : `<div class="card"><div class="eyebrow">Practice · Sentences</div><h2 class="screen-title" style="margin-bottom:8px;">Practise full sentences</h2><div class="screen-sub" style="margin-bottom:0;">Type, build, listen, and speak using words you have already learned.</div></div>`;
  const freePracticeHtml = `<div class="card"><div class="flex-between mb-12"><div><div class="eyebrow">Choose a practice mode</div><div class="screen-sub" style="margin-bottom:0;">Choose a sentence band, then pick how you want to retrieve it.</div></div><span class="pill ${dueCount ? "accent" : "muted"}">${dueCount} due</span></div><div class="ss-band-row mb-12">${bandChips}</div><div class="study-list">${modeCards}</div></div>`;

  return activeHub === "learn"
    ? guidedPathHtml
    : `${practiceIntroHtml}${freePracticeHtml}`;
}

function sentenceStudioHubHtml() {
  if (isSentenceCurriculumV2()) return sentenceStudioHubV2Html();
  const rows = getSentenceBankRows();
  if (!rows.length) {
    return `
      <div class="card">
        <div class="eyebrow">Practice · Sentences</div>
        <h2 class="screen-title" style="margin-bottom:8px;">Sentence Studio</h2>
        <div class="screen-sub" style="margin-bottom:0;">The sentence bank failed to load. Reload the app to try again.</div>
      </div>
    `;
  }

  const progress = getSentencesProgress();
  const resultIds = Object.keys(progress.results);
  let seenTotal = 0;
  let correctTotal = 0;
  resultIds.forEach((id) => {
    seenTotal += progress.results[id].seen;
    correctTotal += progress.results[id].correct;
  });

  const dueCount = getTotalDueSentencesCount();

  const bandChips = Array.from({ length: SENTENCE_BAND_COUNT }, (_, i) => i + 1)
    .map((band) => {
      const count = rows.filter((row) => row.band === band).length;
      if (!count) return "";
      const isBandLocked = getSentenceRowsForBand(band).length < SENTENCE_SESSION_LENGTH;
      const label = isBandLocked ? `Band ${band} 🔒` : `Band ${band} · ${count}`;
      return `<button class="filter-chip ${progress.band === band ? "active" : ""}" type="button" data-ss-band="${band}">${label}</button>`;
    })
    .join("");

  const isLocked = getSentenceRowsForBand(progress.band).length < SENTENCE_SESSION_LENGTH;
  const unmetCount = getUnmetFocusWordsCountForBand(progress.band);

  let modeCardsHtml = "";
  if (isLocked) {
    modeCardsHtml = `
      <div class="locked-card text-center" style="padding: 24px; border: 1px dashed var(--bad); border-radius: 8px; background: rgba(248,113,113,.04);">
        <div class="lock-icon" style="font-size: 32px; margin-bottom: 12px; filter: grayscale(1);">🔒</div>
        <div class="eyebrow" style="color: var(--bad); margin-bottom: 6px;">Band ${progress.band} is Locked</div>
        <div class="screen-sub" style="margin-bottom: 16px;">
          To unlock, learn more vocabulary. This band requires focus words you haven't studied yet.
        </div>
        <button class="button primary compact" type="button" data-ss-goto="vocabulary">
          Learn ${unmetCount} more word${unmetCount === 1 ? "" : "s"}
        </button>
      </div>
    `;
  } else {
    modeCardsHtml = `
      <div class="study-list">
        ${SENTENCE_MODES.map((mode) => {
          const available = mode.id !== "transform" || getSentenceTransformRowsForBand(progress.band).length >= SENTENCE_SESSION_LENGTH;
          return `
          <button class="study-row ss-mode" type="button" data-ss-start="${mode.id}" ${available ? "" : "disabled"}>
            <div>
              <div class="study-row-ko">${escapeHtml(mode.label)}</div>
              <div class="study-row-sub">${escapeHtml(available ? mode.sub : "More transform-ready sentences are needed for this band.")}</div>
            </div>
            <span class="pill muted">${escapeHtml(mode.tag)}</span>
          </button>
        `;
        }).join("")}
      </div>
    `;
  }

  let previewHtml = "";
  if (!isLocked) {
    const preview = pickSentenceSessionRows(progress.band, 3)
      .map((row) => `
        <div class="study-row" data-ss-preview-speak="${escapeHtml(row.voiceText || row.korean)}">
          <div>
            <div class="study-row-ko" lang="ko">${escapeHtml(row.korean)}</div>
            <div class="study-row-sub">${escapeHtml(row.english)}</div>
          </div>
          <span class="pill muted">▶</span>
        </div>
      `)
      .join("");

    previewHtml = `
      <div class="card">
        <div class="flex-between mb-12">
          <div class="eyebrow">Up next in band ${progress.band}</div>
          <span class="pill muted">Tap to hear</span>
        </div>
        <div class="study-list">${preview}</div>
      </div>
    `;
  }

  const lessons = getSentenceLessons();
  const completedLessons = new Set(progress.completedLessons || []);
  const analytics = getSentenceAnalyticsSnapshot();
  const modeBreakdown = Object.keys(analytics.byMode).length
    ? Object.entries(analytics.byMode)
      .map(([mode, count]) => `${mode}: ${count}`)
      .join(" / ")
    : "No sentence events yet";
  const lessonRowsHtml = lessons.length
    ? lessons.map((lesson) => {
      const rowsForLesson = getSentenceLessonRows(lesson);
      const complete = completedLessons.has(lesson.id);
      const unlocked = isSentenceLessonUnlocked(lesson);
      const tags = (lesson.patternTags || []).slice(0, 3).join(" / ");
      return `
        <button class="study-row ss-mode" type="button" data-ss-lesson="${escapeHtml(lesson.id)}" ${unlocked ? "" : "disabled"}>
          <div>
            <div class="study-row-ko" style="${unlocked ? "" : "opacity: 0.5;"}">${escapeHtml(getSentenceLessonDisplayTitle(lesson))} ${unlocked ? "" : "🔒"}</div>
            <div class="study-row-sub" style="${unlocked ? "" : "opacity: 0.5;"}">${escapeHtml(tags)} / ${rowsForLesson.length} sentences</div>
          </div>
          <span class="pill ${complete ? "accent" : "muted"}">${complete ? "Done" : unlocked ? "Lesson" : "Locked"}</span>
        </button>
      `;
    }).join("")
    : `
      <div class="study-row">
        <div>
          <div class="study-row-ko">Pattern lessons unavailable</div>
          <div class="study-row-sub">Reload the app if the lesson plan did not load.</div>
        </div>
      </div>
    `;

  return `
    <div class="card">
      <div class="eyebrow">Practice · Sentences</div>
      <h2 class="screen-title" style="margin-bottom:8px;">Sentence Studio</h2>
      <div class="screen-sub" style="margin-bottom:12px;">Short sessions of real sentence production: type it, build it, hear it. Five sentences per run.</div>
      <div class="ss-stats">
        <div class="stat-box"><span class="sv">${resultIds.length}</span><span class="sl">Sentences practiced</span></div>
        <div class="stat-box"><span class="sv" style="${dueCount > 0 ? "color: var(--warn);" : ""}">${dueCount}</span><span class="sl">Reviews due</span></div>
        <div class="stat-box"><span class="sv">${progress.sessionsDone}</span><span class="sl">Sessions done</span></div>
      </div>
    </div>

    <div class="card">
      <div class="eyebrow mb-12">Difficulty band</div>
      <div class="ss-band-row">${bandChips}</div>
      <div class="fs-xs text-muted-2" style="margin-top:8px;">Band 1 is short frames; band 5 is long multi-clause sentences. Sessions favor sentences you have practiced least or are due.</div>
    </div>

    <div class="card">
      <div class="eyebrow mb-12">Start a session</div>
      ${modeCardsHtml}
    </div>

    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">Sentence insights</div>
          <div class="screen-sub" style="margin-bottom:0;">Events are captured now; the full metrics view can build from this trail.</div>
        </div>
        <span class="pill muted">${analytics.total} events</span>
      </div>
      <div class="stats-grid" style="margin-bottom:8px;">
        <div class="stat-box"><span class="sv">${analytics.correctPct}%</span><span class="sl">Accuracy</span></div>
        <div class="stat-box"><span class="sv">${analytics.avgLatencyLabel}</span><span class="sl">Avg latency</span></div>
        <div class="stat-box"><span class="sv">${analytics.helperUses}</span><span class="sl">Helpers used</span></div>
      </div>
      <div class="screen-sub fs-xs" style="margin-bottom:0;">${escapeHtml(modeBreakdown)}</div>
    </div>

    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">Pattern lessons</div>
          <div class="screen-sub" style="margin-bottom:0;">Concept card, six examples, then Translate/Build checks.</div>
        </div>
        <span class="pill muted">${completedLessons.size}/${lessons.length}</span>
      </div>
      <div class="study-list">${lessonRowsHtml}</div>
    </div>

    ${previewHtml}
  `;
}

function sentenceLessonIntroHtml(lesson) {
  const rows = getSentenceLessonRows(lesson);
  const firstRow = rows[0];
  const examples = rows.slice(0, 6).map((row) => `
    <div class="study-row" data-ss-preview-speak="${escapeHtml(row.voiceText || row.korean)}">
      <div>
        <div class="study-row-ko" lang="ko">${escapeHtml(row.korean)}</div>
        <div class="study-row-sub">${escapeHtml(row.english)}</div>
      </div>
      <span class="pill muted">Hear</span>
    </div>
  `).join("");
  const tagTips = (lesson.patternTags || [])
    .map((tag) => PATTERN_TAG_INFO[tag])
    .filter(Boolean)
    .slice(0, 4)
    .map((tip) => `<li>${escapeHtml(tip)}</li>`)
    .join("");
  return `
    <div class="card sentence-lesson-intro">
      <div class="word-card-progress-row">
        <div class="word-card-progress-tile"><div class="eyebrow">Lesson overview</div><div class="word-card-progress-track" aria-hidden="true"><span style="width:0%;"></span></div></div>
        ${firstRow ? `<button class="button secondary compact word-card-bank-button" type="button" data-ss-preview-reference="${escapeHtml(firstRow.id)}">📚 Reference</button>` : ""}
      </div>
      <div class="eyebrow sentence-lesson-kind">Pattern lesson</div>
      <h2 class="screen-title" style="margin-bottom:8px;">${escapeHtml(getSentenceLessonDisplayTitle(lesson))}</h2>
      <div class="screen-sub" style="margin-bottom:12px;">${escapeHtml(lesson.concept || "")}</div>
      ${tagTips ? `<ul class="ss-tip-list">${tagTips}</ul>` : ""}
      <div class="word-card-actions word-card-nav-actions" style="margin-top:12px;">
        <button class="button secondary compact" type="button" data-ss-lesson-close>Back</button>
        <button class="button primary compact" type="button" data-ss-lesson-start="${escapeHtml(lesson.id)}">Start lesson</button>
      </div>
    </div>
    <div class="card">
      <div class="eyebrow mb-12">Examples</div>
      <div class="study-list">${examples}</div>
    </div>
  `;
}

function sentenceStudyHtml(session) {
  const studyRows = session.studyRows || session.rows;
  const row = studyRows[session.studyIndex];
  const total = studyRows.length;
  return `
    <div class="card word-card sent-session" id="sentenceSessionRoot" data-lesson-motion-root>
      ${sentenceSessionProgressHtml(session.studyIndex + 1, total, "Listen and shadow")}
      <h2 class="screen-title" style="margin-bottom:8px;">Say the line out loud</h2>
      <div class="word-card-ko-tile">
        <button class="sent-card-ko" type="button" lang="ko" data-sentence-play aria-label="Hear ${escapeHtml(row.korean)}">
          <span class="word-card-ko-main">${escapeHtml(row.korean)}</span>
          <span class="word-card-ko-rom">${escapeHtml(approximateSentenceRomanization(row.voiceText || row.korean))}</span>
        </button>
        <button class="word-card-ko-play" type="button" lang="ko" data-sentence-play aria-label="Play ${escapeHtml(row.korean)}">▶</button>
      </div>
      <div class="screen-sub" style="margin:14px 0;">${escapeHtml(row.english)}</div>
      <div class="word-card-actions word-card-nav-actions">
        <button class="button secondary compact" type="button" data-sentence-exit>Exit</button>
        <button class="button primary compact" type="button" data-sentence-study-next>${session.studyIndex + 1 >= total ? "Start practice" : "Next line"}</button>
      </div>
    </div>
  `;
}

function sentenceSessionProgressHtml(current, total, label = "Line", allowReference = false) {
  const safeTotal = Math.max(1, Number(total) || 1);
  const safeCurrent = Math.min(safeTotal, Math.max(1, Number(current) || 1));
  const progressPct = Math.round((safeCurrent / safeTotal) * 100);
  return `
    <div class="word-card-progress-row">
      <div class="word-card-progress-tile">
        <div class="eyebrow">${escapeHtml(label)} · ${safeCurrent} of ${safeTotal}</div>
        <div class="word-card-progress-track" aria-hidden="true"><span style="width:${progressPct}%;"></span></div>
      </div>
      ${allowReference ? '<button class="button secondary compact word-card-bank-button" type="button" data-sentence-reference>📚 Reference</button>' : ""}
    </div>
  `;
}

function sentencePatternPillsHtml(row) {
  return (row.patternTags || [])
    .map((tag) => `<span class="pill muted sentence-pattern-pill">${escapeHtml(tag)}</span>`)
    .join("");
}

function sentenceModeMetaHtml(row, modeLabel) {
  const pills = sentencePatternPillsHtml(row);
  return `<div class="word-card-definition sentence-mode-meta">
    ${pills ? `<div class="sentence-pattern-pills">${pills}</div><span aria-hidden="true">|</span>` : ""}
    <span>${escapeHtml(modeLabel)}</span>
  </div>`;
}

function sentencePromptTileHtml(content, className = "") {
  return `<div class="word-card-heading"><div class="word-card-ko-tile sentence-prompt-tile ${className}">${content}</div></div>`;
}

function sentenceSessionDotsHtml(session) {
  return `<div class="ss-dots">${session.rows
    .map((row, i) => {
      if (i < session.results.length) {
        return `<span class="ss-dot ${session.results[i].correct ? "correct" : "wrong"}"></span>`;
      }
      return `<span class="ss-dot ${i === session.index ? "current" : ""}"></span>`;
    })
    .join("")}</div>`;
}

function sentenceAnswerBoxHtml(session, placeholder, helperHtml = "", includeReveal = true) {
  const prefix = session.lockedPrefix
    ? `<div class="ss-locked-prefix" lang="ko"><span>Hinted start</span>${escapeHtml(session.lockedPrefix)}</div>`
    : "";
  const revealButton = includeReveal
    ? `<button class="button secondary compact" type="button" data-sentence-reveal>Show answer</button>`
    : "";
  return `
    <div class="word-type-box sent-type-box sent-typing-shell">
      ${prefix}
      <div class="word-input-wrap">
        <input class="sentence-input" id="ssTypedInput" type="text" autocomplete="off" autocapitalize="off"
          spellcheck="false" placeholder="${escapeHtml(placeholder)}" value="${escapeHtml(session.typed)}" lang="ko" data-sentence-input />
        <button class="word-input-erase" type="button" data-sentence-helper-erase aria-label="Delete last block">⌫</button>
      </div>
      <div class="sent-input-hint">No Korean keyboard? Use the Word bank below.</div>
      <div class="word-type-feedback sent-live-feedback" role="status" aria-live="polite">${session.attempts
        ? `<strong>Not yet.</strong> Try again, or reveal it. <span class="fs-xs">(Spacing and punctuation don't count against you.)</span>`
        : ""}</div>
    </div>
    ${helperHtml}
    <div class="word-card-actions word-card-nav-actions">
      <button class="button secondary compact" type="button" data-sentence-exit>Exit</button>
      <button class="button primary compact" type="button" data-sentence-check>Check</button>
    </div>
    ${revealButton ? `<div class="word-card-actions" style="margin-top: 8px; justify-content: center;">${revealButton}</div>` : ""}
  `;
}

function sentenceHelperTipHtml(row) {
  const tags = Array.isArray(row.patternTags) ? row.patternTags : [];
  const tagTips = tags
    .map((tag) => PATTERN_TAG_INFO[tag])
    .filter(Boolean)
    .slice(0, 4)
    .map((tip) => `<li>${escapeHtml(tip)}</li>`)
    .join("");
  const grammarTip = row.grammarTip
    ? `<li>${escapeHtml(row.grammarTip)}</li>`
    : "";
  const sourceNote = row.annotationSource && row.annotationSource.patternTags === "explicit"
    ? ""
    : `<div class="fs-xs text-muted-2" style="margin-top:6px;">These are things to check for while the sentence tags are still being curated.</div>`;
  return `
    <div class="ss-helper-panel">
      <div class="ss-helper-title">Tip</div>
      <ul class="ss-tip-list">${tagTips || grammarTip ? tagTips + grammarTip : "<li>Start with the main noun, then find the ending that makes the sentence polite.</li>"}</ul>
      ${sourceNote}
    </div>
  `;
}

function getSentenceHelperTilePool(session, row) {
  if (!session.helperTilePool.length) {
    session.helperTilePool = makeSentenceTokenPool(row.tokens || tokenizeSentence(row.korean), 5)
      .map((tile) => tile.text)
      .filter(Boolean);
  }
  return session.helperTilePool;
}

function sentenceWordBankHelperHtml(session, row) {
  const tiles = getSentenceHelperTilePool(session, row)
    .map((tile) => `<button class="word-tile" type="button" data-sentence-helper-tile="${escapeHtml(tile)}" lang="ko">${escapeHtml(tile)}</button>`)
    .join("");
  return `
    <div class="ss-helper-panel">
      <div class="ss-helper-title">Word bank</div>
      <div class="word-tile-row">${tiles}
        <button class="word-tile word-tile-erase" type="button" data-sentence-helper-erase aria-label="Delete last Korean block">⌫</button>
      </div>
    </div>
  `;
}

function sentenceHelperLadderHtml(session, row) {
  if (sentenceQuestionMode(session) !== "translate") return "";
  const helperButtons = [
    { id: "tip", label: "Tip", disabled: false },
    { id: "wordBank", label: "Word bank", disabled: session.helperLevel >= 2 },
    { id: "nextChunk", label: "Next chunk", disabled: session.revealedTokenCount >= (row.tokens || []).length },
    { id: "reveal", label: "Reveal", disabled: false },
  ].map((helper) => `
    <button class="button secondary compact" type="button" data-sentence-helper="${helper.id}" ${helper.disabled ? "disabled" : ""}>${escapeHtml(helper.label)}</button>
  `).join("");
  return `
    <div class="ss-helper-ladder" aria-label="Translate helpers">
      <div class="word-card-actions ss-helper-actions">${helperButtons}</div>
      ${session.helperLevel >= 2 ? sentenceWordBankHelperHtml(session, row) : ""}
    </div>
  `;
}

function sentenceQuestionHtml(session) {
  const row = session.rows[session.index];
  const mode = sentenceQuestionMode(session);

  let innerContent = "";

  if (mode === "transform") {
    const transform = getSentenceTransformForSessionRow(session, row);
    if (!transform) {
      innerContent = `
        ${sentenceSessionProgressHtml(session.index + 1, session.rows.length)}
        <div class="screen-sub" style="margin: 20px 0 12px;">No transform candidate was available for this sentence.</div>
        <div class="word-card-actions word-card-nav-actions">
          <button class="button secondary compact" type="button" data-sentence-exit>Exit</button>
          <button class="button primary compact" type="button" data-sentence-reveal>Skip</button>
        </div>
      `;
    } else {
      const tiles = (session.helperTilePool || [])
        .map((tile) => `<button class="word-tile" type="button" data-sentence-helper-tile="${escapeHtml(tile)}" lang="ko">${escapeHtml(tile)}</button>`)
        .join("");
      innerContent = `
        ${sentenceSessionProgressHtml(session.index + 1, session.rows.length)}
        <div class="word-card-heading">
          <div class="word-card-ko-tile">
            <button class="sent-card-ko" type="button" lang="ko" data-sentence-play aria-label="Hear ${escapeHtml(row.korean)}">
              <span class="word-card-ko-main">${escapeHtml(row.korean)}</span>
              <span class="word-card-ko-rom">${escapeHtml(approximateSentenceRomanization(row.korean))}</span>
            </button>
            <button class="word-card-ko-play" type="button" lang="ko" data-sentence-play aria-label="Play ${escapeHtml(row.korean)}" title="Play Hangul">▶</button>
          </div>
        </div>
        ${sentenceModeMetaHtml(row, "Transform")}
        <div class="screen-sub" style="margin-bottom:12px;">${escapeHtml(transform.prompt)} for <strong lang="ko">${escapeHtml(transform.sourceSurface)}</strong>.</div>
        ${sentenceAnswerBoxHtml(session, "Type the transformed Korean sentence", `
          <div class="ss-helper-panel">
            <div class="ss-helper-title">Word bank</div>
            <div class="word-tile-row">${tiles}</div>
          </div>
        `)}
      `;
    }
  } else if (mode === "shadow") {
    const speech = session.speech || {};
    const speechRecognitionSupported = Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
    const speechPassed = Boolean(speech.score && speech.score.segmental >= 75);
    const scoreHtml = speech.score
      ? `<div class="ss-helper-panel">${speakingScoreHtml(row.korean, speech.transcript || "", speech.score)}</div>`
      : speech.status
        ? `<div class="ss-helper-panel"><div class="ss-helper-title">Speech scoring</div><div class="screen-sub" style="margin-bottom:0;">${escapeHtml(speech.status)}</div></div>`
        : "";
    const words = (row.sourceWordIds || []).map(id => curatedWordsById.get(id)).filter(Boolean);
    const soundNotes = words.map(w => w.soundNote).filter(Boolean);
    const soundNoteHtml = soundNotes.length
      ? `<div class="ss-sound-note-panel" style="margin: 8px 0; padding: 10px; border-radius: var(--radius-xs); background: rgba(91,157,255,.08); border-left: 3px solid var(--accent); font-size: 0.9rem;">
           <div style="font-weight: bold; margin-bottom: 4px; color: var(--accent);">Pronunciation Note</div>
           ${soundNotes.map(note => `<div class="screen-sub" style="margin-bottom: 0; color: var(--text);">${escapeHtml(note)}</div>`).join("")}
         </div>`
      : "";
    const promptPulse = session.showRepeatPrompt
      ? `<div class="ss-repeat-prompt pulsing" style="margin: 12px 0; font-weight: bold; color: var(--accent); text-align: center; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; gap: 8px;">
           <span style="animation: flash-pulse .72s infinite;">🎙️</span> Repeat aloud now!
         </div>`
      : `<div class="ss-repeat-prompt" style="margin: 12px 0; color: var(--text-muted); text-align: center; font-size: 0.95rem; opacity: 0.6;">
           Listening to the pronunciation...
         </div>`;
    const shadowActions = speech.score
      ? `<div class="word-card-actions word-card-nav-actions">
          <button class="button ${speechPassed ? "primary" : "secondary"} compact" type="button" data-sentence-selfmark="${speechPassed ? "correct" : "incorrect"}">${speechPassed ? "Continue" : "Mark for practice"}</button>
        </div>`
      : !speechRecognitionSupported && session.showRepeatPrompt
        ? `<div class="word-card-actions word-card-nav-actions">
            <button class="button secondary compact" type="button" data-sentence-selfmark="incorrect">Repeat again later</button>
            <button class="button primary compact" type="button" data-sentence-selfmark="correct">I repeated it</button>
          </div>`
        : `<div class="screen-sub" style="margin:10px 0 0;text-align:center;">${session.showRepeatPrompt ? "Record your repetition to check it without revealing the line." : "Listen first; the Korean stays hidden until you attempt it."}</div>`;
    innerContent = `
      ${sentenceSessionProgressHtml(session.index + 1, session.rows.length)}
      <div class="ss-shadow-listen-hero" aria-label="Hidden Korean shadow prompt">
        <span class="ss-shadow-listen-icon" aria-hidden="true">🎧</span>
        <strong>Listen, then repeat from memory</strong>
        <span>The written Korean appears only after your attempt.</span>
      </div>
      ${sentenceModeMetaHtml(row, row.english)}
      ${speech.score ? soundNoteHtml : ""}
      ${promptPulse}
      <div class="word-card-actions word-card-audio-actions">
        <button class="button secondary compact" type="button" data-sentence-play>▶ Play</button>
        <button class="button secondary compact" type="button" data-sentence-slow>↻ Slow replay</button>
        <button class="button secondary compact" type="button" data-sentence-record>${speech.listening ? "Listening..." : "🎙️ Record attempt"}</button>
      </div>
      ${scoreHtml}
      ${shadowActions}
    `;
  } else if (mode === "translate") {
    innerContent = `
      ${sentenceSessionProgressHtml(session.index + 1, session.rows.length)}
      ${sentencePromptTileHtml(`<div class="sentence-prompt-text">${escapeHtml(row.english)}</div>`, "is-english")}
      ${sentenceModeMetaHtml(row, "Translate & Type")}
      ${sentenceAnswerBoxHtml(session, "한국어로 써 보세요", sentenceHelperLadderHtml(session, row), false)}
    `;
  } else if (mode === "build") {
    const built = session.builtTiles
      .map((poolIndex, orderIndex) =>
        `<button class="word-tile" type="button" data-sentence-built="${orderIndex}" lang="ko">${escapeHtml(session.tilePool[poolIndex])}</button>`)
      .join("");
    const pool = session.tilePool
      .map((tile, poolIndex) => {
        const usedAlready = session.builtTiles.includes(poolIndex);
        return `<button class="word-tile" type="button" data-sentence-tile="${poolIndex}" lang="ko" ${usedAlready ? "disabled" : ""}>${escapeHtml(tile)}</button>`;
      })
      .join("");
    innerContent = `
      ${sentenceSessionProgressHtml(session.index + 1, session.rows.length)}
      ${sentencePromptTileHtml(`<div class="sentence-prompt-text">${escapeHtml(row.english)}</div>`, "is-english")}
      ${sentenceModeMetaHtml(row, "Word Builder")}
      <div class="ss-build-answer" style="margin: 16px 0; min-height: 48px; padding: 10px; border-radius: 12px; border: 1px dashed var(--line); display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; align-items: center;">
        ${built || `<span class="fs-xs text-muted-2">Your sentence appears here</span>`}
      </div>
      <div class="word-tile-row">${pool}</div>
      <div class="word-type-feedback" role="status" aria-live="polite" style="min-height: 20px; font-size: 0.85rem; margin-top: 8px;">
        ${session.attempts ? "<strong>Not yet.</strong> Check the word order — tap a placed word to remove it." : ""}
      </div>
      <div class="word-card-actions word-card-nav-actions">
        <button class="button secondary compact" type="button" data-sentence-exit>Exit</button>
        <button class="button primary compact" type="button" data-sentence-check ${session.builtTiles.length ? "" : "disabled"}>Check</button>
      </div>
      <div class="word-card-actions" style="margin-top: 8px; justify-content: center;">
        <button class="button secondary compact" type="button" data-sentence-reveal>Show answer</button>
      </div>
    `;
  } else {
    // listen (dictation)
    innerContent = `
      ${sentenceSessionProgressHtml(session.index + 1, session.rows.length)}
      ${sentencePromptTileHtml('<span class="sentence-listen-glyph" aria-hidden="true">♪</span>', "is-listening")}
      ${sentenceModeMetaHtml(row, "Dictation")}
      <div class="word-card-actions word-card-audio-actions">
        <button class="button secondary compact" type="button" data-sentence-play>▶ Play sentence</button>
      </div>
      ${sentenceAnswerBoxHtml(session, "들리는 대로 써 보세요")}
    `;
  }

  return `
    <div class="card word-card sent-session" id="sentenceSessionRoot" data-lesson-motion-root data-ss-id="${row.id}">
      ${innerContent}
    </div>
  `;
}

function sentenceFeedbackHtml(session) {
  const row = session.rows[session.index];
  const result = session.results[session.index];
  const attempt = session.typed;
  const mode = result.mode || sentenceQuestionMode(session);
  const transform = mode === "transform" ? getSentenceTransformForSessionRow(session, row) : null;
  const targetRow = transform ? { ...row, korean: transform.expected, tokens: transform.tokens } : row;
  const answerText = transform ? transform.expected : row.korean;

  const diff = !result.correct && attempt && mode !== "build" && mode !== "shadow"
    ? `<div class="fs-xs text-muted-2" style="margin:10px 0 4px;">You typed: <span lang="ko">${escapeHtml(attempt)}</span></div>
       <div class="ss-diff">${sentenceTokenDiffHtml(targetRow, attempt)}</div>`
    : "";

  let feedbackActions = "";
  if (result.correct) {
    feedbackActions = `
      <div class="word-rating-prompt">
        <div class="word-rating-label">How did it feel?</div>
        <div class="word-rating-actions">
          <button class="word-rating-button word-rating-hard" type="button" data-sentence-rate="hard">Hard</button>
          <button class="word-rating-button word-rating-known" type="button" data-sentence-rate="known">Known</button>
        </div>
      </div>
    `;
  } else {
    feedbackActions = `
      <div class="word-card-actions word-card-nav-actions">
        <button class="button secondary compact" type="button" data-sentence-exit>Exit</button>
        <button class="button primary compact" type="button" data-sentence-next>${session.index + 1 >= session.rows.length ? "Finish" : "Next"}</button>
      </div>
    `;
  }

  return `
    <div class="card word-card sent-session" id="sentenceSessionRoot" data-lesson-motion-root data-ss-id="${row.id}">
      ${sentenceSessionProgressHtml(session.index + 1, session.rows.length, "Feedback")}

      <div class="word-card-heading">
        <div class="word-card-ko-tile">
          <button class="sent-card-ko" type="button" lang="ko" data-sentence-play aria-label="Hear ${escapeHtml(answerText)}">
            <span class="word-card-ko-main">${escapeHtml(answerText)}</span>
            <span class="word-card-ko-rom">${escapeHtml(approximateSentenceRomanization(targetRow.voiceText || targetRow.korean))}</span>
          </button>
          <button class="word-card-ko-play" type="button" lang="ko" data-sentence-play aria-label="Play ${escapeHtml(answerText)}" title="Play Hangul">▶</button>
        </div>
      </div>

      ${sentenceModeMetaHtml(row, row.english)}

      <div class="ss-result ${result.correct ? "ss-result-good" : "ss-result-bad"}" style="margin: 14px 8px 4px; font-weight: bold; color: ${result.correct ? "var(--accent-2)" : "var(--accent-4)"};">
        ${result.correct ? "잘했어요! Nice." : "Here's the sentence:"}
      </div>

      ${diff}

      <div class="word-card-actions word-card-audio-actions">
        <button class="button secondary compact" type="button" data-sentence-play>▶ Hear it</button>
        <button class="button secondary compact" type="button" data-sentence-slow>↻ Hear it slow</button>
      </div>

      ${feedbackActions}
    </div>
  `;
}

function sentenceSummaryHtml(session) {
  const correct = session.results.filter((r) => r.correct).length;
  const lesson = session.lessonId ? getSentenceLessonById(session.lessonId) : null;
  const isCheckpoint = lesson?.type === "checkpoint";
  const requiredPct = Number(lesson?.pass?.minFirstTryPct || 75);
  const firstTryCorrect = session.results.filter((r) => r.firstTry).length;
  const firstTryPct = session.rows.length ? Math.round((firstTryCorrect / session.rows.length) * 100) : 0;
  const lessonPassed = Boolean(session.lessonId) && firstTryPct >= requiredPct;
  const resultEyebrow = isCheckpoint && lessonPassed
    ? "Checkpoint complete"
    : session.lessonId
      ? `${getSentenceLessonDisplayTitle(lesson)} ${lessonPassed ? "complete" : "— almost"}`
      : "Session complete";
  const resultTitle = isCheckpoint && lessonPassed
    ? "Unit crowned"
    : session.lessonId
      ? lessonPassed ? "Lesson complete" : isCheckpoint ? "Checkpoint not passed yet" : "Good try — review and retry"
      : `${firstTryCorrect} of ${session.rows.length} first try`;
  const resultCopy = session.lessonId
    ? lessonPassed
      ? isCheckpoint
        ? "Unit check passed. This unit is complete, and its next line is ready on the path."
        : "You passed on first-try accuracy. Keep the line moving."
      : isCheckpoint
        ? `This checkpoint was not passed yet. You need ${requiredPct}% first-try accuracy, and these lines are saved for review.`
        : `You need ${requiredPct}% first-try accuracy to pass. Missed lines are saved for review.`
    : correct === session.rows.length
      ? "Perfect run. These sentences will come back less often."
      : "Missed lines are saved for review.";
  const rowsHtml = session.rows
    .map((row, i) => `
      <div class="study-row" data-sentence-preview-speak="${escapeHtml(row.voiceText || row.korean)}" style="cursor: pointer;">
        <div>
          <div class="study-row-ko" lang="ko">${escapeHtml(row.korean)}</div>
          <div class="study-row-sub">${escapeHtml(row.english)}</div>
        </div>
        <span class="pill ${session.results[i].correct ? "accent" : "muted"}">${session.results[i].correct ? "✓" : "✗"}</span>
      </div>
    `)
    .join("");
  const summaryActions = session.lessonId
    ? lessonPassed
      ? `<button class="button secondary compact" type="button" data-sentence-again>Practice again</button>
         <button class="button primary compact" type="button" data-sentence-exit>Back to lessons</button>`
      : `<button class="button secondary compact" type="button" data-sentence-lesson-back="${escapeHtml(session.lessonId)}">Review concept</button>
         <button class="button primary compact" type="button" data-sentence-again>Retry lesson</button>`
    : `<button class="button secondary compact" type="button" data-sentence-exit>Back to Practice</button>
       <button class="button primary compact" type="button" data-sentence-again>Practice again</button>`;
  return premiumCompletionHtml({
    id: "sentenceSessionRoot",
    tone: session.lessonId ? (lessonPassed ? (isCheckpoint ? "crown" : "success") : "retry") : "neutral",
    icon: session.lessonId ? (lessonPassed ? (isCheckpoint ? "crown" : "check") : "retry") : "spark",
    eyebrow: resultEyebrow,
    title: resultTitle,
    copy: resultCopy,
    score: { value: `${firstTryPct}%`, label: "First-try accuracy" },
    stats: [
      { value: `${firstTryCorrect}/${session.rows.length}`, label: "First try" },
      { value: `${correct}/${session.rows.length}`, label: "Correct" },
    ],
    detailsHtml: `<details class="sentence-summary-details">
      <summary><span>Review the ${session.rows.length} lines</span><span class="pill muted">${correct}/${session.rows.length}</span></summary>
      <div class="study-list">${rowsHtml}</div>
    </details>`,
    actionsHtml: summaryActions,
    className: `word-card sent-session ${isCheckpoint && lessonPassed ? "word-checkpoint-crowned" : ""}`,
    celebrate: Boolean(session.lessonId ? lessonPassed : correct === session.rows.length),
  });
}

// --- Sentence Studio: render + events ---------------------------------------

function renderPracticeView() {
  const el = document.getElementById("screen-speak");
  if (!el) return;
  refreshProgressionState();
  currentQuizScope = "sentences";
  state.studio = "sentences";

  if (!sentenceStudioSession && state.sentenceLessonSession) {
    sentenceStudioSession = rehydrateSentenceLessonSession(state.sentenceLessonSession);
  }

  if (!isStudioUnlocked("sentences")) {
    sentenceStudioSession = null;
    el.innerHTML = sentenceStudioLockedHtml();
  } else if (sentenceLessonView) {
    const lesson = getSentenceLessonById(sentenceLessonView.lessonId);
    el.innerHTML = lesson ? sentenceLessonIntroHtml(lesson) : sentenceStudioHubHtml();
  } else if (!sentenceStudioSession) {
    el.innerHTML = sentenceStudioHubHtml();
  } else if (sentenceStudioSession.phase === "study") {
    el.innerHTML = sentenceStudyHtml(sentenceStudioSession);
  } else if (sentenceStudioSession.phase === "question") {
    el.innerHTML = sentenceQuestionHtml(sentenceStudioSession);
  } else if (sentenceStudioSession.phase === "feedback") {
    el.innerHTML = sentenceFeedbackHtml(sentenceStudioSession);
  } else {
    el.innerHTML = sentenceSummaryHtml(sentenceStudioSession);
  }

  bindSentenceStudioEvents(el);

  const session = sentenceStudioSession;
  if (session) {
    const frameIndex = session.phase === "study" ? session.studyIndex : session.index;
    const order = session.phase === "study"
      ? 100 + session.studyIndex
      : session.phase === "question"
        ? 1000 + session.index * 2
        : session.phase === "feedback"
          ? 1001 + session.index * 2
          : 2000;
    animateLessonFrame(el.querySelector("#sentenceSessionRoot"), "sentence", {
      key: `${session.phase}:${frameIndex}`,
      order,
      phase: session.phase,
      complete: session.phase === "summary",
    });
  }
  if (session && session.phase === "study" && !session.autoPlayed) {
    session.autoPlayed = true;
    const row = (session.studyRows || session.rows)[session.studyIndex];
    speak(row.voiceText || row.korean);
  } else if (session && session.phase === "question" && !session.autoPlayed) {
    const qMode = sentenceQuestionMode(session);
    if (qMode === "listen") {
      session.autoPlayed = true;
      const row = session.rows[session.index];
      speak(row.voiceText || row.korean);
    } else if (qMode === "shadow") {
      session.autoPlayed = true;
      session.showRepeatPrompt = false;
      const row = session.rows[session.index];
      speak(row.voiceText || row.korean);
      const t1 = setTimeout(() => {
        if (sentenceStudioSession && sentenceStudioSession === session && session.phase === "question") {
          speakSentenceSlow(row.voiceText || row.korean);
        }
      }, 2500);
      const t2 = setTimeout(() => {
        if (sentenceStudioSession && sentenceStudioSession === session && session.phase === "question") {
          session.showRepeatPrompt = true;
          renderPracticeView();
        }
      }, 5500);
      session.timeouts = [t1, t2];
    }
  }
}

function submitSentenceAnswer() {
  const session = sentenceStudioSession;
  if (!session || session.phase !== "question") return;
  const row = session.rows[session.index];
  const mode = sentenceQuestionMode(session);

  let attempt = session.typed;
  if (mode === "build") {
    attempt = session.builtTiles.map((poolIndex) => session.tilePool[poolIndex]).join(" ");
    session.typed = attempt; // so feedback can echo it
  }
  if (!normalizeKoreanAnswer(attempt, { ignoreSpaces: true })) return;

  if (mode === "transform") {
    const transform = getSentenceTransformForSessionRow(session, row);
    if (!transform) return;
    const correct = normalizeKoreanAnswer(attempt, { ignoreSpaces: true }) === normalizeKoreanAnswer(transform.expected, { ignoreSpaces: true });
    if (correct) {
      finishSentenceQuestion(true, false, { transformId: transform.id });
    } else {
      session.attempts += 1;
      renderPracticeView();
    }
    return;
  }

  if (checkSentenceAnswer(row, attempt)) {
    finishSentenceQuestion(true);
  } else {
    session.attempts += 1;
    renderPracticeView();
  }
}

function appendSentenceTypedToken(session, token) {
  const clean = String(token || "").trim();
  if (!clean) return;
  const current = String(session.typed || "").trimEnd();
  session.typed = current ? `${current} ${clean}` : clean;
}

function updateSentenceLockedPrefix(session) {
  const row = session.rows[session.index];
  const tokens = row.tokens || tokenizeSentence(row.korean);
  const shown = tokens.slice(0, session.revealedTokenCount).join(" ");
  session.lockedPrefix = shown && session.revealedTokenCount < tokens.length ? `${shown} ` : shown;
  if (session.lockedPrefix && !String(session.typed || "").startsWith(session.lockedPrefix)) {
    session.typed = session.lockedPrefix;
  }
}

let sentenceOverlayEscapeHandler = null;

function closeSentenceOverlay() {
  const overlay = document.querySelector("[data-sentence-overlay]");
  if (overlay) overlay.remove();
  if (sentenceOverlayEscapeHandler) {
    document.removeEventListener("keydown", sentenceOverlayEscapeHandler);
    sentenceOverlayEscapeHandler = null;
  }
}

function handleSentenceOverlayEscape(event) {
  if (event.key === "Escape") {
    closeSentenceOverlay();
  }
}

function openSentenceTipOverlay(row) {
  closeSentenceOverlay();
  const overlay = document.createElement("div");
  overlay.className = "word-example-overlay";
  overlay.dataset.sentenceOverlay = "true";

  const tags = Array.isArray(row.patternTags) ? row.patternTags : [];
  const tagTips = tags
    .map((tag) => PATTERN_TAG_INFO[tag])
    .filter(Boolean)
    .slice(0, 4)
    .map((tip) => `<li>${escapeHtml(tip)}</li>`)
    .join("");
  const grammarTip = row.grammarTip ? `<li>${escapeHtml(row.grammarTip)}</li>` : "";
  const tipContent = tagTips || grammarTip ? tagTips + grammarTip : "<li>Start with the main noun, then find the ending that makes the sentence polite.</li>";

  overlay.innerHTML = `
    <div class="word-example-dialog" role="dialog" aria-modal="true">
      <button class="word-example-close" type="button" data-sentence-overlay-close aria-label="Close dialog">×</button>
      <div class="eyebrow" style="margin-bottom: 12px;">Grammar Tips</div>
      <ul class="ss-tip-list" style="text-align: left; padding-left: 20px; font-size: 0.95rem; line-height: 1.5; color: var(--text);">${tipContent}</ul>
    </div>
  `;
  document.body.appendChild(overlay);
  sentenceOverlayEscapeHandler = handleSentenceOverlayEscape;
  document.addEventListener("keydown", sentenceOverlayEscapeHandler);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target.closest("[data-sentence-overlay-close]")) {
      closeSentenceOverlay();
    }
  });
}

function openSentenceReferenceOverlay(row) {
  if (!row) return;
  closeSentenceOverlay();
  const overlay = document.createElement("div");
  overlay.className = "word-example-overlay";
  overlay.dataset.sentenceOverlay = "true";
  const tips = (row.patternTags || [])
    .map((tag) => PATTERN_TAG_INFO[tag])
    .filter(Boolean)
    .slice(0, 3)
    .map((tip) => `<li>${escapeHtml(tip)}</li>`)
    .join("");

  overlay.innerHTML = `
    <div class="word-example-dialog sentence-reference-dialog" role="dialog" aria-modal="true" aria-labelledby="sentenceReferenceTitle">
      <button class="word-example-close" type="button" data-sentence-overlay-close aria-label="Close reference">×</button>
      <div class="eyebrow" id="sentenceReferenceTitle">Sentence reference</div>
      <button class="word-example-dialog-ko sentence-reference-korean" type="button" lang="ko" data-sentence-reference-play>${escapeHtml(row.korean)}</button>
      <div class="word-example-dialog-en">${escapeHtml(row.english)}</div>
      <div class="sentence-pattern-pills sentence-reference-patterns">${sentencePatternPillsHtml(row)}</div>
      ${tips ? `<div class="sentence-reference-tip"><div class="ss-helper-title">What to notice</div><ul class="ss-tip-list">${tips}</ul></div>` : ""}
      <button class="button primary compact sentence-reference-hear" type="button" data-sentence-reference-play>▶ Hear sentence</button>
    </div>
  `;
  document.body.appendChild(overlay);
  sentenceOverlayEscapeHandler = handleSentenceOverlayEscape;
  document.addEventListener("keydown", sentenceOverlayEscapeHandler);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target.closest("[data-sentence-overlay-close]")) {
      closeSentenceOverlay();
      return;
    }
    if (event.target.closest("[data-sentence-reference-play]")) {
      void speak(row.voiceText || row.korean);
    }
  });
}

function openSentenceSlowOverlay(row) {
  closeSentenceOverlay();
  const overlay = document.createElement("div");
  overlay.className = "word-example-overlay";
  overlay.dataset.sentenceOverlay = "true";

  overlay.innerHTML = `
    <div class="word-example-dialog" role="dialog" aria-modal="true">
      <button class="word-example-close" type="button" data-sentence-overlay-close aria-label="Close dialog">×</button>
      <div class="eyebrow" style="margin-bottom: 12px;">Slow Replay</div>
      <button class="sent-card-ko" style="text-align: center; border-radius: 8px;" type="button" lang="ko" data-sentence-slow-play-btn aria-label="Play slow">${escapeHtml(row.korean)}</button>
      <div class="word-example-dialog-en" style="margin-top: 12px;">${escapeHtml(row.english)}</div>
      <button class="button primary compact" style="margin-top: 20px;" type="button" data-sentence-slow-play-btn>▶ Play slow</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const playSlow = () => void speakSentenceSlow(row.voiceText || row.korean);
  sentenceOverlayEscapeHandler = handleSentenceOverlayEscape;
  document.addEventListener("keydown", sentenceOverlayEscapeHandler);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target.closest("[data-sentence-overlay-close]")) {
      closeSentenceOverlay();
      return;
    }
    if (event.target.closest("[data-sentence-slow-play-btn]")) {
      playSlow();
    }
  });
  playSlow();
}

function useSentenceHelper(helper) {
  const session = sentenceStudioSession;
  if (!session || session.phase !== "question" || sentenceQuestionMode(session) !== "translate") return;
  const row = session.rows[session.index];
  if (helper === "tip") {
    session.helperLevel = Math.max(session.helperLevel, 1);
    markSentenceHelperUsed("tip");
    openSentenceTipOverlay(row);
  } else if (helper === "wordBank") {
    session.helperLevel = Math.max(session.helperLevel, 2);
    markSentenceHelperUsed("wordBank");
  } else if (helper === "nextChunk") {
    const tokens = row.tokens || tokenizeSentence(row.korean);
    if (session.revealedTokenCount < tokens.length) {
      session.helperLevel = Math.max(session.helperLevel, 3);
      session.revealedTokenCount += 1;
      updateSentenceLockedPrefix(session);
      markSentenceHelperUsed("nextChunk");
    }
  } else if (helper === "reveal") {
    finishSentenceQuestion(false, true);
    persistSentenceLessonSession();
    return;
  }
  persistSentenceLessonSession();
  renderPracticeView();
}

function speakSentenceSlow(text) {
  stopSpeech();
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance !== "function") {
    return speak(text);
  }
  const utterance = new SpeechSynthesisUtterance(text);
  const koreanVoice = getPreferredKoreanVoice();
  utterance.lang = koreanVoice?.lang || "ko-KR";
  utterance.rate = Math.max(0.45, SPEAK_RATE * 0.72);
  utterance.pitch = 1;
  if (koreanVoice) utterance.voice = koreanVoice;
  window.speechSynthesis.speak(utterance);
}

function clearSentenceSessionTimeouts() {
  const session = sentenceStudioSession;
  if (session && session.timeouts) {
    session.timeouts.forEach((tId) => clearTimeout(tId));
    session.timeouts = [];
  }
}

function startSentenceSpeechScoring() {
  const session = sentenceStudioSession;
  if (!session || session.phase !== "question" || sentenceQuestionMode(session) !== "shadow") return;
  const row = session.rows[session.index];
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  session.speech = { listening: false, status: "", transcript: "", score: null };
  if (!Recognition) {
    session.speech.status = "Speech scoring is not supported in this browser. You can still self-mark the shadow attempt.";
    renderPracticeView();
    return;
  }
  const recognition = new Recognition();
  const startedAt = performance.now();
  let transcript = "";
  recognition.lang = "ko-KR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = false;
  session.speech = { listening: true, status: "Listening...", transcript: "", score: null };
  renderPracticeView();
  recognition.onresult = (event) => {
    const first = event.results && event.results[0] && event.results[0][0];
    transcript = first ? first.transcript : "";
  };
  recognition.onerror = () => {
    session.speech = {
      listening: false,
      status: "Speech scoring could not hear a usable attempt. Try again, or self-mark.",
      transcript: "",
      score: null,
    };
    renderPracticeView();
  };
  recognition.onend = () => {
    if (!sentenceStudioSession || sentenceStudioSession !== session) return;
    const durationMs = performance.now() - startedAt;
    const score = scoreSpeechAttempt(row.voiceText || row.korean, transcript, durationMs);
    session.speech = {
      listening: false,
      status: "Analysis complete.",
      transcript,
      score,
    };
    renderPracticeView();
  };
  try {
    recognition.start();
  } catch (error) {
    session.speech = {
      listening: false,
      status: error && error.message ? error.message : "Speech scoring could not start.",
      transcript: "",
      score: null,
    };
    renderPracticeView();
  }
}

function bindSentenceSessionRoot(root) {
  if (!root) return;
  const session = sentenceStudioSession;
  if (!session) return;
  const row = session.rows[session.index];

  const input = root.querySelector("[data-sentence-input]");
  if (input && session.phase === "question" && !session.attempts) input.focus();

  // Keep all session interactions on one delegated root, so rerendering a
  // prompt never leaves stale input handlers behind.
  root.addEventListener("input", (event) => {
    const typedInput = event.target.closest("[data-sentence-input]");
    if (!typedInput || !root.contains(typedInput)) return;
    if (session.lockedPrefix && !typedInput.value.startsWith(session.lockedPrefix)) {
      const suffix = typedInput.value.replace(session.lockedPrefix, "");
      typedInput.value = session.lockedPrefix + suffix;
    }
    session.typed = typedInput.value;
    persistSentenceLessonSession();
  });
  root.addEventListener("keydown", (event) => {
    const typedInput = event.target.closest("[data-sentence-input]");
    if (!typedInput || !root.contains(typedInput) || event.key !== "Enter") return;
    event.preventDefault();
    submitSentenceAnswer();
    persistSentenceLessonSession();
  });

  root.addEventListener("click", (event) => {
    const referenceBtn = event.target.closest("[data-sentence-reference]");
    if (referenceBtn && root.contains(referenceBtn)) {
      openSentenceReferenceOverlay(row);
      return;
    }
    const speakBtn = event.target.closest("[data-speak]");
    if (speakBtn && root.contains(speakBtn)) {
      flashElement(speakBtn);
      void speak(speakBtn.dataset.speak || "");
      return;
    }
    const playBtn = event.target.closest("[data-sentence-play]");
    if (playBtn && root.contains(playBtn)) {
      clearSentenceSessionTimeouts();
      session.showRepeatPrompt = true;
      void speak(row.voiceText || row.korean);
      renderPracticeView();
      return;
    }
    const slowBtn = event.target.closest("[data-sentence-slow]");
    if (slowBtn && root.contains(slowBtn)) {
      clearSentenceSessionTimeouts();
      session.showRepeatPrompt = true;
      if (sentenceQuestionMode(session) === "shadow") speakSentenceSlow(row.voiceText || row.korean);
      else openSentenceSlowOverlay(row);
      renderPracticeView();
      return;
    }
    const recordBtn = event.target.closest("[data-sentence-record]");
    if (recordBtn && root.contains(recordBtn)) {
      clearSentenceSessionTimeouts();
      session.showRepeatPrompt = true;
      startSentenceSpeechScoring();
      return;
    }
    const selfmarkBtn = event.target.closest("[data-sentence-selfmark]");
    if (selfmarkBtn && root.contains(selfmarkBtn)) {
      const correct = selfmarkBtn.dataset.sentenceSelfmark === "correct";
      const speechScore = session.speech && session.speech.score ? session.speech.score : null;
      finishSentenceQuestion(correct, false, { speechScore });
      persistSentenceLessonSession();
      return;
    }
    const nextBtn = event.target.closest("[data-sentence-next]");
    if (nextBtn && root.contains(nextBtn)) {
      advanceSentenceSession();
      return;
    }
    const againBtn = event.target.closest("[data-sentence-again]");
    if (againBtn && root.contains(againBtn)) {
      if (session.lessonId) startSentenceLessonSession(session.lessonId);
      else startSentenceStudioSession(session.modeId);
      return;
    }
    const studyNextBtn = event.target.closest("[data-sentence-study-next]");
    if (studyNextBtn && root.contains(studyNextBtn)) {
      const studyRows = session.studyRows || session.rows;
      if (session.studyIndex + 1 < studyRows.length) {
        session.studyIndex += 1;
        session.autoPlayed = false;
      } else {
        session.index = 0;
        prepareSentenceQuestion();
      }
      persistSentenceLessonSession();
      renderPracticeView();
      return;
    }
    const exitBtn = event.target.closest("[data-sentence-exit]");
    if (exitBtn && root.contains(exitBtn)) {
      exitSentenceStudioSession();
      return;
    }
    const lessonBackBtn = event.target.closest("[data-sentence-lesson-back]");
    if (lessonBackBtn && root.contains(lessonBackBtn)) {
      sentenceStudioSession = null;
      openSentenceLesson(lessonBackBtn.dataset.sentenceLessonBack);
      return;
    }
    const checkBtn = event.target.closest("[data-sentence-check]");
    if (checkBtn && root.contains(checkBtn)) {
      submitSentenceAnswer();
      persistSentenceLessonSession();
      return;
    }
    const revealBtn = event.target.closest("[data-sentence-reveal]");
    if (revealBtn && root.contains(revealBtn)) {
      const meta = {};
      if (sentenceQuestionMode(session) === "transform") {
        const transform = getSentenceTransformForSessionRow(session, row);
        if (transform) meta.transformId = transform.id;
      }
      finishSentenceQuestion(false, true, meta);
      persistSentenceLessonSession();
      return;
    }
    const tileBtn = event.target.closest("[data-sentence-tile]");
    if (tileBtn && root.contains(tileBtn) && !tileBtn.disabled) {
      session.builtTiles.push(Number(tileBtn.dataset.sentenceTile));
      persistSentenceLessonSession();
      renderPracticeView();
      return;
    }
    const builtBtn = event.target.closest("[data-sentence-built]");
    if (builtBtn && root.contains(builtBtn)) {
      session.builtTiles.splice(Number(builtBtn.dataset.sentenceBuilt), 1);
      persistSentenceLessonSession();
      renderPracticeView();
      return;
    }
    const helperBtn = event.target.closest("[data-sentence-helper]");
    if (helperBtn && root.contains(helperBtn)) {
      useSentenceHelper(helperBtn.dataset.sentenceHelper);
      return;
    }
    const helperTileBtn = event.target.closest("[data-sentence-helper-tile]");
    if (helperTileBtn && root.contains(helperTileBtn)) {
      markSentenceHelperUsed("wordBank");
      appendSentenceTypedToken(session, helperTileBtn.dataset.sentenceHelperTile || "");
      persistSentenceLessonSession();
      renderPracticeView();
      return;
    }
    const helperEraseBtn = event.target.closest("[data-sentence-helper-erase]");
    if (helperEraseBtn && root.contains(helperEraseBtn)) {
      const prefix = session.lockedPrefix || "";
      const tail = String(session.typed || "").slice(prefix.length).trimEnd();
      const parts = tail ? tail.split(/\s+/) : [];
      parts.pop();
      session.typed = prefix + parts.join(" ");
      persistSentenceLessonSession();
      renderPracticeView();
      return;
    }
    const previewSpeak = event.target.closest("[data-sentence-preview-speak]");
    if (previewSpeak && root.contains(previewSpeak)) {
      speak(previewSpeak.dataset.sentencePreviewSpeak || "");
      return;
    }
    const rateBtn = event.target.closest("[data-sentence-rate]");
    if (rateBtn && root.contains(rateBtn)) {
      root.querySelectorAll("[data-sentence-rate]").forEach((btn) => btn.disabled = true);
      rateBtn.classList.add("is-selected");
      window.setTimeout(() => {
        if (sentenceStudioSession === session) advanceSentenceSession();
      }, 520);
      return;
    }
  });
}

function bindSentenceStudioEvents(el) {
  el.querySelectorAll("[data-sentence-unit-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const lessons = el.querySelector(`[data-sentence-unit-lessons="${CSS.escape(button.dataset.sentenceUnitToggle)}"]`);
      if (!lessons) return;
      const hidden = lessons.hasAttribute("hidden");
      if (hidden) lessons.removeAttribute("hidden"); else lessons.setAttribute("hidden", "");
      button.setAttribute("aria-expanded", hidden ? "true" : "false");
    });
  });
  el.querySelectorAll("[data-ss-goto]").forEach((btn) => {
    btn.addEventListener("click", () => showTab(btn.dataset.ssGoto));
  });
  el.querySelectorAll("[data-ss-word-unit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const unitId = btn.dataset.ssWordUnit;
      openVocabularySubsection("lessons", "words-home");
      const unitButton = document.querySelector(`[data-word-unit-toggle="${CSS.escape(unitId)}"]`);
      const lessons = document.querySelector(`[data-word-unit-lessons="${CSS.escape(unitId)}"]`);
      if (lessons) lessons.removeAttribute("hidden");
      if (unitButton) {
        unitButton.setAttribute("aria-expanded", "true");
        unitButton.scrollIntoView({ block: "center", behavior: "smooth" });
        flashElement(unitButton);
      }
    });
  });
  el.querySelectorAll("[data-ss-band]").forEach((btn) => {
    btn.addEventListener("click", () => {
      getSentencesProgress().band = Number(btn.dataset.ssBand) || 1;
      saveState();
      renderPracticeView();
    });
  });
  el.querySelectorAll("[data-ss-start]").forEach((btn) => {
    btn.addEventListener("click", () => startSentenceStudioSession(btn.dataset.ssStart));
  });
  el.querySelectorAll("[data-ss-lesson]").forEach((btn) => {
    btn.addEventListener("click", () => openSentenceLesson(btn.dataset.ssLesson));
  });
  el.querySelectorAll("[data-ss-lesson-start]").forEach((btn) => {
    btn.addEventListener("click", () => startSentenceLessonSession(btn.dataset.ssLessonStart));
  });
  el.querySelectorAll("[data-ss-lesson-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      sentenceLessonView = null;
      renderPracticeView();
    });
  });
  el.querySelectorAll("[data-ss-preview-speak]").forEach((rowEl) => {
    rowEl.addEventListener("click", () => speak(rowEl.dataset.ssPreviewSpeak || ""));
  });
  el.querySelectorAll("[data-ss-preview-reference]").forEach((button) => {
    button.addEventListener("click", () => {
      const row = getSentenceBankRows().find((item) => item.id === button.dataset.ssPreviewReference);
      openSentenceReferenceOverlay(row);
    });
  });

  const sessionRoot = el.querySelector("#sentenceSessionRoot");
  if (sessionRoot) {
    bindSentenceSessionRoot(sessionRoot);
  }
}

function renderVocabulary() {
  const el = document.getElementById("screen-review");
  if (!el) return;
  refreshProgressionState();

  currentQuizScope = "vocabulary";
  state.studio = "vocab";

  // Capture search box focus & cursor selection before rebuilding the DOM
  const activeEl = document.activeElement;
  const isSearchActive = activeEl && activeEl.id === "vocabSearch";
  const selectionStart = isSearchActive ? activeEl.selectionStart : null;
  const selectionEnd = isSearchActive ? activeEl.selectionEnd : null;

  const level = getActiveLearnLevel("vocabulary");
  const bandIndex = getLevelBand(level, VOCAB_BANDS.length);
  const bandLabel = VOCAB_BANDS[bandIndex - 1] || VOCAB_BANDS[0];
  const knownSet = getVocabKnownSet();
  const hardSet = getVocabHardSet();
  const knownCount = knownSet.size;
  const hardCount = hardSet.size;
  const currentBandItems = vocabBankReady ? getCurrentBandSlice(vocabBank, level, VOCAB_BANDS.length) : [];
  const repeatBandItems = vocabBankReady ? getRepeatBandSlice(vocabBank, level, VOCAB_BANDS.length) : [];
  const active = currentBandItems[0] || vocabBank[0] || null;
  const dailyWords = currentBandItems.slice(0, 10);
  const dailyWordCount = dailyWords.length || currentBandItems.length;
  const showStudy = currentFocus !== "practice";
  const showQuiz = currentFocus !== "learn";
  const practiceSession = showQuiz ? (getPracticeQuizSession("vocabulary") || startGenericPracticeSession("vocabulary")) : null;
  let activeView = normalizeVocabView(state.vocabView || "learn");
  if (currentFocus === "practice") activeView = "test";
  else if (currentFocus === "learn" && activeView === "test") activeView = "learn";
  const currentEnglish = active ? (active.englishSpelling || active.romanization || "") : "";
  const currentPronunciation = active ? (active.pronunciation || currentEnglish) : "";
  const showLevelRail = activeView !== "learn" && activeView !== "metrics";
  const visibleViews = currentFocus === "practice"
    ? []
    : currentFocus === "learn"
      ? VOCAB_VIEWS.filter((v) => v.id !== "test")
      : VOCAB_VIEWS;
  const viewButtons = visibleViews
    .map((view) => `<button class="filter-chip ${activeView === view.id ? "active" : ""}" type="button" data-vocab-view="${view.id}">${view.label}</button>`)
    .join("");
  const browserView = activeView === "browse" ? buildVocabLibraryView() : null;

  let content = "";
  if (activeView === "learn") {
    // Guided Word Path: continue card, review due, and the lesson list.
    content = wordsHomeContentHtml();
  } else if (activeView === "browse") {
    content = browserView ? browserView.html : `
      <div class="card vocab-loading">
        <div class="eyebrow mb-12">Browse all words</div>
        <div class="screen-sub" style="margin-bottom:0;">Loading the vocabulary file...</div>
      </div>
    `;
  } else if (activeView === "test") {
    content = `
      <div class="card">
        <div class="eyebrow">Test</div>
        <h3 class="screen-title" style="margin-bottom:8px;">Rotate the same bank through different quizzes</h3>
        <div class="screen-sub" style="margin-bottom:0;">This deck alternates between Korean to English spelling, English spelling to Hangul, and listening prompts so the same words keep coming back in different forms.</div>
      </div>
    `;
  } else if (activeView === "metrics") {
    content = buildVocabMetricsView();
  } else {
    // Review view: the spaced-review queue for studied curated words.
    const dueItems = getDueVocabReviews(8);
    const dueTotal = getVocabDueCount();
    const dueRows = dueItems.map(({ word, record }) => `
      <div class="study-row">
        <div>
          <div class="study-row-ko" lang="ko">${escapeHtml(word.display || word.korean)}</div>
          <div class="study-row-sub">${escapeHtml(word.meaningShort)}${record.isHard ? " · hard" : ""}</div>
        </div>
        ${hearIconButton(word.voiceText || word.korean, "data-speak")}
      </div>
    `).join("");
    content = `
      <div class="card">
        <div class="flex-between mb-12">
          <div>
            <div class="eyebrow">Review due</div>
            <div class="screen-sub" style="margin-bottom:0;">${dueTotal ? `${dueTotal} word${dueTotal === 1 ? "" : "s"} waiting to come back.` : "No reviews due. Learn 5 new words or browse the word bank."}</div>
          </div>
          <button class="button ${dueTotal ? "primary" : "secondary"} compact" type="button" data-words-start-review ${dueTotal ? "" : "disabled"}>Start review</button>
        </div>
        ${dueRows ? `<div class="study-list">${dueRows}</div>` : ""}
      </div>
    `;
  }

  el.innerHTML = `
    <div class="card">
      <div class="eyebrow">${showQuiz && !showStudy ? "Practice · Vocabulary" : "Learn · Words"}</div>
      <h2 class="screen-title" style="margin-bottom:8px;">Words</h2>
      <div class="text-muted-2 fs-sm">Meaning-first word learning: see it, hear it, type it, say it, review it.</div>
      ${viewButtons ? `<div class="vocab-filters mt-12">${viewButtons}</div>` : ""}
    </div>

    ${wordBankEntryCardHtml()}

    ${showLevelRail ? renderLevelRail("vocabulary", level) : ""}

    ${content}

    ${showQuiz ? renderQuizCard("vocabulary") : ""}
  `;

  bindWordBankEntryCard(el);
  if (activeView === "learn") {
    bindWordsHomeContent(el); // also wires its own review button
  } else {
    const startReviewBtn = el.querySelector("[data-words-start-review]");
    if (startReviewBtn) startReviewBtn.addEventListener("click", () => openWordReview());
  }
  if (activeView === "metrics") bindVocabMetricsRows(el);
  bindLevelRail(el, "vocabulary", renderVocabulary);
  el.querySelectorAll("[data-vocab-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.vocabView = normalizeVocabView(btn.dataset.vocabView);
      saveState();
      renderVocabulary();
    });
  });

  if (activeView === "browse" && browserView) {
    bindVocabBrowser(el, browserView, renderVocabulary);
  }

  el.querySelectorAll("[data-speak]").forEach((btn) => {
    btn.addEventListener("click", () => speak(btn.dataset.speak || ""));
  });

  if (showQuiz && !practiceSession.complete) renderScopedQuestion("vocabulary");
  showTapHint("vocabulary");

  // Restore focus and cursor selection range to search box if it was active
  if (isSearchActive) {
    const search = el.querySelector("#vocabSearch");
    if (search) {
      search.focus();
      if (selectionStart !== null && selectionEnd !== null) {
        search.setSelectionRange(selectionStart, selectionEnd);
      }
    }
  }
}

function renderLibrary() {
  const el = document.getElementById("screen-library");
  if (!el) return;
  refreshProgressionState();

  currentQuizScope = "listening";
  state.studio = "listen";

  const level = getActiveLearnLevel("listening");
  const listenBank = getSentenceStudyBank()
    .filter((item) => item.tokenCount >= 2)
    .sort((a, b) => a.tokenCount - b.tokenCount);
  const currentSlice = getCurrentBandSlice(listenBank, level, 10);
  const repeatSlice = getRepeatBandSlice(listenBank, level, 10);
  const bandLabel = level <= 2
    ? "Short sounds"
    : level <= 4
      ? "Short phrases"
      : level <= 6
        ? "Sentence meaning"
        : level <= 8
          ? "Dictation"
          : "Mixed listening";

  const showStudy = currentFocus !== "practice";
  const showQuiz = currentFocus !== "learn";
  const practiceSession = showQuiz ? (getPracticeQuizSession("listening") || startGenericPracticeSession("listening")) : null;

  el.innerHTML = `
    <div class="card">
      <div class="eyebrow">${showQuiz && !showStudy ? "Practice · Listening" : "Learn · Listening"}</div>
      <h2 class="screen-title" style="margin-bottom:8px;">Hear the sentence</h2>
      <div class="speak-actions mt-12">
        <button class="button secondary compact" type="button" id="listenBackBtn">Sentences</button>
        <button class="button secondary compact" type="button" id="listenLibraryBtn">Vocabulary</button>
      </div>
      <div class="text-muted-2 fs-sm">Level ${level}/10 · ${escapeHtml(bandLabel)} · choose, type, and replay</div>
    </div>

    ${renderLevelRail("listening", level)}

    ${showStudy ? `
    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">Learn</div>
          <div class="screen-sub" style="margin-bottom:0;">Current listening band</div>
        </div>
        <span class="pill accent">${currentSlice.length} items</span>
      </div>
      ${currentSlice.length
        ? `<div class="study-list">${renderSentenceRows(currentSlice, 5)}</div>`
        : `<div class="screen-sub" style="margin-bottom:0;">Audio items will appear once the bank is ready.</div>`}
    </div>

    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">Repeat</div>
          <div class="screen-sub" style="margin-bottom:0;">Everything up to this level keeps coming back.</div>
        </div>
        <span class="pill muted">${repeatSlice.length} review items</span>
      </div>
      ${repeatSlice.length
        ? `<div class="study-list">${renderSentenceRows(repeatSlice.slice(-5), 5)}</div>`
        : `<div class="screen-sub" style="margin-bottom:0;">Your listening review stack will fill as you move forward.</div>`}
    </div>

    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">More</div>
          <div class="screen-sub" style="margin-bottom:0;">Pick a mode: hear a line, match the meaning, or type it out.</div>
        </div>
        <span class="pill muted">Audio first</span>
      </div>
      <div class="study-list">
        <div class="study-row">
          <div>
            <div class="study-row-ko">Sentence choice</div>
            <div class="study-row-sub">Listen and choose the sentence you heard.</div>
          </div>
        </div>
        <div class="study-row">
          <div>
            <div class="study-row-ko">Dictation</div>
            <div class="study-row-sub">Replay the sound, then type the Korean sentence.</div>
          </div>
        </div>
        <div class="study-row">
          <div>
            <div class="study-row-ko">Replay</div>
            <div class="study-row-sub">Tap hear again whenever you need another pass.</div>
          </div>
        </div>
      </div>
    </div>
    ` : ""}

    ${showQuiz ? renderQuizCard("listening") : ""}
  `;

  bindLevelRail(el, "listening", renderLibrary);
  const listenBackBtn = document.getElementById("listenBackBtn");
  if (listenBackBtn) {
    listenBackBtn.addEventListener("click", () => showTab("practice"));
  }
  const listenLibraryBtn = document.getElementById("listenLibraryBtn");
  if (listenLibraryBtn) {
    listenLibraryBtn.addEventListener("click", () => showTab("library"));
  }
  el.querySelectorAll("[data-speak]").forEach((btn) => {
    btn.addEventListener("click", () => speak(btn.dataset.speak || ""));
  });
  if (showQuiz && !practiceSession.complete) renderScopedQuestion("listening");
  showTapHint("listening");
}

function renderProgress() {
  const el = document.getElementById("screen-progress");
  if (!el) return;
  refreshProgressionState();

  const progress = getAlphabetProgress();
  const completedK0 = progress.completedCount;
  const k0Pct = Math.round((completedK0 / Math.max(1, progress.total)) * 100);
  const levelIndex = getLevelIndex(state.level);
  const levelNames = {
    K0: "Hangul & Sound",
    K1: "Survival Korean",
    K2: "Everyday Korean",
    K3: "Connected Korean",
    K4: "Independent Korean",
    K5: "Fluency Bridge",
  };
  const accuracy = state.asked === 0 ? 0 : Math.min(100, Math.round((state.correct / state.asked) * 100));
  const knownWords = Array.isArray(state.vocabKnownRanks) ? state.vocabKnownRanks.length : 0;
  const hardWords = Array.isArray(state.vocabHardRanks) ? state.vocabHardRanks.length : 0;
  const totalMinutes = Number(state.totalMinutes) || 0;
  const weeklyHours = Math.max(1, Number(state.weeklyHours) || 10);
  const weeklyPct = Math.min(100, Math.round((totalMinutes / (weeklyHours * 60)) * 100));
  const nextLevel = LEVEL_ORDER[Math.min(levelIndex + 1, LEVEL_ORDER.length - 1)] || state.level;
  const canDoItems = [
    { done: completedK0 > 0, label: "Started Hangul Boot Camp" },
    { done: progress.complete, label: "Completed all K0 reading stages" },
    { done: state.correct >= 20, label: "Answered 20 quiz cards correctly" },
    { done: knownWords >= 20, label: "Marked 20 vocabulary words as known" },
    { done: state.studyDays >= 3, label: "Built a 3-day study streak" },
  ];
  const sentenceAnalytics = getSentenceAnalyticsSnapshot(getSentencesProgress(), getSentenceBankRows());
  const sentenceDueCount = getTotalDueSentencesCount();

  el.innerHTML = `
    <div class="progress-hero">
      <div class="eyebrow">Progress</div>
      <h2 class="screen-title" style="margin-bottom:8px;">Progress</h2>
      <div class="progress-level">${escapeHtml(state.level)}</div>
      <div class="progress-level-name">${escapeHtml(levelNames[state.level] || "Korean path")}</div>
      <div class="progress-level-sub">Next unlock: ${escapeHtml(nextLevel)} · ${escapeHtml(getLevelUnlockText(nextLevel))}</div>
    </div>

    <div class="stats-grid">
      <div class="stat-box"><span class="sv">${completedK0}/${phaseOneLessons.length}</span><span class="sl">K0 stages</span></div>
      <div class="stat-box"><span class="sv">${accuracy}%</span><span class="sl">Accuracy</span></div>
      <div class="stat-box"><span class="sv">${state.studyDays}</span><span class="sl">Study days</span></div>
      <div class="stat-box"><span class="sv">${knownWords}</span><span class="sl">Known words</span></div>
    </div>

    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">Momentum</div>
          <div class="screen-sub" style="margin-bottom:0;">Keep the path visible and small enough to finish today.</div>
        </div>
        <span class="pill accent">${k0Pct}% K0</span>
      </div>
      <div class="forecast-bar">
        <div class="forecast-row you">
          <div class="forecast-hours">This week</div>
          <div class="forecast-track"><div class="forecast-fill" style="width:${weeklyPct}%"></div></div>
          <div class="forecast-label">${totalMinutes} min</div>
        </div>
        <div class="forecast-row">
          <div class="forecast-hours">K0</div>
          <div class="forecast-track"><div class="forecast-fill" style="width:${k0Pct}%"></div></div>
          <div class="forecast-label">${completedK0}/${phaseOneLessons.length}</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">Review health</div>
          <div class="screen-sub" style="margin-bottom:0;">Words and cards waiting in the loop.</div>
        </div>
        <span class="pill muted">${getTodayReviewCount()} due</span>
      </div>
      <div class="stats-grid" style="margin-bottom:0;">
        <div class="stat-box"><span class="sv">${state.correct}</span><span class="sl">Correct</span></div>
        <div class="stat-box"><span class="sv">${state.bestStreak}</span><span class="sl">Best streak</span></div>
        <div class="stat-box"><span class="sv">${hardWords}</span><span class="sl">Hard words</span></div>
        <div class="stat-box"><span class="sv">${state.round}</span><span class="sl">Round</span></div>
      </div>
    </div>

    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">Sentence progress</div>
          <div class="screen-sub" style="margin-bottom:0;">Accuracy and helper use across your sentence practice.</div>
        </div>
        <span class="pill ${sentenceDueCount ? "accent" : "muted"}">${sentenceDueCount} due</span>
      </div>
      <div class="stats-grid" style="margin-bottom:0;">
        <div class="stat-box"><span class="sv">${sentenceAnalytics.total}</span><span class="sl">Attempts</span></div>
        <div class="stat-box"><span class="sv">${sentenceAnalytics.correctPct}%</span><span class="sl">Accuracy</span></div>
        <div class="stat-box"><span class="sv">${sentenceAnalytics.avgLatencyLabel}</span><span class="sl">Avg latency</span></div>
        <div class="stat-box"><span class="sv">${sentenceAnalytics.helperUses}</span><span class="sl">Helpers used</span></div>
      </div>
    </div>

    <div class="card">
      <div class="eyebrow mb-12">Can do</div>
      <div class="cando-list">
        ${canDoItems.map((item) => `
          <div class="cando-item">
            <span class="cando-check ${item.done ? "done" : "todo"}">${item.done ? "OK" : ""}</span>
            <span>${escapeHtml(item.label)}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

async function init() {
  applyTheme();
  validatePhaseOneLessons();
  backfillLetterSrs();

  // Track daily streak
  const todayStr = new Date().toISOString().slice(0, 10);
  if (state.lastDate !== todayStr) {
    if (state.todayDone.length > 0) state.studyDays += 1;
    state.todayDate = todayStr;
    state.todayDone = [];
    state.lastDate = todayStr;
    state.speakDone = false;
    saveState();
  }

  await Promise.all([loadVocabBank(), loadSupplementaryBank()]);
  initWordBanks();
  updateVocabSkill();
  refreshProgressionState();
  saveState();

  const onbDiv = document.getElementById("onboarding");
  const appDiv = document.getElementById("app");
  const onboardingRequested = new URLSearchParams(window.location.search).has("onboarding");

  // Public visitors land in the app; onboarding is opt-in via ?onboarding=1.
  if (onboardingRequested) {
    if (appDiv) appDiv.hidden = true;
    renderOnboarding();
    return;
  }

  if (!state.onboarded) {
    state.onboarded = true;
    saveState();
  }

  if (onbDiv) onbDiv.hidden = true;
  if (appDiv) appDiv.hidden = false;
  if (appDiv) appDiv.addEventListener("click", (event) => {
    const restart = event.target.closest("[data-generic-practice-again]");
    if (!restart) return;
    const scope = normalizeMainTab(restart.dataset.genericPracticeAgain);
    startGenericPracticeSession(scope);
    renderGenericPracticeSurface(scope);
  });
  const settingsShortcut = document.getElementById("app-settings-button");
  if (settingsShortcut) settingsShortcut.addEventListener("click", () => {
    queueScreenMotion("forward", 1);
    renderSettingsScreen(activeHub);
  });
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const previousIndex = Math.max(0, HUBS.indexOf(activeHub));
      const nextIndex = Math.max(0, HUBS.indexOf(btn.dataset.nav));
      queueScreenMotion("tab", nextIndex >= previousIndex ? 1 : -1);
      if (btn.dataset.nav === "learn") tapLearnTab();
      else goHub(btn.dataset.nav);
    });
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopSpeech();
  });
  window.addEventListener("blur", stopSpeech);
  window.addEventListener("pagehide", stopSpeech);
  bindKeyboardShortcuts();
  const requestedLearnLaunch = getRequestedLearnLaunch();
  if (requestedLearnLaunch) {
    openLearnLesson(requestedLearnLaunch.lessonIndex, {
      resume: false,
      trackProgress: true,
      startMode: requestedLearnLaunch.mode,
      startSlideIndex: requestedLearnLaunch.slideIndex,
    });
    return;
  }
  // Base app load lands on the Learn home menu.
  goHub("learn");
}

// Android hardware/gesture back contract (docs/FABLE_MOBILE_PLAY_STORE_HANDOVER.md
// §11.3), in priority order: close the intro overlay, then act like the
// visible ‹ back bar, then return to the Learn home, and only at the true
// root hand control back to the system (minimize, never kill mid-lesson).
function handleHanaPathBackAction() {
  const intro = document.getElementById("hanapath-app-intro");
  if (intro && intro.classList.contains("is-open")) {
    if (window.HanaPathIntro && typeof window.HanaPathIntro.close === "function") {
      window.HanaPathIntro.close();
    } else {
      intro.classList.remove("is-open");
      intro.hidden = true;
    }
    return true;
  }

  const bar = document.getElementById("detail-bar");
  if (bar && !bar.hidden) {
    const backButton = bar.querySelector(".back-btn");
    if (backButton) {
      backButton.click();
      return true;
    }
  }

  const onboarding = document.getElementById("onboarding");
  const onboardingVisible = onboarding && !onboarding.hidden && onboarding.childElementCount > 0;
  if (!onboardingVisible && activeHub !== "learn") {
    queueScreenMotion("back", -1);
    goHub("learn");
    return true;
  }

  return false;
}

function registerNativeBackButton() {
  if (!isHanaPathNative()) return;
  const appPlugin = getHanaPathNativePlugin("App");
  if (!appPlugin || typeof appPlugin.addListener !== "function") {
    console.warn("HanaPath: @capacitor/app plugin unavailable; system back will use WebView defaults.");
    return;
  }
  appPlugin.addListener("backButton", () => {
    if (handleHanaPathBackAction()) return;
    if (typeof appPlugin.minimizeApp === "function") {
      appPlugin.minimizeApp().catch(() => {});
    } else if (typeof appPlugin.exitApp === "function") {
      appPlugin.exitApp();
    }
  });
}

function registerServiceWorker() {
  if (isHanaPathNative()) {
    // The Capacitor app ships its own versioned copy of the web assets and is
    // updated through installed-app updates; a service worker inside the native
    // WebView would only add a second, competing update path.
    return;
  }
  if (!("serviceWorker" in navigator) || !window.isSecureContext) {
    return;
  }

  let reloadingForUpdate = false;
  const hadController = Boolean(navigator.serviceWorker.controller);
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || reloadingForUpdate) return;

    // Check which screen is currently visible in the DOM
    const activeScreen = document.querySelector(".screen:not([hidden])");
    const activeScreenId = activeScreen ? activeScreen.id.replace("screen-", "") : "";
    const isSafeToReload = activeScreenId === "menu" || activeScreenId === "progress" || !activeScreenId;

    if (isSafeToReload) {
      reloadingForUpdate = true;
      window.location.reload();
    } else {
      window.pendingUpdateReload = true;
      console.log("HanaPath: Service worker update detected. Reload deferred until returning to the home menu to protect active study progress.");
    }
  });

  window.addEventListener("load", () => {
    // No version query: the browser refetches sw.js on every load and installs
    // a new worker whenever its bytes change (i.e. when CACHE_NAME is bumped),
    // so updates ship without anyone having to touch this string.
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) => {
        // Proactively check for a newer worker on load and when the tab
        // regains focus, so long-lived installs pick up releases promptly.
        registration.update().catch(() => {});
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") registration.update().catch(() => {});
        });
      })
      .catch((error) => {
        console.warn("Service worker registration failed:", error);
      });
  });
}

function normalizeKoreanForSpeechScore(text) {
  return String(text || "").normalize("NFC").replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, "");
}

function levenshteinDistance(a, b) {
  const left = Array.from(a || "");
  const right = Array.from(b || "");
  const dp = Array.from({ length: left.length + 1 }, () => Array(right.length + 1).fill(0));
  for (let i = 0; i <= left.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= right.length; j += 1) dp[0][j] = j;
  for (let i = 1; i <= left.length; i += 1) {
    for (let j = 1; j <= right.length; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[left.length][right.length];
}

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function scoreSpeechAttempt(targetText, transcript, durationMs) {
  const target = normalizeKoreanForSpeechScore(targetText);
  const heard = normalizeKoreanForSpeechScore(transcript);
  const distance = levenshteinDistance(target, heard);
  const segmental = target ? clampScore((1 - distance / Math.max(target.length, heard.length, 1)) * 100) : 0;
  const expectedMs = Math.max(900, target.length * 420);
  const timingRatio = durationMs > 0 ? Math.abs(durationMs - expectedMs) / expectedMs : 1;
  const prosodic = clampScore(100 - timingRatio * 70);
  return { target, heard, segmental, prosodic };
}

function speakingScoreHtml(targetLabel, transcript, score) {
  const segmentColor = score.segmental >= 80 ? "#2ecc71" : score.segmental >= 55 ? "#f1c40f" : "#e74c3c";
  const prosodyColor = score.prosodic >= 80 ? "#2ecc71" : score.prosodic >= 55 ? "#f1c40f" : "#e74c3c";
  const tip = score.segmental >= 80
    ? "Good match. Repeat once more and try to keep the rhythm steady."
    : "Listen again, then focus on matching each Hangul block in order.";
  return `
    <div style="display:flex; justify-content:space-between; gap:12px; margin-bottom:4px;">
      <strong>Segmental accuracy:</strong> <span style="color:${segmentColor};">${score.segmental}%</span>
    </div>
    <div style="display:flex; justify-content:space-between; gap:12px; margin-bottom:4px;">
      <strong>Prosodic fluency:</strong> <span style="color:${prosodyColor};">${score.prosodic}%</span>
    </div>
    <div style="margin-top:6px;"><strong>Target:</strong> <span lang="ko">${escapeHtml(targetLabel)}</span></div>
    <div style="margin-top:4px;"><strong>Heard:</strong> <span lang="ko">${escapeHtml(transcript || "No transcript")}</span></div>
    <div style="margin-top:6px; font-size:0.8rem; color:var(--text-muted-2);">${escapeHtml(tip)}</div>
  `;
}

window.handleSpeakingPractice = function (btn) {
  const area = btn.closest(".speaking-practice-area");
  const feedback = area.querySelector(".speaking-feedback");
  const status = area.querySelector(".speaking-status");
  const results = area.querySelector(".speaking-results");
  const wave = area.querySelector(".speaking-wave");
  const targetText = area.dataset.speakingTarget || "";
  const targetLabel = area.dataset.speakingLabel || targetText;
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  btn.disabled = true;
  feedback.style.display = "block";
  status.innerText = "Listening...";
  results.style.display = "none";
  results.innerHTML = "";
  wave.style.display = "flex";

  const bars = wave.querySelectorAll("div");
  let interval = setInterval(() => {
    bars.forEach((bar) => {
      bar.style.height = `${Math.floor(Math.random() * 20) + 10}px`;
    });
  }, 100);

  function finish(message) {
    clearInterval(interval);
    wave.style.display = "none";
    status.innerText = message;
    btn.disabled = false;
  }

  if (!Recognition) {
    finish("Speech scoring is not supported in this browser.");
    results.innerHTML = `
      <div style="font-size:0.85rem; color:var(--text-muted-2);">
        This practice needs the browser SpeechRecognition API. You can still use Hear word and repeat aloud, but HanaPath cannot score this attempt here.
      </div>
    `;
    results.style.display = "block";
    return;
  }

  const recognition = new Recognition();
  const startedAt = performance.now();
  let transcript = "";
  recognition.lang = "ko-KR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = false;

  recognition.onresult = (event) => {
    const first = event.results && event.results[0] && event.results[0][0];
    transcript = first ? first.transcript : "";
  };
  recognition.onerror = () => {
    finish("Speech scoring could not hear a usable attempt.");
    results.innerHTML = `
      <div style="font-size:0.85rem; color:var(--text-muted-2);">
        Try again in a quiet room, or use Hear word and repeat aloud without scoring.
      </div>
    `;
    results.style.display = "block";
  };
  recognition.onend = () => {
    if (!btn.disabled) return;
    const durationMs = performance.now() - startedAt;
    const score = scoreSpeechAttempt(targetText, transcript, durationMs);
    finish("Analysis complete.");
    results.innerHTML = speakingScoreHtml(targetLabel, transcript, score);
    results.style.display = "block";
  };

  try {
    recognition.start();
  } catch (error) {
    finish("Speech scoring could not start.");
    results.innerHTML = `
      <div style="font-size:0.85rem; color:var(--text-muted-2);">
        ${escapeHtml(error && error.message ? error.message : "The browser blocked microphone recognition.")}
      </div>
    `;
    results.style.display = "block";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  registerServiceWorker();
  registerNativeBackButton();
  init().catch((error) => {
    console.error("HanaPath init failed:", error);
  });
});
