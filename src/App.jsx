import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import GameScreen from './screens/GameScreen/GameScreen'
import WelcomeScreen from './screens/WelcomeScreen'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<WelcomeScreen />} />
        <Route path="/game/:level" element={<GameScreen />} />
      </Route>
    </Routes>
  )
}

export default App
