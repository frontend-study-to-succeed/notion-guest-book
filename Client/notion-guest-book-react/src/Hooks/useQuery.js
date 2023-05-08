import { useEffect, useState } from 'react';

const tempCallback = () => {};

const defaultConfigure = {
  onSuccess: tempCallback,
  onError: tempCallback,
};

const useQuery = (fn, config = defaultConfigure) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    isSuccess: false,
    isError: false,
    error: null,
  });

  const { onSuccess, onError } = config;

  const runQuery = () => {
    if (!fn) return;

    setState((prevState) => ({ ...prevState, isLoading: true }));

    fn()
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
          data: null,
          isLoading: false,
          isError: true,
          error: error.message || 'Failed to fetch',
        }));

        onError(error);
      });
  };

  useEffect(runQuery, []);

  return { ...state, refetch: runQuery };
};

export default useQuery;
