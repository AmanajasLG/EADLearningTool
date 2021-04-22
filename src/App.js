import './App.scss'
import AppHeader from './_components/AppHeader'
import Home from './pages/Home'
import Game1 from './pages/Game1'
import Game2 from './pages/Game2'
import Game3 from './pages/Game3'
import Game4 from './pages/Game4'

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
          <Route path={`/register`} component={Register} />
          <PrivateRoute exact path={`/game1/:id`} render={(props) => <GameContext {...props}><Game1 /></GameContext>} />
          <PrivateRoute exact path={`/game2/:id`} render={(props) => <GameContext {...props}><Game2 /></GameContext>} />
          <PrivateRoute exact path={`/game3/:id`} render={(props) => <GameContext {...props}><Game3 /></GameContext>} />
          <PrivateRoute exact path={`/game4/:id`} render={(props) => <GameContext {...props}><Game4 /></GameContext>} />
          <PrivateRoute exact path={`/test`} component={TestPage} />
          <PrivateRoute exact path={`/userspace`} component={UserSpace} />
          <PrivateRoute exact path={`/missions`} component={Missions} />
          <PrivateRoute exact path={`/questions`} component={Questions} />
          <PrivateRoute exact path={`/questionnaires`} component={Questionnaires} />
          <PrivateRoute exact path={`/missions/create`} component={CreateMission} />
          <PrivateRoute exact path={`/missions/edit/:game/:id`} component={CreateMission} />
          <PrivateRoute exact path={`/characters`} component={Characters} />
          <PrivateRoute exact path={`/users`} component={UsersCRUD} />
          <PrivateRoute exact path={`/playSessions`} component={PlaySessions}/>
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
