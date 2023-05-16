import React from 'react';
import { MODAL_ACTION_TYPE, useModal } from '../../Context/ModalContext';
import Modal from '../Modal';

import { StyledModalUserProfile } from './ModalUserProfile.styled';

const ModalUserProfile = ({ title, datas }) => {
  const { modalDispatch } = useModal();

  const handleSubmit = () => {
    modalDispatch({ type: MODAL_ACTION_TYPE.CLOSE });
  };

  return (
    <>
      <Modal modalTitle={datas.userName + title} onSubmit={handleSubmit}>
        {/* <UserProfile userProfile={datas.profile} /> */}
        <StyledModalUserProfile.ImageWrapper>
          <StyledModalUserProfile.Image src={datas.userProfile} alt="" />
        </StyledModalUserProfile.ImageWrapper>
      </Modal>
    </>
  );
};

export default ModalUserProfile;
