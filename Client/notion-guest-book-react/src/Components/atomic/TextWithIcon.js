import React from 'react';

import { StyledTextWithIcon } from './styles/TextWithIcon.styled';

const TextWithIcon = ({ icon, children }) => {
  return (
    <StyledTextWithIcon.Container>
      <span>{icon}</span>
      <StyledTextWithIcon.Count>{children}</StyledTextWithIcon.Count>
    </StyledTextWithIcon.Container>
  );
};

export default TextWithIcon;
