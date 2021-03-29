import React from 'react'
import { useDispatch } from 'react-redux'
import { headerActions } from './_actions'
import { headerConstants } from './_constants'

import Conversa from './pages/Game2/components/Conversa'

const TestPage = () => {
	const dispatch = useDispatch()
	React.useEffect( () => {
		dispatch(headerActions.setState(headerConstants.STATES.HIDDEN))
		return () => {dispatch(headerActions.setState(headerConstants.STATES.NORMAL))}
	}, [dispatch] )

	const [state, setState] = React.useState( {show: true, clear: false} )

	const dialogCleared = () => {
		setState({
			...state,
			clear: null
		})
	}

	const clearDialog = () => {
		setState({
			...state,
			clear: dialogCleared
		})
	}

	if( state.show )
	return(
		<Conversa
			callAfterEveryMsg = {false}
			onClearDialogHistory = {state.clear}
			prevDialogHistory = {[
				{text: "Olá!", speaker: "player"},
				{text: "Oi!"}
			]}
			// charPreSpeech = {["Tudo bem com você?", "Teste"]}
			charPreSpeech = {null}
			convOptions = {[
				{question: "Tudo sim. Qual é seu nome?", answers: "Ah, que bom que você está bem! Meu nome é fulana augusta da silva borges. E o seu nome, qual que é?"},
				{question: "Tudo sim. E com você?", answers: ["Tudo ótimo.", "É sério? Vai falar só isso mesmo?", "Ok então...", "Tchau"]}
			]}
			afterWriter = { () => {console.log("afterWriter")} }
			onExited = { (dialogHistory) => {console.log("onExited");console.log(dialogHistory);setState({...state, show: false})} }
			onConvoChoiceMade = { (answer) => {console.log("onConvoChoiceMade");console.log(answer)} }
		>
			<button onClick={clearDialog} style={{position:'absolute', left:'30px', top:'30px'}}>Limpar!</button>
		</Conversa>
	)
	else return null
}

export default TestPage
