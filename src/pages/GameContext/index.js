import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { headerActions, musicActions } from "../../_actions";
import ConfigWindow from "../../_components/ConfigWindow";
import GameConfig from "../../_components/GameConfig";
import ReactAudioPlayer from "react-audio-player";
import { settings } from "../../img";
import "./index.scss";
import { headerConstants } from "../../_constants";

const dimensions = { width: 16, height: 9}
const ALIGNMENTS = {
  TOP: "flex-start",
  LEFT: "flex-start",
  CENTER: "center",
  RIGHT: "flex-end",
  BOTTOM: "flex-end"
}

const GameContext = (props) => {
  const [state, setState] = React.useState({
    fontSize: 12,
    assistMode: false,
    accessibility: "NONE",
    gameConfig: false,
    back: false,
    config: false,
    debug: true,
    alignment: {vertical: ALIGNMENTS.CENTER, horizontal: ALIGNMENTS.CENTER}
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
          volume={music.volume}
          onVolumeMute={() => dispatch(musicActions.volume(0)) }
          onVolumeUp={() => dispatch(musicActions.volume(100)) }
          onVolumeChange={(e, newValue) => dispatch(musicActions.volume(newValue)) }
          fontSize={state.fontSize}
          onFontSizeChange={(e, newValue) => setState({ ...state, fontSize: newValue }) }
          assistMode={state.assistMode}
          onAssistModeChange={(e) => setState({ ...state, assistMode: e.target.checked }) }
          onAccessibilityLeft={() => {}}
          onAccessibilityRight={() => {}}
          onBack={() => setState({ ...state, gameConfig: false, config: true })}
          onClose={() => setState({ ...state, gameConfig: false })}
        />
      )}
      <ReactAudioPlayer
        src={music.url}
        autoPlay
        volume={music.volume / 100}
        loop={true}
      />
      <div id="game-screen-wrapper" style={{alignItems: state.alignment.vertical, justifyContent: state.alignment.horizontal}}>
        <div id="game-screen" style={{"--aspectRatio": dimensions.width / dimensions.height}}>
          {children}
        </div>
      </div>
      {state.back && <Redirect to="/userspace" />}
    </React.Fragment>
  );
};
//className={state.debug && "debug"}
export default GameContext;
