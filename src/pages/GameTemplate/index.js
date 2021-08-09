import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  apiActions,
  gameActions,
  musicActions,
  headerActions,
} from "../../_actions";
import { headerConstants } from "../../_constants";

import Init from "../../_components/Init";

const GameTemplate = ({
  Core,
  Feedback,
  missionId,
  loadData,
  loadFeedback,
}) => {
  const [state, setState] = React.useState({ scene: "INIT", back: false });
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authentication.user.user.id);
  const mission = useSelector((state) =>
    state.game.items.missions
      ? state.game.items.missions.find((mission) => mission.id === missionId)
      : null
  );
  let missionData = mission ? mission.missionData : null;

  const lang = useSelector(
    (state) => state.authentication.user.user.language.id
  );

  let currentPlaySession = useSelector((state) =>
    state.play_sessions ? state.play_sessions.items[0] : {}
  );
  const { play_sessionsActions } = apiActions;
  // const { missionsActions, play_sessionsActions, player_actionsActions, user_game_resultsActions } = apiActions
  const timesPlayed = useSelector((state) => state.game.items.resultsCount);

  React.useEffect(() => {
    if (mission) {
      if (!state.checkedPlayed) {
        dispatch(
          gameActions.find("results/count", {
            user: userId,
            mission: mission.id,
          })
        );
        setState((s) => ({ ...s, checkedPlayed: true }));
      }
    }
    // eslint-disable-next-line
  }, [userId, mission, dispatch, state.checkedPlayed]);

  React.useEffect(() => {
    if (mission)
      dispatch(
        musicActions.set(
          mission.backgroundAudio ? mission.backgroundAudio.url : ""
        )
      );
    return () => dispatch(musicActions.set(""));
  }, [dispatch, mission]);

  //fetch mission if doesn't already have
  React.useEffect(() => {
    dispatch(gameActions.getById("missions", missionId));
  }, [missionId, dispatch]);

  React.useEffect(() => {
    if (!state.data) loadData(missionData, lang, state, setState);
  }, [missionData, lang, loadData, state]);

  const onStartGame = () => setState((s) => ({ ...s, scene: "GAME" }));
  const onBack = () => setState((s) => ({ ...s, back: true }));
  const onEndGame = (data) => {
    dispatch(
      headerActions.setAll(
        mission.name,
        mission.nameTranslate.find((name) => {
          return name.language.id === lang;
        }).name
      )
    );
    dispatch(headerActions.setState(headerConstants.STATES.OVERLAY));

    setState((s) => ({
      ...s,
      scene: "ENDGAME",
      feedbackData: loadFeedback(data, missionId, userId),
    }));
  };

  return (
    <React.Fragment>
      {!mission ? (
        <div>Loading...</div>
      ) : (
        (function scene() {
          switch (state.scene) {
            case "INIT":
              return (
                <Init
                  name={mission.name}
                  description={mission.description}
                  nameTranslate={
                    mission.nameTranslate.find((name) => {
                      return name.language.id === lang;
                    }).name
                  }
                  descriptionTranslate={
                    mission.descriptionTranslate.find((description) => {
                      return description.language.id === lang;
                    }).description
                  }
                  onStart={onStartGame}
                  onBack={onBack}
                  ready={state.data}
                />
              );
            case "GAME":
              return (
                <React.Fragment>
                  {React.createElement(Core, {
                    exitGame: onBack,
                    data: state.data,
                    onEndGame: onEndGame,
                  })}
                </React.Fragment>
              );
            case "ENDGAME":
              return (
                <React.Fragment>
                  {React.createElement(Feedback, {
                    data: state.feedbackData,
                    restart: () => {
                      setState({ scene: "INIT", back: false });
                      dispatch(
                        headerActions.setState(headerConstants.STATES.HIDDEN)
                      );
                    },
                    leave: () => setState((s) => ({ ...s, back: true })),
                  })}
                </React.Fragment>
              );
            default:
              return <div>Invalid GameScene</div>;
          }
        })()
      )}
      {state.back && <Redirect to="/userspace" />}
    </React.Fragment>
  );
};

export default GameTemplate;
