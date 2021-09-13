import React from 'react'

import GameTemplate from '../GameTemplate'

import stub from './stub'

import Core from './core.js'
import Feedback from './feedback.js'

const Game9 = (props) => {

  const load = (missionData, lang, state, setState) => {
    console.log('load missionData:', missionData)
    setState( s => ({...s, missionData: missionData, data: stub}))
  }
  const loadFeedback = () => {}

  return(
    <GameTemplate
      Core={Core}
      Feedback={Feedback}
      missionId={props.match.params.id}
      loadData={load}
      loadFeedback={loadFeedback}
    />
  )
}

export default Game9
