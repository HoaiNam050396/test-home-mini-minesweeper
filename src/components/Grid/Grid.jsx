import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAdvancedMines, getBeginnerMines } from '../../helpers/apiFetcher'
import GridCell from '../GridCell'
import ResultDialog from '../ResultDialog'
import { formatDuration } from './utils'

const Grid = ({ level = 'beginner' }) => {
  const [openedCells, setOpenedCells] = useState(new Map())
  
  const [mineKeys, setMineKeys] = useState(new Set())
  const [status, setStatus] = useState('loading')
  const navigate = useNavigate()
  const durationRef = useRef({})

  const gridSize = useMemo(() => {
    return level === 'beginner' ? 9 : 16
  }, [level])

  const dialogMessage = useMemo(() => {
    let result = { open: false, message: '' }
    if (status === 'won') {
      result = { open: true, message: `🎆 You won the game in ${durationRef.current.duration}` }
    }

    if (status === 'lost') {
      result = { open: true, message: `😭 You lost the game in ${durationRef.current.duration}` }
    }

    return result
  }, [status])


  const handleCellOpen = useCallback((x, y) => {
    if (status !== 'playing') return
    const key = `${x}-${y}`
    if (openedCells.has(key)) return
    const newOpenedCells = new Map(openedCells.entries())
    newOpenedCells.set(key, '')
    if (mineKeys.has(key)) {
      setStatus('lost')
      durationRef.current.duration = formatDuration((new Date() - durationRef.current.startedAt) / 1000)
      return
    }

    if (openedCells.size + mineKeys.length === gridSize * gridSize) {
      setStatus('won')
      durationRef.current.duration = formatDuration((new Date() - durationRef.current.startedAt) / 1000)
      return
    }
    let numberOfMinesAround = 0
    for (let i = x - 1; i <= x + 1; i++)
      for (let j = y - 1; j <= y + 1; j++) {
        if (mineKeys.has(`${i}-${j}`))
          numberOfMinesAround++
      }

    newOpenedCells.set(key, numberOfMinesAround || '')

    setOpenedCells(newOpenedCells)
  }, [status, gridSize, mineKeys, openedCells])

  const restartGame = () => {
    durationRef.current = {}
    setStatus('loading')
    setOpenedCells(new Map())
    setMineKeys(new Set())
  }

  const newGame = () => {
    navigate('/')
  }

  const renderedCells = useMemo(() => {
    console.log('Render new cells')
    let cells = []

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const key = `${x}-${y}`
        const isMine = mineKeys.has(key)
        const opened = openedCells.has(key)
        cells.push(
          <GridCell
            key={key}
            x={x}
            y={y}
            cellSize={50}
            opened={opened || (status === 'lost' && isMine)}
            onOpen={handleCellOpen}
            isMine={isMine}
            hint={openedCells.get(key)}
          />
        )
      }
    }

    return cells
  }, [gridSize, mineKeys, openedCells, handleCellOpen, status])

  useEffect(() => {
    if (status !== 'loading') return

    const fetcher = level === 'beginner' ? getBeginnerMines : getAdvancedMines
    fetcher().then((res) => {
      const { data } = res
      if (!data) return
      setMineKeys(new Set(data.data.map(({ x, y }) => `${x}-${y}`)))
      setStatus('playing')
      durationRef.current.startedAt = new Date()
    })
  }, [level, status])

  console.log(mineKeys)

  return (
    <div style={{
      width: gridSize * 50 + 4 + 'px',
      marginInline: "auto",
      position: 'relative',
      boxSizing: 'content-box'
    }}>
      <h2 style={{
        padding: '5px 20px',
        backgroundColor: '#000',
        color: '#fff',
        border: '2px solid #000',
        boxSizing: 'content-box'
      }}>
        {level === 'beginner' ? 'Beginner' : 'Advanced'}
      </h2>
      <div
        style={{
          position: 'relative',
          width: gridSize * 50 + 'px',
          height: gridSize * 50 + 'px',
          border: '2px solid #000',
          overflow: 'hidden',
          textTransform: 'uppercase',
          boxSizing: 'content-box'
        }}
      >
        {renderedCells}
      </div>

      <ResultDialog
        {...dialogMessage}
        restart={restartGame}
        newGame={newGame}
      />
    </div>
  )
}

export default Grid
