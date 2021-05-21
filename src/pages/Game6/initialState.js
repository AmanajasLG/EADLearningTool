const initialState = () => ({
  scene: 'INIT',
  back: false,
  clothesTypes: ["HEAD", "TOP", "BOTTOM", "SHOES"],
  dressingTabIndex: 0,
  chooseCharacterScreen: true,
  choosenCharacter: null,
  cellPhoneStart: false,
  showCellphone: false,
  dressingContext: false,
  clothes: [null, null, null, null],
  dialog: [],
  namingClothesContext: false,
  selectedClothesName: null,
  selectedColor: null

})

export default initialState
