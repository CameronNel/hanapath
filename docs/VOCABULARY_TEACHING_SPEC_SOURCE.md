# Teaching Korean Vocabulary for a Beginner English-to-Korean App

> **Source of record.** This document reproduces the original research spec
> provided by the project owner (2026-07-02) that governs the Words section.
> The repo-actionable adaptation — with a status scorecard, milestone reference
> sheet, and implementation dependency order — lives in
> [`VOCABULARY_TEACHING_SPEC.md`](VOCABULARY_TEACHING_SPEC.md). Wording below is
> unchanged from the source; the tables have been rendered as Markdown for
> readability.

## Executive summary

A beginner English-to-Korean app should not treat "vocabulary" as isolated word pairs. For Korean, usable vocabulary is inseparable from script, phonology, morphology, politeness, and sentence-building. Official Korean-language education guidance frames linguistic knowledge as integrated lexis, grammar, and pronunciation rather than as decontextualised word lists, and it explicitly recommends staged progression from spelling and words to sentences and paragraphs for beginners. The most robust product implication is that the app's core unit should be a sense-linked lexeme plus its inflected forms, particles, register, pronunciation, and exemplar phrase patterns, not a flat translation card.

For first release, the curriculum should begin with modern Hangeul basics, syllable-block decoding, and high-utility oral vocabulary, then move into formulaic phrases, then sentence frames with particles and polite endings, and only after that into broader topical lexicon and productive morphology. This sequencing is supported by the Korean standard curriculum's emphasis on beginners constructing words from consonants and vowels, reading basic words and short sentences, and using basic vocabulary and sentence structure in simple conversations.

Vocabulary selection should be based on a triangulated model: official graded learner lists, corpus frequency, and communicative utility. The National Institute of Korean Language maintains a learner vocabulary list with 982 items in level 1, 2,111 in level 2, and 2,872 in level 3, and its Basic Korean Dictionary provides 50,000 learner-oriented headwords with level labels, examples, pronunciation, and conjugational forms selected from usage-frequency survey results plus textbook frequency. That makes an excellent official backbone for a proposed "core 1000" and "core 2000" app lexicon.

Pedagogically, the strongest evidence supports a combination of spaced practice, retrieval practice, mnemonic support for early memorisation, and meaning-focused input and output. Meta-analysis in second-language learning finds a medium-to-large benefit for spacing, while retrieval practice research shows that repeated testing improves delayed retention more than repeated restudy. Paul Nation's four-strands framework remains a useful operational balance for app design: meaning-focused input, meaning-focused output, language-focused learning, and fluency development.

From a product perspective, the highest-risk beginner failure modes for English speakers are predictable: over-reliance on romanisation, confusion over syllable-block reading, weak perception of Korean's three-way stop contrast, misinterpretation of vowels such as ㅓ and ㅡ, misuse or omission of particles, and failure to notice that one English gloss may map to multiple Korean words depending on register, word origin, and honorific level. These are not marginal UX issues; they are central architecture requirements for the app.

The recommended shipping strategy is therefore to launch with a tightly curated beginner system: script mastery, 800–1,000 core lexical senses, controlled inflection coverage, particle-aware phrase/sentence practice, audio-first pronunciation support, and a data model that separates lexeme, sense, inflected form, pronunciation, register, and exercise events. Doing more than that before release is possible, but it would increase authoring complexity faster than it would increase beginner learning value.

## Linguistic foundations for app design

Korean's writing system is both beginner-friendly and deceptively demanding. Official explanations of Hangeul emphasise that it is a phonemic writing system whose letters are uniquely combined into syllabic blocks rather than written in a purely linear sequence. In practice, that means learners must master not only letter recognition but also block parsing, because reading speed depends on perceiving a whole block such as 감, 물, 학교, not slowly scanning individual jamo. Official material for learners also underlines that beginners should learn to construct words from consonants and vowels and to read basic words and short sentences accurately.

