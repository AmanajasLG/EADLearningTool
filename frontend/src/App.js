
import './App.css'
import Page1 from './components/pages/game_1/pages/page1'
import Logo from './components/Logo'
import Page2 from './components/pages/game_1/pages/page2'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Logo />
          <Switch>
            <Route path="/page1"><Page1 /></Route>
            <Route path="/page2"><Page2 /></Route>
          </Switch>
        </header>
      </Router>
    </div>
  );
}

export default App;
