import { Box } from '../components/Box'
import { Flex } from '../components/Flex'
import { Img } from '../components/Img'
import { Text } from '../components/Text'
import { SPRITE_OPTIONS } from '../constants'
import { useGetPokemonByNameQuery } from '../redux/slice/pokemon-api'

const SpriteDisplay = ({ pokemon }) => {
  const { data, isFetching, isLoading, isError } =
    useGetPokemonByNameQuery(pokemon)
  const visual = data?.sprite.default

  return (
    <>
      {isFetching || isLoading ? null : isError ? (
        <Img
          src={'src/assets/error.png'}
          css={{ width: '120px', height: 'auto' }}
        />
      ) : (
        <Img
          src={visual}
          css={{
            width: '100px',
            height: 'auto',
          }}
        />
      )}
    </>
  )
}

export const ConfirmInput = ({
  spriteDisplay,
  selectedPokemon,
  playerName,
}) => {
  return (
    <Flex
      align={'center'}
      justify={'start'}
      direction={'column'}
      css={{ flex: '1 0 0' }}
    >
      <Text variant={'h3'} css={{ py: '$3' }}>
        Step 3: Confirm team
      </Text>
      <Flex
        direction={'column'}
        justify={'center'}
        css={{
          height: '$full',
        }}
      >
        <Flex
          direction={'row'}
          align={'center'}
          justify={'center'}
          css={{ py: '$3' }}
        >
          <Img
            src={SPRITE_OPTIONS[spriteDisplay]?.path || 'src/assets/error.png'}
            css={{
              height: '120px',
              width: 'auto',
            }}
          />
          <Text variant={'h3'} gradient css={{ minWidth: '120px' }}>
            {playerName}
          </Text>
        </Flex>
        <Flex
          direction={'row'}
          wrap={'wrap'}
          align={'center'}
          justify={'center'}
          css={{
            width: '360px',
          }}
        >
          {selectedPokemon.length > 0 &&
            selectedPokemon.map((pokemon, index) => (
              <SpriteDisplay
                key={`${pokemon}-${index}`}
                pokemon={pokemon.name}
              />
            ))}
        </Flex>
      </Flex>
    </Flex>
  )
}
