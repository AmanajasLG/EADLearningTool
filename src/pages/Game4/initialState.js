const initialState = (checkedPlayed = false) => {
  return {
    playSessionCreated: false,
    scene: "INIT",
    runTimer: true,
    initTime: 0,
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
    tableIngredients: [],
    sortNameIngredient: null,

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
    wrongTablewareSelected: [],

    // NOTIFICATIONS
    tutorialIngredientSelectionNotification: false,
    tutorialIngredientNameSelectionNotification: false,
    wrongIngredientNotification: false,
    wrongIngredientNameNotification: false,
    // wrongTablewareNotification: false,
    wrongCombinationNotification: false,

    // FEEDBACK
    feedbackMessages: [],

    // TUTORIAL
    blobToShow: 0,
    showBlob: true,
  };
};

export default initialState;
