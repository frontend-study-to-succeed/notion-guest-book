import React from 'react';

import { StyledCommentTypeList } from './styles/CommentTypeList.styled';

import CommentTypeListItem from './CommentTypeListItem';
import TextWithIcon from './atomic/TextWithIcon';

const CommentTypeList = () => {
  return (
    <StyledCommentTypeList.Container>
      <CommentTypeListItem>
        <TextWithIcon icon="🤵">명언</TextWithIcon>
      </CommentTypeListItem>
      <CommentTypeListItem>
        <TextWithIcon icon="🎥">유튜브</TextWithIcon>
      </CommentTypeListItem>
      <CommentTypeListItem>
        <TextWithIcon icon="🖼">사진</TextWithIcon>
      </CommentTypeListItem>
      <CommentTypeListItem>
        <TextWithIcon icon="📃">텍스트</TextWithIcon>
      </CommentTypeListItem>
    </StyledCommentTypeList.Container>
  );
};

export default CommentTypeList;
