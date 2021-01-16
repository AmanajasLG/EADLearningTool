import React from 'react'
import Button from '@material-ui/core/Button'

const Confirmation = ({onYes, onNo, tips}) => {
  return(
    <div style={{position: 'absolute', top: 100, left: 200, width: 300, height: 300, backgroundColor: '#3366AA'}}>
      Dicas vistas até agora:
      <div>
        {tips && tips.length > 0 &&
          <div>
            {tips.map((tip, index) => <div key={index}>{tip}</div>)}
          </div>
        }
      </div>
      {onYes && <Button onClick={onYes}>Sim</Button>}
      {onNo && <Button onClick={onNo}>Não</Button>}
    </div>
  )
}

export default Confirmation
