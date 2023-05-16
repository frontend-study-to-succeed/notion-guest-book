/** React 기본 import */
import React from 'react';

/** Component Style */
import { StyledCommentTypeList } from './styles/CommentTypeList.styled';

/** 자식 컴포넌트 */
import TextWithIcon from './atomic/TextWithIcon';
import CommentTypeListItem from './CommentTypeListItem';

const animationVariant = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.15,
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.15,
    },
  },
};

const CommentTypeList = ({ CommentTypeInfo, onCommentTypeClick }) => {
  return (
    <StyledCommentTypeList.Container
      variants={animationVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {CommentTypeInfo.map(({ id, icon, text }) => (
        <CommentTypeListItem key={id} onClick={() => onCommentTypeClick(id)}>
          <TextWithIcon icon={icon}>{text}</TextWithIcon>
        </CommentTypeListItem>
      ))}
    </StyledCommentTypeList.Container>
  );
};

export default CommentTypeList;
