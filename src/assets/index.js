function importAll(r) {
  let images = {};
  r.keys().map( item => {
    let almost = item.substring( item.indexOf("-")+1 ).replace('./', '')
    images[almost.substring(0, almost.indexOf('.'))] = r(item)
    return null
  })
  return images;
}

const assets = {
  characters: importAll(require.context('./characters', false, /\.(png|jpe?g|svg)$/)),
  backgrounds: importAll(require.context('./backgrounds', false, /\.(png|jpe?g|svg)$/)),
  icons: importAll(require.context('./icons', false, /\.(png|jpe?g|svg)$/)),
  misc: importAll(require.context('./misc', false, /\.(png|jpe?g|svg)$/))
}

export default assets
