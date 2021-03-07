import React from 'react'

import { useDispatch, useSelector} from 'react-redux'
import { apiActions } from '../../_actions'

import Questionnaire from '../Questionnaire'
// import CreateQuestionnaire from '../CreateQuestionnaire'

import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'


const Questionnaires = ({onAdd}) => {
  const { questionnairesActions } = apiActions
  const dispatch = useDispatch()
  const questionnaires = useSelector( state => state.questionnaires)

  React.useEffect(()=>{
    if(questionnaires.items.length === 0)
      dispatch(questionnairesActions.getAll())
  }, [dispatch, questionnairesActions, questionnaires.items.length])

  const editQuestionnaire = (questionnaire) => () => {

  }

  const deleteQuestionnaire = (questionnaire) => () => dispatch(questionnairesActions.delete(questionnaire.id))

  return (
    <div>
      <div>Questionnaires</div>
      {/* <button onClick={() => setCreateQuestionnaire(!createQuestionnaire)}>{createQuestionnaire? 'Cancel' : 'Create Questionnaire'} </button>
      { createQuestionnaire && <CreateQuestionnaire /> } */}
      <div>
        <div>All questionnaires:</div>
        <div>
          <span>Questionnaire</span>
        </div>
        <div>
          {questionnaires.items.map((questionnaire, index) =>
            <div key={index}>
              <Questionnaire questionnaire={questionnaire}/>
              <Button onClick={editQuestionnaire(questionnaire)}><EditIcon/></Button>
              <Button onClick={deleteQuestionnaire(questionnaire)}><DeleteIcon/></Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Questionnaires
