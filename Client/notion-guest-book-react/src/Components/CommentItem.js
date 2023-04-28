import React, { useEffect, useState } from 'react';

import { StyledCommentItem } from './styles/CommentItem.styled';

import UserProfile from './atomic/UserProfile';
import CommentInfo from './CommentInfo';
import CommentMenuTools from './CommentMenuTools';

const CommentItem = ({ author, date, type, content, reaction }) => {
  let [isOver, setIsOver] = useState(false);

  return (
    <StyledCommentItem.Container
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      <UserProfile />
      <CommentInfo {...{ author, date, type, content, reaction }} />
      {isOver && <CommentMenuTools />}
      {/* <CommentMenuTools /> */}
    </StyledCommentItem.Container>
  );
};

export default CommentItem;
