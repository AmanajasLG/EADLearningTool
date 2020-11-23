import React from 'react'
import { useDispatch } from 'react-redux'
import { apiActions } from '../../_actions'

const QuestionData = ({data}) => {
  const { questionActions } = apiActions 
  const [state, setState] = React.useState({question: data.question, order: data.order, id: data.id})
  const [edit, setEdit] = React.useState(false)
  const dispatch = useDispatch()

  return(
    <div>
      {!edit?
        <div>
          <div>
            <span>{data.question}</span> <span>{data.order}</span>
          </div>
          <button onClick={() => setEdit(true) }>Edit</button>
          <button onClick={() => dispatch(questionActions.delete(data.id)) }>Delete</button>
        </div>
        :
        <div>
          <input type='text' value={state.question} onChange={ e => setState({...state, question: e.target.value}) }/>
          <input type='text' value={state.order} onChange={ e => setState({...state, order: e.target.value}) } />
          <button onClick={() => dispatch(questionActions.update(state))}>Update</button>
        </div>
      }
    </div>
  )
}
export default QuestionData
