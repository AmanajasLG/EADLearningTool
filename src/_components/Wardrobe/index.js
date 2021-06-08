import React from 'react'

// import Tabs from '@material-ui/core/Tabs'
// import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'

const Wardrobe = ({clothes, onClothesClick, ...props}) => {
  const [state, setState] = React.useState(0)
  const labels = ["Head", "Top", "Bottom", "Shoes"]

  return(
    <div {...props}>
      <div style={{display: 'flex', flexDirection: 'row', backgroundColor: '#ffcca9', justifyContent: 'space-around'}}>
        {labels.map((label, index) =>
          <Button key={index} onClick={() => setState(index)}
            style={{flex: '1 0 0px', backgroundColor: (state === index ? '#ffcca9' : 'white') }}
          >
            {label}
          </Button>
        )}
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '25% 25% 25% 25%', gridTemplateRows: '20% 20% 20%', rowGap: '10%', padding: '5%', backgroundColor: '#ffcca9'}}>
        {clothes.filter( item => item.type === state)
        .map((item, index) =>
          <div style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
            <img key={index} style={{cursor: 'pointer', height: '100%', margin: '0 auto', display: 'block'}} onClick={onClothesClick(item)}
              src={item.image} alt={item.name}/>
          </div>
        )}
      </div>
    </div>
  )
}

export default Wardrobe
