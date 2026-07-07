const fs = require('fs');
global.window = {};
const content = fs.readFileSync('sentences_core.js', 'utf8');
eval(content);

const s = window.HANAPATH_SENTENCES;

const numberWords = new Set([
  '한', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉', '열',
  '스물', '서른', '마흔', '쉰', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구', '십', '백', '천', '만'
]);

const classifiers = new Set([
  '개', '명', '마리', '대', '번', '잔', '병', '살', '장', '권',
  '시간', '달', '년', '일', '시', '분', '초', '가지', '종류',
  '바퀴', '켤레', '그릇', '벌', '박', '등', '원', '퍼센트', '사람', '분'
]);

const missing = [];

for (const r of s) {
  // If it already has counter-phrase tag, skip
  if (r.patternTags.includes('counter-phrase')) continue;
  
  const ko = r.korean;
  const tokens = r.tokens;
  let hasCounterPhrase = false;
  
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    const cleanToken = t.replace(/[.,!?\s]/g, '');
    
    // Check separate adjacent tokens
    if (i < tokens.length - 1) {
      const nextToken = tokens[i+1].replace(/[.,!?\s]/g, '');
      if ((numberWords.has(cleanToken) || /^[0-9]+$/.test(cleanToken)) && classifiers.has(nextToken)) {
        hasCounterPhrase = true;
        break;
      }
    }
    
    // Check single token
    for (const num of numberWords) {
      if (cleanToken.startsWith(num) && cleanToken.length > num.length) {
        const rest = cleanToken.slice(num.length);
        if (classifiers.has(rest)) {
          hasCounterPhrase = true;
          break;
        }
      }
    }
    
    const digitMatch = cleanToken.match(/^([0-9]+)(.*)$/);
    if (digitMatch) {
      const rest = digitMatch[2];
      if (classifiers.has(rest) || rest === '등' || rest === '%') {
        hasCounterPhrase = true;
        break;
      }
    }
  }
  
  if (hasCounterPhrase) {
    missing.push({ id: r.id, korean: r.korean, english: r.english, tags: r.patternTags });
  }
}

console.log(`Found ${missing.length} rows missing counter-phrase tag:`);
console.log(JSON.stringify(missing, null, 2));
