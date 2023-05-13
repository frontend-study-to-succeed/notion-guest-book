import React, { useCallback, useState } from 'react';
import { updateReaction } from '../API';

import ButtonWithIcon from './atomic/ButtonWithIcon';
import CommentMoreMenu from './CommentMoreMenu';
import EmojiPicker from './EmojiPicker';

import { StyledCommentMenuTools } from './styles/CommentMenuTools.styled';

const CommentMenuTools = ({ id, refetch }) => {
  const [isShow, setIsShow] = useState(false);
  const [isPickerShow, setIsPickerShow] = useState(false);

  const toggleHandler = useCallback(
    (src) => {
      if (src === 'Reaction') {
        setIsShow(false);
        setIsPickerShow(!isPickerShow);
      } else if (src === 'More') {
        setIsPickerShow(false);
        setIsShow(!isShow);
      }
    },
    [isPickerShow]
  );

  const handleReaction = async (value) => {
    await updateReaction(id, { icon: value });
    // console.log(String.fromCodePoint('0x' + value.toString(16)));

    setIsPickerShow(false);
    refetch();
  };

  return (
    <StyledCommentMenuTools.Container>
      {/* TODO: 펼쳤을 때 콘텐츠가 다 나올만한 공간이 없으면 위로 뜨게 하기 */}
      <ButtonWithIcon type="Reaction" onClick={() => toggleHandler('Reaction')} />
      {isPickerShow && <EmojiPicker onEmojiClick={handleReaction} />}
      <ButtonWithIcon type="More" onClick={() => toggleHandler('More')} />
      {isShow && <CommentMoreMenu id={id} refetch={refetch} handleShow={setIsShow} />}
    </StyledCommentMenuTools.Container>
  );
};

export default CommentMenuTools;