For beginner pedagogy, the technically cleanest approach is to teach Hangeul in layers. Modern Korean uses 24 basic letters in the current standard system, and official learner materials recommend staged learning that begins with spelling and word construction. In product terms, that supports a sequence of basic consonants and vowels first, then tense consonants and compound/diphthong vowels, then batchim, then whole-block recognition and typing.

Phonology must be taught from the start because Korean orthography and pronunciation do not map one-to-one in running speech. The Korean standard curriculum explicitly notes that for listening and speaking, learners need to pronounce words in accordance with Korean phonological properties, and at beginner reading level it states that learners should know that spelling and pronunciation may differ. Official explanatory materials also give concrete examples such as 물고기 being pronounced [물꼬기], showing how orthographic transparency is real but not absolute.

For adult English speakers, the app must make a few phonological targets unusually prominent. Korean has a typologically unusual three-way stop contrast in word-initial position, and research on English listeners shows that they tend to assimilate Korean lenis and aspirated stops toward English voiceless stops and fortis stops toward English voiced stops. Research on English-speaking learners also shows that Korean stop learning often requires sensitivity to both voice onset time and onset F0, rather than the English-like two-way voiced/voiceless contrast.

A second foundational problem is syllable structure. Official Korean-language explanations note that Korean does not allow the same kinds of initial consonant clusters that English does, and they illustrate adaptation of words like stop and spring with inserted ㅡ vowels. For teaching English speakers Korean, this matters not because they will insert vowels into Korean in the same way, but because it signals that Korean syllable parsing and phonotactics differ substantially from English. Learners need to hear and produce Korean syllables as block-based CV/CVC units, not as English-style stress-timed strings.

At the morphology level, Korean is best treated as an agglutinative language for app engineering purposes. Korean NLP work based on the Sejong corpus stresses the language's agglutinative characteristics and represents grammatical information through chains of lexical and functional morphemes. This is exactly why a beginner app cannot safely store only citation forms: users need access to stems, endings, particles, honorific markers, and common surface allomorphs.

Korean word classes should be taught in a learner-facing simplification, while the underlying data model uses a richer computational schema. A learner can understand "verbs", "descriptive verbs/adjectives", "nouns", "particles", "determiners", "adverbs", "interjections", and "endings"; internally, however, the Sejong tagset distinguishes categories such as VV for verbs, VA for adjectives, NNG/NNP/NNB for noun classes, JKS/JKO/JKB/JX/JC for postpositions, and EP/EF/EC/ETM/ETN for endings. That distinction is valuable because Korean adjectives behave predicate-like in many instructional contexts, but computationally they still merit their own POS label.

Particles and honorifics are not optional "advanced grammar"; they are structurally central. Official terminology from the National Institute of Korean Language defines Korean particles as a class that attaches to nominals, adverbs, or endings to mark grammatical relations or add meaning, and divides them broadly into case particles, conjunctive particles, and auxiliary particles. Official explanations of honorifics distinguish subject honorification from listener-oriented politeness, and show that -(으)시- marks subject honorification while endings such as -요 and -습니다 reflect the listener's status.

Word formation also matters early because it helps learners compress the lexicon. Official Korean sources define prefix-based derivation, suffix-derived words, and compound words, and official learner-facing explanations divide Korean vocabulary into indigenous Korean words, Sino-Korean words, and loanwords. For product design, this means beginners should not just memorise 학교, 학생, 학년, but recognise that high-frequency Sino-Korean morphemes often recur productively across domains.

## Morphology and conjugation priorities

For a beginner app, morphology should be taught according to communicative load, not descriptive completeness. The highest-value early patterns are the ones needed for introductions, requests, daily routines, descriptions, locations, possession, and social interaction: polite endings, subject honorifics, a small set of particles, negation, and a controlled set of connective forms. This recommendation is consistent with the Korean standard curriculum's description of Level 1 speaking and writing goals: short everyday conversations, simple information exchange, and basic vocabulary with simple sentence structure.

