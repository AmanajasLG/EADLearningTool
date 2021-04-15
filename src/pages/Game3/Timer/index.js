import React from 'react'

const zeroFill = (s, size) => {
  while(s.length < size){
    s = '0' + s
  }
  return s
}
const Timer = ({seconds, onEnd, onSecondPassed, run = true}) => {
  const [state, setState] = React.useState({seconds: seconds, timeout: null})
  const previousRef = React.useRef();

  React.useEffect(() => {
    if(state === previousRef.current && state.seconds != seconds){
      //console.log('external side effect update')***
      return
    }

    if(!run) return state.timeout ? () => clearTimeout(state.timeout) : null

    if(state.seconds === 0){
      if(onEnd) onEnd()
    }
    else if(state.seconds > 0)
    {
      previousRef.current = state
      let timeout = setTimeout(() =>
      {
        setState({seconds: state.seconds - 1, timeout: timeout})
        if(onSecondPassed) onSecondPassed(state.seconds - 1)
      }, 1000)

      return () => clearTimeout(state.timeout)
    }
  }, [state, onEnd, onSecondPassed, run])

  return(
    <div>
      {zeroFill(Math.floor(state.seconds / 60).toString(), 2)}:{zeroFill((state.seconds % 60).toString(), 2)}
    </div>
  )
}

export default Timer

/***
    Internal setState causes Timer component to update.
    onSecondPassed may cause an external setState, leading to an update which could reupdate Timer component.

    To prevent useEffect of entering the if statement responsable for setTimeout call, which leads to double that frame setTimeout callback,
    previous state is compared to the new state.

    In the first run, new state is in fact equal to current state.
    In this case, the entering seconds value is verified.
*/
