import React from 'react'

const Counter = ({valueStyle, containerStyle, stretch, noLeft, noRight, value, list, leftIcon, rightIcon, onChange}) => {
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
    <div style={{display: 'flex', justifyContent: stretch ? 'space-between' : null, ...containerStyle}}>
      { !noLeft ? <button style={{padding: '1%', cursor: 'pointer', border: 'none'}} onClick={move(-1)}>{leftIcon? leftIcon : "<"}</button> : <div></div>}
        <div style={{textAlign: 'center', ...valueStyle}}>{list[state]}</div>
      { !noRight ? <button style={{padding: '1%', cursor: 'pointer', border: 'none'}} onClick={move(1)}>{rightIcon? rightIcon : ">"}</button> : <div></div>}
    </div>
  )
}

export default Counter
