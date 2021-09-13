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
  tracking: true,

  // TUTORIAL
  showTutorialBlob: false,
  tutorialBlobCount: 0,
  tutotialMessages: [
    {
      text: "Clique no celular para checar os contatos e suas informações.",
      textTranslate:
        "Click on the cellphone to check the contacts and their info.",
    },
    {
      text: "Preencha as informações que estão faltando.",
      textTranslate: "Fill in the mission info.",
    },
    {
      text:
        'Para retornar à sala, clique no X. Apenas clique em "Terminei!" quando estiver certo de todas as suas respostas.',
      textTranslate:
        'To go back to the room, click on the X. Only click on "Terminei!" when you\'re sure of all of your answers.',
    },
    {
      text: "Clique em qualquer pessoa na sala para conversar.",
      textTranslate: "Click on any person in the room to talk.",
    },
    {
      text: "Use as opções da caixa azul para interagir com as pessoas.",
      textTranslate:
        "Use the options from the blue box to interact with people.",
    },
    {
      text:
        "Mas lembre-se: Você tem um número limitado de perguntas que pode fazer por sala!",
      textTranslate:
        "But remenber: You have a limited number of questions you can make in each room!",
    },
  ],
});

export default initialValue;
