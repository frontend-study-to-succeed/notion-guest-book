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
    changeFetcingState((prevState) => ({
      ...prevState,
      isSuccess: false,
      isLoading: true,
      isError: false,
      error: null,
    }));

    try {
      const response = await dispatchAPI(...data);

      changeFetcingState((prevState) => ({
        ...prevState,
        isSuccess: true,
        isLoading: false,
        isError: false,
        error: null,
      }));

      setFetchedResponse(response);

      return response;
    } catch (error) {
      changeFetcingState((prevState) => ({
        ...prevState,
        isSuccess: false,
        data: null,
        isLoading: false,
        isError: true,
        error: error.message || 'Failed to fetch',
      }));

      callbacks.onError(dispatchType, error);

      return error;
    }
  };

  const dataDispatch = async (dispatchType, callbacks, ...data) => {
    setDispatchType(dispatchType);
    changeFetcingState((prevState) => ({ ...prevState, dispatchType }));
    setCallbacks((prevCallbacks) => ({ ...prevCallbacks, ...callbacks }));

    switch (dispatchType) {
      case DISPATCH_TYPE.CREATE_COMMENT:
        return await executeAPI(postComment, ...data);

      case DISPATCH_TYPE.UPDATE_REACTION:
        return await executeAPI(updateReaction, ...data);

      case DISPATCH_TYPE.GET_HISTORY_BY_PAGE:
        return await executeAPI(getCommentsByPage, ...data);

      case DISPATCH_TYPE.DELETE_COMMENT:
        return await executeAPI(deleteComment, ...data);

      case DISPATCH_TYPE.COMPARE_PASSWORD:
        return await executeAPI(compareCommentPassword, ...data);

      default:
    }
  };

  return { fetchingState, dataDispatch };
};

export default useDataFetcher;

export { DISPATCH_TYPE };
