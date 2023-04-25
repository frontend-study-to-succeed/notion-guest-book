import React from 'react';

import { StyledCommentWriting } from './styles/CommentWriting.styled';

import { Flex } from './styles/Flex.styled';

const CommentWriting = () => {
  return (
    <StyledCommentWriting.Container>
      <StyledCommentWriting.Author />
      <StyledCommentWriting.Body />
      <StyledCommentWriting.Submit>보내기</StyledCommentWriting.Submit>
    </StyledCommentWriting.Container>
  );
};

export default CommentWriting;
