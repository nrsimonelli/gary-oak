import { PlusIcon } from '@radix-ui/react-icons'
import { styled } from '@stitches/react'
import { Box } from '../components/Box'
import { Button } from '../components/Button'
import { Flex } from '../components/Flex'

interface NavigationProps {
  handleAdd: () => void
  handleSave: () => void
  handleNext: () => void
  handleBack: () => void
  stage: number
  isAddDisabled: boolean
  isNameEmpty: boolean
  isTeamEmpty: boolean
}

export const Navigation = ({
  handleAdd,
  handleSave,
  handleBack,
  handleNext,
  stage,
  isAddDisabled,
  isNameEmpty,
  isTeamEmpty,
}: NavigationProps) => {
  const StyledPlus = styled(PlusIcon, {
    marginRight: 4,
  })
  return (
    <Flex css={{ p: '$3' }}>
      {stage === 0 && (
        <Button variant={'primary'} onClick={handleNext} disabled={isNameEmpty}>
          Next
        </Button>
      )}
      {stage === 1 && (
        <Box css={{}}>
          <Button
            variant={'outline'}
            css={{ width: '$full' }}
            disabled={isAddDisabled}
            onClick={handleAdd}
          >
            <StyledPlus />
            Pokemon
          </Button>
          <Flex css={{ mt: '$3' }}>
            <Button css={{ mr: '$2' }} variant={'outline'} onClick={handleBack}>
              Back
            </Button>
            <Button
              css={{ ml: '$2' }}
              variant={'primary'}
              onClick={handleNext}
              disabled={isTeamEmpty}
            >
              Next
            </Button>
          </Flex>
        </Box>
      )}
      {stage === 2 && (
        <Flex css={{ mt: '$3' }}>
          <Button css={{ mr: '$2' }} variant={'outline'} onClick={handleBack}>
            Back
          </Button>
          <Button css={{ ml: '$2' }} variant={'primary'} onClick={handleSave}>
            Save Team
          </Button>
        </Flex>
      )}
    </Flex>
  )
}
