import React from 'react'

const Character = ({character}) => {
  return(
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div>
        <span>{character.name}</span> <span>{character.civilState}</span> <span>{character.job}</span>
      </div>
      {/*
      <div>
        Character_assets:
          {character.character_assets && character.character_assets.length > 0 ?
            character.character_assets.map((character_asset, index) =>
            <div key={index}>
              <div>Layer: {character_asset.layerDepth}</div>
              <img src={`${baseURL}${character_asset.image[0].url}`} alt={character_asset.name}/>
            </div>
          ):'nenhum'}
      </div>
      
      <Button onClick={() => setEdit(true) }><EditIcon /></Button>
      <Button onClick={() => dispatch(characterActions.delete(character.id)) }><DeleteIcon /></Button>
      */}
    </div>
  )
}

export default Character
