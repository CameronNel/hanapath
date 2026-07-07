const fs = require('fs');
global.window = {};
const content = fs.readFileSync('sentences_core.js', 'utf8');
eval(content);

const s = window.HANAPATH_SENTENCES;
const explicit = s.filter(r => r.annotationSource.patternTags === 'explicit');

console.log(explicit.filter(r => r.korean.includes('게요')).map(r => ({korean: r.korean, tags: r.patternTags})));
