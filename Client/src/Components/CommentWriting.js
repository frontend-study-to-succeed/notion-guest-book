/** 기본 React Function Imported */
import React, { useEffect, useState } from 'react';

/** CommentWriting Styled */
import { StyledCommentWriting } from './styles/CommentWriting.styled';

/** 필요한 자식 컴포넌트 */
import UserProfile from './atomic/UserProfile';
import CommentType from './CommentType';
import { Icon } from './Icon';

/** Hooks */
import useDataFetcher, { DISPATCH_TYPE } from '../Hooks/useDataFetcher';

/** Redux 관련 Import */
import { useDispatch, useSelector } from 'react-redux';

/** Store Dispatch */
import { updateCommentHistory } from '../Store/commentHistoryInfoSlice';
import { MODAL_COMPONENT, openModal } from '../Store/modalInfoSlice';
import {
  updateCommentContent,
  updateCommentDate,
  updateCommentReply,
  updateCommentType,
} from '../Store/commentInfoSlice';

const ReplyComponent = ({ commentReply, replyContent, onClick }) => {
  return (
    <StyledCommentWriting.Reply.Container>
      <Icon.Reply />
      <UserProfile userProfile={commentReply.userProfile} />
      <div style={{ width: '100%' }}>
        <StyledCommentWriting.Reply.Author>
          {commentReply.userName}
        </StyledCommentWriting.Reply.Author>
        <StyledCommentWriting.Reply.Content>{replyContent}</StyledCommentWriting.Reply.Content>
      </div>
      <button onClick={onClick}>❌</button>
    </StyledCommentWriting.Reply.Container>
  );
};

const CommentWriting = ({ id }) => {
  const storeDispatch = useDispatch();

  const commentInfo = useSelector((state) => state.commentInfo);
  const userInfo = useSelector((state) => state.userInfo);

  const [commentContent, setCommentContent] = useState('');

  const [startUploading, setStartUploading] = useState(false);

  const { dataDispatch } = useDataFetcher();

  useEffect(() => {
    if (!startUploading) {
      return;
    }

    const dispatchCallbacks = {
      onSuccess: (dispatchType, response) => {
        storeDispatch(updateCommentHistory({ dispatchType, response }));
        storeDispatch(updateCommentType(3));
        storeDispatch(updateCommentReply(null));

        setStartUploading(false);
        cleanComment();
      },
    };

    dataDispatch(
      DISPATCH_TYPE.CREATE_COMMENT,
      dispatchCallbacks,
      Object.assign({}, userInfo, commentInfo)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startUploading]);

  const uploadComment = () => {
    storeDispatch(updateCommentDate({ date: new Date() }));
    storeDispatch(updateCommentContent(commentContent));

    setStartUploading(true);
  };

  const handleEnter = (e) => {
    if (e.keyCode !== 13) {
      return;
    }

    tryUploadComment();
  };

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const cleanComment = () => {
    storeDispatch(updateCommentContent(''));
    setCommentContent('');
  };

  const tryUploadComment = () => {
    const commandList = new Map([
      [
        '/setting',
        () =>
          storeDispatch(
            openModal({
              modalType: MODAL_COMPONENT.USER_INFO,
            })
          ),
      ],
    ]);

    const hasCommand = commandList.has(commentContent);

    if (hasCommand) {
      const commandFunction = commandList.get(commentContent);
      commandFunction();
      cleanComment();
    } else {
      uploadComment();
    }
  };

  const getReplyContent = (commentType, commentContent) => {
    switch (commentType) {
      case '0':
        return `[명언] ${commentContent}`;

      case '1':
        return '[유튜브]';

      case '2':
        return '[사진]';

      default:
        return commentContent;
    }
  };

  const cleanReplyInfo = () => {
    storeDispatch(updateCommentReply(''));
  };

  return (
    <StyledCommentWriting.Container id={id}>
      {commentInfo.commentReply && (
        <ReplyComponent
          commentReply={commentInfo.commentReply}
          replyContent={getReplyContent(
            commentInfo.commentReply.commentType,
            commentInfo.commentReply.commentContent
          )}
          onClick={() => cleanReplyInfo()}
        />
      )}
      <StyledCommentWriting.Wrapper>
        <UserProfile userProfile={userInfo.userProfile} />
        <CommentType />
        <StyledCommentWriting.Body
          placeholder="방명록 남기기..."
          value={commentContent}
          onKeyUp={handleEnter}
          onChange={handleCommentChange}
        />
        <StyledCommentWriting.Submit onClick={tryUploadComment}>
          <Icon.Push width="24px" height="24px" color="point" />
        </StyledCommentWriting.Submit>
      </StyledCommentWriting.Wrapper>
    </StyledCommentWriting.Container>
  );
};

export default CommentWriting;
