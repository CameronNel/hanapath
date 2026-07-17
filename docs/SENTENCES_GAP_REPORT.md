# Sentence Pattern Tag Coverage & Gap Report

This report outlines the distribution of sentences across the 37 closed pattern tags and 5 difficulty bands, identifying thin cells (<10 sentences) and proposing expansion batches to address coverage gaps.

**Total Sentences scanned:** 2349

## 1. Coverage Matrix (patternTags × band)

| Pattern Tag | Band 1 | Band 2 | Band 3 | Band 4 | Band 5 | Total |
|---|---|---|---|---|---|---|
| `topic-neun` | 60 | 87 | 76 | 87 | 187 | **497** |
| `subject-i-ga` | 185 | 103 | 126 | 183 | 288 | **885** |
| `object-eul-reul` | 160 | 189 | 196 | 266 | 394 | **1205** |
| `location-e` | 55 | 59 | 46 | 58 | 125 | **343** |
| `location-eseo` | 38 | 43 | 53 | 71 | 87 | **292** |
| `direction-euro` | 20 | 16 | 30 | 45 | 45 | **156** |
| `possessive-ui` | 7 | 14 | 32 | 81 | 133 | **267** |
| `with-hago-wa` | 2 | 18 | 15 | 25 | 40 | **100** |
| `only-man` | 3 | 5 | 8 | 2 | 1 | **19** |
| `also-do` | 6 | 5 | 6 | 4 | 10 | **31** |
| `from-buteo` | 0 | 9 | 5 | 7 | 2 | **23** |
| `until-kkaji` | 0 | 7 | 10 | 5 | 3 | **25** |
| `present-polite` | 338 | 253 | 177 | 153 | 214 | **1135** |
| `past-polite` | 38 | 61 | 160 | 185 | 262 | **706** |
| `future-geoyeyo` | 2 | 8 | 10 | 7 | 0 | **27** |
| `formal-nida` | 7 | 4 | 10 | 19 | 38 | **78** |
| `copula-ieyo` | 58 | 19 | 18 | 29 | 51 | **175** |
| `copula-negative-anieyo` | 6 | 12 | 3 | 0 | 0 | **21** |
| `question-polite` | 39 | 17 | 19 | 2 | 2 | **79** |
| `imperative-seyo` | 25 | 23 | 18 | 16 | 24 | **106** |
| `propositive-eyo` | 4 | 9 | 9 | 1 | 1 | **24** |
| `neg-an` | 4 | 6 | 11 | 4 | 4 | **29** |
| `neg-mot` | 0 | 9 | 10 | 4 | 4 | **27** |
| `neg-ji-anta` | 1 | 6 | 7 | 10 | 7 | **31** |
| `and-go` | 1 | 8 | 15 | 55 | 56 | **135** |
| `but-jiman` | 1 | 6 | 3 | 6 | 6 | **22** |
| `because-aseo` | 1 | 8 | 26 | 41 | 35 | **111** |
| `if-myeon` | 0 | 4 | 11 | 22 | 28 | **65** |
| `when-ttae` | 0 | 1 | 12 | 13 | 22 | **48** |
| `want-go-sipda` | 0 | 3 | 9 | 6 | 6 | **24** |
| `can-su-itda` | 0 | 3 | 9 | 8 | 12 | **32** |
| `must-ya-dwaeda` | 0 | 1 | 12 | 6 | 16 | **35** |
| `honorific-si` | 31 | 21 | 12 | 23 | 34 | **121** |
| `counter-phrase` | 3 | 27 | 22 | 5 | 23 | **80** |
| `time-expression` | 25 | 64 | 113 | 57 | 91 | **350** |
| `comparison-boda` | 0 | 2 | 16 | 7 | 6 | **31** |
| `existence-itda` | 26 | 20 | 13 | 9 | 14 | **82** |

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
