/** React 기본 Import */
import React, { useState } from 'react';

/** 자식 Components */
import Modal from '../Modal';

/** Component Style */
import { StyledModalDeleteComment } from './ModalDeleteComment.styled';

/** Hooks */
import useDataFetcher, { DISPATCH_TYPE } from '../../Hooks/useDataFetcher';

/** Redux 관련 Import */
import { useDispatch } from 'react-redux';

/** Store Dispatch */
import { updateCommentHistory } from '../../Store/commentHistoryInfoSlice';
import { closeModal } from '../../Store/modalInfoSlice';

const ModalDeleteComment = ({ title, datas }) => {
  const storeDispatch = useDispatch();
  const { dataDispatch } = useDataFetcher();

  const [commentPassword, setCommentPassword] = useState('');
  const [errorState, setErrorState] = useState('');

  const handleSubmit = async () => {
    const compareCallbacks = {};

    const comparedResult = await dataDispatch(DISPATCH_TYPE.COMPARE_PASSWORD, compareCallbacks, {
      id: datas.commentId,
      password: commentPassword,
    });

    if (!comparedResult) {
      setErrorState('비밀번호가 달라용~');
      return;
    }

    const callbacks = {
      onSuccess: (dispatchType, response) => {
        storeDispatch(updateCommentHistory({ dispatchType, response }));
        storeDispatch(closeModal());
      },
    };

    dataDispatch(DISPATCH_TYPE.DELETE_COMMENT, callbacks, datas.commentId);
  };

  const handleChange = (e) => {
    setCommentPassword(e.target.value);
  };

  return (
    <>
      <Modal modalTitle={title} onSubmit={handleSubmit}>
        <StyledModalDeleteComment.CategoryWrapper>
          <StyledModalDeleteComment.CategoryName>암호 입력</StyledModalDeleteComment.CategoryName>
          <StyledModalDeleteComment.InputBox
            type="text"
            value={commentPassword}
            onChange={handleChange}
          />
          {errorState && (
            <StyledModalDeleteComment.ErrorState>{errorState}</StyledModalDeleteComment.ErrorState>
          )}
        </StyledModalDeleteComment.CategoryWrapper>
      </Modal>
    </>
  );
};

export default ModalDeleteComment;
