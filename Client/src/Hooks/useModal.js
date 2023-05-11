import { useState } from 'react';

export const useModal = () => {
  const [userState, setUserState] = useState({
    userName: '',
    userPassword: '',
    userProfile: '',
    isDarkmode: false,
  });

  const setUserStateByName = (stateName, stateValue) => {
    console.log('함수 내부에서: ', userState);
    setUserState((prevState) => ({ ...prevState, [stateName]: stateValue }));
    console.log('함수 내부에서: ', userState);
  };

  return [userState, setUserState, setUserStateByName];
};
