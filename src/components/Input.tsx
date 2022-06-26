import { styled } from '../stitches.config'

export const Input = styled('input', {
  all: 'unset',
  width: '$8',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$1',
  px: '$2',
  py: '$1',
  fontSize: '$3',
  lineHeight: '$3',
  color: '$hiContrast',
  backgroundColor: '$appBg1',
  border: 'solid 1px $colors$slate7',
  '&:hover': {
    borderColor: '$primary10',
  },
  '&:focus': {
    borderColor: '$primary10',
    boxShadow: '0 0 0 1px $colors$primary10',
  },
})
