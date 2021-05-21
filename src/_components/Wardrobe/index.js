import React from 'react'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'

const Wardrobe = ({clothes, onClothesClick}) => {
  const [state, setState] = React.useState(0)
  return(
    <div>
      <Tabs value={state} onChange={(e, value) => setState(value)}>
        <Tab label="Head"></Tab>
        <Tab label="Top"></Tab>
        <Tab label="Bottom"></Tab>
        <Tab label="Shoes"></Tab>
      </Tabs>
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
