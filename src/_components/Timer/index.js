import React from "react";
import { zeroFill } from "../../_helpers";
import "./index.scss";

const Timer = ({ seconds, onEnd, onStop, run = true , ...props}) => {
  const [state, setState] = React.useState({
    seconds: seconds,
    timeout: null,
    sentRemaning: false,
  });
  const previousRef = React.useRef();

  React.useEffect(() => {
    if (state === previousRef.current && state.seconds !== seconds) {
      //console.log('external side effect update')***
      return;
    }

    if (!run && !state.sentRemaning) {
      onStop(state.seconds);
      setState({ ...state, sentRemaning: true });
    } else if (run && state.sentRemaning)
      setState({ ...state, sentRemaning: false });

    if (!run) {
      return state.timeout ? () => clearTimeout(state.timeout) : null;
    }

    if (state.seconds === 0) {
      if (onEnd) onEnd(state.seconds);
    } else if (state.seconds > 0) {
      previousRef.current = state;
      let timeout = setTimeout(() => {
        setState({ seconds: state.seconds - 1, timeout: timeout });
      }, 1000);

      return () => clearTimeout(state.timeout);
    }
  }, [state, onEnd, onStop, run, seconds]);

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
