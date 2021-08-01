import React from "react";
import Calendar from "../Calendar";
import Flights from "../Flights";
import Counter from "../Counter";

const numberList = Array.from({ length: 9 }, (_, i) => i + 1);

const ScheduleTicket = ({
  step,
  day,
  month,
  flight,
  flights,
  tickets,
  onConfirm,
  dateSelected,
  monthChange,
  flightSelected,
  counterChange,
}) => {
  const [state, setState] = React.useState({
    step: step ? step : 0,
    goingDate: null,
    returnDate: null,
    flight: flight ? flight : null,
    tickets: tickets ? tickets : null,
    calendarIndex: 0
  });

  const steps = [
    "Escolha a data",
    "Escolha o voo de ida",
    "Escolha o voo de volta",
    "Quantidade de passagens",
  ];
  const checkStep = () => {
    return (
      (state.step === 0 && state.returnDate) ||
      (state.step === 1 && state.flight) ||
      (state.step === 2 && state.flight) ||
      state.step === 3
    );
  };

  const advance =
    state.step < 3
      ? () => setState((s) => ({ ...s, step: state.step + 1 }))
      : onConfirm;
  const onDateSelected = (num) => {
    setState((s) => ({ ...s, day: num }));
    if (dateSelected) dateSelected(num);
  };

  const onMonthChange = (value) => {
    setState((s) => ({ ...s, month: value }));
    if (monthChange) monthChange(value);
  };

  const onFlightSelected = (index) => {
    if (state.step === 1) setState((s) => ({ ...s, step: state.step + 1 }));

    setState((s) => ({ ...s, flight: index }));
    if (flightSelected) flightSelected(index);
  };

  const onCounterChange = (value) => {
    setState((s) => ({ ...s, tickets: value }));
    if (counterChange) counterChange(value);
  };

  const onCalendarChange = data => {
    let updateData = {}
    if(data.dates.length === 0){
      updateData.goingDate = null
      updateData.returnDate = null
      updateData.calendarIndex = 0
    }
    if(data.dates.length > 0)
    {
      updateData.goingDate = data.dates[0]
      if(state.calendarIndex === 0)
          updateData.calendarIndex = 1

      if(data.dates.length > 1){
        updateData.returnDate = data.dates[1]

      }
    }
    setState( s => ({...s, ...updateData}))
  }
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div>
        Agende o Voo! {steps.slice(0, state.step + 1).map((t) => ` > ${t}`)}
      </div>
      {state.step === 0 && (
        <React.Fragment>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
          <Calendar
            valueIndex={state.calendarIndex}
            month={month}
            onChange={onCalendarChange}
            onDaySelected={onDateSelected}
            onMonthChange={onMonthChange}
          />
          <Calendar
            valueIndex={state.calendarIndex}
            month={month + 1}
            onChange={onCalendarChange}
            onDaySelected={onDateSelected}
            onMonthChange={onMonthChange}
          />
          </div>
        </React.Fragment>
      )}
      {state.step === 1 && (
        <Flights
          selected={flight}
          flights={flights}
          onClick={onFlightSelected}
        />
      )}
      {state.step === 2 && (
        <Flights
          selected={flight}
          flights={flights}
          onClick={onFlightSelected}
        />
      )}
      {state.step === 3 && (
        <Counter value={tickets} list={numberList} onChange={onCounterChange} />
      )}

      {state.step > 0 && (
        <button
          onClick={() => setState((s) => ({ ...s, step: state.step - 1 }))}
        >
          Voltar
        </button>
      )}
      <button disabled={!checkStep()} onClick={advance}>
        Avançar
      </button>
    </div>
  );
};

export default ScheduleTicket;
