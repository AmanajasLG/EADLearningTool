import React from 'react'

import { useDispatch, useSelector} from 'react-redux'
import { apiActions } from '../../_actions'

import Character from '../Character'
import CreateCharacter from '../CreateCharacter'

const Characters = ({onAdd}) => {
  const { characterActions } = apiActions
  const [createCharacter, setCreateCharacter] = React.useState(false)
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
      <button onClick={() => setCreateCharacter(!createCharacter)}>{createCharacter? 'Cancelar' : 'Criar personagem'} </button>
      { createCharacter && <CreateCharacter /> }
      <div>
        <div>All Characters:</div>
        <div>
          <span>Nome</span> <span>Estado civil</span> <span>Trabalho</span>
        </div>
        <div>
          {characters.items && characters.items.length > 0 ?
            characters.items.map((character, index) =>
            <div key={index}>
              <button onClick={onAdd(character.id)}>Adicionar a missão</button>
              <Character data={character}/>
            </div>
          ):null}
        </div>
      </div>
    </div>
  )
}

export default Characters
