import Menu from '../Menu'
import React from 'react'
import DialogCharacter from '../DialogCharacter'
import DialogHistory from '../DialogHistory'
import FullscreenOverlay from '../FullscreenOverlay'
import Writer from '../Writer'

import './index.scss'

/**
 * Elemento para renderização de uma conversa com algum NPC, estilo graphic novel.
 * 
 * @param  {Object} props
 * @param  {Object | Object[]} [props.children]
 *			Elementos extras a serem renderizados no mesmo contexto
 * @param  {boolean} [props.shouldExit]
 *			Devo fechar? Se verdadeiro, inicia animação de fechamento
 * @param  {boolean} [props.showDialogHistory]
 *			O histórico da conversa deve ser mostrado?
 * @param  {(dialogHistory)=>void} [props.onClearDialogHistory]
 *			Enquanto este campo não for null, limparei meu histórico e chamarei esse callback a cada limpeza
 * @param  {boolean} [props.callAfterWritterForEveryMsg]
 *			Se verdadeiro, chamarei a callback afterWritter ao final de cada mensagem, mesmo no caso de múltiplas mensagens consecutivas
 * @param  {number} [props.msPerCharacter]
 *			Delay, em milissegundos, entre cada caracter da exibição da resposta
 * @param  {number} [props.waitAfterWritten]
 *			Delay, em milissegundos, ao final de cada mensagem escrita
 * @param  { {text:string, speaker?: string}[]} [props.prevDialogHistory]
 *			Histórico inicial da conversa
 * @param  {string | string[]} [props.charPreSpeech]
 *			Lista de falas a serem apresentadas antes de se dar a opção de escolha ao jogador
 * @param  {{question:string, answers:string[]}[]} props.convOptions
 *			Lista de opções para o jogador escolher (com suas respostas)
 * @param  {Object} [props.currentChar]
 *			Info do personagem a ser renderizado
 * @param  {Object} [props.charFeeling]
 *			Info de qual emoção o personagem deve ter
 * @param  {() => void} [props.afterWriter]
 *			Callback para quando as mensagems terminarem de ser enviadas
 * @param  {(dialogHistory:{text:string, speaker?:string}[]) => void} [props.onExited]
 *			Callback para quando se sair do diálogo. Envia todo o histórico de mensagens enviadas até o momento
 * @param  {(convoChoosen) => void} [props.onConvoChoiceMade]
 *			Callback sobre qual alternativa foi escolhida. Envia a convOption escolhida
 */
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

	// if( charPreSpeech !== null && charPreSpeech.length > 0 ) {
	// 	state.currentAnswer = 0
	// 	state.answers = typeof(charPreSpeech) === "string" ? [charPreSpeech] : charPreSpeech
	// 	charPreSpeech = null
	// }

	// * UNDEFINED BEHAVIOR caso alguém mude o charPreSpeech desse componente enquanto o writer faz algo
	React.useEffect( () => {
		if( charPreSpeech !== null && charPreSpeech.length > 0 ) {
			// state.currentAnswer = 0
			// state.answers = typeof(charPreSpeech) === "string" ? [charPreSpeech] : charPreSpeech
			// console.log('effect', state.answers)
			setState({
				...state,
				currentAnswer: 0,
				answers: typeof(charPreSpeech) === "string" ? [charPreSpeech] : charPreSpeech
			})
		}
		// eslint-disable-next-line
	}, [charPreSpeech])
	
	// * UNDEFINED BEHAVIOR caso alguém mande limpar enquanto o writer faz algo
	React.useEffect(() => {
		if( onClearDialogHistory ) {
			onClearDialogHistory(state.dialogHistory)
			state.dialogHistory = []
		}
		// eslint-disable-next-line
	}, [onClearDialogHistory])
	
	React.useEffect( () => {
		setState({...state, querFechar: shouldExit})
		// eslint-disable-next-line
	}, [shouldExit])

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
		if( state.currentAnswer < state.answers.length - 1 ) {
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
			...updateState,
			dialogHistory: [
				...state.dialogHistory,
				{text: state.answers[state.currentAnswer]}
			],
		})

		if( callAfterWritterForEveryMsg || state.currentAnswer >= state.answers.length - 1 )
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
		})

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
