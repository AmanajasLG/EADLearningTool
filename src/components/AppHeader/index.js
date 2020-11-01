import './index.css'
import React from 'react'

const AppHeader = ({pageInfo}) => {
	const [state, setState] = React.useState( {view: 'default', pageTitle: pageInfo.title, pageSubTitle: pageInfo.subTitle} );

	const clickProfile = () => {
		setState({...state, view: 'profile'});
		alert("Vc achou onde faz para abrir o seu perfil! \n\n Ending 3/15");
	}

	const clickHome = () => {
		setState({...state, view: 'home'});
		alert("Vc achou onde faz para voltar ao início! \n\n Ending 1/15");
	}

	const clickNotif = () => {
		setState({...state, view: 'notif'});
		alert("Vc achou onde faz para ver suas notificações! \n\n Ending 7/15");
	}

	const clickSettings = () => {
		setState({...state, view: 'settings'});
		alert("Vc achou onde faz para abrir suas configurações! \n\n Ending 8/15");
	}

	return(
		<header id="app-header">
			<div className="group-btns" id="left-btns">
				<div id="profilePic" onClick={clickProfile}>Foto</div>
				<div className="header-btn" id="home-btn" onClick={clickHome}>Home</div>
			</div>
			<div id="pageTitle">
				<div id="mainTitle">{state.pageTitle}</div>
				<div id="subTitle">{state.pageSubTitle}</div>
			</div>
			<div className="group-btns" id="right-btns">
				<div className="header-btn" id="notif-btn" onClick={clickNotif}>Notificações</div>
				<div className="header-btn" id="settings-btn" onClick={clickSettings}>Configurações</div>
			</div>
		</header>
	);
}

export default AppHeader