const order = ['W', 'U', 'B', 'R', 'G'];
const names: Record<string, string> = {
  W: 'Mono-white', U: 'Mono-blue', B: 'Mono-black', R: 'Mono-red', G: 'Mono-green',
  WU: 'Azorius', WB: 'Orzhov', WR: 'Boros', WG: 'Selesnya', UB: 'Dimir', UR: 'Izzet', UG: 'Simic',
  BR: 'Rakdos', BG: 'Golgari', RG: 'Gruul',
  WUB: 'Esper', WUR: 'Jeskai', WUG: 'Bant', WBR: 'Mardu', WBG: 'Abzan', WRG: 'Naya',
  UBR: 'Grixis', UBG: 'Sultai', URG: 'Temur', BRG: 'Jund',
};
export function colorName(colors: string[]): string {
  const key = order.filter((c) => colors.includes(c)).join('');
  if (!key) return 'Colorless';
  if (key.length >= 4) return key.length === 5 ? 'Five-color' : 'Four-color';
  return names[key] ?? key;
}
export const colorCost = (colors: string[]) => order.filter((c) => colors.includes(c)).map((c) => `{${c}}`).join('');
