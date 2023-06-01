/** React 기본 Import */
import { useEffect } from 'react';

/** Style CSS */
import { StyledApp } from './App.styled';

/** 자식 Components */
import CommentHistory from './Components/CommentHistory';
import CommentWriting from './Components/CommentWriting';
import LoadingComponent from './Components/LoadingComponent';

/** Hooks */
import useDataFetcher, { DISPATCH_TYPE } from './Hooks/useDataFetcher';

/** Animation 관련 Import */
import { AnimatePresence } from 'framer-motion';

/** Redux 관련 Hooks */
import { useDispatch, useSelector } from 'react-redux';

/** Store Dispatch */
import { updateCommentHistory } from './Store/commentHistoryInfoSlice';
import { MODAL_COMPONENT, openModal } from './Store/modalInfoSlice';

// 230522 불을 발견하다...

function App() {
  const storeDispatch = useDispatch();

  const { storedCommentHistory } = useSelector((state) => state.commentHistoryInfo);
  const { userName } = useSelector((state) => state.userInfo);
  const { currentPage } = useSelector((state) => state.pageInfo);

  const modalInfo = useSelector((state) => state.modalInfo);
  const { isModalOpen, ModalComponent, modalTitle, modalDatas } = modalInfo;

  const { fetchingState, dataDispatch } = useDataFetcher();

  const dispatchCallbacks = {
    onSuccess: (dispatchType, response) =>
      storeDispatch(updateCommentHistory({ dispatchType, response })),
    onError: (dispatchType, error) => console.log(error),
  };

  useEffect(() => {
    dataDispatch(DISPATCH_TYPE.GET_HISTORY_BY_PAGE, dispatchCallbacks, currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (!userName) {
      storeDispatch(openModal({ modalType: MODAL_COMPONENT.USER_INFO }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledApp.Container>
      <CommentHistory commentHistory={storedCommentHistory} />
      <CommentWriting id="comment-writing" />
      <AnimatePresence>
        {isModalOpen && <ModalComponent title={modalTitle} datas={modalDatas} />}
      </AnimatePresence>

      <AnimatePresence>{fetchingState.isLoading && <LoadingComponent />}</AnimatePresence>
    </StyledApp.Container>
  );
}

export default App;
