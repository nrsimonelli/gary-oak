import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import { getAllData, Trainer } from '../../utils/docs'
import { getInitialRival, persistCurrentRival } from '../../utils/localStorage'

interface State {
  selectedRival: string
  rivals: [] | Trainer[]
  status: string
  error: null | string | undefined
}

const initialRival = getInitialRival()

export const fetchRivals = createAsyncThunk('fetchRivals', async () => {
  const result = await getAllData()
  return result
})

const initialState: State = {
  selectedRival: initialRival,
  rivals: [],
  status: 'idle',
  error: null,
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
    setAllRivals(state: State, action: { payload: Trainer[] }) {
      const value = action.payload
      state.rivals = value
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRivals.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchRivals.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.rivals = action.payload
      })
      .addCase(fetchRivals.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const selectedRivalName = (state: RootState) => state.rival.selectedRival
export const { setRival, setAllRivals } = rivalSlice.actions
export default rivalSlice.reducer
