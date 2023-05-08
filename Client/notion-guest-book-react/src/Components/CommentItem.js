import React, { useEffect, useState } from 'react';

import { StyledCommentItem } from './styles/CommentItem.styled';

import UserProfile from './atomic/UserProfile';
import CommentInfo from './CommentInfo';
import CommentMenuTools from './CommentMenuTools';

const CommentItem = ({ id, profile, author, date, type, content, reaction, reply, refetch }) => {
  let [isOver, setIsOver] = useState(false);

  return (
    <StyledCommentItem.Container
      data-comment-id={id}
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      <UserProfile profile={profile} />
      <CommentInfo {...{ author, date, type, content, reaction, reply }} />
      {isOver && <CommentMenuTools id={id} refetch={refetch} />}
      {/* <CommentMenuTools /> */}
    </StyledCommentItem.Container>
  );
};

export default CommentItem;
