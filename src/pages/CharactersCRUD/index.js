import React from 'react'

import { useDispatch, useSelector} from 'react-redux'
import { characterActions } from '../../_actions'

import CharacterData from './characterData'
import CreateCharacter from './createCharacter'

const CharactersCRUD = () => {
  const dispatch = useDispatch()
  const characters = useSelector( state => state.characters)

  React.useEffect(()=>{
    if(Object.keys(characters).length === 0){
      console.log('dispatching')
      dispatch(characterActions.getAll())
    }
  })

  return (
    <div>
      <div>Área de personagens</div>
      <CreateCharacter />
      <div>
        <div>All Characters:</div>
        <div>
          {characters.items && characters.items.length > 0 ?
            characters.items.map((character, index) =>
            <CharacterData data={character} key={index}/>
          ):null}
        </div>
      </div>
    </div>
  )
}

export default CharactersCRUD
