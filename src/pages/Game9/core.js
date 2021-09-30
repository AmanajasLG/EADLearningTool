import React from 'react'
import Button from '@material-ui/core/Button'
import Timer from '../../_components/Timer'
import TimerAnounce from '../../_components/TimerAnounce'
import Writer from '../../_components/Writer'
import initialState from './initialState'
import { agendamento } from '../../img'
import { getRandomInt, numberList } from '../../_helpers'
import tutorialTexts from './tutorialTexts'
import TutorialBlob from '../../_components/TutorialBlob'
import TaggedIcon from '../../_components/TaggedIcon'
import charStub from './chef_animada.svg'
import FullscreenOverlay from '../../_components/FullscreenOverlay'
import MapBuildingDetails from '../../_components/MapBuildingDetails'


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
  const [state, setState] = React.useState(initialState(data.requests))
  const resolveRequest = () => {
    let updateState = {}
    let availableIndexes = numberList(data.requests.length).map(v => v - 1).filter( v => !state.takenRequests.includes(v))
    console.log('availableIndexes:', availableIndexes)

    //evaluate request
    //if(buildingIndex == ok)
    updateState.completed = state.completed + 1
    //set next request
    if(availableIndexes.length > 0)
      updateState.takenRequests =  [availableIndexes[getRandomInt(0, availableIndexes.length)], ...state.takenRequests]
    else {
      updateState.endGame = true
      updateState.endRequests = true
      updateState.runTimer = false
    }
    updateState.selectedHome = null
    updateState.character = data.characters[getRandomInt(0, data.characters.length)]

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
      setState(s => ({...s, selectedHome: data.buildings[index]}))
  }

  const onMouseEnterLocation = index => () => {
    setState( s => ({...s, buildingDetails: data.buildings[index]}))
  }

  const onMouseLeaveLocation = index => () => {
    setState( s => ({...s, buildingDetails: null}))
  }

  const chooseSelectedHome = () => {
    setState(s => ({...s,
      takenRequests: [getRandomInt(0, data.requests.length), ...state.takenRequests]})
    )
  }

  const cancelSelectedHome = () => {
    setState(s => ({...s, locationConfirmationWindow: false, selectedHome: null}))
  }

  const showName = () =>
    !state.buildingDetails ? ''
            : state.buildingDetails.type === "Home"?
                state.buildingDetails.name
                : state.buildingDetails.type

  const gameStart = () => {
    setState(s => ({...s,
      scene: 'GAME', runTimer: true,
      takenRequests: [getRandomInt(0, data.requests.length)],
      character: data.characters[getRandomInt(0, data.characters.length)]
    })
    )
  }


  return(
    <React.Fragment>
      {state.scene === 'TIMER' &&
        <TimerAnounce seconds={data.seconds} onReady={gameStart}/>
      }

      {(state.scene === 'GAME' || state.scene === 'TUTORIAL') &&
        <React.Fragment>
          {/* BUILDING INFO */}
          <div style={{position: 'absolute', backgroundColor: '#d6e3f4', width: '100%', height: '20%', zIndex: state.tutorialState === 4? 110 : null}}>
            <div style={{position: 'absolute', padding: '0.8% 2% 0.5% 5%',
              right: '7%', top: '20%', width: '70%', height: '60%',
              backgroundColor: "#59316d", borderRadius: '2% / 20%',
              zIndex: state.tutorialStep === 4? 110 : null
            }}
            >
              <div style={{display: 'flex', flexDirection: 'horizontal', justifyContent: 'flex-start',
                width: '100%', height: '100%', color: 'white', fontSize: '3em'}}>
                <div style={{margin: '0 1%', width: '20%'}}>
                  <strong>{showName()}</strong>
                </div>
                {state.buildingDetails && state.buildingDetails.type === "Home" &&
                  <React.Fragment>
                    <div style={{width: '0.2%', margin: '0 2%', height: '100%', backgroundColor: '#FFFFFF'}}></div>
                    <div style={{margin: '0 2%'}}>
                      <div>{state.buildingDetails.rooms} quartos</div>
                      <div>{state.buildingDetails.baths} banheiros</div>
                    </div>
                  </React.Fragment>
                }
              </div>
              <div style={{position: 'absolute', top: '-15%', left: '-5%', height: '130%', width: '13%', backgroundColor: "#59316d", borderRadius: "50%"}}>
                <img style={{height: '100%'}}
                  onClick={() => setState((s) => ({ ...s, window: "SCHEDULE" }))}
                  src={ state.buildingDetails ? state.buildingDetails.image : null}
                  alt=""
                  />
              </div>
            </div>
            <Timer style={{position: 'absolute', fontSize: '8em', left: '5%', top: '35%', zIndex: state.tutorialStep === 3? 110 : null}}
              seconds={data.seconds}
              run={state.runTimer}
              onEnd={onTimerEnd}
              onStop={ seconds => { setState( s => ({...s, results: {...s.results, secondsLeft: seconds}}))}}
            />
          </div>

          {/* MAP */}
          <div style={{pointerEvents: (state.endGame? 'none': 'all'),
            position: 'absolute', width: '100%', top: '20%',  height: '60%',
            backgroundColor: '#aaaaff'}}>
            <div
              style={{
                backgroundImage: `url("${data.map? data.map.url : agendamento}")`,
                height: "100%",
                width: "100%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            >
              {data.buildings
                .filter( (building, index) => state.scene !== 'TUTORIAL' || (state.scene === 'TUTORIAL' && state.tutorialStep === 4 && index === data.buildings.length - 1))
                .map((location, index) => (
                <div
                  className="location"
                  key={location.id}
                  src={location.image}
                  alt={location.id}
                  style={{
                    zIndex: state.tutorialStep === 4? 110 : null,
                    width:"5%",
                    height: "15%",
                    backgroundColor: iconColors[location.type],
                    borderRadius: 100,
                    borderBottomLeftRadius: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    left: `${location.positionX}%`,
                    top: `${location.positionY}%`
                  }}
                  onClick={state.scene === 'TUTORIAL'? null : onMouseClickLocation(index)}
                  onMouseEnter={onMouseEnterLocation(index)}
                  onMouseLeave={onMouseLeaveLocation(index)}
                >
                  <img
                    src={location.image}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>


          {/* GAME INFO */}
          <div style={{position: 'absolute', bottom: 0, width: '100%', height: '20%', backgroundColor: '#d6e3f4',
            borderBottomLeftRadius: 0, borderBottomRightRadius: 0,}}>
            <div style={ state.tutorialStep === 1? {position: 'absolute', zIndex: 110, width: '100%', height: '100%'} : {}}>
              <div style={{position: 'absolute', width: '65%', backgroundColor: '#59316d', height: '50%', left: '12%', top: '30%',
              borderRadius: '2% / 20%', borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
                <Writer text={state.takenRequests.length > 0 ? data.requests[state.takenRequests[0]].dialog : ""}
                  style={{height: '40%', fontSize: '3em'}}
                />
              </div>
              <img
                style={{position: 'absolute', left: '5%', bottom: 0, height: '150%'}}
                onClick={() => setState((s) => ({ ...s, window: "SCHEDULE" }))}
                src={state.character? state.character.characterAssets[0].image.url : charStub}
                alt=""
              />
            </div>
            <TaggedIcon icon={agendamento} message={state.completed}
              style={{position: 'absolute', right: '8%', top: '27.5%',
                pointerEvents: 'none', height: '50%', width: '10%',
                zIndex: state.tutorialStep === 2? 110 : null
              }}
            />
          </div>

          {state.selectedHome &&
            <FullscreenOverlay showCloseBtn={false}>
              <div>
                <div>
                  <span>{state.selectedHome.rooms} quartos</span>
                  <span>{state.selectedHome.baths} banheiros</span>
                </div>
                <div>
                  <Button onClick={resolveRequest}>Escolher</Button>
                  <Button onClick={cancelSelectedHome}>Cancelar</Button>
                </div>
              </div>
            </FullscreenOverlay>
          }
          {/* ENDGAME OVERLAY */}
          {state.endGame &&
            <FullscreenOverlay onClickClose={()=>{}}>
              <MapBuildingDetails >
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
              </MapBuildingDetails>
            </FullscreenOverlay>
          }
        </React.Fragment>
      }


      {state.scene === 'TUTORIAL' &&
        <React.Fragment>
          <FullscreenOverlay showCloseBtn={false} />
          <TutorialBlob
            style={{position: 'relative', zIndex: 120}}
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
