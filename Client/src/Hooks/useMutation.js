import { useState } from 'react';

const tempCallback = () => {};

const defaultConfigure = {
  onSuccess: tempCallback,
  onError: tempCallback,
};

const useMutation = (fn, config = defaultConfigure) => {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    isSuccess: false,
    isError: false,
    error: null,
  });

  const { onSuccess, onError } = config;

  const runQuery = (data) => {
    if (!fn) return;

    setState((prevState) => ({ ...prevState, isLoading: true }));

    fn(data)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          data: response,
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: null,
        }));

        onSuccess(response);
      })
      .catch((error) => {
        setState((prevState) => ({
          ...prevState,
          data: [],
          isLoading: false,
          isError: true,
          error: error.message || 'Failed to fetch',
        }));

        onError(error);
      });
  };

  return { ...state, mutate: runQuery };
};

export default useMutation;
