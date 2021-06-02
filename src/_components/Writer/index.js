import React from 'react'
/**
 * Componente para escrita de texto caracter a caracter
 *
 * @param  {Object} props
 * @param  {string} props.text				Texto a ser escrito caracter por caracter
 * @param  {number} props.characterTime		Delay, em milissegundos, entre cada caracter
 * @param  {() => void} props.onWritten		Callback para quando terminou de escrever
 * @param  {number} props.afterWrittenTime	Delay, em milissegundos, antes de avisar que terminou de escrever
 */
const Writer = ({text, characterTime, onWritten, afterWrittenTime, ...props}) => {
	const [state, setState] = React.useState({text: text, index: 0})

	React.useEffect( () => {
	if( text !== state.text )
		setState( () => ({text: text, index: 0}))
	}, [text, state.text] )

	React.useEffect( () => {
		let timeoutID
		if( state.index < state.text.length ) {
			timeoutID = setTimeout( () => { setState({...state, index: state.index + 1}) }, characterTime)
		} else {
			timeoutID = setTimeout( onWritten, afterWrittenTime )
		}
		return () => {clearTimeout(timeoutID)}
	})

	return(
		<div id="Writer" {...props}>
			{ state.text.substring(0, state.index) }
		</div>
	)
}

export default Writer
