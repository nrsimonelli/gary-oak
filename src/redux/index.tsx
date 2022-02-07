import { configureStore } from '@reduxjs/toolkit';
import { pokemonApiSlice } from './slice/pokemon-api';
import rivalSlice from './rivalStats/rival-slice';

export const store = configureStore({
  reducer: {
    rival: rivalSlice,
    [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(pokemonApiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
