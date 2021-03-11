// eslint-disable-next-line import/no-anonymous-default-export
export default {
//GAME STATE
  scene: "INIT",
  currentRoom: 0,
  isOnDialog: false,
  endGame: false,
  found: false,
  locations:[],
  tips: [],
  acusation: false,
  tries: 0,
  validQuestions: [],
  volume: 15,
  fontSize: 12,
  assistMode: false,
  accessibility: 'NONE',
  tutorialStep: 0,
  tryAgain: false,
//DIALOG
  dialogHistory: [],
  dialogStep: 0,
  faceState: 'init',
  totalDialogSteps: 2,
  questionsByStep: 2,
  currentChar: null,
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
}
