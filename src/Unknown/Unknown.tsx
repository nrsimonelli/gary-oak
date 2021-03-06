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
          outline: '1px solid red',
          position: 'absolute',
          width: '100%',
          height: '100%',
          maxHeight: '720px',
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
        Looks like you've landed on page Unknown
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
