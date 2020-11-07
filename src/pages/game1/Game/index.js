import React from 'react'
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

const Game = () => {
	const [state, setState] = React.useState({
		currentRoom: 0,
		targetName: 'Juslecino',
		endGame: false,
		currentChar: null,
		found: false,
		quizAnswer: 0,
		gameEndState: null,
		tries: 0,
		score: 0,
		startedTimestamp: new Date(Date.now())
	});
	const [missionOpen, setMissionOpen] = React.useState(true)
	const _minTimeBonus = 2*60*1000; // Se terminar antes desse tempo (em ms), ganha o bônus máximo
	const _maxTimeBonus = 5*60*1000; // Se terminar em até esse tempo (em ms), ganha um bônus no score proporcional. Terminar depois garante 0 de bônus
	const _maxBonusPts = 100; // Máximo de 100 pontos se terminar antes do mínimo

	const handleSubmit = (value) => () => {
		if( value == state.quizAnswer ) {

			/* Computa bônus por tempo */
			let diff = Date.now() - state.startedTimestamp;
			// Faz o bônus ser decrescente com o passar do tempo, escalados para que bonusAmnt
			// seja 1 em t = _minTimeBonus e 0 em t = _maxTimeBonus
			let bonusAmnt = (_maxTimeBonus - diff)/(_maxTimeBonus - _minTimeBonus);
			bonusAmnt = Math.max(Math.min(bonusAmnt, 1.0), 0.0); // Clampa para que bonusAmnt = [0,1]

			setState({...state, gameEndState: "ACERTOU!", score: state.score + _maxBonusPts*bonusAmnt})
		} else {
			setState({...state, gameEndState: "ERROU!"})
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

  return (
	  <div>
		  <AppHeader pageInfo={{title: 'Teste com um nome bem grande', subTitle: 'Teste com outro nome grande'}}/>
		  <div style={{width: '100%', height: '100%'}}>
					<div id="RoomName">{rooms[state.currentRoom].nome}</div>
					{ missionOpen ?
						<Init onClose={ () => setMissionOpen(false) }/>
						:
						<div>
							<button onClick={ () => setMissionOpen(true) }>Abrir resumo da missão</button>
							<RoomSelect
								roomsData={rooms}
								onChange={(num) => {
								setState({...state, currentRoom: num})
							}}
							/>
								<Sala roomData={rooms[state.currentRoom]} setCurrentChar={setCurrentChar}/>

							{ state.currentChar && !state.gameEndState ?
										<Conversa endGame={state.endGame}
											handleSubmit={handleSubmit} quizOptions={quizOptions}
											charData={state.currentChar} checkEnd={checkEnd} clearCurrentChar={clearCurrentChar}
										/>
										: null
							}
						</div>
					}
					{	state.gameEndState ? <Result gameEndState={state.gameEndState}/> : null }
					{ state.tries > 0 ? <div>{state.tries} tentativa{state.tries > 1? 's' : ''}!</div> : null}
	      </div>
	  </div>
	      
  )
}

export default Game
