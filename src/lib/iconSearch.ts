// Finding an icon by the service it stands for, not by the icon's own name.
//
// The picker used to match lucide icon *names* only, so typing what an admin
// actually means — "yoga", "massage", "website", "plumber" — found nothing: no
// lucide icon is called that. Search now goes to Iconify (200k+ icons across
// the sets below), and every word is first widened through SERVICE_TERMS into
// the words icon designers really used: a "website" is a web page or a
// browser, a "plumber" is a pipe or a faucet.
//
// The stored value is an Iconify id ("mdi:yoga"). Plain lucide names
// ("wrench") from before keep working everywhere they are rendered.

const API = 'https://api.iconify.design/search';

/**
 * Monochrome sets only, so every category tile takes the theme colour the same
 * way. Order is preference: earlier sets win ties in the results.
 */
export const ICON_SETS = [
  'mdi', 'material-symbols', 'tabler', 'healthicons', 'ph', 'lucide', 'icon-park-outline', 'fluent', 'carbon',
];

/**
 * Service words → what to search for. Keys are lower-case; a key may be a
 * phrase ("mobile app"), which is matched before its single words. Hindi and
 * Hinglish trade names map to the same terms as their English ones.
 */
export const SERVICE_TERMS: Record<string, string[]> = {
  // health & care
  medical: ['medical', 'hospital', 'stethoscope', 'medicine'],
  doctor: ['doctor', 'stethoscope', 'medical'],
  nurse: ['nurse', 'medical', 'hospital'],
  nursing: ['nurse', 'medical'],
  physiotherapy: ['physical-therapy', 'accessibility', 'walking'],
  physiotherapist: ['physical-therapy', 'accessibility'],
  patient: ['patient', 'hospital-bed', 'wheelchair'],
  elderly: ['elderly', 'cane', 'old'],
  senior: ['elderly', 'cane'],
  baby: ['baby', 'baby-carriage', 'stroller'],
  babysitter: ['baby', 'child'],
  nanny: ['baby', 'child'],
  child: ['child', 'baby', 'kid'],
  childcare: ['child', 'baby'],
  massage: ['massage', 'spa', 'hand-heart'],
  spa: ['spa', 'massage', 'lotus'],
  wellness: ['spa', 'lotus', 'heart-pulse'],
  yoga: ['yoga', 'meditation', 'lotus'],
  meditation: ['meditation', 'yoga', 'lotus'],
  gym: ['gym', 'dumbbell', 'weight-lifter', 'fitness'],
  fitness: ['fitness', 'dumbbell', 'run'],
  trainer: ['dumbbell', 'whistle', 'fitness'],
  // home & furniture
  bed: ['bed', 'bed-double', 'sleep'],
  mattress: ['bed', 'mattress'],
  sofa: ['sofa', 'couch'],
  furniture: ['sofa', 'chair', 'table-furniture', 'wardrobe'],
  carpenter: ['saw', 'hammer', 'wood', 'carpenter'],
  'बढ़ई': ['saw', 'hammer', 'wood'],
  door: ['door', 'door-open'],
  window: ['window', 'window-closed'],
  lock: ['lock', 'key'],
  locksmith: ['key', 'lock'],
  key: ['key'],
  kitchen: ['kitchen', 'stove', 'chef-hat'],
  chimney: ['chimney', 'fire', 'smoke'],
  home: ['home', 'house'],
  house: ['home', 'house'],
  cleaning: ['broom', 'spray-bottle', 'vacuum', 'sparkles'],
  cleaner: ['broom', 'vacuum'],
  clean: ['broom', 'spray-bottle'],
  toilet: ['toilet', 'paper-roll'],
  bathroom: ['bathtub', 'shower', 'toilet'],
  maid: ['broom', 'woman', 'housekeeping'],
  housekeeping: ['broom', 'vacuum', 'room-service'],
  laundry: ['washing-machine', 'tshirt', 'iron'],
  ironing: ['iron', 'tshirt'],
  pest: ['bug', 'spray', 'rodent'],
  termite: ['bug', 'termite'],
  mosquito: ['mosquito', 'bug'],
  garden: ['flower', 'tree', 'shovel', 'leaf'],
  gardener: ['flower', 'shovel', 'leaf'],
  'माली': ['flower', 'shovel', 'leaf'],
  lawn: ['grass', 'lawn-mower'],
  // trades
  plumber: ['pipe', 'faucet', 'water-pump', 'plumbing'],
  plumbing: ['pipe', 'faucet', 'plumbing'],
  'प्लंबर': ['pipe', 'faucet'],
  electrician: ['lightning-bolt', 'flash', 'electric', 'power-plug'],
  electrical: ['lightning-bolt', 'electric', 'power-plug'],
  bijli: ['lightning-bolt', 'flash', 'electric'],
  'बिजली': ['lightning-bolt', 'flash'],
  wiring: ['cable', 'power-plug', 'electric'],
  painter: ['paint-roller', 'brush', 'palette', 'format-paint'],
  painting: ['paint-roller', 'format-paint', 'brush'],
  'पेंटर': ['paint-roller', 'brush'],
  mason: ['wall', 'bricks', 'trowel'],
  mistri: ['tools', 'hammer', 'wrench'],
  'राजमिस्त्री': ['wall', 'bricks'],
  construction: ['hard-hat', 'crane', 'excavator', 'wall'],
  labour: ['hard-hat', 'worker', 'account-hard-hat'],
  labor: ['hard-hat', 'worker'],
  worker: ['hard-hat', 'worker', 'account-hard-hat'],
  helper: ['hand-heart', 'handshake', 'account'],
  contractor: ['hard-hat', 'clipboard', 'briefcase'],
  welder: ['welding', 'fire', 'mask'],
  welding: ['welding', 'fire'],
  tiles: ['floor', 'grid', 'tile'],
  marble: ['floor', 'texture'],
  waterproofing: ['water-off', 'umbrella', 'droplet'],
  glass: ['window', 'glass'],
  repair: ['wrench', 'tools', 'hammer-wrench'],
  mechanic: ['wrench', 'car-wrench', 'tools'],
  technician: ['tools', 'wrench', 'cog'],
  // appliances
  ac: ['air-conditioner', 'snowflake', 'fan'],
  'ac repair': ['air-conditioner', 'snowflake'],
  'air conditioner': ['air-conditioner', 'snowflake'],
  fridge: ['fridge', 'refrigerator'],
  refrigerator: ['fridge', 'refrigerator'],
  'washing machine': ['washing-machine'],
  tv: ['television', 'tv'],
  television: ['television', 'tv'],
  microwave: ['microwave', 'stove'],
  geyser: ['water-boiler', 'water-heater', 'fire'],
  ro: ['water-filter', 'water', 'cup-water'],
  purifier: ['water-filter', 'air-purifier'],
  fan: ['fan', 'ceiling-fan'],
  cooler: ['fan', 'snowflake'],
  inverter: ['battery', 'power', 'flash'],
  battery: ['battery'],
  solar: ['solar-panel', 'solar-power', 'sun'],
  pump: ['water-pump', 'pump'],
  cctv: ['cctv', 'camera', 'security'],
  // vehicles & transport
  car: ['car', 'car-wrench'],
  bike: ['motorbike', 'bike', 'scooter'],
  scooter: ['scooter', 'motorbike'],
  truck: ['truck', 'truck-delivery'],
  tractor: ['tractor'],
  bus: ['bus'],
  driver: ['steering', 'car', 'account-tie'],
  taxi: ['taxi', 'car'],
  transport: ['truck', 'van', 'transport'],
  movers: ['truck', 'package', 'box'],
  packers: ['package', 'box', 'archive'],
  delivery: ['truck-delivery', 'package', 'moped'],
  courier: ['package', 'truck-delivery'],
  parcel: ['package', 'box'],
  // IT & digital
  software: ['code', 'application', 'laptop-code', 'apps'],
  website: ['web', 'web-page', 'browser', 'world-www'],
  web: ['web', 'browser', 'world-www'],
  'mobile app': ['cellphone', 'smartphone', 'apps', 'application'],
  app: ['apps', 'application', 'cellphone'],
  mobile: ['cellphone', 'smartphone', 'phone'],
  phone: ['cellphone', 'phone', 'smartphone'],
  iphone: ['apple', 'cellphone'],
  laptop: ['laptop'],
  computer: ['desktop', 'monitor', 'computer'],
  pc: ['desktop', 'monitor'],
  printer: ['printer'],
  network: ['wifi', 'router', 'lan'],
  wifi: ['wifi', 'router'],
  coding: ['code', 'xml', 'terminal'],
  programming: ['code', 'terminal'],
  developer: ['code', 'laptop-code'],
  design: ['palette', 'pen-tool', 'vector'],
  marketing: ['bullhorn', 'megaphone', 'chart-line'],
  seo: ['search', 'chart-line', 'web'],
  ads: ['bullhorn', 'advertisements'],
  video: ['video', 'movie', 'camera'],
  photography: ['camera', 'image'],
  photographer: ['camera'],
  data: ['database', 'chart'],
  cloud: ['cloud', 'server'],
  server: ['server', 'cloud'],
  // education
  teacher: ['school', 'teach', 'human-male-board', 'book-open'],
  tutor: ['school', 'teach', 'book-open', 'human-male-board'],
  tuition: ['school', 'book-open', 'pencil'],
  school: ['school'],
  coaching: ['school', 'book-education', 'trophy'],
  training: ['school', 'certificate', 'presentation'],
  english: ['translate', 'alphabet', 'book'],
  music: ['music', 'guitar', 'piano'],
  dance: ['dance', 'human-female-dance'],
  art: ['palette', 'brush'],
  // tailoring & beauty
  tailor: ['sewing', 'needle', 'scissors', 'tape-measure'],
  darzi: ['sewing', 'needle', 'scissors'],
  stitching: ['sewing', 'needle', 'thread'],
  sewing: ['sewing', 'needle'],
  alteration: ['scissors', 'tape-measure'],
  embroidery: ['sewing', 'needle', 'flower'],
  fashion: ['tshirt', 'hanger', 'dress'],
  clothing: ['tshirt', 'hanger'],
  salon: ['hair-dryer', 'content-cut', 'face-woman', 'scissors'],
  barber: ['content-cut', 'razor', 'mustache'],
  haircut: ['content-cut', 'scissors', 'hair-dryer'],
  hair: ['hair-dryer', 'content-cut'],
  nai: ['content-cut', 'razor'],
  beauty: ['lipstick', 'face-woman', 'mirror'],
  makeup: ['lipstick', 'brush', 'mirror'],
  mehndi: ['hand', 'flower'],
  nail: ['nail', 'hand'],
  // food & events
  cook: ['chef-hat', 'pot', 'stove'],
  chef: ['chef-hat'],
  catering: ['food', 'silverware', 'tray'],
  food: ['food', 'silverware'],
  tiffin: ['food', 'lunch'],
  bakery: ['bread', 'cake', 'cupcake'],
  waiter: ['room-service', 'tray', 'glass-wine'],
  event: ['party-popper', 'calendar-star', 'balloon'],
  wedding: ['ring', 'heart', 'party-popper'],
  decorator: ['balloon', 'flower', 'party-popper'],
  tent: ['tent'],
  sound: ['speaker', 'microphone'],
  dj: ['speaker', 'music'],
  security: ['shield', 'security', 'police'],
  guard: ['shield', 'police', 'security'],
  // office & business
  office: ['briefcase', 'office-building', 'desk'],
  accountant: ['calculator', 'finance', 'receipt'],
  accounting: ['calculator', 'finance'],
  gst: ['receipt', 'file-document', 'percent'],
  tax: ['receipt', 'percent', 'calculator'],
  lawyer: ['scale-balance', 'gavel', 'law'],
  legal: ['scale-balance', 'gavel'],
  sales: ['chart-line', 'cash', 'handshake'],
  support: ['headset', 'face-agent', 'help'],
  telecaller: ['headset', 'phone'],
  hr: ['account-group', 'id-card'],
  // retail & warehouse
  shop: ['store', 'storefront', 'shopping'],
  store: ['store', 'storefront'],
  cashier: ['cash-register', 'cash'],
  warehouse: ['warehouse', 'forklift', 'package'],
  inventory: ['package', 'clipboard-list'],
  // agriculture & animals
  farm: ['tractor', 'barn', 'sprout'],
  farming: ['tractor', 'sprout', 'wheat'],
  agriculture: ['tractor', 'sprout', 'wheat'],
  harvest: ['wheat', 'sickle'],
  dairy: ['cow', 'milk'],
  cattle: ['cow'],
  poultry: ['chicken', 'egg'],
  fish: ['fish'],
  tree: ['tree', 'pine-tree'],
  plant: ['sprout', 'flower', 'leaf'],
  // water & misc
  water: ['water', 'droplet', 'water-pump'],
  tank: ['water-tank', 'water'],
  drain: ['pipe', 'water'],
  sewer: ['pipe', 'manhole'],
  rental: ['key', 'calendar-clock', 'handshake'],
  rent: ['key', 'calendar'],
  signboard: ['sign', 'billboard'],
};

