export const pillars = {
  foundations: {
    name: 'Foundations',
    blurb: 'What the philosophy is, what it is not, and how to evaluate a card through it.',
  },
  interaction: {
    name: 'Cheap interaction',
    blurb: 'Discard and removal as mana-efficient trades: Thoughtseize, Fatal Push, Bolt.',
  },
  threats: {
    name: 'Efficient threats',
    blurb: 'Cards that matter on their own turn and need no support: Tarmogoyf, Ooze, Courser.',
  },
  value: {
    name: 'Grinding value',
    blurb: 'Turning 1-for-1 trades into 2-for-1s: Liliana, Kolaghan\u2019s Command, Huntmaster.',
  },
  role: {
    name: 'Role and information',
    blurb: 'Knowing when you are the beatdown, and what early disruption tells you.',
  },
  mana: {
    name: 'Mana and greed',
    blurb: 'Fetches, shocks, and the life you pay for consistency.',
  },
} as const;

export type PillarKey = keyof typeof pillars;
export const pillarKeys = Object.keys(pillars) as PillarKey[];
