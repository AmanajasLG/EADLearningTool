import React from 'react'
import Radio from '@material-ui/core/Radio'
import { useDispatch } from 'react-redux'
import { apiActions } from '../../_actions'
import { useAlert } from 'react-alert'

const CreateCharacter = () => {
  const { characterActions }= apiActions
  const [name, setName] = React.useState('')
  const [job, setJob] = React.useState('')
  const [civilState, setCivilState] = React.useState('single')
  const civilStates = ['single', 'married', 'divorced', 'widowed']
  const estadosCivis = ['solteir@', 'casad@', 'divorciad@', 'viúv@']
  const dispatch = useDispatch()
  const alert = useAlert()
  
  const create = () => {
    console.log('called')
    dispatch(characterActions.create({nome: name, job})).then(() => {
        alert.success('Character created!')  
    })
    .catch(error => {
        alert.error(error)
    })
    setName('')
    setJob('')
  }

  return (
    <div>
      <div>Criador de personagens:</div>
      <div>Nome: <input type='text' value={name} onChange={ e => setName(e.target.value)} /> </div>
      <div>Trabalho: <input type='text' value={job} onChange={ e => setJob(e.target.value)} /> </div>
      <div>Estado civil:
        {civilStates.map((cs, index) =>
          <div key={index}>
            <Radio checked={civilState === civilStates[index]} value={civilStates[index]} onChange={ e => setCivilState(e.target.value)}/>
            {estadosCivis[index]}
          </div>
        )}
      </div>
      <button onClick={create}>Criar</button>
    </div>
  )
}

export default CreateCharacter
