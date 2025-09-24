# Schema Reference

* **Canonical ID:** `https://schemas.trackman.com/app-scripting/1-0-0.json`
* **Local path (versioned):** `schema/1.0.0/app-scripting.schema.json`
* **Stable entrypoint:** `schema/latest/app-scripting.schema.json` (pointer or copy)

This document enumerates every object and field with **type**, **required**, **defaults**, **enums**, and **semantics**.

---

## 1) Instance root

**Type:** `object` · `additionalProperties: false`

| Field        | Type   | Required | Default | Notes                                                                                  |
| ------------ | ------ | :------: | ------- | -------------------------------------------------------------------------------------- |
| `$schema`    | string |     —    | —       | Optional validator/editor hint. Example: `../schema/latest/app-scripting.schema.json`. |
| `version`    | string |     —    | `1.0.0` | Author label (semver). Does not affect validation behavior.                            |
| `activities` | array  |  **Yes** | —       | Ordered sequence of activities (see **Activity** union). Min items: 1.                 |

```json
{
  "$schema": "../schema/latest/app-scripting.schema.json",
  "version": "1.0.0",
  "activities": [ /* Activity[] */ ]
}
```

---

## 2) Activity (union)

**Discriminator:** `nodeType`
**oneOf:** `RangeAnalysisScriptedActivity` | `PerformanceCenterScriptedActivity`

### 2.1 RangeAnalysisScriptedActivity

**Type:** `object` · `additionalProperties: false`

| Field          | Type                                    | Required | Notes                                 |
| -------------- | --------------------------------------- | :------: | ------------------------------------- |
| `nodeType`     | const `"RangeAnalysisScriptedActivity"` |  **Yes** | Discriminator.                        |
| `id`           | `IdString`                              |  **Yes** | `/^[a-z][a-z0-9-]*$/` (e.g., `ra-1`). |
| `introMessage` | `Message`                               |  **Yes** | Activity start banner.                |
| `endMessage`   | `Message`                               |  **Yes** | Activity end banner.                  |
| `steps`        | `RangeAnalysisScriptedStep[]`           |  **Yes** | Ordered steps (min 1).                |

### 2.2 PerformanceCenterScriptedActivity

**Type:** `object` · `additionalProperties: false`

| Field          | Type                                        | Required | Notes                                 |
| -------------- | ------------------------------------------- | :------: | ------------------------------------- |
| `nodeType`     | const `"PerformanceCenterScriptedActivity"` |  **Yes** | Discriminator.                        |
| `id`           | `IdString`                                  |  **Yes** | `/^[a-z][a-z0-9-]*$/` (e.g., `pc-1`). |
| `introMessage` | `Message`                                   |  **Yes** | Activity start banner.                |
| `endMessage`   | `Message`                                   |  **Yes** | Activity end banner.                  |
| `steps`        | `PerformanceCenterScriptedStep[]`           |  **Yes** | Ordered steps (min 1).                |

---

## 3) Step types

### 3.1 RangeAnalysisScriptedStep

**Type:** `object` · `additionalProperties: false`

| Field            | Type                                |  Req  | Notes                                           |
| ---------------- | ----------------------------------- | :---: | ----------------------------------------------- |
| `nodeType`       | const `"RangeAnalysisScriptedStep"` | **Y** | Discriminator.                                  |
| `id`             | `IdString`                          | **Y** | Unique within the activity (e.g., `ra-step-1`). |
| `introMessage`   | `Message`                           | **Y** | Shown before collecting shots.                  |
| `successMessage` | `Message`                           | **Y** | Shown when success threshold reached.           |
| `failMessage`    | `Message`                           | **Y** | Shown when fail threshold reached.              |
| `logic`          | `RangeAnalysisScriptedLogic`        | **Y** | Evaluation config.                              |
| `ui`             | `RangeAnalysisScriptedUI`           | **Y** | UI hints (currently just `nodeType`).           |

### 3.2 PerformanceCenterScriptedStep

**Type:** `object` · `additionalProperties: false`

