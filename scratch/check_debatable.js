const fs = require('fs');
global.window = {};
const content = fs.readFileSync('sentences_core.js', 'utf8');
eval(content);

const s = window.HANAPATH_SENTENCES;
const counters = s.filter(r => r.patternTags.includes('counter-phrase'));

// Dedicated classifiers/counters list for check
const standardClassifiers = [
  '개', '명', '마리', '대', '번', '잔', '병', '살', '장', '권',
  '시간', '달', '년', '일', '시', '분', '초', '가지', '종류',
  '바퀴', '켤레', '그릇', '벌', '박', '등', '원', '퍼센트', '사람', '분'
];

const changes = [];
for (const r of counters) {
  const ko = r.korean;
  // Let's analyze the number and noun in the Korean sentence
  // We can look at the English translation and tokens to help
  let keep = false;
  
  // check if any token contains number + classifier
  // simple check: does the korean sentence contain a native number or sino number followed by a standard classifier?
  for (const cls of standardClassifiers) {
    // Check for patterns like "한 잔", "두 개", "두 사람", "열 명", etc.
    const regex1 = new RegExp(`[일이삼사오육칠팔구십백천만학한두세네다섯여섯일곱여덟아홉열스물서른마흔쉰]\\s*${cls}`);
    const regex2 = new RegExp(`[0-9]+\\s*${cls}`);
    if (regex1.test(ko) || regex2.test(ko)) {
      keep = true;
      break;
    }
  }
  
  // Specials/Exceptions to inspect
  if (!keep) {
    changes.push({
      id: r.id,
      korean: r.korean,
      english: r.english,
      tags: r.patternTags,
      source: r.annotationSource.patternTags
    });
  }
}

console.log(`Found ${changes.length} rows that do not match standard classifiers:`);
console.log(JSON.stringify(changes, null, 2));
