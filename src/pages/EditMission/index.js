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
  const [locationList, setLocationList] = React.useState(mission.locations)
  const characters = useSelector(state => state.characters)
  const locations = useSelector(state => state.locations)

  const addToMission = (character) => () => {
    setCharList([...charList, character])
  }

  const removeFromMission = (character) => () => {
    setCharList(charList.filter( c => c.id !== character.id) )
  }

  const addLocationToMission = (location) => () => {
    setLocationList([...locationList, location])
  }

  const removeLocationFromMission = (location) => () => {
    setLocationList(locationList.filter( l => l.id !== location.id) )
  }

  const onClick = () => {
    let newState = {
      id: state.id,
      name: state.name,
      description: state.description
    }
    newState.characters = charList.reduce((acc, character) => [...acc, character.id], [] )
    newState.locations = locationList.reduce((acc, location) => [...acc, location.id], [] )
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

      <div>
        <div>Locais na missão:</div>
        {locationList.map((location, index) =>
          <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
            <Button onClick={removeLocationFromMission(location)}><RemoveIcon /></Button>
            <div>{location.name}</div>
          </div>
        )}
      </div>

      <div>
        <div>Locais disponíveis</div>
        {locations.items && locations.items.length > 0 && locations.items
          .filter( location => !locationList.find( l => l.id === location.id ) )
          .map( (location, index) =>
          <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
            <Button onClick={addLocationToMission(location)}>
              <AddIcon />
            </Button>
            <div>{location.name}</div>
          </div>
        )}
      </div>

      <Button onClick={onClick}><DoneIcon/></Button>
    </div>
  )
}

export default EditMission
