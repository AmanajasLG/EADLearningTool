const initialState = (availableRequests) => ({
  missionData: null,
  scene: 'TUTORIAL',
  completed: 0,
  wrong: 0,
  runTimer: false,
  takenRequests: [],
  availableRequests: [...availableRequests],
  results: {},
  buildingDetailsIndex: null,
  tutorialStep: 0,
  animateCharacter: true,
})
export default initialState
