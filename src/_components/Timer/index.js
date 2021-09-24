import React from "react";
import { zeroFill } from "../../_helpers";
import "./index.scss";

const Timer = ({ seconds, onEnd, onStop, run = true , ...props}) => {
  const [sec, setSeconds] = React.useState(seconds)
  const [running, setRunning] = React.useState(run)

  React.useEffect(() => {
    if(run !== running){
      if(!run && running && onStop) onStop(sec)
      setRunning(run)
    }
  }, [run])

  React.useEffect(() => {
    let timer
    if(sec > 0)
    {
      if(running)
        timer = setTimeout(() => setSeconds(sec - 1), 1000)
    }else{
      if(onEnd) onEnd()
    }

    return () => { if(timer) clearTimeout(timer) }

  }, [sec, running])

  return (
    <div id="timer" {...props}>
      {zeroFill(Math.floor(sec / 60).toString(), 2)}:
      {zeroFill((sec % 60).toString(), 2)}
    </div>
  );
};

export default Timer;

/*
const [state, setState] = React.useState({
  seconds: seconds,
  interval: null,
});

const stateRef = React.useRef()
stateRef.current = state

React.useEffect( () => {
  return () => clearInterval(state.interval);
// eslint-disable-next-line
}, [] );

React.useEffect( () => {
  console.log('seconds:', state.seconds)
  if( state.seconds !== seconds ) setState( s => ({...s, seconds: seconds}));
// eslint-disable-next-line
}, [seconds] )

React.useEffect( () => {
  if( run ) {
    if( state.seconds > 0 ) _startInterval();
    else console.log("Timer has already run out.");
  } else {
    _stopInterval();
    onStop( state.seconds );
  }
// eslint-disable-next-line
}, [run]);
console.log('seconds:', state.seconds)

const _startInterval = () => {
  console.log('startInterval called')
  if( !state.interval ) {
    let interval = setInterval( _intervalEvaluation , 1000 );
    setState( s => ({...s, interval: interval}) );
  } else console.log("Timer is already running.");
}

const _intervalEvaluation = () => {
  console.log('interval function, state.seconds:', stateRef.current.seconds)
  if( stateRef.current.seconds < 1 ) {
    console.log('should stop interval')
    _stopInterval();
    onEnd();
  } else {
    setState( s => {
      console.log('seconds should be:', stateRef.current.seconds - 1)
      return ({...s, seconds: stateRef.current.seconds - 1})
    });
  }
}

const _stopInterval = () => {
  clearInterval( state.interval );
  setState( s => ({...s, interval: null}) );
}
*/

/***
    Internal setState causes Timer component to update.
    onSecondPassed may cause an external setState, leading to an update which could reupdate Timer component.

    To prevent useEffect of entering the if statement responsable for setTimeout call, which leads to double that frame setTimeout callback,
    previous state is compared to the new state.

    In the first run, new state is in fact equal to current state.
    In this case, the entering seconds value is verified.
*/
