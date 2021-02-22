export default {
  name: 'Stub mission',
  description: 'Local stub mission for tests',
  locations: [
    {name: 'sala', backgroundAssets: []},
    {name: 'cozinha', backgroundAssets: []},
    {name: 'biblioteca', backgroundAssets: []},
    {name: 'escritório', backgroundAssets: []}],
  characters: [
    {
      name: 'Joao', characterAssets: [],
      answers: [
        {
          answer: 'oi',
          question: {question: "oi?"}
        },
        {
          answer: 'turusim',
          question: {question: "turubem?"}
        },

        {
          answer: 'kiésim',
          question: {question: "cumékié?"}
        }
      ]
    },
    {name: 'Pedro', characterAssets: [], answers: [{question: {question: "oi?"}}]},
    {name: 'Marta', characterAssets: [], answers: [{question: {question: "oi?"}}]},
    {name: 'Suzane', characterAssets: [], answers: [{question: {question: "oi?"}}]},
    {name: 'Maria', characterAssets: [], answers: [{question: {question: "oi?"}}]},
    {name: 'Pablo', characterAssets: [], answers: [{question: {question: "oi?"}}]},
  ]
}
