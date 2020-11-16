import { apiConstantBuilder } from '../_helpers/apiConstantBuilder'
import apiValues from '../apiValues'

let apiConstants = {}

apiValues.map( value => apiConstants[value.toLowerCase()] = apiConstantBuilder(value) )

export { apiConstants }
