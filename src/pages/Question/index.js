import React from 'react'

const Question = ({question}) => {
  return(
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div>
        <span>{question.question}</span> <span>{question.group}</span> <span>{question.corrent}</span>
      </div>
      {/*
      <div>
        question_assets:
          {question.question_assets && question.question_assets.length > 0 ?
            question.question_assets.map((question_asset, index) =>
            <div key={index}>
              <div>Layer: {question_asset.layerDepth}</div>
              <img src={`${baseURL}${question_asset.image[0].url}`} alt={question_asset.name}/>
            </div>
          ):'nenhum'}
      </div>
      
      <Button onClick={() => setEdit(true) }><EditIcon /></Button>
      <Button onClick={() => dispatch(questionActions.delete(question.id)) }><DeleteIcon /></Button>
      */}
    </div>
  )
}

export default Question
