import React from 'react'

import { useDispatch, useSelector} from 'react-redux'
import { apiActions } from '../../_actions'

import Question from '../Question'
import CreateQuestion from '../CreateQuestion'

const Questions = ({onAdd}) => {
  const { questionsActions } = apiActions
  const [createQuestion, setCreateQuestion] = React.useState(false)
  const dispatch = useDispatch()
  const questions = useSelector( state => state.questions)

  React.useEffect(()=>{
    if(Object.keys(questions).length === 0){
      console.log('dispatching')
      dispatch(questionsActions.getAll())
    }
  })

  return (
    <div>
      <div>Questions</div>
      <button onClick={() => setCreateQuestion(!createQuestion)}>{createQuestion? 'Cancelar' : 'Criar personagem'} </button>
      { createQuestion && <CreateQuestion /> }
      <div>
        <div>All questions:</div>
        <div>
          <span>Question</span> <span>Group</span> <span>Correct</span>
        </div>
        <div>
          {questions.items && questions.items.length > 0 ?
            questions.items.map((question, index) =>
            <div key={index}>
              <button onClick={onAdd(question.id)}>Adicionar a missão</button>
              <Question data={question}/>
            </div>
          ):null}
        </div>
      </div>
    </div>
  )
}

export default Questions
