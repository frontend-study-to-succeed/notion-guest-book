import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const StyledCommentTypeListItem = {
  Container: styled(motion.li)`
    padding: 4px 12px;
    cursor: pointer;

    user-select: none;

    &:hover {
      background-color: ${({ theme }) => theme.colors.lightgray};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.gray};
    }
  `,
};
