import { useState, useContext } from 'react'
import Select from 'react-select'
import { customSelectStyles } from '../SearchBar/SearchBar'
import { Button } from '../components/Button'
import { DialogRoot, DialogBody } from '../components/Dialog'
import { Flex } from '../components/Flex'
import { Img } from '../components/Img'
import { Text } from '../components/Text'
import { addPokemon } from '../redux/slice/player-slice'
import { useGetSpriteOnlyQuery } from '../redux/slice/pokemon-api'
import { Timestamp } from 'firebase/firestore'
import { AuthContext } from '../utils/auth'
import { Trainer, updatePlayerData } from '../utils/docs'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { ThemeContext } from '../utils/ThemeContext'
import { POKEBALL, POKEMON_LIST } from '../constants'

export const AddPokemonDialog = ({
  open,
  handleOnOpenChange,
}: {
  open: boolean
  handleOnOpenChange: () => void
}) => {
  const dispatch = useAppDispatch()
  const { theme } = useContext(ThemeContext)
  const currentUser = useContext(AuthContext)

  const playerData = useAppSelector((state) => state.player)
  const [skip, setSkip] = useState(true)
  const [selectedValue, setSelectedValue] = useState('')
  const { data, isLoading, isFetching, isUninitialized } =
    useGetSpriteOnlyQuery(selectedValue, {
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
  const sprite = data?.sprite.default
  const shouldShowFallback = isLoading || isFetching || isUninitialized

  const handleCancel = () => {
    setSkip(true)
    setSelectedValue('')
    handleOnOpenChange()
  }

  const handleSave = () => {
    // const result = assembleData()
    if (!currentUser || !data) {
      return
    }
    const uid = currentUser.uid
    const pokemonToAdd = { id: data.id, name: data.name, isStarter: false }
    const updatedPokemon: Partial<Trainer> = {
      pokemon: [...playerData.pokemon, pokemonToAdd],
      lastUpdated: Timestamp.now(),
    }
    dispatch(addPokemon({ pokemonToAdd }))
    updatePlayerData(uid, updatedPokemon)
    handleOnOpenChange()
  }

  return (
    <DialogRoot open={open} onOpenChange={handleOnOpenChange}>
      <DialogBody>
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
            <Text variant={'h3'} css={{ py: '$3' }}>
              Add to your team!
            </Text>
            <Flex
              direction={'column'}
              justify={'center'}
              align={'center'}
              css={{ height: '$full' }}
            >
              <Img
                src={shouldShowFallback ? fallback?.path : sprite}
                css={{
                  height: '120px',
                  width: '120px',
                  mb: '$3',
                }}
              />
              <Select
                styles={customSelectStyles}
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
