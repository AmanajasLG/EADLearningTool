import React from 'react'

const ChooseCharacter = ({characters, onCharacterClick}) => {
  return(
    <div
      style={{
        display: "flex",
        marginTop: '10%',
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        height: "100%",
      }}
    >
      {characters.map((character, index) => (
        <img
          key={index}
          src={character.image}
          style={{ height: "80%", cursor: "pointer" }}
          onClick={() => onCharacterClick(character)}
          alt={character.id}
        />
      ))}
    </div>
  )
}

export default ChooseCharacter
