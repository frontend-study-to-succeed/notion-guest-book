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
import { MDOAL_COMPONENT, MODAL_ACTION_TYPE, useModal } from '../Context/ModalContext';

const CommentMoreMenu = ({ id, refetch, handleShow }) => {
  const { mutateCommentInfo } = useComment();
  const { modalDispatch } = useModal();

  const handleClickDelete = useCallback(() => {
    handleShow(false);

    modalDispatch({
      type: MODAL_ACTION_TYPE.OPEN,
      componentType: MDOAL_COMPONENT.DELETE_COMMENT,
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
