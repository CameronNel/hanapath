# Sentence Pattern Tag Coverage & Gap Report

This report outlines the distribution of sentences across the 37 closed pattern tags and 5 difficulty bands, identifying thin cells (<10 sentences) and proposing expansion batches to address coverage gaps.

**Total Sentences scanned:** 3180

## 1. Coverage Matrix (patternTags × band)

| Pattern Tag | Band 1 | Band 2 | Band 3 | Band 4 | Band 5 | Total |
|---|---|---|---|---|---|---|
| `topic-neun` | 65 | 129 | 130 | 103 | 187 | **614** |
| `subject-i-ga` | 191 | 182 | 277 | 227 | 289 | **1166** |
| `object-eul-reul` | 166 | 250 | 348 | 301 | 394 | **1459** |
| `location-e` | 56 | 73 | 77 | 68 | 125 | **399** |
| `location-eseo` | 38 | 52 | 73 | 78 | 87 | **328** |
| `direction-euro` | 20 | 21 | 44 | 51 | 45 | **181** |
| `possessive-ui` | 7 | 14 | 32 | 81 | 133 | **267** |
| `with-hago-wa` | 2 | 23 | 19 | 27 | 40 | **111** |
| `only-man` | 3 | 7 | 15 | 4 | 1 | **30** |
| `also-do` | 6 | 7 | 15 | 6 | 10 | **44** |
| `from-buteo` | 0 | 10 | 9 | 10 | 2 | **31** |
| `until-kkaji` | 0 | 7 | 17 | 7 | 3 | **34** |
| `present-polite` | 346 | 386 | 379 | 217 | 214 | **1542** |
| `past-polite` | 39 | 93 | 259 | 218 | 262 | **871** |
| `future-geoyeyo` | 2 | 9 | 16 | 9 | 0 | **36** |
| `formal-nida` | 7 | 4 | 11 | 20 | 38 | **80** |
| `copula-ieyo` | 61 | 37 | 30 | 31 | 52 | **211** |
| `copula-negative-anieyo` | 6 | 12 | 4 | 1 | 0 | **23** |
| `question-polite` | 42 | 45 | 87 | 17 | 2 | **193** |
| `imperative-seyo` | 28 | 52 | 72 | 24 | 24 | **200** |
| `propositive-eyo` | 4 | 12 | 11 | 1 | 1 | **29** |
| `neg-an` | 4 | 14 | 26 | 5 | 4 | **53** |
| `neg-mot` | 0 | 13 | 11 | 9 | 4 | **37** |
| `neg-ji-anta` | 1 | 6 | 12 | 12 | 7 | **38** |
| `and-go` | 1 | 14 | 30 | 57 | 56 | **158** |
| `but-jiman` | 1 | 6 | 6 | 8 | 6 | **27** |
| `because-aseo` | 1 | 11 | 66 | 63 | 35 | **176** |
| `if-myeon` | 0 | 6 | 34 | 33 | 28 | **101** |
| `when-ttae` | 0 | 2 | 26 | 16 | 22 | **66** |
| `want-go-sipda` | 0 | 9 | 20 | 9 | 6 | **44** |
| `can-su-itda` | 0 | 3 | 26 | 18 | 12 | **59** |
| `must-ya-dwaeda` | 0 | 3 | 17 | 11 | 16 | **47** |
| `honorific-si` | 31 | 24 | 45 | 39 | 34 | **173** |
| `counter-phrase` | 4 | 35 | 27 | 5 | 23 | **94** |
| `time-expression` | 27 | 116 | 190 | 76 | 92 | **501** |
| `comparison-boda` | 0 | 3 | 32 | 11 | 6 | **52** |
| `existence-itda` | 27 | 34 | 27 | 10 | 14 | **112** |

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
