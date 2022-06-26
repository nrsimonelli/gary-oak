import { createSlice } from '@reduxjs/toolkit'
import { z } from 'zod'
import { PokemonURL } from '../../types'
import { Trainer } from '../../utils/docs'

// const PokemonOnly = Trainer.pick({ pokemon: true })
// type PokemonOnly = z.infer<typeof PokemonOnly>

// interface State {
//   featuredPokemon: []
// }
// add interface later
const initialState: any = {
  featuredPokemon: [],
}

const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    setFeaturedPokemon(state, action: { payload: { data: any } }) {
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
    removeFeaturedPokemon(state, action) {
      const { data } = action.payload
      const array = state.featuredPokemon
      const targetIndex = array.findIndex(
        (pokemon: { name: string }) => pokemon.name === data.name
      )
      if (targetIndex >= 0) {
        array.splice(targetIndex, 1)
      }
    },
    clearFeaturedPokemon(state) {
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
