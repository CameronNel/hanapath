#!/usr/bin/env node
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REVISION = "curated-sentence-exam-v2-cb6b-authoring";
const AUTHORED_BY = "GPT-5.6 Thinking / CB6B controlled-clause author";
const INVENTORY_FILE = join(ROOT, "docs", "generated", "sentence_exam_inventory.json");
const AUTHORING_FILE = join(ROOT, "docs", "generated", "sentence_exam_cb6_capacity_authoring.json");
const REVIEW_FILE = join(ROOT, "docs", "reviews", "sentence_exam_cb6_capacity_reviews.json");
const WITNESS_FILE = join(ROOT, "docs", "generated", "sentence_exam_cb6_capacity_witness.json");
const CONTROLLED_AUTHORING_FILE = join(ROOT, "docs", "authoring", "sentence_exam_cb6b_controlled_items.json");
const REPLACEMENTS_FILE = join(ROOT, "docs", "authoring", "sentence_exam_cb6b_replacements.json");
const WITNESS_ASSIGNMENT_FILE = join(ROOT, "docs", "authoring", "sentence_exam_cb6b_witness_assignment.json");

const SELECTED = Object.freeze(
[
  {
    "id": "s0670",
    "mode": "typed"
  },
  {
    "id": "s0897",
    "mode": "typed"
  },
  {
    "id": "s0969",
    "mode": "typed"
  },
  {
    "id": "s1028",
    "mode": "typed"
  },
  {
    "id": "s1053",
    "mode": "typed"
  },
  {
    "id": "s1630",
    "mode": "typed"
  },
  {
    "id": "s1782",
    "mode": "typed"
  },
  {
    "id": "s1938",
    "mode": "typed"
  },
  {
    "id": "s2023",
    "mode": "typed"
  },
  {
    "id": "s2045",
    "mode": "typed"
  },
  {
    "id": "s2061",
    "mode": "typed"
  },
  {
    "id": "s2063",
    "mode": "typed"
  },
  {
    "id": "s2064",
    "mode": "typed"
  },
  {
    "id": "s2069",
    "mode": "typed"
  },
  {
    "id": "s2089",
    "mode": "typed"
  },
  {
    "id": "s2154",
    "mode": "typed"
  },
  {
    "id": "s2186",
    "mode": "typed"
  },
  {
    "id": "s2188",
    "mode": "typed"
  },
  {
    "id": "s2190",
    "mode": "typed"
  },
  {
    "id": "s2206",
    "mode": "typed"
  },
  {
    "id": "s2214",
    "mode": "typed"
  },
  {
    "id": "s2228",
    "mode": "typed"
  },
  {
    "id": "s2248",
    "mode": "typed"
  },
  {
    "id": "s2253",
    "mode": "typed"
  },
  {
    "id": "s2259",
    "mode": "typed"
  },
  {
    "id": "s2264",
    "mode": "typed"
  },
  {
    "id": "s2285",
    "mode": "typed"
  },
  {
    "id": "s2327",
    "mode": "typed"
  },
  {
    "id": "s2343",
    "mode": "typed"
  },
  {
    "id": "s2372",
    "mode": "typed"
  },
  {
    "id": "s2417",
    "mode": "typed"
  },
  {
    "id": "s2621",
    "mode": "typed"
  },
  {
    "id": "s2631",
    "mode": "typed"
  },
  {
    "id": "s2672",
    "mode": "typed"
  },
  {
    "id": "s2675",
    "mode": "typed"
  },
  {
    "id": "s2697",
    "mode": "typed"
  },
  {
    "id": "s2857",
    "mode": "typed"
  },
  {
    "id": "s3006",
    "mode": "typed"
  },
  {
    "id": "s3027",
    "mode": "typed"
  },
  {
    "id": "s3082",
    "mode": "typed"
  },
  {
    "id": "s3145",
    "mode": "typed"
  },
  {
    "id": "s3157",
    "mode": "typed"
  },
  {
    "id": "s3184",
    "mode": "typed"
  },
  {
    "id": "s3188",
    "mode": "typed"
  },
  {
    "id": "s3208",
    "mode": "typed"
  },
  {
    "id": "s3214",
    "mode": "typed"
  },
  {
    "id": "s3228",
    "mode": "typed"
  },
  {
    "id": "s3240",
    "mode": "typed"
  },
  {
    "id": "s3262",
    "mode": "typed"
  },
  {
    "id": "s3290",
    "mode": "typed"
  },
  {
    "id": "s3332",
    "mode": "typed"
  },
  {
    "id": "s3362",
    "mode": "typed"
  },
  {
    "id": "s3364",
    "mode": "typed"
  },
  {
    "id": "s3372",
    "mode": "typed"
  },
  {
    "id": "s3379",
    "mode": "typed"
  },
  {
    "id": "s3384",
    "mode": "typed"
  },
  {
    "id": "s3396",
    "mode": "typed"
  },
  {
    "id": "s3406",
    "mode": "typed"
  },
  {
    "id": "s3447",
    "mode": "typed"
  },
  {
    "id": "s3525",
    "mode": "typed"
  },
  {
    "id": "s3536",
    "mode": "typed"
  },
  {
    "id": "s3667",
    "mode": "typed"
  },
  {
    "id": "s3687",
    "mode": "typed"
  },
  {
    "id": "s3714",
    "mode": "typed"
  },
  {
    "id": "s3817",
    "mode": "typed"
  },
  {
    "id": "s3950",
    "mode": "typed"
  },
  {
    "id": "s3951",
    "mode": "typed"
  },
  {
    "id": "s3973",
    "mode": "typed"
  },
  {
    "id": "s4078",
    "mode": "typed"
  },
  {
    "id": "s4164",
    "mode": "typed"
  },
  {
    "id": "s4171",
    "mode": "typed"
  },
  {
    "id": "s0495",
    "mode": "recognition"
  },
  {
    "id": "s0772",
    "mode": "recognition"
  },
  {
    "id": "s0777",
    "mode": "recognition"
  },
  {
    "id": "s0862",
    "mode": "recognition"
  },
  {
    "id": "s0982",
    "mode": "recognition"
  },
  {
    "id": "s0989",
    "mode": "recognition"
  },
  {
    "id": "s2160",
    "mode": "recognition"
  },
  {
    "id": "s2180",
    "mode": "recognition"
  },
  {
    "id": "s2209",
    "mode": "recognition"
  },
  {
    "id": "s2245",
    "mode": "recognition"
  },
  {
    "id": "s2249",
    "mode": "recognition"
  },
  {
    "id": "s2427",
    "mode": "recognition"
  },
  {
    "id": "s3334",
    "mode": "recognition"
  },
  {
    "id": "s3344",
    "mode": "recognition"
  },
  {
    "id": "s3348",
    "mode": "recognition"
  },
  {
    "id": "s3461",
    "mode": "recognition"
  },
  {
    "id": "s3545",
    "mode": "recognition"
  },
  {
    "id": "s3971",
    "mode": "recognition"
  },
  {
    "id": "s3976",
    "mode": "recognition"
  },
  {
    "id": "s3980",
    "mode": "recognition"
  },
  {
    "id": "s4023",
    "mode": "recognition"
  },
  {
    "id": "s4037",
    "mode": "recognition"
  },
  {
    "id": "s4114",
    "mode": "recognition"
  }
]
);
const WITNESS = Object.freeze({
  "sentence-exam-1": [
    [
      {
        "id": "s0037",
        "strand": "P"
      },
      {
        "id": "s0007",
        "strand": "P"
      },
      {
        "id": "s2034",
        "strand": "P"
      },
      {
        "id": "s3599",
        "strand": "P"
      },
      {
        "id": "s2702",
        "strand": "X"
      },
      {
        "id": "s0620",
        "strand": "P"
      },
      {
        "id": "s3965",
        "strand": "P"
      },
      {
        "id": "s3045",
        "strand": "P"
      },
      {
        "id": "s0358",
        "strand": "P"
      },
      {
        "id": "s0632",
        "strand": "F"
      },
      {
        "id": "s0768",
        "strand": "F"
      },
      {
        "id": "s0871",
        "strand": "F"
      },
      {
        "id": "s0883",
        "strand": "P"
      },
      {
        "id": "s2750",
        "strand": "R"
      },
      {
        "id": "s3600",
        "strand": "R"
      },
      {
        "id": "s1388",
        "strand": "C"
      },
      {
        "id": "s1396",
        "strand": "C"
      },
      {
        "id": "s2207",
        "strand": "P"
      },
      {
        "id": "s3525",
        "strand": "P"
      },
      {
        "id": "s4164",
        "strand": "X"
      },
      {
        "id": "s0907",
        "strand": "X"
      },
      {
        "id": "s2478",
        "strand": "P"
      },
      {
        "id": "s3417",
        "strand": "P"
      },
      {
        "id": "s3364",
        "strand": "P"
      }
    ],
    [
      {
        "id": "s0137",
        "strand": "P"
      },
      {
        "id": "s0343",
        "strand": "P"
      },
      {
        "id": "s2590",
        "strand": "P"
      },
      {
        "id": "s3589",
        "strand": "X"
      },
      {
        "id": "s2998",
        "strand": "P"
      },
      {
        "id": "s2271",
        "strand": "P"
      },
      {
        "id": "s0101",
        "strand": "P"
      },
      {
        "id": "s0674",
        "strand": "P"
      },
      {
        "id": "s0757",
        "strand": "P"
      },
      {
        "id": "s3627",
        "strand": "F"
      },
      {
        "id": "s0088",
        "strand": "F"
      },
      {
        "id": "s0436",
        "strand": "P"
      },
      {
        "id": "s0747",
        "strand": "P"
      },
      {
        "id": "s0792",
        "strand": "F"
      },
      {
        "id": "s0990",
        "strand": "P"
      },
      {
        "id": "s0619",
        "strand": "C"
      },
      {
        "id": "s2446",
        "strand": "R"
      },
      {
        "id": "s0810",
        "strand": "C"
      },
      {
        "id": "s1544",
        "strand": "R"
      },
      {
        "id": "s0897",
        "strand": "P"
      },
      {
        "id": "s2061",
        "strand": "P"
      },
      {
        "id": "s2064",
        "strand": "X"
      },
      {
        "id": "s2190",
        "strand": "X"
      },
      {
        "id": "s3629",
        "strand": "P"
      }
    ],
    [
      {
        "id": "s0351",
        "strand": "F"
      },
      {
        "id": "s0327",
        "strand": "P"
      },
      {
        "id": "s0012",
        "strand": "P"
      },
      {
        "id": "s3573",
        "strand": "P"
      },
      {
        "id": "s2455",
        "strand": "P"
      },
      {
        "id": "s3581",
        "strand": "X"
      },
      {
        "id": "s0215",
        "strand": "F"
      },
      {
        "id": "s0359",
        "strand": "P"
      },
      {
        "id": "s0366",
        "strand": "X"
      },
      {
        "id": "s0414",
        "strand": "P"
      },
      {
        "id": "s0446",
        "strand": "F"
      },
      {
        "id": "s0486",
        "strand": "P"
      },
      {
        "id": "s0906",
        "strand": "P"
      },
      {
        "id": "s0045",
        "strand": "P"
      },
      {
        "id": "s0353",
        "strand": "R"
      },
      {
        "id": "s1375",
        "strand": "R"
      },
      {
        "id": "s1172",
        "strand": "C"
      },
      {
        "id": "s1208",
        "strand": "C"
      },
      {
        "id": "s2269",
        "strand": "P"
      },
      {
        "id": "s0090",
        "strand": "P"
      },
      {
        "id": "s0773",
        "strand": "P"
      },
      {
        "id": "s0975",
        "strand": "X"
      },
      {
        "id": "s1437",
        "strand": "P"
      },
      {
        "id": "s2587",
        "strand": "P"
      }
    ],
    [
      {
        "id": "s0030",
        "strand": "P"
      },
      {
        "id": "s0138",
        "strand": "P"
      },
      {
        "id": "s0346",
        "strand": "X"
      },
      {
        "id": "s2047",
        "strand": "P"
      },
      {
        "id": "s0322",
        "strand": "P"
      },
      {
        "id": "s0355",
        "strand": "P"
      },
      {
        "id": "s2272",
        "strand": "P"
      },
      {
        "id": "s0092",
        "strand": "F"
      },
      {
        "id": "s0042",
        "strand": "P"
      },
      {
        "id": "s3021",
        "strand": "P"
      },
      {
        "id": "s3605",
        "strand": "P"
      },
      {
        "id": "s0104",
        "strand": "P"
      },
      {
        "id": "s0155",
        "strand": "P"
      },
      {
        "id": "s0734",
        "strand": "P"
      },
      {
        "id": "s0798",
        "strand": "F"
      },
      {
        "id": "s2607",
        "strand": "C"
      },
      {
        "id": "s1457",
        "strand": "R"
      },
      {
        "id": "s1896",
        "strand": "C"
      },
      {
        "id": "s1991",
        "strand": "R"
      },
      {
        "id": "s2621",
        "strand": "P"
      },
      {
        "id": "s2697",
        "strand": "F"
      },
      {
        "id": "s3788",
        "strand": "X"
      },
      {
        "id": "s1072",
        "strand": "P"
      },
      {
        "id": "s4171",
        "strand": "X"
      }
    ],
    [
      {
        "id": "s0026",
        "strand": "F"
      },
      {
        "id": "s0001",
        "strand": "P"
      },
      {
        "id": "s2050",
        "strand": "P"
      },
      {
        "id": "s2326",
        "strand": "P"
      },
      {
        "id": "s2373",
        "strand": "P"
      },
      {
        "id": "s0323",
        "strand": "P"
      },
      {
        "id": "s2700",
        "strand": "P"
      },
      {
        "id": "s0685",
        "strand": "P"
      },
      {
        "id": "s0413",
        "strand": "F"
      },
      {
        "id": "s0635",
        "strand": "X"
      },
      {
        "id": "s0752",
        "strand": "F"
      },
      {
        "id": "s0616",
        "strand": "C"
      },
      {
        "id": "s1533",
        "strand": "R"
      },
      {
        "id": "s1279",
        "strand": "R"
      },
      {
        "id": "s1206",
        "strand": "C"
      },
      {
        "id": "s2228",
        "strand": "P"
      },
      {
        "id": "s2247",
        "strand": "P"
      },
      {
        "id": "s3157",
        "strand": "P"
      },
      {
        "id": "s3443",
        "strand": "X"
      },
      {
        "id": "s3508",
        "strand": "P"
      },
      {
        "id": "s3532",
        "strand": "X"
      },
      {
        "id": "s4078",
        "strand": "P"
      },
      {
        "id": "s0362",
        "strand": "P"
      },
      {
        "id": "s0501",
        "strand": "P"
      }
    ]
  ],
  "sentence-exam-2": [
    [
      {
        "id": "s0026",
        "strand": "P"
      },
      {
        "id": "s0037",
        "strand": "P"
      },
      {
        "id": "s0343",
        "strand": "P"
      },
      {
        "id": "s3589",
        "strand": "P"
      },
      {
        "id": "s2373",
        "strand": "F"
      },
      {
        "id": "s0101",
        "strand": "P"
      },
      {
        "id": "s0486",
        "strand": "P"
      },
      {
        "id": "s0747",
        "strand": "P"
      },
      {
        "id": "s0906",
        "strand": "P"
      },
      {
        "id": "s0045",
        "strand": "P"
      },
      {
        "id": "s0280",
        "strand": "P"
      },
      {
        "id": "s0526",
        "strand": "P"
      },
      {
        "id": "s1276",
        "strand": "C"
      },
      {
        "id": "s1270",
        "strand": "R"
      },
      {
        "id": "s2542",
        "strand": "X"
      },
      {
        "id": "s2621",
        "strand": "P"
      },
      {
        "id": "s3372",
        "strand": "F"
      },
      {
        "id": "s3508",
        "strand": "F"
      },
      {
        "id": "s4114",
        "strand": "R"
      },
      {
        "id": "s4164",
        "strand": "P"
      },
      {
        "id": "s0907",
        "strand": "X"
      },
      {
        "id": "s1437",
        "strand": "P"
      },
      {
        "id": "s3461",
        "strand": "C"
      },
      {
        "id": "s3866",
        "strand": "X"
      }
    ],
    [
      {
        "id": "s0138",
        "strand": "P"
      },
      {
        "id": "s0322",
        "strand": "P"
      },
      {
        "id": "s2590",
        "strand": "P"
      },
      {
        "id": "s3605",
        "strand": "P"
      },
      {
        "id": "s3965",
        "strand": "P"
      },
      {
        "id": "s0413",
        "strand": "P"
      },
      {
        "id": "s0414",
        "strand": "X"
      },
      {
        "id": "s0871",
        "strand": "P"
      },
      {
        "id": "s0990",
        "strand": "P"
      },
      {
        "id": "s2200",
        "strand": "P"
      },
      {
        "id": "s2466",
        "strand": "F"
      },
      {
        "id": "s0256",
        "strand": "P"
      },
      {
        "id": "s1976",
        "strand": "R"
      },
      {
        "id": "s1577",
        "strand": "C"
      },
      {
        "id": "s0897",
        "strand": "X"
      },
      {
        "id": "s2207",
        "strand": "P"
      },
      {
        "id": "s2260",
        "strand": "P"
      },
      {
        "id": "s2417",
        "strand": "F"
      },
      {
        "id": "s3208",
        "strand": "P"
      },
      {
        "id": "s3525",
        "strand": "P"
      },
      {
        "id": "s0495",
        "strand": "R"
      },
      {
        "id": "s3406",
        "strand": "F"
      },
      {
        "id": "s4171",
        "strand": "X"
      },
      {
        "id": "s3976",
        "strand": "C"
      }
    ],
    [
      {
        "id": "s0012",
        "strand": "P"
      },
      {
        "id": "s2455",
        "strand": "P"
      },
      {
        "id": "s2998",
        "strand": "F"
      },
      {
        "id": "s0323",
        "strand": "P"
      },
      {
        "id": "s2271",
        "strand": "P"
      },
      {
        "id": "s0446",
        "strand": "P"
      },
      {
        "id": "s0752",
        "strand": "X"
      },
      {
        "id": "s0883",
        "strand": "P"
      },
      {
        "id": "s2080",
        "strand": "P"
      },
      {
        "id": "s0219",
        "strand": "P"
      },
      {
        "id": "s2011",
        "strand": "F"
      },
      {
        "id": "s0515",
        "strand": "X"
      },
      {
        "id": "s3999",
        "strand": "F"
      },
      {
        "id": "s0353",
        "strand": "R"
      },
      {
        "id": "s2194",
        "strand": "C"
      },
      {
        "id": "s2228",
        "strand": "P"
      },
      {
        "id": "s2269",
        "strand": "P"
      },
      {
        "id": "s3332",
        "strand": "P"
      },
      {
        "id": "s3687",
        "strand": "P"
      },
      {
        "id": "s0975",
        "strand": "P"
      },
      {
        "id": "s1072",
        "strand": "P"
      },
      {
        "id": "s2478",
        "strand": "X"
      },
      {
        "id": "s0989",
        "strand": "R"
      },
      {
        "id": "s3348",
        "strand": "C"
      }
    ],
    [
      {
        "id": "s2047",
        "strand": "P"
      },
      {
        "id": "s0355",
        "strand": "F"
      },
      {
        "id": "s2326",
        "strand": "P"
      },
      {
        "id": "s0757",
        "strand": "P"
      },
      {
        "id": "s0358",
        "strand": "P"
      },
      {
        "id": "s0235",
        "strand": "P"
      },
      {
        "id": "s0284",
        "strand": "X"
      },
      {
        "id": "s0901",
        "strand": "P"
      },
      {
        "id": "s0262",
        "strand": "P"
      },
      {
        "id": "s2689",
        "strand": "P"
      },
      {
        "id": "s2098",
        "strand": "X"
      },
      {
        "id": "s2437",
        "strand": "X"
      },
      {
        "id": "s2319",
        "strand": "P"
      },
      {
        "id": "s1105",
        "strand": "C"
      },
      {
        "id": "s0810",
        "strand": "C"
      },
      {
        "id": "s0830",
        "strand": "R"
      },
      {
        "id": "s1544",
        "strand": "R"
      },
      {
        "id": "s2188",
        "strand": "P"
      },
      {
        "id": "s2206",
        "strand": "P"
      },
      {
        "id": "s2264",
        "strand": "P"
      },
      {
        "id": "s3075",
        "strand": "F"
      },
      {
        "id": "s3744",
        "strand": "P"
      },
      {
        "id": "s3973",
        "strand": "F"
      },
      {
        "id": "s3185",
        "strand": "P"
      }
    ],
    [
      {
        "id": "s0030",
        "strand": "P"
      },
      {
        "id": "s2702",
        "strand": "F"
      },
      {
        "id": "s0092",
        "strand": "X"
      },
      {
        "id": "s3627",
        "strand": "P"
      },
      {
        "id": "s0104",
        "strand": "P"
      },
      {
        "id": "s0359",
        "strand": "P"
      },
      {
        "id": "s0635",
        "strand": "P"
      },
      {
        "id": "s0415",
        "strand": "P"
      },
      {
        "id": "s0100",
        "strand": "P"
      },
      {
        "id": "s0406",
        "strand": "P"
      },
      {
        "id": "s1894",
        "strand": "R"
      },
      {
        "id": "s1208",
        "strand": "R"
      },
      {
        "id": "s2190",
        "strand": "X"
      },
      {
        "id": "s2372",
        "strand": "P"
      },
      {
        "id": "s2459",
        "strand": "F"
      },
      {
        "id": "s3214",
        "strand": "P"
      },
      {
        "id": "s3443",
        "strand": "X"
      },
      {
        "id": "s3951",
        "strand": "P"
      },
      {
        "id": "s4078",
        "strand": "P"
      },
      {
        "id": "s0090",
        "strand": "F"
      },
      {
        "id": "s0362",
        "strand": "P"
      },
      {
        "id": "s2160",
        "strand": "C"
      },
      {
        "id": "s3364",
        "strand": "P"
      },
      {
        "id": "s2427",
        "strand": "C"
      }
    ]
  ],
  "sentence-exam-3": [
    [
      {
        "id": "s3599",
        "strand": "P"
      },
      {
        "id": "s0391",
        "strand": "F"
      },
      {
        "id": "s0280",
        "strand": "P"
      },
      {
        "id": "s0628",
        "strand": "F"
      },
      {
        "id": "s2224",
        "strand": "P"
      },
      {
        "id": "s0553",
        "strand": "P"
      },
      {
        "id": "s0275",
        "strand": "X"
      },
      {
        "id": "s0731",
        "strand": "P"
      },
      {
        "id": "s2010",
        "strand": "P"
      },
      {
        "id": "s0171",
        "strand": "P"
      },
      {
        "id": "s3725",
        "strand": "P"
      },
      {
        "id": "s2458",
        "strand": "R"
      },
      {
        "id": "s1639",
        "strand": "C"
      },
      {
        "id": "s2207",
        "strand": "F"
      },
      {
        "id": "s2264",
        "strand": "P"
      },
      {
        "id": "s2417",
        "strand": "X"
      },
      {
        "id": "s2697",
        "strand": "P"
      },
      {
        "id": "s3157",
        "strand": "P"
      },
      {
        "id": "s3372",
        "strand": "P"
      },
      {
        "id": "s4078",
        "strand": "X"
      },
      {
        "id": "s3461",
        "strand": "C"
      },
      {
        "id": "s3406",
        "strand": "P"
      },
      {
        "id": "s4023",
        "strand": "R"
      },
      {
        "id": "s3228",
        "strand": "P"
      }
    ],
    [
      {
        "id": "s0355",
        "strand": "P"
      },
      {
        "id": "s2702",
        "strand": "F"
      },
      {
        "id": "s0155",
        "strand": "P"
      },
      {
        "id": "s2416",
        "strand": "P"
      },
      {
        "id": "s0060",
        "strand": "P"
      },
      {
        "id": "s2098",
        "strand": "P"
      },
      {
        "id": "s0498",
        "strand": "X"
      },
      {
        "id": "s0240",
        "strand": "F"
      },
      {
        "id": "s0462",
        "strand": "X"
      },
      {
        "id": "s0843",
        "strand": "P"
      },
      {
        "id": "s2046",
        "strand": "R"
      },
      {
        "id": "s1892",
        "strand": "C"
      },
      {
        "id": "s1308",
        "strand": "R"
      },
      {
        "id": "s0897",
        "strand": "P"
      },
      {
        "id": "s2188",
        "strand": "P"
      },
      {
        "id": "s2190",
        "strand": "P"
      },
      {
        "id": "s2269",
        "strand": "F"
      },
      {
        "id": "s2605",
        "strand": "P"
      },
      {
        "id": "s3075",
        "strand": "P"
      },
      {
        "id": "s3208",
        "strand": "X"
      },
      {
        "id": "s4164",
        "strand": "P"
      },
      {
        "id": "s2180",
        "strand": "C"
      },
      {
        "id": "s3364",
        "strand": "P"
      },
      {
        "id": "s3243",
        "strand": "P"
      }
    ],
    [
      {
        "id": "s0138",
        "strand": "P"
      },
      {
        "id": "s0351",
        "strand": "P"
      },
      {
        "id": "s2050",
        "strand": "P"
      },
      {
        "id": "s0092",
        "strand": "P"
      },
      {
        "id": "s2131",
        "strand": "X"
      },
      {
        "id": "s2200",
        "strand": "F"
      },
      {
        "id": "s2097",
        "strand": "P"
      },
      {
        "id": "s0570",
        "strand": "P"
      },
      {
        "id": "s0737",
        "strand": "P"
      },
      {
        "id": "s4071",
        "strand": "P"
      },
      {
        "id": "s2215",
        "strand": "C"
      },
      {
        "id": "s1790",
        "strand": "R"
      },
      {
        "id": "s0743",
        "strand": "R"
      },
      {
        "id": "s3214",
        "strand": "X"
      },
      {
        "id": "s3323",
        "strand": "F"
      },
      {
        "id": "s3553",
        "strand": "P"
      },
      {
        "id": "s3714",
        "strand": "X"
      },
      {
        "id": "s3744",
        "strand": "F"
      },
      {
        "id": "s3951",
        "strand": "P"
      },
      {
        "id": "s3973",
        "strand": "P"
      },
      {
        "id": "s0773",
        "strand": "P"
      },
      {
        "id": "s1437",
        "strand": "P"
      },
      {
        "id": "s4037",
        "strand": "C"
      },
      {
        "id": "s3185",
        "strand": "P"
      }
    ],
    [
      {
        "id": "s2271",
        "strand": "P"
      },
      {
        "id": "s0235",
        "strand": "F"
      },
      {
        "id": "s0113",
        "strand": "P"
      },
      {
        "id": "s0808",
        "strand": "X"
      },
      {
        "id": "s0100",
        "strand": "P"
      },
      {
        "id": "s0515",
        "strand": "P"
      },
      {
        "id": "s0300",
        "strand": "X"
      },
      {
        "id": "s0514",
        "strand": "F"
      },
      {
        "id": "s2499",
        "strand": "P"
      },
      {
        "id": "s2753",
        "strand": "P"
      },
      {
        "id": "s0583",
        "strand": "P"
      },
      {
        "id": "s2112",
        "strand": "P"
      },
      {
        "id": "s1276",
        "strand": "R"
      },
      {
        "id": "s0187",
        "strand": "C"
      },
      {
        "id": "s2064",
        "strand": "P"
      },
      {
        "id": "s2252",
        "strand": "P"
      },
      {
        "id": "s2260",
        "strand": "P"
      },
      {
        "id": "s3332",
        "strand": "F"
      },
      {
        "id": "s3345",
        "strand": "P"
      },
      {
        "id": "s3525",
        "strand": "P"
      },
      {
        "id": "s3687",
        "strand": "X"
      },
      {
        "id": "s3971",
        "strand": "R"
      },
      {
        "id": "s3348",
        "strand": "C"
      },
      {
        "id": "s3866",
        "strand": "P"
      }
    ],
    [
      {
        "id": "s0012",
        "strand": "P"
      },
      {
        "id": "s0674",
        "strand": "P"
      },
      {
        "id": "s0682",
        "strand": "P"
      },
      {
        "id": "s0901",
        "strand": "X"
      },
      {
        "id": "s2401",
        "strand": "P"
      },
      {
        "id": "s0542",
        "strand": "P"
      },
      {
        "id": "s0054",
        "strand": "F"
      },
      {
        "id": "s2568",
        "strand": "P"
      },
      {
        "id": "s4017",
        "strand": "P"
      },
      {
        "id": "s0474",
        "strand": "P"
      },
      {
        "id": "s3030",
        "strand": "P"
      },
      {
        "id": "s3598",
        "strand": "C"
      },
      {
        "id": "s1727",
        "strand": "C"
      },
      {
        "id": "s1157",
        "strand": "R"
      },
      {
        "id": "s2206",
        "strand": "P"
      },
      {
        "id": "s2228",
        "strand": "F"
      },
      {
        "id": "s2372",
        "strand": "X"
      },
      {
        "id": "s2542",
        "strand": "X"
      },
      {
        "id": "s2621",
        "strand": "P"
      },
      {
        "id": "s3443",
        "strand": "P"
      },
      {
        "id": "s2253",
        "strand": "F"
      },
      {
        "id": "s3334",
        "strand": "R"
      },
      {
        "id": "s4171",
        "strand": "P"
      },
      {
        "id": "s3082",
        "strand": "P"
      }
    ]
  ],
  "sentence-exam-4": [
    [
      {
        "id": "s0042",
        "strand": "P"
      },
      {
        "id": "s2224",
        "strand": "P"
      },
      {
        "id": "s2200",
        "strand": "P"
      },
      {
        "id": "s0514",
        "strand": "X"
      },
      {
        "id": "s2499",
        "strand": "P"
      },
      {
        "id": "s3908",
        "strand": "P"
      },
      {
        "id": "s0309",
        "strand": "X"
      },
      {
        "id": "s0371",
        "strand": "F"
      },
      {
        "id": "s4061",
        "strand": "P"
      },
      {
        "id": "s3034",
        "strand": "P"
      },
      {
        "id": "s1063",
        "strand": "C"
      },
      {
        "id": "s2206",
        "strand": "P"
      },
      {
        "id": "s2228",
        "strand": "F"
      },
      {
        "id": "s2621",
        "strand": "P"
      },
      {
        "id": "s2697",
        "strand": "X"
      },
      {
        "id": "s3208",
        "strand": "P"
      },
      {
        "id": "s3345",
        "strand": "P"
      },
      {
        "id": "s3443",
        "strand": "F"
      },
      {
        "id": "s3508",
        "strand": "P"
      },
      {
        "id": "s0777",
        "strand": "R"
      },
      {
        "id": "s0989",
        "strand": "R"
      },
      {
        "id": "s3406",
        "strand": "P"
      },
      {
        "id": "s0982",
        "strand": "C"
      },
      {
        "id": "s3362",
        "strand": "P"
      }
    ],
    [
      {
        "id": "s3589",
        "strand": "P"
      },
      {
        "id": "s2131",
        "strand": "F"
      },
      {
        "id": "s2483",
        "strand": "X"
      },
      {
        "id": "s0808",
        "strand": "P"
      },
      {
        "id": "s0709",
        "strand": "F"
      },
      {
        "id": "s3058",
        "strand": "P"
      },
      {
        "id": "s0712",
        "strand": "P"
      },
      {
        "id": "s0056",
        "strand": "P"
      },
      {
        "id": "s0609",
        "strand": "P"
      },
      {
        "id": "s3191",
        "strand": "F"
      },
      {
        "id": "s0905",
        "strand": "R"
      },
      {
        "id": "s1838",
        "strand": "R"
      },
      {
        "id": "s2190",
        "strand": "P"
      },
      {
        "id": "s2264",
        "strand": "P"
      },
      {
        "id": "s2372",
        "strand": "P"
      },
      {
        "id": "s2417",
        "strand": "X"
      },
      {
        "id": "s2542",
        "strand": "P"
      },
      {
        "id": "s3075",
        "strand": "P"
      },
      {
        "id": "s3372",
        "strand": "P"
      },
      {
        "id": "s3396",
        "strand": "X"
      },
      {
        "id": "s3687",
        "strand": "P"
      },
      {
        "id": "s1437",
        "strand": "P"
      },
      {
        "id": "s4023",
        "strand": "C"
      },
      {
        "id": "s4037",
        "strand": "C"
      }
    ],
    [
      {
        "id": "s2050",
        "strand": "F"
      },
      {
        "id": "s2702",
        "strand": "P"
      },
      {
        "id": "s0280",
        "strand": "F"
      },
      {
        "id": "s0931",
        "strand": "P"
      },
      {
        "id": "s4017",
        "strand": "P"
      },
      {
        "id": "s3030",
        "strand": "P"
      },
      {
        "id": "s0732",
        "strand": "P"
      },
      {
        "id": "s0873",
        "strand": "P"
      },
      {
        "id": "s1011",
        "strand": "P"
      },
      {
        "id": "s0471",
        "strand": "P"
      },
      {
        "id": "s0353",
        "strand": "R"
      },
      {
        "id": "s3598",
        "strand": "C"
      },
      {
        "id": "s1276",
        "strand": "C"
      },
      {
        "id": "s2269",
        "strand": "X"
      },
      {
        "id": "s3332",
        "strand": "P"
      },
      {
        "id": "s3387",
        "strand": "F"
      },
      {
        "id": "s3553",
        "strand": "X"
      },
      {
        "id": "s3564",
        "strand": "P"
      },
      {
        "id": "s3714",
        "strand": "P"
      },
      {
        "id": "s3667",
        "strand": "P"
      },
      {
        "id": "s3866",
        "strand": "P"
      },
      {
        "id": "s0862",
        "strand": "R"
      },
      {
        "id": "s3082",
        "strand": "X"
      },
      {
        "id": "s3228",
        "strand": "P"
      }
    ],
    [
      {
        "id": "s3599",
        "strand": "X"
      },
      {
        "id": "s2271",
        "strand": "X"
      },
      {
        "id": "s0685",
        "strand": "P"
      },
      {
        "id": "s0923",
        "strand": "F"
      },
      {
        "id": "s0553",
        "strand": "P"
      },
      {
        "id": "s2112",
        "strand": "P"
      },
      {
        "id": "s1709",
        "strand": "P"
      },
      {
        "id": "s2314",
        "strand": "F"
      },
      {
        "id": "s2337",
        "strand": "P"
      },
      {
        "id": "s0849",
        "strand": "P"
      },
      {
        "id": "s2244",
        "strand": "R"
      },
      {
        "id": "s0830",
        "strand": "C"
      },
      {
        "id": "s1401",
        "strand": "R"
      },
      {
        "id": "s0897",
        "strand": "P"
      },
      {
        "id": "s2207",
        "strand": "P"
      },
      {
        "id": "s3157",
        "strand": "P"
      },
      {
        "id": "s3323",
        "strand": "F"
      },
      {
        "id": "s3398",
        "strand": "P"
      },
      {
        "id": "s3525",
        "strand": "P"
      },
      {
        "id": "s3744",
        "strand": "P"
      },
      {
        "id": "s3973",
        "strand": "P"
      },
      {
        "id": "s3364",
        "strand": "P"
      },
      {
        "id": "s3344",
        "strand": "C"
      },
      {
        "id": "s3327",
        "strand": "X"
      }
    ],
    [
      {
        "id": "s0012",
        "strand": "P"
      },
      {
        "id": "s0235",
        "strand": "P"
      },
      {
        "id": "s0901",
        "strand": "P"
      },
      {
        "id": "s0060",
        "strand": "P"
      },
      {
        "id": "s0300",
        "strand": "F"
      },
      {
        "id": "s0970",
        "strand": "P"
      },
      {
        "id": "s0312",
        "strand": "F"
      },
      {
        "id": "s0934",
        "strand": "P"
      },
      {
        "id": "s0957",
        "strand": "X"
      },
      {
        "id": "s2099",
        "strand": "P"
      },
      {
        "id": "s2377",
        "strand": "P"
      },
      {
        "id": "s1199",
        "strand": "R"
      },
      {
        "id": "s1845",
        "strand": "C"
      },
      {
        "id": "s1930",
        "strand": "R"
      },
      {
        "id": "s2188",
        "strand": "P"
      },
      {
        "id": "s2260",
        "strand": "X"
      },
      {
        "id": "s2605",
        "strand": "P"
      },
      {
        "id": "s3214",
        "strand": "P"
      },
      {
        "id": "s3951",
        "strand": "X"
      },
      {
        "id": "s4078",
        "strand": "P"
      },
      {
        "id": "s3461",
        "strand": "C"
      },
      {
        "id": "s3243",
        "strand": "P"
      },
      {
        "id": "s4171",
        "strand": "F"
      },
      {
        "id": "s3185",
        "strand": "P"
      }
    ]
  ],
  "sentence-exam-5": [
    [
      {
        "id": "s0351",
        "strand": "X"
      },
      {
        "id": "s2047",
        "strand": "P"
      },
      {
        "id": "s3599",
        "strand": "P"
      },
      {
        "id": "s2271",
        "strand": "P"
      },
      {
        "id": "s3021",
        "strand": "P"
      },
      {
        "id": "s0088",
        "strand": "X"
      },
      {
        "id": "s0446",
        "strand": "P"
      },
      {
        "id": "s0752",
        "strand": "P"
      },
      {
        "id": "s0871",
        "strand": "P"
      },
      {
        "id": "s0235",
        "strand": "F"
      },
      {
        "id": "s2131",
        "strand": "P"
      },
      {
        "id": "s2689",
        "strand": "X"
      },
      {
        "id": "s0666",
        "strand": "P"
      },
      {
        "id": "s0514",
        "strand": "P"
      },
      {
        "id": "s0553",
        "strand": "P"
      },
      {
        "id": "s0211",
        "strand": "F"
      },
      {
        "id": "s0575",
        "strand": "F"
      },
      {
        "id": "s0827",
        "strand": "F"
      },
      {
        "id": "s0075",
        "strand": "P"
      },
      {
        "id": "s3848",
        "strand": "P"
      },
      {
        "id": "s4071",
        "strand": "F"
      },
      {
        "id": "s0165",
        "strand": "P"
      },
      {
        "id": "s0481",
        "strand": "P"
      },
      {
        "id": "s0130",
        "strand": "P"
      },
      {
        "id": "s3474",
        "strand": "P"
      },
      {
        "id": "s2377",
        "strand": "P"
      },
      {
        "id": "s3615",
        "strand": "P"
      },
      {
        "id": "s2458",
        "strand": "C"
      },
      {
        "id": "s1619",
        "strand": "C"
      },
      {
        "id": "s1888",
        "strand": "R"
      },
      {
        "id": "s1338",
        "strand": "R"
      },
      {
        "id": "s1295",
        "strand": "C"
      },
      {
        "id": "s2067",
        "strand": "R"
      },
      {
        "id": "s2247",
        "strand": "P"
      },
      {
        "id": "s2605",
        "strand": "X"
      },
      {
        "id": "s3208",
        "strand": "P"
      },
      {
        "id": "s3332",
        "strand": "P"
      },
      {
        "id": "s3387",
        "strand": "P"
      },
      {
        "id": "s3443",
        "strand": "P"
      },
      {
        "id": "s3525",
        "strand": "F"
      },
      {
        "id": "s3971",
        "strand": "C"
      },
      {
        "id": "s0362",
        "strand": "P"
      },
      {
        "id": "s0501",
        "strand": "P"
      },
      {
        "id": "s2478",
        "strand": "P"
      },
      {
        "id": "s3334",
        "strand": "C"
      },
      {
        "id": "s3348",
        "strand": "R"
      },
      {
        "id": "s3866",
        "strand": "P"
      },
      {
        "id": "s2427",
        "strand": "R"
      },
      {
        "id": "s3327",
        "strand": "P"
      },
      {
        "id": "s3362",
        "strand": "P"
      }
    ],
    [
      {
        "id": "s0327",
        "strand": "P"
      },
      {
        "id": "s2034",
        "strand": "P"
      },
      {
        "id": "s0335",
        "strand": "P"
      },
      {
        "id": "s2373",
        "strand": "P"
      },
      {
        "id": "s3605",
        "strand": "P"
      },
      {
        "id": "s0635",
        "strand": "P"
      },
      {
        "id": "s0768",
        "strand": "P"
      },
      {
        "id": "s2080",
        "strand": "P"
      },
      {
        "id": "s0538",
        "strand": "F"
      },
      {
        "id": "s0901",
        "strand": "P"
      },
      {
        "id": "s2466",
        "strand": "P"
      },
      {
        "id": "s0407",
        "strand": "P"
      },
      {
        "id": "s3512",
        "strand": "P"
      },
      {
        "id": "s3555",
        "strand": "P"
      },
      {
        "id": "s0300",
        "strand": "P"
      },
      {
        "id": "s0252",
        "strand": "P"
      },
      {
        "id": "s0279",
        "strand": "P"
      },
      {
        "id": "s0559",
        "strand": "P"
      },
      {
        "id": "s0723",
        "strand": "P"
      },
      {
        "id": "s0843",
        "strand": "P"
      },
      {
        "id": "s0947",
        "strand": "P"
      },
      {
        "id": "s3030",
        "strand": "P"
      },
      {
        "id": "s3725",
        "strand": "P"
      },
      {
        "id": "s3782",
        "strand": "P"
      },
      {
        "id": "s0709",
        "strand": "F"
      },
      {
        "id": "s0910",
        "strand": "F"
      },
      {
        "id": "s2099",
        "strand": "X"
      },
      {
        "id": "s0593",
        "strand": "F"
      },
      {
        "id": "s0070",
        "strand": "X"
      },
      {
        "id": "s3191",
        "strand": "F"
      },
      {
        "id": "s2211",
        "strand": "R"
      },
      {
        "id": "s2244",
        "strand": "R"
      },
      {
        "id": "s1276",
        "strand": "C"
      },
      {
        "id": "s1777",
        "strand": "R"
      },
      {
        "id": "s1749",
        "strand": "C"
      },
      {
        "id": "s1063",
        "strand": "C"
      },
      {
        "id": "s1930",
        "strand": "C"
      },
      {
        "id": "s2207",
        "strand": "X"
      },
      {
        "id": "s2209",
        "strand": "C"
      },
      {
        "id": "s2264",
        "strand": "X"
      },
      {
        "id": "s2417",
        "strand": "P"
      },
      {
        "id": "s2459",
        "strand": "P"
      },
      {
        "id": "s3157",
        "strand": "P"
      },
      {
        "id": "s3508",
        "strand": "P"
      },
      {
        "id": "s3744",
        "strand": "P"
      },
      {
        "id": "s3980",
        "strand": "R"
      },
      {
        "id": "s4114",
        "strand": "R"
      },
      {
        "id": "s2253",
        "strand": "P"
      },
      {
        "id": "s3243",
        "strand": "P"
      },
      {
        "id": "s3185",
        "strand": "F"
      }
    ],
    [
      {
        "id": "s0343",
        "strand": "P"
      },
      {
        "id": "s0012",
        "strand": "P"
      },
      {
        "id": "s2050",
        "strand": "P"
      },
      {
        "id": "s2590",
        "strand": "F"
      },
      {
        "id": "s0101",
        "strand": "F"
      },
      {
        "id": "s0685",
        "strand": "P"
      },
      {
        "id": "s0391",
        "strand": "X"
      },
      {
        "id": "s0103",
        "strand": "P"
      },
      {
        "id": "s0280",
        "strand": "P"
      },
      {
        "id": "s0799",
        "strand": "P"
      },
      {
        "id": "s2200",
        "strand": "P"
      },
      {
        "id": "s2401",
        "strand": "F"
      },
      {
        "id": "s2098",
        "strand": "P"
      },
      {
        "id": "s3999",
        "strand": "P"
      },
      {
        "id": "s0654",
        "strand": "P"
      },
      {
        "id": "s0474",
        "strand": "F"
      },
      {
        "id": "s0638",
        "strand": "P"
      },
      {
        "id": "s2112",
        "strand": "P"
      },
      {
        "id": "s2484",
        "strand": "P"
      },
      {
        "id": "s0716",
        "strand": "P"
      },
      {
        "id": "s0157",
        "strand": "P"
      },
      {
        "id": "s1709",
        "strand": "P"
      },
      {
        "id": "s3058",
        "strand": "F"
      },
      {
        "id": "s0056",
        "strand": "P"
      },
      {
        "id": "s1011",
        "strand": "P"
      },
      {
        "id": "s0385",
        "strand": "P"
      },
      {
        "id": "s3059",
        "strand": "P"
      },
      {
        "id": "s0345",
        "strand": "R"
      },
      {
        "id": "s1356",
        "strand": "C"
      },
      {
        "id": "s1910",
        "strand": "C"
      },
      {
        "id": "s1940",
        "strand": "R"
      },
      {
        "id": "s1530",
        "strand": "C"
      },
      {
        "id": "s1582",
        "strand": "R"
      },
      {
        "id": "s0905",
        "strand": "R"
      },
      {
        "id": "s1490",
        "strand": "C"
      },
      {
        "id": "s1297",
        "strand": "C"
      },
      {
        "id": "s2064",
        "strand": "X"
      },
      {
        "id": "s2070",
        "strand": "X"
      },
      {
        "id": "s2188",
        "strand": "X"
      },
      {
        "id": "s2372",
        "strand": "P"
      },
      {
        "id": "s2542",
        "strand": "P"
      },
      {
        "id": "s3214",
        "strand": "F"
      },
      {
        "id": "s3323",
        "strand": "P"
      },
      {
        "id": "s3345",
        "strand": "P"
      },
      {
        "id": "s3553",
        "strand": "P"
      },
      {
        "id": "s3788",
        "strand": "P"
      },
      {
        "id": "s3951",
        "strand": "P"
      },
      {
        "id": "s3973",
        "strand": "P"
      },
      {
        "id": "s0907",
        "strand": "P"
      },
      {
        "id": "s4037",
        "strand": "R"
      }
    ],
    [
      {
        "id": "s0355",
        "strand": "F"
      },
      {
        "id": "s2998",
        "strand": "P"
      },
      {
        "id": "s0215",
        "strand": "P"
      },
      {
        "id": "s3627",
        "strand": "F"
      },
      {
        "id": "s0436",
        "strand": "P"
      },
      {
        "id": "s3963",
        "strand": "P"
      },
      {
        "id": "s0682",
        "strand": "P"
      },
      {
        "id": "s0931",
        "strand": "P"
      },
      {
        "id": "s2223",
        "strand": "X"
      },
      {
        "id": "s0219",
        "strand": "P"
      },
      {
        "id": "s3425",
        "strand": "P"
      },
      {
        "id": "s2437",
        "strand": "P"
      },
      {
        "id": "s3904",
        "strand": "P"
      },
      {
        "id": "s0563",
        "strand": "P"
      },
      {
        "id": "s0737",
        "strand": "P"
      },
      {
        "id": "s3542",
        "strand": "F"
      },
      {
        "id": "s3671",
        "strand": "F"
      },
      {
        "id": "s2753",
        "strand": "P"
      },
      {
        "id": "s0079",
        "strand": "X"
      },
      {
        "id": "s2393",
        "strand": "P"
      },
      {
        "id": "s3724",
        "strand": "P"
      },
      {
        "id": "s3739",
        "strand": "P"
      },
      {
        "id": "s0732",
        "strand": "P"
      },
      {
        "id": "s3908",
        "strand": "P"
      },
      {
        "id": "s0609",
        "strand": "F"
      },
      {
        "id": "s4061",
        "strand": "P"
      },
      {
        "id": "s1046",
        "strand": "P"
      },
      {
        "id": "s2056",
        "strand": "C"
      },
      {
        "id": "s0353",
        "strand": "C"
      },
      {
        "id": "s1952",
        "strand": "R"
      },
      {
        "id": "s1975",
        "strand": "R"
      },
      {
        "id": "s1731",
        "strand": "C"
      },
      {
        "id": "s1407",
        "strand": "C"
      },
      {
        "id": "s1359",
        "strand": "R"
      },
      {
        "id": "s2061",
        "strand": "F"
      },
      {
        "id": "s2190",
        "strand": "P"
      },
      {
        "id": "s2228",
        "strand": "P"
      },
      {
        "id": "s2249",
        "strand": "C"
      },
      {
        "id": "s2252",
        "strand": "P"
      },
      {
        "id": "s2269",
        "strand": "X"
      },
      {
        "id": "s3075",
        "strand": "P"
      },
      {
        "id": "s3398",
        "strand": "P"
      },
      {
        "id": "s3545",
        "strand": "R"
      },
      {
        "id": "s3687",
        "strand": "P"
      },
      {
        "id": "s3714",
        "strand": "P"
      },
      {
        "id": "s4078",
        "strand": "X"
      },
      {
        "id": "s4164",
        "strand": "P"
      },
      {
        "id": "s3667",
        "strand": "P"
      },
      {
        "id": "s3344",
        "strand": "R"
      },
      {
        "id": "s4171",
        "strand": "P"
      }
    ],
    [
      {
        "id": "s0137",
        "strand": "P"
      },
      {
        "id": "s2272",
        "strand": "X"
      },
      {
        "id": "s3589",
        "strand": "P"
      },
      {
        "id": "s2702",
        "strand": "P"
      },
      {
        "id": "s2647",
        "strand": "P"
      },
      {
        "id": "s0284",
        "strand": "P"
      },
      {
        "id": "s2488",
        "strand": "F"
      },
      {
        "id": "s3117",
        "strand": "F"
      },
      {
        "id": "s2483",
        "strand": "P"
      },
      {
        "id": "s0060",
        "strand": "P"
      },
      {
        "id": "s2097",
        "strand": "P"
      },
      {
        "id": "s0418",
        "strand": "P"
      },
      {
        "id": "s0542",
        "strand": "P"
      },
      {
        "id": "s0399",
        "strand": "P"
      },
      {
        "id": "s0731",
        "strand": "P"
      },
      {
        "id": "s0240",
        "strand": "P"
      },
      {
        "id": "s0570",
        "strand": "P"
      },
      {
        "id": "s2499",
        "strand": "P"
      },
      {
        "id": "s4151",
        "strand": "P"
      },
      {
        "id": "s0568",
        "strand": "P"
      },
      {
        "id": "s2691",
        "strand": "P"
      },
      {
        "id": "s0973",
        "strand": "P"
      },
      {
        "id": "s3787",
        "strand": "P"
      },
      {
        "id": "s0934",
        "strand": "P"
      },
      {
        "id": "s1050",
        "strand": "P"
      },
      {
        "id": "s0040",
        "strand": "P"
      },
      {
        "id": "s3500",
        "strand": "P"
      },
      {
        "id": "s0471",
        "strand": "F"
      },
      {
        "id": "s2046",
        "strand": "C"
      },
      {
        "id": "s1943",
        "strand": "R"
      },
      {
        "id": "s1562",
        "strand": "C"
      },
      {
        "id": "s1577",
        "strand": "R"
      },
      {
        "id": "s1487",
        "strand": "R"
      },
      {
        "id": "s1199",
        "strand": "C"
      },
      {
        "id": "s1304",
        "strand": "C"
      },
      {
        "id": "s0897",
        "strand": "P"
      },
      {
        "id": "s2206",
        "strand": "X"
      },
      {
        "id": "s2245",
        "strand": "C"
      },
      {
        "id": "s2621",
        "strand": "X"
      },
      {
        "id": "s2697",
        "strand": "F"
      },
      {
        "id": "s2857",
        "strand": "P"
      },
      {
        "id": "s3372",
        "strand": "X"
      },
      {
        "id": "s3396",
        "strand": "F"
      },
      {
        "id": "s3532",
        "strand": "P"
      },
      {
        "id": "s3564",
        "strand": "P"
      },
      {
        "id": "s3417",
        "strand": "P"
      },
      {
        "id": "s3406",
        "strand": "P"
      },
      {
        "id": "s4023",
        "strand": "R"
      },
      {
        "id": "s0862",
        "strand": "R"
      },
      {
        "id": "s3082",
        "strand": "F"
      }
    ]
  ]
});
const FINAL_TAG_FLOORS = Object.freeze({
  "object-eul-reul": 4,
  "present-polite": 4,
  "subject-i-ga": 4,
  "past-polite": 5,
  "topic-neun": 4,
  "time-expression": 3,
  "location-e": 3,
  "location-eseo": 3,
  "possessive-ui": 2,
  "because-aseo": 2,
  "imperative-seyo": 2,
  "copula-ieyo": 2,
  "direction-euro": 2,
  "honorific-si": 4,
  "and-go": 2,
  "question-polite": 2,
  "with-hago-wa": 2,
  "formal-nida": 4,
  "if-myeon": 2,
  "existence-itda": 2,
  "counter-phrase": 2,
  "when-ttae": 2,
  "can-su-itda": 2,
  "must-ya-dwaeda": 2,
  "also-do": 2,
  "comparison-boda": 2,
  "want-go-sipda": 2,
  "neg-ji-anta": 2,
  "neg-an": 2,
  "neg-mot": 2,
  "future-geoyeyo": 5,
  "until-kkaji": 1,
  "propositive-eyo": 1,
  "but-jiman": 2,
  "only-man": 1,
  "from-buteo": 1,
  "copula-negative-anieyo": 2
});
const RETENTION_TAG_FLOORS = Object.freeze({
  "object-eul-reul": 2,
  "present-polite": 2,
  "subject-i-ga": 2,
  "past-polite": 3,
  "topic-neun": 2,
  "time-expression": 2,
  "location-e": 2,
  "location-eseo": 2,
  "possessive-ui": 1,
  "because-aseo": 1,
  "imperative-seyo": 1,
  "copula-ieyo": 1,
  "direction-euro": 1,
  "honorific-si": 2,
  "and-go": 1,
  "question-polite": 1,
  "with-hago-wa": 1,
  "formal-nida": 2,
  "if-myeon": 1,
  "existence-itda": 1,
  "counter-phrase": 1,
  "when-ttae": 1,
  "can-su-itda": 1,
  "must-ya-dwaeda": 1,
  "also-do": 1,
  "comparison-boda": 1,
  "want-go-sipda": 1,
  "neg-ji-anta": 1,
  "neg-an": 1,
  "neg-mot": 1,
  "future-geoyeyo": 3,
  "until-kkaji": 1,
  "propositive-eyo": 1,
  "but-jiman": 1,
  "only-man": 1,
  "from-buteo": 1,
  "copula-negative-anieyo": 1
});


