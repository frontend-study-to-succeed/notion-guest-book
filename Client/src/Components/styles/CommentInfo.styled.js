import styled from '@emotion/styled';
import { Flex } from '../atomic/styles/Flex.styled';
import YouTube from 'react-player';

export const StyledCommentInfo = {
  Container: styled(Flex)`
    flex-direction: column;
    width: calc(100% - (18px + 8px));
  `,
  Author: styled.span`
    font-weight: 600;
    margin-right: 8px;
  `,
  PlainText: styled.span`
    font-weight: normal;
  `,
  Date: styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.darkgray};
  `,
  Content: styled.div`
    margin-top: 4px;
    overflow-wrap: break-word;
  `,
  YoutubeWrap: styled.div`
    position: relative;
    padding-top: 56.25%;
    border-radius: 4px;
    overflow: hidden;
  `,
  StyledYoutube: styled(YouTube)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `,
  ImageContent: styled.img`
    display: block;
    border-radius: 4px;
    max-width: 100%;
  `,
  ReactionContainer: styled(Flex)`
    gap: 8px;
  `,
  ReplyContainer: styled(Flex)`
    background-color: ${({ theme }) => theme.colors.lightgray};
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 12px;
    color: ${({ theme }) => theme.colors.darkgray};
  `,
  AuthorAndDateWrapper: styled(Flex)`
    flex-direction: row;
    align-items: baseline;
  `,
  CoolSayingContainer: styled(Flex)`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background-color: black;
    border-radius: 4px;

    padding: 24px 12px;
    color: ${({ theme }) => theme.colors.gray};
  `,
  CoolSayingContent: styled.p`
    font-family: 'BookkMyungjo-Bd';
    font-size: 18px;
    color: white;

    text-align: center;
  `,
  CoolSayingWrapper: styled(Flex)`
    padding: 4px 0;
    gap: 12px;
    align-items: baseline;
  `,
};
