# Sentence Pattern Tag Coverage & Gap Report

This report outlines the distribution of sentences across the 37 closed pattern tags and 5 difficulty bands, identifying thin cells (<10 sentences) and proposing expansion batches to address coverage gaps.

**Total Sentences scanned:** 4177

## 1. Coverage Matrix (patternTags × band)

| Pattern Tag | Band 1 | Band 2 | Band 3 | Band 4 | Band 5 | Total |
|---|---|---|---|---|---|---|
| `topic-neun` | 82 | 196 | 167 | 109 | 192 | **746** |
| `subject-i-ga` | 207 | 261 | 327 | 256 | 293 | **1344** |
| `object-eul-reul` | 217 | 551 | 493 | 345 | 402 | **2008** |
| `location-e` | 83 | 186 | 145 | 78 | 128 | **620** |
| `location-eseo` | 55 | 110 | 92 | 85 | 91 | **433** |
| `direction-euro` | 24 | 50 | 61 | 63 | 47 | **245** |
| `possessive-ui` | 8 | 49 | 50 | 91 | 136 | **334** |
| `with-hago-wa` | 7 | 67 | 42 | 35 | 40 | **191** |
| `only-man` | 3 | 12 | 16 | 4 | 1 | **36** |
| `also-do` | 8 | 28 | 21 | 6 | 10 | **73** |
| `from-buteo` | 1 | 12 | 9 | 10 | 2 | **34** |
| `until-kkaji` | 1 | 15 | 21 | 12 | 3 | **52** |
| `present-polite` | 395 | 633 | 494 | 224 | 217 | **1963** |
| `past-polite` | 41 | 185 | 322 | 227 | 269 | **1044** |
| `future-geoyeyo` | 2 | 16 | 25 | 9 | 0 | **52** |
| `formal-nida` | 7 | 31 | 38 | 65 | 49 | **190** |
| `copula-ieyo` | 72 | 55 | 41 | 35 | 53 | **256** |
| `copula-negative-anieyo` | 6 | 12 | 4 | 1 | 0 | **23** |
| `question-polite` | 43 | 51 | 90 | 17 | 2 | **203** |
| `imperative-seyo` | 42 | 88 | 84 | 24 | 24 | **262** |
| `propositive-eyo` | 4 | 15 | 19 | 2 | 1 | **41** |
| `neg-an` | 5 | 20 | 30 | 5 | 4 | **64** |
| `neg-mot` | 0 | 14 | 26 | 9 | 4 | **53** |
| `neg-ji-anta` | 2 | 18 | 26 | 12 | 7 | **65** |
| `and-go` | 6 | 43 | 41 | 57 | 56 | **203** |
| `but-jiman` | 1 | 9 | 12 | 8 | 6 | **36** |
| `because-aseo` | 1 | 62 | 117 | 68 | 36 | **284** |
| `if-myeon` | 3 | 45 | 70 | 43 | 28 | **189** |
| `when-ttae` | 0 | 15 | 38 | 16 | 22 | **91** |
| `want-go-sipda` | 4 | 23 | 27 | 9 | 6 | **69** |
| `can-su-itda` | 0 | 8 | 41 | 18 | 12 | **79** |
| `must-ya-dwaeda` | 1 | 12 | 34 | 16 | 16 | **79** |
| `honorific-si` | 31 | 36 | 51 | 79 | 40 | **237** |
| `counter-phrase` | 4 | 52 | 31 | 5 | 23 | **115** |
| `time-expression` | 47 | 179 | 230 | 94 | 98 | **648** |
| `comparison-boda` | 0 | 19 | 36 | 12 | 6 | **73** |
| `existence-itda` | 40 | 69 | 36 | 11 | 15 | **171** |

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
