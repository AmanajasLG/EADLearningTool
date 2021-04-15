import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { apiActions, headerActions, musicActions } from '../../_actions'
import Init from './components/Init'
import RoomSelect from './components/RoomSelect'
import Sala from './components/Sala'
import Character from './components/Character'
import Button from '@material-ui/core/Button'
import './index.scss'
import './tela-acusacao.scss'
import './tela-fim-jogo.scss'
import './tela-tutorial.scss'
import AcusationLamp from './components/AcusationLamp'
import initialState from './initialState'
import { headerConstants } from '../../_constants'
import Conversa from './components/Conversa'
import DialogCharacter from './components/DialogCharacter'
import { Redirect } from 'react-router'

import iconVitoriaPers from '../../img/Game2/parabens_vitoria-persistente.svg'
import iconVitoriaPrim from '../../img/Game2/parabens_vitoria-primeira.svg'
import iconDicas from '../../img/ícone_jogo1.svg'
import iconInit from '../../img/Game2/Icone_jogo-tela_inicio.svg'

const Game2 = (props) => {

	const [state, setState] = React.useState(initialState());

	const id = props.match.params.id
	const dispatch = useDispatch()
	let error = useSelector( state => state.missions.error)
	let mission = useSelector( state => state.missions.items.find(mission => mission.id === props.match.params.id))
	const loading = useSelector( state => state.missions.loading)
	const userId = useSelector( state => state.authentication.user.user.id )
	const lang = useSelector( state => state.authentication.user.user.language.id )
	const currentPlaySession = useSelector( state => state.play_sessions ? state.play_sessions.items[0] : {} )
	const { missionsActions, play_sessionsActions, player_actionsActions, user_game_resultsActions } = apiActions
	const hasPlayed = useSelector( state => state.user_game_results.items.length > 0)

	let tipsCount

	if(mission)
		tipsCount = mission.missionCharacters.filter(missionCharacter => { return missionCharacter.tip }).length
	const dialogInitialState = { dialogHistory: [], dialogStep: 0, correct: 0, characterFeeling: 'init', preSpeech: null, convOptions: [] }

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
	React.useEffect(() => {
		let updateState = {}
		if(mission && !state.checkedPlayed){
			dispatch(user_game_resultsActions.find({
				'user.id': userId,
				'mission.id': mission.id
			}))

			updateState.checkedPlayed = true
		}
		updateState.hasPlayed = hasPlayed
		setState({...state, ...updateState})
		// eslint-disable-next-line
	}, [userId, mission, dispatch, user_game_resultsActions, hasPlayed])

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
		let availableCharacters = mission.missionCharacters.slice(0)
		let locations = mission.locations.filter(location => {
			return location.type === 'room'
		}).map( location => {
			delete location.characters
			return {location: location, missionCharacters: []}
		})
		
		let tutorialRoom = { location: mission.locations.find(location => {
			return location.type === 'tutorial'
		}),
		 missionCharacters: []
		}

		console.log(tutorialRoom)

		const maxWeight = Math.max(mission.missionCharacters.length - mission.locations.filter(location => {
			return location.type === 'room'
		}).length, 1)
		//distribute on locations
		while(availableCharacters.length > 0){
			// se personagem for o de tutorial, separa ele e continua
			if( availableCharacters[0].character.name === "Tutorial" ) {
				tutorialRoom.missionCharacters.push(availableCharacters[0])
				availableCharacters.splice(0, 1)
				continue;
			}

			// sorteia sala aleatoriamente com pesos que diminuem dependendo de quantos personagens já se tem
			let totalWeight = 0
			const weights = locations.map( (location) => {
				let weight = maxWeight - location.missionCharacters.length
				totalWeight += weight
				return weight
			})
			let rand = Math.floor(Math.random()*totalWeight)
			let i = 0;
			while( rand >= 0 ) rand -= weights[i++]
			const locationIndex = i-1

			//each character has some good and bad questions that can be asked
			let availableAnswers = [...availableCharacters[0].answers]
			let correct = availableAnswers.filter(answer => answer.question.correct)
			let ncorrect = availableAnswers.filter(answer => !answer.question.correct)

			let selectedQuestions = []
			// ? E se correct/ncorrect não tiveram a quantidade necessária de perguntas?
			while(selectedQuestions.length < 4){
				let source = selectedQuestions.length % 2 === 0? correct : ncorrect
				let index = Math.floor(Math.random(0, source.length))
				selectedQuestions.push( source[index] )
				source.splice(index, 1)
			}

			// Aleatorizando para que nem sempre venham as perguntas na ordem certo->errado
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

			locations[locationIndex].missionCharacters = [...locations[locationIndex].missionCharacters,
				{...availableCharacters[0],
					selectedQuestions,
					zDepth: Math.random()
				}
			]

			availableCharacters.splice(0, 1)
		}

		// Aleatorizando ordem dos personagens em cada sala
		for( let i = 0; i < locations.length; i++ ) {
			let amountChars = locations[i].missionCharacters.length
			if( amountChars <= 1) continue
			for( let j = 0; j < amountChars-1; j++ ) {
				let exchangeWith = Math.floor(Math.random() * (amountChars - j)) + j
				if (j === exchangeWith) continue // Não precisa trocar se for consigo mesmo
				//swap
				let aux = locations[i].missionCharacters[j]
				locations[i].missionCharacters[j] = locations[i].missionCharacters[exchangeWith]
				locations[i].missionCharacters[exchangeWith] = aux
			}
		}
		setState({...state, locations, tutorialRoom})
	}

	const onStartGame = (e) => {
		if(state.tracking){
			dispatch(play_sessionsActions.create({
				usersPermissionsUser: userId,
				mission: mission.id
			}))
		}

		//check if should start or skip tutorial
		setState({...state, scene: (!state.seeTutorial && state.hasPlayed) ? "ROOM" : "TUTORIAL"})
	}

	const endTutorial = () => {
		let updateState = {
			showConvo: false,
			currentChar: null,
			scene: "ROOM",
			...dialogInitialState
		}
		setState({...state, ...updateState})
	}

	const setTutorialCharacter = (character) => () => {
		setState(
			{...state,
				tutorialStep: state.tutorialStep + 1,
				showConvo: true,
				currentChar: character,
				convOptions:
				[
					{
						// answer: 'Olha, não sei quem você está procurando, cheguei aqui semana passada. A cabelereira deve saber!',
						// question: 'Estou procurando alguém. Você pode me ajudar?',
						answer: ['Olha, não sei quem você está procurando, cheguei aqui semana passada...','A cabelereira deve saber!'],
						question: {
							question: 'Estou procurando alguém. Você pode me ajudar?',
						},
						close: false
					}
				]
			})
	}

	//shows only selected questions
	const setCurrentCharacter = (character) => () => {
		setState({
			...state,
			showConvo: true,
			currentChar: character,
			// convOptions: state.locations[state.currentRoom].missionCharacters
			// 							.find(mc => mc.character.id === character.id).selectedQuestions
			dialogStep: 0,
			convOptions: state.locations[state.currentRoom].missionCharacters
										.find(c => c.character.id === character.id).selectedQuestions
										.slice(0, state.questionsByStep)
		})
	}

	const closeDialog = (dialogHistory) => {
		setState({
			...state,
			...dialogInitialState,
			showConvo: false,
			shouldCloseConvo: false,
			currentChar: null
		})
	}

	const afterWriter = () => {
		if( state.scene === "TUTORIAL" ) {
			setTimeout(() => { setState({
				...state,
				tutorialStep: state.tutorialStep + 1
			}) }, 1500)
		} else {
			let updateState = {}
			// if(state.dialogStep !== state.totalDialogSteps){				
			// 	updateState.convOptions = state.locations[state.currentRoom].missionCharacters
			// 	.find(mc => mc.character.id === state.currentChar.id).selectedQuestions
			// 	.slice(state.questionsByStep * state.dialogStep, state.questionsByStep * (state.dialogStep + 1))
			// }else{
			if(state.dialogStep < state.totalDialogSteps){
				updateState.convOptions = state.locations[state.currentRoom].missionCharacters
					.find(mc => mc.character.id === state.currentChar.id).selectedQuestions
					.slice(state.questionsByStep * state.dialogStep, state.questionsByStep * (state.dialogStep + 1))
			} else if(state.dialogStep === state.totalDialogSteps) {
				if(state.correct < state.correctMinimum){
					updateState.preSpeech = state.currentChar.wrongAnswer
					updateState.convOptions = [{refresh: true, question:{question: 'Sim'}}, {close: true, question:{question: 'Não'}, answer:state.currentChar.endDialog}]
				} else {
					updateState.convOptions = [{tip: state.currentChar.tip, question:{question: 'Estou procurando alguém. Você pode me ajudar?'}, answer:state.currentChar.rightAnswer, correct: true }]
				}
			} else {
				const tchaus = ['Ah tá, tchau!', 'Ok. Valeu!', 'Tchau!', 'Até mais!',
								'Entendi... Muito obrigado!', 'Até logo!', 'Até a próxima!']
				const rIdx = Math.floor(Math.random()*tchaus.length)
				updateState.convOptions = [{close: true, question:{question: tchaus[rIdx], correct: true}, answer:state.currentChar.endDialog}]
			}
			if( state.closeAfterWritter ) {
				delete state.closeAfterWritter
				updateState.convOptions = []
				updateState.shouldCloseConvo = true
			}
			setState({...state, ...updateState})
		}
	}

	const onRefreshDialog = () => {
		setState({
			...state,
			...dialogInitialState,
			refreshDialog: null,
			convOptions: state.locations[state.currentRoom].missionCharacters
									.find(c => c.character.id === state.currentChar.id).selectedQuestions
									.slice(0, state.questionsByStep)
		})
	}

	const onMenuButtonClick = (answer) => {
		let updateState = {}

		if(state.tips.indexOf(answer.tip) === -1)
			updateState = {...updateState, tips: [...state.tips, answer.tip]}

		if(answer.refresh)
			updateState = {...updateState, refreshDialog: onRefreshDialog}
		else if(answer.close)
			updateState = {...updateState, closeAfterWritter: true}
		else {
			if (state.scene === "TUTORIAL"){
				updateState = {
					...updateState,
					characterFeeling: 'wrongQuestion',
					convOptions: []
				}
			} else {
				updateState = {
					...updateState,
					spokenCharacters: state.spokenCharacters,
					validQuestions: state.validQuestions,
					characterFeeling: null,
				}
				if (updateState.spokenCharacters.indexOf(state.currentChar.name) === -1)
					updateState.spokenCharacters.push(state.currentChar.name)

				//change character face
				if(answer.correct){
					// if(updateState.validQuestions.hasOwnProperty(answer.question.question)){
					// 	updateState.validQuestions[answer.question.question]++
					if(updateState.validQuestions.hasOwnProperty(answer.question)){
						updateState.validQuestions[answer.question]++
					} else {
						updateState.validQuestions[answer.question] = 0
					}
					updateState.characterFeeling = 'rightQuestion'
				} else {
					updateState.characterFeeling = 'wrongQuestion'
				}
			}

			updateState = {
				...updateState,
				dialogStep: state.dialogStep + 1,
				correct: state.correct + (answer.correct? 1 : 0)
			}
		}

		setState({...state, ...updateState})
	}

	const checkEnd = () => {
		if(state.tries < 3 && state.currentChar.name !== state.targetName){
			state.tries++
			setState({
				...state,
				acusation: false,
				characterFeeling: 'wrongAccusation',
				preSpeech: state.currentChar.acusationAnswer
			})
		} else {
			setState({...state, acusation: false, scene: "ENDGAME", gameEndState: state.currentChar.name === state.targetName, characterFeeling: state.currentChar.name === state.targetName ?
			'rightAccusation' : 'wrongAccusation',
			currentChar: null
			})

			//aqui
			dispatch(user_game_resultsActions.create({
				user: userId,
				mission: mission.id,
				score: state.score,
				tipsCount: state.tips.length,
				spokenCharactersCount: state.spokenCharacters.length,
				tries: state.tries,
				won: state.gameEndState,
				validQuestionsCount: Object.keys(state.validQuestions).length
			}))

			dispatch(headerActions.setAll(mission.name, mission.nameTranslate))
			dispatch(headerActions.setState(headerConstants.STATES.OVERLAY))
		}
	}

	const tutorialScreen = (id) => {
		return (
			<div id="room-itself" className="tutorial">
				<Sala roomData={state.tutorialRoom.location} key={-1}>
					{state.tutorialRoom.missionCharacters.map((missionCharacter, index) =>
							<Character
							// character={mission.missionCharacters.find(missionCharacters => missionCharacters.character.name === 'Tutorial').character}
							// onClick={setTutorialCharacter(mission.missionCharacters.find(missionCharacters => missionCharacters.character.name === 'Tutorial').character)}
							character={missionCharacter.character}
							onClick={setTutorialCharacter(missionCharacter.character)}
							key={index}
						/>
					)}
					<div className="abs-fix">
						<div id="tutorial-popup-1">
							<span lang="pt-br">Selecione alguém para conversar e te ajudar a encontrar o seu guia.</span>
							<span lang="en">Select someone to talk and help you find your guide.</span>
						</div>
					</div>
				</Sala>
				{state.showConvo &&
					<Conversa
						onExited = {() => {setState({...state, showConvo: false, tutorialStep: state.tutorialStep-1})}}
						convOptions = {state.convOptions.reduce((acc, convOption) => {
							let option = {...convOption, answers: convOption.answer, question: convOption.question.question}
							delete option.answer
							return [...acc, option ]
						}, [])}
						currentChar = {state.currentChar}
						charFeeling = {state.characterFeeling}
						afterWriter = {afterWriter}
						onConvoChoiceMade = {onMenuButtonClick}
					/>
				}
				{id === 2 &&
					<div id="tutorial-popup-2-wrapper">
						<div id="tutorial-popup-2-content">
							<span lang="pt-br"><strong>Lembre-se:</strong> As pessoas estão ocupadas em seus ambientes de trabalho, então tenha certeza de não gastar o tempo delas com perguntas fora de contexto!</span>
							<span lang="en"><strong>Remember:</strong> People are busy in their workplaces, so be sure not to waste their times with question that are out of yout context!</span>
							<button className="btn btn-center" id="btn-end-tutorial" onClick={endTutorial}>Continuar</button>
						</div>
					</div>
				}
			</div>
		)
	}

	const restart = () => {
		setState({...initialState(), hasPlayed: true})
		dispatch(headerActions.setState(headerConstants.STATES.HIDDEN))
	}

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
										icon={iconInit}
										name={mission.name} description={mission.description}
										nameTranlate={mission.missionNameLanguages.find(name => { return name.language === lang}).name}
										descriptionTranlate={mission.missionDescriptionLanguages.find(description => { return description.language === lang}).description}
										onStart={ onStartGame }
										onBack={() => setState({...state, back: true})}
										onSeeTutorial={ state.hasPlayed ? () => {state.seeTutorial = true;onStartGame()} : null }
									/>
						case "TUTORIAL":
							return ( tutorialScreen(state.tutorialStep) )
						case "ROOM":
							return (
								<div id="room-itself">
									<RoomSelect
										buttonList={state.locations.map((location, index) => index)}
										onChange={(num) => {
											setState({...state, currentRoom: num})
										}}
									/>
									{/* //? Pq sala recebe a location inteira? Se ela só precisa saber a imagem de fundo,
										//? pq passar tudo ao invés de só passar a string? Que aí poderia ser local ou na rede... */}
									<Sala roomData={state.locations[state.currentRoom].location} key={state.currentRoom}>
										{state.locations[state.currentRoom].missionCharacters.map((missionCharacter, index) =>
											<Character key={index}
												zDepth={missionCharacter.zDepth}
												character={missionCharacter.character}
												onClick={setCurrentCharacter(missionCharacter.character)}
												// showNameOnHover={true} descomentar linha se quiser que os nomes dos personagens apareça sobb hover do mouse
											/>
										)}
									</Sala>
									{state.showConvo &&
										<Conversa
											shouldExit={state.shouldCloseConvo}
											prevDialogHistory={[]}
											// clearDialogHistory={state.refreshDialog}
											// charPreSpeech={state.preSpeech}
											// convOptions={state.convOptions.reduce((acc, convOption) => { return [...acc, {...convOption, answers:convOption.answer, question: convOption.question.question, correct: convOption.question.correct} ] }, [])}
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
											<AcusationLamp onClick={() => setState({...state, acusation: true})} />
										</Conversa>
									}
								</div>)
							case "ENDGAME":
								return(
									<div id="endGame-screen">
										{state.gameEndState ?
										<div id="end-panels">
											<div id="painel-2-icon">
												<img src={state.tries === 0 ? iconVitoriaPrim : iconVitoriaPers} alt=""/>
											</div>
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
													<div className="painel-2-wrapper">
														<div className="painel-2-content">
															<div><span>{state.tips.length ?? 0}</span>/<span>{tipsCount}</span></div>
															<div>clues</div>
														</div>
													</div>
													<div className="painel-2-wrapper">
														<div className="painel-2-content">
															<div>
																<p>After talking to {state.spokenCharacters.length} people, you found {state.tips.length} of the {tipsCount} existing clues.</p>
																<p>Regarding the questions you asked, {Object.keys(state.validQuestions).length} of them were useful.</p>
															</div>
														</div>
													</div>
													<a href="#painel-1" className="prev-btn">{'❮'}</a>
												</div>
											</div>
											<div id="endGame-action-btns-right">
												<Button onClick={restart}>Tentar novamente</Button>
												<Button onClick={() => setState({...state, back: true}) }>Sair do jogo</Button>
											</div>
										</div> :
										<div>
											<div>
												<div>
													<div>Você ainda não encontrou a pessoa certa. Como você vai entender o que deve ser feito em seu novo trabalho? Você ainda precisa descobrir algumas dicas.</div>
													<div>You still haven't found the right person. How will you understand what has to be done in your new job? There are clues yet to be found.</div>
												</div>
												<div>
													<div><span>{state.tips.length}</span>/<span>{tipsCount}</span></div>
													<div>clues</div>
												</div>
												<div>
													<div>After talking to {state.spokenCharacters.length} people, you found {state.tips.length} of the {tipsCount} existing clues.</div>
													<div>Regarding the questions you asked, {Object.keys(state.validQuestions).length} of them were useful. Try asking more relevant questions!</div>
												</div>
											</div>
											<div id="endGame-action-btns-wrong">
												<Button onClick={restart}>Tentar novamente</Button>
												<Button onClick={() => setState({...state, back: true}) }>Sair do jogo</Button>
											</div>
										</div>
										}
										<DialogCharacter
											character={
												mission.missionCharacters.find((mc) => {
													return mc.character.name===state.targetName
												}).character}
											feeling={"rightAccusation"}
										/>
									</div>
								)
					}
				}())}
				<div id="dialog-accusation-wrapper" hidden={state.acusation !== true || undefined} aria-hidden={state.acusation !== true || undefined}>
					<div id="dialog-accusation">
						<div id="accusation-infos">
							<div>
								<span lang="pt-br">Tem certeza?</span>
								<span lang="en">Are you sure it's them?<br />Check your tips.</span>
							</div>
							<div id="tips-received">
								<div id="accusation-icon">
									<img src={iconDicas} alt="" />
								</div>
								{state.tips.length > 0 ?
									state.tips.map((tip, index) => <div key={index}>{tip}</div>)
									:
									<div>Nenhuma dica recebida.</div>
								}
							</div>
						</div>
						<div id="accusation-btns">
							<Button onClick={() => setState({...state, acusation: false}) }>Não</Button>
							<Button onClick={checkEnd}>Sim</Button>
						</div>
					</div>
				</div>
			</div>
			}
			{ state.back && <Redirect to='/userspace' />}
		</div>
  )
}

export default Game2
