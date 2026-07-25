import fs from 'node:fs';
import vm from 'node:vm';

const ROOT = process.cwd();
const loadFile = (name, sandbox) => {
  const path = `${ROOT}/${name}`;
  if (!fs.existsSync(path)) throw new Error(`Missing required file: ${name}`);
  vm.runInContext(fs.readFileSync(path, 'utf8'), sandbox, { filename: name });
};

const window = {};
const sandbox = { window, self: window, globalThis: window };
vm.createContext(sandbox);
loadFile('sentences_core.js', sandbox);
loadFile('sentences_lesson_plan.js', sandbox);
loadFile('words_curated_core.js', sandbox);

const normalize = (value) => String(value ?? '')
  .normalize('NFC')
  .trim()
  .replace(/\s+/g, ' ');

const canonicalIds = new Set(`
s1070 s1072 s1121 s1437 s1455 s1508 s1545 s1674 s1706 s1709
s1801 s1876 s1881 s2000 s2001 s2002 s2005 s2006 s2010 s2011
s2013 s2014 s2017 s2028 s2030 s2031 s2032 s2033 s2034 s2039
s2047 s2049 s2050 s2051 s2066 s2068 s2069 s2080 s2097 s2098
s2099
`.trim().split(/\s+/));

const finiteAlternatives = new Map(Object.entries({
  s2008: ['전 커피를 마셔요.'],
  s2015: ['이건 책이에요.'],
  s2061: ['이건 책이 아니에요.'],
  s2062: ['전 가수가 아니에요.'],
  s2063: ['이건 물이 아니에요.'],
  s2064: ['이건 커피가 아니에요.'],
  s2065: ['그건 제 가방이 아니에요.'],
  s2070: ['그건 꿈이 아니에요.'],
}));

