import React from 'react'
import Button from '@material-ui/core/Button'
import { Iniciar } from '../../_components/Button'
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
import Blob, { BlobBg } from '../../_components/Blob'
import { hourglassFull } from '../../img'
import './character.scss'



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

    let request = state.takenRequests[0]
    console.log('request:', request)
    //evaluate request
    let roomEvaluation = !request.rooms || request.rooms === state.selectedHome.rooms
    let bathsEvaluation = !request.baths || request.baths === state.selectedHome.baths
    let closeToEvaluation = !request.closeTo || (!request.closeTo.includes(';') ? state.selectedHome.closeTo.includes(request.closeTo) : request.closeTo.split(';').every( value => value === '' || state.selectedHome.closeTo.includes(value)))
    let farFromEvaluation = !request.farFrom || (!request.farFrom.includes(';') ? !state.selectedHome.closeTo.includes(request.farFrom) : request.farFrom.split(';').every( value => value === '' || !state.selectedHome.closeTo.includes(value)))

    if( roomEvaluation && bathsEvaluation &&
        closeToEvaluation && farFromEvaluation)
    {
      updateState.completed = state.completed + 1
      updateState.writerText = 'Yay! Obrigado!'
    }
    else
    {
      updateState.completed = state.wrong + 1
      if(!roomEvaluation)
        updateState.writerText = request.errorDialog.find( e => e.type === 'rooms').dialog
      else if(!bathsEvaluation)
        updateState.writerText = request.errorDialog.find( e => e.type === 'baths').dialog
      else if(!closeToEvaluation)
        updateState.writerText = request.errorDialog.find( e => e.type === 'closeTo').dialog
      else if(!farFromEvaluation)
        updateState.writerText = request.errorDialog.find( e => e.type === 'farFrom').dialog
    }
    if(state.takenRequests.length < data.requests.length)
      updateState.showNextClientButton = true

    updateState.selectedHome = null

    setState( s => ({...s, ...updateState }))
  }

  const nextClient = () => {
    let updateState = {}
    let availableIndexes = numberList(data.requests.length).map(v => v - 1).filter( v => !state.takenRequests.includes(data.requests[v]))
    console.log('availableIndexes:', availableIndexes)
    //set next request
    if(availableIndexes.length > 0){
      updateState.character = data.characters[getRandomInt(0, data.characters.length)]
      updateState.animateCharacter = true
      updateState.takenRequests = [data.requests[availableIndexes[getRandomInt(0, availableIndexes.length)]], ...state.takenRequests]
      updateState.writerText = updateState.takenRequests[0].dialog
    }
    else{
      updateState.endGame = true
      updateState.endRequests = true
      updateState.runTimer = false
    }
    updateState.showNextClientButton = false

    setState( s => ({...s, ...updateState}))
  }

  const onTimerEnd = () => {
    console.log('Timer end')
    setState(s => ({...s, endGame: true, timeUp: true, runTimer: false}))
  }

  const callEndGame = () => {
    if(onEndGame) onEndGame({...data, results: {...state.results, completed: state.completed}})
  }

  const onMouseClickLocation = index => () => {
    if(data.buildings[index].type === "Home")
      setState(s => ({...s, selectedHome: data.buildings[index]}))
  }

  const onMouseEnterLocation = index => () => {
    setState( s => ({...s, buildingDetails: data.buildings[index]}))
  }

  const onMouseLeaveLocation = index => () => {
    setState( s => ({...s, buildingDetails: s.selectedHome}))
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
    let requestIndex = getRandomInt(0, data.requests.length)
    setState(s => ({...s,
      scene: 'GAME', runTimer: true,
      takenRequests: [data.requests[requestIndex]],
      character: data.characters[getRandomInt(0, data.characters.length)],
      characterKey: s.characterKey + 1,
      writerText: data.requests[requestIndex].dialog
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
            {state.selectedHome && (!state.buildingDetails || state.buildingDetails === state.selectedHome) &&
              <Iniciar label={'Escolher'} showArrow={false} onClick={resolveRequest}
                style={{position: 'absolute', fontSize:'2em', right: '8%', top: '35%'}}
              />
            }
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
                <Writer text={state.takenRequests.length > 0 ? state.writerText : ""}
                  style={{height: '40%', fontSize: '3em'}}
                />
              {state.showNextClientButton &&
                  <Iniciar label={'Próximo'} onClick={nextClient}
                    style={{position: 'absolute', fontSize: '2em', right: '5%', bottom: '-30%'}}
                  />
                }
              </div>
              {state.character &&
                <img
                  className={state.animateCharacter ? 'character' : ''}
                  onAnimationEnd={() => setState(s => ({...s, animateCharacter: false})) }
                  key={state.characterKey}
                  style={{position: 'absolute', left: '5%', bottom: 0, height: '150%'}}
                  onClick={() => setState((s) => ({ ...s, window: "SCHEDULE" }))}
                  src={state.character.characterAssets[0].image.url}
                  alt=""
                />
              }
            </div>
            <TaggedIcon icon={agendamento} message={state.completed}
              style={{position: 'absolute', right: '8%', top: '27.5%',
                pointerEvents: 'none', height: '50%', width: '10%',
                zIndex: state.tutorialStep === 2? 110 : null
              }}
            />
          </div>

          {/*HOME CONFIRMATION*/}
          {state.showConfirmation &&
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
            <FullscreenOverlay showCloseBtn={false} onClickClose={()=>{}}>
              <BlobBg style={{position: 'absolute', width: '80%', height: '80%', top: '10%', left: '10%'}}>
                <img src={hourglassFull} style={{position: 'relative', top:'15%', left:'45%', transform:'rotate(15deg)'}}/>
                <div style={{position: 'relative', top:'20%', left:'41%'}}>
                  {state.endRequests &&
                    <Button onClick={callEndGame}>
                      Você completou todos os pedidos!
                    </Button>
                  }
                  {state.timeUp &&
                    <Iniciar label={'Acabou o tempo!'} onClick={callEndGame} showArrow={false}
                      style={{fontSize: '3em'}}/>
                  }
                </div>
              </BlobBg>
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
