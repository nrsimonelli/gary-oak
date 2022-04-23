import React from 'react';
import { Text } from '../../components/Text';
import { Container } from '../../components/Container';
import { Flex } from '../../components/Flex';
import RivalSelect from './RivalSelect';
import { ThemeToggle } from '../../components/ThemeToggle';
import { Button } from '../../components/Button';

const MainNav = () => {
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

const Mono = () => {
  return (
    <>
      <MainNav />
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
      </Flex>
      <RivalSelect />
    </>
  );
};

export default Mono;
