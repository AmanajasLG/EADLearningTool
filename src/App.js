
import './App.scss'
import AppHeader from './components/AppHeader'
import Home from './pages/Home'
import Game from './pages/game1/Game'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

function App() {
  let palette = "palette06"
  return (
    <div className={"App " + palette}>
      <Router>
        {/* <header className="App-header"></header> */}
          {/* <Logo /> */}
        <AppHeader pageInfo={{title: 'Teste com um nome bem grande', subTitle: 'Teste com outro nome grande'}}/>
        <Switch>
          <Route path="/game"><Game /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
