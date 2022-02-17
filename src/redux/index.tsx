import { configureStore } from '@reduxjs/toolkit';
import pokedexSlice from './slice/pokedex-slice';
import { pokemonApiSlice } from './slice/pokemon-api';
import rivalSlice from './slice/rival-slice';

export const store = configureStore({
  reducer: {
    rival: rivalSlice,
    pokedex: pokedexSlice,
    [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(pokemonApiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
