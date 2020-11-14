
import './App.scss'
import AppHeader from './_components/AppHeader'
import Home from './pages/Home'
import Game from './pages/game1/Game'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PrivateRoute } from './_components/PrivateRoute'
import { alertActions, userActions } from './_actions'
import { history } from './_helpers'
import { Login } from './pages/Login'
import UserSpace from './pages/UserSpace'
import UsersCRUD from './pages/UsersCRUD'
import CharactersCRUD from './pages/CharactersCRUD'
import CreateMissionGame1 from './pages/CreateMission/Game1'

const App = () => {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   history.listen((location, action) => {
  //     dispatch(alertActions.clear())
  //   })
  // })

  let palette = "palette01"
  document.getElementsByTagName('html')[0].className = palette
  return (
    <div className="App">
      { alert.message &&
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      }      
      <Router>
        <AppHeader props={{isLogged: useSelector(state => state.authentication.loggedIn),title: 'Teste com um nome bem grande', subTitle: 'Teste com outro nome grande'}} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/EADLearningTool" component={Home}/>
          <PrivateRoute exact path="/game" component={Game} />
          <PrivateRoute exact path="/userspace" component={UserSpace} />
          <PrivateRoute exact path="/createMission1" component={CreateMissionGame1} />
          <PrivateRoute exact path="/users" component={UsersCRUD} />
          <PrivateRoute exact path="/characters" component={CharactersCRUD} />
        </Switch>
      </Router>
      
    </div>
  );
}
/*
          <Redirect from="*" to="/login" />
*/
export default App;
