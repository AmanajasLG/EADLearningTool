import React from 'react'
import { useDispatch } from 'react-redux'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'

import { apiActions } from '../../_actions'
import { baseURL } from '../../_services'

const EditCharacter = ({character, onDone}) => {
  const { characterActions } = apiActions
  const [state, setState] = React.useState({nome: character.nome, job: character.job || '', id: character.id})
  const dispatch = useDispatch()
  return(
    <div>
      <div>
        <input type='text' value={state.nome} onChange={ e => setState({...state, nome: e.target.value}) }/>
        <input type='text' value={state.job} onChange={ e => setState({...state, job: e.target.value}) } />
        <div>{character.civilState}</div>
        <button onClick={onDone(state)}>Salvar</button>
      </div>
    </div>
  )
}
export default EditCharacter
