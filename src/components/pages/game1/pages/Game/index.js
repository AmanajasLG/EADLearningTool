import React from 'react'
import RoomSelect from '../../components/RoomSelect'
import Sala from '../../components/Sala'
import Conversa from '../../components/Conversa'
import rooms from './rooms.js'
import './index.css'

const Game = () => {
	const [state, setState] = React.useState({currentRoom: 0, targetName: 'Juslecino', endGame: false, currentChar: null, found: false});

	const setCurrentChar = (charData) => () => {
		setState({...state, currentChar: charData, found: charData.nome === state.targetName})
	}

	const clearCurrentChar = () => {
		setState({...state, currentChar: null})
	}

	const checkEnd = () => {
		if (state.found){
			alert('OK')
			setState({...state, endGame: true})
		} else {
			alert('EROU')
			clearCurrentChar()
		}
	}

  return (
	      <div style={{width: '100%', height: '100%'}}>
					<div id="RoomName">{rooms[state.currentRoom].nome}</div>
					<RoomSelect
						roomsData={rooms}
						onChange={(num) => {
						setState({...state, currentRoom: num})
					}}
					/>
						<Sala roomData={rooms[state.currentRoom]} setCurrentChar={setCurrentChar}/>
					{
						state.currentChar ?
							<Conversa
								charData={state.currentChar} clearCurrentChar={clearCurrentChar}
								checkEnd={checkEnd} endGame={state.endGame}
							/>
							: null
					}
	      </div>
  )
}

export default Game
