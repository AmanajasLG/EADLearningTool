import React from 'react'
import { useDispatch } from 'react-redux'
import { characterActions } from '../../_actions'
import { baseURL } from '../../_services'

const CharacterData = ({data}) => {
  const [state, setState] = React.useState({nome: data.nome, job: data.job || '', id: data.id})
  const [edit, setEdit] = React.useState(false)
  const dispatch = useDispatch()

  return(
    <div>
      {!edit?
        <div>
          <div>
            <span>{data.nome}</span> <span>{data.civilState}</span> <span>{data.job}</span>
          </div>
          <div>
            Character_assets:
              {data.character_assets && data.character_assets.length > 0 ?
                data.character_assets.map((character_asset, index) =>
                <div key={index}>
                  <div>Layer: {character_asset.layerDepth}</div>
                  <img src={`${baseURL}${character_asset.image[0].url}`} alt={character_asset.name}/>
                </div>
              ):'nenhum'}
          </div>
          <button onClick={() => setEdit(true) }>Editar</button>
          <button onClick={() => dispatch(characterActions.delete(data.id)) }>Delete</button>
        </div>
        :
        <div>
          <input type='text' value={state.nome} onChange={ e => setState({...state, nome: e.target.value}) }/>
          <input type='text' value={state.job} onChange={ e => setState({...state, job: e.target.value}) } />
          <div>{data.civilState}</div>
          <button onClick={() => dispatch(characterActions.update(state))}>Salvar</button>
        </div>
      }
    </div>
  )
}
export default CharacterData
