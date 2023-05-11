/** 기본 React Function Imported */
import React, { useCallback } from 'react';

/** CommentWriting Styled */
import { StyledCommentWriting } from './styles/CommentWriting.styled';

/** 필요한 자식 컴포넌트 */
import UserProfile from './atomic/UserProfile';
import CommentType from './CommentType';
import { Icon } from './Icon';

/** API */
import { postComment } from '../API';

/** Context */
import { MODAL_ACTION_TYPE, useModalDispatch } from '../Context/ModalContext';

/** Hooks */
import { useComment } from '../Context/CommentContext';
import useMutation from '../Hooks/useMutation';

/**
 * id에 따라서 방명록 타입을 반환하는 건데,,, 아마 리팩토링이 필요할 것 같긴 합니다
 * 따로 환경변수로 두거나 머 어디 다른 곳에서 export 하거나.
 */
const commentTypeInfo = ['coolsaying', 'youtube', 'image', 'text'];

const CommentWriting = ({ updateHistory }) => {
  const { commentInfo, mutateCommentInfo } = useComment();
  const modalDispatch = useModalDispatch();

  const { mutate } = useMutation(postComment, {
    onSuccess: updateHistory,
    onError: () => console.log('허걱 보내기 실패 ~'),
  });

  const uploadComment = useCallback(() => {
    commentInfo.commentDate = new Date();

    mutate(commentInfo);
    mutateCommentInfo('commentType', 3);
  }, [commentInfo]);

  /**
   * 명령어 목록을 담아두는 객체인데 이것도 이 자리에 있는 게 조금 머시깽합니다
   */
  const commandList = new Map([
    [
      '/setting',
      () =>
        modalDispatch({
          type: MODAL_ACTION_TYPE.OPEN,
        }),
    ],
  ]);

  const handleEnter = useCallback(
    (e) => {
      if (e.keyCode !== 13) {
        return;
      }

      const hasCommand = commandList.has(commentInfo.commentContent);

      if (hasCommand) {
        const commandFunction = commandList.get(commentInfo.commentContent);
        commandFunction();
      } else {
        uploadComment();
      }

      cleanComment();
    },
    [commentInfo]
  );

  const handleCommentChange = useCallback((e) => {
    // setCommentState((prevState) => ({ ...prevState, content: e.target.value }));
    mutateCommentInfo('commentContent', e.target.value);
  }, []);

  const cleanComment = useCallback(
    // () => setCommentState((prevState) => ({ ...prevState, content: '' })),
    () => mutateCommentInfo('commentContent', ''),
    []
  );

  return (
    <StyledCommentWriting.Container>
      <StyledCommentWriting.Wrapper>
        <UserProfile profile={commentInfo.userProfile} />
        <CommentType />
        <StyledCommentWriting.Body
          placeholder="방명록 남기기..."
          value={commentInfo.commentContent}
          onKeyUp={handleEnter}
          onChange={handleCommentChange}
        />
        <StyledCommentWriting.Submit>
          <Icon.Push width="24px" height="24px" color="point" />
        </StyledCommentWriting.Submit>
      </StyledCommentWriting.Wrapper>
    </StyledCommentWriting.Container>
  );
};

export default CommentWriting;
