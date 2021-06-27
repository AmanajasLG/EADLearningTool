import React from 'react'

import WindowScreen from '../../_components/WindowScreen'
import BuyTicketsLoop from '../../_components/BuyTicketsLoop'
import SendEmail from '../../_components/SendEmail'

import initialState from './initialState'

const Core = ({exitGame, mission, onEndGame}) => {
  const [state, setState] = React.useState(initialState())

  const createTexts = () => ([
    `Seu voo é para ${state.tickets.place}`,
    `Seu voo é dia ${state.tickets.day} de ${state.tickets.month}`,
    `Seu voo é parte as ${state.tickets.flight.takeOff} e com chegada as ${state.tickets.flight.land}`,
    `Seus ${state.tickets.tickets} tickets foram comprados`
  ])

  return(
    <React.Fragment>
      {state.window === 'BUY_TICKETS' &&
        <BuyTicketsLoop mission={mission} onDone={data => setState(s => ({...s, window: 'SEND_EMAIL', tickets: data}))} />
      }

      {state.window === 'SEND_EMAIL' &&
        <WindowScreen style={{position: 'absolute', left: '10%', width: '70%', height: '70%',  margin: '10% auto 0 auto', fontSize: '3em'}}>
          <SendEmail
            texts={createTexts()} places={mission.places} place={mission.places[state.tickets.place].name}
            onConfirm={sentences => onEndGame({ tickets: state.tickets, sentences})}
          />
        </WindowScreen>
      }

    </React.Fragment>
  )
}

export default Core
