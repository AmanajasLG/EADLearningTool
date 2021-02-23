import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { apiActions , headerTitleActions } from '../../_actions'

import Init from './components/Init'
import Result from './components/Result'
import RoomSelect from './components/RoomSelect'
import Sala from './components/Sala'
import Character from './components/Character'
import Button from '@material-ui/core/Button'
import AppHeader from '../../_components/AppHeader'
import './index.scss'
import initialState from './initialState'
import stub from './stub'


const Game2 = (props) => {
	const [state, setState] = React.useState(initialState);

	const id = props.match.params.id
	const dispatch = useDispatch()
	let error = useSelector( state => state.missions.error)
	let mission = useSelector( state => state.missions.items.find(mission => mission.id === props.match.params.id))
	const loading = useSelector( state => state.missions.loading)
	const userId = useSelector( state => state.authentication.user.user.id )
	const currentPlaySession = useSelector( state => state.play_sessions ? state.play_sessions.items[0] : {} )
	const { missionsActions, play_sessionsActions, player_actionsActions } = apiActions

	//fetch mission if doesn't already have
	React.useEffect(() => {
		if(id && !mission) dispatch(missionsActions.getById(props.match.params.id))
	}, [])

	//track player actions
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

		setState({...state, currentPlaySession, getClickedObject})
		return () => {
			document.removeEventListener("mousedown", getClickedObject)
		}
	}, [currentPlaySession])
	/*//Testing tool
	if(error){
		error = null
		mission = stub
	}
	*/
	//Randomizar personagens para aparecer nas salas
	//	Enquanto houver personagens na lista de personagens disponíveis
	//		Escolhe um local ao acaso
	//		Escolhe um personagem dentre a lista de personagens disponíveis ao acaso
	//		Adiciona personagem ao local
	//		Retira personagem da lista de personagens disponíveis

	if(mission && state.locations.length === 0){
		// safe copies
		let availableCharacters = mission.characters.slice(0)
		let locations = mission.locations.map( location => { return {location: location, characters: []} })

		//distribute on locations
		while(availableCharacters.length > 0){
			const locationIndex = Math.floor(Math.random(0, locations.length))
			const characterIndex = Math.floor(Math.random(0, availableCharacters.length))

			//each character has some good and bad questions that can be asked
			let availableAnswers = availableCharacters[characterIndex].answers.slice(0)
		  let correct = availableAnswers.filter(answer => answer.question.correct)
		  let ncorrect = availableAnswers.filter(answer => !answer.question.correct)
		  let selectedQuestions = []
		  while(selectedQuestions.length < 4){
		    let source = selectedQuestions.length % 2 === 0? correct : ncorrect
		    let index = Math.floor(Math.random(0, source.length))
		    selectedQuestions.push( source[index] )
		    source.splice(index, 1)
		  }

		  if(Math.floor(Math.random(0,1) < .5)){
		    let temp = selectedQuestions[0]
		    selectedQuestions[0] = selectedQuestions[1]
		    selectedQuestions[1] = temp
		  }
		  if(Math.floor(Math.random(0, 1) > .5)){
		    let temp = selectedQuestions[2]
		    selectedQuestions[2] = selectedQuestions[3]
		    selectedQuestions[3] = temp
		  }

			locations[locationIndex].characters = [...locations[locationIndex].characters,
				{...availableCharacters[characterIndex],
					selectedQuestions
				}
			]
			availableCharacters.splice(characterIndex, 1)
		}
		setState({...state, locations})
	}

	const setCurrentChar = (charData) => () =>
		setState({...state, currentChar: charData})

	const clearCurrentChar = () =>
		setState({...state, currentChar: null})

	const onStartGame = (e) => {
		if(state.tracking){
			dispatch(play_sessionsActions.create({
				usersPermissionsUser: userId,
				mission: mission.id
			}))
		}
		setState({...state, tutorialStep: state.tutorialStep + 1, scene: "ROOM"})
	}

	//shows only selected questions
	const menuQuestionsFiltering = (answer, index) =>
		(state.dialogStep) * state.questionsByStep <= index &&
		index < (state.dialogStep + 1) * state.questionsByStep

	const setCurrentCharacter = (character) => {
		return () => setState({...state, currentChar: character, answers: character.answers.filter(menuQuestionsFiltering)})
	}

	const dialogInitialState = { dialogHistory: [], dialogStep: 0, correct: 0 }
	const closeDialog = () =>
		setState({...state, currentChar: null, ...dialogInitialState, })
	const refreshDialog = () =>
		setState({...state, ...dialogInitialState, answers: state.currentChar.answers.slice(0, state.questionsByStep)})

	const onMenuButtonClick = (answer) => () =>{
		//
		//	Aplicar lógica adicional de click nos botões do menu
		//

		if(answer.refresh)
			refreshDialog()
		else if(answer.close)
			closeDialog()
		else{

			let updateState = {
				dialogHistory: [...state.dialogHistory,
					answer.question.question,
					answer.answer
				],
				dialogStep: state.dialogStep + 1,
				correct: state.correct + (answer.question.correct? 1 : 0)
			}

			if(updateState.dialogStep !== state.totalDialogSteps){
				updateState.answers = state.currentChar.answers.filter((answer, index) => (state.dialogStep + 1) * state.questionsByStep <= index && index < (state.dialogStep + 2) * state.questionsByStep )
			}else{
				if(updateState.correct < state.correctMinimum){
					updateState.dialogHistory.push('Não estou entendendo. Quer começar de novo?')
					updateState.answers = [{refresh: true, question:{question: 'Sim'}}, {close: true, question:{question: 'Não'}}]
				}
				else{
					updateState.answers = [{answer: state.currentChar.tip, question:{question: 'Estou procurando alguém. Você pode me ajudar?'}}]
				}
			}
			// e então atualiza
			setState({...state, ...updateState})
		}
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
											onChange={(num) => {
												setState({...state, currentRoom: num})
												dispatch(headerTitleActions.changeTitle(state.locations[num]))
											}}
										/>

										<Sala roomData={state.locations[state.currentRoom]} setCurrentChar={setCurrentChar}>
											{state.locations[state.currentRoom].characters.map((character, index) =>
						            <Character key={index}
						              character={character}
						              onClick={setCurrentCharacter(character)}
						            />
											)}
										</Sala>

										{ state.currentChar &&
											<div id="conversa" className='DialogPopUp'>

												<Button onClick={closeDialog}>X</Button>
									      <Button onClick={() => setState({...state, acusation: true})}>É você!</Button>

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
													{state.answers.map( (answer,index) =>
														<Button key={index} onClick={onMenuButtonClick(answer)}>{answer.question.question}</Button>
													)}
												</div>
											</div>
										}
									</div>)
						}
					}())}
					{ state.back && <Redirect to='/userspace' />}
				</div>
			</div>
			}
		</div>
  )
}

