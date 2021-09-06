const stub = {
  timer: 100,
  buildings: [
    {
      name: 'Condominio 1',
      type: 'casa',
      rooms: 1,
      toilets: 1,
      near: [
        'mercado',
        'farmacia'
      ]
    },
    {
      name: 'Condominio 2',
      type: 'casa',
      rooms: 2,
      toilets: 1,
      near: [
        'escola',
        'mercado',
      ]
    },
    {
      name: 'Condominio 3',
      type: 'casa',
      rooms: 3,
      toilets: 1,
      near: [
        'escola',
        'farmacia'
      ]
    },
    {
      name: 'Condominio 4',
      type: 'casa',
      rooms: 2,
      toilets: 1,
      near: [
        'farmacia'
      ]
    },
    {
      name: 'Condominio 5',
      type: 'casa',
      rooms: 1,
      toilets: 1,
      near: [
        'escola',
      ]
    },
    {
      name: 'Farmacia',
      type: 'farmacia',
      rooms: 1,
      toilets: 1,
      near: [
        'escola',
      ]
    },
    {
      name: 'Escola',
      type: 'escola',
      rooms: 1,
      toilets: 1,
      near: [
        'escola',
      ]
    },
    {
      name: 'Mercado',
      type: 'mercado',
      rooms: 1,
      toilets: 1,
      near: [
        'escola',
      ]
    },
    {
      name: 'Sapinho feliz',
      type: 'escola',
      rooms: 1,
      toilets: 1,
      near: [
        'escola',
      ]
    },
  ],
  requests: [
    {
      rooms: 1,
      toilets: 1,
      near:[
        'farmacia'
      ],
      close:[
        'escola'
      ]
    },
    {
      rooms: 2,
      toilets: 1,
      near:[
        'farmacia'
      ],
      close:[
        'escola'
      ]
    },
    {
      rooms: 2,
      toilets: 1,
      near:[
        'escola'
      ],
      close:[
        'farmacia'
      ]
    },
    {
      rooms: 3,
      toilets: 1,
      near:[
        'mercado'
      ],
      close:[
        'farmacia'
      ]
    },
  ]
}

export default stub
