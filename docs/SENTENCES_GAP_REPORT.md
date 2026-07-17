# Sentence Pattern Tag Coverage & Gap Report

This report outlines the distribution of sentences across the 37 closed pattern tags and 5 difficulty bands, identifying thin cells (<10 sentences) and proposing expansion batches to address coverage gaps.

**Total Sentences scanned:** 3410

## 1. Coverage Matrix (patternTags × band)

| Pattern Tag | Band 1 | Band 2 | Band 3 | Band 4 | Band 5 | Total |
|---|---|---|---|---|---|---|
| `topic-neun` | 65 | 158 | 145 | 109 | 192 | **669** |
| `subject-i-ga` | 191 | 202 | 309 | 255 | 293 | **1250** |
| `object-eul-reul` | 166 | 289 | 386 | 340 | 402 | **1583** |
| `location-e` | 56 | 90 | 101 | 78 | 128 | **453** |
| `location-eseo` | 38 | 62 | 82 | 84 | 91 | **357** |
| `direction-euro` | 20 | 26 | 51 | 63 | 47 | **207** |
| `possessive-ui` | 7 | 20 | 39 | 91 | 136 | **293** |
| `with-hago-wa` | 2 | 34 | 33 | 33 | 40 | **142** |
| `only-man` | 3 | 7 | 15 | 4 | 1 | **30** |
| `also-do` | 6 | 7 | 15 | 6 | 10 | **44** |
| `from-buteo` | 0 | 10 | 9 | 10 | 2 | **31** |
| `until-kkaji` | 0 | 7 | 18 | 12 | 3 | **40** |
| `present-polite` | 346 | 425 | 406 | 222 | 217 | **1616** |
| `past-polite` | 39 | 102 | 292 | 226 | 269 | **928** |
| `future-geoyeyo` | 2 | 9 | 16 | 9 | 0 | **36** |
| `formal-nida` | 7 | 31 | 38 | 65 | 49 | **190** |
| `copula-ieyo` | 61 | 38 | 32 | 34 | 53 | **218** |
| `copula-negative-anieyo` | 6 | 12 | 4 | 1 | 0 | **23** |
| `question-polite` | 42 | 45 | 89 | 17 | 2 | **195** |
| `imperative-seyo` | 28 | 60 | 74 | 24 | 24 | **210** |
| `propositive-eyo` | 4 | 15 | 19 | 2 | 1 | **41** |
| `neg-an` | 4 | 15 | 29 | 5 | 4 | **57** |
| `neg-mot` | 0 | 13 | 22 | 9 | 4 | **48** |
| `neg-ji-anta` | 1 | 7 | 14 | 12 | 7 | **41** |
| `and-go` | 1 | 17 | 33 | 57 | 56 | **164** |
| `but-jiman` | 1 | 6 | 7 | 8 | 6 | **28** |
| `because-aseo` | 1 | 24 | 94 | 67 | 36 | **222** |
| `if-myeon` | 0 | 6 | 37 | 42 | 28 | **113** |
| `when-ttae` | 0 | 3 | 30 | 16 | 22 | **71** |
| `want-go-sipda` | 0 | 14 | 21 | 9 | 6 | **50** |
| `can-su-itda` | 0 | 3 | 32 | 18 | 12 | **65** |
| `must-ya-dwaeda` | 0 | 5 | 21 | 15 | 16 | **57** |
| `honorific-si` | 31 | 34 | 48 | 79 | 40 | **232** |
| `counter-phrase` | 4 | 35 | 28 | 5 | 23 | **95** |
| `time-expression` | 27 | 138 | 211 | 94 | 98 | **568** |
| `comparison-boda` | 0 | 4 | 32 | 12 | 6 | **54** |
| `existence-itda` | 27 | 38 | 32 | 10 | 15 | **122** |

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
