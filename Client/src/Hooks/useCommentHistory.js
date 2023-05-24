import { useState, useEffect } from 'react';

// 이벤트 버스를 위한 함수
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

function useCommentHistory() {
  const [commentHistory, setCommentHistoy] = useState([]);

  useEffect(() => {
    const handleChangedHistory = (newHistory) => {
      setCommentHistoy((prevHistory) => [].concat(...newHistory, ...(prevHistory || [])));
    };

    eventBus.subscribe(handleChangedHistory);

    return () => {
      eventBus.unsubscribe(handleChangedHistory);
    };
  }, []);

  function dispatch(data) {
    eventBus.publish(data);
  }

  useEffect(() => {
    console.log('usecommentHistory: ', commentHistory);
  }, [commentHistory]);

  return {
    commentHistory,
    dispatch,
  };
}

export default useCommentHistory;
