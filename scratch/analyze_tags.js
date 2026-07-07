const fs = require('fs');

const tagsConfig = {
  particles: [
    'topic-neun', 'subject-i-ga', 'object-eul-reul',
    'location-e', 'location-eseo', 'direction-euro', 'possessive-ui',
    'with-hago-wa', 'only-man', 'also-do', 'from-buteo', 'until-kkaji'
  ],
  endings: [
    'present-polite', 'past-polite', 'future-geoyeyo', 'formal-nida',
    'copula-ieyo', 'copula-negative-anieyo', 'question-polite',
    'imperative-seyo', 'propositive-eyo'
  ],
  negation: [
    'neg-an', 'neg-mot', 'neg-ji-anta'
  ],
  linkers: [
    'and-go', 'but-jiman', 'because-aseo', 'if-myeon', 'when-ttae',
    'want-go-sipda', 'can-su-itda', 'must-ya-dwaeda'
  ],
  other: [
    'honorific-si', 'counter-phrase', 'time-expression', 'comparison-boda',
    'existence-itda'
  ]
};

const allTags = [
  ...tagsConfig.particles,
  ...tagsConfig.endings,
  ...tagsConfig.negation,
  ...tagsConfig.linkers,
  ...tagsConfig.other
];

global.window = {};
const content = fs.readFileSync('sentences_core.js', 'utf8');
eval(content);

const inferredRows = window.HANAPATH_SENTENCES.filter(r => r.annotationSource?.patternTags === 'inferred');

const analysis = inferredRows.map(r => {
  const ko = r.korean;
  const en = r.english;
  const id = r.id;
  const infTags = r.patternTags;
  
  // Custom suggestion logic based on rules
  const prop = [];
  
  // Particles
  if (ko.includes('은') || ko.includes('는')) {
    // Need to avoid false positive for 는 modifier or verb ending, but these are simple sentences.
    // Let's verify case-by-case.
    if (ko.includes('저는') || ko.includes('은 ') || ko.includes('는 ') || ko.endsWith('은') || ko.endsWith('는')) {
      prop.push('topic-neun');
    }
  }
  if (ko.includes('이 ') || ko.includes('가 ') || ko.includes('이가') || ko.includes('님이') || ko.includes('이가 ') || ko.includes('이.') || ko.includes('가.') || ko.includes('이?') || ko.includes('가?')) {
    // but not 아니에요's "학생이" (which is subject-i-ga too)
    prop.push('subject-i-ga');
  }
  if (ko.includes('을') || ko.includes('를')) {
    prop.push('object-eul-reul');
  }
  if (ko.includes('에 ')) {
    prop.push('location-e');
  }
  if (ko.includes('에서')) {
    prop.push('location-eseo');
  }
  if (ko.includes('으로') || ko.includes('로 ')) {
    prop.push('direction-euro');
  }
  if (ko.includes('의 ')) {
    prop.push('possessive-ui');
  }
  if (ko.includes('하고') || ko.includes('와 ') || ko.includes('과 ')) {
    // watch out for 과 in 사과, 하고 in 일하고/공부하고/도와주고/말하고
    if (ko.includes('하고 ') && !ko.includes('말하고') && !ko.includes('일하고') && !ko.includes('공부하고')) {
       prop.push('with-hago-wa');
    } else if (ko.includes('와 ') || (ko.includes('과 ') && !ko.includes('사과'))) {
       prop.push('with-hago-wa');
    }
  }
  if (ko.includes('만 ')) {
    prop.push('only-man');
  }
  if (ko.includes('도 ')) {
    prop.push('also-do');
  }
  
  // Tense / Endings
  if (ko.includes('았어') || ko.includes('었어') || ko.includes('했어') || ko.includes('왔어') || ko.includes('갔어')) {
    prop.push('past-polite');
  } else if (ko.includes('예요') || ko.includes('이에요')) {
    prop.push('copula-ieyo');
  } else if (ko.includes('아니에요')) {
    prop.push('copula-negative-anieyo');
  } else if (ko.includes('ㅂ니다') || ko.includes('습니다') || ko.includes('뵙겠습니다')) {
    prop.push('formal-nida');
  } else if (ko.includes('세요') || ko.includes('으세요') || ko.includes('셔요')) {
    // 세요 can be honorific-si and present-polite or imperative-seyo.
    // e.g. "커피 주세요" -> 주세요 is honorific-si + present-polite? Wait, or imperative-seyo?
    // Let's check how existing explicit "주세요" is tagged.
  }
  
  // Negation
  if (ko.includes('안 ')) {
    prop.push('neg-an');
  }
  if (ko.includes('못 ')) {
    prop.push('neg-mot');
  }
  if (ko.includes('지 않')) {
    prop.push('neg-ji-anta');
  }
  
  // linkers
  if (ko.includes('고 ')) {
    prop.push('and-go');
  }
  if (ko.includes('지만')) {
    prop.push('but-jiman');
  }
  if (ko.includes('어서 ') || ko.includes('아서 ')) {
    prop.push('because-aseo');
  }
  if (ko.includes('면 ')) {
    prop.push('if-myeon');
  }
  if (ko.includes('때 ')) {
    prop.push('when-ttae');
  }
  if (ko.includes('고 싶')) {
    prop.push('want-go-sipda');
  }
  if (ko.includes('수 있') || ko.includes('수 없')) {
    prop.push('can-su-itda');
  }
  
  // Other
  if (ko.includes('시') || ko.includes('샤') || ko.includes('세') || ko.includes('으시')) {
    // honorific-si detection
  }
  if (ko.includes('있어요') || ko.includes('있습니다') || ko.includes('없어요') || ko.includes('없습니다')) {
    prop.push('existence-itda');
  }
  
  return { id, korean: ko, english: en, inferred: infTags, proposed: [...new Set(prop)] };
});

fs.writeFileSync('scratch/analysis_tags.json', JSON.stringify(analysis, null, 2), 'utf8');
console.log('Analysis written.');
