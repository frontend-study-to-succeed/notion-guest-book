/** React 기본 import */
import React from 'react';

/** Component Style */
import { StyledReaction } from './styles/Reaction.styled';

/** 자식 컴포넌트 */
import TextWithIcon from './atomic/TextWithIcon';

const animationVariant = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 157,
      damping: 12,
      mass: 1,
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.08,
    },
  },
};

const Reaction = ({ icon, count }) => {
  return (
    <StyledReaction.Container layout variants={animationVariant} initial="hidden" animate="visible">
      <TextWithIcon icon={String.fromCodePoint('0x' + Number(icon).toString(16))}>
        {count}
      </TextWithIcon>
    </StyledReaction.Container>
  );
};

export default Reaction;
