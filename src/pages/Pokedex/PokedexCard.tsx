import { styled } from '../../stitches.config';
import { useState } from 'react';
import { Box, PokemonContainer } from '../../components/Box';
import { Flex } from '../../components/Flex';
import { Tag, Text } from '../../components/Text';
import { useGetPokemonByNameQuery } from '../../redux/slice/pokemon-api';
import PokedexSkeleton from './PokedexSkeleton';

interface PokeCardProps {
  pokemon: number;
  caught: boolean;
}

const PokedexCard = ({ pokemon, caught }: PokeCardProps) => {
  const { data, isFetching, isLoading } =
    useGetPokemonByNameQuery(pokemon);
  const [isCaught, setIsCaught] = useState(() => caught);

  const title = data?.name;
  const visual =
    data?.sprites.other['official-artwork'].front_default;

  const Image = styled('img', {});

  return (
    <>
      {isFetching || isLoading ? (
        <PokedexSkeleton />
      ) : (
        <PokemonContainer
          isCaught={isCaught}
          p={'2'}
          onClick={() => setIsCaught(!isCaught)}
          css={{ height: '238px', transition: 'all 300ms ease-out' }}
        >
          <Text case={'capitalize'}>{title}</Text>
          <Flex justify={'between'}>
            <Text size={'1'}>#{data?.id}</Text>
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
