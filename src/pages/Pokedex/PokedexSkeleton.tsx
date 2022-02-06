import { Box } from '../../components/Box';
import { Flex } from '../../components/Flex';
import { Skeleton } from '../../components/Skeleton';

const PokedexSkeleton = () => {
  return (
    <Box
      css={{
        padding: '$2',
        borderRadius: '$3',
        mb: '$3',
        mx: 'auto',
        boxShadow: '$3',
      }}
    >
      <Skeleton variant={'title'} />
      <Flex justify={'between'} css={{ mb: '$3' }}>
        <Skeleton variant={'text1'} />
        <Skeleton variant={'text2'} />
      </Flex>
      <Skeleton variant={'avatar1'} />
    </Box>
  );
};

export default PokedexSkeleton;
