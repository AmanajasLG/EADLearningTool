import React from 'react'

const Counter = ({value, onChange}) => {
  const [state, setState] = React.useState(value && value > 1 ? value : 1)

  const decrement = () => { if(state > 1){ setState(state - 1); if(onChange) onChange(state - 1)} }
  const increment = () => { if(state < 9){ setState(state + 1); if(onChange) onChange(state + 1)} }

  return(
    <div>
      <button onClick={decrement}>{"<"}</button>{state}<button onClick={increment}>{">"}</button>
    </div>
  )
}

export default Counter
