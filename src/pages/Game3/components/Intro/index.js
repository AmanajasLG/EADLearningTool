import React from "react";
import DialogCharacter from "../../../Game2/components/DialogCharacter";

const Intro = ({ chef, recipe, ingredientsList, goToTutorial }) => {
  const [state, setState] = React.useState({ screen: 0 });

  return (
    <div id="room-itself" className="intro">
      {state.screen === 0 && (
        <div id="dialog-interact">
          <div id="dialogos">
            <div id="dialog-box">
              <span lang="pt-br">
                Faça as compras da lista antes do tempo acabar! No episódio de
                hoje, vamos ter o desafio de preparar {recipe.name}!!
              </span>
              <span lang="en">
                Shop for the items in the list before the time is up! In today's
                episode, we'll face the challenge of preparing{" "}
                {recipe.nameTranslate}!!
              </span>
            </div>
            <button
              className="btn btn-center"
              id="btn-end-tutorial"
              onClick={() => setState({ screen: 1 })}
            >
              Continuar
            </button>
          </div>
          <DialogCharacter character={chef} feeling="init" />
        </div>
      )}

      {state.screen === 1 && (
        <div id="dialog-interact">
          <div id="dialogos">
            <div id="dialog-box">
              <span lang="pt-br">{recipe.description}</span>
              <span lang="en">{recipe.descriptionTranslate}</span>
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
        <div id="dialog-interact">
          <div>
            <img src={recipe.img} alt="" />
            <span>{recipe.name}</span>
            <button
              className="btn btn-center"
              id="btn-end-tutorial"
              onClick={goToTutorial}
            >
              Continuar
            </button>
          </div>

          <div>
            {ingredientsList.map((ingredient, index) => (
              <div key={index}>{ingredient.description}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Intro;
