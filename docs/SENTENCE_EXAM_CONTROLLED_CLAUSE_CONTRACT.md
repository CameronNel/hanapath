# Sentence exam controlled-clause transformation contract

> **Normative owner decision.** This contract resolves the conflict between the locked typed `X`
> strand and the exact-answer fairness rule for productive Korean clause families. It does not permit
> open English-to-Korean clause translation. It defines a narrow, fail-closed transformation item in
> which the learner receives the exact Korean source material and performs one specified grammar
> operation.

## 1. Decision

Clause-sensitive rows may enter typed certification only through the
`controlled-clause-transformation` template and only when every requirement in this document is met.
The approved clause-sensitive tags are:

- `and-go`
- `because-aseo`
- `if-myeon`
- `when-ttae`
- `but-jiman`
- `want-go-sipda`
- `propositive-eyo`

Any open translation or context-production prompt for these tags remains recognition-only.

## 2. Construct boundary

The item measures whether the learner can apply one explicitly taught Korean grammar operation to
supplied Korean material. It does not measure free translation, paraphrase, synonym choice, topic
selection, particle selection, or unrestricted word order.

The learner prompt must expose:

1. the exact Korean source fragment or fragments;
2. the required Korean construction surface;
3. the required operation;
4. the locked preservation instruction;
5. the locked tense, speech-level, and information-structure instruction.

The learner must preserve the supplied wording, particles, and order except for the named grammar
change. The grader remains strict NFC and whitespace-normalized exact matching against the canonical
answer plus at most four independently reviewed alternatives.

## 3. Operations

| Tag family | Required operation | Source fragments |
|---|---|---:|
| `and-go`, `because-aseo`, `if-myeon`, `when-ttae`, `but-jiman` | `combine-clauses` | exactly 2 |
| `want-go-sipda` | `recast-predicate` | exactly 1 |
| `propositive-eyo` | `change-speech-act-ending` | exactly 1 |

No additional operation may be inferred or generated at runtime.

## 4. Entry data contract

```js
{
  mode: "typed",
  templateId: "controlled-clause-transformation",
  examPromptEn: "...",
  canonicalAnswer: "저는 아침을 안 먹지만 커피는 마셔요.",
  manualAlternatives: [],
  requiresLexicalAnchor: true,
  controlledClause: {
    schemaVersion: 1,
    operation: "combine-clauses",
    requiredPatternTag: "but-jiman",
    requiredConstructionCue: "-지만",
    sourceFragments: [
      "저는 아침을 안 먹어요.",
      "커피는 마셔요."
    ],
    sourceEnding: "먹어요",
    targetEnding: "먹지만",
    preserveSourceOrder: true,
    preserveLexicalMaterial: true,
    preserveParticles: true,
    acceptedAnswerPolicy: "reviewed-finite-only"
  }
}
```

The prompt must contain each source fragment and `requiredConstructionCue` verbatim and in the
contracted order. `sourceEnding` must be the exact suffix replaced in the first source fragment, and
`targetEnding` must produce the canonical target when the unchanged remaining fragments are joined.
This exact reconstruction check permits another productive form only when it is already supplied and
locked inside an unchanged source fragment. It must also contain these exact instructions:

```text
Preserve the supplied Korean wording, particles, and order except for the required grammar change.
Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.
```

## 5. Fail-closed audit rules

The audit rejects the item when any of the following is true:

- the row carries a clause-sensitive tag but uses another typed template;
- the controlled template is used for a row without an approved clause-sensitive tag;
- the operation or visible construction cue does not match the required tag;
- the fragment count is wrong;
- the declared source ending is not the exact suffix of the transformed fragment;
- the declared target ending does not realise the required tag;
- replacing the source ending and joining the unchanged fragments does not reconstruct the canonical target exactly;
- a fragment or construction cue is hidden from the learner prompt;
- source order, lexical material, or particles are not locked for preservation;
- the accepted-answer policy is not `reviewed-finite-only`;
- either locked prompt instruction is absent;
- any ordinary ambiguity flag remains after contract validation;
- independent review evidence is missing, stale, or self-authored;
- more than four alternatives are stored;
- an accepted answer collides with another item.

A valid contract suppresses only the productive-clause and particle/order family exclusions that the
visible preservation task directly resolves. Duplicate targets and every other audit remain active.

## 6. Historical eligibility evidence

A historical `typedClass: "excluded"` classification assessed the old open-translation item shape.
It does not permanently ban the same lesson row from a later controlled transformation item. A valid
controlled-clause contract plus current independent review may supersede that historical exclusion.
The historical record remains protected evidence and is not rewritten.

## 7. Non-negotiable exclusions

This contract does not allow:

- fuzzy matching, edit distance, embeddings, semantic similarity, or LLM grading;
- generated variants or automatic particle, word-order, or clause-order transformations;
- hidden source fragments;
- English-only clause prompts;
- lowering any paper allocation, tag floor, or freshness rule;
- self-approval or approval inferred from mechanical validation.

This packet defines and enforces an eligibility shape only. It approves no Sentence row and emits no
runtime-bank or freeze revision.
