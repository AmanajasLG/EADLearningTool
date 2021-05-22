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
    wrongIngredientNotification: false,
    wrongIngredientNameNotification: false,

    shuffledName: [],
    userLetterOrder: [],
    result: "",
    prepared: [],

    tablewareImagePick: true,
    shuffledTablewares: [],
    shuffledTablewaresNames: [],
    tablewareImageSelected: null,
    tableTablewares: [],
  };
};

export default initialState;
