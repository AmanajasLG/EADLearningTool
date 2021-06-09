import React from 'react'

const Places = ({value, places, onPlaceClick, onConfirm}) => {
  const [state, setState] = React.useState(value)
  const onClick = index => () => {
    setState(index)
    if(onPlaceClick)
      onPlaceClick(index)
  }
  return(
    <div style={{backgroundColor: '#ffffaa'}}>
    {places && places.map((place, index) =>
      <div key={index} style={{backgroundColor: index === state? '#99ddff':'#ffdd99', width: '10%',  borderRadius: '50%'}}>
        <img style={{cursor: 'pointer'}} onClick={onClick(index)} src="https://res.cloudinary.com/learning-tool/image/upload/v1622937768/Leite_De_Vaca_c1fb94405c.svg"/>
      </div>
    )}
    {state !== -1 &&
      <button onClick={onConfirm}>Confirmar local</button>
    }
    </div>
  )
}

export default Places
