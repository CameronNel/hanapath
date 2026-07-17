# Sentence Pattern Tag Coverage & Gap Report

This report outlines the distribution of sentences across the 37 closed pattern tags and 5 difficulty bands, identifying thin cells (<10 sentences) and proposing expansion batches to address coverage gaps.

**Total Sentences scanned:** 2545

## 1. Coverage Matrix (patternTags × band)

| Pattern Tag | Band 1 | Band 2 | Band 3 | Band 4 | Band 5 | Total |
|---|---|---|---|---|---|---|
| `topic-neun` | 61 | 95 | 90 | 90 | 187 | **523** |
| `subject-i-ga` | 185 | 130 | 163 | 187 | 288 | **953** |
| `object-eul-reul` | 160 | 197 | 234 | 274 | 394 | **1259** |
| `location-e` | 55 | 65 | 55 | 60 | 125 | **360** |
| `location-eseo` | 38 | 43 | 62 | 71 | 87 | **301** |
| `direction-euro` | 20 | 19 | 36 | 48 | 45 | **168** |
| `possessive-ui` | 7 | 14 | 32 | 81 | 133 | **267** |
| `with-hago-wa` | 2 | 18 | 17 | 26 | 40 | **103** |
| `only-man` | 3 | 5 | 8 | 2 | 1 | **19** |
| `also-do` | 6 | 5 | 7 | 4 | 10 | **32** |
| `from-buteo` | 0 | 9 | 9 | 7 | 2 | **27** |
| `until-kkaji` | 0 | 7 | 15 | 5 | 3 | **30** |
| `present-polite` | 338 | 285 | 227 | 164 | 214 | **1228** |
| `past-polite` | 38 | 64 | 178 | 188 | 262 | **730** |
| `future-geoyeyo` | 2 | 8 | 13 | 7 | 0 | **30** |
| `formal-nida` | 7 | 4 | 10 | 19 | 38 | **78** |
| `copula-ieyo` | 59 | 25 | 20 | 29 | 51 | **184** |
| `copula-negative-anieyo` | 6 | 12 | 3 | 0 | 0 | **21** |
| `question-polite` | 40 | 29 | 47 | 5 | 2 | **123** |
| `imperative-seyo` | 25 | 31 | 34 | 17 | 24 | **131** |
| `propositive-eyo` | 4 | 9 | 9 | 1 | 1 | **24** |
| `neg-an` | 4 | 9 | 17 | 5 | 4 | **39** |
| `neg-mot` | 0 | 9 | 10 | 5 | 4 | **28** |
| `neg-ji-anta` | 1 | 6 | 8 | 11 | 7 | **33** |
| `and-go` | 1 | 10 | 19 | 55 | 56 | **141** |
| `but-jiman` | 1 | 6 | 3 | 7 | 6 | **23** |
| `because-aseo` | 1 | 9 | 37 | 45 | 35 | **127** |
| `if-myeon` | 0 | 4 | 18 | 25 | 28 | **75** |
| `when-ttae` | 0 | 1 | 12 | 13 | 22 | **48** |
| `want-go-sipda` | 0 | 6 | 13 | 8 | 6 | **33** |
| `can-su-itda` | 0 | 3 | 14 | 9 | 12 | **38** |
| `must-ya-dwaeda` | 0 | 1 | 14 | 11 | 16 | **42** |
| `honorific-si` | 31 | 22 | 23 | 25 | 34 | **135** |
| `counter-phrase` | 3 | 31 | 24 | 5 | 23 | **86** |
| `time-expression` | 25 | 73 | 129 | 64 | 91 | **382** |
| `comparison-boda` | 0 | 2 | 19 | 8 | 6 | **35** |
| `existence-itda` | 26 | 28 | 18 | 9 | 14 | **95** |

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
