import React from 'react'

const CreateMissionGame1 = () => {
  const [state, setState] = React.useState('')
  
  return(
    <div>
      Texto da missão:
      <input type='text' value={state} onChange={e => setState(e.target.value)} />
      <div>
        Personagens disponiveis:
        <div></div>
      </div>
    </div>
  )
}

export default CreateMissionGame1
