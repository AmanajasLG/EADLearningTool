import React from "react";
import "./index.scss";
import Button from "../../../../_components/Button";

// import DialogCharacter from "../../../../_components/DialogCharacter";
// import DialogBox from '../../../../_components/DialogBox'
import { kitchen, recipeBgRound } from "../../../../img";
import ChefDialog from "../../../Game3/components/ChefDialog";
import IngredientList from "../../../Game3/components/IngredientList";
import ListedIngredient from "../../../Game3/components/ListedIngredient";

const instructionText = (recipeName, recipeNameTranslate) => ({
  en: `Get the ingredients on the list ready before time runs out! In today's episode, we will be challenged to make
  "${recipeNameTranslate}"!!`,
  ptbr: `Prepare os ingredientes da lista antes do tempo acabar! No episódio de
  hoje, vamos ter o desafio de fazer ${recipeName}!!`,
});

const Intro = ({ chef, recipe, ingredientsList, goToTutorial }) => {
  const [state, setState] = React.useState({ screen: 0 });
  const instructions = instructionText(recipe.name, recipe.nameTranslate);

  return (
    <React.Fragment>
      {state.screen === 0 && (
        <React.Fragment>
          <img
            id="dialog-interact"
            src={kitchen}
            style={{
              position: "absolute",
              zIndex: -1,
              width: "100%",
              height: "100%",
            }}
            alt=""
          />
          <ChefDialog
            chef={chef}
            onContinue={() => setState({ screen: 1 })}
            text={instructions.ptbr}
            translation={instructions.en}
          />
        </React.Fragment>
      )}

      {state.screen === 1 && (
        <div
          id="dialog-interact"
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          <div style={{ position: "relative", overflow: "visible" }}>
            <img
              className="rotate backwards"
              style={{
                position: "absolute",
                width: "60%",
                left: "25%",
                top: "-130px",
                opacity: "60%",
              }}
              src={recipeBgRound}
              alt=""
            />
            <img
              className="rotate"
              style={{
                position: "absolute",
                width: "60%",
                left: "25%",
                top: "-130px",
              }}
              src={recipeBgRound}
              alt=""
            />
            <img
              className="dishPresentation"
              style={{ position: "absolute", right: "30%", width: "30%" }}
              src={recipe.image}
              alt=""
            />
          </div>
          <ChefDialog
            chef={chef}
            onContinue={() => setState({ screen: 2 })}
            text={recipe.description}
            translation={recipe.descriptionTranslate}
          />
        </div>
      )}

      {state.screen === 2 && (
        <div className="intro-recipe">
          <div
            style={{
              flex: "1 0 0px",
              width: 400,
              marginLeft: "10%",
              fontSize: "2em",
            }}
          >
            <img
              className="dishPresentation"
              style={{ margin: "0 auto" }}
              src={recipe.image}
              alt=""
            />
            <h1
              className="margin-half-top type-l type-display type-center"
              style={{ padding: "0 1.5em" }}
            >
              {recipe.name}
            </h1>
            <Button
              blink
              style={{
                display: "block",
                margin: "1.25em auto 0 auto",
                fontSize: "1.2em",
              }}
              onClick={goToTutorial}
              id="btn-start"
            >
              Continuar
            </Button>
          </div>
          <IngredientList style={{ flex: "1 0 0px" }}>
            {ingredientsList.map((ingredient, index) => (
              <ListedIngredient
                key={index}
                richText={ingredient.order !== null}
                ingredient={ingredient}
              />
            ))}
          </IngredientList>
        </div>
      )}
    </React.Fragment>
  );
};

//{ingredient.order}.{" "}
//{parse(marked.parseInline(ingredient.description))};

export default Intro;
