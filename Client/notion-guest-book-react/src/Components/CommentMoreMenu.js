import React from 'react';

import { StyledCommentMoreMenu } from './styles/CommentMoreMenu.styled';

import CommentMoreMenuItem from './CommentMoreMenuItem';
import TextWithIcon from './atomic/TextWithIcon';

const CommentMoreMenu = () => {
  return (
    <StyledCommentMoreMenu.Container>
      <CommentMoreMenuItem>
        <TextWithIcon icon="💬">댓글 답장하기</TextWithIcon>
      </CommentMoreMenuItem>
      <CommentMoreMenuItem>
        <TextWithIcon icon="❌" color="red">
          댓글 삭제하기
        </TextWithIcon>
      </CommentMoreMenuItem>
    </StyledCommentMoreMenu.Container>
  );
};

export default CommentMoreMenu;
