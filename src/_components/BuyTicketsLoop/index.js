import React from 'react'

import WindowScreen from '../WindowScreen'
import Email from '../Email'
import Places from '../Places'
import ScheduleTicket from '../ScheduleTicket'
import { months } from '../../_helpers'


import initialState from './initialState'

const BuyTicketsLoop = ({mission, onDone}) => {
  const [state, setState] = React.useState(initialState())
  const ticketData = () =>
  ({
    day: state.day,
    month: state.month,
    place: state.place,
    flight: {...mission.flights[state.flight]}
  })

  return(
    <React.Fragment>
      {state.window !== 'NONE' &&
        <WindowScreen style={{position: 'absolute', left: '10%', width: '70%', height: '70%',  margin: '10% auto 0 auto', fontSize: '3em'}}>
          {state.window === 'EMAIL' &&
            <Email message={mission.message} onReady={() => setState(s => ({...s, window: 'NONE' })) }/>
          }
          {state.window === 'PLACES' &&
            <Places value={state.place} places={mission.places} onPlaceClick={(index) => setState(s => ({...s, place: index}))} onConfirm={() => setState(s => ({...s, window: 'NONE'}))}/>
          }
          {state.window === 'SCHEDULE' &&
            <ScheduleTicket onConfirm={() => setState(s => ({...s, window: 'NONE'}))}
              day={state.day} month={state.month} flight={state.flight} tickets={state.tickets}
              flights={mission.flights}
              dateSelected={ value =>  setState(s => ({...s, day: value}) )}
              monthChange={ value => setState(s => ({...s, month: value}))}
              flightSelected={ value => setState(s => ({...s, flight: value}) )}
              counterChange={ value => setState(s => ({...s, tickets: value}) )}

              onConfirm={() => setState(s => ({...s, window: 'NONE', confirmWindow: true}) )}
            />
          }
        </WindowScreen>
      }

      {state.confirmWindow &&
        <div style={{position: 'absolute', left: '50%', marginTop: '20%'}}>
          <div style={{fontSize: '3em', position: 'relative', left: '-50%', backgroundColor: '#eeeeff'}}>
            Terminou? Revise a seleção:
            <div>{state.tickets + 1} passage{state.tickets === 0? 'm' : 'ns'}.</div>
            <div>Destino: {mission.places[state.place].name}</div>
            <div>Mês: {months[state.month]}</div>
            <div>Dia: {state.day}</div>
            <div>Horário: {mission.flights[state.flight].takeOff} - {mission.flights[state.flight].land}</div>

            <button onClick={() => setState(s => ({...s, confirmWindow: false}))}>Voltar</button>
            <button onClick={() => onDone(ticketData())}>Avançar</button>
          </div>
        </div>
      }

      <div style={{display: 'flex', flexDirection: 'column', width: '10%', position: 'absolute', top: '20%', right: 0}}>
        <div style={{backgroundColor: '#aaaaff', borderRadius: '50%'}}>
          <img style={{cursor: 'pointer'}} onClick={() => setState(s => ({...s, window: 'EMAIL'}))} src="https://res.cloudinary.com/learning-tool/image/upload/v1622937768/Leite_De_Vaca_c1fb94405c.svg"/>
        </div>
        <div style={{backgroundColor: '#aaaaff', borderRadius: '50%'}}>
          <img style={{cursor: 'pointer'}} onClick={() => setState(s => ({...s, window: 'PLACES'}))} src="https://res.cloudinary.com/learning-tool/image/upload/v1622937768/Leite_De_Vaca_c1fb94405c.svg"/>
        </div>
        <div style={{backgroundColor: '#aaaaff', borderRadius: '50%'}}>
          <img style={{cursor: 'pointer'}}  onClick={() => setState(s => ({...s, window: 'SCHEDULE'}))} src="https://res.cloudinary.com/learning-tool/image/upload/v1622937768/Leite_De_Vaca_c1fb94405c.svg"/>
        </div>
      </div>

      <div style={{position: 'absolute', bottom: 0, left: 0, backgroundColor: '#aaaaff', borderRadius: '50%', width: '10%'}}>
        <img style={{cursor: 'pointer'}} src="https://res.cloudinary.com/learning-tool/image/upload/v1622937768/Leite_De_Vaca_c1fb94405c.svg"/>
      </div>

    </React.Fragment>
  )
}

export default BuyTicketsLoop
