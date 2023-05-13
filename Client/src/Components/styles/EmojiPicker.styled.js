import styled from '@emotion/styled';
import { Flex } from '../atomic/styles/Flex.styled';
import StyledFloatedContainer from '../atomic/styles/FloatedContainer.styled';

export const StyledEmojiPicker = {
  Container: styled(Flex)`
    ${StyledFloatedContainer}

    position: absolute;
    top: 38px;
    right: 0;
    width: 250px;
    height: 250px;

    gap: 4px;

    padding: 4px;
  `,
  CategoryList: styled(Flex)`
    -ms-overflow-style: none;
    scrollbar-width: none;
    white-space: nowrap;
    padding: 4px 0;
    /* gap: 4px; */

    overflow-y: hidden;
    touch-action: pan-x;

    mask-image: linear-gradient(to right, black 80%, transparent 100%);

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  CategoryItem: {
    Button: styled.button`
      display: flex;
      justify-content: center;
      align-items: center;
      background: none;
      border: none;
      font-size: 16px;
      padding: 8px 8px;
      border-radius: 50px;
      background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.gray : 'white')};
      font-weight: ${({ isSelected }) => (isSelected ? 600 : 500)};

      &:hover {
        font-weight: 600;
        cursor: pointer;
        background-color: ${({ isSelected, theme }) =>
          isSelected ? theme.colors.gray : theme.colors.lightgray};
      }
    `,
    Icon: styled.span`
      font-family: 'Tossface';
      margin-right: 2px;
    `,
  },
  EmojiItemList: styled(Flex)`
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    touch-action: pan-y;

    gap: 2px;

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
  EmojiItem: styled.button`
    font-family: 'Tossface';
    background: none;
    border: none;
    font-size: 24px;
    transform: scale(1);
    transition: transform 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
      cursor: pointer;
      transform: scale(1.3);
      /* background-colo
    transform: scaleZ(0);r: ${({ theme }) => theme.colors.gray}; */
    }
  `,
};
