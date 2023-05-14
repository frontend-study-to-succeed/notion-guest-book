/** React 기본 import */
import React from 'react';

/** Component Style */
import { StyledReaction } from './styles/Reaction.styled';

/** 자식 컴포넌트 */
import TextWithIcon from './atomic/TextWithIcon';

const Reaction = ({ icon, count }) => {
  return (
    <StyledReaction.Container>
      <TextWithIcon icon={String.fromCodePoint('0x' + Number(icon).toString(16))}>
        {count}
      </TextWithIcon>
    </StyledReaction.Container>
  );
};

export default Reaction;
