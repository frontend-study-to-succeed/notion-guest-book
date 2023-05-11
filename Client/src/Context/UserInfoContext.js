import { createContext, useContext, useEffect, useState } from 'react';

const UserInfoContext = createContext(null);

const initialInfo = {
  userName: '',
  userPassword: '',
  userProfile: '',
  isDarkmode: false,
};

export default function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState(() => {
    const userInfo = localStorage.getItem('notion-guest-book-info');
    return userInfo ? JSON.parse(userInfo) : { ...initialInfo };
  });

  useEffect(() => {
    localStorage.setItem('notion-guest-book-info', JSON.stringify(userInfo));
  }, [userInfo]);

  const mutateUserInfo = (stateName, stateValue) =>
    setUserInfo((prevState) => ({ ...prevState, [stateName]: stateValue }));

  const value = { userInfo, setUserInfo, mutateUserInfo };

  return <UserInfoContext.Provider value={value}>{children}</UserInfoContext.Provider>;
}

export const useUserInfo = () => useContext(UserInfoContext);
