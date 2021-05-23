const initialState = (checkedPlayed = false) => {
  return {
    scene: "INIT",
    runTimer: false,
    remainingTime: 0,
    timeUp: false,
    showRecipe: false,
    ingredientsList: [],
    recipe: {},
    shuffledIngredients: [],
    tablewares: [],
    recipeContinue: false,
    checkedPlayed: checkedPlayed,

    showIngredients: true,
    selectedIngredient: null,
    tableIngredient: null,

    shuffledName: [],
    userLetterOrder: [],

    tablewareImagePick: true,
    shuffledTablewares: [],
    shuffledTablewaresNames: [],
    tablewareImageSelected: null,
    tableTablewares: [],

    // USER ERRORS
    wrongIngredientSelected: [],
    wrongIngredientNameOrder: [],
    wrongTablewarePairSelected: [],
    // wrongTablewareSelected: [],

    // NOTIFICATIONS
    tutorialIngredientSelectionNotification: false,
    tutorialIngredientNameSelectionNotification: false,
    wrongIngredientNotification: false,
    wrongIngredientNameNotification: false,
    // wrongTablewareNotification: false,
    wrongCombinationNotification: false,
  };
};

export default initialState;
