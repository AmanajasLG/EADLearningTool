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
		msPerCharacter = 50,
		waitAfterWritten = 2000,
		prevDialogHistory = [],
		convOptions = [],
		currentChar = null,
		charFeeling = null,
		afterWriter = () => {},
		onExited = (dialogHistory) => {},
		onConvoChoiceMade = (answer) => {},
	}) => {

	const [state, setState] = React.useState({
		querFechar: shouldExit,
		showAnswer: null,
		dialogHistory: prevDialogHistory
	});

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
		setState({
			...state,
			dialogHistory: [
				...state.dialogHistory,
				{text: state.showAnswer}
			],
			showAnswer: null,
		})
		afterWriter()
	}

	const _convoChoiceClick = (answer) => {
		setState( {
			...state,
			dialogHistory: [
				...state.dialogHistory,
				{text: answer.question, speaker: 'player'}
			],
			showAnswer: answer.answer
		} )
		onConvoChoiceMade(answer)
	}

	return (
		<FullscreenOverlay shouldExit={state.querFechar} onClickClose={_querFechar} onReadyToExit={_podeFechar}>
			<div id="dialog-interact" className={state.querFechar ? "ExitAnim" : null}>
				<div id="dialogos">
					{showDialogHistory ? <DialogHistory dialogHistory={state.dialogHistory}/> : <div style={{flexGrow: '1'}} />}
					<div id='dialog-box' className={state.showAnswer ? "alternative" : ""}>
						{state.showAnswer ?
							<Writer text={state.showAnswer}
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
