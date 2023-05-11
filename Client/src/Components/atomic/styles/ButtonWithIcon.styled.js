import styled from '@emotion/styled';
import { css } from '@emotion/react';

const resetStyle = css`
  background: none;
  border: none;
  outline: none;
  appearance: none;
`;

export const StyledButtonWithIcon = {
  Button: styled.button`
    ${resetStyle}

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 2px 3px;

    border-radius: 4px;

    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.lightgray};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.gray};
    }
  `,
};
