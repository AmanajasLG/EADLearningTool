import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { apiActions } from '../../../_actions'

import Init from '../components/Init'
import Result from '../components/Result'
import RoomSelect from '../components/RoomSelect'
import Sala from '../components/Sala'
import Conversa from '../components/Conversa'
// import ConversaInicial from '../components/ConversaInicial'
// import ConversaQuiz from '../components/ConversaQuiz'
import AppHeader from '../../../_components/AppHeader'
import rooms from './rooms.js'
import quizOptions from './quizOptions.js'
import './index.scss'
import { headerTitleActions } from '../../../_actions'


const Game = (props) => {
	const id = props.match.params.id
	const mission = useSelector( state => state.missions.items.find(mission => mission.id === props.match.params.id))
	const dispatch = useDispatch()
	const { missionsActions } = apiActions
	React.useEffect(()=>{
		if(id && !mission) dispatch(missionsActions.getById(props.match.params.id))
	}, [])

	const gameScenes = ["INIT", "ROOM"]
	const [state, setState] = React.useState({
//GAME STATE
		tutorialStep: 0,
		scene: "INIT",
		currentRoom: 0,
		isOnDialog: false,
		endGame: false,
		found: false,
		locations:[],
//DIALOG
		currentChar: null,
		targetName: 'Juslecino',
		quizAnswer: 0,
		gameEndState: null,
		tries: 0,
		score: 0,
		startedTimestamp: new Date(Date.now()),
		elapsedTime: null,
		back: false
	});

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
			locations[locationIndex].characters.push(availableCharacters[characterIndex])
			availableCharacters.splice(characterIndex, 1)
		}
		setState({...state, locations: locations})
	}

	const [missionOpen, setMissionOpen] = React.useState(true)
	const _minTimeBonus = 2*60*1000; // Se terminar antes desse tempo (em ms), ganha o bônus máximo
	const _maxTimeBonus = 5*60*1000; // Se terminar em até esse tempo (em ms), ganha um bônus no score proporcional. Terminar depois garante 0 de bônus
	const _maxBonusPts = 100; // Máximo de 100 pontos se terminar antes do mínimo

	const handleSubmit = (value) => () => {
		/* Computa bônus por tempo */
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

	const setCurrentChar = (charData) => () =>
		setState({...state, currentChar: charData, found: charData.nome === state.targetName})

	const clearCurrentChar = () =>
		setState({...state, currentChar: null})


	const checkEnd = () => {
		let newState = {...state, tries: state.tries+1}
		if (state.found){
			setState({...newState, endGame: true})
		} else {
			setState({...newState, currentChar: null})
		}
	}


	// Essa return aqui tá um BAD SMELL absurdo. Temos que refatorar esse trecho de código.
	return (
		<div>
			{!mission ? <div>Loading...</div>
			:
			<div>
				<div style={{width: '100%', height: '100%'}}>
					{/*<div id="RoomName">{mission.locations.length > 0 && mission.locations[state.currentRoom].name}</div>*/}
					{(function renderScene(){
						switch(state.scene){
							case "INIT":
								return <Init
													name={mission.name} description={mission.description}
													onStart={ () => setState({...state, tutorialStep: state.tutorialStep + 1, scene: "ROOM"}) }
													onBack={ ()=> setState({...state, back: true}) }
												/>
							case "ROOM":
								return (
									<div>
										<RoomSelect
											roomsData={mission.locations}
											onChange={(num) => {
												setState({...state, currentRoom: num})
												dispatch(headerTitleActions.changeTitle(state.locations[num].name))
											}}
										/>
									<Sala roomData={state.locations[state.currentRoom]} setCurrentChar={setCurrentChar}/>
									{ state.currentChar && !state.gameEndState &&
										<Conversa character={state.currentChar}
											close={() => setState({...state, currentChar: null})}
											endGame={state.endGame}
											handleSubmit={handleSubmit} quizOptions={quizOptions}
											 checkEnd={checkEnd} clearCurrentChar={clearCurrentChar}
										/>
									}
									<div id="phone"><p>Agenda de contatos</p></div>
									</div>)
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

export default Game
