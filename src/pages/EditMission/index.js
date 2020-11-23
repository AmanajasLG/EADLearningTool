import React from 'react'

import { useSelector } from 'react-redux'

import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import DoneIcon from '@material-ui/icons/Done'

import Character from '../Character'

const EditMission = ({mission, onDone}) => {
  const [state, setState] = React.useState(mission)

  const [charList, setCharList] = React.useState(mission.characters)
  const characters = useSelector(state => state.characters)

  const addToMission = (character) => () => {
    setCharList([...charList, character])
  }

  const removeFromMission = (character) => () => {
    setCharList(charList.filter( c => c.id !== character.id) )
  }

  const onClick = () => {
    let newState = {
      id: state.id,
      name: state.name,
      description: state.description
    }
    newState.characters = charList.reduce((acc, character) => [...acc, character.id], [] )
    onDone(newState)
  }

  return (
    <div>
      <div>
        Nome: <input value={state.name} onChange={ e => setState({...state, name: e.target.value})} />
      </div>
      <div>
        Descrição: <input value={state.description} onChange={ e => setState({...state, description: e.target.value})} />
      </div>

      <div>
        <div>Personagens na missão:</div>
        {charList.map((character, index) =>
          <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
            <Button onClick={removeFromMission(character)}><RemoveIcon /></Button>
            <Character character={character}/>
          </div>
        )}
      </div>

      <div>
        <div>Personagens disponíveis</div>
        {characters.items && characters.items.length > 0 && characters.items
          .filter( character => !charList.find( c => c.id === character.id ) )
          .map( (character, index) =>
          <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
            <Button onClick={addToMission(character)}>
              <AddIcon />
            </Button>
            <Character character={character}/>
          </div>
        )}
      </div>

      <Button onClick={onClick}><DoneIcon/></Button>
    </div>
  )
}

export default EditMission
