import React from 'react'
import { useDispatch } from 'react-redux'
import _ from 'lodash'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'

import { apiActions } from '../../_actions'
import { baseURL } from '../../_services'

const EditCharacter = ({character, onDone}) => {
  const { charactersActions } = apiActions
  const [state, setState] = React.useState({
    name: character.name,
    job: character.job ? character.job : '',
    id: character.id,
    answers: character.answers ? [...character.answers] : []
  })
  const dispatch = useDispatch()

  const editAnswer = (question, index) => e => {
    console.log('question:', question)
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
    console.log('a:', a)
    return a ? a.answer : ''
  }

  return(
    <div>
      <div>
        <input type='text' value={state.name} onChange={ e => setState({...state, name: e.target.value}) }/>
        <input type='text' value={state.job} onChange={ e => setState({...state, job: e.target.value}) } />
        <div>{character.civilState}</div>
        <div>
          <div>Missões que participa:</div>
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
          Resposta final:
          <input type='text' value={character.finalAnswer} onChange={e => setState({...state, finalAnswer: e.target.value})} placeholder='Resposta final'/>
        </div>
        <button onClick={onDone(state)}>Salvar</button>
      </div>
    </div>
  )
}
export default EditCharacter
