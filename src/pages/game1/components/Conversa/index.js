import React from 'react'
import Confirmation from '../Confirmation'
import './conversa.scss'

import Button from '@material-ui/core/Button'

const Conversa = ({character, endGame, handleSubmit, quizOptions, checkEnd, clearCurrentChar, close}) => {

  //Randomization
  let availableAnswers = character.answers.slice(0)
  let correct = availableAnswers.filter(answer => answer.question.correct)
  let ncorrect = availableAnswers.filter(answer => !answer.question.correct)
  let selectedQuestions = []
  while(selectedQuestions.length < 4){
    let source = selectedQuestions.length % 2 === 0? correct : ncorrect
    let index = Math.floor(Math.random(0, source.length))
    selectedQuestions.push( source[index] )
    source.splice(index, 1)
  }

  if(Math.floor(Math.random(0,1) < .5)){
    let temp = selectedQuestions[0]
    selectedQuestions[0] = selectedQuestions[1]
    selectedQuestions[1] = temp
  }
  if(Math.floor(Math.random(0, 1) > .5)){
    let temp = selectedQuestions[2]
    selectedQuestions[2] = selectedQuestions[3]
    selectedQuestions[3] = temp
  }

  const [state, setState] = React.useState({
    dialog:[],
    selectedQuestions: selectedQuestions,
    questionStep: 0,
    maxQuestionSteps: 2,
    correct: 0,
    ncorrect: 0
  })

  const selectOption = (option) => () => {
    setState({...state,
      dialog:[...state.dialog, option.question.question, option.answer],
      questionStep: state.questionStep + 1,
      correct: option.question.correct ? state.correct + 1 : state.correct,
      ncorrect: !option.question.correct ? state.ncorrect + 1 : state.ncorrect
    })
  }

  const onConfirmationYes = () => close()
  const onConfirmationNo = () => close()

  return (
    <div id="conversa">
      <Button onClick={close ? close : ()=>{}} >X</Button>
      <Button>É você!</Button>

      <div>
        {state.dialog.map((dialog, index) =>
          <div key={index}>{dialog}</div>
        )}
      </div>

      <div>
        {state.questionStep < state.maxQuestionSteps ?
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Button onClick={selectOption(selectedQuestions[state.questionStep * 2])}>
              {selectedQuestions[state.questionStep * 2].question.question}
            </Button>
            <Button onClick={selectOption(selectedQuestions[state.questionStep * 2 + 1])}>
              {selectedQuestions[state.questionStep * 2 + 1].question.question}
            </Button>
          </div>
          : null
        }
      </div>
      <div style={{width: 100}}>
        {<img src={character.characterAssets[1].image[0].url} alt="portrait" />}
        {<img src={character.characterAssets[2].image[0].url} alt="portrait" />}
      </div>

      {state.questionStep === 2 && <Confirmation onYes={onConfirmationYes} onNo={onConfirmationNo} />}
    </div>
  )
}

export default Conversa
