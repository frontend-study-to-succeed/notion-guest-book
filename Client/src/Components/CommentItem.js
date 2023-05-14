/** React 기본 Import */
import React, { useCallback, useState } from 'react';

/** Component Style */
import { StyledCommentItem } from './styles/CommentItem.styled';

/** Context */
import { MDOAL_COMPONENT, MODAL_ACTION_TYPE, useModal } from '../Context/ModalContext';

/** 자식 Component */
import UserProfile from './atomic/UserProfile';
import CommentInfo from './CommentInfo';
import CommentMenuTools from './CommentMenuTools';

const CommentItem = ({ id, refetch, userProfile, ...commentPros }) => {
  const { modalDispatch } = useModal();

  let [isOver, setIsOver] = useState(false);

  const handleUserProfileClick = useCallback(() => {
    modalDispatch({
      type: MODAL_ACTION_TYPE.OPEN,
      componentType: MDOAL_COMPONENT.USER_PROFILE,
      datas: {
        userName: commentPros.userName,
        userProfile,
      },
    });
  }, []);

  return (
    <StyledCommentItem.Container
      data-comment-id={id}
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      <UserProfile userProfile={userProfile} onClick={handleUserProfileClick} />
      <CommentInfo {...commentPros} />
      {isOver && <CommentMenuTools id={id} refetch={refetch} />}
    </StyledCommentItem.Container>
  );
};

export default CommentItem;
