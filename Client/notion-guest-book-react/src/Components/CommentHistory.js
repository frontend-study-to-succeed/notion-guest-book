import React, { useEffect, useRef } from 'react';

import CommentItem from './CommentItem';
import { StyledCommentHistory } from './styles/CommentHistory.styled';

export default function CommentHistory({ isLoading, isError, error, commentList, refetch }) {
  const containerRef = useRef();

  useEffect(() => {
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log('asd');
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      });
    });

    observer.observe(document.querySelector('#comment-history'), {
      attributes: true, // 속성 변화 할때 감지
      childList: true, // 자식노드 추가/제거 감지
      characterData: true, // 데이터 변경전 내용 기록
    });
    return () => observer.disconnect();
  }, []);

  return (
    <StyledCommentHistory id="comment-history" ref={containerRef}>
      {!commentList.length && isLoading && <div>불러오는 중입니다...</div>}
      {isError && <div>오류 떴는디요! {error} //TODO: refetching 시도</div>}
      {(commentList.length &&
        commentList.map(
          ({
            _id,
            userName,
            userProfile,
            commentDate,
            commentType,
            commentContent,
            commentReaction,
            commentReply,
          }) => (
            <CommentItem
              key={_id}
              id={_id}
              userName={userName}
              userProfile={userProfile}
              commentDate={new Intl.RelativeTimeFormat('ko', {
                numeric: 'auto',
              }).format(
                Math.ceil((new Date(commentDate) - new Date()) / (1000 * 60 * 60 * 24)),
                'days'
              )}
              commentType={commentType}
              commentContent={commentContent}
              commentReaction={commentReaction}
              commentReply={commentReply}
              refetch={refetch}
            />
          )
        )) ||
        (!isLoading && !isError && <div>값이 업서</div>)}
    </StyledCommentHistory>
  );
}
