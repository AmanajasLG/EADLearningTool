import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserSpace = () => {
  const user = useSelector( state => state.authentication.user.user)
  return(
    <div>
      Oi {user.username}!
      <div>
        <Link to='/game'>Jogar jogo 1</Link>
      </div>
      <div>
        <Link to='/createMission1'>Criar missão para jogo1</Link>
      </div>
    </div>
  )
}

export default UserSpace
