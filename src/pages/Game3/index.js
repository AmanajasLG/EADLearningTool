import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import styles from "./index.module.scss";

import {
  goRound,
  splitArrayIntoChunksOfLen,
  zeroFill,
  numberToMoney,
  shuffle,
} from "../../_helpers";

import {
  gameActions,
  headerActions,
  musicActions,
  playSessionControlActions,
} from "../../_actions";
import { headerConstants } from "../../_constants";

import initialState from "./initialState";

import Init from "../../_components/Init";
import Timer from "../../_components/Timer";
import Aisle from "../../_components/Aisle";
import Intro from "./components/Intro";
import Tutorial from "./components/Tutorial";
import ChefDialog from "./components/ChefDialog";
import Payment from "./components/Payment";
import ShopCart from "./components/ShopCart";
import {
  Iniciar,
  Voltar,
  ButtonConfigs,
} from "../../_components/Button";

import {
  cart,
  checkout,
  blobLaranja,
  hourglassFull,
  hourglassEmpty,
  cashierTable,
  cashierBg,
  bigBlob,
} from "../../img";
import Recipe from "../../_components/Recipe";

const endGameLines = [
  {
    text: "Fazer compras pode ser mais complicado do que parece.",
    translation:
      "Time is up! Doing the groceries might be harder than it looks.",
  },
  {
    text: "Você finalizou em:",
    translation: "Finished in:",
  },
];

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
  let missionData = mission ? mission.missionData : null;

  const timesPlayed = useSelector((state) => state.game.items.resultsCount);

  React.useEffect(() => {
    if (mission && mission.trackPlayerInput && !state.playSessionCreated) {
      dispatch(playSessionControlActions.createNew(true));
      setState((s) => ({ ...s, playSessionCreated: true }));
    }
  // eslint-disable-next-line
  }, [dispatch, playSessionControlActions, state]);

  const onStartGame = () => setState((s) => ({ ...s, scene: "INTRO" }));

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
      state.ingredientsList.length === 0 &&
      timesPlayed !== undefined
    ) {
      let initTime = missionData.seconds;
      let remainingTime = initTime;

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

      let aisles;
      let ingredientsList = recipe.ingredients.map((ingredient) => {
        return {
          name: ingredient.asset.name,
          description: ingredient.description,
          type: ingredient.type,
          image: ingredient.asset.image ? ingredient.asset.image.url : "",
          shelfImage: ingredient.asset.image ? ingredient.asset.image.url : "",
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

        aisles = Object.keys(aisles).reduce((acc, aisle) => {
          return [...acc, aisles[aisle]];
        }, []);
      }

      setState((s) => {
        return {
          ...s,
          recipe: resumeRecipe,
          aisles,
          ingredientsList,
          remainingTime,
          initTime,
        };
      });
    }
  }, [missionData, state.ingredientsList, timesPlayed, lang]);

  const addProduct = (product) => () => {
    const index = state.cart.findIndex(
      (ingredient) => ingredient.name === product
    );
    let cartUpdate = [...state.cart];

    if (index >= 0) cartUpdate[index].count += 1;
    else cartUpdate.push({ name: product, count: 1 });

    setState((s) => ({
      ...s,
      cart: cartUpdate,
    }));
  };
  const removeProduct = (index) => () => {
    let cartUpdate = [...state.cart];

    if (cartUpdate[index].count > 1) cartUpdate[index].count -= 1;
    else
      cartUpdate = [
        ...state.cart.slice(0, index),
        ...state.cart.slice(index + 1),
      ];

    setState((s) => ({
      ...s,
      cart: cartUpdate,
    }));
  };

  const toPreviousAisle = () => {
    setState((s) => ({
      ...s,
      currentAisle: goRound(state.currentAisle - 1, state.aisles.length),
    }));
  };

  const toNextAisle = () => {
    setState((s) => ({
      ...s,
      currentAisle: goRound(state.currentAisle + 1, state.aisles.length),
    }));
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
    let haveAllValue = haveAll();
    let price = state.cart
      .reduce(
        (acc, product) =>
          acc +
          state.ingredientsList.find(
            (ingredient) => ingredient.name === product.name
          ).price *
            product.count,
        0
      )
      .toFixed(2);
    var updateState = {
      scene: "CASHIER",
      checkoutConfirm: false,
      cashierLines: haveAllValue
        ? {
            text: `Maravilha! Sua compra deu ${numberToMoney(
              price
            )}. Agora você só precisa selecionar a quatidade correta de dinheiro. Fique atento ao limite de tempo.`,
            translation: `Wonderful! That's ${numberToMoney(
              price
            )}. Now all you have to do is select the right amount of money. Mind the time limit.`,
          }
        : {
            text: `Você selecionou ${
              getWrongItemsInCart().length
            } ingrediente(s) incorretamente!`,
            translation: `You selected ${
              getWrongItemsInCart().length
            } ingredient(s) incorrectly!`,
          },
      price: price,
    };
    updateState.cashierContinue = haveAllValue
      ? () =>
          setState((s) => ({
            ...s,
            ...updateState,
            runTimer: true,
            moneySelection: true,
          }))
      : () =>
          setState((s) => ({
            ...s,
            ...updateState,
            scene: "MARKET",
            runTimer: true,
            checkoutConfirm: false,
          }));
    setState((s) => ({ ...s, ...updateState }));
  };

  const doPayment = (value) => {
    let cashierLines;
    let change = parseFloat(value) - parseFloat(state.price);
    if (change < 0)
      cashierLines = {
        text:
          "Nossos patrocinadores vão ter que me pagar um extra para completar sua compra.",
        translation:
          "Our sponsors will need to give me an extra to pay for the rest of your purchase.",
      };
    else if (change > 0)
      cashierLines = {
        text: "Bem... Obrigada pela gorjeta!",
        translation: "Well... Thanks for the tip!",
      };
    //
    else
      cashierLines = {
        text:
          "Você pagou exatamente o que devia para o caixa do supermercado! Mexer com dinheiro é contigo mesmo!",
        translation:
          "You gave the exact amout to the supermarket's cashier! Dealing with money is clearly not a problem for you!",
      };

    setState((s) => ({
      ...s,
      cashierContinue: () => endGame(false, change === 0),
      chefAwkward: (change < 0),
      cashierLines: cashierLines,
      moneySelection: false,
      runTimer: false,
      change: change,
    }));
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

  const endGame = (timeUp, rightPayment) => {
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

    dispatch(playSessionControlActions.ended(true));

    dispatch(
      gameActions.create("results", {
        user: userId,
        mission: mission.id,
        secondsTaken: timeUp
          ? state.initTime + 1
          : state.initTime - state.remainingTime,
        recipe: state.recipe.id,
        rightPayment: rightPayment,
        won: !timeUp,
        wrongIngredients:
          wrongIngredients.length > 0 ? JSON.stringify(wrongIngredients) : null,
      })
    );

    setState((s) => ({
      ...s,
      scene: "END_GAME",
      timeUp: timeUp,
    }));
  };

  //const { mission } = state
  //
  return (
    <React.Fragment>
      {!mission ? (
        <div>Loading..</div>
      ) : (
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
                    onBack={() => setState((s) => ({ ...s, back: true }))}
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
                      setState((s) => ({ ...s, scene: "TUTORIAL" }))
                    }
                  />
                );
              case "TUTORIAL":
                return (
                  <Tutorial
                    chef={missionData.character}
                    seconds={state.initTime}
                    hasPlayed={timesPlayed > 0}
                    aisle={state.aisles[state.currentAisle]}
                    shoppingCart={state.cart}
                    ingredientsList={state.ingredientsList}
                    addProduct={addProduct}
                    removeProduct={removeProduct}
                    toPreviousAisle={toPreviousAisle}
                    toNextAisle={toNextAisle}
                    goToMarket={() =>
                      setState((s) => ({
                        ...s,
                        scene: "MARKET",
                        currentAisle: 0,
                        cart: [],
                      }))
                    }
                  />
                );
              case "MARKET":
                return (
                  <React.Fragment>
                    <Timer
                      style={{
                        position: "absolute",
                        top: "5%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                      run={state.runTimer}
                      seconds={state.remainingTime}
                      onStop={(remaining) =>
                        setState((s) => ({ ...s, remainingTime: remaining }))
                      }
                      onEnd={() => endGame(true, false)}
                    />
                    <Recipe
                      ingredientsList={state.ingredientsList}
                      hasImage={true}
                      showCheck={(ingredient) => checkShoppingList(ingredient)}
                      iconShouldShow={!state.checkout && !state.checkoutConfirm}
                    />

                    {!state.checkout && !state.checkoutConfirm && (
                      <div id={styles.gameGrid}>
                        <Aisle
                          products={state.aisles[state.currentAisle]}
                          addProduct={addProduct}
                          toPreviousAisle={toPreviousAisle}
                          toNextAisle={toNextAisle}
                        />

                        <img
                          onClick={() =>
                            setState((s) => ({
                              ...s,
                              checkoutConfirm: true,
                              runTimer: false,
                              shopList: false,
                            }))
                          }
                          src={checkout}
                          alt=""
                          className={styles.moneyIcon}
                        />

                        <ShopCart
                          cart={state.cart}
                          ingredientList={state.ingredientsList}
                          onItemClick={removeProduct}
                        />
                      </div>
                    )}

                    {state.checkoutConfirm && (
                      <div className={styles.confirmScreen}>
                        <div className={styles.cartItems}>
                          {state.cart.map((product, index) => (
                            <div className={styles.cartItem} key={index}>
                              <img
                                src={
                                  state.ingredientsList.find(
                                    (ingredient) =>
                                      ingredient.name === product.name
                                  ).image
                                }
                                alt=""
                                onClick={removeProduct(index)}
                                className={styles.cartItemImg}
                              />
                              <span>{product.count}</span>
                            </div>
                          ))}
                        </div>
                        <div className={styles.confirmBlob}>
                          <div className={styles.blobSpans}>
                            <span lang="pt-br">
                              Tem certeza que isso é tudo?
                            </span>
                            <span lang="en">Are you sure that's all?</span>
                          </div>
                          <div className={styles.btns}>
                            <Voltar
                              onClick={() =>
                                setState((s) => ({
                                  ...s,
                                  checkoutConfirm: false,
                                  runTimer: true,
                                }))
                              }
                            />
                            <Iniciar
                              label={"Continuar"}
                              onClick={moveToCheckout}
                            />
                          </div>
                        </div>
                        <img src={cart} alt="" />
                      </div>
                    )}
                  </React.Fragment>
                );
              case "CASHIER":
                return (
                  <React.Fragment>
                    <img
                      style={{
                        display: "block",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: -4,
                      }}
                      src={bigBlob}
                      alt="bigBlob"
                    />
                    <img
                      style={{
                        display: "block",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: -3,
                      }}
                      src={cashierBg}
                      alt=""
                    />
                    <Timer
                      style={{
                        position: "absolute",
                        top: "5%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                      run={state.runTimer}
                      seconds={state.remainingTime}
                      onStop={(remaining) => {
                        setState((s) => ({
                          ...s,
                          remainingTime: remaining,
                        }));
                      }}
                      onEnd={() => endGame(true, false)}
                    />
                    <ChefDialog
                      chefStyles={{ width: "35%" }}
                      chef={missionData.character}
                      hideDialog={state.moneySelection}
                      chefFeeling={
                        state.chefAwkward ? "wrongPayment" : null
                      }
                      text={state.cashierLines.text}
                      translation={state.cashierLines.translation}
                      onContinue={state.cashierContinue}
                    />
                    <img
                      style={{
                        position: "absolute",
                        bottom: "-10%",
                        zIndex: 3,
                        width: "35%",
                      }}
                      src={cashierTable}
                      alt=""
                    />
                    {state.moneySelection && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "4em",
                          width: "60em",
                          textAlign: "center",
                          zIndex: 10,
                          backgroundColor: "#59316d",
                          padding: "1.5em",
                          left: "2.5em",
                          borderRadius: "0 2em 2em 2em",
                        }}
                      >
                        <span
                          style={{
                            color: "white",
                            fontSize: "3em",
                          }}
                        >
                          Sua compra deu <b>{numberToMoney(state.price)}</b>.
                        </span>
                      </div>
                    )}

                    <div
                      style={{
                        position: "absolute",
                        top: "64.1em",
                        left: "45.8em",
                        width: "8.1em",
                        height: "2em",
                        zIndex: 4,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "2.2em",
                        }}
                      >
                        {state.cashierValue}
                      </span>
                    </div>
                    {state.moneySelection && (
                      <Payment
                        moneyList={missionData.money}
                        onConfirm={(value) => () => doPayment(value)}
                        updateCashierValue={(value) =>
                          setState((s) => ({ ...s, cashierValue: value }))
                        }
                      />
                    )}
                  </React.Fragment>
                );
              case "END_GAME":
                return (
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      // padding: "12% 20%",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        marginTop: "30em",
                        width: "70%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ position: "relative", fontSize: "1.1em" }}>
                        <img
                          style={{
                            display: "block",
                            height: "15em",
                            margin: "0 auto 1em",
                          }}
                          src={state.timeUp ? hourglassEmpty : hourglassFull}
                          alt=""
                        />
                        {state.timeUp && (
                          <div
                            style={{
                              textAlign: "center",
                              fontFamily: "Abril fatface",
                              fontSize: "6em",
                              color: "rgb(89, 49, 109)",
                            }}
                          >
                            O tempo acabou!
                          </div>
                        )}
                        <p
                          lang="pt-br"
                          style={{
                            textAlign: "center",
                            fontFamily: "Abril Fatface",
                            fontSize: "6em",
                            color: "rgb(89, 49, 109)",
                          }}
                        >
                          {endGameLines[state.timeUp ? 0 : 1].text}
                        </p>
                        <hr
                          style={{
                            width: "33%",
                            borderColor: "#F9AFA1",
                            margin: "2em auto 1.5em",
                            borderStyle: "solid"
                          }}
                        />
                        <p
                          lang="en"
                          style={{
                            textAlign: "center",
                            fontFamily: "Barlow",
                            color: "rgb(89, 49, 109)",
                            fontStyle: "italic",
                            fontSize: "4em",
                          }}
                        >
                          {endGameLines[state.timeUp ? 0 : 1].translation}
                        </p>
                      </div>

                      <div
                        style={{
                          position: "relative",
                          height: "4em",
                          width: "5em",
                          backgroundImage: "url(" + blobLaranja + ")",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center center",
                          backgroundSize: "contain",
                          textAlign: "center",
                          fontSize: "11em",
                          fontFamily: "Abril fatface",
                          color: "rgb(89, 49, 109)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {state.timeUp
                          ? "0:00"
                          : `${zeroFill(
                              Math.floor(
                                (state.initTime - state.remainingTime) / 60
                              ).toString(),
                              2
                            )}
                          :
                          ${zeroFill(
                            (
                              (state.initTime - state.remainingTime) %
                              60
                            ).toString(),
                            2
                          )}`}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "block",
                        margin: "0 auto",
                        width: "100%"
                      }}
                    >
                      <div id="feedback-endGame-action-btns">
                        <Voltar
                          label={"Tentar novamente"}
                          colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_6}
                          onClick={restart}
                          style={{ marginRight: "2em" }}
                        />
                        <Iniciar
                          label={"Sair do jogo"}
                          colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_3}
                          onClick={() =>
                            setState((s) => ({ ...s, back: true }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              default:
                return <div>Erro</div>;
            }
          })()}
          {state.back && <Redirect to={"/userspace"} />}
        </React.Fragment>
      )}
      {process.env.NODE_ENV === "development" && (
        <div>
          <button
            style={{ position: "absolute", bottom: 0 }}
            onClick={() => setState((s) => ({ ...s, scene: "MARKET" }))}
          >
            Pula tutorial
          </button>
          <button
            style={{ position: "absolute", bottom: 0, left: 100 }}
            onClick={() => {
              setState((s) => ({
                ...s,
                scene: "CASHIER",
                checkoutConfirm: false,
                runTimer: false,
                cashierLines: {
                  text: `Maravilha! Sua compra deu ${numberToMoney(
                    48.05
                  )}. Agora você só precisa selecionar a quatidade correta de dinheiro. Fique atento ao limite de tempo.`,
                  translation: `Wonderful! That's ${numberToMoney(
                    48.05
                  )}. Now all you have to do is select the right amount of money. Mind the time limit.`,
                },
                cashierContinue: () =>
                  setState((s) => ({
                    ...s,
                    runTimer: true,
                    moneySelection: true,
                  })),
                price: 48.05,
              }));
            }}
          >
            Para o caixa: Compras certas
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default Game3;
