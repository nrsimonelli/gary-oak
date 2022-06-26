import { styled } from '../stitches.config'
import * as DialogPrimitive from '@radix-ui/react-dialog'

const DialogOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: '$blackA10',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'grid',
  placeItems: 'center',
  overflowY: 'auto',
})

const DialogContent = styled(DialogPrimitive.Content, {
  backgroundColor: '$appBg1',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  width: '90vw',
  minWidth: 400,
  maxWidth: '720px',
  padding: '$5',
  borderRadius: '$3',
})

export const DialogRoot = DialogPrimitive.Root
const DialogPortal = DialogPrimitive.Portal

// TODO type children & props from welcomeDialog
export const DialogBody = ({ children, ...props }) => {
  return (
    <DialogPortal>
      <DialogOverlay>
        <DialogContent {...props}>{children}</DialogContent>
      </DialogOverlay>
    </DialogPortal>
  )
}
