/** Redux Toolkit 관련 Import */
import { createSlice } from '@reduxjs/toolkit';

const savedUserInfo = localStorage.getItem('notion-guest-book-info');

const initialState = savedUserInfo
  ? JSON.parse(savedUserInfo)
  : {
      initialOpen: true,
      userName: null,
      userPassword: null,
      userProfile: null,
      userDarkmode: false,
    };

const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      const { userName, userPassword, userProfile, userDarkmode } = action.payload;

      state.userName = userName;
      state.userPassword = userPassword;
      state.userProfile = userProfile;
      state.userDarkmode = userDarkmode;

      localStorage.setItem(
        'notion-guest-book-info',
        JSON.stringify({
          userName,
          userPassword,
          userProfile,
          userDarkmode,
        })
      );
    },
    // updateUserName: (state, action) => {
    //   state.userName = action.payload;
    // },
    // updateUserPassword: (state, action) => {
    //   state.userPassword = action.payload;
    // },
    // updateUserProfile: (state, action) => {
    //   state.userProfile = action.payload;
    // },
    // updateUserDarkmode: (state, action) => {
    //   state.userDarkmode = action.payload;
    // },
  },
});

export default userInfoSlice;

export const { updateUserInfo } = userInfoSlice.actions;
