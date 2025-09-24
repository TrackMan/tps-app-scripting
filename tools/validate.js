// tools/validate.js
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { readFileSync } from "node:fs";
import path from "node:path";
import url from "node:url";
import { glob } from "glob";

const here = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const latestSchemaPath = path.join(
  root,
  "schema",
  "latest",
  "app-scripting.schema.json",
);

function loadSchema(p) {
  const raw = JSON.parse(readFileSync(p, "utf8"));
  if (Object.keys(raw).length === 1 && "$ref" in raw) {
    const target = path.resolve(path.dirname(p), raw["$ref"]);
    return JSON.parse(readFileSync(target, "utf8"));
  }
  return raw;
}

// 👇 turn off strict, or use { strictRequired: false } if you prefer
const ajv = new Ajv2020({
  allErrors: true,
  strict: false, // <- change
  allowUnionTypes: true,
});
addFormats(ajv);

// Pre-load and register all schemas under schema/latest so relative $ref's
// such as "shared.schema.json#/$defs/..." can be resolved by Ajv.
const schemaFiles = await glob("schema/latest/**/*.json", { cwd: root, nodir: true });
// Load the main schema early so we can compute the expected base URL for
// relative filename-based refs (e.g. shared.schema.json -> https://.../shared.schema.json).
const mainSchemaRaw = loadSchema(latestSchemaPath);
const mainSchemaBase = (mainSchemaRaw && mainSchemaRaw.$id)
  ? mainSchemaRaw.$id.replace(/\/[^\/]*$/, "")
  : "https://schemas.trackman.com/app-scripting/1-0-0";
for (const rel of schemaFiles) {
  const p = path.join(root, rel);
  try {
    const s = loadSchema(p);
    // Register using the schema $id if present so Ajv can resolve absolute refs.
    // Avoid registering the main schema twice. We'll compile it separately below.
    if (path.resolve(p) === path.resolve(latestSchemaPath)) continue;
    if (s && typeof s === "object") {
      if (s.$id) {
        // If Ajv already has this schema registered, skip it.
        if (ajv.getSchema(s.$id)) continue;
        ajv.addSchema(s, s.$id);
        // Also register the schema under a filename-based URL so relative refs
        // like "shared.schema.json" (resolved against the main schema $id) can be found.
        try {
          const filenameId = `${mainSchemaBase}/${path.basename(p)}`;
          if (!ajv.getSchema(filenameId)) {
            // If the schema's internal $id differs from the filename-based id,
            // register a copy with the filename-based $id so anchors/fragments
            // are available under that URI.
            if (s.$id && s.$id !== filenameId) {
              try {
                const sCopy = JSON.parse(JSON.stringify(s));
                sCopy.$id = filenameId;
                ajv.addSchema(sCopy, filenameId);
              } catch (_) {
                ajv.addSchema(s, filenameId);
              }
            } else {
              ajv.addSchema(s, filenameId);
            }
          }
           // Special case: register a copy with the exact .json $id Ajv expects for anchors
           if (path.basename(p) === "activity-performance-center.schema.json") {
             const expectedId = "https://schemas.trackman.com/app-scripting/1-0-0/activity-performance-center.schema.json";
             if (!ajv.getSchema(expectedId)) {
               const sCopy2 = JSON.parse(JSON.stringify(s));
               sCopy2.$id = expectedId;
               ajv.addSchema(sCopy2, expectedId);
             }
           }
        } catch (_) {
          // ignore filename-based registration failures
        }
      } else {
        // Add unnamed schema (Ajv will assign an internal key).
        ajv.addSchema(s);
      }
    }
  } catch (e) {
    console.error(`Failed to load schema ${p}: ${e.message}`);
    process.exit(2);
  }
}

// Diagnostic: print all Ajv registered schema keys
console.error('DEBUG: Ajv registered schema keys:');
for (const k of Object.keys(ajv.schemas)) {
  console.error('  ', k);
}

// Diagnostic: report whether Ajv has schema entries for the filename-based URLs
const expectedFiles = [
  "activity-range-analysis.schema.json",
  "activity-performance-center.schema.json",
  "shared.schema.json",
  "app-scripting.schema.json",
];
for (const fn of expectedFiles) {
  const id = `${mainSchemaBase}/${fn}`;
  const has = !!ajv.getSchema(id);
  console.error(`DEBUG: ajv has schema ${id}: ${has}`);
}

const schema = loadSchema(latestSchemaPath);
let validate;
try {
  validate = ajv.compile(schema);
} catch (e) {
  console.error("Failed to compile main schema:", e.message || e);
  // Re-throw so CI shows the full stack if needed
  throw e;
}

const files = await glob("examples/**/*.json", { cwd: root, nodir: true });

let hasErrors = false;
for (const rel of files) {
  const f = path.join(root, rel);
  try {
    const data = JSON.parse(readFileSync(f, "utf8"));
    const ok = validate(data);
    if (!ok) {
      hasErrors = true;
      console.error(`\n❌ ${rel}`);
      console.error(ajv.errorsText(validate.errors, { separator: "\n" }));
    } else {
      console.log(`✅ ${rel}`);
    }
  } catch (e) {
    hasErrors = true;
    console.error(`\n❌ ${rel}\n - Invalid JSON: ${e.message}`);
  }
}
if (hasErrors) process.exit(1);
