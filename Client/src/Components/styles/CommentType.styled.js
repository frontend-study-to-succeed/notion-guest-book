import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Flex } from '../atomic/styles/Flex.styled';

export const StyledCommentType = {
  Container: styled(motion.div)`
    position: relative;
    min-width: fit-content;

    user-select: none;
  `,
  Wrapper: styled(Flex)`
    align-items: center;
    justify-content: center;

    border-radius: 50px;
    padding: 4px 12px;

    height: 28px;
    min-width: fit-content;

    background-color: ${({ theme }) => theme.colors.lightgray};

    cursor: pointer;
  `,
};
