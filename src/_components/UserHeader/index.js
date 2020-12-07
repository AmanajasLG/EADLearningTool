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
				<div id="profilePic" onClick={clickProfile}><i class="ic">face</i></div>
				<div className="header-btn" id="home-btn" onClick={clickHome}><i class="ic">home</i></div>
			</div>
			<div id="pageTitle">
				<div id="mainTitle" class="center">{state.pageTitle}</div>
				<div id="subTitle" class="center">{state.pageSubTitle}</div>
			</div>
			<div className="group-btns" id="right-btns">
				<div className="header-btn" id="notif-btn" onClick={clickNotif}><i class="ic">notification_important</i></div>
				<div className="header-btn" id="settings-btn" onClick={clickSettings}><i class="ic">settings</i></div>
				<div className="header-btn" id="settings-btn" onClick={() => {dispatch(logout())}}><i class="ic">exit_to_app</i></div>
			</div>
		</header>
    )
}

export default UserHeader