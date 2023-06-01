/** React 기본 import */
import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';

/** Component Style */
import { StyledModal } from './styles/Modal.styled';

/** Redux 관련 Hooks */
import { useDispatch } from 'react-redux';

/** Store Dispatch */
import { closeModal } from '../Store/modalInfoSlice';

const animationVariant = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      type: 'easeInOut',
      duration: 0.1,
    },
  },

  exit: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      type: 'easeInOut',
      duration: 0.1,
    },
  },
};

const boxAnimation = {
  hidden: {
    opacity: 0,
    y: 10,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const Modal = ({ children, modalTitle, onSubmit }) => {
  const storeDispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    return () => window.removeEventListener('keyup', handleKeyup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyup = useCallback((e) => {
    if (e.code === 'Escape') {
      storeDispatch(closeModal());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <StyledModal.Container
      variants={animationVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <StyledModal.Box column="1" variants={boxAnimation}>
        <StyledModal.Header>
          <h2>{modalTitle}</h2>
          <StyledModal.Close onClick={() => storeDispatch(closeModal())}>❌</StyledModal.Close>
        </StyledModal.Header>
        {children}
        <StyledModal.Footer>
          <StyledModal.Button onClick={() => onSubmit()}>확인</StyledModal.Button>
        </StyledModal.Footer>
      </StyledModal.Box>
    </StyledModal.Container>,
    document.getElementById('portal')
  );
};

export default Modal;
