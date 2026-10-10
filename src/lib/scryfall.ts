import printings from '../data/printings.json';

// Card images and artwork. If a card has been resolved by `npm run art`, its ORIGINAL printing is used;
// otherwise this falls back to Scryfall's default printing.
const key = (n: string) => n.replace(/\u2019/g, "'");
const table = printings as Record<string, Record<string, string>>;
const base = 'https://api.scryfall.com/cards/named?format=image';

export const imgUrl = (name: string, version = 'normal'): string =>
  table[key(name)]?.[version] ?? `${base}&version=${version}&exact=${encodeURIComponent(key(name))}`;

/** Cropped card artwork, 626x457. */
export const artUrl = (name: string) => imgUrl(name, 'art_crop');
