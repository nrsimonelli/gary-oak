import { styled } from '../../stitches.config';
import { useEffect, useState } from 'react';
import { Box, PokemonContainer } from '../../components/Box';
import { Flex } from '../../components/Flex';
import { Tag, Text } from '../../components/Text';
import { useGetPokemonByNameQuery } from '../../redux/slice/pokemon-api';
import PokedexSkeleton from './PokedexSkeleton';
import { useAppDispatch } from '../../utils/hooks';
import { updateLoadingStates } from '../../redux/slice/pokedex-slice';

interface PokeCardProps {
  pokemon: string;
  caught: boolean;
}

const PokedexCard = ({ pokemon, caught }: PokeCardProps) => {
  const dispatch = useAppDispatch();
  const { data, isFetching, isLoading, isError } =
    useGetPokemonByNameQuery(pokemon);
  const [isCaught, setIsCaught] = useState(() => caught);

  const title = data?.name;
  const visual =
    data?.sprites.other['official-artwork'].front_default;

  const Image = styled('img', {});

  useEffect(() => {
    const cardStatus = { name: pokemon, status: isLoading };
    dispatch(updateLoadingStates({ cardStatus }));
  }, [isLoading]);

  return (
    <>
      {isFetching || isLoading ? (
        <PokedexSkeleton />
      ) : isError ? (
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
            <Image
              src={'src/assets/error.png'}
              css={{ width: '163px' }}
            />
          </Box>
        </PokemonContainer>
      ) : (
        <PokemonContainer
          isCaught={isCaught}
          p={'2'}
          onClick={() => setIsCaught(!isCaught)}
          css={{ height: '238px', transition: 'all 300ms ease-out' }}
        >
          <Text case={'capitalize'}>{title}</Text>
          <Flex justify={'between'}>
            <Text size={1}>#{data?.id}</Text>
            <Flex>
              {data.types.map((x: any) => (
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
            <Image src={visual} css={{ width: '163px' }} />
          </Box>
        </PokemonContainer>
      )}
    </>
  );
};

export default PokedexCard;
