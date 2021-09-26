const initialState = () => ({
  countNow: true,
  seconds: 0,
  playSessionCreated: false,
  scene: "INIT",
  chooseCharacterScreen: true,
  choosenCharacter: null,
  showInvitation: false,
  proceedToDressingConfirmation: false,
  dressingContext: false,
  dressingTabIndex: 0,
  rightTags: [],
  invitation: {},
  wardrobe: {},
  characters: [],
  clothes: {
    Pés: [],
    Pernas: [],
    Tronco: [],
    Acessórios: [],
  },
  readyAlert: false,

  tutorialBlobsText: [
    {
      text: "Clique no personagem que você deseja vestir.",
      textTranslate: "Click on the character you wish to dress up.",
    },
    {
      text: "Clique em um item para vesti-lo.",
      textTranslate: "Click on any item to use it.",
    },
    {
      text: "Clique novamente no item para coloca-lo no armário.",
      textTranslate: "Click again to put it back in the closet.",
    },
    {
      text: "Clique no convite para perguntar detalhes do evento.",
      textTranslate: "Click on the envelope to ask questions about the event.",
    },
    {
      text: 'Clique em "Estou pronto" para ir para o evento!',
      textTranslate: 'Click on "Estou pronto" to go to the event!',
    },
  ],

  // INVITE
  inviteQuestions: [],
  showInviteAnswer: false,
  showInviteQuestions: false,
  inviteAnswer: "",
  inviteQuestionsMade: [],

  // NOTIFICATIONS
  showBlob: true,
  blobToShow: 0,
  chooseCharacterScreenNotification: true,
  showClothingSpaceTakenErrorNotification: false,
});

export default initialState;
