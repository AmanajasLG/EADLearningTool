import React from 'react'

import GameTemplate from '../GameTemplate'

import stub from './stub'

import Core from './core.js'
import Feedback from './feedback.js'
import { agendamento, houseIcon } from '../../img'

const Game9 = (props) => {

  const load = (missionData, lang, state, setState) => {
    console.log('load missionData:', missionData)
    if(missionData){

      let data = {...stub,
        seconds: missionData.seconds,
        buildings:
        [
          ...(missionData.locations.map( l =>
              ({...l,
                image: l.image
                  ? l.image
                  : agendamento,
                positionX: l.positionX
                  ? l.positionX
                  : Math.floor(Math.random() * 95),
                positionY: l.positionY
                  ? l.positionY
                  : Math.floor(Math.random() * 85),
               })
             )),
          ...(missionData.homes.map( h =>
              ({...h,
                type: 'Home',
                image: h.image
                  ? h.image
                  : houseIcon,
                positionX: h.positionX
                  ? h.positionX
                  : Math.floor(Math.random() * 95),
                positionY: h.positionY
                  ? h.positionY
                  : Math.floor(Math.random() * 85),
              })
             ))
        ],
        requests: [...missionData.requests],
        characters: [...missionData.characters]
      }

      setState( s => ({...s, data: data}))
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

export default Game9
