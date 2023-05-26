import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const StyledLoadingComponent = {
  Container: styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;

    backdrop-filter: blur(10px) brightness(110%);
  `,
};
