// Language-neutral data for the NightJar.Gift promo site: links, flags, numbers, prices, dates and
// the structure of lists. Everything a visitor reads lives in src/i18n/<lang>.js and is merged
// with this file by content(lang) in src/i18n/index.js, so a price is only ever stored once.
//
// Sources
//   - ST-017-MOTHERBOARD/docs/v7_parts.md, v8_parts.md   (parts, prices read 2026-10-03/05)
//   - ST-017-MOTHERBOARD/enclosure/                      (Nightjar CNC model, build guide)
//   - ST-017-MOTHERBOARD/wood-selection/                 (wood research)
//   - ST-017-OndrejSpanik/content/docs/sk/sthdf/...      (project summary, pitch, milestones)
//   - github.com/iairu, iairu.com                         (student info)

export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
/** Prefix an absolute site path with the configured base. */
export const url = (p = '/') => (/^(https?:|mailto:|#)/.test(p) ? p : `${BASE}${p}`);

export const PREORDER_OPEN = false; // flip to true to enable the pre-order form

export const site = {
  latin: 'Caprimulgus europaeus',
  studentId: 'ST-017',
  year: '2026/2027',
  licence: 'CC BY-NC-SA 4.0',
};

export const links = {
  github: 'https://github.com/iairu',
  portfolio: 'https://iairu.com',
  linkedin: 'https://www.linkedin.com/in/iairu',
  email: 'spanik11@gmail.com',
  docs: 'https://knifes.nightjar.gift',
  repo: 'https://github.com/iairu/ST-016-SMVIT',
  pcbRepo: 'https://github.com/iairu/ST-016-MOTHERBOARD',
  fiit: 'https://www.fiit.stuba.sk',
  beechBlock: 'https://www.knn.sk/hranol-buk-a-b--800-80-80-priebezna/',
};

// Header + footer menu: path and section ids. Labels come from the language file (same order).
export const nav = [
  { href: '/', sections: ['highlights', 'how', 'model', 'gallery', 'field-notes'] },
  { href: '/bird/', sections: ['specs', 'wireframes', 'pockets', 'machining', 'button', 'wood'] },
  { href: '/electronics/', sections: ['circuit', 'views', 'choices', 'evolution', 'safety', 'verification'] },
  { href: '/parts/', sections: ['kit', 'electronics-parts', 'wood-parts', 'v8-fuse'] },
  { href: '/roadmap/', sections: ['status', 'milestones'] },
  { href: '/preorder/', pill: true, sections: ['form', 'faq'] },
  { href: '/about/', sections: ['student', 'course', 'elsewhere'] },
];

export const external = [{ href: links.docs }, { href: links.repo }, { href: links.pcbRepo }];

export const highlights = [{ icon: 'press' }, { icon: 'wood' }, { icon: 'chip' }, { icon: 'plug' }, { icon: 'euro' }, { icon: 'book' }];

export const flow = [{ n: '01' }, { n: '02' }, { n: '03' }, { n: '04' }];

// Electronics v7 (ordered). Prices EUR incl. VAT, read 2026-10-03.
// rows: [quantity, unit price, product link]; ref, part name and note are in the language file.
export const bom = {
  shops: [
    {
      name: 'techfun.sk', url: 'https://techfun.sk', subtotal: 13.43,
      rows: [
        [1, 11.20, 'https://techfun.sk/produkt/fermion-dfplayer-pro-mini-mp3-prehravac/'],
        [1, 0.20, 'https://techfun.sk/produkt/piny-40-kusov-female-2-54-mm-1-riadok/'],
        [1, 0.08, 'https://techfun.sk/produkt/tlacidlo-1-kus-12x12x4-3-mm/'],
        [1, 0.85, 'https://techfun.sk/produkt/nabijaci-modul-pre-litiove-baterie-tp4056-ochranny-obvod-rozne-typy/'],
        [1, 0.25, 'https://techfun.sk/produkt/smd-rezistor-0805-rozne-varianty-10-kusov/'],
        [1, 0.25, 'https://techfun.sk/produkt/rezistor-rozne-hodnoty-1-4w-10-kusov/'],
        [1, 0.60, 'https://techfun.sk/produkt/reproduktor-8-ohm-0-5w/'],
      ],
    },
    {
      name: 'LaskaKit', url: 'https://www.laskakit.cz/en/', subtotal: 4.17,
      rows: [
        [1, 4.01, 'https://www.laskakit.cz/en/baterie-li-po-3-7v-500mah-lipo/'],
        [1, 0.16, 'https://www.laskakit.cz/en/aishi-ers1cm471f12ot-470uf-20--16v-kondenzator-elektrolyticky/'],
      ],
    },
  ],
  total: 17.60,
};

export const fuse = {
  ref: 'F1', price: 0.82, total: 18.42,
  url: 'https://www.hestore.eu/en/prod_10023779.html', shop: 'HESTORE',
};

// Wood options; title, price text and blurb are in the language file.
export const wood = [
  { id: 'beech-block', planned: true, shop: 'knn.sk', url: links.beechBlock },
  { id: 'linden', planned: false, shop: 'drevoma.sk', url: 'https://www.drevoma.sk/produkt/stolarske-rezivo-lipa-hr-50mm-i-ii-tr' },
  { id: 'beech-board', planned: false, shop: 'drevoma.sk', url: 'https://www.drevoma.sk/produkt/stolarske-rezivo-buk-hr-50mm-i-ii-tr' },
];

export const milestones = [
  { id: 'M1', iso: '2026-10-05', done: true },
  { id: 'M2', iso: '2026-10-19' },
  { id: 'M3', iso: '2026-11-02' },
  { id: 'M4', iso: '2026-11-16' },
  { id: 'M5', iso: '2026-11-30' },
  { id: 'M6', iso: '2026-12-07' },
  { id: 'M7', iso: '2026-12-14' },
  { id: 'M8', iso: '2027-01-15' },
];

// done | wip | todo, in the same order as the rows in the language file
export const statusStates = ['done', 'done', 'wip', 'wip', 'todo', 'todo', 'todo', 'done'];

// Board evolution. Images live in /img.
export const versions = [
  { v: 'v1', img: 'pcb-v1' }, { v: 'v3', img: 'pcb-v3' }, { v: 'v4', img: 'pcb-v4' },
  { v: 'v5', img: 'pcb-v5' }, { v: 'v7', img: 'pcb-v7' }, { v: 'v8', img: 'pcb-v8' },
];

// Photos and drawings that carry text (dimensions only; alt text and captions are per language)
export const views = [
  { id: 'bb', src: 'breadboard-v7', w: 1800, h: 1790 },
  { id: 'sch', src: 'schematic-v7', w: 1800, h: 690 },
  { id: 'pcb', src: 'pcb-v7', w: 1800, h: 556 },
];
