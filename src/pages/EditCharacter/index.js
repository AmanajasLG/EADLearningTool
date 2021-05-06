import React from 'react'
import _ from 'lodash'

const EditCharacter = ({character, onDone}) => {
  const [state, setState] = React.useState({
    name: character.name,
    job: character.job ? character.job : '',
    id: character.id,
    answers: character.answers ? [...character.answers] : []
  })

  const editAnswer = (question, index) => e => {
    let aQ = _.cloneDeep(character.answers.find( answer => answer.question && answer.question.id === question.id))

    let changedIndex = {...state.answers[index], answer: e.target.value}
    if(!aQ) changedIndex.question = question.id

    setState({
      ...state,
      answers: [
        ...state.answers.slice(0, index),
        changedIndex,
        ...state.answers.slice(index+1)
      ]
    })
  }
  const getAnswer = (qId) => {
    let a = state.answers.find( answer => answer.question && answer.question.id ? answer.question.id === qId : answer.question === qId)
    
    return a ? a.answer : ''
  }

  return(
    <div>
      <div>
        <div>
          Name:<input type='text' value={state.name} onChange={ e => setState({...state, name: e.target.value}) }/>
        </div>
        <div>
          Job:<input type='text' value={state.job} onChange={ e => setState({...state, job: e.target.value}) } />
        </div>
        <div>
          Country:<input type='text' value={state.country} onChange={ e => setState({...state, country: e.target.value}) } />
        </div>
        <div>{character.civilState}</div>
        <div>
          <div>JOGO 1 - Missões que participa:</div>
          {character.game_1_missions.map((mission, mIndex) =>
            <div key={mIndex}>
              <div>{mIndex+1}: {mission.name}</div>
              <div>
                {mission.questions.map( (question, qIndex) =>
                  <div key={qIndex}>
                    <div>{question.question}</div>
                    <input type='text' value={getAnswer(question.id)}
                      onChange={editAnswer(question, qIndex)} placeholder='Resposta'/>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div>
          <div>JOGO 2 - Missões que participa:</div>
          {character.missions.map((mission, mIndex) =>
            <div key={mIndex}>
              <div>{mIndex+1}: {mission.name}</div>
              <div>
                {mission.questions.map( (question, qIndex) =>
                  <div key={qIndex}>
                    <div>{question.question}</div>
                    <input type='text' value={getAnswer(question.id)}
                      onChange={editAnswer(question, qIndex)} placeholder='Resposta'/>
                  </div>
                )}
              </div>
            </div>
          )}
          <div>
            <div>
              Errou alguma opção:
            </div>
            <input type='text' value={character.wrongAnswer} onChange={e => setState({...state, wrongAnswer: e.target.value})} placeholder='Errou alguma'/>
          </div>
          <div>
            <div>
              Acertou o suficiente:
            </div>
            <input type='text' value={character.rightAnswer} onChange={e => setState({...state, rightAnswer: e.target.value})} placeholder='Acertou o suficiente'/>
          </div>
          <div>
            <div>
              Dica:
            </div>
            <input type='text' value={character.tip} onChange={e => setState({...state, tip: e.target.value})} placeholder='Dica'/>
          </div>
          <div>
            <div>
              Resposta da acusação:
            </div>
            <input type='text' value={character.acusationAnswer} onChange={e => setState({...state, acusationAnswer: e.target.value})} placeholder='Resposta à acusação'/>
          </div>
          <div>
            <div>
              Despedida:
            </div>
            <input type='text' value={character.endDialog} onChange={e => setState({...state, endDialog: e.target.value})} placeholder='Despedida'/>
          </div>
        </div>
        <button onClick={onDone(state)}>Salvar</button>
      </div>
    </div>
  )
}
export default EditCharacter
