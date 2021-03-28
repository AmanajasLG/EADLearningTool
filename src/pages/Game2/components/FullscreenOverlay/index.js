import React from 'react'

import './index.scss'

const FullscreenOverlay = ({children, showCloseBtn = true, shouldExit = false, onClickClose, onReadyToExit}) => {

	if( showCloseBtn && onClickClose == null ) throw Error("Invalid callback for click on close button.")
	if( shouldExit && onReadyToExit == null ) throw Error("Invalid callback for when finishing the exit animation.")

	const _readyToExit = (event) => {
		if ( event.target === event.currentTarget ) onReadyToExit(event)
	}

	return (
		<div id="fullscreen-overlay"
			 className={shouldExit ? "ExitAnim" : null}
			 onAnimationEnd={shouldExit ? _readyToExit : null}
		>
			{children}
			{showCloseBtn && <div id="fullscreen-overlay-close-btn" onClick={onClickClose}><span>×</span></div>}
		</div>
	)
}

export default FullscreenOverlay