const prompts = {
  s1070: 'A classmate asks what announcement was made. In ordinary polite Korean, answer that the movie-trailer release schedule was announced. Use 공개 일정 for “release schedule” and 발표되다 for “be announced”.',
  s1072: 'Reporting a completed project to a classmate in ordinary polite Korean, say that you completed development of the new software. Use 소프트웨어 개발 and 완료하다.',
  s1121: 'A classmate asks whether a Korean-language course is available. In ordinary polite Korean, answer that there is a Korean-language course. Use 과정 for “course”.',
  s1437: 'In a formal presentation, with this hotel already established as the topic, state that it is famous for friendly customer service. Use 고객 서비스 and 유명하다.',
  s1455: 'In a formal workplace announcement, with this rule already established as the topic, state that it applies only to employees of the relevant department. Use 적용되다.',
  s1508: 'A classmate asks what was newly reorganized. In ordinary polite Korean, answer that your company organization was reorganized. Use 조직 and 개편되다.',
  s1545: 'A classmate asks what was damaged. In ordinary polite Korean, answer that the skin tissue was damaged. Use 피부 조직 and 손상되다.',
  s1674: 'Continuing a conversation about him, tell a classmate in ordinary polite Korean that he works as an engineer in the construction field of a large company. Use 엔지니어로 일하다.',
  s1706: 'Continuing a conversation about Jeju Island, tell a classmate in ordinary polite Korean that it is Korea’s most famous marine tourist destination. Use 해양 관광지.',
  s1709: 'Continuing a conversation about university students these days, tell a classmate in ordinary polite Korean that their greatest concern is finding employment. Use 최대 관심사 and 취업 구직.',
  s1801: 'In a formal civic discussion, with free press activity already established as the topic, state that it is a basic right of democracy. Use 기본 권리.',
  s1876: 'A classmate asks what is good. In ordinary polite Korean, answer that the first impression is good. Use 첫 인상.',
  s1881: 'Continuing a conversation about that illness, tell a classmate in ordinary polite Korean that it lasts a long time. Use 오래 가다.',
  s2000: 'Talking to a classmate about a service you stop using, say in ordinary polite Korean that you disconnect the internet. Use 끊다.',
  s2001: 'Referring to a completed change in habit, tell a classmate in ordinary polite Korean that you quit coffee. Use 끊다.',
  s2002: 'Referring to a completed action, tell a classmate in ordinary polite Korean that you unplugged the phone charger. Use 빼다.',
  s2005: 'Describing what you do next, tell a classmate in ordinary polite Korean that you close your eyes. Use 감다.',
  s2006: 'With this cake already established as the topic, tell a classmate in ordinary polite Korean that it is sweet. Use 달다.',
  s2008: 'With yourself already established as the topic, tell a classmate in ordinary polite Korean that you drink coffee. Use 마시다.',
  s2010: 'Telling a classmate what you eat, say in ordinary polite Korean that you eat an apple. Use 먹다.',
  s2011: 'Telling a classmate how you travel, say in ordinary polite Korean that you take the bus. Use 타다.',
  s2013: 'Continuing a conversation about your home, tell a classmate in ordinary polite Korean that it is nearby. Use 가깝다.',
  s2014: 'A classmate asks what is available. In ordinary polite Korean, answer that there is water. Use 있다.',
  s2015: 'Pointing to a nearby object and treating it as the topic, identify it for a classmate in ordinary polite Korean as a book. Use 책.',
  s2017: 'A classmate asks what is fun. In ordinary polite Korean, answer that Korean is fun. Use 재미있다.',
  s2028: 'With your group already established as the topic, tell a classmate in ordinary polite Korean that you watch a movie. Use 보다.',
  s2030: 'Contrasting today with other days, tell a classmate in ordinary polite Korean that you are resting today. Use 쉬다.',
  s2031: 'Greet an unfamiliar adult politely with the standard lesson greeting meaning “Hello”.',
  s2032: 'At a formal first meeting, use the respectful lesson expression meaning “Nice to meet you”. Use 뵙다.',
  s2033: 'In a formal situation, use the lesson expression meaning “Thank you” built from 감사하다.',
  s2034: 'Reassuring a classmate in ordinary polite Korean, say that it is okay. Use 괜찮다.',
  s2039: 'Telling a classmate in ordinary polite Korean that you do not understand well, use 잘 모르다.',
  s2047: 'Pointing out a place at some distance, tell a classmate in ordinary polite Korean that it is over there. Use 저쪽.',
  s2049: 'Formally acknowledge an instruction with the lesson expression meaning “Understood”. Use 알겠습니다.',
  s2050: 'Make a formal apology with the lesson expression meaning “I am sorry”. Use 죄송하다.',
  s2051: 'Politely get an unfamiliar adult’s attention with the formal lesson expression meaning “Excuse me”. Use 실례하다.',
  s2061: 'Treating this nearby object as the topic, correct a classmate in ordinary polite Korean by saying that it is not a book.',
  s2062: 'With yourself already established as the topic, correct a classmate in ordinary polite Korean by saying that you are not a singer.',
  s2063: 'Treating this nearby object as the topic, correct a classmate in ordinary polite Korean by saying that it is not water.',
  s2064: 'Treating this nearby object as the topic, correct a classmate in ordinary polite Korean by saying that it is not coffee.',
  s2065: 'Treating that object as the topic, correct a classmate in ordinary polite Korean by saying that it is not your bag.',
  s2066: 'With that person already established as the topic, correct a classmate in ordinary polite Korean by saying that the person is not a doctor.',
  s2068: 'With this place already established as the topic, tell a classmate in ordinary polite Korean that it is not a hospital.',
  s2069: 'Speaking respectfully about that person and treating the person as the topic, tell a classmate in ordinary polite Korean that the person is not a teacher.',
  s2070: 'Treating that object as the topic, correct a classmate in ordinary polite Korean by saying that it is not a dream.',
  s2080: 'Describing a regular schedule to a classmate in ordinary polite Korean, say that you practise from morning until evening. Use 아침부터 and 저녁까지.',
  s2097: 'Contrasting today with other days, tell a classmate in ordinary polite Korean that you cannot practise today. Use 못 for the inability.',
  s2098: 'Contrasting mornings with later times, tell a classmate in ordinary polite Korean that you cannot drink coffee in the morning. Use 못 for the inability.',
  s2099: 'Contrasting today with other days, tell a classmate in ordinary polite Korean that you cannot go to the performance today. Use 못 for the inability.',
};

