import React from 'react'
import { useSelector } from 'react-redux'
const UserSpace = () => {
  const user = useSelector( state => state.authentication.user.user)
  return(
    <div>
      Oi
    </div>
  )
}

export default UserSpace
