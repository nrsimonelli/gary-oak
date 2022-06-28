import { Cross1Icon } from '@radix-ui/react-icons'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { Box } from './Box'
import { Flex } from './Flex'
import { Toast } from './Toast'

interface ToastRootProps {
  type: 'error' | 'success'
  isVisible: boolean
}

export const ToastRoot = ({ type, isVisible }: ToastRootProps) => {
  const isSuccess = type === 'success'

  return (
    <Toast variant={isSuccess ? 'success' : 'error'} isVisible={isVisible}>
      <Flex>
        <Box>
          {isSuccess
            ? `Save Successful!`
            : `Something went wrong, please try again later`}
        </Box>
        <Box css={{ ml: '$3' }} aria-label='Close'>
          <Cross1Icon />
        </Box>
      </Flex>
    </Toast>
  )
}
