import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { apiActions } from '../../_actions'

import Init from '../Game2/components/Init'
import Result from '../Game2/components/Result'
import RoomSelect from '../Game2/components/RoomSelect'
import Sala from '../Game2/components/Sala'
import Character from '../Game2/components/Character'
import initialState from './initialState.js'
import stub from './stub.js'
import Phone from './components/Phone'
import Conversa from '../Game2/components/Conversa'

import './index.scss'
import FullscreenOverlay from '../Game2/components/FullscreenOverlay'

const Game1 = (props) => {
	const [state, setState] = React.useState(initialState);

	const { game_1_missionsActions, play_sessionsActions, player_actionsActions } = apiActions
	const id = props.match.params.id
	const dispatch = useDispatch()

	const loading = useSelector( state => state.game_1_missions.loading)
	let error = useSelector( state => state.game_1_missions.error)
	let mission = useSelector( state => state.game_1_missions.items.find(mission => mission.id === props.match.params.id))
	//const userId = useSelector( state => state.authentication.user.user.id )
	const currentPlaySession = useSelector( state => state.play_sessions ? state.play_sessions.items[0] : {} )

	//Track playerActions
	React.useEffect(() => {
		if(!state.tracking || !currentPlaySession)
			return

		const	getClickedObject = (e) => {
				dispatch(player_actionsActions.create({
					'play_session': currentPlaySession.id,
					data:
							{
								tag: e.target.nodeName,
								alt: e.target.alt,
								className: e.target.className,
								innerHTML: e.target.innerHTML.includes('<div') ? null : e.target.innerHTML, clickTime: new Date()
							}
				}))
			}
		document.addEventListener("mousedown", getClickedObject)

		setState( s => { return {...s, currentPlaySession, getClickedObject} })
		return () => {
			document.removeEventListener("mousedown", getClickedObject)
		}
	}, [dispatch, currentPlaySession, player_actionsActions, state.tracking])

	React.useEffect(() => {
		if(id && !mission)
			dispatch(game_1_missionsActions.getById(props.match.params.id))
		if(mission){
			let data = {}

			//distribute characters in locations
			if(state.locations.length === 0){
				// data.locations = [...mission.locations]
				data.locations = mission.locations.filter( (location) => {return location.characters}) // Só pq o backend está trazendo info errada
				let place = data.locations.length-1
				let characters = mission.characters.slice()
				while( characters.length > 0 ) {
					let randIdx = Math.floor(Math.random()*characters.length)
					data.locations[place=(place+1)%data.locations.length].characters.push( characters.splice(randIdx, 1)[0] )
				}
			}

			//list of all available jobs
			if(state.jobs.length === 0){
				data.jobs = mission.characters.reduce( (acc, character) => {
					if(!acc.includes(character.job))
						acc.push(character.job)
					return acc
				}, [])
			}

			//list of all available countries
			if(state.countries.length === 0){
				data.countries = mission.characters.reduce( (acc, character) => {
					if(!acc.includes(character.country))
						acc.push(character.country)
					return acc
				}, [])
			}

			//resume characters as contacts
			if(state.contactsTemplate.length === 0){
				//create full contact template
				data.contactsTemplate = mission.characters.reduce( (acc, character) => {
					acc.push({id: character.id, name: character.name, country: character.country, job: character.job,
						//looks for mission configuration
						showJob: character.game_1_mission_characters.length > 0 &&
										 character.game_1_mission_characters.find(config => config.game_1_mission === mission.id).showJob,
						showCountry: character.game_1_mission_characters.length > 0 &&
												 character.game_1_mission_characters.find(config => config.game_1_mission === mission.id).showCountry})
					return acc
				}, [])

				//create contact state shown to/ manipulated by to player
				data.contactsAtSession = data.contactsTemplate.map( contact => {
					return {...contact,
						job: contact.showJob? contact.job : '',
						country: contact.showCountry? contact.showCountry : ''
					}
				})
			}
			if(Object.keys(data).length > 0)
				setState(state => { return {...state, ...data}})
		}
	}, [dispatch, id, mission, game_1_missionsActions, props.match.params.id, state.locations.length, state.contactsTemplate.length, state.countries.length, state.jobs.length])

	if(error){
		error = null
		mission = stub
	}

	const onStartGame = (e) => {
		if(state.tracking){
			dispatch(play_sessionsActions.create({
				//usersPergame_1_missionsUser: userId,
				//mission: mission.id
			}))
		}
		setState({...state, scene: 'ROOM'})
	}

	const setCurrentChar = (character) => () => {
		setState({...state, currentChar: character,
			answers: character.answers
			.filter( answer => mission.questions.find(question => question.id ===  answer.question.id))})
	}

	const afterWriter = () => {}

	const onMenuButtonClick = (answer) => () => {
		//
		//	Aplicar lógica adicional de click nos botões do menu
		//
		setState({...state,
			dialogHistory:
			[...state.dialogHistory,
				answer.question.question,
				answer.answer
			]
		})
	}

	const modifyContact = (contact) => {
		let index = state.contactsAtSession.indexOf(state.contactsAtSession.find( c => c.id === contact.id))
		console.log('changing:', contact)
		setState({...state,
			contactsAtSession: [
				...state.contactsAtSession.slice(0, index), contact, ...state.contactsAtSession.slice(index + 1)
			]
		})
	}

	const closeDialog = () => {
		setState({...state, currentChar: null})
	}

	return (
		<div id="game1-wrapper">
			{loading ? <div>Loading...</div> : error ? <div>{error}</div> : mission &&
				<div id="game1-content">
					<div id="input-tracker">TrackInput: <input type="checkbox" onChange={(e)=>{ setState({...state, tracking: e.target.checked}) }} /></div>
					{(function renderScene(){
						switch(state.scene){
							case "INIT":
								return <Init
											name={mission.name} description={mission.description}
											onStart={ onStartGame }
											onBack={ ()=> setState({...state, back: true}) }
										/>
							case "ROOM":
								return (
									<div id="room-itself">
										<RoomSelect
											value={state.currentLocationIndex}
											buttonList={state.locations.map( location => location.name)}
										/>
										<Sala roomData={state.locations[state.currentLocationIndex]}>
											{state.locations[state.currentLocationIndex].characters.map((character, index) =>
												<Character key={index}
												character={character}
												onClick={setCurrentChar(character)}
												/>
											)}
										</Sala>
										{state.currentChar &&
										<Conversa
											shouldExit={state.shouldCloseConvo}
											prevDialogHistory={[]}
											onClearDialogHistory={state.refreshDialog}
											charPreSpeech={state.preSpeech}
											convOptions={state.convOptions.reduce((acc, convOption) => {
												let option = {...convOption, ...convOption.question, answers: convOption.answer}
												delete option.answer
												return [...acc, option ]
											}, [])}
											currentChar={state.currentChar}
											charFeeling={state.characterFeeling}
											afterWriter={afterWriter}
											onExited={closeDialog}
											onConvoChoiceMade={onMenuButtonClick}
										>
											{/* Coisinha no canto superior esquerdo vai aqui */}
										</Conversa>
										}
										<Phone
											contacts={
												state.contactsAtSession.filter(contact => state.locations[state.currentLocationIndex].characters.find( character => character.id === contact.id))
											}
											modifyContact={modifyContact}
											contactsTemplate={state.contactsTemplate}
											jobs={state.jobs}
											countries={state.countries}
											onFinish={() => setState({...state, changeRoomPopUp: true})}
											shouldMinimize={state.shouldMinimize}
											onMinimize={() => setState({...state, shouldMinimize: false})}
										/>
										{ state.changeRoomPopUp &&
										<FullscreenOverlay
											showCloseBtn={false}
										>
											<div className="popup-wrapper">
												{true ?
												<div className="popup-content">
													<span>Are you sure?</span>
													<p>
														[X] people have the wrong data. Are you sure you want to continue? You may not be able to overcome this midlife crisis!
													</p>
													<div id="popup-btns">
														<button id="no-go">Keep trying</button>
														<button id="go">Continue anyway</button>
													</div>
												</div>
												:
												<div className="popup-content">
													<span>Are you sure?</span>
													<p>
														Everything seems ok around here. Do you want to continue?
													</p>
													<div id="popup-btns">
														<button id="no-go">Not yet</button>
														<button id="go">Let's go</button>
													</div>
												</div>
												}
											</div>
										</FullscreenOverlay>
										}
										{/* { state.changeRoomPopUp &&
											<div style={{position: 'absolute', zIndex: 1000, top:0, right:0, bottom:0, left:0}}>
												<p>Texto Are you sure?</p>
												<button onClick={() => setState({...state, changeRoomPopUp: false})}>
													Voltar
												</button>
												<button onClick={() => {
														if(state.currentLocationIndex + 1 < state.locations.length)
															setState({...state, changeRoomPopUp: false, currentLocationIndex: state.currentLocationIndex + 1, showContacts: false, shouldMinimize: true })
														else {
															setState({...state, scene: 'ENDGAME'})
														}
												}}>
													Avançar
												</button>
											</div>
										} */}
									</div>)
								case 'ENDGAME':
									return(
										<div>
											Fim de jogo! tela de feedback
										</div>
									)
								default:
									return(<div>Error</div>)
						}
					}())}
					{ !state.gameEndState && // Não dá para ser !endGame pq ele vira true na hora que aparece para o jogador se apresentar
						<div></div>
					}
					{	state.endGame ? <Result gameEndState={state.gameEndState}/> : null }
					{ state.tries > 0 ? <div>{state.tries} tentativa{state.tries > 1? 's' : ''}!</div> : null}
					{ state.back && <Redirect to='/userspace' />}
				</div>
			}
		</div>
  )
}

export default Game1
