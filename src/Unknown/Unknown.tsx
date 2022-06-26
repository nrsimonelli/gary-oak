import { Link } from 'react-router-dom'
import { Box } from '../components/Box'
import { Button } from '../components/Button'
import { Flex } from '../components/Flex'
import { Text } from '../components/Text'

const Unknown = () => {
  return (
    <Flex
      direction={'column'}
      align={'center'}
      justify={'center'}
      css={{
        height: '$vh',
        '&::before': {
          content: '',
          backgroundImage: 'url(src/assets/404.webp)',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          opacity: '.3',
        },
      }}
    >
      <Text
        css={{
          zIndex: '$1',
          fontSize: '$9',
          fontWeight: '$3',
          lineHeight: '$1',
          mb: '$6',
        }}
      >
        404
      </Text>
      <Text variant={'h3'} css={{ zIndex: '$1', mb: '$3' }}>
        Oh no! That page is unknown to us
      </Text>
      <Text variant={'h3'} css={{ zIndex: '$1', mb: '$6' }}>
        Please try again
      </Text>
      <Box css={{ zIndex: '$1' }}>
        <Link to='/'>
          <Button
            variant={'primary'}
            size={'2'}
            shape={'2'}
            css={{
              color: '$inverse',
            }}
          >
            Home
          </Button>
        </Link>
      </Box>
    </Flex>
  )
}

export default Unknown
