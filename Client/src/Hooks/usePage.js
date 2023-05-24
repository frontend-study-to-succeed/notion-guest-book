import { useState, useEffect } from 'react';

const createEventBus = () => {
  const subscribers = [];

  function subscribe(callback) {
    subscribers.push(callback);
  }

  function publish() {
    subscribers.forEach((callback) => callback());
  }

  return {
    subscribe,
    publish,
  };
};

const eventBus = createEventBus();

const usePage = () => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    eventBus.subscribe(() => {
      setPage((prevPage) => prevPage + 1);
    });
  }, []);

  function dispatch() {
    eventBus.publish();
  }

  return {
    currentPage: page,
    nextPage: dispatch,
  };
};

export default usePage;
