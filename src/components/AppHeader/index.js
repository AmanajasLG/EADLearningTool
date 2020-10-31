import './index.css'
import React from 'react'

const AppHeader = () => {
	const [state, setState] = React.useState( {} )

	return(
		<header id="app-header">
			<div className="group-btns" id="left-btns">
				<div id="profilePic">Foto</div>
				<div className="header-btn" id="home-btn">Home</div>
			</div>
			<div className="group-btns" id="right-btns">
				<div className="header-btn" id="notif-btn">Notificações</div>
				<div className="header-btn" id="settings-btn">Configurações</div>
			</div>
		</header>
	)
}

export default AppHeader