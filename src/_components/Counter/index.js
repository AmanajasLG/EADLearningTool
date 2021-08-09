import React from 'react'

const Counter = ({stretch, noLeft, noRight, value, list, onChange}) => {
  const [state, setState] = React.useState(value)

  React.useEffect(() => setState(value), [value])

  const move = direction => () => {
    let next = state + direction
    if(next < 0) next = list.length - 1
    if(next >= list.length) next = 0

    setState(next);
    if(onChange) onChange(next)
  }

  return(
    <div style={{display: 'flex', justifyContent: stretch ? 'space-between' : null}}>
      { !noLeft ? <button style={{padding: '1%', cursor: 'pointer', border: 'none'}}onClick={move(-1)}>{"<"}</button> : <div></div>}
        <div style={{textAlign: 'center'}}>{list[state]}</div>
      { !noRight ? <button style={{padding: '1%', cursor: 'pointer', border: 'none'}} onClick={move(1)}>{">"}</button> : <div></div>}
    </div>
  )
}

export default Counter
