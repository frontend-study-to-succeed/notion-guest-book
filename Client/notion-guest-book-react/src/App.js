import { useState } from 'react';

import { useEffect } from 'react';
import { getAllComments } from './API';
import CommentHistory from './Components/CommentHistory';
import CommentWriting from './Components/CommentWriting';
import Modal from './Components/Modal';

import { useQuery } from './Hooks/useQuery';
import { useUserInfo } from './Hooks/useUserInfo';
import { useComment } from './Hooks/useComment';
import { MODAL_ACTION_TYPE, useModalDispatch, useModalState } from './Context/ModalContext';

export default function App() {
  const { data: commentList = [], isLoading, isError, error, refetch } = useQuery(getAllComments);
  const [userInfo, setUserInfo] = useUserInfo();
  const { commentInfo, mutateCommentInfo } = useComment();

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
    <>
      <CommentHistory
        commentList={commentList}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
      />
      <CommentWriting userInfo={userInfo} updateHistory={refetch} />
      {modalState && <Modal onSubmit={handleSubmit} />}
    </>
  );
}
