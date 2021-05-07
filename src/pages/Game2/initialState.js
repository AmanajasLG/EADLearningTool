// eslint-disable-next-line import/no-anonymous-default-export
const initialState = (hasPlayed = false) => ({
//GAME STATE
  scene: "INIT",
  currentRoom: 0,
  isOnDialog: false,
  endGame: false,
  found: false,
  locations:[],
  tips: ['O engenheiro sabe'],
  acusation: false,
  closeAcusation: false,
  tries: 0,
  validQuestions: [],
  tutorialStep: 0,
  seeTutorial: true,
  hasPlayed: hasPlayed,
  checkedPlayed: hasPlayed,
  tipsCount: 0,
//DIALOG
  dialogHistory: [],
  dialogStep: 0,
  characterFeeling: 'init',
  totalDialogSteps: 2,
  questionsByStep: 2,
  currentChar: null,
  showConvo: false,
  questions: [],
  targetName: 'Leila',
  correct: 0,
  ncorrect: 0,
  correctMinimum: 2,
  gameEndState: null,
  score: 0,
  startedTimestamp: new Date(Date.now()),
  elapsedTime: null,
  back: false,
  spokenCharacters: [],
})

export default initialState
