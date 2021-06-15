const initialState = () => ({
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
    Tronco: [],
    Pernas: [],
    Pés: [],
    Acessórios: [],
  },
  readyAlert: false,

  tutorialBlobsText: [
    {
      text: "Clique no personagem que você deseja vestir.",
      textTranslate: "Click on the character you wish to dress up.",
    },
  ],

  // INVITE
  inviteQuestions: [],
  showInviteAnswer: false,
  showInviteQuestions: false,
  inviteAnswer: "",

  // NOTIFICATIONS
  showBlob: true,
  blobToShow: 0,
  chooseCharacterScreenNotification: true,
  showClothingSpaceTakenErrorNotification: false,
});

export default initialState;
