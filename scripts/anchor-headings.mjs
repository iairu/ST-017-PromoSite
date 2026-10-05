// Post-build step: give headings ids so that full-text search results can deep-link.
// The first <h2> after <section id="x"> gets id="x-heading"; every other <h2>/<h3> gets a slug of its text. Runs before Pagefind.
import fs from 'node:fs';
import path from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const slug = (s) =>
  s.replace(/<[^>]+>/g, '').replace(/&[a-z#0-9]+;/g, ' ').normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'section';

function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? (e.name.startsWith('_') ? [] : walk(path.join(d, e.name))) : e.name.endsWith('.html') ? [path.join(d, e.name)] : []);
}

let total = 0;
for (const file of walk(dist)) {
  let html = fs.readFileSync(file, 'utf8');
  const used = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  let sectionId = null;
  const out = html.replace(/<section\b[^>]*?\sid="([^"]+)"[^>]*>|<h([23])\b([^>]*)>([\s\S]*?)<\/h\2>/g, (m, sid, lvl, attrs, inner) => {
    if (sid) { sectionId = sid; return m; }
    if (/\sid="/.test(attrs)) return m;
    let id;
    if (lvl === '2' && sectionId && !used.has(sectionId + '-heading')) id = sectionId + '-heading';
    else { id = slug(inner); let n = 2; const base = id; while (used.has(id)) id = `${base}-${n++}`; }
    used.add(id); total++;
    return `<h${lvl}${attrs} id="${id}">${inner}</h${lvl}>`;
  });
  if (out !== html) fs.writeFileSync(file, out);
}
console.log(`anchor-headings: ${total} headings given ids`);
