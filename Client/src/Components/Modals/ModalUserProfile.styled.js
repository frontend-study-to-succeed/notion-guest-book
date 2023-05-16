import styled from '@emotion/styled';
import { Flex } from '../atomic/styles/Flex.styled';

export const StyledModalUserProfile = {
  ImageWrapper: styled(Flex)`
    justify-content: center;
    width: 100%;
    max-height: 100%;
    overflow: hidden;
  `,
  Image: styled.img`
    display: block;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  `,
};
