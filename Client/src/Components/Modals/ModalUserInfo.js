/** React 기본 Import */
import React, { useState } from 'react';

/** 자식 Components */
import Modal from '../Modal';

/** Component Style */
import { StyledModalUserInfo } from './ModalUserInfo.styled';

/** Redux 관련 Import */
import { useDispatch, useSelector } from 'react-redux';

/** Store Dispatch */
import { closeModal } from '../../Store/modalInfoSlice';
import { updateUserInfo } from '../../Store/userInfoSlice';

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
  const storeDispatch = useDispatch();
  const { userName, userPassword, userProfile, userDarkmode } = useSelector(
    (state) => state.userInfo
  );

  const [userState, setUserState] = useState({
    userName,
    userPassword,
    userProfile,
    userDarkmode,
  });

  const setUserStateByName = (stateName, stateValue) =>
    setUserState((prevState) => ({ ...prevState, [stateName]: stateValue }));

  const handleSubmit = () => {
    if (!userState.userName || !userState.userPassword || !userState.userProfile) {
      return;
    }

    storeDispatch(closeModal());
    storeDispatch(updateUserInfo({ ...userState }));
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
