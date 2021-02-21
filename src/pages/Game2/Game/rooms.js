import listaPersonagens from './listaPersonagens.js'

const rooms = [
  {
    nome: "Bar",
    className: "bar",
    personagens: [
      listaPersonagens[0],
      listaPersonagens[1],
      listaPersonagens[2]
    ]
  },
  {
    nome: "Sala de Aula",
    className: "sala-aula",
    personagens: [
      listaPersonagens[3],
      listaPersonagens[4],
      listaPersonagens[5]
    ]
  },
  {
    nome: "Biblioteca",
    className: "biblioteca",
    personagens: [
      listaPersonagens[6],
      listaPersonagens[7],
      listaPersonagens[8]
    ]
  },
  {
    nome: "Sala de Geografia",
    className: "mapa",
    personagens: [
      listaPersonagens[9],
      listaPersonagens[10],
      listaPersonagens[11]
    ]
  },
  {
    nome: "Sala de Estudos",
    className: "sala-estudos",
    personagens: [
      listaPersonagens[12],
      listaPersonagens[13],
      listaPersonagens[14]
    ]
  }
]

export default rooms
