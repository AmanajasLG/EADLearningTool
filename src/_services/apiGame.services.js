import axios from 'axios'
import { authHeader } from '../_helpers'

const baseURL = 'https://learning-tool-api.herokuapp.com'
const api  = axios.create({ baseURL })

const getAll = (routeName) => {
    // pegar rota
    return api(
      {
        method: 'get',
        url: `/game/${routeName}`,
        headers: authHeader()
      })
      .then(handleResponse)
}

const getById = (routeName,id) => {
    return api(
        {
          method: 'get',
          url: `/game/${routeName}/${id}`,
          headers: authHeader()
        })
        .then(handleResponse)
}

const find = (routeName,data) => {
  return api(
    {
      method: 'get',
      url: `/game/${routeName}`,
      headers: authHeader(),
      params: data
    })
    .then(handleResponse)
}

const create = (routeName,data) => {
    return api(
      {
        method: 'post',
        url: `/game/${routeName}`,
        headers: authHeader(),
        params: data
      })
      .then(handleResponse)
}

const update = (routeName,data) => {
    return api(
        {
          method: 'put',
          url: `/game/${routeName}/${data.id}`,
          headers:  {
            ...authHeader(),
          'Content-Type': 'application/json'
          },
          params: data
        })
        .then(handleResponse)
}

const _delete = (routeName,id) => {
    return api(
        {
          method: 'delete',
          url: `/game/${routeName}/${id}`,
          headers: authHeader()
        })
        .then(handleResponse)
}

function handleResponse(response) {
  if(response.status !== 200){
      if(response.status === 401){
          window.location.reload()
      }
      return Promise.reject(response.statusText)
  }

  return response.data
}

const apiGameServices = {
  getAll:   getAll,
  getById:  getById,
  find:     find,
  create:   create,
  update:   update,
  delete:   _delete
}

export { apiGameServices, baseURL }
export default api
