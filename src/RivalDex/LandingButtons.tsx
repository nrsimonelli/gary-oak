import { useContext } from 'react'
import { Button } from '../components/Button'
import { Flex } from '../components/Flex'
import { LogInButton, LogOutButton } from '../components/AuthButton'
import { clearPlayer } from '../redux/slice/player-slice'
import {
  AuthContext,
  logInAnonymously,
  logInWithGithub,
  logInWithGoogle,
  logOut,
} from '../utils/auth'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { GearIcon, GitHubLogoIcon, PersonIcon } from '@radix-ui/react-icons'
import { getInitialRival } from '../utils/localStorage'
import { setRival } from '../redux/slice/rival-slice'
import { clearFeaturedPokemon } from '../redux/slice/display-slice'

export const LandingButtons = () => {
  const currentUser = useContext(AuthContext)
  const dispatch = useAppDispatch()
  const selectedRival = useAppSelector((state) => state.rival.selectedRival)
  const playerName = useAppSelector((state) => state.player.name)

  const nameLabel = playerName ?? currentUser?.displayName ?? 'Welcome'

  const handleLogOut = () => {
    if (selectedRival === 'player') {
      const tag = getInitialRival()
      dispatch(clearFeaturedPokemon())
      dispatch(setRival({ tag }))
    }
    dispatch(clearPlayer())
    logOut()
  }

  const authProviders = [
    {
      handler: logInWithGoogle,
      label: 'Google',
      icon: <GearIcon />,
    },
    {
      handler: logInWithGithub,
      label: 'Github',
      icon: <GitHubLogoIcon />,
    },
    {
      handler: logInAnonymously,
      label: 'Anonymous',
      icon: <PersonIcon />,
    },
  ]

  return (
    <Flex
      direction={'row'}
      justify={'center'}
      align={'center'}
      css={{ pb: '$5' }}
    >
      <a href='#team'>
        <Button
          variant={'primary'}
          size={'2'}
          shape={'2'}
          css={{ textTransform: 'capitalize' }}
        >
          View Starters
        </Button>
      </a>
      {currentUser ? (
        <LogOutButton label={nameLabel} handleClick={handleLogOut} />
      ) : (
        <LogInButton authProviders={authProviders} />
      )}
    </Flex>
  )
}
