import { useEffect, useRef, useState } from 'react';
import { getAllComments } from './API';
import CommentHistory from './Components/CommentHistory';
import CommentWriting from './Components/CommentWriting';
import Modal from './Components/Modal';

import { useComment } from './Context/CommentContext';
import { MODAL_ACTION_TYPE, useModalDispatch, useModalState } from './Context/ModalContext';
import { useQuery } from './Hooks/useQuery';
import { useUserInfo } from './Context/UserInfoContext';

export default function App() {
  const { data: commentList = [], isLoading, isError, error, refetch } = useQuery(getAllComments);
  const { userInfo, setUserInfo } = useUserInfo();

  const modalState = useModalState();
  const modalDispatch = useModalDispatch();

  useEffect(() => {
    if (!userInfo.userName) {
      modalDispatch({ type: MODAL_ACTION_TYPE.OPEN });
      return;
    }
  }, []);

  const handleSubmit = (userInfo) => {
    setUserInfo(userInfo);
  };

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
      {modalState && <Modal onSubmit={handleSubmit} />}
    </div>
  );
}
