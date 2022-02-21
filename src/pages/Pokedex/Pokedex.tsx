import { Key, MouseEvent, useEffect, useState } from 'react';
import { Box } from '../../components/Box';
import { FilterButton } from '../../components/Button';
import { Container } from '../../components/Container';
import { Flex } from '../../components/Flex';
import { ToastRoot } from '../../components/ToastRoot';
import { GenEnum, LIMIT_OFFSET } from '../../constants';
import { getStoredPokemon } from '../../redux/slice/pokedex-slice';
import { useGetAllPokemonQuery } from '../../redux/slice/pokemon-api';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import PokedexCard from './PokedexCard';
import PokedexNav from './PokedexNav';

const Pokedex = () => {
  const dispatch = useAppDispatch();
  const actualData = useAppSelector((state) => state.pokedex.data);
  const loadingArray = useAppSelector(
    (state) => state.pokedex.loadingStates
  );
  const shouldLoadMore = !loadingArray.some(
    (i: { status: boolean }) => i.status === true
  );

  const [queryOffset, setQueryOffset] = useState(0);
  const [currentData, setCurrentData] = useState([]);
  // const [activeFilter, setActiveFilter] = useState(GenEnum.GEN_1);
  const [activeFilter, setActiveFilter] = useState(GenEnum.GEN_1);
  const [maxOffset, setMaxOffset] = useState(150);
  const [displayPokemon, setDisplayPokemon] = useState([]);

  interface InitialToast {
    open: boolean;
    variant: 'success' | 'error';
    pokemon: string;
  }

  const [toastState, setToastState] = useState<InitialToast>({
    open: false,
    variant: 'success',
    pokemon: '',
  });

  const { data, isFetching, isLoading } = useGetAllPokemonQuery<any>({
    limit: LIMIT_OFFSET,
    offset: queryOffset,
  });

  useEffect(() => {
    if (data) {
      setCurrentData((i) => i.concat(data));
    }
  }, [data]);

  useEffect(() => {
    if (currentData && currentData !== undefined && shouldLoadMore) {
      // sets redux pokedex state = current data and
      // redux state.data collects current data over time.
      dispatch(getStoredPokemon({ currentData }));
    }
  }, [currentData]);

  useEffect(() => {
    if (!isFetching && !isLoading && queryOffset < maxOffset) {
      console.log('more offset..', queryOffset);
      setQueryOffset((i) => i + LIMIT_OFFSET);
    }
  }, [isLoading, isFetching]);

  const handleFilterClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const generation = Number(event.currentTarget.value);
    if (activeFilter !== generation) {
      setActiveFilter(generation);
      setMaxOffset(generation);
      switch (generation) {
        case GenEnum.GEN_1:
          setQueryOffset(0);
          break;
        case GenEnum.GEN_2:
          setQueryOffset(GenEnum.GEN_1);
          break;
        case GenEnum.GEN_3:
          setQueryOffset(GenEnum.GEN_2);
          break;
        default:
          break;
      }
      // setActiveFilter(generation);
      // setMaxOffset(generation)
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setToastState((i) => ({ ...i, open: false }));
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [toastState.open]);

  const isGenOne = activeFilter === GenEnum.GEN_1;
  const isGenTwo = activeFilter === GenEnum.GEN_2;
  const isGenThree = activeFilter === GenEnum.GEN_3;

  return (
    <Flex direction={'column'} align={'center'} justify={'start'}>
      <ToastRoot
        type={toastState.variant}
        pokemon={toastState.pokemon}
        isVisible={toastState.open}
      />
      <PokedexNav />
      <Container
        variant={'responsive'}
        css={{ py: '$3', bg: '$appBg2', borderRadius: '$3' }}
      >
        {/* {JSON.stringify(shouldLoadMore)}
        {JSON.stringify(loadingArray)} */}
        {/* {JSON.stringify(currentData)} */}
        {/* {JSON.stringify(actualData)} */}
        <Flex wrap={'wrap'}>
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
              <FilterButton
                onClick={(event) => handleFilterClick(event)}
                value={GenEnum.GEN_1}
                isSelected={isGenOne}
              >
                Gen I
              </FilterButton>
              <FilterButton
                onClick={(event) => handleFilterClick(event)}
                value={GenEnum.GEN_2}
                isSelected={isGenTwo}
              >
                Gen II
              </FilterButton>
              <FilterButton
                onClick={(event) => handleFilterClick(event)}
                value={GenEnum.GEN_3}
                isSelected={isGenThree}
              >
                Gen III
              </FilterButton>
            </Box>
          </Flex>
          {actualData?.map(
            (
              mon: { name: string },
              index: Key | null | undefined
            ) => (
              <PokedexCard
                pokemon={mon.name}
                caught={false}
                triggerToast={setToastState}
                key={index}
              />
            )
          )}
        </Flex>
      </Container>
    </Flex>
  );
};

export default Pokedex;
