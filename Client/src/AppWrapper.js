import { useState } from 'react';

import { ThemeProvider } from '@emotion/react';
import ModalProvider from './Context/ModalContext';

import GlobalStyle from './Components/styles/Global';

import App from './App';
import CommentProvider from './Context/CommentContext';
import UserInfoProvider from './Context/UserInfoContext';

import DataContextProvider from './Context/DataContext';

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
      <DataContextProvider>
        <UserInfoProvider>
          <CommentProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </CommentProvider>
        </UserInfoProvider>
      </DataContextProvider>
    </ThemeProvider>
  );
}

export default AppWrapper;
