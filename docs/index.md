# TrackMan App Scripting

**App Scripting** lets you orchestrate multi-app training flows across **Range Analysis** and **Performance Center** using JSON.

- ✅ Validate scripts with a JSON Schema (Draft 2020-12)
- ✅ Versioned schema under `schema/<semver>/…`
- ✅ Stable entrypoint at `schema/latest/app-scripting.schema.json`
- ✅ CI validation for all examples

## Quick start

1. Put the schema at `schema/1.0.0/app-scripting.schema.json`  
   (use the schema we finalized earlier).

2. Point `latest` to that version (pick one approach):

- **Pointer file (recommended):**
  `schema/latest/app-scripting.schema.json`
  ```json
  { "$ref": "../1.0.0/app-scripting.schema.json" }
  ```
