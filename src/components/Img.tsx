import { keyframes, styled } from '../stitches.config';

export const Img = styled('img', {
  maxHeight: '100%',
  maxWidth: '100%',
});

const fade = keyframes({
  '0%': { opacity: 0 },
  '35%': { opacity: '100%' },
  '65%': { opacity: '100%' },
  '100%': { opacity: 0 },
});

export const SpriteImg = styled(Img, {
  objectFit: 'scale-down',
  animationName: `${fade}`,
  animationDuration: '3000ms',
  animationIterationCount: 0,
  animationTimingFunction: 'ease',
});
