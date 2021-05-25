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

import Button from "@material-ui/core/Button";

import initialState from "./initialState";

import Init from "../../_components/Init";
import Timer from "../../_components/Timer";
import Aisle from "../../_components/Aisle";
import Intro from "./components/Intro";
import Tutorial from "./components/Tutorial";
import DialogCharacter from "../../_components/DialogCharacter";
import ChefDialog from './components/ChefDialog'

import {
  cart,
  ingredientsListBg,
  recipeBg,
  listCheck,
  listIcon,
  checkout,
  wallet,
  blobLaranja,
  hourglassFull,
  hourglassEmpty,
  cashierTable,
  cashierBg,
} from "../../img";

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
          shelfImage: ingredient.shelfImage ? ingredient.shelfImage.url : "",
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
    let haveAllValue = haveAll()

    setState({
      ...state,
      scene: "CASHIER",
      checkoutConfirm: false,
      cashierLines: haveAllValue ?
        {
          text: `Maravilha! Sua compra deu ${numberToMoney(state.price)}. Agora você só precisa selecionar a quatidade correta de dinheiro. Fique atento ap limite de tempo.`,
          translation:`Wonderful! That's ${numberToMoney(state.price)}. Now all you have to do is select the right amount of money. Mind the time limit.`
        }
        :{
          text: `Você selecionou ${getWrongItemsInCart().length} ingrediente(s) incorretamente!`,
          translation:`You selected ${getWrongItemsInCart().length} ingredient(s) incorrectly!`
        },
      cashierContinue: haveAllValue ?
        () => setState({...state, runTimer: true, moneySelection: true})
        :() => setState({ ...state, scene: "MARKET", runTimer: true}),
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

  const doPayment = () => {
    let cashierLines
    let change = state.payment.reduce((acc, money) => acc + money.value * money.count, 0).toFixed(2) - state.price
    if(change < 0)
      cashierLines = {
        text:"Nossos patrocinadores vão ter que me pagar um extra para completar sua compra.",
        translation: "Our sponsors will need to give me an extra to pay for the rest of your purchase."
      }
    else if( change > 0)
      cashierLines = {
        text: "Bem... Obirgada pela gorgeta!",
        translation: "Well... Thanks for the tip!"
      }
    else //if( value === 0)
      cashierLines = {
        text: "Você pagou exatamente o que devia para o caixa do supermercado! Mexer com dinheiro é contigo mesmo!",
        translation: "You gave the exact amout to the supermarket's cashier! Dealing with money is clearly not a problem for you!"
      }

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
                    {!state.checkout && !state.checkoutConfirm && (
                      <div id={styles.gameGrid}>
                        <img
                          onClick={() =>
                            setState({ ...state, shopList: !state.shopList })
                          }
                          src={listIcon}
                          alt=""
                          className={styles.listIcon}
                          style={{position: "absolute"}}
                        />

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
                          style={{position: "absolute"}}
                        />
                        <div className={styles.cart}>
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
                          <img
                            src={cart}
                            alt=""
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
                        <img
                          src={cart}
                          alt=""
                        />
                      </div>
                    )}

                    {state.shopList && (
                      <div
                        className={styles.shopList}
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
                                className={styles.shopListItemCheck}
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
                              className={styles.shopListItemImg}
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
                  <div style={{position: 'relative', width:'100%', height: '100%'}}>
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
                      </div>
                    )}
{/*****************************************************************************/}
                    <div id="dialog-interact">
                      <ChefDialog chef={missionData.character}
                        hideDialog={state.moneySelection}
                        chefFeeling={state.change < 0 ? "wrongPayment" : "default"}
                        text={state.cashierLines.text}
                        translation={state.cashierLines.translation}
                        onContinue={state.cashierContinue}
                      />
                        <img style={{zIndex: 0, width: 500}} src={cashierTable} alt="" />
                    </div>
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
      {process.env.NODE_ENV === 'development' &&
        <div>
          <button style={{position: 'absolute', bottom: 0}} onClick={() => setState({...state, scene: 'MARKET'}) }>
            Pula tutorial
          </button>
          <button style={{position: 'absolute', bottom: 0, left: 100}} onClick={moveToCheckout}>
            Para o caixa
          </button>
        </div>
      }
    </div>
  );
};

export default Game3;
