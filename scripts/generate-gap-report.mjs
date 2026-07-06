#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadExistingSentenceBank, ROOT } from "./sentences-bank.mjs";

const VALID_PATTERN_TAGS = [
  "topic-neun",
  "subject-i-ga",
  "object-eul-reul",
  "location-e",
  "location-eseo",
  "direction-euro",
  "possessive-ui",
  "with-hago-wa",
  "only-man",
  "also-do",
  "from-buteo",
  "until-kkaji",
  "present-polite",
  "past-polite",
  "future-geoyeyo",
  "formal-nida",
  "copula-ieyo",
  "copula-negative-anieyo",
  "question-polite",
  "imperative-seyo",
  "propositive-eyo",
  "neg-an",
  "neg-mot",
  "neg-ji-anta",
  "and-go",
  "but-jiman",
  "because-aseo",
  "if-myeon",
  "when-ttae",
  "want-go-sipda",
  "can-su-itda",
  "must-ya-dwaeda",
  "honorific-si",
  "counter-phrase",
  "time-expression",
  "comparison-boda",
  "existence-itda"
];

const sentences = loadExistingSentenceBank();

// Initialize matrix
const matrix = {};
for (const tag of VALID_PATTERN_TAGS) {
  matrix[tag] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, total: 0 };
}

for (const row of sentences) {
  const band = row.band || 1;
  const tags = row.patternTags || [];
  for (const tag of tags) {
    if (matrix[tag]) {
      matrix[tag][band]++;
      matrix[tag].total++;
    }
  }
}

// Generate report content
let report = `# Sentence Pattern Tag Coverage & Gap Report\n\n`;
report += `This report outlines the distribution of sentences across the 37 closed pattern tags and 5 difficulty bands, identifying thin cells (<10 sentences) and proposing expansion batches to address coverage gaps.\n\n`;
report += `**Total Sentences scanned:** ${sentences.length}\n\n`;

report += `## 1. Coverage Matrix (patternTags × band)\n\n`;
report += `| Pattern Tag | Band 1 | Band 2 | Band 3 | Band 4 | Band 5 | Total |\n`;
report += `|---|---|---|---|---|---|---|\n`;

for (const tag of VALID_PATTERN_TAGS) {
  const m = matrix[tag];
  report += `| \`${tag}\` | ${m[1]} | ${m[2]} | ${m[3]} | ${m[4]} | ${m[5]} | **${m.total}** |\n`;
}

report += `\n`;
report += `## 2. Low Coverage Tags (<10 sentences total)\n\n`;
report += `The following tags have critically low overall sentence coverage across all bands:\n\n`;

let lowCount = 0;
for (const tag of VALID_PATTERN_TAGS) {
  const m = matrix[tag];
  if (m.total < 10) {
    report += `- \`${tag}\` (${m.total} sentences total: Band 1: ${m[1]}, Band 2: ${m[2]}, Band 3: ${m[3]}, Band 4: ${m[4]}, Band 5: ${m[5]})\n`;
    lowCount++;
  }
}
if (lowCount === 0) {
  report += `*No tags have fewer than 10 sentences total. All tags meet the minimum baseline.*\n`;
}

report += `\n`;
report += `## 3. Thin Cells (<5 sentences in target bands)\n\n`;
report += `The following pattern tags have very thin coverage (fewer than 5 sentences) in specific bands where they should naturally appear:\n\n`;

let thinCellCount = 0;
const tagNaturalBands = {
  "topic-neun": [1, 2],
  "subject-i-ga": [1, 2],
  "object-eul-reul": [1, 2],
  "location-e": [1, 2],
  "location-eseo": [2, 3],
  "direction-euro": [2, 3],
  "possessive-ui": [2, 3],
  "with-hago-wa": [2, 3],
  "only-man": [2, 3],
  "also-do": [1, 2],
  "from-buteo": [3, 4],
  "until-kkaji": [3, 4],
  "present-polite": [1, 2],
  "past-polite": [2, 3],
  "future-geoyeyo": [3, 4],
  "formal-nida": [4, 5],
  "copula-ieyo": [1, 2],
  "copula-negative-anieyo": [1, 2],
  "question-polite": [1, 2],
  "imperative-seyo": [2, 3],
  "propositive-eyo": [2, 3],
  "neg-an": [2, 3],
  "neg-mot": [2, 3],
  "neg-ji-anta": [3, 4],
  "and-go": [3, 4],
  "but-jiman": [4, 5],
  "because-aseo": [4, 5],
  "if-myeon": [4, 5],
  "when-ttae": [3, 4],
  "want-go-sipda": [3, 4],
  "can-su-itda": [3, 4],
  "must-ya-dwaeda": [3, 4],
  "honorific-si": [4, 5],
  "counter-phrase": [2, 3],
  "time-expression": [3, 4],
  "comparison-boda": [3, 4],
  "existence-itda": [1, 2],
};

for (const tag of VALID_PATTERN_TAGS) {
  const m = matrix[tag];
  const targetBands = tagNaturalBands[tag] || [];
  for (const b of targetBands) {
    if (m[b] < 5) {
      report += `- \`${tag}\` in **Band ${b}** (${m[b]} sentences)\n`;
      thinCellCount++;
    }
  }
}
if (thinCellCount === 0) {
  report += `*No thin cells found in target bands.*\n`;
}

report += `\n`;
report += `## 4. Proposed Expansion Batches\n\n`;
report += `Based on the matrix above, we propose the following expansion batches (Total: ~100 original sentences) to fill out thin cells and guarantee a robust pool for all modes of the Sentence Studio:\n\n`;

report += `1. **Formal Register & Honorifics Expansion (Band 4 & 5)**\n`;
report += `   - Target tags: \`formal-nida\`, \`honorific-si\`\n`;
report += `   - Goal: Add ~30 sentences in Bands 4 and 5 practicing formal-polite conversation, office/business dialogues, and respectful speaking patterns.\n\n`;

report += `2. **Clause Linkers & Complex Sentences (Band 4 & 5)**\n`;
report += `   - Target tags: \`but-jiman\`, \`because-aseo\`, \`if-myeon\`, \`and-go\`\n`;
report += `   - Goal: Add ~35 multi-clause sentences illustrating cause-and-effect, conditional situations, and contrasting ideas.\n\n`;

report += `3. **Particles & Specifiers (Band 3 & 4)**\n`;
report += `   - Target tags: \`from-buteo\`, \`until-kkaji\`, \`only-man\`, \`direction-euro\`, \`comparison-boda\`\n`;
report += `   - Goal: Add ~25 sentences detailing journeys (from/until location/time), directions, limitations, and comparisons.\n\n`;

report += `4. **Negative Auxiliary / Complex Negations (Band 3 & 4)**\n`;
report += `   - Target tags: \`neg-ji-anta\`, \`neg-mot\`\n`;
report += `   - Goal: Add ~10 sentences practicing long negation (-지 않다) and inability (못).\n`;

const outputPath = join(ROOT, "docs", "SENTENCES_GAP_REPORT.md");
writeFileSync(outputPath, report, "utf8");
console.log(`Gap report generated successfully at: ${outputPath}`);
