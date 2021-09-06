import React from "react";
import { zeroFill } from "../../_helpers";
import "./index.scss";

const Timer = ({ seconds, onEnd, onStop, run = true , ...props}) => {
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
    let interval = state.interval;
    if( !interval ) {
      interval = setInterval( () => {
        console.log('interval function, state.seconds:', stateRef.current.seconds)
        if( stateRef.current.seconds < 1 ) {
          _stopInterval();
          onEnd();
        } else {
          setState( s => {
            console.log('seconds should be:', s.seconds - 1)
            return ({...s, seconds: s.seconds-1})
          });
        }
      }, 1000 );
      setState( s => ({...s, interval: interval}) );
    } else console.log("Timer is already running.");
  }

  const _stopInterval = () => {
    clearInterval( state.interval );
    setState( s => ({...s, interval: null}) );
  }

  return (
    <div id="timer" {...props}>
      {zeroFill(Math.floor(state.seconds / 60).toString(), 2)}:
      {zeroFill((state.seconds % 60).toString(), 2)}
    </div>
  );
};

export default Timer;

/***
    Internal setState causes Timer component to update.
    onSecondPassed may cause an external setState, leading to an update which could reupdate Timer component.

    To prevent useEffect of entering the if statement responsable for setTimeout call, which leads to double that frame setTimeout callback,
    previous state is compared to the new state.

    In the first run, new state is in fact equal to current state.
    In this case, the entering seconds value is verified.
*/
