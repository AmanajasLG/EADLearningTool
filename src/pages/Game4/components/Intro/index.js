import React from "react";
import "./index.scss";
import marked from "marked";
import parse from "html-react-parser";

import ChefDialog from "../../../Game3/components/ChefDialog"
import IngredientList from "../../../Game3/components/IngredientList"
import TimerAnounce from '../../../../_components/TimerAnounce'
import Button from '../../../../_components/Button'
import {
  // ingredientsListRotated,
  // kitchen,
  recipeBg
} from "../../../../img";

// import { zeroFill } from "../../../../_helpers";

const Intro = ({ chef, recipe, ingredientsList, seconds, goToKitchen }) => {
  const [state, setState] = React.useState({ screen: 0 });

  return (
    <div id="room-itself" className="intro">
      {state.screen === 0 && (
        <div id="dialog-interact" style={{position: 'relative', width: '100%', height: '100%'}}>
          <ChefDialog chef={chef} onContinue={() => setState({ screen: 1 })}
            text={`No episódio de hoje, vamos ter o desafio de preparar ${recipe.name}!!`}
            translation={`In today's episode, we'll face the challenge of preparing ${recipe.nameTranslate}!!`}
          />
        </div>
      )}

      {state.screen === 1 && (
        <div id="dialog-interact" style={{position: 'relative', width: '100%', height: '100%'}}>
          <div style={{position: 'relative', overflow: 'visible'}}>
            <img style={{position: 'absolute', width: '60%', left: '25%', top: '-130px'}} src={recipeBg} alt=""/>
            <img style={{position: 'absolute', right: '30%', width: '30%'}} src={recipe.image} alt="" />
          </div>
          <ChefDialog chef={chef} onContinue={() => setState({ screen: 2 })}
            text={recipe.description}
            translation={recipe.descriptionTranslate}/>
        </div>
      )}

      {state.screen === 2 && (
        <div className="intro-recipe">
          <div style={{width: 400, marginLeft: '10%'}}>
            <div>
              <img src={recipe.image} alt="" style={{width: 400}}/>
            </div>
            <h1 className="margin-half-top type-l type-display type-center">
              {recipe.name}
            </h1>
            <Button blink
              style={{display: 'block', margin: '30px auto 0 auto'}}
              onClick={() => setState({ screen: 3 })}
            >
              Continuar
            </Button>
          </div>
          <IngredientList>
            {ingredientsList.map((ingredient, index) => (
              <div key={index} className="ingredient">
                {ingredient.order}.{" "}
                {parse(marked.parseInline(ingredient.description))};
              </div>
            ))}
          </IngredientList>
        </div>
      )}

      {state.screen === 3 &&
        <TimerAnounce seconds={seconds} onReady={goToKitchen} />
      }
    </div>
  );
};

export default Intro;
