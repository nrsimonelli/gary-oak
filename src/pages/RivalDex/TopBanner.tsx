import { Container } from '../../components/Container';
import { Flex } from '../../components/Flex';
import { Text } from '../../components/Text';
import { ThemeToggle } from '../../components/ThemeToggle';

export const TopBanner = () => {
  return (
    <Container variant={'responsive'} css={{ height: '60vh' }}>
      <Flex align={'center'} justify={'between'} css={{ height: '$full' }}>
        <Flex direction={'column'} css={{ flex: '2' }}>
          <Text variant={'title'}>Rival Dex</Text>
          <Text variant={'h2'} css={{ pr: '$3' }}>
            Legendary trainers & their Pokemon
          </Text>
        </Flex>
        <Flex align={'center'} justify={'end'} css={{ flex: '1' }}>
          <ThemeToggle />
        </Flex>
      </Flex>
    </Container>
  );
};
