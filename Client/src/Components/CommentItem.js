/** React 기본 Import */
import React, { useCallback, useState } from 'react';

/** Component Style */
import { StyledCommentItem } from './styles/CommentItem.styled';

/** 자식 Component */
import UserProfile from './atomic/UserProfile';
import CommentInfo from './CommentInfo';
import CommentMenuTools from './CommentMenuTools';

/** Animation 관련 Import */
import { AnimatePresence } from 'framer-motion';

/** Redux 관련 Import */
import { useDispatch } from 'react-redux';

/** Store Dispatch */
import { MODAL_COMPONENT, openModal } from '../Store/modalInfoSlice';

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
  const storeDispatch = useDispatch();

  let [isOver, setIsOver] = useState(false);

  const handleUserProfileClick = useCallback(() => {
    storeDispatch(
      openModal({
        modalType: MODAL_COMPONENT.USER_PROFILE,
        modalDatas: {
          userName: commentPros.userName,
          userProfile,
        },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
