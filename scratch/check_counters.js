const fs = require('fs');
global.window = {};
const content = fs.readFileSync('sentences_core.js', 'utf8');
eval(content);

const s = window.HANAPATH_SENTENCES;
const explicitWithCounter = s.filter(r => r.annotationSource.patternTags === 'explicit' && r.patternTags.includes('counter-phrase'));
console.log(`Found ${explicitWithCounter.length} explicit rows with counter-phrase tag. Examples:`);
console.log(explicitWithCounter.slice(0, 15).map(r => ({id: r.id, korean: r.korean, english: r.english, tags: r.patternTags})));
