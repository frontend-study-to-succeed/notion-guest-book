import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const StyledModalDeleteComment = {
  CategoryWrapper: styled(motion.div)`
    width: 100%;
  `,
  CategoryName: styled.p`
    font-size: 16px;
    font-weight: 600;
  `,
  InputBox: styled.input`
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    background: none;
    appearance: none;
    outline: none;
    padding: 12px 0;
    font-size: 14px;
    width: 100%;

    &:hover {
      border-bottom: 1px solid ${({ theme }) => theme.colors.darkgray};
    }
  `,
  ErrorState: styled.p`
    color: red;
  `,
};
