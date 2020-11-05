import React from 'react'
import Init from '../components/Init'
import Result from '../components/Result'
import RoomSelect from '../components/RoomSelect'
import Sala from '../components/Sala'
import Conversa from '../components/Conversa'
import ConversaInicial from '../components/ConversaInicial'
import ConversaQuiz from '../components/ConversaQuiz'
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
		gameEndState: null
	});
	const [missionOpen, setMissionOpen] = React.useState(true)

	const handleSubmit = (value) => () =>
			setState({...state, gameEndState: value === state.quizAnswer? "ACERTOU!" : "ERROU!"})

	const setCurrentChar = (charData) => () =>
		setState({...state, currentChar: charData, found: charData.nome === state.targetName})

	const clearCurrentChar = () =>
		setState({...state, currentChar: null})


	const checkEnd = () => {
		if (state.found){
			setState({...state, endGame: true})
		} else {
			clearCurrentChar()
		}
	}

  return (
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
							{
								state.currentChar ?
									<Conversa endGame={state.endGame}
										handleSubmit={handleSubmit} quizOptions={quizOptions}
										charData={state.currentChar} checkEnd={checkEnd} clearCurrentChar={clearCurrentChar}
									/>
									: null
							}
						</div>
					}
					{	state.gameEndState ? <Result gameEndState={state.gameEndState}/> : null }
	      </div>
  )
}

export default Game
