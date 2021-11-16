import React from 'react'

import './index.scss'

/**
 * Cria um novo contexto de renderização de página inteira com fundo branco semitransparente
 * @param  {Object} props
 * @param  {Object | Object[]} props.children							Elementos a serem renderizados
 * @param  {boolean} [props.showCloseBtn]								Devo mostrar o botão de fechar?
 * @param  {boolean} [props.shouldExit]									Devo fechar? Se verdadeiro, inicia animação de fechamento
 * @param  {() => void} [props.onClickClose]							Callback para quando clicam no botão de fechar
 * @param  {(event) => void} [props.onReadyToExit]						Callback para quando terminei de fechar
 * @param  {{r:number, g:number, b:number, a:number}} [props.bgRGBA]	Cor (formato da função rgba()) do fundo desse novo contexto. default é r:255, g:255, b:255, a:0.73
 * @param  {{r:number, g:number, b:number}} [props.closeRGB]			Cor (formato da função rgba()) do botão de fechar desse novo contexto. default é r:255, g:255, b:255, a:0.73
 * @param  {{r:number, g:number, b:number}} [props.closeHoverRGB]		Cor (formato da função rgba()) do botão de fechar quanto em hover desse novo contexto. default é r:255, g:255, b:255, a:0.73
 */
const FullscreenOverlay = ({
		children,
		showCloseBtn = true,
		shouldExit = false,
		onClickClose,
		onReadyToExit,
		bgRGBA = {},
		closeRGB = {},
		closeHoverRGB = {},
		style = {}
	}) => {

	if( showCloseBtn && onClickClose == null ) throw Error("Invalid callback for onClickClose prop button.")
	if( shouldExit && onReadyToExit == null ) throw Error("Invalid callback for when finishing the exit animation.")

	const _readyToExit = (event) => {
		if ( event.target === event.currentTarget ) onReadyToExit(event)
	}

	return (
		<div id="fullscreen-overlay"
			 className={shouldExit ? "ExitAnim" : null}
			 onAnimationEnd={shouldExit ? _readyToExit : null}
			 style={{...style, '--bgR': bgRGBA.r ?? 255, '--bgG': bgRGBA.g ?? 255, '--bgB': bgRGBA.b ?? 255, '--bgA': bgRGBA.a ?? 0.73}}
		>
			{children}
			{showCloseBtn &&
				<div
					id="fullscreen-overlay-close-btn"
					onClick={onClickClose}
					style={{
						'--closeR': closeRGB.r ?? 89,
						'--closeG': closeRGB.g ?? 49,
						'--closeB': closeRGB.b ?? 109,
						'--closeHoverR': closeHoverRGB.r ?? 249,
						'--closeHoverG': closeHoverRGB.g ?? 175,
						'--closeHoverB': closeHoverRGB.b ?? 161
					}}
				>
					<span>×</span>
				</div>
			}
		</div>
	)
}

export default FullscreenOverlay
