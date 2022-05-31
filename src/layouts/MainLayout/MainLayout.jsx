import { Link, Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <header style={{
        height: '50px',
        padding: "5px 10px",
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }} >
        <Link to="/" style={{
          textDecoration: "none",
          color: '#fff'
        }}>
          <h1 style={{
            fontSize: '24px',
          }} >Mini Minesweeper</h1>
        </Link>
      </header>
      <main style={{
        marginBlock: '50px'
      }}>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
