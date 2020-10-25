
import './App.css'
import Init from './components/pages/game1/pages/Init'
import Game from './components/pages/game1/pages/Game'
import Result from './components/pages/game1/pages/Result'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          {/* <Logo /> */}
          <Switch>
            <Route path="/EADLearningTool"><Init /></Route>
            <Route path="/init"><Init /></Route>
            <Route path="/game"><Game /></Route>
            <Route path="/result"><Result /></Route>
            <Route path="/"><Init /></Route>
          </Switch>
        </header>
      </Router>
    </div>
  );
}

export default App;
