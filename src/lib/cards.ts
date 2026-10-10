export const tests = [
  { key: 'alone', short: 'Alone', label: 'Good on its own', q: 'Is it good with no other cards in the deck?' },
  { key: 'trades', short: 'Trades', label: 'Trades evenly or better', q: 'Does it trade evenly, or better, with what the opponent is likely to play?' },
  { key: 'lategame', short: 'Late', label: 'Relevant all game', q: 'Does it do something on every turn of the game, early and late?' },
] as const;
export type TestKey = (typeof tests)[number]['key'];
/** How fully a card passes a test, 0-3. */
export const levels = ['No', 'Barely', 'Mostly', 'Fully'] as const;
export type Scores = Record<TestKey, number>;
export const total = (s: Scores) => s.alone + s.trades + s.lategame;
export const slugify = (n: string) =>
  n.toLowerCase().replace(/[\u2019']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const normName = (n: string) => n.replace(/\u2019/g, "'").trim().toLowerCase();
