import React from 'react'
import { Redirect } from 'react-router-dom'

import Init from '../../_components/Init'
import GameTemplate from '../GameTemplate'

import stub from './stub'

import Core from './core.js'
import Feedback from './feedback.js'

const Game9 = (props) => {

  const load = (missionData, lang, state, setState) => {
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
