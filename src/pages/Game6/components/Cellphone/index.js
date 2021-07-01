import React from "react";

import { bigPhone, dedao, palma } from "../../../../img";
import { Button, ButtonConfigs } from "../../../../_components/Button";
import Wardrobe from "../../../../_components/Wardrobe";

import parse from "html-react-parser";

import "./index.scss";
import { Dropdown } from "react-bootstrap";
import { Icon } from "@material-ui/core";

// const Phone = ({children, modifyContact, contactsTemplate, contacts, jobs, countries, onAddContact, onFinish, onMinimize}) => {
const Cellphone = ({
  stopConversation,
  dialogHistory,
  showClothes,
  addAnswerToDialog,
  wardrobe,
  colors,
  confirmationButton,
  cancelButton,
  phoneClothes,
  cancelAddRemoveDialog,
  removeClothingFromList,
  removeAllClothes,
  addRemoveDialog,
}) => {
  const [state, setState] = React.useState({ removeItem: false });

  return (
    <div id="big-cellphone-wrapper">
      <div id="big-cellphone-imgs">
        <img src={palma} alt="" />
        <img src={bigPhone} alt="" />
        <img src={dedao} alt="" />
      </div>
      <div id="big-cellphone-screen-wrapper">
        <div id="big-cellphone-screen-content">
          <div id="big-cellphone-screen-header">
            <img src="" alt="cellphone-profile-pic" />
            <span>Ariel</span>
            {!stopConversation && (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <Icon namo="trash alternate" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      addRemoveDialog();
                      setState((s) => ({ ...s, removeItem: true }));
                    }}
                  >
                    Remover roupa/Remove clothing
                  </Dropdown.Item>
                  <Dropdown.Item onClick={removeAllClothes}>
                    Remover todas as roupas/ Remove all clothes
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
          <div
            id="cellphone-dialog-history-wrapper"
            className={stopConversation ? "has-ready-button" : "has-wardrobe"}
          >
            <div id="cellphone-dialog-history-content">
              {[...dialogHistory].reverse().map((dialog, index) => (
                <div
                  className={
                    "cellphone-mensagem" +
                    (dialog.speaker === "player" ? 0 : 1) +
                    (index === 0
                      ? " cellphone-animate-mensagem" +
                        (dialog.speaker === "player" ? 0 : 1)
                      : "")
                  }
                  key={index}
                >
                  <span lang="pt-br" className="">
                    {parse(dialog.text)}
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
          {stopConversation ? (
            <div>
              <Button
                style={{
                  position: "relative",
                  margin: "1em auto",
                  width: "40%",
                  fontSize: "0.4rem",
                }}
                onClick={cancelButton}
              >
                Não
              </Button>
              <Button
                style={{
                  position: "relative",
                  margin: "1em auto",
                  width: "40%",
                  fontSize: "0.4rem",
                }}
                onClick={confirmationButton}
              >
                Sim
              </Button>
            </div>
          ) : !state.removeItem ? (
            <div id="cellphone-wardrobe">
              {showClothes ? (
                <div>
                  <Wardrobe
                    wardrobe={wardrobe}
                    onClothesClick={addAnswerToDialog}
                    showImage={false}
                  />

                  <Button
                    style={{
                      position: "relative",
                      margin: "1em auto",
                      width: "80%",
                      fontSize: "1rem",
                    }}
                    onClick={confirmationButton}
                  >
                    Pronto!
                  </Button>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "25% 25% 25% 25%",
                      gridTemplateRows: "20% 20% 20%",
                      rowGap: "10%",
                      padding: "5%",
                      backgroundColor: "#ffcca9",
                    }}
                  >
                    {colors.map((color) => (
                      <Button onClick={addAnswerToDialog(color)}>
                        {color}
                      </Button>
                    ))}
                  </div>
                  <Button
                    style={{
                      position: "relative",
                      margin: "1em auto",
                      width: "80%",
                      fontSize: "1rem",
                    }}
                    onClick={cancelAddRemoveDialog}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "25% 25% 25% 25%",
                gridTemplateRows: "20% 20% 20%",
                rowGap: "10%",
                padding: "5%",
                backgroundColor: "#ffcca9",
              }}
            >
              {phoneClothes.map((cloting, index) => (
                <Button
                  onClick={() => {
                    removeClothingFromList(index);
                    setState((s) => ({ ...s, removeItem: false }));
                  }}
                >
                  {cloting.fullName}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Cellphone;
