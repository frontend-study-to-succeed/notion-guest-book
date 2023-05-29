/** React 기본 Import */
import { useEffect } from 'react';

/** Style CSS */
import { StyledApp } from './App.styled';

/** 자식 Components */
import CommentHistory from './Components/CommentHistory';
import CommentWriting from './Components/CommentWriting';
import LoadingComponent from './Components/LoadingComponent';

/** API */
import useDataFetcher, { DISPATCH_TYPE } from './Hooks/useDataFetcher';

/** Context */
import { MODAL_ACTION_TYPE, MODAL_COMPONENT, useModal } from './Context/ModalContext';
import { useUserInfo } from './Context/UserInfoContext';
import { AnimatePresence } from 'framer-motion';

/** Hook */
import useCommentHistory from './Hooks/useCommentHistory';
import usePage from './Hooks/usePage';

// 230522 불을 발견하다...

function App() {
  // test버튼 없으면 usePage도 없어도 됨
  const { currentPage } = usePage();

  const { userInfo } = useUserInfo();
  const { modalState, modalDispatch } = useModal();

  const { fetchingState, dataDispatch } = useDataFetcher();

  const { commentHistory, updateCommentHistory } = useCommentHistory();

  const dispatchCallbacks = {
    onSuccess: updateCommentHistory,
    onError: (dispatchType, error) => console.log(error),
  };

  useEffect(() => {
    if (!userInfo.userName) {
      modalDispatch({ type: MODAL_ACTION_TYPE.OPEN, componentType: MODAL_COMPONENT.USER_INFO });
      return;
    }
  }, []);

  useEffect(() => {
    dataDispatch(DISPATCH_TYPE.GET_HISTORY_BY_PAGE, dispatchCallbacks, currentPage);
  }, [currentPage]);

  return (
    <StyledApp.Container>
      <CommentHistory commentHistory={commentHistory} />
      <CommentWriting id="comment-writing" />
      <AnimatePresence>
        {modalState.isOpen && (
          <modalState.Component title={modalState.title} datas={modalState.datas} />
        )}
      </AnimatePresence>

      <AnimatePresence>{fetchingState.isLoading && <LoadingComponent />}</AnimatePresence>
    </StyledApp.Container>
  );
}

export default App;
