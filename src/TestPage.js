import React from 'react'
import Conversa from './pages/Game2/components/Conversa'

const TestPage = () => {
	const [state, setState] = React.useState( {show: true} )

	if( state.show )
	return(
		<Conversa
			prevDialogHistory = {[
				{text: "Olá!", speaker: "player"},
				{text: "Oi! Tudo bem com você?"}
			]}
			convOptions = {[
				{question: "Tudo sim. Qual é seu nome?", answer: "Meu nome é fulana."},
				{question: "Tudo sim. E com você?", answer: "Tudo ótimo."}
			]}
			afterWriter = { () => {console.log("afterWriter")} }
			onExited = { (dialogHistory) => {console.log("onExited");console.log(dialogHistory);setState(false)} }
			onConvoChoiceMade = { (answer) => {console.log("onConvoChoiceMade");console.log(answer)} }
		/>
	)
	else return null
}

export default TestPage
