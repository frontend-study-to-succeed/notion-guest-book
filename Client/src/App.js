import { useEffect } from 'react';
import { getAllComments } from './API';
import CommentHistory from './Components/CommentHistory';
import CommentWriting from './Components/CommentWriting';

import { MDOAL_COMPONENT, MODAL_ACTION_TYPE, useModal } from './Context/ModalContext';
import { useUserInfo } from './Context/UserInfoContext';
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
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
    </div>
  );
}
