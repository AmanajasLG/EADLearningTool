import React from 'react'
import { ingredientsListBg } from '../../../../img'
// import parse from "html-react-parser";
// import marked from "marked";

import './index.scss'

const IngredientList = ({children}) => {
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
        {children}
      </div>
    </div>
  )
}
export default IngredientList
