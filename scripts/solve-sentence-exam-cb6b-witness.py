#!/usr/bin/env python3
"""Solve the CB6B five-attempt witness as an exact binary MILP.

SciPy delegates the model to HiGHS. The committed assignment remains a plain
JSON authoring input; `--check` proves it is the deterministic optimum produced
from the current frozen bank and CB6B authoring package.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
from collections import defaultdict
from pathlib import Path

import numpy as np
from scipy.optimize import Bounds, LinearConstraint, milp
from scipy.sparse import coo_matrix


ROOT = Path(__file__).resolve().parent.parent
AUTHORING_FILE = ROOT / "docs/generated/sentence_exam_cb6_capacity_authoring.json"
BANK_FILE = ROOT / "sentence_exam_curated_bank.js"
ASSIGNMENT_FILE = ROOT / "docs/authoring/sentence_exam_cb6b_witness_assignment.json"
JOINT_SOLUTION_FILE = ROOT / "docs/generated/sentence_exam_cb6b_joint_solution.json"
REVISION = "curated-sentence-exam-v2-cb6b-authoring"
STRANDS = ("P", "F", "X", "R", "C")

FORM_TAGS = {
    "present-polite", "past-polite", "future-geoyeyo", "formal-nida", "honorific-si",
    "imperative-seyo", "propositive-eyo", "copula-ieyo", "copula-negative-anieyo",
    "neg-an", "neg-mot", "neg-ji-anta", "want-go-sipda", "can-su-itda", "must-ya-dwaeda",
}
CONTEXT_TAGS = {
    "topic-neun", "subject-i-ga", "object-eul-reul", "time-expression", "location-e",
    "location-eseo", "possessive-ui", "because-aseo", "direction-euro", "and-go",
    "with-hago-wa", "if-myeon", "existence-itda", "counter-phrase", "when-ttae",
    "also-do", "comparison-boda", "until-kkaji", "but-jiman", "only-man", "from-buteo",
    "question-polite",
}

ALLOCATIONS = {
    "sentence-exam-1": {"P": 14, "F": 3, "X": 3, "R": 2, "C": 2},
    "sentence-exam-2": {"P": 14, "F": 3, "X": 3, "R": 2, "C": 2},
    "sentence-exam-3": {"P": 14, "F": 3, "X": 3, "R": 2, "C": 2},
    "sentence-exam-4": {"P": 14, "F": 3, "X": 3, "R": 2, "C": 2},
    "sentence-exam-5": {"P": 30, "F": 6, "X": 4, "R": 5, "C": 5},
}

TAG_FLOORS = {
    "sentence-exam-1": {
        "present-polite": 6, "topic-neun": 3, "subject-i-ga": 3, "object-eul-reul": 4,
        "location-e": 2, "location-eseo": 2, "copula-ieyo": 2, "question-polite": 2,
        "time-expression": 2,
    },
    "sentence-exam-2": {
        "present-polite": 4, "past-polite": 4, "future-geoyeyo": 3, "time-expression": 3,
        "object-eul-reul": 4, "subject-i-ga": 3, "topic-neun": 3, "location-e": 2,
        "location-eseo": 2, "neg-an": 2, "neg-mot": 1, "neg-ji-anta": 1,
        "want-go-sipda": 2, "can-su-itda": 2, "question-polite": 2,
    },
    "sentence-exam-3": {
        "past-polite": 4, "future-geoyeyo": 4, "present-polite": 3, "formal-nida": 3,
        "honorific-si": 3, "imperative-seyo": 2, "propositive-eyo": 1, "neg-an": 2,
        "neg-mot": 2, "neg-ji-anta": 2, "and-go": 2, "but-jiman": 2,
        "because-aseo": 2, "if-myeon": 2, "when-ttae": 1, "object-eul-reul": 3,
        "subject-i-ga": 3, "topic-neun": 2,
    },
    "sentence-exam-4": {
        "present-polite": 3, "past-polite": 4, "future-geoyeyo": 4, "formal-nida": 4,
        "honorific-si": 4, "object-eul-reul": 3, "subject-i-ga": 3, "topic-neun": 3,
        "time-expression": 3, "neg-an": 2, "neg-mot": 2, "neg-ji-anta": 2,
        "and-go": 2, "but-jiman": 2, "because-aseo": 2, "if-myeon": 2,
        "when-ttae": 2, "want-go-sipda": 2, "can-su-itda": 2, "must-ya-dwaeda": 2,
        "question-polite": 2, "imperative-seyo": 2,
    },
    "sentence-exam-5": {
        "object-eul-reul": 4, "present-polite": 4, "subject-i-ga": 4, "past-polite": 5,
        "topic-neun": 4, "time-expression": 3, "location-e": 3, "location-eseo": 3,
        "possessive-ui": 2, "because-aseo": 2, "imperative-seyo": 2, "copula-ieyo": 2,
        "direction-euro": 2, "honorific-si": 4, "and-go": 2, "question-polite": 2,
        "with-hago-wa": 2, "formal-nida": 4, "if-myeon": 2, "existence-itda": 2,
        "counter-phrase": 2, "when-ttae": 2, "can-su-itda": 2, "must-ya-dwaeda": 2,
        "also-do": 2, "comparison-boda": 2, "want-go-sipda": 2, "neg-ji-anta": 2,
        "neg-an": 2, "neg-mot": 2, "future-geoyeyo": 5, "until-kkaji": 1,
        "propositive-eyo": 1, "but-jiman": 2, "only-man": 1, "from-buteo": 1,
        "copula-negative-anieyo": 2,
    },
}


def normalize(value: object) -> str:
    return " ".join(unicodedata.normalize("NFC", str(value or "")).strip().split())


def load_json(path: Path) -> object:
    return json.loads(path.read_text(encoding="utf-8"))


def load_bank() -> dict:
    source = BANK_FILE.read_text(encoding="utf-8")
    match = re.search(
        r"window\.HANAPATH_SENTENCE_EXAM_CURATED_BANK\s*=\s*(\{.*\});\s*\}\)\(\);\s*$",
        source,
        re.DOTALL,
    )
    if not match:
        raise RuntimeError("Could not parse sentence_exam_curated_bank.js")
    return json.loads(match.group(1))


def candidate_strands(entry: dict) -> tuple[str, ...]:
    if entry.get("mode") == "recognition":
        return ("R", "C")
    tags = set(entry.get("patternTags") or [])
    strands = ["P"]
    if tags & FORM_TAGS:
        strands.append("F")
    if tags & CONTEXT_TAGS:
        strands.append("X")
    return tuple(strands)


def scope_max(exam_id: str) -> int:
    return 8 if exam_id == "sentence-exam-5" else int(exam_id[-1]) * 2


def coverage_floors(exam_id: str) -> dict[str, int]:
    if exam_id == "sentence-exam-1":
        return {"section-1": 8, "section-2": 8}
    if exam_id == "sentence-exam-5":
        return {f"section-{section}": 5 for section in range(1, 9)}
    stage = int(exam_id[-1])
    return {
        f"band-{band}": 8 if band == stage else 3
        for band in range(1, stage + 1)
    }


def coverage_keys(entry: dict) -> tuple[str, str]:
    section = int(entry["sourceSectionOrder"])
    return f"section-{section}", f"band-{(section + 1) // 2}"


def solve_exam(exam_id: str, entries: list[dict]) -> list[list[dict]]:
    eligible = [
        entry for entry in sorted(entries, key=lambda item: item["id"])
        if int(entry["sourceSectionOrder"]) <= scope_max(exam_id)
    ]
    variables: list[tuple[int, str, int]] = []
    by_attempt_strand: defaultdict[tuple[int, str], list[int]] = defaultdict(list)
    by_attempt_tag: defaultdict[tuple[int, str], list[int]] = defaultdict(list)
    by_attempt_coverage: defaultdict[tuple[int, str], list[int]] = defaultdict(list)
    by_target: defaultdict[str, list[int]] = defaultdict(list)

    for attempt in range(5):
        for entry_index, entry in enumerate(eligible):
            for strand in candidate_strands(entry):
                variable_index = len(variables)
                variables.append((attempt, strand, entry_index))
                by_attempt_strand[(attempt, strand)].append(variable_index)
                for tag in entry.get("patternTags") or []:
                    by_attempt_tag[(attempt, tag)].append(variable_index)
                for coverage in coverage_keys(entry):
                    by_attempt_coverage[(attempt, coverage)].append(variable_index)
                by_target[normalize(entry["canonicalAnswer"])].append(variable_index)

    row_indices: list[int] = []
    column_indices: list[int] = []
    coefficients: list[float] = []
    lower: list[float] = []
    upper: list[float] = []

    def add_constraint(indices: list[int], minimum: float, maximum: float) -> None:
        row = len(lower)
        for index in indices:
            row_indices.append(row)
            column_indices.append(index)
            coefficients.append(1.0)
        lower.append(minimum)
        upper.append(maximum)

    for attempt in range(5):
        for strand, required in ALLOCATIONS[exam_id].items():
            add_constraint(by_attempt_strand[(attempt, strand)], required, required)
        for tag, required in TAG_FLOORS[exam_id].items():
            add_constraint(by_attempt_tag[(attempt, tag)], required, np.inf)
        for coverage, required in coverage_floors(exam_id).items():
            add_constraint(by_attempt_coverage[(attempt, coverage)], required, np.inf)
    for indices in by_target.values():
        add_constraint(indices, 0, 1)

    matrix = coo_matrix(
        (coefficients, (row_indices, column_indices)),
        shape=(len(lower), len(variables)),
    ).tocsc()
    objective = np.array([
        (entry_index + 1) * 100 + attempt * 10 + STRANDS.index(strand)
        for attempt, strand, entry_index in variables
    ], dtype=float)
    result = milp(
        c=objective,
        integrality=np.ones(len(variables)),
        bounds=Bounds(np.zeros(len(variables)), np.ones(len(variables))),
        constraints=LinearConstraint(matrix, np.array(lower), np.array(upper)),
        options={"presolve": True, "time_limit": 120},
    )
    if not result.success or result.x is None:
        raise RuntimeError(
            f"{exam_id} MILP failed: status={result.status}, message={result.message}"
        )

    attempts: list[list[dict]] = [[] for _ in range(5)]
    for value, (attempt, strand, entry_index) in zip(result.x, variables):
        if value > 0.5:
            attempts[attempt].append({"id": eligible[entry_index]["id"], "strand": strand})
    for attempt in attempts:
        attempt.sort(key=lambda selected: (STRANDS.index(selected["strand"]), selected["id"]))
    return attempts


def solve() -> dict:
    bank = load_bank()
    authoring = load_json(AUTHORING_FILE)
    if bank.get("revision") == "curated-sentence-exam-v2-cb6b":
        entries = bank["entries"]
    else:
        entries = [*bank["entries"], *authoring["entries"]]
    canonical_keys = [normalize(entry["canonicalAnswer"]) for entry in entries]
    if len(canonical_keys) != len(set(canonical_keys)):
        raise RuntimeError("Projected bank has duplicate canonical targets")
    exams = {
        exam_id: solve_exam(exam_id, entries)
        for exam_id in sorted(ALLOCATIONS)
    }
    return {
        "schemaVersion": 1,
        "revision": REVISION,
        "generatedBy": "scripts/solve-sentence-exam-cb6b-witness.py (SciPy MILP/HiGHS)",
        "exams": exams,
    }

def joint_solution(solution: dict) -> dict:
    authoring = load_json(AUTHORING_FILE)
    return {
        "schemaVersion": 1,
        "revision": REVISION,
        "generatedBy": solution["generatedBy"],
        "selectedTypedIds": sorted(
            entry["id"] for entry in authoring["entries"] if entry["mode"] == "typed"
        ),
        "selectedRecognitionIds": sorted(
            entry["id"] for entry in authoring["entries"] if entry["mode"] == "recognition"
        ),
        "witnessAssignment": solution["exams"],
    }


def render(value: dict) -> str:
    return json.dumps(value, ensure_ascii=False, indent=2) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--write", action="store_true")
    mode.add_argument("--check", action="store_true")
    mode.add_argument("--print", action="store_true", dest="print_result")
    args = parser.parse_args()

    solution = solve()
    expected = render(solution)
    expected_joint = render(joint_solution(solution))
    if args.write:
        ASSIGNMENT_FILE.write_text(expected, encoding="utf-8", newline="\n")
        JOINT_SOLUTION_FILE.write_text(expected_joint, encoding="utf-8", newline="\n")
        print(f"Wrote exact CB6B witness assignment: {ASSIGNMENT_FILE}")
        print(f"Wrote exact CB6B joint solution: {JOINT_SOLUTION_FILE}")
        return 0
    if args.print_result:
        sys.stdout.write(expected)
        return 0
    actual = ASSIGNMENT_FILE.read_text(encoding="utf-8")
    actual_joint = JOINT_SOLUTION_FILE.read_text(encoding="utf-8")
    if actual != expected or actual_joint != expected_joint:
        print(f"Stale exact CB6B witness assignment: {ASSIGNMENT_FILE}", file=sys.stderr)
        return 1
    print("Exact CB6B SciPy/HiGHS witness assignment is current.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
