import React from 'react'

import { useDispatch, useSelector} from 'react-redux'
import { userActions } from '../../_actions'
import Register from '../Register'
import UserInfo from '../../_components/UserInfo'

const UsersCRUD = () => {
  const dispatch = useDispatch()
  const users = useSelector( state => state.users )

  React.useEffect(()=>{
    dispatch(userActions.getAll())
  }, [dispatch])

  console.log('users:', users)

  return (
    <div>
      <div>
        Create User:
        <Register />
      </div>
      <div>
        All Users:
        {users && users.items ? users.items.map( (user, index) =>
          <div key={index}>
            <UserInfo user={user} />
            <button onClick={()=>{}}>
              UPDATE USER
            </button>
            <button onClick={()=>dispatch(userActions.delete(user.id))}>
              DELETE USER
            </button>
          </div>
        ): null}
      </div>
    </div>
  )
}

export default UsersCRUD
