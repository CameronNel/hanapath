const fs = require('fs');

const toRemove = new Set([
  's0327', 's1029', 's1339', 's1362', 's1427', 's1440', 's1525', 's1561',
  's1612', 's1639', 's1678', 's1707', 's1725', 's1922', 's1937', 's1955',
  's1967', 's2003', 's1338'
]);

const toAdd = new Set([
  's0317', 's0932', 's1110', 's1197', 's1223', 's1860'
]);

global.window = {};
const fileContent = fs.readFileSync('sentences_core.js', 'utf8');
eval(fileContent);
const sentences = window.HANAPATH_SENTENCES;

let modifiedContent = fileContent;

for (const s of sentences) {
  if (toRemove.has(s.id) || toAdd.has(s.id)) {
    // Determine new patternTags
    let newTags = [...s.patternTags];
    if (toRemove.has(s.id)) {
      const idx = newTags.indexOf('counter-phrase');
      if (idx !== -1) newTags.splice(idx, 1);
    } else {
      if (!newTags.includes('counter-phrase')) newTags.push('counter-phrase');
    }
    
    // Find the object start in modifiedContent
    const idMarker = `"id": "${s.id}"`;
    const markerIndex = modifiedContent.indexOf(idMarker);
    if (markerIndex === -1) {
      console.error(`Could not find id marker for ${s.id}`);
      continue;
    }
    
    // Find the patternTags block start within this object
    // Find the next "patternTags": after the id marker
    const searchFrom = markerIndex;
    const tagIndex = modifiedContent.indexOf('"patternTags":', searchFrom);
    if (tagIndex === -1) {
      console.error(`Could not find patternTags block for ${s.id}`);
      continue;
    }
    
    // Find the end of the patternTags block (closes with ], or ])
    // Let's determine if it's single line or multi-line
    const lineEndIndex = modifiedContent.indexOf('\n', tagIndex);
    const lineContent = modifiedContent.slice(tagIndex, lineEndIndex);
    
    let targetBlock = '';
    let replacementBlock = '';
    
    if (lineContent.includes('[') && lineContent.includes(']')) {
      // Single line block
      targetBlock = lineContent;
      replacementBlock = `"patternTags": ${JSON.stringify(newTags)}`;
    } else {
      // Multi-line block
      const endBraceIndex = modifiedContent.indexOf('],', tagIndex);
      if (endBraceIndex === -1) {
        console.error(`Could not find closing ], for ${s.id}`);
        continue;
      }
      targetBlock = modifiedContent.slice(tagIndex, endBraceIndex + 2);
      // Format replacement as multi-line
      const formattedTags = newTags.map(t => `      "${t}"`).join(',\n');
      replacementBlock = `"patternTags": [\n${formattedTags}\n    ],`;
    }
    
    // Also, update annotationSource.patternTags to "explicit"
    // Find "patternTags": within annotationSource
    const sourceIndex = modifiedContent.indexOf('"annotationSource":', searchFrom);
    if (sourceIndex !== -1) {
      // Within annotationSource block, find "patternTags": "..."
      const nextTagsIndex = modifiedContent.indexOf('"patternTags":', sourceIndex);
      const nextLineEnd = modifiedContent.indexOf('\n', nextTagsIndex);
      const sourceLine = modifiedContent.slice(nextTagsIndex, nextLineEnd);
      
      const newSourceLine = `"patternTags": "explicit"`;
      modifiedContent = modifiedContent.slice(0, nextTagsIndex) + newSourceLine + modifiedContent.slice(nextLineEnd);
    }
    
    // Perform replacement of patternTags block (index positions might have shifted due to previous source replace, so search again)
    const newMarkerIndex = modifiedContent.indexOf(idMarker);
    const newTagIndex = modifiedContent.indexOf('"patternTags":', newMarkerIndex);
    
    // Find length of targetBlock in original file, but let's just find the end of target block in modifiedContent
    let targetLength = targetBlock.length;
    if (!lineContent.includes('[')) {
      // check multi-line end
      const endBraceIndex = modifiedContent.indexOf('],', newTagIndex);
      targetLength = (endBraceIndex + 2) - newTagIndex;
    }
    
    modifiedContent = modifiedContent.slice(0, newTagIndex) + replacementBlock + modifiedContent.slice(newTagIndex + targetLength);
  }
}

fs.writeFileSync('sentences_core.js', modifiedContent, 'utf8');
console.log('Successfully completed targeted updates to sentences_core.js');
