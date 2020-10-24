
import './App.css'
import Game1 from './components/pages/game_1/pages/page1'
import Logo from './components/Logo'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <Game1 />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React YAY
        </a>
      </header>
    </div>
  );
}

export default App;
