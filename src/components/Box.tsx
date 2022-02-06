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
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '$3',
  },

  variants: {
    isCaught: {
      true: {
        backgroundImage:
          // 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)',
          'linear-gradient(145deg, $colors$sky9 0%, $colors$indigo11 100%)',
      },
      false: {
        background: '$slate1',
      },
    },
  },
});
