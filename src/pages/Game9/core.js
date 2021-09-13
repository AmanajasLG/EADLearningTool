import React from 'react'
import Button from '@material-ui/core/Button'
import Timer from '../../_components/Timer'
import initialState from './initialState'
import { agendamento } from '../../img'
import { getRandomInt } from '../../_helpers'

const Core = ({ exitGame, data, onEndGame }) => {
  const [state, setState] = React.useState(initialState())
  const resolveRequest = (buildingIndex) => () => {
    let request = data.requests[state.takenRequests[0]]
    let updateState = {}
    //evaluate request
    //if(buildingIndex == ok)
    updateState.completed = state.completed + 1
    //set next request
    if(state.takenRequests.length < data.requests.length)
      updateState.takenRequests =  [getRandomInt(0, data.requests.length), ...state.takenRequests]
    else {
      updateState.endGame = true
      updateState.endRequests = true
      updateState.runTimer = false
    }

    setState( s => ({...s, ...updateState }))
  }

  const onTimerEnd = () => {
    console.log('Timer end')
    setState(s => ({...s, endGame: true, timeUp: true, runTimer: false}))
  }

  const callEndGame = () => {
    {if(onEndGame) onEndGame({...data, results: state.results})}
  }

  return(
    <React.Fragment>
      {state.scene === 'TUTORIAL' &&
        <React.Fragment>
          Tutorial
          <Button onClick={ () => setState( s => ({...s, scene: 'GAME', takenRequests: [getRandomInt(0, data.requests.length)]}))}>
            Passar tutorial
          </Button>
        </React.Fragment>
      }

      {state.scene === 'GAME' &&
        <React.Fragment>
          <Timer style={{position: 'absolute'}}
            seconds={data.timer}
            run={state.runTimer}
            onStop={ seconds => { setState( s => ({...s, results: {...s.results, secondsLeft: seconds}}))}} onEnd={onTimerEnd}
          />
        <Button style={{pointerEvents: 'none', position: 'absolute', top: '30%'}}>{state.completed}</Button>

          <div style={{position: 'absolute', width: '70%', height: '20%', right: 0, backgroundColor: "#aaffaa"}}>
            <img
              style={{position: 'absolute', height: '100%', backgroundColor: "#aaaaff", borderRadius: "50%"}}
              onClick={() => setState((s) => ({ ...s, window: "SCHEDULE" }))}
              src={agendamento}
              alt=""
            />
            <div style={{position: 'absolute', padding: '2% 2% 2% 15%', left: '7%', bottom: 0, width: '80%', height: '80%', backgroundColor: "#ffaaaa"}}>
              <div style={{backgroundColor: "#ff8888", width: '100%', height: '100%'}}>
                Informações informações {state.buildingDetailsIndex != null ? `do ${data.buildings[state.buildingDetailsIndex].name}` : ''}
              </div>
              {state.buildingDetailsIndex != null &&
               data.buildings[state.buildingDetailsIndex].type == 'casa' &&
                <Button onClick={resolveRequest(state.buildingDetailsIndex)}>Escolher</Button>
              }
            </div>
          </div>

          <div style={{pointerEvents: (state.endGame? 'none': 'all'), position: 'absolute', width: '70%', height: '65%', backgroundColor: '#aaaaff', right: 0, bottom: '10%'}}>
            Mapa
            {data.buildings.map((building, index) =>
              <Button key={index} onMouseEnter={() => setState(s => ({...s, buildingDetailsIndex: index}))}>
                {building.name}
              </Button>
            )}
          </div>

          <div style={{position: 'absolute', left: 0, bottom: 0, width: '30%', height: '40%', backgroundColor: '#aaffaa'}}>
            <div style={{fontSize: '3em'}}>Pedido {state.takenRequests[0]}
            </div>
            <img
              style={{position: 'absolute', width: '50%', backgroundColor: "#aaaaff", borderRadius: "50%"}}
              onClick={() => setState((s) => ({ ...s, window: "SCHEDULE" }))}
              src={agendamento}
              alt=""
            />
          </div>

          {state.endRequests &&
            <React.Fragment>
              <Button onClick={callEndGame}>
                Você completou todos os pedidos!
              </Button>
            </React.Fragment>
          }

          {state.timeUp &&
            <React.Fragment>
              <Button onClick={callEndGame}>
                Acabou o tempo!
              </Button>
            </React.Fragment>
          }
        </React.Fragment>
      }
    </React.Fragment>
  )
}

export default Core;
