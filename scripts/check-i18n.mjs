// Fails when the Slovak copy does not have exactly the same shape as the English copy
// (same keys, same array lengths, same {placeholders}). Run by `npm run build`.
import en from '../src/i18n/en.js';
import sk from '../src/i18n/sk.js';

const problems = [];
const ph = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');
const tags = (s) => [...s.matchAll(/<\/?(\w+)/g)].map((m) => m[1]).join(',');

function walk(a, b, path) {
  if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b)) return problems.push(`${path}: type differs`);
  if (typeof a === 'string') {
    if (ph(a) !== ph(b)) problems.push(`${path}: placeholders differ ({${ph(a)}} vs {${ph(b)}})`);
    if (tags(a) !== tags(b)) problems.push(`${path}: HTML tags differ`);
    const optional = /^dict\.site\.brand(Tail|Sub)$/.test(path); // may be empty in one language
    if (!optional && a.trim() !== '' && b.trim() === '') problems.push(`${path}: empty translation`);
    return;
  }
  if (Array.isArray(a)) {
    if (a.length !== b.length) problems.push(`${path}: ${a.length} items in en, ${b.length} in sk`);
    a.forEach((x, i) => i < b.length && walk(x, b[i], `${path}[${i}]`));
    return;
  }
  if (a && typeof a === 'object') {
    for (const k of Object.keys(a)) k in b ? walk(a[k], b[k], `${path}.${k}`) : problems.push(`${path}.${k}: missing in sk`);
    for (const k of Object.keys(b)) if (!(k in a)) problems.push(`${path}.${k}: extra in sk`);
  }
}
walk(en, sk, 'dict');
// values that must be identical in both languages (single source of truth is site.js, these are echoes)
const same = (label, x, y) => { if (x !== y) problems.push(`${label}: en "${x}" vs sk "${y}"`); };
same('student.name', en.student.name, sk.student.name);
same('pocket count', String(en.pockets.length), String(sk.pockets.length));

if (problems.length) {
  console.error('i18n check failed:\n - ' + problems.join('\n - '));
  process.exit(1);
}
console.log('i18n check: en and sk have the same shape');
