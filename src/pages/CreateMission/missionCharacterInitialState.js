// eslint-disable-next-line import/no-anonymous-default-export
const missionCharacterInitialState = (character) => ({
  character: character,
  answers: [],
  tip: '',
  endDialog: '',
  wrongAnswer: '',
  rightAnswer: '',
  wrongAcusationAnswer: '',
  rightAcusationAnswer: '',
  targetCharacter: false,
})
  
export default missionCharacterInitialState
  
