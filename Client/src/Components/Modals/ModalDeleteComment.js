import React, { useState } from 'react';
import { compareCommentPassword, deleteComment } from '../../API';
import { MODAL_ACTION_TYPE, useModal } from '../../Context/ModalContext';
import useMutation from '../../Hooks/useMutation';
import Modal from '../Modal';

const ModalDeleteComment = ({ title, datas }) => {
  const { mutate: deleteCommentFn } = useMutation(deleteComment, {
    onSuccess: datas.refetch,
    onError: (error) => console.log(error),
  });

  const { modalDispatch } = useModal();

  const [commentPassword, setCommentPassword] = useState('');
  const [errorState, setErrorState] = useState('');

  const handleSubmit = async () => {
    const comparedResult = await compareCommentPassword({
      id: datas.commentId,
      password: commentPassword,
    });

    if (!comparedResult) {
      setErrorState('비밀번호가 달라용~');
      return;
    }

    modalDispatch({ type: MODAL_ACTION_TYPE.CLOSE });
    deleteCommentFn(datas.commentId);
  };

  const handleChange = (e) => {
    setCommentPassword(e.target.value);
  };

  return (
    <>
      <Modal modalTitle={title} onSubmit={handleSubmit}>
        <p>암호 입력</p>
        <input type="text" value={commentPassword} onChange={handleChange} />
        {errorState && <p>{errorState}</p>}
      </Modal>
    </>
  );
};

export default ModalDeleteComment;
