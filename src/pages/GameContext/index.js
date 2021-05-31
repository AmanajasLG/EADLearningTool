import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { headerActions } from "../../_actions";
import ConfigWindow from "../../_components/ConfigWindow";
import GameConfig from "../../_components/GameConfig";
import ReactAudioPlayer from "react-audio-player";
import { settings } from "../../img";
import "./index.scss";
import { headerConstants } from "../../_constants";

const dimensions = { width: 16, height: 9}

const GameContext = (props) => {
  const [state, setState] = React.useState({
    volume: 15,
    fontSize: 12,
    assistMode: false,
    accessibility: "NONE",
    gameConfig: false,
    back: false,
    config: false,
    screenConstraint: window.innerWidth / window.innerHeight > dimensions.width / dimensions.height ? 'HEIGHT' : 'WIDTH'
  });

  const dispatch = useDispatch();
  const music = useSelector( state  => state.music)
  let headerInfo = useSelector( state  => state.header)

  let { children } = props;
  children = { ...children, props: { ...props } };

  React.useEffect(() => {
    dispatch(headerActions.setState(headerConstants.STATES.HIDDEN));
    return () => {
      dispatch(headerActions.clearAll());
      dispatch(headerActions.setState(headerConstants.STATES.NORMAL));
    };
  }, [dispatch]);

  React.useEffect(() => {
    //console.log('addResize check')
    const checkResize = () => {
      //console.log(`w,h ${window.innerWidth},${window.innerHeight} ratio: ${16/9}` )
      if( window.innerWidth / window.innerHeight > dimensions.width / dimensions.height && state.screenConstraint === 'WIDTH')
        setState(s => ({...s, screenConstraint: 'HEIGHT'}))
      else if(window.innerWidth / window.innerHeight < dimensions.width / dimensions.height && state.screenConstraint === 'HEIGHT')
        setState(s => ({...s, screenConstraint: 'WIDTH'}))
    }

    const removeResize = () => {
      //console.log('Remove resizeCheck')
      window.removeEventListener('resize', checkResize)
      return checkResize
    }

    window.addEventListener('resize', checkResize)
    return removeResize
  })

  return (
    <React.Fragment>
      {headerInfo.state === headerConstants.STATES.HIDDEN && (
        <div
          id="floating-config-btn"
          onClick={() => setState({ ...state, config: true })}
        >
          <img src={settings} alt="config" />
        </div>
      )}
      {state.config && (
        <ConfigWindow
          onConfig={() =>
            setState({ ...state, config: false, gameConfig: true })
          }
          onStatistics={() => {}}
          onLeave={() => setState({ ...state, back: true })}
          onClose={() => setState({ ...state, config: false })}
        />
      )}
      {state.gameConfig && (
        <GameConfig
          volume={state.volume}
          onVolumeMute={() => setState({ ...state, volume: 0 })}
          onVolumeUp={() => setState({ ...state, volume: 100 })}
          onVolumeChange={(e, newValue) =>
            setState({ ...state, volume: newValue })
          }
          fontSize={state.fontSize}
          onFontSizeChange={(e, newValue) =>
            setState({ ...state, fontSize: newValue })
          }
          assistMode={state.assistMode}
          onAssistModeChange={(e) =>
            setState({ ...state, assistMode: e.target.checked })
          }
          onAccessibilityLeft={() => {}}
          onAccessibilityRight={() => {}}
          onBack={() => setState({ ...state, gameConfig: false, config: true })}
          onClose={() => setState({ ...state, gameConfig: false })}
        />
      )}
      <ReactAudioPlayer
        src={music.url}
        autoPlay
        volume={state.volume / 100}
        loop={true}
      />
      <div id="game-screen" className={ `${state.screenConstraint === 'WIDTH'? 'maxWidth' : 'maxHeight' } debug`}  >
        {children}
      </div>
      {state.back && <Redirect to="/userspace" />}
    </React.Fragment>
  );
};
//${window.innerWidth / window.innerHeight > 16 / 9 ? 'maxHeight' : 'maxWidth'}
export default GameContext;
