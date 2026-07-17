# Sentence Pattern Tag Coverage & Gap Report

This report outlines the distribution of sentences across the 37 closed pattern tags and 5 difficulty bands, identifying thin cells (<10 sentences) and proposing expansion batches to address coverage gaps.

**Total Sentences scanned:** 2233

## 1. Coverage Matrix (patternTags × band)

| Pattern Tag | Band 1 | Band 2 | Band 3 | Band 4 | Band 5 | Total |
|---|---|---|---|---|---|---|
| `topic-neun` | 60 | 77 | 66 | 86 | 187 | **476** |
| `subject-i-ga` | 185 | 97 | 109 | 181 | 288 | **860** |
| `object-eul-reul` | 160 | 185 | 181 | 264 | 394 | **1184** |
| `location-e` | 55 | 50 | 43 | 58 | 125 | **331** |
| `location-eseo` | 38 | 41 | 45 | 71 | 87 | **282** |
| `direction-euro` | 20 | 16 | 25 | 43 | 45 | **149** |
| `possessive-ui` | 7 | 14 | 32 | 81 | 133 | **267** |
| `with-hago-wa` | 2 | 18 | 15 | 25 | 40 | **100** |
| `only-man` | 3 | 5 | 4 | 2 | 1 | **15** |
| `also-do` | 5 | 5 | 6 | 4 | 10 | **30** |
| `from-buteo` | 0 | 9 | 3 | 4 | 2 | **18** |
| `until-kkaji` | 0 | 7 | 4 | 3 | 3 | **17** |
| `present-polite` | 336 | 242 | 153 | 149 | 214 | **1094** |
| `past-polite` | 38 | 58 | 151 | 182 | 262 | **691** |
| `future-geoyeyo` | 2 | 7 | 7 | 6 | 0 | **22** |
| `formal-nida` | 7 | 4 | 10 | 19 | 38 | **78** |
| `copula-ieyo` | 58 | 15 | 18 | 29 | 51 | **171** |
| `copula-negative-anieyo` | 6 | 8 | 1 | 0 | 0 | **15** |
| `question-polite` | 38 | 6 | 7 | 2 | 2 | **55** |
| `imperative-seyo` | 21 | 13 | 8 | 16 | 24 | **82** |
| `propositive-eyo` | 4 | 7 | 6 | 1 | 1 | **19** |
| `neg-an` | 4 | 5 | 6 | 4 | 4 | **23** |
| `neg-mot` | 0 | 7 | 7 | 2 | 4 | **20** |
| `neg-ji-anta` | 1 | 6 | 6 | 10 | 7 | **30** |
| `and-go` | 1 | 8 | 15 | 55 | 56 | **135** |
| `but-jiman` | 1 | 6 | 3 | 6 | 6 | **22** |
| `because-aseo` | 1 | 7 | 21 | 40 | 35 | **104** |
| `if-myeon` | 0 | 4 | 8 | 20 | 28 | **60** |
| `when-ttae` | 0 | 1 | 10 | 12 | 22 | **45** |
| `want-go-sipda` | 0 | 3 | 8 | 6 | 6 | **23** |
| `can-su-itda` | 0 | 3 | 7 | 6 | 12 | **28** |
| `must-ya-dwaeda` | 0 | 1 | 10 | 6 | 16 | **33** |
| `honorific-si` | 31 | 21 | 12 | 23 | 34 | **121** |
| `counter-phrase` | 2 | 21 | 21 | 5 | 23 | **72** |
| `time-expression` | 25 | 60 | 98 | 55 | 91 | **329** |
| `comparison-boda` | 0 | 2 | 7 | 6 | 6 | **21** |
| `existence-itda` | 26 | 14 | 12 | 9 | 14 | **75** |

## 2. Low Coverage Tags (<10 sentences total)

The following tags have critically low overall sentence coverage across all bands:

*No tags have fewer than 10 sentences total. All tags meet the minimum baseline.*

## 3. Thin Cells (<5 sentences in target bands)

The following pattern tags have very thin coverage (fewer than 5 sentences) in specific bands where they should naturally appear:

- `only-man` in **Band 3** (4 sentences)
- `from-buteo` in **Band 3** (3 sentences)
- `from-buteo` in **Band 4** (4 sentences)
- `until-kkaji` in **Band 3** (4 sentences)
- `until-kkaji` in **Band 4** (3 sentences)

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
