import { useEffect, useState } from 'react';
import { Box } from '../../components/Box';
import { Container } from '../../components/Container';
import { Flex } from '../../components/Flex';
import { Text } from '../../components/Text';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [badges, setBadges] = useState(0);
  const [pokemon, setPokemon] = useState(0);
  const [victories, setVictories] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
    AOS.refresh();
  }, []);

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
          <Text variant={'title'}>Gary Oak</Text>
          <Text variant={'title'}>Pokemon Master</Text>
        </Flex>
        <Flex direction={'row'} css={{ width: '$full', flex: '1' }}>
          <Box
            css={{
              width: '50%',
              backgroundImage: 'url(src/garyblue.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            data-aos='zoom-out'
            data-aos-delay='300'
          ></Box>
          <Flex
            direction={'column'}
            align={'center'}
            css={{ width: '$full' }}
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
