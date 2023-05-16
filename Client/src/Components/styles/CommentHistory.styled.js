import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Flex } from '../atomic/styles/Flex.styled';

export const StyledCommentHistory = {
  Container: styled(Flex)`
    align-items: center;
    gap: 24px;

    width: 100%;
    height: 100%;
    /* max-height: calc(100vh - ${({ writingHeight }) => writingHeight + 'px'}); */
    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 16px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #606060;
      border: 4px solid transparent;
      border-radius: 8px;
      background-clip: content-box;
    }
  `,
  ErrorMessage: styled(motion.div)`
    padding: 4px 8px;
    font-weight: 600;
    width: fit-content;
    color: red;
  `,
  RefetchButton: styled.button`
    padding: 12px 24px;
    border: none;
    appearance: none;
    outline: none;
    font-weight: 600;
    border-radius: 50px;
    background-color: ${({ theme }) => theme.colors.lightgray};
  `,
};
