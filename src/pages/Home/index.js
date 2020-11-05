import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return(
    <div>
      Aqui é a home. Temos esse jogo aqui:
      <Link to='game'>Jogo1</Link>
    </div>
  )
}

export default Home
