import React from 'react'
import Button from '@material-ui/core/Button'
import Timer from '../../_components/Timer'
import TimerAnounce from '../../_components/TimerAnounce'
import Writer from '../../_components/Writer'
import initialState from './initialState'
import { agendamento } from '../../img'
import { getRandomInt } from '../../_helpers'
import tutorialTexts from './tutorialTexts'
import TutorialBlob from '../../_components/TutorialBlob'
import TaggedIcon from '../../_components/TaggedIcon'
import charStub from './chef_animada.svg'
import FullscreenOverlay from '../../_components/FullscreenOverlay'


const iconColors = {
  school: "#FFEACC",
  hotel: "#FFCCA9",
  hospital: "#D6E3F4",
  drugstore: "#D6E3F4",
  supermarket: "#FFDEA9",
  park: "#F9AFA1",
  restaurant: "#E8CAFF",
  cityhall: "#F9AFA1",
  touristic: "#F9AFA1",
  shopping: "#FFDEA9",
};



const Core = ({ exitGame, data, onEndGame }) => {
  const [state, setState] = React.useState(initialState())
  const resolveRequest = (buildingIndex) => () => {
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
    if(onEndGame) onEndGame({...data, results: state.results})
  }

  const onMouseClickLocation = index => () => {
    if(data.buildings[index].type === "Home")//home has no type
      setState(s => ({...s, locationConfirmationWindow: true, selectedHome: data.buildings[index]}))
  }

  const onMouseEnterLocation = index => () => {
    setState( s => ({...s, buildingDetailsIndex: index}))
  }

  const onMouseLeaveLocation = index => () => {
    setState( s => ({...s, buildingDetailsIndex: null}))
  }

  const showName = () =>
    state.buildingDetailsIndex === null ? ''
            : `do ${data.buildings[state.buildingDetailsIndex].type === "Home"?
                    data.buildings[state.buildingDetailsIndex].name
                    : data.buildings[state.buildingDetailsIndex].type}`


  return(
    <React.Fragment>
      {state.scene === 'TIMER' &&
        <TimerAnounce seconds={data.seconds} onReady={() => setState(s => ({...s, scene: 'GAME', runTimer: true, takenRequests: [getRandomInt(0, data.requests.length)]}) )}/>
      }

      {(state.scene === 'GAME' || state.scene === 'TUTORIAL') &&
        <React.Fragment>
          {/* MAP */}
          <div style={{pointerEvents: (state.endGame? 'none': 'all'),
            position: 'absolute', width: '100%', top: '10%',  height: '65%',
            backgroundColor: '#aaaaff'}}>
            <div
              style={{
                backgroundImage: `url("${agendamento}")`,
                height: "100%",
                width: "100%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            >
              {data.buildings.map((location, index) => (
                <div
                  className="location"
                  key={location.id}
                  src={location.image}
                  alt={location.id}
                  style={{
                    width:"5%",
                    height: "15%",
                    backgroundColor: iconColors[location.type],
                    borderRadius: 100,
                    borderBottomLeftRadius: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    left: location.positionX,
                    top: location.positionY
                  }}
                  onClick={onMouseClickLocation(index)}
                  onMouseEnter={onMouseEnterLocation(index)}
                  onMouseLeave={onMouseLeaveLocation(index)}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    src={location.image}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>

          {/* BUILDING INFO */}
          <div style={{position: 'absolute',
            width: '70%', height: '15%', left: '15%',
            }}
          >
            <div style={{position: 'absolute', padding: '2% 2% 2% 15%',
              left: '7%', bottom: 0, width: '80%', height: '80%',
              backgroundColor: "#ff8888"}}
            >
              <div style={{backgroundColor: "#ff8888", width: '100%', height: '100%'}}>
                Informações {showName()}
              </div>
              {state.buildingDetailsIndex !== null &&
               data.buildings[state.buildingDetailsIndex].type === 'casa' &&
                <Button onClick={resolveRequest(state.buildingDetailsIndex)}>Escolher</Button>
              }
            </div>
            <img
              style={{position: 'absolute', height: '100%', backgroundColor: "#ff8888", borderRadius: "50%"}}
              onClick={() => setState((s) => ({ ...s, window: "SCHEDULE" }))}
              src={agendamento}
              alt=""
            />
          </div>

          {/* GAME INFO */}
          <div style={{position: 'absolute', left: '5%', bottom: 0, width: '90%', height: '25%', backgroundColor: '#d6e3f4',
            borderRadius: '3% / 20%', borderBottomLeftRadius: 0, borderBottomRightRadius: 0,}}>
            <div style={{position: 'absolute', width: '55%', backgroundColor: '#59316d', height: '40%', left: '12%', top: '40%',
            borderRadius: '3% / 20%', borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
              <Writer text={`Pedido ${state.takenRequests[0]}`}
                style={{width: '55%', height: '40%', fontSize: '3em'}}
              />
            </div>
            <img
              style={{position: 'absolute', bottom: 0, height: '150%'}}
              onClick={() => setState((s) => ({ ...s, window: "SCHEDULE" }))}
              src={charStub}
              alt=""
            />
            <TaggedIcon icon={agendamento} message={state.completed}
              style={{position: 'absolute', right: '6%', top: '35%',
                pointerEvents: 'none', height: '50%', width: '30%'
              }}
            />
            <Timer style={{position: 'absolute', fontSize: '8em', right: '2.5%', top: '45%'}}
              seconds={data.seconds}
              run={state.runTimer}
              onEnd={onTimerEnd}
              onStop={ seconds => { setState( s => ({...s, results: {...s.results, secondsLeft: seconds}}))}}
            />
          </div>

          {/* ENDGAME OVERLAY */}
          {state.endGame &&
            <FullscreenOverlay onClickClose={()=>{}}>
              <div style={{margin: '20% auto 0 auto', width: '20%'}}>
                {state.endRequests &&
                  <Button onClick={callEndGame}>
                    Você completou todos os pedidos!
                  </Button>
                }
                {state.timeUp &&
                  <Button onClick={callEndGame}>
                    Acabou o tempo!
                  </Button>
                }
              </div>
            </FullscreenOverlay>
          }


        </React.Fragment>
      }


      {state.scene === 'TUTORIAL' &&
        <React.Fragment>
          <TutorialBlob
            text={tutorialTexts[state.tutorialStep].text}
            translation={tutorialTexts[state.tutorialStep].translation}
            onContinue={() => setState(s =>
                ({...s, tutorialStep: s.tutorialStep + 1, scene: s.tutorialStep + 1 === tutorialTexts.length ? 'TIMER' : 'TUTORIAL' })
            )}
          />
          <Button onClick={ () => setState( s => ({...s, scene: 'TIMER'}) )}>
            Passar tutorial
          </Button>
        </React.Fragment>
      }
    </React.Fragment>
  )
}

export default Core;
