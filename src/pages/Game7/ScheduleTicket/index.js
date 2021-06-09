import React from 'react'
import Calendar from '../Calendar'

const ScheduleTicket = ({step, date, flight, tickets, onConfirm, dateSelected}) => {
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

  return(
    <div style={{width: '100%', height: '100%'}}>
      <div>Agende o Voo! {steps.slice(0, state.step + 1).map( t => ` > ${t}`)}</div>
      {state.step === 0 && <Calendar onClick={num => () => setState(s => ({...s, date: num})) }/>}
      {state.step === 1 && <div>Voo</div>}
      {state.step === 2 && <div>Quantidade</div>}

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
