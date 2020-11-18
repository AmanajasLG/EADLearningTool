import React from 'react'
import { userActions } from '../../_actions'
import { useDispatch } from 'react-redux'
import avatar from '../../img/avatar1.svg'
import home from '../../img/i-home.svg'
import notifications from '../../img/i-notification.svg'
import settings from '../../img/i-settings.svg'

const UserHeader = ({pageInfo}) => {

    const [state, setState] = React.useState( {view: 'default', pageTitle: pageInfo.title, pageSubTitle: pageInfo.subTitle} );
	const dispatch = useDispatch()

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

	const logout = () => {
		dispatch(userActions.logout())
	}

    return (
        <header id="app-header">
			<div className="group-btns" id="left-btns">
				<div id="profilePic" onClick={clickProfile}><img src={avatar} alt="Profile Picture"></img></div>
				<div className="header-btn" id="home-btn" onClick={clickHome}><img src={home} alt="Home"></img></div>
			</div>
			<div id="pageTitle">
				<div id="mainTitle">{state.pageTitle}</div>
				<div id="subTitle">{state.pageSubTitle}</div>
			</div>
			<div className="group-btns" id="right-btns">
				<div className="header-btn" id="notif-btn" onClick={clickNotif}><img src={notifications} alt="Notifications"></img></div>
				<div className="header-btn" id="settings-btn" onClick={clickSettings}><img src={settings} alt="Settings"></img></div>
				<div className="header-btn" id="settings-btn" onClick={logout}>Logout</div>
			</div>
		</header>
    )
}

export default UserHeader