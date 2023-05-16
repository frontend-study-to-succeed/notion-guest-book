import React, { useState } from 'react';
import { MODAL_ACTION_TYPE, useModal } from '../../Context/ModalContext';
import { useUserInfo } from '../../Context/UserInfoContext';
import Modal from '../Modal';

import { StyledModalUserInfo } from './ModalUserInfo.styled';

const categoryAnimation = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const ModalUserInfo = ({ title }) => {
  const { userInfo, setUserInfo } = useUserInfo();
  const { modalDispatch } = useModal();

  const [userState, setUserState] = useState({
    userName: userInfo.userName,
    userPassword: userInfo.userPassword,
    userProfile: userInfo.userProfile,
    isDarkmode: false,
  });

  const setUserStateByName = (stateName, stateValue) =>
    setUserState((prevState) => ({ ...prevState, [stateName]: stateValue }));

  const handleSubmit = () => {
    if (!userState.userName || !userState.userPassword || !userState.userProfile) {
      return;
    }

    // console.log('ModalUserInfo: ', userState);

    modalDispatch({ type: MODAL_ACTION_TYPE.CLOSE });
    setUserInfo(userState);
  };

  return (
    <>
      <Modal modalTitle={title} onSubmit={handleSubmit}>
        <StyledModalUserInfo.CategoryWrapper variants={categoryAnimation}>
          <StyledModalUserInfo.CategoryName>사용자 이름</StyledModalUserInfo.CategoryName>
          <StyledModalUserInfo.InputBox
            type="text"
            value={userState.userName}
            placeholder="사용자 이름을 입력해주세요..."
            onChange={(e) => setUserStateByName('userName', e.target.value)}
          />
        </StyledModalUserInfo.CategoryWrapper>
        <StyledModalUserInfo.CategoryWrapper variants={categoryAnimation}>
          <StyledModalUserInfo.CategoryName>사용자 비밀번호</StyledModalUserInfo.CategoryName>
          <StyledModalUserInfo.InputBox
            type="password"
            value={userState.userPassword}
            placeholder="사용자 비밀번호를 입력해주세요..."
            onChange={(e) => setUserStateByName('userPassword', e.target.value)}
          />
        </StyledModalUserInfo.CategoryWrapper>
        <StyledModalUserInfo.CategoryWrapper variants={categoryAnimation}>
          <StyledModalUserInfo.CategoryName>프로필 사진 주소</StyledModalUserInfo.CategoryName>
          <StyledModalUserInfo.InputBox
            type="text"
            value={userState.userProfile}
            placeholder="http://example.com/image.jpg"
            onChange={(e) => setUserStateByName('userProfile', e.target.value)}
          />
        </StyledModalUserInfo.CategoryWrapper>
        <StyledModalUserInfo.CategoryWrapper variants={categoryAnimation}>
          <StyledModalUserInfo.CategoryName>다크모드</StyledModalUserInfo.CategoryName>
          <span>TEST</span>
        </StyledModalUserInfo.CategoryWrapper>
      </Modal>
    </>
  );
};

export default ModalUserInfo;
