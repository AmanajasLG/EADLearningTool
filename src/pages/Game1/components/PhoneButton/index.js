import React from 'react'
import Button from '@material-ui/core/Button'
const PhoneButton = ({onClick}) => {
  return (
    <div>
      <Button onClick={onClick}>Phone</Button>
    </div>
  )
}

export default PhoneButton
