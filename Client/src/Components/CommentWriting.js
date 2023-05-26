/** 기본 React Function Imported */
import React, { useCallback } from 'react';

/** CommentWriting Styled */
import { StyledCommentWriting } from './styles/CommentWriting.styled';

/** 필요한 자식 컴포넌트 */
import UserProfile from './atomic/UserProfile';
import CommentType from './CommentType';
import { Icon } from './Icon';

/** Context */
import { MODAL_ACTION_TYPE, useModal } from '../Context/ModalContext';

/** Hooks */
import { useComment } from '../Context/CommentContext';
import { useUserInfo } from '../Context/UserInfoContext';
import useCommentHistory from '../Hooks/useCommentHistory';
import useDataFetcher, { DISPATCH_TYPE } from '../Hooks/useDataFetcher';

/** Modal Component */
import { MODAL_COMPONENT } from '../Context/ModalContext';

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
  const { commentInfo, mutateCommentInfo } = useComment();
  const { userInfo } = useUserInfo();
  const { modalDispatch } = useModal();

  const { dataDispatch } = useDataFetcher();
  const { updateCommentHistory } = useCommentHistory();

  const uploadComment = useCallback(() => {
    commentInfo.commentDate = new Date();
    // 아래 코드는 commentInfo를 바꾸고 다시 함수가 만들어지는데에 시간이 걸려서,
    // post를 보낼 땐 적용이 안 된다 ㅠ
    // mutateCommentInfo('commentDate', new Date());

    const dispatchCallbacks = {
      onSuccess: updateCommentHistory,
    };

    dataDispatch(DISPATCH_TYPE.CREATE_COMMENT, dispatchCallbacks, commentInfo);

    mutateCommentInfo('commentType', 3);
    mutateCommentInfo('commentReply', '');
  }, [commentInfo]);

  const handleEnter = useCallback(
    (e) => {
      if (e.keyCode !== 13) {
        return;
      }

      tryUploadComment();
    },
    [commentInfo]
  );

  const handleCommentChange = useCallback(
    (e) => {
      mutateCommentInfo('commentContent', e.target.value);
    },
    [commentInfo]
  );

  const cleanComment = useCallback(() => mutateCommentInfo('commentContent', ''), []);

  const tryUploadComment = useCallback(() => {
    const commandList = new Map([
      [
        '/setting',
        () =>
          modalDispatch({
            type: MODAL_ACTION_TYPE.OPEN,
            componentType: MODAL_COMPONENT.USER_INFO,
          }),
      ],
    ]);

    const hasCommand = commandList.has(commentInfo.commentContent);

    if (hasCommand) {
      const commandFunction = commandList.get(commentInfo.commentContent);
      commandFunction();
    } else {
      uploadComment();
    }

    cleanComment();
  }, [commentInfo]);

  const getReplyContent = useCallback((commentType, commentContent) => {
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
  }, []);

  return (
    <StyledCommentWriting.Container id={id}>
      {commentInfo.commentReply && (
        <ReplyComponent
          commentReply={commentInfo.commentReply}
          replyContent={getReplyContent(
            commentInfo.commentReply.commentType,
            commentInfo.commentReply.commentContent
          )}
          onClick={() => mutateCommentInfo('commentReply', '')}
        />
      )}
      <StyledCommentWriting.Wrapper>
        <UserProfile userProfile={userInfo.userProfile} />
        <CommentType />
        <StyledCommentWriting.Body
          placeholder="방명록 남기기..."
          value={commentInfo.commentContent}
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
