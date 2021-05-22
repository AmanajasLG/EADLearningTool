import React from "react";
import "./index.scss";
import Button from '@material-ui/core/Button'

import DialogCharacter from "../../../../_components/DialogCharacter";
import DialogBox from '../../../../_components/DialogBox'
import { ingredientsListRotated, kitchen } from "../../../../img";
import ChefDialog from '../ChefDialog'


const instructionText=(recipeName, recipeNameTranslate)=> ({
  en: `Shop for the items in the list before the time is up! In today's
  episode, we'll face the challenge of preparing
  "${recipeNameTranslate}"!!`,
  ptbr:`Faça as compras da lista antes do tempo acabar! No episódio de
  hoje, vamos ter o desafio de preparar ${recipeName}!!`
})

const Intro = ({ chef, recipe, ingredientsList, goToTutorial }) => {
  const [state, setState] = React.useState({ screen: 0 });
  const instructions = instructionText(recipe.name, recipe.nameTranslate)

  return (
    <div id="room-itself" className="intro" style={{width: '100%', height: '100%'}}>
      {state.screen === 0 && (
        <div
          id="dialog-interact"
          style={{width: '100%', height: '100%',
            backgroundImage: `url(${ kitchen })`,
            backgroundSize: `100% 100%`
          }}
        >
            <ChefDialog chef={chef} onContinue={() => setState({ screen: 1 })} text={instructions.ptbr} translation={instructions.en}/>
        </div>
      )}

      {state.screen === 1 && (
        <div id="dialog-interact">
          <ChefDialog chef={chef} onContinue={() => setState({ screen: 2 })} text={recipe.description} translation={recipe.descriptionTranslate}/>
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
              onClick={goToTutorial}
            >
              Continuar
            </button>
          </div>

          <div className="ingredients-list">
            <img src={ingredientsListRotated} alt="" />
            <div className="rotated ingredients">
              {ingredientsList.map((ingredient, index) => (
                <div className="ingredient" key={index}>
                  <img src={ingredient.image} alt="" />
                  <span>{ingredient.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Intro;
