import React from 'react'

const Counter = ({value, list, onChange}) => {
  const [state, setState] = React.useState(value)

  const move = direction => () => {
    let next = state + direction
    if(next < 0) next = list.length - 1
    if(next >= list.length) next = 0

    setState(next);
    if(onChange) onChange(next)
  }

  return(
    <div>
      <button onClick={move(-1)}>{"<"}</button>{list[state]}<button onClick={move(1)}>{">"}</button>
    </div>
  )
}

export default Counter
