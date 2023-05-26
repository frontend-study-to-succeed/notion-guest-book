/** React 기본 import */
import React, { useCallback, useState } from 'react';

/** Component Style */
import { StyledCommentMenuTools } from './styles/CommentMenuTools.styled';

/** API */
import useDataFetcher, { DISPATCH_TYPE } from '../Hooks/useDataFetcher';

/** 자식 Component */
import ButtonWithIcon from './atomic/ButtonWithIcon';
import CommentMoreMenu from './CommentMoreMenu';
import EmojiPicker from './EmojiPicker';
import { AnimatePresence } from 'framer-motion';

/** Hooks */
import useCommentHistory from '../Hooks/useCommentHistory';

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

  const { dataDispatch } = useDataFetcher();

  const { updateCommentHistory } = useCommentHistory();

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
      onSuccess: updateCommentHistory,
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
