import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  headerActions,
  musicActions,
  apiActions,
  playSessionControlActions,
} from "../../_actions";
import ConfigWindow from "../../_components/ConfigWindow";
import GameConfig from "../../_components/GameConfig";
import ReactAudioPlayer from "react-audio-player";
import { settings } from "../../img";
import "./index.scss";
import { headerConstants } from "../../_constants";
import CursorPoint from "../../_components/CursorPoint";
import Canvas from "../../_components/Canvas";
import elements from "./elements.js";
const dimensions = { width: 16, height: 9 };
const ALIGNMENTS = {
  TOP: "flex-start",
  LEFT: "flex-start",
  CENTER: "center",
  RIGHT: "flex-end",
  BOTTOM: "flex-end",
};

const GameContext = (props) => {
  const [state, setState] = React.useState({
    fontSize: 12,
    assistMode: false,
    accessibility: "NONE",
    gameConfig: false,
    back: false,
    config: false,
    debug: true,
    alignment: { vertical: ALIGNMENTS.CENTER, horizontal: ALIGNMENTS.CENTER },
  });

  const { play_sessionsActions } = apiActions;
  const currentPlaySession = useSelector((state) =>
    state.play_sessions
      ? state.play_sessions.items[state.play_sessions.items.length - 1]
      : {}
  );

  const dispatch = useDispatch();
  const music = useSelector((state) => state.music);
  const playSessionControl = useSelector((state) => state.playSessionControl);
  let headerInfo = useSelector((state) => state.header);
  let mission = useSelector((state) =>
    state.game.items.missions
      ? state.game.items.missions.find(
          (mission) => mission.id === props.match.params.id
        )
      : null
  );

  const userId = useSelector((state) => state.authentication.user.user.id);

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
    if (playSessionControl.create_new) {
      dispatch(
        play_sessionsActions.create({
          user: userId,
          mission: mission.id,
          data: { actions: [] },
        })
      );

      dispatch(playSessionControlActions.createNew(false));
    }
  }, [
    dispatch,
    play_sessionsActions,
    playSessionControl.create_new,
    playSessionControlActions,
  ]);

  React.useEffect(() => {
    if (playSessionControl.ended) {
      dispatch(
        play_sessionsActions.update({
          id: currentPlaySession.id,
          data: {
            actions: [...currentPlaySession.data.actions],
          },
          ended: true,
        })
      );

      dispatch(playSessionControlActions.ended(false));
    }
  }, [
    dispatch,
    play_sessionsActions,
    playSessionControl.ended,
    playSessionControlActions,
  ]);

  React.useEffect(() => {
    if ((mission && !mission.trackPlayerInput) || !currentPlaySession) return;

    const getClickedObject = (e) => {
      dispatch(
        play_sessionsActions.update({
          id: currentPlaySession.id,
          data: {
            actions: [
              ...currentPlaySession.data.actions,
              {
                tag: e.target.nodeName,
                src: e.target.src,
                alt: e.target.alt,
                className: e.target.className,
                class: e.target.class,
                id: e.target.id,
                innerHTML: e.target.innerHTML.includes("<div")
                  ? null
                  : e.target.innerHTML,
                clickTime: new Date(),
              },
            ],
          },
        })
      );
    };
    document.addEventListener("mousedown", getClickedObject);

    setState((s) => {
      return { ...s, currentPlaySession, getClickedObject };
    });
    return () => {
      document.removeEventListener("mousedown", getClickedObject);
    };
  }, [
    dispatch,
    currentPlaySession,
    play_sessionsActions,
    state.tracking,
    mission,
  ]);

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
          onVolumeMute={() => dispatch(musicActions.volume(0))}
          onVolumeUp={() => dispatch(musicActions.volume(100))}
          onVolumeChange={(e, newValue) =>
            dispatch(musicActions.volume(newValue))
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
        volume={music.volume / 100}
        loop={true}
      />
      <div
        id="game-screen-wrapper"
        style={{
          alignItems: state.alignment.vertical,
          justifyContent: state.alignment.horizontal,
        }}
      >
        <div
          id="game-screen"
          style={{ "--aspectRatio": dimensions.width / dimensions.height }}
          className={state.debug ? "debug" : null}
        >
          {children}
        </div>
      </div>
      {state.back && <Redirect to="/userspace" />}
      {process.env.NODE_ENV === "development" && state.debug && (
        <React.Fragment>
          <CursorPoint />
          <Canvas
            elements={elements}
            width={window.innerWidth}
            height={window.innerHeigh}
            style={{
              pointerEvents: "none",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
//className={state.debug && "debug"}
export default GameContext;
