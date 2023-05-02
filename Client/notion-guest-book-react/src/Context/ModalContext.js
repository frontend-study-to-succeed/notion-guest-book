import { useContext } from 'react';
import { useReducer } from 'react';
import { createContext } from 'react';

const ModalStateContext = createContext(null);
const ModalDispatchContext = createContext(null);

const MODAL_ACTION_TYPE = {
  OPEN: 'Open',
  CLOSE: 'close',
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case MODAL_ACTION_TYPE.OPEN:
      return true;

    case MODAL_ACTION_TYPE.CLOSE:
      return false;

    default:
      return false;
  }
};

const initialState = null;

export default function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>{children}</ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

export function useModalState() {
  return useContext(ModalStateContext);
}

export function useModalDispatch() {
  return useContext(ModalDispatchContext);
}

export { MODAL_ACTION_TYPE };
