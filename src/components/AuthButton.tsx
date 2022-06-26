import { styled, keyframes } from '../stitches.config'
import { Content, Root, Trigger } from '@radix-ui/react-popover'
import { Button } from './Button'
import { Text } from './Text'
import { ExitIcon } from '@radix-ui/react-icons'

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const StyledContent = styled(Content, {
  borderRadius: '$3',
  py: '$2',
  mt: '$1',
  width: 'fit-content',
  bg: '$appBg2',
  boxShadow: '$1',
  display: 'flex',
  flexDirection: 'column',
  animation: `${slideDownAndFade} 400ms ease-out forwards`,
})

interface LogOutProps {
  label: string | null
  handleClick: () => void
}

interface LogInProps {
  handler: () => void
  label: string
  icon: JSX.Element
}

export const LogOutButton = ({ label, handleClick }: LogOutProps) => (
  <Root>
    <Trigger asChild>
      <Button variant={'outline'} size={'2'} shape={'2'} css={{ ml: '$3' }}>
        {label || 'Welcome'}
      </Button>
    </Trigger>
    <StyledContent>
      <Button css={{ '&:hover': { bg: '$appBg3' } }} onClick={handleClick}>
        <ExitIcon />
        <Text css={{ ml: '$2' }}>Logout</Text>
      </Button>
    </StyledContent>
  </Root>
)

export const LogInButton = (props: { authProviders: LogInProps[] }) => (
  <Root>
    <Trigger asChild>
      <Button variant={'outline'} size={'2'} shape={'2'} css={{ ml: '$3' }}>
        {'Log In'}
      </Button>
    </Trigger>
    <StyledContent>
      {props.authProviders.map((option) => (
        <Button
          key={option.label}
          css={{ '&:hover': { bg: '$appBg3' } }}
          onClick={option.handler}
        >
          {option.icon}
          <Text css={{ ml: '$1' }}>{option.label}</Text>
        </Button>
      ))}
    </StyledContent>
  </Root>
)
