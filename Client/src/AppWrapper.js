/** React 관련 Import */
import { useState } from 'react';

/** 자식 Component */
import App from './App';

/** Style CSS */
import GlobalStyle from './Components/styles/Global';

/** Emotion 관련 Import */
import { ThemeProvider } from '@emotion/react';

/** Redux 관련 Import */
import { Provider } from 'react-redux';
import { store } from './Store';

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
  // eslint-disable-next-line
  const [theme, setTheme] = useState('light');
  const isDarkTheme = theme === 'dark';

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  );
}

export default AppWrapper;
