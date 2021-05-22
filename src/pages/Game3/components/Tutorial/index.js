import React from "react";
import "./index.scss";
import DialogCharacter from "../../../../_components/DialogCharacter";
import Aisle from "../../../../_components/Aisle";

import {
  hourglassFull,
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
    ["Clique em qualquer item para adicioná-lo ao carrinho.", "Click on any item to add it to your cart."],
    ["Clique em qualquer item do seu carrinho para retirá-lo.", "Click on any item from your cart to remove it."],
    ["Use as setas para navegar pelas prateleiras.", "Use the arrows t move through shelves."],
    ["Passe o mouse sobre o bloco de notas para ver a lista de compras.", "Hover the mouse over the notepad to see the shopping list."],
    ["Clique no ícone de dinheiro para finalizar sua compra.", "Click on the cash icon to checkout."]
  ].map( (line, index) => {return {ptbr: line[0], preferred: line[1]} } )

  const blobPosition = (state.tutorialLine === 2 || state.tutorialLine === 3) ? "blob-right" : "blob-left";

  return (
    <div id="room-itself" className="tutorial">
      {state.step === 0 && (
        <div>
          <div
            className={"tutorial-blob " + blobPosition}
          >
            {(state.tutorialLine >= 0 && state.tutorialLine <= 4) && (
              <div className={blobPosition}>
                <span lang="pt-br">
                  {tutorialText[state.tutorialLine].ptbr}
                </span>
                <span lang="en">
                  {tutorialText[state.tutorialLine].preferred}
                </span>
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
          <div className="cart">
            <div className="cart-items">
              {shoppingCart.map((product, index) => (
                <div className="cart-item">
                  <img
                    src={
                      ingredientsList.find(
                        (ingredient) => ingredient.name === product.name
                      ).image
                    }
                    alt=""
                    onClick={removeProductNextLine(index)}
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

          {state.tutorialLine > 2 && (
            <img
              onClick={shopListNextLine}
              src={listIcon}
              alt=""
              className="list-icon"
            />
          )}
          {state.tutorialLine === 4 && (
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
              className="shop-list"
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
                    className="shop-list-item-check"
                  />

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
      )}

      {state.step === 1 && (
        <div id="dialog-interact">
          <div id="dialogos">
            <div id="dialog-box">
              <span lang="pt-br">
                Agora você está pronto para começar as compras! Coloque tudo que
                está na lista no carrinho antes que o tempo acabe!
              </span>
              <span lang="en">
                Now you're ready to start shopping! Put everything on the list
                in the cart before time runs out!
              </span>
            </div>
            <button
              className="btn btn-center"
              id="btn-end-tutorial"
              onClick={() => setState({ step: 2 })}
            >
              Continuar
            </button>
          </div>
          <DialogCharacter character={chef} feeling="init" />
        </div>
      )}

      {state.step === 2 && (
        <div>
          <img src={hourglassFull} alt="" />
          <span>Você tem</span>
          <span>
            {zeroFill(Math.floor(seconds / 60).toString(), 2)}:
            {zeroFill((seconds % 60).toString(), 2)}
          </span>
          <span>minutos</span>
          <button
            className="btn btn-center"
            id="btn-end-tutorial"
            onClick={goToMarket}
          >
            Estou pronto!
          </button>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
