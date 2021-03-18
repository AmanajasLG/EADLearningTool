import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { apiActions, headerActions, musicActions } from '../../_actions'
import Init from './components/Init'
import RoomSelect from './components/RoomSelect'
import Sala from './components/Sala'
import Character from './components/Character'
import Button from '@material-ui/core/Button'
import './index.scss'
import initialState from './initialState'
import AcusationLamp from './components/AcusationLamp'
import DialogCharacter from './components/DialogCharacter'
import DialogHistory from './components/DialogHistory'
import Menu from './components/Menu'
import Writer from './components/Writer'
import { headerConstants } from '../../_constants'

const Game2 = (props) => {
	const [state, setState] = React.useState({...initialState});

	const id = props.match.params.id
	const dispatch = useDispatch()
	let error = useSelector( state => state.missions.error)
	let mission = useSelector( state => state.missions.items.find(mission => mission.id === props.match.params.id))
	const loading = useSelector( state => state.missions.loading)
	const userId = useSelector( state => state.authentication.user.user.id )
	const currentPlaySession = useSelector( state => state.play_sessions ? state.play_sessions.items[0] : {} )
	const { missionsActions, play_sessionsActions, player_actionsActions } = apiActions

	let tipsCount

	if(mission)
		tipsCount = mission.characters.filter(character => {
		return character.tip
	}).length
	const dialogInitialState = { dialogHistory: [], dialogStep: 0, correct: 0, characterFeeling: 'init' }

	React.useEffect(()=>{
		if(mission)
			dispatch(musicActions.set(mission.backgroundAudios[0].music[0].url))
		return () => dispatch(musicActions.set(''))
	}, [dispatch, mission])

	//fetch mission if doesn't already have
	React.useEffect(() => {
		if(id && !mission) dispatch(missionsActions.getById(props.match.params.id))
	}, [id, mission, dispatch, missionsActions, props.match.params.id])

	// check if user already played the game
	// React.useEffect(() => {
	// 	if(!state.checkPlayed){
	// 		dispatch(user_game_resultActions)
	// 	} 
	// }, [id, mission, dispatch, user_game_resultActions, state])

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

		setState(s => {return {...s, currentPlaySession, getClickedObject }})
		return () => {
			document.removeEventListener("mousedown", getClickedObject)
		}
	}, [dispatch, player_actionsActions, state.tracking, currentPlaySession])
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

			const locationIndex = Math.floor((Math.random() * 100)) % locations.length
			const characterIndex = Math.floor(Math.random(0, availableCharacters.length))

			//each character has some good and bad questions that can be asked
			let availableAnswers = [...availableCharacters[characterIndex].answers]
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

			console.log('selectedQuestions:', selectedQuestions)

			locations[locationIndex].characters = [...locations[locationIndex].characters,
				{...availableCharacters[characterIndex],
					selectedQuestions
				}
			]
			availableCharacters.splice(characterIndex, 1)
		}
		setState({...state, locations})
	}

	const onStartGame = (e) => {
		if(state.tracking){
			dispatch(play_sessionsActions.create({
				usersPermissionsUser: userId,
				mission: mission.id
			}))
		}

		//check if should start or skip tutorial
		setState({...state, scene: state.tryAgain ? "ROOM" : "TUTORIAL"})
	}

	const endTutorial = () => {
		setState(
			{...state, 
				scene: "ROOM", 
				tutorialStep: state.tutorialStep + 1,
				currentChar: null, 
				...dialogInitialState
			})
	}

	const setTutorialCharacter = (character) => () => {
		setState(
			{...state,
				tutorialStep: state.tutorialStep + 1,
				currentChar: character,
				answers:
				[
					{
						answer: 'Olha, não sei quem você está procurando, cheguei aqui semana passada. A cabelereira deve saber!',
						question: {
							question: 'Estou procurando alguém. Você pode me ajudar?'
						},
						close: false
					}
				]
			})
	}

	//shows only selected questions
	const setCurrentCharacter = (character) => () => setState(
		{...state,
			currentChar: character,
			answers: state.locations[state.currentRoom].characters
										.find(c => c.id === character.id).selectedQuestions
										.slice(0, state.questionsByStep)
		})

	
	const closeDialog = () =>
		setState({...state, currentChar: null, ...dialogInitialState})
	const refreshDialog = () =>
		setState({...state, ...dialogInitialState,
			answers: state.locations[state.currentRoom].characters
									.find(c => c.id === state.currentChar.id).selectedQuestions
									.slice(0, state.questionsByStep)})

	const afterWriter = () => {

		let updateState = {
			showAnswer: null,
			dialogHistory: [...state.dialogHistory, {text: state.showAnswer.text, speaker: 'character'}],
		}
		console.log('state.showAnswer', state.showAnswer)

		if(state.dialogStep !== state.totalDialogSteps){
			updateState.answers = state.locations[state.currentRoom].characters
										.find(c => c.id === state.currentChar.id).selectedQuestions
										.slice(state.questionsByStep * state.dialogStep, state.questionsByStep * (state.dialogStep + 1))
		}else{
			if(state.showAnswer && state.showAnswer.stop)
				updateState.showAnswer = null
			else{
				if(state.correct < state.correctMinimum){
					updateState.answers = [{refresh: true, question:{question: 'Sim'}}, {close: true, question:{question: 'Não'}}]
					updateState.showAnswer = {text: 'Não estou entendendo. Quer começar de novo?', index: 0, stop: true}
				}
				else{
					updateState.answers = [{answer: state.currentChar.tip, question:{question: 'Estou procurando alguém. Você pode me ajudar?', tip:state.currentChar.rightAnswer }}]
				}
			}
		}
		setState({...state, ...updateState})
	}

	const onMenuButtonClick = (answer) => () =>{

		if(answer.refresh)
			refreshDialog()
		else if(answer.close){
			if(answer.tip)
				setState({...state, tips: [...state, answer.tip]})
			closeDialog()
		}else if (state.scene === "TUTORIAL"){
			state.characterFeeling = 'wrongQuestion'

			let updateState = {
				dialogHistory: [...state.dialogHistory,
					answer.question.question,
					answer.answer
				],
				tutorialStep: state.tutorialStep + 1,
				tips: [
					'A cabelereira sabe'
				],
				answers: []
			}

			setState({...state, ...updateState})

		}else{

			if (state.spokenCharacters.indexOf(state.currentChar.name))
				state.spokenCharacters.push(state.currentChar.name)

			//change character face
			if(answer.question.correct){
				if(state.validQuestions.hasOwnProperty(answer.question.question)){
					state.validQuestions[answer.question.question]++
				} else {
					state.validQuestions[answer.question.question] = 0
				}
				state.characterFeeling = 'rightQuestion'
			} else {
				state.characterFeeling = 'wrongQuestion'
			}

			let updateState = {
				dialogHistory: [...state.dialogHistory,
					{text: answer.question.question, speaker: 'player'}
				],
				dialogStep: state.dialogStep + 1,
				correct: state.correct + (answer.question.correct? 1 : 0),
				showAnswer: {
					text: answer.answer,
					index: 0
				}
			}

			// e então atualiza
			setState({...state, ...updateState})
		}
	}

	const checkEnd = () => {
		if(state.tries < 3 && state.currentChar.name !== state.targetName){
			state.tries++
			setState({...state, acusation: false, characterFeeling: 'wrongAccusation'})
		} else {
			setState({...state, acusation: false, scene: "ENDGAME", gameEndState: state.currentChar.name === state.targetName, characterFeeling: state.currentChar.name === state.targetName ?
			'init' : 'init',
			currentChar: null
			})
			dispatch(headerActions.setAll(mission.name, mission.nameTranslate))
			dispatch(headerActions.setState(headerConstants.STATES.OVERLAY))
		}
	}
	
	const restart = (tips) => {
		setState({...initialState, tryAgain: true, tips: tips})
		dispatch(headerActions.setState(headerConstants.STATES.HIDDEN))
	}

	console.log(mission)
	console.log('state', state)
	console.log('init', initialState)

	return (
		<div id="game2-wrapper">
			{loading ? <div>Loading...</div> : error ? <div>{error}</div> : mission &&
			<div id="game2-content">
				<div id="input-tracker">TrackInput: <input type="checkbox" onChange={(e)=>{ setState({...state, tracking: e.target.checked}) }} /></div>
				{(function renderScene(){
					// eslint-disable-next-line default-case
					switch(state.scene){
						case "INIT":
							return <Init
												name={mission.name} description={mission.description}
												onStart={ onStartGame }
												onBack={ () => setState({...state, back: true}) }
											/>
						case "TUTORIAL":
							return (
								<div>
									Tutorial
									<Character
										character={mission.characters.find(character => character.name === 'Fuyuko')}
										onClick={setTutorialCharacter(mission.characters.find(character => character.name === 'Fuyuko'))}
									/>
								</div>
							)
						case "ROOM":
							return (
								<div id="room-itself">
									<RoomSelect
										buttonList={mission.locations.map((location, index) => index)}
										onChange={(num) => {
											setState({...state, currentRoom: num})
										}}
									/>

									<Sala roomData={state.locations[state.currentRoom]}>
										{state.locations[state.currentRoom].characters.map((character, index) =>
											<Character key={index}
												character={character}
												onClick={setCurrentCharacter(character)}
											/>
										)}
									</Sala>
								</div>)
							case "ENDGAME":
								return(
									<div id="endGame-screen">
										{state.gameEndState ?
										<div>
											<div id="endgame-messages">
												{state.tries === 0 ?
												<div className="painel" id="painel-1">
													<span lang="pt-br">Muito bem! Você encontrou a pessoa na primeira tentativa. Vai arrasar na sua nova carreira!</span>
													<span lang="en">Well done! You have found the right person on your first try. You're going to rock on your new career!</span>
													<a href="#painel-2" className="next-btn">{'❯'}</a>
												</div> :
												<div className="painel" id="painel-1">
													<span lang="pt-br">Você encontrou a pessoa certa! Parabéns!</span>
													<span lang="en">You have found the right person! Congrats!</span>
													<a href="#painel-2" className="next-btn">{'❯'}</a>
												</div>}

												<div className="painel" id="painel-2">
													<div className="ClueCounter">
														<div><span>{state.tips.length}</span>/<span>{tipsCount}</span></div>
														<div>clues</div>
													</div>

													<div>
														<div>After talking to {state.spokenCharacters.length} people, you found {state.tips.length} of the {tipsCount} existing clues.</div>
														<div>Regarding the questions you asked, {Object.keys(state.validQuestions).length} of them were useful.</div>
													</div>
													<a href="#painel-1" className="prev-btn">{'❮'}</a>
												</div>
											</div>
											<div id="endGame-action-btns">
												<Button onClick={restart}>Tentar novamente</Button>
												<Button onClick={() => setState({...state, back: true}) }>Sair do jogo</Button>
											</div>
										</div> :
										<div>
											<div id="endgame-messages">
												<div className="Mensagem">
													<div>Você ainda não encontrou a pessoa certa. Como você vai entender o que deve ser feito em seu novo trabalho? Você ainda precisa descobrir algumas dicas.</div>
													<div>You still haven't found the right person. How will you understand what has to be done in your new job? There are clues yet to be found.</div>
												</div>

												<div className="ClueCounter">
													<div><span>{state.tips.length}</span>/<span>{tipsCount}</span></div>
													<div>clues</div>
												</div>

												<div>
													<div>After talking to {state.spokenCharacters.length} people, you found {state.tips.length} of the {tipsCount} existing clues.</div>
													<div>Regarding the questions you asked, {Object.keys(state.validQuestions).length} of them were useful. Try asking more relevant questions!</div>
												</div>
											</div>
											<div id="endGame-action-btns">
												<Button onClick={() => restart(['A cabelereira sabe']) }>Tentar novamente</Button>
												<Button onClick={() => setState({...state, back: true}) }>Sair do jogo</Button>
											</div>
										</div>
										}
									</div>
								)
					}
				}())}
				{state.tutorialStep === 0 && state.scene === 'TUTORIAL' &&
					<div style={{position: 'absolute', top: 100, left: 100, width: 500, height: 300, backgroundColor: '#ddddee'}}>
						<div>
							Selecione alguém para conversar e te ajudar a encontrar o seu guia.
						</div>
						<div>-------</div>
						<div>
							Select someone to talk and help you find your guide.
						</div>
					</div>
				}
				{ state.currentChar && 
					<div id="conversa" className='DialogPopUp'>

						<AcusationLamp onClick={() => setState({...state, acusation: true})} />

						<div id="fechar" onClick={closeDialog}><span>×</span></div>

						{ state.scene === 'TUTORIAL' && state.tutorialStep === 2 &&
						<div>
							<div>
							Selecione alguém para conversar e te ajudar a encontrar o seu guia.
						</div>
						<div>-------</div>
						<div>
							Select someone to talk and help you find your guide.
						</div>
						<button className="btn btn-center" id="btn-end-tutorial" onClick={endTutorial}>Continuar</button>
						</div>

						}

						<div id="dialog-interact">
							<div id="dialogos">
								<DialogHistory dialogHistory={state.dialogHistory}/>

								<div id='DialogBox'>
									{state.showAnswer ?
										<Writer text={state.showAnswer.text}
											onWritten={afterWriter}
											afterWrittenTime={4000}
											characterTime={50}
										/>
										:
										<Menu buttonList={state.answers.reduce((acc, answer) => { return [...acc, {...answer, text: answer.question.question} ] }, [])}
											onButtonClick={onMenuButtonClick}
										/>
									}
								</div>
							</div>
							<DialogCharacter character={state.currentChar} feeling={state.characterFeeling}/>
						</div>
					</div>
				}
				{ state.acusation &&
					<div id="dialog-accusation-wrapper">
						<div id="dialog-accusation">
							<div id="accusation-infos">
								<div>
									<span lang="pt-br">Tem certeza?</span>
									<span lang="en">Are you sure it's them?<br />Check your tips.</span>
								</div>
								<div>
									{ /* Dessa linha até a "uma das várias" devem ser removidas quando o carregamento correto vier */ }
									<div>Dicas recebidas.</div>
									<div>Dicas recebidas mais longa.</div>
									<div>Dicas.</div>
									<div>Uma das várias dicas que foram recebidas mas essa é super mega blaster master longa.</div>
									<div>Recebidas.</div>
									{state.tips.map((tip, index)=>
										<div key={index}>{tip}</div>
										)}
								</div>
							</div>
							<div id="accusation-btns">
								<Button onClick={() => setState({...state, acusation: false}) }>Não</Button>
								<Button onClick={checkEnd}>Sim</Button>
							</div>
						</div>
					</div>
				}
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
