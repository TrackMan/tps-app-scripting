const fs = require('fs');
const path = require('path');

const eventsModule = require('../dist/events');
const classify = eventsModule.classifyEventPayload || eventsModule.default?.classifyEventPayload;

if (!classify) {
  console.error('classifyEventPayload not found in compiled events module. Did you build the server (npm run build)?');
  process.exit(2);
}

const examplesDir = path.join(__dirname, '..', 'examples', 'events');
const files = fs.readdirSync(examplesDir).filter((f) => f.endsWith('.json'));
let failed = 0;
for (const f of files) {
  const p = path.join(examplesDir, f);
  const raw = fs.readFileSync(p, 'utf8');
  let obj;
  try {
    obj = JSON.parse(raw);
  } catch (err) {
    console.error(f, 'invalid JSON:', err.message);
    failed++;
    continue;
  }
  const result = classify(obj);
  const ok = result && result.typed;
  console.log(f, '=>', ok ? 'OK' : 'UNCLASSIFIED', result && result.name ? result.name : '');
  if (!ok) failed++;
}

if (failed) {
  console.error(`${failed} example(s) failed classification`);
  process.exit(1);
}
console.log('All examples classified');
process.exit(0);
