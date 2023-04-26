import styled from '@emotion/styled';
import { Flex } from '../atomic/styles/Flex.styled';

export const StyledCommentInfo = {
  Container: styled(Flex)`
    flex-direction: column;
    width: calc(100% - (18px + 8px));
  `,
  Author: styled.span`
    font-weight: 600;
    margin-right: 8px;
  `,
  Date: styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.darkgray};
  `,
  Content: styled.div`
    margin-top: 4px;
    overflow-wrap: break-word;
  `,
};
