/** React 기본 Import */
import React, { useCallback, useEffect, useState, useLayoutEffect, useRef } from 'react';

/** Component Style */
import { StyledCommentHistory } from './styles/CommentHistory.styled';

/** 자식 컴포넌트 */
import CommentItem from './CommentItem';
import { AnimatePresence, motion } from 'framer-motion';

import usePage from '../Hooks/usePage';
import useCommentHistory from '../Hooks/useCommentHistory';

const ContainerAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const ItemListWrapper = ({ commentHistory, currentRelativeTime, refetch }) => {
  return (
    <motion.div style={{ width: '100%' }} variants={ContainerAnimation} initial="hidden" animate="visible">
      {commentHistory.map(({ _id, commentDate, ...commentPros }) => {
        // 만약 원래 있는 commentItem이라면, 달라진 게 있을 경우에만 렌더
        // 만약 없는 commentItem이라면 생성

        return (
          <CommentItem
            key={_id}
            id={_id}
            {...commentPros}
            commentDate={currentRelativeTime(commentDate)}
            refetch={refetch}
          />
        );
      })}
    </motion.div>
  );
};

const CommentHistory = ({ isLoading, isError, error, refetch, onNextPage }) => {
  const { commentHistory } = useCommentHistory();
  // console.log('history에서: ', commentList);

  const isStartFetching = useRef(false);
  const containerRef = useRef();

  // const lastClientHeight = useRef(-1);
  const { nextPage } = usePage();

  const currentRelativeTime = useCallback((commentDate) => {
    return new Intl.RelativeTimeFormat('ko', {
      numeric: 'auto',
    }).format(Math.ceil((new Date(commentDate) - new Date()) / (1000 * 60 * 60 * 24)), 'days');
  }, []);

  const handleWheel = useCallback(
    (event) => {
      // console.log(event);
      let scrollPos = containerRef.current.scrollTop;

      if (scrollPos === 0 && !isStartFetching.current) {
        isStartFetching.current = true;
        nextPage();

        // todo: fetching 시작
      }
      /**
       * TODO
       * 1. scrollTop 체크해서 최상단에 닿았는지 확인
       * 2. 여러번 호출됐는지 확인(deferred)
       *    - (1) 새로운 호출이 있으면, 이전의 호출을 취소하고 다시 새롭게 갱신
       *    - (2) 이전의 호출이 있으면 새로운 호출 무시
       * 3. 호출이 안 됐으면, 다음 페이지 fetching 요청
       *    - (1) 현재 페이지 인덱스 추가(setCurrentPage + 1)
       *    - (2) setCurrentPage
       */
    },
    [onNextPage]
  );

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);

    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    isStartFetching.current = false;
    console.log('commentHistory: ', commentHistory);
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

    // const isEndPosition =
    //   containerRef.current.scrollHeight - containerRef.current.scrollTop === containerRef.current.clientHeight;

    // if (!isEndPosition) {
    //   // containerRef.current.clientHeight;
    //   // if (lastClientHeight )
    //   return;
    // }

    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [commentHistory]);

  return (
    <StyledCommentHistory.Container ref={containerRef} column>
      {isError && (
        <>
          <StyledCommentHistory.ErrorMessage>{error}</StyledCommentHistory.ErrorMessage>
          <StyledCommentHistory.RefetchButton
            onClick={() => {
              refetch();
            }}
          >
            다시 시도하기
          </StyledCommentHistory.RefetchButton>
        </>
      )}

      {commentHistory.length === 0 && isLoading && <div>불러오는 중입니다...</div>}

      <AnimatePresence>
        {(commentHistory.length && (
          <ItemListWrapper
            commentHistory={commentHistory}
            currentRelativeTime={currentRelativeTime}
            refetch={refetch}
          />
        )) ||
          (!isLoading && !isError && <div>값이 업서</div>)}
      </AnimatePresence>
    </StyledCommentHistory.Container>
  );
};

export default CommentHistory;
