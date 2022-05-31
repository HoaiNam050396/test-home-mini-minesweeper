import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

const LevelSelectionForm = () => {
  const [level, setLevel] = useState('beginner')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/game/${level}`)
  }
  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <fieldset style={{
        border: "2px solid #000",
      }}>
        <legend style={{
          border: "2px solid #000",
          color: "#000",
          padding: "5px 10px"
        }}>Please select your current level:</legend>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}>
          <div>
            <input
              type="radio"
              id="beginner"
              checked={level === 'beginner'}
              onChange={() => {
                setLevel('beginner')
              }}
            />
            <label htmlFor="beginner" style={{
              cursor: "pointer"
            }}>📖 Beginner</label>
          </div>

          <div>
            <input
              type="radio"
              id="advanced"
              checked={level === 'advanced'}
              onChange={() => {
                setLevel('advanced')
              }}
            />
            <label htmlFor="advanced" style={{
              cursor: "pointer"
            }}>💪 Advanced</label>
          </div>
        </div>
      </fieldset>

      <menu style={{
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch'
      }}>
        <button style={{
          marginInlineStart: 'auto',
          flexBasis: '100%'
        }}>Start</button>
      </menu>
    </form>
  )
}

export default LevelSelectionForm
