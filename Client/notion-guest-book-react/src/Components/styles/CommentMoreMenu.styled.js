import styled from '@emotion/styled';

import { Flex } from '../atomic/styles/Flex.styled';
import FloatedContainer from '../atomic/styles/FloatedContainer.styled';

export const StyledCommentMoreMenu = {
  Container: styled(Flex)`
    ${FloatedContainer}

    flex-direction: column;

    position: absolute;
    top: 38px;
    right: 0px;

    padding: 4px 0;

    width: max-content;
  `,
};
