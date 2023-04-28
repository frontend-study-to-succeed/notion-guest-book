import styled from '@emotion/styled';
import { Flex } from '../atomic/styles/Flex.styled';

import StyledFloatedContainer from '../atomic/styles/FloatedContainer.styled';

export const StyledCommentTypeList = {
  Container: styled(Flex)`
    ${StyledFloatedContainer}
    flex-direction: column;

    position: absolute;
    bottom: 40px;
    left: 0;

    padding: 5px 0;
    width: 100%;
  `,
};