function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function readJsonIfPresent(path) {
  try {
    return readJson(path);
  } catch {
    return null;
  }
}

function writeJson(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function normalize(value) {
  return String(value ?? "").normalize("NFC").trim().replace(/\s+/g, " ");
}

function capacitySummary(items) {
  const stage1TypedDistinctTargets = new Set(items
    .filter((entry) => entry.mode === "typed" && Number(entry.sourceSectionOrder) <= 2)
    .map((entry) => normalize(entry.canonicalAnswer))).size;
  const byTag = {};
  for (const tag of Object.keys(FINAL_TAG_FLOORS)) {
    const distinctTargets = new Set(items
      .filter((entry) => (entry.patternTags || []).includes(tag))
      .map((entry) => normalize(entry.canonicalAnswer))).size;
    const finalFloor = FINAL_TAG_FLOORS[tag];
    const retentionFloor = RETENTION_TAG_FLOORS[tag] || 0;
    const required = Math.max(5 * finalFloor, finalFloor + retentionFloor);
    byTag[tag] = {
      distinctTargets,
      finalFloor,
      retentionFloor,
      requiredForFiveAttemptWindow: required,
      margin: distinctTargets - required,
    };
  }
  return {
    stage1TypedDistinctTargets,
    stage1RequiredForFiveAttemptWindow: 100,
    stage1Margin: stage1TypedDistinctTargets - 100,
    finalTagPools: byTag,
    blockerTags: Object.entries(byTag)
      .filter(([, value]) => value.margin < 0)
      .map(([tag, value]) => ({ tag, ...value })),
  };
}

function loadBank() {
  const sandbox = { window: {} };
  sandbox.self = sandbox.window;
  sandbox.globalThis = sandbox.window;
  vm.createContext(sandbox);
  const file = "sentence_exam_curated_bank.js";
  vm.runInContext(readFileSync(join(ROOT, file), "utf8"), sandbox, { filename: file });
  const bank = sandbox.window.HANAPATH_SENTENCE_EXAM_CURATED_BANK;
  if (bank?.revision === "curated-sentence-exam-v2-cb6b") {
    return {
      ...bank,
      revision: bank.baseRevision,
      entries: bank.entries.filter((entry) => entry.authoredRevision !== REVISION),
    };
  }
  return bank;
}

const CONTROLLED_AUTHORING = readJson(CONTROLLED_AUTHORING_FILE);
const REPLACEMENT_AUTHORING = readJson(REPLACEMENTS_FILE);
const CONTROLLED_BY_ID = new Map(Object.entries(CONTROLLED_AUTHORING.entries || {}));
const REPLACEMENT_BY_DEMOTED = new Map((REPLACEMENT_AUTHORING.mappings || []).map((item) => [item.demotedId, item.replacementId]));
const DEMOTED_IDS = new Set(REPLACEMENT_BY_DEMOTED.keys());
const RECOGNITION_BACKFILLS = Array.isArray(REPLACEMENT_AUTHORING.recognitionBackfills)
  ? REPLACEMENT_AUTHORING.recognitionBackfills
  : [];
const PROMOTED_RECOGNITION_IDS = new Set(RECOGNITION_BACKFILLS.map((item) => item.promotedId));
const EFFECTIVE_SELECTED = Object.freeze([
  ...SELECTED.filter((selection) => !DEMOTED_IDS.has(selection.id) && !PROMOTED_RECOGNITION_IDS.has(selection.id)),
  ...[...REPLACEMENT_BY_DEMOTED.values()].map((id) => Object.freeze({ id, mode: "typed" })),
  ...RECOGNITION_BACKFILLS.map((item) => Object.freeze({ id: item.backfillId, mode: "recognition" })),
]);
const CONTROLLED_PRESERVATION_INSTRUCTION = "Preserve the supplied Korean wording, particles, and order except for the required grammar change.";
const CONTROLLED_GRAMMAR_INSTRUCTION = "Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.";

function lexicalAnchor(row) {
  const tokens = normalize(row.korean).replace(/[.!?。！？]+$/u, "").split(" ").filter(Boolean);
  return [...tokens].sort((a, b) => b.length - a.length || a.localeCompare(b))[0] || normalize(row.korean);
}

function ordinaryTypedPrompt(row) {
  const tags = new Set(row.patternTags || []);
  const parts = [];
  if (tags.has("topic-neun") || tags.has("subject-i-ga")) parts.push("As for the established lesson topic,");
  if (tags.has("past-polite")) parts.push("earlier today,");
  else if (tags.has("future-geoyeyo")) parts.push("later,");
  if (tags.has("formal-nida")) {
    parts.push("in a formal situation,");
  } else if (tags.has("imperative-seyo")) {
    parts.push("politely,");
  } else if (tags.has("honorific-si")) {
    parts.push("respectfully,");
  } else {
    parts.push("to a classmate,");
  }
  const meaning = String(row.english || "").trim().replace(/"/g, "”");
  parts.push(`tell the complete lesson sentence meaning “${meaning}” using the word "${lexicalAnchor(row)}".`);
  return parts.join(" ");
}

function controlledPrompt(contract) {
  const operation = contract.operation === "combine-clauses"
    ? "Combine the supplied Korean clauses into one sentence."
    : contract.operation === "recast-predicate"
      ? "Recast the supplied Korean sentence with the required predicate construction."
      : "Change the supplied Korean sentence to the required speech-act ending.";
  const sources = contract.sourceFragments.map((fragment, index) => `Source ${index + 1}: ${fragment}`).join(" ");
  return [
    operation,
    sources,
    `Use ${contract.requiredConstructionCue} as the required Korean construction.`,
    `Replace the exact Korean ending "${contract.sourceEnding}" with "${contract.targetEnding}".`,
    CONTROLLED_PRESERVATION_INSTRUCTION,
    CONTROLLED_GRAMMAR_INSTRUCTION,
  ].join(" ");
}

function selectionReasons(row, mode) {
  const reasons = [];
  if (mode === "typed" && row.sectionOrders.some((value) => Number(value) <= 2)) {
    reasons.push("stage-1-five-attempt-typed-capacity");
  }
  const capacityTags = new Set([
    "must-ya-dwaeda", "also-do", "comparison-boda", "want-go-sipda", "neg-an",
    "neg-mot", "future-geoyeyo", "propositive-eyo", "but-jiman", "copula-negative-anieyo",
  ]);
  const matched = row.patternTags.filter((tag) => capacityTags.has(tag));
  if (matched.length) reasons.push(...matched.map((tag) => `five-attempt-tag-capacity:${tag}`));
  if (!reasons.length) reasons.push("joint-five-attempt-allocation-feasibility");
  return reasons;
}

function buildEntry(row, selection) {
  const sectionOrder = Number(row.candidateAssessment?.primarySection || row.sectionOrders?.[0]);
  const base = {
    id: row.id,
    mode: selection.mode,
    sourceSectionOrder: sectionOrder,
    sourceLessonIds: [...row.lessonIds],
    canonicalAnswer: row.korean,
    englishMeaning: row.english,
    patternTags: [...row.patternTags],
    sourceCandidateClass: row.existingTypedClass,
    existingExamPromptEn: row.existingExamPromptEn || null,
    ambiguityFlags: [...(row.ambiguityFlags || [])],
    plausibleVariantCount: Number(row.plausibleVariantCount || 0),
    capacityReasons: selectionReasons(row, selection.mode),
    authoredBy: AUTHORED_BY,
    authoredRevision: REVISION,
    reviewStatus: "pending",
    reviewedBy: null,
    reviewedAt: null,
    reviewedRevision: null,
    reviewerNote: null,
    ...(selection.mode === "typed" && row.existingTypedClass === "excluded" ? {
      eligibilityReauthorization: {
        schemaVersion: 1,
        previousTypedClass: "excluded",
        priorAmbiguityFlags: [...(row.ambiguityFlags || [])],
        resolution: "The replacement prompt explicitly fixes the complete live meaning, relevant time/register/information-structure cues, and a Korean lexical anchor; independent review must confirm whether the canonical-only answer set is defensible.",
      },
    } : {}),
  };
  if (selection.mode === "typed") {
    const controlled = CONTROLLED_BY_ID.get(row.id);
    if (controlled) {
      return {
        ...base,
        templateId: "controlled-clause-transformation",
        examPromptEn: controlledPrompt(controlled),
        manualAlternatives: [],
        requiresLexicalAnchor: true,
        controlledClause: {
          schemaVersion: 1,
          operation: controlled.operation,
          requiredPatternTag: controlled.requiredPatternTag,
          requiredConstructionCue: controlled.requiredConstructionCue,
          sourceFragments: [...controlled.sourceFragments],
          sourceEnding: controlled.sourceEnding,
          targetEnding: controlled.targetEnding,
          preservedClauseEvidence: (controlled.preservedClauseEvidence || []).map((item) => ({ ...item })),
          preserveSourceOrder: true,
          preserveLexicalMaterial: true,
          preserveParticles: true,
          acceptedAnswerPolicy: "reviewed-finite-only",
        },
        promptOrigin: "cb6b-controlled-clause-authoring",
      };
    }
    return {
      ...base,
      templateId: "lexically-anchored-production",
      examPromptEn: ordinaryTypedPrompt(row),
      manualAlternatives: [],
      requiresLexicalAnchor: true,
      promptOrigin: REPLACEMENT_BY_DEMOTED.has(row.id)
        ? "cb6b-clean-replacement"
        : "cb6b-ordinary-typed-authoring",
    };
  }
  return {
    ...base,
    templateId: "recognition-meaning",
    examPromptEn: `Choose the exact English meaning of “${row.korean}”.`,
    recognitionAnswerEn: row.english,
    manualAlternatives: [],
    requiresLexicalAnchor: false,
    promptOrigin: "live-source-meaning",
  };
}

function reviewContentHash(entry) {
  const reviewedContent = {
    id: entry.id,
    mode: entry.mode,
    templateId: entry.templateId,
    examPromptEn: entry.examPromptEn,
    canonicalAnswer: entry.canonicalAnswer,
    englishMeaning: entry.englishMeaning,
    recognitionAnswerEn: entry.recognitionAnswerEn || null,
    manualAlternatives: entry.manualAlternatives || [],
    sourceSectionOrder: entry.sourceSectionOrder,
    sourceLessonIds: entry.sourceLessonIds,
    patternTags: entry.patternTags,
    controlledClause: entry.controlledClause || null,
    eligibilityReauthorization: entry.eligibilityReauthorization || null,
  };
  return createHash("sha256").update(JSON.stringify(reviewedContent)).digest("hex");
}

function buildArtifacts() {
  const inventory = readJson(INVENTORY_FILE);
  const rows = new Map(inventory.inventory.map((row) => [row.id, row]));
  const bank = loadBank();
  const existingIds = new Set(bank.entries.map((entry) => entry.id));
  const entries = EFFECTIVE_SELECTED.map((selection) => {
    const row = rows.get(selection.id);
    if (!row) throw new Error(`Missing inventory row: ${selection.id}`);
    if (existingIds.has(selection.id)) throw new Error(`CB6 selection already exists in the frozen bank: ${selection.id}`);
    return buildEntry(row, selection);
  });
  const typed = entries.filter((entry) => entry.mode === "typed");
  const recognition = entries.filter((entry) => entry.mode === "recognition");
  const combinedEntries = [...bank.entries, ...entries];
  const witnessAssignment = readJson(WITNESS_ASSIGNMENT_FILE);
  const currentCapacity = capacitySummary(bank.entries);
  const projectedCapacity = capacitySummary(combinedEntries);
  const countBySection = (items) => Object.fromEntries(
    [...new Set(items.map((entry) => entry.sourceSectionOrder))].sort((a, b) => a - b)
      .map((section) => [section, items.filter((entry) => entry.sourceSectionOrder === section).length]),
  );
  const authoring = {
    schemaVersion: 1,
    revision: REVISION,
    authoredBy: AUTHORED_BY,
    state: "awaiting-independent-review",
    decisionRule: "CB6B re-authors the halted capacity expansion against the approved controlled-clause contract. A distinct integrator must individually review every prompt, answer, controlled transformation, route, tag assignment, replacement, and recognition meaning before any runtime bank or freeze is emitted.",
    baseBank: {
      revision: bank.revision,
      entryCount: bank.entries.length,
      typedCount: bank.entries.filter((entry) => entry.mode === "typed").length,
      recognitionCount: bank.entries.filter((entry) => entry.mode === "recognition").length,
    },
    projectedBank: {
      entryCount: bank.entries.length + entries.length,
      typedCount: bank.entries.filter((entry) => entry.mode === "typed").length + typed.length,
      recognitionCount: bank.entries.filter((entry) => entry.mode === "recognition").length + recognition.length,
    },
    summary: {
      additionCount: entries.length,
      typedAdditionCount: typed.length,
      recognitionAdditionCount: recognition.length,
      typedBySection: countBySection(typed),
      recognitionBySection: countBySection(recognition),
      witnessExamCount: Object.keys(WITNESS).length,
      attemptsPerExam: 5,
      typedExistingPromptCount: typed.filter((entry) => entry.existingExamPromptEn).length,
      typedGeneratedPromptCount: typed.filter((entry) => !entry.existingExamPromptEn).length,
      typedPromptReviewRequiredCount: typed.length,
      controlledTypedCount: typed.filter((entry) => entry.templateId === "controlled-clause-transformation").length,
      ordinaryTypedCount: typed.filter((entry) => entry.templateId === "lexically-anchored-production").length,
      demotedRecognitionCount: recognition.filter((entry) => DEMOTED_IDS.has(entry.id)).length,
      replacementTypedCount: typed.filter((entry) => [...REPLACEMENT_BY_DEMOTED.values()].includes(entry.id)).length,
    },
    capacity: {
      before: currentCapacity,
      projected: projectedCapacity,
    },
    entries,
  };
  const previousReviews = readJsonIfPresent(REVIEW_FILE);
  const previousById = new Map((previousReviews?.entries || []).map((entry) => [entry.id, entry]));
  const reviewEntries = entries.map((entry) => {
    const authoredContentHash = reviewContentHash(entry);
    const previous = previousById.get(entry.id);
    if (
      previous?.authoredRevision === REVISION
      && previous?.mode === entry.mode
      && previous?.authoredContentHash === authoredContentHash
    ) {
      return {
        ...previous,
        id: entry.id,
        mode: entry.mode,
        authoredRevision: REVISION,
        authoredContentHash,
      };
    }
    return {
      id: entry.id,
      mode: entry.mode,
      authoredRevision: REVISION,
      authoredContentHash,
      reviewStatus: "pending",
      reviewedBy: null,
      reviewedAt: null,
      reviewedRevision: null,
      reviewerNote: null,
      promptOverride: null,
      manualAlternativesOverride: null,
      recognitionAnswerOverride: null,
    };
  });
  const approvedCount = reviewEntries.filter((entry) => entry.reviewStatus === "approved").length;
  const reviews = {
    schemaVersion: 1,
    revision: REVISION,
    authoredBy: AUTHORED_BY,
    state: approvedCount === entries.length ? "independently-approved" : "awaiting-independent-review",
    approvedCount,
    pendingCount: entries.length - approvedCount,
    entries: reviewEntries,
  };
  const witness = {
    schemaVersion: 1,
    revision: REVISION,
    generatedBy: "CB6B exact SciPy/HiGHS MILP witness assignment; checked by scripts/audit-sentence-exam-capacity-remediation.mjs",
    freshnessWindow: 5,
    maxCanonicalTargetUses: 1,
    exams: witnessAssignment.exams,
  };
  return { authoring, reviews, witness };
}

const { authoring, reviews, witness } = buildArtifacts();
const args = new Set(process.argv.slice(2));
if (args.has("--write")) {
  writeJson(AUTHORING_FILE, authoring);
  writeJson(REVIEW_FILE, reviews);
  writeJson(WITNESS_FILE, witness);
  console.log(`Wrote CB6B authoring (${authoring.summary.additionCount} additions), review manifest (${reviews.approvedCount} approved), and five-attempt witness.`);
} else if (args.has("--check")) {
  let ok = true;
  for (const [path, expected] of [[AUTHORING_FILE, authoring], [REVIEW_FILE, reviews], [WITNESS_FILE, witness]]) {
    const actual = readFileSync(path, "utf8");
    const wanted = `${JSON.stringify(expected, null, 2)}\n`;
    if (actual !== wanted) {
      console.error(`Stale generated file: ${path}`);
      ok = false;
    }
  }
  if (!ok) process.exitCode = 1;
  else console.log("CB6 generated authoring, review, and witness files are fresh.");
} else {
  console.log(JSON.stringify({ revision: REVISION, ...authoring.summary }, null, 2));
}
