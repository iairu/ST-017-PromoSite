// Single source of truth for the LELEK promo site: navigation, flags, links, copy
// that repeats across pages, and every number that comes from the project docs.
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
  name: 'LELEK',
  latin: 'Caprimulgus europaeus',
  tagline: 'The bird you hear before you see.',
  description:
    'LELEK is a CNC-carved wooden European nightjar with a button on its back. Hold it and the bird sings its churring night call; let go and it sleeps.',
  studentId: 'ST-017',
  course: 'Systems Thinking in IT and Digital Fabrication (STHDF)',
  year: '2026/2027',
  licence: 'CC BY-NC-SA 4.0',
  updated: '5 October 2026',
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

// Header + footer menu. `sections` feed the footer sitemap and the search palette.
export const nav = [
  {
    href: '/', label: 'Home', blurb: 'Meet the bird',
    sections: [
      ['highlights', 'Highlights'], ['how', 'How it sings'], ['model', 'Turn it around'],
      ['gallery', 'Breadboard, schematic, PCB'], ['field-notes', 'Field notes'],
    ],
  },
  {
    href: '/bird/', label: 'The Bird', blurb: 'Shape, wood and CNC',
    sections: [
      ['specs', 'Specifications'], ['wireframes', 'Wireframes'], ['pockets', 'Pockets and depths'],
      ['machining', 'Machining'], ['button', 'The wooden button'], ['wood', 'Wood'],
    ],
  },
  {
    href: '/electronics/', label: 'Electronics', blurb: 'Board v7, v8',
    sections: [
      ['circuit', 'The circuit'], ['views', 'Schematic, breadboard, PCB'], ['choices', 'Design choices'],
      ['evolution', 'Eight board versions'], ['safety', 'Safety'], ['verification', 'Verification'],
    ],
  },
  {
    href: '/parts/', label: 'Parts', blurb: 'What goes inside',
    sections: [['electronics-parts', 'Electronics (ordered)'], ['wood-parts', 'Wood and workshop'], ['v8-fuse', 'v8 thermal fuse']],
  },
  {
    href: '/roadmap/', label: 'Roadmap', blurb: 'Where the build stands',
    sections: [['status', 'Status'], ['milestones', 'Milestones']],
  },
  {
    href: '/preorder/', label: 'Pre-order', blurb: 'Opening soon', pill: 'Soon',
    sections: [['form', 'Pre-order form'], ['faq', 'Questions']],
  },
  {
    href: '/about/', label: 'About', blurb: 'The student behind it',
    sections: [['student', 'Ondrej Špánik'], ['course', 'The course'], ['elsewhere', 'Elsewhere']],
  },
];

export const external = [
  { href: links.docs, label: 'Documentation (KNIFES)', blurb: 'Full build log, 7Ds, SDLC' },
  { href: links.repo, label: 'Project repository', blurb: 'github.com/iairu' },
  { href: links.pcbRepo, label: 'Board and enclosure files', blurb: 'Fritzing, Gerbers, STL' },
];

export const highlights = [
  {
    icon: 'press', title: 'Hold to sing, let go to sleep',
    text: 'The button sits in the battery line. While it is held the sound module is powered and plays; release it and nothing draws current. There is no power switch to forget.',
  },
  {
    icon: 'wood', title: 'Two halves of carved beech',
    text: 'A stylised perching nightjar, 309 mm long, machined on a 3-axis CNC as two mirrored halves and joined with hidden wooden dowels. The seam can be pried open for service.',
  },
  {
    icon: 'chip', title: 'No microcontroller, no firmware',
    text: 'Version 6 removed the ATtiny85, MOSFET and LED. The DFPlayer Pro starts playing as soon as it gets power, so the whole circuit is a button, a capacitor, two resistors and the module.',
  },
  {
    icon: 'plug', title: 'Charges through the tail',
    text: 'A 500 mAh LiPo with its own protection board, charged over micro-USB through a channel under the tail. The charge current is cut to 0.36 A to keep heat inside the wood low.',
  },
  {
    icon: 'euro', title: 'Electronics under EUR 18',
    text: 'Board v7 swapped TME parts for Slovak and Czech shops: about EUR 17.60 with VAT against roughly USD 31.50 for v6, with the same behaviour and the same enclosure.',
  },
  {
    icon: 'book', title: 'Documented in the open',
    text: 'Eight board versions, every dead end and every fix is written down, with schematics, breadboards, PCBs and a parametric CAD model you can rebuild from a script.',
  },
];

