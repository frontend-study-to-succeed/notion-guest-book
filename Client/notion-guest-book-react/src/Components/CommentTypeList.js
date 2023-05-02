import React from 'react';

import { StyledCommentTypeList } from './styles/CommentTypeList.styled';

import CommentTypeListItem from './CommentTypeListItem';
import TextWithIcon from './atomic/TextWithIcon';

const CommentTypeInfo = [
  {
    id: 0,
    icon: '🤵',
    text: '명언',
  },
  {
    id: 1,
    icon: '🎥',
    text: '유튜브',
  },
  {
    id: 2,
    icon: '🖼',
    text: '사진',
  },
  {
    id: 3,
    icon: '📃',
    text: '텍스트',
  },
];

const CommentTypeList = ({ onCommentTypeClick }) => {
  return (
    <StyledCommentTypeList.Container>
      {CommentTypeInfo.map(({ id, icon, text }) => (
        <CommentTypeListItem key={id} onClick={() => onCommentTypeClick(id)}>
          <TextWithIcon icon={icon}>{text}</TextWithIcon>
        </CommentTypeListItem>
      ))}
    </StyledCommentTypeList.Container>
  );
};

export default CommentTypeList;
