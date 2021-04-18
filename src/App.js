import './App.scss'
import AppHeader from './_components/AppHeader'
import Home from './pages/Home'
import Game1 from './pages/Game1'
import Game2 from './pages/Game2'
import Game3 from './pages/Game3'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import React from 'react'
import { useSelector } from 'react-redux'
import { PrivateRoute } from './_components/PrivateRoute'
// import { history } from './_helpers'
import Login from './pages/Login'
import UserSpace from './pages/UserSpace'
import UsersCRUD from './pages/UsersCRUD'
import Missions from './pages/Missions'
import CreateMission from './pages/CreateMission'
import Characters from './pages/Characters'
import Questions from './pages/Questions'
import Register from './pages/Register'
import Questionnaires from './pages/Questionnaires'
import PlaySessions from './pages/PlaySessions'
import GameContext from './pages/GameContext'
import { headerConstants } from './_constants'
import TestPage from './TestPage'
import rootUrl from './rootUrl'

const App = () => {

  let palette = "palette01"
  document.getElementsByTagName('html')[0].className = palette

  let gameMode = useSelector( state => state.header.state ) !== headerConstants.STATES.NORMAL;
  console.log('env:', process.env.NODE_ENV)
  console.log('rootUrl:', rootUrl)
  return (
    <div className={ "App" + (gameMode? " game-mode" : "")}>
      <Router basename={rootUrl}>
        <AppHeader props={{isLogged: useSelector(state => state.authentication.loggedIn)}} />
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route path={`/login`} component={Login} />
          <Route path={`${rootUrl}/register`} component={Register} />
          <PrivateRoute exact path={`${rootUrl}/game1/:id`} render={(props) => <GameContext {...props}><Game1 /></GameContext>} />
          <PrivateRoute exact path={`${rootUrl}/game2/:id`} render={(props) => <GameContext {...props}><Game2 /></GameContext>} />
          <PrivateRoute exact path={`${rootUrl}/game3/:id`} render={(props) => <GameContext {...props}><Game3 /></GameContext>} />
          <PrivateRoute exact path={`${rootUrl}/test`} component={TestPage} />
          <PrivateRoute exact path={`${rootUrl}/userspace`} component={UserSpace} />
          <PrivateRoute exact path={`${rootUrl}/missions`} component={Missions} />
          <PrivateRoute exact path={`${rootUrl}/questions`} component={Questions} />
          <PrivateRoute exact path={`${rootUrl}/questionnaires`} component={Questionnaires} />
          <PrivateRoute exact path={`${rootUrl}/missions/create`} component={CreateMission} />
          <PrivateRoute exact path={`${rootUrl}/missions/edit/:game/:id`} component={CreateMission} />
          <PrivateRoute exact path={`${rootUrl}/characters`} component={Characters} />
          <PrivateRoute exact path={`${rootUrl}/users`} component={UsersCRUD} />
          <PrivateRoute exact path={`${rootUrl}/playSessions`} component={PlaySessions}/>
        </Switch>
      </Router>

    </div>
  );
}
export default App;

/*
return (
  <div>
    {/* { alert.message &&
      <div className={`alert ${alert.type}`}>{alert.message}</div>
    })
*/
