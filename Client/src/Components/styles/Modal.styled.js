import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Flex } from '../atomic/styles/Flex.styled';

export const StyledModal = {
  Container: styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

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
    border-radius: 4px;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
    gap: 24px;
  `,
  Header: styled(Flex)`
    justify-content: space-between;
  `,
  Footer: styled(Flex)`
    justify-content: end;
  `,
};
