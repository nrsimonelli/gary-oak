import { Route, Routes } from 'react-router-dom'
import { GlobalLayout } from './components/GlobalLayout'
import RivalDex from './RivalDex'
import Unknown from './Unknown/Unknown'
import { globalStyles } from './utils/globalStyles'

const App = () => {
  globalStyles()

  return (
    <Routes>
      <Route path='/' element={<GlobalLayout />}>
        <Route index element={<RivalDex />} />
        <Route path='*' element={<Unknown />} />
      </Route>
    </Routes>
  )
}

export default App
