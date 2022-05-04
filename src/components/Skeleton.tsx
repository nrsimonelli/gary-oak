import { styled, keyframes } from '../stitches.config';
import { Box } from './Box';
import { Flex } from './Flex';

const pulse = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: '100%' },
});

export const Skeleton = styled('div', {
  backgroundColor: '$appBg4',
  position: 'relative',
  overflow: 'hidden',

  '&::after': {
    animationName: `${pulse}`,
    animationDuration: '500ms',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    backgroundColor: '$appBg3',
    borderRadius: 'inherit',
    bottom: 0,
    content: '""',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  variants: {
    variant: {
      container: {
        padding: '$2',
        borderRadius: '$3',
        mb: '$3',
        mx: 'auto',
        boxShadow: '$3',
      },
      title: {
        height: '22px',
        width: '50%',
        borderRadius: '$3',
        mb: '$1',
      },
      text1: {
        height: '17px',
        width: '25%',
        borderRadius: '$3',
        px: '$2',
      },
      text2: {
        height: '17px',
        width: '25%',
        borderRadius: '$3',
      },
      avatar1: {
        width: '163px',
        height: '163px',
        borderRadius: '50%',
      },
      spriteContainer: {
        borderRadius: '$3',
        boxShadow: '$1',
        height: '120px',
        width: '120px',
        p: '$3',
      },
    },
  },
  defaultVariants: {
    variant: 'text',
  },
});

export const PokedexSkeleton = () => {
  return (
    <Box
      css={{
        padding: '$2',
        borderRadius: '$3',
        mb: '$3',
        mx: 'auto',
        boxShadow: '$3',
      }}
    >
      <Skeleton variant={'title'} />
      <Flex justify={'between'} css={{ mb: '$3' }}>
        <Skeleton variant={'text1'} />
        <Skeleton variant={'text2'} />
      </Flex>
      <Skeleton variant={'avatar1'} />
    </Box>
  );
};
