export const SCREENS = {
  1: '640px',
  2: '768px',
  3: '1024px',
  4: '1280px',
} as const;

export const THEMES = {
  DARK: 'dark-theme',
  DEFAULT: 'default-theme',
} as const;

export const RIVALS = [
  {
    path: 'src/assets/rivals/garyblue.png',
    name: 'gary oak',
    badges: 8,
    pokemon: 16,
    victories: 127,
  },
  {
    path: 'src/assets/rivals/lance.png',
    name: 'lance wataru',
    badges: 8,
    pokemon: 22,
    victories: 341,
  },
  {
    path: 'src/assets/rivals/red.png',
    name: 'rival red',
    badges: 16,
    pokemon: 126,
    victories: 550,
  },
  {
    path: 'src/assets/rivals/steven.png',
    name: 'steven stone',
    badges: 12,
    pokemon: 68,
    victories: 495,
  },
  {
    path: 'src/assets/rivals/wallace.png',
    name: 'wallace mikuri',
    badges: 16,
    pokemon: 76,
    victories: 757,
  },
  {
    path: 'src/assets/rivals/cynthia.png',
    name: 'cynthia shirona',
    badges: 32,
    pokemon: 9,
    victories: 998,
  },
  {
    path: 'src/assets/rivals/alder.png',
    name: 'alder adeku',
    badges: 16,
    pokemon: 53,
    victories: 158,
  },
  {
    path: 'src/assets/rivals/iris.png',
    name: 'iris of unova',
    badges: 24,
    pokemon: 101,
    victories: 333,
  },
] as const;

export const TYPES = [
  'normal',
  'fire',
  'water',
  'grass',
  'electric',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dark',
  'dragon',
  'steel',
  'fairy',
] as const;

export const TEAM_GARY = [
  65, 130, 59, 3, 85, 34, 76, 125, 127, 22, 31, 51, 99, 101, 103, 136,
];