const STOP_WORDS = new Set(['&', 'and', 'or', 'the', 'for', 'of', 'a', 'an', 'services', 'service', 'work', '/', '-']);

/** The search terms a query stands for, best first. */
export function expandQuery(raw: string): string[] {
  const text = raw.trim().toLowerCase();
  if (!text) return [];
  const terms: string[] = [];
  const add = (t: string) => { if (t && !terms.includes(t)) terms.push(t); };

  // Phrases first, so "mobile app" is not read as "mobile" + "app" alone.
  let rest = ` ${text} `;
  for (const phrase of Object.keys(SERVICE_TERMS).filter((k) => k.includes(' ')).sort((a, b) => b.length - a.length)) {
    if (rest.includes(` ${phrase} `)) {
      SERVICE_TERMS[phrase].forEach(add);
      rest = rest.replace(` ${phrase} `, ' ');
    }
  }
  for (const word of rest.split(/[\s,/()&+-]+/).filter((w) => w && !STOP_WORDS.has(w))) {
    // Plural service names ("plumbers", "teachers") reach their singular entry.
    const known = SERVICE_TERMS[word] ?? SERVICE_TERMS[word.replace(/(es|s)$/, '')];
    if (known) known.forEach(add);
    else if (/^[a-z0-9-]{2,}$/.test(word)) add(word);
  }
  return terms.slice(0, 8);
}

