import React from 'react'

const Recipe = ({recipe, closeText, onClose}) => {
  return(
    <div>
      Receita
      <div>
        {recipe.map( (ingredient, index) =>
          <div key={index}>
            {ingredient.name}
          </div>
        )}
      </div>
      <button onClick={onClose? onClose : () =>{}}>
        {closeText? closeText : "Fechar"}
      </button>
    </div>
  )
}

export default Recipe
