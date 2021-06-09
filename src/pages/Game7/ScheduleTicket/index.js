import React from 'react'
import Calendar from '../Calendar'
import Flights from '../Flights'
import Counter from '../Counter'

const ScheduleTicket = ({step, date, flight, flights, tickets, onConfirm, dateSelected, flightSelected, counterChange}) => {

  const [state, setState] = React.useState({step: step? step : 0, date: date? date : null, flight: flight? flight: null, tickets: tickets? tickets:null})

  const steps = ['Escolha a data', 'Escolha o voo', 'Quantidade de passagens']
  const checkStep = () => {
    return(
      (state.step === 0 && state.date) ||
      (state.step === 1 && state.flight) ||
      (state.step === 2 && state.tickets)
    )
  }

  const advance = state.step < 2 ? () => setState(s => ({...s, step: state.step + 1})) : onConfirm
  const onDateSelected = num => {
    setState(s => ({...s, date: num}))
    if(dateSelected) dateSelected(num)
  }

  const onFlightSelected = index => {
    setState(s => ({...s, flight: index}))
    if(flightSelected) flightSelected(index)
  }

  const onCounterChange = value => {
    setState(s => ({...s, tickets: value}))
    if(counterChange) counterChange(value)
  }

  return(
    <div style={{width: '100%', height: '100%'}}>
      <div>Agende o Voo! {steps.slice(0, state.step + 1).map( t => ` > ${t}`)}</div>
      {state.step === 0 && <Calendar selected={date} onClick={ onDateSelected }/>}
      {state.step === 1 && <Flights selected={flight} flights={ flights } onClick={ onFlightSelected }/>}
      {state.step === 2 && <Counter value={tickets} onChange={ onCounterChange }/>}

      {state.step > 0 &&
        <button onClick={() => setState(s => ({...s, step: state.step - 1}))}>
          Voltar
        </button>
      }
      <button disabled={!checkStep()} onClick={advance}>
        Avançar
      </button>
    </div>
  )
}

export default ScheduleTicket
