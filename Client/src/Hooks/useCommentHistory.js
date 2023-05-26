import { useEffect, useState } from 'react';

import { DISPATCH_TYPE } from './useDataFetcher';

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

const loadedCommentIds = new Set();

const useCommentHistory = () => {
  const [commentHistory, setCommentHistory] = useState([]);

  useEffect(() => {
    const handleCommentHistory = (commentHistoryFn) => {
      setCommentHistory(commentHistoryFn);
    };

    eventBus.subscribe(handleCommentHistory);

    return () => {
      eventBus.unsubscribe(handleCommentHistory);
    };
  }, []);

  const changeCommentHistory = (newState) => {
    eventBus.publish(newState);
  };

  const updateCommentHistoryAfterCreate = (response) => {
    changeCommentHistory((prevHistory) => [].concat(...prevHistory, response.comment));
  };

  const updateCommentHistoryAfterUpdate = (response) => {
    changeCommentHistory((prevHistory) => {
      const updatedHistory = [...prevHistory];
      const commentIndex = prevHistory.findIndex((comment) => comment._id === response.comment._id);

      updatedHistory[commentIndex] = response.comment;

      return updatedHistory;
    });
  };

  const updateCommentHistoryAfterGet = (response) => {
    const newHistory = [];

    response.forEach((newComment) => {
      if (loadedCommentIds.has(newComment._id)) {
        return;
      }

      newHistory.push(newComment);
      loadedCommentIds.add(newComment._id);
    });

    if (newHistory.length === 0) {
      return;
    }

    changeCommentHistory((prevHistory) => [].concat(...newHistory, ...prevHistory));
  };

  const updateCommentHistoryAfterDelete = (response) => {
    changeCommentHistory((prevHistory) =>
      prevHistory.filter((comment) => comment._id !== response.comment._id)
    );
  };

  const updateCommentHistory = (dispatchType, response) => {
    const updateFunMap = {
      [DISPATCH_TYPE.CREATE_COMMENT]: () => updateCommentHistoryAfterCreate(response),
      [DISPATCH_TYPE.UPDATE_REACTION]: () => updateCommentHistoryAfterUpdate(response),
      [DISPATCH_TYPE.GET_HISTORY_BY_PAGE]: () => updateCommentHistoryAfterGet(response),
      [DISPATCH_TYPE.DELETE_COMMENT]: () => updateCommentHistoryAfterDelete(response),
    };

    updateFunMap[dispatchType]();
  };

  return { commentHistory, updateCommentHistory };
};

export default useCommentHistory;
