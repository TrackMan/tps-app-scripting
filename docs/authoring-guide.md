Here’s a ready-to-commit `docs/authoring-guide.md` for **App Scripting**.

---

# Authoring Guide

This guide explains how to write **App Scripting** JSON files that orchestrate multi-app training flows across **Range Analysis** and **Performance Center**, and how those files are validated and executed.

---

## TL;DR (Quick Start)

1. Put the canonical schema at:
- **Node.js/AJV**:

  ```bash
  npm ci
  npm run validate
  ```0.0/app-scripting.schema.json
```

2. Point `latest` to it (recommended: pointer file):

```json
// schema/latest/app-scripting.schema.json
{ "$ref": "../1.0.0/app-scripting.schema.json" }
```

3. Create an example in `examples/...`:

```json
{
  "$schema": "../schema/latest/app-scripting.schema.json",
  "version": "1.0.0",
  "activities": []
}
```

4. Validate:

```bash
npm run validate
```

---

## Concepts

- **Script** — The top-level JSON file with an ordered list of `activities`.
- **Activity** — Targets a single host app. Types:
  - `RangeAnalysisScriptedActivity`
  - `PerformanceCenterScriptedActivity`

- **Step** — Smallest unit of work inside an activity. Types:
  - `RangeAnalysisScriptedStep`
  - `PerformanceCenterScriptedStep`

- **Messages** — Timed UI banners: `introMessage`, `successMessage`, `failMessage`, plus activity-level `introMessage`/`endMessage`.
- **Logic** — Step evaluation config:
  - `setup` — Context/environment for the host app
  - `successCondition` / `failCondition` — Shot thresholds with per-shot clauses
  - `canRetry`, `skipOnSuccess` — Flow behavior flags

- **Conditions** — Count shots that **meet** (success) or **violate** (fail) criteria. Inclusive bounds.

---

## File Anatomy

Top-level shape:

```json
{
  "$schema": "../schema/latest/app-scripting.schema.json",
  "version": "1.0.0",
  "activities": [
    /* Activity[] */
  ]
}
```

- `"$schema"` (optional) helps editors/CI validate.
- `version` is an authoring label (does not change validator behavior).
- `activities` is an ordered list; activities run sequentially.

---

## Activity Anatomy

### Range Analysis

```json
{
  "nodeType": "RangeAnalysisScriptedActivity",
  "id": "ra-1",
  "introMessage": {
    "header": "Welcome to Driving Range",
    "description": "",
    "seconds": 3
  },
  "endMessage": {
    "header": "Driving Range Activity ended",
    "description": "",
    "seconds": 3
  },
  "steps": [
    /* RangeAnalysisScriptedStep[] */
  ]
}
```

### Performance Center

```json
{
  "nodeType": "PerformanceCenterScriptedActivity",
  "id": "pc-1",
  "introMessage": {
    "header": "Welcome to Performance Center",
    "description": "",
    "seconds": 3
  },
  "endMessage": {
    "header": "Performance Center Activity ended",
    "description": "",
    "seconds": 3
  },
  "steps": [
    /* PerformanceCenterScriptedStep[] */
  ]
}
```

---

## Step Anatomy

### Range Analysis step

```json
{
  "nodeType": "RangeAnalysisScriptedStep",
  "id": "ra-step-1",
  "introMessage": {
    "header": "Hit 5 long shots",
    "description": "3 over 200m, straight",
    "seconds": 10
  },
  "successMessage": { "header": "Great!", "description": "", "seconds": 3 },
  "failMessage": { "header": "Try again", "description": "", "seconds": 3 },

  "logic": {
    "nodeType": "RangeAnalysisScriptedLogic",
    "setup": {
      "nodeType": "RangeAnalysisScriptedSetup",
      "club": "Drv",
      "distance": 200
    },
    "successCondition": {
      "nodeType": "RangeAnalysisScriptedConditions",
      "shots": 3,
      "conditionType": "And",
      "conditions": [
        { "parameter": "Total", "min": 200 },
        { "parameter": "Curve", "min": -3, "max": 3 }
      ]
    },
    "failCondition": {
      "nodeType": "RangeAnalysisScriptedConditions",
      "shots": 5
    },
    "canRetry": true,
    "skipOnSuccess": true
  },

  "ui": { "nodeType": "RangeAnalysisScriptedUI" }
}
```

### Performance Center step (Approach)

```json
{
  "nodeType": "PerformanceCenterScriptedStep",
  "id": "pc-ap-step-1",
  "introMessage": {
    "header": "Get 3 within 3m",
    "description": "",
    "seconds": 5
  },
  "successMessage": { "header": "Success!", "description": "", "seconds": 3 },
  "failMessage": { "header": "Failed", "description": "", "seconds": 3 },

  "logic": {
    "nodeType": "PerformanceCenterScriptedLogic",
    "setup": {
      "nodeType": "PerformanceCenterApproachScriptedSetup",
      "hole": 1,
      "pin": 3,
      "playerCategory": "Handicap",
      "hcp": 15,
      "gender": "Male",
      "minDistance": 80,
      "maxDistance": 80
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

### Performance Center step (Tee shots)

```json
{
  "nodeType": "PerformanceCenterScriptedStep",
  "id": "pc-ts-step-1",
  "introMessage": {
    "header": "Hit 5 shots. No goal",
    "description": "",
    "seconds": 5
  },
  "successMessage": { "header": "Success!", "description": "", "seconds": 3 },
  "failMessage": { "header": "Failed", "description": "", "seconds": 3 },

  "logic": {
    "nodeType": "PerformanceCenterScriptedLogic",
    "setup": {
      "nodeType": "PerformanceCenterTeeShotsScriptedSetup",
      "hole": 2,
      "playerCategory": "Handicap",
      "hcp": 15,
      "gender": "Male",
      "courseDistance": 7200
    },
    "successCondition": {
      "nodeType": "PerformanceCenterScriptedConditions",
      "shots": 5
    },
    "failCondition": {
      "nodeType": "PerformanceCenterScriptedConditions",
      "shots": 5
    },
    "canRetry": true,
    "skipOnSuccess": true
  },

  "ui": { "nodeType": "PerformanceCenterScriptedUI" }
}
```

---

## Logic & Evaluation Semantics

Per step:

1. Show `introMessage` for `seconds`.
2. For each shot:
   - Evaluate **success** and **fail** **per-shot** clauses (if present).
   - If a shot meets the success clauses, increment `successCount`.
   - If a shot meets the fail clauses, increment `failCount`.

3. After each shot:
   - If `successCount >= successCondition.shots` → **success**:
     - Show `successMessage`
     - If `skipOnSuccess: true`, **end step immediately** and continue the activity.

   - Else if `failCount >= failCondition.shots` → **failure**:
     - Show `failMessage`
     - If `canRetry: true`, allow immediate retry (counters reset); otherwise continue the activity as failed.

4. If neither threshold is reached, keep collecting shots until one is.

**Notes**

- `conditions` use **inclusive** bounds (`min`/`max`).
- If `conditions` is omitted, **every shot counts** toward that threshold.
- `conditionType` controls how multiple clauses combine **for a single shot**:
  - `"And"` → shot must satisfy **all** clauses
  - `"Or"` → shot must satisfy **any** clause

- You can model **instant fail** with `failCondition.shots: 1` and an appropriate clause.

---

## Common Parameters (examples)

> The engine defines the exact set; these are common examples used in scripts.

| Parameter       | App                | Unit | Meaning                                                      |
| --------------- | ------------------ | ---- | ------------------------------------------------------------ |
| `Total`         | Range Analysis     | m    | Total carry+roll distance                                    |
| `Curve`         | Range Analysis     | m    | Lateral curve at landing (left negative, right positive)     |
| `FromPin`       | Performance Center | m    | Distance from pin after the shot                             |
| `StrokesGained` | Performance Center | Δ    | Strokes gained vs baseline (≤0 often used as fail criterion) |

---

## Authoring Patterns

### 1) Straight long drives (success on count, bounded curve)

```json
"successCondition": {
  "nodeType": "RangeAnalysisScriptedConditions",
  "shots": 3,
  "conditionType": "And",
  "conditions": [
    { "parameter": "Total", "min": 200 },
    { "parameter": "Curve", "min": -3, "max": 3 }
  ]
}
```

### 2) “Any violation fails” (instant fail)

```json
"failCondition": {
  "nodeType": "RangeAnalysisScriptedConditions",
  "shots": 1,
  "conditionType": "Or",
  "conditions": [
    { "parameter": "Curve", "min": 10, "max": 10 },
    { "parameter": "Total", "max": 200 }
  ]
}
```

### 3) Count-only (no per-shot clauses)

```json
"successCondition": { "nodeType": "PerformanceCenterScriptedConditions", "shots": 5 }
```

---

## Messaging Guidelines

- Keep `header` concise and action-oriented.
- Put units and pass/fail hints in `description` when helpful.
- Use short durations (`seconds` ≤ 10) to avoid blocking flow.

---

## IDs & Naming

- Pattern: `^[a-z][a-z0-9-]*$`
- Suggested prefixes:
  - Activities: `ra-1`, `pc-1`
  - Steps: `ra-step-1`, `pc-ap-step-1`, `pc-ts-step-1`

- Keep IDs stable for analytics/logging.

---

## Validation Workflow

- **Node/AJV**:

  ```bash
  npm install           # first time (creates lockfile)
  npm run validate      # validates examples/**/*.json
  npm run format        # prettier on schema/examples/docs
  ```

- **Python/jsonschema**:

  ```bash
  pip install -r requirements.txt
  python tools/validate.py
  ```

CI runs the same validation on PRs and pushes to `main`.

---

## Troubleshooting

- **“data must NOT have additional properties”**
  Likely a stray field or `$schema` at the root while `additionalProperties:false`.
  → Either remove `$schema` from the instance or keep it and ensure the schema lists `$schema` in `properties` (this repo already does).

- **“must match exactly one schema in oneOf” on PC `setup`**
  Ensure `nodeType` matches the chosen setup object exactly:
  - `PerformanceCenterApproachScriptedSetup` **or**
  - `PerformanceCenterTeeShotsScriptedSetup`

- **Draft 2020-12 error in AJV**
  Use the 2020 build in `tools/validate.js` (`import Ajv2020 from "ajv/dist/2020.js"`).

- **Strict mode `required` warnings**
  Our validator disables strict (`strict:false`). If you enable strict, mirror property declarations inside `anyOf` branches.

---

## Versioning & `latest`

- Versioned schemas live under `schema/<semver>/…` (e.g., `1.0.0`).
- `schema/latest/app-scripting.schema.json` should either:
  - be a **pointer file**:

    ```json
    { "$ref": "../1.0.0/app-scripting.schema.json" }
    ```

  - or a **copy** of the chosen version.

When you introduce **breaking changes**, bump **MAJOR**, keep older versions for backward compatibility, and update docs.

---

## Example Library

- `examples/range-analysis/long-straight-driver.json`
- `examples/range-analysis/curved-driver-challenge.json`
- `examples/performance-center/approach-three-within-3m.json`
- `examples/performance-center/tee-five-shots-no-goal.json`
- `examples/composite-flows/range-to-pc-sequence.json`

Each example begins with:

```json
"$schema": "../schema/latest/app-scripting.schema.json"
```

Adjust relative depth as needed.

---

## Best Practices Checklist

- [ ] Use clear, stable IDs (`ra-step-1`, etc.)
- [ ] Keep messages short; include units in `description`
- [ ] Prefer **inclusive** bounds and explicit `conditionType`
- [ ] Use `failCondition.shots: 1` for instant-fail rules
- [ ] Set `skipOnSuccess: true` to end steps as soon as goals are met
- [ ] Keep setups minimal but complete (required fields only)
- [ ] Validate locally before committing; let CI guard the repo

---

## FAQ

**Q: Can I mix Range Analysis and Performance Center in one script?**
Yes. Activities execute in order; each targets one app.

**Q: What happens if both success and fail thresholds are reached on the same shot?**
The engine should define precedence; typical behavior is to evaluate **success** first, then **fail**. If your engine differs, document it here.

**Q: Are `min`/`max` inclusive?**
Yes—bounds are inclusive. Equal `min==max` is an exact match.

**Q: Can I omit `conditions`?**
Yes—then **every shot counts** toward that threshold.
