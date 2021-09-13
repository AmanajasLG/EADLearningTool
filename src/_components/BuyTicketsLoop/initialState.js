const initialState = () => ({
  window: "EMAIL",
  place: null,
  schedule: [],
  tickets: 0,
  confirmWindow: false,
  type: "going",
  dates: null,
  flights: { going: null, return: null },
});
export default initialState;
