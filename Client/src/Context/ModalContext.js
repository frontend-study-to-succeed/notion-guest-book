import { createContext, useContext, useReducer } from 'react';

import ModalDeleteComment from '../Components/Modals/ModalDeleteComment';
import ModalUserInfo from '../Components/Modals/ModalUserInfo';
import ModalUserProfile from '../Components/Modals/ModalUserProfile';

const ModalStateContext = createContext(null);
const ModalDispatchContext = createContext(null);

const MODAL_ACTION_TYPE = {
  OPEN: 'Open',
  CLOSE: 'Close',
};

const MDOAL_COMPONENT = {
  USER_INFO: 'UserInfo',
  DELETE_COMMENT: 'DeleteComment',
  USER_PROFILE: 'UserProfile',
};

const getComponentInfo = (componentType) => {
  switch (componentType) {
    case MDOAL_COMPONENT.USER_INFO:
      return { title: '사용자 정보 입력', Component: ModalUserInfo };

    case MDOAL_COMPONENT.DELETE_COMMENT:
      return { title: '남긴 방명록 삭제', Component: ModalDeleteComment };

    case MDOAL_COMPONENT.USER_PROFILE:
      return { title: `님의 프로필 사진`, Component: ModalUserProfile };

    default:
      return null;
  }
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case MODAL_ACTION_TYPE.OPEN: {
      return { isOpen: true, ...getComponentInfo(action.componentType), datas: action.datas };
    }

    case MODAL_ACTION_TYPE.CLOSE: {
      return { isOpen: false };
    }

    default: {
      return { isOpen: false };
    }
  }
};

const initialState = { isOpen: false };

export default function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>{children}</ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

export function useModal() {
  return {
    modalState: useContext(ModalStateContext),
    modalDispatch: useContext(ModalDispatchContext),
  };
}

export { MODAL_ACTION_TYPE, MDOAL_COMPONENT };
