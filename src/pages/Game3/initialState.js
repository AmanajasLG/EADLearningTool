const initialState = () => {
  return {
    scene: "INIT",
    cart: {},
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
    paymentAmount: null,
    runTimer: true,
    reaminingTime: 0,
    checkedPlayed: false,
  };
};

export default initialState;
