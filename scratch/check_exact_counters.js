const fs = require('fs');
global.window = {};
const content = fs.readFileSync('sentences_core.js', 'utf8');
eval(content);

const s = window.HANAPATH_SENTENCES;
const counters = s.filter(r => r.patternTags.includes('counter-phrase'));

const numberWords = new Set([
  '한', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉', '열',
  '열한', '열두', '열세', '열네', '열다섯', '열여섯', '열일곱', '열여덟', '열아홉', '스물',
  '서른', '마흔', '쉰', '예순', '일흔', '여든', '아흔',
  '일', '이', '삼', '사', '오', '육', '칠', '팔', '구', '십', '백', '천', '만'
]);

const classifiers = new Set([
  '개', '명', '마리', '대', '번', '잔', '병', '살', '장', '권',
  '시간', '달', '년', '일', '시', '분', '초', '가지', '종류',
  '바퀴', '켤레', '그릇', '벌', '박', '등', '원', '퍼센트', '사람', '분'
]);

const matchedRows = [];
const nonMatchedRows = [];

for (const r of counters) {
  const tokens = r.tokens;
  let matchedPhrase = null;
  
  // Look at adjacent tokens, e.g. "한", "개"
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    // Strip trailing punctuation
    const cleanToken = t.replace(/[.,!?\s]/g, '');
    
    // Check if token itself contains a number + classifier, like "한개", "두명", "두사람", "세시", "오분", "1등", "50%"
    // Or if it's separate like "한", "개"
    // Let's check for separate first
    if (i < tokens.length - 1) {
      const nextToken = tokens[i+1].replace(/[.,!?\s]/g, '');
      // Check if current token is in numberWords and next is classifier or starts with classifier
      const numberPart = cleanToken;
      const classifierPart = nextToken;
      
      // Check if numberPart is pure digits
      const isDigit = /^[0-9]+$/.test(numberPart);
      if ((numberWords.has(numberPart) || isDigit) && (classifiers.has(classifierPart) || classifiers.has(classifierPart.slice(0, 1)) || classifiers.has(classifierPart.slice(0, 2)))) {
        // e.g. "한", "개" or "두", "사람이"
        matchedPhrase = `${t} ${tokens[i+1]}`;
        break;
      }
    }
    
    // Check if single token contains it
    // e.g. "두사람이", "1등을", "세시반", "십분"
    // Let's test if it starts with a number word or digits, and then has a classifier
    for (const num of numberWords) {
      if (cleanToken.startsWith(num) && cleanToken.length > num.length) {
        const rest = cleanToken.slice(num.length);
        if (classifiers.has(rest) || classifiers.has(rest.slice(0, 1)) || classifiers.has(rest.slice(0, 2))) {
          matchedPhrase = t;
          break;
        }
      }
    }
    const digitMatch = cleanToken.match(/^([0-9]+)(.*)$/);
    if (digitMatch) {
      const rest = digitMatch[2];
      if (classifiers.has(rest) || classifiers.has(rest.slice(0, 1)) || classifiers.has(rest.slice(0, 2)) || rest === '등' || rest === '%') {
        matchedPhrase = t;
        break;
      }
    }
    
    // Also support standalone native numbers like "하나", "둘", "셋"
    if (['하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉', '열'].includes(cleanToken)) {
      matchedPhrase = t;
      break;
    }
  }
  
  if (matchedPhrase) {
    matchedRows.push({ id: r.id, korean: r.korean, english: r.english, match: matchedPhrase });
  } else {
    nonMatchedRows.push({ id: r.id, korean: r.korean, english: r.english, tokens: r.tokens });
  }
}

console.log(`Matched rows with valid counter phrase: ${matchedRows.length}`);
console.log(`Non-matched rows: ${nonMatchedRows.length}`);
console.log("\n=== NON-MATCHED ROWS ===");
console.log(JSON.stringify(nonMatchedRows, null, 2));
