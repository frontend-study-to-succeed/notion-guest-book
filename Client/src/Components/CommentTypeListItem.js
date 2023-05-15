/** React 기본 import */
import React from 'react';

/** Component Style */
import { StyledCommentTypeListItem } from './styles/CommentTypeListItem.styled';

const animationVariant = {
  hidden: {
    opacity: 0,
    x: -15,
  },

  visible: {
    opacity: 1,
    x: 0,
  },
};

const CommentTypeListItem = ({ children, onClick }) => {
  return (
    <StyledCommentTypeListItem.Container onClick={onClick} variants={animationVariant}>
      {children}
    </StyledCommentTypeListItem.Container>
  );
};

export default CommentTypeListItem;