| Field            | Type                                    |  Req  | Notes                                              |
| ---------------- | --------------------------------------- | :---: | -------------------------------------------------- |
| `nodeType`       | const `"PerformanceCenterScriptedStep"` | **Y** | Discriminator.                                     |
| `id`             | `IdString`                              | **Y** | Unique within the activity (e.g., `pc-ap-step-1`). |
| `introMessage`   | `Message`                               | **Y** | Shown before collecting shots.                     |
| `successMessage` | `Message`                               | **Y** | Shown when success threshold reached.              |
| `failMessage`    | `Message`                               | **Y** | Shown when fail threshold reached.                 |
| `logic`          | `PerformanceCenterScriptedLogic`        | **Y** | Evaluation config.                                 |
| `ui`             | `PerformanceCenterScriptedUI`           | **Y** | UI hints (currently just `nodeType`).              |

---

## 4) Messages

### Message

**Type:** `object` · `additionalProperties: false`

| Field         | Type    |  Req  | Default | Notes                                                          |
| ------------- | ------- | :---: | ------- | -------------------------------------------------------------- |
| `header`      | string  | **Y** | —       | Short headline.                                                |
| `description` | string  |   —   | `""`    | Optional supporting copy.                                      |
| `seconds`     | integer | **Y** | `3`     | Display duration (seconds). `0` = hide instantly after render. |

---

## 5) Logic objects

### 5.1 RangeAnalysisScriptedLogic

**Type:** `object` · `additionalProperties: false`

| Field              | Type                                 |  Req  | Default | Notes                                              |
| ------------------ | ------------------------------------ | :---: | ------- | -------------------------------------------------- |
| `nodeType`         | const `"RangeAnalysisScriptedLogic"` | **Y** | —       | Discriminator.                                     |
| `setup`            | `RangeAnalysisScriptedSetup`         | **Y** | —       | Per-step environment.                              |
| `successCondition` | `RangeAnalysisScriptedConditions`    | **Y** | —       | Success threshold/clauses.                         |
| `failCondition`    | `RangeAnalysisScriptedConditions`    | **Y** | —       | Fail threshold/clauses.                            |
| `canRetry`         | boolean                              | **Y** | `false` | Allow immediate retry on failure (counters reset). |
| `skipOnSuccess`    | boolean                              | **Y** | `false` | End step immediately once success reached.         |

### 5.2 PerformanceCenterScriptedLogic

**Type:** `object` · `additionalProperties: false`

| Field              | Type                                                                                       |  Req  | Default | Notes                                              |
| ------------------ | ------------------------------------------------------------------------------------------ | :---: | ------- | -------------------------------------------------- |
| `nodeType`         | const `"PerformanceCenterScriptedLogic"`                                                   | **Y** | —       | Discriminator.                                     |
| `setup`            | oneOf `PerformanceCenterApproachScriptedSetup` \| `PerformanceCenterTeeShotsScriptedSetup` | **Y** | —       | Choose exactly one.                                |
| `successCondition` | `PerformanceCenterScriptedConditions`                                                      | **Y** | —       | Success threshold/clauses.                         |
| `failCondition`    | `PerformanceCenterScriptedConditions`                                                      | **Y** | —       | Fail threshold/clauses.                            |
| `canRetry`         | boolean                                                                                    | **Y** | `false` | Allow immediate retry on failure (counters reset). |
| `skipOnSuccess`    | boolean                                                                                    | **Y** | `false` | End step immediately once success reached.         |

---

## 6) Setup objects

### 6.1 RangeAnalysisScriptedSetup

**Type:** `object` · `additionalProperties: false`

| Field      | Type                                 |  Req  | Notes                                 |
| ---------- | ------------------------------------ | :---: | ------------------------------------- |
| `nodeType` | const `"RangeAnalysisScriptedSetup"` | **Y** | Discriminator.                        |
| `club`     | string                               | **Y** | Club code (e.g., `Drv`, `7i`, `Wdg`). |
| `distance` | number                               | **Y** | Target/reference distance (meters).   |

### 6.2 PerformanceCenterApproachScriptedSetup

**Type:** `object` · `additionalProperties: false`

