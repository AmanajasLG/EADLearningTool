import React from 'react'
import { Redirect } from 'react-router-dom'
import Init from '../../_components/Init'

const GameTemplate = ({Core, Feedback, mission}) => {
  const [state, setState] = React.useState({scene: 'INIT', back: false})

  const onStartGame = () => setState( s => ({...s, scene: 'GAME'}) )
  const onBack = () => setState(s => ({ ...s, back: true }))
  const onEndGame = data => setState(s => ({...s, scene: 'ENDGAME', gameplayData: data}))

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
                {React.createElement(Core, { exitGame: onBack, mission: mission.missionData, onEndGame: onEndGame})}
              </React.Fragment>
            )
          case 'ENDGAME':
            return(
              <React.Fragment>
                {React.createElement(Feedback, {data: state.gameplayData})}
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

export default GameTemplate
