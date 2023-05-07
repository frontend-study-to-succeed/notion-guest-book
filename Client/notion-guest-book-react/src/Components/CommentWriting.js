import React, { useState } from 'react';

import { StyledCommentWriting } from './styles/CommentWriting.styled';

import UserProfile from './atomic/UserProfile';
import CommentType from './CommentType';
import { Icon } from './Icon';

import { useModalDispatch, MODAL_ACTION_TYPE } from '../Context/ModalContext';

const commentTypeInfo = ['coolsaying', 'youtube', 'image', 'text'];

const CommentWriting = ({ updateHistory }) => {
  const modalDispatch = useModalDispatch();

  const [commentContent, setCommentContent] = useState('');
  const [commentTypeState, setCommentType] = useState(3);

  const pushComment = async () => {
    const userInfo = JSON.parse(window.localStorage.getItem('notion-guest-book-info'));

    console.log(userInfo);

    try {
      const fetchPromise = await fetch('http://localhost:3001/api/v1/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userInfo.userName,
          password: userInfo.userPassword,
          date: new Date(),
          commentType: commentTypeInfo[commentTypeState],
          content: commentContent,
          reaction: [],
        }),
      });

      const response = await fetchPromise.json();
      console.log(response);

      updateHistory();

      // if (response.status )
    } catch (error) {}
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      if (commentContent === '/setting') {
        setCommentContent('');

        modalDispatch({
          type: MODAL_ACTION_TYPE.OPEN,
        });

        return;
      }

      pushComment();
      setCommentContent('');
    }
  };

  return (
    <StyledCommentWriting.Container>
      <StyledCommentWriting.Wrapper>
        <UserProfile />
        <CommentType onCommentTypeClick={(id) => setCommentType(id)} />
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
