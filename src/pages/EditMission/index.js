import React from 'react'

import Button from '@material-ui/core/Button'
import DoneIcon from '@material-ui/icons/Done'

const EditMission = ({mission, onDone}) => {
  const [state, setState] = React.useState(mission)
  return (
    <div>
      <div>
        Nome: <input value={state.name} onChange={ e => setState({...state, name: e.target.value})} />
      </div>
      <div>
        Descrição: <input value={state.description} onChange={ e => setState({...state, description: e.target.value})} />
      </div>
      <Button onClick={onDone(state)}><DoneIcon/></Button>
    </div>
  )
}

export default EditMission