export const stats = [
  { value: '309', unit: 'mm', label: 'long, about 1.2x life size' },
  { value: '2', unit: 'halves', label: 'CNC-carved, hidden dowels' },
  { value: '0', unit: 'firmware', label: 'button in the power line' },
  { value: '17.60', unit: 'EUR', label: 'electronics, v7, incl. VAT' },
];

export const flow = [
  { n: '01', title: 'Press', text: 'A turned wooden button on the back pushes its stem onto a 12 x 12 mm tact switch in the centre of the board.' },
  { n: '02', title: 'Power', text: 'The switch closes the battery line. The DFPlayer Pro gets about 3.7 V, boots and plays the churr from its own memory.' },
  { n: '03', title: 'Sing', text: 'The amplifier drives an 8 ohm, 0.5 W speaker in the chest through 5 ohm of series resistance. Sound leaves through slots in the seam.' },
  { n: '04', title: 'Sleep', text: 'Let go and the module is unpowered again. Between presses only the cell protection and the charger leak a few microamps.' },
];

// Electronics v7 (ordered). Prices EUR incl. VAT, read 2026-10-03.
export const bom = {
  date: '3 October 2026',
  shops: [
    {
      name: 'techfun.sk', url: 'https://techfun.sk', subtotal: 13.43,
      rows: [
        ['U2', 'DFRobot Fermion DFPlayer Pro (DFR0768)', 1, 11.20, 'https://techfun.sk/produkt/fermion-dfplayer-pro-mini-mp3-prehravac/', 'MP3 player with built-in amplifier and 128 MB flash.'],
        ['U2 headers', 'Female header 1x40, 2.54 mm', 1, 0.20, 'https://techfun.sk/produkt/piny-40-kusov-female-2-54-mm-1-riadok/', 'Cut into two 6-pin pieces; the standard 8.5 mm height.'],
        ['SW1', 'Tact switch 12 x 12 x 4.3 mm', 1, 0.08, 'https://techfun.sk/produkt/tlacidlo-1-kus-12x12x4-3-mm/', 'The wooden button presses on this.'],
        ['J1 charger', 'TP4056 + protection module, micro-USB', 1, 0.85, 'https://techfun.sk/produkt/nabijaci-modul-pre-litiove-baterie-tp4056-ochranny-obvod-rozne-typy/', 'Charge-current resistor swapped on the module.'],
        ['R_PROG', 'SMD resistor 0805, 3.3 kΩ (10 pcs)', 1, 0.25, 'https://techfun.sk/produkt/smd-rezistor-0805-rozne-varianty-10-kusov/', 'Sets charging to 0.36 A. Fitted on the module, not the board.'],
        ['R1, R2', 'Resistor 10 Ω 1/4 W (10 pcs)', 1, 0.25, 'https://techfun.sk/produkt/rezistor-rozne-hodnoty-1-4w-10-kusov/', 'In parallel: 5 Ω in series with the speaker.'],
        ['LS1', 'Speaker 8 Ω 0.5 W', 1, 0.60, 'https://techfun.sk/produkt/reproduktor-8-ohm-0-5w/', 'Sits in a 40 mm pocket in the left half.'],
      ],
    },
    {
      name: 'LaskaKit', url: 'https://www.laskakit.cz/en/', subtotal: 4.17,
      rows: [
        ['J1 battery', 'GeB LiPol 503035, 500 mAh, 3.7 V, protection PCB, JST-PH', 1, 4.01, 'https://www.laskakit.cz/en/baterie-li-po-3-7v-500mah-lipo/', '5 x 30 x 35 mm, fits the 41 x 31 x 6 mm pocket.'],
        ['C1', 'AISHI ERS1CM471F12OT, 470 µF 16 V, 8 x 12 mm', 1, 0.16, 'https://www.laskakit.cz/en/aishi-ers1cm471f12ot-470uf-20--16v-kondenzator-elektrolyticky/', 'Supplies the amplifier peaks the small cell cannot.'],
      ],
    },
  ],
  total: 17.60,
};

