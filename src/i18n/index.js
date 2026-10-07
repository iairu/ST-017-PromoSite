// Language plumbing: which languages exist, how a page asks for its text and how URLs map between them.
import en from './en.js';
import sk from './sk.js';
import {
  site, links, nav, external, highlights, flow, bom, fuse, wood, milestones, statusStates, versions, views, url, BASE,
} from '../data/site.js';

export const langs = ['en', 'sk'];
export const defaultLang = 'en';
const dicts = { en, sk };

export const isLang = (l) => langs.includes(l);

/** Language of the page being rendered (pages live under src/pages/[lang]/). */
export function getLang(astro) {
  const l = astro.params?.lang ?? astro.currentLocale;
  return isLang(l) ? l : defaultLang;
}

/** Replace {name} placeholders. */
export const fill = (s, vars = {}) => s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));

/** Absolute site path inside a language, e.g. href('sk', '/parts/#kit'). */
export const href = (lang, path = '/') => url(`/${lang}${path}`);

/** The same page in another language (path only; the #hash is added in the browser). */
export function switchPath(pathname, to) {
  const rel = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  const rest = rel.replace(/^\/(en|sk)(?=\/|$)/, '') || '/';
  return url(`/${to}${rest.startsWith('/') ? rest : '/' + rest}`);
}

const zip = (base, text) => base.map((b, i) => ({ ...b, ...text[i] }));
const cache = {};

/** Everything a page needs for one language: base data merged with the translated copy. */
export function content(lang) {
  if (cache[lang]) return cache[lang];
  const d = dicts[lang];
  const money = new Intl.NumberFormat(d.numLocale, { style: 'currency', currency: 'EUR' });
  const plain = new Intl.NumberFormat(d.numLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const c = {
    lang,
    d,
    ui: d.ui,
    p: d.p,
    site: { ...site, ...d.site },
    links,
    fmt: (n) => money.format(n),
    num: (n) => plain.format(n),
    nav: nav.map((n, i) => ({
      href: n.href,
      pill: n.pill ? d.nav[i].pill : undefined,
      label: d.nav[i].label,
      blurb: d.nav[i].blurb,
      sections: n.sections.map((id, k) => [id, d.nav[i].sections[k]]),
    })),
    external: zip(external, d.external),
    highlights: zip(highlights, d.highlights),
    stats: d.stats,
    flow: zip(flow, d.flow),
    bom: {
      date: d.bom.date,
      total: bom.total,
      shops: bom.shops.map((s, i) => ({
        ...s,
        rows: s.rows.map(([qty, price, href], k) => {
          const [ref, part, note] = d.bom.shops[i].rows[k];
          return { ref, part, qty, price, href, note };
        }),
      })),
    },
    fuse: { ...fuse, ...d.fuse },
    wood: zip(wood, d.wood),
    milestones: zip(milestones, d.milestones),
    status: d.status.map(([area, note], i) => ({ area, note, state: statusStates[i] })),
    versions: zip(versions, d.versions),
    views: zip(views, d.views),
    specs: d.specs,
    pockets: d.pockets,
    student: d.student,
    faq: d.faq,
    fieldNotes: d.fieldNotes,
  };
  cache[lang] = c;
  return c;
}
