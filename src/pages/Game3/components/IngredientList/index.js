import React from 'react'
import { ingredientsListBg } from '../../../../img'

import './index.scss'

const IngredientList = ({ingredientsList}) => {
  return(
    <div style={{
      backgroundImage: `url(${ingredientsListBg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 570, width: 570,
      paddingTop: 76, paddingLeft: 108,
      transformOrigin: 'center center',
      transform: `rotate(${21}deg)`,
      marginTop: 10
    }}>
      <div style={{position: 'absolute', width: 400}}>
        {ingredientsList.map((ingredient, index) => (
          <div className="ingredient" key={index}>
            <img className="ingredientImg" src={ingredient.image} alt="" />
            <span>{ingredient.description}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
export default IngredientList
