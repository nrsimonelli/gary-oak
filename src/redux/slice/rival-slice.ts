import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RIVALS } from '../../constants';

interface RivalState {
  name: string;
  badges: number;
  pokemon: number;
  victories: number;
  path: string;
}

const initialState: RivalState = {
  name: 'gary oak',
  badges: 8,
  pokemon: 16,
  victories: 127,
  path: 'src/assets/rivals/garyblue.png',
};

const rivalSlice = createSlice({
  name: 'rival',
  initialState,
  reducers: {
    changeRival(state) {
      const rivalIndex =
        (RIVALS.findIndex((rival) => rival.name === state.name) + 1) %
        RIVALS.length;
      return (state = RIVALS[rivalIndex]);
    },
  },
});

export const { changeRival } = rivalSlice.actions;
export default rivalSlice.reducer;