export const fuse = {
  ref: 'F1', part: 'Proffuse TZ-D-077 thermal fuse, 77 °C', price: 0.82, total: 18.42,
  url: 'https://www.hestore.eu/en/prod_10023779.html', shop: 'HESTORE',
};

export const wood = [
  {
    id: 'beech-block', status: 'Planned', title: 'Beech square block, 80 x 80 x 800 mm, grade A/B',
    shop: 'knn.sk', price: '17.08 EUR per piece (code T17386)', url: links.beechBlock,
    text: 'The most likely choice. The block is cut into pieces for the CNC to carve the two halves of the bird, with the button blank coming out of the same stock.',
  },
  {
    id: 'linden', status: 'Alternative', title: 'Linden boards, 50 mm kiln-dried, unplaned',
    shop: 'drevoma.sk', price: '541.20 EUR/m³', url: 'https://www.drevoma.sk/produkt/stolarske-rezivo-lipa-hr-50mm-i-ii-tr',
    text: 'Soft, even and kind to the cutter. Pick a board at least 170 mm wide and plane it to 42 mm. Planned for the first prototype.',
  },
  {
    id: 'beech-board', status: 'Alternative', title: 'Beech boards, 50 mm kiln-dried, unplaned',
    shop: 'drevoma.sk', price: '602.70 EUR/m³ (steamed: 588.00)', url: 'https://www.drevoma.sk/produkt/stolarske-rezivo-buk-hr-50mm-i-ii-tr',
    text: 'The same wood in board form, if the block turns out to be unavailable or too wet.',
  },
];

export const milestones = [
  { id: 'M1', date: '5 Oct 2026', iso: '2026-10-05', title: 'Project summary approved', text: 'Topic and KNIFE theme approved. Electronics designed, simulated and ordered.', done: true },
  { id: 'M2', date: '19 Oct 2026', iso: '2026-10-19', title: '3D model and toolpaths', text: 'CAD model and CAM toolpaths ready; parts ordered.' },
  { id: 'M3', date: '2 Nov 2026', iso: '2026-11-02', title: 'First sound from a breadboard', text: 'The circuit plays the churr; standby current measured.' },
  { id: 'M4', date: '16 Nov 2026', iso: '2026-11-16', title: 'Linden prototype carved', text: 'Prototype glued and milled on the CNC.' },
  { id: 'M5', date: '30 Nov 2026', iso: '2026-11-30', title: 'Pitch presentation', text: 'Five minutes, starting with the sound.' },
  { id: 'M6', date: '7 Dec 2026', iso: '2026-12-07', title: 'Final beech bird', text: 'Final piece carved from beech, button hand-turned.' },
  { id: 'M7', date: '14 Dec 2026', iso: '2026-12-14', title: 'Testing and documentation', text: 'Sound, standby draw, battery access and the glued seam tested; KNIFE published.' },
  { id: 'M8', date: 'Jan 2027', iso: '2027-01-15', title: 'Final presentation', text: 'Final presentation and reflection.' },
];

