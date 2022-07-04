import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import { Trainer } from '../../utils/docs'

const initialState: Trainer = {
  id: '',
  name: '',
  path: 0,
  pokemon: [],
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayer(state: Trainer, action: { payload: { data: Trainer } }) {
      const { data } = action.payload
      return (state = { ...state, ...data })
    },
    addPokemon(
      state: Trainer,
      action: {
        payload: {
          pokemonToAdd: { id: number; name: string; isStarter: boolean }
        }
      }
    ) {
      const { pokemonToAdd } = action.payload
      state.pokemon.push(pokemonToAdd)
      return state
    },
    clearPlayer(state: Trainer) {
      return (state = initialState)
    },
  },
})

export const player = (state: RootState) => state.player
export const { setPlayer, clearPlayer, addPokemon } = playerSlice.actions
export default playerSlice.reducer
