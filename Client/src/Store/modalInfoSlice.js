/** Redux Toolkit 관련 Import */
import { createSlice } from '@reduxjs/toolkit';

/** Modals */
import ModalDeleteComment from '../Components/Modals/ModalDeleteComment';
import ModalUserInfo from '../Components/Modals/ModalUserInfo';
import ModalUserProfile from '../Components/Modals/ModalUserProfile';

const MODAL_COMPONENT = {
  USER_INFO: 'UserInfo',
  DELETE_COMMENT: 'DeleteComment',
  USER_PROFILE: 'UserProfile',
};

const getComponentInfo = (componentType) => {
  switch (componentType) {
    case MODAL_COMPONENT.USER_INFO:
      return { modalTitle: '사용자 정보 입력', ModalComponent: ModalUserInfo };

    case MODAL_COMPONENT.DELETE_COMMENT:
      return { modalTitle: '남긴 방명록 삭제', ModalComponent: ModalDeleteComment };

    case MODAL_COMPONENT.USER_PROFILE:
      return { modalTitle: `님의 프로필 사진`, ModalComponent: ModalUserProfile };

    default:
      return null;
  }
};

const modalInfoSlice = createSlice({
  name: 'modalInfo',
  initialState: {
    isModalOpen: false,
    ModalComponent: null,
    modalTitle: null,
    modalDatas: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalDatas = action.payload.modalDatas;

      const { modalTitle, ModalComponent } = getComponentInfo(action.payload.modalType);

      state.ModalComponent = ModalComponent;
      state.modalTitle = modalTitle;
    },
    closeModal: (state, action) => {
      state.isModalOpen = false;
      state.ModalComponent = null;
      state.modalTitle = null;
      state.modalDatas = null;
    },
  },
});

export default modalInfoSlice;

export const { openModal, closeModal } = modalInfoSlice.actions;

export { MODAL_COMPONENT };
