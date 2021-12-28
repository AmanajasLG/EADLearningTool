import React from "react";

import { bigPhone, dedao, palma, trash } from "../../../../img";
import { Button } from "../../../../_components/Button";
import CellphoneWardrobe from "../CellphoneWardrobe";
import ColorPanel from "../ColorPanel";

import parse from "html-react-parser";

import "./index.scss";
import { Dropdown } from "react-bootstrap";
import Notification from "../Notification";
import { ariel } from "../../../../img";

const Cellphone = ({
  stopConversation,
  dialogHistory,
  showClothes,
  addAnswerToDialog,
  wardrobe,
  wardrobeTab,
  colors,
  confirmationButton,
  cancelButton,
  phoneClothes,
  cancelAddAnswerToDialog,
  removeClothingFromList,
  removeAllClothes,
  addRemoveDialog,
  addCancelRemoveDialog,
  ...props
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
              "Essa ação irá remover TODAS as roupas enviadas por você e reiniciar a conversa, é isso memso que deseja fazer?",
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
      <div id="big-cellphone-solo-wrapper" style={props.style}>
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
                  <Dropdown.Toggle variant="success" id="dropdown-basic" style={{padding: 0, borderRadius: 0}}>
                    <img src={trash} alt="" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        addRemoveDialog();
                        setState((s) => ({ ...s, removeItem: true }));
                      }}
                    >
                      <span>Remover roupa/Remove clothing</span>
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
                      <span>Remover todas as roupas/ Remove all clothes</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
            <div id="cellphone-dialog-screen-after-header">
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
                      width: "40%",
                      fontSize: "2em",
                    }}
                    onClick={cancelButton}
                  >
                    Não
                  </Button>
                  <Button
                    style={{
                      position: "relative",
                      margin: "1em 1em",
                      width: "40%",
                      fontSize: "2em",
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
                        startingIdx={wardrobeTab}
                      />

                      <Button
                        style={{
                          position: "relative",
                          margin: "0.5em auto",
                          width: "15em",
                          fontSize: "2em",
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
                        style={{ marginTop: "3em" }}
                      />

                      <Button
                        style={{
                          position: "relative",
                          margin: "1em auto",
                          width: "15em",
                          fontSize: "2em",
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
                  <div className="grid-wrapper" style={{height: "20em"}}>
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
                          (line, lineIndex) => (
                            <div key={lineIndex} className="grid-content-row">
                              {phoneClothes
                                .slice(
                                  line * 2 + page * 4,
                                  2 + line * 2 + page * 4
                                )
                                .map((cloting, clothesIndex) => (
                                  <Button
                                    style={{
                                      fontSize: "2em",
                                      margin: "0.5em",
                                      width: "50%",
                                      height: "3.5em",
                                      padding: "0.5em",
                                    }}
                                    key={clothesIndex + lineIndex * 2 + page * 4}
                                    onClick={() => {
                                      removeClothingFromList(clothesIndex + lineIndex * 2 + page * 4);
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
                      fontSize: "2em",
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
    </div>
  );
};
export default Cellphone;
