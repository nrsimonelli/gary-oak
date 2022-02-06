import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export const pokemonApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (value: string | number) => `pokemon/${value}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetPokemonByNameQuery } = pokemonApiSlice;
