import React from 'react'
import { hourglassFull, blobAzul } from '../../img'
import { zeroFill } from '../../_helpers'
import Button from '../Button'

const TimerAnounce = ({seconds, onReady}) => {
  return (
    <div style={{position: 'relative', width: '100%', height: '100%',
      backgroundImage: `url(${blobAzul})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '100% 100%'
    }}>
      <div style={{width: 400, margin: '0 auto', paddingTop: '2%', paddinBottom: '2%'}}>
        <img style={{display: 'block', width: '20%', margin: '0 auto', marginBottom: '10%'}} src={hourglassFull} alt="hourglass" />
        <h1 className="type-m type-display type-center subtitle">
          Você tem
        </h1>
        <h1 style={{fontSize: 92}} className="type-l type-display type-center">
          {zeroFill(Math.floor(seconds / 60).toString(), 2)}:
          {zeroFill((seconds % 60).toString(), 2)}
        </h1>
        <h1 className="type-m type-display type-center subtitle">
          minutos
        </h1>
        <Button style={{marginTop: '10%'}} blink center onClick={onReady}>
          Estou pronto!
        </Button>
      </div>
    </div>
  )
}

export default TimerAnounce
