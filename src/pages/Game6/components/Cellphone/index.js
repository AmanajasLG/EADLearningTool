import React from "react";

import { bigPhone, dedao, palma } from "../../../../img";
import { Button, ButtonConfigs } from "../../../../_components/Button";
import Wardrobe from "../../../../_components/Wardrobe";

import marked from "marked";
import parse from "html-react-parser";

import "./index.scss";

// const Phone = ({children, modifyContact, contactsTemplate, contacts, jobs, countries, onAddContact, onFinish, onMinimize}) => {
const Cellphone = ({
  nextMessage,
  stopConversation,
  dialogHistory,
  showClothes,
  addAnswerToDialog,
  autoLoad,
  wardrobe,
  colors,
  confirmationButton,
  cancelButton,
  removeItem = false,
  phoneClothes,
  removeClothingFromList,
}) => {
  // const [newContact,setNewContact] = React.useState({name: '', job: '', country: ''})

  React.useEffect(() => {
    if (autoLoad) {
      setTimeout(() => {
        nextMessage();
      }, 3000);
    }

    //eslint-disable-next-line
  }, [dialogHistory]);

  return (
    <div id="big-cellphone-wrapper">
      <div id="big-cellphone-imgs">
        <img src={palma} alt="" />
        <img src={bigPhone} alt="" />
        <img src={dedao} alt="" />
      </div>
      <div id="big-cellphone-screen-wrapper">
        <div id="big-cellphone-screen-content">
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
          ) : !removeItem ? (
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
                    <Button onClick={addAnswerToDialog(color)}>{color}</Button>
                  ))}
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
                <Button onClick={removeClothingFromList(index)}>
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
