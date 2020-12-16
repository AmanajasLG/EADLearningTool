import React from 'react'
import { useDispatch } from 'react-redux'
import { apiActions } from '../../_actions'

import Button from '@material-ui/core/Button'

const CreateLocation = () => {
  const [state, setState] = React.useState({name: ''})
  const dispatch = useDispatch()
  const { locationsActions } = apiActions

  const create = () => {
    dispatch(locationsActions.create(state))
    setState({name: ''})
  }
  return (
    <div>
      Nome: <input value={state.name} onChange={ e => setState({...state, name:e.target.value})} placeholder='Sala de estar' />
      <Button onClick={create}>Salvar</Button>
    </div>
  )
}

export default CreateLocation
