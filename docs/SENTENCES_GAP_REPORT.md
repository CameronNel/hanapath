# Sentence Pattern Tag Coverage & Gap Report

This report outlines the distribution of sentences across the 37 closed pattern tags and 5 difficulty bands, identifying thin cells (<10 sentences) and proposing expansion batches to address coverage gaps.

**Total Sentences scanned:** 2271

## 1. Coverage Matrix (patternTags × band)

| Pattern Tag | Band 1 | Band 2 | Band 3 | Band 4 | Band 5 | Total |
|---|---|---|---|---|---|---|
| `topic-neun` | 60 | 82 | 70 | 87 | 187 | **486** |
| `subject-i-ga` | 185 | 97 | 115 | 183 | 288 | **868** |
| `object-eul-reul` | 160 | 186 | 189 | 266 | 394 | **1195** |
| `location-e` | 55 | 52 | 45 | 58 | 125 | **335** |
| `location-eseo` | 38 | 41 | 45 | 71 | 87 | **282** |
| `direction-euro` | 20 | 16 | 25 | 44 | 45 | **150** |
| `possessive-ui` | 7 | 14 | 32 | 81 | 133 | **267** |
| `with-hago-wa` | 2 | 18 | 15 | 25 | 40 | **100** |
| `only-man` | 3 | 5 | 7 | 2 | 1 | **18** |
| `also-do` | 5 | 5 | 6 | 4 | 10 | **30** |
| `from-buteo` | 0 | 9 | 5 | 7 | 2 | **23** |
| `until-kkaji` | 0 | 7 | 6 | 5 | 3 | **21** |
| `present-polite` | 336 | 246 | 163 | 151 | 214 | **1110** |
| `past-polite` | 38 | 59 | 158 | 185 | 262 | **702** |
| `future-geoyeyo` | 2 | 7 | 9 | 7 | 0 | **25** |
| `formal-nida` | 7 | 4 | 10 | 19 | 38 | **78** |
| `copula-ieyo` | 58 | 15 | 18 | 29 | 51 | **171** |
| `copula-negative-anieyo` | 6 | 12 | 3 | 0 | 0 | **21** |
| `question-polite` | 38 | 6 | 7 | 2 | 2 | **55** |
| `imperative-seyo` | 21 | 13 | 9 | 16 | 24 | **83** |
| `propositive-eyo` | 4 | 9 | 9 | 1 | 1 | **24** |
| `neg-an` | 4 | 6 | 10 | 4 | 4 | **28** |
| `neg-mot` | 0 | 9 | 9 | 4 | 4 | **26** |
| `neg-ji-anta` | 1 | 6 | 7 | 10 | 7 | **31** |
| `and-go` | 1 | 8 | 15 | 55 | 56 | **135** |
| `but-jiman` | 1 | 6 | 3 | 6 | 6 | **22** |
| `because-aseo` | 1 | 8 | 25 | 41 | 35 | **110** |
| `if-myeon` | 0 | 4 | 9 | 20 | 28 | **61** |
| `when-ttae` | 0 | 1 | 12 | 13 | 22 | **48** |
| `want-go-sipda` | 0 | 3 | 8 | 6 | 6 | **23** |
| `can-su-itda` | 0 | 3 | 7 | 7 | 12 | **29** |
| `must-ya-dwaeda` | 0 | 1 | 10 | 6 | 16 | **33** |
| `honorific-si` | 31 | 21 | 12 | 23 | 34 | **121** |
| `counter-phrase` | 2 | 21 | 22 | 5 | 23 | **73** |
| `time-expression` | 25 | 63 | 108 | 57 | 91 | **344** |
| `comparison-boda` | 0 | 2 | 11 | 7 | 6 | **26** |
| `existence-itda` | 26 | 14 | 13 | 9 | 14 | **76** |

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
