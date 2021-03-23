import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { apiActions } from '../../_actions'

import Init from '../Game2/components/Init'
import Result from '../Game2/components/Result'
import RoomSelect from '../Game2/components/RoomSelect'
import Sala from '../Game2/components/Sala'
import Character from '../Game2/components/Character'
import Button from '@material-ui/core/Button'
import '../Game2/index.scss'
import initialState from './initialState.js'
import stub from './stub.js'
import './index.scss'
import Phone from './components/Phone'

const Game1 = (props) => {
	const [state, setState] = React.useState(initialState);

	const { game_1_missionsActions, play_sessionsActions, player_actionsActions } = apiActions
	const id = props.match.params.id
	const dispatch = useDispatch()

	const loading = useSelector( state => state.game_1_missions.loading)
	let error = useSelector( state => state.game_1_missions.error)
	let mission = useSelector( state => state.game_1_missions.items.find(mission => mission.id === props.match.params.id))
	const userId = useSelector( state => state.authentication.user.user.id )
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
		if(id && !mission) dispatch(game_1_missionsActions.getById(props.match.params.id))
		if(mission){
			let data = {}
			if(state.locations.length === 0){
				let perRoom = mission.characters.length
				data.locations = mission.locations.map((location, index) => {
					return {
						...location,
						characters: mission.characters.slice(perRoom * index, perRoom*index + perRoom),
					}
				})
			}
			if(state.jobs.length === 0){
				data.jobs = mission.characters.reduce( (acc, character) => {
					if(!acc.includes(character.job))
						acc.push(character.job)
					return acc
				}, [])
			}
			if(state.countries.length === 0){
				data.countries = mission.characters.reduce( (acc, character) => {
					if(!acc.includes(character.country))
						acc.push(character.country)
					return acc
				}, [])
			}
			if(state.contactsTemplate.length === 0){
				data.contactsTemplate = mission.characters.reduce( (acc, character) => {
					acc.push({id: character.id, name: character.name, country: character.country, job: character.job})
					return acc
				}, [])
				data.contactsAtSession = data.contactsTemplate.map( contact => { return {...contact, job: '', country: ''} })
			}
			if(Object.keys(data).length > 0)
				setState(state => { return {...state, ...data}})
		}
	}, [dispatch, id, mission, game_1_missionsActions, props.match.params.id])

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

	const onMenuButtonClick = (answer) => () =>{
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

	const onPhoneEnterClick = () => {
		setState({...state, showContacts: true})
	}

	const onPhoneExitClick = () => {
		setState({...state, showContacts: false})
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

	return (
		<div>
			{loading ? <div>Loading...</div> : error ? <div>{error}</div> : mission &&
			<div>
				<div style={{width: '100%', height: '100%'}}>
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
									<div>
										<RoomSelect
											buttonList={mission.locations.map( location => location.name)}
											onChange={(buttonIndex) => {
												setState({...state, currentLocationIndex: buttonIndex})
											}}
										/>

									<Sala roomData={state.locations[state.currentLocationIndex]}>
											{state.locations[state.currentLocationIndex].characters.map((character, index) =>
						            <Character key={index}
						              character={character}
						              setCurrentChar={(charData) => () => setState({...state, currentChar: charData})}
						            />
											)}
										</Sala>

										{ state.currentChar &&
											<div id="conversa" className='DialogPopUp'>

												<Button onClick={() => setState({...state, currentChar: null, dialogHistory: []})}>X</Button>

												<div className='CharacterPortrait' style={{width: 100}}>
									        {<img src={state.currentChar.characterAssets.length > 0 ? state.currentChar.characterAssets[1].image[0].url: ""} alt="portrait" />}
									        {<img src={state.currentChar.characterAssets.length > 0 ? state.currentChar.characterAssets[2].image[0].url : ""} alt="portrait" />}
									      </div>

												<div className='DialogHistory'>
													{state.dialogHistory.map((dialog, index)=>
														<div key={index}>{dialog}</div>
													)}
												</div>

												<div className='Menu'>
													{state.currentChar.answers.map( (answer,index) =>
														<Button key={index} onClick={onMenuButtonClick(answer)}>{answer.question.question}</Button>
													)}
												</div>
											</div>
										}
										{ state.showContacts &&
											<div id="contacts">
												<div id="btn-fechar" onClick={onPhoneExitClick}><span>×</span></div>

												<Phone
													modifyContact={modifyContact}
													contacts={state.contactsAtSession}
													jobs={["-- Profissão --", ...state.jobs]}
													countries={["-- País --", ...state.countries]}
												/>

											<div id="btn-terminei">Terminei!</div>
											</div>
										}
										{ !state.showContacts && <div id="phone" onClick={onPhoneEnterClick}><p>Agenda de contatos</p></div> }
									</div>)
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
			</div>
			}
		</div>
  )
}

export default Game1
