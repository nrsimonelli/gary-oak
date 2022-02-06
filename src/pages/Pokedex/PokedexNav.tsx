import { Link } from 'react-router-dom';
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
        <Flex align={'center'} justify={'end'} css={{ flex: '1' }}>
          <Text
            css={{ pr: '$3', '&:hover': { color: '$loContrast' } }}
          >
            <Link to='/'>Home</Link>
          </Text>
          <ThemeToggle />
        </Flex>
      </Flex>
    </Container>
  );
};

export default PokedexNav;
