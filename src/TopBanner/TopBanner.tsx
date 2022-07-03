import { useContext, useEffect, useState } from 'react'
import { Container } from '../components/Container'
import { Flex } from '../components/Flex'
import { Text } from '../components/Text'
import { ThemeToggle } from '../components/ThemeToggle'
import { setPlayer } from '../redux/slice/player-slice'
import { AuthContext } from '../utils/auth'
import { fetchPlayerData, getAllData } from '../utils/docs'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { LandingDialog } from '../LandingDialog/LandingDialog'
import { fetchRivals, setAllRivals } from '../redux/slice/rival-slice'

export const TopBanner = () => {
  const currentUser = useContext(AuthContext)
  const [openWelcomeScreen, setOpenWelcomeScreen] = useState(false)
  const dispatch = useAppDispatch()
  const rivalStatus = useAppSelector((state) => state.rival.status)

  useEffect(() => {
    if (currentUser) {
      handleUserCheck()
    }
  }, [currentUser])

  const handleUserCheck = () => {
    if (!currentUser) {
      return
    }
    // if they have data, load it
    // if they dont, send to welcome screen
    fetchPlayerData(currentUser.uid)
      .then((data) => {
        if (data) {
          dispatch(setPlayer({ data }))
        } else {
          dispatch(
            setPlayer({
              data: {
                id: currentUser.uid,
                name: currentUser.displayName ?? '',
                path: '',
                pokemon: [],
              },
            })
          )
          setOpenWelcomeScreen(true)
        }
      })
      .catch((err) => {
        console.log('error fetching data =>', err)
      })
  }

  useEffect(() => {
    if (rivalStatus === 'idle') {
      dispatch(fetchRivals())
    }
  }, [rivalStatus])

  return (
    <Container variant={'responsive'} css={{ height: '60vh' }}>
      <LandingDialog
        open={openWelcomeScreen}
        onOpenChange={() => setOpenWelcomeScreen(!openWelcomeScreen)}
      />
      <Flex align={'center'} justify={'between'} css={{ height: '$full' }}>
        <Flex direction={'column'} css={{ flex: '2' }}>
          <Text variant={'title'}>Rival Dex</Text>
          <Text variant={'h2'} css={{ pr: '$3' }}>
            Legendary trainers & their Pokemon
          </Text>
        </Flex>
        <Flex align={'center'} justify={'end'} css={{ flex: '1' }}>
          <ThemeToggle />
        </Flex>
      </Flex>
    </Container>
  )
}
