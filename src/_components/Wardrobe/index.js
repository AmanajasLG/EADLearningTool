import React from 'react'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'

const Wardrobe = ({clothes, onClothesClick, ...props}) => {
  const [state, setState] = React.useState(0)
  const labels = ["Head", "Top", "Bottom", "Shoes"]

  return(
    <div {...props}>
      <div>
        {labels.map((label, index) =>
          <button onClick={() => setState(index)}>{label}</button>
        )}
      </div>
      <div>
        {clothes.filter( item => item.type === state)
        .map((item, index) =>
            <Button key={index} onClick={onClothesClick(item)}>{item.name}</Button>
        )}
      </div>
    </div>
  )
}

export default Wardrobe
