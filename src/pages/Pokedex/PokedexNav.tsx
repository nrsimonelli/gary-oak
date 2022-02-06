import { Box } from '../../components/Box';
import { Container } from '../../components/Container';
import { Flex } from '../../components/Flex';
import { Text } from '../../components/Text';
import { ThemeToggle } from '../../components/ThemeToggle';

const PokedexNav = () => {
  return (
    <Container variant={'responsive'} css={{ height: '50vh' }}>
      <Flex
        align={'center'}
        justify={'between'}
        css={{ height: '$full' }}
      >
        <Box>
          <Text variant={'title'}>Living Pokedex</Text>
        </Box>
        <ThemeToggle />
      </Flex>
    </Container>
  );
};

export default PokedexNav;
