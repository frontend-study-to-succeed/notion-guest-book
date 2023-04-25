import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Flex = styled.div`
  display: flex;
  align-items: center;

  ${({ row }) =>
    row &&
    css`
      flex-direction: row;
    `}

  ${({ column }) =>
    column &&
    css`
      flex-direction: column;
    `}
`;
