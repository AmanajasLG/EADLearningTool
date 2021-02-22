export default {
  name: 'Stub mission',
  description: 'Local stub mission for tests',
  locations: [
    {name: 'sala', backgroundAssets: []},
  ],
  characters: [
    {
      name: 'Joao', characterAssets: [],
      answers: [
        {
          answer: 'oi',
          question: {question: "oi?", correct: true}
        },
        {
          answer: 'turusim',
          question: {question: "turubem?", correct: false}
        },

        {
          answer: 'kiésim',
          question: {question: "cumékié?", correct: true}
        },

        {
          answer: 'ahtah',
          question: {question: "owxi?", correct: false}
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
