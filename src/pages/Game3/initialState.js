const initialState = (checkedPlayed) => {
  return {
    scene: "INIT",
    cart: [],
    tutorialRoom: {},
    recipe: {},
    ingredientsList: [],
    aisles: [],
    currentAisle: 0,
    checkout: false,
    onPayment: false,
    payment: [],
    win: false,
    change: null,
    runTimer: true,
    reaminingTime: 0,
    checkedPlayed: checkedPlayed,
    moneySelection: false,
  };
};

export default initialState;
