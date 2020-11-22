import { reducerBuilder } from '../_helpers/reducerBuilder'
import { apiConstants } from '../_constants'

const apiReducers = {
  characters: reducerBuilder(apiConstants.CHARACTER),
  missions: reducerBuilder(apiConstants.MISSION)
}

export default apiReducers
