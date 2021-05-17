import React from "react";
import "./index.scss";
import DialogCharacter from "../../../Game2/components/DialogCharacter";
import Aisle from "../Aisle";

import hourglassFull from "../../../../img/Game3/hourglass-full.svg";
import cartImg from "../../../../img/Game3/cart.svg";
import checkout from "../../../../img/Game3/checkout.svg";
import ingredientsListBg from "../../../../img/Game3/ingredients-list.svg";
import listCheck from "../../../../img/Game3/check.svg";
import listIcon from "../../../../img/Game3/list-icon.svg";

const zeroFill = (s, size) => {
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
};

const Tutorial = ({
  chef,
  aisle,
  seconds,
  cart,
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

  return (
    <div id="room-itself" className="tutorial">
      {state.step === 0 && (
        <div>
          <div
            className={
              "tutorial-blob " +
              (state.tutorialLine === 2 || state.tutorialLine === 3
                ? "blob-right"
                : "blob-left")
            }
          >
            {state.tutorialLine === 0 && (
              <div className="blob-left">
                <span lang="pt-br">
                  Clique em qualquer item para adicioná-lo ao carrinho.
                </span>
                <span lang="en">Click on any item to add it to your cart.</span>
              </div>
            )}
            {state.tutorialLine === 1 && (
              <div className="blob-left">
                <span lang="pt-br">
                  Clique em qualquer item do seu carrinho para retirá-lo.
                </span>
                <span lang="en">
                  Click on any item from your cart to remove it.
                </span>
              </div>
            )}
            {state.tutorialLine === 2 && (
              <div className="blob-right">
                <span lang="pt-br">
                  Use as setas para navegar pelas prateleiras.
                </span>
                <span lang="en">Use the arrows to move through shelves.</span>
              </div>
            )}
            {state.tutorialLine === 3 && (
              <div className="blob-right">
                <span lang="pt-br">
                  Passe o mouse sobre o bloco de notas para ver a lista de
                  compras.
                </span>
                <span lang="en">
                  Hover the mouse over the notepad to see the shopping list.
                </span>
              </div>
            )}
            {state.tutorialLine === 4 && (
              <div className="blob-left">
                <span lang="pt-br">
                  Clique no icone de dinheiro para finalizar sua compra.
                </span>
                <span lang="en">Click on the cash icon to checkout.</span>
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
              {cart.map((product, index) => (
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
              src={cartImg}
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
