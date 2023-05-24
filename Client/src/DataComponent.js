import React, { useEffect, useState } from 'react';

import usePage from './Hooks/usePage.js';
import useMutation from './Hooks/useMutation.js';
import useCommentHistory from './Hooks/useCommentHistory.js';

import { getCommentsByPage } from './API/index.js';

/**
 * --- 한 것 ---
 * 1. usePage Hook 작성
 *    이벤트 버스 패턴을 사용함
 *    usePage 호출시 해당 컴포넌트에서 구독으로 설정
 *
 *    하나의 State를 여러 컴포넌트가 조작할 수 있고,
 *    해당 State 조작시 실시간으로 공유됨
 *
 * 2. useCommentHistory Hook 작성
 *    이벤트 버스 패턴을 사용함
 *    useCommentHistory 호출시 구독설정
 *
 *    이 Hook 안에서 그동안의 history 저장(그냥 공용 state라고 생각하면 편할 듯?)
 *
 *
 *
 * --- 이제 해야 할 것 ---
 * 1. 패칭 상태 공유
 *    이것도 Hook을 만들지 고민~
 *    commentHistory를 따로 빼놔서, 이제 isLoading, isError만 따로 받아주면 됨
 *
 * 2. 스크롤 위치 조정
 *
 * 3. 이미 로드된 CommentItem이면 렌더 X
 *    이것도 구조를 바꿀까 고민 중인 게, 새로 추가된 commenthistory만 받아서 추가해주는 식으로 변경해주는 게 나을 것 같기도 하고 (전체를 다시 도는 게 아니라)
 */

/**
 * A Component
 * B Component
 *
 * Name Class
 *
 * Name Class -> nameClass.subscribe(AComponent)
 * nameClass.subscribe(Bcomponent)
 *
 * nameClass {
 *    const subsriber = [];
 *
 *    subscribe(component) {
 *      subscriber.push(component);
 *    }
 *
 *    publish() {
 *      subscribers.forEach(subedComponent => subedComponent.dispatch(name))
 *    }
 * }
 */

const DataComponent = () => {
  const { data: newCommentList = [], isLoading, isError, error, mutate } = useMutation(getCommentsByPage);
  const { currentPage, nextPage } = usePage();
  const { commentHistory, dispatch } = useCommentHistory();

  // 여기에서 결국 commentList는 필요가 없어짐!
  const [dataInfo, setDataInfo] = useState({
    commnetList: [],
    isLoading: true,
    isError: false,
    error: null,
  });

  useEffect(() => {
    mutate(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setDataInfo((prevData) => ({
      ...prevData,
      isLoading,
      isError,
      error,
    }));
  }, [isLoading, isError, error]);

  useEffect(() => {
    /**
     * commentList가 바뀌는 경우의 수
     *
     * 1. 새로운 코멘트가 추가됐을 때
     * 2. 공감만 바뀌었을 때
     */

    if (!newCommentList || newCommentList.length === 0) {
      return;
    }

    dispatch(newCommentList);
  }, [newCommentList]);

  return <>{currentPage}</>;
};

export default DataComponent;
