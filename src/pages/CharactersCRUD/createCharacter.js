import React from 'react'
import Radio from '@material-ui/core/Radio'

const CreateCharacter = () => {
  const [name, setName] = React.useState('')
  const [job, setJob] = React.useState('')
  const [civilState, setCivilState] = React.useState('single')
  const civilStates = ['single', 'married', 'divorced', 'widowed']
  const estadosCivis = ['solteir@', 'casad@', 'divorciad@', 'viúv@']

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
    </div>
  )
}

export default CreateCharacter
