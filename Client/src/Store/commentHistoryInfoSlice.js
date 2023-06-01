/** Redux Toolkit 관련 Import */
import { createSlice } from '@reduxjs/toolkit';

/** Enum Import */
import { DISPATCH_TYPE } from '../Hooks/useDataFetcher';

const loadedCommentIds = new Set();

const changeCommentHistory = (state, newState) => {
  state.storedCommentHistory = newState;
};

const updateCommentHistoryAfterCreate = (state, response) => {
  changeCommentHistory(state, [].concat(...state.storedCommentHistory, response.comment));
};

const updateCommentHistoryAfterUpdate = (state, response) => {
  const commentIndex = state.storedCommentHistory.findIndex(
    (comment) => comment._id === response.comment._id
  );

  state.storedCommentHistory[commentIndex] = response.comment;
};

const updateCommentHistoryAfterGet = (state, response) => {
  const newHistory = [];

  response.forEach((newComment) => {
    if (loadedCommentIds.has(newComment._id)) {
      return;
    }

    newHistory.push(newComment);
    loadedCommentIds.add(newComment._id);
  });

  if (newHistory.length === 0) {
    return;
  }

  state.storedCommentHistory = [].concat(...newHistory, ...state.storedCommentHistory);
};

const updateCommentHistoryAfterDelete = (state, response) => {
  changeCommentHistory(
    state,
    state.storedCommentHistory.filter((comment) => comment._id !== response.comment._id)
  );
};

const commentHistorySlice = createSlice({
  name: 'commentHistory',
  initialState: {
    storedCommentHistory: [],
  },
  reducers: {
    updateCommentHistory: (state, action) => {
      const { dispatchType, response } = action.payload;

      const updateFunMap = {
        [DISPATCH_TYPE.CREATE_COMMENT]: () => updateCommentHistoryAfterCreate(state, response),
        [DISPATCH_TYPE.UPDATE_REACTION]: () => updateCommentHistoryAfterUpdate(state, response),
        [DISPATCH_TYPE.GET_HISTORY_BY_PAGE]: () => updateCommentHistoryAfterGet(state, response),
        [DISPATCH_TYPE.DELETE_COMMENT]: () => updateCommentHistoryAfterDelete(state, response),
      };

      updateFunMap[dispatchType]();
    },
  },
});

export default commentHistorySlice;

export const { updateCommentHistory } = commentHistorySlice.actions;
