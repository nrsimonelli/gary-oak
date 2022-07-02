import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { z } from 'zod'
import { Pokemon } from '../../types'

const PokemonResponse = z.object({
  id: z.number(),
  name: z.string(),
  sprite: z.object({
    default: z.string(),
    shiny: z.string(),
    official: z.string(),
  }),
  hp: z.number(),
  attack: z.number(),
  defense: z.number(),
  'special-attack': z.number(),
  'special-defense': z.number(),
  speed: z.number(),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: z.string(),
        url: z.string(),
      }),
    })
  ),
})

export type PokemonResponse = z.infer<typeof PokemonResponse>

const deserializePokemon = (data: Pokemon) => ({
  id: data.id,
  name: data.name,
  sprite: {
    default: data.sprites?.front_default,
    shiny: data.sprites?.front_shiny,
    official: data.sprites.other['official-artwork']?.front_default,
  },
  hp: data.stats[0].base_stat,
  attack: data.stats[1].base_stat,
  defense: data.stats[2].base_stat,
  ['special-attack']: data.stats[3].base_stat,
  ['special-defense']: data.stats[4].base_stat,
  speed: data.stats[5].base_stat,
  types: data.types,
})

const deserializeSprites = (data: Pokemon) => ({
  id: data.id,
  name: data.name,
  sprite: {
    default: data.sprites?.front_default,
    shiny: data.sprites?.front_shiny,
    official: data.sprites.other['official-artwork']?.front_default,
  },
})

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
      transformResponse: (response: Pokemon) => deserializePokemon(response),
    }),
    getSpriteOnly: builder.query({
      query: (value: string) => `pokemon/${value}`,
      transformResponse: (response: Pokemon) => deserializeSprites(response),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetPokemonByNameQuery,
  useGetAllPokemonQuery,
  useGetSpriteOnlyQuery,
} = pokemonApiSlice
