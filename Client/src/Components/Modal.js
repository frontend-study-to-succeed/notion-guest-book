/** React 기본 import */
import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';

/** Component Style */
import { StyledModal } from './styles/Modal.styled';

/** Context */
import { MODAL_ACTION_TYPE, useModal } from '../Context/ModalContext';

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
    <StyledModal.Container>
      <StyledModal.Box column>
        <StyledModal.Header>
          <h2>{modalTitle}</h2>
          <button onClick={() => modalDispatch({ type: MODAL_ACTION_TYPE.CLOSE })}>❌</button>
        </StyledModal.Header>
        {children}
        <StyledModal.Footer>
          <button onClick={() => onSubmit()}>확인</button>
        </StyledModal.Footer>
      </StyledModal.Box>
    </StyledModal.Container>,
    document.getElementById('portal')
  );
};

export default Modal;
