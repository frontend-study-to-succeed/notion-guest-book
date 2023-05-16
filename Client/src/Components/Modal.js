/** React 기본 import */
import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';

/** Component Style */
import { StyledModal } from './styles/Modal.styled';

/** Context */
import { MODAL_ACTION_TYPE, useModal } from '../Context/ModalContext';

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
  const { modalDispatch } = useModal();

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    return () => window.removeEventListener('keyup', handleKeyup);
  }, []);

  const handleKeyup = useCallback((e) => {
    if (e.code === 'Escape') {
      modalDispatch({ type: MODAL_ACTION_TYPE.CLOSE });
    }
  }, []);

  return ReactDOM.createPortal(
    <StyledModal.Container
      variants={animationVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <StyledModal.Box column variants={boxAnimation}>
        <StyledModal.Header>
          <h2>{modalTitle}</h2>
          <StyledModal.Close onClick={() => modalDispatch({ type: MODAL_ACTION_TYPE.CLOSE })}>
            ❌
          </StyledModal.Close>
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
