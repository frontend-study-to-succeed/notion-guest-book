import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const StyledReaction = {
  Container: styled(motion.div)`
    margin-top: 8px;
    width: fit-content;
    padding: 6px 10px;
    border-radius: 50px;
    background-color: ${({ theme }) => theme.colors.lightgray};
  `,
};
