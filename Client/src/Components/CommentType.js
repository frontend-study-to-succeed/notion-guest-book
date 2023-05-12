/** React 기본 Import */
import React, { useCallback, useEffect, useState } from 'react';

/** Styled 관련 Import */
import TextWithIcon from './atomic/TextWithIcon';
import { StyledCommentType } from './styles/CommentType.styled';
import { Icon } from './Icon';

/** 자식 컴포넌트 Import */
import CommentTypeList from './CommentTypeList';

/** Hooks */
import { useComment } from '../Context/CommentContext';

/** 방명록 타입 맵 */
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

const CommentType = () => {
  const { commentInfo, mutateCommentInfo } = useComment();

  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(3);

  useEffect(() => {
    setSelectedId(commentInfo.commentType);
  }, [commentInfo]);

  const handleCommentTypeClick = useCallback((id) => {
    setSelectedId(id);
    setIsListVisible(false);

    mutateCommentInfo('commentType', id);
  }, []);

  const handleClick = useCallback(() => {
    setIsListVisible(!isListVisible);
  }, [isListVisible]);

  return (
    <StyledCommentType.Container>
      <StyledCommentType.Wrapper onClick={handleClick}>
        <TextWithIcon icon={CommentTypeInfo[selectedId].icon}>
          {CommentTypeInfo[selectedId].text}
        </TextWithIcon>
        <Icon.Open width="24px" height="24px" />
      </StyledCommentType.Wrapper>

      {isListVisible && (
        <CommentTypeList
          CommentTypeInfo={CommentTypeInfo}
          onCommentTypeClick={handleCommentTypeClick}
        />
      )}
    </StyledCommentType.Container>
  );
};

export default CommentType;
