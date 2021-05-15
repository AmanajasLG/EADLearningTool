const initialState = () => ({
  clothesTypes: ["HEAD", "TOP", "BOTTOM", "SHOES"],
  scene: 'INIT',
  chooseCharacterScreen: true,
  choosenCharacter: null,
  showInvitation: false,
  proceedToDressingConfirmation: false,
  dressingContext: false,
  dressingTabIndex: 0,
  clothes: [null, null, null, null],
  readyAlert: false
})

export default initialState
