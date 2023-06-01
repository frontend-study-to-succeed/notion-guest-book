/** React 기본 Import */
import React, { useCallback, useEffect, useState } from 'react';

/** Styled 관련 Import */
import TextWithIcon from './atomic/TextWithIcon';
import { Icon } from './Icon';
import { StyledCommentType } from './styles/CommentType.styled';

/** 자식 컴포넌트 Import */
import CommentTypeList from './CommentTypeList';

/** Animation 관련 Import */
import { AnimatePresence } from 'framer-motion';

/** Redux 관련 Import */
import { useDispatch, useSelector } from 'react-redux';

/** Store Dispatch */
import { updateCommentType } from '../Store/commentInfoSlice';

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
  const storeDispatch = useDispatch();
  const { commentType } = useSelector((state) => state.commentInfo);

  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(3);

  useEffect(() => {
    setSelectedId(commentType);
  }, [commentType]);

  const handleCommentTypeClick = useCallback((id) => {
    setSelectedId(id);
    setIsListVisible(false);

    storeDispatch(updateCommentType(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      <AnimatePresence>
        {isListVisible && (
          <CommentTypeList
            CommentTypeInfo={CommentTypeInfo}
            onCommentTypeClick={handleCommentTypeClick}
          />
        )}
      </AnimatePresence>
    </StyledCommentType.Container>
  );
};

export default CommentType;
