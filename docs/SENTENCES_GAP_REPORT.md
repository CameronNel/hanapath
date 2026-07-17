# Sentence Pattern Tag Coverage & Gap Report

This report outlines the distribution of sentences across the 37 closed pattern tags and 5 difficulty bands, identifying thin cells (<10 sentences) and proposing expansion batches to address coverage gaps.

**Total Sentences scanned:** 2193

## 1. Coverage Matrix (patternTags × band)

| Pattern Tag | Band 1 | Band 2 | Band 3 | Band 4 | Band 5 | Total |
|---|---|---|---|---|---|---|
| `topic-neun` | 56 | 77 | 62 | 83 | 185 | **463** |
| `subject-i-ga` | 184 | 96 | 107 | 179 | 285 | **851** |
| `object-eul-reul` | 160 | 185 | 176 | 259 | 394 | **1174** |
| `location-e` | 54 | 48 | 43 | 58 | 125 | **328** |
| `location-eseo` | 38 | 41 | 44 | 71 | 87 | **281** |
| `direction-euro` | 20 | 16 | 25 | 42 | 45 | **148** |
| `possessive-ui` | 7 | 14 | 32 | 81 | 133 | **267** |
| `with-hago-wa` | 2 | 18 | 15 | 24 | 40 | **99** |
| `only-man` | 3 | 5 | 1 | 2 | 1 | **12** |
| `also-do` | 5 | 3 | 6 | 4 | 10 | **28** |
| `from-buteo` | 0 | 9 | 1 | 1 | 2 | **13** |
| `until-kkaji` | 0 | 7 | 1 | 2 | 3 | **13** |
| `present-polite` | 336 | 240 | 149 | 144 | 212 | **1081** |
| `past-polite` | 38 | 58 | 148 | 179 | 261 | **684** |
| `future-geoyeyo` | 2 | 7 | 5 | 3 | 0 | **17** |
| `formal-nida` | 7 | 4 | 10 | 19 | 38 | **78** |
| `copula-ieyo` | 57 | 15 | 18 | 29 | 51 | **170** |
| `copula-negative-anieyo` | 3 | 8 | 0 | 0 | 0 | **11** |
| `question-polite` | 36 | 5 | 7 | 2 | 2 | **52** |
| `imperative-seyo` | 21 | 11 | 8 | 16 | 24 | **80** |
| `propositive-eyo` | 4 | 7 | 4 | 1 | 1 | **17** |
| `neg-an` | 4 | 5 | 6 | 3 | 4 | **22** |
| `neg-mot` | 0 | 7 | 5 | 1 | 4 | **17** |
| `neg-ji-anta` | 1 | 6 | 6 | 10 | 7 | **30** |
| `and-go` | 1 | 8 | 15 | 55 | 56 | **135** |
| `but-jiman` | 1 | 6 | 3 | 6 | 3 | **19** |
| `because-aseo` | 1 | 7 | 18 | 39 | 32 | **97** |
| `if-myeon` | 0 | 4 | 8 | 17 | 28 | **57** |
| `when-ttae` | 0 | 1 | 10 | 12 | 22 | **45** |
| `want-go-sipda` | 0 | 3 | 8 | 3 | 6 | **20** |
| `can-su-itda` | 0 | 3 | 5 | 3 | 12 | **23** |
| `must-ya-dwaeda` | 0 | 1 | 7 | 5 | 16 | **29** |
| `honorific-si` | 31 | 21 | 12 | 23 | 34 | **121** |
| `counter-phrase` | 2 | 20 | 20 | 5 | 23 | **70** |
| `time-expression` | 25 | 59 | 89 | 49 | 90 | **312** |
| `comparison-boda` | 0 | 2 | 7 | 5 | 6 | **20** |
| `existence-itda` | 25 | 13 | 11 | 9 | 14 | **72** |

## 2. Low Coverage Tags (<10 sentences total)

The following tags have critically low overall sentence coverage across all bands:

*No tags have fewer than 10 sentences total. All tags meet the minimum baseline.*

## 3. Thin Cells (<5 sentences in target bands)

The following pattern tags have very thin coverage (fewer than 5 sentences) in specific bands where they should naturally appear:

- `only-man` in **Band 3** (1 sentences)
- `also-do` in **Band 2** (3 sentences)
- `from-buteo` in **Band 3** (1 sentences)
- `from-buteo` in **Band 4** (1 sentences)
- `until-kkaji` in **Band 3** (1 sentences)
- `until-kkaji` in **Band 4** (2 sentences)
- `future-geoyeyo` in **Band 4** (3 sentences)
- `copula-negative-anieyo` in **Band 1** (3 sentences)
- `propositive-eyo` in **Band 3** (4 sentences)
- `but-jiman` in **Band 5** (3 sentences)
- `want-go-sipda` in **Band 4** (3 sentences)
- `can-su-itda` in **Band 4** (3 sentences)

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
