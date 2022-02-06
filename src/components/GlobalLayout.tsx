import { Outlet } from 'react-router-dom';
import { Box } from './Box';

export const GlobalLayout = () => {
  return (
    <Box
      css={{
        position: 'fixed',
        padding: 0,
        margin: 0,
        width: '100%',
        height: '$vh',
        backgroundImage:
          'linear-gradient(19deg, $colors$appBg4 0%, $colors$appBg3 100%)',
        overflowY: 'auto',
      }}
    >
      <Outlet />
    </Box>
  );
};
