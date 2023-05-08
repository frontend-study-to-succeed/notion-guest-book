import React, { useEffect, useRef } from 'react';

import CommentItem from './CommentItem';
import { StyledCommentHistory } from './styles/CommentHistory.styled';

export default function CommentHistory({ isLoading, isError, error, commentList, refetch }) {
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [commentList]);

  return (
    <StyledCommentHistory ref={containerRef}>
      {isLoading && <div>불러오는 중입니다...</div>}
      {isError && <div>오류 떴는디요! {error}</div>}
      {commentList &&
        commentList.map(({ _id, name, profile, date, commentType, content, reaction, reply }) => (
          <CommentItem
            key={_id}
            id={_id}
            author={name}
            profile={profile}
            date={new Intl.RelativeTimeFormat('ko', {
              numeric: 'auto',
            }).format(Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24)), 'days')}
            type={commentType}
            content={content}
            reaction={reaction}
            refetch={refetch}
            reply={reply}
          />
        ))}
    </StyledCommentHistory>
  );
}
