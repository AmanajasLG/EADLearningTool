import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserSpace = () => {
  const user = useSelector(state => state.authentication.user.user)
  return(
    <div>
      <h1 class="center">Oi {user.username}!</h1>
 <div class="navigation">
        <div class="btn"><Link to='/game'>Jogar jogo 1</Link></div>

        <div class="btn"><Link to='/missions'>Missões</Link></div>
      </div>
    </div>
  )
}

export default UserSpace
