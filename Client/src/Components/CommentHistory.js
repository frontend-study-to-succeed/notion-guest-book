/** React 기본 Import */
import React, { useCallback, useEffect, useState, useLayoutEffect, useRef, useMemo } from 'react';

/** Component Style */
import { StyledCommentHistory } from './styles/CommentHistory.styled';

/** 자식 컴포넌트 */
import CommentItem from './CommentItem';
import { AnimatePresence, motion } from 'framer-motion';

import usePage from '../Hooks/usePage';
import useCommentHistory from '../Hooks/useCommentHistory';
import useFetchingState from '../Hooks/useFetchingState';
import useDataFetcher, { DISPATCH_TYPE } from '../Hooks/useDataFetcher';

const ContainerAnimation = {
  visible: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const ItemListWrapper = ({ commentHistory }) => {
  const currentRelativeTime = useCallback((commentDate) => {
    return new Intl.RelativeTimeFormat('ko', {
      numeric: 'auto',
    }).format(Math.ceil((new Date(commentDate) - new Date()) / (1000 * 60 * 60 * 24)), 'days');
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        style={{ width: '100%' }}
        variants={ContainerAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {commentHistory.map(({ _id, commentDate, ...commentPros }) => (
          <CommentItem
            key={_id}
            id={_id}
            {...commentPros}
            commentDate={currentRelativeTime(commentDate)}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

const CommentHistory = ({ commentHistory }) => {
  const { fetchingState } = useFetchingState();
  const { dataDispatch } = useDataFetcher();
  const { nextPage } = usePage();

  const isFetching = useRef(false);
  const containerRef = useRef();
  const lastCommentItemId = useRef(null);

  const intersectionCallback = useCallback((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        nextPage();
      }
    });
  }, []);

  const intersectionObserver = useMemo(
    () =>
      new IntersectionObserver(intersectionCallback, {
        root: null,
        threshold: 0.1,
      }),
    []
  );

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);

    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    if (fetchingState.isSuccess) {
      isFetching.current = false;
    }
  }, [fetchingState]);

  useEffect(() => {
    if (commentHistory.length === 0) {
      return;
    }

    lastCommentItemId.current = commentHistory[0]._id;
  }, [commentHistory]);

  useLayoutEffect(() => {
    /**
     * 1. 스크롤이 없을 때
     *    설정을 해도 어차피 안 먹음
     * 2. 스크롤이 맨 아래에 있을 때
     *    새로운 방명록을 남겼을 때 다시 스크롤이 맨 아래로 가야 함
     * 3. 스크롤이 맨 아래에 있지 않을 때
     *    리액션을 남기든, 맨위에 도달해서 이전의 방명록을 가져오든
     *    스크롤은 가만히 있어야 함
     * 4. 스크롤이 맨 위에 있을 때
     *    이전의 방명록을 불러올 때, 이전의 맨 위 아이템이 그대로 보여야 함
     */

    if (!lastCommentItemId.current) {
      return;
    }

    if (commentHistory.length === 0) {
      return;
    }

    if (fetchingState.dispatchType === DISPATCH_TYPE.GET_HISTORY_BY_PAGE) {
      document.querySelector(`[data-comment-id='${lastCommentItemId.current}']`).scrollIntoView();
      intersectionObserver.disconnect();
      intersectionObserver.observe(
        document.querySelector(`[data-comment-id='${commentHistory[0]._id}']`)
      );
      return;
    }

    if (fetchingState.dispatchType === DISPATCH_TYPE.CREATE_COMMENT) {
      document
        .querySelector(`[data-comment-id='${commentHistory[commentHistory.length - 1]._id}']`)
        .scrollIntoView();
      return;
    }
  }, [commentHistory]);

  const handleWheel = useCallback((event) => {
    let scrollPos = containerRef.current.scrollTop;

    if (scrollPos === 0 && !isFetching.current) {
      isFetching.current = true;
      nextPage();
    }
  }, []);

  if (!commentHistory) {
    return;
  }

  if (fetchingState.isError) {
    return (
      <StyledCommentHistory.Container ref={containerRef} column="1">
        <StyledCommentHistory.ErrorMessage>{fetchingState.error}</StyledCommentHistory.ErrorMessage>
        <StyledCommentHistory.RefetchButton
          onClick={() => {
            dataDispatch(DISPATCH_TYPE.GET_HISTORY_BY_PAGE);
          }}
        >
          다시 시도하기
        </StyledCommentHistory.RefetchButton>
      </StyledCommentHistory.Container>
    );
  }

  // if (isLoading && commentHistory.length === 0) {
  //   return (
  //     <StyledCommentHistory.Container ref={containerRef} column="1">
  //       <div>불러오는 중입니다...</div>
  //     </StyledCommentHistory.Container>
  //   );
  // }

  // if (isSuccess && commentHistory.length === 0) {
  //   return <div>값이 업서</div>;
  // }

  return (
    <StyledCommentHistory.Container ref={containerRef} column="1">
      <ItemListWrapper commentHistory={commentHistory} />
    </StyledCommentHistory.Container>
  );
};

export default React.memo(CommentHistory);
