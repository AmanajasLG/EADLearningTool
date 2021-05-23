import React from 'react'
import { hourglassFull } from '../../img'
import { zeroFill } from '../../_helpers'
import Button from '../Button'

const TimerAnounce = ({seconds, onReady}) => {
  return (
    <div style={{width: 400, margin: '0 auto'}}>
      <img style={{display: 'block', margin: '0 auto'}} src={hourglassFull} alt="hourglass" />
      <div style={{display: 'block', margin: '0 auto'}}>
        Você tem
      </div>
      <h1 className="margin-half-top type-l type-display type-center">
        {zeroFill(Math.floor(seconds / 60).toString(), 2)}:
        {zeroFill((seconds % 60).toString(), 2)}
      </h1>
      <div style={{display: 'block', margin: '0 auto'}}>
        minutos
      </div>
      <Button blink onClick={onReady}>
        Estou pronto!
      </Button>
    </div>
  )
}

export default TimerAnounce
