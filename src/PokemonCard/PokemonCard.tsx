import { useEffect, useRef, useState } from 'react'
import { Box, PokemonContainer } from '../components/Box'
import { Flex } from '../components/Flex'
import { Tag, Text } from '../components/Text'
import { useGetPokemonByNameQuery } from '../redux/slice/pokemon-api'
import { PokedexSkeleton } from '../components/Skeleton'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import {
  removeFeaturedPokemon,
  setFeaturedPokemon,
} from '../redux/slice/display-slice'
import { Img } from '../components/Img'

interface PokeCardProps {
  pokemon: string
  isStarter: boolean
}

export const PokemonCard = ({ pokemon, isStarter }: PokeCardProps) => {
  const dispatch = useAppDispatch()
  const { data, isFetching, isLoading, isError } =
    useGetPokemonByNameQuery(pokemon)
  const [isFeatured, setIsFeatured] = useState(() => isStarter)
  const [initialized, setInitialized] = useState(false)
  const featureList = useAppSelector((state) => state.display.featuredPokemon)
  const [easterEgg, setEasterEgg] = useState(false)

  const title = data?.name
  const visual = easterEgg ? data?.sprite.shiny : data?.sprite.official

  const isDisplayed = featureList.includes(data)
  const shouldRemove = isFeatured && !isDisplayed

  // fills out featureList when user switches views
  useEffect(() => {
    if (isLoading) {
      return
    }
    if (isFeatured && !isDisplayed) {
      dispatch(setFeaturedPokemon({ data }))
    }
    setInitialized(true)
  }, [isLoading])

  // keep isFeatured in sync with featureList
  useEffect(() => {
    if (!initialized) {
      return
    }
    if (shouldRemove) {
      setIsFeatured(false)
    }
  }, [featureList])

  const handleClick = () => {
    if (isFeatured) {
      dispatch(removeFeaturedPokemon({ data }))
    } else {
      dispatch(setFeaturedPokemon({ data }))
    }
    setIsFeatured(!isFeatured)
  }

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
    )
  }

  const timerRef = useRef<undefined | ReturnType<typeof setTimeout>>()
  // const isEasterEgg = useRef()
  const startClickTimer = () => {
    // isEasterEgg.current = false
    timerRef.current = setTimeout(() => {
      // isEasterEgg.current = true
      setEasterEgg(!easterEgg)
    }, 2000)
  }

  const onMouseDown = () => {
    startClickTimer()
  }
  const onMouseUp = () => {
    clearTimeout(timerRef.current)
  }

  useEffect(() => {
    if (easterEgg) {
      console.log('you did it!')
    }
  }, [easterEgg])

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
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
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
  )
}
