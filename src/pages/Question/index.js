import React from 'react'

const Question = ({question}) => {
  console.log(question)
  return(
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <span>{question.question}</span> <span>{question.correct.toString()}</span>
    </div>
  )
}

export default Question
