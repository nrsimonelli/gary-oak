import { Box } from '../../components/Box';
import { Container } from '../../components/Container';
import { Flex } from '../../components/Flex';
import { Text } from '../../components/Text';

const PokedexNav = () => {
  return (
    <Container variant={'responsive'} css={{ height: '50vh' }}>
      <Flex align={'center'} css={{ height: '$full' }}>
        <Box>
          <Text variant={'title'}>Living Pokedex</Text>
        </Box>
      </Flex>
    </Container>
  );
};

export default PokedexNav;
