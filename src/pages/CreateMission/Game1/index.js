import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { characterActions } from '../../../_actions'
import CharactersCRUD from '../../CharactersCRUD'

const CreateMissionGame1 = () => {
  const [state, setState] = React.useState('')

  return(
    <div>
      Texto da missão:
      <input type='text' value={state} onChange={e => setState(e.target.value)} />
      <div>
        <CharactersCRUD />
      </div>
    </div>
  )
}

export default CreateMissionGame1
