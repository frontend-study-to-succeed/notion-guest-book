import { useEffect, useState } from 'react';

const eventBus = createEventBus();

function createEventBus() {
  const subscribers = [];

  function subscribe(callback) {
    subscribers.push(callback);
  }

  function unsubscribe(callback) {
    const index = subscribers.indexOf(callback);

    if (index !== -1) {
      subscribers.splice(index, 1);
    }
  }

  function publish(data) {
    subscribers.forEach((callback) => callback(data));
  }

  return {
    subscribe,
    unsubscribe,
    publish,
  };
}

const useFetchingState = () => {
  const [fetchingState, setFetchingState] = useState({
    isSuccess: false,
    isLoading: true,
    isError: false,
    error: null,
  });

  useEffect(() => {
    const handleFetchingState = (fetchingStateFn) => {
      setFetchingState(fetchingStateFn);
    };

    eventBus.subscribe(handleFetchingState);

    return () => {
      eventBus.unsubscribe(handleFetchingState);
    };
  }, []);

  const changeFetcingState = (newState) => {
    eventBus.publish(newState);
  };

  return { fetchingState, changeFetcingState };
};

export default useFetchingState;
