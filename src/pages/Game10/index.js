import React from 'react'
import { Redirect } from 'react-router-dom'
import Init from '../../_components/Init'
import GameTemplate from '../GameTemplate'
import Feedback from './feedback'
import Core from './core'

import initialState from './initialState'
import stub from './stub'

const Game10 = (props) => {
  const load = (missionData, lang, state, setState) => {
    if(missionData){
      const introText = `Olá! Eu sou ${missionData.character.name}! Para planejar a festa, você vai precisar:`
      const introTextTranslation = `Hello! I am ${missionData.character.name}! In order to plan the party, you will need:`
      const dishText = `Acho que seria legal servir... Uma feijoada!`
      setState(s => ({...s, data: {...stub, introText, introTextTranslation, dishText, ...missionData}}))
    }
  }

  const loadFeedback = (data) => data

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

export default Game10
