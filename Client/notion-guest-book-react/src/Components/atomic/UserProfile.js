import React from 'react';

import { StyledUserProfile } from './styles/UserProfile.styled';

const UserProfile = () => {
  return (
    <StyledUserProfile.Container>
      <StyledUserProfile.Image
        src="https://www.notion.so/image/https%3A%2F%2Flh4.googleusercontent.com%2F-Bakl9Vp6TaY%2FAAAAAAAAAAI%2FAAAAAAAAAAA%2FAMZuucnzIErhtNhBgcw_nUM13uQuACYoUw%2Fphoto.jpg?width=40&userId=80f5e95c-7bbc-4b1c-91f2-4e42d5cf1ec6&cache=v2"
        alt=""
      />
    </StyledUserProfile.Container>
  );
};

export default UserProfile;
