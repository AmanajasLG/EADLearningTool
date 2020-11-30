import React from 'react'

const Character = ({character}) => {
  console.log('character:', character)
  const getAnswer = (qId) => {
    if(!character.answers) return ''

    let a = character.answers.find( answer => answer.question.id === qId)
    return a ? a.answer : ''
  }
  return(
    <div>
      <div>
        <span>{character.name}</span> <span>{character.civilState}</span> <span>{character.job}</span>
      </div>
      <div>
        <div> Missões que participa: </div>
        {character.missions && character.missions.map((mission, index)=>
          <div key={index}>
            <div>{index+1}: {mission.name}</div>
            {mission.questions.map((question, qIndex) =>
              <div key={qIndex}>
                <div>Pergunta: {question.question}</div>
                <div>Resposta: {getAnswer(question.id)}</div>
              </div>
            )}
          </div>
        )}
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
