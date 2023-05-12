import styled from '@emotion/styled';
import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MODAL_ACTION_TYPE, useModal } from '../Context/ModalContext';
import { Flex } from './atomic/styles/Flex.styled';

const ModalPageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);

  z-index: 999;
`;

const ModalBox = styled(Flex)`
  padding: 24px;
  margin: 24px;
  background: white;
  width: calc(100% - 48px);
  height: fit-content;
  border-radius: 4px;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
  gap: 24px;
`;

const ModalHeader = styled(Flex)`
  justify-content: space-between;
`;

const ModalFooter = styled(Flex)`
  justify-content: end;
`;

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
    <ModalPageContainer>
      <ModalBox column>
        <ModalHeader>
          <h2>{modalTitle}</h2>
          <button onClick={() => modalDispatch({ type: MODAL_ACTION_TYPE.CLOSE })}>❌</button>
        </ModalHeader>
        {children}
        <ModalFooter>
          <button onClick={() => onSubmit()}>확인</button>
        </ModalFooter>
      </ModalBox>
    </ModalPageContainer>,
    document.getElementById('portal')
  );
};

export default Modal;
