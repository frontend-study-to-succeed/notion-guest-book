/** React 기본 Import */
import React, { useCallback, useState } from 'react';

/** Component Style */
import { StyledCommentItem } from './styles/CommentItem.styled';

/** Context */
import { MODAL_COMPONENT, MODAL_ACTION_TYPE, useModal } from '../Context/ModalContext';

/** 자식 Component */
import UserProfile from './atomic/UserProfile';
import CommentInfo from './CommentInfo';
import CommentMenuTools from './CommentMenuTools';
import { AnimatePresence } from 'framer-motion';

const animationVariant = {
  hidden: {
    x: -30,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 100,
    opacity: 0,
  },
};

const CommentItem = ({ id, userProfile, variants, ...commentPros }) => {
  const { modalDispatch } = useModal();

  let [isOver, setIsOver] = useState(false);

  const handleUserProfileClick = useCallback(() => {
    modalDispatch({
      type: MODAL_ACTION_TYPE.OPEN,
      componentType: MODAL_COMPONENT.USER_PROFILE,
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
      variants={animationVariant}
    >
      <UserProfile userProfile={userProfile} onClick={handleUserProfileClick} />
      <CommentInfo {...commentPros} />

      <AnimatePresence>{isOver && <CommentMenuTools id={id} />}</AnimatePresence>
    </StyledCommentItem.Container>
  );
};

export default React.memo(CommentItem);
