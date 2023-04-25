import React from 'react';

import { Flex } from './styles/Flex.styled';
import { Container } from './styles/Container.styled';
import { StyledCommentItem } from './styles/CommentItem.styled';
import styled from '@emotion/styled';

const WrappedContainer = styled(Container)`
  & + & {
    margin-top: 24px;
  }
`;

const CommentItem = ({ author, date, type, content }) => {
  return (
    <WrappedContainer>
      <Flex row>
        <StyledCommentItem.Author>{author}</StyledCommentItem.Author>
        <StyledCommentItem.Date>{date}</StyledCommentItem.Date>
      </Flex>
      <StyledCommentItem.Content>{content}</StyledCommentItem.Content>
    </WrappedContainer>
  );
};

export default CommentItem;
