import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { CoolSayingL } from './CoolSayingL';
import { CoolSayingR } from './CoolSayingR';
import { More } from './More';
import { Open } from './Open';
import { Push } from './Push';
import { Reaction } from './Reaction';
import { Reply } from './Reply';

const StyledIcon = styled.span`
  display: flex;

  ${({ color, theme }) =>
    color &&
    css`
      color: ${theme.colors[color]};
    `}

  path {
    fill: currentColor;
  }
`;

export const Icon = {
  More: ({ color, ...props }) => (
    <StyledIcon className="icon-more" color={color}>
      <More {...props} />
    </StyledIcon>
  ),
  Open: ({ color, ...props }) => (
    <StyledIcon className="icon-open" color={color}>
      <Open {...props} />
    </StyledIcon>
  ),
  Push: ({ color, ...props }) => (
    <StyledIcon className="icon-push" color={color}>
      <Push {...props} />
    </StyledIcon>
  ),
  Reaction: ({ color, ...props }) => (
    <StyledIcon className="icon-reaction" color={color}>
      <Reaction {...props} />
    </StyledIcon>
  ),
  Reply: ({ color, ...props }) => (
    <StyledIcon className="icon-reply" color={color}>
      <Reply {...props} />
    </StyledIcon>
  ),
  CoolsayingL: ({ color, ...props }) => (
    <StyledIcon className="icon-coolsaying-l" color={color}>
      <CoolSayingL {...props} />
    </StyledIcon>
  ),
  CoolsayingR: ({ color, ...props }) => (
    <StyledIcon className="icon-coolsaying-r" color={color}>
      <CoolSayingR {...props} />
    </StyledIcon>
  ),
};
