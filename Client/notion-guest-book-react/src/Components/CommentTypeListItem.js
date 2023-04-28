import React from 'react';

import { StyledCommentTypeListItem } from './styles/CommentTypeListItem.styled';

const CommentTypeListItem = ({ children }) => {
  return <StyledCommentTypeListItem.Container>{children}</StyledCommentTypeListItem.Container>;
};

export default CommentTypeListItem;
