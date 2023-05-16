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
    flex-direction: column;
    gap: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.darkgray};
    background-color: white;
    padding: 12px 0 12px;
    /* position: fixed;
    bottom: 0; */
    width: 100%;
  `,
  Wrapper: styled(Flex)`
    align-items: center;
    gap: 8px;
    width: 100%;
  `,
  Reply: {
    Container: styled(Flex)`
      flex-direction: row;
      gap: 8px;
      background-color: ${({ theme }) => theme.colors.lightgray};
      border-radius: 4px 4px 0 0;
      padding: 8px 4px;
    `,
    Author: styled.p`
      font-weight: 700;
    `,
    Content: styled.p``,
  },
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
