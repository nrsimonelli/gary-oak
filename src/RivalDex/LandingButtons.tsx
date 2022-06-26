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
import { useAppDispatch } from '../utils/hooks'
import { GearIcon, GitHubLogoIcon, PersonIcon } from '@radix-ui/react-icons'

export const LandingButtons = () => {
  const currentUser = useContext(AuthContext)
  const dispatch = useAppDispatch()

  const handleLogOut = () => {
    logOut()
    dispatch(clearPlayer())
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
        <LogOutButton
          label={currentUser.displayName}
          handleClick={handleLogOut}
        />
      ) : (
        <LogInButton authProviders={authProviders} />
      )}
    </Flex>
  )
}