A practical learner grammar for shipping should treat Korean predicates as generated from a stem plus inflection engine. Official learner dictionaries already encode conjugational forms for predicates, and the Sejong/UD mapping shows the grammatical importance of prefinal endings (EP) and final/connective/modifying endings (EF/EC/ETM/ETN). That makes a form-generator and form-recognition engine a first-release requirement rather than a later enhancement.

### Recommended beginner conjugation scope

| Category | What the learner needs early | Why it matters for the app | Example |
|---|---|---|---|
| Citation form | Store dictionary lookup form | Needed for search and lexeme identity | 먹다, 가다, 좋다 |
| Polite informal | Default spoken beginner output | Most daily interactions start here | 먹어요, 가요, 좋아요 |
| Polite formal | High-frequency service/public register | Needed for signs, customer-service, classroom speech | 먹습니다, 갑니다 |
| Past | Core time reference | Essential for survival conversation | 먹었어요, 갔어요 |
| Subject honorific | High-frequency politeness contrast | Must connect people terms to predicate marking | 드세요, 계세요 |
| Connective | Clause chaining | Korean speech frequently chains clauses | 가서, 먹고 |
| Attributive | Noun modification | Needed surprisingly early in Korean | 먹는 사람, 예쁜 집 |
| Negation | Core communicative function | Enables minimally useful expression fast | 안 가요, 못 해요, 하지 않아요 |

This scope is grounded in official evidence that Korean learner resources prioritise conjugational forms and grammar expressions, that Korean ending categories are structurally central in corpus annotation, and that honorific listener and subject marking are grammatically explicit. The precise ordering in the table is a product recommendation based on those sources and on beginner communicative needs.

### Irregular patterns worth teaching before ship

| Irregular family | Official description | High-priority examples | Product recommendation |
|---|---|---|---|
| ㄷ irregular | Stem-final ㄷ changes to ㄹ before vowel-initial endings | 듣다 → 들어, 묻다 → 물어 | Teach as a dedicated family with alerts |
| ㅂ irregular | Stem-final ㅂ changes to 우 before vowel-initial endings, with 돕다/곱다 showing 와 | 춥다 → 추워, 아름답다 → 아름다워 | Teach after regular vowel contractions |
| ㅅ irregular | Stem-final ㅅ drops before vowel-initial endings | 짓다 → 지어, 낫다 → 나아 | Group as "drop-ㅅ" family |
| ㅎ irregular | In some adjectives, final ㅎ contracts before certain endings | 파랗다 → 파래 | Restrict early teaching to high-frequency colour adjectives |
| 르 irregular | Official NIKL Q&A explains that stem-final 르 changes before -아/-어 | 부르다 → 불러, 다르다 → 달라 | Teach as pattern family, not one-off exceptions |
| 러 irregular | -어/-어서 becomes -러 in a small set | 이르다 → 이르러 | Leave for later beginner or early intermediate |
| ㄹ deletion before certain endings | Traditionally called ㄹ irregular, though NIKL notes modern analysis treats it as regular deletion | 길다 → 긴, 깁니다 | Teach functionally, even if linguistic treatment varies |

The official basis for the major irregular families comes directly from National Institute of Korean Language terminology and Q&A resources. One subtle but important design point is that the app should not force learners to memorise "irregular" as a single bucket. Instead, it should model families with predictable triggers, because that is how the official descriptions define them.

### A practical POS schema for teaching and NLP

