import React from 'react';
import ReactDOM from 'react-dom';

import { ScaleLoader } from 'react-spinners';
import { StyledLoadingComponent } from './LoadingComponent.styled';

const animationVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      when: 'beforeChildren',
    },
  },
};

const LoadingComponent = () => {
  return ReactDOM.createPortal(
    <StyledLoadingComponent.Container
      variants={animationVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <ScaleLoader />
    </StyledLoadingComponent.Container>,
    document.getElementById('portal')
  );
};

export default LoadingComponent;
