import { apiConstantBuilder } from '../_helpers/apiConstantBuilder'

const apiValues = ['CHARACTER']
let apiConstants = {}

apiValues.map( value => apiConstants[value.toLowerCase()] = apiConstantBuilder('CHARACTER') )

export { apiConstants }