| Learner-facing class | Sejong tags most relevant | UD-style mapping | Use in app |
|---|---|---|---|
| Common noun | NNG, NNB, XR | NOUN | Lexical core, counters, topic/object practice |
| Proper noun | NNP | PROPN | Names, places, entities |
| Pronoun | NP | PRON | Restricted early use; often omissible in Korean |
| Verb | VV, VX, VCP, VCN | VERB | Main inflection engine |
| Descriptive verb | VA | ADJ | Treated as predicate-like in lessons |
| Adverb | MAG, MAJ | ADV/CONJ | Manner and sentence linking |
| Determiner | MM | DET | This/that/some etc. |
| Particle/postposition | JKS, JKC, JKG, JKO, JKB, JKV, JKQ, JX, JC | ADP | Case, topic, additive, only, with, to, from |
| Ending | EP, EF, EC, ETN, ETM | PART | Tense, mood, clause type, modifier forms |
| Derivational affix | XPN, XSN, XSA, XSV | PART | Word-family teaching, derivation hints |
| Interjection | IC | INTJ | High-value early oral expressions |

A dual schema like this avoids two common problems. If the app stores only learner-facing classes, it loses enough detail to generate reliable forms and exercise targeting. If it stores only a full NLP tagset, beginner instruction becomes opaque. The correct compromise is to author content against a simplified pedagogical schema while preserving the richer Sejong-compatible tags underneath.

## Vocabulary selection and grading

A beginner Korean app should not define its "core vocabulary" purely by raw corpus frequency. Korean learning value depends on at least four factors: frequency, communicative necessity, morphological productivity, and curricular compatibility. Official Korean learner resources already embody this logic. The Basic Korean Dictionary says its 50,000 headwords were selected from a survey of contemporary standard Korean vocabulary frequency and from words and phrases that often appear in Korean textbooks, while also giving special attention to grammar/expressions and culturally salient vocabulary. That is exactly the right selection philosophy for app onboarding and shipment.

The most defensible starting point is to anchor the app on official graded learner resources, then re-rank within them by frequency and lesson fit. The National Institute of Korean Language's published learner vocabulary list includes 982 level-1 items, 2,111 level-2 items, and 2,872 level-3 items for a total of 5,965. The Basic Korean Dictionary then adds fine-grained learner support through level labels, examples, pronunciation, semantic relations, and conjugational forms. Together, those two official resources provide a much stronger base than crowdsourced "top 1000 Korean words" lists.

Official materials also remind us that Korean vocabulary is not homogeneous. Korean learner-facing explanations divide the lexicon into indigenous words, Sino-Korean words, and loanwords, and they note that general communication leans heavily on indigenous vocabulary while Sino-Korean forms often dominate in formal or literate registers. This matters for English-to-Korean mapping because one English gloss may require multiple Korean entries. "Today", for instance, can correspond to everyday 오늘 or more formal Sino-Korean 금일, and a beginner app that flattens such distinctions will teach incorrect usage even when the gloss is semantically "right".

### Proposed vocabulary tiers for shipping

| Tier | Proposed size | Selection principle | What it should contain |
|---|---|---|---|
| Script-prelexical | 0 lexical items | Orthographic control | Hangeul letters, syllable-block patterns, batchim recognition |
| Core oral launch set | 300–400 senses | Survival communication | Greetings, self-introduction, numbers, time, family, places, food, common verbs, adjectives, particles |
| Core 1000 | 800–1,000 senses | Official graded list + frequency + textbook salience | The most reusable beginner vocabulary, formulaic expressions, high-frequency predicates, counters, pronouns, question words |
| Core 2000 | 1,800–2,000 senses | Add level-2 official items + early topical extensions | Daily life, transport, work, study, health, shopping, simple abstract vocabulary |
| Post-ship extension | 3,000+ senses | Frequency plus curricular pathways | News, formal register, cultural terms, more Sino-Korean networks, idioms |

These counts are a product recommendation rather than an official standard, but they are deliberately aligned to the official 982-item starter list and the levelled learner dictionary ecosystem. In other words, "core 1000" is not a magical linguistic threshold; it is a practical packaging decision built on the official level-1 list, reworked for app pacing and exercise variety.

### Recommended thematic coverage inside the core lexicon

