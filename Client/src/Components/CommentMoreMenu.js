/** React 기본 import */
import React, { useCallback } from 'react';

/** Component Style */
import { StyledCommentMoreMenu } from './styles/CommentMoreMenu.styled';

/** API */
import { getSingleComment } from '../API';

/** 자식 컴포넌트 */
import TextWithIcon from './atomic/TextWithIcon';
import CommentMoreMenuItem from './CommentMoreMenuItem';

/** Redux 관련 Import */
import { useDispatch } from 'react-redux';

/** Store Dispatch */
import { updateCommentReply } from '../Store/commentInfoSlice';
import { MODAL_COMPONENT, openModal } from '../Store/modalInfoSlice';

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

const CommentMoreMenu = ({ id, handleShow }) => {
  const storeDispatch = useDispatch();

  const handleClickDelete = useCallback(() => {
    handleShow(false);

    storeDispatch(
      openModal({ modalType: MODAL_COMPONENT.DELETE_COMMENT, modalDatas: { commentId: id } })
    );
    // eslint-disable-next-line
  }, [id]);

  const handleClickReply = useCallback(async () => {
    const replyData = await getSingleComment(id);

    const replyInfo = {
      userProfile: replyData.userProfile,
      userName: replyData.userName,
      commentContent: replyData.commentContent,
      commentType: replyData.commentType,
    };

    storeDispatch(updateCommentReply(replyInfo));
    handleShow(false);
    // eslint-disable-next-line
  }, [id]);

  return (
    <StyledCommentMoreMenu.Container
      variants={animationVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
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
