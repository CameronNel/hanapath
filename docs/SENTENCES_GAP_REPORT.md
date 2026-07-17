# Sentence Pattern Tag Coverage & Gap Report

This report outlines the distribution of sentences across the 37 closed pattern tags and 5 difficulty bands, identifying thin cells (<10 sentences) and proposing expansion batches to address coverage gaps.

**Total Sentences scanned:** 2703

## 1. Coverage Matrix (patternTags × band)

| Pattern Tag | Band 1 | Band 2 | Band 3 | Band 4 | Band 5 | Total |
|---|---|---|---|---|---|---|
| `topic-neun` | 63 | 104 | 93 | 91 | 187 | **538** |
| `subject-i-ga` | 188 | 150 | 195 | 196 | 288 | **1017** |
| `object-eul-reul` | 161 | 209 | 271 | 284 | 394 | **1319** |
| `location-e` | 55 | 68 | 58 | 60 | 125 | **366** |
| `location-eseo` | 38 | 45 | 65 | 73 | 87 | **308** |
| `direction-euro` | 20 | 19 | 41 | 50 | 45 | **175** |
| `possessive-ui` | 7 | 14 | 32 | 81 | 133 | **267** |
| `with-hago-wa` | 2 | 20 | 17 | 26 | 40 | **105** |
| `only-man` | 3 | 5 | 9 | 2 | 1 | **20** |
| `also-do` | 6 | 5 | 8 | 5 | 10 | **34** |
| `from-buteo` | 0 | 9 | 9 | 8 | 2 | **28** |
| `until-kkaji` | 0 | 7 | 16 | 5 | 3 | **31** |
| `present-polite` | 340 | 313 | 260 | 171 | 214 | **1298** |
| `past-polite` | 38 | 68 | 202 | 198 | 262 | **768** |
| `future-geoyeyo` | 2 | 8 | 15 | 9 | 0 | **34** |
| `formal-nida` | 7 | 4 | 10 | 19 | 38 | **78** |
| `copula-ieyo` | 61 | 29 | 22 | 29 | 51 | **192** |
| `copula-negative-anieyo` | 6 | 12 | 3 | 0 | 0 | **21** |
| `question-polite` | 42 | 37 | 59 | 10 | 2 | **150** |
| `imperative-seyo` | 25 | 34 | 38 | 17 | 24 | **138** |
| `propositive-eyo` | 4 | 11 | 11 | 1 | 1 | **28** |
| `neg-an` | 4 | 11 | 19 | 5 | 4 | **43** |
| `neg-mot` | 0 | 11 | 11 | 5 | 4 | **31** |
| `neg-ji-anta` | 1 | 6 | 8 | 11 | 7 | **33** |
| `and-go` | 1 | 11 | 21 | 55 | 56 | **144** |
| `but-jiman` | 1 | 6 | 3 | 7 | 6 | **23** |
| `because-aseo` | 1 | 9 | 50 | 51 | 35 | **146** |
| `if-myeon` | 0 | 4 | 22 | 27 | 28 | **81** |
| `when-ttae` | 0 | 1 | 16 | 13 | 22 | **52** |
| `want-go-sipda` | 0 | 7 | 17 | 9 | 6 | **39** |
| `can-su-itda` | 0 | 3 | 15 | 11 | 12 | **41** |
| `must-ya-dwaeda` | 0 | 1 | 16 | 11 | 16 | **44** |
| `honorific-si` | 31 | 24 | 27 | 30 | 34 | **146** |
| `counter-phrase` | 4 | 33 | 25 | 5 | 23 | **90** |
| `time-expression` | 26 | 89 | 151 | 68 | 91 | **425** |
| `comparison-boda` | 0 | 3 | 21 | 9 | 6 | **39** |
| `existence-itda` | 26 | 31 | 21 | 9 | 14 | **101** |

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
