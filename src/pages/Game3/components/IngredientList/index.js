import React from 'react'
// import { ingredientsListBg } from '../../../../img'
// import parse from "html-react-parser";
// import marked from "marked";

import './index.scss'

const IngredientList = ({children, ...props}) => {
  return(
    <div className="ingredientList" {...props}>
      <div style={{position: 'absolute', fontSize: '1.2em'}}>
        {children}
      </div>
    </div>
  )
}
export default IngredientList
