import React, { useState } from 'react';

import { StyledCommentWriting } from './styles/CommentWriting.styled';

import UserProfile from './atomic/UserProfile';
import CommentType from './CommentType';
import { Icon } from './Icon';

import { useModalDispatch, MODAL_ACTION_TYPE } from '../Context/ModalContext';

const CommentWriting = () => {
  const modalDispatch = useModalDispatch();

  const [commentContent, setCommentContent] = useState('');

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      if (commentContent === '/setting') {
        setCommentContent('');

        modalDispatch({
          type: MODAL_ACTION_TYPE.OPEN,
        });

        return;
      }

      const userInfo = JSON.parse(window.localStorage.getItem('notion-guest-book-info'));

      console.log(userInfo);
    }
  };

  return (
    <StyledCommentWriting.Container>
      <StyledCommentWriting.Wrapper>
        <UserProfile />
        <CommentType />
        <StyledCommentWriting.Body
          placeholder="방명록 남기기..."
          onKeyUp={handleEnter}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <StyledCommentWriting.Submit>
          <Icon.Push width="24px" height="24px" color="point" />
        </StyledCommentWriting.Submit>
      </StyledCommentWriting.Wrapper>
    </StyledCommentWriting.Container>
  );
};

export default CommentWriting;
