import { useEffect, useState } from 'react';
import useFetchingState from './useFetchingState';

import {
  compareCommentPassword,
  deleteComment,
  getCommentsByPage,
  postComment,
  updateReaction,
} from '../API/index.js';

const DISPATCH_TYPE = {
  CREATE_COMMENT: 0,
  UPDATE_REACTION: 1,
  GET_HISTORY_BY_PAGE: 2,
  DELETE_COMMENT: 3,

  COMPARE_PASSWORD: 4,
};

const tempCallback = () => {};

const useDataFetcher = () => {
  const { fetchingState, changeFetcingState } = useFetchingState();

  const [dispatchType, setDispatchType] = useState(null);
  const [fetchedResponse, setFetchedResponse] = useState(null);

  const [callbacks, setCallbacks] = useState({
    onSuccess: tempCallback,
    onError: tempCallback,
  });

  useEffect(() => {
    if (!fetchingState.isSuccess) {
      return;
    }

    callbacks.onSuccess(dispatchType, fetchedResponse);
  }, [dispatchType, fetchedResponse]);

  const executeAPI = async (dispatchAPI, ...data) => {
    changeFetcingState({ isSuccess: false, isLoading: true, isError: false, error: null });

    try {
      const response = await dispatchAPI(...data);

      changeFetcingState({
        isSuccess: true,
        isLoading: false,
        isError: false,
        error: null,
      });

      setFetchedResponse(response);
    } catch (error) {
      changeFetcingState({
        isSuccess: false,
        data: null,
        isLoading: false,
        isError: true,
        error: error.message || 'Failed to fetch',
      });

      callbacks.onError(dispatchType, error);
    }
  };

  const dataDispatch = (dispatchType, callbacks, ...data) => {
    setDispatchType(dispatchType);
    setCallbacks((prevCallbacks) => ({ ...prevCallbacks, ...callbacks }));

    switch (dispatchType) {
      case DISPATCH_TYPE.CREATE_COMMENT:
        executeAPI(postComment, ...data);
        break;

      case DISPATCH_TYPE.UPDATE_REACTION:
        executeAPI(updateReaction, ...data);
        break;

      case DISPATCH_TYPE.GET_HISTORY_BY_PAGE:
        executeAPI(getCommentsByPage, ...data);
        break;

      case DISPATCH_TYPE.DELETE_COMMENT:
        executeAPI(deleteComment, ...data);
        break;

      case DISPATCH_TYPE.COMPARE_PASSWORD:
        executeAPI(compareCommentPassword, ...data);
        break;

      default:
    }
  };

  return { dataDispatch };
};

export default useDataFetcher;

export { DISPATCH_TYPE };
