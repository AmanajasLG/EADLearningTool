import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import './index.scss'

const Home = () => {
  const isLogged = useSelector(state => state.authentication.loggedIn)

  if( isLogged ) return (<Redirect to={'/userspace'}/>)
  else return(
    <div id="message">
      Aqui é a home. Nada muito interessante aqui. Se quiser fazer login:
      <Link to='/login' className="btn-normal">Login</Link>
    </div>
  )
}

export default Home
