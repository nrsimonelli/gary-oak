import React, { useEffect, useMemo, useState } from 'react'
import { batch } from 'react-redux'
import { Box, PokemonContainer } from '../components/Box'
import { Button, FilterButton } from '../components/Button'
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
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { styled } from '../stitches.config'
import { SwapPokemonDialog } from './SwapPokemonDialog'
import { AddPokemonDialog } from './AddPokemonDialog'

export const RivalSelect = () => {
  const dispatch = useAppDispatch()
  const playerData = useAppSelector((state) => state.player)
  const rivalData = useAppSelector((state) => state.rival.rivals)
  const rivalStatus = useAppSelector((state) => state.rival.status)
  const selectedRival = useAppSelector((state) => state.rival.selectedRival)

  const [isLoading, setIsLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [swapDialog, setSwapDialog] = useState(false)
  const initialPokemonSetting = { value: 0, label: '', image: '' }
  const [activePokemon, setActivePokemon] = useState<{
    value: number
    label: string
    image: string
  }>(initialPokemonSetting)

  const data = useMemo(() => {
    const result = rivalData.find((rival) => rival.id === selectedRival)
    const player = playerData
    return result || player
  }, [selectedRival, playerData])

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

  const showAddMon = selectedRival === 'player' && playerData.pokemon.length < 6

  const PlusCircle = styled(PlusCircledIcon, {
    height: 60,
    width: 60,
    '& path': {
      fill: '$primary9',
      fillRule: 'nonzero',
      clipRule: 'nonzero',
    },
    '&:hover': {
      '& path': {
        fill: '$primary10',
      },
      transition: 'all 300ms ease-out',
    },
  })

  const handleClose = () => {
    setActivePokemon(initialPokemonSetting)
    setSwapDialog(!swapDialog)
  }
  const handleSwapClick = (
    data: React.SetStateAction<{ value: number; label: string; image: string }>
  ) => {
    setActivePokemon(data)
    setSwapDialog(true)
  }

  return (
    <Flex direction={'column'} align={'center'} justify={'start'}>
      <AddPokemonDialog
        open={openDialog}
        handleOnOpenChange={() => setOpenDialog(!openDialog)}
      />
      <SwapPokemonDialog
        open={swapDialog}
        activePokemon={activePokemon}
        handleClose={handleClose}
      />
      {rivalStatus === 'idle' || rivalStatus === 'loading' ? (
        <Flex css={{ height: 300, pb: '$3' }}></Flex>
      ) : (
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
      )}
      <Container
        variant={'2'}
        css={{
          py: '$3',
          bg: '$appBg2',
          borderRadius: '$3',
          mb: '$3',
        }}
      >
        {rivalStatus === 'idle' || rivalStatus === 'loading' ? (
          <Flex id='team' css={{ width: '$full', height: 591 }}></Flex>
        ) : (
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
                handleSwapClick={handleSwapClick}
              />
            ))}
            {showAddMon && (
              <PokemonContainer
                p={'2'}
                css={{
                  height: '238px',
                  width: '179px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button onClick={() => setOpenDialog(true)}>
                  <PlusCircle />
                </Button>
              </PokemonContainer>
            )}
          </Flex>
        )}
      </Container>
    </Flex>
  )
}
