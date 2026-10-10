import { normName } from './cards';
export type Group = { title: string; cards: { qty: number; name: string }[] };
/** Lines starting with # start a group; other lines look like "4 Tarmogoyf". */
export function parseDeck(text: string): Group[] {
  const groups: Group[] = [];
  let cur: Group = { title: '', cards: [] };
  groups.push(cur);
  for (const raw of text.trim().split('\n')) {
    const l = raw.trim();
    if (!l) continue;
    if (l.startsWith('#')) { cur = { title: l.replace(/^#+\s*/, ''), cards: [] }; groups.push(cur); continue; }
    const m = l.match(/^(\d+)x?\s+(.+)$/);
    if (m) cur.cards.push({ qty: Number(m[1]), name: m[2] });
  }
  return groups.filter((g) => g.cards.length);
}
export const deckCardNames = (main: string, side = '') =>
  new Set([...parseDeck(main), ...parseDeck(side)].flatMap((g) => g.cards.map((c) => normName(c.name))));
