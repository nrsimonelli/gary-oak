import { globalCss } from '../stitches.config';

export const globalStyles = globalCss({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },
  html: {
    textSizeAdjust: '100%',
    tabSize: 4,
  },
  body: {
    margin: 0,
    fontFamily: '$untitled',
    lineHeight: '$3',
    fontWeight: '$1',
    bg: '$slate2',
    color: '$slate12',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: '$sky11',
      textDecoration: 'underline',
    },
  },
});
