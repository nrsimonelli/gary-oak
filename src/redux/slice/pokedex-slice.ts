import { createSlice } from '@reduxjs/toolkit';

// add interface later
const initialState: any = {
  pokedex: [],
  data: [],
  loadingStates: [],
};

const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
    // will type later
    getStoredPokemon(state, action) {
      const { currentData } = action.payload;
      state.pokedex = currentData;
      state.data = [...currentData];
    },
    updateLoadingStates(state, action) {
      const { cardStatus } = action.payload;
      const pokemonName = cardStatus.name;
      const matchingEntry = state.loadingStates.findIndex(
        (x: { name: string }) => x.name === pokemonName
      );

      if (matchingEntry >= 0) {
        state.loadingStates[matchingEntry] = cardStatus;
      } else {
        state.loadingStates.push(cardStatus);
      }
    },
  },
});

export const { getStoredPokemon, updateLoadingStates } =
  pokedexSlice.actions;
export default pokedexSlice.reducer;
