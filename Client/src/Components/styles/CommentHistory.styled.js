import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const StyledCommentHistory = styled(motion.div)`
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
`;
