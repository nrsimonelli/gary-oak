import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RIVAL_LIST } from '../../constants';

interface RivalState {
  name: string;
  path: string;
  pokemon: { name: string; isStarter: boolean }[];
}

const initialState: RivalState = {
  name: 'red',
  path: 'src/assets/rivals/red.png',
  pokemon: [],
};

const rivalSlice = createSlice({
  name: 'rival',
  initialState,
  reducers: {
    changeRival(state): RivalState {
      const rivalIndex =
        (RIVAL_LIST.findIndex((rival) => rival.name === state.name) +
          1) %
        RIVAL_LIST.length;
      return (state = RIVAL_LIST[rivalIndex]);
    },
  },
});

export const { changeRival } = rivalSlice.actions;
export default rivalSlice.reducer;
