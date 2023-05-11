import React, { useEffect, useState } from 'react';

import { StyledCommentItem } from './styles/CommentItem.styled';

import UserProfile from './atomic/UserProfile';
import CommentInfo from './CommentInfo';
import CommentMenuTools from './CommentMenuTools';

const CommentItem = ({ id, refetch, userProfile, ...commentPros }) => {
  let [isOver, setIsOver] = useState(false);

  return (
    <StyledCommentItem.Container
      data-comment-id={id}
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      <UserProfile userProfile={userProfile} />
      <CommentInfo {...commentPros} />
      {isOver && <CommentMenuTools id={id} refetch={refetch} />}
    </StyledCommentItem.Container>
  );
};

export default CommentItem;
