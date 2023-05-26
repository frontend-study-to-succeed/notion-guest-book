/** React 기본 Import */
import React, { useCallback } from 'react';

/** Component Style */
import { Flex } from './atomic/styles/Flex.styled';
import { Icon } from './Icon';
import { StyledCommentInfo } from './styles/CommentInfo.styled';

/** 자식 Component */
import Reaction from './Reaction';

const YoutubeComponent = ({ url }) => {
  return (
    <StyledCommentInfo.YoutubeWrap>
      <StyledCommentInfo.StyledYoutube
        url={url}
        width="100%"
        height="100%"
        playing={false}
        controls={true}
      />
    </StyledCommentInfo.YoutubeWrap>
  );
};

const CoolSayingComponent = ({ saying, name }) => {
  return (
    <StyledCommentInfo.CoolSayingContainer>
      <StyledCommentInfo.CoolSayingWrapper>
        <Icon.CoolsayingL width="14px" color="white" />
        <StyledCommentInfo.CoolSayingContent>{saying}</StyledCommentInfo.CoolSayingContent>
        <Icon.CoolsayingR width="14px" color="white" />
      </StyledCommentInfo.CoolSayingWrapper>
      {`${name}, ${new Date().getFullYear()}`}
    </StyledCommentInfo.CoolSayingContainer>
  );
};

const ReplyComponent = ({ userName, replyContent }) => {
  return (
    <>
      <StyledCommentInfo.ReplyContainer>
        <Icon.Reply />
        <Flex column="1">
          <StyledCommentInfo.Author>
            {userName}
            <StyledCommentInfo.PlainText>님께 답장</StyledCommentInfo.PlainText>
          </StyledCommentInfo.Author>
          <StyledCommentInfo.Content>{replyContent}</StyledCommentInfo.Content>
        </Flex>
      </StyledCommentInfo.ReplyContainer>
    </>
  );
};

const ReactionComponent = ({ reactions }) => {
  return (
    <StyledCommentInfo.ReactionContainer>
      {reactions.map((reactionItem) => (
        <Reaction key={reactionItem._id} {...reactionItem} />
      ))}
    </StyledCommentInfo.ReactionContainer>
  );
};

const CommentInfo = ({
  userName,
  commentDate,
  commentType,
  commentContent,
  commentReactions,
  commentReply,
}) => {
  const getContentComponent = useCallback((commentType, userName) => {
    switch (commentType) {
      case '3':
        return commentContent;
      case '2':
        return <StyledCommentInfo.ImageContent src={commentContent} alt="" />;
      case '1':
        return <YoutubeComponent url={commentContent} />;
      case '0':
        return <CoolSayingComponent saying={commentContent} name={userName} />;
      default:
        return commentContent;
    }
  }, []);

  return (
    <StyledCommentInfo.Container>
      <StyledCommentInfo.AuthorAndDateWrapper>
        <StyledCommentInfo.Author>{userName}</StyledCommentInfo.Author>
        <StyledCommentInfo.Date>{commentDate}</StyledCommentInfo.Date>
      </StyledCommentInfo.AuthorAndDateWrapper>
      <Flex column="1">
        <StyledCommentInfo.Content>
          {commentReply && (
            <ReplyComponent
              userName={commentReply.userName}
              replyContent={commentReply.commentContent}
            />
          )}
          {getContentComponent(commentType, userName)}
        </StyledCommentInfo.Content>
        {commentReactions && <ReactionComponent reactions={commentReactions} />}
      </Flex>
    </StyledCommentInfo.Container>
  );
};

export default CommentInfo;
