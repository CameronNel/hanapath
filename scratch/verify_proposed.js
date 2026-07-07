const closedTags = new Set([
  // Particles
  'topic-neun', 'subject-i-ga', 'object-eul-reul',
  'location-e', 'location-eseo', 'direction-euro', 'possessive-ui',
  'with-hago-wa', 'only-man', 'also-do', 'from-buteo', 'until-kkaji',
  // Endings / tense
  'present-polite', 'past-polite', 'future-geoyeyo', 'formal-nida',
  'copula-ieyo', 'copula-negative-anieyo', 'question-polite',
  'imperative-seyo', 'propositive-eyo',
  // Negation
  'neg-an', 'neg-mot', 'neg-ji-anta',
  // Clause linkers
  'and-go', 'but-jiman', 'because-aseo', 'if-myeon',
  'when-ttae', 'want-go-sipda', 'can-su-itda', 'must-ya-dwaeda',
  // Other
  'honorific-si', 'counter-phrase', 'time-expression',
  'comparison-boda', 'existence-itda'
]);

const proposedMapping = {
  "s2008": ["topic-neun", "object-eul-reul", "present-polite"],
  "s2009": ["topic-neun", "subject-i-ga", "present-polite", "time-expression"],
  "s2010": ["object-eul-reul", "present-polite"],
  "s2011": ["object-eul-reul", "present-polite"],
  "s2012": ["topic-neun", "subject-i-ga", "copula-negative-anieyo"],
  "s2013": ["topic-neun", "present-polite"],
  "s2014": ["subject-i-ga", "present-polite", "existence-itda"],
  "s2015": ["topic-neun", "copula-ieyo"],
  "s2016": ["topic-neun", "subject-i-ga", "present-polite", "existence-itda"],
  "s2017": ["subject-i-ga", "present-polite"],
  "s2018": ["topic-neun", "location-e", "present-polite"],
  "s2019": ["object-eul-reul", "past-polite", "time-expression"],
  "s2020": ["object-eul-reul", "future-geoyeyo", "time-expression"],
  "s2021": ["object-eul-reul", "present-polite", "time-expression"],
  "s2022": ["topic-neun", "object-eul-reul", "present-polite"],
  "s2023": ["topic-neun", "location-e", "future-geoyeyo"],
  "s2024": ["topic-neun", "past-polite", "time-expression"],
  "s2025": ["subject-i-ga", "imperative-seyo", "honorific-si"],
  "s2026": ["subject-i-ga", "imperative-seyo", "honorific-si"],
  "s2027": ["topic-neun", "object-eul-reul", "present-polite"],
  "s2028": ["topic-neun", "object-eul-reul", "present-polite"],
  "s2029": ["topic-neun", "present-polite", "time-expression"],
  "s2030": ["topic-neun", "present-polite", "time-expression"],
  "s2031": ["honorific-si"],
  "s2032": ["formal-nida"],
  "s2033": ["formal-nida"],
  "s2034": ["present-polite"],
  "s2035": ["present-polite"],
  "s2036": ["present-polite"],
  "s2037": ["imperative-seyo", "honorific-si"],
  "s2038": ["only-man", "present-polite"],
  "s2039": ["present-polite"],
  "s2040": ["imperative-seyo", "honorific-si"],
  "s2041": ["imperative-seyo", "honorific-si"],
  "s2042": ["imperative-seyo", "honorific-si"],
  "s2043": ["copula-ieyo", "question-polite"],
  "s2044": ["present-polite"],
  "s2045": ["future-geoyeyo"],
  "s2046": ["future-geoyeyo"],
  "s2047": ["copula-ieyo"],
  "s2048": ["present-polite"],
  "s2049": ["formal-nida"],
  "s2050": ["formal-nida"],
  "s2051": ["formal-nida"],
  "s2052": ["imperative-seyo", "honorific-si"],
  "s2053": ["copula-ieyo", "question-polite"],
  "s2054": ["copula-ieyo", "question-polite"],
  "s2055": ["can-su-itda", "existence-itda", "present-polite", "question-polite"],
  "s2056": ["subject-i-ga", "imperative-seyo", "honorific-si"],
  "s2057": ["subject-i-ga", "imperative-seyo", "honorific-si"],
  "s2058": ["subject-i-ga", "imperative-seyo", "honorific-si"],
  "s2059": ["subject-i-ga", "imperative-seyo", "honorific-si"],
  "s2060": ["subject-i-ga", "imperative-seyo", "honorific-si"]
};

let errors = 0;
for (const [id, tags] of Object.entries(proposedMapping)) {
  if (tags.length === 0) {
    console.error(`Row ${id} has 0 tags!`);
    errors++;
  }
  for (const tag of tags) {
    if (!closedTags.has(tag)) {
      console.error(`Row ${id} has invalid tag: "${tag}"`);
      errors++;
    }
  }
}

if (errors === 0) {
  console.log("All tags are valid per the closed tag vocabulary!");
} else {
  console.log(`Validation failed with ${errors} error(s).`);
}
