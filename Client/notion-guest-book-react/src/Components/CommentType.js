import React, { useState } from 'react';

import { StyledCommentType } from './styles/CommentType.styled';

import { Icon } from './Icon';
import TextWithIcon from './atomic/TextWithIcon';
import CommentTypeList from './CommentTypeList';

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

const CommentType = ({ onCommentTypeClick }) => {
  const [isShow, setIsShow] = useState(false);
  const [currentType, setCurrentType] = useState(CommentTypeInfo[3]);

  const handleCommentTypeClick = (id) => {
    setCurrentType({ ...CommentTypeInfo[id] });
    setIsShow(false);
  };

  return (
    <StyledCommentType.Container>
      <StyledCommentType.Wrapper onClick={() => setIsShow(!isShow)}>
        <TextWithIcon icon={currentType.icon}>{currentType.text}</TextWithIcon>
        <Icon.Open width="24px" height="24px" />
      </StyledCommentType.Wrapper>
      {isShow && <CommentTypeList onCommentTypeClick={(id) => handleCommentTypeClick(id)} />}
    </StyledCommentType.Container>
  );
};

export default CommentType;
