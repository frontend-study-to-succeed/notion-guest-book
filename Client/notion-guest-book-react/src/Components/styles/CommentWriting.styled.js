import styled from '@emotion/styled';
import { Flex } from './Flex.styled';

export const StyledCommentWriting = {
  Container: styled(Flex)`
    position: sticky;
    bottom: 0;
    width: 100%;
    height: 48px;
  `,
  Author: styled.input`
    height: 100%;
  `,
  Body: styled.input`
    width: 100%;
    height: 100%;
  `,
  Submit: styled.button`
    padding: 6px 12px;
    height: 100%;
    min-width: fit-content;
  `,
};
