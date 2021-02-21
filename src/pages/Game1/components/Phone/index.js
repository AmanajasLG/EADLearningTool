import React from 'react'
import Button from '@material-ui/core/Button'

const Phone = ({onClose}) => {
  return (
    <div style={{width: '100%', height: window.innerHeight, backgroundColor: "#f9afa1"}}>

      <Button onClick={onClose}>X</Button>
      <div style={{backgroundColor: '#8888ff', width: '40%', height: 600, margin: '0 auto'}}>Phone</div>
    </div>
  )
}

export default Phone
