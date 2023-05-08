import React from 'react';

import { StyledCommentMoreMenuItem } from './styles/CommentMoreMenuItem.styled';

const CommentMoreMenuItem = ({ onClick, children }) => {
  return (
    <StyledCommentMoreMenuItem.Container onClick={onClick}>
      {children}
    </StyledCommentMoreMenuItem.Container>
  );
};

export default CommentMoreMenuItem;
