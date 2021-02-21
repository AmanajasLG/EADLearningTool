import React from 'react'

import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';

const ConversaQuiz = ({handleSubmit, quizOptions}) => {
  const [state, setState] = React.useState(null)
  return(
    <div>
      <div>Pop quiz: Material-UI is...{state}</div>
      <div>
        {quizOptions.map( (option, index) =>
          <React.Fragment  key={index}>
            <Radio checked={index == state} value={index} onChange={ e => setState(e.target.value) }/>
            {option}
          </React.Fragment>
        )}
      </div>
      <Button onClick={handleSubmit(state)} variant="outlined" color="primary" >
        Check Answer
      </Button>
    </div>
  )
}

export default ConversaQuiz
