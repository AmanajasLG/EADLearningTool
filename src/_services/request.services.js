import { authHeader } from '../_helpers'
import axios from 'axios'

const database = (path) =>  `https://learning-tool-backend.herokuapp.com/${path}`

const request = (method, path, handleData, handleError, payload, useHeaders) => {
  console.log('request:', method, path, payload)
  return axios({
    url: database(path),
    method: method,
    data: payload,
    headers: useHeaders ? authHeader() : null
  })
  .then( response => {
    console.log('response:', response)
    const { data } = response
    handleData(data)
  })
  .catch( error => {
    handleError(error)
  })
}

export default request
