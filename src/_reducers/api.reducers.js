import { reducerBuilder } from '../_helpers/reducerBuilder'
import { apiConstants } from '../_constants'

const apiReducers = {
  characters: reducerBuilder(apiConstants.character),
  questions: reducerBuilder(apiConstants.question)
}

export default apiReducers
