import React from 'react'
import Button from '@material-ui/core/Button'

const Confirmation = ({onYes, onNo}) => {
  return(
    <div style={{position: 'absolute', top: 100, left: 200, width: 300, height: 300, backgroundColor: '#3366AA'}}>
      Confirmação
      {onYes && <Button onClick={onYes}>Sim</Button>}
      {onNo && <Button onClick={onNo}>Não</Button>}
    </div>
  )
}

export default Confirmation
