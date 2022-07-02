import { Flex } from '../components/Flex'
import { DialogBody, DialogRoot } from '../components/Dialog'
import { useAppDispatch } from '../utils/hooks'
import { useContext, useState } from 'react'
import { SPRITE_OPTIONS } from '../constants'
import { z } from 'zod'
import { setPlayer } from '../redux/slice/player-slice'
import { updatePlayerData } from '../utils/docs'
import { AuthContext } from '../utils/auth'
import { Timestamp } from 'firebase/firestore'
import { CharacterInput } from './CharacterInput'
import { TeamInput } from './TeamInput'
import { Navigation } from './Navigation'
import { ConfirmInput } from './ConfirmInput'

interface LandingDialogProps {
  open: boolean
  onOpenChange: () => void
}

export interface SelectState {
  key: number
  id: number
  name: string
}

export const LandingDialog = ({ open, onOpenChange }: LandingDialogProps) => {
  const currentUser = useContext(AuthContext)
  const dispatch = useAppDispatch()
  const [stage, setStage] = useState(0)
  const [selectedPokemon, setSelectedPokemon] = useState<SelectState[]>([
    { key: 0, id: 0, name: '' },
    { key: 1, id: 0, name: '' },
    { key: 2, id: 0, name: '' },
  ])
  const [animateKey, setAnimateKey] = useState(-1)
  const [spriteDisplay, setSpriteDisplay] = useState(0)
  const [userName, setUserName] = useState<string>('')

  const largestKey = () => {
    let value = 0
    for (const mon of selectedPokemon) {
      if (mon.key >= value) {
        value = mon.key + 1
      }
    }
    return value
  }

  const onNameChange = (event: { target: { value: string } }) => {
    setUserName(event.target.value.trim())
  }

  const handleOnOpenChange = () => {
    onOpenChange()
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
      name: userName,
      path: SPRITE_OPTIONS[spriteDisplay].path,
      pokemon: teamData,
    }
    return mySchema.safeParse(profileData)
  }

  const handleSave = () => {
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
      // Toast ?
    } else {
      // TODO... handle this
      console.log('err0r', result)
      // Toast ?
    }
  }

  const handleNext = () => {
    if (stage === 1) {
      setSelectedPokemon(selectedPokemon.filter((x) => x.id !== 0))
      setStage(stage + 1)
    } else {
      setStage(stage + 1)
    }
  }

  const handleBack = () => {
    setStage(stage - 1)
  }

  const isAddDisabled = selectedPokemon.length > 5
  const isNameEmpty = userName === ''
  const isTeamEmpty = selectedPokemon.filter((x) => x.id !== 0).length < 1

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
          {stage === 0 && (
            <CharacterInput
              handleChevronClick={handleChevronClick}
              spriteDisplay={spriteDisplay}
              userValue={userName}
              userChange={onNameChange}
            />
          )}
          {stage === 1 && (
            <TeamInput
              selectedPokemon={selectedPokemon}
              animateKey={animateKey}
              setAnimateKey={setAnimateKey}
              handleRemove={handleRemove}
              updatePokemon={updatePokemon}
            />
          )}
          {stage === 2 && (
            <ConfirmInput
              spriteDisplay={spriteDisplay}
              selectedPokemon={selectedPokemon}
              playerName={userName}
            />
          )}
          <Navigation
            handleAdd={handleAdd}
            handleSave={handleSave}
            handleNext={handleNext}
            handleBack={handleBack}
            stage={stage}
            isAddDisabled={isAddDisabled}
            isNameEmpty={isNameEmpty}
            isTeamEmpty={isTeamEmpty}
          />
        </Flex>
      </DialogBody>
    </DialogRoot>
  )
}
