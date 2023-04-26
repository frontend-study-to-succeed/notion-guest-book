import styled from '@emotion/styled';

import { Flex } from './Flex.styled';

export const StyledTextWithIcon = {
  Container: styled(Flex)`
    flex-direction: row;
    align-items: center;
    gap: 4px;
  `,
  Count: styled.span`
    font-weight: 500;
  `,
};
