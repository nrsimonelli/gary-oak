import { useEffect, useState } from 'react';
import { Box, PokemonContainer } from '../../components/Box';
import { Flex } from '../../components/Flex';
import { Tag, Text } from '../../components/Text';
import { useGetPokemonByNameQuery } from '../../redux/slice/pokemon-api';
import { PokedexSkeleton } from '../../components/Skeleton';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import {
  removeFeaturedPokemon,
  setFeaturedPokemon,
} from '../../redux/slice/pokedex-slice';
import { Img } from '../../components/Img';

interface PokeCardProps {
  pokemon: string;
  isStarter: boolean;
}

export const PokemonCard = ({ pokemon, isStarter }: PokeCardProps) => {
  const dispatch = useAppDispatch();
  const { data, isFetching, isLoading, isError } =
    useGetPokemonByNameQuery(pokemon);
  const [isFeatured, setIsFeatured] = useState(false);
  const featureList = useAppSelector((state) => state.pokedex.featuredPokemon);

  const title = data?.name;
  const visual = data?.sprite;
  // is the pokemon currently in the featured list?
  const shouldRemove = featureList.some(
    (pokemon: { name: string }) => pokemon.name === data?.name
  );

  // make sure state matches when data changes
  useEffect(() => {
    if (isStarter !== isFeatured) {
      setIsFeatured(isStarter);
    }
  }, [isStarter, data, isLoading]);

  useEffect(() => {
    if (isFetching) {
      return;
    }
    if (!isFeatured && shouldRemove) {
      dispatch(removeFeaturedPokemon({ data }));
    }
    if (isFeatured && data) {
      dispatch(setFeaturedPokemon({ data }));
    }
  }, [isFeatured, isFetching]);

  // makes sure the card is changed to inactive if pushed out of the feature list
  useEffect(() => {
    if (isFeatured && !shouldRemove) {
      setIsFeatured(!isFeatured);
    }
  }, [featureList]);

  const handleClick = () => {
    setIsFeatured(!isFeatured);
  };

  const ErrorCard = () => {
    return (
      <PokemonContainer
        p={'2'}
        css={{ height: '238px', transition: 'all 300ms ease-out' }}
      >
        <Text case={'capitalize'}>Mystery</Text>
        <Flex justify={'between'}>
          <Text size={1}>???</Text>
          <Flex>
            <Tag
              size={1}
              style={'ghost'}
              css={{
                px: '$2',
                ml: '$1',
              }}
            >
              unknown
            </Tag>
          </Flex>
        </Flex>
        <Box css={{ borderRadius: '$3' }}>
          <Img src={'src/assets/error.png'} css={{ width: '163px' }} />
        </Box>
      </PokemonContainer>
    );
  };

  return (
    <>
      {isFetching || isLoading ? (
        <PokedexSkeleton />
      ) : isError ? (
        <ErrorCard />
      ) : (
        <PokemonContainer
          isFeatured={isFeatured}
          p={'2'}
          onClick={handleClick}
          css={{
            height: '238px',
            transition: 'all 300ms ease-out',
          }}
        >
          <Text case={'capitalize'}>{title}</Text>
          <Flex justify={'between'}>
            <Text size={1}>#{data?.id}</Text>
            <Flex>
              {data?.types.map((x: any) => (
                <Tag
                  key={x.type.name}
                  size={1}
                  style={x.type.name}
                  css={{
                    px: '$2',
                    ml: '$1',
                  }}
                >
                  {x.type.name}
                </Tag>
              ))}
            </Flex>
          </Flex>
          <Box css={{ borderRadius: '$3' }}>
            <Img src={visual} css={{ width: '163px' }} />
          </Box>
        </PokemonContainer>
      )}
    </>
  );
};
