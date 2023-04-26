import React from 'react';

import { StyledCommentWriting } from './styles/CommentWriting.styled';

import UserProfile from './atomic/UserProfile';
import CommentType from './CommentType';
import { Icon } from './Icon';

const CommentWriting = () => {
  return (
    <StyledCommentWriting.Container>
      <StyledCommentWriting.Wrapper>
        <UserProfile />
        <CommentType />
        <StyledCommentWriting.Body placeholder="방명록 남기기..." />
        <StyledCommentWriting.Submit>
          <Icon.Push width="24px" height="24px" color="point" />
        </StyledCommentWriting.Submit>
      </StyledCommentWriting.Wrapper>
    </StyledCommentWriting.Container>
  );
};

export default CommentWriting;
