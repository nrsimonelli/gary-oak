import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon } from '../../types';

const deserializePokemon = (data: Pokemon) => ({
  id: data.id,
  name: data.name,
  sprite:
    data.sprites.other['official-artwork']?.front_default ??
    data.sprites?.front_default,
  hp: data.stats[0].base_stat,
  attack: data.stats[1].base_stat,
  defense: data.stats[2].base_stat,
  ['special-attack']: data.stats[3].base_stat,
  ['special-defense']: data.stats[4].base_stat,
  speed: data.stats[5].base_stat,
  types: data.types,
});

export const pokemonApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (builder) => ({
    getAllPokemon: builder.query<any[], any>({
      query: ({ limit, offset }) => `pokemon/?limit=${limit}&offset=${offset}`,
      transformResponse: (response: any) => response.results,
    }),
    getPokemonByName: builder.query({
      query: (value: string | number) => `pokemon/${value}`,
      transformResponse: (response: any) => deserializePokemon(response),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetPokemonByNameQuery, useGetAllPokemonQuery } =
  pokemonApiSlice;
