import React from 'react'
import { Redirect } from 'react-router-dom'
import Init from '../../_components/Init'

import Core from './core'

import initialState from './initialState'
import stub from './stub'

const Game7 = () => {
  const [state, setState] = React.useState({scene: 'GAME', back: false})
  const mission = stub;
  const onStartGame = () => setState( s => ({...s, scene: 'GAME'}) )
  const onBack = () => setState(s => ({ ...s, back: true }))

  return(
    <React.Fragment>
      {!mission.id ? <div>Loading...</div>
        :
        (function scene(){
        switch(state.scene){
          case 'INIT':
            return(
              <Init
                name={mission.name}
                description={mission.description}
                nameTranslate={ mission.nameTranslate }
                descriptionTranslate={ mission.descriptionTranslate }
                onStart={onStartGame}
                onBack={ onBack }
                ready={mission.id}
              />
            )

          case 'GAME':
            return(
              <React.Fragment>
                <Core exitGame={onBack} mission={mission.missionData}/>
              </React.Fragment>
            )
          default:
            return (<div>Invalid GameScene</div>)
        }
      }())}
      {state.back && <Redirect to="/userspace" />}
    </React.Fragment>
  )
}

export default Game7
