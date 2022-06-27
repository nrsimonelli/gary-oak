import { configureStore } from '@reduxjs/toolkit'
import { pokemonApiSlice } from './slice/pokemon-api'
import rivalSlice from './slice/rival-slice'
import displaySlice from './slice/display-slice'
import playerSlice from './slice/player-slice'

export const store = configureStore({
  reducer: {
    display: displaySlice,
    player: playerSlice,
    rival: rivalSlice,
    [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      pokemonApiSlice.middleware
    )
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
