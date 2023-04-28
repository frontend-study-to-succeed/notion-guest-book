import { useState } from 'react';

import { ThemeProvider } from '@emotion/react';

import GlobalStyle from './Components/styles/Global';

import CommentHistory from './Components/CommentHistory';
import CommentWriting from './Components/CommentWriting';

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

function App() {
  const [theme, setTheme] = useState('light');
  const isDarkTheme = theme === 'dark';

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
      <CommentHistory />
      <CommentWriting />
    </ThemeProvider>
  );
}

export default App;
