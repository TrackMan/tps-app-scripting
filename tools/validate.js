// tools/validate.js
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { readFileSync } from "node:fs";
import path from "node:path";
import url from "node:url";
import { glob } from "glob";

const here = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const latestSchemaPath = path.join(root, "schema", "latest", "app-scripting.schema.json");

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
  strict: false,            // <- change
  allowUnionTypes: true,
});
addFormats(ajv);

const schema = loadSchema(latestSchemaPath);
const validate = ajv.compile(schema);

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
