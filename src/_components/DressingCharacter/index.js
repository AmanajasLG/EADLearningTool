import React from 'react'

const DressingCharacter = ({clothesTypes, clothes, onRemoveClick, ...props}) => {
  return(
    <div {...props}>
      <img src="" alt="character"/>
      <div>
        {clothesTypes.map((item, index) =>
          <div key={index}>{item}: {clothes[index]? clothes[index].name : "none"}
            {onRemoveClick && clothes[index] &&

              <button onClick={onRemoveClick(index)}>Remove</button>
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default DressingCharacter
