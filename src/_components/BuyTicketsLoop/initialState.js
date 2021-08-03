const initialState = () => ({
  window: "EMAIL",
  place: null,
  schedule:[],
  tickets: 0,
  confirmWindow: false,
  flightType: "going",
  flight: { going: -1, return: -1 },
});
export default initialState;