export default Game2

/*

	const [missionOpen, setMissionOpen] = React.useState(true)
	const _minTimeBonus = 2*60*1000; // Se terminar antes desse tempo (em ms), ganha o bônus máximo
	const _maxTimeBonus = 5*60*1000; // Se terminar em até esse tempo (em ms), ganha um bônus no score proporcional. Terminar depois garante 0 de bônus
	const _maxBonusPts = 100; // Máximo de 100 pontos se terminar antes do mínimo

	const handleSubmit = (value) => () => {
		// Computa bônus por tempo
		let diff = Date.now() - state.startedTimestamp;
		// Faz o bônus ser decrescente com o passar do tempo, escalados para que bonusAmnt
		// seja 1 em t = _minTimeBonus e 0 em t = _maxTimeBonus
		let bonusAmnt = (_maxTimeBonus - diff)/(_maxTimeBonus - _minTimeBonus);
		bonusAmnt = Math.max(Math.min(bonusAmnt, 1.0), 0.0); // Clampa para que bonusAmnt = [0,1]

		// Sim, eu sei. Essa linha está 3x maior que o ideal por culpa da string. Mas ela é para ser temporária.
		// Se estivermos em produção e essa linha ainda estiver existente, algo deu muito errado.
		let msgFinal = `Você encontrou ${state.targetName}!\nVocê levou ${Math.trunc(diff / 60000)}:` + `${Math.trunc(diff/1000)%60}`.padStart(2, '0') + ` para encontrar. Isso te garante ${Math.round(_maxBonusPts*bonusAmnt)} pontos de bonus.`
		if( value == state.quizAnswer ) {
			let newScore = state.score + Math.round(_maxBonusPts*bonusAmnt) + 15;
			setState({...state, gameEndState: msgFinal + `\nE se apresentou corretamente! +15 pontos\nSeu score final é de ${newScore}`, score: newScore, elapsedTime: diff})
		} else {
			let newScore = state.score + Math.round(_maxBonusPts*bonusAmnt);
			setState({...state, gameEndState: msgFinal + `\nSeu score final é de ${newScore}`, score: newScore})
		}
	}

	// Criei essa função mas agora não sei se ela será útil ou se deve ser aqui.
	// Precisamos determinar quando e onde haverá incremento ou decremento de pontuação.
	// Caso seja somente tempo levado para terminar o jogo, essa função é inútil.
	// Caso seja tudo somente ao término, essa função é inútil e as outras computações
	// podem ser feitas em handleSubmit, junto com a computação do bônus por tempo
	const changeScore = (value) => () => {
		setState({...state, score: state.score + value})
	}
*/
