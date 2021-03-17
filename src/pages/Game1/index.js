import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { apiActions, headerActions } from '../../_actions'

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

const Game1 = (props) => {
	const [state, setState] = React.useState(initialState);

	const { missionsActions, play_sessionsActions, player_actionsActions } = apiActions
	const id = props.match.params.id
	const dispatch = useDispatch()

	const loading = useSelector( state => state.missions.loading)
	let error = useSelector( state => state.missions.error)
	let mission = useSelector( state => state.missions.items.find(mission => mission.id === props.match.params.id))
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
		if(id && !mission) dispatch(missionsActions.getById(props.match.params.id))
	}, [dispatch, id, mission, missionsActions, props.match.params.id])

	//React.useEffect(()=>{
	//	dispatch(headerTitleActions.showHeader(false))
	//}, [dispatch, headerTitleActions])

	if(error){
		error = null
		mission = stub
	}

	//aplicar lógica de espalhamento de personagens
	if(mission && state.locations.length === 0){
		let locations = mission.locations.map( location => { return {location: location, characters: [...mission.characters]} })
		setState({...state, locations: locations})
	}

	const onStartGame = (e) => {
		if(state.tracking){
			dispatch(play_sessionsActions.create({
				usersPermissionsUser: userId,
				mission: mission.id
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

	const addContact = () => {
		// TODO
		// Pegar nome, profissão e nacionalidade do form,
		// colocar em state.contactList e limpar o form
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
											buttonList={mission.locations.map((location) => location.name)}
											onChange={(buttonIndex) => {
												setState({...state, currentLocationIndex: buttonIndex})
												dispatch(headerActions.changeTitle(state.locations[buttonIndex].name))
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
												<div id="fullPhone">
													<p>Lista de contatos</p>
													<div id="lista-contatos">
														{// TODO
														// Assim que contactList estiver implementado, isso aqui deve funcionar
														/* { state.contactList.map((contact, index)=>
															<div className="contato" key={index}>
																<div className="contact-profile-pic">
																	<img>{contact.pic}</img> // Provavelmente vai ser a mesma para todos, então de onde puxar?
																	<span>{index}</span>
																</div>
																<div className="contact-info">
																	<div className="name">
																		<p>Nome</p>
																		<p>{contact.name}</p>
																	</div>
																	<div className="profession">
																		<p>Profissão</p>
																		<p>{contact.profession}</p>
																	</div>
																	<div className="nationality">
																		<p>Nacionalidade</p>
																		<p>{contact.nationality}</p>
																	</div>
																</div>
															</div>
														) } */}
														<div id="add-contato" className="contato">
															<div className="contact-profile-pic">
																{/* <img></img> Se for para usar a mesma imagem que seria usada lá em cima, tira o div e usa isso */}
																<div></div>
																<span>+</span>
															</div>
															<div className="contact-info">
																<div className="name">
																	<p>Nome</p>
																	<input type="text" name="nome" placeholder="Nome do contato"></input>
																</div>
																<div className="profession">
																	<p>Profissão</p>
																	<select name="profissao">
																		{ /* Melhor ainda se tiver ccomo trazer as opções automaticamente, mesmo que não seja do backend*/ }
																		<option value="">-- Profissão --</option>
																		<option value="Cebelereiro">Cabelereiro</option>
																		<option value="Pintor">Pintor</option>
																		<option value="Professor">Professor</option>
																	</select>
																</div>
																<div className="nationality">
																	<p>Nacionalidade</p>
																	<select name="Nacionalidade">
																		{ /* Melhor ainda se tiver ccomo trazer as opções automaticamente, mesmo que não seja do backend*/ }
																		<option value="">-- Nacionalidade --</option>
																		<option value="Brasileira">Brasileira</option>
																		<option value="Americana">Americana</option>
																		<option value="Japonesa">Japonesa</option>
																		<option value="Finlandesa">Finlandesa</option>
																	</select>
																</div>
															</div>
															<div id="btn-add-contato" onClick={addContact}>Adicionar contato</div>
														</div>
													</div>
												</div>
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
