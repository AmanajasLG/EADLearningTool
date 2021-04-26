const initialState = (runTimer = true) => {
  return {
    scene: 'INIT',
    runTimer: runTimer,
    remainingTime: 0,
    timeUp: false,
    showRecipe: false,

    selectItem: true,
    selected: null,

    cookPhase: true,
    shuffled: [],
    orderedLetters: [],
    result: '',
    prepared: [],

    servePhase: false,
    shuffledDishes: [],
    shuffledDishesNames: [],
    dishImageSelected: '',
    dishNameSelected: '',
    pairCheck: false,
    tableDish: [],
    allDishes: false
  }
}

export default initialState
