const initialValue = {
//METADATA
  back: false,
//GAME STATE
  scene: "INIT",
  endGame: false,
  currentLocationIndex: 0,
  locations:[],
  jobs:[],
  countries:[],
  contactsTemplate:[],
  contactsAtSession:[],
//DIALOG
  dialogHistory: [],
  answers: [],
  currentChar: null,
  characterFeeling: 'init',
  showContacts: false,
}


export default initialValue
