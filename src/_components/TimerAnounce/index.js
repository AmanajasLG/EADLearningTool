import React from 'react'
import { hourglassFull, blobAzul } from '../../img'
import { zeroFill } from '../../_helpers'
import { Iniciar } from '../Button'

import styles from './index.module.scss'

const TimerAnounce = ({seconds, onReady}) => {
  return (
    <div id={styles["timer-anounce-div"]} style={{ backgroundImage: `url(${blobAzul})` }}>
      <div>
        <img src={hourglassFull} alt="hourglass" />
        <div>Você tem</div>
        <div id={styles["timer"]}>
          {zeroFill(Math.floor(seconds / 60).toString(), 2)}:
          {zeroFill((seconds % 60).toString(), 2)}
        </div>
        <div>minutos</div>
        <Iniciar label={"Estou pronto!"} onClick={onReady} stayAsPill />
      </div>
    </div>
  )
}

export default TimerAnounce
