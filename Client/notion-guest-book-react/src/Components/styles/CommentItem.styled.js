import styled from '@emotion/styled';
import { Flex } from '../atomic/styles/Flex.styled';

export const StyledCommentItem = {
  Container: styled(Flex)`
    align-items: flex-start;
    gap: 8px;

    & + & {
      margin-top: 24px;
    }
  `,
};
