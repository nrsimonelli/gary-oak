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
          'linear-gradient(19deg, $colors$slate3 0%, $colors$slate6 100%)',
        overflowY: 'auto',
      }}
    >
      <Outlet />
    </Box>
  );
};
