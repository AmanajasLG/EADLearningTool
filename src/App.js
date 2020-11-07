
import './App.scss'
import AppHeader from './_components/AppHeader'
import Home from './pages/Home'
import Game from './pages/game1/Game'

import {
  Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PrivateRoute } from './_components/PrivateRoute'
import { Login } from './pages/Login'
import { history } from './_helpers'
import { alertActions } from './_actions'

function App() {
  const alert = useSelector(state => state.alert)
  const dispatch = useDispatch()

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear())
    })
  }, [])

  let palette = "palette06"

  return (
    <div className={"App " + palette}>
      { alert.message &&
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      }
      <Router history={history}>
        {/* <header className="App-header"></header> */}
          {/* <Logo /> */}
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/game"><Game /></PrivateRoute>
          <Route exact path="/"><Home /></Route>
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
