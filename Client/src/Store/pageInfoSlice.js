/** Redux Toolkit 관련 Import */
import { createSlice } from '@reduxjs/toolkit';

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: {
    currentPage: 1,
  },
  reducers: {
    nextPage: (state, action) => {
      state.currentPage++;
    },
  },
});

export default pageInfoSlice;

export const { nextPage } = pageInfoSlice.actions;
