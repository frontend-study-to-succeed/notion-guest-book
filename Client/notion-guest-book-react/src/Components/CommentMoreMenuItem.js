import React from 'react';

import { StyledCommentMoreMenuItem } from './styles/CommentMoreMenuItem.styled';

const CommentMoreMenuItem = ({ children }) => {
  return <StyledCommentMoreMenuItem.Container>{children}</StyledCommentMoreMenuItem.Container>;
};

export default CommentMoreMenuItem;
