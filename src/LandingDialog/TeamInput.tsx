import { Button } from '../components/Button'
import { Flex } from '../components/Flex'
import { Text } from '../components/Text'
import { SearchBar } from '../SearchBar/SearchBar'
import { SelectState } from './LandingDialog'

interface TeampInputProps {
  selectedPokemon: SelectState[]
  animateKey: number
  setAnimateKey: React.Dispatch<React.SetStateAction<number>>
  handleRemove: (target: number) => void
  updatePokemon: (
    target: number,
    data: {
      value: number
      label: string | undefined
    }
  ) => void
}
export const TeamInput = ({
  selectedPokemon,
  animateKey,
  setAnimateKey,
  handleRemove,
  updatePokemon,
}: TeampInputProps) => {
  return (
    <Flex
      direction={'column'}
      justify={'center'}
      css={{
        flex: '1 0 0',
        transition: 'all 300ms linear',
      }}
    >
      <Text variant={'h3'} css={{ mb: '$3' }}>
        Step 2: Choose your team
      </Text>
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
  )
}
