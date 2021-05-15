import React from "react";
import DialogCharacter from "../../../Game2/components/DialogCharacter";
import Aisle from "../Aisle";
import hourglassFull from "../../../../img/Game3/hourglass-full.svg";

const zeroFill = (s, size) => {
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
};

const Tutorial = ({ chef, addProduct, aisles, seconds, goToMarket }) => {
  const [state, setState] = React.useState({
    screen: 0,
    tutorialLine: 0,
    currentAisle: 0,
  });

  return (
    <div id="room-itself" className="tutorial">
      {state.screen === 0 && (
        <span>
          coisas
          <button
            className="btn btn-center"
            id="btn-end-tutorial"
            onClick={() => setState({ screen: 1 })}
          >
            Continuar
          </button>
        </span>
      )}

      {state.screen === 1 && (
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
              onClick={() => setState({ screen: 2 })}
            >
              Continuar
            </button>
          </div>
          <DialogCharacter character={chef} feeling="init" />
        </div>
      )}

      {state.screen === 2 && (
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
