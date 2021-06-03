import React from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
// import { Link, Redirect } from "react-router-dom";
import { Redirect } from "react-router-dom";

import {
  apiActions,
  gameActions,
  headerActions,
  musicActions,
} from "../../_actions";
import { headerConstants } from "../../_constants";

import Init from "../../_components/Init";
import Intro from "../Game3/components/Intro";
import ChefDialog from "../Game3/components/ChefDialog";
import Timer from "../../_components/Timer";
import Recipe from "../../_components/Recipe";

import initialState from "./initialState";

import { zeroFill, shuffle } from "../../_helpers";
import {
  // listIcon,
  silverCloche,
  hourglassEmpty,
  hourglassFull,
  right,
  blobLaranja,
  error,
  tomato,
  kitchen,
} from "../../img";
import DialogCharacter from "../../_components/DialogCharacter";
import FeedbackPanel from "./components/FeedbackPanel";
import Tutorial from "./components/Tutorial";
import { Button } from "@material-ui/core";

const Game4 = (props) => {
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

  let currentPlaySession = useSelector((state) =>
    state.play_sessions ? state.play_sessions.items[0] : {}
  );
  const { play_sessionsActions } = apiActions;
  // const { missionsActions, play_sessionsActions, player_actionsActions, user_game_resultsActions } = apiActions
  const timesPlayed = useSelector((state) => state.game.items.resultsCount);

  React.useEffect(() => {
    if (mission) dispatch(musicActions.set(mission.backgroundAudio.url));
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
      state.ingredientsList.length === 0 &&
      timesPlayed !== undefined
    ) {
      let initTime =
        missionData.seconds - 60 * (timesPlayed > 2 ? 2 : timesPlayed);
      let remainingTime = initTime;

      // safe copies

      let recipe =
        missionData.recipes[
          Math.floor(Math.random() * missionData.recipes.length)
        ];

      let resumeRecipe = {
        id: recipe.id,
        name: recipe.name,
        nameTranslate: recipe.nameTranslate.find((name) => {
          return name.language.id === lang;
        }).text,
        description: recipe.description,
        descriptionTranslate: recipe.descriptionTranslate.find(
          (description) => {
            return description.language.id === lang;
          }
        ).text,
        image: recipe.image ? recipe.image.url : "",
      };

      let ingredientsList = recipe.ingredients
        .map((ingredient) => {
          return {
            name: ingredient.asset.name,
            description: ingredient.description,
            order: ingredient.order,
            done: false,
          };
        })
        .sort((a, b) => (a.order > b.order ? 1 : -1));

      let shuffledIngredients = shuffle(
        recipe.ingredients.map((ingredient) => {
          return {
            name: ingredient.asset.name,
            shuffleName: ingredient.shuffleName.toUpperCase(),
            nameShuffled: shuffle(
              ingredient.shuffleName.toUpperCase().split("")
            ),
            image: ingredient.asset.image ? ingredient.asset.image.url : "",
            done: false,
          };
        })
      );

      let tablewares = recipe.tablewares.map((tableware) => {
        return {
          name: tableware.asset.name,
          image: tableware.asset.image ? tableware.asset.image.url : "",
          correct: tableware.correct,
        };
      });

      setState((state) => {
        return {
          ...state,
          recipe: resumeRecipe,
          ingredientsList,
          shuffledIngredients,
          tablewares,
          remainingTime,
          initTime,
        };
      });
    }
  }, [missionData, state.ingredientsList, timesPlayed, lang]);

  const onStartGame = () => setState({ ...state, scene: "INTRO" });

  const checkRightIngredient = () => {
    let currentIngredient = state.ingredientsList.find(
      (ingredient) => !ingredient.done
    );

    console.log(state.wrongIngredientSelected);

    if (state.selectedIngredient.name !== currentIngredient.name) {
      setState({
        ...state,
        wrongIngredientNotification: true,
        wrongIngredientSelected: [
          ...state.wrongIngredientSelected,
          {
            rightIngredient: currentIngredient.name,
            userSelected: state.selectedIngredient.name,
          },
        ],
      });
    } else {
      let updatedState = {
        showIngredients: false,
        sortNameIngredient: state.selectedIngredient,
        selectedIngredient: null,
        shuffledName: state.selectedIngredient.nameShuffled.map((letter) => {
          return {
            letter: letter,
            selected: false,
          };
        }),
      };

      console.log(
        state.ingredientsList.findIndex(
          (ingredient) => ingredient.name === currentIngredient.name
        )
      );

      if (
        state.ingredientsList.findIndex(
          (ingredient) => ingredient.name === currentIngredient.name
        ) === 0
      ) {
        updatedState.tutorialIngredientNameSelectionNotification = true;
        updatedState.runTimer = false;
      }

      setState({
        ...state,
        ...updatedState,
      });
    }
  };

  const checkIngredientName = () => {
    if (
      state.sortNameIngredient.shuffleName ===
      state.userLetterOrder.reduce((acc, letter) => acc + letter.letter, "")
    ) {
      let updateIngredientsList = state.ingredientsList.map((ingredient) => {
        if (ingredient.name === state.sortNameIngredient.name)
          return {
            ...ingredient,
            done: true,
          };
        return ingredient;
      });

      let updateShuffledIngredients = state.shuffledIngredients.map(
        (ingredient) => {
          if (ingredient.name === state.sortNameIngredient.name)
            return {
              ...ingredient,
              done: true,
            };
          return ingredient;
        }
      );

      if (
        updateIngredientsList.find((ingredient) => !ingredient.done) ===
        undefined
      ) {
        setState({
          ...state,
          doneCooking: true,
          runTimer: false,
        });
      } else {
        setState({
          ...state,
          sortNameIngredient: null,
          ingredientsList: updateIngredientsList,
          shuffledIngredients: updateShuffledIngredients,
          showIngredients: true,
          userLetterOrder: [],
          tableIngredients: [
            ...state.tableIngredients,
            state.sortNameIngredient,
          ],
          // showRecipe: true,
          // recipeContinue: true,
        });
      }
    } else {
      setState({
        ...state,
        wrongIngredientNameNotification: true,
        wrongIngredientNameOrder: [
          ...state.wrongIngredientNameOrder,
          {
            writeOrderName: state.sortNameIngredient.shuffleName,
            userOrderInput: state.userLetterOrder.reduce(
              (acc, letter) => acc + letter.letter,
              ""
            ),
          },
        ],
      });
    }
  };

  const clearIngredientName = () => {
    setState({
      ...state,
      wrongIngredientNameNotification: false,
      userLetterOrder: [],
      shuffledName: state.sortNameIngredient.nameShuffled.map((letter) => {
        return {
          letter: letter,
          selected: false,
        };
      }),
    });
  };

  const addLetter = (letter, index) => () => {
    let updateShuffedName = [...state.shuffledName];

    updateShuffedName[index].selected = true;

    setState({
      ...state,
      shuffledName: updateShuffedName,
      userLetterOrder: [...state.userLetterOrder, letter],
    });
  };

  const moveToServing = () => {
    setState({
      ...state,
      scene: "SERVE",
      runTimer: true,
      shuffledTablewares: shuffle(
        state.tablewares.map((tableware) => {
          return {
            name: tableware.name,
            image: tableware.image,
            correct: tableware.correct,
            choosen: false,
          };
        })
      ),
      shuffledTablewaresNames: shuffle(
        state.tablewares.reduce((acc, tableware) => {
          return [...acc, { name: tableware.name, choosen: false }];
        }, [])
      ),
      tutorialTablewareSelectionNotification: true,
    });
  };

  const addTableware = (selectedTableware) => () => {
    if (selectedTableware.name !== state.tablewareImageSelected.name) {
      setState({
        ...state,
        wrongCombiantionNotification: true,
        wrongTablewarePairSelected: [
          ...state.wrongTablewarePairSelected,
          {
            imageSelected: state.tablewareImageSelected.name,
            nameSelected: selectedTableware.name,
          },
        ],
      });
    } else {
      setState({
        ...state,
        shuffledTablewaresNames: state.shuffledTablewaresNames.map(
          (tableware) => {
            if (tableware.name === selectedTableware.name)
              return {
                ...tableware,
                choosen: true,
              };

            return tableware;
          }
        ),
        shuffledTablewares: state.shuffledTablewares.map((tableware) => {
          if (tableware.name === state.tablewareImageSelected.name)
            return {
              ...tableware,
              choosen: true,
            };

          return tableware;
        }),
        tablewareImagePick: true,
        tableTablewares: [
          ...state.tableTablewares,
          state.tablewareImageSelected,
        ],
        tablewareImageSelected: null,
      });
    }
  };

  const checkTableware = () => {
    setState({
      ...state,
      wrongTablewareSelected: state.tableTablewares
        .filter((tableware) => !tableware.correct)
        .map((tableware) => {
          return { name: tableware.name };
        }),
      endConfirmation: true,
      runTimer: false,
    });
  };

  // const clearTableTableware = () => {
  //   setState({
  //     ...state,
  //     wrongTablewareNotification: false,
  //     shuffledTablewaresNames: state.shuffledTablewaresNames.map(
  //       (tableware) => {
  //         return {
  //           ...tableware,
  //           choosen: false,
  //         };
  //       }
  //     ),
  //     shuffledTablewares: state.shuffledTablewares.map((tableware) => {
  //       return {
  //         ...tableware,
  //         choosen: false,
  //       };
  //     }),
  //   });
  // };

  const restart = () => {
    setState({ ...initialState(false) });
    dispatch(headerActions.setState(headerConstants.STATES.HIDDEN));
  };

  const endGame = (timeUp, saveResult = true) => {
    setState({
      ...state,
      scene: "END_GAME",
      timeUp: timeUp,
      feedbackMessages: [
        {
          image: tomato,
          message: state.wrongIngredientSelected.length
            ? "Você se atrapalhou um pouco, mas conseguiu pegar as quantidades certas de ingredientes no final!"
            : "Você pegou os ingredientes certos de primeira!",
          messageTranslate: state.wrongIngredientSelected.length
            ? "You messed it up a bit but managed to get the right ingredientes!"
            : "You picked the right ingredients on your first try!",
        },
        {
          image: tomato,
          message: state.wrongIngredientNameOrder.length
            ? "Dar nomes aos ingredientes te deu algum trabalho!"
            : "Acertar os nomes foi moleza para você!",
          messageTranslate: state.wrongIngredientNameOrder.length
            ? "Naming the ingredients gave you some trouble!"
            : "Getting the names right was a piece of cake for you!",
        },
        {
          image: tomato,
          message: state.wrongTablewarePairSelected.length
            ? "Você teve um pouco de dificuldade em ligar os utensílios aos seus nomes."
            : "Ligar os utensílios aos seus nomes foi fácil para você!",
          messageTranslate: state.wrongTablewarePairSelected.length
            ? "Matching the kitchen utensils with their names was a bit tough for you."
            : "Matching the kitchen utensils with their names was pretty easy for you!",
        },
        {
          image: tomato,
          message: state.wrongTablewareSelected.length
            ? "E você tem alguns problemas sobre como servir sua comida..."
            : "E você sabe exatamente onde servir sua comida!",
          messageTranslate: state.wrongTablewareSelected.length
            ? "And you've got some problems with how to serve your food..."
            : "And you know exactly where to serve your food!",
        },
      ],
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

    if (saveResult)
      dispatch(
        gameActions.create("results", {
          user: userId,
          mission: mission.id,
          secondsTaken: timeUp
            ? state.initTime + 1
            : state.initTime - state.remainingTime,
          recipe: state.recipe.id,
          won: !timeUp,
          wrongIngredientSelected: state.wrongIngredientSelected.length
            ? JSON.stringify(state.wrongIngredientSelected)
            : null,
          wrongIngredientNameOrder: state.wrongIngredientNameOrder.length
            ? JSON.stringify(state.wrongIngredientNameOrder)
            : null,
          wrongTablewarePairSelected: state.wrongTablewarePairSelected.length
            ? JSON.stringify(state.wrongTablewarePairSelected)
            : null,
          wrongTablewareSelected: state.wrongTablewareSelected.length
            ? JSON.stringify(state.wrongTablewareSelected)
            : null,
        })
      );
  };

  return (
    <React.Fragment>
      {process.env.NODE_ENV === "development" && (
        <div style={{ position: "absolute", zIndex: 100000000, top: 0 }}>
          <button onClick={() => setState({ ...state, runTimer: false })}>
            Stop timer
          </button>
          <button onClick={restart}>Restart</button>
          <button onClick={() => endGame(false, false)}>End game win</button>
          <button onClick={() => endGame(true, false)}>End game lose</button>
          <button
            onClick={() =>
              setState({
                ...state,
                scene: "COOK",
                tutorialIngredientSelectionNotification: true,
              })
            }
          >
            Cooking
          </button>
          <button onClick={moveToServing}>Serving</button>
        </div>
      )}
      {mission ? (
        //verificar se é possível generalizar esses gameX-wrapper
        <React.Fragment>
          {(function renderScene() {
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
                    ready={state.ingredientsList.length > 0}
                  />
                );
              case "INTRO":
                return (
                  <Intro
                    recipe={state.recipe}
                    chef={missionData.character}
                    ingredientsList={state.ingredientsList}
                    goToTutorial={() =>
                      setState({
                        ...state,
                        scene: "COOK"
                      })
                    }
                    seconds={state.remainingTime}
                  />
                );
              case "COOK":
                return (
                  <React.Fragment>
                    <img id="dialog-interact" src={kitchen} style={{position:'absolute', zIndex: -1, width: '100%', height: '100%'}}/>
                    <Tutorial />

                    <Timer style={{ position: "absolute", top: "5%", left: "50%" }}
                      run={state.runTimer}
                      seconds={state.remainingTime}
                      onStop={(remaining) => {
                        setState({
                          ...state,
                          remainingTime: remaining,
                        });
                      }}
                      onEnd={() => endGame(true)}
                    />

                    {!state.doneCooking && state.showIngredients && (
                      <Recipe
                        ingredientsList={state.ingredientsList}
                        hasImage={false}
                        showCheck={(ingredient) => ingredient.done}
                        iconShouldShow={!state.recipeContinue}
                      />
                    )}

                    {!state.doneCooking &&
                      (state.showIngredients ? (
                        <React.Fragment>
                          <div className="shuffled-ingredients">
                            {state.shuffledIngredients.map(
                              (ingredient, index) => (
                                <img   key={"suffled-ingredient-" + index} src={ingredient.image} alt=""
                                  onClick={() => setState({...state, selectedIngredient: { ...ingredient }})}
                                  style={{
                                    opacity: ingredient.done ? 0 : 1,
                                    pointerEvents: ingredient.done
                                      ? "none"
                                      : "auto",
                                    width: '12%',
                                  }}
                                  className={
                                    (state.selectedIngredient
                                      ? ingredient.name ===
                                        state.selectedIngredient.name
                                        ? "selected"
                                        : ""
                                      : "") +
                                    (index % 2
                                      ? " ingredient-selection-img-even"
                                      : " ingredient-selection-img-odd") +
                                    " ingredient-selection-img"
                                  }
                                />
                              )
                            )}
                          </div>
                          {state.selectedIngredient && (
                            <button
                              className="btn btn-add-to-conter"
                              onClick={checkRightIngredient}
                            >
                              Adicionar à bancada
                            </button>
                          )}
                        </React.Fragment>
                      ) : (
                        <div className="name-order-div absolute-center">
                          <div className="shuffled-letters">
                            {state.shuffledName.map((letter, index) => (
                              <span
                                key={index}
                                onClick={addLetter(letter, index)}
                                style={{
                                  opacity: letter.selected ? 0 : 1,
                                  pointerEvents: letter.selected
                                    ? "none"
                                    : "auto",
                                }}
                                className="letter"
                              >
                                {letter.letter}
                              </span>
                            ))}
                          </div>
                          <div className="ordered-letters-div">
                            <div className="ordered-letters">
                              {state.userLetterOrder.reduce(
                                (acc, letter) => acc + letter.letter,
                                ""
                              )}
                            </div>
                            <div className="ordered-letters-buttons">
                              <img
                                onClick={clearIngredientName}
                                src={error}
                                alt="clear-ingredient-name"
                              />
                              <img
                                onClick={checkIngredientName}
                                src={right}
                                alt="check-ingredient-name"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                    {state.wrongIngredientNotification && (
                      <div className="overlay-error-notification">
                        <div className="overlay-error-notification-content">
                          <img
                            src={blobLaranja}
                            alt=""
                            className="error-notification-blob absolute-center"
                          />
                          <div className="error-notification-message absolute-center">
                            <span>
                              Esse item não é o que você precisa agora.
                            </span>
                            <button
                              className="btn"
                              onClick={() =>
                                setState({
                                  ...state,
                                  selectedIngredient: null,
                                  wrongIngredientNotification: false,
                                })
                              }
                            >
                              Continuar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {state.wrongIngredientNameNotification && (
                      <div className="overlay-error-notification">
                        <div className="overlay-error-notification-content">
                          <img
                            src={blobLaranja}
                            alt=""
                            className="error-notification-blob absolute-center"
                          />
                          <div className="error-notification-message absolute-center">
                            <span>
                              {state.userLetterOrder.reduce(
                                (acc, letter) => acc + letter.letter,
                                ""
                              )}{" "}
                              não serve para sua receita.
                            </span>
                            <button
                              className="btn"
                              onClick={() => clearIngredientName()}
                            >
                              Continuar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {!state.doneCooking &&
                      (state.showIngredients ? (
                        <div className="conter">
                          {state.tableIngredients.map((ingredient, index) => (
                            <img
                              src={ingredient.image}
                              alt={ingredient.name}
                              key={ingredient.name}
                              className={
                                "conter-ingredient" +
                                (index % 2
                                  ? " conter-ingredient-even"
                                  : " conter-ingredient-odd")
                              }
                              style={{
                                width:
                                  (
                                    70 / state.shuffledIngredients.length
                                  ).toString() + "vw",
                              }}
                            />
                          ))}
                          {[
                            ...Array(
                              state.ingredientsList.length -
                                state.tableIngredients.length
                            ),
                          ].map((item, index) => (
                            <div
                              key={index}
                              className={
                                "conter-ingredient" +
                                (index % 2
                                  ? " conter-ingredient-even"
                                  : " conter-ingredient-odd")
                              }
                              style={{
                                width:
                                  (
                                    70 / state.shuffledIngredients.length
                                  ).toString() + "vw",
                                height: "4vh",
                              }}
                            ></div>
                          ))}

                        </div>
                      ) : (
                        <div>
                          <div className="conter"></div>
                          <img
                            src={state.sortNameIngredient.image}
                            alt=""
                            className="conter-ingredient-solo absolute-center"
                          />
                        </div>
                      ))}

                    {state.doneCooking && (
                      <ChefDialog chef={missionData.character} onContinue={moveToServing}
                        text={"Parabéns! Parece bom, mas você não vai me servir na panela, né? Escolha <strong>três</strong> utensílios adequados para servir seu prato! Nem mais, nem menos."}
                        translation={"Congratulations! It looks good, but you're not going to serv me in the pan, are you? Choose <strong>three</strong> approppriate utensils to serve your dish! No more, no less."}
                      />
                    )}
                  </React.Fragment>
                );
              case "SERVE":
                return (
                  <React.Fragment>
                    <Timer style={{ position: "absolute", top: "5%", left: "50%" }}
                      run={state.runTimer}
                      seconds={state.remainingTime}
                      onStop={(remaining) => setState( s => ({...s, remainingTime: remaining})) }
                      onEnd={() => endGame(true)}
                    />
                    {!state.endConfirmation && (
                      <React.Fragment>
                        {state.wrongCombiantionNotification && (
                          <div className="overlay-error-notification">
                            <div className="overlay-error-notification-content">
                              <img
                                src={blobLaranja}
                                alt=""
                                className="error-notification-blob absolute-center"
                              />
                              <div className="error-notification-message absolute-center">
                                <span>Esse não é o nome desse item.</span>
                                <button
                                  className="btn"
                                  onClick={() =>
                                    setState({
                                      ...state,
                                      tablewareImagePick: true,
                                      tablewareImageSelected: null,
                                      wrongCombiantionNotification: false,
                                    })
                                  }
                                >
                                  Continuar
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {state.tutorialTablewareSelectionNotification && (
                          <div className="smaller-tutorial-notification-message">
                            <div style={{position: 'relative', display: 'block', bottom: 0, margin: '20% auto', width: '30%', textAlign: 'center'}}>Quais 3 utensilios você vai escolher?</div>
                          </div>
                        )}

                        {state.tableTablewares.length === 3 && (
                          <img
                            onClick={() => checkTableware()}
                            src={silverCloche}
                            alt=""
                            className="serve-button"
                          />
                        )}

                        <div className="shuffled-tablewares">
                          {state.shuffledTablewares.map(
                            (tableware, index) => (
                              <img key={index} src={tableware.image}
                                style={{opacity: tableware.choosen
                                        ? 0
                                        : !state.tablewareImagePick
                                        ? 0.4
                                        : 1,
                                      pointerEvents: tableware.choosen
                                        ? "none"
                                        : !state.tablewareImagePick
                                        ? "none"
                                        : "auto",
                                      width: '10%',
                                }}
                                onClick={() =>
                                  setState(s => ({
                                    ...s,
                                    tutorialTablewareSelectionNotification: false,
                                    tablewareImagePick: false,
                                    tablewareImageSelected: tableware,
                                  }))
                                }
                                className={
                                  (state.tablewareImageSelected
                                    ? tableware.name ===
                                      state.tablewareImageSelected.name
                                      ? "selected-tableware"
                                      : ""
                                    : "") + " ingredient-selection-img"
                                }
                                alt=""
                              />
                            )
                          )}
                        </div>
                        <div className="shuffled-tableware-names">
                          {state.shuffledTablewaresNames.map(
                            (tableware, index) => (
                              <span
                                key={index}
                                style={{
                                  opacity: tableware.choosen
                                    ? 0
                                    : state.tablewareImagePick
                                    ? 0.4
                                    : 1,
                                  pointerEvents: tableware.choosen
                                    ? "none"
                                    : state.tablewareImagePick
                                    ? "none"
                                    : "auto",
                                  width:
                                    (
                                      60 / state.shuffledTablewares.length
                                    ).toString() + "vw",
                                }}
                                onClick={addTableware(tableware)}
                              >
                                {tableware.name}
                              </span>
                            )
                          )}
                        </div>

                        <div className="conter">
                          {state.tableTablewares.map((tableware, index) => (
                            <img
                              key={index}
                              src={tableware.image}
                              alt=""
                              className="table-tableware-space"
                            />
                          ))}
                          {console.log(Array(3 - state.tableTablewares.length))}
                          {[...Array(3 - state.tableTablewares.length)].map(
                            (item, index) => (
                              <div className="table-tableware-space"></div>
                            )
                          )}
                        </div>
                      </React.Fragment>
                    )}

                    {state.endConfirmation &&
                      <ChefDialog chef={missionData.character}
                        onContinue={() => endGame(false) }
                        text={"Parabéns! Você é o mais novo finalista do MestreCuca! Agora, aguarde a deliberação dos jurados."}
                        translation={"Congrats! You are the brand new finalist of MestreCuca! Now, wait while the judges decide."}
                      />
                    }
                  </React.Fragment>
                );
              case "END_GAME":
                return (
                  <div
                    className={
                      state.timeUp ? "salmon-background" : "blue-background"
                    }
                  >
                    <div className="game-4-feedback absolute-center">
                      {state.timeUp ? (
                        <div>
                          <div className="game-4-feedback-lose">
                            <div className="game-4-feedback-lose-content">
                              <img src={hourglassEmpty} alt="hourglass-empty" />
                              <span className="abril-fatface game-4-time-up-title">
                                O tempo acabou!
                              </span>
                              <div className="game-4-time-up-text">
                                <span lang="pt-br">
                                  Preparar o prato perfeito não é uma tarefa
                                  fácil!
                                </span>
                                <span
                                  lang="en"
                                  className="italic white-line-before"
                                >
                                  Time is up! Making the perfect dish is not an
                                  easy task.
                                </span>
                              </div>
                            </div>
                            <div
                              className="big-time-shower"
                              style={{
                                backgroundImage: "url(" + blobLaranja + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                              }}
                            >
                              <span className="absolute-center abril-fatface">
                                0:00
                              </span>
                            </div>
                          </div>
                          <div
                            id="feedback-endGame-action-btns"
                            style={{ marginTop: "5vh" }}
                          >
                            <Button onClick={restart}>Tentar novamente</Button>
                            <Button
                              onClick={() => setState({ ...state, back: true })}
                            >
                              Sair do jogo
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="game-4-feedback-win">
                          <div className="game-4-feedback-left">
                            <div className="game-4-finished-in">
                              <img src={hourglassFull} alt="hourglass-full" />
                              <div className="game-4-finished-in-text">
                                <span lang="pt-br" className="abril-fatface">
                                  Você finalizou em:
                                </span>
                                <span
                                  lang="en"
                                  className="salmon-line-before italic line-before-margin-top-5"
                                >
                                  Finished in:
                                </span>
                              </div>
                            </div>
                            <div
                              className="time-shower"
                              style={{
                                backgroundImage: "url(" + blobLaranja + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                              }}
                            >
                              <span className="absolute-center abril-fatface">
                                {zeroFill(
                                  Math.floor(
                                    (state.initTime - state.remainingTime) / 60
                                  ).toString(),
                                  2
                                )}
                                :
                                {zeroFill(
                                  (
                                    (state.initTime - state.remainingTime) %
                                    60
                                  ).toString(),
                                  2
                                )}
                              </span>
                            </div>
                          </div>
                          <FeedbackPanel
                            feedback={state.feedbackMessages}
                            restart={restart}
                            leave={() => setState({ ...state, back: true })}
                          />
                        </div>
                      )}
                    </div>
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

export default Game4;
