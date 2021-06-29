import React from 'react'
import { Redirect } from 'react-router-dom'
import Init from '../../_components/Init'



import initialState from './initialState'
import stub from './stub'

const Game9 = () => {
  const [state, setState] = React.useState(initialState())
  const mission = stub;
  const onStartGame = () => setState( s => ({...s, scene: 'GAME'}) )

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
                onBack={() => setState(s => ({ ...s, back: true })) }
                ready={mission.id}
              />)
          case 'GAME':
            return
              (<React.Fragment>
                Game 9
              </React.Fragment>)
          case 'END':
            return
              (<React.Fragment>
              </React.Fragment>)
          default:
            return (<div>Invalid GameScene</div>)
        }
      }())}
      {state.back && <Redirect to="/userspace" />}
    </React.Fragment>
  )
}

export default Game9
