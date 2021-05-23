import React from "react";
import "./index.scss";
import marked from "marked";
import parse from "html-react-parser";

import DialogCharacter from "../../../../_components/DialogCharacter";

import {
  ingredientsListRotated,
  kitchen,
  hourglassFull,
} from "../../../../img";

import { zeroFill } from "../../../../_helpers";

const Intro = ({ chef, recipe, ingredientsList, seconds, goToKitchen }) => {
  const [state, setState] = React.useState({ screen: 0 });

  return (
    <div id="room-itself" className="intro">
      {state.screen === 0 && (
        <div
          id="dialog-interact"
          style={{
            backgroundImage: "url(" + { kitchen } + ")",
          }}
        >
          <div id="dialogos">
            <div id="dialog-box">
              <span lang="pt-br">
                No episódio de hoje, vamos ter o desafio de preparar{" "}
                {recipe.name}!!
              </span>
              <span lang="en">
                In today's episode, we'll face the challenge of preparing{" "}
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
          <img src={recipe.image} alt="" />
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
        <div className="intro-recipe">
          <div>
            <img src={recipe.image} alt="" />
            <span>{recipe.name}</span>
            <button
              className="btn btn-center"
              id="btn-end-tutorial"
              onClick={() => setState({ screen: 3 })}
            >
              Continuar
            </button>
          </div>

          <div className="ingredients-list">
            <img src={ingredientsListRotated} alt="" />
            <div className="rotated ingredients">
              {ingredientsList.map((ingredient, index) => (
                <div className="ingredient">
                  {ingredient.order}.{" "}
                  {parse(marked.parseInline(ingredient.description))};
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {state.screen === 3 && (
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
            onClick={goToKitchen}
          >
            Estou pronto!
          </button>
        </div>
      )}
    </div>
  );
};

export default Intro;
