import React from 'react'
import { useDispatch } from 'react-redux'
import Conversa from './pages/Game2/components/Conversa'
import { headerActions } from './_actions'
import { headerConstants } from './_constants'

const TestPage = () => {
	const dispatch = useDispatch()
	React.useEffect( () => {
		dispatch(headerActions.setState(headerConstants.STATES.HIDDEN))
		return () => {dispatch(headerActions.setState(headerConstants.STATES.NORMAL))}
	}, [dispatch] )
	
	const divStyle = {position:"absolute", top: 0, right: 0, bottom:0, left:0}

	// -------------------------------------------
	// MODIFICAR SOMENTE DAQUI PARA BAIXO
	// -------------------------------------------



	return (
		<div style={divStyle}> {/* NÃO MODIFICAR ESSA LINHA */}
			<Conversa convOptions={[
				{question: "Pergunta 1", answers: ["Resposta 1.1", "Resposta 1.2"]},
				{question: "Pergunta 2", answers: ["Resposta 2.1"]},
				{question: "Pergunta 3", answers: ["Resposta 3.1"]},
				{question: "Pergunta 4", answers: ["Resposta 4.1"]},
			]}/>
		</div> /* NÃO MODIFICAR ESSA LINHA */
	)

	// -------------------------------------------
	// MODIFICAR SOMENTE ATÉ AQUI
	// -------------------------------------------
}

export default TestPage
