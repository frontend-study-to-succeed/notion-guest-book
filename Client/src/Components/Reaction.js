import React from 'react';

import { StyledReaction } from './styles/Reaction.styled';
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
