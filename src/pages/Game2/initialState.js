// eslint-disable-next-line import/no-anonymous-default-export
const initialState = (hasPlayed = false) => ({
  //GAME STATE
  scene: "INIT",
  currentRoom: 0,
  isOnDialog: false,
  endGame: false,
  found: false,
  locations: [],
  tips: ["O engenheiro sabe"],
  acusation: false,
  closeAcusation: false,
  tries: 0,
  validQuestions: [],
  tutorialStep: 0,
  seeTutorial: true,
  checkedPlayed: hasPlayed,
  tipsCount: 0,
  //DIALOG
  dialogHistory: [],
  dialogStep: 0,
  characterFeeling: "init",
  totalDialogSteps: 2,
  questionsByStep: 2,
  currentChar: null,
  showConvo: false,
  questions: [],
  targetName: "Leila",
  correct: 0,
  ncorrect: 0,
  correctMinimum: 2,
  gameEndState: null,
  score: 0,
  startedTimestamp: new Date(Date.now()),
  elapsedTime: null,
  back: false,
  spokenCharacters: [],

  // TUTORIAL
  showTutorialBlob: false,
  tutorialBlobCount: 0,
  tutorialShowButton: false,
  tutotialMessages: [
    {
      text: "Clique na pessoa com que deseja falar.",
      textTranslate: "Click on the person to whom you want to talk.",
      position: "top-left",
    },
    {
      text: "Use as opções da caixa azul para interagir com as pessoas.",
      textTranslate:
        "Use the options from the blue box to interact with people.",
      position: "top-center",
    },
    {
      text:
        "<strong>Lembre-se:</strong> As pessoas estão ocupadas em seus ambientes de trabalho, então tenha certeza de não gastar o tempo delas com perguntas fora de contexto!",
      textTranslate:
        "<strong>Remember:</strong> People are busy in their workplaces, so be sure not to waste their times with question that are out of yout context!",
      position: "center-center",
    },
    {
      text: "Quando encontrar a pessoa certa, clique na lâmpada.",
      textTranslate: "When you find the right person, click on the lamp.",
      position: "center-center",
    },
    {
      text: "Para sair do diálogo, clique no X.",
      textTranslate: "To exit the dialog, click on the X.",
      position: "top-center",
    },
    {
      text: "Para acessar as dicas que já conseguiu, clique no bloco de notas.",
      textTranslate:
        "To access the tips you've already got, click on the notepad.",
      position: "center-center",
    },
    {
      text: "Para sair das dicas, clique no X.",
      textTranslate: "To exit the tips, click on the X.",
      position: "center-right",
    },
    {
      text: "Finalmente, para navegar pelas salas, use os botões com números.",
      textTranslate: "Finally, to change rooms, use the buttons with numbers.",
      position: "center-center",
    },
  ],
});

export default initialState;
