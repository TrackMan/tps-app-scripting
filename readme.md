Here’s a ready-to-commit **README.md** for the `app-scripting` repo.

---

# TrackMan App Scripting

Define and validate JSON scripts that orchestrate multi-app training flows across **Range Analysis** and **Performance Center**.

* **Schema:** JSON Schema (Draft 2020-12) at `schema/latest/app-scripting.schema.json`
* **Docs:** Authoring guide, schema reference, and example scripts
* **Tooling:** Node (AJV) validators + CI workflow

---

## Contents

```
app-scripting/
├─ README.md
├─ docs/
│  ├─ index.md
│  ├─ authoring-guide.md
│  ├─ schema-reference.md
│  ├─ examples.md
│  └─ changelog.md
├─ schema/
│  ├─ 1.0.0/
│  │  ├─ app-scripting.schema.json
│  │  └─ README.md
│  └─ latest -> 1.0.0 (see “Pointing latest”)
├─ examples/
│  ├─ range-analysis/
│  ├─ performance-center/
│  └─ composite-flows/
├─ tools/
│  ├─ validate.js
│  └─ format.js
├─ scripts/
│  ├─ validate-all.sh
│  └─ new-example.sh
├─ package.json
└─ .github/workflows/validate.yml
```

---

## Quick start

### 1) Reference the schema from an example

In any `examples/**.json`:

```json
{
  "$schema": "../schema/latest/app-scripting.schema.json",
  "version": "1.0.0",
  "activities": [
    {
      "nodeType": "RangeAnalysisScriptedActivity",
      "id": "ra-1",
      "introMessage": { "header": "Welcome", "description": "", "seconds": 3 },
      "endMessage":  { "header": "Done",     "description": "", "seconds": 3 },
      "steps": [
        {
          "nodeType": "RangeAnalysisScriptedStep",
          "id": "ra-step-1",
          "introMessage":  { "header": "Hit 3 shots", "description": "", "seconds": 5 },
          "successMessage":{ "header": "Great!",      "description": "", "seconds": 3 },
          "failMessage":   { "header": "Try again",   "description": "", "seconds": 3 },
          "logic": {
            "nodeType": "RangeAnalysisScriptedLogic",
            "setup": { "nodeType": "RangeAnalysisScriptedSetup", "club": "Drv", "distance": 200 },
            "successCondition": { "nodeType": "RangeAnalysisScriptedConditions", "shots": 3,
              "conditions": [{ "parameter": "Total", "min": 200 }] },
            "failCondition": { "nodeType": "RangeAnalysisScriptedConditions", "shots": 5 },
            "canRetry": true,
            "skipOnSuccess": true
          },
          "ui": { "nodeType": "RangeAnalysisScriptedUI" }
        }
      ]
    }
  ]
}
```

> Adjust the relative path in `$schema` based on the file depth (each `..` goes up one directory).

---

## Validate scripts

Use **Node (AJV)** to scan `examples/**/*.json` and validate against `schema/latest/app-scripting.schema.json`.

1. Install:

```bash
npm ci
```

2. Validate all examples:

```bash
npm run validate
```

3. (Optional) Format JSON files:

```bash
npm run format
```

---

## CI

GitHub Actions workflow runs validation on every push/PR:

```
.github/workflows/validate.yml
```

If any example fails schema validation, the job fails.

---

## Pointing `latest` to a version

You have three choices for how `schema/latest/app-scripting.schema.json` maps to a specific version (e.g., `1.0.0`). Pick one team-wide and stick with it.

### 1) **Pointer file** (recommended; portable)

Create `schema/latest/app-scripting.schema.json` with:

```json
{ "$ref": "../1.0.0/app-scripting.schema.json" }
```

Pros: single source of truth, no OS features needed.

### 2) **Copy** (simple, but duplicate)

```bash
# bash
mkdir -p schema/{1.0.0,latest}
cp schema/1.0.0/app-scripting.schema.json schema/latest/app-scripting.schema.json
```

```powershell
# PowerShell
New-Item -ItemType Directory -Force -Path "schema/1.0.0","schema/latest" | Out-Null
Copy-Item "schema/1.0.0/app-scripting.schema.json" "schema/latest/app-scripting.schema.json" -Force
```

Re-copy whenever the versioned schema changes.

### 3) **Symlink** (Windows/macOS/Linux; requires privileges)

**Windows (PowerShell):**

```powershell
New-Item -ItemType Directory -Force -Path "schema/1.0.0","schema/latest" | Out-Null
New-Item -ItemType SymbolicLink `
  -Path "schema/latest/app-scripting.schema.json" `
  -Target "schema/1.0.0/app-scripting.schema.json"
```

**macOS/Linux:**

```bash
ln -sf ../1.0.0/app-scripting.schema.json schema/latest/app-scripting.schema.json
```

> If Windows blocks symlinks, use the pointer file approach above.

---

## Authoring model (summary)

* A script is an object with an ordered list of **activities**.
* **Activity types:** `RangeAnalysisScriptedActivity`, `PerformanceCenterScriptedActivity`.
* Each activity contains **steps**, each with messages, logic, and UI.
* **Logic** defines a **setup** + **successCondition** and **failCondition**:

  * `shots`: threshold count
  * `conditions`: per-shot constraints (e.g., `Total`, `Curve`, `FromPin`, `StrokesGained`)
  * `conditionType`: `"And"`/`"Or"` (within a single shot)
* **Booleans:** `canRetry`, `skipOnSuccess`.

See `docs/authoring-guide.md` and `docs/schema-reference.md` for the full spec and examples.

---

## Versioning

* Schema versions live under `schema/<semver>/…` (e.g., `1.0.0`).
* `schema/latest/…` is a stable entrypoint used by examples and docs.
* Breaking changes → bump **MAJOR**, keep old versions for backward compatibility.
* Add human notes in `docs/changelog.md` and `schema/<ver>/README.md`.

---

## Contributing

1. Add or update examples in `examples/**`.
2. Run validation locally (`npm run validate`).
3. Open a PR. CI must pass.

Coding style:

* JSON is formatted via Prettier.
* IDs follow `^[a-z][a-z0-9-]*$`.

---

## Troubleshooting

* **“\$schema not found”**: Check the relative path from your example to `schema/latest/app-scripting.schema.json`.
* **Windows symlink errors**: Use the **pointer file** (`{ "$ref": "../1.0.0/app-scripting.schema.json" }`) instead.
* **Validator cannot resolve refs**: Ensure your tool runs from the repo root (or provide absolute paths).

---

## License

© TrackMan. All rights reserved. (Replace with your actual license if needed.)

---

## Contacts

* Schema owner: Application Development @ TrackMan
* Maintainers: (add GitHub handles / emails)

