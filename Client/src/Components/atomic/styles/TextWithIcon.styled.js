import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Flex } from './Flex.styled';

export const StyledTextWithIcon = {
  Container: styled(Flex)`
    flex-direction: row;
    align-items: center;
    gap: 4px;
    min-width: fit-content;
  `,
  Icon: styled.span`
    min-width: 24px;
    text-align: center;
  `,
  Count: styled.span`
    font-weight: 500;
    min-width: fit-content;
    color: ${({ color }) => color};
  `,
};
