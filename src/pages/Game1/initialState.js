const initialValue = () => ({
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
    preSpeech: [],
    currentChar: null,
    characterFeeling: 'init',
    showContacts: false,
    maxQuestions: 4,
    // onMinimize: null,
    shouldMinimize: false,
    shouldCloseDialog: false,
    wrongContacts: 0,
})

export default initialValue
