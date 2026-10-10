// Finds the ORIGINAL (earliest paper) printing of every card used on the site and saves its image links
// to src/data/printings.json. Run: npm run art        (add --refresh to redo cards already saved)
// To force a specific printing, add "Card Name": "setcode" to src/data/printing-overrides.json.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = join(root, 'src/data/printings.json');
const overrides = JSON.parse(readFileSync(join(root, 'src/data/printing-overrides.json'), 'utf8'));
const refresh = process.argv.includes('--refresh');
const saved = existsSync(out) ? JSON.parse(readFileSync(out, 'utf8')) : {};
const norm = (n) => n.replace(/\u2019/g, "'").trim();

// 1. Collect every card name the site uses.
const names = new Set();
const read = (f) => readFileSync(join(root, f), 'utf8');
for (const m of read('src/data/pillars.ts').matchAll(/art:\s*(['"])(.+?)\1/g)) names.add(norm(m[2]));
for (const m of read('src/pages/index.astro').matchAll(/name:\s*(['"])(.+?)\1/g)) names.add(norm(m[2]));
const postDir = join(root, 'src/content/posts');
for (const f of readdirSync(postDir).filter((f) => /\.mdx?$/.test(f))) {
  const t = readFileSync(join(postDir, f), 'utf8');
  for (const m of t.matchAll(/^art:\s*["']?(.+?)["']?\s*$/gm)) names.add(norm(m[1]));
  for (const m of t.matchAll(/<Card\s+name=["'](.+?)["']/g)) names.add(norm(m[1]));
  for (const m of t.matchAll(/names=\{\[([^\]]*)\]\}/g))
    for (const q of m[1].matchAll(/(['"])(.+?)\1/g)) names.add(norm(q[2]));
  for (const m of t.matchAll(/^\s*\d+x?\s+([A-Z][^\n]*?)\s*$/gm)) names.add(norm(m[1]));
}

// 2. Look each one up.
const headers = { 'User-Agent': 'GoodStuffDoctrine/1.0', Accept: 'application/json' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(url) {
  await sleep(120); // Scryfall asks for 50-100ms between requests
  const res = await fetch(url, { headers });
  return res.ok ? res.json() : null;
}
const enc = encodeURIComponent;
async function original(name) {
  if (overrides[name]) return get(`https://api.scryfall.com/cards/named?exact=${enc(name)}&set=${enc(overrides[name])}`);
  for (const extra of [' -is:promo -set_type:memorabilia', '']) {
    const q = `!"${name}" game:paper${extra}`;
    const r = await get(`https://api.scryfall.com/cards/search?q=${enc(q)}&unique=prints&order=released&dir=asc`);
    if (r?.data?.length) return r.data[0];
  }
  return null;
}

let added = 0;
for (const name of [...names].sort()) {
  if (saved[name] && !refresh) continue;
  const card = await original(name);
  const img = card?.image_uris ?? card?.card_faces?.[0]?.image_uris;
  if (!img) { console.warn(`  not found: ${name}`); continue; }
  saved[name] = { set: card.set_name, released: card.released_at, art_crop: img.art_crop, normal: img.normal };
  console.log(`  ${name}: ${card.set_name} (${card.released_at})`);
  added++;
}
const sorted = Object.fromEntries(Object.entries(saved).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(out, JSON.stringify(sorted, null, 2) + '\n');
console.log(`Done. ${added} added, ${Object.keys(sorted).length} total.`);
