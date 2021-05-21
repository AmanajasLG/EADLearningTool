const initialValue = () => ({
  //METADATA
  back: false,
  //GAME STATE
  scene: "INIT",
  endGame: false,
  currentLocationIndex: 0,
  locations: [],
  jobs: [],
  countries: [],
  names: [],
  contactsTemplate: [],
  contactsAtSession: [],
  dialogs: {},
  questionsAsked: 0,
  result: 0,
  totalFields: 0,
  mainError: [],
  feedback: {},
  //DIALOG
  dialogHistory: [],
  answers: [],
  preSpeech: [],
  currentChar: null,
  characterFeeling: "init",
  showContacts: false,
  maxQuestions: 4,
  // onMinimize: null,
  shouldMinimize: false,
  shouldCloseDialog: false,
  wrongContacts: 0,
  tracking: true
});

export default initialValue;
