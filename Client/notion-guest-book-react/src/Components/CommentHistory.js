import React from 'react';

import { StyledCommentHistory } from './styles/CommentHistory.styled';
import CommentItem from './CommentItem';

export default function CommentHistory() {
  return (
    <StyledCommentHistory>
      <CommentItem
        author="김주현"
        date="방금 전"
        type="text"
        content="자~ 뒤졌습니다"
        reaction={{ icon: '😇', count: 1 }}
      />
      <CommentItem
        author="김주현"
        date="방금 전"
        type="image"
        content="https://jjalbang.today/jjv1or.jpg"
      />
      <CommentItem
        author="김주현"
        date="방금 전"
        type="youtube"
        content="https://youtu.be/wEj8vX7xoPQ"
      />
      <CommentItem author="김주현" date="방금 전" type="text" content="자~ 뒤졌습니다" />
      <CommentItem author="김주현" date="방금 전" type="text" content="자~ 뒤졌습니다" />
      <CommentItem author="김주현" date="방금 전" type="text" content="자~ 뒤졌습니다" />
      <CommentItem author="김주현" date="방금 전" type="text" content="자~ 뒤졌습니다" />
      <CommentItem author="김주현" date="방금 전" type="text" content="자~ 뒤졌습니다" />
      <CommentItem author="김주현" date="방금 전" type="text" content="자~ 뒤졌습니다" />
      <CommentItem author="김주현" date="방금 전" type="text" content="자~ 뒤졌습니다" />
      <CommentItem author="김주현" date="방금 전" type="text" content="자~ 뒤졌습니다" />
      <CommentItem author="김주현" date="방금 전" type="text" content="자~ 뒤졌습니다" />
      <CommentItem author="김주현" date="방금 전" type="text" content="자~ 뒤졌습니다" />
      <CommentItem author="김주현" date="방금 전" type="text" content="자~ 뒤졌습니다" />
      <CommentItem author="김주현" date="방금 전" type="text" content="자~ 뒤졌습니다" />
      <CommentItem author="김주현" date="방금 전" type="text" content="자~ 뒤졌습니다" />
      <CommentItem author="김주현" date="방금 전" type="text" content="자~ 뒤졌습니다" />
      <CommentItem author="김주현" date="방금 전" type="text" content="자~ 뒤졌습니다" />
    </StyledCommentHistory>
  );
}
