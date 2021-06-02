import React from "react";
import { Redirect, Link } from "react-router-dom";
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
  apiActions,
  gameActions,
  headerActions,
  musicActions,
} from "../../_actions";
import { headerConstants } from "../../_constants";

// import Button from "@material-ui/core/Button";

import initialState from "./initialState";

import Init from "../../_components/Init";
import Timer from "../../_components/Timer";
import Aisle from "../../_components/Aisle";
import Intro from "./components/Intro";
import Tutorial from "./components/Tutorial";
// import DialogCharacter from "../../_components/DialogCharacter";
import ChefDialog from "./components/ChefDialog";
import Payment from "./components/Payment";
import ShopCart from "./components/ShopCart";

import {
  cart,
  // ingredientsListBg,
  // recipeBg,
  // listCheck,
  // listIcon,
  checkout,
  // wallet,
  blobLaranja,
  hourglassFull,
  hourglassEmpty,
  cashierTable,
  // cashierBg,
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
      timesPlayed !== undefined
    ) {
      missionData.seconds -= 30 * (timesPlayed > 2 ? 2 : timesPlayed);
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

      setState((state) => {
        return {
          ...state,
          recipe: resumeRecipe,
          aisles,
          ingredientsList,
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

  const toPreviousAisle = () => {
    setState({
      ...state,
      currentAisle: goRound(state.currentAisle - 1, state.aisles.length),
    });
  };

  const toNextAisle = () => {
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
    setState({
      ...state,
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
      cashierContinue: haveAllValue
        ? () => setState({ ...state, runTimer: true, moneySelection: true })
        : () =>
            setState({
              ...state,
              scene: "MARKET",
              runTimer: true,
              checkoutConfirm: false,
            }),
      price: price,
    });
  };

  const doPayment = (value) => {
    let cashierLines;
    let change = value - state.price;
    if (change < 0)
      cashierLines = {
        text:
          "Nossos patrocinadores vão ter que me pagar um extra para completar sua compra.",
        translation:
          "Our sponsors will need to give me an extra to pay for the rest of your purchase.",
      };
    else if (change > 0)
      cashierLines = {
        text: "Bem... Obirgada pela gorgeta!",
        translation: "Well... Thanks for the tip!",
      };
    //if( value === 0)
    else
      cashierLines = {
        text:
          "Você pagou exatamente o que devia para o caixa do supermercado! Mexer com dinheiro é contigo mesmo!",
        translation:
          "You gave the exact amout to the supermarket's cashier! Dealing with money is clearly not a problem for you!",
      };

    setState({
      ...state,
      cashierContinue: () => endGame(false),
      cashierLines: cashierLines,
      change: change,
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
                    hasPlayed={timesPlayed > 0}
                    aisle={state.aisles[state.currentAisle]}
                    shoppingCart={state.cart}
                    ingredientsList={state.ingredientsList}
                    addProduct={addProduct}
                    removeProduct={removeProduct}
                    toPreviousAisle={toPreviousAisle}
                    toNextAisle={toNextAisle}
                    goToMarket={() =>
                      setState({
                        ...state,
                        scene: "MARKET",
                        currentAisle: 0,
                        cart: [],
                      })
                    }
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
                            setState({
                              ...state,
                              checkoutConfirm: true,
                              runTimer: false,
                              shopList: false,
                            })
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
                            <span lang="pt-br">Tem certeza que isso é tudo?</span>
                            <span lang="en">Are you sure that's all?</span>
                          </div>
                          <div className={styles.btns}>
                            <button
                              className="btn btn-center"
                              id="btn-back"
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
                              id="btn-start"
                              onClick={moveToCheckout}
                            >
                              Continuar
                            </button>
                          </div>
                        </div>
                        <img src={cart} alt="" />
                      </div>
                    )}
                  </div>
                );
              case "CASHIER":
                return (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
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
                    <div id="dialog-interact">
                      <ChefDialog
                        chef={missionData.character}
                        hideDialog={state.moneySelection}
                        chefFeeling={
                          state.change < 0 ? "wrongPayment" : "default"
                        }
                        text={state.cashierLines.text}
                        translation={state.cashierLines.translation}
                        onContinue={state.cashierContinue}
                      />
                      <img
                        style={{ zIndex: 0, width: 500 }}
                        src={cashierTable}
                        alt=""
                      />
                    </div>
                    {state.moneySelection && (
                      <Payment
                        moneyList={missionData.money}
                        onConfirm={(value) => () => doPayment(value)}
                      />
                    )}
                  </div>
                );
              case "END_GAME":
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "12% 20%",
                      backgroundColor: state.timeUp ? " #F9AFA1" : "#D6E3F4",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        height: "70%",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <div style={{ position: "relative" }}>
                        <img
                          style={{
                            display: "block",
                            height: 100,
                            margin: "0 auto",
                          }}
                          src={state.timeUp ? hourglassEmpty : hourglassFull}
                          alt=""
                        />
                        {state.timeUp && (
                          <div
                            style={{
                              textAlign: "center",
                              fontSize: 36,
                              fontFamily: "Abril fatface",
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
                            fontFamily: "Barlow",
                            fontSize: 24,
                            color: "rgb(89, 49, 109)",
                          }}
                        >
                          {endGameLines[state.timeUp ? 0 : 1].text}
                        </p>
                        <hr
                          style={{
                            display: "block",
                            margin: "5% auto",
                            width: "30%",
                          }}
                        />
                        <p
                          lang="en"
                          style={{
                            textAlign: "center",
                            fontFamily: "Barlow",
                            color: "rgb(89, 49, 109)",
                            fontStyle: "italic",
                          }}
                        >
                          {endGameLines[state.timeUp ? 0 : 1].translation}
                        </p>
                      </div>

                      <div
                        style={{
                          position: "relative",
                          height: 300,
                          width: "100%",
                          paddingTop: 70,

                          backgroundImage: "url(" + blobLaranja + ")",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center center",
                          textAlign: "center",
                          fontSize: 92,
                          fontFamily: "Abril fatface",
                          color: "rgb(89, 49, 109)",
                        }}
                      >
                        {state.timeUp
                          ? "0:00"
                          : `${zeroFill(
                              Math.floor(
                                (missionData.seconds - state.remainingTime) / 60
                              ).toString(),
                              2
                            )}
                          :
                          ${zeroFill(
                            (
                              (missionData.seconds - state.remainingTime) %
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
                        marginTop: "10%",
                      }}
                    >
                      <button onClick={restart}>Tentar novamente</button>
                      <Link to={"/userspace"}>Sair do jogo</Link>
                    </div>
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
      {process.env.NODE_ENV === "development" && (
        <div>
          <button
            style={{ position: "absolute", bottom: 0 }}
            onClick={() => setState({ ...state, scene: "MARKET" })}
          >
            Pula tutorial
          </button>
          <button
            style={{ position: "absolute", bottom: 0, left: 100 }}
            onClick={() => {
              setState({
                ...state,
                scene: "CASHIER",
                checkoutConfirm: false,
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
              });
            }}
          >
            Para o caixa: Compras certas
          </button>
        </div>
      )}
    </div>
  );
};

export default Game3;
