import { createSlice } from '@reduxjs/toolkit'
import { z } from 'zod'
import { PokemonResponse } from './pokemon-api'
import { Trainer, updatePlayerData } from '../../utils/docs'

// add interface later
interface InitialState {
  featuredPokemon: PokemonResponse[]
}
const initialState: InitialState = {
  featuredPokemon: [],
}

const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    setFeaturedPokemon(
      state: InitialState,
      action: { payload: { data: PokemonResponse } }
    ) {
      const { data } = action.payload
      const array = state.featuredPokemon
      if (array.length === 3) {
        array.shift()
        array.push(data)
      }
      if (array.length < 3) {
        array.push(data)
      }
    },
    removeFeaturedPokemon(
      state: InitialState,
      action: { payload: { data: PokemonResponse } }
    ) {
      const { data } = action.payload
      const array = state.featuredPokemon
      const targetIndex = array.findIndex(
        (pokemon: { name: string }) => pokemon.name === data.name
      )
      if (targetIndex >= 0) {
        array.splice(targetIndex, 1)
      }
    },
    clearFeaturedPokemon(state: InitialState) {
      state.featuredPokemon = []
    },
  },
})

export const {
  setFeaturedPokemon,
  removeFeaturedPokemon,
  clearFeaturedPokemon,
} = displaySlice.actions
export default displaySlice.reducer