| Theme | Why it belongs in the first ship | Morphology to bind with it |
|---|---|---|
| Identity and courtesy | Needed on day one | -요, -습니다, honorific names/titles |
| Numbers, dates, time | Essential and structurally distinctive | Native vs Sino-Korean numerals, counters |
| Home, family, food | High communicative frequency | Possession, location particles, honorific kin terms |
| Motion and place | Enables sentence framing | 에, 에서, 로/으로, 있다/없다, 가다/오다 |
| Daily routines | Supports verb-centred learning | Past, negation, sequencing -고/-아서 |
| People and description | Lets learners form real propositions | VA predicates, topic marking, modifier forms |
| Transactions and service | Useful across platforms and travellers | Formal polite endings, requests |
| Study/work basics | Common for adult learners | Noun+하다 patterns, Sino-Korean word families |

A first-release lexicon should be sense-based rather than type-based. For example, 보다 should not be a single card with a long English list; official learner materials note that native high-frequency verbs like 보다 are strongly polysemous. In practice, each major sense needs its own teaching context, example, and review history.

## Curriculum sequencing and pedagogy

The curriculum should move from syllable to word to phrase to sentence not because that is old-fashioned, but because official Korean curriculum guidance explicitly recommends phased progression in this direction, especially for beginners. The Korean standard curriculum says that teaching should proceed gradually, starting with spelling out words and extending writing from words to sentences and paragraphs, while beginners should learn to construct words from consonants and vowels and read basic words and short sentences. That official progression aligns almost perfectly with a mobile app's lesson scaffolding.

```
Hangeul letters
Syllable blocks
Pronunciation and batchim
High-frequency words
Formulaic phrases
Sentence frames with particles
Short dialogues
Guided production
Topical expansion and review
```

This flow is a synthesis of official beginner curriculum guidance, learner dictionary affordances, and the structure of Korean morphology. The key design principle is that every new lexical item should arrive with just enough phonology and morphology to be usable in a phrase, not as an isolated noun or citation verb.

A balanced pedagogical design should then follow the logic of Nation's four strands. The framework classifies effective language-course activity into meaning-focused input, meaning-focused output, language-focused learning, and fluency development, and it argues that a well-balanced course should include all four. For an app, that means every content unit should mix explanation and noticing with comprehension, retrieval, output, and fast recycling.

Spaced repetition is not just a useful add-on; it should be the app's memory backbone. A major meta-analysis of second-language learning found a medium-to-large effect of spacing, with longer spacing better supporting delayed retention than shorter spacing in delayed post-tests, while equal and expanding spacing performed similarly overall. The product implication is straightforward: use spaced review by default, and do not obsess over whether intervals must be strictly expanding.

Retrieval practice should be at least as central as exposure. Karpicke and Roediger's work showed that repeated testing after learning improved delayed recall, while repeated restudy alone did not produce the same delayed benefit. In app design, that means recognition-only flashcards are not enough; users must repeatedly pull the target from memory in both directions: hearing-to-meaning, meaning-to-form, and form-to-pronunciation.

Mnemonics are useful early but should be used selectively. Research reviews of the keyword method describe it as a two-stage mnemonic for associating unfamiliar foreign-language forms with familiar native-language keywords and meanings, and later work finds that this can improve vocabulary recall. For Korean beginners, mnemonic support is most useful for low-imageability phonological forms and high-confusion minimal sets, but less useful once repeated exposure and morphology become more informative.

The app should therefore implement a three-mode cycle for each lexical sense. First, the learner notices the form in context with audio and script. Second, the learner retrieves it with increasingly difficult prompts. Third, the learner deploys it in constrained production. That last phase matters because productive vocabulary knowledge is linked to smoother sentence comprehension and stronger lexical integration; productive phrase knowledge has been shown to improve second-language listening efficiency.

## Exercises, minimal pairs, and assessment

Input and output exercises should form a deliberate progression rather than a miscellany. At beginner level, input tasks should primarily build orthographic decoding, phonological discrimination, and sense recognition; output tasks should build copy-free recall, controlled inflection, and sentence assembly. The Korean standard curriculum explicitly encourages assessment and teaching approaches that combine discrete-point and integrative methods, use process as well as outcome, and motivate learners through participation in the assessment process.

