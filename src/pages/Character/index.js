import React from 'react'
import { baseURL } from '../../_services'

const Character = ({character}) => {
  const getAnswer = (qId) => {
    let a = character.answers.find( answer => answer.question && answer.question.id === qId)
    return a ? a.answer : ''
  }
  return(
    <div style={{borderStyle: 'groove', borderRadius: 5}}>
      <div style={{borderStyle: 'groove', borderRadius: 5}}>
        <div>Name: {character.name}</div>
        <div>
          {character.characterAssets && character.characterAssets.length > 0 ?
            character.characterAssets.map((characterAsset, index) =>
              <div key={index}>
                <img src={`${characterAsset.link}`} alt={characterAsset.name}/>
              </div>
            ):'nenhum'
          }
          {character.characterAssets && <div>Layers: {character.characterAssets.length}</div>}
        </div>
        <div>Job: {character.job}</div>
        <div>Civil state: {character.civilState}</div>
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
        <div>Resposta final: {character.finalAnswer}</div>
      </div>
    </div>
  )
}

export default Character
