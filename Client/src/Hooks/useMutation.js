import { useState } from 'react';

const tempCallback = () => {};

const defaultConfigure = {
  onSuccess: tempCallback,
  onError: tempCallback,
};

const useMutation = (fn, config = defaultConfigure) => {
  const [state, setState] = useState({
    data: null,
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

        console.log('useMutation: ', data);
        console.log(config);

        onSuccess(response);
      })
      .catch((error) => {
        setState((prevState) => ({
          ...prevState,
          data: null,
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
