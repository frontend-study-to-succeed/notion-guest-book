import { createContext, useReducer } from 'react';

const CommentStateContext = createContext(null);
const CommentDispatchContext = createContext(null);

const COMMENT_ACTION = {
  LOAD: 'load',
  POST: 'post',
};

const commentReducer = ({ action, state }) => {
  switch (action.type) {
    case COMMENT_ACTION.LOAD:
      break;

    case COMMENT_ACTION.POST:
      break;

    default:
      return state;
  }
};

const initialState = {};

export default function CommentProvider({ children }) {
  const [state, dispatch] = useReducer(commentReducer, initialState);

  return (
    <CommentStateContext.Provider value={state}>
      <CommentDispatchContext.Provider value={dispatch}>{children}</CommentDispatchContext.Provider>
    </CommentStateContext.Provider>
  );
}
