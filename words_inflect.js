/**
 * words_inflect.js — Korean vocabulary inflection engine
 * Pure JavaScript library for verb/adjective conjugation and stem modification.
 */
(function () {
  'use strict';

  const CHO_LIST = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  ];
  const JUNG_LIST = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', '요', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
  ];
  const JONG_LIST = [
    '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  ];

  function decompose(char) {
    const cp = char.charCodeAt(0);
    if (cp >= 0xAC00 && cp <= 0xD7A3) {
      const offset = cp - 0xAC00;
      const jong = offset % 28;
      const jung = Math.floor((offset / 28)) % 21;
      const cho = Math.floor(offset / (21 * 28));
      return {
        cho: CHO_LIST[cho],
        jung: JUNG_LIST[jung],
        jong: JONG_LIST[jong]
      };
    }
    return { cho: char, jung: '', jong: '' };
  }

  function assemble(cho, jung, jong) {
    const choIdx = CHO_LIST.indexOf(cho);
    const jungIdx = JUNG_LIST.indexOf(jung);
    const jongIdx = JONG_LIST.indexOf(jong || '');
    if (choIdx !== -1 && jungIdx !== -1 && jongIdx !== -1) {
      return String.fromCharCode(0xAC00 + (choIdx * 21 + jungIdx) * 28 + jongIdx);
    }
    return cho; // fallback
  }

  function getStem(dictionaryForm) {
    if (dictionaryForm.endsWith('다')) {
      return dictionaryForm.slice(0, -1);
    }
    return dictionaryForm;
  }

  function isPositiveVowel(vowel) {
    return vowel === 'ㅏ' || vowel === 'ㅗ' || vowel === 'ㅘ' || vowel === 'ㅚ' || vowel === 'ㅐ';
  }

  function conjugate(korean, pos, irregularFamily, formName) {
    if (pos !== 'verb' && pos !== 'adjective') {
      return korean; // nouns/particles don't inflect
    }

    const originalStem = getStem(korean);
    if (!originalStem) return korean;

    // Helper: Decompose last syllable of stem
    const lastChar = originalStem.slice(-1);
    const dec = decompose(lastChar);

    // ─── FORM: FORMAL (-(스)ㅂ니다) ───
    if (formName === 'formal') {
      if (irregularFamily === 'ㄹ-deletion' && dec.jong === 'ㄹ') {
        const stemPre = originalStem.slice(0, -1);
        const resolvedLast = assemble(dec.cho, dec.jung, 'ㅂ');
        return stemPre + resolvedLast + '니다';
      }
      if (dec.jong !== '') {
        return originalStem + '습니다';
      } else {
        const stemPre = originalStem.slice(0, -1);
        const resolvedLast = assemble(dec.cho, dec.jung, 'ㅂ');
        return stemPre + resolvedLast + '니다';
      }
    }

    // ─── FORM: HONORIFIC (-(으)세요) ───
    if (formName === 'honorific') {
      if (irregularFamily === 'ㄹ-deletion' && dec.jong === 'ㄹ') {
        const stemPre = originalStem.slice(0, -1);
        const resolvedLast = assemble(dec.cho, dec.jung, '');
        return stemPre + resolvedLast + '세요';
      }
      if (irregularFamily === 'ㄷ' && dec.jong === 'ㄷ') {
        const stemPre = originalStem.slice(0, -1);
        const resolvedLast = assemble(dec.cho, dec.jung, 'ㄹ');
        return stemPre + resolvedLast + '으세요';
      }
      if (irregularFamily === 'ㅂ' && dec.jong === 'ㅂ') {
        const stemPre = originalStem.slice(0, -1);
        const resolvedLast = assemble(dec.cho, dec.jung, '');
        // For honorific, ㅂ becomes 우, always vowel ending -> add 세요
        return stemPre + resolvedLast + '우세요';
      }
      if (irregularFamily === 'ㅅ' && dec.jong === 'ㅅ') {
        const stemPre = originalStem.slice(0, -1);
        const resolvedLast = assemble(dec.cho, dec.jung, '');
        return stemPre + resolvedLast + '으세요';
      }
      if (irregularFamily === 'ㅎ' && dec.jong === 'ㅎ') {
        const stemPre = originalStem.slice(0, -1);
        const resolvedLast = assemble(dec.cho, dec.jung, '');
        return stemPre + resolvedLast + '세요';
      }
      
      if (dec.jong !== '') {
        return originalStem + '으세요';
      } else {
        return originalStem + '세요';
      }
    }

    // ─── FORM: ATTRIBUTIVE (Noun Modifier) ───
    if (formName === 'attributive') {
      if (pos === 'verb') {
        // Verbs: stem + 는 (present)
        if (irregularFamily === 'ㄹ-deletion' && dec.jong === 'ㄹ') {
          const stemPre = originalStem.slice(0, -1);
          const resolvedLast = assemble(dec.cho, dec.jung, '');
          return stemPre + resolvedLast + '는';
        }
        return originalStem + '는';
      } else {
        // Adjectives: stem + (으)ㄴ
        if (irregularFamily === 'ㅂ' && dec.jong === 'ㅂ') {
          const stemPre = originalStem.slice(0, -1);
          const resolvedLast = assemble(dec.cho, dec.jung, '');
          return stemPre + resolvedLast + '운';
        }
        if (irregularFamily === 'ㅎ' && dec.jong === 'ㅎ') {
          const stemPre = originalStem.slice(0, -1);
          const resolvedLast = assemble(dec.cho, dec.jung, 'ㄴ');
          return stemPre + resolvedLast;
        }
        if (irregularFamily === 'ㄹ-deletion' && dec.jong === 'ㄹ') {
          const stemPre = originalStem.slice(0, -1);
          const resolvedLast = assemble(dec.cho, dec.jung, 'ㄴ');
          return stemPre + resolvedLast;
        }
        if (irregularFamily === 'ㅅ' && dec.jong === 'ㅅ') {
          const stemPre = originalStem.slice(0, -1);
          const resolvedLast = assemble(dec.cho, dec.jung, '');
          return stemPre + resolvedLast + '은';
        }
        if (dec.jong !== '') {
          return originalStem + '은';
        } else {
          const stemPre = originalStem.slice(0, -1);
          const resolvedLast = assemble(dec.cho, dec.jung, 'ㄴ');
          return stemPre + resolvedLast;
        }
      }
    }

    // ─── FORM: POLITE PRESENT (해요체) & PAST ───
    // We first compute the "polite stem" (stem + 어/아), which is also the base for past tense.
    let politeStem = '';

    if (irregularFamily === 'ㄷ' && dec.jong === 'ㄷ') {
      const stemPre = originalStem.slice(0, -1);
      const resolvedLast = assemble(dec.cho, dec.jung, 'ㄹ');
      const tempStem = stemPre + resolvedLast;
      // Vowel harmony of tempStem last syllable (들)
      const harmonyAh = isPositiveVowel(dec.jung);
      politeStem = tempStem + (harmonyAh ? '아' : '어');
    } else if (irregularFamily === 'ㅂ' && dec.jong === 'ㅂ') {
      const stemPre = originalStem.slice(0, -1);
      const resolvedLast = assemble(dec.cho, dec.jung, '');
      const tempStem = stemPre + resolvedLast;
      if (korean === '돕다' || korean === '곱다') {
        politeStem = tempStem + '와';
      } else {
        politeStem = tempStem + '워';
      }
    } else if (irregularFamily === 'ㅅ' && dec.jong === 'ㅅ') {
      const stemPre = originalStem.slice(0, -1);
      const resolvedLast = assemble(dec.cho, dec.jung, '');
      const harmonyAh = isPositiveVowel(dec.jung);
      politeStem = stemPre + resolvedLast + (harmonyAh ? '아' : '어');
    } else if (irregularFamily === 'ㅎ' && dec.jong === 'ㅎ') {
      const stemPre = originalStem.slice(0, -1);
      let newJung = 'ㅐ';
      if (dec.jung === 'ㅑ') newJung = 'ㅒ';
      const resolvedLast = assemble(dec.cho, newJung, '');
      politeStem = stemPre + resolvedLast;
    } else if (irregularFamily === '르' && originalStem.length >= 2) {
      const stemPre = originalStem.slice(0, -2);
      const prevChar = originalStem.slice(-2, -1);
      const prevDec = decompose(prevChar);
      const prevResolved = assemble(prevDec.cho, prevDec.jung, 'ㄹ');
      
      const harmonyAh = isPositiveVowel(prevDec.jung);
      const lastResolved = assemble(dec.cho, harmonyAh ? 'ㅏ' : 'ㅓ', '');
      politeStem = stemPre + prevResolved + lastResolved;
    } else if (irregularFamily === '러') {
      politeStem = originalStem + '러';
    } else {
      // Regular conjugation
      if (originalStem === '하' || originalStem.endsWith('하')) {
        politeStem = originalStem.slice(0, -1) + '해';
      } else if (dec.jong !== '') {
        const harmonyAh = isPositiveVowel(dec.jung);
        politeStem = originalStem + (harmonyAh ? '아' : '어');
      } else {
        // Vowel ending — merges/contractions
        const stemPre = originalStem.slice(0, -1);
        if (dec.jung === 'ㅏ') {
          politeStem = stemPre + assemble(dec.cho, 'ㅏ', '');
        } else if (dec.jung === 'ㅓ') {
          politeStem = stemPre + assemble(dec.cho, 'ㅓ', '');
        } else if (dec.jung === 'ㅗ') {
          politeStem = stemPre + assemble(dec.cho, 'ㅘ', '');
        } else if (dec.jung === 'ㅜ') {
          politeStem = stemPre + assemble(dec.cho, 'ㅝ', '');
        } else if (dec.jung === 'ㅣ') {
          politeStem = stemPre + assemble(dec.cho, 'ㅕ', '');
        } else if (dec.jung === 'ㅐ') {
          politeStem = stemPre + assemble(dec.cho, 'ㅐ', '');
        } else if (dec.jung === 'ㅚ') {
          politeStem = stemPre + assemble(dec.cho, 'ㅙ', '');
        } else if (dec.jung === 'ㅡ') {
          // Check preceding syllable vowel
          let harmonyAh = false;
          if (originalStem.length >= 2) {
            const prevChar = originalStem.slice(-2, -1);
            const prevDec = decompose(prevChar);
            harmonyAh = isPositiveVowel(prevDec.jung);
          }
          politeStem = stemPre + assemble(dec.cho, harmonyAh ? 'ㅏ' : 'ㅓ', '');
        } else {
          politeStem = originalStem + '어';
        }
      }
    }

    if (formName === 'polite') {
      return politeStem + '요';
    }

    if (formName === 'past') {
      // Add ㅆ to the last character of politeStem if it ends in a vowel, else add 었어요/았어요
      const lastPoliteChar = politeStem.slice(-1);
      const pDec = decompose(lastPoliteChar);
      if (pDec.jong === '') {
        const politePre = politeStem.slice(0, -1);
        const resolvedLast = assemble(pDec.cho, pDec.jung, 'ㅆ');
        return politePre + resolvedLast + '어요';
      } else {
        return politeStem + '어요';
      }
    }

    return korean;
  }

  const Inflect = {
    decompose,
    assemble,
    getStem,
    conjugate,
    inflect: function (word, formName) {
      return conjugate(word.korean, word.pos, word.irregularFamily, formName);
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Inflect;
  } else {
    window.HANAPATH_INFLECT = Inflect;
  }
})();
