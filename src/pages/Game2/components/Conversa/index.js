import Menu from '../Menu'
import React from 'react'
import DialogCharacter from '../DialogCharacter'
import DialogHistory from '../DialogHistory'
import FullscreenOverlay from '../FullscreenOverlay'
import Writer from '../Writer'

import './index.scss'

const Conversa = ({
		children,
		shouldExit = false,
		showDialogHistory = true,
		onClearDialogHistory = null,
		callAfterWritterForEveryMsg = false,
		msPerCharacter = 50,
		waitAfterWritten = 2000,
		prevDialogHistory = [],
		charPreSpeech = null,
		convOptions = [],
		currentChar = null,
		charFeeling = null,
		afterWriter = () => {},
		onExited = (dialogHistory) => {},
		onConvoChoiceMade = (convoChoosen) => {},
	}) => {

	const [state, setState] = React.useState({
		querFechar: shouldExit,
		answers: null,
		dialogHistory: prevDialogHistory
	});

	// Isso PODE causar bug caso mudemos alguém mude charPreSpeech desse componente enquanto o writer faz algo
	React.useEffect( () => {
		if( charPreSpeech !== null && charPreSpeech.length > 0 ) {
			state.currentAnswer = 0
			state.answers = typeof(charPreSpeech) === "string" ? [charPreSpeech] : charPreSpeech
		}
		// eslint-disable-next-line
	}, [charPreSpeech])
	
	// Isso PODE causar bug caso alguém mande limpar enquanto o writer faz algo
	React.useEffect(() => {
		if( onClearDialogHistory ) {
			onClearDialogHistory(state.dialogHistory)
			state.dialogHistory = []
		}
		// eslint-disable-next-line
	}, [onClearDialogHistory])

	const _querFechar = () => {
		setState({
			...state,
			querFechar: true
		})
	}

	const _podeFechar = () => {
		onExited(state.dialogHistory)
	}

	const _afterWriter = () => {
		let updateState = {}
		if( state.currentAnswer < state.answers.length-1 ) {
			updateState = {
				currentAnswer: state.currentAnswer + 1
			}
		} else {
			updateState = {
				currentAnswer: null,
				answers: null
			}
		}

		setState({
			...state,
			dialogHistory: [
				...state.dialogHistory,
				{text: state.answers[state.currentAnswer]}
			],
			...updateState
		})

		if( callAfterWritterForEveryMsg || state.currentAnswer >= state.answers.length-1 )
			afterWriter()
	}

	const _convoChoiceClick = (convoChoosen) => {
		if( typeof(convoChoosen.answers) === "string" ) convoChoosen.answers = [convoChoosen.answers]
		setState( {
			...state,
			dialogHistory: [
				...state.dialogHistory,
				{text: convoChoosen.question, speaker: 'player'}
			],
			answers: convoChoosen.answers,
			currentAnswer: 0
		} )
		onConvoChoiceMade(convoChoosen)
	}

	return (
		<FullscreenOverlay shouldExit={state.querFechar} onClickClose={_querFechar} onReadyToExit={_podeFechar}>
			<div id="dialog-interact" className={state.querFechar ? "ExitAnim" : null}>
				<div id="dialogos">
					{showDialogHistory ? <DialogHistory dialogHistory={state.dialogHistory}/> : <div style={{flexGrow: '1'}} />}
					<div id='dialog-box' className={state.answers ? "alternative" : ""}>
						{state.answers ?
							<Writer text={state.answers[state.currentAnswer]}
								onWritten={_afterWriter}
								afterWrittenTime={waitAfterWritten}
								characterTime={msPerCharacter}
							/>
							:
							<Menu buttonList={convOptions}
								onButtonClick={_convoChoiceClick}
							/>
						}
					</div>
				</div>
				<DialogCharacter character={currentChar} feeling={charFeeling}/>
			</div>
			{children}
		</FullscreenOverlay>
	)
}

export default Conversa
