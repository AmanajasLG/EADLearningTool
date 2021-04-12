import React from 'react'

const zeroFill = (s, size) => {
  while(s.length < size){
    s = '0' + s
  }
  return s
}
const Timer = ({seconds, onEnd, onSecondPassed}) => {
  const [state, setState] = React.useState(seconds)

  React.useEffect(() => {
    if(state === 0){
      if(onEnd) onEnd()
    }
    else if(state > 0){
      let timeout = setTimeout(() =>
      {
        setState(state - 1)
        if(onSecondPassed) onSecondPassed()
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [state, onEnd, onSecondPassed])

  return(
    <div>
      {zeroFill(Math.floor(state / 60).toString(), 2)}:{zeroFill((state % 60).toString(), 2)}
    </div>
  )
}

export default Timer