### Exercise ladder

| Stage | Input tasks | Output tasks | Main metric |
|---|---|---|---|
| Script | jamo recognition, block parsing, audio-to-block matching | type the heard syllable, rebuild block from parts | decoding accuracy, response time |
| Word | audio-to-meaning, meaning discrimination, picture matching | recall Hangul from English cue, read aloud | form recall, pronunciation attempt |
| Phrase | phrase matching, particle recognition, cloze with audio | complete phrase with correct particle/endings | grammatical accuracy in phrase context |
| Sentence | dialogue comprehension, sentence ordering, dictation-lite | translate constrained English prompts, shadow and reformulate | sentence-level accuracy and fluency |
| Review | mixed modal retrieval | cumulative recall and reuse | long-term retention, transfer |

The exercise mix above is consistent with the evidence for spacing, retrieval, and balanced input/output. It also suits Korean particularly well because form-level and phrase-level accuracy are both essential: a learner who knows the gloss of 집 but cannot use 집에, 집에서, 우리 집, or 작은 집 does not yet know the word in a usable sense.

### Minimal pairs and common pitfalls for English speakers

| Pitfall area | Example set | Why English speakers struggle | Teaching response |
|---|---|---|---|
| Three-way stop contrast | 달 / 딸 / 탈 | English maps Korean contrasts into a two-way system | Use triplet audio discrimination before production |
| Lenis vs aspirated | 불 / 풀 | English often treats both as voiceless-like | Train with VOT + pitch-rich examples |
| ㄹ category | 라면, 나라, 빨리 | Korean ㄹ is neither identical to English /r/ nor /l/ | Teach positional realisation with audio, not romanisation |
| ㅓ vs ㅗ | 먹어 / 모거 style confusions | Romanisation and English vowel expectations mislead | Use vowel maps and auditory minimal sets |
| ㅡ vs ㅜ | 글 / 굴, 크다 / 쿠다-style confusions | ㅡ has no close English equivalent | Add mouth-shape cueing and slow audio |
| Batchim and resyllabification | 한국어, 같이, 읽어요 | Orthography–pronunciation mismatch surprises learners | Show "spelling" and "sounds like" layers |
| Particle omission | 저는 학생이에요 vs 저 학생이에요 in controlled tasks | English lacks postpositions of this kind | Keep particles attached to phrase frames from the start |
| Register mismatch | 오늘 vs 금일; 먹어요 vs 잡수세요 | English glosses hide register and honorific distinctions | Teach by scenario, speaker relation, and listener status |

The phonological difficulty of Korean stops for English listeners is well attested: English learners tend to assimilate Korean lenis and aspirated stops toward English voiceless categories, while fortis stops are treated differently, and specific vocabulary learning studies with English speakers have used minimal triplets based on the Korean three-way plosive contrast. Orthography–pronunciation mismatches and formal/everyday lexical alternations are directly illustrated in official Korean sources.

Assessment should measure more than correctness. The Korean standard curriculum recommends validity, reliability, authenticity, formative and summative assessment, and the use of results to improve learning. For an app, that translates into a layered metrics system: accuracy, latency, stability over time, generative reuse, and pronunciation intelligibility. On the pronunciation side, recent Korean learner speech-corpus work shows a practical path: score pronunciation accuracy and prosodic fluency separately and keep the metadata needed for later modelling.

A strong beginner metric suite would therefore include: lexical recognition accuracy, lexical recall accuracy, syllable-block decoding speed, inflection accuracy by family, particle accuracy in sentence frames, spaced-retention score after one week and one month, and pronunciation scores split into segmental accuracy and prosodic fluency. Those dimensions are justified by the official curriculum's assessment framework and by current Korean learner speech-corpus design.

## UX and data architecture

