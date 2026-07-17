# Sentence Pattern Tag Coverage & Gap Report

This report outlines the distribution of sentences across the 37 closed pattern tags and 5 difficulty bands, identifying thin cells (<10 sentences) and proposing expansion batches to address coverage gaps.

**Total Sentences scanned:** 3020

## 1. Coverage Matrix (patternTags × band)

| Pattern Tag | Band 1 | Band 2 | Band 3 | Band 4 | Band 5 | Total |
|---|---|---|---|---|---|---|
| `topic-neun` | 65 | 128 | 124 | 99 | 187 | **603** |
| `subject-i-ga` | 191 | 182 | 260 | 218 | 288 | **1139** |
| `object-eul-reul` | 164 | 246 | 321 | 292 | 394 | **1417** |
| `location-e` | 56 | 73 | 72 | 65 | 125 | **391** |
| `location-eseo` | 38 | 51 | 70 | 77 | 87 | **323** |
| `direction-euro` | 20 | 21 | 43 | 51 | 45 | **180** |
| `possessive-ui` | 7 | 14 | 32 | 81 | 133 | **267** |
| `with-hago-wa` | 2 | 23 | 19 | 26 | 40 | **110** |
| `only-man` | 3 | 6 | 10 | 2 | 1 | **22** |
| `also-do` | 6 | 6 | 14 | 5 | 10 | **41** |
| `from-buteo` | 0 | 10 | 9 | 8 | 2 | **29** |
| `until-kkaji` | 0 | 7 | 17 | 6 | 3 | **33** |
| `present-polite` | 345 | 379 | 359 | 201 | 214 | **1498** |
| `past-polite` | 39 | 89 | 232 | 211 | 262 | **833** |
| `future-geoyeyo` | 2 | 8 | 15 | 9 | 0 | **34** |
| `formal-nida` | 7 | 4 | 10 | 19 | 38 | **78** |
| `copula-ieyo` | 61 | 34 | 26 | 30 | 51 | **202** |
| `copula-negative-anieyo` | 6 | 12 | 4 | 1 | 0 | **23** |
| `question-polite` | 42 | 40 | 64 | 11 | 2 | **159** |
| `imperative-seyo` | 26 | 41 | 53 | 19 | 24 | **163** |
| `propositive-eyo` | 4 | 12 | 11 | 1 | 1 | **29** |
| `neg-an` | 4 | 14 | 25 | 5 | 4 | **52** |
| `neg-mot` | 0 | 13 | 11 | 8 | 4 | **36** |
| `neg-ji-anta` | 1 | 6 | 9 | 11 | 7 | **34** |
| `and-go` | 1 | 14 | 27 | 56 | 56 | **154** |
| `but-jiman` | 1 | 6 | 4 | 7 | 6 | **24** |
| `because-aseo` | 1 | 11 | 66 | 63 | 35 | **176** |
| `if-myeon` | 0 | 5 | 29 | 30 | 28 | **92** |
| `when-ttae` | 0 | 1 | 17 | 14 | 22 | **54** |
| `want-go-sipda` | 0 | 9 | 20 | 9 | 6 | **44** |
| `can-su-itda` | 0 | 3 | 15 | 13 | 12 | **43** |
| `must-ya-dwaeda` | 0 | 3 | 17 | 11 | 16 | **47** |
| `honorific-si` | 31 | 24 | 30 | 32 | 34 | **151** |
| `counter-phrase` | 4 | 35 | 26 | 5 | 23 | **93** |
| `time-expression` | 27 | 112 | 176 | 72 | 91 | **478** |
| `comparison-boda` | 0 | 3 | 31 | 11 | 6 | **51** |
| `existence-itda` | 27 | 34 | 24 | 9 | 14 | **108** |

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
