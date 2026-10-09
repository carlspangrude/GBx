// Card images and artwork come from Scryfall's image endpoint.
const base = 'https://api.scryfall.com/cards/named?format=image';
export const imgUrl = (name: string, version = 'normal') =>
  `${base}&version=${version}&exact=${encodeURIComponent(name)}`;
/** Cropped card artwork, 626x457. */
export const artUrl = (name: string) => imgUrl(name, 'art_crop');
