import { useParams } from 'react-router-dom'
import Grid from '../../components/Grid'
const GameScreen = () => {
  const { level } = useParams()
  return (
    <div>
      <Grid level={level} />
    </div>
  )
}

export default GameScreen
