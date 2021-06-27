const stub = {
  id:'0',
  name: 'Missão do jogo 8 yay',
  nameTranslate: 'Titulo só que em inglês',
  description: 'O jogo 8 é de comprar passagem. Partiu.',
  descriptionTranslate: 'Descrição em inglês',
  missionData:{
    message: 'Olá! gostaria de uma viagem para 4 pessoas, no verão do ano que vem para um lugar bem quente e com praia. Quero viajar de manhã.',
    places:[
      {
        name: 'Rio de Janeiro',
        img: 'https://res.cloudinary.com/learning-tool/image/upload/v1622937768/Leite_De_Vaca_c1fb94405c.svg'
      },
      {
        name: 'Brasília',
        img: 'https://res.cloudinary.com/learning-tool/image/upload/v1622937768/Leite_De_Vaca_c1fb94405c.svg'
      },
      {
        name: 'Gramado',
        img: 'https://res.cloudinary.com/learning-tool/image/upload/v1622937768/Leite_De_Vaca_c1fb94405c.svg'
      },
      {
        name: 'São Paulo',
        img: 'https://res.cloudinary.com/learning-tool/image/upload/v1622937768/Leite_De_Vaca_c1fb94405c.svg'
      },
    ],
    flights:[
      {
        takeOff: '09:00',
        land:'12:00'
      },
      {
        takeOff: '15:00',
        land:'19:00'
      },
      {
        takeOff: '18:00',
        land:'21:00'
      },
      {
        takeOff: '20:00',
        land:'23:00'
      },
      {
        takeOff: '02:00',
        land:'05:00'
      },
    ],
    buildings:[
      {
        type: 'Hotel',
        name: 'Hotel 1',
        data:{
          coffee: true
        }
      },
      {
        type: 'Hotel',
        name: 'Hotel 2',
        data:{
          coffee: true
        }
      },
      {
        type: 'Hotel',
        name: 'Hotel 3',
        data:{
          coffee: true
        }
      },
      {
        type: 'Farmacia',
        name: 'Farmacia 1',
        data:{
          coffee: true
        }
      },
      {
        type: 'Farmacia',
        name: 'Farmacia 2',
        data:{
          coffee: true
        }
      },
      {
        type: 'Hospital',
        name: 'Hospital 1',
        data:{
          coffee: true
        }
      },
    ]
  }
}

export default stub
