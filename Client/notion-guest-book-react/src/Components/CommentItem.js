import React, { useEffect, useState } from 'react';

import { StyledCommentItem } from './styles/CommentItem.styled';

import UserProfile from './atomic/UserProfile';
import CommentInfo from './CommentInfo';
import CommentMenuTools from './CommentMenuTools';

const CommentItem = ({ id, author, date, type, content, reaction, reply }) => {
  let [isOver, setIsOver] = useState(false);

  return (
    <StyledCommentItem.Container
      data-comment-id={id}
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      <UserProfile />
      <CommentInfo {...{ author, date, type, content, reaction, reply }} />
      {isOver && <CommentMenuTools />}
      {/* <CommentMenuTools /> */}
    </StyledCommentItem.Container>
  );
};

export default CommentItem;
