/** React 기본 import */
import React, { useCallback, useState } from 'react';

/** Component Style */
import { StyledCommentMenuTools } from './styles/CommentMenuTools.styled';

/** 자식 Component */
import { AnimatePresence } from 'framer-motion';
import ButtonWithIcon from './atomic/ButtonWithIcon';
import CommentMoreMenu from './CommentMoreMenu';
import EmojiPicker from './EmojiPicker';

/** Hooks */
import useDataFetcher, { DISPATCH_TYPE } from '../Hooks/useDataFetcher';

/** Redux 관련 Import */
import { useDispatch } from 'react-redux';

/** Store Dispatch */
import { updateCommentHistory } from '../Store/commentHistoryInfoSlice';

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

const CommentMenuTools = ({ id }) => {
  const [isShow, setIsShow] = useState(false);
  const [isPickerShow, setIsPickerShow] = useState(false);

  const storeDispatch = useDispatch();

  const { dataDispatch } = useDataFetcher();

  const toggleHandler = useCallback(
    (src) => {
      if (src === 'Reaction') {
        setIsShow(false);
        setIsPickerShow(!isPickerShow);
      } else if (src === 'More') {
        setIsPickerShow(false);
        setIsShow(!isShow);
      }
    },
    [isPickerShow, isShow]
  );

  const handleReaction = async (value) => {
    const callbacks = {
      onSuccess: (dispatchType, response) =>
        storeDispatch(updateCommentHistory({ dispatchType, response })),
    };

    dataDispatch(DISPATCH_TYPE.UPDATE_REACTION, callbacks, id, { icon: value });
    setIsPickerShow(false);
  };

  return (
    <StyledCommentMenuTools.Container
      variants={animationVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* TODO: 펼쳤을 때 콘텐츠가 다 나올만한 공간이 없으면 위로 뜨게 하기 */}
      <ButtonWithIcon type="Reaction" onClick={() => toggleHandler('Reaction')} />
      <AnimatePresence>
        {isPickerShow && <EmojiPicker onEmojiClick={handleReaction} />}
      </AnimatePresence>
      <ButtonWithIcon type="More" onClick={() => toggleHandler('More')} />
      <AnimatePresence>
        {isShow && <CommentMoreMenu id={id} handleShow={setIsShow} />}
      </AnimatePresence>
    </StyledCommentMenuTools.Container>
  );
};

export default CommentMenuTools;
