import { musicConstants } from '../_constants'

const set = music => ({type: musicConstants.SET, url: music })
const volume = v => ({type: musicConstants.VOLUME, volume: v})
const play = () => ({type: musicConstants.PLAY})
const pause = () => ({type: musicConstants.PAUSE})
export const musicActions =
{
  set,
  volume,
  play,
  pause
}
