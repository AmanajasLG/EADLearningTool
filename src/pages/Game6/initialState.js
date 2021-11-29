const initialState = () => ({
  countNow: true,
  seconds: 0,
  playSessionCreated: false,
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
  wardrobeTab: 0,
  phoneWardrobe: {},
  characters: [],
  clothes: {
    Pés: [],
    Pernas: [],
    Tronco: [],
    Acessórios: [],
  },
  phoneClothes: [],
  readyAlert: false,
  timeout: null,

  tutotialMessages: [
    {
      text: "Clique no personagem que você deseja vestir.",
      textTranslate: "Click on the character you wish to dress up.",
      position: "center-center",
    },
    {
      text: "Clique em um item para vesti-lo.",
      textTranslate: "Click on any item to use it.",
      position: "center-left",
    },
    {
      text: "Clique novamente no item para coloca-lo no armário.",
      textTranslate: "Click again to put it back in the closet.",
      position: "center-right",
    },
    {
      text: "Clique no celular para perguntar detalhes do evento.",
      textTranslate: "Click on the cellphone to ask questions about the event.",
      position: "center-center",
    },
    {
      text: 'Clique em "Estou pronto" para ir para o evento!',
      textTranslate: 'Click on "Estou pronto" to go to the event!',
      position: "center-center",
    },
  ],

  tutorialPhoneBlobsText: [
    {
      text:
        "Chegou o momento de contar para Ariel o look escolhido! Selecione no celular a primeira peça de roupa que você gostaria de descrever.",
      textTranslate:
        "It's time to tell Ariel about the chosen outfit! Select on the phone the first piece of cloting you would like to describe.",
    },
    {
      text: "Agora clique na cor da peça selecionada.",
      textTranslate: "Now click onthe color of the selected piece.",
    },
    {
      text:
        "Clique no ícone de lixeira caso queria remover algua peça descrita para Ariel na conversa.",
      textTranslate:
        "Click on the trash icon if you want to remove any pieces of clothing described to ariel in the conversation.",
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
  endIntroDialog: false,
  showTutorialBlob: true,
  tutorialBlobCount: 0,
  chooseCharacterScreenNotification: true,
  showClothingSpaceTakenErrorNotification: false,
});

export default initialState;
