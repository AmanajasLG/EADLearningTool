import { reducerBuilder } from '../_helpers/reducerBuilder'
import { apiConstants } from '../_constants'

var temp = { }
Object.keys(apiConstants).map(apiType => {
  temp[apiType.toLowerCase()] = reducerBuilder(apiConstants[apiType])
})

const apiReducers = {...temp}
export default apiReducers
