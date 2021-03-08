import { musicConstants } from '../_constants'

const set = (music) => { return { type: musicConstants.SET, url: music } }

export const musicActions = 
{
  set
}
