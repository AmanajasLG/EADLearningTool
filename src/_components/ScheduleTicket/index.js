import React from "react";
import Calendar from "../Calendar";
import Flights from "../Flights";
import Counter from "../Counter";
import { Iniciar } from "../Button";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "./index.scss";

const numberList = Array.from({ length: 9 }, (_, i) => i + 1);

const ScheduleTicket = ({
  date,
  dates,
  step,
  type,
  typeUpdate,
  flightsSelected,
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
    dates: dates ? [Date.parse(dates[0]), Date.parse(dates[1])] : [],
    flights: { ...flightsSelected },
    calendarIndex: 0,
    month: 0,
  });

  const steps = [
    "Escolha a data",
    "Escolha o voo de ida",
    "Escolha o voo de volta",
    "Quantidade de passagens",
  ];
  const checkStep = () => {
    return (
      (state.step === 0 && state.dates.length === 2) ||
      (state.step === 1 && state.flights) ||
      state.step === 2
    );
  };

  const advance = () => {
    if (state.step === 1 && type === "going") typeUpdate();
    else if (state.step < 2) {
      setState((s) => ({ ...s, step: state.step + 1 }));
    } else onConfirm();
  };

  const onFlightSelected = (flight) => {
    setState((s) => ({
      ...s,
      flights: { ...s.flights, [type]: flight },
    }));

    flightSelected(flight);
  };

  const onCounterChange = (value) => {
    setState((s) => ({ ...s, tickets: value }));
    if (counterChange) counterChange(value);
  };

  const onCalendarChange = (dates) => {
    setState((s) => ({
      ...s,
      dates: [...dates],
    }));

    dateSelected(dates);
  };

  return (
    <React.Fragment>
      <div>
        Agende o Voo! {steps.slice(0, state.step + 1).map((t) => ` > ${t}`)}
      </div>
      {state.step === 0 && (
        <DateRangePicker
          onChange={onCalendarChange}
          value={
            state.dates.length ? state.dates : [new Date(date), new Date(date)]
          }
          isOpen={true}
          format={"dd/M/yyyy"}
          className="teste"
          calendarClassName="teste-1"
          rangeDivider=" até "
        />
      )}
      {state.step === 1 && (
        <Flights
          selected={state.flights[type]}
          flights={flights[type]}
          onClick={onFlightSelected}
        />
      )}
      {state.step === 2 && (
        <Counter value={tickets} list={numberList} onChange={onCounterChange} />
      )}

      {state.step > 0 && (
        <button
          onClick={() => {
            if (state.step === 1 && type === "return") typeUpdate();
            else setState((s) => ({ ...s, step: state.step - 1 }));
          }}
        >
          Voltar
        </button>
      )}
      <Iniciar
        style={{ position: "absolute", right: "5%", bottom: "-2.5%" }}
        disabled={!checkStep()}
        onClick={advance}
        label="Confirmar"
      />
    </React.Fragment>
  );
};

export default ScheduleTicket;
