import React from "react";

import { smallPhone, bigPhone, dedao, palma } from "../../../../img";
import { Button, ButtonConfigs } from "../../../../_components/Button";

import "./index.scss";
import FullscreenOverlay from "../../../../_components/FullscreenOverlay";
import DialogHistory from "../../../../_components/DialogHistory";

// const Phone = ({children, modifyContact, contactsTemplate, contacts, jobs, countries, onAddContact, onFinish, onMinimize}) => {
const Cellphone = ({
  nextMessage,
  stopConversation,
  shouldMinimize,
  onMinimize,
  dialogHistory,
  endConversation,
}) => {
  const [state, setState] = React.useState({
    maximized: false,
    shouldMinimize: false,
  });
  // const [newContact,setNewContact] = React.useState({name: '', job: '', country: ''})

  React.useEffect(() => {
    if (shouldMinimize) _shouldMinimize();
    //eslint-disable-next-line
  }, [shouldMinimize]);

  React.useEffect(() => {
    if (!stopConversation) {
      setTimeout(() => {
        nextMessage();
      }, 3000);
    }

    //eslint-disable-next-line
  }, [dialogHistory]);

  // React.useEffect( () => {
  // 	if(onMinimize) _shouldMinimize()
  // 	//eslint-disable-next-line
  // }, [onMinimize])

  const _maximize = () => {
    setState({ ...state, maximized: true });
  };

  const _shouldMinimize = () => {
    setState({ ...state, shouldMinimize: true });
  };

  const _minimized = () => {
    // setState({...state, shouldMinimize: false, maximized: false})
    state.shouldMinimize = false;
    state.maximized = false;
    if (typeof onMinimize === "function") onMinimize();
  };

  return (
    <div id="phone">
      <div
        id="small-phone-wrapper"
        className={state.maximized ? "maximized" : null}
      >
        <div id="small-phone-inner-wrapper">
          <div id="small-phone-content" onClick={_maximize}>
            <div id="small-phone-floating-text">
              <span lang="pt-br">Adicione um novo contato</span>
              <span lang="default">Add a new contact</span>
            </div>
            <img src={smallPhone} alt="phone-small" />
          </div>
        </div>
      </div>
      {state.maximized && (
        <FullscreenOverlay
          bgRGBA={{ r: 249, g: 175, b: 161, a: 0.69 }}
          closeHoverRGB={{ r: 255, g: 255, b: 255 }}
          onClickClose={_shouldMinimize}
          shouldExit={state.shouldMinimize}
          onReadyToExit={_minimized}
        >
          <div
            id="big-phone-wrapper"
            className={state.shouldMinimize ? "minimizing" : null}
          >
            <div id="big-phone-imgs">
              <img src={palma} alt="" />
              <img src={bigPhone} alt="" />
              <img src={dedao} alt="" />
            </div>
            <div id="big-phone-screen-wrapper">
              <div id="big-phone-screen-content">
                <div id="cellphone-dialog-history-wrapper">
                  <div id="cellphone-dialog-history-content">
                    {dialogHistory.map((dialog, index) => (
                      <div
                        className={
                          "cellphone-mensagem" +
                          (dialog.speaker === "player" ? 0 : 1)
                        }
                        key={index}
                      >
                        <span lang="pt-br" className="">
                          {dialog.text}
                        </span>
                        {dialog.textTranslate && (
                          <span lang="en" className="">
                            {dialog.textTranslate}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {stopConversation && (
              <Button
                style={{
                  position: "relative",
                  bottom: "10%",
                  margin: "50% auto 0% auto",
                }}
                onClick={endConversation}
              >
                Estou pronto!
              </Button>
            )}
          </div>
        </FullscreenOverlay>
      )}
    </div>
  );
};
export default Cellphone;
