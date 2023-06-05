/** React 기본 Import */
import React from 'react';

/** 자식 Components */
import Modal from '../Modal';

/** Component Style */
import { StyledModalUserProfile } from './ModalUserProfile.styled';

/** Redux 관련 Import */
import { useDispatch } from 'react-redux';

/** Store Dispatch */
import { closeModal } from '../../Store/modalInfoSlice';

const ModalUserProfile = ({ title, datas }) => {
  const storeDispatch = useDispatch();

  const handleSubmit = () => {
    storeDispatch(closeModal());
  };

  return (
    <>
      <Modal modalTitle={datas.userName + title} onSubmit={handleSubmit}>
        <StyledModalUserProfile.ImageWrapper>
          <StyledModalUserProfile.Image src={datas.userProfile} alt="" />
        </StyledModalUserProfile.ImageWrapper>
      </Modal>
    </>
  );
};

export default ModalUserProfile;
