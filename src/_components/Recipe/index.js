import React from "react";
import marked from "marked";
import parse from "html-react-parser";

import { ingredientsListBg, listCheck } from "../../img";

const Recipe = ({
  ingredientsList,
  closeText,
  onClose,
  hasImage,
  showCheck,
}) => {
  return (
    <div>
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
            {showCheck(ingredient) ? (
              <img src={listCheck} alt="" className="shop-list-item-check" />
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
  );
};

export default Recipe;
