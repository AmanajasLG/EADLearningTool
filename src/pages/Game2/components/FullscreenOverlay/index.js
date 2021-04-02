import React from 'react'

import './index.scss'

/**
 * Cria um novo contexto de renderização de página inteira com fundo branco semitransparente
 * @param  {Object} props
 * @param  {Object | Object[]} props.children		Elementos a serem renderizados
 * @param  {boolean} [props.showCloseBtn]			Devo mostrar o botão de fechar?
 * @param  {boolean} [props.shouldExit]				Devo fechar? Se verdadeiro, inicia animação de fechamento
 * @param  {() => void} [props.onClickClose]		Callback para quando clicam no botão de fechar
 * @param  {(event) => void} [props.onReadyToExit]	Callback para quando terminei de fechar
 * @param  {number} [props.bgOpacity]				Opacidade (de 0 a 1) do fundo branco desse novo contexto
 */
const FullscreenOverlay = ({
		children,
		showCloseBtn = true,
		shouldExit = false,
		onClickClose,
		onReadyToExit,
		bgOpacity = 0.73
	}) => {

	if( showCloseBtn && onClickClose == null ) throw Error("Invalid callback for click on close button.")
	if( shouldExit && onReadyToExit == null ) throw Error("Invalid callback for when finishing the exit animation.")

	const _readyToExit = (event) => {
		if ( event.target === event.currentTarget ) onReadyToExit(event)
	}

	return (
		<div id="fullscreen-overlay"
			 className={shouldExit ? "ExitAnim" : null}
			 onAnimationEnd={shouldExit ? _readyToExit : null}
			 style={{'--bgOpacity': bgOpacity}}
		>
			{children}
			{showCloseBtn && <div id="fullscreen-overlay-close-btn" onClick={onClickClose}><span>×</span></div>}
		</div>
	)
}

export default FullscreenOverlay
