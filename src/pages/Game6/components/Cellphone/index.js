import React from "react";

import { bigPhone, dedao, palma, trash } from "../../../../img";
import { Button, ButtonConfigs } from "../../../../_components/Button";
import CellphoneWardrobe from "../CellphoneWardrobe";
import ColorPanel from "../ColorPanel";

import parse from "html-react-parser";

import "./index.scss";
import { Dropdown } from "react-bootstrap";
import { Icon } from "@material-ui/core";
import Notification from "../Notification";
import { ariel } from "../../../../img";

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
  cancelAddAnswerToDialog,
  removeClothingFromList,
  removeAllClothes,
  addRemoveDialog,
  addCancelRemoveDialog,
}) => {
  const [state, setState] = React.useState({
    removeItem: false,
    clearClothesConfirmation: false,
  });
  const [page, setPage] = React.useState(0);

  return (
    <div>
      {state.clearClothesConfirmation && (
        <Notification
          blobMessage={{
            text:
              "Essa ação irá remover TODAS ass roupas enviadas por você e reiniciar a conversa, é isso memso que deseja fazer?",
            textTranslate:
              "This action will remove ALL clothes sent by you and restart the conversation, is that what you want to do?",
          }}
          continueButtonLabel="Remover todas as roupas/Remove all clothes"
          onClickToContinue={() => {
            removeAllClothes();
            setState((s) => ({
              ...s,
              clearClothesConfirmation: false,
            }));
          }}
          backButtonLabel="Cancelar/Cancel"
          onClickToBack={() =>
            setState((s) => ({
              ...s,
              clearClothesConfirmation: false,
            }))
          }
        />
      )}
      <div id="big-cellphone-solo-wrapper">
        <div id="big-cellphone-imgs">
          <img src={palma} alt="" />
          <img src={bigPhone} alt="" />
          <img src={dedao} alt="" />
        </div>
        <div id="big-cellphone-solo-screen-wrapper">
          <div id="big-cellphone-screen-content">
            <div id="big-cellphone-screen-header">
              <img src={ariel} alt="cellphone-profile-pic" />
              <span>Ariel</span>
              {!stopConversation && (
                <Dropdown id="delete-menu">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <img src={trash} alt="" />
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
                    <Dropdown.Item
                      onClick={() =>
                        setState((s) => ({
                          ...s,
                          clearClothesConfirmation: true,
                          removeItem: false,
                        }))
                      }
                    >
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
                    margin: "1em 1em",
                    width: "30%",
                    fontSize: "1.5em",
                  }}
                  onClick={cancelButton}
                >
                  Não
                </Button>
                <Button
                  style={{
                    position: "relative",
                    margin: "1em 1em",
                    width: "30%",
                    fontSize: "1.5em",
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
                    <CellphoneWardrobe
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
                    <ColorPanel
                      colors={colors}
                      onColorClick={addAnswerToDialog}
                    />

                    <Button
                      style={{
                        position: "relative",
                        margin: ".5em auto",
                        width: "80%",
                        fontSize: "1rem",
                      }}
                      onClick={cancelAddAnswerToDialog}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="grid-wrapper">
                  <div className="grid-background">
                    {page > 0 && (
                      <span
                        className="feedback-arrow-phone feedback-arrow-previous"
                        onClick={() => setPage((s) => s - 1)}
                      >
                        {"❮"}
                      </span>
                    )}
                    <div className="grid-content-wrapper">
                      {Array.from(new Array(2), (item, index) => index).map(
                        (line, index) => (
                          <div key={index} className="grid-content-row">
                            {phoneClothes
                              .slice(
                                line * 2 + page * 4,
                                2 + line * 2 + page * 4
                              )
                              .map((cloting, index) => (
                                <Button
                                  style={{
                                    fontSize: "0.6rem",
                                    margin: ".5rem",
                                    width: "50%",
                                  }}
                                  onClick={() => {
                                    removeClothingFromList(index);
                                    setState((s) => ({
                                      ...s,
                                      removeItem: false,
                                    }));
                                  }}
                                >
                                  {cloting.fullName}
                                </Button>
                              ))}
                          </div>
                        )
                      )}
                    </div>
                    {page <
                      (phoneClothes.length % 4 !== 0
                        ? Math.floor(phoneClothes.length / 4)
                        : Math.floor(phoneClothes.length / 4) - 1) && (
                      <span
                        className="feedback-arrow-phone feedback-arrow-next"
                        onClick={() => setPage((s) => s + 1)}
                      >
                        {"❯"}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  style={{
                    position: "relative",
                    margin: ".5em auto",
                    width: "80%",
                    fontSize: "1rem",
                  }}
                  onClick={() => {
                    addCancelRemoveDialog();
                    setState((s) => ({ ...s, removeItem: false }));
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cellphone;
