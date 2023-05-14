/** React 기본 import */
import React from 'react';

/** Component Style */
import { StyledCommentTypeListItem } from './styles/CommentTypeListItem.styled';

const CommentTypeListItem = ({ children, onClick }) => {
  return (
    <StyledCommentTypeListItem.Container onClick={onClick}>
      {children}
    </StyledCommentTypeListItem.Container>
  );
};

export default CommentTypeListItem;
