import React from 'react';

import EP from 'emoji-picker-react';
import styled from '@emotion/styled';

const StyledEmojiPicker = styled.div`
  position: absolute;
  top: 38px;
  right: 0;
`;

const EmojiPicker = ({ onEmojiClick }) => {
  return (
    <StyledEmojiPicker>
      <EP onEmojiClick={onEmojiClick} />
    </StyledEmojiPicker>
  );
};

export default EmojiPicker;
