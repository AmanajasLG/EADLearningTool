import React from 'react'

import { useDispatch, useSelector} from 'react-redux'
import { characterActions } from '../../_actions'

const CharactersCRUD = () => {
  const dispatch = useDispatch()
  //const characters = useSelector( state => state.characters)

  React.useEffect(()=>{
    //dispatch(characterActions.getAll())
  }, [])

  return (
    <div>
      All Characters:
    </div>
  )
}

export default CharactersCRUD
