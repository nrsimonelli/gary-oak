import { useEffect, useState } from 'react';
import { Box } from '../../components/Box';
import { Container } from '../../components/Container';
import { Flex } from '../../components/Flex';
import { RivalName, Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
import { RIVALS } from '../../constants';
import { SpriteImg } from '../../components/Img';

interface RivalT {
  path: string;
  name: string;
}

const Landing = () => {
  const [badges, setBadges] = useState<number>(0);
  const [pokemon, setPokemon] = useState<number>(0);
  const [victories, setVictories] = useState<number>(0);
  const [sprite, setSprite] = useState<RivalT>(RIVALS[0]);
  const [spriteIndex, setSpriteIndex] = useState<number>(0);

  // Change rival index by interval
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSpriteIndex((i) => (i + 1) % RIVALS.length);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  // Respond to change in index with new sprite
  useEffect(() => {
    setSprite(RIVALS[spriteIndex]);
  }, [spriteIndex]);

  useEffect(() => {
    if (badges <= 7) {
      const interval = setInterval(() => {
        setBadges(badges + 1);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [badges]);

  useEffect(() => {
    if (pokemon <= 15) {
      const interval = setInterval(() => {
        setPokemon(pokemon + 1);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [pokemon]);

  useEffect(() => {
    if (victories <= 127) {
      const interval = setInterval(() => {
        setVictories(victories + 1);
      }, 28);
      return () => clearInterval(interval);
    }
  }, [victories]);

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
            {sprite.name},
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
            >
              <SpriteImg src={sprite.path} />
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
