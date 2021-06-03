import React from "react";
import marked from "marked";
import parse from "html-react-parser";
import styles from "./index.module.scss";

import { ingredientsListBg, listCheck, listCheckbox, listIcon } from "../../img";

const Recipe = ({ ingredientsList, hasImage, showCheck, iconShouldShow, onMouseEnter, onMouseLeave }) => {
  const [state, setState] = React.useState(false);

  return (
    <div className={styles["shop-list-div"]}>
      {state &&
        <div className={styles["overlay-shop-list"]}>
          <div>
            <img src={ingredientsListBg} alt=""/>
            <div className={styles["shop-list"]}>
              { ingredientsList? ingredientsList.map((ingredient, index) => (
                <div className={styles["shop-list-item-container"]} key={index}>
                  <div className={styles["shop-list-item"]}>
                    <img src={listCheckbox} alt=""/>
                    {showCheck(ingredient) && (<img src={listCheck} className={styles["checkmark"]} alt="" />)}
                    {hasImage && (<img src={ingredient.image} className={styles["shop-list-item-img"]} alt=""/>)}
                    <span>{parse(marked.parseInline(ingredient.description))}</span>
                  </div>
                </div>
              )) : (
                <div className={styles["shop-list-item-container"]}>
                  <div className={styles["shop-list-item"]}>
                    <span>Nenhum ingrediente encontrado na lista :(</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      }
      {iconShouldShow && (
        <img style={{width: '10%'}}
          onMouseEnter={() => {setState(true); onMouseEnter?.()}}
          onMouseLeave={() => {setState(false); onMouseLeave?.()}}
          src={listIcon}
          alt=""
          className={styles["list-icon"]}
        />
      )}
    </div>
  );
};

export default Recipe;
