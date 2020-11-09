
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
import { alertActions } from './_actions'
import { history } from './_helpers'
import { Login } from './pages/Login'
import UserSpace from './pages/UserSpace'
function App() {
  const dispatch = useDispatch()


  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear())
    })
  }, [])

  let palette = "palette06"
  console.log()
  return (
    <div className={"App " + palette}>
      { alert.message &&
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      }
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/game"><Game /></PrivateRoute>
          <PrivateRoute exact path="/userspace"><UserSpace /></PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}
/*
          <Redirect from="*" to="/login" />
*/
export default App;
