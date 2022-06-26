import { styled } from '../stitches.config';

export const Box = styled('div', {
  // local resets here
  variants: {
    variant: {
      1: { maxWidth: '$bp1' },
      2: { maxWidth: '$bp2' },
      3: { maxWidth: '$bp3' },
      4: { maxWidth: '$bp4' },
      5: { maxWidth: '$bp5' },
      6: { maxWidth: 'none' },
    },
    p: {
      0: { p: '$0' },
      1: { p: '$1' },
      2: { p: '$2' },
      3: { p: '$3' },
      4: { p: '$4' },
      5: { p: '$5' },
    },
  },
  defaultVariants: {
    p: 0,
  },
});

export const PokemonContainer = styled(Box, {
  borderRadius: '$3',
  mb: '$3',
  mx: 'auto',
  boxShadow: '$2',
  '@bp2': {
    // spacing for 3 per row
    mx: 'calc((736px - (179px * 3)) / 6)',
  },
  '@bp3': {
    mx: 'auto',
  },
  variants: {
    isFeatured: {
      true: {
        backgroundImage:
          'linear-gradient(145deg, $colors$stop1 0%, $colors$stop2 100%)',
      },
      false: {
        background: '$appBg1',
      },
    },
  },
  length: 0,
});
