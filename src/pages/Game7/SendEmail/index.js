import React from 'react'

import Button from '@material-ui/core/Button'

import { shuffle } from '../../../_helpers'

const SendEmail = ({places, place, date, flight, tickets}) => {
  const texts = [
    `Seu voo é para`,
    `Seu voo é dia ${date} de ${date}`,
    `Seu voo é parte as ${flight.takeOff} e com chegada as ${flight.land}`,
    `Seus ${tickets} tickets foram comprados`
  ]

  const [state, setState] = React.useState({
    index: 0,
    selected: [],
    options: shuffle([...places.map(p => p.name), ...texts[0].split(' ')]).map( o =>({text: o, show: true})),
    texts: texts,
  })

  const selectOption = option => () => {
    option.show = false
    setState(s => ({...s,
      selected: [...state.selected, {option: option, index: state.selected.length}]
    }))
  }

  const unselectOption = (section, index) => () => {
    section.option.show = true
    setState(s => ({...s,
      selected: state.selected.filter(obj => obj.index !== index)
    }))
  }

  return(
    <div>
      <div>Local:
        {state.selected
          .map((section, index) =>
            <Button key={index} onClick={unselectOption(section, index)}>
              {section.option.text}
            </Button>
        )}
      </div>

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
