import React from 'react';
import { MODAL_ACTION_TYPE, useModal } from '../../Context/ModalContext';
import Modal from '../Modal';

const ModalUserProfile = ({ title, datas }) => {
  const { modalDispatch } = useModal();

  const handleSubmit = () => {
    modalDispatch({ type: MODAL_ACTION_TYPE.CLOSE });
  };

  return (
    <>
      <Modal modalTitle={datas.userName + title} onSubmit={handleSubmit}>
        {/* <UserProfile userProfile={datas.profile} /> */}
        <img src={datas.userProfile} alt="" />
      </Modal>
    </>
  );
};

export default ModalUserProfile;
