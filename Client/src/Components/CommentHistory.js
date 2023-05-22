/** React 기본 Import */
import React, { useCallback, useEffect, useState, useLayoutEffect, useRef } from 'react';

/** Component Style */
import { StyledCommentHistory } from './styles/CommentHistory.styled';

/** 자식 컴포넌트 */
import CommentItem from './CommentItem';
import { AnimatePresence, motion } from 'framer-motion';

const ContainerAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const ItemListWrapper = ({ commentList, currentRelativeTime, refetch }) => {
  return (
    <motion.div style={{ width: '100%' }} variants={ContainerAnimation} initial="hidden" animate="visible">
      {commentList.map(({ _id, commentDate, ...commentPros }) => (
        <CommentItem
          key={_id}
          id={_id}
          {...commentPros}
          commentDate={currentRelativeTime(commentDate)}
          refetch={refetch}
        />
      ))}
    </motion.div>
  );
};

export default function CommentHistory({ isLoading, isError, error, commentList, refetch, onNextPage }) {
  const isStartFetching = useRef(false);
  const containerRef = useRef();

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
        // isStartFetching.current = true;
        onNextPage();

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
    // isStartFetching.current = false;
  }, [commentList]);

  useLayoutEffect(() => {
    // TODO: Reaction 추가 refetch라면 이거 동작 안 하게
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [commentList]);

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

      {commentList.length === 0 && isLoading && <div>불러오는 중입니다...</div>}

      <AnimatePresence>
        {(commentList.length && (
          <ItemListWrapper commentList={commentList} currentRelativeTime={currentRelativeTime} refetch={refetch} />
        )) ||
          (!isLoading && !isError && <div>값이 업서</div>)}
      </AnimatePresence>
    </StyledCommentHistory.Container>
  );
}
