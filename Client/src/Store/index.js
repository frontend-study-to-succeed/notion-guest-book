/** Redux Toolkit 관련 Import */
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

/** Slice */
import commentInfoSlice from './commentInfoSlice';
import userInfoSlice from './userInfoSlice';
import modalInfoSlice from './modalInfoSlice';
import pageInfoSlice from './pageInfoSlice';
import commentHistorySlice from './commentHistoryInfoSlice';
import fetchingStateSlice from './fetchingStateSlice';

const store = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
    commentInfo: commentInfoSlice.reducer,
    modalInfo: modalInfoSlice.reducer,
    pageInfo: pageInfoSlice.reducer,
    commentHistoryInfo: commentHistorySlice.reducer,

    fetchingState: fetchingStateSlice.reducer,
  },
  middleware: [thunk],
});

export { store };

export {
  commentInfoSlice,
  userInfoSlice,
  modalInfoSlice,
  pageInfoSlice,
  commentHistorySlice,
  fetchingStateSlice,
};
