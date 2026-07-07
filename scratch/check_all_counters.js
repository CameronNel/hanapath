const fs = require('fs');
global.window = {};
const content = fs.readFileSync('sentences_core.js', 'utf8');
eval(content);

const s = window.HANAPATH_SENTENCES;
const counters = s.filter(r => r.patternTags.includes('counter-phrase'));

console.log(`Total counter-phrase rows: ${counters.length}`);

// We want to list all rows that have counter-phrase tag, print their korean text and english meaning
const rows = counters.map(r => ({
  id: r.id,
  korean: r.korean,
  english: r.english,
  annotationSource: r.annotationSource.patternTags
}));

fs.writeFileSync('scratch/all_counters.json', JSON.stringify(rows, null, 2), 'utf8');
console.log("Wrote all_counters.json");
