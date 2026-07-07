const fs = require('fs');
global.window = {};
const content = fs.readFileSync('sentences_core.js', 'utf8');
eval(content);

const inferredRows = window.HANAPATH_SENTENCES.filter(r => r.annotationSource?.patternTags === 'inferred');
fs.writeFileSync('scratch/inferred_list.json', JSON.stringify(inferredRows, null, 2), 'utf8');
console.log(`Wrote ${inferredRows.length} rows to scratch/inferred_list.json`);
