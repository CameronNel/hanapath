# Sentences deep-research report — verbatim source of record

> Delivered by the owner on 2026-07-05 as the research input for the Sentences
> section. Preserved verbatim below (tables, charts, and citation markers
> degraded in transport; the original contained rendered diagrams and source
> links). **This is reference material, not instructions.** The adapted,
> repo-accurate target is [`SENTENCES_TEACHING_SPEC.md`](SENTENCES_TEACHING_SPEC.md)
> — where the two disagree (e.g. REST APIs, ASR backends, lyric mining,
> CEFR labels), the spec's adaptation decisions in its §1 govern. Note in
> particular: the report was written *before* the author had repo access —
> its "pending repo URL" scanning plan is obsolete (the scan happened; results
> are in the spec's §2), and its client-server data model is intentionally
> re-bound to this app's static architecture.

---

Deep Research Report on Scanning a Korean-Language GitHub App and Replacing Its Sentences Module with a K-pop-Informed Korean Learning System

## Executive Summary

This report is split into two parts because one key input is still missing: the repository URL. Since the repo link has not been provided yet, I am not inventing file paths, components, or schemas. Instead, I provide the exact repo-scanning workflow, tooling, queries, and output tables that should be run as soon as the URL is available; that is the safest way to locate the current sentences area, enumerate data contracts, identify UI dependencies, and flag dead code without hallucinating implementation details. The recommended scan approach combines GitHub's recursive Trees API for full-file inventory, GitHub Code Search and symbol search for targeted discovery, local recursive search with ripgrep, AST-aware structural search with ast-grep, and dead-code/dependency passes with Knip and dependency-cruiser.

On the learning-design side, the most credible pattern across documented foreign female K-pop cases is not a mysterious "idol secret," but a recognizable SLA stack: high daily exposure, forced use, formal instruction, peer scaffolding, media-assisted input, vocabulary accumulation, and pronunciation work embedded inside real performance pressure. Lisa said she took Korean class daily and improved quickly because she lived with members and "had to" use Korean; in a later interview she said learning languages in Korea was part of survival and also mentioned watching many K-dramas. Tsuki described cutting off contact with her parents for six months to avoid defaulting to Japanese, memorizing vocabulary daily, and studying unknown words from Korean films in real time. Kazuha's official vlog content explicitly shows Korean study as part of daily routine, and press coverage of that vlog highlights diary writing and routine study. Sakura described reading Korean books and looking up unknown items as she goes. Rei credited Korean growth to training plus member support, and Tzuyu said she tried to watch dramas and films often because Korean was still difficult. A Korea Herald feature on foreign-accented Korean also notes that many foreign idols spent extensive time on pronunciation, including speaking while biting a pen.

The academic literature supports turning those observations into product design. Meta-analytic and experimental evidence consistently favors spaced practice over massed review, retrieval over rereading, and deliberate pronunciation/listening work over passive exposure alone. Cepeda and colleagues' distributed-practice synthesis found robust spacing effects across a very large literature; Karpicke and Roediger showed that repeated retrieval improves delayed recall much more than extra restudying; shadowing research has found benefits for listening and phoneme perception; explicit work on formulaic sequences supports oral fluency; study-abroad and immersion meta-analyses find meaningful L2 gains relative to classroom-only exposure; and recent reviews/meta-analyses on songs and high-variability phonetic training support music-anchored tasks and multi-speaker pronunciation training when implemented with structure rather than as entertainment alone.

The implementation recommendation is therefore to replace a likely "shell" sentences section with a sentence-centered learning engine that treats each sentence as a richly tagged learning object linked to audio, source metadata, grammar chunks, pronunciation targets, shadowing tasks, review state, roleplay contexts, and progress analytics. The curriculum should use CEFR-equivalent internal levels rather than claiming an official TOPIK equivalence in the app; CEFR's can-do descriptors are appropriate for internal objective-setting, and ACTFL notes that CEFR alignment exists at the framework level for assessments, but direct Korean exam equivalence should be presented cautiously unless externally validated.

What follows is an implementable blueprint: a repo-scan plan, evidence review, curriculum and drill design, product specs with data models and APIs, copyright-safe content strategy, sample lesson plans, and 30/90/180-day execution roadmaps. Where repo-specific details are unavailable, I mark them as pending instead of fabricating them.

## Repo Scanning Blueprint for the Existing Sentences Section

*(Obsolete for this repo — the scan has since been performed with direct
filesystem access; verified findings live in `SENTENCES_TEACHING_SPEC.md` §2.
Retained for the record.)*

The best way to scan the repo, once the URL is supplied, is to combine a remote inventory pass with a local semantic pass. The remote pass gives you a complete tree cheaply through GitHub's Trees API and lets you search candidate files with GitHub Code Search before cloning; the local pass lets you do AST-aware matching, route/component tracing, schema extraction, and dead-code analysis.

A practical first-pass search should not look only for sentences. In Korean-language or multilingual apps, the feature may be named with labels such as 문장, 예문, 패턴, 회화, 학습, 대화, lyrics, quote, phrase, or translation keys that only surface in i18n files. Local recursive search should therefore inspect file contents, file paths, router definitions, translation dictionaries, navigation configs, CMS seed files, GraphQL/OpenAPI schema docs, Prisma/ORM models, and analytics event names.

The dead-code pass should be treated as triage, not deletion authority. The safe deletion policy is: only delete code that is unused and unreachable from routes/entry points and absent from config-driven registries/tests/feature flags.

## What Fast-Learning K-pop Idols and SLA Research Actually Suggest

The strongest idol evidence is consistent enough to turn into product principles.

| Idol case | Documented method | What it implies for learning design |
|---|---|---|
| Lisa | Korean classes ~2 hours daily; dorm life forced constant Korean use; watches many K-dramas. | Build daily formal lessons, high-frequency real-use drills, and entertainment-linked input rather than "study-only" flows. |
| Tsuki | Cut off contact with parents for six months to avoid reverting to Japanese; memorized 30 words a day; studied unknown words from Korean films in real time. | Strong L1-friction reduction, aggressive vocabulary quotas, and just-in-time lookup during media exposure are effective when motivation is high. |
| Kazuha | Korean study as part of daily routine; diary writing alongside training. | Normalize short daily study blocks integrated into ordinary routine, especially journaling and reflection. |
| Sakura | Reading Korean books and checking unknown items while reading. | Extensive reading with lookup support layered above sentence practice once the learner has enough basic grammar. |
| Rei | Entered with only basic greetings; studied during trainee life; direct Korean help from members. | Peer scaffolding, assisted conversation, and buddying should be productized. |
| Tzuyu | Korean still difficult; tried to watch dramas and movies often. | Media-based listening should be continuous, not a bonus feature. |
| Foreign-idol pronunciation training | Many foreign idols spend very long hours on pronunciation, including speaking while biting a pen. | Pronunciation cannot be left implicit; it needs explicit high-repetition articulation drills. |

What matters in those cases is not celebrity per se, but the learning ecology: urgency, identity, social immersion, repeated output, dense comprehensible input, and routine. That is exactly why a sentence module should not stay a static library of example sentences; it should become a daily-use engine where each sentence is heard, repeated, shadowed, mined, reviewed, pronounced, transformed, and reused in conversation.

The academic evidence is also fairly actionable.

| Method | What the literature says | Product implication |
|---|---|---|
| Spacing | Cepeda et al.'s synthesis found broad distributed-practice advantages; spacing and retention interval interact; short cramming is poor preparation for longer retention. | Schedule reviews over expanding gaps, chosen for the desired retention window. |
| Retrieval practice | Karpicke and Roediger: repeated retrieval produced strong delayed-recall gains; extra restudying did not. | Hide answers early; prioritize recall, dictation, translation-back, and prompted production over passive reading. |
| Shadowing | Hamada and later syntheses: meaningful for listening development and potentially phoneme perception. | Pair core sentences with progressive shadowing modes: listen-only, delayed repeat, simultaneous shadow, selective shadow, performance shadow. |
| Formulaic sequences | Chunks linked to better fluency and smoother oral production. | Teach sentence stems and reusable chunks before full free production; mine "frames," not only single words. |
| Immersion / study abroad | Meta-analyses report overall L2 gains over classroom-only conditions, varying by skill and context. | Simulate immersion inside the app with Korean-first UI moments, conversation-mode defaults, and output pressure. |
| High-variability pronunciation training | Recent syntheses support HVPT for L2 speech perception and generalization across speakers. | Use multiple speakers, not one studio voice, for discrimination and pronunciation tasks. |
| Songs in L2 learning | Reviews support songs/singing for motivation plus gains in vocabulary, pronunciation, engagement — when tasks are structured. | Use lyrics and rhythm as scaffold, not sole content; build cloze, chunk, stress, paraphrase tasks around them. |

The core design conclusion is simple: the fastest Korean-learning experiences associated with foreign female idols are best understood as immersion plus deliberate practice. The app should imitate the structure of that environment: constant exposure, daily output, chunk-first fluency work, pronunciation pressure, entertainment-linked repetition, and social or coach-like correction.

## Curriculum and Drill Architecture for the Replacement Module

The curriculum should be organized around CEFR-equivalent internal levels, not a simplistic "Beginner / Intermediate / Advanced" split. Position these levels as internal proficiency bands rather than promise official exam equivalence.

| Internal band | CEFR-equivalent target | Core sentence objectives | Exit criteria |
|---|---|---|---|
| Starter | Pre-A1 to A1 | Read Hangul reliably; identity, routine, need, location, time, preference, request, apology, thanks, encouragement sentences. | 400–600 active words, 150 mastered sentence frames, 80% recall on due reviews. |
| Foundation | A1 to A2 | Short dialogues on shopping, eating, plans, emotions, hobbies, basic social interactions. | 1,000–1,400 active words, 350 mastered frames, 2-minute guided conversation. |
| Growth | A2 to B1 | Explain reasons, compare options, narrate recent events, discuss goals, handle misunderstandings, paraphrase simple media. | 2,000–2,500 active words, 700 mastered frames, 5-minute semi-guided roleplay. |
| Fluency | B1 to B2 | Nuanced opinions, negotiation, spontaneous reaction, summarizing episodes/interviews, repair strategies. | 3,500+ active words, 1,200 mastered frames, 10-minute conversation with low support. |

The daily drill stack: due reviews first, then pronunciation/listening, then one new sentence pack, then one media-linked drill, then one production drill. Weekly: one longer conversation day, one dictation day, and one "mining" day.

| Cadence | Drill | Time | What the learner does |
|---|---|---|---|
| Daily | Due review | 15–20 min | Recall meaning, form, pronunciation, and production of due sentences. |
| Daily | Shadowing block | 10–15 min | Listen, delayed repeat, simultaneous shadow, record. |
| Daily | New sentence pack | 15–20 min | Learn 5–8 new sentences and their chunks. |
| Daily | Pronunciation lab | 5–10 min | Minimal pairs, 받침 release, tense/plain consonant contrast, vowel clarity. |
| Daily | Media drill | 10 min | Lyric/cloze/paraphrase task tied to licensed or paraphrased source material. |
| Daily | Output drill | 10–15 min | Roleplay, diary line, voice answer, reformulation. |
| Weekly | Mining session | 30–45 min | Save 10–20 useful lines from songs/shows/interviews. |
| Weekly | Conversation sim | 20–30 min | Branching roleplay with feedback. |

The spaced-repetition schedule should be explicit and visible. A good starting cadence for new sentence cards: immediate reinforcement, +1 day, +3 days, +7 days, +14 days, +30 days, +60 days, +120 days — an implementation-friendly default derived from spacing and retrieval principles, to be tuned from telemetry.

Error correction should happen in four passes. First, perception errors through dictation and minimal-pair discrimination. Second, form errors through chunk rearrangement, cloze, and conjugation transformation. Third, pronunciation issues through ASR plus phoneme/jamo-level scoring and prosody comparison. Fourth, usage issues through roleplay and reformulation. Feedback policy: "hint → recast → contrastive explanation → retry."

## Product Integration Spec for Replacing the Shell Sentences Section

The replacement should be architected as a learning platform inside the app, not a page refactor. Break the sentences area into a content layer, learning engine, practice surfaces, and analytics layer. Each sentence should be a first-class object with source metadata, linguistic tags, review state, audio variants, pronunciation targets, and roleplay contexts.

*(Entity model, REST API surface (`GET /v1/sentences`, `GET /v1/review/queue`,
`POST /v1/review/attempt`, `POST /v1/shadow/attempt`, `GET /v1/lessons/{id}`,
`POST /v1/mining/inbox`, `GET /v1/analytics/progress`, `POST /v1/roleplay/turn`)
and JSON payload examples omitted here — see the spec's §1 adaptation table:
this app has no backend; the equivalents are `sentences_core.js`,
`state.sentenceSrs`, and in-app functions.)*

Representative sentence payload from the report:

```json
{
  "id": "sent_ko_a1_000381",
  "korean": "오늘은 연습이 일찍 끝났어요.",
  "romanization": "oneureun yeonseubi iljjik kkeunnasseoyo",
  "english_gloss": "Practice ended early today.",
  "register": "polite_informal",
  "cefr_band": "A1",
  "difficulty_score": 0.32,
  "chunks": ["오늘은", "연습이", "일찍", "끝났어요"],
  "grammar_tags": ["topic-marker", "subject-marker", "past-polite"],
  "pronunciation_targets": ["ㅇ onset null", "ㅉ tense consonant", "final ㅂ assimilation"],
  "source_asset_id": "src_show_1012",
  "copyright_mode": "paraphrase_display"
}
```

The UI/UX should make the shift from "sentence browsing" to "sentence learning" obvious from the first minute: a hub with four default tabs — Study, Shadow, Mine, Review.

| UX flow | User journey | Success metric |
|---|---|---|
| Placement and onboarding | Goal, time budget, source preferences; quick level and listening check. | Day-1 lesson completion; placement confidence. |
| Daily practice | Due queue → today's new pack → one production task. | Review completion rate; time to first correct recall. |
| Shadowing lesson | Multi-speaker audio, staged shadowing, recorded voice, segment-level feedback. | Pronunciation/timing score improvement over attempts. |
| Sentence mining | Clip/save a source-linked sentence, paraphrase, tag, push to review. | Mining-to-review conversion; later retention. |
| Roleplay correction | Short scenario, recast and retry prompts, recurring-error summary. | Turn success rate; reduction in repeated error class. |

Gamification should reward consistency and reuse, not raw volume: streaks for daily reviews, badges for shadowing completion, themed mission arcs, social proof for stable retention. The analytics layer should measure: due-review completion, 7/30/90-day retention, new-to-mastered conversion, shadowing score change, roleplay turn success, mined-sentence reuse, drop-off by drill type.

One important product constraint is copyright. If the app will mine from K-pop songs, subtitles, or video captions, do not design the system around storing and repeatedly redisplaying full copyrighted lyrics or third-party subtitles by default. Absent a license, normal copyright rules apply; underlying music/lyrics are a protected musical work; platform terms restrict content use; Korean copyright law protects authors' rights. The safe architectural pattern is to store source references, timestamps, hashes, short licensed excerpts where permitted, and pedagogical paraphrases/user notes rather than bulk raw lyric or subtitle text.

## Sample Lesson Plans, Copyright-Safe Sentence Sets, and Rollout Roadmaps

Because full lyric and subtitle reuse raises rights issues, the sample sentence sets below are source-derived and pedagogically paraphrased, not verbatim reproductions.

| Sample lesson | Level | Goal | Output artifact |
|---|---|---|---|
| Fan greeting and identity | Starter | Introduce self, favorite group/member, simple preferences. | Self-introduction voice note + 5 seeded review cards |
| Practice-room routine | Foundation | Schedule, tiredness, encouragement, plans after practice. | Mini diary entry + 6 review cards |
| Interview reaction and opinion | Growth | Opinions, reasons, comparisons, emotional reaction to a clip. | 90-sec spoken answer + error notebook |
| Documentary summary | Fluency | Summarize a segment, interpret motivation, compare perspectives. | 3-minute summary + mined sentence deck |

Example copyright-safe sentence pack (K-pop-native flavor without reproducing protected lines):

| Source style | Korean sentence | English gloss | Best drill |
|---|---|---|---|
| Fan greeting | 안녕하세요, 저는 오늘 처음 왔어요. | Hi, I came here for the first time today. | Intro roleplay |
| Backstage routine | 오늘은 연습이 평소보다 길었어요. | Practice was longer than usual today. | Past-tense chunking |
| Encouragement | 긴장하지 말고 천천히 해도 돼요. | Don't be nervous; you can do it slowly. | Shadow + prosody |
| Schedule talk | 내일 아침에 리허설이 있어요. | We have rehearsal tomorrow morning. | Time-expression drill |
| Preference | 저는 밝은 노래보다 차분한 노래를 더 좋아해요. | I like calm songs more than bright songs. | Comparison pattern |
| Emotion reaction | 무대를 보고 정말 놀랐어요. | I was really surprised after seeing the stage. | Reaction phrase bank |
| Social interaction | 처음 만났는데도 편하게 이야기할 수 있었어요. | Even though we just met, we could talk comfortably. | Past connectives |
| Travel / promo | 오늘은 지방 일정이 있어서 일찍 출발해요. | We're leaving early because we have an out-of-town schedule. | Reason clause |
| Apology | 답장이 늦어서 미안해요. | Sorry for replying late. | Everyday utility pack |
| Self-motivation | 오늘도 끝까지 해보려고 해요. | I'm going to try to go all the way today too. | Future/intention |
| Variety-show spontaneity | 그 말 듣고 갑자기 웃음이 났어요. | I suddenly started laughing after hearing that. | Narrative reaction |
| Interview opinion | 무대는 짧았지만 준비 과정이 더 기억에 남아요. | The stage was short, but the preparation stays with me more. | Contrastive speaking |

Sample 20-minute drill script ("Practice-room routine"):

```text
Coach: Listen first. Do not repeat.
Sentence 1: 오늘은 연습이 평소보다 길었어요.

Coach: Now repeat after a 1-second gap.
[Audio repeats with delayed shadow]

Coach: Tap the chunk that means "longer than usual."
정답: 평소보다 길었어요

Coach: Change the sentence to future.
Target idea: Practice will be longer than usual tomorrow.

Learner: 내일은 연습이 평소보다 길 거예요.

Coach: Good. Now answer: 연습 끝나고 뭐 할 거예요?

Expected open response:
집에 가서 복습할 거예요 / 친구랑 밥 먹을 거예요 / 좀 쉴 거예요
```

Sample pronunciation drill script:

```text
Target sentence: 긴장하지 말고 천천히 해도 돼요.

Pass 1: Listen and mark the strongest beat.
Pass 2: Shadow only the chunk "천천히 해도."
Pass 3: Record yourself three times.

Feedback:
- Vowel clarity on ㅓ vs ㅐ
- Tense release on ㅉ in 긴장
- Final prosody should fall, not rise sharply

Retry: Say it once as calm encouragement, once as urgent advice.
```

The retention curve policy should be transparent in the dashboard: show how many cards are likely stable at 7, 30, and 90 days if reviewing continues — spacing as visible motivation.

Rollout (assuming the current sentences area is lightweight and replaceable incrementally):

| Horizon | Product work | Content work | Success target |
|---|---|---|---|
| First 30 days | Scan repo, define replacement architecture, build schema and review engine skeleton. | Starter + Foundation packs; rights policy and source taxonomy. | Internal alpha: due review + lesson view. |
| First 90 days | Study/Review/Shadow tabs; onboarding and placement; first roleplay scenarios. | 300–500 sentence objects, 50+ audio clips, chunk tags, pronunciation targets. | Beta with measurable review retention. |
| First 180 days | Full replacement of shell section; personalized cadence tuning. | Growth-level packs; licensed source material; themed collections. | Production module with durable daily engagement and observable retention lift. |

Learner-facing goals:

| Horizon | Expectation if consistent | Daily commitment |
|---|---|---|
| 30 days | Read Hangul comfortably, handle greetings/routines, retain 100–150 core sentences, simple shadowing. | 30–45 min |
| 90 days | Short daily-life conversations, understand repeated phrases in clips, retain 300–500 sentences. | 45–60 min |
| 180 days | Multi-minute guided conversations, summarize simple media, chunked speech with less hesitation. | 60–90 min |

The remaining unknowns that should be resolved once the repo link arrives are operational rather than conceptual: framework and routing system, existing backend/data source, current analytics stack, whether sentence content lives in code or a CMS, availability of audio assets, and rights to use lyrics/subtitles at scale. Those items determine migration complexity, but they do not change the recommended direction: convert the current shell into a sentence-first, review-driven, shadowing-capable Korean learning system modeled on the high-exposure, deliberate-practice routines that both idol case evidence and SLA research support.
