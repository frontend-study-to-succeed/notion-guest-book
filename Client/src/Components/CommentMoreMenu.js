import React from 'react';

import { StyledCommentMoreMenu } from './styles/CommentMoreMenu.styled';

import { getSingleComment } from '../API';
import TextWithIcon from './atomic/TextWithIcon';
import CommentMoreMenuItem from './CommentMoreMenuItem';

import { useComment } from '../Context/CommentContext';
import { MDOAL_COMPONENT, MODAL_ACTION_TYPE, useModal } from '../Context/ModalContext';

const CommentMoreMenu = ({ id, refetch, handleShow }) => {
  const { mutateCommentInfo } = useComment();
  const { modalDispatch } = useModal();

  const handleClickDelete = () => {
    handleShow(false);

    modalDispatch({
      type: MODAL_ACTION_TYPE.OPEN,
      componentType: MDOAL_COMPONENT.DELETE_COMMENT,
      datas: {
        commentId: id,
        refetch,
      },
    });
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
