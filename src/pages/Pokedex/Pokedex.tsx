import { useState } from 'react';
import { Container } from '../../components/Container';
import { Flex } from '../../components/Flex';
import { TEAM_GARY } from '../../constants';
import PokedexCard from './PokedexCard';
import PokedexNav from './PokedexNav';

const userData: any = [];
let i = 1;
while (i < 151) {
  if (TEAM_GARY.includes(i)) {
    userData.push({ id: i, caught: true });
  } else {
    userData.push({ id: i, caught: false });
  }
  i++;
}

const Pokedex = () => {
  const [userDex, setUserDex] = useState(() => userData);

  return (
    <Flex direction={'column'} align={'center'} justify={'start'}>
      <PokedexNav />
      <Container
        variant={'responsive'}
        css={{ py: '$3', bg: '$slate2', borderRadius: '$3' }}
      >
        <Flex wrap={'wrap'}>
          {userDex.map((mon: { id: number; caught: boolean }) => (
            <PokedexCard
              pokemon={mon.id}
              caught={mon.caught}
              key={mon.id}
            />
          ))}
        </Flex>
      </Container>
    </Flex>
  );
};

export default Pokedex;
