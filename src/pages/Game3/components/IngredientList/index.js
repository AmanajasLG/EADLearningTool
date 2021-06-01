import React from 'react'
import { ingredientsListBg } from '../../../../img'
import parse from "html-react-parser";
import marked from "marked";

import './index.scss'

const IngredientList = ({children}) => {
  return(
    <div className="ingredientList">
      <div style={{position: 'absolute', width: 400}}>
        {children}
      </div>
    </div>
  )
}
export default IngredientList