export const status = [
  ['Electronics design', 'Board v8 designed, simulated, Gerbers checked (6 of 6 nets)', 'done'],
  ['Electronics parts', 'v7 parts ordered', 'done'],
  ['3D model and enclosure', 'Parametric Nightjar model, build guide, STL files', 'wip'],
  ['Wood', 'Beech block chosen; order pending', 'wip'],
  ['CNC carving', 'Not started', 'todo'],
  ['Assembly and finishing', 'Not started', 'todo'],
  ['Wooden button', 'Not started', 'todo'],
  ['Documentation', 'Docusaurus site, eight board versions logged', 'done'],
];

// Board evolution. Images live in /img.
export const versions = [
  { v: 'v1', date: '27 Sep', size: '84.0 x 62.0 mm', img: 'pcb-v1', text: 'DFPlayer Mini, ATtiny85, AO3401A, 16340 cell. A review found a floating RESET line.' },
  { v: 'v3', date: '27 Sep', size: '78.1 x 26.7 mm', img: 'pcb-v3', text: 'Re-laid out as a strip to fit the bird’s belly. Sleep firmware and first Nightjar enclosure.' },
  { v: 'v4', date: '27 Sep', size: '89.4 x 27.9 mm', img: 'pcb-v4', text: 'Digispark, DFPlayer Pro and a LiPo with USB charger. The outline that stuck.' },
  { v: 'v5', date: '28 Sep', size: '89.4 x 27.9 mm', img: 'pcb-v5', text: 'Bare ATtiny85 and TME parts, with SPICE models for the simulator.' },
  { v: 'v7', date: '3 Oct', size: '89.4 x 27.9 mm', img: 'pcb-v7', text: 'No microcontroller. Slovak and Czech shops. Hold the button and the bird sings.' },
  { v: 'v8', date: '5 Oct', size: '89.4 x 27.9 mm', img: 'pcb-v8', text: 'v7 plus a 77 °C thermal fuse in the battery line.' },
];

export const specs = [
  ['Bird, overall', '309 x 85 x 75 mm (L x W x H), about 1.2x life size'],
  ['Each half', '309 x 42 x 75 mm, machined split-face down'],
  ['Blank per half', '329 x 95 x 48 mm, grain along the length'],
  ['Thinnest wall', '6.3 mm (target 6 mm)'],
  ['Joinery', 'Four 6 x 19 mm beech dowels, glued into the right half only'],
  ['Board', 'LELEK_board_v7, 89.4 x 27.9 mm, 2 layers'],
  ['Battery', 'LiPo 503035, 3.7 V, 500 mAh, with protection board'],
  ['Charging', 'micro-USB under the tail, limited to 0.36 A'],
  ['Speaker', '8 ohm, 0.5 W, 40 mm, in a pocket in the chest'],
  ['Standby', 'Module unpowered; only cell protection and charger leakage'],
];

export const pockets = [
  ['Board bay', 'both', '14.37 mm', 'Board 27.9 mm wide plus 0.4 mm each side; 14 mm of headroom above it'],
  ['LiPo', 'both', '15.50 mm', '41 x 31 x 6 mm, under the middle of the board'],
  ['Charger', 'both', '9.25 mm', 'Micro-USB module, port towards the tail'],
  ['USB port', 'both', '6.50 mm', '13 x 7.5 mm channel from the charger out under the tail'],
  ['Speaker', 'left', '6.50 mm', '40.6 mm circle, cone facing the split face'],
  ['Sound chamber', 'right', '2.00 mm', '35.6 mm circle in front of the cone'],
  ['Grille slots', 'both', '1.00 mm', 'Four slots, 3 mm tall, from the chamber out through the chest'],
  ['Button channel', 'both', '4.20 mm', '8.4 mm square channel up to the board bay'],
  ['Pry notches', 'both', '1.50 mm', 'On the belly seam, for opening the bird without damage'],
  ['Dowel holes', 'both', '10 mm', 'Four holes, 6 mm brad-point drill'],
];

