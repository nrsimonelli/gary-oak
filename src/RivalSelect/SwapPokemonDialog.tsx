import { Timestamp } from 'firebase/firestore'
import { useState, useContext } from 'react'
import Select from 'react-select'
import { Button } from '../components/Button'
import { DialogRoot, DialogBody } from '../components/Dialog'
import { Flex } from '../components/Flex'
import { Img } from '../components/Img'
import { Text } from '../components/Text'
import { POKEBALL, POKEMON_LIST } from '../constants'
import { setPlayer } from '../redux/slice/player-slice'
import { useGetSpriteOnlyQuery } from '../redux/slice/pokemon-api'
import { customSelectStyles } from '../SearchBar/SearchBar'
import { AuthContext } from '../utils/auth'
import { Trainer, updatePlayerData } from '../utils/docs'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { ThemeContext } from '../utils/ThemeContext'

export const SwapPokemonDialog = ({
  open,
  activePokemon,
  handleClose,
}: {
  open: boolean
  activePokemon: { value: number; label: string; image: string }
  handleClose: () => void
}) => {
  const dispatch = useAppDispatch()
  const { theme } = useContext(ThemeContext)
  const currentUser = useContext(AuthContext)
  const playerData = useAppSelector((state) => state.player)
  const [skip, setSkip] = useState(true)
  const [selectedValue, setSelectedValue] = useState('')
  const {
    data: swapDisplay,
    isLoading,
    isFetching,
    isUninitialized,
  } = useGetSpriteOnlyQuery(selectedValue, {
    skip,
  })
  const transformedOptions = POKEMON_LIST.map((x) => ({
    value: x.id,
    label: x.name,
  }))

  const handleSelect = (newValue: { value: number; label: string } | null) => {
    if (newValue?.label) {
      setSelectedValue(newValue.label)
      setSkip(false)
    }
  }
  const fallback = POKEBALL.find((image) => image.theme === theme)
  const sprite = swapDisplay?.sprite.default
  const shouldShowFallback = isLoading || isFetching || isUninitialized

  const handleCancel = () => {
    setSkip(true)
    setSelectedValue('')
    handleClose()
  }

  const handleSave = () => {
    // const result = assembleData()
    if (!currentUser || !swapDisplay) {
      return
    }
    // const uid = currentUser.uid
    const swapIndex = playerData.pokemon.findIndex(
      (poke) => poke.name === activePokemon.label
    )
    const pokemonToAdd = {
      id: swapDisplay.id,
      name: swapDisplay.name,
      isStarter: false,
    }
    const updatedPokemon = playerData.pokemon.map((mon, index) => {
      if (index === swapIndex) {
        return pokemonToAdd
      }
      return mon
    })
    const playerUpdates: Partial<Trainer> = {
      pokemon: updatedPokemon,
      lastUpdated: Timestamp.now(),
    }

    dispatch(
      setPlayer({ data: { id: currentUser.uid, pokemon: updatedPokemon } })
    )
    updatePlayerData(currentUser.uid, playerUpdates)
    handleClose()
  }

  return (
    <DialogRoot open={open} onOpenChange={handleClose}>
      <DialogBody
        onPointerDownOutside={(event: { preventDefault: () => void }) => {
          event.preventDefault()
        }}
        onInteractOutside={(event: { preventDefault: () => void }) => {
          event.preventDefault()
        }}
        onEscapeKeyDown={(event: { preventDefault: () => void }) => {
          event.preventDefault()
        }}
      >
        <Flex
          direction={'column'}
          align={'center'}
          justify={'center'}
          css={{
            height: '$full',
            width: '$full',
          }}
        >
          <Flex
            direction={'column'}
            justify={'start'}
            align={'center'}
            css={{
              flex: '1 0 0',
              transition: 'all 300ms linear',
            }}
          >
            {/* {JSON.stringify(activePokemon)} */}
            <Text variant={'h3'} css={{ py: '$3' }}>
              Swap {activePokemon.label}?
            </Text>
            <Flex
              direction={'column'}
              justify={'center'}
              align={'center'}
              css={{ height: '$full' }}
            >
              <Flex direction={'row'}>
                <Img
                  src={activePokemon.image}
                  css={{
                    height: '120px',
                    width: '120px',
                    mb: '$3',
                  }}
                />
                <Img
                  src={shouldShowFallback ? fallback?.path : sprite}
                  css={{
                    height: '120px',
                    width: '120px',
                    mb: '$3',
                  }}
                />
              </Flex>
              <Select
                styles={customSelectStyles}
                defaultValue={{
                  value: activePokemon.value,
                  label: activePokemon.label,
                }}
                isClearable={true}
                isSearchable={true}
                onChange={handleSelect}
                name={'pokemon-select'}
                options={transformedOptions}
              />
            </Flex>
          </Flex>
          <Flex css={{ p: '$3' }}>
            <Button
              css={{ mr: '$2' }}
              variant={'outline'}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button css={{ ml: '$2' }} variant={'primary'} onClick={handleSave}>
              Save
            </Button>
          </Flex>
        </Flex>
      </DialogBody>
    </DialogRoot>
  )
}
