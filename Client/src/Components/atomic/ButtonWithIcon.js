import React from 'react';

import { Icon } from '../Icon';

import { StyledButtonWithIcon } from './styles/ButtonWithIcon.styled';

const ButtonWithIcon = ({ type, onClick }) => {
  const IconTyped = Icon[type];

  return (
    <StyledButtonWithIcon.Button onClick={onClick}>
      <IconTyped color="darkgray" />
    </StyledButtonWithIcon.Button>
  );
};

export default ButtonWithIcon;
