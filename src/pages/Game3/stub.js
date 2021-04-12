const stub = {
  name: 'Vamos as compras!',
  description: 'Bora comprar as comidas ae',
  ingredients: [
    {name: 'maçã'},
    {name: 'uva'},
    {name: 'pera'},
    {name: 'carne'},
    {name: 'alho'}
  ],
  moneyTypes:[
    {
      url: '',
      value: 25
    },
    {
      url: '',
      value: 0.5
    },
    {
      url: '',
      value: 1
    },
    {
      url: '',
      value: 2
    },
    {
      url: '',
      value: 5
    },
    {
      url: '',
      value: 10
    },
    {
      url: '',
      value: 20
    },
    {
      url: '',
      value: 50
    },
    {
      url: '',
      value: 100
    },
  ],
  corridors:[
    {
      name: 'Frutas',
      shelveProducts:[
        {name: 'maçã'},
        {name: 'uva'},
        {name: 'pera'},
        {name: 'banana'},
        {name: 'melancia'}
      ]
    },
    {
      name: 'frios',
      shelveProducts:[
        {name: 'carne'},
        {name: 'queijo'},
        {name: 'presunto'},
        {name: 'iogurte'},
        {name: 'frango'}
      ]
    },
    {
      name: 'verduras e legumes',
      shelveProducts:[
        {name: 'batata'},
        {name: 'rabanete'},
        {name: 'beterraba'},
        {name: 'espinafre'},
        {name: 'alface'}
      ]
    },
    {
      name: 'temperos',
      shelveProducts:[
        {name: 'pimenta do reino'},
        {name: 'sal'},
        {name: 'alho'},
        {name: 'cebolinha'}
      ]
    }
  ]
}

export default stub
