import { useEffect, useRef } from 'react'

const ResultDialog = ({ open, message, restart, newGame }) => {
  const dialogRef = useRef(null)

  const handleRestartClick = () => {
    restart()
    dialogRef.current.close()
  }

  const handleNewGameClick = () => {
    newGame()
    dialogRef.current.close()
  }

  useEffect(() => {
    if (open) {
      if (!dialogRef.current.open) dialogRef.current.showModal()
    }

    if (!open) {
      if (dialogRef.current.open) dialogRef.current.close()
    }
  }, [open])

  return (
    <dialog ref={dialogRef}>
      <article>
        <header>
          <h2>Result Announcement</h2>
        </header>
        <p>{message}</p>
        <footer>
          <menu
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              margin: 0,
              padding: 0,
            }}
          >
            <button onClick={handleRestartClick} className="primary">Restart</button>
            <button onClick={handleNewGameClick} className="secondary">New Game</button>
          </menu>
        </footer>
      </article>
    </dialog>
  )
}

export default ResultDialog
