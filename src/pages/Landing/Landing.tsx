import { useEffect, useState } from 'react';
import { Box } from '../../components/Box';
import { Container } from '../../components/Container';
import { Flex } from '../../components/Flex';
import { RivalName, Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
import { SpriteImg } from '../../components/Img';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { changeRival } from '../../redux/slice/rival-slice';

interface RivalT {
  path: string;
  name: string;
}

const Landing = () => {
  const rival = useAppSelector((state) => state.rival);
  const dispatch = useAppDispatch();

  const [badges, setBadges] = useState<number>(0);
  const [pokemon, setPokemon] = useState<number>(0);
  const [victories, setVictories] = useState<number>(0);

  useEffect(() => {
    if (badges < rival.badges) {
      const interval = setInterval(() => {
        setBadges((i) => i + 1);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [badges]);

  useEffect(() => {
    if (pokemon < rival.pokemon) {
      const interval = setInterval(() => {
        setPokemon((i) => i + 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [pokemon]);

  useEffect(() => {
    if (victories <= rival.victories) {
      const interval = setInterval(() => {
        setVictories(victories + 1);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [victories]);

  const handleRivalChange = () => {
    setBadges(0);
    setPokemon(0);
    setVictories(0);
    dispatch(changeRival());
  };

  return (
    <Container variant={'responsive'} css={{ height: '$full' }}>
      <Flex
        direction={'column'}
        align={'start'}
        justify={'start'}
        css={{
          height: '$full',
        }}
      >
        <Flex
          direction={'column'}
          justify={'center'}
          css={{
            width: '$full',
            flex: '1',
          }}
        >
          <RivalName variant={'title'} case={'capitalize'}>
            {rival.name},
          </RivalName>
          <Text variant={'h1'} css={{ mt: '$1' }}>
            Pokemon Master
          </Text>
        </Flex>
        <Flex
          direction={'row'}
          css={{ width: '$full', maxHeight: '50vh', flex: '1' }}
        >
          <Flex
            direction={'column'}
            align={'center'}
            css={{ flex: '1' }}
          >
            <Box
              css={{
                width: '100%',
                height: '100%',
                textAlign: 'center',
              }}
              onClick={() => handleRivalChange()}
            >
              <SpriteImg src={rival.path} />
            </Box>
          </Flex>
          <Flex
            direction={'column'}
            align={'center'}
            css={{ flex: '1' }}
          >
            <Box>
              <Link to='collection'>
                <Button
                  variant={'primary'}
                  size={'2'}
                  shape={'2'}
                  css={{
                    color: 'white',
                  }}
                >
                  My Pokedex
                </Button>
              </Link>
            </Box>
            <Flex
              direction={'row'}
              justify={'start'}
              align={'center'}
              css={{
                flex: '1',
                width: '$full',
              }}
            >
              <Flex direction={'column'} css={{ flex: '1' }}>
                <Text my={'2'} variant={'h3'}>
                  Badges
                </Text>
                <Text my={'2'} variant={'h3'}>
                  Pokemon
                </Text>
                <Text my={'2'} variant={'h3'}>
                  Victories
                </Text>
              </Flex>
              <Flex direction={'column'} css={{ flex: '1' }}>
                <Text my={'2'} variant={'h3'}>
                  {badges}
                </Text>
                <Text my={'2'} variant={'h3'}>
                  {pokemon}
                </Text>
                <Text my={'2'} variant={'h3'}>
                  {victories}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Landing;
