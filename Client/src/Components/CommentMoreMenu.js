import React from 'react';

import { StyledCommentMoreMenu } from './styles/CommentMoreMenu.styled';

import CommentMoreMenuItem from './CommentMoreMenuItem';
import TextWithIcon from './atomic/TextWithIcon';
import useMutation from '../Hooks/useMutation';
import { deleteComment, getSingleComment } from '../API';

import { useComment } from '../Context/CommentContext';
import { useQuery } from '../Hooks/useQuery';

const CommentMoreMenu = ({ id, refetch, handleShow }) => {
  const { mutate } = useMutation(deleteComment, {
    onSuccess: refetch,
    onError: (error) => console.log(error),
  });
  // const { refetch: getCommentInfo } = useQuery(() => getSingleComment(id));
  const { mutateCommentInfo } = useComment();

  const handleClickDelete = () => {
    mutate(id);
  };

  const handleClickReply = async () => {
    const replyData = await getSingleComment(id);

    const replyInfo = {
      userProfile: replyData.userProfile,
      userName: replyData.userName,
      commentContent: replyData.commentContent,
      commentType: replyData.commentType,
    };

    mutateCommentInfo('commentReply', replyInfo);
    handleShow(false);
    // mutateCommentInfo('commentType', '4');
  };

  return (
    <StyledCommentMoreMenu.Container>
      <CommentMoreMenuItem onClick={handleClickReply}>
        <TextWithIcon icon="💬">댓글 답장하기</TextWithIcon>
      </CommentMoreMenuItem>
      <CommentMoreMenuItem onClick={handleClickDelete}>
        <TextWithIcon icon="❌" color="red">
          댓글 삭제하기
        </TextWithIcon>
      </CommentMoreMenuItem>
    </StyledCommentMoreMenu.Container>
  );
};

export default CommentMoreMenu;
