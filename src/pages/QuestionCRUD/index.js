import React from 'react'

import { useDispatch, useSelector} from 'react-redux'
import { apiActions } from '../../_actions'

import QuestionData from './questionData'
import CreateQuestion from './createQuestion'

const QuestionsCRUD = () => {
  const questionsActions = apiActions.questionsActions
  const [createQuestion, setCreateQuestion] = React.useState(false)
  const dispatch = useDispatch()
  const questions = useSelector( state => state.questions)

  React.useEffect(()=>{
    dispatch(questionsActions.getAll())
  }, [])

  console.log(questions)

  return (
    <div>
      <div>Questions</div>
      <button onClick={() => setCreateQuestion(!createQuestion)}>{createQuestion? 'Cancel' : 'Create Question'} </button>
      { createQuestion && <CreateQuestion /> }
      <div>
        <div>All questions:</div>
        <div>
          <span>Question</span> <span>Order</span>
        </div>
        <div>
          {questions.items && questions.items.length > 0 ?
            questions.items.map((character, index) =>
            <QuestionData data={character} key={index}/>
          ):null}
        </div>
      </div>
    </div>
  )
}

export default QuestionsCRUD
