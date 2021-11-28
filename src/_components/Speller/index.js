import React from 'react'
import { right, error } from '../../img'

const Speller = ({word, onWordCorrect, onWordIncorrect}) => {
  const [shuffledWord, setShuffledWord] = React.useState(word.split('').map( letter => ({letter, selected: false})))
  const [formedWord, setFormedWord] = React.useState([])

  const clearWord = () => {
    setShuffledWord( shuffledWord.map( letter => ({...letter, selected: false})))
    setFormedWord([])
  }

  const addLetter = (index) => () => {
    let letter = {letter: shuffledWord[index].letter, selected: true}
    setShuffledWord([...shuffledWord.slice(0, index), letter, ...shuffledWord.slice(index+1)])
    setFormedWord([...formedWord, letter.letter]);
  };

  const checkWord = () => {
    if ( word === formedWord.reduce((acc, letter) => acc + letter.letter, "")){
      if(onWordCorrect) onWordCorrect()
    }
    else {
      if (onWordIncorrect) onWordIncorrect()
      clearWord()
    }
  };

  return(
    <div className="name-order-div absolute-center">
      <div className="shuffled-letters">
        {shuffledWord.map((letter, index) => (
          <span
            key={index}
            onClick={addLetter(index)}
            style={{
              opacity: letter.selected ? 0 : 1,
              pointerEvents: letter.selected
                ? "none"
                : "auto",
            }}
            className="letter"
          >
            {letter.letter}
          </span>
        ))}
      </div>
      <div className="ordered-letters-div">
        <div className="ordered-letters">
          {formedWord.reduce(
            (acc, letter) => acc + letter,
            ""
          )}
        </div>
        <div className="ordered-letters-buttons">
          <img
            onClick={clearWord}
            src={error}
            alt="clear-ingredient-name"
          />
          <img
            onClick={checkWord}
            src={right}
            alt="check-ingredient-name"
          />
        </div>
      </div>
    </div>
  )
}

export default Speller
