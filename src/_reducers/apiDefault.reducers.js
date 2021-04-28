import { reducerBuilder } from '../_helpers/reducerBuilder'
import { apiConstants } from '../_constants'

const apiDefaultReducers = { }
Object.keys(apiConstants).forEach(apiType => {
  apiDefaultReducers[apiType.toLowerCase()] = reducerBuilder(apiConstants[apiType])
})


export default apiDefaultReducers
