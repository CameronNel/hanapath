const fs = require('fs');
const vm = require('vm');

// Helper to load a JS file into context
function loadScript(filePath, context) {
  const code = fs.readFileSync(filePath, 'utf8');
  vm.runInContext(code, context, { filename: filePath });
}

// Create a sandbox context mimicking the browser global scope
const sandbox = {
  console: console,
  window: {},
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
};
sandbox.window = sandbox;

// Mock basic DOM objects and methods
sandbox.document = {
  addEventListener: () => {},
  getElementById: () => ({
    addEventListener: () => {},
    setAttribute: () => {},
    removeAttribute: () => {},
    querySelector: () => ({ addEventListener: () => {}, setAttribute: () => {}, removeAttribute: () => {} }),
    querySelectorAll: () => [],
    style: {},
  }),
  querySelector: () => ({
    addEventListener: () => {},
    setAttribute: () => {},
    removeAttribute: () => {},
    style: {},
  }),
  querySelectorAll: () => [],
  createElement: () => ({
    style: {},
    appendChild: () => {},
  }),
};
sandbox.navigator = {
  userAgent: 'node',
  serviceWorker: {
    register: () => Promise.resolve(),
  },
};
sandbox.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};
sandbox.location = {
  hash: '',
  href: 'http://localhost:8000/index.html',
};
sandbox.Audio = function() {
  return {
    play: () => Promise.resolve(),
    pause: () => {},
  };
};

const context = vm.createContext(sandbox);

console.log("Loading data files...");
loadScript('lib/hangul.js', context);
loadScript('audio_map.js', context);
loadScript('words_curated_core.js', context);
loadScript('words_inflect.js', context);
loadScript('words_lesson_plan.js', context);
loadScript('raw_word_meanings.js', context);
loadScript('sentences_core.js', context);

console.log("Loading app.js...");
let appCode = fs.readFileSync('app.js', 'utf8');

// Append the test code directly to appCode to execute inside app.js scope
const testCode = `
console.log("\\n=== Verifying Survival & Listening Deck Resolving inside VM ===");

// 1. Verify survivalPhrases mapping
console.log("survivalPhrases size: " + survivalPhrases.length);
let survivalMisses = 0;
for (const entry of survivalPhrases) {
  if (entry.meaning === "") {
    console.error("Missing lookup meaning for survival phrase: " + entry.phrase);
    survivalMisses++;
  }
}

// 2. Verify verbSentenceBank mapping
console.log("verbSentenceBank size: " + verbSentenceBank.length);
let verbMisses = 0;
for (const entry of verbSentenceBank) {
  if (entry.english === "") {
    console.error("Missing lookup meaning for verb sentence: " + entry.korean);
    verbMisses++;
  }
}

// 3. Verify verbHonorificBank mapping
console.log("verbHonorificBank size: " + verbHonorificBank.length);
let honorificMisses = 0;
for (const entry of verbHonorificBank) {
  if (entry.english === "" || entry.honorificEnglish === "") {
    console.error("Missing lookup meaning for verb honorific baseline/form: " + entry.korean + " / " + entry.honorific);
    honorificMisses++;
  }
}

// 4. Verify grammarSentenceBank mapping
console.log("grammarSentenceBank size: " + grammarSentenceBank.length);
let grammarMisses = 0;
for (const entry of grammarSentenceBank) {
  if (entry.english === "") {
    console.error("Missing lookup meaning for grammar sentence: " + entry.korean);
    grammarMisses++;
  }
}

// 5. Verify conversationLineBank mapping
console.log("conversationLineBank size: " + conversationLineBank.length);
let conversationMisses = 0;
for (const entry of conversationLineBank) {
  if (entry.starterEnglish === "" || entry.replyEnglish === "") {
    console.error("Missing lookup meaning for conversation: " + entry.starter + " / " + entry.reply);
    conversationMisses++;
  }
}

const totalErrors = survivalMisses + verbMisses + honorificMisses + grammarMisses + conversationMisses;
if (totalErrors === 0) {
  console.log("\\nSUCCESS: All 54+ legacy mini-bank sentence lookups resolved successfully to HANAPATH_SENTENCES with non-empty translations!");
} else {
  console.error("\\nFAILED: Found " + totalErrors + " unresolved sentence lookup(s).");
  throw new Error("unresolved lookups");
}
`;

vm.runInContext(appCode + testCode, context, { filename: 'app.js' });
