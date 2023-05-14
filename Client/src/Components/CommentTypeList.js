/** React 기본 import */
import React from 'react';

/** Component Style */
import { StyledCommentTypeList } from './styles/CommentTypeList.styled';

/** 자식 컴포넌트 */
import TextWithIcon from './atomic/TextWithIcon';
import CommentTypeListItem from './CommentTypeListItem';

const CommentTypeList = ({ CommentTypeInfo, onCommentTypeClick }) => {
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
