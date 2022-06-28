import { createSlice } from '@reduxjs/toolkit'
import { Trainer } from '../../utils/docs'

const initialState: Trainer = {
  id: '',
  name: '',
  path: '',
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
    clearPlayer(state: Trainer) {
      return (state = initialState)
    },
  },
})

export const { setPlayer, clearPlayer } = playerSlice.actions
export default playerSlice.reducer
