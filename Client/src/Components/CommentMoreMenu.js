/** React 기본 import */
import React, { useCallback } from 'react';

/** Component STyle */
import { StyledCommentMoreMenu } from './styles/CommentMoreMenu.styled';

/** API */
import { getSingleComment } from '../API';

/** 자식 컴포넌트 */
import TextWithIcon from './atomic/TextWithIcon';
import CommentMoreMenuItem from './CommentMoreMenuItem';

/** Context */
import { useComment } from '../Context/CommentContext';
import { MODAL_COMPONENT, MODAL_ACTION_TYPE, useModal } from '../Context/ModalContext';

const animationVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.08,
    },
  },
};

const CommentMoreMenu = ({ id, refetch, handleShow }) => {
  const { mutateCommentInfo } = useComment();
  const { modalDispatch } = useModal();

  const handleClickDelete = useCallback(() => {
    handleShow(false);

    modalDispatch({
      type: MODAL_ACTION_TYPE.OPEN,
      componentType: MODAL_COMPONENT.DELETE_COMMENT,
      datas: {
        commentId: id,
        refetch,
      },
    });
  }, [id]);

  const handleClickReply = useCallback(async () => {
    const replyData = await getSingleComment(id);

    const replyInfo = {
      userProfile: replyData.userProfile,
      userName: replyData.userName,
      commentContent: replyData.commentContent,
      commentType: replyData.commentType,
    };

    mutateCommentInfo('commentReply', replyInfo);
    handleShow(false);
  }, [id]);

  return (
    <StyledCommentMoreMenu.Container variants={animationVariant} initial="hidden" animate="visible" exit="exit">
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
