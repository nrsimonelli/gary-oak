import { styled } from '../stitches.config'

export const Container = styled('div', {
  // local resets here
  flexShrink: 0,
  width: '$full',
  mx: 'auto',

  variants: {
    variant: {
      1: { maxWidth: '$bp1' },
      2: { maxWidth: '$bp2' },
      3: { maxWidth: '$bp3' },
      4: { maxWidth: '$bp4' },
      5: { maxWidth: '$bp5' },
      6: { maxWidth: 'none' },
      responsive: {
        '@bp1': {
          maxWidth: '$bp1',
        },
        '@bp2': {
          maxWidth: '$bp2',
        },
        '@bp3': {
          maxWidth: '$bp3',
        },
        '@bp4': {
          maxWidth: '$bp4',
        },
        '@bp5': {
          maxWidth: '$bp5',
        },
      },
    },
    px: {
      0: {
        px: '$0',
      },
      1: {
        px: '$1',
      },
      2: {
        px: '$2',
      },
      3: {
        px: '$3',
      },
      4: {
        px: '$4',
      },
    },
  },
  defaultVariants: {
    variant: 'full',
    px: 3,
  },
})
