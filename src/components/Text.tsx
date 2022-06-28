import { keyframes, styled } from '../stitches.config'

export const Text = styled('span', {
  // local resets here
  display: 'block',
  userSelect: 'none',

  variants: {
    variant: {
      title: {
        fontSize: '$6',
        fontWeight: '$3',
        lineHeight: '$2',
        '@bp1': {
          fontSize: '$7',
        },
        '@bp3': {
          fontSize: '$8',
        },
      },
      h1: {
        fontSize: '$5',
        fontWeight: '$2',
        lineHeight: '$2',
        '@bp1': {
          fontSize: '$6',
        },
        '@bp3': {
          fontSize: '$7',
        },
      },
      h2: {
        fontSize: '$5',
        fontWeight: '$2',
        lineHeight: '$2',
      },
      h3: {
        fontSize: '$4',
        fontWeight: '$2',
        lineHeight: '$2',
      },
      default: {
        fontSize: '$3',
        fontWeight: '$1',
        lineHeight: '$3',
      },
      bold: {
        fontSize: '$3',
        fontWeight: '$2',
        lineHeight: '$3',
      },
    },
    case: {
      uppercase: {
        textTransform: 'uppercase',
      },
      lowercase: {
        textTransform: 'lowercase',
      },
      capitalize: {
        textTransform: 'capitalize',
      },
      inherit: {
        textTransform: 'inherit',
      },
    },
    size: {
      1: {
        fontSize: '$1',
      },
      2: {
        fontSize: '$2',
      },
      3: {
        fontSize: '$3',
      },
      4: {
        fontSize: '$4',
      },
      5: {
        fontSize: '$5',
      },
      6: {
        fontSize: '$6',
      },
      7: {
        fontSize: '$7',
      },
      8: {
        fontSize: '$8',
      },
      9: {
        fontSize: '$9',
      },
    },
    weight: {
      1: {
        fontWeight: '$1',
      },
      2: {
        fontWeight: '$2',
      },
      3: {
        fontWeight: '$3',
      },
    },
    my: {
      0: {
        my: '$0',
      },
      1: {
        my: '$1',
      },
      2: {
        my: '$2',
      },
      3: {
        my: '$3',
      },
      4: {
        my: '$4',
      },
    },
    gradient: {
      true: {
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        linearGradient: 'to right, $stop3, $stop2',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const fade = keyframes({
  '0%': { opacity: 0 },
  '35%': { opacity: '100%' },
  '65%': { opacity: '100%' },
  '100%': { opacity: 0 },
})

export const RivalName = styled(Text, {
  animationName: `${fade}`,
  animationDuration: '3000ms',
  animationIterationCount: 0,
  animationTimingFunction: 'ease',
})

export const Tag = styled(Text, {
  borderRadius: '$5',
  minWidth: '$5',
  textAlign: 'center',

  variants: {
    style: {
      normal: {
        bg: '$gray4',
        color: '$gray11',
      },
      fire: {
        bg: '$orange4',
        color: '$orange11',
      },
      water: {
        bg: '$blue4',
        color: '$blue11',
      },
      electric: {
        bg: '$yellow4',
        color: '$yellow11',
      },
      ice: {
        bg: '$sky4',
        color: '$sky11',
      },
      fighting: {
        bg: '$red4',
        color: '$red11',
      },
      poison: {
        bg: '$plum4',
        color: '$plum11',
      },
      ground: {
        bg: '$gold3',
        color: '$gold11',
      },
      flying: {
        bg: '$purple4',
        color: '$purple11',
      },
      psychic: {
        bg: '$pink4',
        color: '$pink11',
      },
      bug: {
        bg: '$lime4',
        color: '$lime11',
      },
      rock: {
        bg: '$brown4',
        color: '$brown11',
      },
      ghost: {
        bg: '$indigo4',
        color: '$indigo11',
      },
      dark: {
        bg: '$gray11',
        color: '$gray4',
      },
      dragon: {
        bg: '$violet4',
        color: '$violet11',
      },
      steel: {
        bg: '$slate4',
        color: '$slate11',
      },
      fairy: {
        bg: '$crimson3',
        color: '$crimson10',
      },
      grass: {
        bg: '$green4',
        color: '$green11',
      },
    },
  },
})
