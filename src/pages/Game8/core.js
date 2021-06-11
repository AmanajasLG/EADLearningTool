import React from 'react'

import WindowScreen from '../../_components/WindowScreen'
import BuyTicketsLoop from '../../_components/BuyTicketsLoop'
import SendEmail from '../../_components/SendEmail'

import Button from '@material-ui/core/Button'
import Map from '../../_components/Map'

import { months } from '../../_helpers'

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
         {createTexts().map( (text, index) =>
           <div key={index}>{text}</div>
         )}
         <Button onClick={() => setState(s => ({...s, window: 'MAP'}))}>
           Fechar
         </Button>
       </WindowScreen>
      }

      {state.window === 'MAP' &&
        <Map />
      }

      {process.env.NODE_ENV === 'development' &&
        <div>
          <button onClick={() => setState(s => ({...s, window: 'SEND_EMAIL',
            tickets: {
              day: 1,
              month: 1,
              place: 1,
              tickets: 1,
              flight: { takeOff: '09:00', land:'12:00' }
            }
          }))}>Pula loop ticket</button>
        </div>
      }
    </React.Fragment>
  )
}

export default Core
