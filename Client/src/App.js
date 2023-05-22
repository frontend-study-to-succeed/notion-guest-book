/** React 기본 Import */
import { useEffect, useState, useRef, useCallback } from 'react';

/** Style CSS */
import { StyledApp } from './App.styled';

/** 자식 Components */
import CommentHistory from './Components/CommentHistory';
import CommentWriting from './Components/CommentWriting';

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

// 230522 불을 발견하다...

export default function App() {
  // const { data: commentList = [], isLoading, isError, error, refetch } = useQuery(getAllComments);
  const { data: commentList = [], isLoading, isError, error, mutate } = useMutation(getCommentsByPage);

  const [currentPage, setCurrentPage] = useState(1);
  // const currentPage = useRef(1);

  const { userInfo } = useUserInfo();

  const { modalState, modalDispatch } = useModal();

  const [storedCommentList, setStoredCommentList] = useState([]);

  useEffect(() => {
    if (!userInfo.userName) {
      modalDispatch({ type: MODAL_ACTION_TYPE.OPEN, componentType: MODAL_COMPONENT.USER_INFO });
      return;
    }
  }, []);

  useEffect(() => {
    if (commentList && commentList.length !== 0) {
      // setStoredCommentList(commentList.concat(...storedCommentList));
      setStoredCommentList([].concat(...commentList, ...storedCommentList));
      // setStoredCommentList(storedCommentList.concat(...commentList));
    }
  }, [commentList]);

  useEffect(() => {
    console.log('useEffect: ', currentPage);
    mutate(currentPage);
    // console.log('ref도 useEffect가?: ', currentPage.current);
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    console.log('handleNextPage: ', currentPage);
    setCurrentPage(currentPage + 1);
    // console.log('여기에는 올라오나요?');
    // currentPage.current = currentPage.current + 1;
    // mutate(currentPage.current);
  }, [currentPage]);

  return (
    <StyledApp.Container>
      <button onClick={() => handleNextPage()}>test</button>
      <CommentHistory
        commentList={storedCommentList}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={mutate}
        onNextPage={handleNextPage}
      />
      <CommentWriting id="comment-writing" updateHistory={mutate} />
      <AnimatePresence>
        {modalState.isOpen && <modalState.Component title={modalState.title} datas={modalState.datas} />}
      </AnimatePresence>
    </StyledApp.Container>
  );
}