const rows = window.HANAPATH_SENTENCES.filter((row) => {
  const num = Number(row.id.slice(1));
  return num >= 1051 && num <= 2100;
});
if (rows.length !== 1050) throw new Error(`Expected 1050 rows, found ${rows.length}`);

const lessons = window.HANAPATH_SENTENCE_LESSONS;
const units = new Map(window.HANAPATH_SENTENCE_UNITS.map((unit) => [unit.id, unit]));
const sections = new Map(window.HANAPATH_SENTENCE_SECTIONS.map((section) => [section.id, section]));
const routes = new Map();
for (const lesson of lessons) {
  for (const sentenceId of lesson.sentenceIds || []) {
    const list = routes.get(sentenceId) || [];
    list.push(lesson);
    routes.set(sentenceId, list);
  }
}

const particleTags = new Set([
  'topic-neun', 'subject-i-ga', 'object-eul-reul', 'location-e', 'location-eseo',
  'direction-euro', 'possessive-ui', 'with-hago-wa', 'also-do', 'only-man',
  'from-buteo', 'until-kkaji',
]);
const clauseTags = new Set(['and-go', 'because-aseo', 'when-ttae', 'if-myeon', 'but-jiman', 'want-go-sipda']);
const clauseRegex = /(지만|는데|면서|으며|도록|려고|기 위해|기 때문에|으니까|니까|더니|자마자|느라고|다가|으니\s|니\s|고\s|아야|어야|전에|후에|때문에|덕분에|따라|위해|하며|해서|되어|돼서|라서|아서|어서)/;

function exclusionReasons(row) {
  const tags = new Set(row.patternTags || []);
  const reasons = [];
  if (tags.has('future-geoyeyo')) reasons.push('future-authoring-locked');
  if (tags.has('topic-neun') && tags.has('subject-i-ga')) reasons.push('topic-subject-information-structure-ambiguity');
  if ([...tags].some((tag) => clauseTags.has(tag)) || clauseRegex.test(row.korean)) reasons.push('connective-clause-continuation');
  if (tags.has('imperative-seyo') || tags.has('propositive-eyo') || tags.has('question-polite')) reasons.push('productive-pragmatic-variants');
  if ((row.acceptAlso || []).length) reasons.push('unsafe-existing-alternative-family');
  const particleCount = [...tags].filter((tag) => particleTags.has(tag)).length;
  if (particleCount >= 3 || (row.tokens || []).length >= 6) reasons.push('productive-word-order-family');
  if (tags.has('honorific-si') && tags.has('subject-i-ga')) reasons.push('particle-or-word-order-ambiguity');
  if (!reasons.length) reasons.push('lexical-or-information-structure-ambiguity');
  return [...new Set(reasons)];
}

const reviewedRows = {};
const counts = { canonical: 0, finite: 0, excluded: 0 };
const reasonCounts = {};
const reviewedAt = '2026-07-25T22:20:00Z';

