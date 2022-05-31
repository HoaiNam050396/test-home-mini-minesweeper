import { useMemo } from 'react'

const GridCell = ({
  x = 0,
  y = 0,
  cellSize = 50,
  opened = false,
  onOpen,
  isMine = false,
  hint
}) => {
  const handleCellClick = () => {
    if (!opened) onOpen(x, y)
  }


  const renderedCellContent = useMemo(() => {
    if (!opened) return null
    if (isMine)
      return (
        <span role="img" aria-label="mine">
          💣
        </span>
      )

    if (hint) {
      return `${hint}`
    }
  }, [isMine, opened, hint])
  return (
    <div
      style={{
        height: cellSize,
        width: cellSize,
        border: '1px solid #000',
        position: 'absolute',
        top: y * cellSize,
        left: x * cellSize,
        backgroundColor: opened ? 'lightblue' : '#fff',
        cursor: "pointer",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={handleCellClick}
    >
      {renderedCellContent}
    </div>
  )
}

export default GridCell
