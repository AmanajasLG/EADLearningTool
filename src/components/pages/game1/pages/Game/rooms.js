import listaPersonagens from './listaPersonagens.js'

const rooms = [
  {
    nome: "Saguão principal",
    colorPalette: "palette01",
    personagens: [
      listaPersonagens[0],
      listaPersonagens[1],
      listaPersonagens[2]
    ]
  },
  {
    nome: "Corredor",
    colorPalette: "palette02",
    personagens: [
      listaPersonagens[3],
      listaPersonagens[4],
      listaPersonagens[5]
    ]
  },
  {
    nome: "Cantina",
    colorPalette: "palette03",
    personagens: [
      listaPersonagens[6],
      listaPersonagens[7],
      listaPersonagens[8]
    ]
  },
  {
    nome: "Livraria",
    colorPalette: "palette04",
    personagens: [
      listaPersonagens[9],
      listaPersonagens[10],
      listaPersonagens[11]
    ]
  },
  {
    nome: "Estacionamento",
    colorPalette: "palette05",
    personagens: [
      listaPersonagens[12],
      listaPersonagens[13],
      listaPersonagens[14]
    ]
  }
]

export default rooms
