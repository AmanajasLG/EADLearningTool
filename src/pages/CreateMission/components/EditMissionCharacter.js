import React from 'react'
import _ from 'lodash'

const EditMissionCharacter = ({missionCharacter, onDone, questions, cancel}) => {

  const [state, setState] = React.useState({
    answers: missionCharacter.answers ? [...missionCharacter.answers] : []
  })

  const editAnswer = (question, index) => e => {
    console.log('question:', question)
    let aQ = _.cloneDeep(missionCharacter.answers.find( answer => answer.question && answer.question.id === question.id))

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
    console.log('a:', a)
    return a ? a.answer : ''
  }

  return(
    <div>
      <div>
        <div>
          <div>Answers:</div>
            {questions.map( (question, qIndex) =>
              <div key={qIndex}>
                <div>{question.question}</div>
                <input type='text' value={getAnswer(question.id)}
                  onChange={editAnswer(question, qIndex)} placeholder='Resposta'/>
              </div>
            )}  
          <div>
            <div>
              Errou alguma opção:
            </div>
            <input type='text' value={missionCharacter.wrongAnswer} onChange={e => setState({...state, wrongAnswer: e.target.value})} placeholder='Errou alguma'/>
          </div>
          <div>
            <div>
              Acertou o suficiente:
            </div>
            <input type='text' value={missionCharacter.rightAnswer} onChange={e => setState({...state, rightAnswer: e.target.value})} placeholder='Acertou o suficiente'/>
          </div>
          <div>
            <div>
              Dica:
            </div>
            <input type='text' value={missionCharacter.tip} onChange={e => setState({...state, tip: e.target.value})} placeholder='Dica'/>
          </div>
          <div>
            <div>
              Resposta da acusação certa:
            </div>
            <input type='text' value={missionCharacter.rightAcusationAnswer} onChange={e => setState({...state, rightAcusationAnswer: e.target.value})} placeholder='Resposta à acusação'/>
          </div>
          <div>
            <div>
              Resposta da acusação errada:
            </div>
            <input type='text' value={missionCharacter.wrongAcusationAnswer} onChange={e => setState({...state, wrongAcusationAnswer: e.target.value})} placeholder='Resposta à acusação'/>
          </div>
          <div>
            <div>
              Despedida:
            </div>
            <input type='text' value={missionCharacter.endDialog} onChange={e => setState({...state, endDialog: e.target.value})} placeholder='Despedida'/>
          </div>
        </div>
        <button onClick={onDone(state)}>Salvar</button>
        <button onClick={cancel()}>Cancel</button>
      </div>
    </div>
  )
}
export default EditMissionCharacter