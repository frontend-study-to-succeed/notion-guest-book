import React, { useEffect, useState } from 'react';
import { useUserInfo } from '../../Context/UserInfoContext';

import { StyledUserProfile } from './styles/UserProfile.styled';

// https://www.notion.so/image/https%3A%2F%2Flh4.googleusercontent.com%2F-Bakl9Vp6TaY%2FAAAAAAAAAAI%2FAAAAAAAAAAA%2FAMZuucnzIErhtNhBgcw_nUM13uQuACYoUw%2Fphoto.jpg?width=40&userId=80f5e95c-7bbc-4b1c-91f2-4e42d5cf1ec6&cache=v2

const UserProfile = ({ profile }) => {
  const { userInfo } = useUserInfo();

  const [profileURL, setProfileURL] = useState('');

  useEffect(() => {
    // TODO: validate profile URL
    if (!userInfo.userProfile) {
      // 기본 프로필 사진
      setProfileURL(
        'https://www.notion.so/image/https%3A%2F%2Flh4.googleusercontent.com%2F-Bakl9Vp6TaY%2FAAAAAAAAAAI%2FAAAAAAAAAAA%2FAMZuucnzIErhtNhBgcw_nUM13uQuACYoUw%2Fphoto.jpg?width=40&userId=80f5e95c-7bbc-4b1c-91f2-4e42d5cf1ec6&cache=v2'
      );

      return;
    }

    setProfileURL(userInfo.userProfile);
  }, [userInfo]);

  return (
    <StyledUserProfile.Container>
      <StyledUserProfile.Image src={profileURL} alt="" />
    </StyledUserProfile.Container>
  );
};

export default UserProfile;
