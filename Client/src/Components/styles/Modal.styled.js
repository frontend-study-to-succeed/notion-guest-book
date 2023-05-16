import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Flex } from '../atomic/styles/Flex.styled';

export const StyledModal = {
  Container: styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    max-height: 100vh;

    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);

    z-index: 999;
  `,
  Box: styled(Flex)`
    padding: 24px;
    margin: 24px;
    background: white;
    width: calc(100% - 48px);
    height: fit-content;
    max-height: calc(100vh - 48px);
    border-radius: 4px;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
    gap: 24px;
    overflow-y: scroll;

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
  Header: styled(Flex)`
    justify-content: space-between;
  `,
  Footer: styled(Flex)`
    justify-content: end;
  `,
  Close: styled.button`
    background: none;
    border: none;
    appearance: none;
    outline: none;
    padding: 4px;
    border-radius: 50px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.lightgray};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.gray};
    }
  `,
  Button: styled.button`
    background: none;
    border: none;
    appearance: none;
    outline: none;
    padding: 12px 24px;
    font-weight: 600;
    font-size: 16px;
    border-radius: 4px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.lightgray};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.gray};
    }
  `,
};
