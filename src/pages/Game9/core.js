import React from 'react'
import Button from '@material-ui/core/Button'
import Timer from '../../_components/Timer'
import TimerAnounce from '../../_components/TimerAnounce'
import Writer from '../../_components/Writer'
import initialState from './initialState'
import { agendamento } from '../../img'
import { getRandomInt } from '../../_helpers'
import tutorialTexts from './tutorialTexts'
import { BlobBg } from '../../_components/Blob'

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
      {state.scene === 'TIMER' &&
        <TimerAnounce seconds={data.timer} onReady={() => setState(s => ({...s, scene: 'GAME', runTimer: true, takenRequests: [getRandomInt(0, data.requests.length)]}) )}/>
      }

      {(state.scene === 'GAME' || state.scene === 'TUTORIAL') &&
        <React.Fragment>
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

          <div style={{position: 'absolute', left: '5%', bottom: 0, width: '90%', height: '25%', backgroundColor: '#aaffaa'}}>
            <div style={{position: 'absolute', width: '55%', backgroundColor: '#ffaaff', height: '40%', left: '12%', top: '40%'}}>
              <Writer text={`Pedido ${state.takenRequests[0]}`}
                style={{width: '55%', backgroundColor: '#ffbbff', height: '40%', marginLeft: '25%', fontSize: '2em'}}
              />
            </div>
            <img
              style={{position: 'absolute', bottom: 0, opacity: '30%', height: '150%', backgroundColor: "#aaaaff", borderRadius: "50%"}}
              onClick={() => setState((s) => ({ ...s, window: "SCHEDULE" }))}
              src={agendamento}
              alt=""
            />
          <Button style={{position: 'absolute', right: '25%', top: '35%', pointerEvents: 'none', position: 'absolute', top: '30%'}}>{state.completed}</Button>
            <Timer style={{position: 'absolute', right: 0, fontSize: '8em', right: '2.5%', top: '35%'}}
              seconds={data.timer}
              run={state.runTimer}
              onStop={ seconds => { setState( s => ({...s, results: {...s.results, secondsLeft: seconds}}))}} onEnd={onTimerEnd}
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


      {state.scene === 'TUTORIAL' &&
        <React.Fragment>
          <BlobBg blob={{fill:  '#f9afa1'}}
            style={{position: 'absolute', right: '-20%', top: '-20%', width: '80%', height: '80%'}}>
          </BlobBg>
          <div style={{position: 'absolute', right: 0, width: '50%', height: '50%', backgroundColor: '#aafffa', opacity: '0.2'}}>
            <div>
              {tutorialTexts[state.tutorialStep].text}
              <hr/>
              {tutorialTexts[state.tutorialStep].translation}
            </div>
            <Button style={{position: 'absolute', bottom: '20%', left:'40%'}} onClick={() => setState(s =>
                ({...s, tutorialStep: s.tutorialStep + 1, scene: s.tutorialStep + 1 === tutorialTexts.length ? 'TIMER' : 'TUTORIAL' })
            )}>
              Continue
            </Button>
          </div>
          <Button onClick={ () => setState( s => ({...s, scene: 'TIMER'}) )}>
            Passar tutorial
          </Button>
        </React.Fragment>
      }
    </React.Fragment>
  )
}

export default Core;
