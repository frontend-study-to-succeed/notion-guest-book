import React from 'react';

import { StyledCommentHistory } from './styles/CommentHistory.styled';
import CommentItem from './CommentItem';

// import CommentList from '../test_comment_list.json';
const CommentList = [
  {
    id: 0,
    name: '김주현',
    date: '2023/04/28 17:44',
    comment: {
      type: 'text',
      content: '자~ 뒤졌습니다~',
    },
    reaction: [
      {
        id: 0,
        icon: '😇',
        count: 1,
      },
      {
        id: 1,
        icon: '😂',
        count: 1,
      },
    ],
  },
  {
    id: 1,
    name: '김주현',
    date: '2023/04/28 17:44',
    comment: {
      type: 'image',
      content: 'https://jjalbang.today/jjv1or.jpg',
    },
    reaction: [
      {
        id: 0,
        icon: '😢',
        count: 1,
      },
    ],
  },
  {
    id: 2,
    name: '김주현',
    date: '2023/04/28 17:44',
    comment: {
      type: 'youtube',
      content: 'https://youtu.be/wEj8vX7xoPQ',
    },
    reaction: [
      {
        id: 0,
        icon: '👍',
        count: 1,
      },
      {
        id: 1,
        icon: '😍',
        count: 1,
      },
      {
        id: 2,
        icon: '🥰',
        count: 1,
      },
    ],
  },
  {
    id: 3,
    name: '김주현',
    date: '2023/04/28 17:44',
    comment: {
      type: 'reply',
      content: '조용히 하세요.',
    },
    reaction: [
      {
        id: 0,
        icon: '😢',
        count: 1,
      },
    ],
    reply: {
      id: 0,
      author: '김주현',
      content: '하지만 뒤지는 건...',
    },
  },
];

export default function CommentHistory() {
  return (
    <StyledCommentHistory>
      {CommentList.map(({ id, name, date, type, comment, reaction, reply }) => (
        <CommentItem
          key={id}
          author={name}
          date={new Intl.RelativeTimeFormat('ko', {
            numeric: 'auto',
          }).format(Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24)), 'days')}
          type={comment.type}
          content={comment.content}
          reaction={reaction}
          reply={reply}
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
