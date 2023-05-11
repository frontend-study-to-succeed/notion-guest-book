import React, { useState } from 'react';

import ButtonWithIcon from './atomic/ButtonWithIcon';
import CommentMoreMenu from './CommentMoreMenu';
import EmojiPicker from './EmojiPicker';

import { StyledCommentMenuTools } from './styles/CommentMenuTools.styled';

const CommentMenuTools = ({ id, refetch }) => {
  const [isShow, setIsShow] = useState(false);
  const [isPickerShow, setIsPickerShow] = useState(false);

  const toggleHandler = (src) => {
    if (src === 'Reaction') {
      setIsShow(false);
      setIsPickerShow(!isPickerShow);
    } else if (src === 'More') {
      setIsPickerShow(false);
      setIsShow(!isShow);
    }
  };

  return (
    <StyledCommentMenuTools.Container>
      {/* TODO: 펼쳤을 때 콘텐츠가 다 나올만한 공간이 없으면 위로 뜨게 하기 */}
      <ButtonWithIcon type="Reaction" onClick={() => toggleHandler('Reaction')} />
      {isPickerShow && <EmojiPicker onEmojiClick={() => setIsPickerShow(false)} />}
      <ButtonWithIcon type="More" onClick={() => toggleHandler('More')} />
      {isShow && <CommentMoreMenu id={id} refetch={refetch} />}
    </StyledCommentMenuTools.Container>
  );
};

export default CommentMenuTools;
