import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, '..', 'server', 'examples', 'events');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

for (const f of files) {
  const p = path.join(dir, f);
  console.log('Posting', f);
  const body = fs.readFileSync(p, 'utf8');
  try {
    const res = await fetch('http://localhost:4000/api/webhook/demo', { method: 'POST', body, headers: { 'Content-Type': 'application/json' } });
    const text = await res.text();
    console.log('->', res.status, text.slice(0, 200));
  } catch (err) {
    console.error('POST error', err.message);
  }
  await new Promise((r) => setTimeout(r, 200));
}
