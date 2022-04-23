import { createSlice } from '@reduxjs/toolkit';

// add interface later
const initialState: any = {
  featuredPokemon: [],
};

const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
    setFeaturedPokemon(state, action) {
      const { data } = action.payload;
      const array = state.featuredPokemon;
      if (array.length === 3) {
        array.shift();
        array.push(data);
      }
      if (!array.length || array.length < 3) {
        array.push(data);
      }
    },
    removeFeaturedPokemon(state, action) {
      const { data } = action.payload;
      const array = state.featuredPokemon;
      const targetIndex = array.findIndex(
        (pokemon: { name: string }) => pokemon.name === data.name
      );
      if (targetIndex >= 0) {
        array.splice(targetIndex, 1);
      }
    },
    clearFeaturedPokemon(state) {
      state.featuredPokemon = [];
    },
  },
});

export const {
  setFeaturedPokemon,
  removeFeaturedPokemon,
  clearFeaturedPokemon,
} = pokedexSlice.actions;
export default pokedexSlice.reducer;
