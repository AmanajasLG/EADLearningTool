import React from "react";
import "./index.scss";
import Button from '../../../../_components/Button'

import DialogCharacter from "../../../../_components/DialogCharacter";
import DialogBox from '../../../../_components/DialogBox'
import { kitchen, recipeBgRound } from "../../../../img";
import ChefDialog from '../ChefDialog'
import IngredientList from '../IngredientList'

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
        <div id="dialog-interact"
          style={{width: '100%', height: '100%',
            backgroundImage: `url(${ kitchen })`,
            backgroundSize: `100% 100%`
          }}
        >
            <ChefDialog chef={chef} onContinue={() => setState({ screen: 1 })} text={instructions.ptbr} translation={instructions.en}/>
        </div>
      )}

      {state.screen === 1 && (
        <div id="dialog-interact" style={{position: 'relative', width: '100%', height: '100%'}}>
          <div style={{position: 'relative', overflow: 'visible'}}>
            <img className="rotate backwards" style={{position: 'absolute', width: '60%', left: '25%', top: '-130px', opacity: '60%'}} src={recipeBgRound} />
            <img className="rotate" style={{position: 'absolute', width: '60%', left: '25%', top: '-130px'}} src={recipeBgRound} />
            <img className="dishPresentation" style={{position: 'absolute', right: '30%', width: '30%'}} src={recipe.image} alt="" />
          </div>
          <ChefDialog chef={chef} onContinue={() => setState({ screen: 2 })} text={recipe.description} translation={recipe.descriptionTranslate}/>
        </div>
      )}

      {state.screen === 2 && (
        <div className="intro-recipe">
          <div style={{width: 400, marginLeft: '10%'}}>
            <img className="dishPresentation" src={recipe.image} alt=""/>
            <h1 className="margin-half-top type-l type-display type-center">
              {recipe.name}
            </h1>
            <Button blink
              style={{display: 'block', margin: '30px auto 0 auto'}}
              onClick={goToTutorial}
            >
              Continuar
            </Button>
          </div>
          <IngredientList>
            {ingredientsList.map((ingredient, index) =>
              <div className="ingredient" key={index}>
                <img className="ingredientImg" src={ingredient.image} alt="" />
                <span>{ingredient.description}</span>
              </div>
            )}
          </IngredientList>
        </div>
      )}
    </div>
  );
};

export default Intro;