| Field            | Type                                             |   Req  | Notes                   |       |                                            |
| ---------------- | ------------------------------------------------ | :----: | ----------------------- | ----- | ------------------------------------------ |
| `nodeType`       | const `"PerformanceCenterApproachScriptedSetup"` |  **Y** | Discriminator.          |       |                                            |
| `hole`           | integer (≥1)                                     |  **Y** | Hole number (1-based).  |       |                                            |
| `pin`            | integer (≥1)                                     |  **Y** | Pin index (1-based).    |       |                                            |
| `playerCategory` | enum \`Handicap                                  |   PGA  | LPGA\`                  | **Y** | Baseline cohort. Default `Handicap`.       |
| `hcp`            | integer \[-10..54]                               |  **Y** | Handicap for baselines. |       |                                            |
| `gender`         | enum \`Male                                      | Female | Unspecified\`           | **Y** | Baseline dimension. Default `Unspecified`. |
| `minDistance`    | number (≥0)                                      |  **Y** | Meters.                 |       |                                            |
| `maxDistance`    | number (≥0)                                      |  **Y** | Meters.                 |       |                                            |

### 6.3 PerformanceCenterTeeShotsScriptedSetup

**Type:** `object` · `additionalProperties: false`

| Field            | Type                                             |   Req  | Notes                           |       |                                            |
| ---------------- | ------------------------------------------------ | :----: | ------------------------------- | ----- | ------------------------------------------ |
| `nodeType`       | const `"PerformanceCenterTeeShotsScriptedSetup"` |  **Y** | Discriminator.                  |       |                                            |
| `hole`           | integer (≥1)                                     |  **Y** | Hole number (1-based).          |       |                                            |
| `playerCategory` | enum \`Handicap                                  |   PGA  | LPGA\`                          | **Y** | Baseline cohort. Default `Handicap`.       |
| `hcp`            | integer \[-10..54]                               |  **Y** | Handicap for baselines.         |       |                                            |
| `gender`         | enum \`Male                                      | Female | Unspecified\`                   | **Y** | Baseline dimension. Default `Unspecified`. |
| `courseDistance` | integer \[1000..9000]                            |  **Y** | Total course distance (meters). |       |                                            |

---

## 7) Conditions

Two parallel types (same semantics):

* `RangeAnalysisScriptedConditions`
* `PerformanceCenterScriptedConditions`

**Type:** `object` · `additionalProperties: false`

| Field           | Type                  |   Req  | Notes                                                                                             |                                                                         |
| --------------- | --------------------- | :----: | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `nodeType`      | const (type-specific) |  **Y** | Discriminator (`"RangeAnalysisScriptedConditions"` or `"PerformanceCenterScriptedConditions"`).   |                                                                         |
| `shots`         | integer (≥1)          |  **Y** | Threshold count. For **success**: shots that **qualify**. For **fail**: shots that **violate**.   |                                                                         |
| `conditionType` | \`"And"               | "Or"\` | —                                                                                                 | How to combine multiple clauses **for a single shot**. Default `"And"`. |
| `conditions`    | `ConditionClause[]`   |    —   | Per-shot checks. If omitted, **every shot counts** toward the threshold. Min items: 1 if present. |                                                                         |

### 7.1 ConditionClause

**Type:** `object` · `additionalProperties: false`

| Field       | Type   |  Req  | Notes                                                                                 |
| ----------- | ------ | :---: | ------------------------------------------------------------------------------------- |
| `parameter` | string | **Y** | Metric name (engine-defined). Examples: `Total`, `Curve`, `FromPin`, `StrokesGained`. |
| `min`       | number |  *1*  | Inclusive lower bound (require either `min` **or** `max`).                            |
| `max`       | number |  *1*  | Inclusive upper bound (require either `min` **or** `max`).                            |

**Semantics:** Inclusive bounds. If both present and equal → exact match.

**Examples:**

```json
{ "parameter": "Total", "min": 200 }
{ "parameter": "Curve", "min": -3, "max": 3 }
{ "parameter": "Curve", "min": 10, "max": 10 }
```

---

## 8) UI objects

Currently placeholders that act as discriminators; future fields can be added.

### RangeAnalysisScriptedUI

| Field      | Type                              |  Req  |
| ---------- | --------------------------------- | :---: |
| `nodeType` | const `"RangeAnalysisScriptedUI"` | **Y** |

### PerformanceCenterScriptedUI

| Field      | Type                                  |  Req  |
| ---------- | ------------------------------------- | :---: |
| `nodeType` | const `"PerformanceCenterScriptedUI"` | **Y** |

---

## 9) ID & naming rules

* `IdString` pattern: `^[a-z][a-z0-9-]*$`
* Suggested prefixes:

  * Activities: `ra-1`, `pc-1`
  * Steps: `ra-step-1`, `pc-ap-step-1`, `pc-ts-step-1`

---

## 10) Evaluation model (informative)

Per **step**:

1. Show `introMessage`.
2. For each shot:

   * If shot meets **success** per-shot clauses → increment `successCount`.
   * If shot meets **fail** per-shot clauses → increment `failCount`.
3. After each shot:

   * If `successCount >= success.shots` → success → show `successMessage`; if `skipOnSuccess: true`, end step immediately.
   * Else if `failCount >= fail.shots` → failure → show `failMessage`; if `canRetry: true`, allow retry (counters reset).
4. Continue until one threshold is reached.

> Bounds are **inclusive**. Omitted `conditions` means **all shots count** toward the threshold.

---

## 11) Examples (compact)

### Range: long & straight driver

```json
{
  "nodeType": "RangeAnalysisScriptedStep",
  "id": "ra-step-1",
  "introMessage": { "header": "Hit 5 long shots", "seconds": 10 },
  "successMessage": { "header": "Great!", "seconds": 3 },
  "failMessage": { "header": "Try again", "seconds": 3 },
  "logic": {
    "nodeType": "RangeAnalysisScriptedLogic",
    "setup": { "nodeType": "RangeAnalysisScriptedSetup", "club": "Drv", "distance": 200 },
    "successCondition": {
      "nodeType": "RangeAnalysisScriptedConditions",
      "shots": 3,
      "conditionType": "And",
      "conditions": [
        { "parameter": "Total", "min": 200 },
        { "parameter": "Curve", "min": -3, "max": 3 }
      ]
    },
    "failCondition": { "nodeType": "RangeAnalysisScriptedConditions", "shots": 5 },
    "canRetry": true,
    "skipOnSuccess": true
  },
  "ui": { "nodeType": "RangeAnalysisScriptedUI" }
}
```

### PC: approach—three within 3m

```json
{
  "nodeType": "PerformanceCenterScriptedStep",
  "id": "pc-ap-step-1",
  "introMessage": { "header": "Get 3 within 3m", "seconds": 5 },
  "successMessage": { "header": "Success!", "seconds": 3 },
  "failMessage": { "header": "Failed", "seconds": 3 },
  "logic": {
    "nodeType": "PerformanceCenterScriptedLogic",
    "setup": {
      "nodeType": "PerformanceCenterApproachScriptedSetup",
      "hole": 1, "pin": 3, "playerCategory": "Handicap",
      "hcp": 15, "gender": "Male",
      "minDistance": 80, "maxDistance": 80
    },
    "successCondition": {
      "nodeType": "PerformanceCenterScriptedConditions",
      "shots": 3,
      "conditions": [{ "parameter": "FromPin", "max": 3 }]
    },
    "failCondition": {
      "nodeType": "PerformanceCenterScriptedConditions",
      "shots": 1,
      "conditions": [{ "parameter": "StrokesGained", "max": 0 }]
    },
    "canRetry": true,
    "skipOnSuccess": true
  },
  "ui": { "nodeType": "PerformanceCenterScriptedUI" }
}
```

---

## 12) Validation notes

* Root and all objects use `additionalProperties: false`. Typos will be rejected.
* PC `setup` uses `oneOf`. Ensure `nodeType` matches the chosen setup object exactly.
* `ConditionClause` requires at least one bound (`min` or `max`) and allows both. Bounds are inclusive.

---

## 13) Versioning

* Versioned schemas live under `schema/<semver>/…`, e.g. `schema/1.0.0/…`.
* `schema/latest/app-scripting.schema.json` should point to (or copy) the intended version.
* Breaking changes → bump **MAJOR**; keep older versions available.

