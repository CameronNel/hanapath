# Sentence Pattern Tag Coverage & Gap Report

This report outlines the distribution of sentences across the 37 closed pattern tags and 5 difficulty bands, identifying thin cells (<10 sentences) and proposing expansion batches to address coverage gaps.

**Total Sentences scanned:** 2861

## 1. Coverage Matrix (patternTags × band)

| Pattern Tag | Band 1 | Band 2 | Band 3 | Band 4 | Band 5 | Total |
|---|---|---|---|---|---|---|
| `topic-neun` | 64 | 113 | 99 | 93 | 187 | **556** |
| `subject-i-ga` | 190 | 162 | 226 | 209 | 288 | **1075** |
| `object-eul-reul` | 163 | 234 | 301 | 291 | 394 | **1383** |
| `location-e` | 55 | 71 | 67 | 61 | 125 | **379** |
| `location-eseo` | 38 | 46 | 68 | 75 | 87 | **314** |
| `direction-euro` | 20 | 21 | 43 | 51 | 45 | **180** |
| `possessive-ui` | 7 | 14 | 32 | 81 | 133 | **267** |
| `with-hago-wa` | 2 | 22 | 19 | 26 | 40 | **109** |
| `only-man` | 3 | 6 | 10 | 2 | 1 | **22** |
| `also-do` | 6 | 5 | 9 | 5 | 10 | **35** |
| `from-buteo` | 0 | 9 | 9 | 8 | 2 | **28** |
| `until-kkaji` | 0 | 7 | 16 | 6 | 3 | **32** |
| `present-polite` | 342 | 340 | 304 | 183 | 214 | **1383** |
| `past-polite` | 39 | 81 | 220 | 210 | 262 | **812** |
| `future-geoyeyo` | 2 | 8 | 15 | 9 | 0 | **34** |
| `formal-nida` | 7 | 4 | 10 | 19 | 38 | **78** |
| `copula-ieyo` | 61 | 30 | 22 | 29 | 51 | **193** |
| `copula-negative-anieyo` | 6 | 12 | 3 | 1 | 0 | **22** |
| `question-polite` | 42 | 38 | 59 | 10 | 2 | **151** |
| `imperative-seyo` | 26 | 41 | 52 | 19 | 24 | **162** |
| `propositive-eyo` | 4 | 11 | 11 | 1 | 1 | **28** |
| `neg-an` | 4 | 14 | 23 | 5 | 4 | **50** |
| `neg-mot` | 0 | 13 | 11 | 8 | 4 | **36** |
| `neg-ji-anta` | 1 | 6 | 8 | 11 | 7 | **33** |
| `and-go` | 1 | 12 | 23 | 56 | 56 | **148** |
| `but-jiman` | 1 | 6 | 4 | 7 | 6 | **24** |
| `because-aseo` | 1 | 11 | 63 | 63 | 35 | **173** |
| `if-myeon` | 0 | 5 | 28 | 28 | 28 | **89** |
| `when-ttae` | 0 | 1 | 17 | 13 | 22 | **53** |
| `want-go-sipda` | 0 | 9 | 20 | 9 | 6 | **44** |
| `can-su-itda` | 0 | 3 | 15 | 11 | 12 | **41** |
| `must-ya-dwaeda` | 0 | 3 | 16 | 11 | 16 | **46** |
| `honorific-si` | 31 | 24 | 28 | 30 | 34 | **147** |
| `counter-phrase` | 4 | 34 | 25 | 5 | 23 | **91** |
| `time-expression` | 27 | 93 | 159 | 69 | 91 | **439** |
| `comparison-boda` | 0 | 3 | 25 | 9 | 6 | **43** |
| `existence-itda` | 26 | 32 | 21 | 9 | 14 | **102** |

## 2. Low Coverage Tags (<10 sentences total)

The following tags have critically low overall sentence coverage across all bands:

*No tags have fewer than 10 sentences total. All tags meet the minimum baseline.*

## 3. Thin Cells (<5 sentences in target bands)

The following pattern tags have very thin coverage (fewer than 5 sentences) in specific bands where they should naturally appear:

*No thin cells found in target bands.*

## 4. Proposed Expansion Batches

Based on the matrix above, we propose the following expansion batches (Total: ~100 original sentences) to fill out thin cells and guarantee a robust pool for all modes of the Sentence Studio:

1. **Formal Register & Honorifics Expansion (Band 4 & 5)**
   - Target tags: `formal-nida`, `honorific-si`
   - Goal: Add ~30 sentences in Bands 4 and 5 practicing formal-polite conversation, office/business dialogues, and respectful speaking patterns.

2. **Clause Linkers & Complex Sentences (Band 4 & 5)**
   - Target tags: `but-jiman`, `because-aseo`, `if-myeon`, `and-go`
   - Goal: Add ~35 multi-clause sentences illustrating cause-and-effect, conditional situations, and contrasting ideas.

3. **Particles & Specifiers (Band 3 & 4)**
   - Target tags: `from-buteo`, `until-kkaji`, `only-man`, `direction-euro`, `comparison-boda`
   - Goal: Add ~25 sentences detailing journeys (from/until location/time), directions, limitations, and comparisons.

4. **Negative Auxiliary / Complex Negations (Band 3 & 4)**
   - Target tags: `neg-ji-anta`, `neg-mot`
   - Goal: Add ~10 sentences practicing long negation (-지 않다) and inability (못).
