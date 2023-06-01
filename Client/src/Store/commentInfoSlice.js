/** Redux Toolkit 관련 Import */
import { createSlice } from '@reduxjs/toolkit';

const commentInfoSlice = createSlice({
  name: 'commentInfo',
  initialState: {
    commentDate: null,
    commentType: 3,
    commentContent: null,
    commentReaction: [],
    commentReply: null,
  },
  reducers: {
    updateCommentDate: (state, action) => {
      state.commentDate = action.payload.date;
    },
    updateCommentType: (state, action) => {
      state.commentType = action.payload;
    },
    updateCommentContent: (state, action) => {
      state.commentContent = action.payload;
    },
    updateCommentReaction: (state, action) => {
      state.commentReaction = action.payload;
    },
    updateCommentReply: (state, action) => {
      state.commentReply = action.payload;
    },
  },
});

export default commentInfoSlice;

export const {
  updateCommentDate,
  updateCommentType,
  updateCommentContent,
  updateCommentReaction,
  updateCommentReply,
} = commentInfoSlice.actions;
