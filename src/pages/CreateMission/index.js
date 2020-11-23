import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Button from '@material-ui/core/Button'

import { characterActions } from '../../_actions'
import Character from '../Character'
import CreateCharacter from '../CreateCharacter'
import { apiActions } from '../../_actions'

const CreateMissionGame1 = () => {
  const [state, setState] = React.useState({
    name:'',
    description:''
  })
  const [charList, setCharList] = React.useState([])
  const [createCharacter, setCreateCharacter] = React.useState(false)

  const dispatch = useDispatch()
  const characters = useSelector( state => state.characters)
  const { missionActions, characterActions } = apiActions

  const createMission = () => {
    let data = {...state, characters: charList.reduce((acc,  item) => [...acc, item.id], [] ) }
    dispatch(missionActions.create(data))
  }

  const addToMission = (character) => () => {
    setCharList([...charList, character])
  }

  const removeFromMission = (character) => () => {
    setCharList(charList.filter(c => c.id !== character.id))
  }

  React.useEffect(()=>{
    if(Object.keys(characters).length === 0){
      console.log('dispatching')
      dispatch(characterActions.getAll())
    }
  })

  return(
    <div>
      <div>
        Nome da missão:
        <input type='text' value={state.name} onChange={e => setState({...state, name: e.target.value})} placeholder='Missão maneira'/>
      </div>
      <div>
        Texto da missão:
        <input type='text' value={state.description} onChange={e => setState({...state, description: e.target.value})} />
      </div>
      <Button onClick={createMission}>Criar Missão</Button>

      <div>
        <div>Personagens na missão:</div>
        {charList.map( ( character, index) =>
          <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
            <Button onClick={removeFromMission(character)}><RemoveIcon /></Button>
            <Character character={character}/>
          </div>
        )}
      </div>

      <div>
        <div>Personagens disponíveis</div>
        {characters.items && characters.items.length > 0 && characters.items
          .filter( character => !charList.find( c => c.id === character.id) )
          .map( (character, index) =>
          <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
            <Button onClick={addToMission(character)}>
              <AddIcon />
            </Button>
            <Character character={character}/>
          </div>
        )}
        <Button onClick={() => setCreateCharacter(!createCharacter)}>
          {createCharacter ? "Cancelar" : "Criar personagem"}
        </Button>
        {createCharacter && <CreateCharacter /> }
      </div>
    </div>
  )
}

export default CreateMissionGame1
