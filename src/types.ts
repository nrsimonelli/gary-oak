export interface Pokemon {
  abilities: AbilitiesEntity[];
  base_experience: number;
  forms: PokemonURL[];
  game_indices: GameIndicesEntity[];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: MovesEntity[];
  name: string;
  order: number;
  past_types: [];
  species: PokemonURL;
  sprites: Sprites;
  stats: StatsEntity[];
  types: {
    slot: number;
    type: PokemonURL;
  }[];
  weight: number;
}
export interface AbilitiesEntity {
  ability: PokemonURL;
  is_hidden: boolean;
  slot: number;
}
export interface PokemonURL {
  name: string;
  url: string;
}
export interface GameIndicesEntity {
  game_index: number;
  version: PokemonURL;
}
export interface MovesEntity {
  move: PokemonURL;
  version_group_details: VersionGroupDetailsEntity[];
}
export interface VersionGroupDetailsEntity {
  level_learned_at: number;
  move_learn_method: PokemonURL;
  version_group: PokemonURL;
}
export interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: Other;
  versions: Versions;
}
export interface Other {
  dream_world: DreamWorldOrIcons;
  home: RSXYSM;
  ['official-artwork']: Official;
}
export interface DreamWorldOrIcons {
  front_default: string;
  front_female: null;
}
export interface RSXYSM {
  ['front_default']: string;
  ['front_female']: string;
  ['front_shiny']: string;
  ['front_shiny_female']: string;
}
export interface Official {
  front_default: string;
}
export interface Versions {
  ['generation-i']: Gen1;
  ['generation-ii']: Gen2;
  ['generation-iii']: Gen3;
  ['generation-iv']: Gen4;
  ['generation-v']: Gen5;
  ['generation-vi']: Gen6;
  ['generation-vii']: Gen7;
  ['generation-viii']: Gen8;
}
export interface Gen1 {
  ['red-blue']: RBY;
  yellow: RBY;
}
export interface RBY {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}
export interface Gen2 {
  crystal: Crystal;
  gold: GoldOrSilver;
  silver: GoldOrSilver;
}
export interface Crystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}
export interface GoldOrSilver {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
}
export interface Gen3 {
  emerald: Emerald;
  ['firered-leafgreen']: FrLgRS;
  ['ruby-sapphire']: FrLgRS;
}
export interface Emerald {
  front_default: string;
  front_shiny: string;
}
export interface FrLgRS {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}
export interface Gen4 {
  ['diamond-pearl']: DPHGSS;
  ['heartgold-soulsilver']: DPHGSS;
  platinum: DPHGSS;
}
export interface DPHGSS {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}
export interface Gen5 {
  ['black-white']: BW;
}
export interface BW {
  animated: DPHGSS;
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}
export interface Gen6 {
  ['omegaruby-alphasapphire']: RSXYSM;
  ['x-y']: RSXYSM;
}
export interface Gen7 {
  icons: DreamWorldOrIcons;
  ['ultra-sun-ultra-moon']: RSXYSM;
}
export interface Gen8 {
  icons: DreamWorldOrIcons;
}
export interface StatsEntity {
  base_stat: number;
  effort: number;
  stat: PokemonURL;
}
export interface TypesEntity {
  slot: number;
  type: PokemonURL;
}
