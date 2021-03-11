import { reducerBuilder } from '../_helpers/reducerBuilder'
import { apiConstants } from '../_constants'

const apiReducers = { }
Object.keys(apiConstants).forEach(apiType => {
  apiReducers[apiType.toLowerCase()] = reducerBuilder(apiConstants[apiType])
})


export default apiReducers
