import React from "react";
import tutorialStyles from "./index.module.scss";
import gameStyles from "../../index.module.scss";
import ChefDialog from "../ChefDialog";
import Aisle from "../../../../_components/Aisle";
import Button from '../../../../_components/Button'
import TimerAnounce from '../../../../_components/TimerAnounce'
import {
  cart,
  checkout,
  ingredientsListBg,
  listCheck,
  listIcon,
} from "../../../../img";
import { zeroFill } from "../../../../_helpers";

const Tutorial = ({
  chef,
  aisle,
  seconds,
  shoppingCart,
  ingredientsList,
  hasPlayed,
  addProduct,
  removeProduct,
  toPreviousAisle,
  toNextAisle,
  goToMarket,
}) => {
  const [state, setState] = React.useState({
    step: 0,
    tutorialLine: 0,
    shopList: false,
  });

  const addProductNextLine = (product) => () => {
    if (state.tutorialLine === 0) {
      addProduct(product)();
      setState({
        ...state,
        tutorialLine: 1,
      });
    }
  };

  const removeProductNextLine = (index) => () => {
    if (state.tutorialLine === 1) {
      removeProduct(index)();
      setState({ ...state, tutorialLine: 2 });
    }
  };

  const toPreviousAisleNextLine = () => {
    if (state.tutorialLine === 2) {
      toPreviousAisle();
      setState({ ...state, tutorialLine: 3 });
    }
  };

  const toNextAisleNextLine = () => {
    if (state.tutorialLine === 2) {
      toNextAisle();
      setState({ ...state, tutorialLine: 3 });
    }
  };

  const shopListNextLine = () => {
    console.log(state.shopList);
    if (state.tutorialLine === 3 && !state.shopList)
      setState({ ...state, shopList: !state.shopList });
    else if (state.tutorialLine === 3 && state.shopList)
      setState({ ...state, tutorialLine: 4, shopList: !state.shopList });
  };

  const tutorialText = [
    ["Clique em qualquer item para <strong>adicioná-lo</strong> ao carrinho.", "Click on any item to <strong>add it</strong> to your cart."],
    ["Clique em qualquer item do seu carrinho para retirá-lo.", "Click on any item from your cart to remove it."],
    ["Use as setas para navegar pelas prateleiras.", "Use the arrows to move through shelves."],
    ["Passe o mouse sobre o bloco de notas para ver a lista de compras.", "Hover the mouse over the notepad to see the shopping list."],
    ["Clique no ícone de dinheiro para finalizar sua compra.", "Click on the cash icon to checkout."]
  ].map( (line, index) => {return {ptbr: line[0], preferred: line[1]} } )

  const blobPosition = (state.tutorialLine === 2 || state.tutorialLine === 3) ? tutorialStyles.blobRight : tutorialStyles.blobLeft;

  return (
    <div id="room-itself" className="tutorial">
      {state.step === 0 && (
        <div id={tutorialStyles.tutorialGrid}>
          <div
            className={tutorialStyles.tutorialBlob + " " + blobPosition}
          >
            {(state.tutorialLine >= 0 && state.tutorialLine <= 4) && (
              <div>
                <span lang="pt-br" dangerouslySetInnerHTML={{__html: tutorialText[state.tutorialLine].ptbr}}></span>
                <span lang="en" dangerouslySetInnerHTML={{__html: tutorialText[state.tutorialLine].preferred}}></span>
              </div>
            )}
            {hasPlayed && (
              <button
                className="btn btn-center"
                id="btn-end-tutorial"
                onClick={goToMarket}
              >
                Skip tutorial
              </button>
            )}
          </div>
          <Aisle
            products={aisle}
            addProduct={addProductNextLine}
            toPreviousAisle={toPreviousAisleNextLine}
            toNextAisle={toNextAisleNextLine}
          />
          <div className={gameStyles.cart}>
            <div className={gameStyles.cartItems}>
              {shoppingCart.map((product, index) => (
                <div className={gameStyles.cartItem} key={index}>
                  <img
                    src={
                      ingredientsList.find(
                        (ingredient) => ingredient.name === product.name
                      ).image
                    }
                    alt=""
                    onClick={removeProductNextLine(index)}
                    className={gameStyles.cartItemImg}
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

          {state.tutorialLine > 2 && (
            <img
              onClick={shopListNextLine}
              src={listIcon}
              alt=""
              className={gameStyles.listIcon}
            />
          )}
          {state.tutorialLine === 4 && ( // Dinheiro
            <img
              onClick={() =>
                setState({
                  ...state,
                  step: 1,
                })
              }
              src={checkout}
              alt=""
            />
          )}

          {state.shopList && (
            <div
              className={gameStyles.shopList}
              style={{
                backgroundImage: "url(" + ingredientsListBg + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            >
              {ingredientsList.map((ingredient, index) => (
                <div>
                  <img
                    src={listCheck}
                    alt=""
                    className={gameStyles.shopListItemCheck}
                  />

                  <img
                    src={ingredient.image}
                    alt=""
                    className={gameStyles.shopListItemImg}
                  />
                  {ingredient.description}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {state.step === 1 && (
        <div id="dialog-interact" style={{position: 'relative', width: '100%', height: '100%'}}>
          <ChefDialog chef={chef} onContinue={() => setState({ step: 2 })}
            text="Agora você está pronto para começar as compras! Coloque tudo que está na lista no carrinho antes que o tempo acabe!"
            translation={"Now you're ready to start shopping! Put everything on the list in the cart before time runs out!"}/>
        </div>
      )}

      {state.step === 2 &&
        <TimerAnounce seconds={seconds} onReady={goToMarket}/>
      }

      {process.env.NODE_ENV === 'development' &&
        <button style={{position: 'absolute', bottom: 0}} onClick={goToMarket}>
          Pula tutorial
        </button>
      }
    </div>
  );
};

export default Tutorial;
