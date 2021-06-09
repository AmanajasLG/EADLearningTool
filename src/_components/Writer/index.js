import React from 'react'
import { useSelector } from 'react-redux'
/**
 * Componente para escrita de texto caracter a caracter
 *
 * @param  {Object} props
 * @param  {string} props.text				Texto a ser escrito caracter por caracter
 * @param  {number} props.characterTime		Delay, em milissegundos, entre cada caracter
 * @param  {() => void} props.onWritten		Callback para quando terminou de escrever
 * @param  {number} props.afterWrittenTime	Delay, em milissegundos, antes de avisar que terminou de escrever
 */

import sound from '../../sounds/writerLetter3.flac'
import parser from 'html-react-parser';
import {parse as mkd_parser} from 'marked';

const JSXindexer = (jsx, index) => {
	if( typeof(jsx) === 'string' ) {
		let result = jsx.substring(0, index);
		return [result, result.length];
	} else if(typeof(jsx) === 'object' && jsx.length > 1) {
		let used = 0;
		let result = "";
		for( let i = 0; i < jsx.length && used < index; i++) {
			let [tempResult, tempUsed] = JSXindexer(jsx[i], index-used);
			result += tempResult;
			used += tempUsed;
		}
		return [result, used];
	} else if(typeof(jsx) === 'object') {
		let children = jsx.props.children;
		let [result, used] = JSXindexer(children, index);
		return [ `<${jsx.type}>${result}</${jsx.type}>`, used];
	}
}


const Writer = ({text, characterTime, onWritten, afterWrittenTime, ...props}) => {
	const [state, setState] = React.useState({text: text, index: 0})
	const volume = useSelector( state => state.music.volume)

	React.useEffect( () => {
	if( text !== state.text )
		setState( () => ({text: text, index: 0}))
	}, [text, state.text] )

	React.useEffect( () => {
		let timeoutID
		if( state.index < state.text.length ) {
			timeoutID = setTimeout( () => {
				let audio = new Audio(sound)
				audio.volume = volume / 1000
				audio.play()
				setState({...state, index: state.index + 1})
			}, characterTime)
		}
		else
		{
			if(onWritten){
				if(afterWrittenTime > 0)
					timeoutID = setTimeout( onWritten, afterWrittenTime )
				else
					onWritten()
			}
		}

		return () => clearTimeout(timeoutID)
	// eslint-disable-next-line
	}, [state.index])

	return(
		<div id="Writer" {...props}>
			{/* { state.text.substring(0, state.index) } */}
			{ parser(JSXindexer(parser(mkd_parser(state.text)), state.index)[0]) }
		</div>
	)
}

export default Writer
