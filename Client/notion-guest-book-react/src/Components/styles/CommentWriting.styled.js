import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Flex } from '../atomic/styles/Flex.styled';

const resetStyle = css`
  border: none;
  outline: none;
  background: none;
  appearance: none;
`;

export const StyledCommentWriting = {
  Container: styled(Flex)`
    padding: 12px 0 12px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.darkgray};
  `,
  Wrapper: styled(Flex)`
    align-items: center;
    gap: 8px;
    position: sticky;
    bottom: 0;
    width: 100%;
    height: 28px;
  `,
  Author: styled.input`
    ${resetStyle}
    height: 100%;
  `,
  Body: styled.input`
    ${resetStyle}
    font-size: 16px;
    width: 100%;
    height: 100%;
  `,
  Submit: styled.button`
    ${resetStyle}
    height: 100%;
    min-width: fit-content;
    cursor: pointer;
  `,
};
