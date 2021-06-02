import { musicConstants } from '../_constants'

const set = (music) => { return { type: musicConstants.SET, url: music } }
const volume = v => ({type: musicConstants.VOLUME, volume: v})

export const musicActions =
{
  set,
  volume
}
