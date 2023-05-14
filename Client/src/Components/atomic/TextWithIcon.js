import React from 'react';

import { StyledTextWithIcon } from './styles/TextWithIcon.styled';

const TextWithIcon = ({ icon, children, color = 'black' }) => {
  return (
    <StyledTextWithIcon.Container>
      <StyledTextWithIcon.Icon>{icon}</StyledTextWithIcon.Icon>
      <StyledTextWithIcon.Text color={color}>{children}</StyledTextWithIcon.Text>
    </StyledTextWithIcon.Container>
  );
};

export default TextWithIcon;
