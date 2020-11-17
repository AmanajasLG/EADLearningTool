import React from 'react'
import { logout } from '../../_actions'
import { useDispatch } from 'react-redux'
import { useAlert } from 'react-alert';

const UserHeader = ({pageInfo}) => {
    const [state, setState] = React.useState( {view: 'default', pageTitle: pageInfo.title, pageSubTitle: pageInfo.subTitle} );
	const dispatch = useDispatch()
	const alert = useAlert()

	const clickProfile = () => {
		setState({...state, view: 'profile'});
		alert.show("Vc achou onde faz para abrir o seu perfil! \n\n Ending 3/15");
	}

	const clickHome = () => {
		setState({...state, view: 'home'});
		alert.show("Vc achou onde faz para voltar ao início! \n\n Ending 1/15");
	}

	const clickNotif = () => {
		setState({...state, view: 'notif'});
		alert.show("Vc achou onde faz para ver suas notificações! \n\n Ending 7/15");
	}

	const clickSettings = () => {
		setState({...state, view: 'settings'});
		alert.show("Vc achou onde faz para abrir suas configurações! \n\n Ending 8/15");
	}
	
    return (
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
				<div className="header-btn" id="settings-btn" onClick={() => {dispatch(logout())}}>Logout</div>
			</div>
		</header>
    )
}

export default UserHeader