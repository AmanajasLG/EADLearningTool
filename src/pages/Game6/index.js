import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link, Redirect } from "react-router-dom";
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
import Button, {
  ButtonConfigs,
  Iniciar,
  Voltar,
} from "../../_components/Button";
import { tomato, dressingBg, camera, blobLowScore } from "../../img";

import initialState from "./initialState";
import Notification from "./components/Notification";
import Lamp from "../../_components/Lamp";

import FeedbackPanel from "./components/FeedbackPanel";
import CellphoneOverlay from "./components/CellphoneOverlay";
import Cellphone from "./components/Cellphone";

import TutorialBlob from "../../_components/TutorialBlob";

const Game6 = (props) => {
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
        setState((s) => ({ ...s, checkedPlayed: true }));
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

      let phoneWardrobe = missionData.clothes.reduce((acc, clothing) => {
        let clothingReduce = {
          id: clothing.id,
          name: clothing.asset.name,
          category: clothing.tags.find((tag) => tag.type === "category").name,
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

      let colorTags = [
        ...new Set(
          missionData.clothes.reduce((acc, clothing) => {
            return [
              ...acc,
              clothing.tags.find((tag) => tag.type === "color").name,
            ];
          }, [])
        ),
      ].sort();

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
        { question: "Qual data?", answer: invitation.date, asked: false },
        {
          question: "A que horas?",
          answer: invitation.time.toLowerCase(),
          asked: false,
        },
        {
          question: "Qual estação?",
          answer: invitation.season.toLowerCase(),
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

      let introDialog = [
        { speaker: "", text: "Oi amig! Tudo bem? :)" },
        { speaker: "player", text: "Tudo! E você? :D" },
        {
          speaker: "",
          text:
            "Me chamaram pra uma festa e não faço ideeeeeeia do que vestir! x.x",
          textTranslate:
            "I was invited to a party and have noooo idea what to wear! x.x",
        },
        {
          speaker: "player",
          text: "Eita! Que festa?",
          textTranslate: "Oh! What party?",
        },
        { speaker: "", text: invitation.message },
        {
          speaker: "player",
          text:
            "Beleza! Vou me vestir aqui e já já te retorno com um look pra arrasar! :D",
          textTranslate:
            "Alright! I'm gonna dress up and I'll be back in a sec with a rocking outfit!",
        },
        {
          speaker: "",
          text: "Se precisar de algum detalhe, só perguntar!",
          textTranslate: "If you wanna know any details, just ask me!",
        },
      ];

      let dressDialogShow = [
        {
          speaker: "",
          text: "Se precisar de algum detalhe, só perguntar!",
          textTranslate: "If you wanna know any details, just ask me!",
        },
      ];

      let sendDialogShow = [
        {
          speaker: "",
          text: "E aí, que roupa uso?",
          textTranslate: "So, how should I dress?",
        },
      ];

      setState((s) => {
        return {
          ...s,
          wardrobe,
          phoneWardrobe,
          characters,
          invitation,
          inviteQuestions,
          colorTags,
          introDialog,
          dressDialogShow,
          sendDialogShow,
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

  const onStartGame = () => setState((s) => ({ ...s, scene: "INTRO" }));

  // INTRO
  const showIntroDialog = () => {
    let introDialog = [...state.introDialog];
    if (introDialog.length > 0) {
      let introDialogShow = [
        ...state.introDialogShow,
        ...introDialog.splice(0, 1),
      ];
      setState((s) => ({ ...s, introDialog, introDialogShow }));
    } else {
      setState((s) => ({ ...s, endIntroDialog: true }));
    }
  };

  const addAnswerToDialogDress = (index) => () => {
    let inviteQuestions = [...state.inviteQuestions];

    inviteQuestions[index].asked = true;

    let dressDialogShow = [...state.dressDialogShow];

    dressDialogShow.push(
      { speaker: "player", text: inviteQuestions[index].question },
      { speaker: "", text: inviteQuestions[index].answer }
    );

    setState((s) => ({
      ...s,
      inviteQuestions,
      dressDialogShow,
    }));
  };

  // WARDROBE
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

  // SELECT CLOTHES IN PHONE
  const addAnswerToDialogSend = (item) => () => {
    if (
      state.showTutorialBlob &&
      state.tutorialBlobCount < state.tutorialPhoneBlobsText.length - 1
    ) {
      setState((s) => ({
        ...s,
        tutorialBlobCount: s.tutorialBlobCount + 1,
      }));
    }

    if (state.showPhoneClothes) {
      const wardrobeBody = ["Tronco", "Pernas", "Pés"];
      let phoneWardrobe = { ...state.phoneWardrobe };
      let phoneClothes = [...state.phoneClothes];
      let sendDialogShow = [...state.sendDialogShow];

      phoneClothes.push(item);
      sendDialogShow.push(
        { speaker: "player", text: item.name },
        { speaker: "", text: "De qual cor?" }
      );

      if (wardrobeBody.includes(item.category)) {
        phoneWardrobe = {
          ...phoneWardrobe,
          [item.category]: phoneWardrobe[item.category].map((clothing) => {
            if (clothing.id === item.id) return { ...clothing, picked: true };
            return clothing;
          }),
        };
      } else {
        phoneWardrobe = {
          ...phoneWardrobe,
          Acessórios: phoneWardrobe["Acessórios"].map((clothing) => {
            if (clothing.id === item.id) return { ...clothing, picked: true };
            return clothing;
          }),
        };
      }

      setState((s) => ({
        ...s,
        phoneWardrobe,
        phoneClothes,
        sendDialogShow,
        showPhoneClothes: false,
      }));
    } else {
      let phoneClothes = [...state.phoneClothes];
      let sendDialogShow = [...state.sendDialogShow];

      phoneClothes[phoneClothes.length - 1].color = item;
      phoneClothes[phoneClothes.length - 1].fullName =
        phoneClothes[phoneClothes.length - 1].name + " " + item;
      sendDialogShow.push(
        { speaker: "player", text: item },
        {
          speaker: "",
          text: "Legal! Que mais?",
          textTranslate: "Cool! What else?",
        }
      );

      setState((s) => ({
        ...s,
        phoneClothes,
        sendDialogShow,
        showPhoneClothes: true,
      }));
    }
  };

  const cancelAddAnswerToDialog = () => {
    let phoneClothes = [...state.phoneClothes];
    let item = phoneClothes.pop();

    setState((s) => ({
      ...s,
      sendDialogShow: [
        ...s.sendDialogShow,
        {
          speaker: "player",
          text: "Não, não era isso não! Pera ai.",
          textTranslate: "No, that was not it! Hold on.",
        },
        {
          speaker: "",
          text: "Tudo bem hahaha O que mais?",
          textTranslate: "It's OK hahaha What else?",
        },
      ],
      phoneWardrobe: {
        ...s.phoneWardrobe,
        [item.category]: state.phoneWardrobe[item.category].map((clothing) => {
          if (clothing.id === item.id) return { ...clothing, picked: false };
          return clothing;
        }),
      },
      showPhoneClothes: true,
      phoneClothes,
    }));
  };

  const sendReady = () => {
    if (state.phoneClothes.length === 0) {
      setState((s) => ({
        ...s,
        showNoClothesChoosenPhoneErrorNotification: true,
      }));
    } else {
      let sendDialogConfirmShow = [];
      let phoneClothes = [...state.phoneClothes];

      sendDialogConfirmShow.push(
        {
          speaker: "",
          text: "Então, eu devo vestir:",
          textTranslate: "So, I should wear:",
        },
        {
          speaker: "",
          text: phoneClothes
            .reduce((acc, clothing) => {
              return [...acc, clothing.fullName];
            }, [])
            .join("<br>"),
        },
        { speaker: "", text: "É isso?", textTranslate: "Is that it?" }
      );

      setState((s) => ({
        ...s,
        sendDialogConfirmShow,
        lastConfirmation: true,
      }));
    }
  };

  const removeClothesFromPhone = (index) => {
    let phoneClothes = [...state.phoneClothes];
    let item = phoneClothes.splice(index, 1)[0];
    let sendDialogShow = [...state.sendDialogShow];
    const category = ["Tronco", "Pernas", "Pés"].includes(item.category)
      ? item.category
      : "Acessórios";

    sendDialogShow.push(
      { speaker: "player", text: item.fullName },
      {
        speaker: "",
        text: "OK! Tirei aqui. Que mais?",
        textTranslate: "OK! Removed. What else?",
      }
    );

    setState((s) => ({
      ...s,
      phoneClothes,
      sendDialogShow,
      removeItemPhone: false,
      phoneWardrobe: {
        ...s.phoneWardrobe,
        [category]: state.phoneWardrobe[category].map((clothing) => {
          if (clothing.id === item.id) return { ...clothing, picked: false };
          return clothing;
        }),
      },
    }));
  };

  const removeAllClothesFromPhone = () => {
    let phoneWardrobe = {};

    Object.keys(state.phoneWardrobe).forEach((category) => {
      phoneWardrobe[category] = state.phoneWardrobe[category].map(
        (clothing) => ({
          ...clothing,
          picked: false,
        })
      );
    });

    setState((s) => ({
      ...s,
      phoneClothes: [],
      sendDialogShow: [
        {
          speaker: "",
          text: "E aí, que roupa uso?",
          textTranslate: "So, how should I dress?",
        },
      ],
      phoneWardrobe,
    }));
  };

  // END
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

  const checkPhoneBodyClothes = () => {
    const clothes = { ...state.clothes };
    const phoneClothes = [...state.phoneClothes];
    let errors = {
      wrongColors: [],
      inBodyNotInPhone: [],
      inPhoneNotInBody: [],
    };
    let clothesIds = [];

    for (var key in clothes) {
      for (let i = 0; i < clothes[key].length; i++) {
        let bodyClothing = clothes[key][i];
        clothesIds.push(bodyClothing.id);

        let phoneClothing = phoneClothes.find(
          (clothing) => clothing.id === bodyClothing.id
        );

        if (!phoneClothing) errors.inBodyNotInPhone.push(bodyClothing.id);
        else if (phoneClothing.color !== bodyClothing.color)
          errors.wrongColors.push({
            clothing: bodyClothing.name,
            rightColor: bodyClothing.color,
            userColor: phoneClothing.color,
          });
      }
    }

    errors.inPhoneNotInBody = phoneClothes
      .filter((clothing) => !clothesIds.includes(clothing.id))
      .map((clothing) => clothing.id);

    return errors;
  };

  const restart = () => {
    setState({ ...initialState() });
    dispatch(headerActions.setState(headerConstants.STATES.HIDDEN));
  };

  const endGame = (saveResult = true) => {
    let wrongClothes = getWrongClothes();
    let sawInvite =
      state.inviteQuestions.filter((question) => question.asked).length > 0;
    let feedbackMessages = [];
    let phoneBodyMatchErrors = checkPhoneBodyClothes();

    if (wrongClothes.length === 0 && checkFullOutfit()) {
      feedbackMessages.push({
        image: tomato,
        message:
          "Parabéns! Você montou um look perfeito para a ocasião." +
          (sawInvite
            ? " Ainda bem que você checou novamente as informações do evento. Já pensou se tivesse escolhido as roupas erradas?"
            : " E você nem precisou perguntar detalhes sobre o evento!"),
        messageTranslate:
          "Well done! You came up with the perfect outfit for the occasion." +
          (sawInvite
            ? " Good thing you checked the event informations again. What if you had picked the wrong pieces of clothing?"
            : " And you didn't even need to ask for the event's details!"),
      });
      if (
        Object.keys(phoneBodyMatchErrors).reduce((acc, key) => {
          return acc && phoneBodyMatchErrors[key].length === 0;
        }, true)
      ) {
        feedbackMessages.push({
          image: tomato,
          message:
            "A descrição que você fez das roupas que Ariel devia usar foi perfeita! Tudo foi entendido sem problemas.",
          messageTranslate:
            "Your description of the clothes Ariel should wear was perfect! It was understood with no problems.",
        });
      } else {
        feedbackMessages.push({
          image: tomato,
          message:
            "Apesar de ter montado um look fantástico, você não conseguiu descrevê-lo corretamente. Ariel sentiu insegurança na hora de se vestir, será que seus preciosos conselhos foram seguidos?",
          messageTranslate:
            "Even though you came up with a fantastic outfit, you couldn't describe it correctly. Ariel felt a bit insecure when dressing up... I wonder if your precious advice was followed?",
        });
      }
    } else if (wrongClothes.length === 0) {
      feedbackMessages.push({
        image: tomato,
        message: sawInvite
          ? "Apesar de ter checado as informações do evento novamente, o look que você montou não ficou completo... Tomara que Ariel não passe tanta vergonha..."
          : "Parece que você não montou um look adequado ao evento… Talvez se tivesse tirado dúvidas com Ariel sobre os detalhes da ocasião, você teria sido mais prestativo.",
        messageTranslate: sawInvite
          ? "Even though you checked the event informations again, the outfit you came up with doesn't look complete... Let's hope Ariel doesn't get too embarrassed..."
          : "It seems like you couldn't come up with an adequate outfit for the event... Maybe if you had asked Ariel again about the occasion's information, you could've been more helpful.",
      });

      if (
        Object.keys(phoneBodyMatchErrors).reduce((acc, key) => {
          return acc && phoneBodyMatchErrors[key].length === 0;
        }, true)
      ) {
        feedbackMessages.push({
          image: tomato,
          message:
            "A descrição que você fez das roupas que Ariel devia usar foi perfeita! Tudo foi entendido sem problemas. Pena que o look que você escolheu ficou incompleto...",
          messageTranslate:
            "Your description of the clothes Ariel should wear was perfect! It was understood with no problems. It is a shame that the outfit you picked was incomplete...",
        });
      } else {
        feedbackMessages.push({
          image: tomato,
          message:
            "Tem certeza que sua amizade com Ariel é verdadeira? Você montou um look incompleto para o evento e fez uma bagunça na hora de descrevê-lo. Ariel conseguiu sentir mais confusão do que antes... ",
          messageTranslate:
            "Are you sure Ariel is a true friend for you? You came up with a incomplete outfit and made a mess when describing it. Ariel is more lost than they ever were...",
        });
      }
    } else {
      feedbackMessages.push(
        {
          image: tomato,
          message: sawInvite
            ? "Apesar de ter checado as informações do evento, o look que você montou não combina com o evento e " +
              wrongClothes.length +
              " peça(s) ficou(ficaram) estranha(s)... Tomara que Ariel não passe tanta vergonha..."
            : "Parece que você não montou um look adequado ao evento… Talvez se tivesse tirado dúvidas com Ariel sobre os detalhes da ocasião, você teria sido mais prestativo.",
          messageTranslate: sawInvite
            ? "Even though you checked the event informations, the outfit you came up with doesn't match the event and " +
              wrongClothes.length +
              " piece(s) of clothing were weird... Let's hope Ariel doesn't get too embarrassed..."
            : "It seems like you couldn't come up with an adequate outfit for the event... Maybe if you had asked Ariel again about the occasion's information, you could've been more helpful.",
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
            " pieces that did not match the event: " +
            wrongClothes.map((clothes) => clothes.name).join(", "),
        }
      );

      if (
        Object.keys(phoneBodyMatchErrors).reduce((acc, key) => {
          return acc && phoneBodyMatchErrors[key].length === 0;
        }, true)
      ) {
        feedbackMessages.push({
          image: tomato,
          message:
            "A descrição que você fez das roupas que Ariel devia usar foi perfeita! Tudo foi entendido sem problemas. Pena que o look que você escolheu ficou meio estranho...",
          messageTranslate:
            "Your description of the clothes Ariel should wear was perfect! It was understood with no problems. It is a shame that the outfit you picked was a bit weird...",
        });
      } else {
        feedbackMessages.push({
          image: tomato,
          message:
            "Tem certeza que sua amizade com Ariel é verdadeira? Você montou um look bem estranho para o evento e fez uma bagunça na hora de descrevê-lo. Ariel conseguiu sentir mais confusão do que antes...",
          messageTranslate:
            "Are you sure Ariel is a true friend for you? You came up with a very weird outfit and made a mess when describing it. Ariel is more lost than they ever were...",
        });
      }
    }

    setState({
      ...state,
      scene: "END_GAME",
      won:
        wrongClothes.length === 0 &&
        checkFullOutfit() &&
        Object.keys(phoneBodyMatchErrors).reduce((acc, key) => {
          return acc && phoneBodyMatchErrors[key].length === 0;
        }, true),
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
          won:
            wrongClothes.length === 0 &&
            checkFullOutfit() &&
            Object.keys(phoneBodyMatchErrors).reduce((acc, key) => {
              return acc && phoneBodyMatchErrors[key].length === 0;
            }, true),
          sawInviteAgain: sawInvite,
          wrongClothesCount: wrongClothes.length,
          outfit: Object.keys(state.clothes).reduce((acc, key) => {
            return [
              ...acc,
              ...state.clothes[key].map((clothing) => clothing.id),
            ];
          }, []),
          character: state.choosenCharacter.id,
          wrongColors: phoneBodyMatchErrors.wrongColors.length
            ? JSON.stringify(phoneBodyMatchErrors.wrongColors)
            : null,
          inBodyNotInPhone: phoneBodyMatchErrors.inBodyNotInPhone,
          inPhoneNotInBody: phoneBodyMatchErrors.inPhoneNotInBody,
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
                    onBack={() => setState((s) => ({ ...s, back: true }))}
                    ready={Object.keys(state.wardrobe).length > 0}
                  />
                );
              case "INTRO":
                return (
                  <React.Fragment>
                    {state.showTutorialBlob && (
                      <TutorialBlob
                        text={
                          state.tutotialMessages[state.tutorialBlobCount].text
                        }
                        translation={
                          state.tutotialMessages[state.tutorialBlobCount]
                            .textTranslate
                        }
                        position={
                          state.tutotialMessages[state.tutorialBlobCount]
                            .position
                        }
                        endTutorial={
                          state.tutorialBlobCount ===
                          state.tutotialMessages.length - 1
                        }
                        onContinue={() =>
                          setState((s) => ({
                            ...s,
                            tutorialBlobCount: s.tutorialBlobCount + 1,
                            showTutorialBlob: false,
                          }))
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          zIndex: 10,
                          top: 0,
                          backgroundColor: "rgba(255,255,255,0.66)",
                        }}
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
                        {state.characters.map((character, index) => (
                          <DressingCharacter
                            key={index}
                            clothes={state.clothes}
                            character={character}
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
                                showCellphone: true,
                                chooseCharacterScreen: false,
                              }))
                            }
                          />
                        ))}
                      </div>
                    )}

                    {state.showCellphone && (
                      <CellphoneOverlay
                        autoLoad={state.introDialog.length > 0 || !state.endIntroDialog}
                        startMaximized={true}
                        showCloseButton={false}
                        dialogHistory={state.introDialogShow}
                        onMinimize={() =>
                          setState((s) => ({ ...s, shouldMinimize: false }))
                        }
                        shouldMinimize={state.shouldMinimize}
                        stopConversation={state.endIntroDialog}
                        nextMessage={showIntroDialog}
                        endConversation={() =>
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
                            "Tem certeza? Você terá apenas UMA chance de perguntar cada informação do evento. Deseja continuar?",
                          textTranslate:
                            "Are you sure? You will have only ONE chance to ask each event information. Do you want to continue?",
                        }}
                        continueButtonLabel="Continuar/Continue"
                        onClickToContinue={() =>
                          setState((s) => ({
                            ...s,
                            scene: "DRESS",
                            proceedToDressingConfirmation: false,
                            dressingContext: true,
                            showInvitation: false,
                            showTutorialBlob: true,
                          }))
                        }
                        backButtonLabel="Ver conversa/View conversation"
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
                    {state.showTutorialBlob && (
                      <TutorialBlob
                        text={
                          state.tutotialMessages[state.tutorialBlobCount].text
                        }
                        translation={
                          state.tutotialMessages[state.tutorialBlobCount]
                            .textTranslate
                        }
                        position={
                          state.tutotialMessages[state.tutorialBlobCount]
                            .position
                        }
                        endTutorial={
                          state.tutorialBlobCount ===
                          state.tutotialMessages.length - 1
                        }
                        onContinue={() => {
                          if (
                            state.tutorialBlobCount <
                            state.tutotialMessages.length - 1
                          )
                            setState((s) => ({
                              ...s,
                              tutorialBlobCount: s.tutorialBlobCount + 1,
                            }));
                          else
                            setState((s) => ({
                              ...s,
                              tutorialBlobCount: s.tutorialBlobCount + 1,
                              showTutorialBlob: false,
                            }));
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          zIndex: 10,
                          position: "absolute",
                          top: 0,
                          backgroundColor: "rgba(255,255,255,0.66)",
                        }}
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
                            zIndex: state.tutorialBlobCount === 2 ? 1000000 : 0,
                            position: "absolute",
                            bottom: "5em",
                            left: "30em",
                          }}
                        />

                        <Wardrobe
                          style={{
                            zIndex: state.tutorialBlobCount === 1 ? 1000000 : 0,
                            position: "absolute",
                            right: "9.5em",
                            top: "10.8em",
                            width: "86em",
                            height: "86em",
                          }}
                          wardrobe={state.wardrobe}
                          onClothesClick={
                            state.showTutorialBlob ? () => {} : addClothesToBody
                          }
                        />

                        <Lamp
                          img={[camera]}
                          onClick={
                            state.showTutorialBlob
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
                            zIndex: state.tutorialBlobCount === 4 ? 1000000 : 0,
                          }}
                        />

                        <CellphoneOverlay
                          autoLoad={false}
                          dialogHistory={state.dressDialogShow}
                          onMinimize={() =>
                            setState((s) => ({ ...s, shouldMinimize: false }))
                          }
                          shouldMinimize={state.shouldMinimize}
                          nextMessage={showIntroDialog}
                          endConversation={() =>
                            setState((s) => ({
                              ...s,
                              proceedToDressingConfirmation: true,
                            }))
                          }
                          questions={state.inviteQuestions}
                          addAnswerToDialog={addAnswerToDialogDress}
                          shouldOverlayAll={state.tutorialBlobCount === 3}
                        />
                      </React.Fragment>
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

                        <div
                          className="confirm-blob"
                          style={{ textAlign: "center" }}
                        >
                          <div
                            className="blob-spans"
                            style={{ fontSize: "1.5em", padding: "8%" }}
                          >
                            <span lang="pt-br">
                              Terminou de escolher o look ideal para Ariel ir à
                              festa?
                            </span>
                            <span lang="en">
                              Are you done choosing the outfit Ariel should wear
                              to the party?
                            </span>
                          </div>
                          <div
                            style={{
                              backgroundColor: "#fbbba3",
                              borderRadius: "100px",
                              padding: "8%",
                              fontSize: "1.2em",
                            }}
                          >
                            <span lang="pt-br">
                              Atenção: A partir desse momento você não poderá
                              mais alterar as roupas escolhidas.
                            </span>
                            <span lang="en">
                              Atention: From now on you will no longer be able
                              to change your chosen clothes.{" "}
                            </span>
                          </div>
                          <div className="btns">
                            <Voltar
                              label="Ainda não/Not yet"
                              onClick={() =>
                                setState((s) => ({
                                  ...s,
                                  ready: false,
                                  dressingContext: true,
                                }))
                              }
                            />
                            <Iniciar
                              label="Sim!/Yes!"
                              onClick={() =>
                                setState((s) => ({
                                  ...s,
                                  scene: "SEND",
                                  showTutorialBlob: true,
                                  tutorialBlobCount: 0,
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              case "SEND":
                return (
                  <React.Fragment>
                    {state.showTutorialBlob && (
                      <div className="tutorial-notification">
                        <div className="utorial-notification-content">
                          <div className="tutorial-notification-message blob-right">
                            <span lang="pt-br">
                              {
                                state.tutorialPhoneBlobsText[
                                  state.tutorialBlobCount
                                ].text
                              }
                            </span>
                            <span lang="en">
                              {
                                state.tutorialPhoneBlobsText[
                                  state.tutorialBlobCount
                                ].textTranslate
                              }
                            </span>
                            {state.tutorialBlobCount === 2 && (
                              <Button
                                blink
                                colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_3}
                                onClick={() =>
                                  setState((s) => ({
                                    ...s,
                                    showTutorialBlob: false,
                                  }))
                                }
                              >
                                Entendi! / Got it!
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
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
                      <Cellphone
                        style={{ left: "10em" }}
                        // BOOLS
                        stopConversation={state.lastConfirmation}
                        showClothes={state.showPhoneClothes}
                        //DATA
                        dialogHistory={
                          state.lastConfirmation
                            ? state.sendDialogConfirmShow
                            : state.sendDialogShow
                        }
                        wardrobe={state.phoneWardrobe}
                        phoneClothes={state.phoneClothes}
                        colors={state.colorTags}
                        // FUCTIONS
                        endConversation={() =>
                          setState((s) => ({
                            ...s,
                            lastConfirmation: true,
                          }))
                        }
                        addAnswerToDialog={addAnswerToDialogSend}
                        addRemoveDialog={() => {
                          setState((s) => ({
                            ...s,
                            sendDialogShow: [
                              ...s.sendDialogShow,
                              {
                                speaker: "player",
                                text: "Acho que falei alguma coisa errada...",
                                textTranslate:
                                  "I think I said something wrong...",
                              },
                              {
                                speaker: "",
                                text: "Qual item devo tirar da lista?",
                                textTranslate:
                                  "Which item should I remove from the list?",
                              },
                            ],
                          }));
                        }}
                        addCancelRemoveDialog={() => {
                          setState((s) => ({
                            ...s,
                            sendDialogShow: [
                              ...s.sendDialogShow,
                              {
                                speaker: "player",
                                text:
                                  "Me confundi, ta tudo certo haha deixa pra lá",
                                textTranslate:
                                  "I got confused, it's all good haha never mind",
                              },
                              {
                                speaker: "",
                                text: "Sem problemas hahaha o que mais?",
                                textTranslate: "No problem haha what else?",
                              },
                            ],
                          }));
                        }}
                        cancelAddAnswerToDialog={cancelAddAnswerToDialog}
                        removeClothingFromList={removeClothesFromPhone}
                        removeAllClothes={removeAllClothesFromPhone}
                        confirmationButton={
                          state.lastConfirmation ? () => endGame() : sendReady
                        }
                        cancelButton={() =>
                          setState((s) => ({ ...s, lastConfirmation: false }))
                        }
                      />
                    </div>
                  </React.Fragment>
                );
              case "END_GAME":
                return (
                  <div>
                    <div className="feedback absolute-center">
                      <FeedbackPanel
                        feedback={state.feedbackMessages}
                        won={state.won}
                        restart={restart}
                        leave={() => setState((s) => ({ ...s, back: true }))}
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
        </React.Fragment>
      ) : (
        <div>Loading..</div>
      )}
      {state.back && <Redirect to="/userspace" />}
    </React.Fragment>
  );
};
/*
<div>
  {!state.selectedClothesName &&
    mission.clothes.map((item, index) =>
    <button key={index} onClick={()=> setState({...state, selectedClothesName: item.name})}>
      {item.name}
    </button>
  )}
  {!state.selectedColor &&
    mission.clothes.map((item, index) =>
    <button key={index} onClick={()=> setState({...state, selectedColor: item.color})}>
      {item.color}
    </button>
  )}
  <div>
    {state.selectedClothesName}
  </div>
  <div>
    {state.selectedColor}
  </div>
</div>

*/
export default Game6;
