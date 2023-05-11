import React from 'react';

import { StyledCommentMoreMenu } from './styles/CommentMoreMenu.styled';

import CommentMoreMenuItem from './CommentMoreMenuItem';
import TextWithIcon from './atomic/TextWithIcon';
import useMutation from '../Hooks/useMutation';
import { deleteComment } from '../API';

const CommentMoreMenu = ({ id, refetch }) => {
  const { mutate } = useMutation(deleteComment, { onSuccess: refetch });

  const handleClick = () => {
    console.log('여기가 안 오는구나?');
    mutate(id);
  };

  return (
    <StyledCommentMoreMenu.Container>
      <CommentMoreMenuItem>
        <TextWithIcon icon="💬">댓글 답장하기</TextWithIcon>
      </CommentMoreMenuItem>
      <CommentMoreMenuItem onClick={handleClick}>
        <TextWithIcon icon="❌" color="red">
          댓글 삭제하기
        </TextWithIcon>
      </CommentMoreMenuItem>
    </StyledCommentMoreMenu.Container>
  );
};

export default CommentMoreMenu;
