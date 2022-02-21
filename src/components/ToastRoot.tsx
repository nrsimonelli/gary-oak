import { forwardRef, useImperativeHandle, useState } from 'react';
import { Box } from './Box';
import { Flex } from './Flex';
import { Toast } from './Toast';

interface ToastRootProps {
  type: 'error' | 'success';
  pokemon: string;
  isVisible: boolean;
}

export const ToastRoot = ({
  type,
  pokemon,
  isVisible,
}: ToastRootProps) => {
  const isSuccess = type === 'success';

  return (
    <Toast
      variant={isSuccess ? 'success' : 'error'}
      isVisible={isVisible}
    >
      <Flex>
        <Box>
          {isSuccess
            ? `Congratulations! You caught ${pokemon}`
            : `Oh no! ${pokemon} got away`}
        </Box>
        <Box css={{ ml: '$3' }} aria-label='Close'>
          <span aria-hidden>x</span>
        </Box>
      </Flex>
    </Toast>
  );
};
