import React from 'react'

import GameTemplate from '../GameTemplate'
import Core from './core'
import Feedback from './feedback'

import stub from './stub'

const Game8 = () => {
  const mission = stub //substitute for useSelector

  return(<GameTemplate Core={Core} Feedback={Feedback} mission={mission}/>)
}

export default Game8
