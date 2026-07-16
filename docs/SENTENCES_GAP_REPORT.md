# Sentence Pattern Tag Coverage & Gap Report

This report outlines the distribution of sentences across the 37 closed pattern tags and 5 difficulty bands, identifying thin cells (<10 sentences) and proposing expansion batches to address coverage gaps.

**Total Sentences scanned:** 2113

## 1. Coverage Matrix (patternTags × band)

| Pattern Tag | Band 1 | Band 2 | Band 3 | Band 4 | Band 5 | Total |
|---|---|---|---|---|---|---|
| `topic-neun` | 53 | 71 | 52 | 80 | 183 | **439** |
| `subject-i-ga` | 183 | 93 | 99 | 177 | 285 | **837** |
| `object-eul-reul` | 159 | 165 | 168 | 258 | 392 | **1142** |
| `location-e` | 54 | 47 | 42 | 58 | 125 | **326** |
| `location-eseo` | 38 | 39 | 42 | 70 | 87 | **276** |
| `direction-euro` | 20 | 16 | 25 | 42 | 45 | **148** |
| `possessive-ui` | 5 | 14 | 32 | 81 | 133 | **265** |
| `with-hago-wa` | 2 | 15 | 14 | 24 | 40 | **95** |
| `only-man` | 3 | 5 | 1 | 2 | 1 | **12** |
| `also-do` | 1 | 1 | 6 | 4 | 10 | **22** |
| `from-buteo` | 0 | 8 | 1 | 1 | 2 | **12** |
| `until-kkaji` | 0 | 7 | 1 | 2 | 2 | **12** |
| `present-polite` | 333 | 213 | 129 | 138 | 210 | **1023** |
| `past-polite` | 38 | 55 | 144 | 178 | 260 | **675** |
| `future-geoyeyo` | 2 | 7 | 5 | 3 | 0 | **17** |
| `formal-nida` | 7 | 2 | 8 | 19 | 38 | **74** |
| `copula-ieyo` | 50 | 15 | 18 | 29 | 51 | **163** |
| `copula-negative-anieyo` | 3 | 8 | 0 | 0 | 0 | **11** |
| `question-polite` | 34 | 5 | 5 | 2 | 2 | **48** |
| `imperative-seyo` | 21 | 11 | 8 | 16 | 24 | **80** |
| `propositive-eyo` | 4 | 7 | 0 | 1 | 1 | **13** |
| `neg-an` | 4 | 2 | 4 | 3 | 4 | **17** |
| `neg-mot` | 0 | 5 | 3 | 1 | 4 | **13** |
| `neg-ji-anta` | 1 | 4 | 4 | 10 | 7 | **26** |
| `and-go` | 1 | 6 | 14 | 55 | 56 | **132** |
| `but-jiman` | 1 | 6 | 2 | 3 | 1 | **13** |
| `because-aseo` | 1 | 7 | 15 | 39 | 32 | **94** |
| `if-myeon` | 0 | 3 | 6 | 15 | 26 | **50** |
| `when-ttae` | 0 | 1 | 10 | 12 | 22 | **45** |
| `want-go-sipda` | 0 | 1 | 4 | 1 | 6 | **12** |
| `can-su-itda` | 0 | 1 | 2 | 1 | 10 | **14** |
| `must-ya-dwaeda` | 0 | 1 | 7 | 5 | 16 | **29** |
| `honorific-si` | 31 | 16 | 10 | 23 | 34 | **114** |
| `counter-phrase` | 2 | 20 | 20 | 5 | 23 | **70** |
| `time-expression` | 23 | 52 | 83 | 49 | 89 | **296** |
| `comparison-boda` | 0 | 0 | 2 | 4 | 6 | **12** |
| `existence-itda` | 25 | 13 | 11 | 9 | 14 | **72** |

## 2. Low Coverage Tags (<10 sentences total)

The following tags have critically low overall sentence coverage across all bands:

*No tags have fewer than 10 sentences total. All tags meet the minimum baseline.*

## 3. Thin Cells (<5 sentences in target bands)

The following pattern tags have very thin coverage (fewer than 5 sentences) in specific bands where they should naturally appear:

- `only-man` in **Band 3** (1 sentences)
- `also-do` in **Band 1** (1 sentences)
- `also-do` in **Band 2** (1 sentences)
- `from-buteo` in **Band 3** (1 sentences)
- `from-buteo` in **Band 4** (1 sentences)
- `until-kkaji` in **Band 3** (1 sentences)
- `until-kkaji` in **Band 4** (2 sentences)
- `future-geoyeyo` in **Band 4** (3 sentences)
- `copula-negative-anieyo` in **Band 1** (3 sentences)
- `propositive-eyo` in **Band 3** (0 sentences)
- `neg-an` in **Band 2** (2 sentences)
- `neg-an` in **Band 3** (4 sentences)
- `neg-mot` in **Band 3** (3 sentences)
- `neg-ji-anta` in **Band 3** (4 sentences)
- `but-jiman` in **Band 4** (3 sentences)
- `but-jiman` in **Band 5** (1 sentences)
- `want-go-sipda` in **Band 3** (4 sentences)
- `want-go-sipda` in **Band 4** (1 sentences)
- `can-su-itda` in **Band 3** (2 sentences)
- `can-su-itda` in **Band 4** (1 sentences)
- `comparison-boda` in **Band 3** (2 sentences)
- `comparison-boda` in **Band 4** (4 sentences)

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
