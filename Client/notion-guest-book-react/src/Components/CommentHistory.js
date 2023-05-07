import React, { useCallback, useEffect, useRef, useState } from 'react';

import { StyledCommentHistory } from './styles/CommentHistory.styled';
import CommentItem from './CommentItem';

export default function CommentHistory({ updated, endUpdated }) {
  const [commentList, setCommentList] = useState(null);
  const containerRef = useRef();

  const test = useCallback(async () => {
    const fetchPromise = await fetch('http://localhost:3001/api/v1/comments');
    const response = await fetchPromise.json();

    setCommentList(response.comments);

    endUpdated();
  }, []);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [commentList]);

  useEffect(() => {
    test();
  }, []);

  useEffect(() => {
    if (updated) {
      test();
    }
  }, [updated]);

  return (
    <StyledCommentHistory ref={containerRef}>
      {commentList &&
        commentList.map(({ _id, name, date, commentType, content, reaction, reply }) => (
          <CommentItem
            key={_id}
            id={_id}
            author={name}
            date={new Intl.RelativeTimeFormat('ko', {
              numeric: 'auto',
            }).format(Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24)), 'days')}
            type={commentType}
            content={content}
            reaction={reaction}
            reply={reply}
          />
        ))}
    </StyledCommentHistory>
  );
}
