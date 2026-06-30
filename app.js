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
    goal: "Own ㅏ, ㅓ, ㅗ, ㅜ, ㅡ, and ㅣ before adding anything fancy.",
    summary: [
      "ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ are your six anchor vowels.",
      "Short stroke right = ㅏ, left = ㅓ; pointing up = ㅗ, down = ㅜ.",
      "Initial ㅇ is a silent placeholder, so 아 is just the vowel 'a'.",
    ],
    introCards: [
      {
        kicker: "Before you start",
        title: "Hangul uses syllable blocks",
        body: "Korean letters do not sit in one long row like English. They are grouped into square syllable blocks. Each block needs a starting consonant seat and a vowel seat.",
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
        visual: "ㅏ → ㅑ",
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
        visual: "ㅜ → ㅠ",
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
        visual: "ㅗ → ㅛ",
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
  {
    phrase: "안녕하세요",
    meaning: "Hello / Hi",
    situation: "Use this to greet someone politely.",
    voiceText: "안녕하세요",
  },
  {
    phrase: "감사합니다",
    meaning: "Thank you",
    situation: "Use this after someone helps you or gives you something.",
    voiceText: "감사합니다",
  },
  {
    phrase: "죄송합니다",
    meaning: "I'm sorry",
    situation: "Use this when you need to apologize.",
    voiceText: "죄송합니다",
  },
  {
    phrase: "실례합니다",
    meaning: "Excuse me",
    situation: "Use this to get someone's attention politely.",
    voiceText: "실례합니다",
  },
  {
    phrase: "물 주세요",
    meaning: "Water, please",
    situation: "Use this when ordering water.",
    voiceText: "물 주세요",
  },
  {
    phrase: "커피 주세요",
    meaning: "Coffee, please",
    situation: "Use this when ordering coffee.",
    voiceText: "커피 주세요",
  },
  {
    phrase: "이거 주세요",
    meaning: "This one, please",
    situation: "Use this when pointing to something you want.",
    voiceText: "이거 주세요",
  },
  {
    phrase: "얼마예요?",
    meaning: "How much is it?",
    situation: "Use this when asking the price.",
    voiceText: "얼마예요?",
  },
  {
    phrase: "화장실 어디예요?",
    meaning: "Where is the bathroom?",
    situation: "Use this when asking for the restroom.",
    voiceText: "화장실 어디예요?",
  },
  {
    phrase: "도와주세요",
    meaning: "Please help me",
    situation: "Use this when you need help.",
    voiceText: "도와주세요",
  },
  {
    phrase: "영어 할 수 있어요?",
    meaning: "Can you speak English?",
    situation: "Use this when you need English help.",
    voiceText: "영어 할 수 있어요?",
  },
  {
    phrase: "한국어 조금 해요",
    meaning: "I speak a little Korean",
    situation: "Use this when explaining your level.",
    voiceText: "한국어 조금 해요",
  },
  {
    phrase: "괜찮아요",
    meaning: "It's okay / I'm fine",
    situation: "Use this to reassure someone or say you're okay.",
    voiceText: "괜찮아요",
  },
  {
    phrase: "네",
    meaning: "Yes",
    situation: "Use this to answer yes.",
    voiceText: "네",
  },
  {
    phrase: "아니요",
    meaning: "No",
    situation: "Use this to answer no.",
    voiceText: "아니요",
  },
];

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
  {
    korean: "저는 학생이에요.",
    meaning: "I am a student.",
    explanation: "Topic + noun + copula.",
    voiceText: "저는 학생이에요.",
  },
  {
    korean: "친구가 와요.",
    meaning: "A friend is coming.",
    explanation: "Subject + verb.",
    voiceText: "친구가 와요.",
  },
  {
    korean: "저는 커피를 마셔요.",
    meaning: "I drink coffee.",
    explanation: "Topic + object + verb.",
    voiceText: "저는 커피를 마셔요.",
  },
  {
    korean: "책을 읽어요.",
    meaning: "I read a book.",
    explanation: "Object + verb.",
    voiceText: "책을 읽어요.",
  },
  {
    korean: "오늘은 날씨가 좋아요.",
    meaning: "The weather is good today.",
    explanation: "Topic + subject + descriptive verb.",
    voiceText: "오늘은 날씨가 좋아요.",
  },
  {
    korean: "사과를 먹어요.",
    meaning: "I eat an apple.",
    explanation: "Object + verb.",
    voiceText: "사과를 먹어요.",
  },
  {
    korean: "저는 한국어를 공부해요.",
    meaning: "I study Korean.",
    explanation: "Topic + object + verb.",
    voiceText: "저는 한국어를 공부해요.",
  },
  {
    korean: "버스를 타요.",
    meaning: "I take the bus.",
    explanation: "Object + verb.",
    voiceText: "버스를 타요.",
  },
  {
    korean: "저는 학생이 아니에요.",
    meaning: "I am not a student.",
    explanation: "Negative copula.",
    voiceText: "저는 학생이 아니에요.",
  },
  {
    korean: "우리 집은 가까워요.",
    meaning: "Our house is close.",
    explanation: "Topic + descriptive verb.",
    voiceText: "우리 집은 가까워요.",
  },
  {
    korean: "물이 있어요.",
    meaning: "There is water.",
    explanation: "Subject + 있다.",
    voiceText: "물이 있어요.",
  },
  {
    korean: "이것은 책이에요.",
    meaning: "This is a book.",
    explanation: "Topic + noun + copula.",
    voiceText: "이것은 책이에요.",
  },
  {
    korean: "저는 시간이 있어요.",
    meaning: "I have time.",
    explanation: "Topic + subject + 있다.",
    voiceText: "저는 시간이 있어요.",
  },
  {
    korean: "한국어가 재미있어요.",
    meaning: "Korean is fun.",
    explanation: "Subject + descriptive verb.",
    voiceText: "한국어가 재미있어요.",
  },
];

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
  {
    korean: "저는 학교에 가요.",
    meaning: "I go to school.",
    tense: "present",
    voiceText: "저는 학교에 가요.",
  },
  {
    korean: "어제 책을 읽었어요.",
    meaning: "I read a book yesterday.",
    tense: "past",
    voiceText: "어제 책을 읽었어요.",
  },
  {
    korean: "내일 친구를 만날 거예요.",
    meaning: "I will meet a friend tomorrow.",
    tense: "future",
    voiceText: "내일 친구를 만날 거예요.",
  },
  {
    korean: "지금 커피를 마셔요.",
    meaning: "I am drinking coffee now.",
    tense: "present",
    voiceText: "지금 커피를 마셔요.",
  },
  {
    korean: "저는 한국어를 배워요.",
    meaning: "I learn Korean.",
    tense: "present",
    voiceText: "저는 한국어를 배워요.",
  },
  {
    korean: "친구가 와요.",
    meaning: "A friend is coming.",
    tense: "present",
    voiceText: "친구가 와요.",
  },
  {
    korean: "저는 집에 갈 거예요.",
    meaning: "I will go home.",
    tense: "future",
    voiceText: "저는 집에 갈 거예요.",
  },
  {
    korean: "저는 어제 운동했어요.",
    meaning: "I exercised yesterday.",
    tense: "past",
    voiceText: "저는 어제 운동했어요.",
  },
  {
    korean: "할머니가 오세요.",
    meaning: "Grandmother is coming.",
    tense: "honorific",
    voiceText: "할머니가 오세요.",
  },
  {
    korean: "선생님이 계세요.",
    meaning: "The teacher is here.",
    tense: "honorific",
    voiceText: "선생님이 계세요.",
  },
  {
    korean: "저는 친구를 도와요.",
    meaning: "I help a friend.",
    tense: "present",
    voiceText: "저는 친구를 도와요.",
  },
  {
    korean: "우리는 영화를 봐요.",
    meaning: "We watch a movie.",
    tense: "present",
    voiceText: "우리는 영화를 봐요.",
  },
  {
    korean: "저는 매일 일해요.",
    meaning: "I work every day.",
    tense: "present",
    voiceText: "저는 매일 일해요.",
  },
  {
    korean: "오늘은 쉬어요.",
    meaning: "I rest today.",
    tense: "present",
    voiceText: "오늘은 쉬어요.",
  },
];