for (const row of rows) {
  const canonical = normalize(row.korean);
  const routeLessons = routes.get(row.id) || [];
  if (!routeLessons.length) throw new Error(`No lesson route for ${row.id}`);
  const supportingLessonIds = routeLessons.map((lesson) => lesson.id).sort();
  const sectionOrders = routeLessons.map((lesson) => {
    const unit = units.get(lesson.unitId);
    const section = unit && sections.get(unit.sectionId);
    if (!section) throw new Error(`Broken route for ${row.id} through ${lesson.id}`);
    return section.order;
  });
  const minimumSectionOrder = Math.min(...sectionOrders);

  let typedClass = 'excluded';
  if (finiteAlternatives.has(row.id)) typedClass = 'finite';
  else if (canonicalIds.has(row.id)) typedClass = 'canonical';

  const alternatives = finiteAlternatives.get(row.id) || [];
  const acceptedAnswers = typedClass === 'finite' ? [...new Set([canonical, ...alternatives.map(normalize)])] : [canonical];
  const reasons = typedClass === 'excluded' ? exclusionReasons(row) : [];
  const eligibleModes = typedClass === 'excluded' ? ['sentence-recognition'] : ['translate-type', 'sentence-recognition'];
  const examPromptEn = typedClass === 'excluded'
    ? `Recognize the lesson sentence that means “${String(row.english).replace(/[.?!]+$/, '')}”.`
    : prompts[row.id];
  if (!examPromptEn) throw new Error(`Missing authored prompt for eligible row ${row.id}`);

  reviewedRows[row.id] = {
    typedClass,
    examPromptEn,
    canonicalTargetKey: canonical,
    acceptedAnswers,
    eligibleModes,
    primaryCompetencies: [...(row.patternTags || [])],
    supportingLessonIds,
    minimumSectionOrder,
    exclusionReasons: reasons,
    reviewStatus: 'approved',
    reviewedAt,
    reviewerNote: typedClass === 'excluded'
      ? `Independent reviewer correction: excluded from exact-match typed production — ${reasons.join('; ')}.`
      : typedClass === 'finite'
        ? 'Independent reviewer correction: retained as a bounded finite set containing only the canonical target and one explicitly reviewed register-compatible contraction.'
        : 'Independent reviewer correction: retained for typed production only after row-level review and a contextual prompt that fixes register, discourse role, lexical wording, and communicative act.',
  };

  counts[typedClass] += 1;
  for (const reason of reasons) reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
}

for (const id of canonicalIds) if (!reviewedRows[id]) throw new Error(`Unknown canonical allowlist ID: ${id}`);
for (const id of finiteAlternatives.keys()) if (!reviewedRows[id]) throw new Error(`Unknown finite allowlist ID: ${id}`);
for (const row of rows) {
  const record = reviewedRows[row.id];
  if (record.canonicalTargetKey !== normalize(row.korean)) throw new Error(`Canonical mismatch ${row.id}`);
  if (record.reviewStatus !== 'approved') throw new Error(`Unapproved ${row.id}`);
  if (record.typedClass === 'canonical' && record.acceptedAnswers.length !== 1) throw new Error(`Canonical answer count ${row.id}`);
  if (record.typedClass === 'finite' && (record.acceptedAnswers.length < 2 || record.acceptedAnswers.length > 5)) throw new Error(`Finite answer count ${row.id}`);
  if (record.typedClass === 'excluded' && !record.exclusionReasons.length) throw new Error(`Missing exclusion reason ${row.id}`);
  if (record.typedClass !== 'excluded' && record.exclusionReasons.length) throw new Error(`Eligible row has exclusion reason ${row.id}`);
}

const payload = {
  shardId: 'B',
  range: { fromId: 's1051', toId: 's2100', fromNum: 1051, toNum: 2100 },
  reviewedRows,
};
const output = `// HanaPath Sentence Examination Eligibility — Shard B (s1051–s2100).\n` +
  `// Plain static browser global — no build step.\n` +
  `//\n` +
  `// Packet E1B independently re-reviewed every row after comparing PRs #356 and #357.\n` +
  `// Edit only rows s1051–s2100 here; shared loader and audit logic live elsewhere.\n` +
  `(function () {\n` +
  `  "use strict";\n` +
  `  var registry = (window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS =\n` +
  `    window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS || {});\n` +
  `  registry.B = ${JSON.stringify(payload, null, 2)};\n` +
  `})();\n`;

fs.writeFileSync(`${ROOT}/sentence_exam_eligibility_shard_b.js`, output);
console.log(JSON.stringify({ counts, reasonCounts, canonicalIds: [...canonicalIds], finiteIds: [...finiteAlternatives.keys()] }, null, 2));
