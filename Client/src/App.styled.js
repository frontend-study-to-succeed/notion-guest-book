import styled from '@emotion/styled';

export const StyledApp = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;

    background-color: white;

    transition: 0.1s padding cubic-bezier(0.075, 0.82, 0.165, 1);

    /* &:hover {
      padding: 12px;
    } */
  `,
};
