import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./index.scss";

import {
  playSessionControlActions,
  gameActions,
  headerActions,
  musicActions,
} from "../../_actions";
import { headerConstants } from "../../_constants";

import Init from "../../_components/Init";
import DressingCharacter from "../../_components/DressingCharacter";
import Wardrobe from "../../_components/Wardrobe";
import {
  tomato,
  envelope,
  hanger,
  hangerH,
  dressingBg,
  envelopeIcon,
  blobLowScore,
} from "../../img";

import initialState from "./initialState";
import Tutorial from "./components/Tutorial";
import Notification from "./components/Notification";
import Lamp from "../../_components/Lamp";

import { Iniciar, Voltar, ButtonConfigs } from "../../_components/Button";
import FeedbackPanel from "./components/FeedbackPanel";
import TutorialWardrobe from "./components/TutorialWardrobe";
import Invitation from "./components/Invitation";

const Game5 = (props) => {
  const [state, setState] = React.useState({ ...initialState() });
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const userId = useSelector((state) => state.authentication.user.user.id);
  const lang = useSelector(
    (state) => state.authentication.user.user.language.id
  );

  let mission = useSelector((state) =>
    state.game.items.missions
      ? state.game.items.missions.find(
          (mission) => mission.id === props.match.params.id
        )
      : null
  );
  let missionData = mission ? mission.missionData : null;
  const timesPlayed = useSelector((state) => state.game.items.resultsCount);

  React.useEffect(() => {
    if (mission && mission.trackPlayerInput && !state.playSessionCreated) {
      dispatch(playSessionControlActions.createNew(true));
      setState((s) => ({ ...s, playSessionCreated: true }));
    }
  // eslint-disable-next-line
  }, [dispatch, playSessionControlActions, state]);

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
    if (!mission || !missionData) dispatch(gameActions.getById("missions", id));
  }, [id, mission, dispatch, missionData]);

  React.useEffect(() => {
    if (mission) {
      if (!state.checkedPlayed) {
        dispatch(
          gameActions.find("results/count", {
            user: userId,
            mission: mission.id,
          })
        );
        setState({ ...state, checkedPlayed: true });
      }
    }
    // eslint-disable-next-line
  }, [userId, mission, dispatch, state.checkedPlayed]);

  React.useEffect(() => {
    if (
      missionData &&
      Object.keys(state.wardrobe).length === 0 &&
      timesPlayed !== undefined
    ) {
      const wardrobeBody = ["Tronco", "Pernas", "Pés"];

      let wardrobe = missionData.clothes.reduce((acc, clothing) => {
        let clothingReduce = {
          id: clothing.id,
          name: clothing.asset.name,
          cover: clothing.cover ?? "default",
          image: clothing.asset.image ? clothing.asset.image.url : "",
          wardrobeImage: clothing.wardrobeAsset
            ? clothing.wardrobeAsset.url
            : "",
          category: clothing.tags.find((tag) => tag.type === "category").name,
          color: clothing.tags.find((tag) => tag.type === "color").name,
          time: clothing.tags
            .filter((tag) => tag.type === "time")
            .map((tag) => tag.name),
          weather: clothing.tags
            .filter((tag) => tag.type === "weather")
            .map((tag) => tag.name),
          picked: false,
        };

        if (wardrobeBody.includes(clothingReduce.category))
          acc[clothingReduce.category] = [
            ...(acc[clothingReduce.category] || []),
            clothingReduce,
          ];
        else acc["Acessórios"] = [...(acc["Acessórios"] || []), clothingReduce];

        return acc;
      }, {});

      let characters = missionData.characters.map((character) => {
        return {
          id: character.id,
          image: character.characterAssets[0].image.url,
        };
      });

      let invitation =
        missionData.invites[
          Math.floor(Math.random() * missionData.invites.length)
        ];

      let inviteQuestions = [
        { question: "Qual mês?", answer: invitation.month, asked: false },
        {
          question: "A que horas?",
          answer: "Às " + invitation.time.toLowerCase(),
          asked: false,
        },
        {
          question: "Qual estação?",
          answer: "No(a) " + invitation.season.toLowerCase(),
          asked: false,
        },
        {
          question: "Qual a previsão do tempo?",
          answer: invitation.weather,
          asked: false,
        },
      ];

      invitation = {
        ...invitation,
        rightTags: invitation.rightTags.map((tag) => tag.name),
      };

      setState((s) => {
        return {
          ...s,
          wardrobe,
          characters,
          invitation,
          inviteQuestions,
        };
      });
    }
  }, [missionData, state.wardrobe, timesPlayed, lang]);

  React.useEffect(() => {
    if (
      state.countNow &&
      (state.scene !== "INIT" || state.scene !== "END_GAME")
    ) {
      setState((s) => ({ ...s, countNow: false }));

      setTimeout(
        () =>
          setState((s) => ({ ...s, seconds: s.seconds + 1, countNow: true })),
        1000
      );
    }
  }, [state]);

  const onStartGame = () => setState((s) => ({ ...state, scene: "INTRO" }));

  const addClothesToBody = (item) => () => {
    const wardrobeBody = ["Tronco", "Pernas", "Pés"];
    const covers = ["inteiro", "default"];
    var clothes = { ...state.clothes };

    if (wardrobeBody.includes(item.category)) {
      if (
        (clothes[item.category].length !== 0 &&
          clothes[item.category].filter(
            (clothing) =>
              clothing.cover === item.cover ||
              (covers.includes(clothing.cover) && covers.includes(item.cover))
          ).length !== 0) ||
        (clothes["Tronco"].filter((clothing) => clothing.cover === "inteiro")
          .length !== 0 &&
          item.category !== "Pés" &&
          item.cover === "default") ||
        (item.cover === "inteiro" && clothes["Pernas"].length !== 0)
      ) {
        setState((s) => ({
          ...s,
          showClothingSpaceTakenErrorNotification: true,
        }));
      } else {
        clothes[item.category] = [...clothes[item.category], item];

        clothes[item.category].sort((a, b) => {
          let weights = ["baixo", "default", "inteiro", "cima"];
          return weights.indexOf(a.cover) < weights.indexOf(b.cover) ? -1 : 1;
        });

        setState((s) => ({
          ...s,
          clothes: clothes,
          wardrobe: {
            ...s.wardrobe,
            [item.category]: state.wardrobe[item.category].map((clothing) => {
              if (clothing.id === item.id) return { ...clothing, picked: true };
              return clothing;
            }),
          },
        }));
      }
    } else {
      if (
        clothes["Acessórios"].length !== 0 &&
        clothes["Acessórios"].find(
          (clothing) => clothing.category === item.category
        )
      ) {
        setState((s) => ({
          ...s,
          showClothingSpaceTakenErrorNotification: true,
        }));
      } else {
        clothes["Acessórios"] = [...clothes["Acessórios"], item];

        setState((s) => ({
          ...s,
          clothes: clothes,
          wardrobe: {
            ...s.wardrobe,
            Acessórios: state.wardrobe["Acessórios"].map((clothing) => {
              if (clothing.id === item.id) return { ...clothing, picked: true };
              return clothing;
            }),
          },
        }));
      }
    }
  };

  const removeClothesFromBody = (item) => () => {
    var clothes = { ...state.clothes };
    const category = ["Tronco", "Pernas", "Pés"].includes(item.category)
      ? item.category
      : "Acessórios";

    setState((s) => ({
      ...s,
      clothes: {
        ...clothes,
        [category]: clothes[category].filter(
          (clothing) => clothing.id !== item.id
        ),
      },
      wardrobe: {
        ...s.wardrobe,
        [category]: state.wardrobe[category].map((clothing) => {
          if (clothing.id === item.id) return { ...clothing, picked: false };
          return clothing;
        }),
      },
    }));
  };

  const showInviteAnswer = (index) => () => {
    let inviteQuestions = [...state.inviteQuestions];

    inviteQuestions[index].asked = true;

    setState((s) => ({
      ...s,
      inviteQuestions,
      showInviteQuestions: false,
      showInviteAnswer: true,
      inviteAnswer: inviteQuestions[index].answer,
    }));
  };

  const checkFullOutfit = () => {
    let hasInteiroCover = false;
    for (var key in state.clothes) {
      if (key === "Acessórios") continue;

      let clothesCovers = state.clothes[key].reduce(
        (acc, clothing) => [...acc, clothing.cover],
        []
      );

      if (clothesCovers.includes("inteiro")) hasInteiroCover = true;

      if (
        key === "Pernas" &&
        state.clothes[key].length === 0 &&
        hasInteiroCover
      )
        continue;

      if (
        !clothesCovers.includes("default") &&
        !clothesCovers.includes("inteiro")
      )
        return false;
    }

    return true;
  };

  const getWrongClothes = () => {
    const rightTags = [...state.invitation.rightTags];
    let wrongClothes = [];

    for (var key in state.clothes) {
      for (let i = 0; i < state.clothes[key].length; i++) {
        if (
          state.clothes[key][i].time.reduce(
            (acc, tag) => acc && !rightTags.includes(tag),
            true
          ) ||
          state.clothes[key][i].weather.reduce(
            (acc, tag) => acc && !rightTags.includes(tag),
            true
          )
        )
          wrongClothes.push(state.clothes[key][i]);
      }
    }

    return wrongClothes;
  };

  const restart = () => {
    setState({ ...initialState() });
    dispatch(headerActions.setState(headerConstants.STATES.HIDDEN));
  };

  const endGame = (saveResult = true) => {
    let wrongClothes = getWrongClothes();
    let clothesCount = Object.keys(state.clothes).reduce((acc, key) => {
      return acc + state.clothes[key].length;
    }, 0);
    let sawInvite =
      state.inviteQuestions.filter((question) => question.asked).length > 0;
    let feedbackMessages = [];

    if (wrongClothes.length === 0 && checkFullOutfit())
      feedbackMessages.push(
        {
          image: tomato,
          message:
            "Parabéns! Você montou um look perfeito para a ocasião. Certamente fará um sucesso no evento!!",
          messageTranslate:
            "Well done! You came up with the perfect outfit for the occasion. You'll surely be a blast in the event!!",
        },
        {
          image: tomato,
          message: sawInvite
            ? "Ainda bem que você checou novamente as informações do convite. Já pensou se escolhesse as roupas erradas?"
            : "Você completou seu look sem precisar rever as informações do convite. Que memória você tem!",
          messageTranslate: sawInvite
            ? "Good thing you checked the invite information. What if you had picked the wrong clothes?"
            : "You finished your outfit without looking for the event's information. What a good memory you have!",
        }
      );
    else if (wrongClothes.length === 0)
      feedbackMessages.push(
        {
          image: tomato,
          message:
            "Ei, até que não ficou tão mal, mas acho que algumas pessoas podem estranhar seu look para esse evento...",
          messageTranslate:
            "Hey, it's not that bad, but people might think your outfit is a bit weird for the event...",
        },
        {
          image: tomato,
          message: sawInvite
            ? "Ainda bem que você checou novamente as informações do convite. Ainda sim, acho que você cometeu alguns tropeços no seu look…"
            : "Você completou seu look sem precisar rever as informações do convite. Mas acho que você se confundiu um pouco…",
          messageTranslate: sawInvite
            ? "Good thing you checked the invite information. Still, I think you made some mistakes in your outfit..."
            : "You finished your outfit without looking for the event's information. But I think you got a bit lost...",
        },
        {
          image: tomato,
          message:
            "Preste atenção nas peças que você escolheu. Provavelmente você esqueceu alguma peça de roupa importante para sair de casa!",
          messageTranslate:
            "Pay attention to the garments you have chosen. You probably forgot some important piece of clothing!",
        }
      );
    else
      feedbackMessages.push(
        {
          image: tomato,
          message:
            wrongClothes.length / clothesCount < 0.5
              ? "Ei, até que não ficou tão mal, mas acho que algumas pessoas podem estranhar seu look para esse evento..."
              : "Ei, eu sei que estilo é uma questão pessoal, mas acho que esse não é o look mais adequado para este evento...",
          messageTranslate:
            wrongClothes.length / clothesCount < 0.5
              ? "Hey, it's not that bad, but people might think your outfit is a bit weird for the event..."
              : "Hey, I know style is a personal matter, but I think that is not the most adequate outfit for this event...",
        },
        {
          image: tomato,
          message: sawInvite
            ? "Ainda bem que você checou novamente as informações do convite. Ainda sim, acho que você cometeu alguns tropeços no seu look…"
            : "Você completou seu look sem precisar rever as informações do convite. Mas acho que você se confundiu um pouco…",
          messageTranslate: sawInvite
            ? "Good thing you checked the invite information. Still, I think you made some mistakes in your outfit..."
            : "You finished your outfit without looking for the event's information. But I think you got a bit lost...",
        },
        {
          image: tomato,
          message:
            "Preste atenção nas peças que você escolheu. Em seu look, você escolheu um total de " +
            wrongClothes.length +
            " peças que não combinam com o evento: " +
            wrongClothes.map((clothes) => clothes.name).join(", "),
          messageTranslate:
            "Pay attention to the pieces of clothing you picked. In your outfit, you chose a total of " +
            wrongClothes.length +
            " pieces that did not match the event :" +
            wrongClothes.map((clothes) => clothes.name).join(", "),
        }
      );

    setState({
      ...state,
      scene: "END_GAME",
      won: wrongClothes.length === 0 && checkFullOutfit(),
      feedbackMessages,
    });

    dispatch(
      headerActions.setAll(
        mission.name,
        mission.nameTranslate.find((name) => {
          return name.language.id === lang;
        }).name
      )
    );
    dispatch(headerActions.setState(headerConstants.STATES.OVERLAY));

    dispatch(playSessionControlActions.ended(true));

    if (saveResult)
      dispatch(
        gameActions.create("results", {
          user: userId,
          mission: mission.id,
          invite: state.invitation.id,
          won: wrongClothes.length === 0 && checkFullOutfit(),
          sawInviteAgain: sawInvite,
          wrongClothesCount: wrongClothes.length,
          outfit: Object.keys(state.clothes).reduce((acc, key) => {
            return [
              ...acc,
              ...state.clothes[key].map((clothing) => clothing.id),
            ];
          }, []),
          character: state.choosenCharacter.id,
          seconds: state.seconds,
          inviteQuestionsMade: sawInvite
            ? JSON.stringify(
                state.inviteQuestions
                  .filter((question) => question.asked)
                  .map((question) => ({ text: question.question }))
              )
            : null,
        })
      );
  };

  return (
    <React.Fragment>
      {mission ? (
        <React.Fragment>
          {(function scene() {
            switch (state.scene) {
              case "INIT":
                return (
                  <Init
                    icon={mission.initIcon ? mission.initIcon.url : ""}
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
                    onBack={() => setState({ ...state, back: true })}
                    ready={Object.keys(state.wardrobe).length > 0}
                  />
                );
              case "INTRO":
                return (
                  <React.Fragment>
                    {state.showBlob && (
                      <Tutorial
                        blobMessage={state.tutorialBlobsText[state.blobToShow]}
                        onClickToEnd={() =>
                          setState((s) => ({
                            ...s,
                            blobToShow: s.blobToShow + 1,
                            showBlob: false,
                          }))
                        }
                      />
                    )}
                    {state.chooseCharacterScreen && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <img
                          src={blobLowScore}
                          style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          alt="background-blob"
                        />
                        {state.characters.map((character) => (
                          <DressingCharacter
                            clothes={state.clothes}
                            character={character}
                            key={character.id}
                            style={{
                              height: "108em",
                              width: "60em",
                              cursor: "pointer",
                              position: "relative",
                            }}
                            onClick={() =>
                              setState((s) => ({
                                ...s,
                                choosenCharacter: character,
                                showInvitation: true,
                                chooseCharacterScreen: false,
                              }))
                            }
                          />
                        ))}
                      </div>
                    )}

                    {state.showInvitation && (
                      <Invitation
                        invitation={state.invitation}
                        onClick={() =>
                          setState((s) => ({
                            ...s,
                            proceedToDressingConfirmation: true,
                          }))
                        }
                      />
                    )}

                    {state.proceedToDressingConfirmation && (
                      <Notification
                        blobMessage={{
                          text:
                            "Tem certeza? Você terá apenas UMA chance de rever cada informação do convite. Deseja continuar?",
                          textTranslate:
                            "Are you sure? You will have only ONE chance to review each piece of information in the invitation. Do you want to continue?",
                        }}
                        continueButtonLabel="Continuar/Continue"
                        onClickToContinue={() =>
                          setState((s) => ({
                            ...s,
                            scene: "DRESS",
                            proceedToDressingConfirmation: false,
                            dressingContext: true,
                            showInvitation: false,
                            showBlob: true,
                          }))
                        }
                        backButtonLabel="Ver o convite/See the invite"
                        onClickToBack={() =>
                          setState((s) => ({
                            ...s,
                            proceedToDressingConfirmation: false,
                            showInvitation: true,
                          }))
                        }
                      />
                    )}
                  </React.Fragment>
                );
              case "DRESS":
                return (
                  <React.Fragment>
                    {state.showBlob && (
                      <TutorialWardrobe
                        blobMessage={state.tutorialBlobsText[state.blobToShow]}
                        onClickToEnd={() => {
                          if (
                            state.blobToShow <
                            state.tutorialBlobsText.length - 1
                          )
                            setState((s) => ({
                              ...s,
                              blobToShow: s.blobToShow + 1,
                            }));
                          else
                            setState((s) => ({
                              ...s,
                              showBlob: false,
                            }));
                        }}
                        index={state.blobToShow}
                      />
                    )}

                    {state.dressingContext && (
                      <React.Fragment>
                        <img
                          src={dressingBg}
                          style={{ position: "absolute" }}
                          alt=""
                        />

                        <DressingCharacter
                          character={state.choosenCharacter}
                          clothes={state.clothes}
                          showRemove
                          onRemoveClick={removeClothesFromBody}
                          style={{
                            width: "52em",
                            height: "95em",
                            zIndex: state.blobToShow === 2 ? 1000000 : 0,
                            position: "absolute",
                            bottom: "5em",
                            left: "30em",
                          }}
                        />

                        <Wardrobe
                          className={
                            process.env.NODE_ENV === "development" ? "" : ""
                          }
                          style={{
                            zIndex: state.blobToShow === 1 ? 1000000 : 0,
                            position: "absolute",
                            right: "9.5em",
                            top: "10.8em",
                            width: "86em",
                            height: "86em",
                          }}
                          wardrobe={state.wardrobe}
                          onClothesClick={
                            state.showBlob ? () => {} : addClothesToBody
                          }
                        />
                        {!state.showInvitation && (
                          <img
                            className="invitationIcon"
                            src={envelopeIcon}
                            alt="invite-button"
                            onClick={
                              state.showBlob
                                ? () => {}
                                : () =>
                                    setState((s) => ({
                                      ...s,
                                      showInvitation: true,
                                      showInviteQuestions: true,
                                    }))
                            }
                            style={{
                              zIndex: state.blobToShow === 3 ? 1000000 : 0
                            }}
                          />
                        )}

                        <Lamp
                          img={[hanger, hangerH]}
                          onClick={
                            state.showBlob
                              ? () => {}
                              : () => {
                                  let ready =
                                    state.clothes["Tronco"].length > 0 &&
                                    (state.clothes["Tronco"].find(
                                      (clothing) => clothing.cover === "inteiro"
                                    ) ||
                                      state.clothes["Pernas"].length > 0);
                                  setState((s) => ({
                                    ...s,
                                    ready: ready,
                                    readyAlert: !ready,
                                    dressingContext: !ready,
                                  }));
                                }
                          }
                          message="Estou pronto!"
                          style={{
                            top: "0.5%",
                            left: "1%",
                            fontSize: "1.1em",
                            fontWeight: "600",
                            zIndex: state.blobToShow === 4 ? 1000000 : 0,
                          }}
                        />
                      </React.Fragment>
                    )}

                    {state.showInvitation && (
                      <div id="invitation-content-wrapper">
                        <img src={envelope} alt="Rever convite" />
                        <div id="invitation-content">
                          {state.showInviteQuestions && (
                            <div className="invitation-questions">
                              {state.inviteQuestions.map((question, index) => (
                                <button
                                  key={index}
                                  onClick={showInviteAnswer(index)}
                                  disabled={question.asked}
                                >
                                  <span>{question.question}</span>
                                </button>
                              ))}
                            </div>
                          )}

                          {state.showInviteAnswer && (
                            <div id="invitation-answer">
                              {state.inviteAnswer}
                            </div>
                          )}
                          <div id="invitation-voltar">
                            <Voltar
                              colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_3}
                              onClick={() => {
                                if (state.showInviteQuestions)
                                  setState((s) => ({
                                    ...s,
                                    showInvitation: false,
                                  }));
                                else
                                  setState((s) => ({
                                    ...s,
                                    showInviteQuestions: true,
                                    showInviteAnswer: false,
                                  }));
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {state.showClothingSpaceTakenErrorNotification && (
                      <Notification
                        blobMessage={{
                          text:
                            "Você já vestiu uma roupa para essa parte do corpo! Para vestir outra remova a que já esta antes.",
                          textTranslate:
                            "You've already worn an outfit for that body part! To wear another one, remove the one that is already there.",
                        }}
                        continueButtonLabel="Ok!"
                        onClickToContinue={() =>
                          setState((s) => ({
                            ...s,
                            showClothingSpaceTakenErrorNotification: false,
                          }))
                        }
                      />
                    )}

                    {state.readyAlert && (
                      <Notification
                        blobMessage={{
                          text: "Você não pode sair vestindo tão pouco!",
                          textTranslate: "You can't leave wearing so little!",
                        }}
                        continueButtonLabel="Voltar ao closet/Back to closet"
                        onClickToContinue={() =>
                          setState((s) => ({ ...s, readyAlert: false }))
                        }
                      />
                    )}

                    {state.ready && (
                      <div className="confirm-screen">
                        <div className="character">
                          <div
                            id="shadow"
                            style={{
                              backgroundColor: "black",
                              height: "8em",
                              width: "30em",
                              position: "absolute",
                              right: "11em",
                              bottom: "3em",
                              borderRadius: "100%",
                              opacity: 0.2,
                            }}
                          ></div>
                          <DressingCharacter
                            character={state.choosenCharacter}
                            clothes={state.clothes}
                            style={{
                              height: "100em",
                              width: "50em",
                              right: "20em",
                            }}
                          />
                        </div>
                        <div className="confirm-blob">
                          <div className="blob-spans">
                            <span lang="pt-br">Pronto pra sair?</span>
                            <span lang="en">Ready to go outside?</span>
                          </div>
                          <div>
                            <Voltar
                              onClick={() =>
                                setState((s) => ({
                                  ...s,
                                  ready: false,
                                  dressingContext: true,
                                }))
                              }
                              style={{ fontSize: "1.3em", marginRight: "1em" }}
                            />
                            <Iniciar
                              onClick={() => endGame()}
                              style={{ fontSize: "1.3em" }}
                              label="Continuar"
                              colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_3}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              case "END_GAME":
                return (
                  // ! Acho que isso deveria ser no GameContext pq a cor do bg tinha que pegar a tela inteira -> FEITO!
                  <div>
                    <div className="feedback absolute-center">
                      <FeedbackPanel
                        feedback={state.feedbackMessages}
                        won={state.won}
                        restart={restart}
                        leave={() => setState({ ...state, back: true })}
                      />
                    </div>
                    <DressingCharacter
                      character={state.choosenCharacter}
                      clothes={state.clothes}
                      style={{
                        position: "absolute",
                        left: "-20em",
                        width: "70em",
                        height: "110em",
                        bottom: "-50em",
                      }}
                    />
                  </div>
                );
              default:
                return <div>Error</div>;
            }
          })()}

          {state.back && <Redirect to="/userspace" />}
        </React.Fragment>
      ) : (
        <div>Loading..</div>
      )}
    </React.Fragment>
  );
};

export default Game5;
