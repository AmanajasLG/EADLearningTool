import React from 'react'
import Phone from './components/Phone'
import PhoneButton from './components/PhoneButton'
import Character from '../Game2/components/Character'

const Game2 = () => {
  const [state, setState] = React.useState({phoneOpened: false})
  return(
    <div>

      {!state.phoneOpened && <PhoneButton onClick={() => setState({...state, phoneOpened: true})}/> }
      {state.phoneOpened && <Phone onClose={() => setState({...state, phoneOpened: false})} /> }
    </div>
  )
}

export default Game2
