import styled from '@emotion/styled';

export const StyledCommentItem = {
  Author: styled.span`
    font-weight: 600;
    margin-right: 4px;
  `,
  Date: styled.span`
    color: ${({ theme }) => theme.colors.darkgray};
  `,
  Content: styled.div`
    margin-top: 4px;
  `,
};
