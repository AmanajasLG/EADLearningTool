import './App.scss'
import AppHeader from './_components/AppHeader'
import Home from './pages/Home'
import Game1 from './pages/Game1'
import Game2 from './pages/Game2'
import Game3 from './pages/Game3'
import Game4 from './pages/Game4'
import Game5 from './pages/Game5'
import Game6 from './pages/Game6'
import Game7 from './pages/Game7'
import Game8 from './pages/Game8'
import Game9 from './pages/Game9'
import Game10 from './pages/Game10'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
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
          <Redirect path={'/EADLearningTool'} to={'/userspace'}/>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/home'} component={Home} />
          <Route path={`/login`} component={Login} />
          <Route path={`/register`} component={Register} />
          <PrivateRoute exact path={`/game1/:id`} render={(props) => <GameContext {...props}><Game1 /></GameContext>} />
          <PrivateRoute exact path={`/game2/:id`} render={(props) => <GameContext {...props}><Game2 /></GameContext>} />
          <PrivateRoute exact path={`/game3/:id`} render={(props) => <GameContext {...props}><Game3 /></GameContext>} />
          <PrivateRoute exact path={`/game4/:id`} render={(props) => <GameContext {...props}><Game4 /></GameContext>} />
          <PrivateRoute exact path={`/game5/:id`} render={(props) => <GameContext {...props}><Game5 /></GameContext>} />
          <PrivateRoute exact path={`/game6/:id`} render={(props) => <GameContext {...props}><Game6 /></GameContext>} />
          <PrivateRoute exact path={`/game7/:id`} render={(props) => <GameContext {...props}><Game7 /></GameContext>} />
          <PrivateRoute exact path={`/game8/:id`} render={(props) => <GameContext {...props}><Game8 /></GameContext>} />
          <PrivateRoute exact path={`/game9/:id`} render={(props) => <GameContext {...props}><Game9 /></GameContext>} />
          <PrivateRoute exact path={`/game10/:id`} render={(props) => <GameContext {...props}><Game10 /></GameContext>} />
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
