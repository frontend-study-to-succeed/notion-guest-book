/** Redux Toolkit 관련 Import */
import { createSlice } from '@reduxjs/toolkit';

const fetchingStateSlice = createSlice({
  name: 'fetchingState',
  initialState: {
    dispatchType: null,
    isSuccess: false,
    isLoading: true,
    isError: false,
    error: null,
  },
  reducers: {
    updateFetchingState: (state, action) => {
      const { dispatchType, isSuccess, isLoading, isError, error } = action.payload;

      state.dispatchType = dispatchType !== undefined ? dispatchType : state.dispatchType;
      state.isSuccess = isSuccess !== undefined ? isSuccess : state.isSuccess;
      state.isLoading = isLoading !== undefined ? isLoading : state.isLoading;
      state.isError = isError !== undefined ? isError : state.isError;
      state.error = error !== undefined ? error : state.error;
    },
  },
});

export default fetchingStateSlice;

export const { updateFetchingState } = fetchingStateSlice.actions;
