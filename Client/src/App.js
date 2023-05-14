/** React 기본 Import */
import { useEffect } from 'react';

/** Style CSS */
import { StyledApp } from './App.styled';

/** 자식 Components */
import CommentHistory from './Components/CommentHistory';
import CommentWriting from './Components/CommentWriting';

/** API */
import { getAllComments } from './API';

/** Context */
import { MDOAL_COMPONENT, MODAL_ACTION_TYPE, useModal } from './Context/ModalContext';
import { useUserInfo } from './Context/UserInfoContext';

/** Hook */
import { useQuery } from './Hooks/useQuery';

export default function App() {
  const { data: commentList = [], isLoading, isError, error, refetch } = useQuery(getAllComments);
  const { userInfo } = useUserInfo();

  const { modalState, modalDispatch } = useModal();

  useEffect(() => {
    if (!userInfo.userName) {
      modalDispatch({ type: MODAL_ACTION_TYPE.OPEN, componentType: MDOAL_COMPONENT.USER_INFO });
      return;
    }
  }, []);

  return (
    <StyledApp.Container>
      <CommentHistory
        commentList={commentList || []}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
      />
      <CommentWriting id="comment-writing" updateHistory={refetch} />
      {modalState.isOpen && (
        <modalState.Component title={modalState.title} datas={modalState.datas} />
      )}
    </StyledApp.Container>
  );
}
