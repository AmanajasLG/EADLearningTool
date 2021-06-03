import React from "react";
import tutorialStyles from "./index.module.scss";
import gameStyles from "../../index.module.scss";
import "./index.scss";
import ChefDialog from "../ChefDialog";
import Aisle from "../../../../_components/Aisle";
// import Button from '../../../../_components/Button'
import TimerAnounce from '../../../../_components/TimerAnounce'
import {
  cart,
  checkout,
  // ingredientsListBg,
  // listCheck,
  // listIcon,
} from "../../../../img";
// import { zeroFill } from "../../../../_helpers";
// import { parser } from "marked";
import htmlparse from "html-react-parser";
import Recipe from "../../../../_components/Recipe";

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
    ["Clique em qualquer item do seu carrinho para <strong>retirá-lo</strong>.", "Click on any item from your cart to <strong>remove it</strong>."],
    ["Use as setas para navegar pelas prateleiras.", "Use the arrows to move through shelves."],
    ["<strong>Passe o mouse</strong> sobre o bloco de notas para ver a lista de compras.", "<strong>Hover the mouse</strong> over the notepad to see the shopping list."],
    ["Clique no ícone de dinheiro para finalizar sua compra.", "Click on the cash icon to checkout."]
  ].map( (line, index) => {return {ptbr: line[0], preferred: line[1]} } )

  const blobPosition = (state.tutorialLine === 2 || state.tutorialLine === 3) ? tutorialStyles.blobRight : tutorialStyles.blobLeft;

  return (
    <div id="room-itself" className={"tutorial tutorialStep" + state.tutorialLine}>
      {state.step === 0 && (
        <div id={tutorialStyles.tutorialGrid}>
          <div
            className={tutorialStyles.tutorialBlob + " " + blobPosition}
          >
            {(state.tutorialLine >= 0 && state.tutorialLine <= 4) && (
              <div>
                <span lang="pt-br">
                  {htmlparse(tutorialText[state.tutorialLine].ptbr)}
                </span>
                <span lang="en">
                  {htmlparse(tutorialText[state.tutorialLine].preferred)}
                </span>
              </div>
            )}
            {hasPlayed && (
              <button
                className="btn btn-center"
                id={tutorialStyles.btnTutorial}
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
          <Recipe
            ingredientsList={ingredientsList}
            hasImage={true}
            showCheck={(ingredient) => false}
            iconShouldShow={state.tutorialLine === 3}
            onMouseEnter={shopListNextLine}
            onMouseLeave={shopListNextLine}
          />
          <img // Dinheiro
            onClick={() =>
              setState({
                ...state,
                step: 1,
              })
            }
            src={checkout}
            alt=""
            className={gameStyles.moneyIcon + " tutorial-money-icon"}
          />
        </div>
      )}

      {state.step === 1 && (
        <div id="dialog-interact" style={{position: 'relative', width: '100%', height: '100%'}}>
          <ChefDialog chef={chef} onContinue={() => setState({...state, step: 2 }) }
            text="Agora você está pronto para começar as compras! Coloque tudo que está na lista no carrinho antes que o tempo acabe!"
            translation={"Now you're ready to start shopping! Put everything on the list in the cart before time runs out!"}/>
        </div>
      )}

      {state.step === 2 &&
        <TimerAnounce seconds={seconds} onReady={goToMarket}/>
      }
    </div>
  );
};

export default Tutorial;
