import styled from '@emotion/styled';

import { Flex } from '../atomic/styles/Flex.styled';
import StyledFloatedContainer from '../atomic/styles/FloatedContainer.styled';

export const StyledCommentMenuTools = {
  Container: styled(Flex)`
    ${StyledFloatedContainer}

    position: absolute;
    top: 2px;
    right: 2px;

    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4px;

    z-index: 999;
  `,
};
