import React from 'react'

const UserInfo = ({user}) => {
  return(
    <div>
      Username: {user.username}
      Email: {user.email}
      Provider: {user.provider}
      Confirmed: <input type='checkbox' checked={user.confirmed} />
      Blocked: <input type='checkbox' checked={user.blocked} />
    </div>
  )
}

export default UserInfo
