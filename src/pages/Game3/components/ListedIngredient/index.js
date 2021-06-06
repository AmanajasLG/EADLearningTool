import React from 'react'
import marked from "marked";
import parse from "html-react-parser";

const ListedIngredient = ({ingredient, richText}) => {
  return (
    <div className="ingredient">
      {ingredient.order && ingredient.order}.{" "}
      {ingredient.image && <img className="ingredientImg" src={ingredient.image} alt="" />}
      {richText ? parse(marked.parseInline(ingredient.description)) : <span>{ingredient.description}</span>}
    </div>
  )
}

export default ListedIngredient
