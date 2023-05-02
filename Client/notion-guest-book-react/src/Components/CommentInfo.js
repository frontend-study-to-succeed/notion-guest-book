import React from 'react';

import { Flex } from './atomic/styles/Flex.styled';
import { StyledCommentInfo } from './styles/CommentInfo.styled';
import Reaction from './Reaction';
import { Icon } from './Icon';
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

const ReactionContainer = styled(Flex)`
  gap: 8px;
`;

const ReplyContainer = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.lightgray};
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.darkgray};
`;

const AuthorAndDateWrapper = styled(Flex)`
  flex-direction: row;
  align-items: baseline;
`;

const CommentInfo = ({ author, date, type, content, reaction, reply }) => {
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
      case 'reply':
        return (
          <>
            <ReplyContainer>
              <Icon.Reply />
              <Flex column>
                <StyledCommentInfo.Author>{reply.author}</StyledCommentInfo.Author>
                <StyledCommentInfo.Content>{reply.content}</StyledCommentInfo.Content>
              </Flex>
            </ReplyContainer>
            {content}
          </>
        );
      default:
        return content;
    }
  };

  return (
    <StyledCommentInfo.Container>
      <AuthorAndDateWrapper>
        <StyledCommentInfo.Author>{author}</StyledCommentInfo.Author>
        <StyledCommentInfo.Date>{date}</StyledCommentInfo.Date>
      </AuthorAndDateWrapper>
      <Flex column>
        <StyledCommentInfo.Content>{returnContent(type)}</StyledCommentInfo.Content>
        <ReactionContainer>
          {reaction && reaction.map((reactionItem) => <Reaction {...reactionItem} />)}
        </ReactionContainer>
      </Flex>
    </StyledCommentInfo.Container>
  );
};

export default CommentInfo;
