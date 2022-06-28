import { createSlice } from '@reduxjs/toolkit'
import { getAllData, Trainer } from '../../utils/docs'
import { getInitialRival, persistCurrentRival } from '../../utils/localStorage'

interface State {
  selectedRival: string
  rivals: Trainer[]
}

const initialRival = getInitialRival()
const initialRivals = await getAllData()

const initialState: State = {
  selectedRival: initialRival,
  rivals: initialRivals,
}

const rivalSlice = createSlice({
  name: 'rival',
  initialState,
  reducers: {
    setRival(state: State, action: { payload: { tag: string } }) {
      const value = action.payload.tag
      if (state.rivals.find((rival) => rival.id === value)) {
        persistCurrentRival(value)
      }
      state.selectedRival = value
    },
  },
})

export const { setRival } = rivalSlice.actions
export default rivalSlice.reducer
