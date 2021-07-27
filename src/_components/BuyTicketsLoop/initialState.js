const initialState = () => ({
  window: "EMAIL",
  place: null,
  dayInit: null,
  dayEnd: null,
  month: 0,
  tickets: 0,
  confirmWindow: false,
  flightType: "going",
  flight: { going: -1, return: -1 },
});
export default initialState;
