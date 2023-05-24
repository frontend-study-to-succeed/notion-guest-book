/** React 기본 Import */
import { useEffect, useState, useRef, useCallback } from 'react';

/** Style CSS */
import { StyledApp } from './App.styled';

/** 자식 Components */
import CommentHistory from './Components/CommentHistory';
import CommentWriting from './Components/CommentWriting';

import DataComponent from './DataComponent';

/** API */
import { getAllComments } from './API';
import { getCommentsByPage } from './API';

/** Context */
import { MODAL_COMPONENT, MODAL_ACTION_TYPE, useModal } from './Context/ModalContext';
import { useUserInfo } from './Context/UserInfoContext';

/** Hook */
import { useQuery } from './Hooks/useQuery';
import { AnimatePresence } from 'framer-motion';
import useMutation from './Hooks/useMutation';
import usePage from './Hooks/usePage';

// 230522 불을 발견하다...

export default function App() {
  // test버튼 없으면 usePage도 없어도 됨
  const { nextPage } = usePage();

  const { userInfo } = useUserInfo();
  const { modalState, modalDispatch } = useModal();

  useEffect(() => {
    if (!userInfo.userName) {
      modalDispatch({ type: MODAL_ACTION_TYPE.OPEN, componentType: MODAL_COMPONENT.USER_INFO });
      return;
    }
  }, []);

  return (
    <StyledApp.Container>
      <DataComponent />
      <button onClick={nextPage}>test</button>
      <CommentHistory />
      <CommentWriting id="comment-writing" updateHistory={() => {}} />
      <AnimatePresence>
        {modalState.isOpen && <modalState.Component title={modalState.title} datas={modalState.datas} />}
      </AnimatePresence>
    </StyledApp.Container>
  );
}
