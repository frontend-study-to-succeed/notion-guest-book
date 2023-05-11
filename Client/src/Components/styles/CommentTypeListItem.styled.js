import styled from '@emotion/styled';

export const StyledCommentTypeListItem = {
  Container: styled.li`
    padding: 4px 12px;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.lightgray};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.gray};
    }
  `,
};
