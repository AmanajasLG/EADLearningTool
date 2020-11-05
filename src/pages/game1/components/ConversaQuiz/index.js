import React from 'react'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';

const ConversaQuiz = ({handleSubmit, quizOptions}) => {
  const [state, setState] = React.useState(-1)
  return(
    <div>
      <div>Pop quiz: Material-UI is...</div>
      <div>
        {quizOptions.map( (option, index) =>
          <div  key={index}><Radio checked={index === state} value={index} onChange={ e => setState(e.target.value) }/>{option}</div>
        )}
      </div>
      <Button onClick={handleSubmit(state)} variant="outlined" color="primary" >
        Check Answer
      </Button>
    </div>
  )
}

export default ConversaQuiz