const verbHonorificBank = [
  {
    plain: "선생님이 와요.",
    honorific: "선생님이 오세요.",
    meaning: "The teacher is coming.",
    cue: "Respectful speech for coming.",
  },
  {
    plain: "할머니가 자요.",
    honorific: "할머니가 주무세요.",
    meaning: "Grandmother is sleeping.",
    cue: "Respectful speech for sleeping.",
  },
  {
    plain: "사장님이 있어요.",
    honorific: "사장님이 계세요.",
    meaning: "The boss is here.",
    cue: "Honorific 있다 -> 계시다.",
  },
  {
    plain: "교수님이 말해요.",
    honorific: "교수님이 말씀하세요.",
    meaning: "The professor speaks.",
    cue: "Respectful speech for speaking.",
  },
  {
    plain: "어머니가 먹어요.",
    honorific: "어머니가 드세요.",
    meaning: "Mother eats.",
    cue: "Respectful speech for eating.",
  },
];

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
  if (band === 3) return ["build", "type", "type", "build"];
  if (band === 4) return ["type", "build", "type", "build"];
  return ["type", "build", "type", "build", "type"];
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
  {
    korean: "안녕하세요.",
    meaning: "Hello.",
    cue: "Use this to open a conversation politely.",
    voiceText: "안녕하세요.",
  },
  {
    korean: "처음 뵙겠습니다.",
    meaning: "Nice to meet you.",
    cue: "Use this when you meet someone for the first time.",
    voiceText: "처음 뵙겠습니다.",
  },
  {
    korean: "감사합니다.",
    meaning: "Thank you.",
    cue: "Use this after someone helps you or gives you something.",
    voiceText: "감사합니다.",
  },
  {
    korean: "괜찮아요.",
    meaning: "It's okay.",
    cue: "Use this to reassure someone or say you are fine.",
    voiceText: "괜찮아요.",
  },
  {
    korean: "네.",
    meaning: "Yes.",
    cue: "Use this to answer yes.",
    voiceText: "네.",
  },
  {
    korean: "아니요.",
    meaning: "No.",
    cue: "Use this to answer no.",
    voiceText: "아니요.",
  },
  {
    korean: "물 주세요.",
    meaning: "Water, please.",
    cue: "Use this when ordering water.",
    voiceText: "물 주세요.",
  },
  {
    korean: "이거 주세요.",
    meaning: "This one, please.",
    cue: "Use this when pointing to the item you want.",
    voiceText: "이거 주세요.",
  },
  {
    korean: "화장실이 어디예요?",
    meaning: "Where is the bathroom?",
    cue: "Use this when asking for the restroom.",
    voiceText: "화장실이 어디예요?",
  },
  {
    korean: "잠시만요.",
    meaning: "One moment, please.",
    cue: "Use this to buy a little time.",
    voiceText: "잠시만요.",
  },
  {
    korean: "잘 모르겠어요.",
    meaning: "I don't understand.",
    cue: "Use this when you missed the meaning.",
    voiceText: "잘 모르겠어요.",
  },
  {
    korean: "도와주세요.",
    meaning: "Please help me.",
    cue: "Use this when you need help.",
    voiceText: "도와주세요.",
  },
  {
    korean: "다시 말씀해 주세요.",
    meaning: "Please say it again.",
    cue: "Use this when you did not catch the sentence.",
    voiceText: "다시 말씀해 주세요.",
  },
  {
    korean: "천천히 말씀해 주세요.",
    meaning: "Please speak slowly.",
    cue: "Use this when the speech is too fast.",
    voiceText: "천천히 말씀해 주세요.",
  },
  {
    korean: "무슨 뜻이에요?",
    meaning: "What does it mean?",
    cue: "Use this when a word is unfamiliar.",
    voiceText: "무슨 뜻이에요?",
  },
  {
    korean: "한국어 조금 해요.",
    meaning: "I speak a little Korean.",
    cue: "Use this when explaining your level.",
    voiceText: "한국어 조금 해요.",
  },
  {
    korean: "네, 다시 말씀드릴게요.",
    meaning: "Yes, I will say it again.",
    cue: "Use this when someone asks you to repeat yourself.",
    voiceText: "네, 다시 말씀드릴게요.",
  },
  {
    korean: "네, 천천히 말할게요.",
    meaning: "Yes, I will speak slowly.",
    cue: "Use this when someone asks you to slow down.",
    voiceText: "네, 천천히 말할게요.",
  },
  {
    korean: "저쪽이에요.",
    meaning: "It's over there.",
    cue: "Use this when giving a simple direction.",
    voiceText: "저쪽이에요.",
  },
  {
    korean: "네, 여기요.",
    meaning: "Yes, here you go.",
    cue: "Use this when handing something over.",
    voiceText: "네, 여기요.",
  },
  {
    korean: "알겠습니다.",
    meaning: "Understood.",
    cue: "Use this to confirm you understood.",
    voiceText: "알겠습니다.",
  },
];

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

  grammarSentenceBank.forEach((item) => {
    pushSentenceStudyItem(items, seen, {
      korean: item.korean,
      meaning: item.meaning,
      voiceText: item.voiceText,
      source: "Grammar",
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

  survivalPhrases.forEach((item) => {
    pushSentenceStudyItem(items, seen, {
      korean: item.phrase,
      meaning: item.meaning,
      voiceText: item.voiceText,
      source: "Survival",
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

  verbSentenceBank.forEach((item) => {
    pushSentenceStudyItem(items, seen, {
      korean: item.korean,
      meaning: item.meaning,
      voiceText: item.voiceText,
      source: "Verb",
    });
  });

  verbHonorificBank.forEach((item) => {
    pushSentenceStudyItem(items, seen, {
      korean: item.honorific,
      meaning: item.meaning,
      voiceText: item.honorific,
      source: "Honorific",
    });
  });

  conversationLineBank.forEach((item) => {
    pushSentenceStudyItem(items, seen, {
      korean: item.korean,
      meaning: item.meaning,
      voiceText: item.voiceText,
      source: "Conversation",
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

  conversationDialogueBank.forEach((item) => {
    pushSentenceStudyItem(items, seen, {
      korean: item.starter,
      meaning: item.cue,
      voiceText: item.starter,
      source: "Dialogue starter",
    });
    pushSentenceStudyItem(items, seen, {
      korean: item.reply,
      meaning: item.explanation || item.cue,
      voiceText: item.reply,
      source: "Dialogue reply",
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
    visual: `<div class="big-glyph">♪</div><div class="fs-xs text-muted-2">${escapeHtml(item.korean || item.phrase || item.answer || "")}</div>`,
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
  {
    starter: "안녕하세요.",
    reply: "안녕하세요.",
    cue: "A polite greeting usually gets the same greeting back.",
    explanation: "Mirroring the greeting keeps the exchange natural.",
    voiceText: "안녕하세요.",
  },
  {
    starter: "감사합니다.",
    reply: "괜찮아요.",
    cue: "A natural response to thanks.",
    explanation: "괜찮아요 is a friendly reply to thanks.",
    voiceText: "괜찮아요.",
  },
  {
    starter: "다시 말씀해 주세요.",
    reply: "네, 다시 말씀드릴게요.",
    cue: "If someone asks for a repeat, confirm that you will repeat it.",
    explanation: "This keeps the conversation moving.",
    voiceText: "네, 다시 말씀드릴게요.",
  },
  {
    starter: "천천히 말씀해 주세요.",
    reply: "네, 천천히 말할게요.",
    cue: "If someone asks you to slow down, acknowledge it politely.",
    explanation: "This is a calm and polite confirmation.",
    voiceText: "네, 천천히 말할게요.",
  },
  {
    starter: "화장실이 어디예요?",
    reply: "저쪽이에요.",
    cue: "A direction question gets a short directional reply.",
    explanation: "Simple directions are often enough in real conversation.",
    voiceText: "저쪽이에요.",
  },
  {
    starter: "도와주세요.",
    reply: "네, 여기요.",
    cue: "When someone asks for help, an immediate acknowledgement helps.",
    explanation: "This reply sounds direct and helpful.",
    voiceText: "네, 여기요.",
  },
];

const STORAGE_KEY = "hanapath-v1";

// Populated by rehydrate functions after each screen renders
let els = {};

let currentQuestion = null;
let currentAnswered = false;
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
    const done = Array.isArray(state.phaseOneCompleted) ? state.phaseOneCompleted.length : 0;
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
      Number.isInteger(index) && index >= 0 && index < total && index <= completedCount,
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
    mainTab: "alphabet",
    alphabetView: "vowels",
    // [2026-06-29] Persisted prefs for the Entire Korean Alphabet board (view mode + label density).
    alphabetBoardMode: "keyboard",
    alphabetBoardLabels: "roman",
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
    letterSrs: {},
    speakDone: false,
    resetArmed: false,
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
    state.phaseOneCompleted.length === 0 &&
    state.vocabKnownRanks.length === 0 &&
    state.vocabHardRanks.length === 0
  );
}

const VOCAB_CSV_URL = "./korean_5000_claude_ready.csv";
const VOCAB_PAGE_SIZE = 40;
const VOCAB_BANDS = ["1-500", "501-1000", "1001-1500", "1501-2000", "2001-2500", "2501-3000", "3001-3500", "3501-4000", "4001-4500", "4501-5000"];
const VOCAB_VIEWS = [
  { id: "learn", label: "Today" },
  { id: "browse", label: "Browse" },
  { id: "test", label: "Quiz" },
  { id: "review", label: "Review" },
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

  return {
    rank,
    korean,
    englishSpelling: englishSpelling || korean,
    pronunciation: pronunciation || englishSpelling || korean,
    romanization: englishSpelling || korean,
    frequencyBand,
    syllables: Number.isInteger(syllables) && syllables > 0 ? syllables : 1,
    tokenNote,
    sourceUrl,
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
  return ["learn", "browse", "test", "review"].includes(raw) ? raw : "learn";
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
  return vocabBank.filter((entry) => {
    if (activeBand !== "all" && entry.frequencyBand !== activeBand) {
      return false;
    }

    if (!trimmed) {
      return true;
    }

    return [
      String(entry.rank),
      entry.korean,
      entry.englishSpelling || entry.romanization,
      entry.pronunciation || entry.englishSpelling || entry.romanization,
      entry.frequencyBand,
      String(entry.syllables),
      entry.tokenNote,
    ].some((value) => value.toLowerCase().includes(trimmed));
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
  renderQuestion(generateQuestion(), { scope: getCurrentQuizScope() });
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
  return `
    <div class="card">
      <div class="review-stats">
        <div class="rev-stat"><span class="sv" id="${ids.round}">${state.round}</span><span class="sl">Round</span></div>
        <div class="rev-stat"><span class="sv" id="${ids.streak}">${state.streak}</span><span class="sl">Streak</span></div>
        <div class="rev-stat"><span class="sv" id="${ids.best}">${state.bestStreak}</span><span class="sl">Best</span></div>
        <div class="rev-stat"><span class="sv" id="${ids.accuracy}">${state.asked === 0 ? "0%" : Math.round(state.correct / state.asked * 100) + "%"}</span><span class="sl">Accuracy</span></div>
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
  const accuracy = state.asked === 0 ? 0 : Math.round((state.correct / state.asked) * 100);
  const ids = getQuizIds(getCurrentQuizScope());
  const rnd = document.getElementById(ids.round);
  const str = document.getElementById(ids.streak);
  const bst = document.getElementById(ids.best);
  const acc = document.getElementById(ids.accuracy);
  const qmd = document.getElementById(ids.mode);
  if (rnd) rnd.textContent = String(state.round);
  if (str) str.textContent = String(state.streak);
  if (bst) bst.textContent = String(state.bestStreak);
  if (acc) acc.textContent = `${accuracy}%`;
  if (qmd) qmd.textContent = `${getStudioLabel()} · ${getMasteryLabel(state.correct)}`;
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
  const completedCount = phaseOneLessons.filter((lesson) => state.phaseOneCompleted.includes(lesson.id)).length;
  const percent = Math.round((completedCount / phaseOneLessons.length) * 100);
  const nextIndex = getFirstIncompletePhaseOneIndex();
  const nextLesson = phaseOneLessons[nextIndex];

  els.phaseOneProgressText.textContent = completedCount + " of " + phaseOneLessons.length + " stages";
  els.phaseOneProgressPercent.textContent = percent + "%";
  els.phaseOneProgressBar.setAttribute("aria-valuenow", String(percent));
  els.phaseOneProgressBar.querySelector("span").style.width = percent + "%";
  els.phaseOneNextUp.textContent = nextLesson
    ? "Next up: " + nextLesson.title + ". " + nextLesson.goal
    : "Phase 01 cleared. Keep decoding until the blocks feel immediate.";
  els.continuePhaseOneButton.textContent =
    completedCount === 0 ? "Start Phase 01" : nextLesson ? "Continue with stage " + String(nextIndex + 1).padStart(2, "0") : "Review Phase 01";
  els.phaseOneFinale.hidden = completedCount !== phaseOneLessons.length;
}

function renderPhaseOneTrack() {
  els.phaseOneTrack.innerHTML = phaseOneLessons
    .map((lesson, index) => {
      const complete = state.phaseOneCompleted.includes(lesson.id);
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

  return null;
}

function getPhaseOneVoiceSegments() {
  const source = getPhaseOneVoiceSource();
  if (!source) {
    return [];
  }

  return splitVoiceSequence(source.voiceText);
}

function getPhaseOneVoiceText() {
  return getPhaseOneVoiceSegments().join(" / ");
}

function getPhaseOneButtonLabel(source, mode = phaseOneView.mode) {
  if (mode === "intro") return "Preview intro";
  if (mode === "learn") return "Hear lesson";
  return "Review answer";
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

  const drillSegments = splitVoiceSequence(source.voiceText);
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

// Turn a matched Hangul chunk into something the TTS voice can actually say.
// Full syllables/words speak as-is; bare jamo map to their demo syllable.
function speakableForChunk(chunk) {
  const text = String(chunk || "");
  if (/^[가-힣]+$/.test(text)) return text;
  if (/^[ㄱ-ㅎㅏ-ㅣ]+$/.test(text)) {
    return Array.from(text)
      .map((ch) => HANGUL_JAMO_SPEAK[ch] || ch)
      .join(" ");
  }
  return text;
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
  (state.phaseOneCompleted || []).forEach((id) => enrollStageLetters(id));
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

function renderFlashableHangulText(text, className = "concept-token") {
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
        `<span class="${className} tappable" role="button" tabindex="0" aria-label="Hear ${escapeHtml(speakText)}" title="Tap to hear" data-flash-index="${index}" data-speak="${escapeHtml(speakText)}">${escapeHtml(match[0])}</span>` +
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
  const { preserveSequence = false } = options;
  return new Promise((resolve) => {
    if (!text) {
      resolve();
      return;
    }

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
        
        audio.onended = () => {
          if (currentCustomAudio === audio) currentCustomAudio = null;
          resolve();
        };
        
        audio.onerror = () => {
          console.warn(`Failed to play ${audioUrl}`);
          if (currentCustomAudio === audio) currentCustomAudio = null;
          fallbackSpeak(text, resolve);
        };

        currentCustomAudio = audio;
        audio.play().catch(e => {
          if (currentCustomAudio === audio) currentCustomAudio = null;
          fallbackSpeak(text, resolve);
        });
        return;
      } else {
        console.warn(`No pre-generated audio found for: "${cleanText}"`);
      }
    }
    
    fallbackSpeak(text, resolve);
  });
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
  const equations = diagrams.map((d) => {
    const assembled = d.char || (d.batchim
      ? (d.onset + d.vowel + d.batchim)
      : (d.onset + d.vowel));
    return (
      `<div class="bd-equation">` +
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
      `<div class="bd-block-col">` +
      `<span class="bd-word-char" lang="ko">${escapeHtml(b.char)}</span>` +
      renderBlockDiagram(b.onset, b.vowel, b.batchim || "") +
      `</div>` +
      sep
    );
  });
  return `<div class="bd-word-row">${cols.join("")}</div>`;
}

function renderPhaseOneConcept(lesson) {
  restorePhaseOneActions();
  const concept = lesson.concepts[phaseOneView.slideIndex];
  const conceptVisualHtml = concept.diagram
    ? renderBlockDiagrams(concept.diagram)
    : concept.wordBreakdown
      ? renderWordBreakdown(concept.wordBreakdown)
      : renderFlashableHangulText(concept.visual).html;
  const dots = lesson.concepts
    .map(
      (_, index) =>
        '<span class="' +
        (index === phaseOneView.slideIndex ? "active" : index < phaseOneView.slideIndex ? "done" : "") +
        '"></span>',
    )
    .join("");

  els.phaseOneStage.innerHTML =
    '<div class="lesson-step-row">' +
    "<span>Learn " +
    (phaseOneView.slideIndex + 1) +
    " / " +
    lesson.concepts.length +
    "</span>" +
    '<div class="lesson-dots" aria-hidden="true">' +
    dots +
    "</div>" +
    "</div>" +
    '<div class="phase-one-action-slot" data-phase-one-actions-slot></div>' +
    '<div class="concept-card">' +
    '<div class="concept-visual" lang="ko" data-phase-one-visual>' +
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
      : "Lessons";
  els.phaseOneActionButton.disabled = false;
  els.phaseOneActionButton.textContent =
    phaseOneView.slideIndex === lesson.concepts.length - 1 ? "Start checkpoint" : "Next card";
  placePhaseOneActions();
  animateMotionScope(els.phaseOneStage);
}

function renderPhaseOneIntro(lesson) {
  restorePhaseOneActions();
  const introCards = getPhaseOneIntroCards(lesson);
  const introCard = introCards[phaseOneView.introIndex] || introCards[0] || null;
  const bullets = Array.isArray(introCard?.bullets) ? introCard.bullets.filter(Boolean) : [];
  const dots = introCards
    .map(
      (_, index) =>
        '<span class="' +
        (index === phaseOneView.introIndex ? "active" : index < phaseOneView.introIndex ? "done" : "") +
        '"></span>',
    )
    .join("");

  els.phaseOneStage.innerHTML =
    '<div class="lesson-step-row">' +
    "<span>Before you start</span>" +
    '<div class="lesson-dots" aria-hidden="true">' +
    dots +
    "</div>" +
    "</div>" +
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
      : "Lessons";
  els.phaseOneActionButton.disabled = false;
  els.phaseOneActionButton.textContent =
    phaseOneView.introIndex === introCards.length - 1 ? "Start lesson" : "Next card";
  placePhaseOneActions();
  animateMotionScope(els.phaseOneStage);
}

function renderPhaseOneQuestion(lesson) {
  restorePhaseOneActions();
  const question = lesson.questions[phaseOneView.questionIndex];
  const cleanCount = phaseOneView.results.filter(Boolean).length;
  const questionVisual = renderFlashableHangulText(question.visual, "checkpoint-token");

  els.phaseOneStage.innerHTML =
    '<div class="lesson-step-row">' +
    "<span>Checkpoint " +
    (phaseOneView.questionIndex + 1) +
    " / " +
    lesson.questions.length +
    "</span>" +
    "<strong>" +
    cleanCount +
    " clean</strong>" +
    "</div>" +
    '<div class="phase-one-action-slot" data-phase-one-actions-slot></div>' +
    '<div class="checkpoint-card">' +
    '<div class="checkpoint-visual" lang="ko" data-phase-one-visual>' +
    questionVisual.html +
    "</div>" +
    "<h4>" +
    escapeHtml(question.prompt) +
    "</h4>" +
    "<p>" +
    escapeHtml(question.detail) +
    "</p>" +
    '<div class="lesson-options">' +
    // The lesson banks list the correct answer first; shuffle a copy so the
    // right choice isn't always the top button. Order is matched by value, so
    // shuffling the display has no effect on grading.
    shuffle([...question.options])
      .map(
        (option) =>
          '<button class="lesson-option" type="button" data-option="' +
          escapeHtml(option) +
          '">' +
          escapeHtml(option) +
          "</button>",
      )
      .join("") +
    "</div>" +
    '<div class="lesson-feedback" id="phaseOneFeedback" aria-live="polite"></div>' +
    "</div>";

  els.phaseOneBackButton.disabled = false;
  els.phaseOneBackButton.textContent = "Review cards";
  els.phaseOneActionButton.disabled = true;
  els.phaseOneActionButton.textContent =
    phaseOneView.questionIndex === lesson.questions.length - 1 ? "See result" : "Next question";
  placePhaseOneActions();
  animateMotionScope(els.phaseOneStage);
}

function renderPhaseOneResult(lesson) {
  restorePhaseOneActions();
  const cleanCount = phaseOneView.results.filter(Boolean).length;
  const total = lesson.questions.length;
  const percent = Math.round((cleanCount / total) * 100);
  const requiredPercent = lesson.id === "alphabet-mastery" ? 85 : lesson.id === "reading-graduation" ? 80 : 75;
  const passed = percent >= requiredPercent;
  phaseOneView.passed = passed;

  if (passed && !state.phaseOneCompleted.includes(lesson.id)) {
    state.phaseOneCompleted.push(lesson.id);
    enrollStageLetters(lesson.id);
    saveState();
    refreshProgressionState();
  }

  els.phaseOneStage.innerHTML =
    '<div class="result-card ' +
    (passed ? "passed" : "retry") +
    '">' +
    '<span class="result-score">' +
    cleanCount +
    "/" +
    total +
    "</span>" +
    "<div>" +
    '<p class="concept-kicker">' +
    (passed ? "Stage cleared" : "One more clean run") +
    "</p>" +
    "<h4>" +
    (passed ? escapeHtml(lesson.shortTitle) + " is locked in" : "Review, then hit the checkpoint again") +
    "</h4>" +
    "<p>" +
    (passed
      ? "You answered " + percent + "% correctly on the first try. The next stage is now open."
      : "You scored " + percent + "% clean. Reach " + requiredPercent + "% to unlock the next stage.") +
    "</p>" +
    "</div>" +
    "</div>";

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
  animateMotionScope(els.phaseOneStage);
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

  els.phaseOneStageNumber.textContent = "Stage " + String(phaseOneView.lessonIndex + 1).padStart(2, "0") + " of " + phaseOneLessons.length;
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

  if (els.phaseOneHearButton) {
    if (phaseOneView.mode === "intro") {
      els.phaseOneHearButton.style.display = "none";
      els.phaseOneHearButton.disabled = true;
    } else {
      els.phaseOneHearButton.style.display = "";
      els.phaseOneHearButton.disabled = !getPhaseOneVoiceText();
      els.phaseOneHearButton.textContent = `▶ ${getPhaseOneButtonLabel(getPhaseOneVoiceSource())}`;
    }
  }
}

function renderPhaseOneCourse() {
  const firstIncomplete = getFirstIncompletePhaseOneIndex();
  if (
    !state.phaseOneCompleted.includes(phaseOneLessons[phaseOneView.lessonIndex]?.id) &&
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
    feedback.innerHTML = "<strong>Not yet.</strong> " + escapeHtml(rule);
    showRetryToast(rule);
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
  feedback.innerHTML = "<strong>Correct.</strong> " + escapeHtml(question.explanation);
  showCorrectToast();
  els.phaseOneActionButton.disabled = false;
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
      phaseOneView.mode = "check";
      phaseOneView.questionIndex = 0;
      phaseOneView.results = [];
      phaseOneView.hadMistake = false;
      phaseOneView.answered = false;
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

    openLearnStageMenu("alphabet");
    return;
  }

  phaseOneView.mode = "learn";
  phaseOneView.slideIndex = phaseOneLessons[phaseOneView.lessonIndex].concepts.length - 1;
  phaseOneView.questionIndex = 0;
  phaseOneView.results = [];
  phaseOneView.hadMistake = false;
  phaseOneView.answered = false;
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
  { title: "Compound vowels", sub: "Combined vowel shapes", chars: ["ㅐ", "ㅒ", "ㅔ", "ㅖ", "ㅘ", "ㅙ", "ㅚ", "ㅝ", "ㅞ", "ㅟ", "ㅢ"] },
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
  const mode = state.alphabetBoardLabels || "roman";
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
    <p class="alpha-detail-note">${escapeHtml(info.note || "")}</p>
    ${JAMO_VOICING_NOTE[ch] ? `<p class="alpha-detail-voicing">💡 ${escapeHtml(JAMO_VOICING_NOTE[ch])}</p>` : ""}
    <p class="alpha-detail-example"><strong>Example:</strong> <span lang="ko">${escapeHtml(info.example || jamoDemo(ch))}</span></p>
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
      ${sub ? `<span class="alpha-key-sub">${escapeHtml(sub)}</span>` : ""}
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

  const compoundStrip = COMPOUND_VOWELS.map(({ char, combo }) => `
    <button class="alpha-key compound${char === alphabetBoardSelected ? " selected" : ""}" type="button" data-alpha-letter="${escapeHtml(char)}" lang="ko" aria-label="${escapeHtml(jamoDemo(char))}">
      <span class="alpha-key-glyph">${escapeHtml(char)}</span>
      <span class="alpha-key-sub">${escapeHtml(combo.join("+"))}</span>
    </button>
  `).join("");

  return `
    <div class="card alpha-keyboard">
      <div class="screen-sub" style="margin-bottom:10px;">Korean 2-set (Dubeolsik) layout — the real keyboard you'll type on. Tap a key to hear it; tap <strong>Shift</strong> for the tense letters.</div>
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
  return ALPHABET_LIST_GROUPS.map((group, index) => `
    <div class="card">
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
            ${sub ? `<span class="alpha-list-sub">${escapeHtml(sub)}</span>` : ""}
          </button>`;
        }).join("")}
      </div>
    </div>
  `).join("");
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
  const hiding = (state.alphabetBoardLabels || "roman") === "none";
  const subs = mount.querySelectorAll(".alpha-key:not(.compound) .alpha-key-sub, .alpha-list-sub");
  if (hiding && subs.length) {
    subs.forEach((s) => s.classList.add("alpha-sub-out"));
    window.setTimeout(() => refreshAlphabetBoard({}), 190);
  } else {
    refreshAlphabetBoard({ animate: "labels" });
  }
}

// Reflect the current mode/labels on the segmented control buttons without a
// re-render (they persist across in-place board updates).
function syncAlphabetSeg() {
  const mode = state.alphabetBoardMode === "list" ? "list" : "keyboard";
  const labels = state.alphabetBoardLabels || "roman";
  document.querySelectorAll("[data-alpha-mode]").forEach((b) => {
    const on = b.dataset.alphaMode === mode;
    b.classList.toggle("active", on);
    b.setAttribute("aria-pressed", String(on));
  });
  document.querySelectorAll("[data-alpha-labels]").forEach((b) => {
    const on = b.dataset.alphaLabels === labels;
    b.classList.toggle("active", on);
    b.setAttribute("aria-pressed", String(on));
  });
}

function renderEntireAlphabet() {
  currentQuizScope = "alphabet";
  state.studio = "alphabet";
  activeHub = "learn";
  setNavActive("learn");
  const el = showScreen("detail");
  if (!el) return;
  showDetailBarWithBack("learn", "Entire Korean alphabet", () => openLearnStageMenu("alphabet"), "Alphabet");

  const mode = state.alphabetBoardMode === "list" ? "list" : "keyboard";
  const labels = state.alphabetBoardLabels || "roman";
  if (!alphabetBoardSelected) alphabetBoardSelected = "ㄱ";

  const seg = (group, value, current, label) =>
    `<button class="alpha-seg${value === current ? " active" : ""}" type="button" data-alpha-${group}="${value}" aria-pressed="${value === current}">${label}</button>`;

  el.innerHTML = `
    <div class="card">
      <div class="eyebrow">Reference · Full alphabet</div>
      <h2 class="screen-title" style="margin-bottom:8px;">The entire Korean alphabet</h2>
      <div class="screen-sub" style="margin-bottom:12px;">All 19 consonants and 21 vowels in one place. Tap any letter to hear it.</div>
      <div class="alpha-controls">
        <div class="alpha-seg-group" role="group" aria-label="Display mode">
          ${seg("mode", "keyboard", mode, "⌨ Keyboard")}
          ${seg("mode", "list", mode, "☰ List")}
        </div>
        <div class="alpha-seg-group" role="group" aria-label="Letter labels">
          ${seg("labels", "roman", labels, "Aa Sound")}
          ${seg("labels", "phonetic", labels, "k→g Phonetic")}
          ${seg("labels", "name", labels, "가 Name")}
          ${seg("labels", "none", labels, "∅ Hide")}
        </div>
      </div>
    </div>
    <div class="card alpha-detail" id="alphaBoardDetail">${alphabetDetailHtml(alphabetBoardSelected)}</div>
    <div id="alphaBoardMount">${renderAlphabetBoardMarkup()}</div>
  `;

  // Mode / label segmented controls. These update only the board in place (no
  // full-screen re-render) so toggling doesn't replay the whole page animation.
  el.querySelectorAll("[data-alpha-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (state.alphabetBoardMode === btn.dataset.alphaMode) return;
      state.alphabetBoardMode = btn.dataset.alphaMode;
      saveState();
      syncAlphabetSeg();
      refreshAlphabetBoard({ animate: "board" });
    });
  });
  el.querySelectorAll("[data-alpha-labels]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if ((state.alphabetBoardLabels || "roman") === btn.dataset.alphaLabels) return;
      state.alphabetBoardLabels = btn.dataset.alphaLabels;
      saveState();
      syncAlphabetSeg();
      refreshAlphabetLabels();
    });
  });
  // Board keys, Play-all and Shift are (re)bound here and on every in-place update.
  bindAlphabetBoard(el.querySelector("#alphaBoardMount"));
  // The detail card's glyph + ▶ buttons live inside #alphaBoardDetail, whose
  // innerHTML is rewritten by selectAlphabetLetter on every selection. Binding
  // each button directly would go stale after the first tap, so delegate on the
  // persistent container instead (it survives selectAlphabetLetter re-renders
  // and is itself recreated on each full render, so listeners never stack).
  const detailCard = el.querySelector("#alphaBoardDetail");
  if (detailCard) {
    detailCard.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-alpha-letter]");
      if (btn) selectAlphabetLetter(btn.dataset.alphaLetter);
    });
  }
}

function openEntireAlphabet() {
  refreshProgressionState();
  state.route = { hub: "learn", item: "alphabet", stage: null };
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

  return `<div class="big-glyph">${escapeHtml(question.answer)}</div>`;
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

function generateDecomposeQuestion(pools) {
  const targetChoices = ["initial", "medial"];
  if (Array.isArray(pools?.finals) && pools.finals.some((item) => item)) {
    targetChoices.push("final");
  }

  const target = randomItem(targetChoices);
  let initial;
  let medial;
  let final;
  let syllable;

  do {
    initial = randomItem(pools.initials);
    medial = randomItem(pools.medials);
    final = target === "final" ? randomItem(pools.finals.filter((item) => item !== "")) : randomItem(pools.finals);
    syllable = composeHangul(initial, medial, final);
  } while (!syllable || (target === "final" && final === ""));

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
    visual: `<div class="syllable-stack"><span>${escapeHtml(item.plain)}</span><span>→</span><span>${escapeHtml(item.honorific)}</span></div>`,
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
    visual: `<div class="syllable-stack"><span>${escapeHtml(item.starter)}</span><span>→</span><span>${escapeHtml(item.reply)}</span></div>`,
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

function generateBatchimQuestion(pools) {
  const group = randomItem(BATCHIM_GROUPS);
  const letter = randomItem(group.letters);
  const answer = group.group;
  const options = makeTextChoices(answer, BATCHIM_GROUPS.map((item) => item.group), 4);
  const sample = composeHangul(randomItem(pools.initials), "ㅏ", letter);

  return {
    kind: "Batchim sound",
    mode: "Final consonant groups",
    prompt: `Which closing sound group does ${letter} usually fall into?`,
    detail: "Batchim often compresses into a smaller set of end sounds.",
    visual: `<div class="syllable-stack"><span>${escapeHtml(letter)}</span><span>→</span><span>${escapeHtml(answer)}</span></div>`,
    options,
    answer,
    explanation: `${letter} usually closes as ${answer}. Batchim practice makes real Korean reading much easier.`,
    voiceText: sample,
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

function generateVocabQuestion(forcedType) {
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
  nextBtn.textContent = needsCheck ? "Check →" : "Next →";
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
      return `<button class="${classes.join(" ")}" type="button" data-option="${escapeHtml(option)}" ${currentAnswered ? "disabled" : ""}>${escapeHtml(option)}</button>`;
    })
    .join("");

  if (currentAnswered) return;

  quizOptions.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", () => chooseAnswer(button.dataset.option || ""));
  });
}

function placeBuildToken(question, tokenId, slotIndex = null) {
  if (!question?.response || currentAnswered) return;

  const response = question.response;
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
    speakBtn.disabled = !question.voiceText;
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
  if (isCorrect) {
    state.correct += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
  } else {
    state.streak = 0;
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

    const isCorrect = normalizeStudyText(userAnswer) === normalizeStudyText(currentQuestion.answer);
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
      { id: "alphabet",   icon: "🎯", title: "Alphabet quiz",   sub: "Match letters to their sounds.", custom: "alphabetPractice" },
      { id: "vocabulary", icon: "🎯", title: "Vocabulary quiz", sub: "Test the words you've learned.", target: "library", view: "test" },
      { id: "sentences",  icon: "🎯", title: "Sentence quiz",   sub: "Order and type full sentences.", target: "practice" },
      { id: "listening",  icon: "🎯", title: "Listening quiz",  sub: "Choose or type what you heard.", target: "listening" },
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
  ".review-card",
].join(", ");

function playMotion(node, className, cleanupMs) {
  if (!node) return;
  node.classList.remove(className);
  void node.offsetWidth;
  node.classList.add(className);
  window.setTimeout(() => {
    node.classList.remove(className);
  }, cleanupMs);
}

function animateMotionScope(scope, selectors = MOTION_SELECTORS, stepMs = 42) {
  if (!scope) return;
  const items = [...scope.querySelectorAll(selectors)];
  if (!items.length) return;

  items.forEach((item, index) => {
    item.classList.remove("motion-enter");
    item.style.setProperty("--motion-delay", `${Math.min(index, 12) * stepMs}ms`);
  });

  void scope.offsetWidth;

  items.forEach((item, index) => {
    item.classList.add("motion-enter");
    window.setTimeout(() => {
      item.classList.remove("motion-enter");
      item.style.removeProperty("--motion-delay");
    }, 780 + index * stepMs);
  });
}

function setNavActive(hub) {
  document.querySelectorAll(".nav-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.nav === hub);
  });
}

function showScreen(screenId) {
  stopSpeech();
  const targetId = "screen-" + screenId;
  // Hide every screen and empty the inactive ones. Inactive screens keep their
  // quiz cards in the DOM otherwise, and the alphabet quiz on Home shares its
  // element IDs with the alphabet practice screen — getElementById would then
  // write into the hidden copy. Each screen is fully re-rendered when shown.
  document.querySelectorAll(".screen").forEach((s) => {
    s.hidden = true;
    if (s.id !== targetId) s.innerHTML = "";
  });
  const screen = document.getElementById(targetId);
  if (screen) {
    screen.hidden = false;
    screen.scrollTop = 0;
    playMotion(screen, "screen-enter", 420);
    window.requestAnimationFrame(() => animateMotionScope(screen));
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
  const label = HUB_DEFS[hub] ? HUB_DEFS[hub].label : "Menu";
  bar.innerHTML = `
    <button class="back-btn" type="button">‹ ${escapeHtml(label)}</button>
    ${itemTitle ? `<span class="detail-bar-title">${escapeHtml(itemTitle)}</span>` : ""}
  `;
  bar.querySelector(".back-btn").addEventListener("click", () => goHub(hub));
  bar.hidden = false;
  playMotion(bar, "bar-enter", 320);
}

function hideDetailBar() {
  const bar = document.getElementById("detail-bar");
  if (bar) { bar.hidden = true; bar.innerHTML = ""; }
}

function showDetailBarWithBack(hub, itemTitle, onBack = null, backLabel = null) {
  const bar = document.getElementById("detail-bar");
  if (!bar) return;
  const label = backLabel || (HUB_DEFS[hub] ? HUB_DEFS[hub].label : "Menu");
  bar.innerHTML = `
    <!-- [2026-06-29] Fixed mojibake back-arrow (â€¹ → ‹) in this back-bar variant. -->
    <button class="back-btn" type="button">‹ ${escapeHtml(label)}</button>
    ${itemTitle ? `<span class="detail-bar-title">${escapeHtml(itemTitle)}</span>` : ""}
  `;
  bar.querySelector(".back-btn").addEventListener("click", () => {
    if (typeof onBack === "function") {
      onBack();
      return;
    }
    goHub(hub);
  });
  bar.hidden = false;
  playMotion(bar, "bar-enter", 320);
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
    btn.addEventListener("click", () => openHubItem(hub, btn.dataset.hubItem));
  });
}

function renderLearnStageMenu(itemId) {
  const item = getLearnItemDefinition(itemId);
  if (!item) return;

  const progress = getLearnProgress(itemId);
  const el = showScreen("menu");
  if (!el) return;

  const stageRows = Array.from({ length: progress.total }, (_, index) => {
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

  const letterDue = itemId === "alphabet" ? getDueLetterCount() : 0;
  const letterReviewHtml = letterDue
    ? `
    <div class="card letter-review-banner">
      <div class="flex-between" style="gap:16px;">
        <div style="display:flex;flex-direction:column;gap:4px;">
          <div class="eyebrow">Make it stick</div>
          <div class="screen-sub" style="margin-bottom:0;">${letterDue} letter${letterDue === 1 ? "" : "s"} ready for spaced review.</div>
        </div>
        <button class="button primary compact" type="button" id="stageLetterReviewBtn" style="white-space:nowrap;flex-shrink:0;">Review (${letterDue})</button>
      </div>
    </div>`
    : "";

  el.innerHTML = `
    <div class="card">
      <div class="eyebrow">Learn · ${escapeHtml(item.title)}</div>
      <h2 class="screen-title" style="margin-bottom:0;">Choose a stage</h2>
    </div>
    ${fullAlphabetHtml}
    ${letterReviewHtml}
    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">Stages</div>
          <div class="screen-sub" style="margin-bottom:0;">${progress.complete ? "All stages are unlocked." : `Current stage: ${escapeHtml(getLearnStageInfo(itemId, progress.currentStage).detail)}`}</div>
        </div>
        <span class="pill accent" style="white-space:nowrap;">${progress.completedCount}/${progress.total}</span>
      </div>
      <div class="study-list">
        ${stageRows}
      </div>
    </div>
  `;

  el.querySelectorAll("[data-learn-stage]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.lockedStage) {
        const currentStageInfo = getLearnStageInfo(itemId, progress.currentStage);
        showRetryToast(`Finish "${currentStageInfo.title}" to unlock this stage.`);
        return;
      }
      openLearnStage(itemId, Number(btn.dataset.learnStage));
    });
  });
  const stageLetterReviewBtn = document.getElementById("stageLetterReviewBtn");
  if (stageLetterReviewBtn) stageLetterReviewBtn.addEventListener("click", () => startLetterReview());
  // [2026-06-29] Wire the full-alphabet entry card.
  const entireAlphabetBtn = document.getElementById("openEntireAlphabet");
  if (entireAlphabetBtn) entireAlphabetBtn.addEventListener("click", () => openEntireAlphabet());
}

function openLearnStageMenu(itemId) {
  const item = getLearnItemDefinition(itemId);
  if (!item) return;

  refreshProgressionState();
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
    openLearnLesson(safeStage - 1, {
      resume: false,
      trackProgress: status === "current",
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
  if (item.custom === "alphabetPractice") {
    renderAlphabetPractice();
    return;
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
  // Hangul done → new vocabulary becomes the next new material.
  state.learnInProgress = false;
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
  const initialSource =
    phaseOneView.mode === "learn"
      ? lesson?.concepts?.[phaseOneView.slideIndex] || lesson?.concepts?.[0] || null
      : lesson?.questions?.[phaseOneView.questionIndex] || lesson?.questions?.[0] || null;
  const initialLabel = getPhaseOneButtonLabel(initialSource);
  area.innerHTML = `
    <div class="lesson-player-wrap" id="lessonPlayerWrap">
      <div class="player-head">
        <div class="player-head-top">
          <div class="eyebrow" id="hpStageNumber">Stage ${String(index + 1).padStart(2, "0")} of ${phaseOneLessons.length}</div>
          <button class="hear-btn" id="hpHearBtn" type="button">▶ ${escapeHtml(initialLabel)}</button>
        </div>
        <div class="player-title" id="hpStageTitle"></div>
        <div class="player-goal text-muted fs-sm" id="hpStageGoal"></div>
      </div>
      <div id="hpStage"></div>
      <div class="player-actions" id="hpActions">
        <button class="button secondary compact" id="hpBackBtn" type="button">Back</button>
        <button class="button primary compact" id="hpActionBtn" type="button">Next card</button>
      </div>
    </div>
  `;

  els.phaseOneStageNumber   = document.getElementById("hpStageNumber");
  els.phaseOneStageDuration = { textContent: "" };
  els.phaseOneStageTitle    = document.getElementById("hpStageTitle");
  els.phaseOneStageGoal     = document.getElementById("hpStageGoal");
  els.phaseOneHearButton    = document.getElementById("hpHearBtn");
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

  els.phaseOneHearButton.addEventListener("click", () => {
    void playPhaseOneVoiceSequence();
  });
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
    const token = e.target.closest("[data-speak]");
    if (token && stageEl.contains(token)) {
      flashElement(token);
      void speak(token.dataset.speak || token.textContent || "");
      return;
    }
    const btn = e.target.closest(".lesson-option");
    if (btn instanceof HTMLButtonElement && !btn.disabled) answerPhaseOneQuestion(btn.dataset.option || "", btn);
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
    trackProgress = true,
    startMode = "intro",
    startIntroIndex = 0,
    startSlideIndex = 0,
    startQuestionIndex = 0,
  } = {},
) {
  let idx = index;
  if (!phaseOneLessons[idx]) { startNextLearn(); return; }
  if (!getAlphabetProgress().isLessonUnlocked(idx)) {
    idx = Math.min(getFirstIncompletePhaseOneIndex(), phaseOneLessons.length - 1);
  }
  const lesson = phaseOneLessons[idx];

  activeHub = "learn";
  setNavActive("learn");
  const canResume = resume && phaseOneView.lessonIndex === idx && phaseOneView.mode !== "result";
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
  el.innerHTML = `<div id="learnLessonArea"></div>`;
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

// Inline complete: keep the player in place, replace hpStage with dots + next card.
function renderCompleteInPlayer(index) {
  refreshProgressionState();
  const lesson = phaseOneLessons[index];
  const nextIndex = getFirstIncompletePhaseOneIndex();
  const next = phaseOneLessons[nextIndex];

  showDetailBarWithBack("learn", `Stage ${String(index + 1).padStart(2, "0")}: ${lesson.shortTitle}`, () => openLearnStageMenu("alphabet"), "Alphabet");

  const dots = lesson.concepts.map(() => '<span class="done"></span>').join("");
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
  els.phaseOneStage.innerHTML =
    '<div class="lesson-step-row">' +
    "<span>Done</span>" +
    '<div class="lesson-dots" aria-hidden="true">' + dots + "</div>" +
    "</div>" +
    summaryHtml +
    '<div class="card" style="margin-top:16px;">' +
    (next
      ? '<div class="eyebrow">Keep going</div>' +
        '<h3 class="screen-title" style="margin-bottom:8px;">Next: ' + escapeHtml(next.shortTitle) + "</h3>" +
        '<div class="screen-sub" style="margin-bottom:12px;">' + escapeHtml(next.goal) + "</div>" +
        '<button class="button primary compact" type="button" id="learnNextBtn">Start next lesson</button>'
      : '<div class="eyebrow">Hangul complete</div>' +
        '<h3 class="screen-title" style="margin-bottom:8px;">You can read Hangul! 🎉</h3>' +
        '<div class="screen-sub" style="margin-bottom:12px;">New vocabulary is now your next new material.</div>' +
        '<button class="button primary compact" type="button" id="learnNextBtn">Start vocabulary</button>'
    ) +
    "</div>" +
    (getDueLetterCount()
      ? '<div class="card"><div class="flex-between">' +
        "<div><div class=\"eyebrow\">Make it stick</div>" +
        '<div class="screen-sub" style="margin-bottom:0;">Spaced review of the letters you\'ve learned.</div></div>' +
        '<button class="button secondary compact" type="button" id="learnLetterReviewBtn">Review letters (' + getDueLetterCount() + ")</button>" +
        "</div></div>"
      : ""
    );

  const playerHead = els.phaseOnePlayer && els.phaseOnePlayer.querySelector(".player-head");
  if (playerHead) playerHead.style.display = "none";
  if (els.phaseOneActionButton) els.phaseOneActionButton.style.display = "none";
  if (els.phaseOneHearButton) els.phaseOneHearButton.style.display = "none";
  if (els.phaseOneBackButton) {
    els.phaseOneBackButton.textContent = "Lessons";
    els.phaseOneBackButton.onclick = () => openLearnStageMenu("alphabet");
  }

  const nextBtn = document.getElementById("learnNextBtn");
  if (nextBtn) nextBtn.addEventListener("click", () => startNextLearn());
  const letterReviewBtn = document.getElementById("learnLetterReviewBtn");
  if (letterReviewBtn) letterReviewBtn.addEventListener("click", () => startLetterReview());
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
    <div class="card">
      ${next ? `
        <div class="eyebrow">Keep going</div>
        <h3 class="screen-title" style="margin-bottom:8px;">Next: ${escapeHtml(next.shortTitle)}</h3>
        <div class="screen-sub" style="margin-bottom:12px;">${escapeHtml(next.goal)}</div>
        <button class="button primary compact" type="button" id="learnNextBtn">Start next lesson</button>
      ` : `
        <div class="eyebrow">Hangul complete</div>
        <h3 class="screen-title" style="margin-bottom:8px;">You can read Hangul! 🎉</h3>
        <div class="screen-sub" style="margin-bottom:12px;">New vocabulary is now your next new material.</div>
        <button class="button primary compact" type="button" id="learnNextBtn">Start vocabulary</button>
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

function renderAlphabetPractice() {
  refreshProgressionState();
  currentQuizScope = "alphabet";
  state.studio = "alphabet";
  currentFocus = "practice";
  activeTab = "today";
  const el = showScreen("detail");
  if (!el) return;
  el.innerHTML = `
    <div class="card">
      <div class="eyebrow">Practice · Alphabet</div>
      <h2 class="screen-title" style="margin-bottom:8px;">Alphabet quiz</h2>
      <div class="screen-sub" style="margin-bottom:0;">Match each letter to its sound. Press a number key (1–4) or tap an answer.</div>
    </div>
    ${renderQuizCard("alphabet")}
  `;
  el.querySelectorAll("[data-speak]").forEach((btn) => {
    btn.addEventListener("click", () => speak(btn.dataset.speak || ""));
  });
  renderQuestion(generateQuestion(), { scope: "alphabet" });
  showTapHint("alphabet");
}

// ─── ALPHABET LETTER REVIEW (SRS) ─────────────────────────────────────────────
let letterReview = { queue: [], index: 0, correct: 0, answered: false };

function startLetterReview() {
  refreshProgressionState();
  letterReview = { queue: getDueLetters(), index: 0, correct: 0, answered: false };
  activeHub = "learn";
  setNavActive("learn");
  renderLetterReview();
}

function renderLetterReview() {
  const el = showScreen("detail");
  if (!el) return;
  showDetailBarWithBack("learn", "Alphabet review", () => openLearnStageMenu("alphabet"), "Alphabet");

  const total = letterReview.queue.length;
  if (!total || letterReview.index >= total) {
    el.innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="eyebrow">Alphabet review</div>
        <h2 class="screen-title" style="margin:6px 0 8px;">${total ? "Review complete 🎉" : "All caught up"}</h2>
        <div class="screen-sub">${
          total
            ? `You recalled ${letterReview.correct} of ${total} letters. Each one comes back automatically when it's due.`
            : "No letters are due right now. Finish more alphabet stages or check back later."
        }</div>
        <button class="button primary full" id="letterReviewDone" type="button" style="margin-top:6px;">Back to stages</button>
      </div>`;
    const done = document.getElementById("letterReviewDone");
    if (done) done.addEventListener("click", () => openLearnStageMenu("alphabet"));
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
    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">Alphabet review</div>
          <div class="screen-sub" style="margin-bottom:0;">Letter ${letterReview.index + 1} of ${total} due</div>
        </div>
        <span class="pill green">Spaced review</span>
      </div>
      <div class="quiz-card">
        <div class="quiz-visual" lang="ko"><span class="checkpoint-token tappable" role="button" tabindex="0" aria-label="Hear ${escapeHtml(speakableForChunk(letter))}" data-speak="${escapeHtml(speakableForChunk(letter))}" title="Tap to hear">${escapeHtml(letter)}</span></div>
        <div class="quiz-prompt">Which sound does this letter make?</div>
        <div class="quiz-detail">Tap the letter above to hear it again.</div>
        <div class="quiz-options" id="letterReviewOptions">
          ${opts.map((o) => `<button class="option" type="button" data-sound="${escapeHtml(o)}">${escapeHtml(o)}</button>`).join("")}
        </div>
        <div class="quiz-feedback" id="letterReviewFeedback"></div>
      </div>
    </div>`;

  scheduleAutoSpeak(speakableForChunk(letter), 220);
  bindTapToHearToken(el.querySelector("[data-speak]"));
  el.querySelectorAll("#letterReviewOptions .option").forEach((btn) => {
    btn.addEventListener("click", () => answerLetterReview(btn, letter, sound));
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
  const nextIndex = getFirstIncompletePhaseOneIndex();
  const nextLesson = phaseOneLessons[nextIndex] || null;
  const hasHangulLesson = Boolean(
    nextLesson &&
    (state.level === "K0" || !state.knowsHangul || state.phaseOneCompleted.length < phaseOneLessons.length),
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

  const nextIndex = getFirstIncompletePhaseOneIndex();
  const nextLesson = phaseOneLessons[nextIndex] || null;
  const hangulDone = !nextLesson;
  const hangulPct = Math.round((state.phaseOneCompleted.length / Math.max(1, phaseOneLessons.length)) * 100);

  const continueTitle = nextLesson
    ? `Next: ${nextLesson.shortTitle}`
    : "Today's new words";
  const continueSub = nextLesson
    ? nextLesson.goal
    : "Hangul is done — keep building new vocabulary.";
  const continueMeta = nextLesson
    ? `${nextLesson.duration} · Stage ${Math.min(nextIndex + 1, phaseOneLessons.length)} of ${phaseOneLessons.length}`
    : "New vocabulary";

  const dueCount = getTodayReviewCount();
  const streakLabel = state.studyDays > 0 ? `${state.studyDays}-day streak` : "Start your streak today";
  const progressLabel = hangulDone
    ? `Unlocked through ${escapeHtml(state.level)}`
    : `${hangulPct}% through Hangul`;

  el.innerHTML = `
    <div class="eyebrow">Continue</div>
    <h2 class="screen-title" style="margin-bottom:16px;">Pick up where you left off</h2>

    <div class="card continue-hero">
      <div class="eyebrow">Continue learning</div>
      <h3 class="screen-title" style="margin-bottom:8px;">${escapeHtml(continueTitle)}</h3>
      <div class="screen-sub" style="margin-bottom:12px;">${escapeHtml(continueSub)}</div>
      <div class="flex-between" style="gap:12px; align-items:center; flex-wrap:wrap;">
        <span class="pill accent">${escapeHtml(continueMeta)}</span>
        <button class="button primary compact" type="button" id="continueBtn">${nextLesson ? "Start lesson" : "Learn words"}</button>
      </div>
    </div>

    <div class="card">
      <div class="flex-between">
        <div>
          <div class="eyebrow">Review due</div>
          <div class="screen-sub" style="margin-bottom:0;">${dueCount} card${dueCount === 1 ? "" : "s"} waiting to come back.</div>
        </div>
        <button class="button secondary compact" type="button" id="continueReviewBtn">Review</button>
      </div>
    </div>

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
  if (reviewBtn) reviewBtn.addEventListener("click", () => showTab("practice"));
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

  const completedK0 = state.phaseOneCompleted.length;
  const k0Pct = Math.round((completedK0 / phaseOneLessons.length) * 100);
  const unlockedIndex = getLevelIndex(state.level);
  const nextIndex = getFirstIncompletePhaseOneIndex();
  const nextLesson = phaseOneLessons[nextIndex] || null;
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
          const done = lv.isK0 ? state.phaseOneCompleted.includes(phaseOneLessons[i]?.id) : false;
          const isCurr = lv.isK0 ? (i === completedK0 && completedK0 < phaseOneLessons.length) : false;
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

function renderPracticeView() {
  const el = document.getElementById("screen-speak");
  if (!el) return;
  refreshProgressionState();

  currentQuizScope = "sentences";
  state.studio = "sentences";

  const level = getActiveLearnLevel("sentences");
  const sentenceBank = getSentenceStudyBank()
    .filter((item) => item.tokenCount >= 2)
    .sort((a, b) => a.tokenCount - b.tokenCount);
  const currentSlice = getCurrentBandSlice(sentenceBank, level, 10);
  const repeatSlice = getRepeatBandSlice(sentenceBank, level, 10);
  const bandLabel = level <= 2
    ? "Basic sentence frames"
    : level <= 4
      ? "Simple sentence order"
      : level <= 6
        ? "Type and build"
        : level <= 8
          ? "Longer sentences"
          : "Mixed review";
  const practiceExample = currentSlice[0] || repeatSlice[0] || null;
  const practiceTitle = state.speakingAnxiety === "high"
    ? "Shadow first"
    : state.goal === "travel"
      ? "Say it in context"
      : "Build and speak";
  const practiceCue = state.speakingAnxiety === "high"
    ? "Listen once, then copy the rhythm."
    : state.goal === "travel"
      ? "Use this phrase in a real situation."
      : "Order the words, then read them aloud.";

  const showStudy = currentFocus !== "practice";
  const showQuiz = currentFocus !== "learn";

  el.innerHTML = `
    <div class="card">
      <div class="eyebrow">${showQuiz && !showStudy ? "Practice · Sentences" : "Learn · Sentences"}</div>
      <h2 class="screen-title" style="margin-bottom:8px;">${escapeHtml(practiceTitle)}</h2>
      <div class="screen-sub" style="margin-bottom:12px;">${escapeHtml(practiceCue)}</div>
      <div class="text-muted-2 fs-sm" style="margin-bottom:12px;">Stage ${String(level).padStart(2, "0")} of 10 Â· ${escapeHtml(bandLabel)}</div>
      <div class="speak-actions">
        <button class="button secondary compact" type="button" id="practiceHearTask">Replay example</button>
        <button class="button secondary compact" type="button" id="practiceReviewWords">Review words</button>
        <button class="button secondary compact" type="button" id="practiceListenBtn">Listen</button>
      </div>
      ${practiceExample ? `<div class="speak-example mt-12" lang="ko">${escapeHtml(practiceExample.korean || practiceExample.meaning || "")}</div>` : ""}
    </div>

    ${renderLevelRail("sentences", level)}

    ${showStudy ? `
    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">Learn</div>
          <div class="screen-sub" style="margin-bottom:0;">Current sentence band</div>
        </div>
        <span class="pill accent">${currentSlice.length} items</span>
      </div>
      ${currentSlice.length
        ? `<div class="study-list">${renderSentenceRows(currentSlice, 5)}</div>`
        : `<div class="screen-sub" style="margin-bottom:0;">Sentence items will appear once the bank is ready.</div>`}
    </div>

    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">Repeat</div>
          <div class="screen-sub" style="margin-bottom:0;">Everything up to this level stays active.</div>
        </div>
        <span class="pill muted">${repeatSlice.length} review items</span>
      </div>
      ${repeatSlice.length
        ? `<div class="study-list">${renderSentenceRows(repeatSlice.slice(-5), 5)}</div>`
        : `<div class="screen-sub" style="margin-bottom:0;">Your repeat stack will fill as you move forward.</div>`}
    </div>

    <div class="card">
      <div class="flex-between mb-12">
        <div>
          <div class="eyebrow">More</div>
          <div class="screen-sub" style="margin-bottom:0;">Drag words into order or type the whole sentence from audio.</div>
        </div>
        <span class="pill muted">Build + type</span>
      </div>
      <div class="study-list">
        <div class="study-row" style="pointer-events: none;">
          <div>
            <div class="study-row-ko">Drag-and-drop</div>
            <div class="study-row-sub">Put the Korean words into the right order.</div>
          </div>
        </div>
        <div class="study-row" style="pointer-events: none;">
          <div>
            <div class="study-row-ko">Dictation</div>
            <div class="study-row-sub">Hear a sentence and type it out.</div>
          </div>
        </div>
        <div class="study-row" style="pointer-events: none;">
          <div>
            <div class="study-row-ko">Replay</div>
            <div class="study-row-sub">Tap Replay sound whenever you need it.</div>
          </div>
        </div>
      </div>
    </div>
    ` : ""}

    ${showQuiz ? renderQuizCard("sentences") : ""}
  `;

  bindLevelRail(el, "sentences", renderPracticeView);
  const practiceHearTask = document.getElementById("practiceHearTask");
  if (practiceHearTask) {
    practiceHearTask.addEventListener("click", () => speak(practiceExample?.korean || practiceExample?.voiceText || practiceExample?.meaning || ""));
  }
  const practiceReviewWords = document.getElementById("practiceReviewWords");
  if (practiceReviewWords) {
    practiceReviewWords.addEventListener("click", () => {
      state.vocabView = "review";
      saveState();
      showTab("library");
    });
  }
  const practiceListenBtn = document.getElementById("practiceListenBtn");
  if (practiceListenBtn) {
    practiceListenBtn.addEventListener("click", () => showTab("listening"));
  }
  el.querySelectorAll("[data-speak]").forEach((btn) => {
    btn.addEventListener("click", () => speak(btn.dataset.speak || ""));
  });
  if (showQuiz) renderQuestion(generateQuestion(), { scope: "sentences" });
  showTapHint("sentences");
}

function renderVocabulary() {
  const el = document.getElementById("screen-review");
  if (!el) return;
  refreshProgressionState();

  currentQuizScope = "vocabulary";
  state.studio = "vocab";

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
  let activeView = normalizeVocabView(state.vocabView || "learn");
  if (currentFocus === "practice") activeView = "test";
  else if (currentFocus === "learn" && activeView === "test") activeView = "learn";
  const currentEnglish = active ? (active.englishSpelling || active.romanization || "") : "";
  const currentPronunciation = active ? (active.pronunciation || currentEnglish) : "";
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
    content = `
      <div class="card">
        <div class="flex-between mb-12">
          <div>
            <div class="eyebrow">Today</div>
            <div class="screen-sub" style="margin-bottom:0;">10 words from your current band</div>
          </div>
          <span class="pill accent">${dailyWordCount} words</span>
        </div>
        ${vocabBankReady
          ? `<div class="study-list">${renderVocabStudyRows(dailyWords, 10) || `<div class="screen-sub" style="margin-bottom:0;">No words matched this band yet.</div>`}</div>`
          : `<div class="screen-sub" style="margin-bottom:0;">Loading the vocabulary file...</div>`}
      </div>

      <div class="card">
        <div class="eyebrow mb-12">Read each card</div>
        <div class="vocab-meta-grid">
          <div class="vocab-meta-box"><span>Korean spelling</span><strong lang="ko">${escapeHtml(active?.korean || "—")}</strong></div>
          <div class="vocab-meta-box"><span>English spelling</span><strong>${escapeHtml(currentEnglish || "—")}</strong></div>
          <div class="vocab-meta-box"><span>Pronunciation</span><strong>${escapeHtml(currentPronunciation || "—")}</strong></div>
          <div class="vocab-meta-box"><span>Band</span><strong>${escapeHtml(bandLabel)}</strong></div>
          <div class="vocab-meta-box"><span>Syllables</span><strong>${active ? active.syllables : "—"}</strong></div>
          <div class="vocab-meta-box"><span>Status</span><strong>${active ? (knownSet.has(active.rank) ? "Known" : hardSet.has(active.rank) ? "Hard" : "Fresh") : "—"}</strong></div>
        </div>
      </div>
    `;
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
  } else {
    content = `
      <div class="card">
        <div class="flex-between mb-12">
          <div>
            <div class="eyebrow">Review</div>
            <div class="screen-sub" style="margin-bottom:0;">Earlier bands stay in the loop.</div>
          </div>
          <span class="pill muted">${repeatBandItems.length} review words</span>
        </div>
        ${vocabBankReady
          ? `<div class="study-list">${renderVocabStudyRows(repeatBandItems.slice(-8), 8) || `<div class="screen-sub" style="margin-bottom:0;">Keep going to unlock review words.</div>`}</div>`
          : `<div class="screen-sub" style="margin-bottom:0;">Load the word bank to see repeat words here.</div>`}
      </div>
    `;
  }

  el.innerHTML = `
    <div class="card">
      <div class="eyebrow">${showQuiz && !showStudy ? "Practice · Vocabulary" : "Learn · Vocabulary"}</div>
      <h2 class="screen-title" style="margin-bottom:8px;">Today&apos;s words</h2>
      <div class="text-muted-2 fs-sm" style="margin-bottom:12px;">Stage ${String(level).padStart(2, "0")} of 10 · ${escapeHtml(bandLabel)}</div>
      <div class="text-muted-2 fs-sm">Today&apos;s flow: ${dailyWordCount} words · ${escapeHtml(bandLabel)}</div>
      ${active ? `<div class="vocab-hero-count mt-12" lang="ko">${escapeHtml(active.korean)} · ${escapeHtml(currentEnglish)} · ${escapeHtml(currentPronunciation)}</div>` : ""}
      ${viewButtons ? `<div class="vocab-filters mt-12">${viewButtons}</div>` : ""}
    </div>

    ${renderLevelRail("vocabulary", level)}

    ${content}

    ${showQuiz ? renderQuizCard("vocabulary") : ""}
  `;

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

  if (showQuiz) renderQuestion(generateQuestion(), { scope: "vocabulary" });
  showTapHint("vocabulary");
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
  if (showQuiz) renderQuestion(generateQuestion(), { scope: "listening" });
  showTapHint("listening");
}

function renderProgress() {
  const el = document.getElementById("screen-progress");
  if (!el) return;
  refreshProgressionState();

  const completedK0 = state.phaseOneCompleted.length;
  const k0Pct = Math.round((completedK0 / Math.max(1, phaseOneLessons.length)) * 100);
  const levelIndex = getLevelIndex(state.level);
  const levelNames = {
    K0: "Hangul & Sound",
    K1: "Survival Korean",
    K2: "Everyday Korean",
    K3: "Connected Korean",
    K4: "Independent Korean",
    K5: "Fluency Bridge",
  };
  const accuracy = state.asked === 0 ? 0 : Math.round((state.correct / state.asked) * 100);
  const knownWords = Array.isArray(state.vocabKnownRanks) ? state.vocabKnownRanks.length : 0;
  const hardWords = Array.isArray(state.vocabHardRanks) ? state.vocabHardRanks.length : 0;
  const totalMinutes = Number(state.totalMinutes) || 0;
  const weeklyHours = Math.max(1, Number(state.weeklyHours) || 10);
  const weeklyPct = Math.min(100, Math.round((totalMinutes / (weeklyHours * 60)) * 100));
  const nextLevel = LEVEL_ORDER[Math.min(levelIndex + 1, LEVEL_ORDER.length - 1)] || state.level;
  const canDoItems = [
    { done: completedK0 > 0, label: "Started Hangul Boot Camp" },
    { done: completedK0 >= phaseOneLessons.length, label: "Completed all K0 reading stages" },
    { done: state.correct >= 20, label: "Answered 20 quiz cards correctly" },
    { done: knownWords >= 20, label: "Marked 20 vocabulary words as known" },
    { done: state.studyDays >= 3, label: "Built a 3-day study streak" },
  ];

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

  await loadVocabBank();
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
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
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

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || !window.isSecureContext) {
    return;
  }

  // When a freshly-installed worker takes control, reload once so the page
  // runs against the new shell. Guard against first-ever install (no prior
  // controller) and against reload loops.
  let reloadingForUpdate = false;
  const hadController = Boolean(navigator.serviceWorker.controller);
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || reloadingForUpdate) return;
    reloadingForUpdate = true;
    window.location.reload();
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

document.addEventListener("DOMContentLoaded", () => {
  registerServiceWorker();
  init().catch((error) => {
    console.error("HanaPath init failed:", error);
  });
});
