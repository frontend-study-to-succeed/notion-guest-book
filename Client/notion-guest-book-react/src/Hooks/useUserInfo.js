import { useEffect, useState } from 'react';

const initialInfo = {
  userName: '',
  userPassword: '',
  userProfile: '',
  isDarkmode: false,
};

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(() => {
    const userInfo = localStorage.getItem('notion-guest-book-info');
    return userInfo ? JSON.parse(userInfo) : { ...initialInfo };
  });

  useEffect(() => {
    localStorage.setItem('notion-guest-book-info', JSON.stringify(userInfo));
  }, [userInfo]);

  const setUserInfoByName = (stateName, stateValue) => {
    setUserInfo((prevState) => ({ ...prevState, [stateName]: stateValue }));
  };

  return [userInfo, setUserInfo, setUserInfoByName];
};
