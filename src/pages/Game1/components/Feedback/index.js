import React from "react";

import bigPhone from "../../../../img/Game1/Celular Base.svg";
import dedao from "../../../../img/Game1/Mão dedão.svg";
import palma from "../../../../img/Game1/Mão palma.svg";
import blobLaranja from "../../../../img/bg-forma-laranja.svg";

import "./index.scss";
import { Button } from "@material-ui/core";

// const Phone = ({children, modifyContact, contactsTemplate, contacts, jobs, countries, onAddContact, onFinish, onMinimize}) => {
const Feedback = ({
  restart,
  leave,
  score,
  result,
  totalFields,
  feedback,
  lang,
  mainError,
}) => {
  // const [newContact,setNewContact] = React.useState({name: '', job: '', country: ''})

  return (
    <div id="endGame-screen">
      <div style={{ display: "flex", flexDirection: "row" }}>
        {feedback.mobileBackground ? (
          <div style={{ width: "40%" }}>
            <div id="feedback-phone" style={{ width: 250 }}>
              <img src={palma} alt="" />
              <img src={bigPhone} alt="" />
              <img src={feedback.mobileBackground.url} alt="" />
              <img src={dedao} alt="" />
            </div>
          </div>
        ) : null}
        <div>
          <div className="painel" id="painel-3">
            <div className="painel-2-wrapper">
              <div
                className="painel-2-content"
                style={{ backgroundImage: "url(" + blobLaranja + ")" }}
              >
                <div>
                  <span>{score}%</span>
                </div>
              </div>
            </div>
            <div className="painel-2-wrapper">
              <div className="painel-2-content">
                <div>
                  {/* <img src={feedback.topAsset.url} alt="" /> */}
                  <div id="tutorial-popup-1">
                    <span lang="pt-br">
                      {feedback.text.replace("xxxx", score)}
                    </span>
                    <span lang="en">
                      {feedback.textTranslate
                        .find((text) => text.language.id === lang)
                        .text.replace("xxxx", score)}
                    </span>
                    <div id="endGame-action-btns">
                      <Button onClick={restart}>Tentar novamente</Button>
                      <Button onClick={leave}>Sair do jogo</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Feedback;
