import React from 'react'
import Conversa from './pages/Game2/components/Conversa'

const TestPage = () => {
	const [show, setShow] = React.useState( true )

	if( show )
	return(
		<Conversa
			callAfterEveryMsg = {false}
			prevDialogHistory = {[
				{text: "Olá!", speaker: "player"},
				{text: "Oi! Tudo bem com você?"}
			]}
			convOptions = {[
				{question: "Tudo sim. Qual é seu nome?", answers: ["Ah, que bom que você está bem! Meu nome é fulana augusta da silva borges. E o seu nome, qual que é?"]},
				{question: "Tudo sim. E com você?", answers: ["Tudo ótimo.", "É sério? Vai falar só isso mesmo?", "Ok então...", "Tchau"]}
			]}
			afterWriter = { () => {console.log("afterWriter")} }
			onExited = { (dialogHistory) => {console.log("onExited");console.log(dialogHistory);setShow(false)} }
			onConvoChoiceMade = { (answer) => {console.log("onConvoChoiceMade");console.log(answer)} }
		/>
	)
	else return null
}

export default TestPage
