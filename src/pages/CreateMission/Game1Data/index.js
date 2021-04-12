import React from 'react'
import { useDispatch } from 'react-redux'
import { apiActions } from '../../../_actions'
import Checkbox from '@material-ui/core/Checkbox'

const CreateGame1Data = ({data, characters}) => {

  const dispatch = useDispatch()

  const onCheckChange = (id, type) => e => {

    let payload = {id: id, [type]: e.target.checked}
    dispatch(apiActions.game_1_mission_charactersActions.update(payload))
  }

  return(
    <div>
      Dados do Game1:
      {data && data.map((d, index) =>
        <div>
          <div>{characters.find(character => d.character === character.id).name}</div>
          <div>
            <Checkbox checked={d.showJob} onChange={onCheckChange(d.id, 'showJob')}/>
            Show Job
          </div>
          <div>
            <Checkbox checked={d.showCountry} label='ShowCountry' onChange={onCheckChange(d.id, 'showCountry')}/>
            Show Country
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateGame1Data
