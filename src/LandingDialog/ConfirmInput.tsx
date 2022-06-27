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
            width: '120px',
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
    <Flex align={'center'} direction={'column'}>
      <Text variant={'h3'} css={{ mb: '$3' }}>
        Step 3: Confirm team {playerName}
      </Text>
      <Flex direction={'row'} align={'center'} css={{ width: '$full' }}>
        <Img
          src={SPRITE_OPTIONS[spriteDisplay]?.path || 'src/assets/error.png'}
          css={{
            height: '120px',
            width: 'auto',
          }}
        />
        <Flex
          direction={'row'}
          wrap={'wrapReverse'}
          align={'end'}
          justify={'center'}
          css={{
            width: '360px',
            height: '240px',
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
