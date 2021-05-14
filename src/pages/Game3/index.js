import React from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";

import {
  apiActions,
  gameActions,
  headerActions,
  musicActions,
} from "../../_actions";
import { headerConstants } from "../../_constants";

import Button from "@material-ui/core/Button";

import Init from "../Game2/components/Init";
import Timer from "./components/Timer";
import initialState from "./initialState";
import Aisle from "./components/Aisle";
import Intro from "./components/Intro";
import Tutorial from "./components/Tutorial";

import cart from "../../img/Game3/cart.svg";
import ingredientsListBg from "../../img/Game3/ingredients-list.svg";
import listCheck from "../../img/Game3/check.svg";
import listIcon from "../../img/Game3/list-icon.svg";
import checkout from "../../img/Game3/checkout.svg";

import { numberToMoney } from "../../_helpers";

const goRound = (value, max) =>
  value >= 0 ? value % max : max - (Math.abs(value) % max);

const shuffle = (array) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const splitArrayIntoChunksOfLen = (arr, len) => {
  var chunks = [],
    i = 0,
    n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
};

const Game3 = (props) => {
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
  const missionData = mission ? mission.missionData : null;

  let currentPlaySession = useSelector((state) =>
    state.play_sessions ? state.play_sessions.items[0] : {}
  );
  const { play_sessionsActions } = apiActions;
  // const { missionsActions, play_sessionsActions, player_actionsActions, user_game_resultsActions } = apiActions
  const timesPlayed = useSelector((state) => state.game.items.resultsCount);

  const onStartGame = () => {
    setState({ ...state, scene: "INTRO" });
  };

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
  }, [userId, mission, dispatch]);

  React.useEffect(() => {
    if (
      missionData &&
      state.ingredientsList.length === 0 &&
      state.checkedPlayed
    ) {
      // safe copies
      let recipe = missionData.recipes.find(
        (recipe) => recipe.difficulty === timesPlayed
      );
      let tutorialRoom = missionData.tutorial;

      if (!recipe)
        recipe = missionData.recipes.reduce((max, obj) =>
          max.difficulty > obj.difficulty ? max : obj
        );

      let resumeRecipe = {
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

      let aisles;
      let ingredientsList = recipe.ingredients.map((ingredient) => {
        return {
          name: ingredient.asset.name,
          description: ingredient.description,
          type: ingredient.type,
          image: ingredient.asset.image ? ingredient.asset.image.url : "",
          tag:
            ingredient.measure === "unidade"
              ? `R$ ${ingredient.price.toFixed(2)}`
              : `R$ ${(
                  ingredient.price *
                  (100 / ingredient.unityValue)
                ).toFixed(2)}/100${ingredient.measure}`,
          tooltip:
            ingredient.measure === "unidade"
              ? 1
              : `${ingredient.unityValue}${ingredient.measure}`,
          unityValue: ingredient.unityValue,
          quantity: ingredient.quantity,
          measure: ingredient.measure,
          price: ingredient.price,
          shelfCount: 10,
        };
      });

      if (missionData.separation === "aislesCount") {
        aisles = splitArrayIntoChunksOfLen(
          shuffle(ingredientsList),
          missionData.aisles
        );
      } else {
        aisles = ingredientsList.reduce((acc, ingredient) => {
          acc[ingredient.type] = [...(acc[ingredient.type] || []), ingredient];
          return acc;
        }, {});
      }

      setState((state) => {
        return {
          ...state,
          recipe: resumeRecipe,
          tutorialRoom,
          aisles,
          ingredientsList,
        };
      });
    }
  }, [
    missionData,
    state.ingredientsList,
    state.checkedPlayed,
    timesPlayed,
    lang,
  ]);

  const addProduct = (product) => () =>
    setState({
      ...state,
      cart: state.cart.hasOwnProperty(product)
        ? { ...state.cart, [product]: state.cart[product] + 1 }
        : { ...state.cart, [product]: 1 },
    });

  const removeProduct = (product) => () => {
    setState({
      ...state,
      cart: { ...state.cart, [product]: state.cart[product] - 1 },
    });
  };

  const toPreviousaisle = () => {
    setState({
      ...state,
      currentAisle: goRound(state.currentAisle - 1, state.aisles.length),
    });
  };

  const toNextaisle = () => {
    setState({
      ...state,
      currentAisle: goRound(state.currentAisle + 1, state.aisles.length),
    });
  };

  const checkShoppingList = (ingredient) => {
    if (
      ingredient.measure === "unidade"
        ? state.cart[ingredient.name] !== ingredient.quantity
        : state.cart[ingredient.name] * ingredient.unityValue !==
          ingredient.quantity
    )
      return false;

    return true;
  };

  const haveAll = () => {
    for (let i = 0; i < state.ingredientsList.length; i++) {
      if (!state.cart.hasOwnProperty(state.ingredientsList[i].name))
        return false;
      if (!checkShoppingList(state.ingredientsList[i])) return false;
    }

    return true;
  };

  const addToPayment = (money) => () => {
    setState({ ...state, payment: [...state.payment, money] });
  };

  const removeFromPayment = (index) => () => {
    setState({
      ...state,
      payment: [
        ...state.payment.slice(0, index),
        ...state.payment.slice(index + 1),
      ],
    });
  };

  const moveToPayment = () => {
    setState({
      ...state,
      onPayment: true,
      price: Object.keys(state.cart)
        .reduce((acc, product) => {
          return (
            acc +
            state.ingredientsList.find(
              (ingredient) => ingredient.name === product
            ).price *
              state.cart[product]
          );
        }, 0)
        .toFixed(2),
    });
  };

  const doPayment = () => {
    let updateData = {};
    updateData.paymentAmount = state.payment.reduce(
      (acc, money) => money.value + acc,
      0
    );

    updateData.change = updateData.paymentAmount - state.price;
    setState({ ...state, ...updateData });
  };

  const receiveChange = () => {
    let updateData = {};
    updateData.scene = "END_GAME";
    updateData.win = true;
    setState({ ...state, ...updateData });
  };

  const endGame = () => {
    // dispatch(
    //   gameActions.create("results", {
    //     user: userId,
    //     mission: mission.id,
    //     score: state.score,
    //     tipsCount: state.tips.length,
    //     spokenCharactersCount: state.spokenCharacters.length,
    //     won: state.gameEndState,
    //     validQuestionsCount: Object.keys(state.validQuestions).length,
    //   })
    // );

    dispatch(
      headerActions.setAll(
        mission.name,
        mission.nameTranslate.find((name) => {
          return name.language.id === lang;
        }).name
      )
    );
    dispatch(headerActions.setState(headerConstants.STATES.OVERLAY));
  };

  //const { mission } = state
  //console.log('mission:', mission)
  return (
    <div id="game2-wrapper">
      {mission ? (
        //verificar se é possível generalizar esses gameX-wrapper
        <div id="game2-content">
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
                      setState({ ...state, scene: "TUTORIAL" })
                    }
                  />
                );
              case "TUTORIAL":
                return (
                  <Tutorial
                    chef={missionData.character}
                    seconds={missionData.seconds}
                    goToMarket={() => setState({ ...state, scene: "MARKET" })}
                  />
                );
              case "MARKET":
                return (
                  <div>
                    {/* <Timer
                      run={state.runTimer}
                      seconds={missionData.seconds}
                      onSecondPassed={() => {}}
                      onEnd={(remaining) =>
                        setState({
                          ...state,
                          scene: "END_GAME",
                          timeUp: true,
                          remainingTime: remaining,
                        })
                      }
                    /> */}

                    <img
                      onClick={() =>
                        setState({ ...state, shopList: !state.shopList })
                      }
                      src={listIcon}
                      alt=""
                      className="list-icon"
                    />

                    {!state.checkout && (
                      <div style={{ width: "60vw", display: "inline-block" }}>
                        <Aisle
                          products={state.aisles[state.currentAisle]}
                          aisleName={state.currentAisle}
                          addProduct={addProduct}
                        />

                        <button className="Voltar" onClick={toPreviousaisle}>
                          {"<"}
                        </button>

                        <button className="Avançar" onClick={toNextaisle}>
                          {">"}
                        </button>

                        <img
                          onClick={() =>
                            setState({
                              ...state,
                              checkout: true,
                              runTimer: false,
                            })
                          }
                          src={checkout}
                          alt=""
                        />
                      </div>
                    )}

                    {state.checkout && (
                      <div>
                        Caixa
                        {haveAll() ? (
                          <button onClick={moveToPayment}>Pagar</button>
                        ) : (
                          <div>
                            Está faltando coisa aí!
                            <button
                              onClick={() =>
                                setState({
                                  ...state,
                                  checkout: false,
                                  runTimer: true,
                                })
                              }
                            >
                              Voltar às compras
                            </button>
                          </div>
                        )}
                        {state.onPayment && (
                          <div>
                            Hora de pagar! Sua compra deu{" "}
                            {numberToMoney(state.price)}
                            <button onClick={doPayment}>
                              Finalizar Compra
                            </button>
                            {state.paymentAmount &&
                              state.paymentAmount < state.price && (
                                <div>Opa, pagament insuficiente.</div>
                              )}
                            {state.change && (
                              <div className="PopUp">
                                <div>Seu troco! {state.change}</div>
                                <div>O troco está correto?</div>
                                <button onClick={receiveChange}>Yes</button>
                                <button onClick={receiveChange}>No</button>
                              </div>
                            )}
                            {state.change === 0 && (
                              <div>
                                Seu pagamento esta certo!
                                <button onClick={receiveChange}>HOORAY!</button>
                              </div>
                            )}
                            <div>
                              {missionData.money.map((money, index) => (
                                <Button onClick={addToPayment(money)}>
                                  <img
                                    style={{ width: 50 }}
                                    src={money.image.url}
                                    alt="money"
                                  />
                                </Button>
                              ))}
                            </div>
                            <div>
                              {state.payment.map((money, index) => (
                                <div>
                                  <img
                                    style={{ width: 50 }}
                                    src={money.image.url}
                                    alt="money"
                                  />
                                  <button onClick={removeFromPayment(index)}>
                                    Remover
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="cart">
                      <div className="cart-items">
                        {Object.keys(state.cart).map((product, index) =>
                          state.cart[product] > 0 ? (
                            <div className="cart-item">
                              <img
                                src={
                                  state.ingredientsList.find(
                                    (ingredient) => ingredient.name === product
                                  ).image
                                }
                                alt=""
                                onClick={removeProduct(product)}
                                className="cart-item-img"
                              />
                              <span>{state.cart[product]}</span>
                            </div>
                          ) : null
                        )}
                      </div>
                      <img
                        src={cart}
                        alt=""
                        style={{ marginTop: -90, position: "relative" }}
                      />
                    </div>

                    {state.shopList && (
                      <div
                        className="shop-list"
                        style={{
                          backgroundImage: "url(" + ingredientsListBg + ")",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "contain",
                        }}
                      >
                        {state.ingredientsList.map((ingredient, index) => (
                          <div>
                            {checkShoppingList(ingredient) ? (
                              <img
                                src={listCheck}
                                alt=""
                                className="shop-list-item-check"
                              />
                            ) : (
                              <div
                                style={{
                                  width: 20,
                                  height: 20,
                                  display: "inline-block",
                                }}
                              ></div>
                            )}{" "}
                            <img
                              src={ingredient.image}
                              alt=""
                              className="shop-list-item-img"
                            />
                            {ingredient.description}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              case "END_GAME":
                return (
                  <div>
                    {state.timeUp && <div>Seu tempo acabou!</div>}
                    {state.win && (
                      <div>
                        Parabens!! isso e isso deu certo, mas isso e isso deu
                        errado!
                      </div>
                    )}
                    <button onClick={() => setState({ ...initialState() })}>
                      Jogar novamente
                    </button>
                    <Link to={"/userspace"}>Sair do jogo</Link>
                  </div>
                );
              default:
                return <div>Erro</div>;
            }
          })()}
          {state.back && <Redirect to={"/userspace"} />}
        </div>
      ) : (
        <div>Loading..</div>
      )}
    </div>
  );
};

export default Game3;
