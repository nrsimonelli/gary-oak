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
  { path: 'src/assets/rivals/garyblue.png', name: 'gary oak' },
  { path: 'src/assets/rivals/lance.png', name: 'lance wataru' },
  { path: 'src/assets/rivals/red.png', name: 'rival red' },
  { path: 'src/assets/rivals/steven.png', name: 'steven stone' },
  {
    path: 'src/assets/rivals/wallace.png',
    name: 'wallace mikuri',
  },
  {
    path: 'src/assets/rivals/cynthia.png',
    name: 'cynthia shirona',
  },
  { path: 'src/assets/rivals/alder.png', name: 'alder adeku' },
  { path: 'src/assets/rivals/iris.png', name: 'iris of unova' },
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
