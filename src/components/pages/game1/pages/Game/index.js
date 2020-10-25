import React from 'react'
import RoomSelect from '../../../../RoomSelect'
import Sala from './sala.js'
import Conversa from './conversa.js'
import listaPersonagens from './listaPersonagens.js'
import './index.css'

const Game = () => {
	const [state, setState] = React.useState({currentRoom: 0, targetName: 'Juslecino', endGame: false, currentChar: null, found: false});
	const rooms = [
		{
			nome: "Saguão principal",
			cor: "#050505",
			personagens: [
				listaPersonagens[0],
				listaPersonagens[1],
				listaPersonagens[2]
			]
		},
		{
			nome: "Corredor",
			cor: "#330033",
			personagens: [
				listaPersonagens[3],
				listaPersonagens[4],
				listaPersonagens[5]
			]
		},
		{
			nome: "Cantina",
			cor: "#333300",
			personagens: [
				listaPersonagens[6],
				listaPersonagens[7],
				listaPersonagens[8]
			]
		},
		{
			nome: "Livraria",
			cor: "#003333",
			personagens: [
				listaPersonagens[9],
				listaPersonagens[10],
				listaPersonagens[11]
			]
		},
		{
			nome: "Estacionamento",
			cor: "#555555",
			personagens: [
				listaPersonagens[12],
				listaPersonagens[13],
				listaPersonagens[14]
			]
		}
	]

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
        <div>
            <div>Game</div>
			<div>Estado: {state.currentRoom}</div>
			<RoomSelect
			roomsData={rooms}
			onChange={(num) => {
				setState({...state, currentRoom: num})
			}}
			/>
			
			<Sala roomData={rooms[state.currentRoom]} setCurrentChar={setCurrentChar}/>
			
			{
				state.currentChar ? <Conversa charData={state.currentChar} clearCurrentChar={clearCurrentChar} checkEnd={checkEnd} endGame={state.endGame} /> : null
			}
        </div>
    )
}

export default Game