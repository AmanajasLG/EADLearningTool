import React from 'react'

const ScheduleTicket = ({step, date, flight, tickets, onConfirm}) => {
  const [state, setState] = React.useState({step: step? step : 0, date: date? date : null, flight: flight? flight: null, tickets: tickets? tickets:null})
  const checkStep = () => {
    return(
      (state.step === 0 && state.date) ||
      (state.step === 1 && state.flight) ||
      (state.step === 2 && state.tickets)
    )
  }
  console.log('valid? ', checkStep() )

  return(
    <div>
      {state.step === 0 && <div>Calendário</div>}
      {state.step === 1 && <div>Voo</div>}
      {state.step === 2 && <div>Quantidade</div>}

      {state.step > 0 && <button onClick={() => setState(s => ({...s, step: state.step - 1}))}>Voltar</button>}
      <button disabled={!checkStep()} onClick={state.step < 2? () => setState(s => ({...s, step: state.step + 1})) : onConfirm }>Avançar</button>
    </div>
  )
}

export default ScheduleTicket
