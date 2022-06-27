import { Outlet } from 'react-router-dom'
import { Box } from './Box'

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
          'linear-gradient(19deg, $colors$lg1 0%, $colors$lg2 100%)',
        overflowY: 'auto',
        scrollBehavior: 'smooth',
      }}
    >
      <Outlet />
    </Box>
  )
}