The most important UX rule for English-to-Korean mapping is this: do not pretend that one English lemma equals one Korean word. Official Korean learner-facing material explicitly shows that Korean vocabulary is layered by indigenous, Sino-Korean, and loanword strata, and that formal and everyday Korean may choose different words for the same English concept. The app must therefore be built around sense disambiguation plus usage context, not naive bilingual equivalence.

The second major UX rule is to make Hangul primary and romanisation secondary. Official romanisation rules state that romanisation is based on standard Korean pronunciation, not on English reading conventions, and learner materials emphasise pronunciation, spelling, and phonological properties. Romanisation can be useful as a temporary support layer, but if it is presented as the main display, learners will build fragile phonological categories and delay script automatisation.

The Basic Korean Dictionary is especially instructive as a model resource. It offers learner-level information, pronunciation, multimedia, grammar/expressions, conjugational forms, and rich examples, all of which point toward a content architecture where the displayed vocabulary item is only the top layer over richer structured data.

### Recommended content entities

```
LEXEME ──has──▶ SENSE
SENSE  ──realises──▶ FORM
SENSE  ──glossed_by──▶ TRANSLATION
SENSE  ──appears_in──▶ EXAMPLE
LEXEME ──links──▶ WORD_FAMILY
EXAMPLE ──pronounced_as──▶ AUDIO
FORM   ──affected_by──▶ PRON_RULE
FORM   ──tagged_with──▶ MORPH_TAG
SENSE  ──used_in──▶ EXERCISE_ITEM
USER   ──performs──▶ REVIEW_EVENT
EXERCISE_ITEM ──generates──▶ REVIEW_EVENT
```

This entity model is a synthesis, but it follows directly from the structure of Korean learner resources and the Sejong-style distinction between lexical items, forms, tags, and morphemes. The design goal is to avoid storing "word = string + translation" when Korean actually requires "lexeme + sense + form + register + morphemes + pronunciation".

### Suggested data schema

| Entity | Required fields | High-value optional fields | Notes |
|---|---|---|---|
| lexeme | lexeme_id, lemma_hangul, lemma_pos, origin_type, level | hanja, topic_tags, frequency_rank | origin_type = native / Sino-Korean / loanword / hybrid |
| sense | sense_id, lexeme_id, english_gloss, definition_en, register, scenario | contrastive_notes, false_friends, culture_note | One English gloss may map to many senses |
| form | form_id, lexeme_id, surface_form, morph_analysis, speech_level, honorific, tense_aspect | pronunciation_override, irregular_family | Stores generated and authored forms |
| example | example_id, sense_id, sentence_ko, translation_en, difficulty | audio_id, token_tags, topic | Prefer short phrase/sentence/conversation triplets |
| audio | audio_id, text, speaker_meta, speed_variant | pitch_range, prosody_score | Multiple speakers ideal for robust perception |
| exercise_item | item_id, target_type, prompt_mode, answer_mode, difficulty | distractor_profile, error_tags | Supports adaptive review |
| review_event | user_id, item_id, timestamp, result, latency_ms | confidence, attempt_count, device_mode | Required for memory scheduling |
| morph_tag | form_id, xpos, upos, particle_type, ending_type | ud_feats, normalised_suffix | Preserve Sejong-compatible detail |

### Recommended tagging dimensions

| Dimension | Example values | Why it matters |
|---|---|---|
| Word origin | native, Sino-Korean, loanword, hybrid | Helps teach register and word families |
| Register | everyday, polite, formal, honorific, written-formal | Prevents wrong-context translations |
| Speech level | plain, polite informal, polite formal | Essential for beginner output |
| Morph family | regular, ㄷ, ㅂ, ㅅ, ㅎ, 르, ㄹ-deletion | Drives generation and review |
| Particle frame | topic, subject, object, location, direction, additive, contrastive | Supports sentence-building |
| Exercise skill | recognise, recall, type, pronounce, choose particle, inflect, translate, produce | Needed for balanced pedagogy |
| Error type | phonology, orthography, particle, inflection, lexical choice, register | Needed for analytics and adaptation |

