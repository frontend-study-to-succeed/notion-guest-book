import React from 'react';

import { StyledCommentItem } from './styles/CommentItem.styled';

import UserProfile from './atomic/UserProfile';
import CommentInfo from './CommentInfo';

const CommentItem = ({ author, date, type, content, reaction }) => {
  return (
    <StyledCommentItem.Container>
      <UserProfile />
      <CommentInfo {...{ author, date, type, content, reaction }} />
    </StyledCommentItem.Container>
  );
};

export default CommentItem;
