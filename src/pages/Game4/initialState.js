const initialState = (runTimer = true) => {
  return {
    scene: 'INIT',
    selected: null,
    runTimer: runTimer,
    remainingTime: 0,
    timeUp: false,
    cook: false,
    orderedLetters: [],
    result: '',
    shuffled: []
  }
}

export default initialState
