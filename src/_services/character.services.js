import { authHeader } from '../_helpers'
import api from './api.services'

export const characterService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
}

function getAll() {
    // pegar rota
    return api(
      {
        method: 'get',
        url: '/characters',
        headers: authHeader()
      })
      .then(handleResponse)
}

function getById(id){
    return api(
        {
          method: 'get',
          url: `/characters/${id}`,
          headers: authHeader()
        })
        .then(handleResponse)
}

function create(character) {
  console.log('called')
    return api(
      {
        method: 'post',
        url: '/characters',
        headers: authHeader(),
        data: character
      })
      .then(handleResponse)
}

function update(character){
    // checar rota
    return api(
        {
          method: 'put',
          url: `/characters/${character.id}`,
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
          url: `/characters/${id}`,
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
