import React, { useCallback } from 'react';

import { Flex } from './atomic/styles/Flex.styled';
import { StyledCommentInfo } from './styles/CommentInfo.styled';
import Reaction from './Reaction';
import { Icon } from './Icon';
import styled from '@emotion/styled';
import YouTube from 'react-player';

const YoutubeWrap = styled.div`
  position: relative;
  padding-top: 56.25%;
  border-radius: 4px;
  overflow: hidden;
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
  border-radius: 4px;
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

const CommentInfo = ({
  userName,
  commentDate,
  commentType,
  commentContent,
  commentReactions,
  commentReply,
}) => {
  const loadImageContent = (url) => {
    const tmpImage = new Image();

    const handleLoad = () => {};

    tmpImage.addEventListener('load', handleLoad);
    tmpImage.src = url;
  };

  const returnContent = useCallback((commentType) => {
    switch (commentType) {
      case '3':
        return commentContent;
      case '2':
        return <ImageContent src={commentContent} alt="" />;
      case '1':
        return (
          <YoutubeWrap>
            <StyledYoutube
              url={commentContent}
              width="100%"
              height="100%"
              playing={false}
              controls={true}
            />
          </YoutubeWrap>
        );
      default:
        return commentContent;
    }
  }, []);

  return (
    <StyledCommentInfo.Container>
      <AuthorAndDateWrapper>
        <StyledCommentInfo.Author>{userName}</StyledCommentInfo.Author>
        <StyledCommentInfo.Date>{commentDate}</StyledCommentInfo.Date>
      </AuthorAndDateWrapper>
      <Flex column>
        <StyledCommentInfo.Content>
          {commentReply && (
            <>
              <ReplyContainer>
                <Icon.Reply />
                <Flex column>
                  <StyledCommentInfo.Author>
                    {commentReply.userName}
                    <StyledCommentInfo.PlainText>님께 답장</StyledCommentInfo.PlainText>
                  </StyledCommentInfo.Author>
                  <StyledCommentInfo.Content>
                    {commentReply.commentContent}
                  </StyledCommentInfo.Content>
                </Flex>
              </ReplyContainer>
            </>
          )}
          {returnContent(commentType)}
        </StyledCommentInfo.Content>
        {(commentReactions.length && (
          <ReactionContainer>
            {commentReactions.map((reactionItem) => (
              <Reaction key={reactionItem._id} {...reactionItem} />
            ))}
          </ReactionContainer>
        )) ||
          null}
      </Flex>
    </StyledCommentInfo.Container>
  );
};

export default CommentInfo;
