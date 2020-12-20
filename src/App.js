
import './App.scss'
import AppHeader from './_components/AppHeader'
import Home from './pages/Home'
import Game from './pages/game1/Game'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import React from 'react'
import { useSelector } from 'react-redux'
import { PrivateRoute } from './_components/PrivateRoute'
// import { alertActions, userActions } from './_actions'
// import { history } from './_helpers'
import Login from './pages/Login'
import UserSpace from './pages/UserSpace'
import UsersCRUD from './pages/UsersCRUD'
import Missions from './pages/Missions'
import CreateMission from './pages/CreateMission'
import Characters from './pages/Characters'
import Questions from './pages/Questions'
import Register from './pages/Register'

const App = () => {
  // const dispatch = useDispatch()

  let palette = "palette01"
  document.getElementsByTagName('html')[0].className = palette
  return (
    <div className="App">
      {/* { alert.message &&
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      }       */}
      <Router>
        <AppHeader props={{isLogged: useSelector(state => state.authentication.loggedIn),title: 'Teste com um nome bem grande', subTitle: 'Teste com outro nome grande'}} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/EADLearningTool" component={Home}/>
          <PrivateRoute exact path="/game/:id" component={Game} />
          <PrivateRoute exact path="/userspace" component={UserSpace} />
          <PrivateRoute exact path="/missions" component={Missions} />
          <PrivateRoute exact path="/questions" component={Questions} />
          <PrivateRoute exact path="/missions/create" component={CreateMission} />
          <PrivateRoute exact path="/missions/edit/:id" component={CreateMission} />
          <PrivateRoute exact path="/characters" component={Characters} />
          <PrivateRoute exact path="/users" component={UsersCRUD} />
        </Switch>
      </Router>

    </div>
  );
}
/*
          <Redirect from="*" to="/login" />
*/
export default App;
