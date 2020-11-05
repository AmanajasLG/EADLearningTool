
import './App.scss'
import AppHeader from './components/AppHeader'
import Init from './components/pages/game1/pages/Init'
import Game from './components/pages/game1/pages/Game'
import Result from './components/pages/game1/pages/Result'

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
          <Route path="/EADLearningTool"><Init /></Route>
          <Route path="/init"><Init /></Route>
          <Route path="/game"><Game /></Route>
          <Route path="/result"><Result /></Route>
          <Route path="/"><Init /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
