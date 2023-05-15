import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Flex } from '../atomic/styles/Flex.styled';

import StyledFloatedContainer from '../atomic/styles/FloatedContainer.styled';

export const StyledCommentTypeList = {
  Container: styled(motion.ul)`
    ${StyledFloatedContainer}

    list-style: none;

    position: absolute;
    bottom: 40px;
    left: 0;

    padding: 5px 0;
    width: 100%;
  `,
};
