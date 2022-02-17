import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

interface Pokedex {
  name: string;
  url: string;
}

export const pokemonApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (builder) => ({
    getAllPokemon: builder.query<any[], any>({
      query: ({ limit, offset }) =>
        `pokemon/?limit=${limit}&offset=${offset}`,
      transformResponse: (response: any) => response.results,
    }),
    getPokemonByName: builder.query({
      query: (value: string | number) => `pokemon/${value}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetPokemonByNameQuery, useGetAllPokemonQuery } =
  pokemonApiSlice;
