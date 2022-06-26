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
      console.log('setting player', data)
      return (state = { ...state, ...data })
    },
    clearPlayer(state: Trainer) {
      console.log('clearing player state')
      return (state = initialState)
    },
  },
})

export const { setPlayer, clearPlayer } = playerSlice.actions
export default playerSlice.reducer
