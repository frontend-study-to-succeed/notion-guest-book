import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { MODAL_ACTION_TYPE, useModalDispatch, useModalState } from '../Context/ModalContext';
import { Flex } from './atomic/styles/Flex.styled';

import { useModal } from '../Hooks/useModal';
import { useUserInfo } from '../Context/UserInfoContext';

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
  height: fit-content;
  border-radius: 4px;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
  gap: 24px;
`;

const ModalFooter = styled(Flex)`
  justify-content: space-between;
`;

const Modal = ({ onSubmit }) => {
  const { userInfo } = useUserInfo();

  const [userState, setUserState] = useState({
    userName: userInfo.userName,
    userPassword: userInfo.userPassword,
    userProfile: userInfo.userProfile,
    isDarkmode: false,
  });

  const setUserStateByName = (stateName, stateValue) =>
    setUserState((prevState) => ({ ...prevState, [stateName]: stateValue }));

  const modalDispatch = useModalDispatch();

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    return () => window.removeEventListener('keyup', handleKeyup);
  }, []);

  const handleSave = () => {
    if (!userState.userName || !userState.userPassword || !userState.userProfile) {
      return;
    }

    modalDispatch({ type: MODAL_ACTION_TYPE.CLOSE });
    onSubmit(userState);
  };

  const handleKeyup = (e) => {
    if (e.code === 'Escape') {
      modalDispatch({ type: MODAL_ACTION_TYPE.CLOSE });
    }
  };

  return (
    <ModalPageContainer>
      <ModalBox column>
        <h2>사용자 정보 입력</h2>
        <Flex style={{ width: '100%' }}>
          <Flex column>
            <p>사용자 이름</p>
            <input
              type="text"
              value={userState.userName}
              onChange={(e) => setUserStateByName('userName', e.target.value)}
            />
          </Flex>

          <Flex column>
            <p>사용자 비밀번호</p>
            <input
              type="text"
              value={userState.userPassword}
              onChange={(e) => setUserStateByName('userPassword', e.target.value)}
            />
          </Flex>
        </Flex>

        <Flex column>
          <p>프로필 사진 주소</p>
          <input
            type="text"
            value={userState.userProfile}
            onChange={(e) => setUserStateByName('userProfile', e.target.value)}
          />
        </Flex>

        <Flex column>
          <p>다크모드</p>
          <span>TEST</span>
        </Flex>

        <ModalFooter>
          <button
            style={{ width: '100%', height: '48px', fontSize: '16px', fontWeight: 'bolder' }}
            onClick={handleSave}
          >
            확인
          </button>
        </ModalFooter>
      </ModalBox>
    </ModalPageContainer>
  );
};

export default Modal;