export const student = {
  name: 'Ondrej Špánik',
  role: 'Software engineering student, final year of the master’s programme',
  school: 'Faculty of Informatics and Information Technologies (FIIT), Slovak University of Technology in Bratislava',
  location: 'Bratislava, Slovakia',
  bio: [
    'I like seeing how the layers fit together, from hardware up to the user. LELEK is my project for the course Systems Thinking in IT and Digital Fabrication: take one object from idea to a finished piece, and document it as I go instead of at the end.',
    'I chose the nightjar because it is a bird you hear far more often than you see. My earlier work is mostly software and infrastructure: CI/CD with Docker and Nginx, Linux administration, and web front ends in Svelte.',
    'Away from the screen: working with wood by hand, hiking, photography, cooking and cats.',
  ],
  projects: [
    ['CI/CD for a team rental solution', 'Docker, GitHub Actions and two Nginx layers deploying multiple instances of an Angular + Django app. Team project at FIIT STU, 2024.'],
    ['Find-A-Cat', 'Bachelor’s thesis: pedigree management with a breeding algorithm.'],
    ['honeypot-ids', 'Master’s thesis work: a honeypot digital-twin environment.'],
    ['ProcExp', 'Procreate timelapse batch exporter (AutoHotkey, FFmpeg).'],
  ],
  skills: ['Embedded and AVR', 'Linux', 'Docker', 'CI/CD', 'Svelte', 'Python', 'Documentation', 'Git'],
  wants: [
    'Take a project through the whole chain: CAD, CAM, CNC, finished object.',
    'Run the CNC safely and sensibly: feeds, speeds, clamping, tools.',
    'Use 7Ds and SDLC as real frameworks, not formalities.',
  ],
  offers: [
    'Help with Arduino/AVR firmware: sleep modes, UART, battery measurement.',
    'Docusaurus, Git and documentation automation.',
    'A written guide to building sound and a battery into a glued wooden object, reusable for an owl, hoopoe or cuckoo.',
  ],
};

export const faq = [
  ['Can I order one now?', 'Not yet. The form on this page is switched off. The first prototype has not been carved, and the price shown is a target, not an offer.'],
  ['What will it cost?', 'The working hypothesis from the pitch is EUR 89 to 129 per bird, made to order: about EUR 35 of material, EUR 17.60 of electronics and roughly four hours of work including CNC time. This will be confirmed once the prototype is built.'],
  ['What does it sound like?', 'The sample on this site is a synthesised churr used while the circuit is developed. The final recording has not been chosen; it will be a freely licensed field recording of a European nightjar.'],
  ['How long does the battery last?', 'Not measured yet. Between presses the sound module is unpowered, so the drain is the cell protection and charger leakage. Measuring it on the built bird is a planned test.'],
  ['Can other birds or sounds be made?', 'The electronics are the same for any bird. An owl, hoopoe or cuckoo needs a new shape and a new sound file. Personalised engraving is part of the idea, not yet a promise.'],
  ['Is the design open?', 'Yes. The schematics, boards, enclosure model and build log are public. The documentation is licensed CC BY-NC-SA 4.0.'],
];

export const fieldNotes = [
  ['Name', 'European nightjar, Caprimulgus europaeus. In Slovak, lelek lesný.'],
  ['Heard, rarely seen', 'It hunts insects at dusk and through the night, and its bark-coloured plumage hides it against branches and the ground by day.'],
  ['The churr', 'The male’s song is a continuous, dry, mechanical trill that can run for minutes. It is the sound of heathland and forest edges on a warm summer night.'],
  ['Perching lengthwise', 'Unlike most birds, a nightjar often sits along a branch rather than across it. That long, low shape is what the carving follows.'],
  ['The model', 'A real nightjar is 24 to 28 cm long. LELEK is stylised, not a scan, and about 1.2x life size so the chest can hold a 40 mm speaker with 6 mm of wood around it.'],
];
