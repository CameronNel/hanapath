const fs = require('fs');

const proposedMapping = {
  "s2008": ["topic-neun", "object-eul-reul", "present-polite"],
  "s2009": ["topic-neun", "subject-i-ga", "present-polite", "time-expression"],
  "s2010": ["object-eul-reul", "present-polite"],
  "s2011": ["object-eul-reul", "present-polite"],
  "s2012": ["topic-neun", "subject-i-ga", "copula-negative-anieyo"],
  "s2013": ["topic-neun", "present-polite"],
  "s2014": ["subject-i-ga", "present-polite", "existence-itda"],
  "s2015": ["topic-neun", "copula-ieyo"],
  "s2016": ["topic-neun", "subject-i-ga", "present-polite", "existence-itda"],
  "s2017": ["subject-i-ga", "present-polite"],
  "s2018": ["topic-neun", "location-e", "present-polite"],
  "s2019": ["object-eul-reul", "past-polite", "time-expression"],
  "s2020": ["object-eul-reul", "future-geoyeyo", "time-expression"],
  "s2021": ["object-eul-reul", "present-polite", "time-expression"],
  "s2022": ["topic-neun", "object-eul-reul", "present-polite"],
  "s2023": ["topic-neun", "location-e", "future-geoyeyo"],
  "s2024": ["topic-neun", "past-polite", "time-expression"],
  "s2025": ["subject-i-ga", "imperative-seyo", "honorific-si"],
  "s2026": ["subject-i-ga", "imperative-seyo", "honorific-si"],
  "s2027": ["topic-neun", "object-eul-reul", "present-polite"],
  "s2028": ["topic-neun", "object-eul-reul", "present-polite"],
  "s2029": ["topic-neun", "present-polite", "time-expression"],
  "s2030": ["topic-neun", "present-polite", "time-expression"],
  "s2031": ["honorific-si"],
  "s2032": ["formal-nida"],
  "s2033": ["formal-nida"],
  "s2034": ["present-polite"],
  "s2035": ["present-polite"],
  "s2036": ["present-polite"],
  "s2037": ["imperative-seyo", "honorific-si"],
  "s2038": ["only-man", "present-polite"],
  "s2039": ["present-polite"],
  "s2040": ["imperative-seyo", "honorific-si"],
  "s2041": ["imperative-seyo", "honorific-si"],
  "s2042": ["imperative-seyo", "honorific-si"],
  "s2043": ["copula-ieyo", "question-polite"],
  "s2044": ["present-polite"],
  "s2045": ["future-geoyeyo"],
  "s2046": ["future-geoyeyo"],
  "s2047": ["copula-ieyo"],
  "s2048": ["present-polite"],
  "s2049": ["formal-nida"],
  "s2050": ["formal-nida"],
  "s2051": ["formal-nida"],
  "s2052": ["imperative-seyo", "honorific-si"],
  "s2053": ["copula-ieyo", "question-polite"],
  "s2054": ["copula-ieyo", "question-polite"],
  "s2055": ["can-su-itda", "existence-itda", "present-polite", "question-polite"],
  "s2056": ["subject-i-ga", "imperative-seyo", "honorific-si"],
  "s2057": ["subject-i-ga", "imperative-seyo", "honorific-si"],
  "s2058": ["subject-i-ga", "imperative-seyo", "honorific-si"],
  "s2059": ["subject-i-ga", "imperative-seyo", "honorific-si"],
  "s2060": ["subject-i-ga", "imperative-seyo", "honorific-si"]
};

const originalContent = fs.readFileSync('sentences_core.js', 'utf8');

// Find the start of s2008 object
const searchStr = '  {\n    "id": "s2008",';
const index = originalContent.indexOf(searchStr);
if (index === -1) {
  console.error("Could not find s2008 in sentences_core.js!");
  process.exit(1);
}

const beforePart = originalContent.slice(0, index);
const afterPart = originalContent.slice(index);

// Parse the afterPart. It is like:
//   { ... },
//   { ... }
// ];
// })();
// So we wrap it in `[` and `]` but need to strip the closing `];\n})();` first.
const closingStr = '];\n})();';
const closingIndex = afterPart.lastIndexOf(closingStr);
if (closingIndex === -1) {
  console.error("Could not find closing part!");
  process.exit(1);
}

const arrayStr = '[' + afterPart.slice(0, closingIndex).trim().replace(/,\s*$/, '') + ']';
const objects = JSON.parse(arrayStr);

console.log(`Loaded ${objects.length} suffix objects starting with ${objects[0].id}`);

// Apply updates
for (const obj of objects) {
  if (proposedMapping[obj.id]) {
    obj.patternTags = proposedMapping[obj.id];
    obj.annotationSource.patternTags = 'explicit';
  }
}

// Convert back to string with exact formatting matching the style
// For objects:
//   {
//     "id": "s2008",
//     "korean": "저는 커피를 마셔요.",
//     "english": "I drink coffee.",
//     "voiceText": "저는 커피를 마셔요.",
//     "tokens": ["저는","커피를","마셔요"],
//     "band": 2,
//     "patternTags": ["topic-neun","object-eul-reul","present-polite"],
//     "focusWordIds": ["w0303_jeo_that_over","w0504_keopi"],
//     "sourceWordIds": ["w0303_jeo_that_over","w0504_keopi"],
//     "speechLevel": "polite informal",
//     "register": "polite",
//     "grammarTip": "",
//     "acceptAlso": [],
//     "annotationSource": {
//       "band": "explicit",
//       "patternTags": "explicit"
//     },
//     "source": "legacy-app"
//   }
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

const formattedSuffix = objects.map(customFormat).join(',\n') + '\n];\n})();\n';
const newContent = beforePart + formattedSuffix;

fs.writeFileSync('sentences_core.js', newContent, 'utf8');
console.log('Successfully updated sentences_core.js');
