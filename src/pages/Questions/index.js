import React from 'react'

import { useDispatch, useSelector} from 'react-redux'
import { apiActions } from '../../_actions'

import Question from '../Question'
import CreateQuestion from '../CreateQuestion'

import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'


const Questions = ({onAdd}) => {
  const { questionsActions } = apiActions
  const [createQuestion, setCreateQuestion] = React.useState(false)
  const dispatch = useDispatch()
  const questions = useSelector( state => state.questions)

  React.useEffect(()=>{
    if(questions.items.length === 0)
      dispatch(questionsActions.getAll())
  }, [])

  const editQuestion = (question) => () => {

  }

  const deleteQuestion = (question) => () => dispatch(questionsActions.delete(question.id))

  return (
    <div>
      <div>Questions</div>
      <button onClick={() => setCreateQuestion(!createQuestion)}>{createQuestion? 'Cancelar' : 'Criar pergunta'} </button>
      { createQuestion && <CreateQuestion /> }
      <div>
        <div>All questions:</div>
        <div>
          <span>Question</span> <span>Correct</span>
        </div>
        <div>
          {questions.items.map((question, index) =>
            <div key={index}>
              <Question question={question}/>
              <Button onClick={editQuestion(question)}><EditIcon/></Button>
              <Button onClick={deleteQuestion(question)}><DeleteIcon/></Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Questions
