/** React 기본 Import */
import React, { useCallback, useEffect, useState, useLayoutEffect, useRef } from 'react';

/** Component Style */
import { StyledCommentHistory } from './styles/CommentHistory.styled';

/** 자식 컴포넌트 */
import CommentItem from './CommentItem';
import { AnimatePresence, motion } from 'framer-motion';

import usePage from '../Hooks/usePage';
import useCommentHistory from '../Hooks/useCommentHistory';
import useFetchingState from '../Hooks/useFetchingState';
import useDataFetcher from '../Hooks/useDataFetcher';

const ContainerAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  exit: {
    opacity: 0,
  },
};

const ItemListWrapper = ({ commentHistory, currentRelativeTime }) => {
  return (
    <motion.div
      style={{ width: '100%' }}
      variants={ContainerAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {commentHistory.map(({ _id, commentDate, ...commentPros }) => {
        // 만약 원래 있는 commentItem이라면, 달라진 게 있을 경우에만 렌더
        // 만약 없는 commentItem이라면 생성

        return (
          <CommentItem
            key={_id}
            id={_id}
            {...commentPros}
            commentDate={currentRelativeTime(commentDate)}
          />
        );
      })}
    </motion.div>
  );
};

const CommentHistory = ({ commentHistory }) => {
  const { fetchingState } = useFetchingState();
  const { dispatch } = useDataFetcher();

  const isStartFetching = useRef(false);
  const containerRef = useRef();

  const { currentPage, nextPage } = usePage();

  const { isSuccess, isLoading, isError, error } = fetchingState;

  useEffect(() => {
    console.log('fetchingState: ', fetchingState);
  }, [fetchingState]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);

    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    isStartFetching.current = false;
  }, [commentHistory]);

  useLayoutEffect(() => {
    // TODO: Reaction 추가 refetch라면 이거 동작 안 하게
    /**
     * 1. 스크롤이 없을 때
     *    설정을 해도 어차피 안 먹음
     * 2. 스크롤이 맨 아래에 있을 때
     *    새로운 방명록을 남겼을 때 다시 스크롤이 맨 아래로 가야 함
     * 3. 스크롤이 맨 아래에 있지 않을 때
     *    리액션을 남기든, 맨위에 도달해서 이전의 방명록을 가져오든
     *    스크롤은 가만히 있어야 함
     */
    if (!containerRef.current) {
      return;
    }

    // const isEndPosition =
    //   containerRef.current.scrollHeight - containerRef.current.scrollTop ===
    //   containerRef.current.clientHeight;

    // if (!isEndPosition) {
    //   return;
    // }

    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [commentHistory]);

  const currentRelativeTime = useCallback((commentDate) => {
    return new Intl.RelativeTimeFormat('ko', {
      numeric: 'auto',
    }).format(Math.ceil((new Date(commentDate) - new Date()) / (1000 * 60 * 60 * 24)), 'days');
  }, []);

  const handleWheel = useCallback((event) => {
    // console.log(event);
    let scrollPos = containerRef.current.scrollTop;

    if (scrollPos === 0 && !isStartFetching.current) {
      isStartFetching.current = true;
      nextPage();
    }
  }, []);

  if (!commentHistory) {
    return;
  }

  if (isError) {
    return (
      <StyledCommentHistory.Container ref={containerRef} column="1">
        <StyledCommentHistory.ErrorMessage>{error}</StyledCommentHistory.ErrorMessage>
        <StyledCommentHistory.RefetchButton
          onClick={() => {
            dispatch();
          }}
        >
          다시 시도하기
        </StyledCommentHistory.RefetchButton>
      </StyledCommentHistory.Container>
    );
  }

  if (isLoading && commentHistory.length === 0) {
    return (
      <StyledCommentHistory.Container ref={containerRef} column="1">
        <div>불러오는 중입니다...</div>
      </StyledCommentHistory.Container>
    );
  }

  if (isSuccess && commentHistory.length === 0) {
    return <div>값이 업서</div>;
  }

  return (
    <StyledCommentHistory.Container ref={containerRef} column="1">
      <AnimatePresence>
        <ItemListWrapper
          commentHistory={commentHistory}
          currentRelativeTime={currentRelativeTime}
        />
      </AnimatePresence>
    </StyledCommentHistory.Container>
  );
};

export default React.memo(CommentHistory);
