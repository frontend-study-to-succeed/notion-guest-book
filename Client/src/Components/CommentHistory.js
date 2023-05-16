/** React 기본 Import */
import React, { useCallback, useLayoutEffect, useRef } from 'react';

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
    <motion.div variants={ContainerAnimation} initial="hidden" animate="visible">
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

export default function CommentHistory({ isLoading, isError, error, commentList, refetch }) {
  const containerRef = useRef();

  const currentRelativeTime = useCallback((commentDate) => {
    return new Intl.RelativeTimeFormat('ko', {
      numeric: 'auto',
    }).format(Math.ceil((new Date(commentDate) - new Date()) / (1000 * 60 * 60 * 24)), 'days');
  }, []);

  useLayoutEffect(() => {
    // TODO: Reaction 추가 refetch라면 이거 동작 안 하게
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [commentList]);

  return (
    <StyledCommentHistory ref={containerRef}>
      <AnimatePresence>
        {!commentList.length && isLoading && <div>불러오는 중입니다...</div>}
      </AnimatePresence>

      <AnimatePresence>
        {isError && <div>오류 떴는디요! {error} //TODO: refetching 시도</div>}
      </AnimatePresence>

      <AnimatePresence>
        {(commentList.length && (
          <ItemListWrapper
            commentList={commentList}
            currentRelativeTime={currentRelativeTime}
            refetch={refetch}
          />
        )) ||
          (!isLoading && !isError && <div>값이 업서</div>)}
      </AnimatePresence>
    </StyledCommentHistory>
  );
}
