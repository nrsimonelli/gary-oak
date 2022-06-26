import { Button } from '../components/Button'
import { Flex } from '../components/Flex'
import { Input } from '../components/Input'
import { DialogBody, DialogRoot } from '../components/Dialog'
import { useAppDispatch, useInput } from '../utils/hooks'
import { useContext, useState } from 'react'
import { SearchBar } from '../SearchBar/SearchBar'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Img } from '../components/Img'
import { SPRITE_OPTIONS } from '../constants'
import { z } from 'zod'
import { setPlayer } from '../redux/slice/player-slice'
import { updatePlayerData } from '../utils/docs'
import { AuthContext } from '../utils/auth'
import { Timestamp } from 'firebase/firestore'

interface LandingDialogProps {
  open: boolean
  onOpenChange: () => void
}

interface SelectState {
  key: number
  id: number
  name: string | undefined
}

export const LandingDialog = ({ open, onOpenChange }: LandingDialogProps) => {
  const currentUser = useContext(AuthContext)
  const dispatch = useAppDispatch()
  const [selectedPokemon, setSelectedPokemon] = useState<SelectState[]>([
    { key: 0, id: 0, name: '' },
    { key: 1, id: 0, name: '' },
    { key: 2, id: 0, name: '' },
  ])
  const [animateKey, setAnimateKey] = useState(-1)
  const [spriteDisplay, setSpriteDisplay] = useState(0)
  const userName = useInput('')

  const largestKey = () => {
    let value = 0
    for (const mon of selectedPokemon) {
      if (mon.key >= value) {
        value = mon.key + 1
        console.log(value)
      } else {
        console.log('miss')
      }
    }
    return value
  }

  const handleOnOpenChange = () => {
    console.log('firing on Open Change')
    onOpenChange()
  }

  const updatePokemon = (
    target: number,
    data: { value: number; label: string | undefined }
  ) => {
    const updatedList = selectedPokemon.map((x) => {
      if (x.key === target) {
        return { ...x, id: data.value, name: data?.label ?? '' }
      }
      return x
    })
    setSelectedPokemon(updatedList)
  }

  const handleRemove = (target: number) => {
    const updatedList = selectedPokemon.filter((x) => x.key !== target)
    setSelectedPokemon(updatedList)
    setAnimateKey(-1)
  }

  const handleAdd = () => {
    const updatedList = [
      ...selectedPokemon,
      {
        key: largestKey(),
        id: 0,
        name: '',
      },
    ]
    setSelectedPokemon(updatedList)
    setAnimateKey(largestKey())
  }
  const handleChevronClick = (value: number) => {
    const targetIndex = (spriteDisplay + value) % SPRITE_OPTIONS.length
    const loop = SPRITE_OPTIONS.length - 1

    if (targetIndex < 0) {
      setSpriteDisplay(loop)
    } else {
      setSpriteDisplay(targetIndex)
    }
  }

  const mySchema = z.object({
    name: z.string().min(1, { message: 'Please enter your name' }).max(64, {
      message: 'Got any nicknames? Perhaps something a little shorter?',
    }),
    path: z.string(),
    pokemon: z
      .array(
        z.object({
          id: z.number(),
          name: z
            .string()
            .min(1, { message: 'One of your Pokemon is missing!' }),
          isStarter: z.boolean(),
        })
      )
      .min(1, { message: 'Choose a Pokemon' }),
  })

  const assembleData = () => {
    const teamData = selectedPokemon.map((mon, index) => {
      return { id: mon.id, name: mon.name, isStarter: index < 3 ? true : false }
    })
    const profileData = {
      name: userName.value,
      path: SPRITE_OPTIONS[spriteDisplay].path,
      pokemon: teamData,
    }
    return mySchema.safeParse(profileData)
  }

  const handleSave = () => {
    console.log('saving')
    const result = assembleData()
    const uid = currentUser?.uid
    if (result.success && uid) {
      const data = {
        id: uid,
        ...result.data,
        dateCreated: Timestamp.now(),
        lastUpdated: Timestamp.now(),
      }
      dispatch(setPlayer({ data }))
      updatePlayerData(uid, data)
      onOpenChange()
    } else {
      console.log('err0r', result)
      // send data to firestore...
    }
  }

  const isAddDisabled = selectedPokemon.length > 5

  return (
    <DialogRoot open={open} onOpenChange={handleOnOpenChange}>
      <DialogBody
        onPointerDownOutside={(event: { preventDefault: () => void }) => {
          event.preventDefault()
        }}
        onInteractOutside={(event: { preventDefault: () => void }) => {
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
            justify={'between'}
            align={'center'}
            css={{ flex: '1 0 0' }}
          >
            <Flex direction={'row'} justify={'center'} align={'center'}>
              <ChevronLeftIcon onClick={() => handleChevronClick(-1)} />
              <Img
                src={
                  SPRITE_OPTIONS[spriteDisplay]?.path || 'src/assets/error.png'
                }
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
              value={userName.value}
              onChange={userName.onChange}
              css={{ my: '$2' }}
            />
          </Flex>
          <Flex
            direction={'column'}
            justify={'center'}
            css={{
              flex: '1 0 0',
              transition: 'all 300ms linear',
            }}
          >
            {selectedPokemon.map((mon) => (
              <SearchBar
                key={mon.key}
                targetValue={mon.key}
                animateKey={animateKey}
                initialValue={{ value: mon.id, label: mon.name }}
                handleRemove={handleRemove}
                updatePokemon={updatePokemon}
                resetAnimateKey={setAnimateKey}
              />
            ))}
          </Flex>
          <Flex css={{ p: '$3' }}>
            <Button
              variant={'outline'}
              disabled={isAddDisabled}
              onClick={handleAdd}
            >
              Add Mon
            </Button>
            <Button variant={'primary'} onClick={handleSave}>
              Save Team
            </Button>
          </Flex>
        </Flex>
      </DialogBody>
    </DialogRoot>
  )
}
