import React from 'react';

import { StyledCommentHistory } from './styles/CommentHistory.styled';
import CommentItem from './CommentItem';

import CommentList from '../test_comment_list.json';

export default function CommentHistory() {
  return (
    <StyledCommentHistory>
      {CommentList.map(({ name, date, type, comment, reaction }) => (
        <CommentItem
          author={name}
          date={new Intl.RelativeTimeFormat('ko', {
            numeric: 'auto',
          }).format(Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24)), 'days')}
          type={comment.type}
          content={comment.content}
        />
      ))}
      {/* <CommentItem
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
      <CommentItem author="김주현" date="방금 전" type="text" content="자~ 뒤졌습니다" /> */}
    </StyledCommentHistory>
  );
}
