const fs = require('fs');

const toRemove = new Set([
  's0327', 's1029', 's1339', 's1362', 's1427', 's1440', 's1525', 's1561',
  's1612', 's1639', 's1678', 's1707', 's1725', 's1922', 's1937', 's1955',
  's1967', 's2003', 's1338' // also add s1338 to remove
]);

const toAdd = new Set([
  's0317', 's0932', 's1110', 's1197', 's1223', 's1860'
]);

global.window = {};
const content = fs.readFileSync('sentences_core.js', 'utf8');
eval(content);

const sentences = window.HANAPATH_SENTENCES;

let countRemoved = 0;
let countAdded = 0;

for (const s of sentences) {
  if (toRemove.has(s.id)) {
    const idx = s.patternTags.indexOf('counter-phrase');
    if (idx !== -1) {
      s.patternTags.splice(idx, 1);
      s.annotationSource.patternTags = 'explicit';
      countRemoved++;
    }
  } else if (toAdd.has(s.id)) {
    if (!s.patternTags.includes('counter-phrase')) {
      s.patternTags.push('counter-phrase');
      s.annotationSource.patternTags = 'explicit';
      countAdded++;
    }
  }
}

console.log(`Updated objects: removed from ${countRemoved} rows, added to ${countAdded} rows.`);

// Let's format the whole file to write it back.
// Since we want to make sure the file matches the standard format of sentences_core.js, let's write a formatter.
// The file is wrapped in:
// (function () {
//   "use strict";
//   window.HANAPATH_SENTENCES = [
//   { ... },
//   ...
//   ];
// })();
function customFormat(obj) {
  return `  {
    "id": "${obj.id}",
    "korean": "${obj.korean}",
    "english": "${obj.english}",
    "voiceText": "${obj.voiceText}",
    "tokens": ${JSON.stringify(obj.tokens)},
    "band": ${obj.band},
    "patternTags": ${JSON.stringify(obj.patternTags)},
    "focusWordIds": ${JSON.stringify(obj.focusWordIds)},
    "sourceWordIds": ${JSON.stringify(obj.sourceWordIds)},
    "speechLevel": "${obj.speechLevel}",
    "register": "${obj.register}",
    "grammarTip": "${obj.grammarTip}",
    "acceptAlso": ${JSON.stringify(obj.acceptAlso)},
    "annotationSource": {
      "band": "${obj.annotationSource.band}",
      "patternTags": "${obj.annotationSource.patternTags}"
    },
    "source": "${obj.source}"
  }`;
}

const fileHeader = `// HanaPath sentence bank (Sentences section).
// Plain static browser global — no build step. Generated from words_curated_core.js.
// The build script preserves existing ids and curated overrides when rerun.
(function () {
  "use strict";
  window.HANAPATH_SENTENCES = [
`;

const fileFooter = `\n];
})();
`;

const newBody = sentences.map(customFormat).join(',\n');
fs.writeFileSync('sentences_core.js', fileHeader + newBody + fileFooter, 'utf8');
console.log('Successfully wrote updated sentences_core.js');
