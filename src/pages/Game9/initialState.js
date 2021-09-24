const initialState = (availableRequests) => ({
  missionData: null,
  scene: 'TUTORIAL',
  completed: 0,
  runTimer: false,
  takenRequests: [],
  availableRequests: [...availableRequests],
  results: {},
  buildingDetailsIndex: null,
  tutorialStep: 0
})
export default initialState
