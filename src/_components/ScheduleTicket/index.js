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

  const [calendarMonth, setMonth] = React.useState(0)
  const [datesValue, setDates] = React.useState([null, null])

  const steps = [
    "Escolha a data",
    "Escolha o voo de ida",
    "Escolha o voo de volta",
    "Quantidade de passagens",
  ];
  const checkStep = () => {
    return (
      (state.step === 0 && datesValue[0] && datesValue[1]) ||
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

  const onCalendarChange = index => data => {
    if(index === 0){
      setMonth(data.month)
      dateSelected(data);
    }
    if(index === 1){
      let m = data.month - 1
      setMonth( m === -1? 11 : m )
    }
    setDates([...data.dates])
  };

  return (
    <React.Fragment>
      <div>
        Agende o Voo! {steps.slice(0, state.step + 1).map((t) => ` > ${t}`)}
      </div>
      {state.step === 0 && (
        <div style={{display: 'flex'}}>
          <Calendar
            noRight
            month={calendarMonth}
            dates={datesValue}
            onChange={onCalendarChange(0)}
          />
          <Calendar
            noLeft
            month={(calendarMonth + 1) % 12}
            dates={datesValue}
            onChange={onCalendarChange(1)}
          />
        </div>
      )}
      {state.step === 1 && (
        <Flights
          selected={state.flights[type]}
          flights={flights[type]}
          onClick={onFlightSelected}
        />
      )}
      {state.step === 2 && (
        <div style={{fontWeight: 'bold', color: '#59316D', marginTop: '10%'}}>
          <p style={{fontSize: '2em', textAlign: 'center', marginBottom: '2.5%'}}>Quantas passagens?</p>
          <div style={{width: '100%', paddingLeft: '40%', paddingRight: '40%'}}>
            <Counter stretch value={tickets} list={numberList} onChange={onCounterChange} arrowColor='#59316D'
              valueStyle={{width: '80%', backgroundColor: '#d6e3f4', fontSize: '5em', fontFamily: 'Barlow',
                aspectRatio: '1', borderRadius: '30%', paddingLeft: '20%', paddingRight: '20%'}}
            />
          </div>
        </div>
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
