const initialState = () => ({
  scene: "INIT",
  back: false,
  colorTags: [],
  cellPhoneStart: false,
  showCellphone: false,
  dialog: [],
  namingClothesContext: false,
  selectedClothesName: null,
  selectedColor: null,
  chooseCharacterScreen: true,
  choosenCharacter: null,
  showInvitation: false,
  proceedToDressingConfirmation: false,
  dressingContext: false,
  dressingTabIndex: 0,
  stopConversation: false,
  shouldMinimize: false,
  rightTags: [],
  invitation: {},
  wardrobe: {},
  phoneWardrobe: {},
  characters: [],
  clothes: {
    Tronco: [],
    Pernas: [],
    Pés: [],
    Acessórios: [],
  },
  phoneClothes: [],
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
      text: "Clique no celular para perguntar detalhes do evento.",
      textTranslate: "Click on the cellphone to ask questions about the event.",
    },
    {
      text: 'Clique em "Estou pronto" para ir para o evento!',
      textTranslate: 'Click on "Estou pronto" to go to the event!',
    },
  ],

  // DIALOGS
  introDialog: [],
  introDialogShow: [],
  dessDialogShow: [],
  sendDialogShow: [],
  sendDialogConfirmShow: [],
  removeItemPhone: false,

  // INVITE
  inviteQuestions: [],
  showInviteAnswer: false,
  showInviteQuestions: false,
  inviteAnswer: "",

  // SEND CLOTHES
  showPhoneClothes: true,

  // NOTIFICATIONS
  showBlob: true,
  blobToShow: 0,
  chooseCharacterScreenNotification: true,
  showClothingSpaceTakenErrorNotification: false,
});

export default initialState;
