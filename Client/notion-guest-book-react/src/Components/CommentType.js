import React from 'react';

import { StyledCommentType } from './styles/CommentType.styled';

import { Icon } from './Icon';
import TextWithIcon from './atomic/TextWithIcon';

const CommentType = () => {
  return (
    <StyledCommentType.Container>
      <TextWithIcon icon="📃">텍스트</TextWithIcon>
      <Icon.Open width="24px" height="24px" />
    </StyledCommentType.Container>
  );
};

export default CommentType;
