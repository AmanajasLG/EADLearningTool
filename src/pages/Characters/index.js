import React from 'react'

import { useDispatch, useSelector} from 'react-redux'
import { apiActions } from '../../_actions'

import EditIcon from '@material-ui/icons/Edit'
import CancelIcon from '@material-ui/icons/Cancel'
import Button from '@material-ui/core/Button'

import Character from '../Character'
import CreateCharacter from '../CreateCharacter'
import EditCharacter from '../EditCharacter'

const Characters = ({onAdd}) => {
  const { charactersActions } = apiActions
  const [createCharacter, setCreateCharacter] = React.useState(false)
  const [edit, setEdit] = React.useState(-1)
  const dispatch = useDispatch()
  const characters = useSelector( state => state.characters)

  React.useEffect(()=>{
      dispatch(charactersActions.getAll())
  }, [])

  React.useEffect(()=>{
    setEdit(-1)
  }, [characters])

  return (
    <div>
      <h1>Área de personagens</h1>
      <button onClick={() => setCreateCharacter(!createCharacter)}>{createCharacter? 'Cancelar' : 'Criar personagem'} </button>
      { createCharacter && <CreateCharacter /> }
      <div class="margin-top">
        <h2>All Characters:</h2>
        <div>
          <span>Nome</span> <span>Estado civil</span> <span>Trabalho</span>
        </div>
        <div>
          {characters.items && characters.items.length > 0 ?
            characters.items.map((character, index) =>
            <React.Fragment key={index}>
              {edit === index ?
                <div>
                  <EditCharacter character={character} onDone={ state => () => dispatch(charactersActions.update(state))}/>
                  <Button onClick={ () => setEdit(-1) }><CancelIcon /></Button>
                </div>
                : <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Character character={character}/>
                    <Button onClick={ () => setEdit(index) }><EditIcon /></Button>
                  </div>
              }
              <br/>
            </React.Fragment>
          ):null}
        </div>
      </div>
    </div>
  )
}

export default Characters
