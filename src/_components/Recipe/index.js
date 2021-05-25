import React from "react";
import marked from "marked";
import parse from "html-react-parser";
import "./index.scss";

import { ingredientsListBg, listCheck, listIcon } from "../../img";

const Recipe = ({ ingredientsList, hasImage, showCheck, iconShouldShow }) => {
  const [state, setState] = React.useState(false);
  return (
    <div className="shop-list-div">
      {state && (
        <div className="overlay-shop-list">
          {/* <img
            src={ingredientsListBg}
            alt="ingredients-list-bg"
            className="shop-list shop-list-img"
          /> */}
          <div
            className="shop-list shop-list-content"
            style={{
              backgroundImage: "url(" + ingredientsListBg + ")",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "top center",
            }}
          >
            {ingredientsList.map((ingredient, index) => (
              <div className="shop-list-item">
                {showCheck(ingredient) ? (
                  <img
                    src={listCheck}
                    alt=""
                    className="shop-list-item-check"
                  />
                ) : (
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      display: "inline-block",
                    }}
                  ></div>
                )}{" "}
                {hasImage ? (
                  <img
                    src={ingredient.image}
                    alt=""
                    className="shop-list-item-img"
                  />
                ) : (
                  <span>{ingredient.order}. </span>
                )}
                {parse(marked.parseInline(ingredient.description))};
              </div>
            ))}
          </div>
        </div>
      )}
      {iconShouldShow && (
        <img
          onClick={() => setState(!state)}
          src={listIcon}
          alt=""
          className="list-icon"
        />
      )}
    </div>
  );
};

export default Recipe;
