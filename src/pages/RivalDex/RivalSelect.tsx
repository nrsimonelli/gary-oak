import React, { useEffect, useState } from 'react';
import { Box } from '../../components/Box';
import { FilterButton } from '../../components/Button';
import { Container } from '../../components/Container';
import { Flex } from '../../components/Flex';
import { Img } from '../../components/Img';
import { Skeleton } from '../../components/Skeleton';
import { Text } from '../../components/Text';
import { RIVAL_LIST } from '../../constants';
import { clearFeaturedPokemon } from '../../redux/slice/pokedex-slice';
import { useAppDispatch } from '../../utils/hooks';
import { getInitialRival, persistCurrentRival } from '../../utils/rivalPersist';
import { PokemonCard } from './PokemonCard';
import { RadarGraph } from './RadarGraph';

interface Rival {
  name: string;
  path: string;
  pokemon: {
    id: number;
    name: string;
    isStarter: boolean;
  }[];
}

export const RivalSelect = () => {
  const dispatch = useAppDispatch();
  const [currentRival, setCurrentRival] = useState(() => getInitialRival());
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (rival: Rival) => {
    setIsLoading(true);
    setCurrentRival(rival.name);
    dispatch(clearFeaturedPokemon());
  };

  useEffect(() => {
    if (currentRival !== data?.name) {
      const rivalIndex = RIVAL_LIST.findIndex(
        (rival) => rival.name === currentRival
      );
      setData(RIVAL_LIST[rivalIndex]);
      persistCurrentRival(currentRival);
    }
  }, [currentRival]);

  useEffect(() => {
    if (isLoading) {
      setIsLoading(!isLoading);
    }
  }, [data]);

  return (
    <Flex direction={'column'} align={'center'} justify={'start'}>
      <Flex direction={'row'}>
        {isLoading ? (
          <Skeleton variant={'spriteContainer'} css={{ my: '$5' }} />
        ) : (
          <Img
            src={data?.path || 'src/assets/error.png'}
            css={{
              height: '120px',
              width: 'auto',
              my: '$5',
            }}
          />
        )}
        <RadarGraph />
      </Flex>
      <Container
        variant={'responsive'}
        css={{
          py: '$3',
          bg: '$appBg2',
          borderRadius: '$3',
          '@bp4': {
            mb: '$3',
          },
        }}
      >
        <Flex wrap={'wrap'} id='team'>
          <Flex css={{ width: '$full' }}>
            <Box
              p={'2'}
              css={{
                bg: '$appBg1',
                width: '$full',
                borderRadius: '$3',
                boxShadow: '$2',
                mb: '$3',
              }}
            >
              {RIVAL_LIST.map((rival, index) => (
                <FilterButton
                  key={index}
                  value={rival.name}
                  isSelected={currentRival === rival.name}
                  onClick={() => handleClick(rival)}
                  disabled={currentRival === rival.name}
                >
                  <Text case={'capitalize'}>{rival.name}</Text>
                </FilterButton>
              ))}
            </Box>
          </Flex>
          {data?.pokemon?.map(
            (
              mon: { name: string; isStarter: boolean },
              index: React.Key | null | undefined
            ) => (
              <PokemonCard
                key={index}
                pokemon={mon.name}
                isStarter={mon.isStarter}
              />
            )
          )}
        </Flex>
      </Container>
    </Flex>
  );
};
