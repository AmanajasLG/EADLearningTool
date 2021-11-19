const initialState = (data) => ({
  scene: 'PLATE_TUTORIAL',
  clothes: {
    Pés: [],
    Pernas: [],
    Tronco: [],
    Acessórios: []
  },
  wardrobe: data? {...data.wardrobe} : {}
})
export default initialState
