/** 기본 React Function Imported */
import React, { useCallback, useState } from 'react';

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
import useMutation from '../Hooks/useMutation';

/**
 * id에 따라서 방명록 타입을 반환하는 건데,,, 아마 리팩토링이 필요할 것 같긴 합니다
 * 따로 환경변수로 두거나 머 어디 다른 곳에서 export 하거나.
 */
const commentTypeInfo = ['coolsaying', 'youtube', 'image', 'text'];

const CommentWriting = ({ userInfo, updateHistory }) => {
  const modalDispatch = useModalDispatch();

  const { mutate } = useMutation(postComment, {
    onSuccess: updateHistory,
    onError: () => console.log('허걱 보내기 실패 ~'),
  });

  const [commentState, setCommentState] = useState({
    type: 3,
    content: '',
  });

  const uploadComment = useCallback(() => {
    // const userInfo = JSON.parse(window.localStorage.getItem('notion-guest-book-info'));

    const postDate = {
      name: userInfo.userName,
      profile: userInfo.userProfile,
      password: userInfo.userPassword,
      date: new Date(),
      commentType: commentTypeInfo[commentState.type],
      content: commentState.content.trim(),
      reaction: [],
    };

    mutate(postDate);
  }, [commentState]);

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

      const trimedContent = commentState.content.trim();

      if (!trimedContent) {
        return;
      }

      const hasCommand = commandList.has(trimedContent);

      if (hasCommand) {
        const commandFunction = commandList.get(trimedContent);
        commandFunction();
      } else {
        uploadComment();
      }

      cleanComment();
    },
    [commentState]
  );

  const handleCommentTypeClick = useCallback((id) => {
    setCommentState((prevState) => ({ ...prevState, type: id }));
  }, []);

  const handleCommentChange = useCallback((e) => {
    setCommentState((prevState) => ({ ...prevState, content: e.target.value }));
  }, []);

  const cleanComment = useCallback(
    () => setCommentState((prevState) => ({ ...prevState, content: '' })),
    []
  );

  return (
    <StyledCommentWriting.Container>
      <StyledCommentWriting.Wrapper>
        <UserProfile profile={userInfo?.userProfile} />
        <CommentType onCommentTypeClick={handleCommentTypeClick} />
        <StyledCommentWriting.Body
          placeholder="방명록 남기기..."
          value={commentState.content}
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
