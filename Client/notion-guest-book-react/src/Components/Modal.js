import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { MODAL_ACTION_TYPE, useModalDispatch, useModalState } from '../Context/ModalContext';
import { Flex } from './atomic/styles/Flex.styled';

const ModalPageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.85);
`;

const ModalBox = styled(Flex)`
  padding: 24px;
  margin: 24px;
  background: white;
  width: calc(100% - 48px);
  height: 250px;
  border-radius: 4px;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
  gap: 24px;
`;

const ModalFooter = styled(Flex)`
  justify-content: space-between;
`;

const Modal = ({ isInitialOpen }) => {
  const modalState = useModalState();
  const modalDispatch = useModalDispatch();

  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userProfile, setUserProfile] = useState('');
  const [isDarkmode, setIsDarkmode] = useState(false);

  const initialRef = useRef();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    initialRef.current = isInitialOpen;
    setIsOpen(isInitialOpen);
  }, [isInitialOpen]);

  useEffect(() => {
    setIsOpen(modalState);

    const userInfo = JSON.parse(window.localStorage.getItem('notion-guest-book-info'));

    if (!userInfo) {
      return;
    }

    setUserName(userInfo.userName);
    setUserPassword(userInfo.userPassword);
    setUserProfile(userInfo.userProfile);
    setIsDarkmode(userInfo.isDarkMode);
  }, [modalState]);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    return () => window.removeEventListener('keyup', handleKeyup);
  }, []);

  const handleSave = () => {
    if (initialRef.current) {
      if (!userName || !userPassword || !userProfile) {
        return;
      }
    }

    const userInfo = JSON.stringify({
      userName,
      userPassword,
      userProfile,
      isDarkmode,
    });

    window.localStorage.setItem('notion-guest-book-info', userInfo);

    modalDispatch({ type: MODAL_ACTION_TYPE.CLOSE });
  };

  const handleKeyup = (e) => {
    if (e.code === 'Escape' && !initialRef.current) {
      modalDispatch({ type: MODAL_ACTION_TYPE.CLOSE });
    }
  };

  return (
    isOpen && (
      <ModalPageContainer>
        <ModalBox column>
          <Flex>
            <Flex column>
              <p>사용자 이름</p>
              <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </Flex>

            <Flex column>
              <p>사용자 비밀번호</p>
              <input
                type="text"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </Flex>
          </Flex>

          <Flex column>
            <p>프로필 사진 주소</p>
            <input
              type="text"
              value={userProfile}
              onChange={(e) => setUserProfile(e.target.value)}
            />
          </Flex>

          <ModalFooter>
            <Flex column>
              <p>다크모드</p>
              <span>TEST</span>
            </Flex>
            <button onClick={handleSave}>확인</button>
          </ModalFooter>
        </ModalBox>
      </ModalPageContainer>
    )
  );
};

export default Modal;
