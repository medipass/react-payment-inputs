import React from 'react';
import { Box, ThemeProvider, css, palette } from 'fannypack';
import { configure, addDecorator } from '@storybook/react';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const theme = {
  global: {
    base: css`
      & input {
        font-size: 16px;
      }

      *:focus {
        outline: 2px solid ${palette('primary')};
        outline-offset: 0px;
      }
    `
  }
}
const Decorator = storyFn => <ThemeProvider theme={theme}><Box padding="major-2">{storyFn()}</Box></ThemeProvider>;
addDecorator(Decorator);

configure(loadStories, module);
