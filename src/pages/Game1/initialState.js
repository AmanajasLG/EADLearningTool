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
  currentChar: null,
  showContacts: false,
}


export default initialValue