/** An Iconify id: "prefix:name". */
export function isIconifyId(icon?: string | null): icon is string {
  return !!icon && /^[a-z0-9]+(-[a-z0-9]+)*:[a-z0-9]+(-[a-z0-9]+)*$/.test(icon);
}

const cache = new Map<string, string[]>();

async function searchTerm(term: string, limit: number, signal?: AbortSignal): Promise<string[]> {
  const cacheKey = `${term}|${limit}`;
  const hit = cache.get(cacheKey);
  if (hit) return hit;
  const url = `${API}?query=${encodeURIComponent(term)}&limit=${limit}&prefixes=${ICON_SETS.join(',')}`;
  const res = await fetch(url, { signal });
  if (!res.ok) return [];
  const body = (await res.json()) as { icons?: string[] };
  const icons = (body.icons ?? []).filter(isIconifyId);
  cache.set(cacheKey, icons);
  return icons;
}

/**
 * Icons for what the admin typed, interleaved across the expanded terms so the
 * first row holds one good match per meaning rather than twenty variants of
 * the first word. Throws only on a network failure, which the picker reports.
 */
export async function searchIcons(query: string, { limit = 64, signal }: { limit?: number; signal?: AbortSignal } = {}): Promise<string[]> {
  const terms = expandQuery(query);
  if (!terms.length) return [];
  const per = Math.max(16, Math.ceil(limit / terms.length) * 2);
  const lists = await Promise.all(terms.map((t) => searchTerm(t, per, signal).catch((e) => {
    if ((e as Error)?.name === 'AbortError') throw e;
    return [] as string[];
  })));

  const out: string[] = [];
  for (let i = 0; out.length < limit && lists.some((l) => i < l.length); i++) {
    for (const list of lists) {
      const id = list[i];
      if (id && !out.includes(id)) out.push(id);
      if (out.length >= limit) break;
    }
  }
  return out;
}