This schema also makes learner-corpus integration feasible. NIKL's learner corpus exposes morphological and error annotations and frequency statistics, while the KLM corpus and its UD treebank extensions show how L2 Korean data can support tokenisation, POS tagging, and syntactic annotation. If the app stores review events and user errors in a compatible way, later personalisation becomes much easier.

## Implementation roadmap and key sources

The roadmap below is an implementation estimate, not an externally sourced schedule. It assumes an unspecified budget and a goal of shipping a serious beginner MVP rather than a toy flashcard app.

### Recommended milestone plan

| Milestone | Scope | Main deliverables | Estimated effort |
|---|---|---|---|
| Foundation design | linguistic and product specification | POS schema, inflection rules, vocabulary policy, lesson architecture | 3–5 weeks |
| Content seed build | launch lexicon and script course | Hangeul module, 300–400 core senses, audio spec, first exercise templates | 6–10 weeks |
| Morphology engine | form generation and tagging | polite/past/honorific generation, particle-aware templates, irregular-family support | 4–6 weeks |
| Review and assessment layer | memory and analytics | spaced-repetition scheduler, mastery model, formative metrics dashboard | 3–5 weeks |
| MVP authoring | complete beginner path | 800–1,000 senses, 60–100 lessons, phrase/sentence bank, onboarding UX | 8–12 weeks |
| Pronunciation and QA | audio and learner testing | minimal-pair drills, pronunciation rubrics, user testing with English speakers | 4–8 weeks |
| Ship and iterate | first public release | telemetry, error analysis, curriculum revisions, tier-2 content backlog | ongoing |

A sensible first release should aim for depth, not breadth. In practice, that means shipping a narrow but coherent system with strong script training, careful polarity/register handling, particle-aware sentence frames, and reliable inflection coverage. If those pieces are wrong, adding another 5,000 words will not rescue the product.

### Risk register

| Risk | Why it is likely | Mitigation |
|---|---|---|
| Flat English↔Korean mapping causes incorrect usage | Korean has register- and origin-sensitive lexical alternatives | Store multiple senses per gloss with scenario labels |
| Romanisation becomes a crutch | English speakers over-trust Roman-letter approximations | Use Hangul-first UI and fade out romanisation |
| Users recognise words but cannot produce forms | Korean predicates require form generation | Build retrieval and inflection practice from day one |
| Pronunciation is ignored until later | Korean phonology affects lexical identity early | Add audio and minimal-pair work from the first week |
| Content team cannot scale morphology | Korean forms proliferate quickly | Separate authored lexemes from generated forms |
| Assessment only measures recognition | Recognition overestimates ability | Track recall, latency, inflection, and reuse |

### Key sources in English

The following are especially useful as anchor sources for product and curriculum decisions: the Standard Curriculum for Korean Language for level aims and assessment principles, the Basic Korean Dictionary for graded learner lexicon and conjugational support, the NIKL book The Korean Alphabet, Hangeul for the structure of syllable blocks, the NIKL overview Everything You Wanted to Know about the Korean Language for lexical strata and learner-facing explanations, and the Sejong/POS and learner-corpus papers for computational structure.

For pedagogy, the strongest compact references are the spacing meta-analysis in Language Learning, Karpicke and Roediger on retrieval practice, and Nation's Four Strands framework.

### Key sources in Korean

For Korean-language primary sources, the most important are the National Institute of Korean Language learner vocabulary list, the 국제 통용 한국어 표준 교육과정 and related graded vocabulary appendices, the 한국어 학습자 말뭉치 나눔터, and NIKL's terminology entries in 온용어 for particles, honorifics, derivation, compounding, and irregular conjugation families.

The clearest overall conclusion is that a successful beginner English-to-Korean app should be designed less like a bilingual word bank and more like a script-aware, morphology-aware, register-aware lexical operating system. Korean itself demands that structure, and the official and academic sources are unusually consistent on that point.
