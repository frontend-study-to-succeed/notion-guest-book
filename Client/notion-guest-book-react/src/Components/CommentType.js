import React, { useState } from 'react';

import { StyledCommentType } from './styles/CommentType.styled';

import { Icon } from './Icon';
import TextWithIcon from './atomic/TextWithIcon';
import CommentTypeList from './CommentTypeList';

const CommentType = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <StyledCommentType.Container>
      <StyledCommentType.Wrapper onClick={() => setIsShow(!isShow)}>
        <TextWithIcon icon="📃">텍스트</TextWithIcon>
        <Icon.Open width="24px" height="24px" />
      </StyledCommentType.Wrapper>
      {isShow && <CommentTypeList />}
    </StyledCommentType.Container>
  );
};

export default CommentType;
