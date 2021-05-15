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
import recipeBg from "../../img/Game3/recipe-bg.svg";
import listCheck from "../../img/Game3/check.svg";
import listIcon from "../../img/Game3/list-icon.svg";
import checkout from "../../img/Game3/checkout.svg";
import wallet from "../../img/Game3/wallet.svg";
import blobLaranja from "../../img/bg-forma-laranja.svg";
import hourglassFull from "../../img/Game3/hourglass-full.svg";
import hourglassEmpty from "../../img/Game3/hourglass-empty.svg";
import cashierTable from "../../img/Game3/chashier-table.svg";
import cashierBg from "../../img/Game3/cashier-bg.svg";

import { numberToMoney } from "../../_helpers";
import DialogCharacter from "../Game2/components/DialogCharacter";

const goRound = (value, max) =>
  value >= 0 ? value % max : max - (Math.abs(value) % max);

const shuffle = (array) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex,
    shuffledArray = [...array];

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temporaryValue;
  }

  return shuffledArray;
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

const zeroFill = (s, size) => {
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
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
  }, [userId, mission, dispatch, state.checkedPlayed]);

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
          unityValue:
            ingredient.measure === "unidade" ? 1 : ingredient.unityValue,
          quantity: ingredient.quantity,
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

  const addProduct = (product) => () => {
    const index = state.cart.findIndex(
      (ingredient) => ingredient.name === product
    );
    let cartUpdate = [...state.cart];

    if (index >= 0) cartUpdate[index].count += 1;
    else cartUpdate.push({ name: product, count: 1 });

    setState({
      ...state,
      cart: cartUpdate,
    });
  };
  const removeProduct = (index) => () => {
    let cartUpdate = [...state.cart];

    if (cartUpdate[index].count > 1) cartUpdate[index].count -= 1;
    else
      cartUpdate = [
        ...state.cart.slice(0, index),
        ...state.cart.slice(index + 1),
      ];

    setState({
      ...state,
      cart: cartUpdate,
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
    let cartIngredient = state.cart.find(
      (cartItem) => cartItem.name === ingredient.name
    );
    if (!cartIngredient) return false;
    if (cartIngredient.count * ingredient.unityValue !== ingredient.quantity)
      return false;

    return true;
  };

  const haveAll = () => {
    for (let i = 0; i < state.ingredientsList.length; i++) {
      if (!checkShoppingList(state.ingredientsList[i])) return false;
    }

    return true;
  };

  const moveToCheckout = () => {
    setState({
      ...state,
      checkout: true,
      checkoutConfirm: false,
      price: state.cart
        .reduce((acc, product) => {
          return (
            acc +
            state.ingredientsList.find(
              (ingredient) => ingredient.name === product.name
            ).price *
              product.count
          );
        }, 0)
        .toFixed(2),
    });
  };

  const addToPayment = (money) => () => {
    const index = state.payment.findIndex(
      (moneyObj) => moneyObj.value === money
    );
    let paymentUpdate = [...state.payment];

    if (index >= 0) paymentUpdate[index].count += 1;
    else paymentUpdate.push({ value: money, count: 1 });
    setState({
      ...state,
      payment: paymentUpdate,
    });
  };

  const removeFromPayment = (index) => () => {
    let paymentUpdate = [...state.payment];

    if (paymentUpdate[index].count > 1) paymentUpdate[index].count -= 1;
    else
      paymentUpdate = [
        ...state.payment.slice(0, index),
        ...state.payment.slice(index + 1),
      ];
    setState({
      ...state,
      payment: paymentUpdate,
    });
  };

  const moveToPayment = () => {
    setState({
      ...state,
      scene: "CASHIER",
      runTimer: true,
      moneySelection: true,
    });
  };

  const doPayment = () => {
    setState({
      ...state,
      change:
        state.payment
          .reduce((acc, money) => {
            return acc + money.value * money.count;
          }, 0)
          .toFixed(2) - state.price,
      moneySelection: false,
      runTimer: false,
    });
  };

  const getWrongItemsInCart = () =>
    state.ingredientsList
      .filter((ingredient) => {
        return !checkShoppingList(ingredient);
      })
      .map((ingredient) => ({
        ingredient: ingredient.name,
        rightQuantity: ingredient.quantity,
        userQuantity: state.cart.hasOwnProperty(ingredient.name)
          ? state.cart[ingredient.name] * ingredient.unityValue
          : 0,
      }));

  const restart = () => {
    setState({ ...initialState(false) });
    dispatch(headerActions.setState(headerConstants.STATES.HIDDEN));
  };

  const endGame = (timeUp) => {
    setState({
      ...state,
      scene: "END_GAME",
      timeUp: timeUp,
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

    let wrongIngredients = getWrongItemsInCart();

    dispatch(
      gameActions.create("results", {
        user: userId,
        mission: mission.id,
        secondsTaken: timeUp
          ? missionData.seconds + 1
          : missionData.seconds - state.remainingTime,
        recipe: state.recipe.id,
        rightPayment: state.change === 0,
        won: state.change === 0 && !timeUp && wrongIngredients.length === 0,
        wrongIngredients:
          wrongIngredients.length > 0 ? JSON.stringify(wrongIngredients) : null,
      })
    );
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
                    <Timer
                      run={state.runTimer}
                      seconds={missionData.seconds}
                      onStop={(remaining) => {
                        setState({
                          ...state,
                          remainingTime: remaining,
                        });
                      }}
                      onEnd={() => endGame(true)}
                    />
                    {!state.checkout && !state.checkoutConfirm && (
                      <div>
                        <img
                          onClick={() =>
                            setState({ ...state, shopList: !state.shopList })
                          }
                          src={listIcon}
                          alt=""
                          className="list-icon"
                        />
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
                                checkoutConfirm: true,
                                runTimer: false,
                                shopList: false,
                              })
                            }
                            src={checkout}
                            alt=""
                          />
                        </div>

                        <div className="cart">
                          <div className="cart-items">
                            {state.cart.map((product, index) => (
                              <div className="cart-item">
                                <img
                                  src={
                                    state.ingredientsList.find(
                                      (ingredient) =>
                                        ingredient.name === product.name
                                    ).image
                                  }
                                  alt=""
                                  onClick={removeProduct(index)}
                                  className="cart-item-img"
                                />
                                <span>{product.count}</span>
                              </div>
                            ))}
                          </div>
                          <img
                            src={cart}
                            alt=""
                            style={{ marginTop: -50, position: "relative" }}
                          />
                        </div>
                      </div>
                    )}

                    {state.checkoutConfirm && (
                      <div>
                        <div className="confirm-blob">
                          <p lang="pt-br">Tem certeza que isso é tudo?</p>
                          <p lang="en">Are you sure that's all?</p>
                          <button
                            className="btn btn-center"
                            id="btn-cancel-checkout"
                            onClick={() =>
                              setState({
                                ...state,
                                checkoutConfirm: false,
                                runTimer: true,
                              })
                            }
                          >
                            Voltar
                          </button>

                          <button
                            className="btn btn-center"
                            id="btn-go-to-checkout"
                            onClick={moveToCheckout}
                          >
                            Continuar
                          </button>
                        </div>
                        <div className="cart-items">
                          {state.cart.map((product, index) => (
                            <div className="cart-item">
                              <img
                                src={
                                  state.ingredientsList.find(
                                    (ingredient) =>
                                      ingredient.name === product.name
                                  ).image
                                }
                                alt=""
                                onClick={removeProduct(index)}
                                className="cart-item-img"
                              />
                              <span>{product.count}</span>
                            </div>
                          ))}
                        </div>
                        <img
                          src={cart}
                          alt=""
                          style={{ marginTop: -90, position: "relative" }}
                        />
                      </div>
                    )}

                    {state.checkout && (
                      <div>
                        <div id="dialog-interact">
                          {haveAll() ? (
                            <div id="dialogos">
                              <div id="dialog-box">
                                <span lang="pt-br">
                                  Maravilha! Sua compra deu{" "}
                                  {numberToMoney(state.price)}. Agora você só
                                  precisa selecionar a quatidade correta de
                                  dinheiro. Fique atento ap limite de tempo.
                                </span>
                                <span lang="en">
                                  Wonderful! That's {numberToMoney(state.price)}
                                  . Now all you have to do is select the right
                                  amount of money. Mind the time limit.
                                </span>
                              </div>{" "}
                              <button
                                className="btn btn-center"
                                id="btn-move-to-payment"
                                onClick={moveToPayment}
                              >
                                Continuar
                              </button>
                            </div>
                          ) : (
                            <div id="dialogos">
                              <div id="dialog-box">
                                <span lang="pt-br">
                                  Você selecionou {getWrongItemsInCart().length}{" "}
                                  ingrediente(s) incorretamente!
                                </span>
                                <span lang="en">
                                  You selected {getWrongItemsInCart().length}{" "}
                                  ingredient(s) incorrectly!
                                </span>
                              </div>
                              <button
                                className="btn btn-center"
                                id="btn-back-to-market"
                                onClick={() =>
                                  setState({
                                    ...state,
                                    checkout: false,
                                    runTimer: true,
                                  })
                                }
                              >
                                Continuar
                              </button>
                            </div>
                          )}
                        </div>
                        <div>
                          <DialogCharacter
                            character={missionData.character}
                            feeling="default"
                          />
                          <img src={cashierTable} alt="" />
                        </div>
                      </div>
                    )}

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
              case "CASHIER":
                return (
                  <div>
                    <Timer
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
                    {state.moneySelection && (
                      <div>
                        <div className="selected-money">
                          {state.payment.map((money, index) => (
                            <div className="payment-money">
                              <img
                                src={
                                  missionData.money.find((moneyObj) => {
                                    return moneyObj.value === money.value;
                                  }).image.url
                                }
                                alt=""
                                onClick={removeFromPayment(index)}
                                className="payment-money-img"
                              />
                              <span>{money.count}</span>
                            </div>
                          ))}
                        </div>

                        <div>
                          <div>
                            {missionData.money.map((money, index) => (
                              <Button onClick={addToPayment(money.value)}>
                                <img
                                  style={{ width: 50 }}
                                  src={money.image.url}
                                  alt="money"
                                />
                              </Button>
                            ))}
                          </div>
                          <img src={wallet} alt="" />
                          <button
                            className="btn btn-center"
                            id="btn-do-payment"
                            onClick={doPayment}
                          >
                            Continuar
                          </button>
                        </div>
                        <div>
                          <DialogCharacter
                            character={missionData.character}
                            feeling="default"
                          />
                          <img src={cashierTable} alt="" />
                        </div>
                      </div>
                    )}

                    {!state.moneySelection && (
                      <div id="dialog-interact">
                        <div id="dialogos">
                          {state.change < 0 && (
                            <div id="dialog-box">
                              <span lang="pt-br">
                                Nossos patrocinadores vão ter que me pagar um
                                extra para completar sua compra.
                              </span>
                              <span lang="en">
                                Our sponsors will need to give me an extra to
                                pay for the rest of your purchase.
                              </span>
                            </div>
                          )}
                          {state.change > 0 && (
                            <div id="dialog-box">
                              <span lang="pt-br">
                                Bem... Obirgada pela gorgeta!
                              </span>
                              <span lang="en">Well... Thanks for the tip!</span>
                            </div>
                          )}
                          {state.change === 0 && (
                            <div id="dialog-box">
                              <span lang="pt-br">
                                Você pagou exatamente o que devia para o caixa
                                do supermercado! Mexer com dinheiro é contigo
                                mesmo!
                              </span>
                              <span lang="en">
                                You gave the exact amout to the supermarket's
                                cashier! Dealing with money is clearly not a
                                problem for you!
                              </span>
                            </div>
                          )}
                        </div>
                        <button
                          className="btn btn-center"
                          id="btn-end-game"
                          onClick={() => endGame(false)}
                        >
                          Continuar
                        </button>

                        <div>
                          <DialogCharacter
                            character={missionData.character}
                            feeling={
                              state.change < 0 ? "wrongPayment" : "default"
                            }
                          />
                          <img src={cashierTable} alt="" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              case "END_GAME":
                return (
                  <div>
                    {state.timeUp ? (
                      <div>
                        <img src={hourglassEmpty} alt="" />
                        <span>O tempo acabou!</span>
                        <p lang="pt-br">
                          Fazer compras pode ser mais complicado do que parece.
                        </p>
                        <p lang="en">
                          Time is up! Doing the groceries might be harder than
                          it looks.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <img src={hourglassFull} alt="" />
                        <p lang="pt-br">Você finalizou em:</p>
                        <p lang="en">Finished in:</p>
                      </div>
                    )}
                    <div
                      className="feedback-painel-2-content"
                      style={{
                        backgroundImage: "url(" + blobLaranja + ")",
                      }}
                    >
                      {state.timeUp ? (
                        <div> 0:00</div>
                      ) : (
                        <div>
                          {zeroFill(
                            Math.floor(
                              (missionData.seconds - state.remainingTime) / 60
                            ).toString(),
                            2
                          )}
                          :
                          {zeroFill(
                            (
                              (missionData.seconds - state.remainingTime) %
                              60
                            ).toString(),
                            2
                          )}
                        </div>
                      )}
                    </div>
                    <button onClick={restart}>Tentar novamente</button>
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
