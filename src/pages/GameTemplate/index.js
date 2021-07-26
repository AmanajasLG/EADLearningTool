import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { musicActions } from "../../_actions";
import Init from "../../_components/Init";

const GameTemplate = ({ Core, Feedback, data }) => {
  const [state, setState] = React.useState({ scene: "PLAY", back: false });

  const onBack = () => setState((s) => ({ ...s, back: true }));
  const onEndGame = (data) =>
    setState((s) => ({ ...s, scene: "ENDGAME", gameplayData: data }));

  return (
    <React.Fragment>
      {(function scene() {
        switch (state.scene) {
          case "PLAY":
            return (
              <React.Fragment>
                {React.createElement(Core, {
                  exitGame: onBack,
                  data: data,
                  onEndGame: onEndGame,
                })}
              </React.Fragment>
            );
          case "ENDGAME":
            return (
              <React.Fragment>
                {React.createElement(Feedback, { data: state.gameplayData })}
              </React.Fragment>
            );
          default:
            return <div>Invalid GameScene</div>;
        }
      })()}
      {state.back && <Redirect to="/userspace" />}
    </React.Fragment>
  );
};

export default GameTemplate;
