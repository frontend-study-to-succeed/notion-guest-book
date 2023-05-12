import React, { useState } from 'react';
import { MODAL_ACTION_TYPE, useModal } from '../../Context/ModalContext';
import { useUserInfo } from '../../Context/UserInfoContext';
import Modal from '../Modal';

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
        <p>사용자 이름</p>
        <input
          type="text"
          value={userState.userName}
          onChange={(e) => setUserStateByName('userName', e.target.value)}
        />

        <p>사용자 비밀번호</p>
        <input
          type="text"
          value={userState.userPassword}
          onChange={(e) => setUserStateByName('userPassword', e.target.value)}
        />

        <p>프로필 사진 주소</p>
        <input
          type="text"
          value={userState.userProfile}
          onChange={(e) => setUserStateByName('userProfile', e.target.value)}
        />

        <p>다크모드</p>
        <span>TEST</span>
      </Modal>
    </>
  );
};

export default ModalUserInfo;
