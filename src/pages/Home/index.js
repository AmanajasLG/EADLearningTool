import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

const Home = () => {
  return(
    <div id="message">
      Aqui é a home. Nada muito interessante aqui. Se quiser fazer login:
      <Link to='/login' className="btn-normal">Login</Link>
    </div>
  )
}

export default Home
