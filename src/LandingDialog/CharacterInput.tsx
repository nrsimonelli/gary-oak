import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Flex } from '../components/Flex'
import { Img } from '../components/Img'
import { Input } from '../components/Input'
import { Text } from '../components/Text'
import { SPRITE_OPTIONS } from '../constants'

interface CharacterInputProps {
  handleChevronClick: (arg: number) => void
  spriteDisplay: number
  userValue: string | number
  userChange: (event: {
    target: {
      value: string
    }
  }) => void
}

export const CharacterInput = ({
  handleChevronClick,
  spriteDisplay,
  userValue,
  userChange,
}: CharacterInputProps) => {
  return (
    <Flex
      direction={'column'}
      justify={'between'}
      align={'center'}
      css={{ flex: '1 0 0' }}
    >
      <Text variant={'title'} css={{ py: '$3' }}>
        Welcome to <Text variant={'title'}>Rival Dex</Text>
      </Text>
      {/* <Text variant={'title'}>Rival Dex</Text> */}
      <Text variant={'h3'} css={{ py: '$3' }}>
        Step 1: Create your character
      </Text>
      <Flex direction={'row'} justify={'center'} align={'center'}>
        <ChevronLeftIcon onClick={() => handleChevronClick(-1)} />
        <Img
          src={SPRITE_OPTIONS[spriteDisplay]?.path || 'src/assets/error.png'}
          css={{
            height: '120px',
            width: 'auto',
            my: '$3',
          }}
        />
        <ChevronRightIcon onClick={() => handleChevronClick(1)} />
      </Flex>
      <Input
        id='userName'
        type='text'
        placeholder={'Enter your name...'}
        value={userValue}
        onChange={userChange}
        css={{ my: '$2' }}
      />
    </Flex>
  )
}
