import React, { useContext, useEffect, useMemo, useState } from 'react'
import { batch } from 'react-redux'
import { Box } from '../components/Box'
import { FilterButton } from '../components/Button'
import { Container } from '../components/Container'
import { Flex } from '../components/Flex'
import { Img } from '../components/Img'
import { Skeleton } from '../components/Skeleton'
import { Text } from '../components/Text'
import { clearFeaturedPokemon } from '../redux/slice/display-slice'
import { setRival } from '../redux/slice/rival-slice'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { PokemonCard } from '../PokemonCard/PokemonCard'
import { RadarGraph } from '../RadarGraph/RadarGraph'

export const RivalSelect = () => {
  const dispatch = useAppDispatch()
  const playerData = useAppSelector((state) => state.player)
  const rivalData = useAppSelector((state) => state.rival.rivals)
  const selectedRival = useAppSelector((state) => state.rival.selectedRival)

  const [isLoading, setIsLoading] = useState(true)

  const data = useMemo(() => {
    const result = rivalData.find((rival) => rival.id === selectedRival)
    const player = playerData
    return result || player
  }, [selectedRival])

  const handleRivalClick = (tag: string) => {
    setIsLoading(true)
    batch(() => {
      dispatch(clearFeaturedPokemon())
      dispatch(setRival({ tag }))
    })
  }

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false)
    }
  }, [selectedRival])

  return (
    <Flex direction={'column'} align={'center'} justify={'start'}>
      <Flex direction={'row'} align={'center'} css={{ pb: '$3' }}>
        {isLoading ? (
          <Skeleton variant={'spriteContainer'} css={{ my: '$5' }} />
        ) : (
          <Img
            src={data?.path || 'src/assets/error.png'}
            css={{
              height: '120px',
              width: 'auto',
              my: '$5',
            }}
          />
        )}
        <RadarGraph />
      </Flex>
      <Container
        variant={'responsive'}
        css={{
          py: '$3',
          bg: '$appBg2',
          borderRadius: '$3',
          '@bp4': {
            mb: '$3',
          },
        }}
      >
        <Flex wrap={'wrap'} id='team'>
          <Flex css={{ width: '$full' }}>
            <Box
              p={'2'}
              css={{
                bg: '$appBg1',
                width: '$full',
                borderRadius: '$3',
                boxShadow: '$2',
                mb: '$3',
              }}
            >
              {rivalData.map((rival) => (
                <FilterButton
                  key={rival.id}
                  value={rival.id}
                  isSelected={selectedRival === rival.id}
                  onClick={() => handleRivalClick(rival.id)}
                  disabled={selectedRival === rival.id}
                >
                  <Text case={'capitalize'}>{rival.name}</Text>
                </FilterButton>
              ))}
              {playerData.pokemon && playerData.pokemon.length > 0 && (
                <FilterButton
                  value={'player'}
                  isSelected={selectedRival === 'player'}
                  onClick={() => handleRivalClick('player')}
                  disabled={selectedRival === 'player'}
                >
                  <Text case={'capitalize'}>{playerData.name}</Text>
                </FilterButton>
              )}
            </Box>
          </Flex>
          {data?.pokemon?.map((mon, index) => (
            <PokemonCard
              key={mon.id + index}
              pokemon={mon.name}
              isStarter={Boolean(mon.isStarter)}
            />
          ))}
        </Flex>
      </Container>
    </Flex>
  )
}
