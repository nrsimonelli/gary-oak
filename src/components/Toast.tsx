import { keyframes, styled } from '../stitches.config';

const toastEntrance = keyframes({
  '0%': { transform: 'translateY(-200%)' },
  '100%': { transform: 'translateY(0)' },
});

export const Toast = styled('div', {
  position: 'fixed',
  zIndex: '$4',
  fontSize: '$3',
  fontWeight: '$1',
  py: '$3',
  px: '$3',
  mt: '$3',
  // width: '300px',
  textAlign: 'left',
  transition: 'transform 600ms ease-in-out',
  animation: `${toastEntrance} 700ms`,
  boxShadow: '$2',

  variants: {
    variant: {
      success: {
        bg: '$green9',
        color: '$whiteA12',
      },
      error: {
        bg: '$red9',
        color: '$whiteA12',
      },
    },
    isVisible: {
      false: {
        display: 'none',
      },
    },
  },
});
