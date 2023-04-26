import React from 'react';

import { Flex } from './atomic/styles/Flex.styled';
import { StyledCommentInfo } from './styles/CommentInfo.styled';
import Reaction from './Reaction';
import styled from '@emotion/styled';
import YouTube from 'react-player';

const YoutubeWrap = styled.div`
  position: relative;
  padding-top: 56.25%;
`;

const StyledYoutube = styled(YouTube)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ImageContent = styled.img`
  display: block;
  max-width: 100%;
`;

const CommentInfo = ({ author, date, type, content, reaction }) => {
  const returnContent = (type) => {
    switch (type) {
      case 'text':
        return content;
      case 'image':
        return <ImageContent src={content} alt="" />;
      case 'youtube':
        return (
          <YoutubeWrap>
            <StyledYoutube
              url={content}
              width="100%"
              height="100%"
              playing={false}
              controls={true}
            />
          </YoutubeWrap>
        );
      default:
        return content;
    }
  };

  return (
    <StyledCommentInfo.Container>
      <Flex row>
        <StyledCommentInfo.Author>{author}</StyledCommentInfo.Author>
        <StyledCommentInfo.Date>{date}</StyledCommentInfo.Date>
      </Flex>
      <Flex column>
        <StyledCommentInfo.Content>{returnContent(type)}</StyledCommentInfo.Content>
        {reaction && <Reaction {...reaction} />}
      </Flex>
    </StyledCommentInfo.Container>
  );
};

export default CommentInfo;
