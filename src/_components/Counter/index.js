import React from 'react'
import ArrowLeftIcon from '@material-ui/icons/ArrowBack'
import ArrowRightIcon from '@material-ui/icons/ArrowForward'

const Counter = ({valueStyle, containerStyle, stretch, noLeft, noRight, value, list, arrowColor, onChange}) => {
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
    <div style={{display: 'flex', justifyContent: 'center', position: 'relative', ...containerStyle}}>
      { !noLeft &&
        <button style={{marginLeft: '2em', padding: '1%', cursor: 'pointer', border: 'none', position: 'absolute', left:0, height:'100%'}} onClick={move(-1)}>
          <ArrowLeftIcon fontSize="large" style={{color: arrowColor? arrowColor : '#000000'}}/>
        </button>
      }
        <div style={{textAlign: 'center', ...valueStyle}}>{list[state]}</div>
      { !noRight &&
        <button style={{marginRight: '2em', padding: '1%', cursor: 'pointer', border: 'none', position: 'absolute', right:0, height:'100%'}} onClick={move(1)}>
          <ArrowRightIcon fontSize="large" style={{color: arrowColor? arrowColor : '#000000'}}/>
        </button>
      }
    </div>
  )
}

export default Counter
