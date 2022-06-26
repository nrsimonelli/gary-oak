import { styled } from '../stitches.config'

export const Button = styled('button', {
  // local resets here
  all: 'unset',
  alignItems: 'center',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },
  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'center',
  lineHeight: '1',
  WebkitTaphighlightColor: 'rgba(0,0,0,0)',
  py: '12px',
  px: '20px',

  // locally scoped colors for easy variants
  $$bc4: '$colors$primary4',
  $$bc5: '$colors$primary5',
  $$bc6: '$colors$primary6',
  $$bc7: '$colors$primary7',
  $$bc8: '$colors$primary8',
  $$bc9: '$colors$primary9',
  $$bc10: '$colors$primary10',
  $$bc11: '$colors$primary11',
  $$bc12: '$colors$primary12',

  '&:disabled': {
    pointerEvents: 'none',
  },

  variants: {
    variant: {
      primary: {
        color: '$inverse',
        backgroundColor: '$$bc9',
        '&:hover': {
          backgroundColor: '$$bc10',
        },
        '&:active': {
          backgroundColor: '$$bc9',
        },
      },
      secondary: {
        color: '$$bc11',
        backgroundColor: '$$bc4',
        '&:hover': {
          backgroundColor: '$$bc5',
        },
        '&:active': {
          backgroundColor: '$$bc6',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $$bc11',
        },
      },
      outline: {
        bg: 'transparent',
        color: '$$bc11',
        boxShadow: 'inset 0 0 0 1px $$bc8',
        '&:hover': {
          boxShadow: 'inset 0 0 0 1px $$bc9',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $$bc9, 0 0 0 1px $$bc9',
        },
      },
    },
    shape: {
      0: {
        borderRadius: '$0',
      },
      1: {
        borderRadius: '$1',
      },
      2: {
        borderRadius: '$2',
      },
      3: {
        borderRadius: '$3',
      },
      4: {
        borderRadius: '$4',
      },
      5: {
        borderRadius: '$5',
      },
    },
    size: {
      1: { fontSize: '$2' },
      2: { fontSize: '$3' },
      3: { fontSize: '$4' },
    },
  },
})

export const FilterButton = styled(Button, {
  variants: {
    isSelected: {
      true: {
        color: '$inverse',
        backgroundColor: '$$bc9',
        '&:hover': {
          backgroundColor: '$$bc10',
        },
        '&:active': {
          backgroundColor: '$$bc9',
        },
      },
      false: {
        bg: 'transparent',
        color: '$$bc11',
        boxShadow: 'inset 0 0 0 1px $$bc8',
        '&:hover': {
          boxShadow: 'inset 0 0 0 1px $$bc9',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $$bc9, 0 0 0 1px $$bc9',
        },
      },
    },
  },
})
