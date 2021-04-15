const initialState = () => {
  return {
    scene: 'INIT',
    cart: [],
    currentAisle: 0,
    checkout: false,
    onPayment: false,
    payment: [],
    win: false,
    change: null,
    paymentAmount: null,
    runTimer: true,
    reaminingTime: 0
  }
}

export default initialState
