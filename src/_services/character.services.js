import { authHeader } from '../_helpers'
import api from './api.services'

const database = (path) =>  `https://learning-tool-backend.herokuapp.com/${path}`

export const characterService = {
    getAll,
    getById,
    update,
    delete: _delete
}

function getAll() {
    // pegar rota
    return api(
      {
        method: 'get',
        url: '/personagems',
        headers: authHeader()
      })
      .then(handleResponse)
}

function getById(id){
    return api(
        {
          method: 'get',
          url: `/personagems/${id}`,
          headers: authHeader()
        })
        .then(handleResponse)
}

function update(character){
    // checar rota
    return api(
        {
          method: 'put',
          url: `/personagems/${character.id}`,
          headers:  {
            ...authHeader(),
          'Content-Type': 'application/json'
          },
          data: character
        })
        .then(handleResponse)
}

function _delete(id){
    return api(
        {
          method: 'delete',
          url: `/personagems/${id}`,
          headers: authHeader()
        })
        .then(handleResponse)
}

function handleResponse(response) {
  console.log(response)

  if(response.status !== 200){
      if(response.status === 401){
          window.location.reload()
      }

      return Promise.reject(response.statusText)
  }

  return response.data
}
