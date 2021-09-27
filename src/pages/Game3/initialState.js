const initialState = (checkedPlayed) => {
  return {
    cashierValue: "0.00",
    playSessionCreated: false,
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
    remainingTime: 0,
    initTime: 0,
    checkedPlayed: checkedPlayed,
    moneySelection: false,
  };
};

export default initialState;
