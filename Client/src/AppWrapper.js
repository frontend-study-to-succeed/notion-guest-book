import { useState } from 'react';

import App from './App';

import GlobalStyle from './Components/styles/Global';

import { ThemeProvider } from '@emotion/react';
import ModalProvider from './Context/ModalContext';
import CommentProvider from './Context/CommentContext';
import UserInfoProvider from './Context/UserInfoContext';

const darkTheme = {
  colors: {
    black: '#191919',
    darkgray: '#3A3A3A',
    gray: '#5A5A5A',
    lightgray: '#8B8B8B;',
    white: '#D4D4D4',
    point: '#FFD400',
    red: 'red',
  },
};

const lightTheme = {
  colors: {
    black: '#000',
    darkgray: '#929292',
    gray: '#D9D9D9',
    lightgray: '#F5F5F5',
    white: '#FFFFFF',
    point: '#FFD400',
    red: 'red',
  },
};

function AppWrapper() {
  const [theme, setTheme] = useState('light');
  const isDarkTheme = theme === 'dark';

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
      <UserInfoProvider>
        <CommentProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </CommentProvider>
      </UserInfoProvider>
    </ThemeProvider>
  );
}

export default AppWrapper;
