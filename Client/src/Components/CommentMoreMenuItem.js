/** React 기본 import */
import React from 'react';

/** Component STyle */
import { StyledCommentMoreMenuItem } from './styles/CommentMoreMenuItem.styled';

const CommentMoreMenuItem = ({ onClick, children }) => {
  return (
    <StyledCommentMoreMenuItem.Container onClick={onClick}>
      {children}
    </StyledCommentMoreMenuItem.Container>
  );
};

export default CommentMoreMenuItem;
