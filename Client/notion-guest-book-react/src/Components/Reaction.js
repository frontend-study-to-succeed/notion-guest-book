import React from 'react';

import { StyledReaction } from './styles/Reaction.styled';
import TextWithIcon from './atomic/TextWithIcon';

const Reaction = ({ icon, count }) => {
  return (
    <StyledReaction.Container>
      <TextWithIcon icon={icon}>{count}</TextWithIcon>
    </StyledReaction.Container>
  );
};

export default Reaction;
