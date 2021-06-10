import React from 'react'

import Button from '@material-ui/core/Button'

import { shuffle } from '../../../_helpers'

const SendEmail = ({places, place, day, month, flight, tickets, onConfirm}) => {
  const texts = [
    `Seu voo é para ${place}`,
    `Seu voo é dia ${day} de ${month}`,
    `Seu voo é parte as ${flight.takeOff} e com chegada as ${flight.land}`,
    `Seus ${tickets} tickets foram comprados`
  ]

  const setOptions = index =>
    shuffle([...places.filter(p => p.name !== place).map(p => p.name), ...texts[index].split(' ')]).map( o =>({text: o, show: true}))


  const [state, setState] = React.useState({
    index: 0,
    selected: [],
    options: setOptions(0),
    sentences: [],
    totalTexts: texts[0].split(' ').length
  })

  const selectOption = option => () => {
    if(state.selected.length < texts[state.index].split(' ').length){
      option.show = false
      setState(s => ({...s,
        selected: [...state.selected, {option: option, index: state.selected.length}]
      }))
    }
  }

  const unselectOption = (section, index) => () => {
    section.option.show = true
    setState(s => ({...s,
      selected: state.selected.filter(obj => obj.index !== index)
    }))
  }

  const nextSentence = () => {
    let updateState = {}
    updateState.index = state.index + 1
    updateState.sentences =[...state.sentences, state.selected.reduce((acc, sel, index) => acc + sel.option.text + (index === state.selected.length - 1? '' : ' ') , '')]
    updateState.selected = []
    updateState.options = []

    if(updateState.index < texts.length){
      updateState.options = setOptions(updateState.index)
      updateState.totalTexts = texts[updateState.index].split(' ').length
    }

    setState(s => ({...s, ...updateState }))
  }

  const sendData = () => {
    onConfirm(texts.map((t, index) => ({correct: t, player: state.sentences[index]}) ))
  }

  return(
    <div>
      <div>
        {state.sentences.map((sentence, index) =>
          <div key={index}>{sentence}</div>
        )}
      </div>


      {state.index < texts.length ?
        <div>Local:
          {state.selected
            .map((section, index) =>
              <Button key={index} onClick={unselectOption(section, index)}>
                {section.option.text}
              </Button>
          )}

          <spam>{state.selected.length}/{state.totalTexts}</spam>

          <Button style={{display: 'block'}} onClick={nextSentence} disabled={state.selected.length !== state.totalTexts}>
            Escrever
          </Button>
        </div>
        :
        <Button style={{display: 'block'}} onClick={sendData }>
          Enviar
        </Button>
      }

      <div>
        {state.options
          .filter( section => section.show)
          .map((option, index) =>
            <Button key={index} onClick={selectOption(option)}>
              {option.text}
            </Button>
        )}
      </div>


    </div>
  )
}

export default SendEmail
