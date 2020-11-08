import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return(
    <div>
      Aqui é a home. Nada muito interessante aqui. Se quiser fazer login:
      <Link to='/login'>Login</Link>
    </div>
  )
}

export default Home
